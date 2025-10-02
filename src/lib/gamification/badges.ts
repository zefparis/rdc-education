// src/lib/gamification/badges.ts
import { getStorage, setStorage } from '../utils/storage';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type BadgeCategory = 'achievement' | 'milestone' | 'special' | 'event';

export interface BadgeCondition {
  type: 'streak' | 'quiz_completed' | 'module_mastered' | 'challenge_completed';
  target: number;
  moduleId?: string; // Pour les badges spécifiques à un module
  quizId?: string;   // Pour les badges spécifiques à un quiz
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  condition: BadgeCondition;
  xpReward: number;
  unlockedAt?: string;
  earnedAt?: string;
}

const BADGES_STORAGE_KEY = 'user-badges';

export const BASE_BADGES: Badge[] = [
  // Badges de progression générale
  {
    id: 'first_steps',
    name: 'Premiers Pas',
    description: 'Complétez votre premier quiz',
    icon: 'footprints',
    category: 'achievement',
    rarity: 'common',
    condition: { type: 'quiz_completed', target: 1 },
    xpReward: 50,
  },
  {
    id: 'quiz_enthusiast',
    name: 'Passionné des Quiz',
    description: 'Complétez 5 quiz',
    icon: 'check-circle',
    category: 'achievement',
    rarity: 'uncommon',
    condition: { type: 'quiz_completed', target: 5 },
    xpReward: 100,
  },
  {
    id: 'quiz_master',
    name: 'Maître des Quiz',
    description: 'Complétez 20 quiz',
    icon: 'award',
    category: 'achievement',
    rarity: 'rare',
    condition: { type: 'quiz_completed', target: 20 },
    xpReward: 250,
  },
  
  // Badges de série
  {
    id: 'three_day_streak',
    name: 'En Chauffage',
    description: '3 jours consécutifs d\'activité',
    icon: 'flame',
    category: 'milestone',
    rarity: 'uncommon',
    condition: { type: 'streak', target: 3 },
    xpReward: 100,
  },
  {
    id: 'one_week_streak',
    name: 'Régularité',
    description: '7 jours consécutifs d\'activité',
    icon: 'calendar-check',
    category: 'milestone',
    rarity: 'rare',
    condition: { type: 'streak', target: 7 },
    xpReward: 250,
  },
  {
    id: 'monthly_champion',
    name: 'Champion Mensuel',
    description: '30 jours consécutifs d\'activité',
    icon: 'trophy',
    category: 'milestone',
    rarity: 'epic',
    condition: { type: 'streak', target: 30 },
    xpReward: 1000,
  },
  
  // Badges spécifiques aux modules
  {
    id: 'module_explorer',
    name: 'Explorateur',
    description: 'Complétez votre premier module',
    icon: 'compass',
    category: 'achievement',
    rarity: 'common',
    condition: { type: 'module_mastered', target: 1 },
    xpReward: 100,
  },
  {
    id: 'module_master',
    name: 'Maître des Modules',
    description: 'Complétez 5 modules différents',
    icon: 'star',
    category: 'achievement',
    rarity: 'rare',
    condition: { type: 'module_mastered', target: 5 },
    xpReward: 500,
  },
  
  // Badges spécifiques aux quiz
  {
    id: 'perfect_score',
    name: 'Score Parfait',
    description: 'Obtenez un score parfait à un quiz',
    icon: 'zap',
    category: 'achievement',
    rarity: 'rare',
    condition: { type: 'quiz_completed', target: 1, quizId: 'perfect-score' },
    xpReward: 200,
  },
  {
    id: 'ai_quiz_expert',
    name: 'Expert en IA',
    description: 'A réussi le quiz sur les fondamentaux de l\'IA',
    icon: 'brain',
    category: 'achievement',
    rarity: 'rare',
    condition: { type: 'quiz_completed', target: 1, quizId: 'true-false-ai-quiz' },
    xpReward: 150,
  },
  {
    id: 'ai_module_master',
    name: 'Maître de l\'IA',
    description: 'A complété le module sur les fondamentaux de l\'IA',
    icon: 'brain-circuit',
    category: 'achievement',
    rarity: 'epic',
    condition: { type: 'module_mastered', target: 1, moduleId: 'introduction-ia' },
    xpReward: 300,
  },
];

export function getUserBadges(): Badge[] {
  return getStorage<Badge[]>(BADGES_STORAGE_KEY) || [];
}

export function unlockBadge(badgeId: string): Badge | null {
  const badge = BASE_BADGES.find(b => b.id === badgeId);
  if (!badge) return null;

  const userBadges = getUserBadges();
  if (userBadges.some(b => b.id === badgeId)) return null;

  const now = new Date().toISOString();
  const newBadge: Badge = {
    ...badge,
    unlockedAt: now,
    earnedAt: now
  };

  const updatedBadges = [...userBadges, newBadge];
  setStorage(BADGES_STORAGE_KEY, updatedBadges);
  
  // Déclencher un événement personnalisé pour notifier de l'obtention d'un nouveau badge
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('badge-unlocked', { 
      detail: { badges: updatedBadges } 
    }));
    
    // Pour le support des onglets multiples
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(updatedBadges));
  }
  
  return newBadge;
}

export interface BadgeCheckOptions {
  streak: number;
  stats: {
    quizzesCompleted: number;
    modulesMastered: number;
    completedQuizzes?: Array<{
      id: string;
      moduleId?: string;
      score: number;
      completedAt: string;
    }>;
  };
}

export function checkForNewBadges(options: BadgeCheckOptions): Badge[] {
  const { streak, stats } = options;
  const unlocked: Badge[] = [];
  const userBadges = getUserBadges();

  for (const badge of BASE_BADGES) {
    // Vérifier si le badge est déjà débloqué
    if (userBadges.some(b => b.id === badge.id)) continue;

    let conditionMet = false;
    const { type, target, quizId, moduleId } = badge.condition;

    switch (type) {
      case 'streak':
        // Vérifier la série de jours consécutifs
        conditionMet = streak >= target;
        break;
        
      case 'quiz_completed':
        // Vérifier si c'est un badge spécifique à un quiz
        if (quizId) {
          if (quizId === 'perfect-score') {
            // Vérifier si l'utilisateur a obtenu un score parfait à n'importe quel quiz
            const perfectQuiz = stats.completedQuizzes?.some(q => q.score === 100);
            conditionMet = !!perfectQuiz;
          } else {
            // Vérifier un quiz spécifique
            const quizCompleted = stats.completedQuizzes?.some(q => q.id === quizId);
            conditionMet = !!quizCompleted;
          }
        } else {
          // Badge général de complétion de quiz
          conditionMet = stats.quizzesCompleted >= target;
        }
        break;
        
      case 'module_mastered':
        // Vérifier si c'est un badge spécifique à un module
        if (moduleId) {
          const moduleCompleted = stats.completedQuizzes?.some(q => q.moduleId === moduleId);
          conditionMet = !!moduleCompleted && stats.modulesMastered >= target;
        } else {
          // Badge général de modules complétés
          conditionMet = stats.modulesMastered >= target;
        }
        break;
        
      case 'challenge_completed':
        // À implémenter pour les futurs défis
        break;
    }

    if (conditionMet) {
      const newBadge = unlockBadge(badge.id);
      if (newBadge) {
        unlocked.push(newBadge);
        
        // Déclencher un événement personnalisé pour chaque nouveau badge
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('new-badge-unlocked', { 
            detail: { badge: newBadge } 
          }));
        }
      }
    }
  }

  return unlocked;
}