import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import FloatingParticles from "@/components/nadia/FloatingParticles";
import confetti from "canvas-confetti";

export default function SlideFinal({ isActive }) {
  const { t } = useLanguage();
  const [revealed, setRevealed] = useState(false);

  const triggerSurprise = useCallback(() => {
    setRevealed(true);

    // Confetti burst
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#E7B1B1", "#D6CADD", "#D4AF37", "#FAF9F6", "#ff6b81"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
        shapes: ["circle"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
        shapes: ["circle"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Heart confetti
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#E7B1B1", "#ff6b81", "#D4AF37"],
        shapes: ["circle"],
        scalar: 1.5,
      });
    }, 1500);

    // Fireworks
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 80,
            startVelocity: 30,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            colors,
            scalar: 1.2,
          });
        }, i * 400);
      }
    }, 2500);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      {/* Starry background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {revealed && (
        <FloatingParticles count={40} color="rgba(231,177,177,0.4)" hearts />
      )}

      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={
          revealed ? { opacity: 0.2, scale: 1.3 } : { opacity: 0.05, scale: 1 }
        }
        transition={{ duration: 2 }}
        style={{
          background: "radial-gradient(circle, #E7B1B1 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="before"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#E7B1B1] via-[#D6CADD] to-[#E7B1B1]"
              >
                {t("slide10Title")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 text-xl md:text-2xl text-[#D6CADD] font-light max-w-lg"
              >
                {t("slide10Subtitle")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-4 text-base md:text-lg text-white/50 font-light max-w-md leading-relaxed"
              >
                {t("slide10Text")}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
                onClick={triggerSurprise}
                className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-[#E7B1B1] to-[#D6CADD] text-[#0F0A0C] font-medium tracking-wider text-sm hover:scale-105 transition-transform duration-500 relative overflow-hidden"
              >
                <span className="relative z-10">{t("slide10Button")}</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="flex flex-col items-center"
            >
              <motion.h2
                className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-bold italic  text-transparent bg-clip-text bg-gradient-to-r from-[#E7B1B1] via-[#D4AF37] to-[#E7B1B1]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("slide10Final")}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-4xl"
              >
                ♥
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
