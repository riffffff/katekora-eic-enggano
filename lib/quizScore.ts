export function calculateScore(
  correctCount: number,
  totalQuestions: number
): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function isPassing(scorePercent: number): boolean {
  return scorePercent >= 60;
}

export function getQuizFeedback(scorePercent: number): {
  title: string;
  message: string;
  iconType: "trophy" | "star" | "check" | "refresh";
  badgeType: "success" | "warning" | "error";
} {
  if (scorePercent === 100) {
    return {
      title: "Nilai Sempurna",
      message: "Semua jawaban benar. Kamu sudah menguasai materi modul ini.",
      iconType: "trophy",
      badgeType: "success",
    };
  } else if (scorePercent >= 80) {
    return {
      title: "Hasil Sangat Baik",
      message: "Pemahaman materi sudah kuat. Lanjutkan ke modul berikutnya.",
      iconType: "star",
      badgeType: "success",
    };
  } else if (scorePercent >= 60) {
    return {
      title: "Kuis Berhasil",
      message: "Poin utama sudah dipahami. Bisa diulangi untuk hasil lebih baik.",
      iconType: "check",
      badgeType: "warning",
    };
  } else {
    return {
      title: "Perlu Belajar Lagi",
      message: "Pelajari flashcard sekali lagi sebelum mengulang kuis.",
      iconType: "refresh",
      badgeType: "error",
    };
  }
}
