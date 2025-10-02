'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Brain, Cpu, Database, Award, Clock, BarChart2 } from 'lucide-react';

const quizModules = [
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Testez vos connaissances en analyse de données et statistiques',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    questions: 12,
    time: 15,
    difficulty: 'Intermédiaire'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Évaluez votre maîtrise des algorithmes de ML',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    questions: 10,
    time: 12,
    difficulty: 'Avancé'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Quiz sur les réseaux de neurones et le deep learning',
    icon: <Cpu className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    questions: 8,
    time: 10,
    difficulty: 'Expert'
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Maîtrisez les concepts fondamentaux de Python',
    icon: <span className="text-yellow-500 text-2xl">🐍</span>,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    questions: 15,
    time: 20,
    difficulty: 'Débutant'
  },
  {
    id: 'sql',
    title: 'SQL',
    description: 'Testez vos compétences en bases de données relationnelles',
    icon: <span className="text-blue-500 text-2xl">💾</span>,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    questions: 10,
    time: 15,
    difficulty: 'Intermédiaire'
  }
];

export default function QuizHome() {
  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Quiz d&apos;Évaluation
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Testez vos connaissances dans différents domaines de l&apos;IA et de la Data Science
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {quizModules.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link href={`/quiz/${quiz.id}`} className="h-full block">
                <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800/95 shadow-lg">
                  <CardHeader className="pb-2">
                    <div className={`${quiz.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      {quiz.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">{quiz.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        <Award className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        {quiz.questions} questions
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800">
                        <Clock className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        {quiz.time} min
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800">
                        <BarChart2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        {quiz.difficulty}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progression</span>
                        <span>70%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            quiz.id === 'data-science' ? 'bg-blue-500' : 
                            quiz.id === 'machine-learning' ? 'bg-purple-500' : 
                            quiz.id === 'deep-learning' ? 'bg-green-500' :
                            quiz.id === 'python' ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: '70%' }}
                        />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <span>Conseils pour réussir</span>
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">1</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Lisez attentivement chaque question avant de répondre</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-sm font-semibold">2</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Prenez le temps de comprendre les explications, même pour les bonnes réponses</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold">3</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">N&apos;hésitez pas à revenir en arrière pour revoir les concepts difficiles</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold">4</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Un score de 80% ou plus est considéré comme une bonne maîtrise</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}