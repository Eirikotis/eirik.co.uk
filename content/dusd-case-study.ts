export const dusdCaseStudy = {
  eyebrow: "LIVE MARKET PRODUCT",
  title: "DUSD.fun",
  role: "Creator & Product Lead",
  headline: "Making deflation visible.",
  description:
    "A live market-intelligence product tracking supply contraction, burn activity and the evolving monetary story of a community-run token on Solana.",
  summary:
    "Independently designed, built and operated the public product and market-intelligence layer for DUSD, a community-run deflationary token whose trading fees fund recurring buybacks and permanent supply burns.",
  ownership:
    "I created and operate DUSD.fun, the product and analytics layer for the wider community-run project.",
  liveUrl: "https://dusd.fun",
  marketUrl: "https://dusd.fun",
  metadata: [
    "Product strategy",
    "Full-stack web product",
    "Live market data",
    "Analytics",
    "Information design",
    "Brand direction",
  ],
  ownershipStatement:
    "I owned the product strategy, information architecture, design direction, data presentation and implementation of the entire public website.",
  closing:
    "DUSD.fun demonstrates how a small underlying mechanism can become a much stronger product when data, design, narrative and technical execution are treated as one system.",
} as const;

export const productAreas = [
  {
    index: "01",
    title: "Live telemetry",
    items: ["Supply burned", "Circulating supply", "Burn value and velocity", "Holder and market information", "Supply movement", "Transaction feed"],
  },
  {
    index: "02",
    title: "Market intelligence",
    items: ["Price and liquidity", "Volume and trading activity", "Interactive time windows", "Market charts", "Trading pathways"],
  },
  {
    index: "03",
    title: "Monetary comparison",
    items: ["DUSD supply contraction", "Bitcoin issuance", "Gold production", "US M2 expansion", "Indexed supply curves", "DUSD relative to US M2"],
  },
  {
    index: "04",
    title: "Interactive product tools",
    items: ["Monetary-scale comparisons", "Market-cap parity scenarios", "Position calculator", "Live burn ledger", "Community pathways"],
  },
] as const;

export const screenshots = [
  {
    id: "telemetry",
    src: "/dusd/burn-telemetry.png",
    width: 2140,
    height: 1019,
    alt: "DUSD.fun burn telemetry dashboard showing supply burned, circulating supply, burn value, supply distribution and burn momentum.",
    caption: "Live supply, burn and market telemetry derived from on-chain and market data.",
  },
  {
    id: "scarcity",
    src: "/dusd/monetary-supply.png",
    width: 2314,
    height: 1187,
    alt: "DUSD.fun scarcity interface comparing indexed DUSD supply with Bitcoin issuance, gold production and US M2.",
    caption: "Turning an abstract scarcity claim into an observable comparison across monetary systems.",
  },
  {
    id: "scale",
    src: "/dusd/monetary-scale.png",
    width: 2178,
    height: 1204,
    alt: "DUSD.fun monetary-scale interface with supply contraction, market-cap parity scenarios and an interactive holdings calculator.",
    caption: "Interactive tools for exploring scale and supply dynamics—not price forecasts.",
  },
] as const;

export const productDecisions = [
  {
    title: "Real data over promotional claims",
    description: "The interface centres verifiable burns, transaction signatures, supply changes and sourced comparison data.",
  },
  {
    title: "Storytelling through systems",
    description: "Live counters, indexed charts and supply comparisons express the scarcity narrative without relying on long marketing copy.",
  },
  {
    title: "A deliberate product hierarchy",
    description: "The experience moves from current supply and market activity into long-term scarcity, transaction evidence and participation.",
  },
  {
    title: "A distinctive visual identity",
    description: "Terminal styling reflects the live, on-chain system while retaining the structure of a serious analytics product.",
  },
  {
    title: "Conversion without becoming an advert",
    description: "Market charts, trading routes and community pathways remain accessible while the analytical product stays central.",
  },
] as const;

export const systemInputs = ["On-chain burns", "Market data", "External monetary data"] as const;
export const systemStages = ["Indexing and calculation", "Live product interface", "Understanding · Participation · Community"] as const;

export const strategyPoints = [
  "Defined the product narrative around observable supply contraction",
  "Selected the metrics that made the mechanism understandable",
  "Turned community activity into structured public information",
  "Connected technical data with market storytelling",
  "Maintained and evolved the product as the market changed",
  "Built a product that generates new information through each burn",
] as const;

export const demonstrations = [
  { title: "Independent product ownership", description: "Strategy, design, development, data and ongoing operation." },
  { title: "Technical execution", description: "Blockchain, market and monetary data translated into a responsive live web product." },
  { title: "Information design", description: "Complex supply and market dynamics made legible through hierarchy, interaction and visualisation." },
  { title: "Commercial positioning", description: "A differentiated narrative and repeatable destination built around a live market mechanism." },
] as const;
