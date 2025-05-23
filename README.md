
# FINCREDIBL - Plateforme de Cession de Créances

## Description

FINCREDIBL est une application web simplifiée pour la gestion des créances, permettant aux PMEs de soumettre des factures et aux investisseurs de les financer.

## Fonctionnalités

- 🔐 Authentification simple par rôle (Admin, PME, Investisseur)
- 📊 Tableau de bord personnalisé selon le rôle utilisateur
- 🏢 Gestion des créances pour les PMEs
- 💰 Opportunités d'investissement pour les investisseurs
- 📱 Interface responsive (desktop, tablette, mobile)

## Installation et Démarrage

### Version TypeScript (par défaut)

```bash
# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

### Conversion vers JavaScript

Pour convertir automatiquement le projet de TypeScript vers JavaScript :

```bash
# Exécuter le script de conversion
node scripts/convert-to-js.js

# Aller dans le dossier JavaScript généré
cd js-version

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

## Utilisateurs de Test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@fincredibl.com | password |
| PME | contact@techpme.com | password |
| Investisseur | jean.dupont@investisseur.com | password |

## Structure Simplifiée

```
src/
├── components/
│   ├── ui/              # Composants d'interface
│   └── layout/          # Layout de l'application
├── data/
│   └── simple-data.ts   # Données de test simplifiées
├── hooks/
│   ├── useAuth.tsx      # Gestion de l'authentification
│   └── use-mobile.tsx   # Détection mobile
├── pages/
│   ├── auth/           # Pages d'authentification
│   ├── Dashboard.tsx   # Dashboard unifié
│   └── NotFound.tsx    # Page 404
└── types/
    └── index.ts        # Types TypeScript
```

## Caractéristiques de la Version Simplifiée

- ✅ Authentification basique avec localStorage
- ✅ Données mockées intégrées
- ✅ Interface unifiée et responsive
- ✅ Navigation simplifiée
- ✅ Code facilement convertible en JavaScript
- ❌ Pas de base de données externe
- ❌ Pas d'API backend complexe
- ❌ Pas de gestion avancée des permissions

## Technologies Utilisées

- **Frontend**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **Routing**: React Router
- **State**: React Hooks + Context API
- **Notifications**: Sonner

## Export et Personnalisation

Cette version simplifiée peut facilement être :
- Exportée vers GitHub
- Convertie en HTML/CSS/JavaScript vanilla
- Intégrée dans d'autres frameworks
- Adaptée pour d'autres besoins

## Support

Pour toute question ou personnalisation, référez-vous à la documentation de chaque technologie utilisée ou contactez l'équipe de développement.
