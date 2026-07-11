import React from "react";
import { motion } from "framer-motion";

export default function NavigationDots({ total, current, onNavigate }) {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 right-2 w-2 sm:right-8">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className="group relative flex items-center justify-center"
        >
          <motion.div
            className="rounded-full transition-all duration-300"
            animate={{
              width: current === i ? 8 : 5,
              height: current === i ? 8 : 5,
              backgroundColor:
                current === i ? "#E7B1B1" : "rgba(255,255,255,0.3)",
              boxShadow:
                current === i ? "0 0 12px rgba(231,177,177,0.6)" : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
