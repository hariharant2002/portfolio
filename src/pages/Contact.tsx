import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Send, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#060B18] py-32 overflow-hidden">

      <div className="pointer-events-none absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-900/8 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mono text-xs text-indigo-400 tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-5xl font-black tracking-tight">Contact</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 text-lg leading-8 mb-10">
              I'm actively looking for <span className="text-white font-medium">SDE1/SDE2 roles</span> at product-based companies.
              If you're hiring or know someone who is — let's connect.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <Mail size={18} className="text-indigo-400" />,
                  label: "Email",
                  value: "t.hariharan2002@gmail.com",
                  href: "mailto:t.hariharan2002@gmail.com",
                },
                {
                  icon: <MapPin size={18} className="text-indigo-400" />,
                  label: "Location",
                  value: "Bengaluru, Karnataka, India",
                  href: null,
                },
                {
                  icon: <Linkedin size={18} className="text-indigo-400" />,
                  label: "LinkedIn",
                  value: "hariharan-thiyagarajan",
                  href: "https://linkedin.com/in/hariharan-thiyagarajan",
                },
                {
                  icon: <Github size={18} className="text-indigo-400" />,
                  label: "GitHub",
                  value: "hariharant2002",
                  href: "https://github.com/hariharant2002",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl border border-indigo-900/50 bg-indigo-950/30 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-sm text-slate-300 hover:text-indigo-300 transition flex items-center gap-1">
                        {item.value}
                        {item.href.startsWith("http") && <ExternalLink size={10} />}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-indigo-900/40 bg-indigo-950/20 p-6">
              <p className="text-sm text-indigo-300 font-medium mb-2">Currently open to:</p>
              <div className="flex flex-wrap gap-2">
                {["SDE1", "SDE2", "Backend Engineer", "Full-Stack Engineer", "Pan-India", "Remote"].map((t) => (
                  <span key={t} className="rounded-lg border border-indigo-900/60 bg-indigo-950/40 px-3 py-1 text-xs text-indigo-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Send a message</h3>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-700 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-700 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Company / Context</label>
                <input
                  type="text"
                  placeholder="Company name or how you found me"
                  className="w-full rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-700 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about the role or opportunity..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-700 focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => alert("Form connected to FastAPI backend — coming soon!")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
              >
                <Send size={15} />
                Send Message
              </button>

              <p className="text-center text-xs text-slate-600">
                Or email directly at{" "}
                <a href="mailto:t.hariharan2002@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition">
                  t.hariharan2002@gmail.com
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 border-t border-slate-800/40 pt-10 text-center">
        <p className="mono text-xs text-slate-600">
          Hariharan Thiyagarajan · Built with React + TypeScript + Tailwind · FastAPI backend
        </p>
        <p className="text-xs text-slate-700 mt-1">© 2026</p>
      </div>
    </section>
  );
}
