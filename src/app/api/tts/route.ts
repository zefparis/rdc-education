import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

    const publicId = `ia-solution-rdc/module_${moduleId}`;

    // Vérifier si l'audio existe déjà sur Cloudinary
    try {
      const existingFile = await cloudinary.api.resource(publicId, {
        resource_type: 'video',
      });

      if (existingFile && existingFile.secure_url) {
        return NextResponse.json({
          success: true,
          audioUrl: existingFile.secure_url,
          cached: true,
        });
      }
    } catch {
      // Fichier n'existe pas encore
    }

    // Générer l'audio avec OpenAI TTS
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1', // Modèle rapide (3x plus rapide que HD)
      voice: 'alloy', // Meilleure prononciation française
      input: text,
      speed: 1.0, // Vitesse naturelle
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Upload vers Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          public_id: publicId,
          folder: 'ia-solution-rdc',
          format: 'mp3',
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('Upload failed: no result'));
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      audioUrl: uploadResult.secure_url,
      cached: false,
    });
  } catch (error) {
    console.error('Erreur TTS:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      {
        error: 'Erreur lors de la génération de l\'audio',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
