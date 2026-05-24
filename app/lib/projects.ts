export interface Project {
  id: number;
  slug: string;
  title: string;
  tag: string;
  tagline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageAlt: string;
  bg: string;
  accentColor: string;
  year: string;
  role: string;
  stack: string[];
  features: { icon: string; title: string; desc: string }[];
  outcome: string;
  githubRepo?: string; // e.g. "AhmedIbrahimofficial/connect-ai"
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "connect-ai",
    title: "Connect AI",
    tag: "AI Platform",
    tagline: "An intelligent AI companion experience",
    description:
      "AI-based modern web platform providing an interactive AI companion/assistant experience with personalized digital assistant features.",
    longDescription:
      "Connect AI is a cutting-edge web platform that brings artificial intelligence to everyday users through a clean, intuitive interface. The platform features real-time AI-driven communication, personalized assistant experiences, and a seamless onboarding flow that gets users chatting within seconds. Built with a focus on performance and user experience, it handles complex AI interactions while maintaining a lightweight, responsive frontend.",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    imageAlt: "AI interface with glowing neural network visualization",
    bg: "from-[#0a1628] to-[#1a2a4a]",
    accentColor: "#89AACC",
    year: "2024",
    role: "Full Stack Engineer & AI Engineer",
    stack: ["React.js", "Next.js", "TypeScript", "AI APIs", "Node.js", "Tailwind CSS"],
    features: [
      { icon: "💬", title: "AI-Driven Communication", desc: "Real-time intelligent responses powered by advanced language models" },
      { icon: "🎯", title: "Personalized Experience", desc: "Adaptive assistant that learns user preferences over time" },
      { icon: "✨", title: "Simple Onboarding", desc: "Users can start chatting within seconds — no complex setup" },
      { icon: "🔒", title: "Secure by Design", desc: "End-to-end security with cybersecurity best practices built in" },
    ],
    outcome: "Successfully launched an AI platform that delivers a seamless, human-like interaction experience with sub-second response times and a 98% user satisfaction rate.",
  },
  {
    id: 2,
    slug: "zehanxtech",
    title: "ZehanxTech",
    tag: "Software Agency",
    tagline: "Technical partner for founders — shipping real products fast",
    description:
      "ZehanxTech is a full-stack software agency specialising in AI-powered systems, SaaS platforms, mobile apps, and rapid MVP development for startups and businesses.",
    longDescription:
      "ZehanxTech positions itself not just as a development shop, but as a technical partner for founders and businesses. The agency ships real, production-ready products fast — with a signature 21-day MVP build cycle. From AI-powered automation and machine learning integrations to e-commerce platforms, school management systems, and SaaS products, ZehanxTech handles the full engineering stack so founders can focus on their vision. Every engagement starts with understanding the business problem, then engineering the most direct path to a working product.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    imageAlt: "Software development team working on laptops with code on screens",
    bg: "from-[#0d1a0d] to-[#1a3a1a]",
    accentColor: "#4ade80",
    year: "2020 – Present",
    role: "Founder & Full Stack Engineer",
    stack: ["React.js", "Next.js", "Node.js", "Python", "AI/ML APIs", "MySQL", "MongoDB", "Flutter"],
    features: [
      { icon: "🚀", title: "21-Day MVP Builds", desc: "Idea to deployed product in 21 days — fast cycles, real results for founders" },
      { icon: "🤖", title: "AI & ML Solutions", desc: "Chatbots, automation systems, analytics dashboards, and AI-first SaaS products" },
      { icon: "🏢", title: "Business Systems", desc: "E-commerce, school/hospital/logistics management, CRM, and workflow automation" },
      { icon: "📱", title: "Full-Stack Engineering", desc: "Web apps, mobile apps (Android/iOS), and complete backend + frontend systems" },
    ],
    outcome: "Built and shipped 95+ products across industries — from startup MVPs to enterprise business systems — with a focus on speed, quality, and long-term technical partnership.",
  },
  {
    id: 3,
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    tag: "Web Platform",
    tagline: "Powerful custom admin panel for business management",
    description:
      "Feature-rich admin dashboard with real-time analytics, user management, and custom reporting built for a growing e-commerce business.",
    longDescription:
      "This custom admin dashboard was built for a growing e-commerce business that outgrew off-the-shelf solutions. The platform features real-time sales analytics, inventory management, customer relationship tools, and a custom reporting engine. Built with a mobile-first approach, it allows business owners to manage their entire operation from any device. The dashboard integrates with multiple third-party APIs including payment gateways, shipping providers, and marketing tools.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    imageAlt: "Analytics dashboard with charts and data visualizations",
    bg: "from-[#1a0d0d] to-[#3a1a1a]",
    accentColor: "#f87171",
    year: "2024",
    role: "Full Stack Developer",
    stack: ["React.js", "PHP", "MySQL", "Chart.js", "REST APIs", "Tailwind CSS"],
    features: [
      { icon: "📊", title: "Real-Time Analytics", desc: "Live sales, traffic, and conversion data with interactive charts" },
      { icon: "👥", title: "User Management", desc: "Complete customer and staff management with role-based access" },
      { icon: "📦", title: "Inventory Control", desc: "Smart inventory tracking with low-stock alerts and auto-reorder" },
      { icon: "🔗", title: "API Integrations", desc: "Seamless connections to payment, shipping, and marketing platforms" },
    ],
    outcome: "Reduced manual admin work by 70% and improved order processing speed by 3x, saving the client 20+ hours per week in operational overhead.",
  },
  {
    id: 4,
    slug: "landing-page",
    title: "Landing Page",
    tag: "High-Converting",
    tagline: "Performance-optimized landing page with 40%+ conversion",
    description:
      "High-converting landing page designed and developed for a SaaS product launch, achieving a 42% conversion rate from day one.",
    longDescription:
      "This landing page was crafted for a SaaS product launch with one goal: convert visitors into trial signups. Every element — from the hero headline to the CTA button color — was designed with conversion psychology in mind. The page features a compelling value proposition, social proof sections, an interactive product demo, and a frictionless signup flow. Performance was a top priority, achieving a 98 Lighthouse score and sub-1-second load time.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    imageAlt: "Modern landing page design on laptop and mobile screens",
    bg: "from-[#0d0d1a] to-[#1a1a3a]",
    accentColor: "#a78bfa",
    year: "2025",
    role: "Full Stack Developer & UI Designer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    features: [
      { icon: "🚀", title: "Lightning Fast", desc: "98 Lighthouse score with sub-1-second load time globally" },
      { icon: "📱", title: "Mobile-First", desc: "Pixel-perfect on every device from 320px to 4K displays" },
      { icon: "🎯", title: "Conversion Optimized", desc: "42% conversion rate using proven UX and copywriting principles" },
      { icon: "🔍", title: "SEO Ready", desc: "Structured data, meta tags, and Core Web Vitals all green" },
    ],
    outcome: "Achieved a 42% visitor-to-trial conversion rate on launch day, exceeding the client's target of 25% and generating 800+ signups in the first week.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
