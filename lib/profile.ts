export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  badge?: "Live" | "GitHub";
  image: string;
};

export const experiences = [
  {
    period: "2026 Jun — Present",
    title: "Junior AI Automation Engineer",
    company: "Aahaas",
    description: "Built Travel Quote GPT, an AI-powered travel quotation and itinerary generator that automates quote preparation. Develop and integrate backend APIs across multiple systems with data synchronization, validation and prompt-injection safeguards, and optimize database queries and LLM token usage to cut AI processing costs.",
    tags: ["n8n", "JavaScript", "OpenAI", "Gemini", "REST APIs", "LLM Automation"]
  },
  {
    period: "2025 May — 2026 May",
    title: "Intern Software Engineer",
    company: "One Billion Tech",
    description: "Built Spring Boot microservices and React interfaces for Million Spaces, a workspace booking platform: added server-side caching, improved Google Calendar sync, helped migrate services to AWS serverless, and co-developed Spacey, an AI chatbot for users. Also built full-stack features for 1HR, a cloud-native HR system, working on multi-cloud infrastructure with Terraform.",
    tags: ["Spring Boot", "Microservices", "Node.js", "React", "MongoDB", "PostgreSQL", "AWS", "Azure", "Terraform", "Serverless"]
  },
  {
    period: "2024 Feb — 2024 Oct",
    title: "Intern Software Engineer",
    company: "Softmint Software Solutions",
    description: "Optimized SQL queries and improved database performance. Built scalable, secure backend services with Laravel, focusing on database management and API integration.",
    tags: ["Laravel", "React", "MySQL", "WordPress", "Node.js", "DigitalOcean"]
  }
];

export const featuredProjects: Project[] = [
  {
    title: "AI Agent System for E-commerce",
    description: "A multi-agent AI platform for e-commerce with customer support, shopping assistance and dynamic agent routing. Includes an MCP server giving external AI assistants secure, customer-scoped catalogue access, RAG product search on cloud or local models, prompt-injection protection with human handover, and a practice mode where shop owners grade AI replies before going live.",
    tags: ["Python", "LangGraph", "FastAPI", "MCP", "PostgreSQL", "pgvector", "Redis", "Gemini", "Ollama", "Next.js"],
    link: "https://github.com/malithJayasinghe2000/neura-agents-system",
    badge: "GitHub",
    image: "https://opengraph.githubassets.com/1/malithJayasinghe2000/neura-agents-system"
  },
  {
    title: "TheLawyr - Sri Lankan Legal Information Platform",
    description: "A platform that helps people explore and understand Sri Lankan legislation. Its AI legal assistant retrieves the relevant law and answers with source references. Also includes a legal library, law firm directory, blog and legal forms.",
    tags: ["Next.js", "Python", "RAG", "LangChain", "Gemini"],
    link: "https://thelawyr.fiveneurals.com",
    badge: "Live",
    image: "/images/thelawyr.png"
  },
  {
    title: "JobCeylon - AI Powered Job Platform",
    description: "A live platform, designed and built, that saves job seekers time by bringing vacancies from multiple Sri Lankan job sites into one searchable catalog. It matches new listings to each user's interests and sends instant Telegram and email alerts, and its AI drafts tailored, ATS-friendly cover letters from the user's CV and the job description.",
    tags: ["Next.js", "TypeScript", "Supabase", "AI", "Telegram Bot", "GitHub Actions", "Vercel"],
    link: "https://jobceylon.com/",
    badge: "Live",
    image: "/images/jobceylon.png"
  }
];

export const otherProjects: Project[] = [
  {
    title: "Millionspaces - Coworking Space Booking",
    description: "Contributed to a platform for booking coworking spaces in Sri Lanka, with real-time availability and secure payments. Implemented server-side caching, improved Google Calendar booking sync, and co-developed Spacey, an AI chatbot that assists users.",
    tags: ["React", "Spring Boot", "MongoDB", "AWS"],
    link: "https://millionspaces.com/Sri-Lanka",
    badge: "Live",
    image: "/images/millionspaces.png"
  },
  {
    title: "SustainPro - Event Management Platform",
    description: "Contributed to an enterprise system for managing organizations, events and nested services. Built a real-time monitoring engine on AWS IoT Core that detects device anomalies and notifies technicians automatically, and implemented role-based access control (RBAC) for multi-level user permissions. Designed the end-to-end event lifecycle and an automated pipeline for IoT device onboarding and telemetry visualization.",
    tags: ["IoT", "Next.js", "PostgreSQL", "AWS", "RabbitMQ", "Docker"],
    link: "https://github.com/malithJayasinghe2000/sustainpro",
    badge: "GitHub",
    image: "https://opengraph.githubassets.com/1/malithJayasinghe2000/sustainpro"
  },
  {
    title: "Blockchain-based E-voting System",
    description: "Final-year research on secure voting and data integrity, using homomorphic encryption for encrypted vote tabulation and blockchain to verify vote integrity.",
    tags: ["Next.js", "Ethereum", "Solidity", "Homomorphic Encryption"],
    link: "https://github.com/malithJayasinghe2000/E-voting-research-project",
    badge: "GitHub",
    image: "https://opengraph.githubassets.com/1/malithJayasinghe2000/E-voting-research-project"
  },
  {
    title: "Stores Management System",
    description: "Collaborated on a system for the Survey Department of Sri Lanka to manage procurement, tenders, employees and equipment across the country, centralizing data and improving transparency.",
    tags: ["Laravel", "Filament", "MySQL", "Bootstrap"],
    image: "/images/stores.jpg"
  },
  {
    title: "Tour Management System",
    description: "Contributed to a centralized admin panel for managing hotel, activity and tour bookings, integrated with an existing WordPress database so booking records stay in sync.",
    tags: ["WordPress", "Laravel", "JavaScript", "MySQL", "DigitalOcean"],
    image: "/images/tour.jpg"
  }
];

export const profileSummary = {
  name: "Malith Jayasinghe",
  role: "Software Engineer, Backend & AI Engineering",
  location: "Kurunegala, Sri Lanka",
  email: "malith2jayasinghe@gmail.com",
  github: "https://github.com/malithJayasinghe2000",
  linkedin: "https://www.linkedin.com/in/malithjayasinghe/",
  summary: "Software Engineer with 2 years of experience across industry roles and freelance projects, building full-stack applications and AI-powered automation systems. Experienced in backend development, API integrations and LLM-based solutions, and uses AI-assisted development tools (Claude Code, Cursor, GitHub Copilot) daily.",
};

export const education = [
  "BSc (Hons) in Information Technology, specialization in Software Engineering - Sri Lanka Institute of Information Technology (SLIIT), 2021-2025",
  "NVQ Level 4 in Information Technology - Technical College, Warakapola, 2020-2021",
  "GCE Advanced Level, Physical Science stream - Maliyadeva College, 2020",
];

export const certificates = [
  "AWS Educate Getting Started with Serverless - AWS, 2026",
  "AWS SimuLearn: Cloud Practitioner - AWS, 2025",
  "Foundational C# with Microsoft - freeCodeCamp, 2024",
  "Front End Development Libraries - freeCodeCamp, 2024",
];

export const skills: Record<string, string[]> = {
  "AI & LLM": ["LangGraph", "LangChain", "RAG", "MCP", "OpenAI", "Gemini", "Ollama", "pgvector"],
  "Languages": ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C#"],
  "Backend": ["Spring Boot", "Node.js", "FastAPI", "REST APIs", "Microservices", "n8n"],
  "Frontend": ["React", "Next.js", "Redux", "Tailwind CSS"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Supabase"],
  "Cloud & DevOps": ["AWS (Lambda, EC2, S3, ECS, SQS, RDS)", "Azure", "Terraform", "Docker", "GitHub Actions", "CI/CD", "Vercel"],
  "Tools": ["Claude Code", "Cursor", "GitHub Copilot", "Git", "Postman"],
};

/** A self-contained piece of profile knowledge the assistant can retrieve. */
export type KnowledgeChunk = { id: string; label: string; text: string; link?: string };

export const knowledgeBase: KnowledgeChunk[] = [
  { id: "summary", label: "Profile summary", text: `About, background, contact, hire, location: ${profileSummary.name} - ${profileSummary.role}, based in ${profileSummary.location}. ${profileSummary.summary} Contact: ${profileSummary.email}. GitHub: ${profileSummary.github}. LinkedIn: ${profileSummary.linkedin}.` },
  ...experiences.map((e, i) => ({
    id: `exp-${i}`,
    label: `${e.title} at ${e.company}`,
    text: `Work experience: ${e.title} at ${e.company} (${e.period}). ${e.description} Technologies: ${e.tags.join(", ")}.`,
  })),
  ...[...featuredProjects, ...otherProjects].map((p, i) => ({
    id: `proj-${i}`,
    label: p.title,
    text: `Project: ${p.title}${p.badge === "Live" ? " (live product)" : ""}. ${p.description} Technologies: ${p.tags.join(", ")}.${p.link ? ` Link: ${p.link}` : ""}`,
    link: p.link,
  })),
  { id: "skills", label: "Technical skills", text: "Technical skills, tech stack, tools, languages and frameworks he knows: " + Object.entries(skills).map(([k, v]) => `${k}: ${v.join(", ")}`).join(". ") + "." },
  { id: "education", label: "Education", text: "Education - where he studied, study, studies, university, uni, academic, degree, college, school, qualifications, graduated: " + education.join("; ") + "." },
  { id: "certificates", label: "Certificates", text: "Certificates, certifications and courses completed: " + certificates.join("; ") + "." },
];
