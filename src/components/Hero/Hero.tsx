import { motion } from "framer-motion";
import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { ArrowRight, MapPin, User } from "lucide-react";

// ── Auto-play terminal lines (your original) ───────────────────────────────
const TERMINAL_LINES = [
  { cmd: "docker build -t supplier-scorecard .", out: "✓ Built in 4.2s — image pushed to ACR" },
  { cmd: "fastapi run --host 0.0.0.0 --port 8000", out: "✓ SLA Intelligence API running" },
  { cmd: "az webapp deploy --name mars-scorecard", out: "✓ Deployed to Azure App Service" },
  { cmd: "git push origin main", out: "✓ CI/CD pipeline triggered" },
];

// ── Interactive terminal commands ──────────────────────────────────────────
const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami       → About me",
    "  skills       → Tech stack",
    "  experience   → Work history",
    "  projects     → What I've built",
    "  contact      → Get in touch",
    "  education    → Academic background",
    "  clear        → Clear terminal",
  ],
  whoami: [
    "Hariharan Thiyagarajan — Software Engineer",
    "2 yrs · Bengaluru, India",
    "Sole engineer on 2 globally deployed enterprise platforms",
    "2,000+ managers · 10,000+ suppliers · Mars Inc. (Fortune 500)",
  ],
  skills: [
    "Languages  →  Java · Python · SQL · JavaScript",
    "Backend    →  Spring Boot · FastAPI · REST APIs · Microservices",
    "Cloud      →  Azure (ADF · Databricks · ACR · DevOps) · Docker",
    "Data & AI  →  PySpark · Azure OpenAI · LangChain · Falcon 7B",
    "Frontend   →  React.js · TypeScript · Tailwind",
    "Databases  →  PostgreSQL · MongoDB · Redis · Azure SQL",
  ],
  experience: [
    "MuSigma Business Solutions  |  Jul 2024 – Present",
    "  Client: Mars Pet Nutrition (Fortune 500)",
    "  → Supplier Scorecard: 2K+ users, 10K+ suppliers",
    "  → SLA Platform: 1,500+ docs, 60% faster review",
    "  → Stack: Java · Spring Boot · FastAPI · Azure · PySpark",
    "",
    "Reliance Industries  |  May – Jul 2023  (Intern)",
    "  → NL2SQL chatbot · Falcon 7B · 95% accuracy · Azure",
  ],
  projects: [
    "1. Supplier Scorecard        → Production · Mars Inc.",
    "2. SLA Document Intelligence → Production · Mars Europe",
    "3. Distributed Rate Limiter  → Open Source · GitHub",
    "4. URL Shortener + Analytics → Open Source · GitHub",
    "5. NL2SQL Platform           → Production · Reliance",
    "6. Supply Chain ETL          → Production · Mars Global",
  ],
  contact: [
    "Email    →  t.hariharan2002@gmail.com",
    "LinkedIn →  linkedin.com/in/hariharan-thiyagarajan",
    "GitHub   →  github.com/hariharant2002",
    "Location →  Bengaluru, Karnataka, India",
    "",
    "Open to SDE1 / SDE2 · Pan-India · Remote",
  ],
  education: [
    "Vellore Institute of Technology  |  2020 – 2024",
    "B.Tech Computer Science & Engineering (IoT)",
    "",
    "Certifications:",
    "  → AWS Academy Cloud Foundations",
    "  → Modern Application Development — Java Spring Boot",
  ],
};

// ── Counter ────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const step = (to / 1800) * 16;
    const timer = setInterval(() => {
      start = Math.min(start + step, to);
      setCount(Math.floor(start));
      if (start >= to) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Name typewriter ────────────────────────────────────────────────────────
const FIRST = "Hariharan";
const LAST  = "Thiyagarajan";

function NameTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"first" | "gap" | "last" | "done">("first");

  useEffect(() => {
    if (phase === "first") {
      if (displayed.length < FIRST.length) {
        const t = setTimeout(() => setDisplayed(FIRST.slice(0, displayed.length + 1)), 85);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("gap"), 200);
        return () => clearTimeout(t);
      }
    }
    if (phase === "gap") {
      const t = setTimeout(() => { setDisplayed(FIRST + " "); setPhase("last"); }, 120);
      return () => clearTimeout(t);
    }
    if (phase === "last") {
      const full = FIRST + " " + LAST;
      if (displayed.length < full.length) {
        const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 78);
        return () => clearTimeout(t);
      } else {
        setPhase("done");
      }
    }
  }, [phase, displayed]);

  const firstName = displayed.slice(0, Math.min(displayed.length, FIRST.length));
  const rest      = displayed.slice(FIRST.length).trim();
  const showCur   = phase !== "done";

  return (
    <h1 className="text-6xl font-black leading-[1.07] tracking-tight mb-6" style={{ minHeight: 148 }}>
      <span className="text-white">{firstName}</span>
      {rest && (
        <>
          <br />
          <span className="text-indigo-400 glow-text">{rest}</span>
        </>
      )}
      {showCur && (
        <span
          className="inline-block w-0.5 bg-indigo-400 ml-1 align-middle"
          style={{ height: 52, animation: "blink 1s infinite" }}
        />
      )}
    </h1>
  );
}

// ── Interactive terminal ───────────────────────────────────────────────────
type HistoryEntry = { type: "input" | "output" | "error"; text: string };

function InteractiveTerminal() {
  const [input, setInput]         = useState("");
  const [history, setHistory]     = useState<HistoryEntry[]>([
    { type: "output", text: "Welcome! Type 'help' to explore my profile." },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next: HistoryEntry[] = [...history, { type: "input", text: cmd }];
    if (cmd === "clear") {
      setHistory([{ type: "output", text: "Cleared. Type 'help' for commands." }]);
      setCmdHistory(h => [cmd, ...h]);
      setHistIdx(-1);
      setInput("");
      return;
    }
    const result = COMMANDS[cmd];
    if (result) result.forEach(l => next.push({ type: "output", text: l }));
    else next.push({ type: "error", text: `'${cmd}' not found. Type 'help'.` });
    setHistory(next);
    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")      { run(input); return; }
    if (e.key === "ArrowUp")    { e.preventDefault(); const i = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(i); setInput(cmdHistory[i] ?? ""); }
    if (e.key === "ArrowDown")  { e.preventDefault(); const i = Math.max(histIdx - 1, -1); setHistIdx(i); setInput(i === -1 ? "" : cmdHistory[i]); }
    if (e.key === "Tab")        { e.preventDefault(); const m = Object.keys(COMMANDS).find(k => k.startsWith(input.toLowerCase())); if (m) setInput(m); }
  };

  return (
    <div
      className="rounded-2xl border border-slate-800/80 bg-[#0D1117] shadow-2xl overflow-hidden glow-indigo min-h-[500px]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/80 bg-[#0D1117]">
        <div className="h-3 w-3 rounded-full bg-red-500/90" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/90" />
        <div className="h-3 w-3 rounded-full bg-green-500/90" />
        <span className="mono ml-3 text-xs text-slate-500">hariharan ~ interactive</span>
        <span className="ml-auto text-[10px] text-slate-700 mono hidden sm:block">tab · ↑↓ history</span>
      </div>

      {/* Output */}
      <div className="p-5 mono text-sm h-[420px] overflow-y-auto space-y-0.5">
        {history.map((h, i) => (
          <div key={i}>
            {h.type === "input"  && <p><span className="text-indigo-400">❯</span> <span className="text-slate-200">{h.text}</span></p>}
            {h.type === "output" && <p className={`text-slate-400 text-xs leading-5 ${h.text === "" ? "h-2" : ""}`}>{h.text}</p>}
            {h.type === "error"  && <p className="text-red-400 text-xs">{h.text}</p>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-slate-800/80">
        <span className="text-indigo-400 mono text-sm flex-shrink-0">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command..."
          className="flex-1 bg-transparent text-slate-200 mono text-sm outline-none placeholder-slate-700 caret-indigo-400"
        />
      </div>
    </div>
  );
}

// ── Auto-play terminal (your original CSS, unchanged) ──────────────────────
function AutoTerminal() {
  const [termLine, setTermLine] = useState(0);
  const [termChar, setTermChar] = useState(0);
  const [showOut, setShowOut]   = useState(false);
  const [phase, setPhase]       = useState<"typing" | "showing" | "pausing">("typing");

  useEffect(() => {
    const line = TERMINAL_LINES[termLine % TERMINAL_LINES.length];
    if (phase === "typing") {
      if (termChar < line.cmd.length) {
        const t = setTimeout(() => setTermChar(c => c + 1), 38);
        return () => clearTimeout(t);
      } else {
        setPhase("showing");
        const t = setTimeout(() => { setShowOut(true); setPhase("pausing"); }, 300);
        return () => clearTimeout(t);
      }
    }
    if (phase === "pausing") {
      const t = setTimeout(() => {
        setShowOut(false);
        setTermChar(0);
        setTermLine(l => (l + 1) % TERMINAL_LINES.length);
        setPhase("typing");
      }, 2400);
      return () => clearTimeout(t);
    }
  }, [phase, termChar, termLine]);

  const current = TERMINAL_LINES[termLine % TERMINAL_LINES.length];

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#0D1117] shadow-2xl overflow-hidden glow-indigo">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/80 bg-[#0D1117]">
        <div className="h-3 w-3 rounded-full bg-red-500/90" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/90" />
        <div className="h-3 w-3 rounded-full bg-green-500/90" />
        <span className="mono ml-3 text-xs text-slate-500">hariharan ~ production-deploy</span>
      </div>

      <div className="p-7 mono text-sm leading-7 min-h-[200px]">
        {TERMINAL_LINES.slice(0, termLine % TERMINAL_LINES.length).slice(-2).map((l, i) => (
          <div key={i} className="opacity-30">
            <p><span className="text-indigo-400">❯</span> <span className="text-slate-400">{l.cmd}</span></p>
            <p className="text-slate-600 text-xs">{l.out}</p>
          </div>
        ))}
        <p className="mt-1">
          <span className="text-indigo-400">❯</span>{" "}
          <span className="text-slate-200">{current.cmd.slice(0, termChar)}</span>
          <span className="cursor" />
        </p>
        {showOut && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 text-xs mt-0.5"
          >
            {current.out}
          </motion.p>
        )}
      </div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
export default function Hero() {
  // ↓ Replace with your actual photo filename placed in /public/
  const PHOTO = "/hariharan.jpg";
  const [photoErr, setPhotoErr] = useState(false);

  return (
    <section id="home" className="relative min-h-screen grid-bg flex items-center pt-24 pb-16 overflow-hidden">

      {/* Radial glows — your original */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-700/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-violet-700/8 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Location badge — your original */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-900/60 bg-indigo-950/40 px-3 py-1.5 text-xs text-indigo-300">
              <MapPin size={11} />
              Bengaluru, India · Available for SDE roles
            </div>

            <p className="mono mb-3 text-sm text-indigo-400 tracking-widest uppercase">
              Software Engineer
            </p>

            {/* Letter-by-letter name */}
            <NameTypewriter />

            <p className="text-slate-400 text-lg leading-8 max-w-lg">
              Backend-focused engineer who shipped two globally deployed enterprise platforms
              used by <span className="text-white font-medium">2,000+ managers</span> across{" "}
              <span className="text-white font-medium">10,000+ suppliers</span> at Mars Inc.
            </p>

            <div className="mt-8 flex gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95">
                View Work <ArrowRight size={15} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-700 hover:text-indigo-300 active:scale-95">
                Contact Me
              </a>
            </div>

            {/* Impact numbers — your original */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: 2,     suffix: " yrs", label: "Experience" },
                { value: 10000, suffix: "+",    label: "Suppliers Impacted" },
                { value: 2000,  suffix: "+",    label: "Enterprise Users" },
              ].map(s => (
                <div key={s.label} className="border-l border-indigo-900 pl-4">
                  <div className="text-3xl font-bold text-indigo-300">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-5 mt-20"
          >
            {/* Interactive terminal */}
            <InteractiveTerminal />

            {/* Tech badges — your original */}
            <div className="flex flex-wrap gap-2">
              {["Java", "Spring Boot", "FastAPI", "React", "Azure", "PySpark", "Azure OpenAI", "Docker"].map(t => (
                <span key={t} className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── PHOTO + INTRO STRIP — below both columns ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="mt-20 flex flex-col sm:flex-row items-center gap-10 rounded-2xl border border-slate-800/60 bg-slate-900/40 px-10 py-10"
        >
          {/* Big circular photo */}
          <div className="relative flex-shrink-0">
            <div
              className="rounded-full overflow-hidden border-4 border-indigo-600/40"
              style={{
                width: 180,
                height: 180,
                boxShadow: "0 0 50px rgba(99,102,241,0.25)",
              }}
            >
              {!photoErr ? (
                <img
                  src={PHOTO}
                  alt="Hariharan Thiyagarajan"
                  className="w-full h-full object-cover"
                  onError={() => setPhotoErr(true)}
                />
              ) : (
                // Placeholder until you add your photo
                <div className="w-full h-full bg-indigo-950 flex items-center justify-center">
                  <User size={64} className="text-indigo-700" />
                </div>
              )}
            </div>
            {/* Online dot */}
            <span
              className="absolute bottom-3 right-3 h-5 w-5 rounded-full bg-emerald-500 border-4 border-[#0D1117]"
              title="Available for roles"
            />
          </div>

          {/* Intro text */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white mb-3">
              Hi, I'm Hariharan 👋
            </h2>
            <p className="text-slate-400 leading-8 text-base max-w-2xl">
              I'm a backend-focused software engineer with{" "}
              <span className="text-indigo-300 font-medium">2 years of production experience</span> building
              enterprise-grade platforms at Fortune 500 scale. I was the{" "}
              <span className="text-white font-medium">sole engineer</span> on two globally deployed
              applications at Mars Inc. — one for supplier evaluation used by{" "}
              <span className="text-indigo-300 font-medium">2,000+ managers</span>, and another for
              AI-powered contract intelligence processing{" "}
              <span className="text-indigo-300 font-medium">1,500+ documents</span> globally.
              My stack is Java Spring Boot, FastAPI, React, Azure, and PySpark.
              I'm actively looking for <span className="text-white font-medium">SDE1/SDE2 roles</span> at
              product companies across India.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
              {[
                { icon: "🎓", text: "VIT Vellore · B.Tech CSE" },
                { icon: "📍", text: "Bengaluru, India" },
                { icon: "💼", text: "Open to work" },
                { icon: "🤖", text: "AI / Backend / Cloud" },
              ].map(b => (
                <span key={b.text} className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-400">
                  {b.icon} {b.text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
