'use client';

import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Question } from '@/components/Quiz/types';
import { useEffect, useState } from 'react';

// Dynamically import the Quiz component with no SSR
const Quiz = dynamic(
  () => import('@/components/Quiz'),
  { 
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
    ssr: false 
  }
);

// Import quiz data
const quizModules = {
  'data-science': () => import('../../../data/quizzes/dataScienceQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Data Science',
    description: 'Testez vos connaissances en Data Science',
    moduleId: 'data-science',
    icon: '📊'
  })),
  'machine-learning': () => import('../../../data/quizzes/machineLearningQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Machine Learning',
    description: 'Testez vos connaissances en Machine Learning',
    moduleId: 'machine-learning',
    icon: '🤖'
  })),
  'deep-learning': () => import('../../../data/quizzes/deepLearningQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Deep Learning',
    description: 'Testez vos connaissances en Deep Learning',
    moduleId: 'deep-learning',
    icon: '🧠'
  })),
  'python': () => import('../../../data/quizzes/pythonQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Python',
    description: 'Testez vos connaissances en programmation Python',
    moduleId: 'python',
    icon: '🐍'
  })),
  'sql': () => import('../../../data/quizzes/sqlQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz SQL',
    description: 'Testez vos connaissances en bases de données SQL',
    moduleId: 'sql',
    icon: '💾'
  }))
} as const;
export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const [quizData, setQuizData] = useState<{
    questions: Question[];
    title: string;
    description: string;
    icon: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const moduleId = params?.moduleId as keyof typeof quizModules;
  
  useEffect(() => {
    if (!moduleId || !quizModules[moduleId]) {
      router.push('/404');
      return;
    }

    const loadQuizData = async () => {
      try {
        const data = await quizModules[moduleId]();
        setQuizData(data);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        router.push('/404');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, [moduleId, router]);

  if (isLoading) {
    return (
      <div 
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/how-it-works-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="glass-card p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Chargement du quiz...</h2>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/how-it-works-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="glass-card p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Quiz non trouvé</h1>
          <button 
            onClick={() => router.push('/quiz')}
            className="text-primary hover:underline"
          >
            Retour aux quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/how-it-works-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto">
        <div className="glass-card p-8 mb-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-3">{quizData.title}</h1>
          <p className="text-gray-200">{quizData.description}</p>
        </div>
        <div className="glass-card p-6 md:p-8 max-w-4xl mx-auto">
          <Quiz quizData={quizData} />
        </div>
      </div>
    </div>
  );
}
