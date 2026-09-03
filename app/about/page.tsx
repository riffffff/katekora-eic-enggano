import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import aboutData from "@/data/modules/about.json";
import { ArrowRight, BookOpen } from "lucide-react";
import { FadeIn, PageTransition, StaggerContainer, StaggerItem } from "@/components/ui/Animations";

export const metadata = {
  title: "Tentang Platform - Ka'tekora Eic Enggano",
  description:
    "Latar belakang, tujuan, dan sumber materi pembelajaran platform edukasi bahasa Enggano KKN-PPM UGM 2026.",
};

export default function AboutPage() {
  const {
    salutation,
    title,
    aboutPlatform,
    purpose,
    learningSources,
    contributors,
    closing,
  } = aboutData;

  return (
    <PageTransition className="bg-[#fbf9f5] min-h-screen text-[#1b1c1a]">
      <PageHeader
        title="Tentang Platform"
        subtitle="Dokumentasi &amp; Edukasi Bahasa Enggano"
        backHref="/"
      />

      <article className="py-8 sm:py-10 pb-12 md:pb-16 space-y-8 sm:space-y-10 w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 mx-auto">
        {/* Editorial Header */}
        <FadeIn direction="up" delay={0.1}>
          <header className="space-y-4 pb-6 border-b-2 border-[#004532]/10">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#006a61] font-display">
              {salutation}
            </p>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#004532] tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-[#3f4944] leading-relaxed pt-1">
              {aboutPlatform.description}
            </p>
          </header>
        </FadeIn>

        {/* Section 1: Tujuan */}
        <FadeIn direction="up" delay={0.15}>
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#004532]">
                {purpose.title}
              </h2>
              <p className="text-sm text-[#3f4944] leading-relaxed">
                {purpose.description}
              </p>
            </div>

            <div className="space-y-3">
              {purpose.points.map((point: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-gradient-to-br from-white to-[#fbf9f5] border-l-4 border-[#006a61]"
                >
                  <span className="font-mono font-bold text-sm text-[#006a61] shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <p className="text-sm text-[#2c332e] leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Section 2: Sumber Materi Pembelajaran (Bibliografi Resmi) */}
        <FadeIn direction="up" delay={0.2}>
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#006a61]" />
              <h2 className="font-display font-bold text-xl text-[#004532]">
                {learningSources.title}
              </h2>
            </div>

            <div className="bg-[#f5f3ef]/50 rounded-2xl p-4 space-y-3">
              {learningSources.items.map((item, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#eae6df]/60">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#1b1c1a]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5e6962] leading-relaxed mt-1">
                    {item.author}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Section 3: Tim Penyusun & Narasumber (Colophon / Credits) */}
        <FadeIn direction="up" delay={0.25}>
          <section className="space-y-4">
            <h2 className="font-display font-bold text-xl text-[#004532]">
              Tim &amp; Narasumber
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tim Penyusun */}
              <div className="bg-white rounded-2xl p-5 border border-[#004532]/20 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#004532]/5 rounded-full -mr-12 -mt-12"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006a61] font-display block relative">
                  {contributors.team.role}
                </span>
                <div className="space-y-0.5 relative">
                  {contributors.team.members.map((member: string) => (
                    <p key={member} className="font-display font-bold text-base text-[#1b1c1a]">
                      {member}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-[#6f7973] pt-1 relative">
                  {contributors.team.institution}
                </p>
              </div>

              {/* Narasumber */}
              <div className="bg-white rounded-2xl p-5 border border-[#8b3b08]/20 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b3b08]/5 rounded-full -mr-12 -mt-12"></div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8b3b08] font-display block relative">
                  {contributors.consultant.role}
                </span>
                <p className="font-display font-bold text-base text-[#1b1c1a] relative">
                  {contributors.consultant.name}
                </p>
                <p className="text-xs text-[#6f7973] pt-1 relative">
                  {contributors.consultant.title}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Section 4: Penutup & Aksi Pembelajaran */}
        <FadeIn direction="up" delay={0.3}>
          <footer className="pt-6 border-t border-[#e5e2db] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f5f3ef]/30 -mx-4 px-4 py-6 rounded-xl">
            <p className="text-xs sm:text-sm text-[#5e6962] italic text-center sm:text-left">
              &quot;{closing.message}&quot;
            </p>

            <Link
              href="/modules"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#004532] text-white hover:bg-[#003828] font-display font-bold text-sm rounded-full px-6 py-3 transition-all shadow-sm active:scale-95"
            >
              <span>{closing.action}</span>
              <ArrowRight className="w-4 h-4 text-[#86f2e4]" />
            </Link>
          </footer>
        </FadeIn>
      </article>
    </PageTransition>
  );
}
