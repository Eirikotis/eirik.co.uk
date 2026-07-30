export type Project = {
  slug: "void" | "bittensor-autoresearch" | "dusd" | "one-click-labs";
  index: string;
  name: string;
  category: string;
  role: string;
  description: string;
  tags: string[];
  visual: "network" | "research" | "market" | "portfolio";
  detail: string[];
};

export type Capability = {
  index: string;
  title: string;
  description: string;
  items: string[];
};

export type Experience = {
  organisation: string;
  environment: string;
  role: string;
  proof?: string;
  description: string;
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const projects: Project[] = [
  {
    slug: "void",
    index: "01",
    name: "VOID",
    category: "Financial infrastructure venture",
    role: "Founding Product & Commercial Lead",
    description:
      "Led the product, commercial and operating development of a cross-chain credit infrastructure venture for Bittensor, working across architecture, engineering delivery, quantitative risk and institutional diligence.",
    tags: ["Product architecture", "Engineering leadership", "Quantitative risk", "Venture execution"],
    visual: "network",
    detail: [
      "Product concept, architecture, user journeys and market opportunity.",
      "Roadmap, scope, budget and delivery across an eight-person development team.",
      "Lending-market design, liquidation architecture and quantitative underwriting.",
      "Commercial model, investor materials, diligence and strategic discussions.",
    ],
  },
  {
    slug: "bittensor-autoresearch",
    index: "02",
    name: "Bittensor AutoResearch",
    category: "Autonomous quantitative research system",
    role: "Creator & System Designer",
    description:
      "Designed and built an end-to-end quantitative research system for Bittensor subnet markets, combining market-data infrastructure, feature engineering, machine-learning models, portfolio simulation and recursive LLM-assisted experimentation.",
    tags: ["Machine learning", "Quantitative research", "Python", "Autonomous systems"],
    visual: "research",
    detail: [
      "Canonical market datasets, feature engineering and reproducible experiment outputs.",
      "Model training with leakage controls and walk-forward or out-of-sample evaluation.",
      "Portfolio-policy simulation and investigation of model generalisation and system failure.",
      "Bounded LLM API workflows used to propose or implement research improvements.",
    ],
  },
  {
    slug: "dusd",
    index: "03",
    name: "DUSD.fun",
    category: "Live market intelligence product",
    role: "Creator & Product Lead, DUSD.fun",
    description:
      "Independently designed, built and operated the public product and market-intelligence layer for DUSD, combining live telemetry, analytics, information design and market storytelling.",
    tags: ["Product strategy", "Full-stack web product", "Live market data", "Information design"],
    visual: "market",
    detail: [
      "Product strategy, information architecture and design direction.",
      "Live burn telemetry, supply analytics and market data.",
      "Monetary comparison tools and interactive valuation scenarios.",
      "Implementation and ongoing operation of the public website.",
    ],
  },
  {
    slug: "one-click-labs",
    index: "04",
    name: "One Click Labs",
    category: "Quantitative DeFi product",
    role: "Product Manager & Quantitative Analyst",
    description:
      "Worked across product development, data infrastructure and quantitative research to make fragmented DeFi yield opportunities easier to discover, compare and combine into risk-aware portfolios.",
    tags: ["Product management", "API integrations", "Portfolio optimisation", "Risk modelling"],
    visual: "portfolio",
    detail: [
      "Product definition and portfolio-building workflow.",
      "API integrations, market-data pipelines and normalisation.",
      "Risk, return, correlation and efficient-frontier research.",
      "Live strategy analysis and coordination across technical delivery.",
    ],
  },
];

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Product Ownership",
    description: "Turning an incomplete idea into a defined product, an executable plan and a working release.",
    items: ["Discovery", "Strategy", "Specifications", "Prioritisation", "Engineering coordination", "Iteration", "Product economics"],
  },
  {
    index: "02",
    title: "Commercial Execution",
    description: "Finding where the opportunity is, creating the right conversation and converting interest into practical next steps.",
    items: ["Market research", "Outreach", "Customer conversations", "Positioning", "Pricing", "Partnerships", "Investor communication", "Commercial modelling"],
  },
  {
    index: "03",
    title: "Technical Systems",
    description: "Building and directing the systems required to test ideas, automate work and produce usable products.",
    items: ["Python", "APIs", "Data pipelines", "Automation", "Quantitative models", "ML evaluation", "AI-assisted workflows", "Web products"],
  },
  {
    index: "04",
    title: "Operations & Strategy",
    description: "Creating structure where responsibilities, information and decisions are still unclear.",
    items: ["Ambiguous problem solving", "Operational design", "Financial modelling", "Risk analysis", "Stakeholder coordination", "Decision frameworks", "Cross-functional ownership"],
  },
];

export const experiences: Experience[] = [
  {
    organisation: "VOID",
    environment: "Early-stage venture",
    role: "Founding Product, Operations & Commercial Lead",
    description:
      "Worked across product direction, engineering delivery, operational ownership, financial and risk architecture, commercial modelling, partnerships and investor engagement for an early-stage AI credit infrastructure venture.",
  },
  {
    organisation: "KPMG",
    environment: "Global professional services",
    role: "Financial Services Assurance",
    proof: "Two years in Financial Services Assurance at KPMG",
    description:
      "Owned client workstreams across regulated financial-services environments, analysing technology-enabled processes, controls, data flows, operational risks and remediation requirements.",
  },
  {
    organisation: "One Click Labs",
    environment: "Quantitative DeFi company",
    role: "DeFi Product Manager & Quantitative Analyst",
    description:
      "Worked across quantitative product development, data infrastructure, backtesting, portfolio optimisation, risk analysis and live on-chain investment products.",
  },
  {
    organisation: "Gartner",
    environment: "Commercial technology organisation",
    role: "Account Manager, Nordic Market",
    description:
      "Worked with Nordic emerging-technology companies across prospecting, discovery and commercial engagement, generating more than $150,000 in potential contract value.",
  },
];

export const principles = [
  ["01", "Find the real constraint", "Most problems are misdiagnosed before they are badly solved."],
  ["02", "Build the system, not just the feature", "The product is the interaction between technology, incentives, behaviour, operations and economics."],
  ["03", "Ship to create information", "A functioning system produces better evidence than another round of abstract planning."],
  ["04", "Own the outcome", "The quality of decisions changes when responsibility extends beyond completing a narrow task."],
] as const;

export const contact = {
  email: "eirik.otis@outlook.com",
  linkedin: "https://www.linkedin.com/in/eirik-otis",
  github: "https://github.com/Eirikotis",
} as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
