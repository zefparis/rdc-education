# 🚂 Déploiement Railway - Ia-Solution RDC

## Problème : Fichiers audio perdus (404)

### Cause
Railway utilise un **système de fichiers éphémère**. Les fichiers créés dans `/public/audio/` sont **supprimés à chaque redéploiement ou redémarrage**.

### Symptômes
```
/audio/intro.mp3:1  Failed to load resource: 404
/api/intro-audio:1  Failed to load resource: 500
```

---

## ✅ Solutions

### **Option 1 : Cloudinary (Recommandé)** ⭐

Stockez les fichiers audio sur Cloudinary (gratuit jusqu'à 25GB).

#### Installation

```bash
npm install cloudinary
```

#### Configuration

Ajoutez dans `.env.local` et **Railway Variables** :

```env
OPENAI_API_KEY=sk-proj-...
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

#### Code modifié : `src/app/api/intro-audio/route.ts`

```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const INTRO_TEXT = `Bienvenue sur Ia-Solution RDC...`;

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API OpenAI non configurée' },
        { status: 500 }
      );
    }

    // Vérifier si l'audio existe déjà sur Cloudinary
    const publicId = 'ia-solution-rdc/intro';
    
    try {
      const existingFile = await cloudinary.api.resource(publicId, {
        resource_type: 'video', // MP3 = video dans Cloudinary
      });
      
      if (existingFile) {
        return NextResponse.json({
          success: true,
          audioUrl: existingFile.secure_url,
          cached: true,
        });
      }
    } catch {
      // Fichier n'existe pas, on va le créer
    }

    // Générer l'audio avec OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: 'alloy',
      input: INTRO_TEXT,
      speed: 0.95,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Upload vers Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          public_id: publicId,
          folder: 'ia-solution-rdc',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      audioUrl: uploadResult.secure_url,
      cached: false,
    });
  } catch (error) {
    console.error('Erreur:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: 'Erreur génération audio', details: errorMessage },
      { status: 500 }
    );
  }
}
```

---

### **Option 2 : Railway Volumes (Stockage persistant)**

Railway propose des volumes persistants (payant).

#### Configuration

1. **Dashboard Railway** → Votre projet
2. **Variables** → Add Variable
3. Ajouter : `RAILWAY_VOLUME_MOUNT_PATH=/data`
4. Créer un volume dans Settings

#### Code modifié

```typescript
// Utiliser le volume au lieu de public/
const audioDir = process.env.RAILWAY_VOLUME_MOUNT_PATH 
  ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'audio')
  : path.join(process.cwd(), 'public', 'audio');
```

**Inconvénient** : Les fichiers ne sont pas accessibles via URL publique.

---

### **Option 3 : Vercel Blob Storage**

Si vous déployez sur Vercel au lieu de Railway.

```bash
npm install @vercel/blob
```

```typescript
import { put } from '@vercel/blob';

const blob = await put('intro.mp3', buffer, {
  access: 'public',
});

return NextResponse.json({
  audioUrl: blob.url,
});
```

---

### **Option 4 : AWS S3 / Google Cloud Storage**

Pour une solution professionnelle.

```bash
npm install @aws-sdk/client-s3
```

---

## 🚀 Configuration Railway

### Variables d'environnement

Dans **Railway Dashboard** → **Variables** :

```env
OPENAI_API_KEY=sk-proj-...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=production
```

### Build Command

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

### Procfile (optionnel)

Créer `Procfile` à la racine :

```
web: npm start
```

---

## 🔍 Debugging sur Railway

### Voir les logs

```bash
railway logs
```

Ou dans le Dashboard : **Deployments** → **View Logs**

### Tester les variables d'env

Créez `src/app/api/debug/route.ts` :

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
  });
}
```

Visitez : `https://votre-app.railway.app/api/debug`

---

## 📝 Checklist déploiement

- [ ] Variables d'environnement configurées sur Railway
- [ ] `OPENAI_API_KEY` ajoutée
- [ ] Solution de stockage choisie (Cloudinary recommandé)
- [ ] Code modifié pour utiliser le stockage externe
- [ ] `npm install cloudinary` (si Cloudinary)
- [ ] Build réussi sur Railway
- [ ] Logs vérifiés (pas d'erreur 500)
- [ ] Test de l'API : `/api/intro-audio`
- [ ] Test du frontend : bouton "Écouter l'introduction"

---

## 🎯 Solution rapide (Cloudinary)

### 1. Créer un compte Cloudinary

https://cloudinary.com/users/register/free

### 2. Récupérer les credentials

Dashboard → **Product Environment Credentials**

### 3. Ajouter sur Railway

**Variables** :
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 4. Installer le package

```bash
npm install cloudinary
```

### 5. Modifier les routes API

Utilisez le code fourni ci-dessus.

### 6. Commit et push

```bash
git add .
git commit -m "feat: Add Cloudinary storage for audio files"
git push
```

Railway redéploiera automatiquement.

---

## ⚠️ Important

**Ne commitez JAMAIS vos clés API dans Git !**

Utilisez toujours les variables d'environnement :
- Localement : `.env.local` (dans `.gitignore`)
- Railway : Dashboard Variables

---

## 🆘 Erreurs courantes

### 500 sur `/api/intro-audio`

**Cause** : Clé OpenAI manquante ou invalide

**Solution** : Vérifier les variables Railway

### 404 sur `/audio/intro.mp3`

**Cause** : Fichier non persistant

**Solution** : Utiliser Cloudinary (Option 1)

### Build échoue

**Cause** : Package manquant

**Solution** :
```bash
npm install cloudinary
git add package.json package-lock.json
git commit -m "deps: Add cloudinary"
git push
```

---

**Recommandation** : Utilisez **Cloudinary** (Option 1) pour une solution simple, gratuite et fiable. ✅
