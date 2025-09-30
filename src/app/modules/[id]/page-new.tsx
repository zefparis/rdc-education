'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Download, Clock, BarChart, CheckCircle, FileText, BookOpen, ArrowLeft, Volume2 } from 'lucide-react';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';
import { getModuleBySlug } from '@/config/modulesConfig';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.id as string;
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Récupérer le module depuis la configuration
  const module = getModuleBySlug(moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Module non trouvé</h1>
          <p className="text-gray-400 mb-8">Ce module n&apos;existe pas.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour au dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Construire l'objet moduleData avec toutes les propriétés
  const moduleData = {
    title: module.title,
    description: module.description,
    level: module.level || 'N/A',
    duration: module.duration || 'N/A',
    students: 450, // Valeur par défaut
    content: module.topics || [],
  };

  const handleListenAudio = async () => {
    setIsGenerating(true);

    try {
      const text = `Bienvenue au module ${moduleData.title}. ${moduleData.description} Ce module contient ${moduleData.content.length} leçons principales.`;

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, moduleId: module.slug }),
      });

      const data = await response.json();

      if (data.success) {
        setAudioUrl(data.audioUrl);
      } else {
        alert(data.error || 'Erreur lors de la génération audio');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération audio');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour au dashboard
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl">{module.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {moduleData.title}
              </h1>
              <p className="text-gray-400 text-lg">
                {moduleData.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <Clock className="text-blue-500" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">{moduleData.duration}</div>
                <div className="text-gray-400">Durée</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <BarChart className="text-emerald-500" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">{moduleData.level}</div>
                <div className="text-gray-400">Niveau</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-purple-500" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">{moduleData.content.length}</div>
                <div className="text-gray-400">Chapitres</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Audio Player */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-300">Génération de la voix off...</span>
            </div>
          </motion.div>
        )}

        {audioUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer audioUrl={audioUrl} title={`Voix off - ${moduleData.title}`} />
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Télécharger PDF */}
          <a
            href={module.pdf}
            download
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText size={32} />
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Support PDF</h3>
            <p className="text-blue-100 text-sm">Télécharger le cours complet</p>
          </a>

          {/* Ouvrir Notebook */}
          <a
            href={module.notebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen size={32} />
              <ArrowLeft className="rotate-180" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Notebook Jupyter</h3>
            <p className="text-purple-100 text-sm">Ouvrir dans le navigateur</p>
          </a>

          {/* Écouter Audio */}
          <button
            onClick={handleListenAudio}
            disabled={isGenerating}
            className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-between mb-4">
              <Volume2 size={32} />
              <Volume2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Voix-off</h3>
            <p className="text-orange-100 text-sm">
              {isGenerating ? 'Génération...' : 'Écouter l\'introduction'}
            </p>
          </button>
        </motion.div>

        {/* Objectifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Objectifs d&apos;apprentissage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">{objective}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contenu du module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Contenu du module</h2>
          <div className="space-y-4">
            {moduleData.content.map((topic, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#2a2a2a] hover:border-blue-500/50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-300">{topic}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour aux modules
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
