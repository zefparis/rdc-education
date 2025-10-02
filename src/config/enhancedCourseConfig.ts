/**
 * Configuration étendue des modules pédagogiques
 * Plateforme IA-Solution RDC - Cours complets et détaillés
 */

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'python' | 'javascript' | 'typescript' | 'sql' | 'bash';
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  solution?: string;
  hints?: string[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  estimatedTime?: string;
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
  resources?: {
    title: string;
    type: 'article' | 'video' | 'documentation' | 'dataset';
    url: string;
  }[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  icon: string;
  color: string;
  image: string;
  pdf?: string;
  notebook?: string;
  audio?: string;
  colabUrl?: string;
  objectives: string[];
  prerequisites?: string[];
  sections: Section[];
  finalProject?: {
    title: string;
    description: string;
    requirements: string[];
    deliverables: string[];
  };
  resources?: {
    title: string;
    type: 'article' | 'video' | 'documentation' | 'dataset';
    url: string;
  }[];
  tags?: string[];
}

export interface CourseProgress {
  moduleSlug: string;
  sectionId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent?: number; // en minutes
}

export interface UserProgress {
  userId: string;
  modules: CourseProgress[];
  certificates?: {
    moduleSlug: string;
    earnedAt: Date;
    score: number;
  }[];
}
