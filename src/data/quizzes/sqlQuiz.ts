import { Question } from '../../components/Quiz';

export const sqlQuiz: Question[] = [
  {
    id: 'sql-1',
    question: 'Quelle est la différence entre INNER JOIN et LEFT JOIN ?',
    difficulty: 'medium',
    category: 'Requêtes',
    answers: [
      {
        id: 'sql-1-a',
        text: 'INNER JOIN retourne uniquement les correspondances, LEFT JOIN retourne toutes les lignes de la table de gauche',
        isCorrect: true
      },
      {
        id: 'sql-1-b',
        text: 'LEFT JOIN est plus rapide que INNER JOIN',
        isCorrect: false
      },
      {
        id: 'sql-1-c',
        text: 'INNER JOIN trie les résultats, LEFT JOIN non',
        isCorrect: false
      },
      {
        id: 'sql-1-d',
        text: 'Il n\'y a pas de différence, ce sont des synonymes',
        isCorrect: false
      }
    ],
    explanation: 'INNER JOIN ne retourne que les lignes qui ont des correspondances dans les deux tables, tandis que LEFT JOIN retourne toutes les lignes de la table de gauche, avec les valeurs correspondantes de la table de droite ou NULL s\'il n\'y a pas de correspondance.'
  },
  {
    id: 'sql-2',
    question: 'Quelle est la différence entre WHERE et HAVING ?',
    difficulty: 'medium',
    category: 'Filtrage',
    answers: [
      {
        id: 'sql-2-a',
        text: 'WHERE filtre avant le regroupement, HAVING filtre après',
        isCorrect: true
      },
      {
        id: 'sql-2-b',
        text: 'HAVING est utilisé avec GROUP BY, WHERE non',
        isCorrect: false
      },
      {
        id: 'sql-2-c',
        text: 'WHERE est plus rapide que HAVING',
        isCorrect: false
      },
      {
        id: 'sql-2-d',
        text: 'HAVING ne peut pas utiliser d\'opérateurs logiques',
        isCorrect: false
      }
    ],
    explanation: 'WHERE filtre les lignes avant que les groupes ne soient formés, tandis que HAVING filtre les groupes après leur formation. HAVING est généralement utilisé avec GROUP BY.'
  },
  {
    id: 'sql-3',
    question: 'Qu\'est-ce qu\'une transaction en SQL ?',
    difficulty: 'easy',
    category: 'Transactions',
    answers: [
      {
        id: 'sql-3-a',
        text: 'Une séquence d\'opérations traitées comme une seule unité de travail',
        isCorrect: true
      },
      {
        id: 'sql-3-b',
        text: 'Un type de jointure entre tables',
        isCorrect: false
      },
      {
        id: 'sql-3-c',
        text: 'Une vue matérialisée',
        isCorrect: false
      },
      {
        id: 'sql-3-d',
        text: 'Une procédure stockée',
        isCorrect: false
      }
    ],
    explanation: 'Une transaction est une séquence d\'opérations effectuées comme une seule unité logique de travail, qui suit les propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité).'
  },
  {
    id: 'sql-4',
    question: 'Quelle est la différence entre DELETE et TRUNCATE ?',
    difficulty: 'medium',
    category: 'Manipulation de données',
    answers: [
      {
        id: 'sql-4-a',
        text: 'DELETE supprime des lignes spécifiques, TRUNCATE vide toute la table',
        isCorrect: true
      },
      {
        id: 'sql-4-b',
        text: 'TRUNCATE peut être annulé avec ROLLBACK, DELETE non',
        isCorrect: false
      },
      {
        id: 'sql-4-c',
        text: 'DELETE est plus rapide que TRUNCATE',
        isCorrect: false
      },
      {
        id: 'sql-4-d',
        text: 'TRUNCATE ne supprime pas les index',
        isCorrect: false
      }
    ],
    explanation: 'DELETE supprime des lignes spécifiques (ou toutes) d\'une table et peut être utilisé avec une clause WHERE. TRUNCATE supprime toutes les lignes d\'une table plus rapidement mais ne peut pas être utilisé avec WHERE.'
  },
  {
    id: 'sql-5',
    question: 'Qu\'est-ce qu\'un index en SQL ?',
    difficulty: 'easy',
    category: 'Performance',
    answers: [
      {
        id: 'sql-5-a',
        text: 'Une structure de données qui améliore la vitesse des opérations de recherche',
        isCorrect: true
      },
      {
        id: 'sql-5-b',
        text: 'Un type de contrainte de clé étrangère',
        isCorrect: false
      },
      {
        id: 'sql-5-c',
        text: 'Un synonyme de vue',
        isCorrect: false
      },
      {
        id: 'sql-5-d',
        text: 'Un type de jointure',
        isCorrect: false
      }
    ],
    explanation: 'Un index est une structure de données qui améliore la vitesse des opérations de recherche sur une table de base de données au prix d\'un espace de stockage supplémentaire et d\'un ralentissement des opérations d\'écriture.'
  }
];

export default sqlQuiz;
