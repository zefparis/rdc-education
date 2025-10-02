import { Question } from '@/components/Quiz/types';

export const pythonQuiz: Question[] = [
  {
    id: 'py-1',
    question: 'Quelle est la différence entre une liste et un tuple en Python ?',
    difficulty: 'easy',
    category: 'Fondamentaux',
    answers: [
      {
        id: 'py-1-a',
        text: 'Les listes sont mutables, les tuples sont immuables',
        isCorrect: true
      },
      {
        id: 'py-1-b',
        text: 'Les tuples sont plus rapides que les listes',
        isCorrect: false
      },
      {
        id: 'py-1-c',
        text: 'Les listes utilisent des crochets, les tuples des accolades',
        isCorrect: false
      },
      {
        id: 'py-1-d',
        text: 'Les tuples peuvent contenir des types différents, pas les listes',
        isCorrect: false
      }
    ],
    explanation: 'En Python, la principale différence est que les listes sont mutables (on peut modifier leurs éléments) alors que les tuples sont immuables. Les deux peuvent contenir des types de données différents.'
  },
  {
    id: 'py-2',
    question: 'Comment fonctionne le GIL (Global Interpreter Lock) en Python ?',
    difficulty: 'hard',
    category: 'Performance',
    answers: [
      {
        id: 'py-2-a',
        text: 'Il empêche plusieurs threads d\'exécuter du bytecode Python en même temps',
        isCorrect: true
      },
      {
        id: 'py-2-b',
        text: 'Il optimise la gestion de la mémoire',
        isCorrect: false
      },
      {
        id: 'py-2-c',
        text: 'Il accélère les opérations mathématiques',
        isCorrect: false
      },
      {
        id: 'py-2-d',
        text: 'Il gère les dépendances entre packages',
        isCorrect: false
      }
    ],
    explanation: 'Le GIL est un verrou qui permet à un seul thread d\'exécuter du bytecode Python à la fois. Cela simplifie la gestion de la mémoire mais peut limiter les performances dans les applications multi-threads.'
  },
  {
    id: 'py-3',
    question: 'Quelle est la différence entre `==` et `is` en Python ?',
    difficulty: 'medium',
    category: 'Opérateurs',
    answers: [
      {
        id: 'py-3-a',
        text: '`==` compare les valeurs, `is` vérifie l\'identité des objets',
        isCorrect: true
      },
      {
        id: 'py-3-b',
        text: '`is` est une version plus rapide de `==`',
        isCorrect: false
      },
      {
        id: 'py-3-c',
        text: '`==` est utilisé pour les nombres, `is` pour les chaînes',
        isCorrect: false
      },
      {
        id: 'py-3-d',
        text: 'Ils sont strictement équivalents',
        isCorrect: false
      }
    ],
    explanation: '`==` compare les valeurs des objets, tandis que `is` vérifie s\'il s\'agit du même objet en mémoire.'
  },
  {
    id: 'py-4',
    question: 'Comment fonctionnent les décorateurs en Python ?',
    difficulty: 'hard',
    category: 'Fonctionnalités avancées',
    answers: [
      {
        id: 'py-4-a',
        text: 'Ce sont des fonctions qui prennent une fonction en paramètre et retournent une nouvelle fonction',
        isCorrect: true
      },
      {
        id: 'py-4-b',
        text: 'Ils permettent de créer des classes abstraites',
        isCorrect: false
      },
      {
        id: 'py-4-c',
        text: 'Ils sont utilisés pour la gestion des exceptions',
        isCorrect: false
      },
      {
        id: 'py-4-d',
        text: 'Ils servent à définir des variables globales',
        isCorrect: false
      }
    ],
    explanation: 'Les décorateurs en Python sont des fonctions qui prennent une fonction en entrée et retournent une nouvelle fonction, permettant ainsi de modifier ou d\'étendre le comportement de la fonction originale.'
  },
  {
    id: 'py-5',
    question: 'Qu\'est-ce qu\'un générateur en Python ?',
    difficulty: 'medium',
    category: 'Fonctionnalités avancées',
    answers: [
      {
        id: 'py-5-a',
        text: 'Une fonction qui utilise `yield` pour produire une séquence de valeurs à la demande',
        isCorrect: true
      },
      {
        id: 'py-5-b',
        text: 'Un outil pour créer des nombres aléatoires',
        isCorrect: false
      },
      {
        id: 'py-5-c',
        text: 'Une fonction qui génère du code Python',
        isCorrect: false
      },
      {
        id: 'py-5-d',
        text: 'Un type de boucle spéciale',
        isCorrect: false
      }
    ],
    explanation: 'Les générateurs sont des fonctions qui utilisent le mot-clé `yield` pour produire une séquence de valeurs de manière paresseuse, c\'est-à-dire uniquement quand on les demande.'
  }
];

export default pythonQuiz;
