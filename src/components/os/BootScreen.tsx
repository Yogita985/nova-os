import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "[ OK ] Initializing kernel rishav-os 6.6.0-cyber",
  "[ OK ] Mounting /dev/portfolio on /home",
  "[ OK ] Loading AI engine ........... done",
  "[ OK ] Starting network manager ..... done",
  "[ OK ] Loading developer environment",
  "[ OK ] Connecting to GitHub API ..... ok",
  "[ OK ] Authenticating user: rishav",
  "[ OK ] Launching desktop session",
  "System ready.",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= LINES.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [visible, onDone]);
  const pct = Math.round((visible / LINES.length) * 100);
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col p-8 font-mono text-sm"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="size-3 rounded-full bg-[var(--neon)] neon-glow animate-pulse" />
        <span className="neon-text tracking-widest text-xs">RISHAV/OS v3.0</span>
      </div>
      <div className="flex-1 space-y-1 text-emerald-300/90">
        {LINES.slice(0, visible).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-emerald-500">{l.slice(0, 6)}</span>
            <span className="text-emerald-200/80">{l.slice(6)}</span>
          </motion.div>
        ))}
        <div className="text-emerald-400 caret" />
      </div>
      <div className="mt-6">
        <div className="h-[2px] bg-emerald-900 overflow-hidden">
          <div
            className="h-full bg-[var(--neon)] neon-glow transition-all duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 text-[10px] text-emerald-500/70 tracking-widest">
          {pct}% — BOOTING SECURE ENVIRONMENT
        </div>
      </div>
    </motion.div>
  );
}
