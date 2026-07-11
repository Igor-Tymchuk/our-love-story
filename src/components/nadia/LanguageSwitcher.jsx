import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { Globe } from "lucide-react";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "pl", label: "PL" },
  { code: "uk", label: "UA" },
];

export default function LanguageSwitcher() {
  const { lang, switchLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGS.find((l) => l.code === lang);

  return (
    <div ref={ref} className="fixed top-6 left-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 transition-all duration-300"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-light tracking-wider">
          {current?.label}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/15 overflow-hidden"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  switchLang(l.code);
                  setOpen(false);
                }}
                className={`block w-full px-6 py-2.5 text-sm tracking-wider text-left transition-all duration-200 ${
                  l.code === lang
                    ? "text-[#E7B1B1] bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
