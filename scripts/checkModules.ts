/**
 * Script de vérification des modules
 * Vérifie que tous les modules ont une structure complète
 */

import { Module } from '../src/config/enhancedCourseConfig';

// Chemins des fichiers de modules
const MODULES = [
  '../src/config/dataScienceCourse.ts',
  '../src/config/machineLearningCourse.ts',
  '../src/config/deepLearningCourse.ts',
  '../src/config/generativeAICourse.ts'
];

// Configuration minimale requise
interface ModuleRequirements {
  minSections: number;
  minExercises: number;
  minCodeExamples: number;
  requiredSections: string[];
}

const MODULE_REQUIREMENTS: {[key: string]: ModuleRequirements} = {
  'data-science': {
    minSections: 5,
    minExercises: 15,
    minCodeExamples: 20,
    requiredSections: ['Python de base', 'Pandas', 'Visualisation', 'Statistiques', 'Projet final']
  },
  'machine-learning': {
    minSections: 6,
    minExercises: 20,
    minCodeExamples: 25,
    requiredSections: ['Fondamentaux ML', 'Régression', 'Classification', 'Clustering', 'Évaluation', 'Projet final']
  },
  'deep-learning': {
    minSections: 5,
    minExercises: 18,
    minCodeExamples: 22,
    requiredSections: ['Réseaux de neurones', 'TensorFlow/Keras', 'CNN', 'RNN/LSTM', 'Projet final']
  },
  'ia-generative': {
    minSections: 4,
    minExercises: 12,
    minCodeExamples: 18,
    requiredSections: ['Fondamentaux', 'Texte (GPT)', 'Images (DALL·E, SD)', 'Projet final']
  }
};

// Charger un module
async function loadModule(modulePath: string): Promise<Module> {
  const module = await import(modulePath);
  return module[Object.keys(module)[0]]; // Prend la première exportation
}

// Vérifier un module
function checkModule(module: Module): boolean {
  const requirements = MODULE_REQUIREMENTS[module.slug];
  if (!requirements) {
    console.error(`❌ Configuration manquante pour le module ${module.slug}`);
    return false;
  }

  let isValid = true;
  console.log(`\n🔍 Vérification du module: ${module.title}`);
  console.log('='.repeat(50));

  // Vérifier les sections requises
  const sectionTitles = module.sections?.map(s => s.title) || [];
  const missingSections = requirements.requiredSections.filter(
    title => !sectionTitles.includes(title)
  );

  if (missingSections.length > 0) {
    console.log('\n❌ Sections manquantes:');
    missingSections.forEach(section => console.log(`- ${section}`));
    isValid = false;
  }

  // Compter les exercices et exemples
  let totalExercises = 0;
  let totalCodeExamples = 0;
  
  module.sections?.forEach((section, index) => {
    console.log(`\n📂 Section ${index + 1}: ${section.title}`);
    
    // Vérifier les exercices
    const exerciseCount = section.exercises?.length || 0;
    totalExercises += exerciseCount;
    console.log(`  - Exercices: ${exerciseCount}`);
    
    // Vérifier les exemples de code
    const codeExampleCount = section.codeExamples?.length || 0;
    totalCodeExamples += codeExampleCount;
    console.log(`  - Exemples de code: ${codeExampleCount}`);
    
    // Vérifier le contenu
    if (!section.content || section.content.length < 100) {
      console.log('  ⚠️  Contenu potentiellement trop court');
    }
  });

  // Vérifier les totaux
  console.log('\n📊 Totaux:');
  console.log(`- Sections: ${module.sections?.length || 0}/${requirements.minSections} (min)`);
  console.log(`- Exercices: ${totalExercises}/${requirements.minExercises} (min)`);
  console.log(`- Exemples de code: ${totalCodeExamples}/${requirements.minCodeExamples} (min)`);

  if ((module.sections?.length || 0) < requirements.minSections) {
    console.log(`❌ Pas assez de sections (min: ${requirements.minSections})`);
    isValid = false;
  }

  if (totalExercises < requirements.minExercises) {
    console.log(`❌ Pas assez d'exercices (min: ${requirements.minExercises})`);
    isValid = false;
  }

  if (totalCodeExamples < requirements.minCodeExamples) {
    console.log(`❌ Pas assez d'exemples de code (min: ${requirements.minCodeExamples})`);
    isValid = false;
  }

  if (isValid) {
    console.log('\n✅ Tous les critères sont remplis !');
  } else {
    console.log('\n❌ Des améliorations sont nécessaires');
  }

  return isValid;
}

// Programme principal
async function main() {
  console.log('🚀 Démarrage de la vérification des modules...');
  
  let allValid = true;
  
  for (const modulePath of MODULES) {
    try {
      const module = await loadModule(modulePath);
      console.log('\n' + '='.repeat(60));
      console.log(`📦 MODULE: ${module.title.toUpperCase()}`);
      console.log('='.repeat(60));
      
      const isValid = checkModule(module);
      if (!isValid) {
        allValid = false;
      }
    } catch (error) {
      console.error(`\n❌ Erreur lors de la vérification de ${modulePath}:`, error);
      allValid = false;
    }
  }

  console.log('\n' + '='.repeat(60));
  if (allValid) {
    console.log('🎉 Tous les modules sont complets et valides !');
  } else {
    console.log('⚠️  Certains modules nécessitent des améliorations.');
  }
  console.log('='.repeat(60));
}

main().catch(console.error);

// Déclaration de type pour l'import dynamique
declare function require(name: string): any;
