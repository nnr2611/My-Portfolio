"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <motion.section
      id="hero"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary max-w-2xl mb-8 leading-relaxed">Hello there</span> <br />
            {/* <span className="text-primary max-w-2xl mb-8 leading-relaxed"></span> <br /> */}
            <span className="text-primary max-w-2xl mb-8 leading-relaxed">I'm Anirudh Chidambaram</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
            A Full Stack Developer and hands-on Engineer with a passion for building robust software systems and smart hardware solutions
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
    </motion.section>
  );
}