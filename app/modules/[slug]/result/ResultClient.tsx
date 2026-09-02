"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModuleData, ModuleProgress } from "@/types/module";
import { getModuleProgress } from "@/lib/progress";
import PageHeader from "@/components/layout/PageHeader";
import QuizResult from "@/components/module/QuizResult";
import Button from "@/components/ui/Button";
import { FileText, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/ui/Animations";

interface ResultClientProps {
  module: ModuleData;
}

export default function ResultClient({ module }: ResultClientProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const p = getModuleProgress(module.slug);
    setProgress(p);
    setIsLoaded(true);
  }, [module.slug]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-6 text-center">
        <p className="text-sm text-[#6f7973]">Memuat hasil kuis...</p>
      </div>
    );
  }

  const scorePercent = progress?.lastScore ?? 0;
  const totalQuestions = progress?.totalQuestions ?? module.quiz.length;
  const correctCount = Math.round((scorePercent / 100) * totalQuestions);

  if (progress?.status !== "completed") {
    return (
      <div className="min-h-screen bg-[#fbf9f5]">
        <PageHeader
          title={`Hasil Kuis: Modul ${module.order}`}
          subtitle={module.title}
          backHref={`/modules/${module.slug}`}
        />
        <div className="p-6 max-w-md mx-auto">
          <div className="text-center space-y-5 pt-16">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-[#f5f3ef] rounded-full flex items-center justify-center shadow-sm border border-[#e4e2de]">
              <FileText className="w-9 h-9 text-[#004532]" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl text-[#1b1c1a]">
                Belum Ada Hasil
              </h2>
              <p className="text-sm text-[#6f7973] max-w-xs mx-auto leading-relaxed">
                Kerjakan kuis terlebih dahulu untuk melihat hasil dan menyimpan progres belajarmu.
              </p>
            </div>
            <div className="pt-6">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => router.push(`/modules/${module.slug}/quiz`)}
              >
                <span>Mulai Kuis</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#fbf9f5]">
      <PageHeader
        title={`Hasil Kuis: Modul ${module.order}`}
        subtitle={module.title}
        backHref={`/modules/${module.slug}`}
      />
      <QuizResult
        module={module}
        correctAnswers={correctCount}
        totalQuestions={totalQuestions}
        onRetry={() => router.push(`/modules/${module.slug}/quiz`)}
      />
    </PageTransition>
  );
}
