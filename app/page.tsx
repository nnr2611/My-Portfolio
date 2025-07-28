import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Publications } from "@/components/sections/Publications" 
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Whoami } from "@/components/whoami"
import { SplashCursor } from "@/components/animations/SplashCursor"

export default function Home() {
  return (
    <div className="relative">
      {/* <SplashCursor /> */}
      {/* Background animation */}
      {/* <div className="absolute inset-0 -z-1">
      </div> */}
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Publications /> {/* ✅ NEW */}
          <Whoami />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
