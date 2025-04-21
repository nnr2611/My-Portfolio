import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-primary">Hello, I'm</span> <br />
          <span className="text-primary">Anirudh Chidambaram</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
          Full Stack Developer specializing in building exceptional digital experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild>
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <Link href="#about" aria-label="Scroll down">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </section>
  );
}