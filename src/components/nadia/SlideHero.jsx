import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { IMAGES } from "@/lib/images";
import FloatingParticles from "@/components/nadia/FloatingParticles";

export default function SlideHero({ onNext }) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Romantic sunset"
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A0C]/80 via-[#0F0A0C]/40 to-[#0F0A0C]/90" />
      </div>

      <FloatingParticles count={40} color="rgba(231,177,177,0.3)" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-heading text-7xl md:text-9xl lg:text-[10rem] italic text-transparent bg-clip-text bg-gradient-to-r from-[#E7B1B1] via-[#D6CADD] to-[#E7B1B1] tracking-wider"
        >
          {t("heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-xl md:text-2xl text-[#D6CADD] font-light tracking-wide"
        >
          {t("heroSubtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-base md:text-lg text-white/50 font-light max-w-md"
        >
          {t("heroText")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          onClick={onNext}
          className="mt-10 px-8 py-3.5 rounded-full border border-[#E7B1B1]/40 text-[#E7B1B1] font-light tracking-wider text-sm hover:bg-[#E7B1B1]/10 hover:border-[#E7B1B1]/60 transition-all duration-500 relative overflow-hidden group"
        >
          <span className="relative z-10">{t("heroButton")}</span>
          <motion.div
            className="absolute inset-0 rounded-full bg-[#E7B1B1]/10"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </div>
  );
}
