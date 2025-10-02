// Script simple pour lister les modules et leurs sections
const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, 'src/config');
const MODULE_FILES = [
  'dataScienceCourse.ts',
  'machineLearningCourse.ts',
  'deepLearningCourse.ts',
  'generativeAICourse.ts'
];

function listModules() {
  console.log('📚 Modules disponibles :\n');
  
  MODULE_FILES.forEach(file => {
    const filePath = path.join(MODULES_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const moduleMatch = content.match(/export const (\w+): Module = \{([\s\S]*?)\};/);
      
      if (moduleMatch) {
        const moduleName = moduleMatch[1];
        const moduleContent = `{${moduleMatch[2]}}`;
        const module = eval(`(${moduleContent})`);
        
        console.log(`📦 ${module.title} (${module.slug})`);
        console.log(`   📝 ${module.description}`);
        console.log(`   ⏱️  ${module.duration} | 🎯 ${module.level}`);
        
        if (module.sections && module.sections.length > 0) {
          console.log('\n   📑 Sections :');
          module.sections.forEach((section, index) => {
            console.log(`   ${index + 1}. ${section.title}`);
            console.log(`      - Exercices: ${section.exercises?.length || 0}`);
            console.log(`      - Exemples: ${section.codeExamples?.length || 0}`);
          });
        } else {
          console.log('   ❌ Aucune section définie');
        }
        
        console.log('\n' + '─'.repeat(80) + '\n');
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la lecture de ${file}:`, error.message);
    }
  });
}

listModules();
