/**
 * Script de pré-génération des fichiers audio pour tous les modules
 * Utilise OpenAI TTS pour créer les voix-off en français
 */

import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: '.env.local' });

// Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ModuleAudio {
  id: string;
  slug: string;
  textFile: string;
  outputFile: string;
}

const modules: ModuleAudio[] = [
  {
    id: 'data-science',
    slug: 'data-science',
    textFile: 'public/modules/data-science/audio-introduction.txt',
    outputFile: 'public/audio/module_data-science.mp3',
  },
  {
    id: 'deep-learning',
    slug: 'deep-learning',
    textFile: 'public/modules/deep-learning/audio-introduction.txt',
    outputFile: 'public/audio/module_deep-learning.mp3',
  },
  {
    id: 'ia-generative',
    slug: 'ia-generative',
    textFile: 'public/modules/ia-generative/audio-introduction.txt',
    outputFile: 'public/audio/module_ia-generative.mp3',
  },
  {
    id: 'mlops',
    slug: 'mlops',
    textFile: 'public/modules/mlops/audio-introduction.txt',
    outputFile: 'public/audio/module_mlops.mp3',
  },
  {
    id: 'nlp',
    slug: 'nlp',
    textFile: 'public/modules/nlp/audio-introduction.txt',
    outputFile: 'public/audio/module_nlp.mp3',
  },
  {
    id: 'ml-fondamental',
    slug: 'ml-fondamental',
    textFile: 'public/modules/ml-fondamental/audio-introduction.txt',
    outputFile: 'public/audio/module_ml-fondamental.mp3',
  },
];

async function generateAudio(module: ModuleAudio): Promise<void> {
  const textPath = path.join(process.cwd(), module.textFile);
  const outputPath = path.join(process.cwd(), module.outputFile);

  // Vérifier si le fichier existe déjà
  if (fs.existsSync(outputPath)) {
    console.log(`✅ ${module.id}: Audio déjà existant (${module.outputFile})`);
    return;
  }

  // Lire le texte
  if (!fs.existsSync(textPath)) {
    console.error(`❌ ${module.id}: Fichier texte introuvable (${module.textFile})`);
    return;
  }

  const text = fs.readFileSync(textPath, 'utf-8').trim();
  
  if (!text) {
    console.error(`❌ ${module.id}: Fichier texte vide`);
    return;
  }

  console.log(`🎙️  ${module.id}: Génération de l'audio...`);

  try {
    // Générer l'audio avec OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1', // Modèle rapide
      voice: 'alloy', // Meilleure prononciation française
      input: `Bienvenue au module ${module.id}. ${text}`,
      speed: 1.0, // Vitesse naturelle
    });

    // Convertir en buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Créer le dossier de sortie si nécessaire
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Sauvegarder le fichier
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ ${module.id}: Audio généré avec succès (${(buffer.length / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error(`❌ ${module.id}: Erreur lors de la génération:`, error);
  }
}

async function generateIntroAudio(): Promise<void> {
  const outputPath = path.join(process.cwd(), 'public/audio/intro.mp3');

  if (fs.existsSync(outputPath)) {
    console.log(`✅ intro: Audio déjà existant`);
    return;
  }

  const INTRO_TEXT = `Bienvenue sur Ia-Solution RDC, la première plateforme en République Démocratique du Congo dédiée à l'apprentissage de l'intelligence artificielle.
Notre mission est simple : rendre l'IA accessible à tous les étudiants, enseignants et professionnels congolais. L'intelligence artificielle n'est pas seulement une technologie du futur, c'est déjà une réalité qui transforme l'agriculture, la santé, la finance et l'éducation dans le monde entier.
Ici, vous trouverez des modules de formation clairs et adaptés à votre rythme. Vous n'avez pas besoin d'être un expert en informatique pour commencer. Pas à pas, vous découvrirez les bases de la science des données, du machine learning, du deep learning et des applications concrètes de l'IA dans notre pays.
Que vous soyez étudiant, entrepreneur ou simplement curieux, Ia-Solution RDC est votre point d'entrée vers le monde passionnant de l'intelligence artificielle. Ensemble, nous pouvons former une nouvelle génération de talents capables de bâtir l'avenir numérique de la RDC.
Explorez, apprenez, et faites partie du changement avec Ia-Solution RDC.`;

  console.log(`🎙️  intro: Génération de l'audio d'introduction...`);

  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: INTRO_TEXT,
      speed: 1.0,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ intro: Audio généré avec succès (${(buffer.length / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error(`❌ intro: Erreur lors de la génération:`, error);
  }
}

async function main() {
  console.log('🚀 Génération des fichiers audio pour Ia-Solution RDC\n');

  // Vérifier la clé API
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ ERREUR: Variable d\'environnement OPENAI_API_KEY non définie');
    console.log('💡 Ajoutez votre clé OpenAI dans le fichier .env.local');
    process.exit(1);
  }

  // Générer l'audio d'introduction
  await generateIntroAudio();
  console.log('');

  // Générer les audios des modules
  for (const module of modules) {
    await generateAudio(module);
  }

  console.log('\n✨ Génération terminée !');
  console.log('📁 Les fichiers MP3 sont disponibles dans public/audio/');
}

main().catch(console.error);
