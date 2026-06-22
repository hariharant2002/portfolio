import { motion } from "framer-motion";
import { Calendar, MapPin, TrendingUp } from "lucide-react";

const experiences = [
  {
    company: "MuSigma Business Solutions",
    role: "Software Developer",
    client: "Client: Mars Pet Nutrition (Fortune 500) — Supply Chain Analytics",
    period: "Jul 2024 – Present",
    location: "Bengaluru, India",
    color: "indigo",
    highlights: [
      { metric: "40%", label: "Reduction in manual supplier evaluation" },
      { metric: "60%", label: "Faster contract review via AI" },
      { metric: "10K+", label: "Suppliers on global platform" },
      { metric: "30%", label: "Faster release cycles via CI/CD" },
    ],
    bullets: [
      "Sole engineer on Supplier Scorecard — globally deployed Java Spring Boot + React platform serving 2,000+ managers",
      "Built SLA Document Intelligence Platform with Azure OpenAI + Document Intelligence processing 1,500+ contracts",
      "Designed 5 low-latency REST APIs serving real-time supply chain KPIs to Power BI dashboards worldwide",
      "Engineered distributed PySpark ETL pipelines on Azure Databricks across Bronze/Silver/Gold lakehouse layers",
      "Containerized services with Docker, authored Azure DevOps CI/CD YAML pipelines reducing release time by 30%",
    ],
    stack: ["Java", "Spring Boot", "FastAPI", "React.js", "Azure SQL", "PySpark", "Databricks", "Azure OpenAI", "Docker", "Azure DevOps"],
  },
  {
    company: "Reliance Industries Limited",
    role: "Software Developer Intern",
    client: "Exploration & Production Division",
    period: "May 2023 – Jul 2023",
    location: "Mumbai, India",
    color: "violet",
    highlights: [
      { metric: "95%", label: "NL2SQL accuracy achieved" },
      { metric: "Falcon 7B", label: "LLM deployed on Azure" },
    ],
    bullets: [
      "Built NL-to-SQL conversational platform for E&P business intelligence using Falcon 7B via LangChain",
      "Created synthetic metadata-driven training datasets achieving 95% query accuracy on oil & gas domain",
      "Developed Python Flask backend for request orchestration and inference pipeline optimization on Azure",
    ],
    stack: ["Python", "Flask", "LangChain", "Falcon 7B", "Azure", "NL2SQL"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative bg-[#060B18] py-32 overflow-hidden">

      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-900/5 blur-[80px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mono text-xs text-indigo-400 tracking-widest uppercase mb-3">Career</p>
          <h2 className="text-5xl font-black tracking-tight">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-6 top-4 bottom-4 w-px timeline-line hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 hidden md:block">
                  <div className={`h-5 w-5 rounded-full border-2 ${idx === 0 ? 'border-indigo-400 bg-indigo-600' : 'border-violet-600 bg-violet-900'}`} />
                </div>

                <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 overflow-hidden hover:border-indigo-900/60 transition-colors duration-300">

                  {/* Header */}
                  <div className="px-8 pt-8 pb-6 border-b border-slate-800/40">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                        <p className={`text-sm font-medium mt-1 ${idx === 0 ? 'text-indigo-400' : 'text-violet-400'}`}>
                          {exp.role} · {exp.client}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar size={11} />{exp.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={11} />{exp.location}</span>
                      </div>
                    </div>

                    {/* Metric highlights */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {exp.highlights.map((h) => (
                        <div key={h.label} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-center">
                          <div className={`text-xl font-bold ${idx === 0 ? 'text-indigo-300' : 'text-violet-300'}`}>{h.metric}</div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-tight">{h.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="px-8 py-6">
                    <ul className="space-y-2.5">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                          <TrendingUp size={14} className={`mt-0.5 flex-shrink-0 ${idx === 0 ? 'text-indigo-500' : 'text-violet-500'}`} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Stack */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.stack.map((t) => (
                        <span key={t} className="rounded-lg border border-slate-800 bg-slate-800/50 px-2.5 py-1 text-xs text-slate-400 mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
