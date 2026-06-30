import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Background } from "@/components/os/Background";
import { BootScreen } from "@/components/os/BootScreen";
import { LockScreen } from "@/components/os/LockScreen";
import { Desktop } from "@/components/os/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishav Kumar — Developer OS Portfolio" },
      { name: "description", content: "An immersive operating-system inspired portfolio for a full-stack developer. Boot, unlock, and explore terminal, projects, and more." },
      { property: "og:title", content: "Rishav Kumar — Developer OS Portfolio" },
      { property: "og:description", content: "Boot into a cyber-themed desktop OS portfolio with a live terminal, draggable windows, and immersive widgets." },
    ],
  }),
  component: Index,
});

type Stage = "boot" | "lock" | "desktop";

function Index() {
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
