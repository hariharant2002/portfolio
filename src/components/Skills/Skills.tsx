import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    icon: "{ }",
    items: [
      { name: "Java", level: 92 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 88 },
      { name: "JavaScript / TS", level: 78 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙",
    items: [
      { name: "Spring Boot", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "REST APIs", level: 92 },
      { name: "Microservices", level: 80 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁",
    items: [
      { name: "Azure (ADF, Databricks, ACR)", level: 88 },
      { name: "Docker / CI/CD", level: 85 },
      { name: "MSAL / Azure AD", level: 78 },
      { name: "Kubernetes (familiar)", level: 55 },
    ],
  },
  {
    category: "Data & AI",
    icon: "⚡",
    items: [
      { name: "PySpark / Databricks", level: 82 },
      { name: "Azure OpenAI", level: 85 },
      { name: "LangChain", level: 78 },
      { name: "Delta Lake / ADLS Gen2", level: 80 },
    ],
  },
  {
    category: "Databases",
    icon: "◈",
    items: [
      { name: "PostgreSQL / Azure SQL", level: 88 },
      { name: "MongoDB (NoSQL)", level: 72 },
      { name: "Redis", level: 75 },
      { name: "Hive Metastore / Unity Catalog", level: 78 },
    ],
  },
  {
    category: "Frontend",
    icon: "◻",
    items: [
      { name: "React.js", level: 80 },
      { name: "TypeScript", level: 72 },
      { name: "HTML / CSS / Tailwind", level: 78 },
    ],
  },
];

const certs = [
  { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services" },
  { name: "Modern App Development — Java Spring Boot", issuer: "Industry Certification" },
];

export default function Skills() {
  return (
    <section id="skills" className="relative bg-[#060B18] py-32 overflow-hidden">

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-900/6 blur-[80px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mono text-xs text-indigo-400 tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-5xl font-black tracking-tight">Skills</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="mono text-lg text-indigo-400">{group.icon}</span>
                <h3 className="text-sm font-semibold text-white">{group.category}</h3>
              </div>

              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-slate-600 mono">{item.level}%</span>
                    </div>
                    <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {certs.map((c) => (
              <div key={c.name} className="flex items-center gap-4 rounded-xl border border-slate-800/60 bg-slate-900/30 px-5 py-4">
                <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-800/40 flex items-center justify-center text-indigo-400 text-xs mono font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
