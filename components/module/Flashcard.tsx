"use client";

import React from "react";
import { VocabularyItem } from "@/types/module";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface FlashcardProps {
  item: VocabularyItem;
  index: number;
  isViewed?: boolean;
  onFocus?: () => void;
}

export default function Flashcard({ item, index, isViewed, onFocus }: FlashcardProps) {
  const handleClick = () => {
    if (onFocus) onFocus();
  };

  return (
    <motion.div
      id={`flashcard-${index}`}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-full h-[160px] sm:h-[180px] cursor-pointer select-none group scroll-mt-24"
      role="button"
      tabIndex={0}
      aria-label={`Kartu kosakata ${item.word}, ketuk untuk fokus`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className={`relative w-full h-full bg-white rounded-3xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between overflow-hidden shadow-xs group-hover:shadow-md ${
          isViewed
            ? "border-[#006a61]/35 bg-gradient-to-b from-white to-[#f0fdf9]"
            : "border-[#efeeea] shadow-[0_4px_16px_rgba(0,0,0,0.04)] group-hover:border-[#006a61]/50"
        }`}
      >
        {/* Top: index + label + viewed check */}
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full bg-[#f5f3ef] text-[#004532] text-[11px] font-bold font-display">
            #{index + 1}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-[#6f7973] uppercase tracking-wider font-display">
              Enggano
            </span>
            {isViewed && (
              <span className="w-4 h-4 rounded-full bg-[#004532] flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-[#86f2e4] stroke-[3]" />
              </span>
            )}
          </div>
        </div>

        {/* Word */}
        <div className="text-center my-auto py-1">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#004532] tracking-tight leading-tight">
            {item.word}
          </h3>
          <p className="text-[11px] text-[#6f7973] mt-1 font-medium">{item.translation}</p>
        </div>

        {/* Bottom hint */}
        <div
          className={`flex items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
            isViewed
              ? "text-[#006a61]/60 group-hover:text-[#006a61]"
              : "text-[#8b3b08]/60 group-hover:text-[#8b3b08]"
          }`}
        >
          <span>{isViewed ? "Lihat lagi" : "Ketuk kartu di sini"}</span>
        </div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-3xl bg-[#004532]/0 group-hover:bg-[#004532]/[0.02] transition-all pointer-events-none" />
      </div>
    </motion.div>
  );
}
