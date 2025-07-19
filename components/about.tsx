"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { motion } from 'framer-motion'

export function About() {
  return (
    <motion.section
      id="about"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <section id="about" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <Image src="/images/me.jpg?height=320&width=320" alt="Profile" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-semibold mb-4">Who Am I</h3>
              <p className="text-muted-foreground text-lg mb-6">
                I’m an electrical engineer turned AI developer with a passion for solving real-world problems using data, machine learning, and intelligent systems. Whether I’m designing predictive models, building GenAI chatbots, or experimenting with emerging tech, I thrive on creating tools that are not just functional but impactful.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
               My interests span from deep learning and time-series forecasting to natural language processing and trustworthy AI. I enjoy merging technical depth with practical application, blending a researcher’s mindset with an engineer’s drive to build.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                I’m a lifelong learner, driven by curiosity, critical thinking, and a desire to shape technology that matters — whether that’s deploying scalable ML pipelines, contributing to open-source, or exploring how LLMs can support sustainability, transparency, and digital trust.

              </p>

              <Button
                onClick={() => {
                  window.open('https://drive.google.com/uc?export=download&id=1xxwb9vy1vTtx9auZYjoyTwlU9Aaqm1Ve', '_blank');
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                View my Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  )
}
