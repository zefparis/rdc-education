# 🔍 Guide d'utilisation du script d'audit des modules

## Vue d'ensemble

Le script `audit-modules.ts` est un outil automatique qui vérifie l'intégrité et la complétude de tous les modules pédagogiques de la plateforme IA-Solution RDC.

---

## 🚀 Utilisation rapide

### Commande simple

```bash
npm run audit:modules
```

### Commande directe

```bash
ts-node scripts/audit-modules.ts
```

---

## 📋 Ce que le script vérifie

### Pour chaque module

Le script vérifie 4 éléments essentiels :

#### 1. **PDF pédagogique** 📄
Fichiers acceptés (par ordre de priorité) :
- `module_<slug>.pdf`
- `<slug>-cours.md`
- `<slug>.md`
- `README.md`

#### 2. **Notebook Jupyter** 📓
Fichiers acceptés :
- `module_<slug>.ipynb`
- `module-<slug>-complet.ipynb`
- `<slug>.ipynb`

#### 3. **Fichier audio** 🔊
Fichiers acceptés :
- `module_<slug>.mp3`
- `audio-introduction.txt`
- `<slug>-audio.txt`

#### 4. **Référence dans le dashboard** 🎯
Vérifie que le module est mentionné dans `src/app/dashboard/page.tsx`

---

## 📊 Interprétation des résultats

### Symboles utilisés

- ✅ **Vert** : Fichier présent et valide
- ❌ **Rouge** : Fichier manquant
- ⚠️ **Jaune** : Module incomplet
- ✨ **Vert** : Module valide et complet

### Exemple de sortie

```
📦 Module 2: Deep Learning (deep-learning)
──────────────────────────────────────────────────────────────────
  ✅ PDF: deep-learning-cours-partie1.md
  ✅ Notebook: module-deep-learning-complet.ipynb
  ✅ Audio: audio-introduction.txt
  ✅ Référencé dans le dashboard
  ✨ Statut: VALIDE
```

### Résumé final

```
📊 RÉSUMÉ DE L'AUDIT

Modules valides:     5/6 (83%)

Fichiers présents:
  - PDF:             6/6
  - Notebooks:       5/6
  - Audio:           5/6
  - Dans dashboard:  6/6

⚠️  Modules incomplets:
  - Data Science: Notebook, Audio
```

---

## 🔧 Actions correctives

### Si un fichier est manquant

#### PDF manquant
```bash
# Option 1 : Créer le PDF
# Convertir le Markdown en PDF avec pandoc
pandoc module-cours.md -o module_<slug>.pdf

# Option 2 : Créer un fichier Markdown
# Le script accepte les .md comme alternative
```

#### Notebook manquant
```bash
# Créer le notebook dans le bon dossier
# public/modules/<slug>/module-<slug>-complet.ipynb
```

#### Audio manquant
```bash
# Option 1 : Créer le MP3
# Utiliser un service TTS pour générer l'audio

# Option 2 : Créer le script texte
# Le script accepte audio-introduction.txt comme alternative
```

#### Module non référencé dans le dashboard
```typescript
// Ajouter le module dans src/app/dashboard/page.tsx
const modules = [
  // ... autres modules
  {
    id: 'nouveau-module',
    title: 'Nouveau Module',
    // ...
  }
];
```

---

## 🎯 Modules actuels

| # | Module | Slug | Statut attendu |
|---|--------|------|----------------|
| 1 | Data Science | `data-science` | ✅ |
| 2 | Deep Learning | `deep-learning` | ✅ |
| 3 | IA Générative | `ia-generative` | ✅ |
| 4 | MLOps | `mlops` | ✅ |
| 5 | NLP | `nlp` | ✅ |
| 6 | ML Fondamental | `ml-fondamental` | ✅ |

---

## 🔄 Workflow recommandé

### Avant un commit

```bash
# 1. Vérifier l'état des modules
npm run audit:modules

# 2. Corriger les problèmes identifiés

# 3. Re-vérifier
npm run audit:modules

# 4. Commit si tout est OK (code de sortie 0)
git add .
git commit -m "feat: ajout module complet"
```

### Avant un déploiement

```bash
# Audit complet
npm run audit:modules

# Si succès (exit code 0), déployer
npm run build
```

---

## 🤖 Intégration CI/CD

### GitHub Actions

Créer `.github/workflows/audit-modules.yml` :

```yaml
name: Audit Modules Pédagogiques

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  audit:
    name: Vérifier intégrité des modules
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run audit
        run: npm run audit:modules
      
      - name: Upload audit report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: audit-report
          path: audit-report.txt
```

### GitLab CI

Ajouter dans `.gitlab-ci.yml` :

```yaml
audit-modules:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run audit:modules
  only:
    - main
    - develop
```

---

## 📝 Personnalisation du script

### Ajouter un nouveau module

Éditer `scripts/audit-modules.ts` :

```typescript
const modules: Module[] = [
  // ... modules existants
  { 
    id: '7', 
    name: 'Computer Vision', 
    slug: 'computer-vision' 
  },
];
```

### Modifier les fichiers acceptés

```typescript
const alternativeFiles = {
  pdf: (slug: string) => [
    `${slug}-cours.md`, 
    `${slug}.md`, 
    'README.md',
    'cours.pdf', // Ajouter une alternative
  ],
  // ...
};
```

### Désactiver une vérification

Commenter la ligne correspondante dans la fonction `auditModuleFiles` :

```typescript
const valid = 
  files.pdf.exists && 
  files.notebook.exists && 
  // files.audio.exists &&  // Désactiver la vérification audio
  inDashboard;
```

---

## 🐛 Dépannage

### Erreur : "Cannot find module 'fs'"

```bash
npm install --save-dev @types/node
```

### Erreur : "ts-node: command not found"

```bash
npm install --save-dev ts-node typescript
```

### Erreur : "Permission denied"

```bash
chmod +x scripts/audit-modules.ts
```

### Le script ne trouve pas les fichiers

Vérifier que vous êtes à la racine du projet :

```bash
pwd  # Doit afficher .../ia-solution-rdc
ls public/modules  # Doit lister les modules
```

---

## 💡 Bonnes pratiques

### 1. Exécuter avant chaque commit
```bash
# Ajouter un pre-commit hook
echo "npm run audit:modules" > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### 2. Documenter les exceptions
Si un module ne peut pas avoir certains fichiers, documenter pourquoi dans le README du module.

### 3. Maintenir la cohérence
Utiliser les mêmes conventions de nommage pour tous les modules.

### 4. Automatiser les corrections
Créer des scripts pour générer automatiquement les fichiers manquants.

---

## 📞 Support

### Problèmes courants

1. **Module marqué comme incomplet alors que les fichiers existent**
   - Vérifier les noms de fichiers (sensible à la casse)
   - Vérifier l'emplacement (doit être dans `public/modules/<slug>/`)

2. **Dashboard reference non détectée**
   - Vérifier que le slug ou le nom du module apparaît dans `dashboard/page.tsx`
   - Vérifier l'orthographe exacte

3. **Fichiers alternatifs non reconnus**
   - Vérifier la liste des alternatives acceptées dans le script
   - Ajouter votre format si nécessaire

### Contact

Pour toute question ou amélioration :
- **Email** : support@ia-solution-rdc.cd
- **GitHub Issues** : github.com/ia-solution-rdc/issues

---

## 📈 Évolutions futures

### Fonctionnalités prévues

- [ ] Export du rapport en JSON/HTML
- [ ] Vérification de la taille des fichiers
- [ ] Validation du contenu des notebooks
- [ ] Vérification des images de modules
- [ ] Génération automatique de fichiers manquants
- [ ] Intégration avec un système de notification

---

**Dernière mise à jour** : 30 septembre 2025  
**Version** : 1.0.0  
**Auteur** : Équipe IA-Solution RDC
