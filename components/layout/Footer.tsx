import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#004532] text-white/70 border-t border-[#065f46] mt-auto py-6 pb-24 md:pb-6 text-center">
      <div className="space-y-1 text-xs w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 mx-auto">
        <p className="text-white/80">
          &copy; {currentYear} Ka&apos;tekora Eic Enggano. Dikembangkan oleh Tim KKN-PPM UGM Kaanek Enggano.
        </p>
        <p className="text-[11px] text-white/50">
          Dokumentasi &amp; Pelestarian Warisan Budaya Bahasa Daerah Enggano
        </p>
      </div>
    </footer>
  );
}
