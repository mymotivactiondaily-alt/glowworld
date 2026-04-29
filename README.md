<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/7b4dc99e-79bf-44fb-baf0-0da578c50ec7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Variables d'Environnement (Phase 1A Backend IA Fan Chat)
Ajouter au `.env` (et sur Railway) :
- `ANTHROPIC_API_KEY` : Clé API pour Claude (obligatoire).
- `ANTHROPIC_MODEL` : `claude-haiku-4-5` par défaut.
- `ANTHROPIC_MAX_TOKENS_OUT` : Nombre max de tokens générés (ex: 400).
- `ANTHROPIC_MONTHLY_BUDGET_EUR` : Budget mensuel d'alerte (ex: 40).
- `ANTHROPIC_DEGRADED_MODE_THRESHOLD` : Seuil du mode dégradé (ex: 0.9).
- `ANTHROPIC_ALERT_THRESHOLD` : Seuil de l'alerte email (ex: 0.5).
- `FOOTBALL_DATA_TOKEN` : Token pour football-data.org (optionnel).
- `FAN_CHAT_DAILY_LIMIT_PER_USER` : Limite de messages par jour par utilisateur (ex: 30).
- `ADMIN_EMAIL` : Email de l'administrateur, contourne le système de token (ex: mymotivactiondaily@gmail.com).
- `ADMIN_TEST_SECRET` : Mot de passe simple pour la route `/api/admin/test-mascots`.
Pour générer un vrai secret aléatoire en local, lance :
  node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
