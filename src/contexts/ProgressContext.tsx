"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';

interface CourseProgress {
  moduleSlug: string;
  sectionId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent?: number; // en minutes
  startedAt?: Date;
}

interface UserProgress {
  userId: string;
  modules: CourseProgress[];
  certificates?: {
    moduleSlug: string;
    earnedAt: Date;
    score: number;
  }[];
}

interface GameActivity {
  gameId: string;
  completed: boolean;
  score: number;
  completedAt?: string;
  data?: Record<string, unknown>;
}

interface ProgressContextType {
  progress: UserProgress | null;
  completedActivities: string[];
  markSectionComplete: (moduleSlug: string, sectionId: string) => void;
  markSectionIncomplete: (moduleSlug: string, sectionId: string) => void;
  getSectionProgress: (moduleSlug: string, sectionId: string) => CourseProgress | null;
  getModuleProgress: (moduleSlug: string) => CourseProgress[];
  getModuleCompletionPercentage: (moduleSlug: string) => number;
  startSection: (moduleSlug: string, sectionId: string) => void;
  completeActivity: (activityId: string, data?: Record<string, unknown>) => void;
  getCompletedActivities: () => string[];
  isActivityCompleted: (activityId: string) => boolean;
  saveProgress: () => void;
}


// Create the context
const ProgressContext = createContext<ProgressContextType | null>(null);

// Key for localStorage
const PROGRESS_STORAGE_KEY = 'ia-solution-progress';

export interface ProgressProviderProps {
  children: React.ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [activities, setActivities] = useState<Record<string, GameActivity>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        
        // Charger les activités
        if (parsed.activities) {
          setActivities(parsed.activities);
        }
        
        // Convertir les dates depuis les chaînes
        if (parsed.modules) {
          parsed.modules = parsed.modules.map((moduleProgress: Omit<CourseProgress, 'completedAt' | 'startedAt'> & {
            completedAt?: string;
            startedAt?: string;
          }) => ({
            ...moduleProgress,
            completedAt: moduleProgress.completedAt ? new Date(moduleProgress.completedAt) : undefined,
            startedAt: moduleProgress.startedAt ? new Date(moduleProgress.startedAt) : undefined,
          }));
        }
        if (parsed.certificates) {
          parsed.certificates = parsed.certificates.map((cert: {
            moduleSlug: string;
            earnedAt: string;
            score: number;
          }) => ({
            ...cert,
            earnedAt: new Date(cert.earnedAt),
          }));
        }
        setProgress(parsed);
      } catch (error) {
        console.error('Erreur lors du chargement de la progression:', error);
      }
    }
  }, []);

  // Mark an activity as completed
  const completeActivity = useCallback((activityId: string, data: Record<string, unknown> = {}) => {
    setActivities(prev => {
      const score = typeof data.score === 'number' ? data.score : 0;
      return {
        ...prev,
        [activityId]: {
          gameId: activityId,
          completed: true,
          score,
          completedAt: new Date().toISOString(),
          data
        }
      };
    });
  }, []);

  // Obtenir la liste des activités terminées
  const getCompletedActivities = (): string[] => {
    return Object.entries(activities)
      .filter(([_, activity]) => activity.completed)
      .map(([id]) => id);
  };

  // Vérifier si une activité est terminée
  const isActivityCompleted = (activityId: string): boolean => {
    return !!activities[activityId]?.completed;
  };

  // Save progress to localStorage
  const saveProgress = () => {
    if (progress) {
      const dataToSave = {
        ...progress,
        activities
      };
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(dataToSave));
    }
  };

  // Marquer une section comme terminée
  const markSectionComplete = (moduleSlug: string, sectionId: string) => {
    setProgress(prev => {
      if (!prev) {
        const newProgress: UserProgress = {
          userId: 'anonymous',
          modules: [{
            moduleSlug,
            sectionId,
            completed: true,
            completedAt: new Date(),
            startedAt: new Date(),
          }],
        };
        return newProgress;
      }

      const updatedModules = prev.modules.map(moduleProgress => {
        if (moduleProgress.moduleSlug === moduleSlug && moduleProgress.sectionId === sectionId) {
          return {
            ...moduleProgress,
            completed: true,
            completedAt: new Date(),
          };
        }
        return moduleProgress;
      });

      // Si cette section n'existe pas encore, l'ajouter
      const sectionExists = updatedModules.some(mp => mp.moduleSlug === moduleSlug && mp.sectionId === sectionId);
      if (!sectionExists) {
        updatedModules.push({
          moduleSlug,
          sectionId,
          completed: true,
          completedAt: new Date(),
          startedAt: new Date(),
        });
      }

      return {
        ...prev,
        modules: updatedModules,
      };
    });
  };

  // Marquer une section comme non terminée
  const markSectionIncomplete = (moduleSlug: string, sectionId: string) => {
    setProgress(prev => {
      if (!prev) return null;

      const updatedModules = prev.modules.map(moduleProgress => {
        if (moduleProgress.moduleSlug === moduleSlug && moduleProgress.sectionId === sectionId) {
          return {
            ...moduleProgress,
            completed: false,
            completedAt: undefined,
          };
        }
        return moduleProgress;
      });

      return {
        ...prev,
        modules: updatedModules,
      };
    });
  };

  // Démarrer une section (pour le suivi du temps)
  const startSection = (moduleSlug: string, sectionId: string) => {
    setProgress(prev => {
      if (!prev) {
        const newProgress: UserProgress = {
          userId: 'anonymous',
          modules: [{
            moduleSlug,
            sectionId,
            completed: false,
            startedAt: new Date(),
          }],
        };
        return newProgress;
      }

      const updatedModules = prev.modules.map(moduleProgress => {
        if (moduleProgress.moduleSlug === moduleSlug && moduleProgress.sectionId === sectionId) {
          return {
            ...moduleProgress,
            startedAt: new Date(),
          };
        }
        return moduleProgress;
      });

      // Si cette section n'existe pas encore, l'ajouter
      const sectionExists = updatedModules.some(mp => mp.moduleSlug === moduleSlug && mp.sectionId === sectionId);
      if (!sectionExists) {
        updatedModules.push({
          moduleSlug,
          sectionId,
          completed: false,
          startedAt: new Date(),
        });
      }

      return {
        ...prev,
        modules: updatedModules,
      };
    });
  };

  // Obtenir la progression d'une section spécifique
  const getSectionProgress = (moduleSlug: string, sectionId: string): CourseProgress | null => {
    if (!progress) return null;
    return progress.modules.find(mp => mp.moduleSlug === moduleSlug && mp.sectionId === sectionId) || null;
  };

  // Obtenir toute la progression d'un module
  const getModuleProgress = (moduleSlug: string): CourseProgress[] => {
    if (!progress) return [];
    return progress.modules.filter(mp => mp.moduleSlug === moduleSlug);
  };

  // Calculer le pourcentage de complétion d'un module
  const getModuleCompletionPercentage = (moduleSlug: string): number => {
    if (!progress) return 0;
    const moduleProgress = progress.modules.filter(mp => mp.moduleSlug === moduleSlug);
    if (moduleProgress.length === 0) return 0;
    const completedCount = moduleProgress.filter(mp => mp.completed).length;
    return (completedCount / moduleProgress.length) * 100;
  };

  const contextValue: ProgressContextType = {
    progress,
    completedActivities: getCompletedActivities(),
    markSectionComplete,
    markSectionIncomplete,
    getSectionProgress,
    getModuleProgress,
    getModuleCompletionPercentage,
    startSection,
    completeActivity,
    getCompletedActivities,
    isActivityCompleted,
    saveProgress,
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = React.useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress doit être utilisé dans un ProgressProvider');
  }
  return context;
}
