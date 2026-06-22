import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FileText } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 w-full max-w-5xl px-6">
      <nav
        className={`flex items-center justify-between rounded-2xl px-6 py-3.5 transition-all duration-500 ${
          scrolled
            ? "border border-indigo-900/50 bg-[#060B18]/90 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl"
            : "border border-white/5 bg-white/[0.03] backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <span className="text-xl font-bold tracking-tight text-white">
          HT<span className="text-indigo-400">.</span>
        </span>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 transition-colors hover:text-indigo-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/hariharant2002" target="_blank" rel="noopener noreferrer">
            <FaGithub size={18} className="text-slate-400 transition hover:text-white" />
          </a>
          <a href="https://linkedin.com/in/hariharan-thiyagarajan" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={18} className="text-slate-400 transition hover:text-indigo-400" />
          </a>
          <a
            href="/Hariharan_T_Resume_Amazon.pdf"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-indigo-700/50 bg-indigo-600/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-600/20"
          >
            <FileText size={13} />
            Resume
          </a>
        </div>
      </nav>
    </div>
  );
}
