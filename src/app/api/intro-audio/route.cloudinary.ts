import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const INTRO_TEXT = `Bienvenue sur Ia-Solution RDC, la première plateforme en République Démocratique du Congo dédiée à l'apprentissage de l'intelligence artificielle.
Notre mission est simple : rendre l'IA accessible à tous les étudiants, enseignants et professionnels congolais. L'intelligence artificielle n'est pas seulement une technologie du futur, c'est déjà une réalité qui transforme l'agriculture, la santé, la finance et l'éducation dans le monde entier.
Ici, vous trouverez des modules de formation clairs et adaptés à votre rythme. Vous n'avez pas besoin d'être un expert en informatique pour commencer. Pas à pas, vous découvrirez les bases de la science des données, du machine learning, du deep learning et des applications concrètes de l'IA dans notre pays.
Que vous soyez étudiant, entrepreneur ou simplement curieux, Ia-Solution RDC est votre point d'entrée vers le monde passionnant de l'intelligence artificielle. Ensemble, nous pouvons former une nouvelle génération de talents capables de bâtir l'avenir numérique de la RDC.
Explorez, apprenez, et faites partie du changement avec Ia-Solution RDC.`;

export async function GET() {
  try {
    // Vérifier les clés API
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans les variables Railway.' },
        { status: 500 }
      );
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json(
        { error: 'Cloudinary non configuré. Ajoutez les variables CLOUDINARY_* sur Railway.' },
        { status: 500 }
      );
    }

    const publicId = 'ia-solution-rdc/intro';

    // Vérifier si l'audio existe déjà sur Cloudinary
    try {
      const existingFile = await cloudinary.api.resource(publicId, {
        resource_type: 'video', // MP3 est considéré comme 'video' dans Cloudinary
      });

      if (existingFile && existingFile.secure_url) {
        return NextResponse.json({
          success: true,
          audioUrl: existingFile.secure_url,
          cached: true,
          message: 'Audio d\'introduction déjà disponible sur Cloudinary',
        });
      }
    } catch {
      // Fichier n'existe pas encore, on va le créer
    }

    // Générer l'audio avec OpenAI TTS
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: 'alloy',
      input: INTRO_TEXT,
      speed: 0.95,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Upload vers Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          public_id: publicId,
          folder: 'ia-solution-rdc',
          format: 'mp3',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      audioUrl: uploadResult.secure_url,
      cached: false,
      message: 'Audio d\'introduction généré et stocké sur Cloudinary',
    });
  } catch (error) {
    console.error('Erreur génération audio intro:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      {
        error: 'Erreur lors de la génération de l\'audio d\'introduction',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
