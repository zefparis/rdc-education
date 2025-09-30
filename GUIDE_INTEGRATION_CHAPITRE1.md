# Guide d'intégration - Chapitre 1 : Introduction à Python

Ce guide explique comment intégrer le Chapitre 1 du module Data Science dans la plateforme RDC Education.

---

## 📁 Fichiers créés

Tous les fichiers ont été créés dans : `public/modules/data-science/`

```
public/modules/data-science/
├── chapitre-1-intro-python.ipynb      # Notebook Jupyter interactif
├── chapitre-1-intro-python.md         # Document pédagogique (PDF)
├── chapitre-1-audio-script.txt        # Script pour TTS
└── README.md                          # Documentation du module
```

---

## 🔧 Intégration dans la plateforme

### 1. Mise à jour du module Data Science

Le module Data Science est déjà défini dans `src/app/dashboard/page.tsx`. Il faut maintenant ajouter le contenu détaillé du Chapitre 1.

#### Fichier à modifier : `src/app/modules/[id]/page.tsx`

Mettre à jour la section `content` du module `data-science` :

```typescript
'data-science': {
  title: 'Data Science',
  description: 'Maîtrisez l\'analyse de données, la visualisation et les statistiques pour extraire des insights précieux de vos données.',
  level: 'Débutant',
  duration: '8 semaines',
  students: 450,
  content: [
    'Introduction à Python pour Data Science',  // ← Chapitre 1
    'Manipulation de données avec Pandas',
    'Visualisation avec Matplotlib et Seaborn',
    'Statistiques descriptives et inférentielles',
    'Nettoyage et préparation des données',
    'Analyse exploratoire des données (EDA)',
    'Introduction au Machine Learning',
    'Projet final : Analyse de données réelles',
  ],
},
```

### 2. Ajouter les liens de téléchargement

#### Option A : Modifier le bouton "Télécharger le module"

Dans `src/app/modules/[id]/page.tsx`, ligne 164-167, ajouter un lien fonctionnel :

```typescript
<a 
  href="/modules/data-science/chapitre-1-intro-python.ipynb"
  download
  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-600/50"
>
  <Download size={20} />
  <span>Télécharger le notebook</span>
</a>
```

#### Option B : Créer une page dédiée au chapitre

Créer un nouveau fichier : `src/app/modules/data-science/chapitre-1/page.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Code, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer';

export default function Chapitre1Page() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAudio = async () => {
    setIsGenerating(true);
    
    try {
      // Lire le script audio
      const response = await fetch('/modules/data-science/chapitre-1-audio-script.txt');
      const text = await response.text();
      
      // Générer l'audio avec l'API TTS
      const ttsResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          moduleId: 'data-science-chapitre-1' 
        }),
      });
      
      const data = await ttsResponse.json();
      
      if (data.success) {
        setAudioUrl(data.audioUrl);
      } else {
        alert(data.error || 'Erreur lors de la génération audio');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération audio');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/modules/data-science"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Retour au module Data Science
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-blue-500 font-semibold">Chapitre 1</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">8 sections</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">4-6 heures</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Introduction à Python pour la Data Science
          </h1>
          
          <p className="text-gray-400 text-lg mb-6">
            Apprenez les bases de Python avec des exemples concrets adaptés au contexte congolais. 
            Variables, boucles, fonctions et plus encore !
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleGenerateAudio}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-600/50"
            >
              <Volume2 size={20} />
              <span>{isGenerating ? 'Génération...' : 'Écouter l\'intro'}</span>
            </button>
            
            <a
              href="/modules/data-science/chapitre-1-intro-python.ipynb"
              download
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-600/50"
            >
              <Code size={20} />
              <span>Télécharger Notebook</span>
            </a>
            
            <a
              href="/modules/data-science/chapitre-1-intro-python.md"
              download
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-emerald-600/50"
            >
              <FileText size={20} />
              <span>Télécharger PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Audio Player */}
        {audioUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer 
              audioUrl={audioUrl} 
              title="Introduction - Chapitre 1" 
            />
          </motion.div>
        )}

        {/* Content Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            🎯 Objectifs pédagogiques
          </h2>
          
          <div className="space-y-3">
            {[
              'Comprendre ce qu\'est Python et pourquoi il est utilisé en Data Science',
              'Manipuler les variables et les types de données de base',
              'Utiliser les structures de contrôle (boucles, conditions)',
              'Créer et utiliser des fonctions simples',
              'Appliquer ces concepts à des exemples concrets du contexte congolais'
            ].map((objectif, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-gray-300">{objectif}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            📚 Contenu du chapitre
          </h2>
          
          <div className="space-y-4">
            {[
              { num: 1, title: 'Qu\'est-ce que Python ?', duration: '15 min' },
              { num: 2, title: 'Premiers pas avec Python', duration: '30 min' },
              { num: 3, title: 'Opérations mathématiques', duration: '20 min' },
              { num: 4, title: 'Les listes', duration: '25 min' },
              { num: 5, title: 'Les conditions', duration: '30 min' },
              { num: 6, title: 'Les boucles', duration: '35 min' },
              { num: 7, title: 'Les fonctions', duration: '40 min' },
              { num: 8, title: 'Exercices pratiques', duration: '90 min' }
            ].map((section) => (
              <div 
                key={section.num}
                className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg hover:bg-[#151515] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-500 font-bold">{section.num}</span>
                  </div>
                  <span className="text-gray-300 font-medium">{section.title}</span>
                </div>
                <span className="text-gray-500 text-sm">{section.duration}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Practical Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            💡 Exemples pratiques (contexte RDC)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '📊', title: 'Éducation', desc: 'Calcul de moyennes scolaires' },
              { icon: '💰', title: 'Commerce', desc: 'Prix avec réduction au marché' },
              { icon: '🌾', title: 'Agriculture', desc: 'Production de manioc' },
              { icon: '🌡️', title: 'Météo', desc: 'Températures à Kinshasa' },
              { icon: '💱', title: 'Finance', desc: 'Conversion FC ↔ USD' },
              { icon: '🏥', title: 'Santé', desc: 'Calcul d\'IMC' }
            ].map((example, index) => (
              <div 
                key={index}
                className="p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{example.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{example.title}</h3>
                    <p className="text-gray-400 text-sm">{example.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

### 3. Générer l'audio automatiquement

L'audio peut être généré de deux façons :

#### Option A : Génération à la demande (implémenté ci-dessus)
L'utilisateur clique sur "Écouter l'intro" et l'audio est généré en temps réel.

#### Option B : Pré-génération
Créer un script pour générer l'audio à l'avance :

```typescript
// scripts/generate-chapter-audio.ts
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateChapterAudio() {
  const scriptPath = path.join(
    process.cwd(), 
    'public/modules/data-science/chapitre-1-audio-script.txt'
  );
  
  const text = fs.readFileSync(scriptPath, 'utf-8');
  
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text,
  });
  
  const buffer = Buffer.from(await mp3.arrayBuffer());
  const outputPath = path.join(
    process.cwd(),
    'public/audio/data-science-chapitre-1.mp3'
  );
  
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Audio généré:', outputPath);
}

generateChapterAudio();
```

Exécuter avec :
```bash
npx ts-node scripts/generate-chapter-audio.ts
```

### 4. Conversion Markdown → PDF

Pour générer le PDF automatiquement, plusieurs options :

#### Option A : Pandoc (ligne de commande)
```bash
pandoc public/modules/data-science/chapitre-1-intro-python.md \
  -o public/modules/data-science/chapitre-1-intro-python.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=2cm \
  -V fontsize=11pt
```

#### Option B : Script Node.js avec markdown-pdf
```bash
npm install markdown-pdf
```

```javascript
// scripts/generate-pdf.js
const markdownpdf = require('markdown-pdf');
const fs = require('fs');

markdownpdf()
  .from('public/modules/data-science/chapitre-1-intro-python.md')
  .to('public/modules/data-science/chapitre-1-intro-python.pdf', 
    () => console.log('✅ PDF généré')
  );
```

#### Option C : Intégration dans l'interface
Ajouter un bouton "Voir en ligne" qui affiche le Markdown formaté dans une modal.

---

## 🎨 Améliorations suggérées

### 1. Système de progression
Ajouter un système pour suivre la progression de l'étudiant :

```typescript
// types/progress.ts
interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  sectionsCompleted: number[];
  exercisesCompleted: number[];
  lastAccessed: Date;
}
```

### 2. Quiz interactif
Créer des quiz pour chaque section :

```typescript
const quizQuestions = [
  {
    question: "Qu'est-ce qu'une variable en Python ?",
    options: [
      "Une boîte qui contient une valeur",
      "Un type de boucle",
      "Une fonction",
      "Un opérateur"
    ],
    correctAnswer: 0
  },
  // ...
];
```

### 3. Éditeur de code intégré
Utiliser Monaco Editor ou CodeMirror pour permettre aux étudiants de coder directement dans le navigateur.

```bash
npm install @monaco-editor/react
```

### 4. Système de badges
Récompenser les étudiants qui terminent les chapitres :

```typescript
const badges = [
  { id: 'python-basics', name: 'Bases de Python', icon: '🐍' },
  { id: 'first-function', name: 'Première fonction', icon: '⚡' },
  { id: 'all-exercises', name: 'Tous les exercices', icon: '🏆' },
];
```

---

## 📊 Métriques à suivre

Pour améliorer le contenu, suivre :

1. **Engagement**
   - Nombre de téléchargements du notebook
   - Temps passé sur le chapitre
   - Taux de complétion

2. **Difficultés**
   - Exercices avec le plus d'échecs
   - Sections les plus consultées
   - Questions fréquentes

3. **Satisfaction**
   - Note du chapitre (1-5 étoiles)
   - Commentaires des étudiants
   - Suggestions d'amélioration

---

## ✅ Checklist d'intégration

- [ ] Fichiers copiés dans `public/modules/data-science/`
- [ ] Module Data Science mis à jour avec le contenu du Chapitre 1
- [ ] Page dédiée créée (optionnel)
- [ ] Boutons de téléchargement fonctionnels
- [ ] Génération audio testée
- [ ] PDF généré (optionnel)
- [ ] Tests sur mobile et desktop
- [ ] Documentation mise à jour
- [ ] Annonce aux étudiants

---

## 🚀 Prochaines étapes

1. **Chapitre 2 : Pandas**
   - Manipulation de DataFrames
   - Lecture de fichiers CSV
   - Nettoyage de données

2. **Chapitre 3 : Visualisation**
   - Matplotlib
   - Seaborn
   - Graphiques interactifs

3. **Projet final**
   - Analyse de données réelles RDC
   - Rapport complet
   - Présentation

---

## 📞 Support technique

Pour toute question sur l'intégration :
- Email : dev@rdc-education.cd
- Slack : #dev-integration
- Documentation : [docs.rdc-education.cd](https://docs.rdc-education.cd)

---

**Bonne intégration ! 🎉**
