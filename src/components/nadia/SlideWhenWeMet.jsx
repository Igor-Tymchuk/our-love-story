import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { IMAGES } from "@/lib/images";
import FloatingParticles from "@/components/nadia/FloatingParticles";

export default function SlideWhenWeMet({ isActive }) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      {/* Parallax year */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        animate={
          isActive ? { scale: 1, opacity: 0.06 } : { scale: 0.8, opacity: 0 }
        }
        transition={{ duration: 1 }}
      >
        <span className="text-[20rem] md:text-[30rem] font-heading font-light text-white leading-none">
          {t("slide2Year")}
        </span>
      </motion.div>

      <FloatingParticles count={20} color="rgba(231,177,177,0.25)" hearts />

      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center h-full px-6 md:px-16 gap-4 md:gap-8 lg:gap-16 py-16 md:py-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-lg"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-light italic text-[#E7B1B1] mb-1 md:mb-2">
            {t("slide2Year")}
          </h2>
          <h3 className="text-base md:text-xl lg:text-2xl text-[#D6CADD] font-light tracking-wide mb-3 md:mb-8">
            {t("slide2Title")}
          </h3>
          <div className="space-y-2 md:space-y-4 text-white/70 font-light text-sm md:text-base lg:text-lg leading-relaxed">
            <p>{t("slide2Text1")}</p>
            <p>{t("slide2Text2")}</p>
            <p>{t("slide2Text3")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={isActive ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 max-w-md w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#E7B1B1]/10 border border-white/10 bg-white/5 backdrop-blur-sm p-3">
            <img
              src={IMAGES.meeting2013}
              alt="When we met in 2013"
              className="w-full rounded-xl object-cover aspect-[3/2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A0C]/40 to-transparent rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
