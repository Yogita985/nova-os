import { motion, useDragControls } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { type ReactNode, useRef } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon?: ReactNode;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

interface Props {
  win: WindowState;
  children: ReactNode;
  onClose: () => void;
  onMin: () => void;
  onMax: () => void;
  onFocus: () => void;
}

export function Window({ win, children, onClose, onMin, onMax, onFocus }: Props) {
  const controls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  if (win.minimized) return null;

  const isMax = win.maximized;

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" />
      <motion.div
        drag={!isMax}
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onMouseDown={onFocus}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isMax ? 0 : undefined,
        }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="fixed glass rounded-2xl overflow-hidden flex flex-col"
        style={{
          left: isMax ? 8 : win.x,
          top: isMax ? 8 : win.y,
          width: isMax ? "calc(100vw - 16px)" : win.w,
          height: isMax ? "calc(100vh - 96px)" : win.h,
          zIndex: win.z,
        }}
      >
        <div
          onPointerDown={(e) => !isMax && controls.start(e)}
          onDoubleClick={onMax}
          className="h-10 flex items-center justify-between px-3 border-b border-[var(--neon)]/10 cursor-grab active:cursor-grabbing select-none bg-black/30"
        >
          <div className="flex items-center gap-2 text-xs text-emerald-100/80 font-mono">
            <span className="neon-text">{win.icon}</span>
            {win.title}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onMin}
              className="size-3.5 rounded-full bg-yellow-400/80 hover:bg-yellow-300 grid place-items-center group"
            >
              <Minus className="size-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={onMax}
              className="size-3.5 rounded-full bg-emerald-400/80 hover:bg-emerald-300 grid place-items-center group"
            >
              <Square className="size-2 text-emerald-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={onClose}
              className="size-3.5 rounded-full bg-red-400/80 hover:bg-red-300 grid place-items-center group"
            >
              <X className="size-2 text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </motion.div>
    </>
  );
}
