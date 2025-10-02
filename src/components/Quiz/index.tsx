'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { QuizProps } from './types';

export { type QuizProps } from './types';

export function Quiz({ quizData, onComplete, showResults = true }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowExplanation(true);

    // Mettre à jour le score si la réponse est correcte
    const isCorrect = currentQuestion.answers.find(a => a.id === answerId)?.isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Enregistrer la réponse
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score, quizData.questions.length);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[quizData.questions[currentQuestionIndex - 1].id] || null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizCompleted(false);
    setAnswers({});
  };

  if (quizCompleted && showResults) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">
                Quiz Terminé !
              </CardTitle>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-green-700 dark:text-green-300">
                Vous avez obtenu {score} bonnes réponses sur {quizData.questions.length} questions !
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{
                    width: `${(score / quizData.questions.length) * 100}%`,
                    backgroundColor: score / quizData.questions.length >= 0.7 ? '#10B981' : '#EF4444'
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {score / quizData.questions.length >= 0.7 ? 'Félicitations !' : 'Continuez à vous entraîner !'}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={resetQuiz}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Recommencer
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Récapitulatif des réponses</h3>
          <div className="space-y-4">
            {quizData.questions.map((question, index) => {
              const userAnswerId = answers[question.id];
              const userAnswer = question.answers.find(a => a.id === userAnswerId);
              const isCorrect = userAnswer?.isCorrect;
              
              return (
                <Card key={question.id} className={`border ${isCorrect ? 'border-green-200 dark:border-green-900/50' : 'border-red-200 dark:border-red-900/50'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      Question {index + 1}: {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-2">
                      <p className={`text-sm font-medium ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        Votre réponse: {userAnswer?.text || 'Non répondue'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Réponse correcte: {question.answers.find(a => a.isCorrect)?.text}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Explication:</span> {question.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{quizData.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} sur {quizData.questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentQuestion.difficulty && (
            <span className={`px-2 py-1 text-xs rounded-full ${
              currentQuestion.difficulty === 'easy' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : currentQuestion.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {currentQuestion.difficulty === 'easy' ? 'Facile' : currentQuestion.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
            </span>
          )}
          {currentQuestion.category && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {currentQuestion.category}
            </span>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.id;
              const isCorrect = answer.isCorrect;
              let className = "w-full text-left p-4 rounded-lg border transition-colors ";
              
              if (showExplanation) {
                if (isCorrect) {
                  className += "border-green-500 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400";
                } else if (isSelected && !isCorrect) {
                  className += "border-red-500 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400";
                } else {
                  className += "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50";
                }
              } else {
                className += isSelected 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50";
              }

              return (
                <motion.button
                  key={answer.id}
                  type="button"
                  className={className}
                  onClick={() => !showExplanation && handleAnswerSelect(answer.id)}
                  disabled={showExplanation}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center">
                    {showExplanation && (
                      <span className="mr-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : null}
                      </span>
                    )}
                    {answer.text}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-900/50"
            >
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Explication :</h4>
              <p className="text-blue-700 dark:text-blue-400">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>
          
          <Button 
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="flex items-center gap-2"
          >
            {isLastQuestion ? 'Terminer le quiz' : 'Suivant'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}