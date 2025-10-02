'use client';

import { Quiz } from '.';
import { QuizData } from './types';
import { dataScienceQuiz } from '@/data/quizzes/dataScienceQuiz';
import { machineLearningQuiz } from '@/data/quizzes/machineLearningQuiz';
import { deepLearningQuiz } from '@/data/quizzes/deepLearningQuiz';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

type QuizModuleData = QuizData & {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

const quizData: Record<string, QuizModuleData> = {
  'data-science': {
    questions: dataScienceQuiz,
    name: 'Data Science',
    title: 'Quiz Data Science',
    description: 'Testez vos connaissances en analyse de données et statistiques',
    icon: '📊',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    borderColor: 'border-blue-200 dark:border-blue-800/50'
  },
  'machine-learning': {
    questions: machineLearningQuiz,
    name: 'Machine Learning',
    title: 'Quiz Machine Learning',
    description: 'Évaluez votre maîtrise des algorithmes de Machine Learning',
    icon: '🤖',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/10',
    borderColor: 'border-purple-200 dark:border-purple-800/50'
  },
  'deep-learning': {
    questions: deepLearningQuiz,
    name: 'Deep Learning',
    title: 'Quiz Deep Learning',
    description: 'Testez vos connaissances sur les réseaux de neurones profonds',
    icon: '🧠',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/10',
    borderColor: 'border-green-200 dark:border-green-800/50'
  }
};

export function QuizContainer({ moduleId }: { moduleId: string }) {
  const router = useRouter();
  const moduleData = quizData[moduleId as keyof typeof quizData];

  if (!moduleData) {
    router.push('/quiz');
    return null;
  }

  const { questions, name, description, icon, color, bgColor, borderColor } = moduleData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <Link 
            href="/quiz" 
            className="p-2 rounded-full hover:bg-accent transition-colors inline-flex items-center justify-center"
            aria-label="Retour aux quiz"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link 
            href="/" 
            className="p-2 rounded-full hover:bg-accent transition-colors inline-flex items-center justify-center"
            aria-label="Accueil"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-2xl p-3 rounded-xl ${color} ${bgColor} border ${borderColor}`}>
              {icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold">Quiz {name}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
              {questions.length} questions
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
              Durée estimée: {Math.ceil(questions.length * 1.5)} min
            </span>
          </div>
        </div>
      </div>
      
      <div className={`rounded-xl shadow-sm border p-6 ${bgColor} ${borderColor}`}>
        <Quiz 
          quizData={{
            questions,
            title: quizData[moduleId as keyof typeof quizData].name,
            description: quizData[moduleId as keyof typeof quizData].description
          }}
          onComplete={(score, total) => {
            // Ici, vous pourriez sauvegarder le score
            console.log(`Score: ${score}/${total}`);
          }} 
        />
      </div>
    </motion.div>
  );
}
