# Live on-chain analytics and automation (dusd.fun)

## Product and ownership

This is a live on-chain market-intelligence and automation product around a community/meme token on Solana with fee-funded buy-and-burn mechanics. The product is called dusd.fun; Eirik independently designed, built and operates it. It has reached around 300 unique daily visitors and has continued to grow.

dusd.fun is Eirik's product and analytics layer. He did not found the underlying DUSD token or its community. Do not blur product ownership with token/community founding.

The underlying DUSD token is accurately described as a community or meme token. If asked, say so directly while distinguishing the token from the serious analytics and transaction-automation product Eirik built around it.

## Public product

The web product turns on-chain events and market data into live telemetry, historical supply analysis and transaction evidence. It includes:

- supply burned and circulating supply;
- burn value, velocity and recent events;
- holder and market information;
- historical transaction data;
- price, liquidity, volume and trading activity;
- interactive time windows and market charts;
- monetary comparisons with Bitcoin issuance, gold production and US M2;
- indexed supply curves and DUSD-relative-to-M2 views;
- market-cap parity scenarios and a position calculator;
- links to market and community pathways.

Eirik owned the product strategy, information architecture, visual direction, metric selection, interface implementation, deployment and ongoing operation. The design emphasises verifiable events rather than unsupported promotional claims.

## Technology and infrastructure

The public product uses Next.js, TypeScript, APIs, on-chain data, historical transaction data and responsive information design. It is deployed and operated on Linux/VPS infrastructure.

Eirik also designed, built and operates the production creator-revenue buyback-and-burn automation behind the product. A Node.js and TypeScript service runs on a fixed systemd schedule. It:

1. inspects Pump creator rewards and vault state;
2. preserves an operational SOL reserve and fee floor;
3. claims rewards above threshold;
4. requests a fresh Jupiter swap route;
5. decodes and validates the versioned transaction;
6. simulates, finalises and signs the purchase;
7. verifies the Ed25519 signature locally;
8. rebroadcasts identical signed bytes until confirmation or definitive expiry;
9. verifies the resulting token account;
10. burns the complete verified DUSD balance using SPL Token `burnChecked`;
11. atomically persists signatures, supply information and pipeline state.

## Production safety controls

- validates mints, accounts, signers, writable permissions, programs, slippage, compute budget and priority-fee ceilings in Jupiter versioned transactions;
- performs pre-signing and signed simulation;
- uses signature-first persistence and an explicit persisted state machine;
- uses exclusive process locking and atomic state writes for deterministic recovery;
- does not replace an ambiguous transaction until the original signature is proven expired and absent from full transaction history;
- runs as a hardened unprivileged systemd service using `LoadCredential`, restricted filesystem access and root-owned production artifacts;
- has 60 automated tests across 19 files covering transaction policy, signing, landing, recovery, persistence, secrets and deployment.

The product and unattended burn infrastructure are live and actively maintained.
