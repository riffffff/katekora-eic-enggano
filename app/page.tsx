"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, RotateCw, ArrowRight, Quote } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/Animations";

export default function HomePage() {
  const [isDemoFlipped, setIsDemoFlipped] = useState(false);

  // Essential tourist & everyday phrases
  const quickPhrases = [
    {
      num: "01",
      enggano: "Yauwaika",
      meaning: "Selamatlah kita (Salam Adat)",
    },
    {
      num: "02",
      enggano: "Mėk ėm nė'ah",
      meaning: "Terima kasih banyak",
    },
    {
      num: "03",
      enggano: "Arė, Kinėn de ki yap?",
      meaning: "Halo, bagaimana kabarmu?",
    },
    {
      num: "04",
      enggano: "Na'an kaipakob!",
      meaning: "Sampai berjumpa kembali!",
    },
  ];

  return (
    <PageTransition className="space-y-8 sm:space-y-12 pb-12 md:pb-16 text-center">
      {/* ===== HERO SECTION — DUAL HERO INTERAKTIF & SEAMLESS ===== */}
      <section className="w-full bg-gradient-to-br from-[#004532] via-[#065f46] to-[#006a61] relative overflow-hidden text-white">
        {/* Decorative lighting & shapes */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-[#86f2e4]/10 pointer-events-none blur-3xl" />

        <div className="page-container relative z-10 py-9 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
          {/* =========================================================================
              SLOT LOGO KKN PPM UGM & TIM KKN (KAANEK ENGGANO)
              Simpan file gambar di:
              - public/images/logo-ugm.png
              - public/images/logo-tim-kkn.png
             ========================================================================= */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5">
            {/* 2 Logo: KKN PPM UGM & Tim KKN */}
            <div className="flex items-center justify-center gap-3.5">
              {/* Logo 1: KKN PPM UGM */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-ugm.png"
                  alt="Logo KKN PPM UGM"
                  className="w-full h-full object-contain drop-shadow-md"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = '<span class="font-display font-black text-xs text-white/95 px-2 py-1 bg-white/10 rounded-lg border border-white/20">UGM</span>';
                    }
                  }}
                />
              </div>

              <span className="text-white/30 text-sm font-light">|</span>

              {/* Logo 2: Tim KKN Kaanek Enggano */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-tim-kkn.png"
                  alt="Logo Tim KKN Kaanek Enggano"
                  className="w-full h-full object-contain drop-shadow-md"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = '<span class="font-display font-black text-xs text-[#86f2e4] px-2 py-1 bg-white/10 rounded-lg border border-white/20">TIM KKN</span>';
                    }
                  }}
                />
              </div>
            </div>

            {/* Tulisan Resmi: KKN PPM UGM - KAANEK ENGGANO */}
            <FadeIn delay={0.2} direction="none">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-bold text-[#86f2e4] font-display">
                KKN PPM UGM <span className="text-white/40 mx-1">-</span> KAANEK ENGGANO
              </p>
            </FadeIn>
          </div>

          {/* DUAL HERO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-center">
            {/* Sisi Kiri / Atas: Headline & Deskripsi */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
              <FadeIn direction="left" delay={0.1}>
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white text-center lg:text-left">
                  Ka&apos;tekora <br className="hidden sm:inline" />
                  <span className="text-[#86f2e4]">Eic Enggano</span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left mt-3">
                  Platform edukatif belajar bahasa Enggano untuk pemula, wisatawan, dan pelajar.
                  Kuasai kosakata asli, lafal ortografi diakritik nasal (<code className="bg-black/20 text-[#86f2e4] px-1.5 py-0.5 rounded font-bold">ã, ẽ, ĩ, Ė&apos;</code>),
                  serta uji pemahamanmu secara mandiri.
                </p>

                {/* CTA Button Khusus Desktop — Mengarahkan ke /modules */}
                <div className="hidden lg:flex justify-start pt-3">
                  <Link
                    href="/modules"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#faf6ee] text-[#004532] hover:bg-white hover:text-[#002d20] rounded-full font-display font-black text-base px-9 py-4 shadow-xl transition-all hover:scale-[1.02] active:scale-95 border border-[#eae8e4]"
                  >
                    <span>Mulai Belajar Sekarang</span>
                    <ArrowRight className="w-5 h-5 text-[#004532]" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Sisi Kanan / Bawah: LIVE INTERACTIVE FLASHCARD DEMO & CTA MOBILE */}
            <div className="lg:col-span-5 flex flex-col items-center w-full">
              <FadeIn direction="right" delay={0.2} className="w-full max-w-sm sm:max-w-md">
                {/* Tulisan Coba Kartu Kosakata: Mepet Kiri */}
                <div className="flex items-center justify-start text-left mb-1.5 px-1">
                  <span className="text-xs text-[#86f2e4] font-display font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#86f2e4]" />
                    <span>Coba Kartu Kosakata</span>
                  </span>
                </div>

                {/* 3D Flip Card Demo with periodic 2-second shake animation */}
                <div
                  onClick={() => setIsDemoFlipped((prev) => !prev)}
                  className="perspective-1000 w-full h-[220px] sm:h-[250px] cursor-pointer select-none group animate-subtle-shake mx-auto"
                  role="button"
                  tabIndex={0}
                  aria-label="Coba kartu kosakata Yauwaika"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                      isDemoFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT — Dengan hiasan aksen sudut halus */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white text-[#1b1c1a] rounded-3xl p-5 sm:p-6 border-2 border-white shadow-2xl flex flex-col justify-between items-center text-center group-hover:scale-[1.01] transition-all overflow-hidden">
                      {/* Hiasan radial halus di latar belakang */}
                      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#86f2e4]/15 pointer-events-none blur-xl" />
                      <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-[#004532]/5 pointer-events-none blur-lg" />

                      <div className="w-full flex items-center justify-between relative z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]/30" />
                        <span className="text-[11px] sm:text-xs text-[#006a61] font-bold font-display uppercase tracking-wider">
                          Salam Adat Enggano
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]/30" />
                      </div>

                      <div className="text-center my-auto py-1 relative z-10">
                        <h2 className="font-display font-black text-3xl sm:text-4xl text-[#004532] tracking-tight">
                          Yauwaika!
                        </h2>
                        <p className="text-xs text-[#6f7973] mt-1 font-medium">
                          Bahasa Enggano (Pulau Enggano)
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-[#8b3b08] font-bold bg-[#ffdbcb]/50 py-1.5 px-4 rounded-full mx-auto group-hover:bg-[#ffdbcb] transition-colors relative z-10">
                        <RotateCw className="w-3.5 h-3.5 text-[#8b3b08]" />
                        <span>Ketuk untuk melihat arti</span>
                      </div>
                    </div>

                    {/* BACK — Dengan hiasan halus */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#fbf9f5] text-[#1b1c1a] rounded-3xl p-5 sm:p-6 border-2 border-[#006a61]/40 shadow-2xl flex flex-col justify-between text-center overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center justify-center mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#006a61] font-display">
                            Arti &amp; Konteks Adat
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-[#004532] mb-0.5">
                          Selamatlah Kita!
                        </h3>
                        <p className="text-xs text-[#3f4944] leading-relaxed">
                          Salam khas masyarakat suku Enggano saat bertemu atau membuka percakapan.
                        </p>

                        <div className="mt-2 bg-white/90 p-2 rounded-xl border border-[#eae8e4] text-xs text-center shadow-2xs">
                          <span className="font-bold text-[#004532] block">Contoh:</span>
                          <p className="text-[#3f4944] italic">
                            &quot;Yauwaika! Hã niė&apos;m?&quot; (Selamat! Siapa namamu?)
                          </p>
                        </div>
                      </div>

                      <div className="pt-1 text-center relative z-10">
                        <span className="text-[11px] text-[#6f7973] font-medium inline-flex items-center justify-center gap-1">
                          <RotateCw className="w-3 h-3 text-[#6f7973]" />
                          <span>Ketuk lagi untuk membalik</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button Khusus Mobile — Mengarahkan ke /modules */}
                <div className="block lg:hidden mt-4 w-full">
                  <Link
                    href="/modules"
                    className="flex items-center justify-center gap-2.5 w-full bg-[#faf6ee] text-[#004532] hover:bg-white hover:text-[#002d20] rounded-full font-display font-black text-base py-3.5 shadow-xl transition-all active:scale-95 border border-[#eae8e4]"
                  >
                    <span>Mulai Belajar Sekarang</span>
                    <ArrowRight className="w-5 h-5 text-[#004532]" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FRASA KUNCI YANG SERING DIGUNAKAN — DENGAN HIASAN ELEGAN TIPIS-TIPIS ===== */}
      <div className="page-container">
        <section className="space-y-3.5 sm:space-y-4 text-center">
          <div className="border-b border-[#efeeea] pb-2.5 text-center">
            <span className="text-[11px] sm:text-xs font-bold text-[#006a61] font-display uppercase tracking-wider block mb-0.5">
              Kosakata Pembuka
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#1b1c1a]">
              Frasa Kunci yang Sering Digunakan
            </h2>
          </div>

          {/* Grid 2 Kolom Murni — Kartu dengan Hiasan Elegan Tipis */}
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-4">
            {quickPhrases.map((phrase) => (
              <StaggerItem key={phrase.enggano}>
              <div
                key={phrase.enggano}
                className="relative bg-gradient-to-b from-white to-[#fbf9f5] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#efeeea] shadow-2xs hover:border-[#004532]/25 hover:shadow-xs transition-all space-y-1 sm:space-y-1.5 text-center flex flex-col items-center justify-center overflow-hidden group"
              >
                {/* Hiasan 1: Ikon quote transparan halus di pojok kanan atas */}
                <Quote className="absolute right-2.5 top-2.5 w-4 h-4 text-[#004532]/8 pointer-events-none group-hover:text-[#004532]/15 transition-colors" />

                {/* Hiasan 2: Nomor urut tipis di pojok kiri atas */}
                <span className="absolute left-3 top-2.5 text-[10px] font-mono font-bold text-[#6f7973]/35 tracking-wider">
                  {phrase.num}
                </span>

                {/* Garis aksen hijau tipis di bagian atas kartu */}
                <div className="w-6 h-0.5 rounded-full bg-[#004532]/15 mb-0.5 group-hover:w-10 group-hover:bg-[#004532]/35 transition-all duration-300" />

                <h3 className="font-display font-black text-base sm:text-2xl text-[#004532] tracking-tight leading-snug">
                  {phrase.enggano}
                </h3>

                <p className="text-xs sm:text-sm text-[#3f4944] leading-relaxed">
                  {phrase.meaning}
                </p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </div>

      {/* ===== TAUTAN KE HALAMAN TENTANG PLATFORM ===== */}
      <FadeIn className="page-container">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#eae6df] p-5 sm:p-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left shadow-2xs hover:border-[#006a61]/30 transition-all">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-bold text-[#006a61] uppercase tracking-wider font-display block">
              Inisiatif Pelestarian Budaya
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#004532]">
              Mengenal Lebih Dalam Ka&apos;tekora Eic Enggano
            </h3>
            <p className="text-xs sm:text-sm text-[#5e6962] leading-relaxed">
              Pelajari latar belakang program KKN-PPM UGM 2026, sumber rujukan pustaka resmi, dan profil tim penyusun.
            </p>
          </div>

          <Link
            href="/about"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#004532] text-white hover:bg-[#003828] text-xs sm:text-sm font-display font-bold py-3 px-6 rounded-full shadow-xs active:scale-95 transition-all w-full sm:w-auto"
          >
            <span>Tentang Platform</span>
            <ArrowRight className="w-4 h-4 text-[#86f2e4]" />
          </Link>
        </div>
      </FadeIn>
    </PageTransition>
  );
}
