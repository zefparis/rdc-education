'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { GAME_CONFIG } from '@/data/games/trueFalseGame';

// Import dynamique pour éviter les problèmes de SSR avec Framer Motion
const TrueFalseGame = dynamic(async () => {
  const mod = await import('@/components/gamification/TrueFalseGame');
  return mod.default;
}, {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

export default function TrueFalseGamePage() {
  const router = useRouter();
  const [hasCompleted, setHasCompleted] = useState(false);
  const { isActivityCompleted } = useProgress();

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà terminé ce quiz
    if (isActivityCompleted(GAME_CONFIG.id)) {
      setHasCompleted(true);
    }
  }, [isActivityCompleted]);

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/how-it-works-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-6 text-gray-300 hover:text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Quiz Vrai ou Faux IA
              </h1>
              <p className="text-gray-300 max-w-2xl">
                Testez vos connaissances en intelligence artificielle avec ce quiz rapide.
                Répondez par Vrai ou Faux à chaque question et découvrez des explications détaillées.
              </p>
            </div>
            
            {hasCompleted && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>Quiz déjà complété</span>
              </motion.div>
            )}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full">
              <Trophy className="h-4 w-4 mr-1.5 text-yellow-400" />
              <span>Badge: {GAME_CONFIG.reward.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full">
              <Award className="h-4 w-4 mr-1.5 text-blue-400" />
              <span>Score minimum: {GAME_CONFIG.requiredScore * 100}%</span>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={hasCompleted ? 'completed' : 'playing'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 md:p-8 rounded-xl border border-white/10 shadow-xl"
          >
            <TrueFalseGame />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
