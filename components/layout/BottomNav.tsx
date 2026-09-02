"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // Do not show bottom nav on home page (mobile navigates via hero CTA) or quiz pages
  if (pathname === "/" || pathname?.includes("/quiz")) {
    return null;
  }

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? "scale-110" : ""}`}
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? "0" : "2"}
          viewBox="0 0 24 24"
        >
          {active ? (
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          )}
        </svg>
      ),
    },
    {
      label: "Modul",
      href: "/modules",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? "scale-110" : ""}`}
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? "0" : "2"}
          viewBox="0 0 24 24"
        >
          {active ? (
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          )}
        </svg>
      ),
    },
    {
      label: "Tentang",
      href: "/about",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 transition-transform ${active ? "scale-110" : ""}`}
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? "0" : "2"}
          viewBox="0 0 24 24"
        >
          {active ? (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pb-3 md:hidden">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-[#efeeea] shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-4 py-2 pointer-events-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-full transition-all duration-200 ${
                isActive
                  ? "text-[#004532] font-semibold bg-[#a6f2d1]/30"
                  : "text-[#6f7973] hover:text-[#1b1c1a]"
              }`}
            >
              {item.icon(isActive)}
              <span className="text-xs mt-0.5 font-display tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
