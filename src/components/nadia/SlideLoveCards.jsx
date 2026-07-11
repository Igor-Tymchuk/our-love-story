import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { Heart, Sparkles, Flower2, Star, Bird } from "lucide-react";

export default function SlideLoveCards({ isActive }) {
  const { t } = useLanguage();

  const cards = [
    { key: "slide6Card1", Icon: Sparkles },
    { key: "slide6Card2", Icon: Flower2 },
    { key: "slide6Card3", Icon: Star },
    { key: "slide6Card4", Icon: Bird },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #D6CADD 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-heading font-light italic text-[#E7B1B1] mb-4 md:mb-14 text-center"
        >
          {t("slide6Title")}
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl w-full">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isActive ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="relative p-4 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#E7B1B1]/30 transition-all duration-500 group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Heart className="w-4 h-4 text-[#E7B1B1]" fill="#E7B1B1" />
              </div>
              <card.Icon className="w-6 h-6 md:w-7 md:h-7 text-[#D6CADD] mb-2 md:mb-3" />
              <p className="text-white/80 font-light leading-relaxed text-xs md:text-base">
                {t(card.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
