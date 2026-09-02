export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  example: string | null;
  note: string | null;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface ModuleData {
  slug: string;
  order: number;
  title: string;
  learningObjective: string;
  vocabulary: VocabularyItem[];
  quizSource: "pdf" | "authored" | string;
  quizSourceNote?: string;
  quiz: QuizQuestionItem[];
}

export type ModuleProgressStatus = "not_started" | "in_progress" | "completed";

export interface ModuleProgress {
  slug: string;
  status: ModuleProgressStatus;
  lastScore?: number | null; // e.g. 80 (percentage) or number of correct answers
  totalQuestions?: number | null;
  updatedAt?: string;
}
