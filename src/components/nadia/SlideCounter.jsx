import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";

const START_DATE = new Date(2014, 0, 1);

function getTimeDiff() {
  const now = new Date();
  const diff = now - START_DATE;
  const totalMinutes = Math.floor(diff / 60000);
  const totalHours = Math.floor(diff / 3600000);
  const totalDays = Math.floor(diff / 86400000);
  const totalMonths =
    (now.getFullYear() - START_DATE.getFullYear()) * 12 +
    (now.getMonth() - START_DATE.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const days = totalDays % 30;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  return { years, months, days, hours, minutes };
}

function CounterRing({ value, label, maxVal, delay, isActive }) {
  const pct = (value / maxVal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isActive ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-20 h-20 md:w-28 md:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="3"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#E7B1B1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={276.46}
            initial={{ strokeDashoffset: 276.46 }}
            animate={
              isActive
                ? { strokeDashoffset: 276.46 - (276.46 * pct) / 100 }
                : { strokeDashoffset: 276.46 }
            }
            transition={{ duration: 1.5, delay: delay + 0.3 }}
            style={{ filter: "drop-shadow(0 0 6px rgba(231,177,177,0.4))" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-light text-white tabular-nums">
            {value}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs md:text-sm text-[#D6CADD]/70 font-light tracking-wider uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function SlideCounter({ isActive }) {
  const { t } = useLanguage();
  const [time, setTime] = useState(getTimeDiff);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeDiff()), 30000);
    return () => clearInterval(interval);
  }, []);

  const rings = [
    { value: time.years, label: t("slide5Years"), maxVal: 20, delay: 0 },
    { value: time.months, label: t("slide5Months"), maxVal: 12, delay: 0.1 },
    { value: time.days, label: t("slide5Days"), maxVal: 30, delay: 0.2 },
    { value: time.hours, label: t("slide5Hours"), maxVal: 24, delay: 0.3 },
    { value: time.minutes, label: t("slide5Minutes"), maxVal: 60, delay: 0.4 },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #E7B1B1 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-heading font-light italic text-[#E7B1B1] mb-2 md:mb-4 text-center"
        >
          {t("slide5Title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mb-4 md:mb-10 space-y-1"
        >
          <p className="text-white/50 font-light">{t("slide5Text1")}</p>
          <p className="text-white/50 font-light">{t("slide5Text2")}</p>
          <p className="text-white/50 font-light">{t("slide5Text3")}</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {rings.map((ring) => (
            <CounterRing
              key={ring.label}
              value={ring.value}
              label={ring.label}
              maxVal={ring.maxVal}
              delay={ring.delay}
              isActive={isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
