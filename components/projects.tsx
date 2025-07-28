"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react";
import { motion } from "framer-motion"


export function Projects() {

  const [showAll, setShowAll] = useState(false);
  const projects = [
    {
      title: "Smart Energy Forecasting with LSTM + XGBoost",
      description:
        "Built a hybrid LSTM-XGBoost model with clustering and transfer learning to forecast residential power load from smart meter data. Improved forecast accuracy by over 75% and reduced sMAPE, MAE, and RMSE.",
      image: "/images/rlf.png",
      tags: ["Python", "TensorFlow", "XGBoost", "Transfer Learning", "Smart Meter"],
      githubUrl: "https://github.com/nnr2611/Residential-Energy-Forecasting-LSTM-XGBoost-hybrid-model",
    },
    {
      title: "PM2.5 Air Quality Prediction (Multi-Site)",
      description:
        "Forecasted particulate matter (PM2.5/PM10) levels using Random Forest Regression across 12 Beijing monitoring stations. Achieved 22% MAPE reduction and 18% better early-warning accuracy.",
      image: "/images/airquality.png",
      tags: ["Scikit-learn", "Pandas", "Flask", "Random Forest", "Time Series"],
      githubUrl: "https://github.com/nnr2611/Air-Pollution-prediction",
    },
    {/*
      title: "PixTag",
      description:
        "An AWS-powered serverless image tagging and storage system with YOLO-based object detection and API-driven tag management.",
      image: "/images/pixtag.jpg",
      tags: ["AWS Lambda", "DynamoDB", "S3", "Python", "JavaScript", "YOLO"],
      // liveUrl: "#",
      githubUrl: "#",
    */},
    {/*
      title: "MealMate - Android Diet Planner",
      description:
        "A personalized diet planner app with Firebase login, Edamam API integration, and dynamic meal suggestions using Kotlin & Jetpack Compose.",
      image: "/images/mealmate.jpg",
      tags: ["Kotlin", "Jetpack Compose", "Firebase", "Edamam API", "Android"],
      githubUrl: "#",
    */},
    {/*
      title: "PETris - PET Scan Appointment Platform",
      description:
        "A fullstack booking platform for medical imaging services built with ASP.NET MVC and MS SQL, increasing clinic revenue and efficiency.",
      image: "/images/petris.jpg",
      tags: ["C#", "ASP.NET MVC", "MS SQL", "JavaScript", "HTML", "CSS"],
      githubUrl: "#",
    */},
    {
      title: "Motor Controller for Switched Reluctance Motor",
      description:
        "Designed a compact motor controller to eliminate torque ripple and improve SRM efficiency beyond 85%. Won Best Final Year Project.",
      image: "/images/srm.jpg",
      tags: ["Embedded Systems", "Motor Control", "Hardware Design", "DC Systems"],
      githubUrl: "#",
    },
    {
      title: "IoT Kitchen Fire Prevention System",
      description:
        "Developed an infrared sensor-based system to detect human absence near an active gas stove, alerting users to prevent fire hazards.",
      image: "/images/iot-fire.jpg",
      tags: ["IoT", "Infrared Sensors", "Embedded", "Python"],
      githubUrl: "#",
    },
    {
      title: "Formula Bharat Electric Car",
      description:
        "Designed and fabricated an electric vehicle for FSEV 2020 using BLDC motor and CAN bus controller. Focused on safety and performance.",
      image: "/images/formula-ev.jpg",
      tags: ["Electric Vehicles", "CAN Bus", "Embedded Systems", "Battery Systems"],
    },
  ]
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <motion.section
      id="projects"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <section id="projects" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Here are some of my recent projects. Each one presented unique challenges and opportunities for growth.
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
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
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
      </section>
    </motion.section>
  );
}
