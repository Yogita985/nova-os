export const PROFILE = {
  name: "Rishav Kumar",
  handle: "rishav",
  host: "portfolio",
  role: "Full-Stack Developer & AI Engineer",
  roles: [
    "Full-Stack Developer",
    "AI Engineer",
    "Cybersecurity Enthusiast",
    "Open-Source Contributor",
  ],
  location: "Bengaluru, India",
  email: "hello@rishav.dev",
  bio: "I build immersive web experiences, AI-powered tools, and secure systems. Currently exploring the intersection of design, code, and intelligence.",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    resume: "#",
  },
  availability: "Available for new projects",
};

export const SKILLS = [
  { name: "TypeScript", level: 95, cat: "Frontend" },
  { name: "React / Next.js", level: 94, cat: "Frontend" },
  { name: "Tailwind / CSS", level: 92, cat: "Frontend" },
  { name: "Three.js / R3F", level: 80, cat: "Frontend" },
  { name: "Node.js", level: 90, cat: "Backend" },
  { name: "Python / FastAPI", level: 88, cat: "Backend" },
  { name: "PostgreSQL", level: 85, cat: "Database" },
  { name: "Redis", level: 78, cat: "Database" },
  { name: "Docker / K8s", level: 76, cat: "DevOps" },
  { name: "AWS / GCP", level: 80, cat: "DevOps" },
  { name: "PyTorch / LLMs", level: 82, cat: "AI/ML" },
  { name: "Pentesting", level: 70, cat: "Security" },
];

export const PROJECTS = [
  {
    id: "neuralforge",
    name: "NeuralForge",
    desc: "Visual node editor for composing LLM pipelines with real-time streaming.",
    tech: ["Next.js", "tRPC", "OpenAI", "WebSockets"],
    year: 2025,
    link: "#",
    repo: "#",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    desc: "Open-source intrusion detection dashboard with eBPF probes & ML triage.",
    tech: ["Go", "React", "ClickHouse", "eBPF"],
    year: 2024,
    link: "#",
    repo: "#",
  },
  {
    id: "lumen",
    name: "Lumen Studio",
    desc: "Collaborative 3D scene editor in the browser, built on React Three Fiber.",
    tech: ["R3F", "Yjs", "WebRTC", "Rust/WASM"],
    year: 2024,
    link: "#",
    repo: "#",
  },
  {
    id: "kosmos",
    name: "Kosmos",
    desc: "Distributed task queue with visual DAG runner and time-travel debugging.",
    tech: ["Rust", "Postgres", "NATS"],
    year: 2023,
    link: "#",
    repo: "#",
  },
];

export const EXPERIENCE = [
  {
    company: "Vercel-style Studio",
    role: "Senior Frontend Engineer",
    period: "2024 — Present",
    points: [
      "Shipped a real-time collaborative canvas used by 40k+ developers.",
      "Led migration to React Server Components, cutting JS payload by 38%.",
    ],
  },
  {
    company: "Quantum Labs",
    role: "Full-Stack Engineer",
    period: "2022 — 2024",
    points: [
      "Built an internal ML platform for model evaluation and dataset curation.",
      "Designed the GraphQL gateway powering 12 microservices.",
    ],
  },
  {
    company: "Freelance",
    role: "Product Engineer",
    period: "2020 — 2022",
    points: ["Delivered 20+ production apps across fintech, edtech and SaaS."],
  },
];
