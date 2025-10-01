'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, BookOpen, Brain, Sparkles } from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

export default function BadgeSystem() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'first-notebook',
      title: 'Premier Notebook',
      description: 'Exécuter votre premier notebook Jupyter',
      icon: <BookOpen size={24} className="text-blue-500" />,
      earned: false,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 'data-explorer',
      title: 'Data Explorer',
      description: 'Terminer le module Data Science',
      icon: <Brain size={24} className="text-purple-500" />,
      earned: false,
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 'ai-pioneer',
      title: 'AI Pioneer',
      description: 'Terminer 3 modules IA',
      icon: <Star size={24} className="text-yellow-500" />,
      earned: false,
      progress: 0,
      maxProgress: 3,
    },
    {
      id: 'deep-learner',
      title: 'Deep Learner',
      description: 'Maîtriser le Deep Learning',
      icon: <Sparkles size={24} className="text-emerald-500" />,
      earned: false,
      progress: 0,
      maxProgress: 1,
    },
  ]);

  // Simuler la progression (en vrai, ça viendrait d'une API ou du localStorage)
  useEffect(() => {
    const timer = setTimeout(() => {
      setBadges(prev => prev.map(badge => ({
        ...badge,
        progress: Math.min(badge.maxProgress, badge.progress + Math.floor(Math.random() * 2)),
        earned: badge.progress >= badge.maxProgress,
      })));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <Award size={24} className="text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Vos Badges</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 bg-[#262626] border rounded-xl transition-all duration-300 ${
                badge.earned
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-[#404040] hover:border-blue-500/50'
              }`}
            >
              {/* Badge Icon */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                badge.earned
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {badge.earned ? badge.icon : <Award size={24} />}
              </div>

              {/* Badge Info */}
              <h3 className={`font-semibold text-sm mb-1 ${
                badge.earned ? 'text-yellow-400' : 'text-gray-300'
              }`}>
                {badge.title}
              </h3>

              <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                {badge.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${
                    badge.earned ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                />
              </div>

              {/* Progress Text */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {badge.progress}/{badge.maxProgress}
                </span>
                {badge.earned && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs text-yellow-400 font-semibold"
                  >
                    ✓ Obtenu !
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
