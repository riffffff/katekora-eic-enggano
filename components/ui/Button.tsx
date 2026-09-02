import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium font-display transition-all duration-200 cursor-pointer select-none rounded-full active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm min-h-[40px] gap-1.5",
    md: "px-6 py-3 text-base min-h-[48px] gap-2 font-semibold shadow-sm",
    lg: "px-8 py-4 text-lg min-h-[56px] gap-2.5 font-bold shadow-md",
  };

  const variantStyles = {
    primary:
      "bg-[#004532] text-white hover:bg-[#065f46] shadow-[#004532]/20 active:bg-[#003426]",
    secondary:
      "bg-[#006a61] text-white hover:bg-[#0d9488] shadow-[#006a61]/20 active:bg-[#00514a]",
    tertiary:
      "bg-[#8b3b08] text-white hover:bg-[#692800] shadow-[#8b3b08]/20 active:bg-[#522000]",
    outline:
      "border-2 border-[#004532] text-[#004532] bg-transparent hover:bg-[#004532]/10 active:bg-[#004532]/20",
    ghost:
      "bg-transparent text-[#1b1c1a] hover:bg-[#efeeea] active:bg-[#e4e2de]",
    danger:
      "bg-[#ba1a1a] text-white hover:bg-[#93000a] shadow-[#ba1a1a]/20",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
