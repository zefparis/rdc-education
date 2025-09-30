'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Download, Clock, BarChart, CheckCircle, FileText, Video, Code, Volume2 } from 'lucide-react';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.id as string;
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Données des modules (en production, cela viendrait d'une API)
  const modulesData: Record<string, {
    title: string;
    description: string;
    level: string;
    duration: string;
    students: number;
    content: string[];
  }> = {
    'data-science': {
      title: 'Data Science',
      description: 'Maîtrisez l\'analyse de données, la visualisation et les statistiques pour extraire des insights précieux de vos données.',
      level: 'Débutant',
      duration: '8 semaines',
      students: 450,
      content: [
        'Introduction à Python pour Data Science',
        'Manipulation de données avec Pandas',
        'Visualisation avec Matplotlib et Seaborn',
        'Statistiques descriptives et inférentielles',
        'Nettoyage et préparation des données',
        'Analyse exploratoire des données (EDA)',
        'Introduction au Machine Learning',
        'Projet final : Analyse de données réelles',
      ],
    },
    'deep-learning': {
      title: 'Deep Learning',
      description: 'Plongez dans les réseaux de neurones profonds, CNN, RNN et architectures avancées pour résoudre des problèmes complexes.',
      level: 'Intermédiaire',
      duration: '10 semaines',
      students: 320,
      content: [
        'Fondamentaux des réseaux de neurones',
        'Backpropagation et optimisation',
        'Réseaux de neurones convolutifs (CNN)',
        'Réseaux de neurones récurrents (RNN)',
        'LSTM et GRU',
        'Transfer Learning',
        'Architectures modernes (ResNet, VGG, etc.)',
        'Projet : Classification d\'images',
      ],
    },
    'ia-generative': {
      title: 'IA Générative',
      description: 'Découvrez GPT, DALL-E, Stable Diffusion et créez du contenu innovant avec l\'intelligence artificielle générative.',
      level: 'Intermédiaire',
      duration: '6 semaines',
      students: 580,
      content: [
        'Introduction à l\'IA générative',
        'Transformers et attention mechanisms',
        'GPT et génération de texte',
        'DALL-E et génération d\'images',
        'Stable Diffusion',
        'Fine-tuning de modèles',
        'Éthique et limites de l\'IA générative',
        'Projet : Créer une application générative',
      ],
    },
  };

  const courseModule = modulesData[moduleId] || {
    title: 'Module non trouvé',
    description: 'Ce module n\'existe pas encore.',
    level: 'N/A',
    duration: 'N/A',
    students: 0,
    content: [],
  };

  const handleListen = async () => {
    setIsGenerating(true);

    try {
      const text = `Bienvenue au module ${courseModule.title}. ${courseModule.description} Ce module contient ${courseModule.content.length} leçons principales.`;

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, moduleId }),
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Retour aux modules
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {courseModule.title}
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            {courseModule.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <BarChart size={20} className="text-blue-500" />
              <span>{courseModule.level}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock size={20} className="text-emerald-500" />
              <span>{courseModule.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle size={20} className="text-purple-500" />
              <span>{courseModule.students} étudiants</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleListen}
              disabled={isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-600/50"
            >
              <Volume2 size={20} />
              <span>{isGenerating ? 'Génération...' : 'Écouter le module'}</span>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-600/50">
              <Download size={20} />
              <span>Télécharger le module</span>
            </button>
          </div>
        </motion.div>

        {/* Audio Player */}
        {audioUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer audioUrl={audioUrl} title={`Voix off - ${courseModule.title}`} />
          </motion.div>
        )}

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Contenu du module</h2>
          <div className="space-y-3">
            {courseModule.content.map((item: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start space-x-3 p-4 bg-[#0a0a0a] rounded-lg hover:bg-[#151515] transition-colors"
              >
                <CheckCircle size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <FileText size={32} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Documents PDF</h3>
            <p className="text-gray-400 text-sm">
              Supports de cours et exercices pratiques
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <Video size={32} className="text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Vidéos</h3>
            <p className="text-gray-400 text-sm">
              Tutoriels vidéo et démonstrations
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-purple-500/50 transition-colors">
            <Code size={32} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Code Source</h3>
            <p className="text-gray-400 text-sm">
              Exemples de code et projets
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}