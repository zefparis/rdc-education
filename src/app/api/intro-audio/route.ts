import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const INTRO_TEXT = `Bienvenue sur Ia-Solution RDC, la première plateforme en République Démocratique du Congo dédiée à l'apprentissage de l'intelligence artificielle.
Notre mission est simple : rendre l'IA accessible à tous les étudiants, enseignants et professionnels congolais. L'intelligence artificielle n'est pas seulement une technologie du futur, c'est déjà une réalité qui transforme l'agriculture, la santé, la finance et l'éducation dans le monde entier.
Ici, vous trouverez des modules de formation clairs et adaptés à votre rythme. Vous n'avez pas besoin d'être un expert en informatique pour commencer. Pas à pas, vous découvrirez les bases de la science des données, du machine learning, du deep learning et des applications concrètes de l'IA dans notre pays.
Que vous soyez étudiant, entrepreneur ou simplement curieux, Ia-Solution RDC est votre point d'entrée vers le monde passionnant de l'intelligence artificielle. Ensemble, nous pouvons former une nouvelle génération de talents capables de bâtir l'avenir numérique de la RDC.
Explorez, apprenez, et faites partie du changement avec Ia-Solution RDC.`;

export async function GET() {
  try {
    // Vérifier si la clé API est configurée
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans .env.local' },
        { status: 500 }
      );
    }

    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const audioFilePath = path.join(audioDir, 'intro.mp3');

    // Vérifier si le fichier existe déjà
    if (fs.existsSync(audioFilePath)) {
      return NextResponse.json({
        success: true,
        audioUrl: '/audio/intro.mp3',
        cached: true,
        message: 'Audio d\'introduction déjà disponible',
      });
    }

    // Créer le dossier audio s'il n'existe pas
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    // Générer l'audio avec OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd', // Meilleure qualité pour l'intro
      voice: 'alloy', // Voix française claire et professionnelle
      input: INTRO_TEXT,
      speed: 0.95, // Légèrement plus lent pour une meilleure compréhension
    });

    // Convertir la réponse en buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Sauvegarder le fichier
    fs.writeFileSync(audioFilePath, buffer);

    return NextResponse.json({
      success: true,
      audioUrl: '/audio/intro.mp3',
      cached: false,
      message: 'Audio d\'introduction généré avec succès',
    });
  } catch (error: any) {
    console.error('Erreur génération audio intro:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération de l\'audio d\'introduction',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
