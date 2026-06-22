import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Experience from "../components/Experience/Experience";
import Projects from "../components/Projects/Projects";
import Skills from "../components/Skills/Skills";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
