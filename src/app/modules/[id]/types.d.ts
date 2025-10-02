// Types pour les ressources de cours
export interface Prerequisite {
  id: string;
  title: string;
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  solution?: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  estimatedTime?: string;
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'documentation' | 'other';
  url: string;
}

export interface FinalProject {
  title: string;
  description: string;
  requirements: string[];
  deliverables: string[];
}

export interface CourseModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  prerequisites: string[];
  objectives: string[];
  sections: Section[];
  resources: Resource[];
  finalProject?: FinalProject;
}
