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
        exported: false,
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
            name: item.name[lang as 'fr' | 'en' | 'es'] || item.name.fr,
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

  // Welcome Email Route for new registrations
  app.post("/api/welcome-email", async (req, res) => {
    const { email, displayName } = req.body;
    if (!email || !resend) return res.status(400).json({ error: "Missing data" });
    try {
      await resend.emails.send({
        from: 'GlowWorld 2026 <contact@glowworld2026.com>',
        to: email,
        subject: '🎇 Bienvenue chez GlowWorld 2026 !',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;background:#0a0f1e;color:white;border-radius:12px;">
            <h1 style="color:#003399;text-align:center;">Bienvenue ${displayName || ''} ! 🎇</h1>
            <p>Merci de rejoindre GlowWorld 2026 — la technologie au service de la passion du foot.</p>
            <p>Votre compte est maintenant actif. Vous pouvez dès maintenant :</p>
            <ul>
              <li>🛒 Commander votre bracelet LED</li>
              <li>📦 Suivre vos commandes</li>
              <li>⚡ Recevoir les offres exclusives</li>
            </ul>
            <div style="text-align:center;margin-top:30px;">
              <a href="https://www.glowworld2026.com/boutique" style="background:#003399;color:white;padding:12px 30px;border-radius:8px;text-decoration:none;font-weight:bold;">
                Découvrir la boutique
              </a>
            </div>
            <p style="font-size:12px;color:#666;text-align:center;margin-top:30px;">GlowWorld 2026 - L'émotion en temps réel.</p>
          </div>
        `
      });
      res.json({ success: true });
    } catch (err: any) {
      console.error("Welcome Email Error:", err);
    }
  });

  // Fan Page — Request Magic Link
  app.post("/api/fan/request-access", async (req, res) => {
    const { email, country } = req.body;
    if (!email || !country) return res.status(400).json({ error: "Missing data" });
    try {
      const ordersSnap = await db.collection('orders')
        .where('email', '==', email.toLowerCase().trim())
        .where('status', '==', 'paid')
        .limit(1)
        .get();
      if (ordersSnap.empty) return res.status(404).json({ error: "no_order" });
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const expiresAt = new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString();
      await db.collection('fan_tokens').doc(token).set({
        email: email.toLowerCase().trim(),
        country,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt,
        used: false,
      });
      const origin = req.headers.origin || 'https://www.glowworld2026.com';
      const magicLink = `${origin}/fan/${country}?token=${token}`;
      if (resend) {
        await resend.emails.send({
          from: 'GlowWorld 2026 <contact@glowworld2026.com>',
          to: email,
          subject: `Votre accès Fan Zone ${country.toUpperCase()} est prêt !`,
          html: `
            <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#0A0F1E;color:white;border-radius:12px">
              <h2 style="color:#002395;text-align:center">Accès Fan Zone confirmé !</h2>
              <p>Bonjour,</p>
              <p>Votre achat a été vérifié. Cliquez sur le bouton ci-dessous pour accéder à votre espace fan exclusif.</p>
              <div style="text-align:center;margin:32px 0">
                <a href="${magicLink}" style="background:#002395;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">
                  Accéder à ma Fan Zone
                </a>
              </div>
              <p style="font-size:12px;color:#666;text-align:center">Ce lien est valable 30 jours.</p>
              <hr style="border-color:#1a2040;margin:20px 0"/>
              <p style="font-size:12px;color:#666;text-align:center">GlowWorld 2026 · L'émotion en temps réel</p>
            </div>
          `
        });
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error("Fan access error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Fan Page — Verify Token
  app.get("/api/fan/verify-token", async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ valid: false });
    try {
      const doc = await db.collection('fan_tokens').doc(token as string).get();
      if (!doc.exists) return res.json({ valid: false });
      const data = doc.data()!;
      if (new Date(data.expiresAt) < new Date()) return res.json({ valid: false, reason: 'expired' });
      await doc.ref.update({ used: true, lastAccess: new Date().toISOString() });
      res.json({ valid: true, email: data.email, country: data.country });
    } catch (err: any) {
      res.status(500).json({ valid: false });
    }
  });

  // Admin Route for fetching recent orders
  app.get("/api/admin/orders", async (req, res) => {
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: "Non autorisé" });
    }
    try {
      const snapshot = await db.collection('orders')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(orders);
    } catch (err: any) {
      console.error("Admin Orders Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Administration Route for Exporting CSV
  app.post("/api/export-csv", async (req, res) => {
    const adminKey = req.headers['x-admin-key'];
    
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: "Non autorisé. Clé admin invalide ou manquante." });
    }

    try {
      const ordersSnapshot = await db.collection('orders')
        .where('exported', '==', false)
        .get();

      if (ordersSnapshot.empty) {
        return res.status(404).json({ message: "Aucune nouvelle commande à exporter." });
      }

      const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

      // CSV Generation (RFC 4180 compliant)
      const headers = ["Order ID", "Email", "Amount", "Currency", "Status", "Items", "Shipping Name", "Address", "City", "Postal Code", "Country", "Date"];
      const csvRows = orders.map(order => {
        const itemsStr = order.items.map((i: any) => `${i.name} (x${i.qty})`).join('; ');
        const rowData = [
          order.orderId || '',
          order.email || '',
          order.amount || 0,
          order.currency || 'eur',
          order.status || 'paid',
          itemsStr,
          order.shipping?.name || '',
          order.shipping?.address?.line1 || '',
          order.shipping?.address?.city || '',
          order.shipping?.address?.postal_code || '',
          order.shipping?.address?.country || '',
          order.createdAt && typeof order.createdAt.toDate === 'function' 
            ? order.createdAt.toDate().toISOString() 
            : new Date().toISOString()
        ];
        // Escape quotes and wrap in quotes
        return rowData.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
      });

      const csvContent = [headers.join(','), ...csvRows].join('\n');

      // Update Firestore: Mark as exported in a single batch
      const batch = db.batch();
      ordersSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { exported: true });
      });
      await batch.commit();

      // Send Email via Resend with attachment
      if (resend) {
        try {
          await resend.emails.send({
            from: 'GlowWorld 2026 Admin <contact@glowworld2026.com>',
            to: 'contact@glowworld2026.com',
            subject: `📦 Export Commandes - ${new Date().toLocaleDateString('fr-FR')}`,
            text: `Bonjour,\n\nVeuillez trouver ci-joint l'export CSV des ${orders.length} nouvelles commandes.\n\nNombre de commandes : ${orders.length}\nDate de l'export : ${new Date().toLocaleString('fr-FR')}\n\nCordialement,\nLe système GlowWorld 2026`,
            attachments: [
              {
                filename: `commandes_${new Date().toISOString().split('T')[0]}.csv`,
                content: Buffer.from(csvContent),
              }
            ]
          });
          console.log(`✓ Export CSV: Email envoyé à contact@glowworld2026.com (${orders.length} commandes).`);
        } catch (emailErr) {
          console.error("❌ Export Email Error:", emailErr);
        }
      }

      // Return CSV to browser for direct download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=commandes_${new Date().toISOString().split('T')[0]}.csv`);
      res.status(200).send(csvContent);

    } catch (error: any) {
      console.error("❌ Export Route Error:", error);
      res.status(500).json({ error: "Erreur lors de la génération de l'export." });
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
