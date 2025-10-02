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

export interface QuizProps {
  quizData: QuizData;
  onComplete?: (score: number, total: number) => void;
  showResults?: boolean;
}
