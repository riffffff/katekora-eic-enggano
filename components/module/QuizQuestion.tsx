"use client";

import React, { useState } from "react";
import { QuizQuestionItem } from "@/types/module";
import Button from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Shake, Pulse, FadeIn } from "@/components/ui/Animations";

interface QuizQuestionProps {
  question: QuizQuestionItem;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const isSubmitted = selected !== null;
  const isCorrect = selected === question.correctOptionId;
  const isLast = questionIndex === totalQuestions - 1;

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    setSelected(id);
  };

  return (
    <div className="flex-1 flex flex-col px-4 sm:px-6 py-6 sm:py-8 gap-6">
      {/* Question card */}
      <div className="bg-white rounded-3xl border-2 border-[#efeeea] shadow-xs p-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#006a61] font-display block mb-2">
          Pertanyaan #{questionIndex + 1}
        </span>
        <h2 className="font-display font-bold text-xl md:text-2xl text-[#1b1c1a] leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {question.options.map((option) => {
          const isThis = option.id === question.correctOptionId;
          const isSelected = selected === option.id;

          let cls = "bg-white border-2 border-[#efeeea] text-[#1b1c1a] hover:border-[#006a61]/50 hover:bg-[#fbf9f5]";
          let badge = "bg-[#f5f3ef] text-[#3f4944]";

          if (isSubmitted) {
            if (isThis) {
              cls = "bg-[#86f2e4]/15 border-2 border-[#006a61] text-[#004532] font-semibold";
              badge = "bg-[#006a61] text-white";
            } else if (isSelected) {
              cls = "bg-[#ffdad6]/30 border-2 border-[#ba1a1a] text-[#ba1a1a] font-semibold";
              badge = "bg-[#ba1a1a] text-white";
            } else {
              cls = "bg-white border border-[#eae8e4] text-[#6f7973] opacity-55";
              badge = "bg-[#eae8e4] text-[#6f7973]";
            }
          }

          const isWrong = isSubmitted && isSelected && !isThis;
          const isRight = isSubmitted && isThis;

          const buttonContent = (
            <button
              onClick={() => handleSelect(option.id)}
              disabled={isSubmitted}
              className={`w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-2xl transition-all duration-200 ${cls} ${!isSubmitted ? "cursor-pointer active:scale-[0.99]" : "cursor-default"}`}
            >
              <span className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm uppercase shrink-0 transition-colors ${badge}`}>
                {option.id}
              </span>
              <span className="flex-1 text-sm md:text-base leading-snug">{option.text}</span>
              {isSubmitted && isThis && (
                <CheckCircle2 className="w-6 h-6 text-[#006a61] shrink-0" />
              )}
              {isSubmitted && isSelected && !isThis && (
                <AlertCircle className="w-6 h-6 text-[#ba1a1a] shrink-0" />
              )}
            </button>
          );

          if (isWrong) {
            return (
              <Shake key={option.id} trigger={true}>
                {buttonContent}
              </Shake>
            );
          }

          if (isRight) {
            return (
              <Pulse key={option.id} trigger={true}>
                {buttonContent}
              </Pulse>
            );
          }

          return <div key={option.id}>{buttonContent}</div>;
        })}
      </div>

      {/* Feedback */}
      {isSubmitted && (
        <FadeIn direction="up" distance={12} duration={0.35}>
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            isCorrect
              ? "bg-[#86f2e4]/20 border-[#006a61]/30 text-[#004532]"
              : "bg-[#ffdad6]/30 border-[#ba1a1a]/30 text-[#692800]"
          }`}>
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-[#006a61] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
            )}
            <div className="text-sm">
              <strong className="font-display block mb-0.5">
                {isCorrect ? "Jawaban Benar! Yauwaika!" : "Belum Tepat"}
              </strong>
              {isCorrect
                ? "Bagus sekali, pemahamanmu sangat tepat."
                : `Jawaban yang benar adalah pilihan (${question.correctOptionId.toUpperCase()}).`
              }
            </div>
          </div>
        </FadeIn>
      )}

      {/* Next button */}
      <Button
        onClick={() => selected && onAnswer(isCorrect)}
        disabled={!isSubmitted}
        fullWidth
        size="lg"
        variant={isCorrect ? "primary" : "secondary"}
        className="shadow-md flex items-center justify-center gap-2"
      >
        <span>{isLast ? "Lihat Hasil Kuis" : "Soal Berikutnya"}</span>
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
