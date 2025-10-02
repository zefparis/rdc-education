// src/lib/gamification/userProgress.ts
import { getStorage, setStorage } from '../utils/storage';
import { Badge, checkForNewBadges } from './badges';

export interface QuizResult {
  id: string;
  moduleId: string; // Maintenant obligatoire
  score: number;
  total: number;
  completedAt: string;
}

export interface UserProgress {
  totalPoints: number;
  completedQuizzes: QuizResult[];
  lastActivity: string;
}

const USER_PROGRESS_KEY = 'user-progress';

function initializeUserProgress(): UserProgress {
  return {
    totalPoints: 0,
    completedQuizzes: [],
    lastActivity: new Date().toISOString(),
  };
}

export function loadUserProgress(): UserProgress {
  return getStorage<UserProgress>(USER_PROGRESS_KEY) || initializeUserProgress();
}

function saveUserProgress(progress: UserProgress): void {
  setStorage(USER_PROGRESS_KEY, progress);
}

export function updateUserProgress(quizResult: Omit<QuizResult, 'completedAt'>): {
  updatedProgress: UserProgress;
  newBadges: Badge[];
} {
  const userProgress = loadUserProgress();
  const now = new Date().toISOString();
  
  // Vérifier si le quiz a déjà été complété
  const existingQuizIndex = userProgress.completedQuizzes.findIndex(
    q => q.id === quizResult.id && q.moduleId === quizResult.moduleId
  );

  const newQuizResult = {
    ...quizResult,
    completedAt: now,
  };

  // Mettre à jour ou ajouter le résultat du quiz
  if (existingQuizIndex >= 0) {
    userProgress.completedQuizzes[existingQuizIndex] = newQuizResult;
  } else {
    userProgress.completedQuizzes.push(newQuizResult);
  }

  // Mettre à jour les points (10 points par bonne réponse)
  userProgress.totalPoints += quizResult.score * 10;
  userProgress.lastActivity = now;

  // Vérifier les nouveaux badges
  const stats = {
    quizzesCompleted: userProgress.completedQuizzes.length,
    modulesMastered: new Set(userProgress.completedQuizzes.map(q => q.moduleId)).size,
    completedQuizzes: userProgress.completedQuizzes.map(q => ({
      id: q.id,
      moduleId: q.moduleId,
      score: q.score,
      completedAt: q.completedAt,
    })),
  };

  const newBadges = checkForNewBadges({
    streak: 0, // Le streak est géré séparément
    stats,
  });

  // Enregistrer les modifications
  saveUserProgress(userProgress);

  return {
    updatedProgress: userProgress,
    newBadges,
  };
}

export function getUserStats() {
  const progress = loadUserProgress();
  
  return {
    totalPoints: progress.totalPoints,
    quizzesCompleted: progress.completedQuizzes.length,
    modulesMastered: new Set(progress.completedQuizzes.map(q => q.moduleId)).size,
    lastActivity: progress.lastActivity,
  };
}
