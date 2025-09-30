# 🚀 Guide de déploiement Railway - Étapes simples

## 📋 Prérequis

- Compte Railway : https://railway.app/
- Compte Cloudinary (gratuit) : https://cloudinary.com/
- Clé API OpenAI : https://platform.openai.com/api-keys

---

## 🔧 Étape 1 : Installer Cloudinary

```bash
npm install cloudinary
```

---

## 🔄 Étape 2 : Remplacer les routes API

### 2.1 Remplacer `intro-audio/route.ts`

```bash
# Windows
copy src\app\api\intro-audio\route.cloudinary.ts src\app\api\intro-audio\route.ts

# Linux/Mac
cp src/app/api/intro-audio/route.cloudinary.ts src/app/api/intro-audio/route.ts
```

### 2.2 Remplacer `tts/route.ts`

```bash
# Windows
copy src\app\api\tts\route.cloudinary.ts src\app\api\tts\route.ts

# Linux/Mac
cp src/app/api/tts/route.cloudinary.ts src/app/api/tts/route.ts
```

---

## ☁️ Étape 3 : Configurer Cloudinary

### 3.1 Créer un compte

1. Aller sur https://cloudinary.com/users/register/free
2. S'inscrire (gratuit)
3. Confirmer l'email

### 3.2 Récupérer les credentials

1. Dashboard Cloudinary
2. Cliquer sur **Product Environment Credentials**
3. Noter :
   - `Cloud Name`
   - `API Key`
   - `API Secret`

---

## 🚂 Étape 4 : Configurer Railway

### 4.1 Créer un projet Railway

1. Aller sur https://railway.app/
2. **New Project** → **Deploy from GitHub repo**
3. Connecter votre dépôt GitHub
4. Sélectionner le repo `ia-solution-rdc`

### 4.2 Ajouter les variables d'environnement

Dans Railway Dashboard → **Variables** → **Raw Editor**, coller :

```env
OPENAI_API_KEY=sk-proj-VOTRE_CLE_ICI
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
NODE_ENV=production
```

**⚠️ Remplacez** les valeurs par vos vraies clés !

### 4.3 Configurer le build

Railway détecte automatiquement Next.js, mais vérifiez dans **Settings** :

- **Build Command** : `npm run build`
- **Start Command** : `npm start`

---

## 📦 Étape 5 : Commit et déployer

```bash
# Ajouter les changements
git add .

# Commit
git commit -m "feat: Add Cloudinary storage for Railway deployment"

# Push vers GitHub
git push origin main
```

Railway déploiera automatiquement ! 🎉

---

## ✅ Étape 6 : Vérifier le déploiement

### 6.1 Voir les logs

Railway Dashboard → **Deployments** → **View Logs**

### 6.2 Tester l'application

1. Cliquer sur le lien de déploiement (ex: `https://ia-solution-rdc.up.railway.app`)
2. Aller sur la page d'accueil
3. Cliquer sur **"🔊 Écouter l'introduction"**
4. L'audio devrait se générer et se lire

### 6.3 Vérifier Cloudinary

1. Dashboard Cloudinary → **Media Library**
2. Dossier `ia-solution-rdc/`
3. Vous devriez voir `intro.mp3`

---

## 🐛 Dépannage

### Erreur 500 sur `/api/intro-audio`

**Vérifier** :
- Les variables Railway sont bien configurées
- `OPENAI_API_KEY` commence par `sk-proj-` ou `sk-`
- `CLOUDINARY_*` sont corrects

**Solution** :
```bash
# Tester les variables
curl https://votre-app.railway.app/api/debug
```

### Erreur "Cloudinary non configuré"

**Cause** : Variables manquantes

**Solution** : Ajouter dans Railway Variables :
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Build échoue

**Cause** : Package `cloudinary` manquant

**Solution** :
```bash
npm install cloudinary
git add package.json package-lock.json
git commit -m "deps: Add cloudinary"
git push
```

---

## 📊 Checklist complète

- [ ] Compte Cloudinary créé
- [ ] Credentials Cloudinary récupérés
- [ ] `npm install cloudinary` exécuté
- [ ] Routes API remplacées (`.cloudinary.ts` → `.ts`)
- [ ] Variables Railway configurées (4 variables)
- [ ] Code commité et pushé sur GitHub
- [ ] Railway a déployé automatiquement
- [ ] Logs Railway vérifiés (pas d'erreur)
- [ ] Application testée en ligne
- [ ] Audio fonctionne (génération + lecture)
- [ ] Fichiers visibles sur Cloudinary

---

## 💰 Coûts

### Cloudinary (Gratuit)
- ✅ 25 GB de stockage
- ✅ 25 GB de bande passante/mois
- ✅ Largement suffisant pour ce projet

### Railway
- ✅ $5 de crédit gratuit/mois
- ✅ Suffisant pour un projet éducatif

### OpenAI
- 💵 ~$0.024 par génération audio (TTS HD)
- 💵 Mise en cache = gratuit après première génération

---

## 🎯 Résumé en 3 commandes

```bash
# 1. Installer Cloudinary
npm install cloudinary

# 2. Remplacer les routes
copy src\app\api\intro-audio\route.cloudinary.ts src\app\api\intro-audio\route.ts
copy src\app\api\tts\route.cloudinary.ts src\app\api\tts\route.ts

# 3. Déployer
git add .
git commit -m "feat: Add Cloudinary for Railway"
git push
```

Puis configurer les variables sur Railway Dashboard.

---

**Votre application sera en ligne et fonctionnelle ! 🚀**
