export const oneClickLabsCaseStudy = {
  eyebrow: "QUANTITATIVE DEFI PRODUCT",
  title: "One Click Labs",
  role: "Product Manager & Quantitative Analyst",
  headline: "Applying portfolio thinking to fragmented DeFi yield markets.",
  description:
    "A quantitative product combining API-driven market data, risk analysis and portfolio optimisation to help users evaluate yield opportunities as part of a portfolio rather than as isolated APY figures.",
  summary:
    "Worked across product development, data infrastructure and quantitative research to make fragmented DeFi yield opportunities easier to discover, compare and combine into risk-aware portfolios.",
  centralLine: "The highest advertised yield was rarely the best portfolio decision.",
  roleStatement: "My role sat between the data, the model and the user-facing product.",
  metadata: ["Product management", "API integrations", "DeFiLlama", "Python", "Portfolio optimisation", "Risk modelling"],
  continuationUrl: "https://www.yieldnetwork.io",
  closing:
    "One Click Labs was where I first combined product ownership, market-data systems and quantitative finance inside a live emerging-market product.",
} as const;

export const comparisonFactors = [
  "Protocol and smart-contract risk",
  "Asset volatility",
  "Liquidity and withdrawal constraints",
  "Yield instability and incentive dependence",
  "Impermanent loss",
  "Concentration",
  "Blockchain and bridge exposure",
] as const;

export const workAreas = [
  {
    index: "01",
    title: "Data and API infrastructure",
    items: ["DeFiLlama and protocol APIs", "Python and SQL workflows", "Extraction, cleaning and normalisation", "Historical APY and TVL data", "Validation and exception handling"],
  },
  {
    index: "02",
    title: "Quantitative research",
    items: ["Expected return estimation", "Volatility and downside analysis", "Strategy correlation", "Risk scoring", "Efficient-frontier construction", "Backtesting and portfolio comparison"],
  },
  {
    index: "03",
    title: "Product development",
    items: ["User and product requirements", "Portfolio-building workflow", "Quantitative outputs translated into features", "Data, research and interface prioritisation", "Product and technical coordination"],
  },
  {
    index: "04",
    title: "Live strategy management",
    items: ["Active yield-strategy monitoring", "Yield and risk reassessment", "Market feedback applied to allocation logic", "Model outputs connected with practical decisions"],
  },
] as const;

export const pipelineSteps = [
  "DeFi protocols + DeFiLlama",
  "API ingestion",
  "Cleaning and normalisation",
  "Yield + risk features",
  "Portfolio optimisation",
  "Backtest and review",
  "User-facing portfolio",
] as const;

export const frontierPoints = [
  { x: 19, y: 71, label: "Lending" },
  { x: 32, y: 61, label: "Staking" },
  { x: 45, y: 49, label: "Vault" },
  { x: 60, y: 34, label: "LP strategy" },
  { x: 72, y: 25, label: "Incentivised pool" },
] as const;

export const ammInputs = ["Trading fees", "Token price movement", "Pool rebalancing", "Impermanent loss"] as const;

export const evolutionStages = [
  { label: "One Click Labs", detail: "Yield discovery and portfolio optimisation" },
  { label: "Market evolution", detail: "Greater demand for structured distribution and liquidity" },
  { label: "Yield Network", detail: "Active yield and on-chain liquidity platform" },
] as const;

export const demonstrations = [
  { title: "Quantitative product thinking", description: "Turning financial theory into product logic and user decisions." },
  { title: "Data systems", description: "Integrating, cleaning and structuring fragmented API data from live markets." },
  { title: "Financial modelling", description: "Applying risk, return, correlation and portfolio optimisation to new asset structures." },
  { title: "Cross-functional execution", description: "Working between research, product, engineering and live investment activity." },
] as const;
