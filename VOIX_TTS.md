# 🎙️ Configuration des voix TTS - Ia-Solution RDC

## Voix OpenAI disponibles

OpenAI TTS propose 6 voix différentes. Voici les recommandations pour le **français** :

### 🌟 Recommandées pour le français

| Voix | Caractéristiques | Utilisation |
|------|------------------|-------------|
| **nova** ⭐ | Neutre, claire, professionnelle | **Recommandé** - Meilleure pour contenu éducatif |
| **shimmer** | Douce, chaleureuse | Bonne alternative, ton amical |
| **alloy** | Équilibrée, polyvalente | Correcte mais accent légèrement anglophone |

### ❌ Moins adaptées pour le français

| Voix | Caractéristiques | Raison |
|------|------------------|--------|
| **echo** | Masculine, profonde | Accent anglophone marqué |
| **fable** | Expressive, dramatique | Trop théâtrale pour éducatif |
| **onyx** | Masculine, grave | Accent anglophone fort |

---

## ✅ Configuration actuelle

### Introduction (page d'accueil)

**Fichier** : `src/app/api/intro-audio/route.ts`

```typescript
const mp3 = await openai.audio.speech.create({
  model: 'tts-1-hd',      // Haute qualité
  voice: 'nova',           // Voix claire et neutre
  input: INTRO_TEXT,
  speed: 0.92,            // Légèrement ralenti
});
```

### Modules (voix-off des cours)

**Fichier** : `src/app/api/tts/route.ts`

```typescript
const mp3 = await openai.audio.speech.create({
  model: 'tts-1-hd',      // Haute qualité
  voice: 'nova',           // Voix claire et neutre
  input: text,
  speed: 0.95,            // Légèrement ralenti
});
```

---

## 🎚️ Paramètres de configuration

### Modèles

| Modèle | Qualité | Coût | Utilisation |
|--------|---------|------|-------------|
| `tts-1` | Standard | $0.015/1K chars | Développement, tests |
| `tts-1-hd` ⭐ | Haute définition | $0.030/1K chars | **Production** |

### Vitesse (speed)

| Valeur | Effet | Recommandation |
|--------|-------|----------------|
| `0.25` | Très lent | Trop lent |
| `0.85` | Lent | Pour débutants |
| **`0.92`** ⭐ | Légèrement lent | **Intro (optimal)** |
| **`0.95`** ⭐ | Quasi normal | **Modules (optimal)** |
| `1.0` | Normal | Peut être rapide |
| `1.2` | Rapide | Trop rapide |
| `4.0` | Maximum | Incompréhensible |

---

## 🔧 Comment changer la voix

### Option 1 : Modifier le code (permanent)

#### Pour l'introduction

Éditer `src/app/api/intro-audio/route.ts` :

```typescript
voice: 'shimmer',  // Changer ici
```

#### Pour les modules

Éditer `src/app/api/tts/route.ts` :

```typescript
voice: 'shimmer',  // Changer ici
```

### Option 2 : Tester différentes voix

Créer un script de test `test-voices.js` :

```javascript
import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
const testText = "Bienvenue sur Ia-Solution RDC, la plateforme d'apprentissage de l'intelligence artificielle.";

for (const voice of voices) {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1-hd',
    voice: voice,
    input: testText,
  });
  
  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(`test-${voice}.mp3`, buffer);
  console.log(`✅ Généré: test-${voice}.mp3`);
}
```

Exécuter :
```bash
node test-voices.js
```

Écouter les fichiers générés et choisir la meilleure voix.

---

## 💡 Recommandations

### Pour du contenu éducatif en français

1. **Voix** : `nova` ou `shimmer`
2. **Modèle** : `tts-1-hd` (meilleure qualité)
3. **Vitesse** : `0.90` - `0.95` (compréhension optimale)

### Pour du contenu marketing

1. **Voix** : `shimmer` (plus chaleureuse)
2. **Modèle** : `tts-1-hd`
3. **Vitesse** : `1.0` (dynamique)

### Pour des tutoriels techniques

1. **Voix** : `nova` (claire et précise)
2. **Modèle** : `tts-1-hd`
3. **Vitesse** : `0.85` - `0.90` (bien articulé)

---

## 🌍 Support multilingue

OpenAI TTS supporte **plusieurs langues** avec les mêmes voix :

- 🇫🇷 Français
- 🇬🇧 Anglais
- 🇪🇸 Espagnol
- 🇩🇪 Allemand
- 🇮🇹 Italien
- 🇵🇹 Portugais
- 🇳🇱 Néerlandais
- 🇵🇱 Polonais
- 🇷🇺 Russe
- 🇯🇵 Japonais
- 🇨🇳 Chinois
- Et plus...

**Note** : La qualité varie selon la langue. Les voix sont optimisées pour l'anglais.

---

## 🔄 Régénérer l'audio avec nouvelle voix

### Sur Cloudinary

1. **Supprimer** l'ancien fichier sur Cloudinary Dashboard
2. **Recharger** la page
3. **Cliquer** sur "Écouter l'introduction"
4. L'audio sera régénéré avec la nouvelle voix

### En local

1. **Supprimer** les fichiers dans `public/audio/`
2. **Redémarrer** le serveur
3. **Tester** la nouvelle voix

---

## 📊 Comparaison des voix (français)

| Voix | Clarté | Accent | Naturel | Note globale |
|------|--------|--------|---------|--------------|
| **nova** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **9/10** ⭐ |
| **shimmer** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **8.5/10** |
| **alloy** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **7/10** |
| **echo** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | **5/10** |
| **fable** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | **5.5/10** |
| **onyx** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | **5/10** |

---

## 💰 Coûts

### Avec `tts-1-hd` (recommandé)

- **Introduction** (~800 chars) : $0.024 (~2 centimes)
- **Module** (~200 chars) : $0.006 (~0.6 centime)

### Avec `tts-1` (économique)

- **Introduction** : $0.012 (~1 centime)
- **Module** : $0.003 (~0.3 centime)

**Différence de qualité** : Perceptible, surtout pour contenu éducatif.

---

## 🎯 Résumé

✅ **Configuration actuelle optimale** :
- Voix : `nova`
- Modèle : `tts-1-hd`
- Vitesse : `0.92` (intro) / `0.95` (modules)

✅ **Meilleure alternative** :
- Voix : `shimmer` (plus chaleureuse)

❌ **À éviter** :
- `echo`, `fable`, `onyx` (accent anglophone trop marqué)

---

**Dernière mise à jour** : 2025-09-30
