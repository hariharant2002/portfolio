import { motion } from "framer-motion";
import { ExternalLink, Github, Zap } from "lucide-react";

const projects = [
  {
    title: "Supplier Scorecard Platform",
    tag: "Production · Mars Inc.",
    description:
      "Globally deployed vendor evaluation platform serving 2,000+ sourcing managers across 10,000+ suppliers. Built solo, end-to-end — from Java Spring Boot APIs to React UI and Azure CI/CD pipeline.",
    impact: ["2,000+ enterprise users", "10,000+ global suppliers", "40% less manual work"],
    tech: ["Java", "Spring Boot", "React.js", "Azure SQL", "MSAL", "Docker", "Azure DevOps"],
    color: "indigo",
    featured: true,
  },
  {
    title: "SLA Document Intelligence",
    tag: "Production · Mars Europe",
    description:
      "Full-stack AI document processing platform. Uploaded supplier contracts run through Azure Document Intelligence + Azure OpenAI, extract structured KPIs, and populate 14 normalized database tables.",
    impact: ["1,500+ contracts processed", "60% faster review", "Deployed globally"],
    tech: ["FastAPI", "React.js", "Azure OpenAI", "Azure Doc Intelligence", "SQL", "ADF"],
    color: "violet",
    featured: true,
  },
  {
    title: "Distributed Rate Limiter",
    tag: "Open Source · GitHub",
    description:
      "Production-grade sliding-window rate limiter with Redis-backed distributed counters. Exposes a fault-tolerant REST API with per-user and per-IP throttling. Benchmarked across three algorithms.",
    impact: ["Sliding window algorithm", "Redis distributed counters", "JUnit + Mockito"],
    tech: ["Java", "Spring Boot", "Redis", "Docker", "JUnit"],
    color: "emerald",
    featured: false,
  },
  {
    title: "URL Shortener with Analytics",
    tag: "Open Source · GitHub",
    description:
      "Horizontally scalable URL shortening service. Base62 encoding, Redis TTL caching, click analytics, and PostgreSQL persistence. Designed with cache-aside pattern and DB sharding documented.",
    impact: ["Stateless architecture", "Cache-aside pattern", "Horizontal scaling"],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
    color: "amber",
    featured: false,
  },
  {
    title: "NL2SQL Intelligence Platform",
    tag: "Production · Reliance Industries",
    description:
      "Conversational BI tool for Reliance E&P teams. Migrated from LLaMA Alpaca to Falcon 7B via LangChain with synthetic metadata-driven fine-tuning. Deployed on Microsoft Azure achieving 95% query accuracy.",
    impact: ["95% NL2SQL accuracy", "Falcon 7B on Azure", "Oil & gas domain"],
    tech: ["Python", "Flask", "LangChain", "Falcon 7B", "Azure"],
    color: "cyan",
    featured: false,
  },
  {
    title: "Supply Chain ETL Pipelines",
    tag: "Production · Mars Global",
    description:
      "Distributed PySpark data pipelines built on a factory-pattern ETL framework (SIMPEL). Processes enterprise supply chain datasets into Bronze/Silver/Gold lakehouse layers powering global BI dashboards.",
    impact: ["Daily-refresh pipelines", "6 reporting assets", "Gold-layer analytics"],
    tech: ["PySpark", "Azure Databricks", "ADF", "Delta Lake", "Hive Metastore", "ADLS Gen2"],
    color: "rose",
    featured: false,
  },
];

const colorMap: Record<string, string> = {
  indigo: "border-indigo-900/50 hover:border-indigo-700/60",
  violet: "border-violet-900/50 hover:border-violet-700/60",
  emerald: "border-emerald-900/50 hover:border-emerald-700/60",
  amber:   "border-amber-900/50 hover:border-amber-700/60",
  cyan:    "border-cyan-900/50 hover:border-cyan-700/60",
  rose:    "border-rose-900/50 hover:border-rose-700/60",
};

const tagColorMap: Record<string, string> = {
  indigo: "text-indigo-400 bg-indigo-950/60 border-indigo-900/60",
  violet: "text-violet-400 bg-violet-950/60 border-violet-900/60",
  emerald:"text-emerald-400 bg-emerald-950/60 border-emerald-900/60",
  amber:  "text-amber-400 bg-amber-950/60 border-amber-900/60",
  cyan:   "text-cyan-400 bg-cyan-950/60 border-cyan-900/60",
  rose:   "text-rose-400 bg-rose-950/60 border-rose-900/60",
};

const dotColor: Record<string, string> = {
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  emerald:"bg-emerald-500",
  amber:  "bg-amber-500",
  cyan:   "bg-cyan-500",
  rose:   "bg-rose-500",
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative bg-[#060B18] py-32 overflow-hidden">

      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-900/6 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mono text-xs text-indigo-400 tracking-widest uppercase mb-3">Work</p>
          <h2 className="text-5xl font-black tracking-tight">Projects</h2>
        </motion.div>

        {/* Featured */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border ${colorMap[p.color]} bg-slate-900/40 p-8 transition-colors duration-300 flex flex-col`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`rounded-full border px-2.5 py-1 text-xs mono ${tagColorMap[p.color]}`}>
                  {p.tag}
                </span>
                <Zap size={16} className="text-slate-600" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">{p.description}</p>

              <div className="space-y-1.5 mb-6">
                {p.impact.map((imp) => (
                  <div key={imp} className="flex items-center gap-2 text-xs text-slate-400">
                    <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${dotColor[p.color]}`} />
                    {imp}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-slate-800 bg-slate-800/60 px-2 py-0.5 text-xs text-slate-400 mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl border ${colorMap[p.color]} bg-slate-900/30 p-6 transition-colors duration-300 flex flex-col`}
            >
              <span className={`self-start rounded-full border px-2 py-0.5 text-[10px] mono mb-4 ${tagColorMap[p.color]}`}>
                {p.tag}
              </span>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="rounded border border-slate-800 bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-500 mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/hariharant2002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-6 py-3 text-sm text-slate-400 transition hover:border-indigo-700/60 hover:text-indigo-300"
          >
            <Github size={16} />
            View all on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
