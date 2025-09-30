# 🤖 Ia-Solution RDC

Plateforme éducative en Intelligence Artificielle pour les étudiants de la République Démocratique du Congo.  
**Filiale de Ia-Solution France**

## 🎯 À propos

Ia-Solution RDC est une plateforme d'apprentissage moderne dédiée à l'enseignement de l'Intelligence Artificielle en RDC. Notre mission est de rendre l'éducation en IA accessible à tous les étudiants congolais.

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** avec hero section, carrousel d'images et présentation
- 🎙️ **Introduction vocale** - Voix-off d'accueil en français (OpenAI TTS HD)
- 🔐 **Authentification** (connexion/inscription)
- 📚 **Dashboard** avec 6 modules d'apprentissage IA
- 📖 **Pages détaillées** pour chaque module
- 🔊 **Voix off IA** - Génération audio en français via OpenAI TTS
- 🎵 **Lecteur audio** intégré avec contrôles (play/pause, volume, progression)
- 🖼️ **Galerie d'images** avec modal d'agrandissement
- 🎠 **Carrousel interactif** avec auto-play
- 🌙 **Dark mode** par défaut
- 📱 **Responsive design** (mobile + desktop)
- ✨ **Animations fluides** avec Framer Motion

## 🛠️ Stack Technique

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **IA/TTS**: OpenAI API (Text-to-Speech)
- **Carrousel**: Embla Carousel React

## 📦 Installation

```bash
# Cloner le projet
git clone <repository-url>

# Installer les dépendances
npm install

# Configurer la clé API OpenAI
# Créer un fichier .env.local et ajouter :
# OPENAI_API_KEY=your_openai_api_key_here

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔑 Configuration OpenAI

Pour utiliser la fonctionnalité de voix off :

1. Créez un compte sur [OpenAI Platform](https://platform.openai.com/)
2. Générez une clé API
3. Ajoutez-la dans `.env.local` :
   ```
   OPENAI_API_KEY=sk-...
   ```
4. Les fichiers audio seront générés dans `/public/audio/`

## 📂 Structure du Projet

```
ia-solution-rdc/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tts/route.ts      # API Text-to-Speech OpenAI
│   │   ├── page.tsx              # Page d'accueil + carrousel
│   │   ├── auth/page.tsx         # Authentification
│   │   ├── dashboard/page.tsx    # Liste des modules + audio
│   │   ├── modules/[id]/page.tsx # Détail module + voix off
│   │   ├── galerie/page.tsx      # Galerie d'images + modal
│   │   ├── layout.tsx            # Layout principal
│   │   └── globals.css           # Styles globaux
│   └── components/
│       ├── Navbar.tsx            # Navigation
│       ├── Footer.tsx            # Pied de page
│       ├── ModuleCard.tsx        # Carte module + bouton écouter
│       ├── AuthForm.tsx          # Formulaire d'auth
│       ├── AudioPlayer.tsx       # Lecteur audio stylé
│       └── ImageCarousel.tsx     # Carrousel d'images
├── public/
│   ├── images/                   # Images de la galerie
│   └── audio/                    # Fichiers MP3 générés (TTS)
├── .env.local                    # Clé API OpenAI
└── package.json
```

## 🎓 Modules Disponibles

1. **Data Science** - Analyse de données et visualisation
2. **Deep Learning** - Réseaux de neurones profonds
3. **IA Générative** - GPT, DALL-E, Stable Diffusion
4. **MLOps** - Déploiement de modèles ML
5. **NLP** - Traitement du langage naturel
6. **Machine Learning Fondamental** - Bases du ML

## 🎨 Design

- **Couleurs principales**: Bleu (#3b82f6) et Vert émeraude (#10b981)
- **Background**: Dark (#0a0a0a)
- **Cards**: #1a1a1a avec bordures #2a2a2a
- **Animations**: Hover effects, fade-in, slide

## 🚀 Scripts Disponibles

```bash
npm run dev    # Serveur de développement
npm run build  # Build de production
npm start      # Serveur de production
npm run lint   # Linter ESLint
```

## 🔊 Fonctionnalité Voix Off (TTS)

La plateforme intègre la génération de voix off en français via l'API OpenAI :

### Comment ça marche ?

1. **Clic sur le bouton 🔊** dans un module
2. **Appel API** → `/api/tts` avec le texte du module
3. **Génération MP3** → OpenAI TTS (modèle `tts-1`, voix `alloy`)
4. **Sauvegarde** → Fichier stocké dans `/public/audio/module_<id>.mp3`
5. **Lecture** → Composant `AudioPlayer` avec contrôles complets

### Mise en cache

- Les fichiers audio générés sont **réutilisés** automatiquement
- Pas de régénération si le fichier existe déjà
- Économise les appels API et améliore les performances

### Personnalisation

Vous pouvez modifier la voix dans `src/app/api/tts/route.ts` :
- Voix disponibles : `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- Vitesse : ajustable avec le paramètre `speed` (0.25 à 4.0)

## 📝 Licence

© 2025 Ia-Solution RDC - Tous droits réservés  
Filiale de Ia-Solution France

## 🤝 Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter.

---

**Fait avec ❤️ pour les étudiants de la RDC**
