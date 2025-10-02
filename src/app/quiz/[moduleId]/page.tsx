'use client';

import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Dynamically import the Quiz component with no SSR
const Quiz = dynamic(
  () => import('../../../components/Quiz'),
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
    icon: '📊'
  })),
  'machine-learning': () => import('../../../data/quizzes/machineLearningQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Machine Learning',
    description: 'Testez vos connaissances en Machine Learning',
    icon: '🤖'
  })),
  'deep-learning': () => import('../../../data/quizzes/deepLearningQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Deep Learning',
    description: 'Testez vos connaissances en Deep Learning',
    icon: '🧠'
  })),
  'python': () => import('../../../data/quizzes/pythonQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz Python',
    description: 'Testez vos connaissances en programmation Python',
    icon: '🐍'
  })),
  'sql': () => import('../../../data/quizzes/sqlQuiz').then(mod => ({
    questions: mod.default || [],
    title: 'Quiz SQL',
    description: 'Testez vos connaissances en bases de données SQL',
    icon: '💾'
  }))
} as const;
export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const [quizData, setQuizData] = useState<any>(null);
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{quizData.title}</h1>
          <p className="text-muted-foreground">{quizData.description}</p>
        </div>
        <Quiz quizData={quizData} />
      </div>
    </div>
  );
}
