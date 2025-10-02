// Test de l'interface Exercise
import { Exercise } from './src/config/enhancedCourseConfig';

// Exercice avec propriété title manquante (erreur)
const badExercise: Exercise = {
  id: 'ex-perceptron-logic',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...' // title manquant !
};

// Exercice correct
const goodExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};
