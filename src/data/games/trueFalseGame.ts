export interface TrueFalseQuestion {
  id: string;
  question: string;
  correctAnswer: boolean;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const trueFalseQuestions: TrueFalseQuestion[] = [
  {
    id: '1',
    question: 'Le surapprentissage (overfitting) arrive quand le modèle apprend trop les données d\'entraînement.',
    correctAnswer: true,
    explanation: 'Vrai ! Le surapprentissage se produit quand un modèle apprend trop bien les données d\'entraînement, y compris le bruit, ce qui nuit à ses performances sur de nouvelles données.',
    difficulty: 'medium'
  },
  {
    id: '2',
    question: 'Le Machine Learning supervisé ne nécessite pas de labels.',
    correctAnswer: false,
    explanation: 'Faux ! Le Machine Learning supervisé nécessite des données étiquetées (labels) pour l\'entraînement du modèle.',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'Les réseaux de neurones sont toujours meilleurs que les modèles linéaires.',
    correctAnswer: false,
    explanation: 'Faux ! Les réseaux de neurones ne sont pas toujours la meilleure solution. Pour des données simples ou peu nombreuses, un modèle linéaire peut être plus efficace et plus interprétable.',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'Un dataset de test sert à évaluer la performance du modèle.',
    correctAnswer: true,
    explanation: 'Vrai ! Le dataset de test est utilisé pour évaluer les performances du modèle sur des données qu\'il n\'a jamais vues pendant l\'entraînement.',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: 'Le NLP est utilisé pour traiter des images.',
    correctAnswer: false,
    explanation: 'Faux ! Le NLP (Natural Language Processing) est utilisé pour traiter le langage naturel. Pour les images, on utilise plutôt la vision par ordinateur (Computer Vision).',
    difficulty: 'easy'
  }
];

export const GAME_ID = 'true-false-ai-quiz';

export const GAME_CONFIG = {
  id: GAME_ID,
  title: 'Quiz Vrai ou Faux IA',
  description: 'Testez vos connaissances en IA avec ce quiz Vrai/Faux',
  requiredScore: 0.7, // 70% de bonnes réponses pour réussir
  reward: {
    type: 'badge',
    id: 'ai-beginner-badge',
    name: 'Débutant IA 🎖️',
    description: 'A réussi le quiz Vrai/Faux sur les fondamentaux de l\'IA'
  }
} as const;
