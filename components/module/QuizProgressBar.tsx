import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";

export default function QuizProgressBar({
  currentIndex,
  totalQuestions,
}: {
  currentIndex: number;
  totalQuestions: number;
}) {
  const step = currentIndex + 1;
  const pct = Math.round((step / totalQuestions) * 100);

  return (
    <div className="w-full bg-white border-b border-[#efeeea] shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0 text-sm font-display font-semibold text-[#3f4944]">
          <span className="w-7 h-7 rounded-full bg-[#004532] text-white flex items-center justify-center text-xs font-bold">
            {step}
          </span>
          <span className="hidden sm:inline">Soal {step} dari {totalQuestions}</span>
          <span className="sm:hidden">{step}/{totalQuestions}</span>
        </div>
        <ProgressBar progress={pct} variant="secondary" height="sm" className="flex-1" />
        <span className="text-xs font-bold text-[#006a61] shrink-0">{pct}%</span>
      </div>
    </div>
  );
}
