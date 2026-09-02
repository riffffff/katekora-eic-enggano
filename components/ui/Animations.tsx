"use client";

import React from "react";
import { motion } from "framer-motion";

// ============================================================
// A. FadeIn — Scroll Reveal
//    Elemen muncul halus saat masuk viewport
// ============================================================
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.5,
}: FadeInProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// B. StaggerContainer + StaggerItem — Staggered Card Entry
//    Kartu muncul satu per satu bertahap
// ============================================================
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.08,
  delay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// C. PageTransition — Wrap page content for fade transition
// ============================================================
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// D. ScaleIn — Pop-in effect for icons, badges, etc.
// ============================================================
interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.4,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// E. AnimatedCounter — Angka naik bertahap (untuk skor kuis)
// ============================================================
interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1.2,
  suffix = "%",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const steps = 40;
    const increment = target / steps;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve: fast start, slow end
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(target * progress);
      setCount(current);

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
}

// ============================================================
// F. Shake — Guncang halus untuk jawaban salah
// ============================================================
interface ShakeProps {
  children: React.ReactNode;
  trigger: boolean;
  className?: string;
}

export function Shake({ children, trigger, className = "" }: ShakeProps) {
  return (
    <motion.div
      animate={trigger ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// G. Pulse — Denyut halus untuk jawaban benar
// ============================================================
interface PulseProps {
  children: React.ReactNode;
  trigger: boolean;
  className?: string;
}

export function Pulse({ children, trigger, className = "" }: PulseProps) {
  return (
    <motion.div
      animate={trigger ? { scale: [1, 1.04, 0.98, 1.02, 1] } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
