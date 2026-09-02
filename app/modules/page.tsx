import React from "react";
import { getAllModules } from "@/lib/modules";
import ModuleCard from "@/components/module/ModuleCard";
import PageHeader from "@/components/layout/PageHeader";
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/Animations";

export const metadata = {
  title: "Daftar Modul - Ka'tekora Eic Enggano",
  description: "7 modul pembelajaran bahasa Enggano secara terstruktur.",
};

export default function ModulesPage() {
  const modules = getAllModules();

  return (
    <PageTransition>
      <PageHeader
        title="Daftar Modul Belajar"
        subtitle={`${modules.length} Modul Pembelajaran Terstruktur`}
        backHref="/"
      />

      <div className="page-container py-8 sm:py-10 pb-12 md:pb-16">
        {/* Grid — Staggered entry animation */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" stagger={0.07}>
          {modules.map((m) => (
            <StaggerItem key={m.slug}>
              <ModuleCard module={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
