export const profile = {
  name: "Eirik Otis",
  location: "London, UK",
  email: "eirik.otis@outlook.com",
  linkedin: "https://www.linkedin.com/in/eirik-otis",
  github: "https://github.com/Eirikotis",
} as const;

export const primaryWork = [
  {
    slug: "bittensor",
    name: "Bittensor",
    period: "2025–2026",
    summary: "Product, market strategy and research across decentralised AI.",
    detail: "Credit infrastructure, quantitative market research, compute and inference markets, subnet economics, partnerships and product strategy.",
  },
  {
    slug: "kpmg",
    name: "KPMG UK",
    period: "2024–26",
    summary: "Financial services, systems and client delivery.",
    detail: "Work across banks, hedge funds, asset managers, private equity, pensions and large fintechs, spanning financial processes, technology, data, controls and operational risk.",
  },
  {
    slug: "dusd",
    name: "dusd.fun",
    period: "2026",
    summary: "A live Solana market-data and supply analytics product.",
    detail: "Product design, on-chain data, web development, automation and ongoing public product operations, reaching around 300 unique daily visitors.",
  },
  {
    slug: "one-click-labs",
    name: "One Click Labs",
    period: "2021–24",
    summary: "Product and quantitative work across DeFi investment infrastructure.",
    detail: "APIs, data pipelines, portfolio optimisation, risk research and financial product development.",
  },
] as const;

export const experience = [
  {
    organisation: "KPMG UK",
    role: "Associate, Financial Services Assurance",
    period: "Sep 2024 – Jul 2026",
    description: "Owned client workstreams across regulated financial-services engagements, including process walkthroughs, data flows, reconciliations, controls, operational risk and technology-enabled workflows.",
    href: "/work/kpmg/",
  },
  {
    organisation: "Bittensor ecosystem",
    role: "Independent product, market strategy and research",
    period: "2025–2026",
    description: "Led serious independent and venture-backed work across decentralised AI markets, including credit infrastructure, quantitative research systems, compute and inference markets, partnerships, commercial models and ecosystem strategy. This work was within the Bittensor ecosystem, not employment by Bittensor or Opentensor.",
    href: "/work/bittensor/",
  },
  {
    organisation: "One Click Labs",
    role: "Product and Quantitative Analyst",
    period: "Oct 2021 – May 2024",
    description: "Worked directly with founders across DeFi product development, market-data infrastructure, portfolio research, backtesting and live investment analysis.",
    href: "/work/one-click-labs/",
  },
  {
    organisation: "Gartner",
    role: "Account Manager Intern, Nordic Market",
    period: "Jun 2023 – Aug 2023",
    description: "Supported prospecting, discovery and commercial engagement with Nordic emerging-technology companies, generating more than $150,000 in potential contract value.",
  },
] as const;

export const education = {
  institution: "University of Warwick / Warwick Business School",
  qualification: "BSc Accounting & Finance",
  result: "Upper Second-Class Honours (2:1), 69%",
  note: "Future Leaders Scholarship",
} as const;

export const qualification = {
  name: "ICAEW ACA",
  status: "12 of 15 examinations completed · all passed first time",
} as const;

export const kpmg = {
  title: "KPMG UK",
  period: "2024–26",
  role: "Associate, Financial Services Assurance",
  description: "Financial services, systems and client delivery across complex regulated institutions.",
  overview: [
    "KPMG gave me broad exposure to how large financial institutions operate across finance, operations, technology, risk and reporting. I worked across engagements spanning banks, hedge funds, asset managers, private equity, pensions and large fintech businesses.",
    "The work involved understanding technology-enabled financial and operational processes end to end: leading walkthroughs and client workstreams, analysing evidence and exceptions, assessing controls and data-quality issues, and translating findings into clear conclusions and remediation actions.",
  ],
  environments: ["Banks", "Hedge funds", "Asset managers", "Private equity", "Pensions", "Fintech"],
  systems: ["Process walkthroughs", "Financial processes", "Operational workflows", "Technology-enabled controls", "Data flows", "Reconciliations", "Reporting", "Exception management", "Risk and remediation"],
  stakeholders: ["Finance", "Operations", "Risk", "Technology", "Management"],
  process: [
    { label: "Clients & markets", items: "Products, counterparties and market context" },
    { label: "Commercial model", items: "Revenue, costs, incentives and dependencies" },
    { label: "Operations", items: "Ownership, workflows, handoffs and exceptions" },
    { label: "Systems & data", items: "Platforms, data flows and reconciliations" },
    { label: "Financial reporting", items: "Outputs, evidence and management information" },
  ],
  operatingRisk: ["Failure modes", "Control gaps", "Data integrity", "Financial exposure"],
  processOutcome: "Prioritised findings, remediation and clearer accountability",
} as const;

export const bittensorWorkstreams = [
  {
    id: "void",
    index: "01",
    title: "Credit infrastructure / VOID",
    summary: "A cross-chain credit infrastructure venture designed around Bittensor subnet assets as collateral.",
    paragraphs: [
      "The product combined isolated Morpho lending markets with cross-chain collateral handling, oracle and liquidation infrastructure, and market-specific underwriting. I worked as Product & Commercial Lead across product architecture, requirements, roadmap, financial design and engineering coordination.",
      "I also developed market-capacity and risk analysis, commercial materials and investor and partner work. The core system reached functional implementation and detailed strategic discussions, but did not complete a fundraise or progress to a scaled public launch.",
    ],
    items: ["Product architecture and requirements", "Lending, collateral and liquidation design", "Quantitative underwriting", "Engineering coordination", "Commercial modelling and diligence"],
  },
  {
    id: "autoresearch",
    index: "02",
    title: "Quantitative market research / AutoResearch",
    summary: "A reproducible research system for testing predictive signals across Bittensor subnet markets.",
    paragraphs: [
      "I built data pipelines, 231 engineered features, machine-learning experiments and portfolio simulations across 1, 3, 7 and 14-day horizons. Evaluation used walk-forward prediction origins, frozen holdouts and explicit controls against information leakage.",
      "LLM-assisted workflows helped propose and implement bounded experiments while research objectives and deployment decisions remained human responsibilities. The infrastructure worked; the evidence was not stable enough to claim reliable, deployable alpha.",
    ],
    items: ["Python market-data pipelines", "Ridge and XGBoost experiments", "Walk-forward and holdout evaluation", "Backtesting and portfolio simulation", "Bounded LLM-assisted research"],
  },
  {
    id: "compute",
    index: "03",
    title: "Compute & inference markets",
    summary: "Research and product work around decentralised compute supply, inference delivery and subnet architecture.",
    paragraphs: [
      "The work examined how node and executor economics, verification, service quality and incentives shape viable decentralised compute and inference markets. It included competitive analysis, product architecture and go-to-market questions.",
      "Public naming remains generic here because the underlying organisation and project name are not established by the approved public context.",
    ],
    items: ["Compute-market structure", "Node and executor economics", "Verification and service quality", "Competitive research", "Product positioning and go-to-market"],
  },
  {
    id: "market-design",
    index: "04",
    title: "Ecosystem & market design",
    summary: "Research connecting subnet incentives, token economics and product strategy.",
    paragraphs: [
      "Across the workstreams, I analysed how subnet incentives, alpha-token markets, competitive dynamics and ecosystem changes affected product feasibility and commercial positioning.",
    ],
    items: ["Subnet economics", "Token incentives", "Market structure", "Competitive landscape", "Product and commercial strategy"],
  },
] as const;

export const dusd = {
  title: "dusd.fun",
  period: "2026",
  role: "Independent product",
  description: "A live Solana analytics product and production creator-revenue buyback-and-burn system.",
  overview: [
    "I independently designed, built and operate dusd.fun: the public analytics product and the backend infrastructure that converts creator revenue into verifiable DUSD purchases and burns.",
    "A Node.js and TypeScript service runs on a fixed systemd schedule. It inspects Pump creator rewards, preserves an operational SOL reserve, constructs a fresh Jupiter route, validates and simulates the versioned transaction, signs and confirms the purchase, then burns the complete verified DUSD balance with SPL Token burnChecked. The public product turns those on-chain events into live telemetry, historical supply analysis and transaction evidence for around 300 unique visitors per day.",
  ],
  technicalControls: [
    "Decoded validation of Jupiter versioned transactions: mints, accounts, signers, writable permissions, programs, slippage, compute budget and priority-fee ceiling",
    "Pre-signing and signed simulation, local Ed25519 signature verification and identical-byte rebroadcasting while a blockhash remains valid",
    "Persistent state machine, signature-first persistence, exclusive process locking and atomic state writes for deterministic crash recovery",
    "Conservative expiry handling: a replacement is built only after the original signature is proven expired and absent from full transaction history",
    "Hardened unprivileged systemd service with LoadCredential, restricted filesystem access and root-owned production artifacts",
    "60 automated tests across 19 files covering transaction policy, signing, landing, recovery, persistence, secrets and deployment",
  ],
  workedOn: ["Product strategy and information architecture", "Next.js market-data and supply analytics", "Node.js and TypeScript Solana automation", "Pump creator-reward and Jupiter Swap integration", "Versioned-transaction validation and simulation", "SPL Token burnChecked execution", "State-machine recovery and idempotent transaction landing", "Hardened Ubuntu/systemd deployment", "Ongoing product and infrastructure ownership"],
  status: "Live and actively operated. The analytics product and unattended burn infrastructure run in production; dusd.fun is my product, but I did not found the underlying token or community.",
  liveUrl: "https://dusd.fun",
} as const;

export const oneClickLabs = {
  title: "One Click Labs",
  period: "2021–24",
  role: "Product and Quantitative Analyst",
  description: "Product and quantitative financial infrastructure for comparing and constructing DeFi yield portfolios.",
  overview: [
    "One Click Labs brought fragmented DeFi market data into a common decision framework. My work sat between founder priorities, data infrastructure, quantitative research and the user-facing product.",
    "The objective was not to rank opportunities by advertised APY. It was to compare return sources, volatility, liquidity, protocol exposure and portfolio interactions across lending, staking, automated vault and AMM markets.",
  ],
  workedOn: ["Founder-facing product definition and iteration", "DeFiLlama and protocol API integrations", "Python and SQL data pipelines", "Data cleaning, normalisation and validation", "Portfolio optimisation and capital allocation", "Monte Carlo, volatility and risk analysis", "Backtesting and live strategy monitoring"],
  status: "The work contributed to the company’s broader evolution toward what now operates as Yield Network. I do not claim to have built or currently operate that later product.",
} as const;
