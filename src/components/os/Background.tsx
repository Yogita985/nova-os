import { useEffect, useRef } from "react";
import wallpaper from "@/assets/wallpaper.jpg";

export function Background({ dim = 0.55 }: { dim?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={ref}
        className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `rgba(2,8,6,${dim})` }}
      />
      <div className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, oklch(0.6 0.2 150 / 0.25), transparent 70%), radial-gradient(40% 40% at 80% 70%, oklch(0.7 0.2 170 / 0.18), transparent 70%)",
          animation: "aurora 12s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(50,255,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(50,255,150,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}
