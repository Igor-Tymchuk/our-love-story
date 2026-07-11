import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { IMAGES } from "@/lib/images";
import { Compass, Camera, MapPin, Sparkles, BookOpen } from "lucide-react";
import FloatingParticles from "@/components/nadia/FloatingParticles";

const icons = [Compass, Camera, MapPin, Sparkles, BookOpen];

export default function SlideFuture({ isActive }) {
  const { t } = useLanguage();

  const cards = [
    "slide9Card1",
    "slide9Card2",
    "slide9Card3",
    "slide9Card4",
    "slide9Card5",
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      <div className="absolute inset-0">
        <img
          src={IMAGES.future}
          alt="Future together"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A0C]/90 via-[#0F0A0C]/60 to-[#0F0A0C]/90" />
      </div>

      <FloatingParticles count={15} color="rgba(214,202,221,0.2)" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-heading font-light italic text-[#E7B1B1] mb-5 md:mb-14 text-center"
        >
          {t("slide9Title")}
        </motion.h2>

        <div className="grid  md:flex md:flex-wrap items-center justify-center gap-3 md:gap-5 max-w-3xl w-full">
          {cards.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="md:w-44 p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:bg-white/10 hover:border-[#E7B1B1]/30 transition-all duration-500 group"
              >
                <motion.div
                  animate={isActive ? { y: [0, -6, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Icon className="w-6 h-6 text-[#E7B1B1] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <p className="text-white/70 font-light text-sm">{t(key)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
