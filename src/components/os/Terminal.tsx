import { useEffect, useRef, useState } from "react";
import { PROFILE, PROJECTS, SKILLS, EXPERIENCE } from "./data";

type Line = { type: "in" | "out"; text: string };

const HELP = `Available commands:
  help          show this menu
  about         about me
  skills        list my skills
  projects      list projects
  experience    work history
  contact       how to reach me
  socials       github / linkedin / resume
  whoami        current user
  date          show current date/time
  neofetch      system info
  matrix        enter the matrix
  sudo hire-me  ;)
  clear         clear the screen`;

function fmtSkills() {
  const groups: Record<string, string[]> = {};
  SKILLS.forEach((s) => {
    (groups[s.cat] ??= []).push(`${s.name.padEnd(22)} ${"█".repeat(Math.round(s.level / 10))} ${s.level}%`);
  });
  return Object.entries(groups)
    .map(([k, v]) => `\n[ ${k} ]\n${v.join("\n")}`)
    .join("\n");
}

function fmtProjects() {
  return PROJECTS.map(
    (p) =>
      `◆ ${p.name}  (${p.year})\n  ${p.desc}\n  tech: ${p.tech.join(", ")}`
  ).join("\n\n");
}

function fmtExp() {
  return EXPERIENCE.map(
    (e) =>
      `▸ ${e.role} @ ${e.company}  [${e.period}]\n  ${e.points.join("\n  ")}`
  ).join("\n\n");
}

function neofetch() {
  return `        ▄▄▄▄▄▄▄        ${PROFILE.handle}@${PROFILE.host}
       █████████       ────────────────────
      ███▀   ▀███      OS:       Rishav/OS 3.0 cyber
     ███       ███     Host:     Portfolio Workstation
     ███       ███     Kernel:   6.6.0-neon
     ███       ███     Uptime:   ${Math.floor(performance.now() / 1000)}s
      ███▄   ▄███      Shell:    zsh 5.9
       █████████       Editor:   Neovim / VS Code
        ▀▀▀▀▀▀▀        Theme:    Matrix Emerald
                       Role:     ${PROFILE.role}`;
}

function exec(raw: string): string | null {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return "";
  if (cmd === "clear" || cmd === "cls") return null;
  if (cmd === "help") return HELP;
  if (cmd === "about") return `${PROFILE.name} — ${PROFILE.role}\n📍 ${PROFILE.location}\n\n${PROFILE.bio}`;
  if (cmd === "skills") return fmtSkills();
  if (cmd === "projects") return fmtProjects();
  if (cmd === "experience") return fmtExp();
  if (cmd === "contact") return `email: ${PROFILE.email}\nstatus: ${PROFILE.availability}`;
  if (cmd === "socials") return `github:   ${PROFILE.social.github}\nlinkedin: ${PROFILE.social.linkedin}\nresume:   ${PROFILE.social.resume}`;
  if (cmd === "whoami") return PROFILE.handle;
  if (cmd === "date") return new Date().toString();
  if (cmd === "neofetch") return neofetch();
  if (cmd === "matrix") return "wake up, Neo… (try a real terminal 🟢)";
  if (cmd === "sudo hire-me") return "✓ Request received. Email dispatched to " + PROFILE.email;
  if (cmd === "ls") return "about.txt  skills.txt  projects.txt  experience.txt  contact.txt";
  if (cmd === "pwd") return "/home/" + PROFILE.handle;
  if (cmd.startsWith("cat ")) {
    const f = cmd.slice(4).replace(".txt", "");
    const map: Record<string, string> = {
      about: PROFILE.bio,
      skills: fmtSkills(),
      projects: fmtProjects(),
      experience: fmtExp(),
      contact: PROFILE.email,
    };
    return map[f] ?? `cat: ${f}: No such file`;
  }
  return `command not found: ${raw}. type 'help'.`;
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "Welcome to Rishav/OS terminal. Type 'help' to begin." },
    { type: "out", text: neofetch() },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const out = exec(raw);
    if (out === null) {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { type: "in", text: raw }, { type: "out", text: out }]);
    setHistory((h) => [raw, ...h]);
    setHIdx(-1);
  };

  return (
    <div
      className="h-full bg-black/70 font-mono text-[13px] p-4 text-emerald-200"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, i) =>
        l.type === "in" ? (
          <div key={i} className="flex gap-2">
            <span className="text-[var(--neon)]">{PROFILE.handle}@{PROFILE.host}</span>
            <span className="text-emerald-400">:~$</span>
            <span>{l.text}</span>
          </div>
        ) : (
          <pre key={i} className="whitespace-pre-wrap text-emerald-200/90 mb-2 font-mono leading-relaxed">
            {l.text}
          </pre>
        )
      )}
      <div className="flex gap-2 items-center">
        <span className="text-[var(--neon)]">{PROFILE.handle}@{PROFILE.host}</span>
        <span className="text-emerald-400">:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              run(input);
              setInput("");
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              const n = Math.min(hIdx + 1, history.length - 1);
              setHIdx(n);
              setInput(history[n] ?? "");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const n = Math.max(hIdx - 1, -1);
              setHIdx(n);
              setInput(n === -1 ? "" : history[n]);
            }
          }}
          className="flex-1 bg-transparent outline-none caret-[var(--neon)] text-emerald-100"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
