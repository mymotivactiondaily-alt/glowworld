const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Configuration
const SERVICE_ACCOUNT_PATH = path.resolve(__dirname, '../firebase-key.json');
const ADMIN_EMAIL = 'mymotivactiondaily@gmail.com';
const COUNTRIES = ['france', 'brazil', 'argentina', 'usa', 'mexico', 'canada', 'portugal', 'spain'];
const EXPIRATION_DAYS = 75;
const BASE_URL = 'https://glowworld2026.com';

async function generateAdminMagicLinks() {
  console.log('🚀 Démarrage de la génération des magic links admin...');

  // 1. Initialiser Firebase Admin
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`❌ Erreur : Le fichier ${SERVICE_ACCOUNT_PATH} est introuvable.`);
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  const results = [];

  console.log(`📧 Email admin : ${ADMIN_EMAIL}`);
  console.log(`⏳ Expiration : ${EXPIRATION_DAYS} jours`);
  console.log('---');

  for (const country of COUNTRIES) {
    // Générer un token unique (format calqué sur server.ts:517)
    // fan_<timestamp>_<random>
    const token = `fan_admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const expiresAt = Date.now() + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000);

    // Insérer dans Firestore collection fan_tokens
    // Schéma calqué sur server.ts:521
    await db.collection('fan_tokens').doc(token).set({
      email: ADMIN_EMAIL,
      country: country,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: expiresAt,
      used: false,
      isAdmin: true // Flag optionnel pour distinction
    });

    const magicLink = `${BASE_URL}/fan/${country}?token=${token}`;
    results.push({
      country: country.toUpperCase(),
      url: magicLink
    });
  }

  // Affichage final
  console.log('✅ Liens générés avec succès :\n');
  results.forEach(res => {
    console.log(`${res.country.padEnd(10)} : ${res.url}`);
  });

  console.log('\n--- Fin du script ---');
  process.exit(0);
}

generateAdminMagicLinks().catch(err => {
  console.error('❌ Erreur fatale :', err);
  process.exit(1);
});
