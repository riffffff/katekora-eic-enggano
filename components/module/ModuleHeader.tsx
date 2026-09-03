import React from "react";
import { ModuleData } from "@/types/module";
import { BookOpen, HelpCircle } from "lucide-react";

interface ModuleHeaderProps {
  module: ModuleData;
}

export default function ModuleHeader({ module }: ModuleHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-br from-[#004532] via-[#065f46] to-[#006a61] relative overflow-hidden text-white">
      {/* Decorative lighting */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-2xl" />
      <div className="absolute right-1/4 bottom-0 w-48 h-48 rounded-full bg-[#86f2e4]/10 pointer-events-none blur-3xl" />

      <div className="relative z-10 py-8 sm:py-10 md:py-12 space-y-5 w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 mx-auto">
        {/* Top bar: Module Tag only */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-[#86f2e4]/20 text-[#86f2e4] text-xs font-bold font-display border border-[#86f2e4]/30 uppercase tracking-wider">
            Modul {module.order} dari 7
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
          {module.title}
        </h1>

        {/* Learning Objective — Direct & Clear */}
        <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15">
          <p className="text-xs font-bold uppercase tracking-wider text-[#86f2e4] mb-1 font-display">
            Tujuan Pembelajaran
          </p>
          <p className="text-sm md:text-base text-white/95 leading-relaxed">
            {module.learningObjective}
          </p>
        </div>

        {/* Compact stats strip (Tanpa Estimasi) */}
        <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm font-medium text-white/90 pt-0.5">
          <span className="inline-flex items-center gap-1.5 bg-black/20 px-3.5 py-1.5 rounded-full">
            <BookOpen className="w-4 h-4 text-[#86f2e4]" />
            <span>{module.vocabulary.length} Kosakata</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-black/20 px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-4 h-4 text-[#ffb794]" />
            <span>{module.quiz.length} Soal Kuis</span>
          </span>
        </div>
      </div>
    </div>
  );
}
