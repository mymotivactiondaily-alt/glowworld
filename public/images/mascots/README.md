# IAscottes GlowWorld 2026 — Versions web optimisées

Les 8 illustrations IAscottes détourées et optimisées pour intégration 
dans le site React.

## Spécifications
- Format : PNG transparent (RGBA, palette PNG-8 200 couleurs)
- Dimension : ~512x512px max (ratio préservé)
- Poids moyen : 42 KB par mascotte
- Total : 333 KB pour les 8

## Mascottes incluses
| Fichier      | Mascotte | Pays         | Animal               |
|--------------|----------|--------------|----------------------|
| gaulo.png    | GAUL'O   | France 🇫🇷   | Coq tricolore        |
| zico.png     | ZICO     | Brésil 🇧🇷   | Toucan samba         |
| diego.png    | DIEGO    | Argentine 🇦🇷| Gaucho des pampas    |
| fado.png     | FADO     | Portugal 🇵🇹 | Coq de Barcelos      |
| tiki.png     | TIKI     | Espagne 🇪🇸  | Taureau noble        |
| starz.png    | STARZ    | USA 🇺🇸      | Pygargue à tête blanche |
| tri.png      | TRI      | Mexique 🇲🇽  | Aigle royal          |
| hock.png     | HOCK     | Canada 🇨🇦   | Castor               |

## Installation dans le projet

1. Créer le dossier `public/images/mascots/` à la racine du projet React
2. Copier les 8 fichiers PNG dans ce dossier
3. Les images seront accessibles via `/images/mascots/[nom].png`

## Utilisation dans le code

```typescript
// Dans src/config/mascotConfig.ts
export const MASCOT_CONFIG = {
  fr: { ..., image: "/images/mascots/gaulo.png" },
  br: { ..., image: "/images/mascots/zico.png" },
  ar: { ..., image: "/images/mascots/diego.png" },
  pt: { ..., image: "/images/mascots/fado.png" },
  es: { ..., image: "/images/mascots/tiki.png" },
  us: { ..., image: "/images/mascots/starz.png" },
  mx: { ..., image: "/images/mascots/tri.png" },
  ca: { ..., image: "/images/mascots/hock.png" }
};
```

Optimisé pour Phase 1B Frontend Chat — Mai 2026
