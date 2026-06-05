/* Portfolio content + AI grounding. */
window.MG = {
  name: "Mounika Grandhi",
  role: "AI Engineer",
  location: "Hyderabad, India",
  status: "Open to AI engineering roles",
  tagline: "I build AI systems that ship.",
  blurb:
    "Agentic workflows, RAG systems, and production LLM backends — grounded, observable, and reliable enough for real product teams.",
  email: "grandhimounika29@gmail.com",
  github: "https://github.com/mouni298",
  linkedin: "https://www.linkedin.com/in/mounika-grandhi",
  resume: "assets/Mounika_Grandhi_Resume.pdf",

  projects: [
    {
      id: 1,
      name: "Swaram AI",
      kind: "Open-source SDK",
      status: null,
      one: "Voice AI agents without a hosted orchestration platform.",
      desc:
        "A TypeScript SDK that coordinates VAD, STT, LLM reasoning, tool calls, TTS, and telephony into domain-agnostic voice support agents.",
      tags: ["TypeScript", "Voice Agents", "Groq", "Ollama", "Whisper.cpp", "Kokoro TTS", "Twilio"],
      repo: "https://github.com/mouni298/Swaram",
      nodes: ["VAD", "STT", "LLM", "Tools", "TTS", "Telephony"],
    },
    {
      id: 2,
      name: "Content Automator",
      kind: "Agent pipeline",
      status: null,
      one: "Agent-directed content pipeline with deterministic rendering + human review.",
      desc:
        "An LLM Director chooses strategy while deterministic Python services handle research, media, FFmpeg assembly, and approval-gated publishing.",
      tags: ["Python", "Google ADK", "Gemini", "FFmpeg", "Telegram Bot", "YouTube API"],
      repo: "https://github.com/mouni298/content-automator",
      nodes: ["Director", "Research", "Media", "Assemble", "Approve", "Publish"],
    },
    {
      id: 3,
      name: "Doc Extractor",
      kind: "Document intelligence",
      status: null,
      one: "Turns documents into confidence-scored structured data.",
      desc:
        "Parses PDF/DOCX/image files into Groq-powered JSON with confidence scoring, persisted results, batch jobs, and a Next.js interface.",
      tags: ["FastAPI", "Next.js", "Groq", "Vision LLM", "SQLModel", "Celery"],
      repo: "https://github.com/mouni298/ai-doc-extractor",
      nodes: ["Ingest", "Parse", "Vision LLM", "Score", "Persist"],
    },
    {
      id: 4,
      name: "Agentic CRM",
      kind: "Multi-agent system",
      status: "Currently building",
      one: "Multi-agent orchestration + RAG over a CRM, with a glass-box trust layer.",
      desc:
        "A supervisor agent qualifies leads, deflects support cases with RAG, and runs a Researcher→Outreach chain — every handoff gated by human approval, with traces, confidence scores, and a kill-switch.",
      tags: ["Google ADK", "MCP", "A2A", "Claude", "RAG (Chroma)", "FastAPI", "HITL"],
      repo: "https://github.com/mouni298/AI-CRM",
      nodes: ["Supervisor", "Qualify", "RAG", "Researcher", "Outreach", "HITL"],
    },
  ],

  experience: [
    {
      when: "Jul 2025 — Present",
      role: "AI Engineer",
      org: "Inncircles",
      tags: ["Agentic AI", "RAG", "Analytics"],
      points: [
        "Multi-agent AI workflows for construction operations, automating analysis from workflow data.",
        "Hybrid RAG with chunking, semantic retrieval, token-aware batching, and grounding guardrails.",
        "MCP tools, human-in-the-loop flows, and long-term memory across operational workflows.",
        "Multi-modal, multi-provider routing across OpenAI, Anthropic, Gemini with LangSmith tracing.",
      ],
    },
    {
      when: "Aug 2022 — Jun 2025",
      role: "Digital Specialist Engineer",
      org: "Infosys",
      tags: ["Modernization", "RAG", "Evaluation"],
      points: [
        "AI migration platform reducing manual effort in legacy modernization workflows.",
        "RAG-based QA chains across 5+ legacy codebases for reverse engineering.",
        "Code summarization + BRD generation with LangChain, embeddings, vector DBs.",
        "Evaluation pipelines using BLEU, CodeBLEU, and custom benchmarks for hallucination tracking.",
      ],
    },
  ],

  stack: [
    { group: "Agentic AI", items: ["LangChain", "LangGraph", "DeepAgents", "Google ADK", "MCP"] },
    { group: "RAG & Data", items: ["LlamaIndex", "Milvus", "ChromaDB", "Semantic Search"] },
    { group: "LLM Providers", items: ["OpenAI", "Anthropic", "Gemini", "Grok", "Groq"] },
    { group: "Backend & Cloud", items: ["Python", "FastAPI", "Docker", "AWS", "GCP"] },
    { group: "Eval & LLMOps", items: ["LangSmith", "Prompt Eng", "Monitoring"] },
  ],
};

/* Grounding text for the AI "ask me" feature. */
window.MG.context = `You are the portfolio assistant for Mounika Grandhi, an AI Engineer based in Hyderabad, India. Answer as a concise, friendly representative of her work in the first or third person. Keep answers SHORT (1-3 sentences, or a tight list). Only use the facts below. If asked something not covered, say you don't have that detail and point them to her email or resume.

ROLE: AI Engineer. ${window.MG.tagline} ${window.MG.blurb}
STATUS: ${window.MG.status}.

EXPERIENCE:
- AI Engineer at Inncircles (Jul 2025-present): multi-agent orchestration, hybrid RAG, model routing across OpenAI/Anthropic/Gemini, MCP tools, human-in-the-loop, long-term memory, LangSmith tracing, for construction workflows.
- Digital Specialist Engineer at Infosys (Aug 2022-Jun 2025): legacy modernization, RAG QA chains across 5+ codebases, code summarization + BRD generation with LangChain/embeddings/vector DBs, evaluation pipelines (BLEU, CodeBLEU).

PROJECTS:
1. Swaram AI — open-source TypeScript SDK for voice AI agents (VAD, STT, LLM, tool calls, TTS, telephony). Stack: Groq, Ollama, Whisper.cpp, Kokoro TTS, Twilio.
2. Content Automator — agent-directed content pipeline; LLM Director picks strategy, deterministic Python services do research/media/FFmpeg assembly + approval-gated publishing. Stack: Google ADK, Gemini, FFmpeg, Telegram, YouTube API.
3. Doc Extractor — turns PDF/DOCX/images into confidence-scored structured JSON. Stack: FastAPI, Next.js, Groq, Vision LLM, SQLModel, Celery.
4. Agentic CRM (currently building) — supervisor agent qualifies leads, RAG support deflection, Researcher to Outreach chain, every handoff human-approved, with traces + kill-switch. Stack: Google ADK, MCP, A2A, Claude, RAG (Chroma), FastAPI.

STACK: LangChain, LangGraph, DeepAgents, Google ADK, MCP, LlamaIndex, Milvus, ChromaDB, OpenAI, Anthropic, Gemini, Grok, Groq, Python, FastAPI, Docker, AWS, GCP, LangSmith.
CONTACT: email grandhimounika29@gmail.com, GitHub github.com/mouni298, LinkedIn linkedin.com/in/mounika-grandhi.`;
