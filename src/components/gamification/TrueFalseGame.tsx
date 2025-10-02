'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { trueFalseQuestions, TrueFalseQuestion, GAME_CONFIG } from '@/data/games/trueFalseGame';
import { useProgress } from '@/contexts/ProgressContext';
import { unlockBadge } from '@/lib/gamification/badges';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TrueFalseGame = () => {
  const [questions, setQuestions] = useState<TrueFalseQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasWonBadge, setHasWonBadge] = useState(false);
  
  const { completeActivity, isActivityCompleted } = useProgress();
  
  // Vérifier si le badge a déjà été gagné
  useEffect(() => {
    if (isActivityCompleted(GAME_CONFIG.id)) {
      setHasWonBadge(true);
    }
  }, [isActivityCompleted]);

  // Mélanger les questions au chargement
  useEffect(() => {
    const shuffled = [...trueFalseQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  const handleAnswer = (answer: boolean) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    // Vérifier la réponse
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Passer à la question suivante après un délai
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowExplanation(false);
        setSelectedAnswer(null);
      } else {
        finishGame();
      }
    }, 2500);
  };

  const finishGame = () => {
    setGameStatus('finished');
    const finalScore = score / questions.length;
    const hasPassed = finalScore >= GAME_CONFIG.requiredScore;
    const now = new Date().toISOString();
    
    // Enregistrer la progression
    completeActivity(GAME_CONFIG.id, {
      score: finalScore,
      completed: hasPassed,
      timestamp: now,
      questionsAttempted: questions.length,
      correctAnswers: score,
      quizId: GAME_CONFIG.id
    });
    
    // Vérifier si l'utilisateur a gagné un badge
    if (hasPassed && !hasWonBadge) {
      // Vérifier si le badge est déjà débloqué
      const userBadges = JSON.parse(localStorage.getItem('user-badges') || '[]') as Array<{ id: string }>;
      const badgeAlreadyUnlocked = userBadges.some((badge) => 
        badge.id === GAME_CONFIG.reward.id
      );
      
      if (!badgeAlreadyUnlocked) {
        unlockBadge(GAME_CONFIG.reward.id);
        setHasWonBadge(true);
        
        // Afficher une notification de badge débloqué
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('show-notification', {
            detail: {
              type: 'success',
              title: 'Nouveau badge débloqué !',
              message: `Félicitations ! Vous avez débloqué le badge "${GAME_CONFIG.reward.name}"`,
              duration: 5000
            }
          }));
        }
      }
    }
  };

  const resetGame = () => {
    const shuffled = [...trueFalseQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameStatus('playing');
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (questions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Sparkles className="h-8 w-8 text-blue-400 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Chargement du quiz...</h3>
        <p className="text-gray-400 max-w-md">Préparez-vous à tester vos connaissances en IA !</p>
      </motion.div>
    );
  }

  if (gameStatus === 'finished') {
    const finalScore = Math.round((score / questions.length) * 100);
    const passed = finalScore >= GAME_CONFIG.requiredScore * 100;
    const scoreColor = passed ? 'text-green-400' : 'text-red-400';

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-6 rounded-xl"
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10"
        >
          <Trophy className={`h-16 w-16 mx-auto ${passed ? 'text-yellow-400' : 'text-gray-400'}`} />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-3">
          {passed ? 'Félicitations !' : 'Quiz terminé'}
        </h2>
        
        <div className="flex flex-col items-center mb-6">
          <div className={`text-6xl font-extrabold mb-2 ${scoreColor}`}>
            {finalScore}%
          </div>
          <div className="text-sm text-gray-400">
            {score} bonnes réponses sur {questions.length}
          </div>
        </div>
        
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>0%</span>
            <span>Score minimum: {GAME_CONFIG.requiredScore * 100}%</span>
            <span>100%</span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className={`absolute top-0 left-0 h-full ${passed ? 'bg-green-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${finalScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            {passed && (
              <div 
                className="absolute top-0 h-full w-0.5 bg-white"
                style={{ left: `${GAME_CONFIG.requiredScore * 100}%` }}
              />
            )}
          </div>
        </div>
        
        <motion.p 
          className="text-gray-300 mb-6 px-4 py-3 bg-white/5 rounded-lg border border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {passed 
            ? 'Vous avez réussi le quiz et débloqué un badge !' 
            : `Vous avez besoin d'au moins ${Math.ceil(questions.length * GAME_CONFIG.requiredScore)} bonnes réponses pour réussir.`}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            onClick={resetGame}
            variant="outline"
            className="flex items-center justify-center gap-2 group"
          >
            <RotateCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
            Rejouer le quiz
          </Button>
          
          {hasWonBadge && (
            <Button 
              variant="ghost"
              className="border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Badge débloqué !
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 group"
          >
            Tableau de bord
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* En-tête avec progression */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{score} pts</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-700/50 rounded-full h-2.5">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {/* Carte de question */}
      <motion.div 
        key={currentQuestion.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6 md:p-8 rounded-xl border border-white/10 shadow-lg mb-8"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="flex-shrink-0 mt-1">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500/10 text-blue-400 font-bold">
              ?
            </div>
          </div>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>
        
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div
                className={`p-4 rounded-xl border ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 mt-0.5 ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold mb-1 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {selectedAnswer === currentQuestion.correctAnswer
                        ? 'Bonne réponse !'
                        : 'Ce n\'est pas la bonne réponse'}
                    </h4>
                    <p className="text-gray-300">{currentQuestion.explanation}</p>
                  </div>
                </div>

                {currentQuestionIndex < questions.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 pt-4 border-t border-white/5 text-sm text-center text-gray-400"
                  >
                    Prochaine question dans quelques instants...
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Boutons de réponse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileTap={!showExplanation ? { scale: 0.98 } : {}}
          onClick={() => handleAnswer(true)}
          disabled={showExplanation}
          className={`p-4 rounded-xl text-center transition-all ${
            showExplanation
              ? currentQuestion.correctAnswer === true
                ? 'bg-green-500/20 border-2 border-green-500/50'
                : selectedAnswer === true
                ? 'bg-red-500/20 border-2 border-red-500/50'
                : 'bg-gray-700/50 border border-gray-600/50'
              : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
              showExplanation
                ? currentQuestion.correctAnswer === true
                  ? 'bg-green-500/20 text-green-400'
                  : selectedAnswer === true
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-600/50 text-gray-400'
                : 'bg-white/10 text-white'
            }`}>
              {showExplanation ? (
                currentQuestion.correctAnswer === true ? (
                  <CheckCircle className="h-4 w-4" />
                ) : selectedAnswer === true ? (
                  <XCircle className="h-4 w-4" />
                ) : null
              ) : null}
            </div>
            <span className="font-medium text-lg">Vrai</span>
          </div>
        </motion.button>

        <motion.button
          whileTap={!showExplanation ? { scale: 0.98 } : {}}
          onClick={() => handleAnswer(false)}
          disabled={showExplanation}
          className={`p-4 rounded-xl text-center transition-all ${
            showExplanation
              ? currentQuestion.correctAnswer === false
                ? 'bg-green-500/20 border-2 border-green-500/50'
                : selectedAnswer === false
                ? 'bg-red-500/20 border-2 border-red-500/50'
                : 'bg-gray-700/50 border border-gray-600/50'
              : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
              showExplanation
                ? currentQuestion.correctAnswer === false
                  ? 'bg-green-500/20 text-green-400'
                  : selectedAnswer === false
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-600/50 text-gray-400'
                : 'bg-white/10 text-white'
            }`}>
              {showExplanation ? (
                currentQuestion.correctAnswer === false ? (
                  <CheckCircle className="h-4 w-4" />
                ) : selectedAnswer === false ? (
                  <XCircle className="h-4 w-4" />
                ) : null
              ) : null}
            </div>
            <span className="font-medium text-lg">Faux</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TrueFalseGame;
