import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wifi, BatteryFull, ChevronUp, Lock } from "lucide-react";
import avatar from "@/assets/avatar.png";
import { PROFILE } from "./data";

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [time, setTime] = useState(new Date());
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") tryUnlock();
      else if (e.key === "Backspace") setPin((p) => p.slice(0, -1));
      else if (/^[0-9]$/.test(e.key)) setPin((p) => (p + e.key).slice(0, 4));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const tryUnlock = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
      onUnlock();
    }, 300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-between py-14 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex justify-between text-xs neon-text font-mono tracking-widest">
        <span>● {PROFILE.location.toUpperCase()}</span>
        <span className="flex items-center gap-3">
          <Wifi className="size-3.5" />
          <BatteryFull className="size-3.5" /> 87%
        </span>
      </div>

      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl md:text-9xl font-light text-white tracking-tighter"
          style={{ textShadow: "0 0 40px rgba(0,255,150,0.25)" }}
        >
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </motion.div>
        <div className="mt-2 text-sm text-emerald-200/70 tracking-widest uppercase">
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>

      <motion.div
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative">
          <img
            src={avatar}
            alt={PROFILE.name}
            width={104}
            height={104}
            className="size-26 rounded-full border-2 border-[var(--neon)]/60 neon-glow object-cover"
            style={{ width: 104, height: 104 }}
          />
          <div className="absolute -bottom-1 -right-1 size-7 rounded-full glass flex items-center justify-center">
            <Lock className="size-3.5 neon-text" />
          </div>
        </div>
        <div className="text-white text-lg font-medium">{PROFILE.name}</div>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`size-3.5 rounded-full border border-[var(--neon)]/50 ${
                pin.length > i ? "bg-[var(--neon)] neon-glow" : ""
              }`}
            />
          ))}
        </div>
        <button
          onClick={onUnlock}
          className="group flex flex-col items-center gap-1 text-emerald-200/70 hover:neon-text text-xs tracking-widest"
        >
          <ChevronUp className="size-5 group-hover:-translate-y-1 transition-transform animate-bounce" />
          ENTER ANY PIN OR SWIPE UP
        </button>
      </motion.div>
    </motion.div>
  );
}
