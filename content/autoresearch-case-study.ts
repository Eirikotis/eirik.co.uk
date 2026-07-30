export type ResearchArea = {
  index: string;
  title: string;
  summary: string;
  items: string[];
};

export type SystemLayer = {
  label: string;
  description: string;
};

export type Demonstration = {
  title: string;
  description: string;
};

export const autoresearchCaseStudy = {
  eyebrow: "INDEPENDENT QUANTITATIVE RESEARCH PROJECT",
  title: "Bittensor AutoResearch",
  category: "Autonomous quantitative research system",
  role: "Creator & System Designer",
  description:
    "An end-to-end system for researching whether machine-learning signals could predict relative performance across Bittensor subnet markets—and whether those signals survived realistic portfolio construction and unseen data.",
  summary:
    "Designed and built an end-to-end quantitative research system for Bittensor subnet markets, combining market-data infrastructure, feature engineering, machine-learning models, portfolio simulation and recursive LLM-assisted experimentation.",
  objective:
    "The objective was to create a repeatable system that could test market hypotheses, evaluate whether apparent predictive signals survived unseen data and translate model outputs into realistic portfolio decisions.",
  metadata: ["Python", "Ridge", "XGBoost", "LLM APIs", "Market-data pipelines", "Portfolio simulation"],
  ownership: [
    "Defining the research objective",
    "Designing the architecture and evaluation process",
    "Directing AI-assisted implementation",
    "Working with Python, data pipelines and model evaluation",
    "Selecting and comparing research approaches",
    "Reviewing outputs and challenging invalid assumptions",
    "Determining whether the system justified capital deployment",
  ],
} as const;

export const researchAreas: ResearchArea[] = [
  {
    index: "01",
    title: "Data infrastructure",
    summary: "A repeatable market-data foundation that could survive a changing network.",
    items: ["Canonical market datasets", "Cleaning and validation", "Repeatable data refreshes", "Subnet identity and lifecycle handling", "Feature-generation pipelines"],
  },
  {
    index: "02",
    title: "Machine-learning research",
    summary: "Comparable experiments focused on ranking relative market performance.",
    items: ["Ridge regression", "XGBoost", "Cross-sectional market ranking", "Multiple targets and feature groups", "Out-of-sample model evaluation"],
  },
  {
    index: "03",
    title: "Portfolio simulation",
    summary: "A policy layer that translated model output into capital decisions.",
    items: ["Candidate ranking", "Position sizing", "Liquidity constraints", "Trading costs", "AMM-based entry and exit simulation", "Residual capital held in TAO"],
  },
  {
    index: "04",
    title: "Recursive research workflow",
    summary: "Controlled iteration without outsourcing evaluation or judgement.",
    items: ["Bounded LLM proposals and implementation", "Deterministic tests and evaluation", "Repeatable experiment outputs", "Human review of assumptions and results"],
  },
];

export const architectureSteps = [
  "MARKET DATA",
  "CANONICAL DATASET",
  "FEATURE ENGINEERING",
  "RIDGE / XGBOOST",
  "OUT-OF-SAMPLE EVALUATION",
  "PORTFOLIO POLICY",
  "MARKET EXECUTION SIMULATION",
  "RETAIN · REJECT · INVESTIGATE",
] as const;

export const systemLayers: SystemLayer[] = [
  { label: "Human", description: "Objectives, architecture and judgement" },
  { label: "LLM", description: "Research proposals and implementation assistance" },
  { label: "System", description: "Tests, metrics, simulations and reproducible outputs" },
];

export const portfolioSteps = [
  "MODEL RANKINGS",
  "CONFIDENCE THRESHOLD",
  "POSITION SIZING",
  "LIQUIDITY AND RISK LIMITS",
  "SIMULATED EXECUTION",
] as const;

export const campaignMetrics = [
  { value: "231", label: "Engineered features" },
  { value: "1 · 3 · 7 · 14", label: "Target horizons, days" },
  { value: "2", label: "Model families" },
  { value: "100s", label: "Daily prediction origins" },
] as const;

export const attributionLayers = [
  { label: "Signal quality", state: "Forecast" },
  { label: "Candidate selection", state: "Ranking" },
  { label: "Position sizing", state: "Exposure" },
  { label: "Liquidity", state: "Capacity" },
  { label: "Execution costs", state: "Realisation" },
  { label: "Lifecycle accounting", state: "Continuity" },
  { label: "Market regime", state: "Stability" },
] as const;

export const demonstrations: Demonstration[] = [
  { title: "Technical systems building", description: "Turning a broad research idea into functioning infrastructure." },
  { title: "Quantitative judgement", description: "Separating model performance, portfolio construction and market execution." },
  { title: "AI-assisted development", description: "Using LLMs to accelerate implementation without outsourcing evaluation or judgement." },
  { title: "Research discipline", description: "Testing promising results against unseen data before committing capital." },
];
