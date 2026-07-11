import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/lib/useLanguage.jsx";
import LanguageSwitcher from "@/components/nadia/LanguageSwitcher";
import MusicController from "@/components/nadia/MusicController";
import NavigationDots from "@/components/nadia/NavigationDots";
import SlideHero from "@/components/nadia/SlideHero";
import SlideWhenWeMet from "@/components/nadia/SlideWhenWeMet";
import SlideCouple from "@/components/nadia/SlideCouple";
import SlideMemories from "@/components/nadia/SlideMemories";
import SlideCounter from "@/components/nadia/SlideCounter";
import SlideLoveCards from "@/components/nadia/SlideLoveCards";
import SlideWedding from "@/components/nadia/SlideWedding";
import SlideLetter from "@/components/nadia/SlideLetter";
import SlideFuture from "@/components/nadia/SlideFuture";
import SlideFinal from "@/components/nadia/SlideFinal";
import { ChevronUp, ChevronDown } from "lucide-react";

const TOTAL_SLIDES = 10;

function SlidePresentation() {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [direction, setDirection] = useState(0);
  const isTransitioning = useRef(false);
  const touchStart = useRef(null);

  const goTo = useCallback(
    (idx) => {
      if (
        isTransitioning.current ||
        idx === current ||
        idx < 0 ||
        idx >= TOTAL_SLIDES
      )
        return;
      isTransitioning.current = true;
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 800);
    },
    [current],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Wheel
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      if (!started && current === 0) return;
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [next, prev, started, current]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (!started && current === 0) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, started, current]);

  // Touch swipe
  useEffect(() => {
    const startHandler = (e) => {
      touchStart.current = e.touches[0].clientY;
    };
    const endHandler = (e) => {
      if (touchStart.current === null) return;
      if (!started && current === 0) {
        touchStart.current = null;
        return;
      }
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (diff > 50) next();
      else if (diff < -50) prev();
      touchStart.current = null;
    };
    window.addEventListener("touchstart", startHandler);
    window.addEventListener("touchend", endHandler);
    return () => {
      window.removeEventListener("touchstart", startHandler);
      window.removeEventListener("touchend", endHandler);
    };
  }, [next, prev, started, current]);

  const handleStart = useCallback(() => {
    setStarted(true);
    next();
  }, [next]);

  const slides = [
    <SlideHero key="hero" onNext={handleStart} />,
    <SlideWhenWeMet key="met" isActive={current === 1} />,
    <SlideCouple key="couple" isActive={current === 2} />,
    <SlideMemories key="memories" isActive={current === 3} />,
    <SlideCounter key="counter" isActive={current === 4} />,
    <SlideLoveCards key="love" isActive={current === 5} />,
    <SlideWedding key="wedding" isActive={current === 6} />,
    <SlideLetter key="letter" isActive={current === 7} />,
    <SlideFuture key="future" isActive={current === 8} />,
    <SlideFinal key="final" isActive={current === 9} />,
  ];

  const variants = {
    enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="fixed inset-0 bg-[#0F0A0C] overflow-hidden">
      <LanguageSwitcher />
      <MusicController />

      {/* Navigation — only after started */}
      {started && (
        <>
          <NavigationDots
            total={TOTAL_SLIDES}
            current={current}
            onNavigate={goTo}
          />

          {current > 0 && (
            <button
              onClick={prev}
              className="fixed top-6 right-6 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
          {current < TOTAL_SLIDES - 1 && (
            <button
              onClick={next}
              className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </>
      )}

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="absolute inset-0"
        >
          {slides[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <SlidePresentation />
    </LanguageProvider>
  );
}
