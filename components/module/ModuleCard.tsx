"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ModuleData, ModuleProgress } from "@/types/module";
import { getModuleProgress } from "@/lib/progress";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

interface ModuleCardProps {
  module: ModuleData;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const [progress, setProgress] = useState<ModuleProgress>({
    slug: module.slug,
    status: "not_started",
    lastScore: null,
    totalQuestions: null,
  });

  useEffect(() => {
    const update = () => {
      setProgress(getModuleProgress(module.slug));
    };
    update();
    window.addEventListener("katekora_progress_updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("katekora_progress_updated", update);
      window.removeEventListener("storage", update);
    };
  }, [module.slug]);

  const renderStatusIndicator = () => {
    if (progress.status === "completed") {
      return (
        <span
          className="w-6 h-6 rounded-full bg-[#004532] text-[#86f2e4] flex items-center justify-center font-bold text-xs shadow-2xs"
          title="Modul Selesai"
        >
          ✓
        </span>
      );
    }
    if (progress.status === "in_progress") {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b3b08] bg-[#ffdbcb]/40 px-2.5 py-1 rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b3b08] animate-pulse" />
          <span>Sedang Belajar</span>
        </span>
      );
    }
    return null;
  };

  const getProgressPercentage = () => {
    if (progress.status === "completed") return 100;
    if (progress.status === "in_progress") return 50;
    return 0;
  };

  return (
    <Link href={`/modules/${module.slug}`} className="block group">
      <Card
        interactive
        rounded="2xl"
        className="p-5 bg-white border border-[#efeeea] group-hover:border-[#006a61]/40 transition-all shadow-xs group-hover:shadow-md"
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#004532] text-white font-display font-bold flex items-center justify-center text-xs shadow-2xs">
              {module.order}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#006a61] font-display">
              Modul {module.order}
            </span>
          </div>
          {renderStatusIndicator()}
        </div>

        <h3 className="font-display font-bold text-lg text-[#1b1c1a] group-hover:text-[#004532] transition-colors leading-snug mb-3 sm:mb-4">
          {module.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-[#6f7973] pt-3 border-t border-[#f5f3ef]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium text-[#3f4944]">
              <svg
                className="w-4 h-4 text-[#006a61]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {module.vocabulary.length} Kosakata
            </span>
            <span className="flex items-center gap-1 font-medium text-[#3f4944]">
              <svg
                className="w-4 h-4 text-[#8b3b08]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {module.quiz.length} Kuis
            </span>
          </div>

          <span className="text-[#004532] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            Buka →
          </span>
        </div>

        {progress.status !== "not_started" && (
          <div className="mt-3">
            <ProgressBar
              progress={getProgressPercentage()}
              variant={progress.status === "completed" ? "primary" : "secondary"}
              height="sm"
            />
          </div>
        )}
      </Card>
    </Link>
  );
}
