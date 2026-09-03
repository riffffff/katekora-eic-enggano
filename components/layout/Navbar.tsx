"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Hide on quiz pages entirely. On home page (/), hide ONLY on mobile (md:block handles desktop visibility via the header className).
  if (pathname?.includes("/quiz")) return null;

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Daftar Modul", href: "/modules" },
    { label: "Tentang Platform", href: "/about" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#efeeea] shadow-xs ${
      pathname === "/" ? "hidden md:block" : "hidden md:block"
    }`}>
      <div className="flex items-center justify-between h-16 w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="leading-tight">
            <div className="font-display font-black text-[#004532] text-base tracking-tight group-hover:text-[#065f46] transition-colors">
              Ka&apos;tekora Eic Enggano
            </div>
            <div className="text-[11px] text-[#6f7973] font-medium">
              KKN-PPM UGM • Pulau Enggano
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold font-display transition-all ${
                  isActive
                    ? "bg-[#004532] text-white shadow-xs"
                    : "text-[#3f4944] hover:text-[#004532] hover:bg-[#efeeea]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/modules"
          className="px-5 py-2.5 rounded-full bg-[#004532] text-white text-sm font-display font-bold shadow-xs hover:bg-[#065f46] active:scale-95 transition-all"
        >
          Mulai Belajar →
        </Link>
      </div>
    </header>
  );
}
