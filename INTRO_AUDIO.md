# 🔊 Audio d'Introduction - Ia-Solution RDC

## Vue d'ensemble

La page d'accueil intègre maintenant une **voix-off d'introduction** en français qui présente la plateforme Ia-Solution RDC et sa mission.

---

## 🎯 Fonctionnalités

### Génération automatique
- **API Endpoint** : `/api/intro-audio`
- **Modèle OpenAI** : `tts-1-hd` (haute qualité)
- **Voix** : `alloy` (voix française claire et professionnelle)
- **Vitesse** : 0.95 (légèrement ralentie pour meilleure compréhension)
- **Fichier généré** : `/public/audio/intro.mp3`

### Mise en cache intelligente
- ✅ Vérifie si `intro.mp3` existe déjà
- ✅ Ne régénère pas si le fichier est présent
- ✅ Économise les appels API OpenAI
- ✅ Chargement instantané après première génération

---

## 📝 Texte de l'introduction

```
Bienvenue sur Ia-Solution RDC, la première plateforme en République Démocratique du Congo dédiée à l'apprentissage de l'intelligence artificielle.

Notre mission est simple : rendre l'IA accessible à tous les étudiants, enseignants et professionnels congolais. L'intelligence artificielle n'est pas seulement une technologie du futur, c'est déjà une réalité qui transforme l'agriculture, la santé, la finance et l'éducation dans le monde entier.

Ici, vous trouverez des modules de formation clairs et adaptés à votre rythme. Vous n'avez pas besoin d'être un expert en informatique pour commencer. Pas à pas, vous découvrirez les bases de la science des données, du machine learning, du deep learning et des applications concrètes de l'IA dans notre pays.

Que vous soyez étudiant, entrepreneur ou simplement curieux, Ia-Solution RDC est votre point d'entrée vers le monde passionnant de l'intelligence artificielle. Ensemble, nous pouvons former une nouvelle génération de talents capables de bâtir l'avenir numérique de la RDC.

Explorez, apprenez, et faites partie du changement avec Ia-Solution RDC.
```

**Durée approximative** : ~1 minute 30 secondes

---

## 🎨 Interface utilisateur

### Composant IntroAudioPlayer

Situé dans `src/components/IntroAudioPlayer.tsx`

**Fonctionnalités** :
- ✅ Bouton principal "🔊 Écouter l'introduction"
- ✅ Gradient violet-bleu avec effet hover
- ✅ Animation de chargement pendant la génération
- ✅ Mini-player qui apparaît pendant la lecture
- ✅ Contrôles play/pause
- ✅ Gestion des erreurs avec messages en français
- ✅ Design dark mode cohérent
- ✅ Responsive (mobile + desktop)

### États du bouton

1. **Initial** : "🔊 Écouter l'introduction"
2. **Génération** : "Génération de l'audio..." (spinner)
3. **Chargement** : "Chargement..." (spinner)
4. **Lecture** : "Pause" (icône pause)
5. **Pause** : "🔊 Écouter l'introduction" (icône volume)

---

## 🔧 Intégration

### Page d'accueil

Le composant est intégré dans `src/app/page.tsx` :

```tsx
import IntroAudioPlayer from '@/components/IntroAudioPlayer';

// Dans le JSX, après le titre et slogan :
<IntroAudioPlayer />
```

**Position** : Entre le slogan et les boutons CTA (Commencer maintenant / Explorer)

---

## 🚀 Utilisation

### Pour l'utilisateur

1. Ouvrir la page d'accueil (`/`)
2. Cliquer sur **"🔊 Écouter l'introduction"**
3. L'audio se génère automatiquement (première fois uniquement)
4. La lecture démarre
5. Mini-player apparaît avec contrôles

### Pour le développeur

#### Générer manuellement l'audio

Visitez : `http://localhost:3000/api/intro-audio`

Réponse JSON :
```json
{
  "success": true,
  "audioUrl": "/audio/intro.mp3",
  "cached": false,
  "message": "Audio d'introduction généré avec succès"
}
```

#### Vérifier si l'audio existe

```bash
ls public/audio/intro.mp3
```

---

## ⚙️ Configuration

### Prérequis

1. **Clé API OpenAI** dans `.env.local` :
   ```env
   OPENAI_API_KEY=sk-votre_cle_ici
   ```

2. **Dossier audio** créé :
   ```bash
   mkdir -p public/audio
   ```

### Personnalisation

#### Changer la voix

Dans `src/app/api/intro-audio/route.ts` :

```typescript
voice: 'alloy', // Options: alloy, echo, fable, onyx, nova, shimmer
```

#### Modifier la vitesse

```typescript
speed: 0.95, // 0.25 à 4.0
```

#### Améliorer la qualité

```typescript
model: 'tts-1-hd', // Meilleure qualité (plus cher)
```

---

## 💰 Coûts

### Tarification OpenAI TTS

- **Modèle `tts-1`** : $0.015 / 1000 caractères
- **Modèle `tts-1-hd`** : $0.030 / 1000 caractères

### Calcul pour l'intro

- **Texte** : ~800 caractères
- **Coût avec `tts-1-hd`** : ~$0.024 (~0.022€)
- **Génération** : Une seule fois (mise en cache)

---

## 🔍 Dépannage

### L'audio ne se génère pas

**Vérifications** :
1. Clé API OpenAI configurée dans `.env.local`
2. Serveur redémarré après ajout de la clé
3. Crédit OpenAI disponible
4. Connexion internet active

### Erreur "Clé API non configurée"

**Solution** :
```bash
# Créer .env.local
echo "OPENAI_API_KEY=sk-votre_cle" > .env.local

# Redémarrer
npm run dev
```

### L'audio ne se lit pas

**Solutions** :
1. Vérifier que le fichier existe : `public/audio/intro.mp3`
2. Vider le cache du navigateur
3. Tester dans un autre navigateur
4. Vérifier la console pour les erreurs

### Régénérer l'audio

```bash
# Supprimer le fichier existant
rm public/audio/intro.mp3

# Recharger la page et cliquer sur le bouton
```

---

## 📊 Statistiques

- **Durée audio** : ~90 secondes
- **Taille fichier** : ~1.5 MB (MP3)
- **Qualité** : 24 kHz, mono
- **Format** : MP3
- **Compression** : Optimisée pour le web

---

## 🎓 Avantages pédagogiques

1. **Accessibilité** : Permet aux malvoyants d'accéder au contenu
2. **Engagement** : Capte l'attention des visiteurs
3. **Multimodal** : Combine lecture et écoute
4. **Professionnel** : Voix de qualité studio
5. **Inclusif** : Adapté à différents styles d'apprentissage

---

## 🔄 Mises à jour futures

- [ ] Choix de la voix par l'utilisateur
- [ ] Sous-titres synchronisés
- [ ] Téléchargement de l'audio
- [ ] Versions multilingues (anglais, lingala, swahili)
- [ ] Playlist automatique avec les modules

---

**Développé avec ❤️ pour Ia-Solution RDC**
