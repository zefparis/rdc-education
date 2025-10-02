// src/components/gamification/RewardNotification.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Zap, Star, Trophy, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Badge as BadgeType } from '@/lib/gamification/badges';
import { getUserBadges } from '@/lib/gamification/badges';

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  check: CheckCircle,
};

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200',
  uncommon: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  legendary: 'bg-gradient-to-br from-amber-200 to-yellow-300 text-amber-900 dark:from-amber-600/30 dark:to-yellow-700/30 dark:text-amber-200',
};

export function RewardNotification() {
  const [recentBadge, setRecentBadge] = useState<BadgeType | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On mount, try to show the latest badge if any
    const current = getUserBadges();
    if (current.length > 0 && !recentBadge) {
      setRecentBadge(current[current.length - 1]);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }

    const handleBadgeUnlocked = (event: Event) => {
      const customEvent = event as CustomEvent<{ badges: BadgeType[] }>;
      if (customEvent.detail?.badges?.length) {
        const latestBadge = customEvent.detail.badges[customEvent.detail.badges.length - 1];
        setRecentBadge(latestBadge);
        setIsVisible(true);
        // Masquer la notification après 5 secondes
        setTimeout(() => setIsVisible(false), 5000);
      }
    };

    // Écouter l'événement personnalisé
    window.addEventListener('badge-unlocked', handleBadgeUnlocked as EventListener);
    
    // Garder le gestionnaire de stockage pour le support des onglets multiples
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'user-badges' && e.newValue) {
        const badges = JSON.parse(e.newValue) as BadgeType[];
        if (badges.length > 0) {
          setRecentBadge(badges[badges.length - 1]);
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 5000);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('badge-unlocked', handleBadgeUnlocked as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, [recentBadge]);

  if (!recentBadge) return null;

  const Icon = iconMap[recentBadge.icon as keyof typeof iconMap] || Trophy;
  const isLegendary = recentBadge.rarity === 'legendary';
  const earnedDate = recentBadge.earnedAt ? new Date(recentBadge.earnedAt) : new Date();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25,
            duration: 0.3
          }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
        >
          <div className={cn(
            "relative overflow-hidden rounded-xl shadow-xl border",
            "bg-white/95 backdrop-blur-sm dark:bg-gray-800/95",
            "border-gray-200 dark:border-gray-700"
          )}>
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge header */}
            <div className="p-5 pb-0">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                  "border-2",
                  rarityColors[recentBadge.rarity],
                  isLegendary && 'animate-pulse'
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    Nouveau badge débloqué !
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {recentBadge.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Badge details */}
            <div className="p-5 pt-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {recentBadge.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Rareté: <span className="font-medium capitalize">{recentBadge.rarity}</span></span>
                <span>Obtenu le {earnedDate.toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            {/* Progress bar for auto-hide */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-1 bg-amber-500/30"
              onAnimationComplete={() => setIsVisible(false)}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
