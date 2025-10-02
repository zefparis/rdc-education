import { Exercise } from './src/config/enhancedCourseConfig';

// Exercice avec propri�t� title manquante (erreur)
const badExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Perceptron pour fonction logique',
  description: 'Impl�mentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

// Exercice correct avec toutes les propri�t�s
const goodExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Perceptron pour fonction logique',
  description: 'Impl�mentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

export { badExercise, goodExercise };
