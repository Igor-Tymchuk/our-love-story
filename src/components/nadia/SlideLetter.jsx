import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { Mail } from "lucide-react";

export default function SlideLetter({ isActive }) {
  const { t } = useLanguage();
  const [opened, setOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef(null);

  const letterText = t("slide8Letter");

  useEffect(() => {
    if (opened && isActive) {
      let idx = 0;
      setDisplayedText("");
      intervalRef.current = setInterval(() => {
        idx++;
        setDisplayedText(letterText.slice(0, idx));
        if (idx >= letterText.length) clearInterval(intervalRef.current);
      }, 30);
    }
    return () => clearInterval(intervalRef.current);
  }, [opened, isActive, letterText]);

  useEffect(() => {
    if (!isActive) {
      setOpened(false);
      setDisplayedText("");
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #E7B1B1 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 flex flex-col items-center h-full px-6 py-16 md:py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-heading font-light italic text-[#E7B1B1] mb-5 md:mb-8 text-center flex-shrink-0"
        >
          {t("slide8Title")}
        </motion.h2>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isActive ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              transition={{ duration: 0.6 }}
              onClick={() => setOpened(true)}
              className="relative w-48 h-32 md:w-64 md:h-44 rounded-xl bg-gradient-to-br from-[#E7B1B1]/20 to-[#D6CADD]/10 border border-[#E7B1B1]/30 backdrop-blur-xl flex flex-col items-center justify-center gap-3 hover:scale-105 hover:border-[#E7B1B1]/50 transition-all duration-500 cursor-pointer group"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-10 h-10 md:w-14 md:h-14 text-[#E7B1B1]" />
              </motion.div>
              <span className="text-white/50 text-xs tracking-wider font-light">
                {t("heroButton")}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="max-w-lg w-full mx-auto rounded-2xl border border-[#E7B1B1]/20 relative flex flex-col min-h-0 flex-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(250,249,246,0.08) 0%, rgba(231,177,177,0.05) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Paper texture overlay */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
                }}
              />

              <div
                className="overflow-y-auto flex-1 p-5 md:p-10 min-h-0"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(231,177,177,0.3) transparent",
                }}
              >
                <pre
                  className="text-white/80 font-light text-sm md:text-base leading-relaxed whitespace-pre-wrap relative z-10"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-[#E7B1B1]"
                  >
                    |
                  </motion.span>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
