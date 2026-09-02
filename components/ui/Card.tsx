import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat" | "primary" | "secondary";
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
  interactive?: boolean;
  children: React.ReactNode;
}

export default function Card({
  variant = "default",
  rounded = "2xl",
  interactive = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyles = "relative transition-all duration-200";

  const roundedStyles = {
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-2xl",
    "2xl": "rounded-3xl",
    "3xl": "rounded-[32px]",
  };

  const variantStyles = {
    default:
      "bg-white border border-[#efeeea] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    elevated:
      "bg-white border border-[#eae8e4] shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
    flat:
      "bg-[#f5f3ef] border border-[#eae8e4]",
    primary:
      "bg-[#004532] text-white border border-[#065f46]",
    secondary:
      "bg-[#006a61] text-white border border-[#00514a]",
  };

  const interactiveStyles = interactive
    ? "cursor-pointer hover:border-[#006a61]/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] active:translate-y-0"
    : "";

  return (
    <div
      className={`${baseStyles} ${roundedStyles[rounded]} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
