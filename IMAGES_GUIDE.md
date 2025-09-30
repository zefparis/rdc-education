# 📸 Guide des Images - Ia-Solution RDC

## Vue d'ensemble

Ce guide explique comment télécharger et utiliser automatiquement des images depuis Unsplash pour illustrer la plateforme.

---

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install axios ts-node
```

### 2. Obtenir une clé API Unsplash

1. Créer un compte sur [Unsplash Developers](https://unsplash.com/developers)
2. Créer une nouvelle application
3. Copier votre **Access Key**

### 3. Configurer la clé API

Ajouter dans `.env.local` :

```env
UNSPLASH_ACCESS_KEY=votre_cle_unsplash_ici
```

---

## 📥 Télécharger les images

### Commande

```bash
npm run fetch:images
```

### Ce qui se passe

1. **Connexion à Unsplash** avec votre clé API
2. **Téléchargement** de 5 images pour chaque thème :
   - `education` - Éducation et technologie
   - `ai` - Intelligence artificielle
   - `students` - Étudiants africains
   - `africa` - Afrique et innovation
   - `data-science` - Data Science
   - `deep-learning` - Deep Learning
3. **Sauvegarde** dans `public/images/<theme>/`
4. **Nommage** : `theme_1.jpg`, `theme_2.jpg`, etc.

### Structure créée

```
public/
└── images/
    ├── education/
    │   ├── education_1.jpg
    │   ├── education_2.jpg
    │   ├── education_3.jpg
    │   ├── education_4.jpg
    │   └── education_5.jpg
    ├── ai/
    │   ├── ai_1.jpg
    │   └── ...
    ├── students/
    ├── africa/
    ├── data-science/
    ├── deep-learning/
    └── metadata.json
```

---

## 🎨 Utilisation dans l'application

### Page d'accueil

**Hero avec image de fond** :

```tsx
// src/app/page.tsx
<div 
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/education/education_1.jpg)' }}
/>
<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
```

**Overlay sombre** : `bg-black/70` pour garantir la lisibilité du texte.

### Dashboard

**Modules avec images** :

```tsx
import { getImagePath, MODULE_IMAGE_MAPPING } from '@/lib/images';

const theme = MODULE_IMAGE_MAPPING[module.id] || 'ai';
const imagePath = getImagePath(theme, 1);

<ModuleCardWithImage 
  imagePath={imagePath}
  {...module}
/>
```

### Galerie

**Toutes les images** :

```tsx
import { getAllImages } from '@/lib/images';

const images = getAllImages();

images.map(image => (
  <Image src={image.path} alt={image.name} />
))
```

---

## 🛠️ Fonctions utilitaires

### `getImagePath(theme, index)`

Récupère le chemin d'une image spécifique.

```typescript
getImagePath('education', 1)
// → '/images/education/education_1.jpg'
```

### `getRandomImage(theme)`

Récupère une image aléatoire pour un thème.

```typescript
getRandomImage('ai')
// → '/images/ai/ai_3.jpg' (aléatoire)
```

### `getAllImagesForTheme(theme)`

Récupère toutes les images d'un thème.

```typescript
getAllImagesForTheme('data-science')
// → ['/images/data-science/data-science_1.jpg', ...]
```

### `getAllImages()`

Récupère toutes les images de tous les thèmes.

```typescript
getAllImages()
// → [{ theme: 'Éducation', path: '...', name: '...' }, ...]
```

---

## 🎨 Bonnes pratiques UI

### 1. Toujours ajouter un overlay

```tsx
<div className="relative">
  <Image src={imagePath} alt="..." fill />
  {/* Overlay sombre pour contraste */}
  <div className="absolute inset-0 bg-black/50" />
  {/* Contenu par-dessus */}
  <div className="relative z-10">
    <h1 className="text-white">Texte lisible</h1>
  </div>
</div>
```

### 2. Utiliser des gradients

```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
```

### 3. Hover effects

```tsx
<div className="group">
  <Image 
    className="transition-transform duration-500 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
</div>
```

---

## 📝 Mapping des modules

```typescript
export const MODULE_IMAGE_MAPPING = {
  'data-science': 'data-science',
  'deep-learning': 'deep-learning',
  'generative-ai': 'ai',
  'mlops': 'ai',
  'computer-vision': 'ai',
  'nlp': 'ai',
};
```

---

## 🔄 Régénérer les images

### Supprimer les anciennes images

```bash
# Windows
rmdir /s /q public\images

# Linux/Mac
rm -rf public/images
```

### Télécharger de nouvelles images

```bash
npm run fetch:images
```

---

## ⚙️ Personnalisation

### Modifier les thèmes

Éditer `scripts/fetch-images.ts` :

```typescript
const THEMES = [
  { name: 'education', query: 'education technology students learning' },
  { name: 'custom-theme', query: 'your custom query' },
  // Ajouter vos thèmes ici
];
```

### Modifier le nombre d'images

```typescript
const IMAGES_PER_THEME = 10; // Au lieu de 5
```

### Changer l'orientation

```typescript
params: {
  orientation: 'portrait', // ou 'landscape', 'squarish'
}
```

---

## 🚨 Limites API Unsplash

### Plan gratuit

- **50 requêtes / heure**
- **Illimité en production** (avec attribution)

### Respecter les limites

Le script ajoute une **pause de 1 seconde** entre chaque thème :

```typescript
await new Promise((resolve) => setTimeout(resolve, 1000));
```

---

## 📊 Métadonnées

Le script génère `public/images/metadata.json` :

```json
{
  "themes": ["education", "ai", "students", ...],
  "imagesPerTheme": 5,
  "totalImages": 30,
  "generatedAt": "2025-09-30T12:00:00.000Z",
  "source": "Unsplash"
}
```

---

## 🎯 Checklist

- [ ] Clé Unsplash ajoutée dans `.env.local`
- [ ] Dépendances installées (`axios`, `ts-node`)
- [ ] Script exécuté : `npm run fetch:images`
- [ ] Images présentes dans `public/images/`
- [ ] Application relancée : `npm run dev`
- [ ] Images visibles sur la page d'accueil
- [ ] Images visibles dans le dashboard
- [ ] Images visibles dans la galerie

---

## 🐛 Dépannage

### Erreur "UNSPLASH_ACCESS_KEY non définie"

**Solution** : Vérifier `.env.local` et redémarrer le terminal.

### Erreur 401 (Unauthorized)

**Solution** : Clé API invalide. Vérifier sur Unsplash Dashboard.

### Images ne s'affichent pas

**Solution** :
1. Vérifier que les fichiers existent dans `public/images/`
2. Redémarrer le serveur Next.js
3. Vider le cache du navigateur

### Erreur "Rate limit exceeded"

**Solution** : Attendre 1 heure ou utiliser une autre clé API.

---

## 📚 Ressources

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Unsplash Guidelines](https://unsplash.com/license)

---

## ⚖️ Attribution

Les images Unsplash sont **gratuites** mais nécessitent une attribution :

```tsx
<a href="https://unsplash.com">Photos par Unsplash</a>
```

Déjà inclus dans le footer de l'application.

---

**Créé pour Ia-Solution RDC** 🎨
