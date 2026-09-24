/** Site copy. Facts match the resume. No internal project codenames. */

export const site = {
  name: "Mohammed Warish",
  shortName: "Warish",
  monogram: "W",
  role: "AI Engineer",
  location: "Hyderabad, India",
  email: "khanwarish483@gmail.com",
  phone: "9991463786",
  phoneDisplay: "+91 99914 63786",
  phoneTel: "tel:+919991463786",
  whatsapp:
    "https://wa.me/919991463786?text=Hi%20Warish%2C%20I%20would%20like%20to%20talk%20about%20hiring%20you.",
  intro:
    "I'm Mohammed Warish, an AI Engineer with 2+ years of experience building production systems across Agentic AI, Computer Vision, Voice AI, and Generative AI.",
  support:
    "At Quanteon Solutions I build healthcare voice agents and smart-city operations.",
  about:
    "I take a system from concept to production, and I treat latency and reliability as part of the product.",
  education: "BTech CSE, IIIT Sri City, 2020–2024. Based in Hyderabad.",
  contactHeadline: "Talk through a production voice, vision, or agent system.",
  contactSupport:
    "Email or WhatsApp if you want to talk through a voice, vision, or agent system.",
  linkedin: "https://www.linkedin.com/in/mohd-warish-261a28259",
  github: "https://github.com/mohdwarish483",
  resumePath: "/docs/MOHAMMED-WARISH-AI.pdf",
  seo: {
    title: "Mohammed Warish · AI Engineer",
    description:
      "Production AI across voice, computer vision, and agents. Healthcare voice agents and smart-city operations at Quanteon Solutions, Hyderabad.",
  },
};

export type ExperienceGroup = {
  label: string;
  bullets: string[];
};

export type ExperienceItem = {
  role: string;
  org: string;
  orgUrl: string | null;
  period: string;
  place: string;
  oneLiner: string;
  groups?: ExperienceGroup[];
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "AI Engineer",
    org: "Quanteon Solutions",
    orgUrl: null,
    period: "04-2025 – Present",
    place: "Hyderabad",
    oneLiner:
      "Healthcare voice agents and a smart-city operational intelligence platform, plus recommendation and predictive systems on top of the vision events.",
    groups: [
      {
        label: "Voice",
        bullets: [
          "Prior Authorization and Appointment Scheduling agents on LiveKit.",
          "STT–LLM–TTS, SIP telephony (IVR/DTMF), interruption handling, and tool-calling.",
          "Qwen-3, Gemma, and Amazon Bedrock.",
          "Langfuse and LLM-as-a-Judge for latency, hallucination, task completion, and response quality.",
          "Qwen-3 LoRA on 1.2K healthcare transcripts. Tool-calling from 77% to 93%.",
          "≤65ms vLLM inference and sub-500ms end-to-end.",
        ],
      },
      {
        label: "Vision",
        bullets: [
          "Smart City Operational Intelligence Platform: DeepStream, YOLO11, ByteTrack, Kafka, and Apache Flink.",
          "Wrong-Way Driving, Footpath Driving, Road Blockage, Stray Cattle, Loitering, and Intrusion Detection.",
          "Accident, fire and smoke, waterlogging, and crowd monitoring.",
        ],
      },
      {
        label: "Decision systems",
        bullets: [
          "Operational Advisory Agent on Amazon Bedrock turns vision events into recommendations.",
          "City Mobility Recommendation System for shift schedules and corridor congestion.",
          "Women Safety Patrolling Recommendation Agent from incidents, hotspots, and risk context.",
          "Ghost Jam Prediction and Hyderabad Metro Crowd Surge Forecasting.",
        ],
      },
    ],
    bullets: [],
  },
  {
    role: "AI ML Engineer",
    org: "Eizen.AI",
    orgUrl: "https://eizen.ai/",
    period: "04-2024 – 04-2025",
    place: "Hyderabad",
    oneLiner:
      "SRE voice agents, wildlife vision at Vantara Zoo, and chip-manufacturing QA.",
    groups: [
      {
        label: "Voice",
        bullets: [
          "LangGraph voice agents for SRE: query correlation and causation graphs, summarize anomalies, narrate root cause, and suggest remediation.",
        ],
      },
      {
        label: "Vision",
        bullets: [
          "Animal and human re-identification across 60+ cameras at Vantara Zoo with Siamese Networks, CNNs, and Swin Transformers.",
          "Unsupervised elephant vocalization pipeline with SimCLR and DBSCAN.",
          "Leopard detection and movement monitoring with YOLOv8, including region-wise behavior analytics.",
        ],
      },
      {
        label: "Manufacturing",
        bullets: [
          "Chip manufacturing QA with YOLO, Kafka, and Jenkins for alerts on anomalous events.",
        ],
      },
    ],
    bullets: [],
  },
  {
    role: "SDE Intern",
    org: "Dilate Labs Pvt. Ltd.",
    orgUrl: "https://www.dilatelabs.com/",
    period: "11-2023 – 04-2024",
    place: "",
    oneLiner: "Customer and lab-partner application, auth, and 40+ REST APIs.",
    groups: [
      {
        label: "Application",
        bullets: [
          "Node.js, TypeScript, MongoDB, and REST, with Firebase reCAPTCHA and Google login.",
        ],
      },
      {
        label: "APIs",
        bullets: [
          "40+ REST APIs: Google Maps, Razorpay, orders, wallet, patient report card, Cloudinary uploads, and reviews.",
        ],
      },
    ],
    bullets: [],
  },
];

export const stackPillars = [
  {
    title: "Languages",
    chips: ["Python", "JavaScript"],
  },
  {
    title: "AI & LLM",
    chips: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Qwen-3",
      "Gemma",
      "Claude",
      "Bedrock",
      "vLLM",
    ],
  },
  {
    title: "Agent frameworks",
    chips: ["LangGraph", "LangChain", "AutoGen", "LiveKit"],
  },
  {
    title: "Voice AI",
    chips: ["Deepgram", "ElevenLabs", "Kokoro", "Cartesia", "Whisper"],
  },
  {
    title: "Computer Vision",
    chips: ["YOLO11", "DeepStream", "OpenCV", "ByteTrack"],
  },
  {
    title: "Data",
    chips: ["Kafka", "Flink", "PostgreSQL", "Redis", "MongoDB", "FAISS"],
  },
  {
    title: "Cloud & DevOps",
    chips: ["AWS", "Docker", "FastAPI", "Node.js"],
  },
  {
    title: "Observability",
    chips: ["Langfuse", "LangSmith"],
  },
];

export const certifications = [
  {
    title: "GPS Spoof and Detect in Ardupilot Simulating UAVs",
    detail: "21st IEEE OITS International Conference on Information Technology · 01-2023 – 08-2023",
  },
  {
    title: "Generative AI Fundamentals",
    detail: "Databricks Academy",
  },
  {
    title: "AI Agent Fundamentals",
    detail: "Databricks Academy",
  },
  {
    title: "Advance MCP Servers for Automation in Production",
    detail: "Hugging Face",
  },
];

export type Project = {
  slug: string | null;
  title: string;
  period: string;
  outcome: string;
  summary: string;
  details: string[];
  chips: string[];
};

export const projects: Project[] = [
  {
    slug: null,
    title: "Interviewer Agent",
    period: "09-2025 – 11-2025",
    outcome: "Automated interviews cut manual screening by about 80%.",
    summary:
      "Real-time AI interviewer with dynamic questions, follow-ups, interruption handling, and structured candidate reports.",
    details: [
      "Autonomous interviewer for real-time candidate interaction: dynamic question generation, contextual follow-ups, and natural turn-taking with interruption handling.",
      "Stateful conversation engine for interview flow, response tracking, and adaptive questioning.",
      "Session orchestration and an LLM-as-a-Judge evaluation pipeline that writes structured candidate reports with performance and behavioral metrics.",
      "PostgreSQL for session persistence and Redis for cache. Stack also includes LiveKit, Deepgram, ElevenLabs, Azure OpenAI, and Amazon Bedrock.",
    ],
    chips: ["LiveKit", "Deepgram", "ElevenLabs", "Bedrock", "PostgreSQL", "Redis"],
  },
  {
    slug: null,
    title: "Multimodal AI Therapist Agent",
    period: "02-2025 – 04-2025",
    outcome: "Stateful therapy dialogue with a policy engine on the LLM.",
    summary:
      "Multimodal therapist agent for structured trauma-support conversations, including trafficking-survivor contexts, aligned with TRT/CBT.",
    details: [
      "LangGraph multi-agent pipeline for emotion detection, state tracking, and response generation.",
      "Multimodal emotion detection from facial expression and acoustic speech emotion, streamed on Kafka into agent context.",
      "Therapy policy engine constrains LLM outputs to the therapeutic protocol.",
      "Low-latency voice with Whisper and Amazon Polly. SQL stores session state, therapy progress, and history.",
      "Models include LLaMA2 and Phi-3, with computer vision on the emotion path.",
    ],
    chips: ["LangGraph", "Phi-3", "Whisper", "Polly", "Kafka", "SQL"],
  },
  {
    slug: "multi-agent-pm",
    title: "Multi-Agent AI Project Management System",
    period: "08-2024 – 09-2024",
    outcome: "Goals become prioritized tasks, staffing suggestions, and reports.",
    summary:
      "Multi-agent planning loop with RAG. Task and priority agents, team configuration, and context-aware reports.",
    details: [
      "Task and Priority Agents generate and rank work from a project description.",
      "FAISS RAG with LangChain models (Ollama and Groq) for context-aware suggestions and reports.",
      "Team-configuration suggestions from capabilities and project requirements.",
      "Public source. Stack: LangChain, LangGraph, FastAPI, GROQ, FAISS, SQLAlchemy, Docker.",
    ],
    chips: ["LangGraph", "LangChain", "FAISS", "FastAPI", "GROQ", "Docker"],
  },
  {
    slug: "voice-ai-framework",
    title: "Voice AI Agent Framework",
    period: "04-2025 – Present",
    outcome: "Scheduling and prior-authorization agents on a live telephony path.",
    summary:
      "Quanteon voice marketplace: Appointment Scheduler and Prior Auth agents on LiveKit, SIP telephony, and a swappable STT–LLM–TTS path.",
    details: [
      "Led a 5-member team. LiveKit, interruption handling, tool-calling, speaker diarization, Silero VAD, Krisp noise cancellation, and multilingual turn detection.",
      "Deepgram STT, Azure OpenAI / Amazon Bedrock / Qwen-3, ElevenLabs and Kokoro TTS, Redis state, Docker on AWS EC2.",
      "Langfuse traces and LLM-as-a-Judge for latency, hallucination, task completion, and response quality.",
      "LoRA fine-tune of Qwen-3 on 1.2K healthcare transcripts.",
    ],
    chips: ["LiveKit", "Deepgram", "Qwen-3", "vLLM", "Bedrock", "Langfuse"],
  },
  {
    slug: "smart-city-operations",
    title: "Smart City Operational Intelligence Platform",
    period: "04-2025 – Present",
    outcome: "CCTV events become incidents, recommendations, and forecasts.",
    summary:
      "Quanteon computer-vision platform for city operations: detection and tracking on live video, stream processing, and decision agents on top.",
    details: [
      "Camera streams run through DeepStream on GPU with YOLO11. ByteTrack keeps identities across frames. Detections publish to Kafka. Apache Flink applies use-case rules and emits operational events.",
      "Use cases: Wrong-Way Driving, Footpath Driving, Road Blockage, Stray Cattle, Loitering, Intrusion Detection, plus accident, fire and smoke, waterlogging, and crowd monitoring.",
      "Operational Advisory Agent on Amazon Bedrock turns events into recommendations. City Mobility and Women Safety Patrolling agents recommend shift and patrol plans. Forecasts include Ghost Jam Prediction and Hyderabad Metro Crowd Surge Forecasting.",
    ],
    chips: ["DeepStream", "YOLO11", "ByteTrack", "Kafka", "Flink", "Bedrock"],
  },
];
