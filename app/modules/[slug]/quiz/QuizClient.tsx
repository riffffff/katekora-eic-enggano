"use client";

import React, { useState } from "react";
import { ModuleData } from "@/types/module";
import PageHeader from "@/components/layout/PageHeader";
import QuizProgressBar from "@/components/module/QuizProgressBar";
import QuizQuestion from "@/components/module/QuizQuestion";
import QuizResult from "@/components/module/QuizResult";
import { PageTransition } from "@/components/ui/Animations";

export default function QuizClient({ module }: { module: ModuleData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);
    if (currentIndex < module.quiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setIsFinished(false);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#fbf9f5]">
      <PageHeader
        title={`Kuis: ${module.title}`}
        subtitle={isFinished ? "Hasil Akhir" : `Soal ${currentIndex + 1} dari ${module.quiz.length}`}
        backHref={`/modules/${module.slug}`}
      />

      {!isFinished && (
        <QuizProgressBar
          currentIndex={currentIndex}
          totalQuestions={module.quiz.length}
        />
      )}

      {/* Quiz content — centered, max width for readability */}
      <div className="flex-1 flex flex-col w-full pb-10 md:pb-12">
        {!isFinished ? (
          <QuizQuestion
            key={module.quiz[currentIndex].id}
            question={module.quiz[currentIndex]}
            questionIndex={currentIndex}
            totalQuestions={module.quiz.length}
            onAnswer={handleAnswer}
          />
        ) : (
          <QuizResult
            module={module}
            correctAnswers={correctAnswers}
            totalQuestions={module.quiz.length}
            onRetry={handleRetry}
          />
        )}
      </div>
    </PageTransition>
  );
}
