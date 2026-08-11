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
    period: "2025–26",
    summary: "Product, research and strategy across decentralised AI markets.",
    detail: "Credit infrastructure, quantitative market research, compute and inference markets, subnet economics and product strategy.",
  },
  {
    slug: "dusd",
    name: "DUSD.fun",
    period: "2026",
    summary: "A live Solana market-data and supply analytics product.",
    detail: "Product design, on-chain data, web development, automation and ongoing public product operations.",
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
  status: "Part-qualified — 12 of 15 examinations completed",
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
  title: "DUSD.fun",
  period: "2026",
  role: "Independent product",
  description: "A live market-data and supply analytics product for a community-run Solana token.",
  overview: [
    "I independently designed, built and operate DUSD.fun. The product turns on-chain burn activity, supply changes and market data into a legible public interface.",
    "The emphasis is on observable data rather than promotional claims: live telemetry, historical supply and burn analytics, transaction evidence, monetary comparisons and interactive tools.",
  ],
  workedOn: ["Product strategy and information architecture", "Next.js and TypeScript implementation", "API and on-chain data integration", "Historical supply and burn analytics", "Interactive data visualisation", "Deployment, VPS/Linux operations and automation", "Ongoing product ownership"],
  status: "Live and actively operated. DUSD.fun is my product; I did not found the underlying token or community.",
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

export const dusdScreenshots = [
  { src: "/dusd/burn-telemetry.png", width: 2140, height: 1019, alt: "DUSD.fun dashboard showing live burn telemetry, supply distribution and burn momentum.", caption: "Live supply, burn and market telemetry." },
  { src: "/dusd/monetary-supply.png", width: 2314, height: 1187, alt: "DUSD.fun chart comparing supply dynamics across DUSD, Bitcoin, gold and US M2.", caption: "Historical supply and monetary comparison tools." },
  { src: "/dusd/monetary-scale.png", width: 2178, height: 1204, alt: "DUSD.fun interface showing monetary-scale comparisons and a position calculator.", caption: "Interactive scale and supply scenarios, presented as comparisons rather than forecasts." },
] as const;
