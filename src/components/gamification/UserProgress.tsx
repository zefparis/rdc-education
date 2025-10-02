// src/components/gamification/UserProgress.tsx
'use client';

import { useEffect, useState } from 'react';
import { Flame, Award, Trophy } from 'lucide-react';
import { useStreak } from '@/hooks/useStreak';
import { getUserBadges, type Badge as BadgeType } from '@/lib/gamification/badges';

interface StoredProgress {
  totalPoints?: number;
  completedQuizzes?: Array<{ moduleId?: string | null }>;
}

export function UserProgress() {
  const { streak } = useStreak();
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    quizzesCompleted: 0,
    modulesMastered: 0,
  });

  useEffect(() => {
    // Charger les badges
    setBadges(getUserBadges());

    // Charger les statistiques de progression
    const loadUserStats = () => {
      if (typeof window === 'undefined') return;
      
      const progress = localStorage.getItem('user-progress');
      if (progress) {
        try {
          const data = JSON.parse(progress) as StoredProgress;
          const completedQuizzes = data.completedQuizzes ?? [];
          const masteredModuleIds = completedQuizzes
            .map((quiz) => quiz.moduleId)
            .filter((moduleId): moduleId is string => Boolean(moduleId));

          setStats({
            totalPoints: data.totalPoints || 0,
            quizzesCompleted: completedQuizzes.length,
            modulesMastered: new Set(masteredModuleIds).size,
          });
        } catch (error) {
          console.error('Error parsing user progress:', error);
        }
      }
    };

    loadUserStats();

    // Écouter les changements de stockage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user-progress' || e.key === 'user-badges') {
        loadUserStats();
        setBadges(getUserBadges());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Points totaux */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Points</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-white">
                {stats.totalPoints}
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Quiz complétés */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Quiz complétés</p>
              <p className="text-2xl font-bold text-green-900 dark:text-white">
                {stats.quizzesCompleted}
              </p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Série actuelle */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Série actuelle</p>
            <p className="text-2xl font-bold text-orange-900 dark:text-white">
              {streak?.current ?? 0} jour{(streak?.current ?? 0) !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
            <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Badges récents */}
      {badges.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Badges récents</h3>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 5).map((badge) => (
              <div
                key={badge.id}
                className="relative group"
                title={`${badge.name} - ${badge.description}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-800/30 shadow-sm flex items-center justify-center">
                  <span className="text-lg">🏆</span>
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                  <div className="font-semibold">{badge.name}</div>
                  <div className="text-gray-500 dark:text-gray-400">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
