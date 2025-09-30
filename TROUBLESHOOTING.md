# 🔧 Dépannage - Ia-Solution RDC

## Problème : "Clé API OpenAI non configurée"

### Symptômes
- Message d'erreur : `Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans .env.local`
- La clé est pourtant présente dans `.env.local`
- L'audio ne se génère pas

### Causes possibles

#### 1. **Serveur non redémarré** ⭐ (Cause la plus fréquente)

Les variables d'environnement sont chargées **au démarrage du serveur**. Si vous modifiez `.env.local` ou les routes API, vous devez redémarrer.

**Solution** :
```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis relancer
npm run dev
```

#### 2. **Fichier `.env.local` mal placé**

Le fichier doit être à la **racine du projet**, pas dans un sous-dossier.

**Vérification** :
```
ia-solution-rdc/
├── .env.local          ✅ Bon emplacement
├── src/
│   └── .env.local      ❌ Mauvais emplacement
├── package.json
└── ...
```

#### 3. **Format incorrect dans `.env.local`**

**❌ Incorrect** :
```env
OPENAI_API_KEY = "sk-..."     # Pas d'espaces, pas de guillemets
OPENAI_API_KEY='sk-...'       # Pas de guillemets simples
```

**✅ Correct** :
```env
OPENAI_API_KEY=sk-proj-...
```

#### 4. **Clé API invalide ou expirée**

Vérifiez que votre clé est valide sur [OpenAI Platform](https://platform.openai.com/api-keys).

**Test de la clé** :
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer VOTRE_CLE_ICI"
```

#### 5. **Cache du navigateur**

Parfois le navigateur cache les erreurs.

**Solution** :
- Ouvrir les DevTools (F12)
- Onglet Network
- Cocher "Disable cache"
- Rafraîchir la page (Ctrl+F5)

---

## Vérification rapide

### Étape 1 : Vérifier le fichier `.env.local`

```bash
# Afficher le contenu (Windows)
type .env.local

# Afficher le contenu (Linux/Mac)
cat .env.local
```

Vous devriez voir :
```env
OPENAI_API_KEY=sk-proj-...
```

### Étape 2 : Vérifier que Next.js charge la variable

Créez un fichier de test `pages/api/test-env.ts` :

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasKey: !!process.env.OPENAI_API_KEY,
    keyLength: process.env.OPENAI_API_KEY?.length || 0,
    keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) || 'N/A',
  });
}
```

Visitez : `http://localhost:3000/api/test-env`

**Résultat attendu** :
```json
{
  "hasKey": true,
  "keyLength": 164,
  "keyPrefix": "sk-proj-ff"
}
```

### Étape 3 : Redémarrer complètement

```bash
# 1. Arrêter le serveur (Ctrl+C)

# 2. Nettoyer le cache Next.js
rmdir /s /q .next       # Windows
rm -rf .next            # Linux/Mac

# 3. Relancer
npm run dev
```

---

## Problème : Build échoue avec erreur OpenAI

### Symptôme
```
Error: The OPENAI_API_KEY environment variable is missing or empty
```

### Cause
OpenAI était instancié au niveau du module (avant notre correction).

### Solution
✅ **Déjà corrigé** : OpenAI est maintenant instancié **à l'intérieur des fonctions**, pas au niveau du module.

**Vérification** :

Dans `src/app/api/tts/route.ts` et `src/app/api/intro-audio/route.ts`, vous devriez voir :

```typescript
export async function POST(request: NextRequest) {
  // ... vérifications ...
  
  // Initialiser le client OpenAI (à l'intérieur de la fonction)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  // ... reste du code ...
}
```

**❌ Ancien code (incorrect)** :
```typescript
// Au niveau du module (s'exécute au build)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  // ...
}
```

---

## Problème : Audio ne se lit pas

### Symptômes
- Le fichier MP3 est généré dans `/public/audio/`
- Mais le lecteur ne fonctionne pas
- Erreur dans la console : `Failed to load resource`

### Solutions

#### 1. Vérifier que le fichier existe

```bash
# Windows
dir public\audio

# Linux/Mac
ls -la public/audio/
```

Vous devriez voir `intro.mp3` ou `module_*.mp3`.

#### 2. Vérifier les permissions

Le dossier `public/audio/` doit être accessible en lecture.

#### 3. Vider le cache du navigateur

```
Ctrl+Shift+Delete → Cocher "Images et fichiers en cache" → Effacer
```

#### 4. Tester l'URL directement

Ouvrir dans le navigateur :
```
http://localhost:3000/audio/intro.mp3
```

Si le fichier se télécharge ou se lit, le problème vient du composant React.

---

## Problème : "Module not found: Can't resolve 'openai'"

### Symptôme
```
Module not found: Can't resolve 'openai'
```

### Solution

```bash
# Installer le package
npm install openai

# Vérifier l'installation
npm list openai
```

Vous devriez voir :
```
ia-solution-rdc@0.1.0
└── openai@4.104.0
```

---

## Problème : Build lent ou échoue

### Solutions

#### 1. Nettoyer et réinstaller

```bash
# Supprimer node_modules et cache
rmdir /s /q node_modules .next    # Windows
rm -rf node_modules .next         # Linux/Mac

# Réinstaller
npm install

# Rebuild
npm run build
```

#### 2. Augmenter la mémoire Node.js

Dans `package.json` :

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

## Checklist de dépannage complète

- [ ] Le fichier `.env.local` existe à la racine
- [ ] La clé commence par `sk-proj-` ou `sk-`
- [ ] Pas d'espaces ni de guillemets dans `.env.local`
- [ ] Le serveur a été redémarré après modification
- [ ] Le cache `.next/` a été nettoyé
- [ ] Le package `openai` est installé (`npm list openai`)
- [ ] Le dossier `public/audio/` existe
- [ ] Les routes API sont dans `src/app/api/`
- [ ] Le navigateur n'a pas de cache actif

---

## Commandes utiles

```bash
# Vérifier les variables d'env
node check-env.js

# Nettoyer complètement
rmdir /s /q .next node_modules
npm install

# Redémarrer proprement
npm run dev

# Build production
npm run build

# Vérifier ESLint
npm run lint

# Lister les packages
npm list --depth=0
```

---

## Logs de débogage

### Activer les logs détaillés

Dans les routes API, ajoutez :

```typescript
console.log('🔑 OPENAI_API_KEY présente:', !!process.env.OPENAI_API_KEY);
console.log('📏 Longueur de la clé:', process.env.OPENAI_API_KEY?.length);
```

Regardez ensuite le terminal où tourne `npm run dev`.

---

## Besoin d'aide ?

1. **Vérifiez les logs** dans le terminal
2. **Ouvrez la console** du navigateur (F12)
3. **Testez l'API** directement avec curl ou Postman
4. **Consultez** la documentation OpenAI : https://platform.openai.com/docs

---

**Dernière mise à jour** : 2025-09-30
