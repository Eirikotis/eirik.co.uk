import Link from "next/link";
import {
  comparisonFactors,
  demonstrations,
  evolutionStages,
  frontierPoints,
  oneClickLabsCaseStudy,
  pipelineSteps,
  workAreas,
} from "@/content/one-click-labs-case-study";

function SectionHeader({
  index,
  label,
  title,
  copy,
}: {
  index: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="ocl-section-header">
      <div className="ocl-section-label"><span>{index}</span><p>{label}</p></div>
      <div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
    </header>
  );
}

export function ProjectCTA({ label = "View Yield Network ↗" }: { label?: string }) {
  return (
    <a
      className="ocl-cta"
      href={oneClickLabsCaseStudy.continuationUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Project continuation</span>
      <strong>{label}</strong>
    </a>
  );
}

export function ProjectHero() {
  return (
    <section className="ocl-hero" aria-labelledby="ocl-title">
      <div className="ocl-hero__top"><p>{oneClickLabsCaseStudy.eyebrow}</p><span>PRODUCT + RESEARCH</span></div>
      <div className="ocl-hero__title">
        <div><p>{oneClickLabsCaseStudy.role}</p><h1 id="ocl-title">One Click<br />Labs</h1></div>
        <p>{oneClickLabsCaseStudy.headline}</p>
      </div>
      <div className="ocl-hero__bottom">
        <p>{oneClickLabsCaseStudy.description}</p>
        <ul aria-label="Project capabilities">{oneClickLabsCaseStudy.metadata.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="ocl-allocation" aria-hidden="true">
        <span style={{ flexGrow: 22 }}>INGEST</span>
        <span style={{ flexGrow: 18 }}>NORMALISE</span>
        <span style={{ flexGrow: 14 }}>SCORE</span>
        <span style={{ flexGrow: 26 }}>OPTIMISE</span>
        <span style={{ flexGrow: 20 }}>ALLOCATE</span>
      </div>
    </section>
  );
}

export function DataPipeline() {
  return (
    <figure className="ocl-visual ocl-pipeline" aria-labelledby="pipeline-caption">
      <figcaption id="pipeline-caption"><span>VISUAL 01</span><strong>Data-to-portfolio architecture</strong><small>System schematic</small></figcaption>
      <ol>
        {pipelineSteps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {index < pipelineSteps.length - 1 && <i aria-hidden="true">↓</i>}
          </li>
        ))}
      </ol>
      <p>Quantitative outputs informed decisions; they did not replace protocol diligence or judgement.</p>
    </figure>
  );
}

export function EfficientFrontier() {
  return (
    <figure className="ocl-visual ocl-frontier" aria-labelledby="frontier-caption">
      <figcaption id="frontier-caption"><span>VISUAL 02</span><strong>Illustrative portfolio optimisation</strong><small>No historical performance shown</small></figcaption>
      <svg viewBox="0 0 760 470" role="img" aria-labelledby="frontier-title frontier-desc">
        <title id="frontier-title">Illustrative efficient frontier chart</title>
        <desc id="frontier-desc">Estimated risk increases from left to right and expected portfolio return increases from bottom to top. Yield strategies appear as scattered opportunities, with an efficient frontier and one selected risk-adjusted portfolio.</desc>
        <g className="ocl-chart-grid">
          <line x1="88" y1="45" x2="88" y2="390" />
          <line x1="88" y1="390" x2="710" y2="390" />
          <line x1="88" y1="305" x2="710" y2="305" />
          <line x1="88" y1="220" x2="710" y2="220" />
          <line x1="88" y1="135" x2="710" y2="135" />
        </g>
        <path className="ocl-frontier__inefficient" d="M145 330 C260 285 360 282 470 315 C545 337 610 342 665 326" />
        <path className="ocl-frontier__line" d="M145 330 C200 244 280 174 380 124 C475 76 565 61 665 56" />
        {frontierPoints.map((point) => (
          <g key={point.label} className="ocl-frontier__point" transform={`translate(${90 + point.x * 8}, ${35 + point.y * 4.5})`}>
            <circle r="7" />
            <text x="12" y="4">{point.label}</text>
          </g>
        ))}
        <g className="ocl-frontier__selected" transform="translate(430 104)">
          <circle r="13" /><circle r="4" /><text x="20" y="5">Selected portfolio</text>
        </g>
        <text className="ocl-chart-axis" x="350" y="445">ESTIMATED RISK →</text>
        <text className="ocl-chart-axis" x="24" y="260" transform="rotate(-90 24 260)">EXPECTED PORTFOLIO RETURN →</text>
        <text className="ocl-chart-note" x="515" y="83">EFFICIENT FRONTIER</text>
        <text className="ocl-chart-note" x="486" y="353">INEFFICIENT COMBINATIONS</text>
      </svg>
      <p>The frontier represents portfolios offering the highest estimated return for a given level of risk. The objective was to identify more efficient combinations—not simply maximise APY.</p>
    </figure>
  );
}

export function AMMMechanics() {
  const curve = Array.from({ length: 33 }, (_, index) => {
    const ratio = 0.25 * Math.pow(16, index / 32);
    const impermanentLoss = (2 * Math.sqrt(ratio)) / (1 + ratio) - 1;
    const x = 68 + (index / 32) * 410;
    const y = 62 + (Math.abs(impermanentLoss) / 0.2) * 250;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <figure className="ocl-visual ocl-amm" aria-labelledby="amm-caption">
      <figcaption id="amm-caption"><span>VISUAL 03</span><strong>Illustrative liquidity-provider mechanics</strong><small>Standard constant-product relationship</small></figcaption>
      <svg viewBox="0 0 560 390" role="img" aria-labelledby="amm-title amm-desc">
        <title id="amm-title">Impermanent loss by asset-price ratio</title>
        <desc id="amm-desc">Impermanent loss is zero at the balanced entry ratio of one and becomes more negative as the relative asset price moves in either direction.</desc>
        <g className="ocl-chart-grid">
          <line x1="68" y1="62" x2="68" y2="322" />
          <line x1="68" y1="322" x2="478" y2="322" />
          <line x1="68" y1="187" x2="478" y2="187" />
          <line x1="68" y1="62" x2="478" y2="62" />
        </g>
        <polyline className="ocl-il__area" points={`68,322 ${curve} 478,322`} />
        <polyline className="ocl-il__curve" points={curve} />
        <line className="ocl-il__entry-line" x1="273" y1="55" x2="273" y2="322" />
        <circle className="ocl-il__entry" cx="273" cy="62" r="8" />
        <text className="ocl-chart-note" x="285" y="80">BALANCED ENTRY / 1.0</text>
        <text className="ocl-chart-axis" x="185" y="370">ASSET-PRICE RATIO RELATIVE TO ENTRY →</text>
        <text className="ocl-chart-axis" x="18" y="245" transform="rotate(-90 18 245)">IMPERMANENT LOSS VS HOLDING →</text>
        <text className="ocl-chart-note" x="44" y="66">0%</text>
        <text className="ocl-chart-note" x="35" y="191">−10%</text>
        <text className="ocl-chart-note" x="35" y="326">−20%</text>
        <text className="ocl-chart-note" x="63" y="344">0.25</text>
        <text className="ocl-chart-note" x="260" y="344">1.0</text>
        <text className="ocl-chart-note" x="466" y="344">4.0</text>
      </svg>
      <p>Liquidity-provision yield had to be evaluated alongside price divergence, pool rebalancing and impermanent loss—not treated like conventional interest income. Fee yield could offset part of the loss, but did not remove the underlying exposure.</p>
    </figure>
  );
}

export function ProjectEvolution() {
  return (
    <div className="ocl-evolution" aria-label="Project evolution">
      {evolutionStages.map((stage, index) => (
        <div key={stage.label}>
          <article><span>0{index + 1}</span><h3>{stage.label}</h3><p>{stage.detail}</p></article>
          {index < evolutionStages.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

export function RelatedProject() {
  return (
    <footer className="ocl-related">
      <p>Continue exploring</p>
      <Link href="/work/bittensor-autoresearch/"><span>Related project</span><strong>Bittensor AutoResearch</strong><i aria-hidden="true">↗</i></Link>
    </footer>
  );
}

export function OneClickLabsCaseStudy() {
  return (
    <main className="ocl-page">
      <nav className="ocl-nav" aria-label="Project navigation"><Link href="/#work">← Selected work</Link><Link href="/">Eirik Otis</Link></nav>
      <article>
        <ProjectHero />

        <section className="ocl-section ocl-problem">
          <SectionHeader index="01" label="THE PROBLEM" title="Thousands of yields. No common decision framework." copy="Lending pools, staking positions, liquidity pools and automated vaults existed across many protocols and blockchains, but the information required to compare them was fragmented." />
          <div className="ocl-problem__layout">
            <div>
              <p>APYs changed rapidly, pool data used inconsistent formats and historical performance was incomplete. Similar headline yields could conceal very different return mechanics and risk exposures.</p>
              <blockquote>A 20% lending yield, a 20% liquidity-pool yield and a 20% incentive-driven vault were not equivalent investments.</blockquote>
            </div>
            <ul>{comparisonFactors.map((factor) => <li key={factor}>{factor}</li>)}</ul>
          </div>
          <p className="ocl-problem__line">{oneClickLabsCaseStudy.centralLine}</p>
        </section>

        <section className="ocl-section ocl-work">
          <SectionHeader index="02" label="WHAT I WORKED ON" title="From raw market data to portfolio decisions" copy="The work connected live-market infrastructure, quantitative research, product definition and practical strategy management." />
          <div className="ocl-work__grid">
            {workAreas.map((area) => (
              <article key={area.title}><span>{area.index}</span><h3>{area.title}</h3><ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
            ))}
          </div>
          <p className="ocl-work__statement">{oneClickLabsCaseStudy.roleStatement}</p>
        </section>

        <section className="ocl-section ocl-system">
          <SectionHeader index="03" label="HOW THE SYSTEM WORKED" title="A comparable layer over inconsistent markets" copy="Protocol-level information had to be extracted, validated and transformed before it could support risk-aware portfolio decisions." />
          <DataPipeline />
        </section>

        <section className="ocl-section ocl-visualising">
          <SectionHeader index="04" label="VISUALISING PORTFOLIO OPTIMISATION" title="Risk and return behaved differently across strategies" copy="The models helped structure comparisons while remaining dependent on estimates, changing markets and protocol-level diligence." />
          <div className="ocl-quant-visuals">
            <div className="ocl-chart-row">
              <div className="ocl-chart-copy"><span>PORTFOLIO CONSTRUCTION</span><h3>More efficient combinations, not maximum APY</h3><p>The frontier represents the portfolios with the highest estimated return for each level of risk. Inputs remained estimates, not promises.</p></div>
              <EfficientFrontier />
            </div>
            <div className="ocl-chart-row ocl-chart-row--reverse">
              <div className="ocl-chart-copy"><span>RETURN MECHANICS</span><h3>Liquidity provision behaved differently from lending</h3><p>Displayed fee yield was only one part of the outcome. Relative price movement continuously changed the pool composition.</p></div>
              <AMMMechanics />
            </div>
          </div>
        </section>

        <section className="ocl-section ocl-continuation">
          <SectionHeader index="05" label="FROM RESEARCH PRODUCT TO OPERATING BUSINESS" title="A market problem that continued to evolve" copy="The initial work focused on helping users discover and optimise DeFi yield portfolios. As the market developed, the company moved further toward yield distribution, liquidity formation and connecting protocols with allocators." />
          <ProjectEvolution />
          <div className="ocl-continuation__copy">
            <p>The original product and market research contributed to a wider company evolution toward what now operates as Yield Network.</p>
            <p>The current business is a continuation of the company’s broader evolution, not a product I claim to have built or currently operate.</p>
          </div>
          <ProjectCTA />
        </section>

        <section className="ocl-section ocl-demonstrates">
          <SectionHeader index="06" label="WHAT THE PROJECT DEMONSTRATES" title="Quantitative product work in a live emerging market" />
          <div className="ocl-demonstrates__grid">
            {demonstrations.map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
          <p className="ocl-closing">{oneClickLabsCaseStudy.closing}</p>
          <RelatedProject />
        </section>
      </article>
    </main>
  );
}
