import Link from "next/link";
import { BulletList, ContentSection, Eyebrow, NextWork, PageShell, WorkHeader } from "@/components/editorial";
import { bittensorWorkstreams, dusd, kpmg, oneClickLabs, qualification } from "@/content/portfolio";

function VoidArchitecture() {
  return (
    <figure className="evidence-figure architecture-figure">
      <figcaption><span>VOID architecture excerpt</span><small>Simplified product structure</small></figcaption>
      <div className="architecture-flow">
        <div><span>01</span><strong>Bittensor subnet collateral</strong></div><i>→</i>
        <div><span>02</span><strong>Oracle and risk layer</strong></div><i>→</i>
        <div><span>03</span><strong>Isolated lending market</strong></div><i>→</i>
        <div><span>04</span><strong>Controlled liquidation</strong></div>
      </div>
      <p>Morpho supplied the isolated lending core. Product-specific work concentrated on cross-chain collateral, underwriting, pricing and liquidation.</p>
    </figure>
  );
}

function ResearchEvidence() {
  return (
    <figure className="evidence-figure research-figure">
      <figcaption><span>Walk-forward evaluation</span><small>Training data expanded; future periods remained unseen</small></figcaption>
      <div className="research-lines">
        {[52, 64, 76].map((width, index) => <div key={width}><b>Fit 0{index + 1}</b><span style={{ width: `${width}%` }}>Train</span><i>Refit</i><em>Future</em></div>)}
      </div>
      <div className="research-metrics"><span><strong>231</strong> engineered features</span><span><strong>1 · 3 · 7 · 14</strong> day horizons</span><span><strong>100s</strong> of prediction origins</span></div>
    </figure>
  );
}

export function BittensorPage() {
  return (
    <PageShell>
      <main id="main" className="work-page">
        <WorkHeader title="Bittensor" role="Product, market strategy and research" period="2025–2026" description="Sustained professional work across decentralised AI markets, spanning credit infrastructure, quantitative research, compute and inference, ecosystem partnerships, and market design." />
        <ContentSection label="Overview" title="One ecosystem, several workstreams">
          <div className="prose"><p>Bittensor is a decentralised AI network made up of specialist markets for compute, inference, model intelligence, evaluation and other machine-learning services.</p><p>My work in the ecosystem has spanned financial infrastructure, quantitative market research, compute markets, product strategy and incentive design. I have worked independently and through related ventures; I have not been employed by Bittensor or Opentensor.</p></div>
        </ContentSection>
        {bittensorWorkstreams.map((stream) => (
          <section className="workstream content-width" id={stream.id} key={stream.id}>
            <div className="workstream-label"><span>{stream.index}</span><Eyebrow>Workstream</Eyebrow></div>
            <div className="workstream-main"><h2>{stream.title}</h2><p className="workstream-summary">{stream.summary}</p><div className="prose">{stream.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><BulletList items={stream.items} />{stream.id === "void" && <VoidArchitecture />}{stream.id === "autoresearch" && <ResearchEvidence />}</div>
          </section>
        ))}
        <ContentSection label="Current status" title="Evidence before deployment">
          <div className="prose"><p>The work produced functional infrastructure, research systems and product decisions. It did not produce a completed VOID fundraise, a scaled institutional launch or proof of profitable AutoResearch alpha.</p><p>The common thread was treating ecosystem change, liquidity and incentive design as product constraints rather than background assumptions.</p></div>
        </ContentSection>
        <NextWork href="/work/kpmg/" label="KPMG UK" />
      </main>
    </PageShell>
  );
}

function KpmgProcess() {
  return (
    <figure className="kpmg-process" aria-labelledby="kpmg-process-title">
      <figcaption>
        <Eyebrow>Financial operating-system map</Eyebrow>
        <h2 id="kpmg-process-title">Assessing how financial businesses operate</h2>
        <p>Connecting commercial context, operating processes, technology and financial information to identify risk and support better decisions.</p>
      </figcaption>
      <div className="kpmg-process-flow">
        {kpmg.process.map((stage, index) => (
          <article className="kpmg-process-stage" key={stage.label}>
            <span>0{index + 1}</span>
            <strong>{stage.label}</strong>
            <p>{stage.items}</p>
          </article>
        ))}
      </div>
      <div className="kpmg-risk-layer">
        <strong>Operating risk</strong>
        <div>{kpmg.operatingRisk.map((risk) => <span key={risk}>{risk}</span>)}</div>
      </div>
      <div className="kpmg-process-outcome">
        <span>Outcome</span>
        <div><strong>Decision support</strong><p>{kpmg.processOutcome}</p></div>
      </div>
    </figure>
  );
}

export function KpmgPage() {
  return (
    <PageShell>
      <main id="main" className="work-page">
        <WorkHeader title={kpmg.title} role={kpmg.role} period={kpmg.period} description={kpmg.description} />
        <ContentSection label="Overview" title="Inside financial institutions">
          <div className="prose">{kpmg.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </ContentSection>
        <ContentSection label="Client environments" title="Breadth across financial services">
          <ul className="editorial-list" aria-label="Financial-services client environments">{kpmg.environments.map((environment) => <li key={environment}>{environment}</li>)}</ul>
        </ContentSection>
        <ContentSection label="What I worked on" title="Processes, systems and evidence">
          <div className="kpmg-groups">
            <div><Eyebrow>Financial & operational systems</Eyebrow><BulletList items={kpmg.systems} /></div>
            <div><Eyebrow>Stakeholders</Eyebrow><BulletList items={kpmg.stakeholders} /></div>
          </div>
        </ContentSection>
        <section className="kpmg-process-section content-width"><KpmgProcess /></section>
        <ContentSection label="Professional qualification" title={qualification.name}>
          <p className="qualification-line">{qualification.status}</p>
        </ContentSection>
        <NextWork href="/work/dusd/" label="dusd.fun" />
      </main>
    </PageShell>
  );
}

export function DusdPage() {
  const recentBurns = [10, 11, 9, 36, 100, 29, 9, 10];

  return (
    <PageShell>
      <main id="main" className="work-page">
        <WorkHeader title={dusd.title} role={dusd.role} period={dusd.period} description={dusd.description} />
        <section className="dusd-product-proof content-width" aria-label="Live product evidence">
          <div className="dusd-live-row"><Eyebrow>Live product</Eyebrow><a className="dusd-live-button" href={dusd.liveUrl} target="_blank" rel="noreferrer"><span aria-hidden="true" />Live now <b aria-hidden="true">↗</b></a></div>
          <div className="dusd-proof-grid">
            <div><Eyebrow>Audience</Eyebrow><strong>≈300 unique daily visitors</strong><p>And climbing.</p></div>
            <div><Eyebrow>Status</Eyebrow><strong>Live and actively operated</strong><p>Designed, built and maintained independently.</p></div>
          </div>
        </section>
        <ContentSection label="Overview" title="Shipping and operating a live product"><div className="prose">{dusd.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></ContentSection>
        <section className="dusd-data-section content-width" aria-labelledby="dusd-evidence-title">
          <header className="dusd-data-heading"><Eyebrow>Selected product evidence</Eyebrow><div><h2 id="dusd-evidence-title">A product defined by observable data</h2><p>Editorial views of the underlying product system, rather than reproductions of its interface.</p></div></header>
          <div className="dusd-chart-grid">
            <figure className="dusd-supply-figure">
              <figcaption><h3>Supply contraction</h3><span>Genesis → 11 Aug 2026</span></figcaption>
              <div className="dusd-supply-bar" role="img" aria-label="34.17 percent of genesis supply burned and 65.83 percent circulating"><i /><b /></div>
              <div className="dusd-supply-labels"><p><strong>341.7M burned</strong><span>34.17% of genesis</span></p><p><strong>658.3M circulating</strong><span>65.83% remaining</span></p></div>
            </figure>
            <figure className="dusd-burn-figure">
              <figcaption><h3>Recent burn cadence</h3><span>DUSD per event</span></figcaption>
              <div className="dusd-bars-wrap" role="img" aria-label="Eight recent burns ranging from approximately 7,700 to 82,800 DUSD">
                <div className="dusd-y-axis"><span>82.8K</span><span>41.4K</span><span>0</span></div>
                <div className="dusd-bars">{recentBurns.map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}</div>
              </div>
              <div className="dusd-bar-times"><span>Earlier</span><span>Latest</span></div>
            </figure>
          </div>
          <div className="dusd-mechanism"><Eyebrow>How it works</Eyebrow><div>{[
            ["01", "Claim & reserve", "Read Pump vault state, exclude account rent, claim above threshold and preserve a 0.05 SOL floor plus transaction fees."],
            ["02", "Validate route", "Request a fresh Jupiter route, decode the versioned transaction and enforce mint, account, signer, program, slippage and fee policy."],
            ["03", "Sign & land", "Simulate, finalize and sign once; verify Ed25519 locally, then rebroadcast identical bytes until confirmation or definitive expiry."],
            ["04", "Burn & persist", "Verify the token account, burnChecked the complete DUSD balance and atomically persist signatures, supply data and pipeline state."],
          ].map(([index, title, copy]) => <article key={index}><span>{index}</span><strong>{title}</strong><p>{copy}</p></article>)}</div></div>
        </section>
        <ContentSection label="Production engineering" title="Designed for unsafe and ambiguous states">
          <div className="prose"><p>The service treats route payloads, RPC responses and transaction status as untrusted inputs. It validates the complete execution policy before signing and stops for review when landing status cannot be proven.</p><p>Crash recovery is driven by an explicit persisted state machine rather than inference from process exit codes. Confirmed stages are never repeated; unknown transactions are never guessed to have failed.</p></div>
          <div className="dusd-technical-list"><BulletList items={dusd.technicalControls} /></div>
        </ContentSection>
        <ContentSection label="What I worked on" title="Product, execution and infrastructure"><BulletList items={dusd.workedOn} /></ContentSection>
        <ContentSection label="Outcome / current status" title="Live and maintained"><div className="prose"><p>{dusd.status}</p></div></ContentSection>
        <NextWork href="/work/one-click-labs/" label="One Click Labs" />
      </main>
    </PageShell>
  );
}

export function OneClickLabsPage() {
  return (
    <PageShell>
      <main id="main" className="work-page">
        <WorkHeader title={oneClickLabs.title} role={oneClickLabs.role} period={oneClickLabs.period} description={oneClickLabs.description} />
        <ContentSection label="Overview" title="Product and quantitative financial infrastructure"><div className="prose">{oneClickLabs.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></ContentSection>
        <ContentSection label="What I worked on" title="From raw market data to allocation decisions"><BulletList items={oneClickLabs.workedOn} /></ContentSection>
        <section className="methods-strip content-width" aria-label="Selected methods"><Eyebrow>Selected methods</Eyebrow><div>{["Python", "SQL", "DeFiLlama", "Protocol APIs", "Backtesting", "Portfolio optimisation", "Monte Carlo", "Risk analysis"].map((method) => <span key={method}>{method}</span>)}</div></section>
        <ContentSection label="Outcome / current status" title="A product that evolved with its market"><div className="prose"><p>{oneClickLabs.status}</p></div></ContentSection>
        <NextWork href="/work/bittensor/" label="Bittensor" />
      </main>
    </PageShell>
  );
}

export function LegacyWorkPage({ destination, label }: { destination: string; label: string }) {
  return <PageShell><main id="main" className="legacy-page content-width"><Eyebrow>This work now sits within Bittensor</Eyebrow><h1>{label}</h1><p>The portfolio has been consolidated so related Bittensor work can be understood as one sustained body of work.</p><Link className="text-link" href={destination}>Continue to Bittensor <span aria-hidden="true">→</span></Link></main></PageShell>;
}
