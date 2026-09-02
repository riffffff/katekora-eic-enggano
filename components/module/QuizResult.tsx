"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ModuleData } from "@/types/module";
import { calculateScore, getQuizFeedback } from "@/lib/quizScore";
import { saveModuleProgress } from "@/lib/progress";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { Trophy, Star, CheckCircle2, RotateCcw, BookOpen, ArrowRight, CheckCircle, XCircle, Award } from "lucide-react";
import { ScaleIn, AnimatedCounter, FadeIn } from "@/components/ui/Animations";

interface QuizResultProps {
  module: ModuleData;
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
}

export default function QuizResult({
  module,
  correctAnswers,
  totalQuestions,
  onRetry,
}: QuizResultProps) {
  const scorePercent = calculateScore(correctAnswers, totalQuestions);
  const feedback = getQuizFeedback(scorePercent);
  const isPassed = scorePercent >= 60;

  useEffect(() => {
    saveModuleProgress(module.slug, {
      status: "completed",
      lastScore: scorePercent,
      totalQuestions,
    });
  }, [module.slug, scorePercent, totalQuestions]);

  const renderResultIcon = () => {
    if (scorePercent >= 90) {
      return <Award className="w-12 h-12 text-[#004532]" strokeWidth={2} />;
    } else if (scorePercent >= 70) {
      return <Trophy className="w-12 h-12 text-[#006a61]" strokeWidth={2} />;
    } else if (scorePercent >= 60) {
      return <CheckCircle2 className="w-12 h-12 text-[#006a61]" strokeWidth={2} />;
    } else {
      return <RotateCcw className="w-12 h-12 text-[#8b3b08]" strokeWidth={2} />;
    }
  };

  return (
    <div className="px-5 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto">
      <div className="space-y-6">
        {/* Header Result */}
        <div className="text-center space-y-4">
          <ScaleIn duration={0.3}>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white to-[#f5f3ef] border-2 border-[#bec9c2] shadow-sm">
              {renderResultIcon()}
            </div>
          </ScaleIn>
          
          <div className="space-y-2">
            <Badge variant={feedback.badgeType} size="md">
              {isPassed ? "Selesai" : "Belum Lulus"}
            </Badge>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1b1c1a] leading-tight">
              {feedback.title}
            </h1>
            <p className="text-sm text-[#3f4944] max-w-md mx-auto">
              {feedback.message}
            </p>
          </div>
        </div>

        {/* Score Card */}
        <FadeIn delay={0.08} duration={0.3}>
          <Card rounded="2xl" className="p-6 shadow-sm border border-[#e4e2de]">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6f7973]">
                  Nilai Kuis
                </p>
                <div className="font-display font-bold text-5xl sm:text-6xl text-[#004532]">
                  <AnimatedCounter target={scorePercent} duration={0.8} suffix="%" />
                </div>
              </div>
              
              <ProgressBar 
                progress={scorePercent} 
                variant={isPassed ? "primary" : "tertiary"} 
                height="md" 
              />
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#e6f7f1] rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <CheckCircle className="w-4 h-4 text-[#006a61]" strokeWidth={2.5} />
                    <span className="text-xs font-semibold text-[#006a61]">Benar</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-[#004532]">{correctAnswers}</p>
                </div>
                
                <div className="bg-[#fef2f0] rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <XCircle className="w-4 h-4 text-[#ba1a1a]" strokeWidth={2.5} />
                    <span className="text-xs font-semibold text-[#ba1a1a]">Salah</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-[#8b3b08]">{totalQuestions - correctAnswers}</p>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Module Info */}
        <FadeIn delay={0.15} duration={0.3}>
          <div className="bg-[#f5f3ef] rounded-xl p-4 border border-[#e4e2de]">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-[#004532] text-white font-display font-bold flex items-center justify-center text-base shrink-0">
                {module.order}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="font-display font-semibold text-sm text-[#1b1c1a] mb-0.5">
                  {module.title}
                </h3>
                <p className="text-xs text-[#6f7973]">
                  {totalQuestions} soal • Progres tersimpan
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Actions */}
        <FadeIn delay={0.22} duration={0.3}>
          <div className="space-y-3 pt-2">
            <Button 
              onClick={onRetry} 
              variant="outline" 
              fullWidth 
              size="md" 
              className="group"
            >
              <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180" strokeWidth={2} />
              <span>Ulangi Kuis</span>
            </Button>
            
            <Link href={`/modules/${module.slug}`}>
              <Button variant="secondary" fullWidth size="md">
                <BookOpen className="w-4 h-4" strokeWidth={2} />
                <span>Belajar Flashcard</span>
              </Button>
            </Link>
            
            <Link href="/modules">
              <Button variant="primary" fullWidth size="lg" className="shadow-sm">
                <span>Modul Lainnya</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
