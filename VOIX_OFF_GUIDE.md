# 🔊 Guide d'utilisation - Voix Off IA

## Vue d'ensemble

La plateforme **Ia-Solution RDC** intègre une fonctionnalité de génération de voix off en français utilisant l'API Text-to-Speech d'OpenAI. Cette fonctionnalité permet aux étudiants d'**écouter** le contenu des modules au lieu de le lire.

---

## 🎯 Avantages

- ✅ **Accessibilité** : Permet aux étudiants malvoyants d'accéder au contenu
- ✅ **Apprentissage multimodal** : Combine lecture et écoute
- ✅ **Flexibilité** : Écouter en déplacement ou pendant d'autres activités
- ✅ **Voix naturelle** : Qualité professionnelle grâce à OpenAI
- ✅ **Mise en cache** : Les fichiers audio sont réutilisés (économie d'API)

---

## 🚀 Utilisation

### Sur le Dashboard

1. Accédez au **Dashboard** (`/dashboard`)
2. Cliquez sur le bouton **🔊** (violet) d'un module
3. Attendez la génération (quelques secondes)
4. Le lecteur audio apparaît automatiquement
5. Utilisez les contrôles : play/pause, volume, progression

### Sur une page Module

1. Ouvrez un module spécifique (`/modules/[id]`)
2. Cliquez sur **"Écouter le module"** (bouton violet)
3. Le lecteur audio s'affiche avec la voix off générée

---

## ⚙️ Configuration

### 1. Obtenir une clé API OpenAI

```bash
# Visitez : https://platform.openai.com/api-keys
# Créez une nouvelle clé API
# Copiez la clé (commence par sk-...)
```

### 2. Configurer le projet

Créez un fichier `.env.local` à la racine :

```env
OPENAI_API_KEY=sk-votre_cle_api_ici
```

### 3. Redémarrer le serveur

```bash
npm run dev
```

---

## 🎙️ Personnalisation de la voix

Modifiez le fichier `src/app/api/tts/route.ts` :

```typescript
const mp3 = await openai.audio.speech.create({
  model: 'tts-1',           // ou 'tts-1-hd' pour meilleure qualité
  voice: 'alloy',           // Changez ici
  input: text,
  speed: 1.0,               // 0.25 à 4.0
});
```

### Voix disponibles

| Voix | Caractéristiques |
|------|------------------|
| `alloy` | Neutre, claire |
| `echo` | Masculine, professionnelle |
| `fable` | Féminine, douce |
| `onyx` | Masculine, profonde |
| `nova` | Féminine, énergique |
| `shimmer` | Féminine, chaleureuse |

---

## 📁 Stockage des fichiers

Les fichiers audio générés sont sauvegardés dans :

```
public/audio/module_<id>.mp3
```

Exemples :
- `public/audio/module_data-science.mp3`
- `public/audio/module_deep-learning.mp3`
- `public/audio/module_ia-generative.mp3`

### Mise en cache

- ✅ Si le fichier existe déjà → **réutilisé** immédiatement
- ✅ Pas de régénération inutile
- ✅ Économie d'appels API OpenAI
- ✅ Chargement instantané

---

## 💰 Coûts OpenAI

### Tarification TTS (Text-to-Speech)

- **Modèle `tts-1`** : $0.015 / 1000 caractères
- **Modèle `tts-1-hd`** : $0.030 / 1000 caractères

### Exemple de calcul

Pour un module de **500 caractères** :
- Coût avec `tts-1` : **$0.0075** (~0.007€)
- Coût avec `tts-1-hd` : **$0.015** (~0.014€)

**Avec mise en cache** : coût unique par module !

---

## 🔧 Dépannage

### Erreur : "Clé API non configurée"

**Solution** : Vérifiez que `.env.local` contient `OPENAI_API_KEY`

```bash
# Vérifier le fichier
cat .env.local

# Redémarrer le serveur
npm run dev
```

### Erreur : "Cannot find module 'openai'"

**Solution** : Installez les dépendances

```bash
npm install openai
```

### Le fichier audio ne se charge pas

**Solution** : Vérifiez que le dossier existe

```bash
mkdir public/audio
```

### La voix n'est pas en français

**Note** : OpenAI TTS détecte automatiquement la langue du texte. Assurez-vous que le texte est bien en français.

---

## 🎵 Composant AudioPlayer

Le lecteur audio personnalisé offre :

- ▶️ **Play / Pause**
- 🔊 **Contrôle du volume**
- 🔇 **Mute / Unmute**
- ⏱️ **Barre de progression**
- ⏰ **Affichage du temps** (actuel / total)
- 🎨 **Design dark mode** intégré

### Utilisation dans votre code

```tsx
import AudioPlayer from '@/components/AudioPlayer';

<AudioPlayer 
  audioUrl="/audio/module_data-science.mp3" 
  title="Voix off - Data Science" 
/>
```

---

## 📊 Statistiques

Avec la mise en cache activée :

- **Première génération** : 2-5 secondes
- **Lectures suivantes** : instantané
- **Taille moyenne MP3** : 50-200 KB
- **Qualité audio** : 24 kHz, mono

---

## 🌐 API Endpoint

### POST `/api/tts`

**Request Body** :
```json
{
  "text": "Texte à convertir en audio",
  "moduleId": "data-science"
}
```

**Response Success** :
```json
{
  "success": true,
  "audioUrl": "/audio/module_data-science.mp3",
  "cached": false
}
```

**Response Error** :
```json
{
  "error": "Message d'erreur",
  "details": "Détails techniques"
}
```

---

## 📝 Notes importantes

1. **Sécurité** : Ne commitez JAMAIS `.env.local` dans Git
2. **Gitignore** : Les fichiers MP3 sont exclus automatiquement
3. **Production** : Configurez `OPENAI_API_KEY` dans les variables d'environnement de votre hébergeur
4. **Limite** : OpenAI a des limites de rate (requêtes/minute)

---

## 🎓 Exemple d'intégration

```typescript
const handleListen = async (moduleId: string, text: string) => {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, moduleId }),
    });

    const data = await response.json();

    if (data.success) {
      // Afficher le lecteur audio
      setAudioUrl(data.audioUrl);
    }
  } catch (error) {
    console.error('Erreur TTS:', error);
  }
};
```

---

## 🚀 Améliorations futures

- [ ] Support de plusieurs langues (anglais, lingala, swahili)
- [ ] Choix de la voix par l'utilisateur
- [ ] Téléchargement des fichiers audio
- [ ] Playlist automatique de modules
- [ ] Sous-titres synchronisés
- [ ] Mode hors ligne (PWA)

---

**Développé avec ❤️ pour Ia-Solution RDC**
