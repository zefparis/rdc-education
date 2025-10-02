/**
 * CORRECTION DU PROBLÈME TYPESCRIPT
 *
 * Problème : L'interface Exercise nécessite une propriété 'title' obligatoire
 * mais l'exercice dans deepLearningCourse.ts ne l'a pas.
 *
 * Solution : Ajouter la propriété 'title' à l'exercice.
 */

// Dans enhancedCourseConfig.ts, l'interface Exercise est définie comme :
export interface Exercise {
  id: string;
  title: string;        // ← Cette propriété est obligatoire
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  solution?: string;
  hints?: string[];
}

// Dans deepLearningCourse.ts, l'exercice problématique :
const badExercise = {
  id: 'ex-perceptron-logic',
  // title: 'Implémentez un perceptron pour apprendre la fonction logique AND.', ← MANQUANT !
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

// Correction à appliquer :
const correctedExercise = {
  id: 'ex-perceptron-logic',
  title: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

// Même correction pour les autres exercices si nécessaire
console.log("✅ Correction identifiée : ajouter la propriété 'title' à l'exercice");
console.log("📝 Titre à ajouter : 'Implémentez un perceptron pour apprendre la fonction logique AND.'");
