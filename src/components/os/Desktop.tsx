import { AnimatePresence, motion } from "framer-motion";
import {
  Terminal as TerminalIcon,
  User,
  FolderGit2,
  BarChart3,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  FileText,
  Wifi,
  BatteryFull,
  Volume2,
  Search,
  Power,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Window, type WindowState } from "./Window";
import { Terminal } from "./Terminal";
import {
  AboutApp,
  ContactApp,
  ExperienceApp,
  HeroApp,
  ProjectsApp,
  SkillsApp,
} from "./Apps";
import { PROFILE } from "./data";

type AppId =
  | "hero"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact"
  | "terminal"
  | "github"
  | "linkedin"
  | "resume";

interface AppDef {
  id: AppId;
  title: string;
  icon: ReactNode;
  defaultSize: { w: number; h: number };
  render?: (open: (id: AppId) => void) => ReactNode;
  external?: string;
}

const APPS: Record<AppId, AppDef> = {
  hero: {
    id: "hero",
    title: "home — rishav.app",
    icon: <User className="size-3.5" />,
    defaultSize: { w: 760, h: 460 },
    render: (open) => <HeroApp onOpen={(i) => open(i as AppId)} />,
  },
  about: { id: "about", title: "about.md", icon: <User className="size-3.5" />, defaultSize: { w: 560, h: 600 }, render: () => <AboutApp /> },
  projects: { id: "projects", title: "projects/", icon: <FolderGit2 className="size-3.5" />, defaultSize: { w: 820, h: 600 }, render: () => <ProjectsApp /> },
  skills: { id: "skills", title: "skills.tsx", icon: <BarChart3 className="size-3.5" />, defaultSize: { w: 700, h: 560 }, render: () => <SkillsApp /> },
  experience: { id: "experience", title: "experience.log", icon: <Briefcase className="size-3.5" />, defaultSize: { w: 640, h: 600 }, render: () => <ExperienceApp /> },
  contact: { id: "contact", title: "contact@rishav", icon: <Mail className="size-3.5" />, defaultSize: { w: 540, h: 560 }, render: () => <ContactApp /> },
  terminal: { id: "terminal", title: `${PROFILE.handle}@${PROFILE.host}: ~`, icon: <TerminalIcon className="size-3.5" />, defaultSize: { w: 760, h: 460 }, render: () => <Terminal /> },
  github: { id: "github", title: "github.com", icon: <Github className="size-3.5" />, defaultSize: { w: 600, h: 400 }, external: PROFILE.social.github },
  linkedin: { id: "linkedin", title: "linkedin", icon: <Linkedin className="size-3.5" />, defaultSize: { w: 600, h: 400 }, external: PROFILE.social.linkedin },
  resume: { id: "resume", title: "resume.pdf", icon: <FileText className="size-3.5" />, defaultSize: { w: 600, h: 400 }, external: PROFILE.social.resume },
};

const DESKTOP_ICONS: AppId[] = ["about", "projects", "skills", "experience", "contact", "terminal", "github", "linkedin", "resume"];
const DOCK_ICONS: AppId[] = ["hero", "terminal", "projects", "skills", "about", "experience", "contact"];

export function Desktop() {
  const [wins, setWins] = useState<WindowState[]>([]);
  const [zTop, setZTop] = useState(10);
  const [time, setTime] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // open hero by default
    openApp("hero");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const openApp = (id: AppId) => {
    const def = APPS[id];
    if (def.external) {
      window.open(def.external, "_blank");
      return;
    }
    setWins((prev) => {
      const existing = prev.find((w) => w.id === id);
      const newZ = zTop + 1;
      setZTop(newZ);
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: newZ } : w));
      }
      const cnt = prev.length;
      return [
        ...prev,
        {
          id,
          title: def.title,
          icon: def.icon,
          x: 80 + cnt * 30,
          y: 60 + cnt * 28,
          w: def.defaultSize.w,
          h: def.defaultSize.h,
          z: newZ,
          minimized: false,
          maximized: false,
        },
      ];
    });
  };

  const focus = (id: string) => {
    const nz = zTop + 1;
    setZTop(nz);
    setWins((p) => p.map((w) => (w.id === id ? { ...w, z: nz } : w)));
  };

  const update = (id: string, patch: Partial<WindowState>) =>
    setWins((p) => p.map((w) => (w.id === id ? { ...w, ...patch } : w)));

  const close = (id: string) => setWins((p) => p.filter((w) => w.id !== id));

  const runningIds = useMemo(() => new Set(wins.map((w) => w.id)), [wins]);

  return (
    <div className="fixed inset-0 select-none">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 h-8 glass border-b border-[var(--neon)]/10 flex items-center justify-between px-4 text-xs font-mono z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMenu((s) => !s)}
            className="flex items-center gap-2 neon-text hover:text-white"
          >
            <span className="size-2 rounded-full bg-[var(--neon)] neon-glow" />
            RISHAV/OS
          </button>
          <span className="text-emerald-200/60">File</span>
          <span className="text-emerald-200/60">Edit</span>
          <span className="text-emerald-200/60">View</span>
          <span className="text-emerald-200/60">Help</span>
        </div>
        <div className="flex items-center gap-3 text-emerald-200/80">
          <Search className="size-3.5" />
          <Volume2 className="size-3.5" />
          <Wifi className="size-3.5" />
          <BatteryFull className="size-3.5" />
          <span>
            {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}{" "}
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-9 left-3 w-56 glass rounded-xl p-2 z-50 text-sm"
          >
            <div className="px-3 py-2 text-xs uppercase tracking-widest text-emerald-200/60">Quick launch</div>
            {DOCK_ICONS.map((id) => (
              <button
                key={id}
                onClick={() => { openApp(id); setShowMenu(false); }}
                className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[var(--neon)]/10 text-emerald-100 flex items-center gap-2"
              >
                <span className="neon-text">{APPS[id].icon}</span>
                {APPS[id].title}
              </button>
            ))}
            <div className="border-t border-[var(--neon)]/10 my-1" />
            <button className="w-full text-left px-3 py-1.5 rounded-md hover:bg-red-500/10 text-red-300 flex items-center gap-2">
              <Power className="size-3.5" /> Shutdown
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop icons */}
      <div className="absolute top-12 left-4 grid grid-cols-1 gap-3">
        {DESKTOP_ICONS.map((id) => (
          <button
            key={id}
            onDoubleClick={() => openApp(id)}
            onClick={() => openApp(id)}
            className="w-20 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[var(--neon)]/10 focus:bg-[var(--neon)]/15 transition group"
          >
            <div className="size-11 rounded-xl glass grid place-items-center group-hover:neon-glow transition">
              <span className="neon-text [&_svg]:size-5">{APPS[id].icon}</span>
            </div>
            <span className="text-[11px] text-emerald-100/85 text-center leading-tight" style={{ textShadow: "0 1px 4px black" }}>
              {APPS[id].title.split(/[.\s]/)[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Floating widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-12 right-4 w-64 glass rounded-2xl p-4 z-10 hidden md:block"
      >
        <div className="text-[10px] uppercase tracking-widest text-emerald-200/60">System</div>
        <div className="mt-2 space-y-2 text-xs">
          {[
            ["CPU", 32],
            ["RAM", 58],
            ["Net", 74],
          ].map(([k, v]) => (
            <div key={k as string}>
              <div className="flex justify-between text-emerald-100/80">
                <span>{k}</span><span className="neon-text font-mono">{v}%</span>
              </div>
              <div className="h-1 bg-emerald-950 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--neon)] neon-glow" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[var(--neon)]/10 text-[11px] text-emerald-200/70 italic">
          "Code is poetry; the terminal is the page."
        </div>
      </motion.div>

      {/* Windows */}
      <AnimatePresence>
        {wins.map((w) => {
          const def = APPS[w.id as AppId];
          return (
            <Window
              key={w.id}
              win={w}
              onClose={() => close(w.id)}
              onMin={() => update(w.id, { minimized: true })}
              onMax={() => update(w.id, { maximized: !w.maximized })}
              onFocus={() => focus(w.id)}
            >
              {def.render?.(openApp)}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Dock */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center z-40 pointer-events-none">
        <div className="glass rounded-2xl px-3 py-2 flex items-end gap-1 pointer-events-auto">
          {DOCK_ICONS.map((id) => {
            const running = runningIds.has(id);
            return (
              <button
                key={id}
                onClick={() => openApp(id)}
                className="relative group p-2 rounded-xl hover:bg-[var(--neon)]/10 transition"
                title={APPS[id].title}
              >
                <motion.div
                  whileHover={{ scale: 1.35, y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="size-9 rounded-xl bg-black/40 border border-[var(--neon)]/20 grid place-items-center neon-text"
                >
                  {APPS[id].icon}
                </motion.div>
                {running && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[var(--neon)] neon-glow" />
                )}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-1 rounded bg-black/80 text-emerald-100 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                  {APPS[id].title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimized tray */}
      {wins.some((w) => w.minimized) && (
        <div className="absolute bottom-20 inset-x-0 flex justify-center z-30">
          <div className="glass rounded-xl px-3 py-1.5 flex gap-2">
            {wins.filter((w) => w.minimized).map((w) => (
              <button
                key={w.id}
                onClick={() => update(w.id, { minimized: false })}
                className="text-xs text-emerald-100 px-2 py-1 rounded hover:bg-[var(--neon)]/10"
              >
                {w.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
