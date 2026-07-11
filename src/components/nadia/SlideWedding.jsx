import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { IMAGES } from "@/lib/images";
import FloatingParticles from "@/components/nadia/FloatingParticles";

export default function SlideWedding({ isActive }) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        animate={
          isActive ? { scale: 1, opacity: 0.05 } : { scale: 0.8, opacity: 0 }
        }
        transition={{ duration: 1 }}
      >
        <span className="text-[20rem] md:text-[30rem] font-heading font-light text-[#E7B1B1] leading-none">
          {t("slide7Year")}
        </span>
      </motion.div>

      {/* Golden particles */}
      <FloatingParticles count={25} color="rgba(212,175,55,0.3)" />

      {/* Warm golden glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center h-full px-6 md:px-16 gap-4 md:gap-8 lg:gap-16 py-16 md:py-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-lg"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-light italic text-[#D4AF37] mb-1 md:mb-2">
            {t("slide7Year")}
          </h2>
          <h3 className="text-base md:text-xl lg:text-2xl text-[#D6CADD] font-light tracking-wide mb-3 md:mb-8">
            {t("slide7Title")}
          </h3>
          <div className="space-y-1.5 md:space-y-3 text-white/70 font-light text-sm md:text-base lg:text-lg leading-relaxed">
            <p>{t("slide7Text1")}</p>
            <p>{t("slide7Text2")}</p>
            <p>{t("slide7Text3")}</p>
            <p>{t("slide7Text4")}</p>
            <p>{t("slide7Text5")}</p>
            <p>{t("slide7Text6")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={isActive ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 max-w-md w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#D4AF37]/10 border border-[#D4AF37]/20 bg-white/5 backdrop-blur-sm p-3">
            <img
              src={IMAGES.wedding2018}
              alt="Wedding 2018"
              className="w-full rounded-xl object-cover aspect-[3/2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A0C]/30 to-transparent rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
