import { Question } from '@/components/Quiz/types';

export const machineLearningQuiz: Question[] = [
  {
    id: 'ml-1',
    question: 'Quelle est la différence entre l\'apprentissage supervisé et non supervisé ?',
    difficulty: 'easy',
    category: 'Fondamentaux',
    answers: [
      {
        id: 'ml-1-a',
        text: 'Le supervisé utilise des données étiquetées, le non supervisé non',
        isCorrect: true
      },
      {
        id: 'ml-1-b',
        text: 'Le non supervisé est plus rapide à entraîner',
        isCorrect: false
      },
      {
        id: 'ml-1-c',
        text: 'Le supervisé ne nécessite pas de données',
        isCorrect: false
      },
      {
        id: 'ml-1-d',
        text: 'Il n\'y a pas de différence',
        isCorrect: false
      }
    ],
    explanation: 'L\'apprentissage supervisé nécessite des données étiquetées pour l\'entraînement, tandis que l\'apprentissage non supervisé trouve des motifs dans des données non étiquetées.'
  },
  {
    id: 'ml-2',
    question: 'Qu\'est-ce que le sur-apprentissage (overfitting) ?',
    difficulty: 'medium',
    category: 'Concepts avancés',
    answers: [
      { id: 'ml-2-a', text: 'Le modèle mémorise les données d\'entraînement', isCorrect: true },
      { id: 'ml-2-b', text: 'Le modèle n\'apprend pas assez', isCorrect: false },
      { id: 'ml-2-c', text: 'Le modèle est trop simple', isCorrect: false },
      { id: 'ml-2-d', text: 'Le modèle utilise trop de données', isCorrect: false }
    ],
    explanation: 'Le sur-apprentissage se produit quand un modèle apprend trop bien les données d\'entraînement, y compris le bruit, ce qui nuit à ses performances sur de nouvelles données.'
  },
  {
    id: 'ml-3',
    question: 'Quelle est la fonction d\'activation la plus utilisée dans les réseaux de neurones ?',
    difficulty: 'medium',
    category: 'Réseaux de neurones',
    answers: [
      { id: 'ml-3-a', text: 'Sigmoïde', isCorrect: false },
      { id: 'ml-3-b', text: 'ReLU (Rectified Linear Unit)', isCorrect: true },
      { id: 'ml-3-c', text: 'Tangente hyperbolique', isCorrect: false },
      { id: 'ml-3-d', text: 'Fonction linéaire', isCorrect: false }
    ],
    explanation: 'ReLU (Rectified Linear Unit) est largement utilisée car elle est efficace à calculer et aide à réduire les problèmes de gradient disparaissant.'
  },
  {
    id: 'ml-4',
    question: 'Qu\'est-ce que la validation croisée (cross-validation) ?',
    difficulty: 'medium',
    category: 'Évaluation des modèles',
    answers: [
      { id: 'ml-4-a', text: 'Une technique pour diviser les données en plusieurs parties', isCorrect: true },
      { id: 'ml-4-b', text: 'Un type d\'algorithme de clustering', isCorrect: false },
      { id: 'ml-4-c', text: 'Une méthode de prétraitement des données', isCorrect: false },
      { id: 'ml-4-d', text: 'Une technique de réduction de dimension', isCorrect: false }
    ],
    explanation: 'La validation croisée consiste à diviser les données en k parties égales, puis à effectuer k entraînements en utilisant k-1 parties pour l\'entraînement et la dernière pour la validation.'
  },
  {
    id: 'ml-5',
    question: 'Qu\'est-ce qu\'un arbre de décision ?',
    difficulty: 'easy',
    category: 'Algorithmes',
    answers: [
      { id: 'ml-5-a', text: 'Un modèle qui divise les données en fonction des caractéristiques', isCorrect: true },
      { id: 'ml-5-b', text: 'Un type de réseau de neurones', isCorrect: false },
      { id: 'ml-5-c', text: 'Une technique de prétraitement', isCorrect: false },
      { id: 'ml-5-d', text: 'Une méthode de réduction de dimension', isCorrect: false }
    ],
    explanation: 'Un arbre de décision est un modèle qui divise récursivement les données en fonction des caractéristiques pour faire des prédictions.'
  }
];

export default machineLearningQuiz;
