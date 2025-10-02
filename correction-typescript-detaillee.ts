/**
 * CORRECTION DU PROBLÈME TYPESCRIPT
 *
 * Le problème : Dans deepLearningCourse.ts, l'exercice manque la propriété 'title'
 * qui est obligatoire selon l'interface Exercise.
 *
 * Ligne problématique (environ 193-210) :
 * {
 *   id: 'ex-perceptron-logic',
 *   description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
 *   difficulty: 'moyen',
 *   solution: '...'
 * }
 *
 * Correction à appliquer : ajouter la ligne title
 */

import { Exercise } from './src/config/enhancedCourseConfig';

// Version incorrecte (manque title)
const incorrectExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Perceptron pour fonction logique',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...' // Erreur TypeScript: Property 'title' is missing
};

// Version correcte (avec title)
const correctExercise: Exercise = {
  id: 'ex-perceptron-logic',
  title: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: '...'
};

// Dans le fichier deepLearningCourse.ts, remplacez :
const oldString = `        {
          id: 'ex-perceptron-logic',
          description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
          difficulty: 'moyen',
          solution: \`# Dataset pour la fonction AND
X_and = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y_and = np.array([0, 0, 0, 1])

# Entraînement du perceptron
perceptron_and = Perceptron(learning_rate=0.1, n_iterations=100)
perceptron_and.fit(X_and, y_and)

# Test
predictions_and = perceptron_and.predict(X_and)
print("Fonction AND - Prédictions:", predictions_and)
print("Fonction AND - Réel:", y_and)
print(f"Précision: {np.mean(predictions_and == y_and):.3f}")\`
        }`;

const newString = `        {
          id: 'ex-perceptron-logic',
          title: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
          description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
          difficulty: 'moyen',
          solution: \`# Dataset pour la fonction AND
X_and = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y_and = np.array([0, 0, 0, 1])

# Entraînement du perceptron
perceptron_and = Perceptron(learning_rate=0.1, n_iterations=100)
perceptron_and.fit(X_and, y_and)

# Test
predictions_and = perceptron_and.predict(X_and)
print("Fonction AND - Prédictions:", predictions_and)
print("Fonction AND - Réel:", y_and)
print(f"Précision: {np.mean(predictions_and == y_and):.3f}")\`
        }`;

console.log("✅ Correction identifiée et préparée");
console.log("📝 Il faut ajouter la propriété 'title' à l'exercice");
console.log("🎯 Le titre à ajouter : 'Implémentez un perceptron pour apprendre la fonction logique AND.'");
