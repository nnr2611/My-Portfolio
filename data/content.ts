// All site copy lives here. Source: old portfolio (../My-Portfolio-old), text only.
// The live site (nithish-ragav.vercel.app) was unreachable when this was extracted,
// so nothing here has been checked against it. See TODO markers and the review notes.

export type Link = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  /** File name under /public/images */
  image: string;
  tags: string[];
  /** Short headline number shown as a badge. Only set when stated in the old copy. */
  metric?: string;
  githubUrl?: string;
  liveUrl?: string;
  /** Older/embedded/hardware work, shown after the AI/ML projects */
  legacy?: boolean;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Publication = {
  title: string;
  venue: string;
  date: string;
  /** One-line result */
  result: string;
  tags: string[];
  href: string;
};

export const profile = {
  name: "Nithish Ragav Narayana Shankar",
  role: "AI/ML Engineer",
  location: "Edmonton, AB, CA",
  tagline:
    "AI/ML Engineer building agentic LLM systems, time-series forecasting models and computer vision pipelines. I turn real-world data into deployable, explainable AI across cloud and edge platforms.",
  photo: "/images/me.jpg",
  photoAlt: "Portrait of Nithish Ragav Narayana Shankar",
  // TODO: old site links a Google Drive download. Confirm, or add a PDF to /public.
  resumeUrl:
    "https://drive.google.com/uc?export=download&id=15sxhdInqMkfQRtVL6LHnOEL4MI1pdJBC",
} as const;

export const about = {
  heading: "Who Am I",
  paragraphs: [
    "I’m an AI Engineer with a background in Electrical and Computer Engineering, focused on intelligent systems for real-world sustainability and data-centric problems. My recent work spans agentic RAG for insurance, energy and air-quality forecasting, and 3D human pose estimation, always with an eye on what it takes to deploy.",
    "My toolkit spans deep learning, GenAI, NLP and MLOps, including LangGraph, LangChain, HuggingFace, Azure OpenAI, PyTorch, TensorFlow and hybrid model architectures such as LSTM + XGBoost. Whether it’s smart energy forecasting, environmental risk prediction or ESG data automation, I like pairing technical rigor with human impact.",
    "I thrive at the intersection of AI, transparency, and trust, designing solutions that are robust, explainable, and forward-thinking. I’m always exploring how to make AI not only smarter, but more socially responsible and practically deployable.",
  ],
  /** Inline links from the old About paragraph 1, kept for reuse */
  inlineLinks: [
    { label: "agentic RAG for insurance", href: "https://github.com/nnr2611/Agentic_Insurance" },
    { label: "energy", href: "https://github.com/nnr2611/Residential-Energy-Forecasting-LSTM-XGBoost-hybrid-model" },
    { label: "air-quality forecasting", href: "https://github.com/nnr2611/Air-Pollution-prediction" },
    { label: "3D human pose estimation", href: "https://github.com/nnr2611/Efficient-3D-Human-Pose-Estimation-Using-Hourglass-Tokenizer-HoT-" },
  ] satisfies Link[],
};

export const projectsIntro =
  "Selected work in applied AI, machine learning and embedded systems. Each project links to its source on GitHub.";

export const projects: Project[] = [
  {
    title: "Agentic Insurance Benefit Predictor",
    description:
      "Agentic RAG pipeline (LangGraph + LangSmith) that reads unstructured insurance documents and estimates property-management benefits. FAISS/Pinecone retrieval feeds an ensemble of fine-tuned GPT-4o, QLoRA-tuned Llama 3.1 and Random Forest, improving benefit estimation accuracy by 15%.",
    image: "insurance-ai.png",
    tags: ["LangGraph", "RAG", "LangSmith", "FAISS", "Pinecone", "QLoRA", "Llama 3.1", "GPT-4o"],
    metric: "+15% accuracy",
    githubUrl: "https://github.com/nnr2611/Agentic_Insurance",
  },
  {
    title: "ChatLab: Local-First Chat Export Analytics",
    description:
      "Python toolkit that turns message exports into one self-contained, multi-page HTML dashboard: reply and initiation behaviour, conversation lifetime (Kaplan-Meier), churn model, plus optional GPU topics, emotions and intent. Pluggable connectors map any source to a standard DuckDB schema; all analysis runs on your machine, with a share-safe mode that hashes names and drops text.",
    image: "chat-analytics.svg",
    tags: ["Python", "DuckDB", "Plotly", "Survival Analysis", "Sentence Transformers", "Pytest"],
    githubUrl: "https://github.com/nnr2611/chat-export-analytics",
  },
  {
    title: "MealPrep Deals",
    description:
      "Turns your recipe books into a weekly batch-cook plan priced against live Canadian flyer deals. Claude extracts recipes and drafts the plan, while cost, calories and the shopping list are computed in code, never by the LLM. FastAPI backend, deployable on Vercel.",
    image: "mealprep.svg",
    tags: ["Python", "FastAPI", "Claude API", "Vercel", "Pytest"],
    githubUrl: "https://github.com/nnr2611/mealprep-deals-main",
  },
  {
    title: "Efficient 3D Human Pose Estimation (HoT-style)",
    description:
      "Compact transformer that lifts 2D keypoints to 3D poses on Human3.6M. Prunes temporal tokens mid-network and recovers the full sequence with cross-attention, cutting compute versus the full-token baseline. Re-implementation of the Hourglass Tokenizer idea.",
    image: "hot-pose.svg",
    tags: ["PyTorch", "Transformers", "Computer Vision", "Human3.6M", "MediaPipe"],
    githubUrl:
      "https://github.com/nnr2611/Efficient-3D-Human-Pose-Estimation-Using-Hourglass-Tokenizer-HoT-",
  },
  {
    title: "Residential Energy Forecasting (LSTM + XGBoost)",
    description:
      "Hybrid LSTM-XGBoost model with clustering and transfer learning to forecast household power load from smart meter data. Improved forecast accuracy by over 75% and reduced sMAPE, MAE and RMSE.",
    image: "rlf.png",
    tags: ["Python", "TensorFlow", "XGBoost", "Transfer Learning", "Smart Meter"],
    metric: "+75% accuracy",
    githubUrl: "https://github.com/nnr2611/Residential-Energy-Forecasting-LSTM-XGBoost-hybrid-model",
  },
  {
    title: "Beijing Air Pollution Prediction",
    description:
      "Forecasts PM2.5 and other particulate levels 24 hours to 7 days ahead from the Beijing multi-site air quality dataset. Combines LSTM temporal modelling with XGBoost regression, compared against baselines, with an interactive Streamlit dashboard for forecasts, error analysis and feature importance.",
    image: "air-pollution.svg",
    tags: ["LSTM", "XGBoost", "Time Series", "Streamlit", "Scikit-learn"],
    githubUrl: "https://github.com/nnr2611/Air-Pollution-prediction",
  },
  {
    title: "Switched Reluctance Motor Controller",
    description:
      "Compact hysteresis motor controller that removes torque ripple and pushes SRM efficiency beyond 85%. Won Best Final Year Project.",
    image: "srm.jpg",
    tags: ["Embedded Systems", "Motor Control", "MATLAB", "Hardware Design"],
    metric: ">85% efficiency",
    githubUrl: "https://github.com/nnr2611/SRM_Hysteresis_Controller",
    legacy: true,
  },
  {
    title: "IoT Kitchen Fire Prevention",
    description:
      "Infrared (GridEYE) sensor system that detects human absence near an active gas stove and alerts users to prevent fire hazards.",
    image: "iot-fire.jpg",
    tags: ["IoT", "Infrared Sensors", "Embedded C", "Python"],
    githubUrl: "https://github.com/nnr2611/GridEye_py_and_C",
    legacy: true,
  },
  {
    title: "Formula Bharat Electric Car",
    description:
      "Designed and fabricated an electric vehicle for FSEV 2020 using a BLDC motor and CAN bus controller, with a focus on safety and performance.",
    image: "formula-ev.jpg",
    tags: ["Electric Vehicles", "CAN Bus", "Embedded Systems", "Battery Systems"],
    legacy: true,
  },
  {
    title: "Arduino Fitness Tracker",
    description:
      "Step counter and calorie tracker on an Arduino UNO with an accelerometer, with custom movement logic and real-time metrics on an OLED display.",
    image: "fitness.png",
    tags: ["Arduino", "C++", "Accelerometer", "OLED Display"],
    githubUrl: "https://github.com/nnr2611/fitness-tracker",
    legacy: true,
  },
];

export const skillsIntro =
  "Technologies and frameworks I’ve worked with, grouped by area.";

export const skills: SkillGroup[] = [
  {
    category: "Programming & Scripting",
    items: ["Python", "SQL", "PySpark", "R", "Shell Script", "C/C++", "MATLAB"],
  },
  {
    category: "ML & Advanced Analytics",
    items: [
      "Predictive Modeling", "Time-Series Forecasting", "Classification", "Clustering",
      "Anomaly Detection", "Statistical Modeling", "Feature Engineering", "Model Evaluation",
      "Survival Analysis", "Experimental Design", "A/B Testing", "NLP",
      "Computer Vision", "Segmentation", "EDA",
    ],
  },
  {
    category: "ML & AI Frameworks",
    items: [
      "Scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "PyTorch",
      "Keras", "OpenCV", "NLTK", "SpaCy", "Transformers (HF)",
    ],
  },
  {
    category: "Generative AI & Agents",
    items: [
      "Anthropic Claude", "Azure OpenAI", "LangChain", "LangGraph", "RAG", "Embeddings",
      "Vector Databases", "Agentic AI", "Prompt Engineering", "LLM Evaluation", "QLoRA Fine-Tuning",
    ],
  },
  {
    category: "Databricks, Azure & Data Platforms",
    items: ["Databricks", "MLflow", "Microsoft Fabric", "Azure ML", "GCP", "AWS (S3, Lambda, SageMaker)"],
  },
  {
    category: "MLOps & LLMOps",
    items: [
      "MLflow", "CI/CD (GitHub Actions)", "Docker", "Terraform", "Airflow",
      "ETL/ELT Pipelines", "Monitoring", "Git", "GitHub", "Vercel",
    ],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "DuckDB"],
  },
  {
    category: "Visualization & BI",
    items: [
      "Power BI", "Tableau", "Plotly", "Excel", "Streamlit",
      "Flask", "JupyterLab", "Google Colab", "VS Code", "PyCharm",
    ],
  },
  {
    category: "Embedded & IoT Systems",
    items: [
      "Embedded C", "RTOS", "ESP8266", "LoRa", "RF Sensors", "GSM Modules",
      "Smart Meter Data", "Task Scheduling", "IoT App Development", "Sensor Integration",
    ],
  },
];

export const publications: Publication[] = [
  {
    title: "Forecasting of Sea Surface Temperature using Machine Learning and its Applications",
    venue: "Journal of Earth System Science (Springer)",
    date: "Jan 2025",
    result:
      "LSTM and ConvLSTM models for 7-day sea surface temperature forecasting at 0.2°C MAE; ensemble learning improved reliability by 25%.",
    tags: ["Time Series", "LSTM", "Environmental Forecasting", "Deep Learning"],
    href: "https://doi.org/10.1007/s12040-024-02483-0",
  },
  {
    title: "Mathematical Models for Predicting COVID-19 Pandemic: A Review",
    venue: "Journal of Physics: Conference Series (IOP)",
    date: "Mar 2021",
    result:
      "Compared 5 epidemic models (Gaussian, SIRD, SEIRD, θ-SEIHRD) with predictive accuracy up to 95%.",
    tags: ["Epidemiology", "Public Health AI", "Modeling", "COVID-19"],
    href: "https://iopscience.iop.org/article/10.1088/1742-6596/1797/1/012009",
  },
];

export const contact = {
  intro:
    "Have a project in mind or want to discuss potential opportunities? Feel free to reach out!",
  email: "nithishragav2611@gmail.com",
  location: "Edmonton, AB, CA",
};

/** Profile buttons. An empty href renders as a greyed-out "coming soon" button. */
export const socials: Link[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nithish-ragav-narayana-shankar-6a1a491a5" },
  { label: "GitHub", href: "https://github.com/nnr2611" },
  { label: "Google Scholar", href: "https://scholar.google.ca/citations?user=a6fIFpMAAAAJ&hl=en" },
  { label: "ORCID", href: "https://orcid.org/0009-0008-4079-3670" },
];

export const nav: Link[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Papers", href: "#publications" },
  { label: "Contact", href: "#contact" },
];
