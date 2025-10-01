# 🎙️ Génération des Fichiers Audio

Ce script permet de pré-générer tous les fichiers audio (voix-off) pour la plateforme Ia-Solution RDC.

## 🎯 Pourquoi pré-générer les audios ?

**Avant** : Les audios étaient générés à la demande via l'API OpenAI TTS
- ⏱️ Délai de 10-30 secondes à chaque clic
- 💰 Coût API à chaque génération
- 🐌 Expérience utilisateur lente

**Après** : Les audios sont pré-générés et servis comme fichiers statiques
- ⚡ Chargement instantané (< 1 seconde)
- 💰 Coût unique (génération une seule fois)
- 🚀 Expérience utilisateur fluide

## 📋 Prérequis

1. **Clé API OpenAI** configurée dans `.env.local` :
   ```env
   OPENAI_API_KEY=sk-...
   ```

2. **Dépendances installées** :
   ```bash
   npm install
   ```

## 🚀 Utilisation

### Générer tous les audios

```bash
npm run generate:audio
```

Ce script va :
1. ✅ Vérifier si les fichiers MP3 existent déjà (pas de régénération inutile)
2. 🎙️ Générer l'audio d'introduction de la page d'accueil
3. 🎙️ Générer les audios des 6 modules (Data Science, Deep Learning, etc.)
4. 💾 Sauvegarder les fichiers dans `public/audio/`

### Sortie attendue

```
🚀 Génération des fichiers audio pour Ia-Solution RDC

🎙️  intro: Génération de l'audio d'introduction...
✅ intro: Audio généré avec succès (245.67 KB)

🎙️  data-science: Génération de l'audio...
✅ data-science: Audio généré avec succès (89.23 KB)

🎙️  deep-learning: Génération de l'audio...
✅ deep-learning: Audio généré avec succès (156.45 KB)

...

✨ Génération terminée !
📁 Les fichiers MP3 sont disponibles dans public/audio/
```

## 📁 Fichiers générés

```
public/audio/
├── intro.mp3                      # Introduction page d'accueil
├── module_data-science.mp3        # Module Data Science
├── module_deep-learning.mp3       # Module Deep Learning
├── module_ia-generative.mp3       # Module IA Générative
├── module_mlops.mp3               # Module MLOps
├── module_nlp.mp3                 # Module NLP
└── module_ml-fondamental.mp3      # Module ML Fondamental
```

## ⚙️ Configuration TTS

Les audios sont générés avec les paramètres suivants :

- **Modèle** : `tts-1` (rapide, 3x plus rapide que `tts-1-hd`)
- **Voix** : `alloy` (meilleure prononciation française)
- **Vitesse** : `1.0` (naturelle)
- **Format** : MP3

### Pourquoi ces choix ?

| Paramètre | Valeur | Raison |
|-----------|--------|--------|
| Modèle | `tts-1` | 3x plus rapide, qualité suffisante pour voix-off |
| Voix | `alloy` | Prononciation française claire et naturelle |
| Vitesse | `1.0` | Rythme naturel, ni trop lent ni trop rapide |

## 🔄 Régénération

Pour régénérer un audio spécifique :

1. **Supprimer le fichier MP3** existant :
   ```bash
   rm public/audio/module_data-science.mp3
   ```

2. **Relancer le script** :
   ```bash
   npm run generate:audio
   ```

Le script détectera le fichier manquant et le régénérera.

## 📝 Modifier les textes

Les textes sources sont dans :
```
public/modules/<module-id>/audio-introduction.txt
```

Exemple pour Data Science :
```
public/modules/data-science/audio-introduction.txt
```

Après modification :
1. Supprimer le MP3 correspondant
2. Relancer `npm run generate:audio`

## 💡 Optimisations appliquées

### Avant (API à la demande)
```typescript
// Génération à chaque clic utilisateur
model: 'tts-1-hd',  // Lent mais haute qualité
voice: 'nova',       // Accent anglais sur certains mots
speed: 0.95,         // Trop lent
```

### Après (Fichiers statiques)
```typescript
// Génération unique, réutilisation infinie
model: 'tts-1',      // 3x plus rapide
voice: 'alloy',      // Meilleure prononciation FR
speed: 1.0,          // Vitesse naturelle
```

## 🎯 Impact Performance

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Temps de chargement | 10-30s | < 1s | **30x plus rapide** |
| Coût API | À chaque clic | Une seule fois | **Économie 99%** |
| Expérience utilisateur | 😞 Lente | 😊 Instantanée | ⭐⭐⭐⭐⭐ |

## 🚨 Troubleshooting

### Erreur : `OPENAI_API_KEY non définie`

**Solution** : Ajoutez votre clé OpenAI dans `.env.local` :
```env
OPENAI_API_KEY=sk-proj-...
```

### Erreur : `Fichier texte introuvable`

**Solution** : Vérifiez que le fichier texte existe :
```bash
ls public/modules/data-science/audio-introduction.txt
```

### Audio mal prononcé

**Solution** : Modifiez le texte dans le fichier `.txt`, supprimez le MP3, et régénérez.

## 📊 Coût estimé

Génération complète (7 audios) :
- **Modèle** : `tts-1`
- **Prix** : $15 / 1M caractères
- **Total** : ~3000 caractères × 7 = 21,000 caractères
- **Coût** : ~$0.32 (une seule fois)

## ✅ Checklist de déploiement

Avant de déployer en production :

- [ ] Générer tous les audios : `npm run generate:audio`
- [ ] Vérifier que tous les MP3 existent dans `public/audio/`
- [ ] Tester le chargement sur la page d'accueil
- [ ] Tester le chargement sur chaque page module
- [ ] Commit et push des fichiers MP3

```bash
git add public/audio/*.mp3
git commit -m "feat: add pre-generated audio files for instant loading"
git push
```

---

**Fait avec ❤️ pour les étudiants de la RDC**
