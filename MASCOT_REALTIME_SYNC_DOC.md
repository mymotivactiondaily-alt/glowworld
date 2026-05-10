# Architecture Technique : Synchronisation Temps Réel du Chat Mascotte

## Contexte et Problématique
**Problème initial :** Les réponses de l'IA (Mascotte) n'apparaissaient pas correctement dans l'interface (bulle vide, chargement infini) sans un rafraîchissement manuel de la page.
**Cause :** Le frontend s'appuyait sur un flux SSE (Server-Sent Events) pour mettre à jour l'interface locale en temps réel. Si le proxy (ex: Railway) bufferisait ou coupait la connexion SSE, l'UI se désynchronisait de la base de données Firestore où les messages étaient bien enregistrés par le backend.

## Solution Implémentée : Synchronisation Bidirectionnelle via Firestore
La solution consiste à utiliser **Firestore comme source de vérité unique et canal de streaming en temps réel** (via `onSnapshot`), plutôt que de dépendre du transport HTTP SSE pour l'état de l'interface.

### 1. Backend (`src/server/routes/fanChat.ts` & `src/server/chat/conversationStore.ts`)
*   **Création précoce du document :** Dès qu'une requête de chat est reçue, le backend crée un message "assistant" vide dans Firestore et récupère son ID généré.
    *   *Modif technique :* `appendMessage` dans `conversationStore.ts` a été modifié pour retourner `newMessageRef.id`.
*   **Mise à jour en temps réel (Fire & Forget) :** Dans la boucle `for await` du stream LLM, chaque nouveau chunk est concaténé et le document Firestore est mis à jour *pendant* le stream.
    *   *Modif technique :* `assistantMessageRef.update({ content: fullText }).catch(...)`.
*   **Maintien du SSE :** Le flux SSE est conservé uniquement pour envoyer des signaux de contrôle (`type: 'chunk'`, `type: 'done'`, erreurs) et gérer l'état d'animation de la mascotte (`listening`, `speaking`, `idle`), mais **pas** pour transporter le contenu texte du message.

### 2. Frontend (`src/hooks/useMascotChat.ts`)
*   **Écoute active (`onSnapshot`) :** Au lieu d'un simple fetch initial, la fonction `loadHistory` utilise `onSnapshot` pour écouter en permanence la sous-collection `messages` de la conversation courante.
    *   *Modif technique :* Le tableau `messages` est entièrement remplacé par le snapshot Firestore à chaque mise à jour.
*   **Nettoyage de l'état local :** La fonction `sendMessage` n'essaie plus de concaténer les chunks SSE dans l'état React local. Elle se contente d'ajouter temporairement le message *utilisateur* et de gérer l'état `isLoading`. Le contenu de l'assistant apparaît de lui-même via le déclenchement de `onSnapshot`.
*   **Gestion du cycle de vie :** L'écouteur `onSnapshot` est correctement désinscrit (`unsubscribe`) lors du démontage du composant pour éviter les fuites de mémoire.

### 3. Sécurité (`firestore.rules`)
*   **Restriction d'accès :** Les collections `/conversations/{conversationId}` et `/conversations/{conversationId}/messages/{messageId}` ont été verrouillées avec `allow read, write: if request.auth != null;`.

## Flux d'Exécution Actuel
1. L'utilisateur envoie un message.
2. Le composant React affiche le message localement, affiche les points de suspension (`isLoading = true`) et appelle le backend via `fetch` POST.
3. Le backend crée le message utilisateur en BDD, puis crée un message assistant vide.
4. Le listener `onSnapshot` du frontend détecte le nouveau message assistant vide et l'affiche.
5. L'IA génère du texte. Le backend fait des `.update()` sur le message assistant dans Firestore à chaque chunk.
6. Le listener `onSnapshot` réagit à chaque update, le texte s'écrit progressivement dans la bulle côté client.
7. À la fin du stream, le backend finalise le document (coût, etc.) et termine la réponse HTTP. Le frontend enlève l'état de chargement.

## Points d'Attention pour de Futures Évolutions
- **Coûts Firestore :** Une écriture par chunk LLM multiplie les opérations Firestore. Si le coût devient problématique à très grande échelle, il faudra implémenter un "debounce" ou "batching" côté backend (ex: `.update()` tous les 10 chunks ou toutes les 500ms).
- **Indexation :** La requête frontend `orderBy('createdAt', 'asc')` sur une sous-collection ne nécessite pas d'index composite complexe, mais ce sera à surveiller si de nouveaux filtres sont ajoutés.
- **Rôle du SSE :** Le flux SSE reste vital pour réagir rapidement aux erreurs (ex: limites de quota `429`) sans avoir à polluer Firestore avec des messages d'erreur.
