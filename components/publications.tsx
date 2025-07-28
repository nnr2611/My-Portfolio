"use client"
import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

export function Publications() {
  const papers = [
    {
      title: "Forecasting of Sea Surface Temperature using Machine Learning and its Applications",
      journal: "Journal of Earth System Science (Springer)",
      date: "Jan 2025",
      doi: "https://doi.org/10.1007/s12040-024-02483-0",
      summary:
        "Developed LSTM and ConvLSTM models for accurate 7-day sea surface temperature forecasting (0.2°C MAE). Ensemble learning improved reliability by 25%, supporting applications like cyclone prediction and sustainable fishing zones.",
      tags: ["Time Series", "LSTM", "Environmental Forecasting", "Deep Learning"],
    },
    {
      title: "Mathematical Models for Predicting COVID-19 Pandemic: A Review",
      journal: "Journal of Physics: Conference Series (IOP)",
      date: "Mar 2021",
      doi: "https://iopscience.iop.org/article/10.1088/1742-6596/1797/1/012009",
      summary:
        "Reviewed and compared 5 epidemic models (Gaussian, SIRD, SEIRD, θ-SEIHRD) with predictive accuracy up to 95%. Provided insights for real-world policymaking, cited 57+ times in global public health modeling research.",
      tags: ["Epidemiology", "Public Health AI", "Modeling", "COVID-19"],
    },
  ]

  return (
    <motion.section
      id="publications"
      className="py-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ amount: 0.2 }}
    >
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 flex justify-center items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          Publications
        </h2>
        <div className="space-y-10">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-xl shadow-md p-6 border border-primary/10"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">{paper.title}</h3>
              <p className="text-muted-foreground text-sm italic mb-1">
                {paper.journal} • {paper.date}
              </p>
              <p className="text-muted-foreground mb-3">{paper.summary}</p>
              <div className="flex flex-wrap gap-2 text-sm text-primary font-medium">
                {paper.tags.map((tag, i) => (
                  <span key={i} className="bg-primary/10 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <a
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm font-semibold text-blue-600 hover:underline"
              >
                Read Full Paper →
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
