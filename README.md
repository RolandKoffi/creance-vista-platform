
# CreanceVista - Plateforme de gestion de créances

## Introduction

CreanceVista est une application web responsive pour la gestion des créances, permettant aux PMEs de soumettre des factures et aux investisseurs de les financer.

## Fonctionnalités

- Interface adaptative pour tous types d'écrans (desktop, tablette, mobile)
- Tableau de bord personnalisé par rôle (administrateur, PME, investisseur)
- Gestion de créances et transactions
- Système de notifications

## Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

## Version TypeScript vs JavaScript

Cette application est développée avec TypeScript, mais peut être convertie en JavaScript classique.

### Conversion de TypeScript en JavaScript

Pour convertir le projet de TypeScript (TSX) vers JavaScript (JSX), suivez ces étapes:

1. Exécutez le script de conversion:

```bash
node scripts/convert-to-js.js
```

2. Une nouvelle version du projet en JavaScript sera créée dans le dossier `js-version`.

3. Pour utiliser cette version:

```bash
cd js-version
npm install
npm run dev
```

## Structure du projet

```
src/
├── api/                # Services API pour la communication avec le backend
├── components/         # Composants réutilisables
├── hooks/              # Hooks personnalisés (useAuth, useIsMobile, etc.)
├── pages/              # Pages de l'application par rôle
├── types/              # Définitions de types TypeScript
└── utils/              # Fonctions utilitaires
```

## Adaptabilité aux écrans

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran:
- Desktop: Affichage complet avec sidebar visible
- Tablette: Affichage adapté avec sidebar rétractable
- Mobile: Interface simplifiée avec menu hamburger
