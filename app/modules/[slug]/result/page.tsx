import React from "react";
import { notFound } from "next/navigation";
import { getAllModules, getModuleBySlug } from "@/lib/modules";
import ResultClient from "./ResultClient";

interface ResultPageProps {
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

export async function generateMetadata({ params }: ResultPageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);
  if (!module) return { title: "Hasil Kuis" };

  return {
    title: `Hasil Kuis Modul ${module.order}: ${module.title} - Ka'tekora Eic Enggano`,
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { slug } = await params;
  const module = getModuleBySlug(slug);

  if (!module) {
    notFound();
  }

  return <ResultClient module={module} />;
}
