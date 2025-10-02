import { Exercise } from './src/config/enhancedCourseConfig';

// Exercice avec propriété title manquante (erreur)
const badExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Perceptron pour fonction logique',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

// Exercice correct avec toutes les propriétés
const goodExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Perceptron pour fonction logique',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

export { badExercise, goodExercise };
