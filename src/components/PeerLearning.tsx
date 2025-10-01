'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Award,
  TrendingUp,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Reply
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: 'Débutant' | 'Intermédiaire' | 'Avancé';
    reputation: number;
  };
  category: 'Python' | 'Machine Learning' | 'Deep Learning' | 'IA Générative' | 'MLOps' | 'Autre';
  tags: string[];
  createdAt: string;
  answers: Answer[];
  views: number;
  likes: number;
  isResolved: boolean;
}

interface Answer {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: 'Débutant' | 'Intermédiaire' | 'Avancé';
    reputation: number;
  };
  createdAt: string;
  likes: number;
  isAccepted: boolean;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    title: 'Comment déboguer un modèle de Deep Learning qui ne converge pas ?',
    content: 'Je travaille sur un modèle CNN pour la classification d\'images médicales, mais la perte ne diminue pas après plusieurs époques. J\'ai essayé différents learning rates et optimizers mais rien ne marche.',
    author: {
      name: 'Sarah Mbala',
      avatar: '/avatars/sarah.jpg',
      level: 'Intermédiaire',
      reputation: 245
    },
    category: 'Deep Learning',
    tags: ['CNN', 'Convergence', 'Debugging'],
    createdAt: '2024-01-20T14:30:00Z',
    answers: [
      {
        id: '1',
        content: 'Vérifiez d\'abord vos données : normalization, augmentation, qualité des labels. Puis regardez l\'architecture : trop de paramètres ? Regularization appropriée ? Learning rate schedule ?',
        author: {
          name: 'Dr. Marie Kabila',
          avatar: '/avatars/marie.jpg',
          level: 'Avancé',
          reputation: 892
        },
        createdAt: '2024-01-20T15:45:00Z',
        likes: 12,
        isAccepted: true
      }
    ],
    views: 156,
    likes: 8,
    isResolved: true
  },
  {
    id: '2',
    title: 'Erreur "CUDA out of memory" avec PyTorch - solutions ?',
    content: 'Quand j\'essaie d\'entraîner mon modèle sur GPU, j\'obtiens cette erreur. Comment optimiser la mémoire GPU ?',
    author: {
      name: 'Jean Mwamba',
      avatar: '/avatars/jean.jpg',
      level: 'Débutant',
      reputation: 67
    },
    category: 'Machine Learning',
    tags: ['PyTorch', 'CUDA', 'GPU', 'Mémoire'],
    createdAt: '2024-01-19T10:15:00Z',
    answers: [],
    views: 89,
    likes: 3,
    isResolved: false
  },
  {
    id: '3',
    title: 'Meilleurs pratiques pour le déploiement MLOps en RDC',
    content: 'Quelles sont vos recommandations pour déployer des modèles ML en production dans un contexte congolais (ressources limitées, connectivité intermittente) ?',
    author: {
      name: 'Antoine Kabongo',
      avatar: '/avatars/antoine.jpg',
      level: 'Avancé',
      reputation: 567
    },
    category: 'MLOps',
    tags: ['MLOps', 'Déploiement', 'Production', 'RDC'],
    createdAt: '2024-01-18T16:20:00Z',
    answers: [
      {
        id: '2',
        content: 'Pour les environnements RDC : utilisez des modèles légers (MobileNet), déploiement edge sur Raspberry Pi, APIs REST simples avec Flask/FastAPI.',
        author: {
          name: 'Pierre Lukusa',
          avatar: '/avatars/pierre.jpg',
          level: 'Intermédiaire',
          reputation: 334
        },
        createdAt: '2024-01-18T17:30:00Z',
        likes: 7,
        isAccepted: false
      }
    ],
    views: 203,
    likes: 15,
    isResolved: false
  }
];

export default function PeerLearning() {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(sampleQuestions);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);

  const categories = ['Tous', 'Python', 'Machine Learning', 'Deep Learning', 'IA Générative', 'MLOps', 'Autre'];

  useEffect(() => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, selectedCategory]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'text-green-400 bg-green-400/10';
      case 'Intermédiaire': return 'text-yellow-400 bg-yellow-400/10';
      case 'Avancé': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Il y a moins d\'une heure';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return `Il y a ${Math.floor(diffInHours / 24)}j`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-3 bg-green-600/20 rounded-full mb-4">
          <Users size={32} className="text-green-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Communauté d&apos;Apprentissage
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Posez vos questions, partagez vos connaissances et progressez ensemble.
          Notre communauté d&apos;étudiants IA vous accompagne dans votre parcours.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-500 mb-1">{questions.length}</div>
          <div className="text-sm text-gray-400">Questions</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-500 mb-1">
            {questions.reduce((acc, q) => acc + q.answers.length, 0)}
          </div>
          <div className="text-sm text-gray-400">Réponses</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-500 mb-1">
            {questions.filter(q => q.isResolved).length}
          </div>
          <div className="text-sm text-gray-400">Résolues</div>
        </div>
        <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500 mb-1">
            {Math.round((questions.filter(q => q.isResolved).length / questions.length) * 100) || 0}%
          </div>
          <div className="text-sm text-gray-400">Taux de Résolution</div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#262626] border border-[#404040] rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MessageCircle size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-green-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* New Question Button */}
          <button
            onClick={() => setShowNewQuestionForm(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <HelpCircle size={20} />
            Poser une Question
          </button>
        </div>
      </motion.div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#262626] border border-[#404040] rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-300"
            >
              {/* Question Header */}
              <div className="p-6 border-b border-[#404040]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {question.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{question.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>par {question.author.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(question.author.level)}`}>
                          {question.author.level}
                        </span>
                        <span>•</span>
                        <span>{formatTimeAgo(question.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {question.isResolved && (
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <CheckCircle size={16} />
                      <span>Résolue</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {question.content}
                </p>

                {/* Tags and Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <span>{question.answers.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{question.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{question.likes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Answers Preview */}
              {question.answers.length > 0 && (
                <div className="p-6 bg-[#1a1a1a]">
                  <div className="flex items-center gap-2 mb-3">
                    <Reply size={16} className="text-green-400" />
                    <span className="text-sm font-semibold text-white">
                      {question.answers.length} réponse{question.answers.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {question.answers.slice(0, 2).map(answer => (
                      <div key={answer.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {answer.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-white">{answer.author.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(answer.author.level)}`}>
                              {answer.author.level}
                            </span>
                            {answer.isAccepted && (
                              <CheckCircle size={14} className="text-green-400" />
                            )}
                          </div>
                          <p className="text-gray-300 text-sm line-clamp-2">{answer.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {question.answers.length > 2 && (
                    <button className="mt-3 text-green-400 hover:text-green-300 text-sm font-medium">
                      Voir toutes les réponses ({question.answers.length})
                    </button>
                  )}
                </div>
              )}

              {/* No Answers */}
              {question.answers.length === 0 && (
                <div className="p-6 bg-[#1a1a1a] text-center">
                  <AlertCircle size={24} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Aucune réponse pour le moment</p>
                  <button className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Être le Premier à Répondre
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucune question trouvée</h3>
          <p className="text-gray-400 mb-6">
            Soyez le premier à poser une question dans cette catégorie !
          </p>
          <button
            onClick={() => setShowNewQuestionForm(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            Poser la Première Question
          </button>
        </motion.div>
      )}
    </div>
  );
}
