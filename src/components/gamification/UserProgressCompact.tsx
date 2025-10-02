// src/components/gamification/UserProgressCompact.tsx
'use client';

import { useEffect, useState } from 'react';
import { Flame, Award, Trophy } from 'lucide-react';
import { useStreak } from '@/hooks/useStreak';
import { getUserBadges, type Badge as BadgeType } from '@/lib/gamification/badges';

export function UserProgressCompact() {
  const { streak } = useStreak();
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [stats, setStats] = useState({
    totalPoints: 0,
    quizzesCompleted: 0,
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
      if (e.key === 'user-progress' || e.key === 'user-badges') {
        loadUserStats();
        setBadges(getUserBadges());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      {/* Points */}
      <div className="flex items-center space-x-1 text-sm">
        <Award className="w-4 h-4 text-blue-400" />
        <span className="font-medium">{stats.totalPoints}</span>
      </div>
      
      {/* Badges */}
      <div className="flex items-center space-x-1 text-sm">
        <Trophy className="w-4 h-4 text-amber-400" />
        <span className="font-medium">{badges.length}</span>
      </div>
      
      {/* Série */}
      <div className="flex items-center space-x-1 text-sm">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="font-medium">{streak?.current ?? 0}</span>
      </div>
    </div>
  );
}
