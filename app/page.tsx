import Hero from "@/components/hero/Hero";
import SiteNav from "@/components/SiteNav";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import { profile } from "@/data/content";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Publications />
        <Contact />
      </main>
      <footer className="border-t border-border/60 py-8 text-center font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
        © {profile.name}. All rights reserved.
      </footer>
    </>
  );
}
