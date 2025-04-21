"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Server, Smartphone, GitBranch, Figma } from "lucide-react"
import { motion } from 'framer-motion'

export function Skills() {
  const skills = [
    {
      category: "Frontend Development",
      icon: <Layout className="h-8 w-8 text-primary" />,
      items: ["HTML/CSS", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Jetpack Compose"],
    },
    {
      category: "Backend Development",
      icon: <Server className="h-8 w-8 text-primary" />,
      items: ["Python", "Django", "Flask", "Node.js", "Express", "REST APIs", "AWS Lambda"],
    },
    {
      category: "Mobile & Android Development",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      items: ["Kotlin", "Android Studio", "Jetpack Compose", "React Native", "Firebase"],
    },
    {
      category: "Database & Cloud",
      icon: <Database className="h-8 w-8 text-primary" />,
      items: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Firebase", "Redis", "Prisma"],
    },
    {
      category: "DevOps & Tools",
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      items: ["Git", "GitHub", "Docker", "CI/CD", "Kubernetes", "AWS", "Azure", "Vercel", "Oracle Cloud"],
    },
    {
      category: "Other Technical Skills",
      icon: <Code className="h-8 w-8 text-primary" />,
      items: ["C", "C++", "Java", "C#", "Assembly", "Agile", "Scrum", "Software Testing", "Networking"],
    },
  ]

  return (
    <motion.section
      id="section"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <section id="skills" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            I've worked with a variety of technologies and frameworks in my career. Here's an overview of my technical
            skills and areas of expertise.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="overflow-hidden border border-muted">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {skill.icon}
                    <h3 className="text-xl font-semibold">{skill.category}</h3>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </motion.section>
  )
}
