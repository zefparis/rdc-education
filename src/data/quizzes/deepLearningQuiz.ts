import { Question } from '../../components/Quiz';

export const deepLearningQuiz: Question[] = [
  {
    id: 'dl-1',
    question: 'Qu\'est-ce qu\'un réseau de neurones à convolution (CNN) ?',
    difficulty: 'medium',
    category: 'Réseaux de neurones',
    answers: [
      {
        id: 'dl-1-a',
        text: 'Un réseau spécialement conçu pour traiter des données structurées comme les images',
        isCorrect: true
      },
      {
        id: 'dl-1-b',
        text: 'Un type de réseau utilisé uniquement pour le traitement du texte',
        isCorrect: false
      },
      {
        id: 'dl-1-c',
        text: 'Un algorithme de classification non supervisée',
        isCorrect: false
      },
      {
        id: 'dl-1-d',
        text: 'Une technique de prétraitement des données',
        isCorrect: false
      }
    ],
    explanation: 'Les CNN sont particulièrement efficaces pour le traitement d\'images car ils peuvent détecter des motifs locaux grâce à leurs couches de convolution.'
  },
  {
    id: 'dl-2',
    question: 'Qu\'est-ce que le phénomène de "vanishing gradient" ?',
    difficulty: 'hard',
    category: 'Réseaux de neurones profonds',
    answers: [
      { id: 'dl-2-a', text: 'La disparition du gradient pendant la rétropropagation', isCorrect: true },
      { id: 'dl-2-b', text: 'L\'augmentation excessive des poids du réseau', isCorrect: false },
      { id: 'dl-2-c', text: 'La convergence trop rapide de l\'apprentissage', isCorrect: false },
      { id: 'dl-2-d', text: 'La réduction de la taille des couches', isCorrect: false }
    ],
    explanation: 'Le "vanishing gradient" se produit lorsque les gradients deviennent extrêmement petits pendant la rétropropagation, ce qui ralentit ou arrête l\'apprentissage des premières couches du réseau.'
  },
  {
    id: 'dl-3',
    question: 'Qu\'est-ce qu\'une couche LSTM ?',
    difficulty: 'hard',
    category: 'Réseaux de neurones récurrents',
    answers: [
      { id: 'dl-3-a', text: 'Un type de couche récurrente capable d\'apprendre des dépendances à long terme', isCorrect: true },
      { id: 'dl-3-b', text: 'Une technique de normalisation des données', isCorrect: false },
      { id: 'dl-3-c', text: 'Un algorithme d\'optimisation', isCorrect: false },
      { id: 'dl-3-d', text: 'Un type de fonction d\'activation', isCorrect: false }
    ],
    explanation: 'Les LSTM (Long Short-Term Memory) sont un type spécial de réseau de neurones récurrents capables d\'apprendre des dépendances à long terme dans les séquences de données.'
  },
  {
    id: 'dl-4',
    question: 'Qu\'est-ce que le transfert d\'apprentissage (transfer learning) ?',
    difficulty: 'medium',
    category: 'Concepts avancés',
    answers: [
      { id: 'dl-4-a', text: 'Utiliser un modèle pré-entraîné comme point de départ pour une nouvelle tâche', isCorrect: true },
      { id: 'dl-4-b', text: 'Changer d\'algorithme d\'apprentissage automatique', isCorrect: false },
      { id: 'dl-4-c', text: 'Transformer des données non structurées en données structurées', isCorrect: false },
      { id: 'dl-4-d', text: 'Augmenter artificiellement la taille du jeu de données', isCorrect: false }
    ],
    explanation: 'Le transfert d\'apprentissage consiste à utiliser un modèle pré-entraîné sur une tâche similaire et à le réutiliser ou le raffiner pour une nouvelle tâche, ce qui permet d\'économiser du temps et des ressources.'
  },
  {
    id: 'dl-5',
    question: 'Qu\'est-ce que le "dropout" dans un réseau de neurones ?',
    difficulty: 'medium',
    category: 'Régularisation',
    answers: [
      { id: 'dl-5-a', text: 'Une technique de régularisation qui désactive aléatoirement des neurones pendant l\'entraînement', isCorrect: true },
      { id: 'dl-5-b', text: 'Une méthode pour supprimer des caractéristiques non pertinentes', isCorrect: false },
      { id: 'dl-5-c', text: 'Un type de fonction d\'activation', isCorrect: false },
      { id: 'dl-5-d', text: 'Une technique de normalisation des données d\'entrée', isCorrect: false }
    ],
    explanation: 'Le dropout est une technique de régularisation qui consiste à désactiver aléatoirement une proportion des neurones pendant l\'entraînement pour éviter le surapprentissage.'
  }
];

export default deepLearningQuiz;
