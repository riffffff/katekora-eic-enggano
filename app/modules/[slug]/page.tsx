import React from "react";
import { notFound } from "next/navigation";
import { getAllModules, getModuleBySlug } from "@/lib/modules";
import ModuleHeader from "@/components/module/ModuleHeader";
import FlashcardGrid from "@/components/module/FlashcardGrid";
import PageHeader from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/ui/Animations";

interface ModuleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllModules().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: ModuleDetailPageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) return { title: "Modul Tidak Ditemukan" };
  return {
    title: `Modul ${module.order}: ${module.title} - Ka'tekora Eic Enggano`,
    description: module.learningObjective,
  };
}

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) notFound();

  return (
    <PageTransition>
      <PageHeader
        title={`Modul ${module.order}: ${module.title}`}
        subtitle={`${module.vocabulary.length} kosakata · ${module.quiz.length} soal kuis`}
        backHref="/modules"
      />

      {/* Full-width hero banner */}
      <ModuleHeader module={module} />

      {/* Content constrained */}
      <div className="page-container py-8 sm:py-10 pb-12 md:pb-16">
        <FlashcardGrid module={module} />
      </div>
    </PageTransition>
  );
}
