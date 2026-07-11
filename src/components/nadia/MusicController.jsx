import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function MusicController() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Romantic piano piece — free to use, reliable CDN
    const audio = new Audio("./adam-povlno.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Try immediate autoplay (works if browser allows it)
    audio
      .play()
      .then(() => {
        setPlaying(true);
        initRef.current = true;
      })
      .catch(() => {
        // Blocked by browser — fall back to first interaction
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startOnInteraction = useCallback(() => {
    if (!initRef.current && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
          initRef.current = true;
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", startOnInteraction, { once: true });
    document.addEventListener("touchstart", startOnInteraction, { once: true });
    document.addEventListener("keydown", startOnInteraction, { once: true });
    return () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, [startOnInteraction]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
      initRef.current = true;
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const changeVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-[#E7B1B1] transition-all duration-300"
      >
        {playing ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>
      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-[#E7B1B1] transition-all duration-300"
      >
        {muted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
      {playing && (
        <div className="flex items-center gap-1 ml-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-[#E7B1B1] rounded-full"
              animate={{ height: [4, 14, 6, 12, 4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}
      {showVolume && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          className="ml-1"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={changeVolume}
            className="w-20 h-1 accent-[#E7B1B1] cursor-pointer"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
