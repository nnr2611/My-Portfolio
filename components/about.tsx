"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function About() {
  return (
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
              I’m an electrical engineer turned software developer with a strong foundation in IT and a hands-on mindset. Whether I’m writing code, tuning circuits, or fine-tuning a go-kart, I thrive on building things that work, indeed work well.
            </p>
            <p className="text-muted-foreground text-lg mb-6">
              My interests range from embedded systems and web development to AI-powered tools and misinformation detection platforms. I enjoy bridging the gap between hardware and software, combining analytical thinking with a maker’s curiosity.
            </p>
            <p className="text-muted-foreground text-lg mb-6">
              I’m passionate about lifelong learning, problem-solving, and contributing to meaningful projects - whether that’s developing a serverless image tagging system, fixing a stubborn solder joint, or exploring how tech can build digital trust.
            </p>

            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/uc?export=download&id=1s1PRzWGitXj-ATprW9A8LRZLrQeI7REK';
                link.download = 'Resume.pdf'; // Optional: set a default name for the downloaded file
                link.click(); // Simulate click to trigger download
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
