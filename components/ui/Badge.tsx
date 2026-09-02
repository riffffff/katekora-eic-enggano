import React from "react";

export interface BadgeProps {
  variant?:
    | "neutral"
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

export default function Badge({
  variant = "neutral",
  size = "sm",
  className = "",
  children,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full tracking-wide";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3.5 py-1 text-sm font-semibold",
  };

  const variantStyles = {
    neutral: "bg-[#efeeea] text-[#3f4944] border border-[#bec9c2]/50",
    primary: "bg-[#a6f2d1]/40 text-[#004532] border border-[#065f46]/20 font-semibold",
    secondary: "bg-[#86f2e4]/30 text-[#006a61] border border-[#006a61]/20",
    tertiary: "bg-[#ffdbcb] text-[#8b3b08] border border-[#8b3b08]/20",
    success: "bg-[#86f2e4]/40 text-[#004532] font-semibold border border-[#006a61]/30",
    warning: "bg-[#ffdbcb] text-[#8b3b08] font-semibold border border-[#8b3b08]/30",
    error: "bg-[#ffdad6] text-[#ba1a1a] font-semibold border border-[#ba1a1a]/30",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
