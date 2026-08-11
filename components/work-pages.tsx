import Image from "next/image";
import Link from "next/link";
import { BulletList, ContentSection, Eyebrow, NextWork, PageShell, TextLink, WorkHeader } from "@/components/editorial";
import { bittensorWorkstreams, dusd, dusdScreenshots, kpmg, oneClickLabs, qualification } from "@/content/portfolio";

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
        <WorkHeader title="Bittensor" role="Product, market strategy and research" period="2025–26" description="Sustained work across decentralised AI markets, spanning credit infrastructure, quantitative research, compute and inference, ecosystem partnerships, and market design." />
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
      <figcaption id="kpmg-process-title">How the work operated</figcaption>
      <div>
        {kpmg.process.map((stage, index) => (
          <div className="kpmg-process-stage" key={stage.label}>
            <span>0{index + 1}</span>
            <div><strong>{stage.label}</strong><p>{stage.items}</p></div>
          </div>
        ))}
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
        <NextWork href="/work/dusd/" label="DUSD.fun" />
      </main>
    </PageShell>
  );
}

export function DusdPage() {
  return (
    <PageShell>
      <main id="main" className="work-page">
        <WorkHeader title={dusd.title} role={dusd.role} period={dusd.period} description={dusd.description} />
        <ContentSection label="Overview" title="Shipping and operating a live product"><div className="prose">{dusd.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<TextLink href={dusd.liveUrl} external>Visit DUSD.fun</TextLink></div></ContentSection>
        <section className="screenshot-section content-width" aria-labelledby="screenshots-title"><header><Eyebrow>Selected product evidence</Eyebrow><h2 id="screenshots-title">Live interfaces</h2></header><div className="screenshot-list">{dusdScreenshots.map((image) => <figure key={image.src}><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 900px) 100vw, 1100px" /><figcaption>{image.caption}</figcaption></figure>)}</div></section>
        <ContentSection label="What I worked on" title="Independent product ownership"><BulletList items={dusd.workedOn} /></ContentSection>
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
