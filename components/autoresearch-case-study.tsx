import Link from "next/link";
import {
  attributionLayers,
  autoresearchCaseStudy,
  campaignMetrics,
  demonstrations,
  researchAreas,
  systemLayers,
} from "@/content/autoresearch-case-study";

function SectionIntro({
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
    <header className="ar-section-intro">
      <div className="ar-kicker"><span>{index}</span><p>{label}</p></div>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </header>
  );
}

function WalkForwardDiagram() {
  return (
    <figure className="ar-diagram ar-walk-forward" aria-labelledby="walk-forward-caption">
      <figcaption id="walk-forward-caption">
        <span>EVALUATION / 01</span>
        <strong>Walk-forward evaluation design</strong>
      </figcaption>
      <div className="ar-walk-matrix" role="img" aria-label="Four walk-forward model fits use expanding historical training windows followed by separate future evaluation periods. A final holdout remains frozen.">
        <div className="ar-walk-matrix__axis"><span>EARLIER</span><span>TIME / PREDICTION ORIGINS</span><span>LATER</span></div>
        {[0, 1, 2, 3].map((round) => (
          <div className="ar-walk-matrix__row" key={round}>
            <span>FIT 0{round + 1}</span>
            <div className="ar-walk-matrix__track">
              <i className="ar-walk-matrix__empty" style={{ flexGrow: round * 7 }} />
              <i className="ar-walk-matrix__train" style={{ flexGrow: 48 + round * 7 }}>TRAIN</i>
              <i className="ar-walk-matrix__refit">REFIT</i>
              <i className="ar-walk-matrix__future">FUTURE</i>
              <i className="ar-walk-matrix__holdout">HOLDOUT</i>
            </div>
          </div>
        ))}
        <div className="ar-walk-matrix__boundary"><span>INFORMATION AVAILABLE AT EACH FIT</span><i /><span>FROZEN EVALUATION</span></div>
      </div>
      <p>The model was repeatedly trained only on information available at the time, then evaluated on later periods it had not seen.</p>
    </figure>
  );
}

function ResearchCampaignDiagram() {
  return (
    <figure className="ar-diagram ar-campaign" aria-labelledby="campaign-caption">
      <figcaption id="campaign-caption">
        <span>CAMPAIGN / 02</span>
        <strong>Research campaign breadth</strong>
      </figcaption>
      <div className="ar-campaign__landscape">
        <div className="ar-campaign__metrics">
          {campaignMetrics.map((metric) => (
            <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </div>
        <div className="ar-campaign__matrix" aria-label="Bounded experiment matrix across Ridge and XGBoost, multiple targets and frozen evaluation boundaries.">
          {Array.from({ length: 28 }, (_, index) => <i key={index} className={index % 5 === 0 || index % 7 === 0 ? "retained" : ""} />)}
        </div>
        <div className="ar-campaign__legend"><span>BOUNDED EXPERIMENTS</span><span>SELECTED FOR REVIEW</span><span>FROZEN BOUNDARY</span></div>
      </div>
      <p>The campaign explored a broad, controlled space. It did not imply that every feature, horizon or configuration was retained.</p>
    </figure>
  );
}

function PortfolioDiagram() {
  return (
    <figure className="ar-diagram ar-attribution" aria-labelledby="portfolio-caption">
      <figcaption id="portfolio-caption">
        <span>ATTRIBUTION / 03</span>
        <strong>Signal-to-portfolio attribution</strong>
      </figcaption>
      <div className="ar-attribution__layers">
        {attributionLayers.map((layer, index) => (
          <div key={layer.label} style={{ width: `${100 - index * 5}%` }}>
            <span>0{index + 1}</span><strong>{layer.label}</strong><small>{layer.state}</small>
          </div>
        ))}
      </div>
      <p>A model forecast was only one component of the final investment outcome. Portfolio decisions could succeed or fail at every downstream layer.</p>
    </figure>
  );
}

export function AutoResearchCaseStudy() {
  const project = autoresearchCaseStudy;

  return (
    <main className="ar-page">
      <header className="ar-nav">
        <Link href="/#work">← Selected work</Link>
        <Link href="/" aria-label="Eirik Otis, home">Eirik Otis</Link>
      </header>

      <article>
        <section className="ar-hero">
          <div className="ar-hero-grid" aria-hidden="true" />
          <div className="ar-eyebrow"><span className="signal-dot" />{project.eyebrow}</div>
          <div className="ar-title-row">
            <div>
              <p>{project.category}</p>
              <h1>{project.title}</h1>
            </div>
            <p className="ar-role">{project.role}</p>
          </div>
          <p className="ar-hero-description">{project.description}</p>
          <div className="ar-metadata">{project.metadata.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="ar-hero-footer">
            <p>Independent project</p>
            <span>INGEST · TRAIN · TEST · SIMULATE · EVALUATE</span>
          </div>
        </section>

        <section className="ar-section ar-project">
          <SectionIntro index="01" label="THE PROJECT" title="Building the research infrastructure, not just the model" />
          <div className="ar-project-copy">
            <div>
              <p>The project began with a quantitative trading question but developed into a broader research system. It needed to ingest and clean changing market data, engineer comparable features across subnet markets, train and evaluate models, simulate portfolio decisions and preserve strict boundaries between research data and unseen evaluation periods.</p>
              <p>The objective was not to find the most attractive historical backtest. It was to build a process capable of testing, rejecting and improving ideas reproducibly.</p>
            </div>
            <aside>
              <span>CONTEXT</span>
              <p>Bittensor consists of specialised subnet markets operating within a wider decentralised AI network. The system compared the expected performance of those markets in TAO terms.</p>
            </aside>
          </div>
          <div className="ar-objective">
            <span>OBJECTIVE</span>
            <p>{project.objective}</p>
          </div>
          <div className="ar-ownership">
            <span>END-TO-END OWNERSHIP</span>
            <div>{project.ownership.map((item) => <p key={item}>{item}</p>)}</div>
          </div>
        </section>

        <section className="ar-section ar-built">
          <SectionIntro index="02" label="WHAT I BUILT" title="Four connected layers" copy="A research system is only as credible as the infrastructure, evaluation and decision policy around the model." />
          <div className="ar-area-grid">
            {researchAreas.map((area) => (
              <article key={area.title}>
                <span>{area.index}</span>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
                <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <blockquote>I built the environment in which models could be proposed, tested, rejected and audited—not merely one model producing one forecast.</blockquote>
        </section>

        <section className="ar-section ar-system">
          <SectionIntro index="03" label="HOW THE SYSTEM WORKED" title="Recursive research within defined boundaries" copy="Automation accelerated the loop. Objectives, constraints and deployment judgement remained human responsibilities." />
          <div className="ar-system-layout">
            <div className="ar-system-copy">
              <span>SYSTEM SCHEMATIC</span>
              <h3>Human judgement remained outside the automated loop.</h3>
              <p>Market data, feature generation, modelling, evaluation and portfolio simulation were repeatable system responsibilities. Research objectives, invalid assumptions and deployment decisions remained human ones.</p>
            </div>
            <div className="ar-system-layers">
              {systemLayers.map((layer) => (
                <article key={layer.label}><span>{layer.label}</span><p>{layer.description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="ar-section ar-visualising">
          <SectionIntro index="04" label="VISUALISING THE RESEARCH" title="Signal had to survive time and execution" copy="Historical fit, unseen-data performance and real portfolio mechanics were evaluated as separate questions." />
          <div className="ar-visual-grid">
            <WalkForwardDiagram />
            <ResearchCampaignDiagram />
            <PortfolioDiagram />
          </div>
        </section>

        <section className="ar-section ar-result">
          <SectionIntro index="05" label="RESULT AND JUDGEMENT" title="Promising research. Insufficient stability for deployment." />
          <div className="ar-result-copy">
            <p>Development results initially suggested that useful predictive relationships might exist. However, the underlying Bittensor network and its subnet markets were changing quickly, and performance did not generalise with enough consistency to justify deploying capital through the strategy.</p>
            <p>The durable result was the infrastructure: a reusable system for ingesting data, testing models, simulating portfolio policies and determining when an apparently strong result was not reliable enough.</p>
          </div>
          <div className="ar-conclusion"><span>CONCLUSION</span><strong>Knowing when not to deploy was part of the result.</strong></div>
        </section>

        <section className="ar-section ar-demonstrates">
          <SectionIntro index="06" label="WHAT IT DEMONSTRATES" title="System building with judgement" />
          <div className="ar-demonstration-grid">
            {demonstrations.map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
          <p className="ar-closing">The project combined product architecture, quantitative research, technical implementation and practical investment judgement inside one independently built system.</p>
          <footer className="ar-footer"><Link href="/#work">← More selected work</Link><Link href="/#contact">Start a conversation ↗</Link></footer>
        </section>
      </article>
    </main>
  );
}
