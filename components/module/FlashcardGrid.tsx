"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ModuleData } from "@/types/module";
import Flashcard from "./Flashcard";
import FlashcardFocus from "./FlashcardFocus";
import { saveModuleProgress, getModuleProgress } from "@/lib/progress";
import { Lightbulb, ArrowRight, PartyPopper } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { AnimatePresence, motion } from "framer-motion";

export default function FlashcardGrid({ module }: { module: ModuleData }) {
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [focusFlipped, setFocusFlipped] = useState(false);
  const [viewedSet, setViewedSet] = useState<Set<number>>(new Set());
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const quizBannerRef = useRef<HTMLDivElement>(null);

  const allViewed = viewedSet.size >= module.vocabulary.length;

  useEffect(() => {
    const current = getModuleProgress(module.slug);
    if (current.status === "not_started") {
      saveModuleProgress(module.slug, { status: "in_progress" });
    }
  }, [module.slug]);

  const lastActiveIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (focusIndex !== null) {
      lastActiveIndexRef.current = focusIndex;
    }
  }, [focusIndex]);

  // Smooth scroll to quiz banner
  const scrollToQuiz = useCallback(() => {
    document.body.style.overflow = "";
    setTimeout(() => {
      document.body.style.overflow = "";
      const el = document.getElementById("quiz-cta-banner");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        quizBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 280);
  }, []);

  // Smooth scroll to specific card in grid
  const scrollToCard = useCallback((cardIndex: number) => {
    document.body.style.overflow = "";
    setTimeout(() => {
      document.body.style.overflow = "";
      const el = document.getElementById(`flashcard-${cardIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 280);
  }, []);

  const closeFocus = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    document.body.style.overflow = "";
    const lastIdx = lastActiveIndexRef.current ?? focusIndex;
    setFocusIndex(null);
    setFocusFlipped(false);

    // If all cards have been viewed, scroll to the quiz CTA
    if (viewedSet.size >= module.vocabulary.length) {
      scrollToQuiz();
    } else if (lastIdx !== null) {
      // If stopped midway (e.g. 13/20), scroll to that card in the grid
      scrollToCard(lastIdx);
    }
  }, [viewedSet.size, module.vocabulary.length, scrollToQuiz, scrollToCard, focusIndex]);

  // When ALL cards are seen while modal is open → automatically close after 5 seconds
  useEffect(() => {
    if (allViewed && focusIndex !== null) {
      autoCloseTimerRef.current = setTimeout(() => {
        closeFocus();
      }, 5000);

      return () => {
        if (autoCloseTimerRef.current) {
          clearTimeout(autoCloseTimerRef.current);
          autoCloseTimerRef.current = null;
        }
      };
    }
  }, [allViewed, focusIndex, closeFocus]);

  const markViewed = useCallback((index: number) => {
    setViewedSet((prev) => {
      if (prev.has(index)) return prev;
      return new Set(prev).add(index);
    });
  }, []);

  const openFocus = useCallback((index: number) => {
    setFocusIndex(index);
    setFocusFlipped(false);
    markViewed(index);
  }, [markViewed]);

  const goPrev = useCallback(() => {
    setFocusIndex((prev) => {
      if (prev === null || prev <= 0) return prev;
      const next = prev - 1;
      markViewed(next);
      return next;
    });
    setFocusFlipped(false);
  }, [markViewed]);

  const goNext = useCallback(() => {
    setFocusIndex((prev) => {
      if (prev === null || prev >= module.vocabulary.length - 1) return prev;
      const next = prev + 1;
      markViewed(next);
      return next;
    });
    setFocusFlipped(false);
  }, [module.vocabulary.length, markViewed]);

  const toggleFocusFlip = useCallback(() => {
    setFocusFlipped((prev) => !prev);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Subtle Hint + progress counter */}
      <div className="flex items-center justify-between text-xs text-[#6f7973] px-1">
        <span className="inline-flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-[#8b3b08] shrink-0" />
          <span>Ketuk kartu untuk fokus &amp; lihat arti</span>
        </span>
        <span className="font-mono font-bold text-[#004532]">
          {viewedSet.size}/{module.vocabulary.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-[#efeeea] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#004532] rounded-full transition-all duration-500"
          style={{ width: `${(viewedSet.size / module.vocabulary.length) * 100}%` }}
        />
      </div>

      {/* Flashcard Grid — Staggered entry animation */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" stagger={0.05}>
        {module.vocabulary.map((item, index) => (
          <StaggerItem key={item.id}>
            <Flashcard
              item={item}
              index={index}
              isViewed={viewedSet.has(index)}
              onFocus={() => openFocus(index)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Quiz CTA Banner */}
      <div
        id="quiz-cta-banner"
        ref={quizBannerRef}
        className={`w-full rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md text-white transition-all duration-500 ${
          allViewed
            ? "bg-gradient-to-r from-[#004532] to-[#006a61] ring-4 ring-[#86f2e4]/40 scale-[1.01]"
            : "bg-gradient-to-r from-[#004532] to-[#006a61]"
        }`}
      >
        <div className="text-center sm:text-left">
          {allViewed ? (
            <>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <PartyPopper className="w-5 h-5 text-[#86f2e4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#86f2e4] font-display">
                  Semua kartu sudah dilihat!
                </span>
              </div>
              <h4 className="font-display font-bold text-lg md:text-xl text-white">
                Yuk, uji pemahamanmu!
              </h4>
              <p className="text-sm text-white/80 mt-0.5">
                {module.quiz.length} soal kuis menunggumu.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-display font-bold text-lg md:text-xl text-white">
                Sudah hapal semua kosakatanya?
              </h4>
              <p className="text-sm text-white/80 mt-1">
                Uji pemahamanmu dengan {module.quiz.length} soal kuis pilihan ganda.
              </p>
            </>
          )}
        </div>

        {/* Calm breathing Quiz CTA Button */}
        <motion.div
          animate={{
            scale: allViewed ? [1, 1.05, 1] : [1, 1.03, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.6,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="relative shrink-0 w-full sm:w-auto"
        >
          {/* Bouncing Pill Badge on Top */}
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute -top-3 right-3 sm:-right-2 z-10 bg-[#86f2e4] text-[#004532] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-white shadow-sm tracking-wider font-display select-none"
          >
            Mulai Tes
          </motion.span>

          <Link
            href={`/modules/${module.slug}/quiz`}
            className="relative flex items-center justify-center gap-2.5 bg-[#faf6ee] text-[#004532] hover:bg-white hover:text-[#002d20] font-display font-black text-base rounded-full px-9 py-4 shadow-xl transition-all border-2 border-white/90 group overflow-hidden"
          >
            <span className="tracking-tight">Mulai Kuis Modul</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5 text-[#004532] stroke-[2.5]" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Focus Modal with Entry & Exit Animations */}
      <AnimatePresence>
        {focusIndex !== null && (
          <FlashcardFocus
            items={module.vocabulary}
            activeIndex={focusIndex}
            isFlipped={focusFlipped}
            onClose={closeFocus}
            onPrev={goPrev}
            onNext={goNext}
            onFlip={toggleFocusFlip}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
