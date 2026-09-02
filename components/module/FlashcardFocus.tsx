"use client";

import React, { useEffect, useRef } from "react";
import { VocabularyItem } from "@/types/module";
import { ChevronLeft, ChevronRight, X, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

interface FlashcardFocusProps {
  items: VocabularyItem[];
  activeIndex: number;
  isFlipped: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onFlip: () => void;
}

export default function FlashcardFocus({
  items,
  activeIndex,
  isFlipped,
  onClose,
  onPrev,
  onNext,
  onFlip,
}: FlashcardFocusProps) {
  const item = items[activeIndex];
  const overlayRef = useRef<HTMLDivElement>(null);

  // Keyboard nav & escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "";
        onClose();
      }
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onFlip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, onFlip]);

  // Prevent body scroll during modal view
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  if (!item) return null;

  return (
    /* Backdrop with FadeIn / FadeOut */
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {/* Modal container with Pop-In Spring Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 340,
        }}
        className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4"
      >
        {/* Counter & Close (Clean — no countdown text) */}
        <div className="flex items-center justify-between w-full px-1">
          <span className="text-xs font-bold text-white/70 font-mono tracking-wider">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Tutup fokus kartu"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Card flip area */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0.7, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={onFlip}
          className="perspective-1000 w-full h-[280px] sm:h-[320px] cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-label={`Kartu kosakata ${item.word}, ketuk untuk balik`}
        >
          <div
            className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#efeeea] shadow-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#f5f3ef] text-[#004532] text-xs font-bold font-display">
                  #{activeIndex + 1}
                </span>
                <span className="text-[11px] font-medium text-[#6f7973] uppercase tracking-wider font-display">
                  Enggano
                </span>
              </div>

              <div className="text-center my-auto py-2">
                <h3 className="font-display font-bold text-4xl sm:text-5xl text-[#004532] tracking-tight leading-tight">
                  {item.word}
                </h3>
                <p className="text-xs text-[#6f7973] mt-2 font-medium">Kata Asli Enggano</p>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#8b3b08] font-bold bg-[#ffdbcb]/50 py-1.5 px-4 rounded-full mx-auto">
                <RotateCw className="w-3.5 h-3.5 text-[#8b3b08]" />
                <span>Ketuk untuk melihat arti</span>
              </div>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#f5f3ef] rounded-3xl p-6 sm:p-8 border-2 border-[#006a61]/40 shadow-2xl flex flex-col justify-between text-left overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006a61] font-display">
                    Arti / Terjemahan
                  </span>
                  <span className="text-xs font-semibold text-[#6f7973]">#{activeIndex + 1}</span>
                </div>
                <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#1b1c1a] mb-3 leading-snug">
                  {item.translation}
                </h4>

                {item.example && (
                  <div className="mt-2 bg-white p-3 rounded-xl border border-[#eae8e4] text-xs">
                    <span className="font-bold text-[#004532] block mb-0.5">Contoh Kalimat:</span>
                    <p className="text-[#3f4944] italic leading-relaxed">{item.example}</p>
                  </div>
                )}

                {item.note && (
                  <div className="mt-2 bg-[#ffdbcb]/35 p-3 rounded-xl border border-[#ffdbcb] text-xs">
                    <span className="font-bold text-[#8b3b08] block mb-0.5">Catatan Kultural:</span>
                    <p className="text-[#692800] leading-relaxed">{item.note}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#6f7973] font-medium">
                  Ketuk untuk kembali ke kata
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between w-full px-1">
          <button
            onClick={onPrev}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95"
            aria-label="Kartu sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[160px]">
            {items.slice(0, 10).map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all ${
                  i === activeIndex
                    ? "w-4 h-2 bg-[#86f2e4]"
                    : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            ))}
            {items.length > 10 && (
              <span className="text-white/40 text-[10px] font-mono">+{items.length - 10}</span>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={activeIndex === items.length - 1}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95"
            aria-label="Kartu berikutnya"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
