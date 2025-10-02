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
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: "url('/images/how-it-works-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
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
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800">
                  <CardHeader className="pb-2">
                    <div className={`${quiz.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      {quiz.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{quiz.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        <Award className="w-4 h-4 mr-1.5" />
                        {quiz.questions} questions
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {quiz.time} min
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        <BarChart2 className="w-4 h-4 mr-1.5" />
                        {quiz.difficulty}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${quiz.id === 'data-science' ? 'bg-blue-600' : 
                          quiz.id === 'machine-learning' ? 'bg-purple-600' : 
                          quiz.id === 'deep-learning' ? 'bg-green-600' :
                          quiz.id === 'python' ? 'bg-yellow-600' : 'bg-red-600'}`} 
                        style={{ width: '70%' }}
                      />
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
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-6 border border-border shadow-sm"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Conseils pour réussir
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary font-medium">•</span>
              <span>Lisez attentivement chaque question avant de répondre</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-medium">•</span>
              <span>Prenez le temps de comprendre les explications, m&ecirc;me pour les bonnes r&eacute;ponses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-medium">•</span>
              <span>N&apos;h&eacute;sitez pas &agrave; revenir en arri&egrave;re pour revoir les concepts difficiles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-medium">•</span>
              <span>Un score de 80% ou plus est consid&eacute;r&eacute; comme une bonne ma&icirc;trise</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}