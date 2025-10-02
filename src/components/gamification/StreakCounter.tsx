// src/components/gamification/StreakCounter.tsx
'use client';

import { Flame, Zap, Award, Trophy } from 'lucide-react';
import { useStreak } from '@/hooks/useStreak';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export function StreakCounter() {
  const { streak, isLoading } = useStreak();
  const [stats, setStats] = useState({
    totalPoints: 0,
    quizzesCompleted: 0,
  });

  useEffect(() => {
    // Charger les statistiques de progression
    const loadUserStats = () => {
      if (typeof window === 'undefined') return;
      
      const progress = localStorage.getItem('user-progress');
      if (progress) {
        try {
          const data = JSON.parse(progress);
          setStats({
            totalPoints: data.totalPoints || 0,
            quizzesCompleted: data.completedQuizzes?.length || 0,
          });
        } catch (error) {
          console.error('Error parsing user progress:', error);
        }
      }
    };

    loadUserStats();

    // Écouter les changements de stockage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user-progress') {
        loadUserStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading || !streak) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-3 w-full h-[60px]" />
    );
  }

  const lastActive = new Date(streak.lastActivity);
  const nextMilestone = streak.current < 3 ? 3 : streak.current < 7 ? 7 : streak.current + 7;
  const progress = (streak.current / nextMilestone) * 100;

  return (
    <div className="flex items-center gap-2 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800/30">
      <div className="p-1.5 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
        <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1">
          <p className="text-sm font-semibold text-orange-900 dark:text-white truncate">
            {streak.current} jour{streak.current !== 1 ? 's' : ''}
          </p>
          <span className="text-xs text-orange-600/80 dark:text-orange-300/80 ml-1">
            • {Math.min(Math.round(progress), 100)}% vers {nextMilestone}j
          </span>
        </div>
        <div className="w-full bg-orange-200 dark:bg-orange-900/30 rounded-full h-1.5 mt-1">
          <div 
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}