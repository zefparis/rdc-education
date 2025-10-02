// src/components/gamification/PointsBadge.tsx
'use client';

import { Trophy, Zap } from 'lucide-react';
import { getUserBadges } from '@/lib/gamification/badges';
import { useEffect, useState } from 'react';

export function PointsBadge() {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState(0);

  useEffect(() => {
    // Charger les points et badges depuis le stockage local
    const loadUserProgress = () => {
      if (typeof window === 'undefined') return;
      
      const progress = localStorage.getItem('user-progress');
      if (progress) {
        try {
          const { totalPoints } = JSON.parse(progress);
          setPoints(totalPoints || 0);
        } catch (error) {
          console.error('Error parsing user progress:', error);
        }
      }
      
      const userBadges = getUserBadges();
      setBadges(userBadges.length);
    };

    // Charger les données initiales
    loadUserProgress();

    // Écouter les mises à jour des points et badges
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user-progress' || e.key === 'user-badges') {
        loadUserProgress();
      }
    };

    // Écouter les changements de stockage
    window.addEventListener('storage', handleStorageChange);

    // Nettoyer l'écouteur d'événements
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="flex flex-row gap-3">
      {/* Carte Points */}
      <div className="flex items-center gap-2 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800/30">
        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
          <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-900 dark:text-white">
            {points} <span className="text-xs font-normal text-blue-600/80 dark:text-blue-300/80">points</span>
          </p>
        </div>
      </div>

      {/* Carte Badges */}
      <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800/30">
        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
          <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-purple-900 dark:text-white">
            {badges} <span className="text-xs font-normal text-purple-600/80 dark:text-purple-300/80">badges</span>
          </p>
        </div>
      </div>
    </div>
  );
}
