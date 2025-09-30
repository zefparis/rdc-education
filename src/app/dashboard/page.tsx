'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ModuleCardWithImage from '@/components/ModuleCardWithImage';
import AudioPlayer from '@/components/AudioPlayer';
import { Brain, Database, Sparkles, Cpu, Network, Code } from 'lucide-react';
import { getImagePath, MODULE_IMAGE_MAPPING } from '@/lib/images';
import { modulesConfig } from '@/config/modulesConfig';

export default function DashboardPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  
  // Mapping des icônes
  const iconMap: Record<string, React.ReactNode> = {
    'data-science': <Database size={24} className="text-blue-500" />,
    'deep-learning': <Brain size={24} className="text-purple-500" />,
    'ia-generative': <Sparkles size={24} className="text-orange-500" />,
    'mlops': <Cpu size={24} className="text-green-500" />,
    'nlp': <Network size={24} className="text-indigo-500" />,
    'ml-fondamental': <Code size={24} className="text-yellow-500" />,
  };
  
  // Utiliser la configuration centralisée
  const modules = modulesConfig.map(module => ({
    id: module.slug,
    title: module.title,
    description: module.description,
    duration: module.duration,
    level: module.level,
    icon: iconMap[module.slug] || <Code size={24} className="text-blue-500" />,
  }));

  const handleListen = async (moduleId: string, moduleTitle: string) => {
    setIsGenerating(true);
    setCurrentModule(moduleTitle);

    try {
      const moduleData = modules.find(m => m.id === moduleId);
      const text = `Bienvenue au module ${moduleTitle}. ${moduleData?.description}`;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modules d&apos;apprentissage
          </h1>
          <p className="text-gray-400 text-lg">
            Explorez nos modules d&apos;IA et commencez votre parcours d&apos;apprentissage
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-500 mb-2">{modules.length}</div>
            <div className="text-gray-400">Modules disponibles</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="text-3xl font-bold text-emerald-500 mb-2">50+</div>
            <div className="text-gray-400">Heures de contenu</div>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-500 mb-2">1000+</div>
            <div className="text-gray-400">Étudiants actifs</div>
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
              <span className="text-gray-300">Génération de la voix off pour {currentModule}...</span>
            </div>
          </motion.div>
        )}

        {audioUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AudioPlayer audioUrl={audioUrl} title={`Voix off - ${currentModule}`} />
          </motion.div>
        )}

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const theme = MODULE_IMAGE_MAPPING[module.id] || 'ai';
            const imagePath = getImagePath(theme, (index % 5) + 1);
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <ModuleCardWithImage 
                  {...module}
                  imagePath={imagePath}
                  onListen={() => handleListen(module.id, module.title)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}