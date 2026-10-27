"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export function Projects() {
  const SHOW_LEGACY_PROJECTS = true

  type Project = {
    title: string
    description: string
    image: string
    tags: string[]
    githubUrl?: string
    liveUrl?: string
  }

  const projects = [
    {
      title: "Agentic Insurance Benefit Predictor",
      description:
        "Agentic RAG pipeline (LangGraph + LangSmith) that reads unstructured insurance documents and estimates property-management benefits. FAISS/Pinecone retrieval feeds an ensemble of fine-tuned GPT-4o, QLoRA-tuned Llama 3.1 and Random Forest, improving benefit estimation accuracy by 15%.",
      image: "/images/insurance-ai.png",
      tags: ["LangGraph", "RAG", "LangSmith", "FAISS", "Pinecone", "QLoRA", "Llama 3.1", "GPT-4o"],
      githubUrl: "https://github.com/nnr2611/Agentic_Insurance",
    },
    {
      title: "MealPrep Deals",
      description:
        "Turns your recipe books into a weekly batch-cook plan priced against live Canadian flyer deals. Claude extracts recipes and drafts the plan, while cost, calories and the shopping list are computed in code, never by the LLM. FastAPI backend, deployable on Vercel.",
      image: "/images/mealprep.svg",
      tags: ["Python", "FastAPI", "Claude API", "Vercel", "Pytest"],
      githubUrl: "https://github.com/nnr2611/mealprep-deals-main",
    },
    {
      title: "Efficient 3D Human Pose Estimation (HoT-style)",
      description:
        "Compact transformer that lifts 2D keypoints to 3D poses on Human3.6M. Prunes temporal tokens mid-network and recovers the full sequence with cross-attention, cutting compute versus the full-token baseline. Re-implementation of the Hourglass Tokenizer idea.",
      image: "/images/hot-pose.svg",
      tags: ["PyTorch", "Transformers", "Computer Vision", "Human3.6M", "MediaPipe"],
      githubUrl:
        "https://github.com/nnr2611/Efficient-3D-Human-Pose-Estimation-Using-Hourglass-Tokenizer-HoT-",
    },
    {
      title: "Residential Energy Forecasting (LSTM + XGBoost)",
      description:
        "Hybrid LSTM-XGBoost model with clustering and transfer learning to forecast household power load from smart meter data. Improved forecast accuracy by over 75% and reduced sMAPE, MAE and RMSE.",
      image: "/images/rlf.png",
      tags: ["Python", "TensorFlow", "XGBoost", "Transfer Learning", "Smart Meter"],
      githubUrl: "https://github.com/nnr2611/Residential-Energy-Forecasting-LSTM-XGBoost-hybrid-model",
    },
    {
      title: "Beijing Air Pollution Prediction",
      description:
        "Forecasts PM2.5 and other particulate levels 24 hours to 7 days ahead from the Beijing multi-site air quality dataset. Combines LSTM temporal modelling with XGBoost regression, compared against baselines, with an interactive Streamlit dashboard for forecasts, error analysis and feature importance.",
      image: "/images/air-pollution.svg",
      tags: ["LSTM", "XGBoost", "Time Series", "Streamlit", "Scikit-learn"],
      githubUrl: "https://github.com/nnr2611/Air-Pollution-prediction",
    },
    SHOW_LEGACY_PROJECTS && {
      title: "Switched Reluctance Motor Controller",
      description:
        "Compact hysteresis motor controller that removes torque ripple and pushes SRM efficiency beyond 85%. Won Best Final Year Project.",
      image: "/images/srm.jpg",
      tags: ["Embedded Systems", "Motor Control", "MATLAB", "Hardware Design"],
      githubUrl: "https://github.com/nnr2611/SRM_Hysteresis_Controller",
    },
    SHOW_LEGACY_PROJECTS && {
      title: "IoT Kitchen Fire Prevention",
      description:
        "Infrared (GridEYE) sensor system that detects human absence near an active gas stove and alerts users to prevent fire hazards.",
      image: "/images/iot-fire.jpg",
      tags: ["IoT", "Infrared Sensors", "Embedded C", "Python"],
      githubUrl: "https://github.com/nnr2611/GridEye_py_and_C",
    },
    SHOW_LEGACY_PROJECTS && {
      title: "Formula Bharat Electric Car",
      description:
        "Designed and fabricated an electric vehicle for FSEV 2020 using a BLDC motor and CAN bus controller, with a focus on safety and performance.",
      image: "/images/formula-ev.jpg",
      tags: ["Electric Vehicles", "CAN Bus", "Embedded Systems", "Battery Systems"],
    },
    SHOW_LEGACY_PROJECTS && {
      title: "Arduino Fitness Tracker",
      description:
        "Step counter and calorie tracker on an Arduino UNO with an accelerometer, with custom movement logic and real-time metrics on an OLED display.",
      image: "/images/fitness.png",
      tags: ["Arduino", "C++", "Accelerometer", "OLED Display"],
      githubUrl: "https://github.com/nnr2611/fitness-tracker",
    },
  ].filter(Boolean) as Project[]

  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <motion.section
      id="projects"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <div className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Selected work in applied AI, machine learning and embedded systems. Each project links to its source on GitHub.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden border border-muted h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    {project.liveUrl && (
                      <Button asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View All Projects"}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
