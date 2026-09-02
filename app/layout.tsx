import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ka'tekora Eic Enggano - Belajar Bahasa Daerah Pulau Enggano",
  description:
    "Platform edukatif belajar bahasa Enggano (Bengkulu) untuk pemula. Hasil program KKN-PPM UGM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${quicksand.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
        {/* Desktop top navbar — hidden on mobile */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Desktop footer */}
        <Footer />

        {/* Mobile bottom nav */}
        <BottomNav />
      </body>
    </html>
  );
}
