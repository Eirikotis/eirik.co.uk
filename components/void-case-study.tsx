import Link from "next/link";
import {
  demonstrations,
  durableResults,
  opportunityGroups,
  ownershipAreas,
  productFlow,
  systemArchitecture,
  underwritingClassification,
  underwritingFactors,
  ventureWorkstreams,
  voidCaseStudy,
} from "@/content/void-case-study";

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
    <header className="void-section-header">
      <div className="void-section-label">
        <span>{index}</span>
        <p>{label}</p>
      </div>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </header>
  );
}

export function ProjectHero() {
  const project = voidCaseStudy;

  return (
    <section className="void-hero" aria-labelledby="void-title">
      <div className="void-hero__top">
        <p className="void-eyebrow">{project.eyebrow}</p>
        <p className="void-role">{project.role}</p>
      </div>
      <div className="void-hero__title">
        <h1 id="void-title">{project.title}</h1>
        <p>{project.headline}</p>
      </div>
      <div className="void-hero__bottom">
        <p className="void-hero__description">{project.description}</p>
        <ul aria-label="Project capabilities">
          {project.metadata.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function ProductFlow() {
  return (
    <figure className="void-visual void-product-flow" aria-labelledby="product-flow-caption">
      <figcaption id="product-flow-caption">
        <span>PRODUCT FLOW / 01</span>
        <strong>Lender capital to controlled liquidation</strong>
      </figcaption>
      <ol>
        {productFlow.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {index < productFlow.length - 1 && <i aria-hidden="true">↓</i>}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function SystemArchitecture() {
  return (
    <figure className="void-visual void-system-architecture" aria-labelledby="system-architecture-caption">
      <figcaption id="system-architecture-caption">
        <span>INFRASTRUCTURE / 02</span>
        <strong>Cross-chain collateral path</strong>
      </figcaption>
      <ol>
        {systemArchitecture.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {index < systemArchitecture.length - 1 && <i aria-hidden="true">→</i>}
          </li>
        ))}
      </ol>
      <p>Morpho supplied the isolated-market lending core. Proprietary work concentrated on cross-chain execution, collateral transformation, underwriting, oracle design, liquidity allocation and liquidation.</p>
    </figure>
  );
}

export function UnderwritingClassification() {
  const total = underwritingClassification.reduce((sum, item) => sum + item.value, 0);

  return (
    <figure className="void-visual void-underwriting" aria-labelledby="underwriting-caption">
      <figcaption id="underwriting-caption">
        <span>REFERENCE UNDERWRITING ANALYSIS / 03</span>
        <strong>{total} markets assessed</strong>
      </figcaption>
      <div
        className="void-underwriting__bar"
        role="img"
        aria-label="Of 128 markets assessed, 20 were classified Core Launch, 40 Extended Rollout, 5 Manual Review and 63 Rejected."
      >
        {underwritingClassification.map((item) => (
          <span
            key={item.label}
            className={`void-underwriting__segment void-underwriting__segment--${item.tone}`}
            style={{ flexGrow: item.value }}
          />
        ))}
      </div>
      <div className="void-underwriting__legend">
        {underwritingClassification.map((item) => (
          <div key={item.label}>
            <i className={`void-underwriting__key void-underwriting__key--${item.tone}`} />
            <strong>{item.value}</strong>
            <span>{item.label} · {((item.value / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      <p className="void-underwriting__note">60 markets cleared the mechanical underwriting framework. This classification does not imply that markets subsequently launched with live capital.</p>
    </figure>
  );
}

export function ReserveCoverageChart() {
  return (
    <figure className="void-visual void-reserve-chart" aria-labelledby="reserve-coverage-caption">
      <figcaption id="reserve-coverage-caption">
        <span>RISK METHOD / 04</span>
        <strong>Reserve depth and required coverage</strong>
      </figcaption>
      <svg viewBox="0 0 720 410" role="img" aria-labelledby="reserve-title reserve-desc">
        <title id="reserve-title">Required liquidation recovery coverage by effective market reserve depth</title>
        <desc id="reserve-desc">Required coverage declines log-linearly from approximately 1.10 times at the 5,000 TAO eligibility floor toward 1.05 times at 75,000 TAO and above.</desc>
        <g className="void-chart-grid">
          <path d="M82 55V335H675M82 90H675M82 210H675M82 335H675" />
          <path d="M82 55H675" />
        </g>
        <path className="void-reserve-chart__band" d="M110 86 C210 122 315 170 430 225 S580 272 650 284 L650 310 C560 298 465 273 385 236 S210 146 110 112 Z" />
        <path className="void-reserve-chart__line" d="M110 99 C210 135 315 183 430 238 S580 285 650 297" />
        <g className="void-reserve-chart__point" transform="translate(110 99)"><circle r="7" /><text x="12" y="-10">5,000 TAO</text><text x="12" y="8">1.10× coverage</text></g>
        <g className="void-reserve-chart__point" transform="translate(650 297)"><circle r="7" /><text x="-125" y="-10">75,000+ TAO</text><text x="-125" y="8">1.05× coverage</text></g>
        <text className="void-chart-axis" x="286" y="385">EFFECTIVE MARKET RESERVE DEPTH →</text>
        <text className="void-chart-axis" x="24" y="255" transform="rotate(-90 24 255)">REQUIRED LIQUIDATION RECOVERY COVERAGE →</text>
        <text className="void-chart-tick" x="44" y="102">1.10×</text>
        <text className="void-chart-tick" x="44" y="223">1.075×</text>
        <text className="void-chart-tick" x="44" y="340">1.05×</text>
      </svg>
      <p>Thinner markets were required to demonstrate greater stressed recovery because their liquidity was less dependable during liquidation.</p>
    </figure>
  );
}

export function VentureWorkstreams() {
  return (
    <figure className="void-visual void-workstreams" aria-labelledby="workstreams-caption">
      <figcaption id="workstreams-caption">
        <span>VENTURE BUILD / 04</span>
        <strong>Four workstreams, one proposition</strong>
      </figcaption>
      <div className="void-workstreams__grid">
        {ventureWorkstreams.map((workstream, index) => (
          <article key={workstream.label}>
            <span>0{index + 1}</span>
            <h3>{workstream.label}</h3>
            <p>{workstream.detail}</p>
          </article>
        ))}
      </div>
      <div className="void-workstreams__result">
        <span aria-hidden="true">↓</span>
        <strong>Investable venture proposition</strong>
      </div>
    </figure>
  );
}

export function ProjectOutcome() {
  return (
    <section className="void-section void-outcome" aria-labelledby="void-outcome-title">
      <SectionHeader index="07" label="OUTCOME AND JUDGEMENT" title="A compelling product ahead of its market" />
      <div className="void-outcome__copy">
        <p>The technical system, underwriting framework and commercial proposition demonstrated that institutional credit infrastructure for decentralised AI markets was possible.</p>
        <p>However, the underlying ecosystem was changing too quickly. Asset structures, market mechanics and network incentives were still evolving, making it difficult to commit the level of capital and institutional readiness required for a responsible launch.</p>
        <p>The decision not to force deployment reflected the same principle used in the product itself: capital should scale with evidence, not ambition alone.</p>
      </div>
      <blockquote>{voidCaseStudy.outcomeConclusion}</blockquote>
      <div className="void-outcome__results">
        <p>Durable result</p>
        <ul>{durableResults.map((result) => <li key={result}>{result}</li>)}</ul>
      </div>
    </section>
  );
}

export function RelatedProject() {
  return (
    <footer className="void-related">
      <p>Continue exploring</p>
      <Link href="/work/bittensor-autoresearch/">
        <span>Related project</span>
        <strong>Bittensor AutoResearch</strong>
        <i aria-hidden="true">↗</i>
      </Link>
    </footer>
  );
}

export function VoidCaseStudy() {
  return (
    <main className="void-page">
      <nav className="void-nav" aria-label="Project navigation">
        <Link href="/#work">← Selected work</Link>
        <Link href="/" aria-label="Eirik Otis, home">Eirik Otis</Link>
      </nav>

      <article>
        <ProjectHero />

        <section className="void-section void-opportunity">
          <SectionHeader
            index="01"
            label="THE OPPORTUNITY"
            title="From an asset network to a financial system"
            copy="Bittensor had developed from a single network token into a multi-asset economy with individual subnet markets, staking yield and growing pools of capital. What it lacked was the credit infrastructure required to make those assets useful as collateral."
          />
          <div className="void-opportunity__grid">
            {opportunityGroups.map((group, index) => (
              <article key={group.audience}><span>0{index + 1}</span><p>{group.audience}</p><strong>{group.outcome}</strong></article>
            ))}
          </div>
          <blockquote>{voidCaseStudy.opportunityStatement}</blockquote>
        </section>

        <section className="void-section void-ownership">
          <SectionHeader
            index="02"
            label="MY ROLE"
            title="Operating across product, engineering, risk and commercial execution"
            copy={voidCaseStudy.supportingDescription}
          />
          <div className="void-ownership__grid">
            {ownershipAreas.map((area) => (
              <article key={area.title}>
                <span>{area.index}</span>
                <h3>{area.title}</h3>
                <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="void-ownership__statement">{voidCaseStudy.responsibilityStatement}</p>
        </section>

        <section className="void-section void-product">
          <SectionHeader
            index="03"
            label="HOW THE PRODUCT WORKED"
            title="A controlled path from capital to collateral"
            copy="The product connected lenders and borrowers through separated credit markets, cross-chain collateral infrastructure and liquidation-first risk controls."
          />
          <div className="void-product__visuals">
            <ProductFlow />
            <div className="void-product__architecture-copy">
              <span>SYSTEM SCHEMATIC</span>
              <h3>Built on an isolated-market lending core</h3>
              <p>Using Morpho concentrated proprietary work on cross-chain execution, collateral transformation, underwriting, oracle design, liquidity allocation and liquidation.</p>
              <p>Each collateral market remained separated so that weakness in one asset could not automatically contaminate stronger lending markets.</p>
            </div>
          </div>
        </section>

        <section className="void-section void-risk">
          <SectionHeader
            index="04"
            label="UNDERWRITING THE MARKET"
            title="Risk designed around executable liquidity"
            copy="Headline market capitalisation said little about how much debt could actually be liquidated during stress. The framework therefore began with real liquidity pools and achievable execution."
          />
          <div className="void-risk__question">
            <span>CENTRAL QUESTION</span>
            <p>How much collateral could be sold into the real market under stress while still repaying lenders?</p>
          </div>
          <div className="void-risk__layout">
            <UnderwritingClassification />
            <ReserveCoverageChart />
          </div>
          <div className="void-risk__factors">
            <p>Framework assessed</p>
            <aside>
              <ul>{underwritingFactors.map((factor) => <li key={factor}>{factor}</li>)}</ul>
            </aside>
          </div>
        </section>

        <section className="void-section void-venture">
          <SectionHeader
            index="05"
            label="BUILDING THE VENTURE"
            title="From technical product to institutional proposition"
            copy="The work extended from roadmap and delivery management into documentation, market-capacity modelling, protocol economics, investor presentation, diligence materials and milestone-gated use of funds."
          />
          <VentureWorkstreams />
          <div className="void-venture__notes">
            <p>The financing proposal separated technical-readiness capital from later liquidity deployment, ensuring capital would scale only after defined engineering, security and operational milestones were completed.</p>
            <p>Advanced to detailed diligence and strategic financing discussions with a tier-one crypto investor.</p>
          </div>
        </section>

        <section className="void-section void-implementation">
          <SectionHeader index="06" label="FUNCTIONAL IMPLEMENTATION" title="Infrastructure brought together as a working system" />
          <p>The core technical system reached functional implementation. Developed components included native asset bridging, yield-bearing wrapped collateral, transaction coordination, isolated Morpho markets, adaptive interest rates, oracle pricing, liquidation infrastructure, curated vault architecture and quantitative market underwriting.</p>
          <aside>
            <span>OWNERSHIP NOTE</span>
            <p>I owned the overall product and commercial system. Engineering implementation was delivered with the development team and external technical lead; parts of the oracle and backend infrastructure existed before or were delivered by specialist engineers.</p>
          </aside>
        </section>

        <ProjectOutcome />

        <section className="void-section void-demonstrates">
          <SectionHeader index="08" label="WHAT THE PROJECT DEMONSTRATES" title="Frontier infrastructure, built as a venture" />
          <div className="void-demonstrates__grid">
            {demonstrations.map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
          <p className="void-closing">VOID combined product ownership, technical systems, quantitative risk and commercial execution more completely than any other project I have worked on.</p>
          <RelatedProject />
        </section>
      </article>
    </main>
  );
}
