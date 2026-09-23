/** Site copy sourced from docs/site-copy.md — keep thesis wording here, not duplicated in JSX. */
export const site = {
  name: "Mohammed Warish",
  shortName: "Warish",
  monogram: "W",
  role: "AI Engineer · Voice & Agents",
  email: "khanwarish483@gmail.com",
  thesis:
    "I build telephony-grade voice agents under a 500ms budget—and the multi-agent systems around them.",
  support:
    "AI Engineer focused on STT→LLM→TTS pipelines, tool-calling agents, and Dockerized inference on AWS for regulated workflows.",
  about:
    "I'm Mohammed Warish, an AI Engineer at Quanteon. I design low-latency voice and multi-agent systems—interruptible conversational loops, domain-adapted tool-calling, and scalable inference workers—then ship them behind clear latency and safety boundaries.",
  contactHeadline:
    "Want an engineer who owns latency budgets and agent graphs—not slideware?",
  contactSupport:
    "Reach out for AI Engineer / Full-Stack AI / GenAI voice-agent roles. I can walk through the voice pipeline, the multi-agent graph, or a synthetic demo when NDA blocks production audio.",
  linkedin: "https://www.linkedin.com/in/mohd-warish-261a28259",
  github: "https://github.com/mohdwarish483",
  resumePath: "/docs/MOHAMMED-WARISH-AI.pdf",
  seo: {
    title: "Mohammed Warish · AI Engineer",
    description:
      "Low-latency voice agents and multi-agent systems—STT→LLM→TTS, tool-calling, Dockerized inference on AWS.",
  },
};

export type ExperienceItem = {
  role: string;
  org: string;
  orgUrl: string | null;
  period: string;
  oneLiner: string;
  bullets: string[];
  caseStudySlug?: string;
  sidebar?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    role: "AI Engineer",
    org: "Quanteon Solutions",
    orgUrl: null,
    period: "Apr 2025 — Present",
    oneLiner:
      "Designed voice agent framework; sub-500ms STT–LLM–TTS on AWS/Docker; fine-tuned Qwen 3 on 1.2K transcripts.",
    caseStudySlug: "voice-ai-framework",
    bullets: [
      "Designed a Voice AI Agent Framework — appointment schedulers, prior-auth agents, and interviewer agents for healthcare and recruiting workflows.",
      "Shipped Dockerized vLLM workers on AWS EC2 under a sub-500ms end-to-end latency budget with auto-scaling worker pools.",
      "Built a HIPAA-oriented STT→LLM→TTS path with Deepgram, Azure OpenAI, and ElevenLabs.",
      "Fine-tuned Qwen 3 on 1.2K call transcripts to improve tool-calling and information extraction.",
    ],
  },
  {
    role: "AI Engineer",
    org: "Eizen.AI",
    orgUrl: "https://eizen.ai/",
    period: "Apr 2024 — Apr 2025",
    oneLiner:
      "Shipped anomaly + LangGraph copilots and YOLO video QA with case alerts and text-to-query.",
    caseStudySlug: "industrial-ai-systems",
    bullets: [
      "Built time-series forecasting and anomaly detection with root-cause analysis for ops transparency.",
      "Developed LangGraph + DeepSeek + RAG multi-agent copilots for real-time summarization over anomaly streams.",
      "Shipped YOLO video QA for chip manufacturing with case-management alerts and text-to-query incident analysis.",
      "Implemented unsupervised “known-unknown” activity detection for surveillance video with real-time alerts.",
    ],
  },
  {
    role: "SDE Intern",
    org: "Dilate Laboratory",
    orgUrl: "https://www.dilatelabs.com/",
    period: "Nov 2023 — Mar 2024",
    oneLiner:
      "Full-stack reliability on React/TS/Node—context for shipping AI product UI, not a peer flagship.",
    sidebar: true,
    bullets: [
      "Built customer and lab-partner apps with React, TypeScript, Node, MongoDB, and Firebase.",
      "Cut unauthorized access risk with reCAPTCHA and Google login; reduced upload load ~20% via Cloudinary.",
      "Delivered 40+ REST APIs spanning orders, wallets, reports, reviews, Maps, and Razorpay payments.",
    ],
  },
];

export const stackPillars = [
  {
    title: "Voice / GenAI",
    chips: [
      "LangGraph",
      "LangChain",
      "STT / TTS",
      "vLLM",
      "Qwen fine-tuning",
      "Azure OpenAI",
      "Deepgram",
      "ElevenLabs",
    ],
  },
  {
    title: "MLOps / delivery",
    chips: [
      "Docker",
      "AWS EC2",
      "FastAPI",
      "Observability",
      "Eval harnesses",
      "CI/CD",
      "PostgreSQL",
      "Python",
    ],
  },
  {
    title: "Vision / ML",
    chips: [
      "YOLO",
      "Time-series anomaly",
      "RAG / FAISS",
      "OpenAI tool-use",
      "PyTorch",
      "OpenCV",
    ],
  },
];

export const workBlurbs: Record<string, string> = {
  "voice-ai-framework":
    "High-concurrency telephony agents with interruptibility, tool-use, and a sub-500ms turn budget. Proprietary—architecture + sanitized latency proof.",
  "multi-agent-pm":
    "Orchestration graph for planning, prioritization, staffing, and reports with FAISS RAG. Public source.",
  "industrial-ai-systems":
    "Eizen: anomaly detection, LangGraph analytical copilots, and YOLO QA wired into case management.",
};
