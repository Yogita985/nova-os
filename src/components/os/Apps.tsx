import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, FileText, Mail, MapPin, ExternalLink, Code2 } from "lucide-react";
import avatar from "@/assets/avatar.png";
import { PROFILE, PROJECTS, SKILLS, EXPERIENCE } from "./data";

export function HeroApp({ onOpen }: { onOpen: (id: string) => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % PROFILE.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="p-8 h-full flex flex-col md:flex-row gap-8 items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative shrink-0"
      >
        <div className="absolute inset-0 rounded-full bg-[var(--neon)]/30 blur-2xl" />
        <img
          src={avatar}
          alt={PROFILE.name}
          className="relative size-44 rounded-full object-cover border-2 border-[var(--neon)]/50 neon-glow"
        />
        <span className="absolute bottom-3 right-3 size-4 rounded-full bg-emerald-400 ring-2 ring-black animate-pulse" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono neon-text tracking-widest">// HELLO_WORLD</div>
        <h1 className="text-3xl md:text-5xl font-semibold text-white mt-2 tracking-tight">
          I'm {PROFILE.name.split(" ")[0]}.
        </h1>
        <div className="mt-2 text-lg text-emerald-200/80 h-7 overflow-hidden">
          <motion.div
            key={roleIdx}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            {PROFILE.roles[roleIdx]}
          </motion.div>
        </div>
        <p className="mt-4 text-emerald-100/70 leading-relaxed max-w-prose text-sm">
          {PROFILE.bio}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => onOpen("contact")}
            className="px-4 py-2 rounded-lg bg-[var(--neon)] text-black text-sm font-medium hover:scale-[1.02] transition neon-glow"
          >
            Hire me
          </button>
          <button
            onClick={() => onOpen("projects")}
            className="px-4 py-2 rounded-lg border border-[var(--neon)]/40 text-emerald-100 text-sm hover:bg-[var(--neon)]/10"
          >
            View work
          </button>
          <a
            href={PROFILE.social.resume}
            className="px-4 py-2 rounded-lg border border-emerald-400/20 text-emerald-200/80 text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <FileText className="size-4" /> Resume
          </a>
        </div>
        <div className="mt-6 flex gap-3 text-emerald-200/70">
          <a href={PROFILE.social.github} className="hover:neon-text" aria-label="GitHub"><Github className="size-5" /></a>
          <a href={PROFILE.social.linkedin} className="hover:neon-text" aria-label="LinkedIn"><Linkedin className="size-5" /></a>
          <a href={`mailto:${PROFILE.email}`} className="hover:neon-text" aria-label="Email"><Mail className="size-5" /></a>
        </div>
      </div>
    </div>
  );
}

export function AboutApp() {
  return (
    <div className="p-8 space-y-6 text-emerald-100/85">
      <div className="flex items-center gap-4">
        <img src={avatar} alt="" className="size-20 rounded-full object-cover border border-[var(--neon)]/40" />
        <div>
          <div className="text-xl font-semibold text-white">{PROFILE.name}</div>
          <div className="text-sm text-emerald-200/70">{PROFILE.role}</div>
          <div className="text-xs mt-1 flex items-center gap-1 text-emerald-300/60"><MapPin className="size-3" /> {PROFILE.location}</div>
        </div>
      </div>
      <p className="leading-relaxed">{PROFILE.bio}</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["6+", "Years"],
          ["40+", "Projects"],
          ["12k", "GitHub ★"],
        ].map(([n, l]) => (
          <div key={l} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-semibold neon-text">{n}</div>
            <div className="text-xs uppercase tracking-widest text-emerald-200/60 mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-sm uppercase tracking-widest text-emerald-200/60 mb-3">Timeline</h3>
        <ol className="border-l border-[var(--neon)]/30 pl-5 space-y-4">
          {EXPERIENCE.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[27px] top-1 size-3 rounded-full bg-[var(--neon)] neon-glow" />
              <div className="text-white text-sm font-medium">{e.role} · {e.company}</div>
              <div className="text-xs text-emerald-200/60">{e.period}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function SkillsApp() {
  const cats = Array.from(new Set(SKILLS.map((s) => s.cat)));
  const [tab, setTab] = useState(cats[0]);
  const filtered = SKILLS.filter((s) => s.cat === tab);
  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-widest transition ${
              tab === c
                ? "bg-[var(--neon)] text-black neon-glow"
                : "glass text-emerald-200/70 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white">{s.name}</span>
              <span className="neon-text font-mono">{s.level}%</span>
            </div>
            <div className="h-1.5 bg-emerald-950/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-400 to-[var(--neon)] neon-glow"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsApp() {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-4">
      {PROJECTS.map((p, i) => (
        <motion.a
          key={p.id}
          href={p.link}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          whileHover={{ y: -4 }}
          className="group glass rounded-2xl p-5 block relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 size-32 rounded-full bg-[var(--neon)]/20 blur-3xl group-hover:bg-[var(--neon)]/40 transition" />
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-mono text-emerald-300/70">/{p.id} · {p.year}</div>
              <h3 className="text-xl font-semibold text-white mt-1">{p.name}</h3>
            </div>
            <ExternalLink className="size-4 text-emerald-200/60 group-hover:neon-text" />
          </div>
          <p className="text-sm text-emerald-100/70 mt-3 leading-relaxed">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-[var(--neon)]/30 text-emerald-200/80">
                {t}
              </span>
            ))}
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export function ExperienceApp() {
  return (
    <div className="p-8">
      <div className="border-l border-[var(--neon)]/30 pl-6 space-y-8">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[31px] top-1 size-4 rounded-full bg-[var(--neon)] neon-glow ring-4 ring-black/60" />
            <div className="text-xs font-mono neon-text">{e.period}</div>
            <div className="text-xl text-white font-semibold mt-1">{e.role}</div>
            <div className="text-sm text-emerald-200/70">{e.company}</div>
            <ul className="mt-3 space-y-1.5 text-sm text-emerald-100/75">
              {e.points.map((p) => (
                <li key={p} className="flex gap-2"><Code2 className="size-3.5 mt-1 shrink-0 neon-text" /> {p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ContactApp() {
  const [sent, setSent] = useState(false);
  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl text-white font-semibold">Let's build something.</h2>
      <p className="text-sm text-emerald-200/70 mt-1">{PROFILE.availability} — <span className="neon-text">{PROFILE.email}</span></p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mt-6 space-y-4"
      >
        {["Name", "Email"].map((f) => (
          <div key={f} className="relative">
            <input
              required
              type={f === "Email" ? "email" : "text"}
              placeholder={f}
              className="w-full bg-black/30 border border-[var(--neon)]/20 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-[var(--neon)]/60 focus:neon-glow transition"
            />
          </div>
        ))}
        <textarea
          required
          rows={5}
          placeholder="Message…"
          className="w-full bg-black/30 border border-[var(--neon)]/20 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-[var(--neon)]/60 focus:neon-glow transition resize-none"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--neon)] text-black font-medium neon-glow hover:scale-[1.01] transition"
        >
          {sent ? "✓ Message sent" : "Send message"}
        </button>
      </form>
    </div>
  );
}
