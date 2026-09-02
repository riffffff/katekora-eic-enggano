import React from "react";

export interface ProgressBarProps {
  progress: number; // 0 - 100
  variant?: "primary" | "secondary" | "tertiary";
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  progress,
  variant = "secondary",
  height = "md",
  showLabel = false,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightStyles = {
    sm: "h-2",
    md: "h-3", // 12px
    lg: "h-4",
  };

  const variantStyles = {
    primary: "bg-[#004532]",
    secondary: "bg-[#006a61]",
    tertiary: "bg-[#8b3b08]",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-[#3f4944] mb-1.5 font-display">
          <span>Progres</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className={`w-full bg-[#efeeea] rounded-full overflow-hidden ${heightStyles[height]}`}
      >
        <div
          className={`${heightStyles[height]} ${variantStyles[variant]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
