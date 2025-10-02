'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useStreak } from '@/hooks/useStreak';

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  question: string;
  answers: Answer[];
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
};

export type QuizData = {
  questions: Question[];
  title: string;
  description: string;
};

type QuizProps = {
  quizData: QuizData;
  onComplete?: (score: number, total: number) => void;
  showResults?: boolean;
};

export default function Quiz({ quizData, onComplete, showResults = true }: QuizProps) {
  const { questions } = quizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const { completeActivity } = useStreak();
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  
  // Timer effect
  useEffect(() => {
    if (!quizCompleted) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quizCompleted]);
  
  const handleAnswerSelect = (answerId: string) => {
    if (showExplanation) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));
    
    // Vérifier si la réponse est correcte
    const selectedAnswer = currentQuestion.answers.find(a => a.id === answerId);
    if (selectedAnswer?.isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };
  
  // Effet pour compléter l'activité quand le quiz est terminé
  useEffect(() => {
    if (quizCompleted) {
      completeActivity();
    }
  }, [quizCompleted, completeActivity]);

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
      onComplete?.(score, questions.length);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
    setTimeSpent(0);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6 text-center">
        <p className="text-red-500">Erreur : Aucune question disponible</p>
      </Card>
    );
  }
  
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="w-full max-w-2xl mx-auto overflow-hidden">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </div>
          <CardTitle className="text-center text-2xl text-gray-900 dark:text-white">
            Quiz Terminé !
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {score} / {questions.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {percentage >= 80 ? 'Excellent travail !' : 
               percentage >= 60 ? 'Bon travail !' : 
               'Continuez à vous entraîner !'}
            </p>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${
                percentage >= 80 ? 'bg-green-600 dark:bg-green-500' : 
                percentage >= 60 ? 'bg-blue-600 dark:bg-blue-500' : 
                'bg-yellow-600 dark:bg-yellow-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Temps passé : {formatTime(timeSpent)}
          </p>
          
          {showResults && (
            <div className="mt-6 space-y-4">
              {questions.map((q, qIndex) => {
                const selectedAnswerId = selectedAnswers[q.id];
                const selectedAnswer = q.answers.find(a => a.id === selectedAnswerId);
                const isCorrect = selectedAnswer?.isCorrect;
                
                return (
                  <div key={q.id} className="text-left p-4 border rounded-lg">
                    <p className="font-medium">{qIndex + 1}. {q.question}</p>
                    <div className="mt-2">
                      <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-1" />
                            Incorrect
                          </>
                        )}
                      </p>
                      
                      {!isCorrect && selectedAnswer && (
                        <p className="mt-2 text-sm">
                          <span className="font-medium">Votre réponse :</span> {selectedAnswer.text}
                        </p>
                      )}
                      
                      <p className="mt-2 text-sm">
                        <span className="font-medium">Réponse correcte :</span> {
                          q.answers.find(a => a.isCorrect)?.text
                        }
                      </p>
                      
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Explication :</span> {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          <Button 
            onClick={resetQuiz} 
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Recommencer le quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  const selectedAnswerId = selectedAnswers[currentQuestion.id];
  
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Question {currentQuestionIndex + 1} sur {questions.length}
          </span>
          <span className="text-sm font-medium">
            {currentQuestion.difficulty && (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty === 'easy' ? 'Facile' :
                 currentQuestion.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </span>
            )}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span>Temps passé : {formatTime(timeSpent)}</span>
          <span>Score : {score} / {questions.length}</span>
        </div>
      </div>
      
      <CardContent className="px-6 pt-0 pb-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3 mb-8">
          {currentQuestion.answers.map((answer) => {
            const isSelected = selectedAnswerId === answer.id;
            const isCorrect = answer.isCorrect;
            
            let variant: 'default' | 'secondary' | 'outline' = 'outline';
            let className = 'w-full justify-start text-left';
            
            if (showExplanation) {
              if (isCorrect) {
                variant = 'default';
                className += ' bg-green-600 hover:bg-green-600 border-green-600 text-white';
              } else if (isSelected) {
                variant = 'secondary';
                className += ' bg-red-100 hover:bg-red-100 border-red-200 text-red-800';
              }
            } else if (isSelected) {
              variant = 'default';
            }
            
            return (
              <Button
                key={answer.id}
                variant={variant}
                className={className}
                onClick={() => handleAnswerSelect(answer.id)}
                disabled={showExplanation && !isSelected}
              >
                {answer.text}
                {showExplanation && isSelected && (
                  <span className="ml-2">
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
        
        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Explication :</h4>
            <p className="text-gray-700 dark:text-gray-300">{currentQuestion.explanation}</p>
          </motion.div>
        )}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedAnswerId}
            className="gap-1"
          >
            {isLastQuestion ? 'Terminer le quiz' : 'Suivant'}
            {!isLastQuestion && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
