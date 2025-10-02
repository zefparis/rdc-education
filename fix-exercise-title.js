// Correction du problème TypeScript dans deepLearningCourse.ts
// L'exercice manque la propriété 'title' obligatoire

const correctedExercise = {
  id: 'ex-perceptron-logic',
  title: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  description: 'Implémentez un perceptron pour apprendre la fonction logique AND.',
  difficulty: 'moyen',
  solution: `# Dataset pour la fonction AND
X_and = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y_and = np.array([0, 0, 0, 1])

# Entraînement du perceptron
perceptron_and = Perceptron(learning_rate=0.1, n_iterations=100)
perceptron_and.fit(X_and, y_and)

# Test
predictions_and = perceptron_and.predict(X_and)
print("Fonction AND - Prédictions:", predictions_and)
print("Fonction AND - Réel:", y_and)
print(f"Précision: {np.mean(predictions_and == y_and):.3f}")`
};
