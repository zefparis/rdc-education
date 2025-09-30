# Scripts d'audit et maintenance

## 📋 Scripts disponibles

### 1. `audit-modules.ts` - Audit des modules pédagogiques

Script d'audit automatique qui vérifie l'intégrité de tous les modules de formation de la plateforme IA-Solution RDC.

#### Fonctionnalités

- ✅ Vérifie la présence des fichiers requis pour chaque module
- ✅ Vérifie que les modules sont référencés dans le dashboard
- ✅ Génère un rapport détaillé avec codes couleur
- ✅ Fournit un résumé statistique
- ✅ Code de sortie approprié pour CI/CD

#### Utilisation

```bash
# Exécuter l'audit
npm run audit:modules

# Ou directement avec ts-node
ts-node scripts/audit-modules.ts
```

#### Fichiers vérifiés par module

Pour chaque module dans `/public/modules/<slug>/`, le script vérifie :

1. **PDF pédagogique** (ou alternatives) :
   - `module_<slug>.pdf`
   - `<slug>-cours.md`
   - `<slug>.md`
   - `README.md`

2. **Notebook Jupyter** (ou alternatives) :
   - `module_<slug>.ipynb`
   - `module-<slug>-complet.ipynb`
   - `<slug>.ipynb`

3. **Fichier audio** (ou alternatives) :
   - `module_<slug>.mp3`
   - `audio-introduction.txt`
   - `<slug>-audio.txt`

4. **Référence dans le dashboard** :
   - Vérifie que le module est mentionné dans `src/app/dashboard/page.tsx`

#### Modules vérifiés

1. **Data Science** (`data-science`)
2. **Deep Learning** (`deep-learning`)
3. **IA Générative** (`ia-generative`)
4. **MLOps** (`mlops`)
5. **NLP** (`nlp`)
6. **Machine Learning Fondamental** (`ml-fondamental`)

#### Exemple de sortie

```
==================================================================
🔍 AUDIT DES MODULES PÉDAGOGIQUES - IA-Solution RDC
==================================================================

Vérification en cours...

==================================================================
📋 RÉSULTATS DÉTAILLÉS
==================================================================

📦 Module 1: Data Science (data-science)
──────────────────────────────────────────────────────────────────
  ✅ PDF: README.md
  ❌ Notebook: module_data-science.ipynb (manquant)
  ❌ Audio: module_data-science.mp3 (manquant)
  ✅ Référencé dans le dashboard
  ⚠️  Statut: INCOMPLET

📦 Module 2: Deep Learning (deep-learning)
──────────────────────────────────────────────────────────────────
  ✅ PDF: deep-learning-cours-partie1.md
  ✅ Notebook: module-deep-learning-complet.ipynb
  ✅ Audio: audio-introduction.txt
  ✅ Référencé dans le dashboard
  ✨ Statut: VALIDE

==================================================================
📊 RÉSUMÉ DE L'AUDIT
==================================================================

Modules valides:     5/6 (83%)

Fichiers présents:
  - PDF:             6/6
  - Notebooks:       5/6
  - Audio:           5/6
  - Dans dashboard:  6/6

⚠️  Modules incomplets:
  - Data Science: Notebook, Audio

==================================================================
⚠️  1 MODULE(S) À COMPLÉTER
==================================================================
```

#### Codes de sortie

- `0` : Tous les modules sont valides
- `1` : Un ou plusieurs modules sont incomplets

#### Intégration CI/CD

Le script peut être intégré dans un pipeline CI/CD :

```yaml
# .github/workflows/audit.yml
name: Audit Modules

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run audit:modules
```

#### Personnalisation

Pour ajouter un nouveau module, modifiez le tableau `modules` dans `audit-modules.ts` :

```typescript
const modules: Module[] = [
  // ... modules existants
  { id: '7', name: 'Nouveau Module', slug: 'nouveau-module' },
];
```

---

### 2. `fetch-images.ts` - Récupération d'images

Script pour télécharger des images depuis une source externe.

#### Utilisation

```bash
npm run fetch:images
```

---

## 🛠️ Développement

### Prérequis

- Node.js 18+
- TypeScript
- ts-node

### Structure

```
scripts/
├── audit-modules.ts    # Script d'audit des modules
├── fetch-images.ts     # Script de récupération d'images
└── README.md          # Cette documentation
```

### Ajouter un nouveau script

1. Créer le fichier TypeScript dans `scripts/`
2. Ajouter la commande dans `package.json` :

```json
{
  "scripts": {
    "mon-script": "ts-node scripts/mon-script.ts"
  }
}
```

---

## 📝 Notes

- Les scripts utilisent des codes couleur ANSI pour une meilleure lisibilité
- Les chemins sont relatifs au répertoire racine du projet
- Les fichiers alternatifs sont acceptés (ex: `.md` au lieu de `.pdf`)

---

## 🐛 Dépannage

### Erreur "Cannot find module"

```bash
npm install
```

### Erreur de permissions

```bash
chmod +x scripts/audit-modules.ts
```

### TypeScript errors

```bash
npm install --save-dev @types/node
```

---

## 📞 Support

Pour toute question ou problème, contactez l'équipe IA-Solution RDC.
