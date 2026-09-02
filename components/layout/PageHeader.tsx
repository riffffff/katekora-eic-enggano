"use client";

import React from "react";
import Link from "next/link";

export interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  backHref?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backHref = "/",
  showBack = true,
  rightAction,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`w-full bg-[#fbf9f5] border-b border-[#efeeea] ${className}`}>
      <div className="page-container flex items-center justify-between py-3.5 sm:py-4 gap-3">
        {/* Breadcrumbs & Navigation */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && (
            <Link
              href={backHref}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#efeeea] text-[#1b1c1a] hover:bg-[#004532] hover:text-white hover:border-[#004532] active:scale-95 transition-all shadow-xs shrink-0"
              aria-label="Kembali"
              title="Kembali"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          )}

          {title && (
            <div className="flex items-center gap-1.5 min-w-0 text-xs sm:text-sm text-[#6f7973]">
              <Link href="/" className="hover:text-[#004532] transition-colors shrink-0 hidden sm:inline">
                Beranda
              </Link>
              <span className="text-[#bec9c2] hidden sm:inline">/</span>
              {backHref.includes("/modules") && backHref !== "/modules" ? (
                <>
                  <Link href="/modules" className="hover:text-[#004532] transition-colors shrink-0 hidden sm:inline">
                    Modul
                  </Link>
                  <span className="text-[#bec9c2] hidden sm:inline">/</span>
                </>
              ) : null}
              <span className="font-display font-bold text-[#1b1c1a] truncate">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* Right action / Subtitle info */}
        <div className="flex items-center gap-3 shrink-0">
          {subtitle && (
            <span className="text-xs text-[#6f7973] font-medium hidden md:inline">
              {subtitle}
            </span>
          )}
          {rightAction}
        </div>
      </div>
    </div>
  );
}
