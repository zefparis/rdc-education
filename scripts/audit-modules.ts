#!/usr/bin/env ts-node

/**
 * Script d'audit automatique des modules pédagogiques
 * Plateforme IA-Solution RDC
 * 
 * Vérifie la présence et l'intégrité de tous les fichiers requis
 * pour chaque module de formation.
 */

import * as fs from 'fs';
import * as path from 'path';

// Codes couleur ANSI pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// Configuration des modules
interface Module {
  id: string;
  name: string;
  slug: string;
}

const modules: Module[] = [
  { id: '1', name: 'Data Science', slug: 'data-science' },
  { id: '2', name: 'Deep Learning', slug: 'deep-learning' },
  { id: '3', name: 'IA Générative', slug: 'ia-generative' },
  { id: '4', name: 'MLOps', slug: 'mlops' },
  { id: '5', name: 'NLP', slug: 'nlp' },
  { id: '6', name: 'Machine Learning Fondamental', slug: 'ml-fondamental' },
];

// Fichiers requis pour chaque module
const requiredFiles = {
  pdf: (slug: string) => `module_${slug}.pdf`,
  notebook: (slug: string) => `module_${slug}.ipynb`,
  audio: (slug: string) => `module_${slug}.mp3`,
};

// Fichiers alternatifs acceptés
const alternativeFiles = {
  pdf: (slug: string) => [`${slug}-cours.md`, `${slug}.md`, 'README.md'],
  notebook: (slug: string) => [`module-${slug}-complet.ipynb`, `${slug}.ipynb`],
  audio: (slug: string) => ['audio-introduction.txt', `${slug}-audio.txt`],
};

// Résultats de l'audit
interface AuditResult {
  module: Module;
  files: {
    pdf: { exists: boolean; path: string; alternative?: string };
    notebook: { exists: boolean; path: string; alternative?: string };
    audio: { exists: boolean; path: string; alternative?: string };
  };
  inDashboard: boolean;
  valid: boolean;
}

/**
 * Affiche un message coloré
 */
function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Affiche un en-tête de section
 */
function logSection(title: string) {
  console.log('\n' + '='.repeat(70));
  log(title, 'bold');
  console.log('='.repeat(70) + '\n');
}

/**
 * Vérifie l'existence d'un fichier
 */
function checkFile(filePath: string): boolean {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Cherche un fichier parmi plusieurs alternatives
 */
function findFile(basePath: string, primaryFile: string, alternatives: string[]): { exists: boolean; path: string; alternative?: string } {
  const primaryPath = path.join(basePath, primaryFile);
  
  if (checkFile(primaryPath)) {
    return { exists: true, path: primaryPath };
  }

  // Chercher parmi les alternatives
  for (const alt of alternatives) {
    const altPath = path.join(basePath, alt);
    if (checkFile(altPath)) {
      return { exists: true, path: altPath, alternative: alt };
    }
  }

  return { exists: false, path: primaryPath };
}

/**
 * Vérifie les fichiers d'un module
 */
function auditModuleFiles(module: Module): AuditResult['files'] {
  const modulePath = path.join(process.cwd(), 'public', 'modules', module.slug);

  // Vérifier si le dossier du module existe
  if (!fs.existsSync(modulePath)) {
    return {
      pdf: { exists: false, path: modulePath },
      notebook: { exists: false, path: modulePath },
      audio: { exists: false, path: modulePath },
    };
  }

  return {
    pdf: findFile(modulePath, requiredFiles.pdf(module.slug), alternativeFiles.pdf(module.slug)),
    notebook: findFile(modulePath, requiredFiles.notebook(module.slug), alternativeFiles.notebook(module.slug)),
    audio: findFile(modulePath, requiredFiles.audio(module.slug), alternativeFiles.audio(module.slug)),
  };
}

/**
 * Vérifie si le module est référencé dans le dashboard
 */
function checkDashboardReference(module: Module): boolean {
  const dashboardPath = path.join(process.cwd(), 'src', 'app', 'dashboard', 'page.tsx');

  if (!checkFile(dashboardPath)) {
    log('⚠️  Fichier dashboard/page.tsx introuvable', 'yellow');
    return false;
  }

  try {
    const content = fs.readFileSync(dashboardPath, 'utf-8');
    // Chercher le slug ou le nom du module
    return content.includes(module.slug) || content.includes(module.name);
  } catch (error) {
    log(`❌ Erreur lors de la lecture du dashboard: ${error}`, 'red');
    return false;
  }
}

/**
 * Affiche les résultats pour un module
 */
function displayModuleResults(result: AuditResult) {
  const { module, files } = result;

  log(`\n📦 Module ${module.id}: ${module.name} (${module.slug})`, 'cyan');
  console.log('─'.repeat(70));

  // PDF
  if (files.pdf.exists) {
    const fileName = files.pdf.alternative || path.basename(files.pdf.path);
    log(`  ✅ PDF: ${fileName}`, 'green');
  } else {
    log(`  ❌ PDF: ${requiredFiles.pdf(module.slug)} (manquant)`, 'red');
  }

  // Notebook
  if (files.notebook.exists) {
    const fileName = files.notebook.alternative || path.basename(files.notebook.path);
    log(`  ✅ Notebook: ${fileName}`, 'green');
  } else {
    log(`  ❌ Notebook: ${requiredFiles.notebook(module.slug)} (manquant)`, 'red');
  }

  // Audio
  if (files.audio.exists) {
    const fileName = files.audio.alternative || path.basename(files.audio.path);
    log(`  ✅ Audio: ${fileName}`, 'green');
  } else {
    log(`  ❌ Audio: ${requiredFiles.audio(module.slug)} (manquant)`, 'red');
  }

  // Dashboard
  if (result.inDashboard) {
    log(`  ✅ Référencé dans le dashboard`, 'green');
  } else {
    log(`  ❌ Non référencé dans le dashboard`, 'red');
  }

  // Statut global
  if (result.valid) {
    log(`  ✨ Statut: VALIDE`, 'green');
  } else {
    log(`  ⚠️  Statut: INCOMPLET`, 'yellow');
  }
}

/**
 * Affiche le résumé final
 */
function displaySummary(results: AuditResult[]) {
  logSection('📊 RÉSUMÉ DE L\'AUDIT');

  const validModules = results.filter(r => r.valid).length;
  const totalModules = results.length;
  const percentage = Math.round((validModules / totalModules) * 100);

  // Statistiques par type de fichier
  const pdfCount = results.filter(r => r.files.pdf.exists).length;
  const notebookCount = results.filter(r => r.files.notebook.exists).length;
  const audioCount = results.filter(r => r.files.audio.exists).length;
  const dashboardCount = results.filter(r => r.inDashboard).length;

  console.log(`Modules valides:     ${validModules}/${totalModules} (${percentage}%)`);
  console.log(`\nFichiers présents:`);
  console.log(`  - PDF:             ${pdfCount}/${totalModules}`);
  console.log(`  - Notebooks:       ${notebookCount}/${totalModules}`);
  console.log(`  - Audio:           ${audioCount}/${totalModules}`);
  console.log(`  - Dans dashboard:  ${dashboardCount}/${totalModules}`);

  // Modules incomplets
  const incompleteModules = results.filter(r => !r.valid);
  if (incompleteModules.length > 0) {
    log('\n⚠️  Modules incomplets:', 'yellow');
    incompleteModules.forEach(result => {
      const missing: string[] = [];
      if (!result.files.pdf.exists) missing.push('PDF');
      if (!result.files.notebook.exists) missing.push('Notebook');
      if (!result.files.audio.exists) missing.push('Audio');
      if (!result.inDashboard) missing.push('Dashboard');
      
      console.log(`  - ${result.module.name}: ${missing.join(', ')}`);
    });
  }

  // Message final
  console.log('\n' + '='.repeat(70));
  if (validModules === totalModules) {
    log('✅ TOUS LES MODULES SONT VALIDES !', 'green');
  } else {
    log(`⚠️  ${totalModules - validModules} MODULE(S) À COMPLÉTER`, 'yellow');
  }
  console.log('='.repeat(70) + '\n');
}

/**
 * Fonction principale
 */
async function main() {
  logSection('🔍 AUDIT DES MODULES PÉDAGOGIQUES - IA-Solution RDC');

  log('Vérification en cours...', 'blue');

  const results: AuditResult[] = [];

  // Auditer chaque module
  for (const module of modules) {
    const files = auditModuleFiles(module);
    const inDashboard = checkDashboardReference(module);
    const valid = files.pdf.exists && files.notebook.exists && files.audio.exists && inDashboard;

    results.push({
      module,
      files,
      inDashboard,
      valid,
    });
  }

  // Afficher les résultats détaillés
  logSection('📋 RÉSULTATS DÉTAILLÉS');
  results.forEach(displayModuleResults);

  // Afficher le résumé
  displaySummary(results);

  // Code de sortie
  const allValid = results.every(r => r.valid);
  process.exit(allValid ? 0 : 1);
}

// Exécution
main().catch((error) => {
  log(`\n❌ Erreur fatale: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
