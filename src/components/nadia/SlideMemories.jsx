import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage.jsx";
import { IMAGES } from "@/lib/images";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: IMAGES.memDancing, alt: "Dancing together" },
  { src: IMAGES.memBeach, alt: "Beach walk" },
  { src: IMAGES.memCoffee, alt: "Morning coffee" },
  { src: IMAGES.memRain, alt: "Rain moment" },
  { src: IMAGES.memStars, alt: "Stargazing" },
  { src: IMAGES.future, alt: "Future" },
];

export default function SlideMemories({ isActive }) {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef(null);

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevLightbox = () =>
    setLightbox((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  const nextLightbox = () =>
    setLightbox((prev) => (prev < photos.length - 1 ? prev + 1 : 0));

  const prevPhoto = () =>
    setMobileIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  const nextPhoto = () =>
    setMobileIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? nextPhoto() : prevPhoto();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F0A0C]">
      <div className="relative z-20 flex flex-col items-center h-full px-6 md:px-12 py-8 md:py-6 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-heading font-light italic text-[#E7B1B1] mb-4 md:mb-6 text-center flex-shrink-0 mt-[10vh] lg:mt-auto"
        >
          {t("slide4Title")}
        </motion.h2>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-3 max-w-4xl w-full flex-1 min-h-0">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative cursor-pointer group overflow-hidden rounded-xl border border-white/10"
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="absolute inset-0 bg-[#0F0A0C]/20 group-hover:bg-[#0F0A0C]/0 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden w-full max-w-sm relative">
          <div
            className="overflow-hidden rounded-xl border border-white/10 relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={mobileIdx}
                src={photos[mobileIdx].src}
                alt={photos[mobileIdx].alt}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => openLightbox(mobileIdx)}
              />
            </AnimatePresence>
            {/* Arrow buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mobileIdx ? "bg-[#E7B1B1] w-5" : "bg-white/30 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 text-white/60 hover:text-white"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 text-white/60 hover:text-white"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <motion.img
              key={lightbox}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
