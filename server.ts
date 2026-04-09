import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Resend } from 'resend';
import admin from 'firebase-admin';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'glowworld-2026'
  });
}
const db = admin.firestore();

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY) 
  : null;

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Webhook needs raw response
  app.post("/api/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      return res.status(400).send("Webhook configurations missing");
    }

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // 1. Save Order to Firestore
      const orderData = {
        orderId: session.id,
        customerId: session.customer,
        userId: (session as any).metadata?.userId || 'guest',
        email: session.customer_details?.email,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency,
        status: 'paid',
        items: JSON.parse((session as any).metadata?.items || '[]'),
        shipping: (session as any).shipping_details,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection('orders').doc(session.id).set(orderData);

      // 2. Clear Cart in Firestore if userId exists
      if (session.metadata?.userId) {
        await db.collection('carts').doc(session.metadata.userId).set({ items: [], updatedAt: new Date().toISOString() });
      }

      // 3. Send Thank You Email
      if (resend && orderData.email) {
        try {
          await resend.emails.send({
            from: 'GlowWorld <onboarding@resend.dev>',
            to: orderData.email,
            subject: 'Confirmation de votre commande GlowWorld 2026 🎇',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #002395; text-align: center;">Merci pour votre commande !</h1>
                <p>Bonjour,</p>
                <p>Nous avons bien reçu votre paiement pour votre commande <strong>${session.id.slice(-8)}</strong>.</p>
                <p>Votre bracelet LED intelligent sera expédié dans les prochaines 24 heures vers <strong>${orderData.shipping?.address?.city}, ${orderData.shipping?.address?.country}</strong>.</p>
                <hr />
                <p style="font-size: 12px; color: #666; text-align: center;">GlowWorld 2026 - L'émotion en temps réel.</p>
              </div>
            `
          });
        } catch (emailErr) {
          console.error("Email Error:", emailErr);
        }
      }
    }

    res.json({ received: true });
  });

  app.use(express.json());

  // API Route for Stripe Checkout
  app.post("/api/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured on the server." });
    }

    try {
      const { items, lang, userId, userEmail } = req.body;

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
        customer_email: userEmail,
        metadata: {
          userId: userId || 'guest',
          items: JSON.stringify(items.map((i: any) => ({ id: i.id, name: i.name, qty: i.quantity })))
        },
        locale: lang === 'fr' ? 'fr' : lang === 'es' ? 'es' : 'en',
        shipping_address_collection: {
          allowed_countries: ['FR', 'BE', 'CH', 'CA', 'ES', 'US', 'GB', 'DE', 'IT', 'NL'],
        },
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        invoice_creation: { enabled: true },
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
  });

  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
