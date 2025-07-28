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
                I’m an AI Engineer with a background in Electrical and Computer Engineering, focused on building intelligent systems that tackle real-world sustainability and data-centric challenges. From time-series forecasting and air quality prediction to building LLM-based chatbots, I’m driven to apply machine learning where it matters most.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                My technical toolkit spans deep learning, GenAI, NLP, and MLOps—including tools like LangChain, HuggingFace, Azure OpenAI, and hybrid model architectures. Whether working on smart energy dashboards, environmental risk prediction, or ESG data automation, I love merging technical rigor with human impact.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                I thrive at the intersection of AI, transparency, and trust—designing solutions that are robust, explainable, and forward-thinking. I'm always exploring how to make AI not only smarter, but more socially responsible and practically deployable.
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
