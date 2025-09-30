# 🚀 Démarrage Rapide - Images

## 📥 Télécharger les images en 3 étapes

### 1. Obtenir une clé Unsplash

```
https://unsplash.com/developers
```

1. Créer un compte
2. Créer une nouvelle application
3. Copier l'**Access Key**

### 2. Configurer `.env.local`

```env
UNSPLASH_ACCESS_KEY=votre_cle_ici
```

### 3. Télécharger les images

```bash
npm install
npm run fetch:images
```

---

## ✅ Vérification

Les images doivent apparaître dans :

```
public/
└── images/
    ├── education/
    │   ├── education_1.jpg
    │   ├── education_2.jpg
    │   └── ...
    ├── ai/
    ├── students/
    ├── africa/
    ├── data-science/
    └── deep-learning/
```

---

## 🎨 Utilisation

Les images sont automatiquement utilisées dans :

- **Page d'accueil** : Hero avec `education_1.jpg`
- **Dashboard** : Chaque module a son image
- **Galerie** : Toutes les 30 images

---

## 🔄 Retélécharger

Pour retélécharger toutes les images :

```bash
# Windows
rmdir /s /q public\images
npm run fetch:images

# Linux/Mac
rm -rf public/images
npm run fetch:images
```

---

## ⚠️ Problèmes courants

### Images ne s'affichent pas

**Solution** :
1. Vérifier que les fichiers existent dans `public/images/`
2. Redémarrer le serveur : `npm run dev`
3. Vider le cache du navigateur

### Erreur 401

**Solution** : Clé API invalide. Vérifier `.env.local`

### Erreur 403

**Solution** : Limite atteinte. Attendre 1 heure.

---

**C'est tout ! 🎉**
