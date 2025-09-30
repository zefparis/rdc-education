# 🚀 Quick Start - Ia-Solution RDC

## Installation en 3 minutes

### 1️⃣ Cloner et installer

```bash
# Cloner le projet
git clone <repository-url>
cd ia-solution-rdc

# Installer les dépendances
npm install
```

### 2️⃣ Configurer OpenAI (pour la voix off)

Créez un fichier `.env.local` à la racine :

```env
OPENAI_API_KEY=sk-votre_cle_api_ici
```

> 💡 **Obtenir une clé API** : https://platform.openai.com/api-keys

### 3️⃣ Lancer l'application

```bash
npm run dev
```

Ouvrez **http://localhost:3000** 🎉

---

## 🎯 Tester les fonctionnalités

### ✅ Page d'accueil
- Visitez `/`
- Admirez le carrousel auto-play
- Cliquez sur "Commencer maintenant"

### ✅ Dashboard
- Visitez `/dashboard`
- Cliquez sur **🔊** d'un module
- Écoutez la voix off générée !

### ✅ Module détaillé
- Cliquez sur "Voir" d'un module
- Testez "Écouter le module"
- Explorez le contenu

### ✅ Galerie
- Visitez `/galerie`
- Cliquez sur une image
- Modal s'ouvre en plein écran

---

## 📋 Checklist de vérification

- [ ] npm install terminé sans erreur
- [ ] `.env.local` créé avec clé OpenAI
- [ ] Serveur lancé sur port 3000
- [ ] Page d'accueil s'affiche
- [ ] Carrousel fonctionne
- [ ] Navigation entre pages OK
- [ ] Bouton 🔊 génère l'audio
- [ ] Lecteur audio fonctionne
- [ ] Modal galerie s'ouvre

---

## 🔧 Dépannage rapide

### Erreur : "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
PORT=3001 npm run dev
```

### Voix off ne fonctionne pas
- Vérifiez `.env.local`
- Redémarrez le serveur
- Vérifiez votre crédit OpenAI

---

## 📚 Documentation complète

- **README.md** - Vue d'ensemble
- **VOIX_OFF_GUIDE.md** - Guide TTS complet
- **FONCTIONNALITES.md** - Liste des features

---

## 🎓 Modules disponibles

1. **Data Science** - `/modules/data-science`
2. **Deep Learning** - `/modules/deep-learning`
3. **IA Générative** - `/modules/ia-generative`
4. **MLOps** - `/modules/mlops`
5. **NLP** - `/modules/nlp`
6. **ML Fondamental** - `/modules/ml-fundamentals`

---

## 💻 Commandes utiles

```bash
npm run dev      # Développement
npm run build    # Build production
npm start        # Serveur production
npm run lint     # Vérifier le code
```

---

## 🌟 Fonctionnalités clés

- 🔊 **Voix off IA** en français
- 🎠 **Carrousel** interactif
- 🎵 **Lecteur audio** stylé
- 🖼️ **Galerie** avec modal
- 📱 **Responsive** design
- 🌙 **Dark mode** par défaut

---

**Prêt à apprendre l'IA en RDC ! 🇨🇩**
