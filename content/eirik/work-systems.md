# Canonical work systems

Use this compact layer for broad questions about what Eirik has built. Explain each system before giving its internal name. Preserve the ownership distinction: "personally built" means substantial direct implementation; "led product development" means he owned product, financial/risk architecture, requirements and delivery while specialist engineers implemented significant components; "contributed to" means narrower or shared ownership.

For a broad build inventory, prioritise substantive complexity, depth of ownership and relevance to Eirik's current direction—not merely which project he coded alone. Lead with the Bittensor credit protocol, then the automated quantitative research system. Briefly add decentralised compute/inference work, dusd.fun and One Click Labs after those. Do not lead with dusd.fun and do not give every item equal space. A good default is two short substantive paragraphs for the leading systems followed by one compact paragraph covering the remaining work. This is a relevance hierarchy for broad build questions, not a fixed order for every topic.

For a financial-products question, lead with the credit protocol and then the quantitative DeFi investment infrastructure at One Click Labs; omit unrelated systems unless they clarify the answer.

## Credit protocol for Bittensor assets

- Project name: VOID (name is secondary)
- Category: financial infrastructure, lending, product and quantitative risk
- Plain-English summary: a credit protocol for Bittensor built on Morpho isolated lending markets. It was designed to let Bittensor subnet assets support borrowing through isolated collateral markets rather than treating them as generic liquid tokens.
- Eirik's role and ownership: Eirik led product and commercial development. He defined the product, system architecture, user flows, requirements, roadmap, acceptance criteria and financial model, and coordinated an eight-person development team plus an external technical lead. He reviewed delivery but did not personally write every production component.
- Core system: collateral onboarding; loan-to-value and debt-cap methodology; market capacity and liquidity analysis; oracle, bridge, router and liquidation architecture; stressed execution and price-impact analysis; interest, fee and revenue economics; monitoring; cross-chain considerations; investor and partner work.
- Status and boundaries: substantial funded product, engineering-delivery and quantitative-risk work reached functional implementation and serious strategic discussions. It did not complete an external fundraise, scaled institutional launch, or produce scaled TVL/revenue.
- Retrieval concepts: credit, lending, Morpho, collateral, oracle, liquidation, financial infrastructure, Bittensor, product architecture, quantitative risk.

## Automated quantitative research for frontier markets

- Project name: Bittensor AutoResearch (name is secondary)
- Category: quantitative research, machine learning, data and market systems
- Plain-English summary: a research system Eirik personally built to search systematically for predictive signals and potential alpha in rapidly changing Bittensor subnet markets, then test whether those signals survived unseen data and realistic portfolio constraints.
- Eirik's role and ownership: he set the research objective, designed the architecture and evaluation framework, worked directly with Python and the data/model pipeline, directed bounded AI-assisted implementation, reviewed experiments and retained responsibility for deployment decisions.
- Core system: market-data ingestion and canonical history covering price, liquidity, flows, incentives/emissions, lifecycle and market structure; 231 engineered features; regularised and tree/boosting models; expanding-window and walk-forward evaluation; frozen out-of-time holdouts and leakage controls; portfolio construction, position sizing, trading-cost and AMM execution simulation; regime analysis; automated research campaigns; reproducible experiment artefacts.
- Conceptual loop: market data → features and hypotheses → models → out-of-sample testing → portfolio simulation → evaluation → next experiment.
- Status and boundaries: the infrastructure worked and produced a rigorous research process. Results did not justify claiming stable, profitable deployable alpha.
- Retrieval concepts: quant, ML, alpha research, signals, features, backtesting, holdout, walk-forward, portfolio simulation, data pipeline, frontier markets.

## Decentralised compute and model inference

- Category: AI infrastructure, compute markets, inference and commercial systems
- Plain-English summary: professional work on markets that aggregate independent GPU/compute suppliers to serve AI-model training or inference, with incentives and verification used to coordinate supply quality.
- Eirik's role and ownership: product, market and commercial work rather than a claim that he personally operated every node or built an entire production network. He analysed node/executor economics, supply aggregation, utilisation, service quality, verification, incentives, product positioning, competitive dynamics, partnerships and go-to-market.
- Status and boundaries: this included paid professional work within the Bittensor ecosystem, including work compensated through a Bittensor subnet, alongside venture and independent ecosystem work. Specific non-public project or subnet names should not be invented or disclosed.
- Retrieval concepts: AI infrastructure, GPU, compute, inference, supplier aggregation, miners, validators, executors, verification, incentives, partnerships.

## Live on-chain analytics and transaction automation

- Project name: dusd.fun (name is secondary)
- Category: web product, market intelligence, Solana data and transaction automation
- Plain-English summary: a live analytics and automation layer around a community/meme token on Solana with fee-funded buy-and-burn mechanics. It turns on-chain events and market data into understandable supply, burn, liquidity and transaction evidence.
- Eirik's role and ownership: he independently designed, built, deployed and operates the product and its production automation. The web product uses Next.js, TypeScript, APIs, on-chain and historical transaction data, interactive charts and calculators. The unattended Node.js service claims creator rewards above guarded thresholds, obtains and validates swap routes, simulates and signs transactions, rebroadcasts safely through ambiguity, verifies balances, burns tokens and persists recoverable state.
- Operations: Linux/VPS and systemd deployment, monitoring, process locking, atomic state, idempotent recovery, transaction-policy controls and automated tests.
- Status and boundaries: live, actively maintained and around 300 unique daily visitors. The underlying DUSD token is a community/meme token. Eirik built the analytics/automation product around it; he did not found the token or community. Do not deny the token's meme/community status or turn the product into a new monetary system.
- Retrieval concepts: Solana, on-chain analytics, market data, burn telemetry, automation, transactions, APIs, Next.js, TypeScript, VPS.

## Quantitative DeFi investment infrastructure

- Company: One Click Labs
- Category: investment product, portfolio infrastructure, data and quantitative analysis
- Plain-English summary: infrastructure for comparing fragmented DeFi yield and market opportunities within a portfolio rather than ranking advertised returns in isolation.
- Eirik's role and ownership: as Product and Quantitative Analyst, he contributed across founder-facing product work, protocol/API data infrastructure, quantitative methods and live investment analysis. This was shared company work, not a claim that he alone built the entire product.
- Core system: protocol APIs; Python and SQL ingestion, cleaning and validation; lending-market and AMM-liquidity data; expected returns, volatility, downside and risk scoring; correlations, portfolio optimisation and efficient frontiers; Monte Carlo analysis; backtesting; capital allocation, monitoring, performance comparison and product economics.
- Status and boundaries: the company later evolved into Yield Network; Eirik does not claim ownership of that later product.
- Retrieval concepts: DeFi, financial products, lending, APIs, data pipeline, portfolio optimisation, Monte Carlo, backtesting, risk, capital allocation.
