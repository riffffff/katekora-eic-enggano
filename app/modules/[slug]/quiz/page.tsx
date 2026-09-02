import React from "react";
import { notFound } from "next/navigation";
import { getAllModules, getModuleBySlug } from "@/lib/modules";
import QuizClient from "./QuizClient";

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const modules = getAllModules();
  return modules.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: QuizPageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) return { title: "Kuis Tidak Ditemukan" };

  return {
    title: `Kuis Modul ${module.order}: ${module.title} - Ka'tekora Eic Enggano`,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);

  if (!module) {
    notFound();
  }

  return <QuizClient module={module} />;
}
