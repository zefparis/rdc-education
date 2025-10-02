// src/hooks/useStreak.ts
import { useState, useEffect } from 'react';
import { Streak, loadStreak, updateStreak, saveStreak } from '../lib/gamification/streaks';
import { unlockBadge } from '../lib/gamification/badges';

export function useStreak() {
  const [streak, setStreak] = useState<Streak | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedStreak = loadStreak();
    const updatedStreak = updateStreak(loadedStreak);
    setStreak(updatedStreak);
    setIsLoading(false);

    checkForNewBadges(updatedStreak);
  }, []);

  const checkForNewBadges = (currentStreak: Streak) => {
    if (currentStreak.current >= 3) {
      unlockBadge('three_day_streak');
    }
    if (currentStreak.current >= 7) {
      unlockBadge('one_week_streak');
    }
  };

  const completeActivity = (): Streak | null => {
    if (!streak) return null;

    const updated = updateStreak(streak);
    setStreak(updated);
    checkForNewBadges(updated);
    return updated;
  };

  return {
    streak,
    isLoading,
    completeActivity,
  };
}