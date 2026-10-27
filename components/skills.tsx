"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Code,
  TerminalSquare,
  BrainCircuit,
  ChartColumn,
  Workflow,
  Database,
  Cpu,
  Layers,
  Sparkles,
  Cloud,
} from "lucide-react"
import { motion } from "framer-motion"

export function Skills() {
  const skills = [
  {
    category: "Programming & Scripting",
    icon: <TerminalSquare className="h-8 w-8 text-primary" />,
    items: [
      "Python",
      "SQL",
      "PySpark",
      "R",
      "Shell Script",
      "C/C++",
      "MATLAB",
    ],
  },
  {
    category: "ML & Advanced Analytics",
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    items: [
      "Predictive Modeling",
      "Time-Series Forecasting",
      "Classification",
      "Clustering",
      "Anomaly Detection",
      "Statistical Modeling",
      "Feature Engineering",
      "Model Evaluation",
      "Experimental Design",
      "A/B Testing",
      "NLP",
      "Computer Vision",
      "Segmentation",
      "EDA",
    ],
  },
  {
    category: "ML & AI Frameworks",
    icon: <Layers className="h-8 w-8 text-primary" />,
    items: [
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "OpenCV",
      "NLTK",
      "SpaCy",
      "Transformers (HF)",
    ],
  },
  {
    category: "Generative AI & Agents",
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    items: [
      "Anthropic Claude",
      "Azure OpenAI",
      "LangChain",
      "LangGraph",
      "RAG",
      "Embeddings",
      "Vector Databases",
      "Agentic AI",
      "Prompt Engineering",
      "LLM Evaluation",
      "QLoRA Fine-Tuning",
    ],
  },
  {
    category: "Databricks, Azure & Data Platforms",
    icon: <Cloud className="h-8 w-8 text-primary" />,
    items: [
      "Databricks",
      "MLflow",
      "Microsoft Fabric",
      "Azure ML",
      "GCP",
      "AWS (S3, Lambda, SageMaker)",
    ],
  },
  {
    category: "MLOps & LLMOps",
    icon: <Workflow className="h-8 w-8 text-primary" />,
    items: [
      "MLflow",
      "CI/CD (GitHub Actions)",
      "Docker",
      "Terraform",
      "Airflow",
      "ETL/ELT Pipelines",
      "Monitoring",
      "Git",
      "GitHub",
      "Vercel",
    ],
  },
  {
    category: "Databases",
    icon: <Database className="h-8 w-8 text-primary" />,
    items: [
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    category: "Visualization & BI",
    icon: <ChartColumn className="h-8 w-8 text-primary" />,
    items: [
      "Power BI",
      "Tableau",
      "Excel",
      "Streamlit",
      "Flask",
      "JupyterLab",
      "Google Colab",
      "VS Code",
      "PyCharm",
    ],
  },
  {
    category: "Embedded & IoT Systems",
    icon: <Cpu className="h-8 w-8 text-primary" />,
    items: [
      "Embedded C",
      "RTOS",
      "ESP8266",
      "LoRa",
      "RF Sensors",
      "GSM Modules",
      "Smart Meter Data",
      "Task Scheduling",
      "IoT App Development",
      "Sensor Integration",
    ],
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
          <h2 className="text-3xl font-bold text-center mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            I've worked with a variety of technologies and frameworks in my
            career. Here's an overview of my technical skills and areas of
            expertise.
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
