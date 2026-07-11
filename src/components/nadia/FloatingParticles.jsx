import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function FloatingParticles({
  count = 30,
  color = "rgba(231,177,177,0.4)",
  hearts = false,
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -40, 0, 30, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.2, 0.8, 0.4, 0.7, 0.2],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {hearts ? (
            <span
              style={{ fontSize: `${p.size + 6}px`, color }}
              className="select-none"
            >
              ♥
            </span>
          ) : (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: color,
                boxShadow: `0 0 ${p.size * 2}px ${color}`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
