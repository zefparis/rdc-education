/**
 * Script de complétion automatique des modules
 * Vérifie et complète la structure des modules pour assurer leur complétude
 */

import { Module, Section, Exercise, CodeExample } from '../src/config/enhancedCourseConfig';
import * as fs from 'fs';
import * as path from 'path';

// Chemins des fichiers de modules
const MODULES_DIR = path.join(__dirname, '../src/config');
const MODULE_FILES = [
  'dataScienceCourse.ts',
  'machineLearningCourse.ts',
  'deepLearningCourse.ts',
  'generativeAICourse.ts'
];

// Configuration des modules
interface ModuleConfig {
  id: string;
  minSections: number;
  minExercises: number;
  minCodeExamples: number;
  requiredSections: string[];
}

const MODULE_CONFIGS: {[key: string]: ModuleConfig} = {
  'data-science': {
    id: '1',
    minSections: 5,
    minExercises: 15,
    minCodeExamples: 20,
    requiredSections: [
      'Python de base',
      'Pandas',
      'Visualisation',
      'Statistiques',
      'Projet final'
    ]
  },
  'machine-learning': {
    id: '2',
    minSections: 6,
    minExercises: 20,
    minCodeExamples: 25,
    requiredSections: [
      'Fondamentaux ML',
      'Régression',
      'Classification',
      'Clustering',
      'Évaluation',
      'Projet final'
    ]
  },
  'deep-learning': {
    id: '3',
    minSections: 5,
    minExercises: 18,
    minCodeExamples: 22,
    requiredSections: [
      'Réseaux de neurones',
      'TensorFlow/Keras',
      'CNN',
      'RNN/LSTM',
      'Projet final'
    ]
  },
  'ia-generative': {
    id: '4',
    minSections: 4,
    minExercises: 12,
    minCodeExamples: 18,
    requiredSections: [
      'Fondamentaux',
      'Texte (GPT)',
      'Images (DALL·E, SD)',
      'Projet final'
    ]
  }
};

// Vérifie et complète un module
async function completeModule(modulePath: string): Promise<void> {
  try {
    // Lire le fichier
    const content = fs.readFileSync(modulePath, 'utf-8');
    const moduleMatch = content.match(/export const (\w+): Module = (\{[\s\S]*?\});/);
    
    if (!moduleMatch) {
      console.error(`Format de module invalide dans ${modulePath}`);
      return;
    }

    const [_, moduleName, moduleJson] = moduleMatch;
    const module: Module = eval(`(${moduleJson})`);
    const config = MODULE_CONFIGS[module.slug];

    if (!config) {
      console.error(`Configuration manquante pour le module ${module.slug}`);
      return;
    }

    // Vérifier les sections requises
    const sectionTitles = module.sections?.map(s => s.title) || [];
    const missingSections = config.requiredSections.filter(
      title => !sectionTitles.includes(title)
    );

    // Ajouter les sections manquantes
    if (missingSections.length > 0) {
      console.log(`\n📝 Ajout des sections manquantes à ${module.title}:`);
      missingSections.forEach(title => {
        console.log(`- ${title}`);
        module.sections = module.sections || [];
        module.sections.push(createSection({
          id: title.toLowerCase().replace(/[^\w]+/g, '-'),
          title,
          content: `Contenu à compléter pour la section ${title}`,
          order: module.sections.length + 1
        }));
      });
    }

    // Vérifier et compléter les sections existantes
    if (module.sections) {
      for (const section of module.sections) {
        // Vérifier les exercices
        if (!section.exercises || section.exercises.length === 0) {
          console.log(`\n➕ Ajout d'exercices à la section: ${section.title}`);
          section.exercises = [
            createExercise({
              id: `${section.id}-ex1`,
              title: `Exercice pratique: ${section.title}`,
              description: `Complétez cet exercice pour mettre en pratique les concepts de la section ${section.title}`,
              difficulty: 'moyen',
              solution: '// Solution à compléter',
              hints: ['Pensez à...', 'Vérifiez que...']
            })
          ];
        }

        // Vérifier les exemples de code
        if (!section.codeExamples || section.codeExamples.length === 0) {
          console.log(`\n📋 Ajout d'exemples de code à: ${section.title}`);
          section.codeExamples = [
            createCodeExample({
              title: `Exemple: ${section.title}`,
              description: `Exemple de code illustrant les concepts de ${section.title}`,
              code: '// Code exemple à compléter',
              language: 'python',
              explanation: 'Explication détaillée de l\'exemple...'
            })
          ];
        }
      }
    }

    // Mettre à jour le fichier
    const updatedContent = content.replace(
      /export const \w+: Module = \{[\s\S]*?\};/,
      `export const ${moduleName}: Module = ${JSON.stringify(module, null, 2)};`
    );

    fs.writeFileSync(modulePath, updatedContent, 'utf-8');
    console.log(`\n✅ Module ${module.title} mis à jour avec succès!`);

  } catch (error) {
    console.error(`\n❌ Erreur lors de la mise à jour de ${modulePath}:`, error);
  }
}

// Fonctions utilitaires
function createSection(params: Partial<Section>): Section {
  return {
    id: params.id || '',
    title: params.title || 'Nouvelle section',
    content: params.content || 'Contenu à compléter',
    order: params.order || 1,
    exercises: params.exercises || [],
    codeExamples: params.codeExamples || [],
    resources: params.resources || []
  };
}

function createExercise(params: Partial<Exercise>): Exercise {
  return {
    id: params.id || `ex-${Date.now()}`,
    title: params.title || 'Exercice sans titre',
    description: params.description || 'Description de l\'exercice',
    difficulty: params.difficulty || 'moyen',
    solution: params.solution,
    hints: params.hints || []
  };
}

function createCodeExample(params: Partial<CodeExample>): CodeExample {
  return {
    title: params.title || 'Exemple de code',
    description: params.description || 'Description de l\'exemple',
    code: params.code || '// Code à compléter',
    language: params.language || 'python',
    explanation: params.explanation
  };
}

// Exécution du script
async function main() {
  console.log('🚀 Début de la vérification des modules...\n');
  
  for (const file of MODULE_FILES) {
    const filePath = path.join(MODULES_DIR, file);
    console.log(`\n🔍 Vérification de: ${file}`);
    await completeModule(filePath);
  }

  console.log('\n✅ Vérification terminée !');
  console.log('Tous les modules ont été mis à jour avec les éléments manquants.');
  console.log('N\'oubliez pas de réviser les contenus générés automatiquement.');
}

main().catch(console.error);
