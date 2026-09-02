import { ModuleData } from "@/types/module";
import module01 from "@/data/modules/01-salam-sapaan.json";
import module02 from "@/data/modules/02-keluarga-kepemilikan.json";
import module03 from "@/data/modules/03-lokasi-arah.json";
import module04 from "@/data/modules/04-aktivitas-kata-kerja.json";
import module05 from "@/data/modules/05-waktu-negasi.json";
import module06 from "@/data/modules/06-angka.json";
import module07 from "@/data/modules/07-anggota-tubuh.json";

export const allModules: ModuleData[] = [
  module01 as ModuleData,
  module02 as ModuleData,
  module03 as ModuleData,
  module04 as ModuleData,
  module05 as ModuleData,
  module06 as ModuleData,
  module07 as ModuleData,
].sort((a, b) => a.order - b.order);

export function getAllModules(): ModuleData[] {
  return allModules;
}

export function getModuleBySlug(slug: string): ModuleData | undefined {
  return allModules.find((m) => m.slug === slug);
}
