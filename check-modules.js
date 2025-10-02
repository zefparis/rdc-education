/**
 * Vérification simple des modules
 * Affiche un résumé de la complétude des modules
 */

const fs = require('fs');
const path = require('path');

// Chemins des fichiers de modules
const MODULES_DIR = path.join(__dirname, 'src/config');
const MODULE_FILES = [
  'dataScienceCourse.ts',
  'machineLearningCourse.ts',
  'deepLearningCourse.ts',
  'generativeAICourse.ts'
];

// Configuration minimale requise
const MODULE_REQUIREMENTS = {
  'data-science': {
    minSections: 5,
    minExercises: 15,
    minCodeExamples: 20
  },
  'machine-learning': {
    minSections: 6,
    minExercises: 20,
    minCodeExamples: 25
  },
  'deep-learning': {
    minSections: 5,
    minExercises: 18,
    minCodeExamples: 22
  },
  'ia-generative': {
    minSections: 4,
    minExercises: 12,
    minCodeExamples: 18
  }
};

// Analyser un fichier de module
function analyzeModule(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const moduleMatch = content.match(/export const \w+: Module = (\{[\s\S]*?\});/);
    
    if (!moduleMatch) {
      console.error(`❌ Format de module invalide dans ${filePath}`);
      return null;
    }

    try {
      // Évaluer le contenu du module (attention en production il faudrait un parseur plus sûr)
      const module = eval(`(${moduleMatch[1]})`);
      return module;
    } catch (e) {
      console.error(`❌ Erreur lors de l'analyse de ${filePath}:`, e.message);
      return null;
    }
  } catch (error) {
    console.error(`❌ Erreur de lecture du fichier ${filePath}:`, error.message);
    return null;
  }
}

// Vérifier un module
function checkModule(module) {
  if (!module) return false;

  const requirements = MODULE_REQUIREMENTS[module.slug];
  if (!requirements) {
    console.error(`❌ Configuration manquante pour le module ${module.slug}`);
    return false;
  }

  // Compter les exercices et exemples
  let totalExercises = 0;
  let totalCodeExamples = 0;
  const sectionTitles = [];
  
  if (module.sections) {
    module.sections.forEach(section => {
      sectionTitles.push(section.title);
      totalExercises += section.exercises?.length || 0;
      totalCodeExamples += section.codeExamples?.length || 0;
    });
  }

  // Vérifier les critères
  const sectionCount = module.sections?.length || 0;
  const hasEnoughSections = sectionCount >= requirements.minSections;
  const hasEnoughExercises = totalExercises >= requirements.minExercises;
  const hasEnoughCodeExamples = totalCodeExamples >= requirements.minCodeExamples;

  // Afficher le rapport
  console.log('\n' + '='.repeat(60));
  console.log(`📦 MODULE: ${module.title.toUpperCase()}`);
  console.log('='.repeat(60));
  console.log(`📚 Description: ${module.description}`);
  console.log(`📅 Durée: ${module.duration} | Niveau: ${module.level}`);
  console.log('\n📊 Statistiques:');
  console.log(`- Sections: ${sectionCount}/${requirements.minSections} (min)`);
  console.log(`- Exercices: ${totalExercises}/${requirements.minExercises} (min)`);
  console.log(`- Exemples de code: ${totalCodeExamples}/${requirements.minCodeExamples} (min)`);
  
  // Vérifier les problèmes
  let hasIssues = false;
  if (!hasEnoughSections) {
    console.log(`❌ Pas assez de sections (min: ${requirements.minSections})`);
    hasIssues = true;
  }
  if (!hasEnoughExercises) {
    console.log(`❌ Pas assez d'exercices (min: ${requirements.minExercises})`);
    hasIssues = true;
  }
  if (!hasEnoughCodeExamples) {
    console.log(`❌ Pas assez d'exemples de code (min: ${requirements.minCodeExamples})`);
    hasIssues = true;
  }
  
  if (!hasIssues) {
    console.log('✅ Tous les critères sont remplis !');
  }
  
  console.log('\nSections disponibles:');
  sectionTitles.forEach((title, i) => {
    console.log(`${i + 1}. ${title}`);
  });
  
  console.log('\nActions recommandées:');
  if (!hasEnoughSections) {
    console.log(`- Ajouter ${requirements.minSections - sectionCount} sections`);
  }
  if (!hasEnoughExercises) {
    console.log(`- Ajouter ${requirements.minExercises - totalExercises} exercices`);
  }
  if (!hasEnoughCodeExamples) {
    console.log(`- Ajouter ${requirements.minCodeExamples - totalCodeExamples} exemples de code`);
  }
  
  return !hasIssues;
}

// Programme principal
console.log('🚀 Démarrage de la vérification des modules...\n');

let allValid = true;
const modulePaths = MODULE_FILES.map(file => path.join(MODULES_DIR, file));

modulePaths.forEach(modulePath => {
  const module = analyzeModule(modulePath);
  if (module) {
    const isValid = checkModule(module);
    if (!isValid) {
      allValid = false;
    }
  } else {
    allValid = false;
  }
});

console.log('\n' + '='.repeat(60));
if (allValid) {
  console.log('🎉 Tous les modules sont complets et valides !');
} else {
  console.log('⚠️  Certains modules nécessitent des améliorations.');
  console.log('   Consultez le rapport ci-dessus pour les détails.');
}
console.log('='.repeat(60));
