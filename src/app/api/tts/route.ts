import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialiser le client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, moduleId } = await request.json();

    if (!text || !moduleId) {
      return NextResponse.json(
        { error: 'Le texte et l\'ID du module sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si la clé API est configurée
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans .env.local' },
        { status: 500 }
      );
    }

    // Définir le chemin du fichier audio
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const audioFileName = `module_${moduleId}.mp3`;
    const audioFilePath = path.join(audioDir, audioFileName);

    // Vérifier si le fichier existe déjà
    if (fs.existsSync(audioFilePath)) {
      return NextResponse.json({
        success: true,
        audioUrl: `/audio/${audioFileName}`,
        cached: true,
      });
    }

    // Créer le dossier audio s'il n'existe pas
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    // Générer l'audio avec OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy', // Voix française disponible : alloy, echo, fable, onyx, nova, shimmer
      input: text,
      speed: 1.0,
    });

    // Convertir la réponse en buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Sauvegarder le fichier
    fs.writeFileSync(audioFilePath, buffer);

    return NextResponse.json({
      success: true,
      audioUrl: `/audio/${audioFileName}`,
      cached: false,
    });
  } catch (error) {
    console.error('Erreur TTS:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération de l\'audio',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
