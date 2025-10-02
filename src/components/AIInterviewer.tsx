'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  CheckCircle,
  XCircle,
  Brain,
  MessageSquare,
  Clock,
  Award,
  Target
} from 'lucide-react';

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Technique' | 'Comportemental' | 'Projet' | 'IA';
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  expectedKeywords: string[];
  sampleAnswer?: string;
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Expliquez-moi la différence entre Machine Learning supervisé et non supervisé.',
    category: 'Technique',
    difficulty: 'Facile',
    expectedKeywords: ['supervisé', 'non supervisé', 'étiquettes', 'labels', 'apprentissage automatique'],
    sampleAnswer: 'Le Machine Learning supervisé utilise des données étiquetées pour entraîner le modèle, tandis que le non supervisé découvre des patterns dans les données non étiquetées.'
  },
  {
    id: '2',
    question: 'Qu\'est-ce que le surapprentissage (overfitting) et comment le prévenir ?',
    category: 'Technique',
    difficulty: 'Moyen',
    expectedKeywords: ['overfitting', 'surapprentissage', 'validation croisée', 'régularisation', 'dropout'],
    sampleAnswer: 'L\'overfitting survient quand le modèle apprend trop bien les données d\'entraînement mais généralise mal. On le prévient avec la validation croisée, régularisation, dropout, et early stopping.'
  },
  {
    id: '3',
    question: 'Décrivez-moi un projet d\'IA que vous avez réalisé et les défis rencontrés.',
    category: 'Projet',
    difficulty: 'Moyen',
    expectedKeywords: ['projet concret', 'défis techniques', 'solution apportée', 'résultats obtenus'],
    sampleAnswer: 'J\'ai développé un modèle de classification d\'images pour détecter les maladies du manioc. Le défi principal était la qualité des données d\'entraînement limitées.'
  },
  {
    id: '4',
    question: 'Comment évalueriez-vous les performances d\'un modèle de classification ?',
    category: 'Technique',
    difficulty: 'Moyen',
    expectedKeywords: ['précision', 'rappel', 'f1-score', 'matrice de confusion', 'courbe ROC'],
    sampleAnswer: 'J\'utilise précision, rappel, F1-score, matrice de confusion et courbe ROC-AUC selon le contexte métier.'
  },
  {
    id: '5',
    question: 'Expliquez le concept de rétropropagation dans les réseaux de neurones.',
    category: 'IA',
    difficulty: 'Difficile',
    expectedKeywords: ['rétropropagation', 'backpropagation', 'gradient descent', 'chaîne de dérivation'],
    sampleAnswer: 'La rétropropagation calcule les gradients d\'erreur et les propage en arrière pour ajuster les poids du réseau via la descente de gradient.'
  }
];

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

export default function AIInterviewer() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as unknown as WindowWithSpeechRecognition).SpeechRecognition || 
                             (window as unknown as WindowWithSpeechRecognition).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'fr-FR';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setUserAnswer(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestion(interviewQuestions[0]);
    setQuestionCount(1);
    setScore(0);
    setIsComplete(false);
    setFeedback(null);
  };

  const nextQuestion = () => {
    if (questionCount < 5) {
      const nextIndex = questionCount;
      setCurrentQuestion(interviewQuestions[nextIndex]);
      setQuestionCount(questionCount + 1);
      setUserAnswer('');
      setFeedback(null);
    } else {
      setIsComplete(true);
    }
  };

  const analyzeAnswer = (answer: string) => {
    if (!currentQuestion) return;

    const userAnswer = answer.toLowerCase();
    const keywords = currentQuestion.expectedKeywords;
    const matchedKeywords = keywords.filter(keyword =>
      userAnswer.includes(keyword.toLowerCase())
    );

    const score = (matchedKeywords.length / keywords.length) * 100;

    let feedbackText = '';
    if (score >= 80) {
      feedbackText = `Excellent ! Vous avez mentionné ${matchedKeywords.length}/${keywords.length} éléments clés. `;
      setScore(prev => prev + 1);
    } else if (score >= 60) {
      feedbackText = `Bon travail ! Vous avez abordé ${matchedKeywords.length}/${keywords.length} points importants. `;
    } else if (score >= 40) {
      feedbackText = `Réponse correcte mais incomplète. Vous avez mentionné ${matchedKeywords.length}/${keywords.length} éléments essentiels. `;
    } else {
      feedbackText = `Cette réponse pourrait être améliorée. Vous avez abordé ${matchedKeywords.length}/${keywords.length} points clés. `;
    }

    feedbackText += `Réponse modèle : ${currentQuestion.sampleAnswer}`;
    setFeedback(feedbackText);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'text-green-400 bg-green-400/10';
      case 'Moyen': return 'text-yellow-400 bg-yellow-400/10';
      case 'Difficile': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technique': return <Brain size={16} />;
      case 'Comportemental': return <MessageSquare size={16} />;
      case 'Projet': return <Target size={16} />;
      case 'IA': return <Brain size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 p-3 bg-purple-600/20 rounded-full mb-4">
          <Brain size={32} className="text-purple-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Simulateur d&apos;Entrevue IA
        </h2>
        <p className="text-gray-300 text-lg">
          Préparez-vous aux entretiens techniques avec notre IA intervieweur.
          Recevez des questions réalistes et du feedback personnalisé.
        </p>
      </motion.div>

      {/* Interview Interface */}
      <AnimatePresence mode="wait">
        {!isInterviewActive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#262626] border border-[#404040] rounded-xl p-8 text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain size={40} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Prêt pour votre Entrevue ?</h3>
              <p className="text-gray-300">
                5 questions techniques adaptées à votre niveau • Feedback immédiat • Score final
              </p>
            </div>

            <button
              onClick={startInterview}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg transition-colors"
            >
              Commencer l&apos;Entrevue
            </button>
          </motion.div>
        ) : isComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#262626] border border-[#404040] rounded-xl p-8 text-center"
          >
            <div className="mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                score >= 3 ? 'bg-green-600/20' : score >= 2 ? 'bg-yellow-600/20' : 'bg-red-600/20'
              }`}>
                <Award size={40} className={
                  score >= 3 ? 'text-green-500' : score >= 2 ? 'text-yellow-500' : 'text-red-500'
                } />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Entrevue Terminée !</h3>
              <p className="text-gray-300 mb-4">
                Votre score : <span className="text-2xl font-bold text-purple-400">{score}/5</span>
              </p>
              <p className="text-gray-400">
                {score >= 4 ? 'Excellent ! Vous êtes prêt pour les entretiens.' :
                 score >= 3 ? 'Bon travail ! Quelques ajustements à faire.' :
                 score >= 2 ? 'Continuez à pratiquer, vous progressez !' :
                 'Plus de pratique vous aiderait à vous améliorer.'}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setIsInterviewActive(false);
                  setIsComplete(false);
                  setScore(0);
                  setQuestionCount(0);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Nouvelle Entrevue
              </button>
              <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors">
                Voir Conseils
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#262626] border border-[#404040] rounded-xl p-8"
          >
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(currentQuestion?.category || 'Technique')}
                  <span className="text-sm text-gray-400">{currentQuestion?.category}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion?.difficulty || 'Facile')}`}>
                  Question {questionCount}/5
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {currentQuestion?.question}
              </h3>
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              <div className="relative">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Tapez votre réponse ici... (ou utilisez le micro pour répondre oralement)"
                  className="w-full h-32 p-4 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                />
                <button
                  onClick={toggleListening}
                  className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  title={isListening ? 'Arrêter l\'enregistrement' : 'Commencer à parler'}
                >
                  {isListening ? <MicOff size={20} className="text-white" /> : <Mic size={20} className="text-white" />}
                </button>
              </div>
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Feedback IA</h4>
                      <p className="text-blue-300">{feedback}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>Prenez votre temps pour répondre</span>
              </div>

              <div className="flex gap-3">
                {!feedback ? (
                  <button
                    onClick={() => userAnswer.trim() && analyzeAnswer(userAnswer)}
                    disabled={!userAnswer.trim()}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                  >
                    Analyser Réponse
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    {questionCount < 5 ? 'Question Suivante' : 'Terminer Entrevue'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      {isInterviewActive && !isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">{questionCount}</div>
            <div className="text-sm text-gray-400">Questions</div>
          </div>
          <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-500 mb-1">{score}</div>
            <div className="text-sm text-gray-400">Bonnes Réponses</div>
          </div>
          <div className="bg-[#262626] border border-[#404040] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {Math.round((score / questionCount) * 100) || 0}%
            </div>
            <div className="text-sm text-gray-400">Taux de Réussite</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
