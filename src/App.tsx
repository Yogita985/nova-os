import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Background } from "@/components/os/Background";
import { BootScreen } from "@/components/os/BootScreen";
import { LockScreen } from "@/components/os/LockScreen";
import { Desktop } from "@/components/os/Desktop";

type Stage = "boot" | "lock" | "desktop";

export default function App() {
  const [stage, setStage] = useState<Stage>("boot");
  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <Background dim={stage === "desktop" ? 0.55 : 0.7} />
      <AnimatePresence mode="wait">
        {stage === "boot" && <BootScreen key="boot" onDone={() => setStage("lock")} />}
        {stage === "lock" && <LockScreen key="lock" onUnlock={() => setStage("desktop")} />}
        {stage === "desktop" && <Desktop key="desktop" />}
      </AnimatePresence>
    </main>
  );
}
