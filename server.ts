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
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("✓ Firebase Admin: Initialisé avec succès via Service Account.");
  } else {
    admin.initializeApp({
      projectId: 'glowworld-2026'
    });
    console.log("! Firebase Admin: Initialisé avec Project ID par défaut (Attention: Risque de permission sur Railway).");
  }
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
    console.log("🔔 Stripe Webhook: Requête reçue.");
    const sig = req.headers['stripe-signature'] as string;
    let event;

    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("❌ Webhook Error: Configurations manquantes (Stripe ou Secret).");
      return res.status(400).send("Webhook configurations missing");
    }

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.error(`❌ Webhook Error (Signature/Format): ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`✅ Webhook Event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`📦 Session ${session.id}: Traitement de la commande...`);
      
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
        shipping: (session as any).shipping_details || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      try {
        await db.collection('orders').doc(session.id).set(orderData);
        console.log(`💾 Session ${session.id}: Commande enregistrée dans Firestore.`);

        // 2. Clear Cart in Firestore if userId exists
        if (session.metadata?.userId && session.metadata?.userId !== 'guest') {
          await db.collection('carts').doc(session.metadata.userId).set({ items: [], updatedAt: new Date().toISOString() });
          console.log(`🧹 Session ${session.id}: Panier vidé pour l'utilisateur ${session.metadata.userId}.`);
        }
      } catch (dbErr) {
        console.error(`❌ Firestore Error (Session ${session.id}):`, dbErr);
      }

      // 3. Send Thank You Email
      if (resend && orderData.email) {
        try {
          console.log(`📧 Session ${session.id}: Envoi de l'email à ${orderData.email}...`);
          await resend.emails.send({
            from: 'GlowWorld 2026 <contact@glowworld2026.com>',
            to: orderData.email,
            subject: 'Confirmation de votre commande GlowWorld 2026 🎇',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #002395; text-align: center;">Merci pour votre commande !</h1>
                <p>Bonjour,</p>
                <p>Nous avons bien reçu votre paiement pour votre commande <strong>${session.id.slice(-8)}</strong>.</p>
                <p>Votre bracelet LED intelligent sera expédié dans les prochaines 24 heures vers <strong>${orderData.shipping?.address?.city || 'votre adresse'}, ${orderData.shipping?.address?.country || ''}</strong>.</p>
                <hr />
                <p style="font-size: 12px; color: #666; text-align: center;">GlowWorld 2026 - L'émotion en temps réel.</p>
              </div>
            `
          });
          console.log(`✅ Session ${session.id}: Email envoyé.`);
        } catch (emailErr) {
          console.error(`❌ Email Error (Session ${session.id}):`, emailErr);
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

      const origin = req.headers.origin || `https://${req.headers.host}`;
      
      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            // Only send absolute URLs to Stripe
            images: item.image && item.image.startsWith('http') ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel`,
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
