# Résumé de la Phase 1A : Backend IA Fan Chat

## 📁 Fichiers Créés / Modifiés
- `src/server/types/chat.types.ts` : Types partagés (CountryCode, Persona, etc.).
- `src/server/ai/personas.ts` : Prompts systèmes complets avec des TODOs (à compléter avec la Bible des mascottes).
- `src/server/ai/degradedResponses.ts` : Réponses de repli en cas de dépassement de budget.
- `src/server/ai/claudeClient.ts` : Client Anthropic avec gestion du streaming SSE et du coût.
- `src/server/football/teamMappings.ts` : Correspondances des IDs d'équipes football-data.org (TODO: confirmer les IDs US et CA).
- `src/server/football/footballDataClient.ts` : Récupération des prochains matchs avec mise en cache Firestore de 6h.
- `src/server/chat/rateLimiter.ts` : Limites journalières et suivi budgétaire mensuel avec alerte Resend.
- `src/server/chat/conversationStore.ts` : Sauvegarde persistante des historiques (conversations et messages) via Firestore.
- `src/server/routes/fanChat.ts` : Route principale SSE `POST /api/fan-chat`.
- `src/server/routes/adminTestMascots.ts` : Route utilitaire `GET /api/admin/test-mascots`.
- `server.ts` : Modifié pour inclure les routes (à la fin juste avant `app.listen`).

## 🔐 Variables d'environnement ajoutées (à configurer sur Railway et en local)
- `ANTHROPIC_API_KEY` : (fournie par Bruno)
- `ANTHROPIC_MODEL` : `claude-haiku-4-5`
- `ANTHROPIC_MAX_TOKENS_OUT` : `400`
- `ANTHROPIC_MONTHLY_BUDGET_EUR` : `40`
- `ANTHROPIC_DEGRADED_MODE_THRESHOLD` : `0.9`
- `ANTHROPIC_ALERT_THRESHOLD` : `0.5`
- `FOOTBALL_DATA_TOKEN` : (à demander à Bruno)
- `FAN_CHAT_DAILY_LIMIT_PER_USER` : `30`
- `ADMIN_EMAIL` : `mymotivactiondaily@gmail.com`
- `ADMIN_TEST_SECRET` : `GENERE_UNE_VRAIE_VALEUR_ALEATOIRE_32_CARS`

## 📋 TODOs Restants
1. Remplir le contenu manquant des personas dans `src/server/ai/personas.ts` en utilisant la Bible des Mascottes.
2. Vérifier les IDs des équipes de football pour les États-Unis et le Canada dans `src/server/football/teamMappings.ts`.
3. Assurez-vous d'avoir les clés API réelles (Anthropic et Football Data).

## 🗃️ Index Firestore (optionnel, potentiellement à ajouter manuellement plus tard)
Les requêtes suivantes nécessitent un index dans Firestore (ou un index sera automatiquement généré lors de la première tentative) :
- Collection `messages` sous-collection de `conversations` ordonnée par `createdAt` en ordre `desc`. Firestore fournira un lien de création d'index cliquable dans les logs d'erreur (Firebase Console) si nécessaire.

## 🚀 Commandes de test (cURL)

**A. Tester le chat avec un compte admin :**
```bash
curl -X POST http://localhost:3000/api/fan-chat \
  -H "Content-Type: application/json" \
  -d '{"email":"mymotivactiondaily@gmail.com", "countryCode":"fr", "message":"Salut Gaul\'o !"}'
```

**B. Lancer les tests des 8 mascottes simultanément :**
```bash
curl -X GET "http://localhost:3000/api/admin/test-mascots?email=mymotivactiondaily@gmail.com&secret=GENERE_UNE_VRAIE_VALEUR_ALEATOIRE_32_CARS"
```

**C. Tester avec un fan token réel :**
```bash
# Remplacez <VOTRE_FAN_TOKEN> par un vrai token généré dans Firestore.
curl -X POST http://localhost:3000/api/fan-chat \
  -H "Content-Type: application/json" \
  -d '{"email":"fan@example.com", "countryCode":"br", "message":"Salut Zico !", "fanToken":"<VOTRE_FAN_TOKEN>"}'
```
