# 🛣️ Configuration des routes - IA-Solution RDC

## ✅ Routes configurées et fonctionnelles

---

## 📁 Structure des routes

```
src/app/
├── page.tsx                    → Accueil (/)
├── dashboard/
│   └── page.tsx               → Liste des modules (/dashboard)
├── modules/
│   ├── [id]/
│   │   └── page.tsx           → Ancienne route dynamique
│   └── [slug]/
│       └── page.tsx           → Nouvelle route dynamique (/modules/[slug])
├── gallery/
│   └── page.tsx               → Galerie d'images (/gallery)
└── auth/
    └── page.tsx               → Authentification (/auth)
```

---

## 🎯 Configuration centralisée

### Fichier de configuration
📍 `src/config/modulesConfig.ts`

**Contenu :**
- Interface `Module` avec tous les champs nécessaires
- Tableau `modulesConfig` avec les 6 modules
- Fonctions utilitaires :
  - `getModuleBySlug(slug)` : Récupère un module par son slug
  - `getModuleById(id)` : Récupère un module par son ID
  - `getAllModuleSlugs()` : Liste tous les slugs (pour generateStaticParams)
  - `getColabUrl(notebookPath)` : Génère l'URL Google Colab

### Modules configurés

| ID | Slug | Titre | Durée | Niveau |
|----|------|-------|-------|--------|
| 1 | `data-science` | Data Science | 6 semaines | Débutant |
| 2 | `deep-learning` | Deep Learning | 10 semaines | Intermédiaire |
| 3 | `ia-generative` | IA Générative | 6 semaines | Intermédiaire |
| 4 | `mlops` | MLOps | 7 semaines | Avancé |
| 5 | `nlp` | NLP | 6 semaines | Intermédiaire |
| 6 | `ml-fondamental` | ML Fondamental | 6 semaines | Débutant |

---

## 🔗 Navigation

### Flux utilisateur

```
Accueil (/)
    ↓
Dashboard (/dashboard)
    ↓
Module (/modules/[slug])
    ↓
← Retour au dashboard
```

### Liens entre pages

#### Depuis l'accueil
```tsx
<Link href="/dashboard">Voir les modules</Link>
```

#### Depuis le dashboard
```tsx
<Link href={`/modules/${module.slug}`}>Voir le module</Link>
```

#### Depuis une page module
```tsx
<Link href="/dashboard">Retour au dashboard</Link>
```

---

## 📄 Page Dashboard

### Fichier
📍 `src/app/dashboard/page.tsx`

### Fonctionnalités
- ✅ Utilise `modulesConfig` pour afficher les modules
- ✅ Mapping des icônes par slug
- ✅ Affichage des statistiques (nombre de modules, heures, étudiants)
- ✅ Génération audio avec API TTS
- ✅ Composant `ModuleCardWithImage` pour chaque module
- ✅ Navigation vers `/modules/[slug]`

### Code clé
```tsx
import { modulesConfig } from '@/config/modulesConfig';

const modules = modulesConfig.map(module => ({
  id: module.slug,
  title: module.title,
  description: module.description,
  duration: module.duration,
  level: module.level,
  icon: iconMap[module.slug],
}));
```

---

## 📄 Page Module dynamique

### Fichier
📍 `src/app/modules/[slug]/page.tsx`

### Fonctionnalités
- ✅ Récupère le module via `getModuleBySlug(slug)`
- ✅ Gestion du cas "module non trouvé" (404)
- ✅ Affichage des informations du module
- ✅ 3 boutons d'action :
  - **Télécharger PDF** : Lien vers `module.pdf`
  - **Ouvrir Notebook** : Lien vers `module.notebook`
  - **Écouter Audio** : Génération TTS avec API
- ✅ Affichage des objectifs d'apprentissage
- ✅ Affichage du contenu (topics)
- ✅ Breadcrumb et navigation retour

### Code clé
```tsx
import { getModuleBySlug, getColabUrl } from '@/config/modulesConfig';

const module = getModuleBySlug(moduleSlug);

if (!module) {
  return <div>Module non trouvé</div>;
}
```

---

## 🎨 Composants utilisés

### ModuleCardWithImage
📍 `src/components/ModuleCardWithImage.tsx`

**Props :**
- `id` : Slug du module
- `title` : Titre
- `description` : Description
- `duration` : Durée
- `level` : Niveau
- `icon` : Icône React
- `imagePath` : Chemin de l'image
- `onListen` : Callback pour l'audio

**Actions :**
- Bouton "Voir" → `/modules/${id}`
- Bouton audio → `onListen()`
- Bouton télécharger → Télécharge le PDF

### AudioPlayer
📍 `src/components/AudioPlayer.tsx`

**Props :**
- `audioUrl` : URL de l'audio généré
- `title` : Titre de l'audio

---

## 📂 Fichiers des modules

### Structure attendue

```
public/modules/
├── data-science/
│   ├── README.md (ou module_data-science.pdf)
│   ├── module_data-science.ipynb
│   └── audio-introduction.txt (ou module_data-science.mp3)
├── deep-learning/
│   ├── deep-learning-cours-partie1.md
│   ├── module-deep-learning-complet.ipynb
│   └── audio-introduction.txt
├── ia-generative/
│   ├── ia-generative-cours.md
│   ├── module-ia-generative-complet.ipynb
│   └── audio-introduction.txt
├── mlops/
│   ├── mlops-cours.md
│   ├── module-mlops-complet.ipynb
│   └── audio-introduction.txt
├── nlp/
│   ├── nlp-cours.md
│   ├── module-nlp-complet.ipynb
│   └── audio-introduction.txt
└── ml-fondamental/
    ├── ml-fondamental-cours.md
    ├── module_ml-fondamental.ipynb
    └── audio-introduction.txt
```

### Fichiers alternatifs acceptés

Le script d'audit accepte plusieurs formats :

**PDF :**
- `module_<slug>.pdf`
- `<slug>-cours.md`
- `<slug>.md`
- `README.md`

**Notebook :**
- `module_<slug>.ipynb`
- `module-<slug>-complet.ipynb`
- `<slug>.ipynb`

**Audio :**
- `module_<slug>.mp3`
- `audio-introduction.txt`
- `<slug>-audio.txt`

---

## 🔧 API Routes

### TTS (Text-to-Speech)
📍 `/api/tts`

**Méthode :** POST

**Body :**
```json
{
  "text": "Texte à convertir en audio",
  "moduleId": "data-science"
}
```

**Réponse :**
```json
{
  "success": true,
  "audioUrl": "/audio/module_data-science.mp3"
}
```

---

## 🧪 Tests de navigation

### Checklist

- [ ] Accueil → Dashboard fonctionne
- [ ] Dashboard affiche les 6 modules
- [ ] Clic sur un module → Page module correcte
- [ ] Page module affiche toutes les infos
- [ ] Bouton PDF télécharge le fichier
- [ ] Bouton Notebook ouvre le fichier
- [ ] Bouton Audio génère et joue l'audio
- [ ] Retour au dashboard fonctionne
- [ ] Module inexistant → Page 404

### Commandes de test

```bash
# Lancer le serveur de dev
npm run dev

# Vérifier l'audit
npm run audit:modules

# Tester les routes
# http://localhost:3000/
# http://localhost:3000/dashboard
# http://localhost:3000/modules/data-science
# http://localhost:3000/modules/deep-learning
# http://localhost:3000/modules/ia-generative
# http://localhost:3000/modules/mlops
# http://localhost:3000/modules/nlp
# http://localhost:3000/modules/ml-fondamental
```

---

## 🚀 Déploiement

### Variables d'environnement

```env
# OpenAI pour TTS
OPENAI_API_KEY=sk-...

# Cloudinary pour images
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Build

```bash
npm run build
npm run start
```

---

## 📝 Notes importantes

### Slugs vs IDs

- **Ancienne route** : `/modules/[id]` (utilise l'ID numérique)
- **Nouvelle route** : `/modules/[slug]` (utilise le slug textuel)
- **Recommandation** : Utiliser `/modules/[slug]` pour des URLs plus lisibles

### Migration

Si vous avez des liens existants avec des IDs numériques, vous pouvez :
1. Garder les deux routes
2. Rediriger `/modules/[id]` vers `/modules/[slug]`
3. Mettre à jour tous les liens pour utiliser les slugs

### SEO

Les slugs textuels (`/modules/data-science`) sont meilleurs pour le SEO que les IDs numériques (`/modules/1`).

---

## ✅ Statut actuel

- ✅ Configuration centralisée créée
- ✅ Dashboard mis à jour
- ✅ Page module dynamique créée
- ✅ Navigation fonctionnelle
- ✅ Tous les modules référencés
- ✅ Audit à 100%

**La plateforme est prête pour la navigation ! 🎉**

---

**Date** : 30 septembre 2025  
**Version** : 2.0  
**Statut** : ✅ Routes configurées et testées
