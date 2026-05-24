export interface JournalEntry {
  id: number;
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  intro: string;
  sections: { heading: string; body: string }[];
  useCases: string[];
  tools: string[];
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 1,
    slug: "ai-powered-web-platforms-2025",
    title: "Building AI-Powered Web Platforms in 2025",
    tag: "AI & Dev",
    readTime: "5 min read",
    date: "May 2025",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    imageAlt: "AI neural network visualization with glowing connections",
    intro:
      "Artificial Intelligence is no longer a futuristic concept — it's the backbone of modern web platforms. In 2025, building an AI-powered web platform means combining smart APIs, real-time data, and intuitive UX into one seamless product.",
    sections: [
      {
        heading: "What is an AI-Powered Web Platform?",
        body: "An AI-powered web platform uses machine learning models, natural language processing, or computer vision to deliver intelligent features — like chatbots, personalized recommendations, smart search, or automated workflows. Instead of static pages, users get dynamic experiences that adapt to their behavior.",
      },
      {
        heading: "How It Works",
        body: "At its core, an AI web platform connects a frontend (React, Next.js) to AI APIs (OpenAI, Gemini, custom ML models) via a backend layer. User inputs are sent to the AI engine, processed in real-time, and results are returned to the UI — all within milliseconds. The magic is in the integration: clean API design, fast response handling, and smart UI feedback.",
      },
      {
        heading: "Key Technologies Used",
        body: "Modern AI platforms are built with Next.js for the frontend, Node.js or Python for the backend, and AI APIs like OpenAI GPT-4, Google Gemini, or custom-trained models. Vector databases like Pinecone handle semantic search, while tools like LangChain manage complex AI workflows.",
      },
      {
        heading: "Real-World Applications",
        body: "AI platforms are used in customer support (chatbots), e-commerce (product recommendations), healthcare (symptom checkers), education (personalized tutors), and business intelligence (automated reporting). The Connect AI project is a prime example — an interactive AI companion built for everyday users.",
      },
    ],
    useCases: [
      "Customer support chatbots",
      "Personalized content recommendations",
      "Automated business reporting",
      "Smart search & semantic discovery",
      "AI-powered onboarding flows",
      "Real-time language translation",
    ],
    tools: ["Next.js", "OpenAI API", "Node.js", "Pinecone", "LangChain", "TypeScript"],
  },
  {
    id: 2,
    slug: "custom-digital-identity-for-business",
    title: "Why Every Business Needs a Custom Digital Identity",
    tag: "Design",
    readTime: "4 min read",
    date: "Apr 2025",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    imageAlt: "Brand design workspace with color palettes and logo mockups",
    intro:
      "In a world where first impressions happen online, your digital identity is your most valuable business asset. A custom digital identity goes far beyond a logo — it's the complete visual and emotional language your brand speaks.",
    sections: [
      {
        heading: "What is a Digital Identity?",
        body: "A digital identity is the complete set of visual and verbal elements that represent your brand online — logo, color palette, typography, tone of voice, website design, social media presence, and more. It's how customers recognize and remember you in a crowded digital space.",
      },
      {
        heading: "Why Custom Beats Generic",
        body: "Generic templates and free logo makers give you something that looks like a thousand other businesses. A custom identity is built around your specific audience, values, and goals. It communicates professionalism, builds trust, and creates emotional connection — all of which directly impact sales and loyalty.",
      },
      {
        heading: "The Components of a Strong Digital Identity",
        body: "A strong digital identity includes: a memorable logo that works at all sizes, a consistent color system that evokes the right emotions, typography that reflects your brand personality, a website that converts visitors into customers, and social media templates that maintain consistency across platforms.",
      },
      {
        heading: "How I Build Digital Identities",
        body: "My process starts with understanding the business — its audience, competitors, and goals. Then I move to strategy (positioning, messaging), visual design (logo, colors, fonts), and finally execution (website, social assets, brand guidelines). Every decision is intentional and tied back to business objectives.",
      },
    ],
    useCases: [
      "Startup brand launches",
      "Business rebranding",
      "E-commerce store identity",
      "Personal brand for professionals",
      "Agency & service business branding",
      "Product launch visual identity",
    ],
    tools: ["Figma", "Adobe Illustrator", "Photoshop", "Adobe XD", "Canva Pro"],
  },
  {
    id: 3,
    slug: "full-stack-workflow-idea-to-launch",
    title: "From Idea to Launch: My Full-Stack Workflow",
    tag: "Process",
    readTime: "6 min read",
    date: "Mar 2025",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    imageAlt: "Developer working on multiple screens with code and design tools",
    intro:
      "After 6+ years of building web products, I've refined a workflow that takes a project from raw idea to live deployment — efficiently, without cutting corners. Here's exactly how I do it.",
    sections: [
      {
        heading: "Phase 1 — Discovery & Planning",
        body: "Every project starts with deep discovery. I ask: Who is the user? What problem are we solving? What does success look like? I map out user flows, define the tech stack, and create a project timeline. This phase prevents 90% of problems that kill projects later.",
      },
      {
        heading: "Phase 2 — Design & Prototyping",
        body: "Before writing a single line of code, I design the UI in Figma. Wireframes first, then high-fidelity mockups. I validate the design with the client, make revisions, and only move to development once the design is approved. This saves enormous time in development.",
      },
      {
        heading: "Phase 3 — Development",
        body: "I build frontend and backend in parallel where possible. Frontend in Next.js/React, backend in Node.js or PHP, database in MySQL or MongoDB. I use component-driven development, write clean reusable code, and integrate APIs as I go. Git commits are frequent and descriptive.",
      },
      {
        heading: "Phase 4 — Testing & Launch",
        body: "Before launch, I test across devices and browsers, check performance (Lighthouse scores), fix bugs, and do a final client review. Deployment is on Vercel or a VPS. Post-launch, I monitor for errors and provide 30 days of support.",
      },
    ],
    useCases: [
      "SaaS product development",
      "E-commerce platform builds",
      "Business web application",
      "MVP development in 21 days",
      "Client project management",
      "Freelance project delivery",
    ],
    tools: ["Next.js", "React", "Node.js", "Figma", "MySQL", "Vercel", "Git"],
  },
  {
    id: 4,
    slug: "cybersecurity-basics-for-developers",
    title: "Cybersecurity Basics Every Developer Should Know",
    tag: "Security",
    readTime: "7 min read",
    date: "Feb 2025",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    imageAlt: "Cybersecurity concept with lock and digital shield on dark background",
    intro:
      "Most security breaches don't happen because of sophisticated hacking — they happen because of basic mistakes developers make every day. Here are the fundamentals every developer must know to build secure applications.",
    sections: [
      {
        heading: "Input Validation & Sanitization",
        body: "Never trust user input. Always validate on the server side, sanitize data before storing it, and use parameterized queries to prevent SQL injection. XSS attacks happen when unsanitized user input is rendered as HTML — always escape output in your templates.",
      },
      {
        heading: "Authentication & Authorization",
        body: "Use strong password hashing (bcrypt, Argon2 — never MD5 or SHA1). Implement proper session management, use JWT tokens correctly, and always check authorization on every protected route. The most common mistake: checking authentication but forgetting authorization.",
      },
      {
        heading: "HTTPS & Secure Headers",
        body: "Always use HTTPS — never serve sensitive data over HTTP. Set security headers: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and HSTS. These headers prevent a wide range of attacks including clickjacking and MIME sniffing.",
      },
      {
        heading: "Dependency Management",
        body: "Outdated packages are one of the biggest security risks. Regularly audit your dependencies with npm audit or Snyk. Remove unused packages, pin versions in production, and subscribe to security advisories for your key dependencies.",
      },
    ],
    useCases: [
      "Securing web applications",
      "API security best practices",
      "User authentication systems",
      "Data protection & privacy",
      "Penetration testing basics",
      "Secure coding standards",
    ],
    tools: ["OWASP Guidelines", "bcrypt", "Helmet.js", "Snyk", "SSL/TLS", "JWT"],
  },
];

export function getEntryBySlug(slug: string): JournalEntry | undefined {
  return JOURNAL_ENTRIES.find((e) => e.slug === slug);
}
