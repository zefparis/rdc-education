// src/lib/gamification/streaks.ts
import { addDaysToDate, isSameDate, getDaysBetween } from '../utils/date';
import { setStorage, getStorage } from '../utils/storage';

export interface Streak {
  current: number;
  longest: number;
  lastActivity: string;
  totalDays: number;
  points: number;
}

const STREAK_STORAGE_KEY = 'user-streak';

export function initializeStreak(): Streak {
  return {
    current: 0,
    longest: 0,
    lastActivity: new Date().toISOString(),
    totalDays: 0,
    points: 0,
  };
}

export function loadStreak(): Streak {
  const savedStreak = getStorage<Streak>(STREAK_STORAGE_KEY);
  return savedStreak || initializeStreak();
}

export function saveStreak(streak: Streak): void {
  setStorage(STREAK_STORAGE_KEY, streak);
}

export function updateStreak(streak: Streak): Streak {
  const today = new Date();
  const lastActive = new Date(streak.lastActivity);
  
  if (isSameDate(today, lastActive)) {
    return streak;
  }

  const dayDiff = getDaysBetween(today, lastActive);
  const updatedStreak = { ...streak };

  if (dayDiff === 1) {
    updatedStreak.current += 1;
    updatedStreak.longest = Math.max(updatedStreak.longest, updatedStreak.current);
    updatedStreak.points += calculateDailyPoints(updatedStreak.current);
  } else if (dayDiff > 1) {
    updatedStreak.current = 1;
    updatedStreak.points += 10;
  }

  updatedStreak.lastActivity = today.toISOString();
  updatedStreak.totalDays += 1;
  
  saveStreak(updatedStreak);
  return updatedStreak;
}

function calculateDailyPoints(streakDays: number): number {
  return 10 + Math.min(Math.floor(streakDays / 3), 20);
}