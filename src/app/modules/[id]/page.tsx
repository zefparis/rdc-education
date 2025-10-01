"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Volume2,
  Download,
  BarChart,
  Clock,
  CheckCircle,
  FileText,
  Video as VideoIcon,
  Code,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import JupyterTutorial from "@/components/JupyterTutorial";
import { modulesConfig, getColabUrl } from "@/config/modulesConfig";

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ModulePage({ params }: ModulePageProps) {
  // Unwrap params avec React.use()
  const { id } = React.use(params);
  
  // Récupérer le module depuis la configuration
  const courseModule = modulesConfig.find((m) => m.slug === id);

  // États pour l'audio
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Si le module n'existe pas, afficher un fallback
  if (!courseModule) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Module introuvable
          </h1>
          <p className="text-gray-400 mb-8">
            Le module que vous recherchez n&apos;existe pas ou a été déplacé.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Retour au dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  // Construire les métadonnées
  const meta = {
    level: courseModule.level ?? "N/A",
    duration: courseModule.duration ?? "N/A",
    students: 450,
    content: courseModule.topics ?? [],
  };

  // Handler pour charger/générer l'audio
  const handleListen = async () => {
    if (audioUrl) return; // Audio déjà chargé
    if (!courseModule.description) return;

    try {
      setIsGenerating(true);

      // D'abord, essayer de charger le MP3 existant
      if (courseModule.audio) {
        try {
          const checkResponse = await fetch(courseModule.audio, { method: 'HEAD' });
          if (checkResponse.ok) {
            // Le fichier MP3 existe, l'utiliser directement
            setAudioUrl(courseModule.audio);
            setIsGenerating(false);
            return;
          }
        } catch {
          // Le fichier n'existe pas, continuer avec la génération TTS
        }
      }

      // Si le MP3 n'existe pas, générer via TTS
      const text = `Bienvenue au module ${courseModule.title}. ${courseModule.description}`;

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          moduleId: courseModule.slug,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la génération audio");

      const data = await res.json();
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
      }
    } catch (error) {
      console.error("Erreur audio:", error);
      alert("Impossible de charger l&apos;audio pour le moment");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Retour aux modules</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl md:text-6xl" aria-hidden="true">
              {courseModule.icon}
            </span>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                {courseModule.title}
              </h1>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {courseModule.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-500 flex-shrink-0" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">
                  {meta.duration}
                </div>
                <div className="text-sm text-gray-400">Durée</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <BarChart className="text-emerald-500 flex-shrink-0" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">{meta.level}</div>
                <div className="text-sm text-gray-400">Niveau</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle
                className="text-purple-500 flex-shrink-0"
                size={24}
              />
              <div>
                <div className="text-2xl font-bold text-white">
                  {meta.content.length}
                </div>
                <div className="text-sm text-gray-400">Chapitres</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Audio */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-300">
                Génération de la voix-off en cours...
              </span>
            </div>
          </motion.div>
        )}

        {/* Audio Player */}
        {audioUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer
              audioUrl={audioUrl}
              title={`Voix-off - ${courseModule.title}`}
            />
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {/* Bouton Audio */}
          <button
            onClick={handleListen}
            disabled={isGenerating || !!audioUrl}
            className="group relative bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
            aria-label="Écouter le module"
          >
            <div className="flex items-center justify-between mb-4">
              <Volume2 size={32} />
              <Volume2 size={24} className="opacity-50" />
            </div>
            <h3 className="text-xl font-bold mb-2">Voix-off</h3>
            <p className="text-orange-100 text-sm">
              {isGenerating
                ? "Génération..."
                : audioUrl
                ? "Audio prêt"
                : "Écouter l&apos;introduction"}
            </p>
          </button>

          {/* Bouton PDF */}
          {courseModule.pdf ? (
            <a
              href={courseModule.pdf}
              download
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              aria-label="Télécharger le support PDF"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText size={32} />
                <Download size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Support PDF</h3>
              <p className="text-blue-100 text-sm">
                Télécharger le cours complet
              </p>
            </a>
          ) : (
            <button
              disabled
              className="relative bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl p-6 cursor-not-allowed opacity-60"
              title="Bientôt disponible"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText size={32} />
                <Download size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Support PDF</h3>
              <p className="text-gray-300 text-sm">Bientôt disponible</p>
            </button>
          )}

          {/* Bouton Notebook - Placeholder pour maintenir la grille */}
          <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 opacity-60">
            <div className="flex items-center justify-between mb-4">
              <BookOpen size={32} />
              <Code size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Notebook Jupyter</h3>
            <p className="text-purple-100 text-sm">
              Voir les options ci-dessous
            </p>
          </div>
        </motion.div>

        {/* Section Notebook Jupyter */}
        {courseModule.notebook && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-500" size={32} />
              <h2 className="text-2xl font-bold text-white">
                Notebook Jupyter Interactif
              </h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Pratiquez avec des exercices Python interactifs. Choisissez votre méthode préférée :
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Bouton Télécharger */}
              <a
                href={courseModule.notebook}
                download
                className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] flex items-center justify-center gap-2"
              >
                <Download size={20} />
                📥 Télécharger le Notebook
              </a>

              {/* Bouton Google Colab */}
              <a
                href={getColabUrl(courseModule.notebook)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] flex items-center justify-center gap-2"
              >
                <Code size={20} />
                🚀 Ouvrir dans Google Colab
              </a>
            </div>

            <p className="text-sm text-gray-400 bg-[#0a0a0a] rounded-lg p-4 border border-[#2a2a2a]">
              👉 <strong className="text-gray-300">Télécharger :</strong> Pour ouvrir le notebook en local avec Jupyter ou VS Code (nécessite Python installé).
              <br />
              👉 <strong className="text-gray-300">Google Colab :</strong> Pour l&apos;exécuter en ligne directement dans votre navigateur, sans installation (recommandé pour les débutants).
            </p>
          </motion.div>
        )}

        {/* Objectifs */}
        {courseModule.objectives && courseModule.objectives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Objectifs d&apos;apprentissage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseModule.objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="text-emerald-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <span className="text-gray-300">{objective}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contenu du module */}
        {meta.content.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Contenu du module
            </h2>
            <div className="space-y-3">
              {meta.content.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.03 }}
                  className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] hover:border-blue-500/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 group-hover:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm transition-colors">
                    {index + 1}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {topic}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ressources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-blue-500/30 transition-colors">
            <FileText size={32} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Documents PDF
            </h3>
            <p className="text-gray-400 text-sm">
              Supports de cours et exercices pratiques
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
            <VideoIcon size={32} className="text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Vidéos</h3>
            <p className="text-gray-400 text-sm">
              Tutoriels vidéo et démonstrations
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-purple-500/30 transition-colors">
            <Code size={32} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Code Source</h3>
            <p className="text-gray-400 text-sm">
              Exemples de code et projets
            </p>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            <ArrowLeft size={20} />
            Retour aux modules
          </Link>
        </motion.div>
      </div>

      {/* Tutoriel Jupyter */}
      {courseModule.notebook && <JupyterTutorial />}
    </div>
  );
}