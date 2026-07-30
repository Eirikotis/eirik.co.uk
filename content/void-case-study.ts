export const voidCaseStudy = {
  eyebrow: "FINANCIAL INFRASTRUCTURE VENTURE",
  title: "VOID",
  role: "Founding Product & Commercial Lead",
  headline: "Designing the credit layer for a new digital asset economy.",
  description:
    "A cross-chain credit system designed to turn emerging network assets into productive collateral—combining lending markets, risk-curated vaults, automated underwriting and institutional-grade operating infrastructure.",
  summary:
    "Led the product, commercial and operating development of a cross-chain credit infrastructure venture for Bittensor, the world’s largest decentralised AI network.",
  supportingDescription:
    "I owned the product concept, architecture, roadmap, budget, engineering delivery, market design, underwriting framework, commercial model and investor process—working across an eight-person development team and an external technical lead.",
  metadata: [
    "Product architecture",
    "Engineering leadership",
    "Quantitative risk",
    "Commercial modelling",
    "Investor diligence",
    "Eight-person development team",
  ],
  opportunityStatement:
    "The product opportunity was not merely lending. It was creating the underwriting, liquidity and operating standards required for an emerging asset class to support credit.",
  responsibilityStatement:
    "I was responsible for making the product technically coherent, economically viable and commercially investable.",
  outcomeConclusion: "The opportunity was real. The timing was early.",
} as const;

export const opportunityGroups = [
  { audience: "Asset holders", outcome: "Borrow without selling" },
  { audience: "Lenders", outcome: "Earn risk-curated yield" },
  { audience: "Professional managers", outcome: "Construct credit strategies" },
  { audience: "The wider network", outcome: "Use capital more efficiently" },
] as const;

export const ownershipAreas = [
  {
    index: "01",
    title: "Product and market design",
    items: [
      "Defined the product concept",
      "Designed lender and borrower journeys",
      "Selected the lending and vault architecture",
      "Prioritised product scope and roadmap",
      "Translated the commercial opportunity into buildable systems",
    ],
  },
  {
    index: "02",
    title: "Engineering delivery",
    items: [
      "Managed venture-side delivery across an eight-person development team",
      "Worked through an external technical lead",
      "Defined acceptance criteria and delivery deadlines",
      "Owned scope, budget and prioritisation",
      "Reviewed frontend, backend and smart-contract progress",
    ],
  },
  {
    index: "03",
    title: "Risk and financial architecture",
    items: [
      "Designed the market-risk framework",
      "Developed collateral eligibility and debt-cap logic",
      "Designed liquidation-first underwriting",
      "Modelled AMM liquidity and stressed execution",
      "Built pricing, fee and revenue models",
    ],
  },
  {
    index: "04",
    title: "Commercial execution",
    items: [
      "Created the pitch deck and commercial materials",
      "Authored lending and commercial technical documentation",
      "Led investor meetings and product demonstrations",
      "Managed diligence and strategic follow-up",
      "Structured milestone-gated financing around technical readiness",
    ],
  },
] as const;

export const productFlow = [
  "Lenders",
  "Curated credit vaults",
  "Isolated lending markets",
  "Borrowers post collateral",
  "Oracle + risk controls",
  "Automated liquidation",
] as const;

export const systemArchitecture = [
  "Bittensor assets",
  "Bridge and router",
  "Yield-bearing collateral",
  "Morpho lending markets",
] as const;

export const underwritingPipeline = [
  "Live market data",
  "Liquidity and stress analysis",
  "Collateral eligibility",
  "LTV and debt cap",
  "Approve · Limit · Reject",
] as const;

export const underwritingClassification = [
  { label: "Core Launch", value: 20, tone: "core" },
  { label: "Extended Rollout", value: 40, tone: "extended" },
  { label: "Manual Review", value: 5, tone: "review" },
  { label: "Rejected", value: 63, tone: "rejected" },
] as const;

export const underwritingFactors = [
  "Pool reserve depth",
  "Flow volatility",
  "Price impact",
  "Concentrated sell scenarios",
  "Liquidation execution",
  "Manipulation and shorting risk",
  "Collateral buffers",
  "Debt capacity",
  "Market lifecycle rules",
] as const;

export const ventureWorkstreams = [
  { label: "Product", detail: "Architecture, roadmap and user journeys" },
  { label: "Engineering", detail: "Delivery, acceptance and readiness" },
  { label: "Risk", detail: "Underwriting, liquidity and controls" },
  { label: "Commercial", detail: "Economics, diligence and financing" },
] as const;

export const durableResults = [
  "A functioning cross-chain credit architecture",
  "An eight-person engineering delivery process",
  "A complete product and market design",
  "A quantitative underwriting framework",
  "Institutional commercial and diligence materials",
  "Direct experience taking frontier infrastructure from concept toward financing",
] as const;

export const demonstrations = [
  {
    title: "Product leadership",
    description: "Defining and delivering a complex product across multiple systems.",
  },
  {
    title: "Engineering management",
    description: "Directing scope, budget, acceptance criteria and delivery through a specialist team.",
  },
  {
    title: "Quantitative commercial judgement",
    description: "Connecting risk capacity, product economics and market strategy.",
  },
  {
    title: "Venture execution",
    description: "Turning an idea into technical infrastructure and an institutional financing proposition.",
  },
] as const;
