import { ModuleProgress, ModuleProgressStatus } from "@/types/module";

const STORAGE_KEY = "katekora_eic_progress_v1";

export function getAllProgress(): Record<string, ModuleProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read progress from localStorage:", err);
    return {};
  }
}

export function getModuleProgress(slug: string): ModuleProgress {
  const all = getAllProgress();
  return (
    all[slug] || {
      slug,
      status: "not_started",
      lastScore: null,
      totalQuestions: null,
      updatedAt: undefined,
    }
  );
}

export function saveModuleProgress(
  slug: string,
  updates: Partial<ModuleProgress>
): ModuleProgress {
  if (typeof window === "undefined") {
    return {
      slug,
      status: updates.status || "not_started",
      ...updates,
    };
  }

  try {
    const all = getAllProgress();
    const current = all[slug] || {
      slug,
      status: "not_started" as ModuleProgressStatus,
      lastScore: null,
      totalQuestions: null,
    };

    const updated: ModuleProgress = {
      ...current,
      ...updates,
      slug,
      updatedAt: new Date().toISOString(),
    };

    all[slug] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

    // Dispatch a custom event so components on the same page can re-render reactively
    window.dispatchEvent(new Event("katekora_progress_updated"));

    return updated;
  } catch (err) {
    console.error("Failed to save progress to localStorage:", err);
    return {
      slug,
      status: updates.status || "not_started",
      ...updates,
    };
  }
}

export function getOverallStats(totalModules: number) {
  const all = getAllProgress();
  const list = Object.values(all);

  const completed = list.filter((p) => p.status === "completed").length;
  const inProgress = list.filter((p) => p.status === "in_progress").length;

  const scoredList = list.filter(
    (p) => typeof p.lastScore === "number" && p.lastScore !== null
  );

  const avgScore =
    scoredList.length > 0
      ? Math.round(
          scoredList.reduce((acc, curr) => acc + (curr.lastScore || 0), 0) /
            scoredList.length
        )
      : 0;

  return {
    completed,
    inProgress,
    totalModules,
    percentComplete:
      totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0,
    avgScore,
  };
}
