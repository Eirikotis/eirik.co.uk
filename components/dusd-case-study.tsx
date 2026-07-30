import Link from "next/link";
import Image from "next/image";
import {
  demonstrations,
  dusdCaseStudy,
  productAreas,
  productDecisions,
  screenshots,
  strategyPoints,
  systemInputs,
  systemStages,
} from "@/content/dusd-case-study";

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
    <header className="dusd-section-header">
      <div className="dusd-section-label"><span>{index}</span><p>{label}</p></div>
      <div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
    </header>
  );
}

export function LiveProductLink({
  label = "View DUSD.fun ↗",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={`dusd-live-link ${className}`}
      href={dusdCaseStudy.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="dusd-status-dot" aria-hidden="true" />
      {label}
    </a>
  );
}

export function ProductScreenshot({
  screenshot,
  priority = false,
  className = "",
}: {
  screenshot: (typeof screenshots)[number];
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`dusd-screenshot ${className}`}>
      <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open larger image: ${screenshot.caption}`}>
        <Image
          src={screenshot.src}
          width={screenshot.width}
          height={screenshot.height}
          alt={screenshot.alt}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          unoptimized
        />
        <span className="dusd-screenshot__expand" aria-hidden="true">EXPAND ↗</span>
      </a>
      <figcaption><span>LIVE PRODUCT / {screenshot.id.toUpperCase()}</span><p>{screenshot.caption}</p></figcaption>
    </figure>
  );
}

export function ProjectHero() {
  return (
    <section className="dusd-hero" aria-labelledby="dusd-title">
      <div className="dusd-hero__status">
        <p>{dusdCaseStudy.eyebrow}</p>
        <span>PUBLIC PRODUCT / ONLINE</span>
      </div>
      <div className="dusd-hero__title">
        <div><p>{dusdCaseStudy.role}</p><h1 id="dusd-title">{dusdCaseStudy.title}</h1></div>
        <p>{dusdCaseStudy.headline}</p>
      </div>
      <div className="dusd-hero__copy">
        <p>{dusdCaseStudy.description}</p>
        <LiveProductLink />
      </div>
      <ul className="dusd-hero__meta" aria-label="Project capabilities">
        {dusdCaseStudy.metadata.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <ProductScreenshot screenshot={screenshots[0]} priority className="dusd-screenshot--hero" />
    </section>
  );
}

export function ScreenshotGallery() {
  return (
    <div className="dusd-gallery">
      <ProductScreenshot screenshot={screenshots[1]} className="dusd-screenshot--offset" />
      <div className="dusd-gallery__interlude">
        <span>PRODUCT EVIDENCE</span>
        <p>The interface turns supply mechanics into a product users can inspect, compare and revisit.</p>
      </div>
      <ProductScreenshot screenshot={screenshots[2]} className="dusd-screenshot--wide" />
    </div>
  );
}

export function SystemFlow() {
  return (
    <figure className="dusd-system-flow" aria-labelledby="dusd-system-caption">
      <figcaption id="dusd-system-caption">DATA TO PRODUCT SYSTEM</figcaption>
      <div className="dusd-system-flow__inputs">
        {systemInputs.map((input) => <span key={input}>{input}</span>)}
      </div>
      <i aria-hidden="true">↓</i>
      <ol>
        {systemStages.map((stage, index) => (
          <li key={stage}><span>0{index + 1}</span><strong>{stage}</strong>{index < systemStages.length - 1 && <i aria-hidden="true">↓</i>}</li>
        ))}
      </ol>
    </figure>
  );
}

export function ProductDecision({
  decision,
  index,
}: {
  decision: (typeof productDecisions)[number];
  index: number;
}) {
  return (
    <article className="dusd-decision">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{decision.title}</h3>
      <p>{decision.description}</p>
    </article>
  );
}

export function ProjectOutcome() {
  return (
    <section className="dusd-section dusd-outcome" aria-labelledby="dusd-outcome-title">
      <SectionHeader
        index="06"
        label="PRODUCT STRATEGY"
        title="The website became the product layer"
        copy="The wider community operates across social channels, trading venues and blockchain transactions. DUSD.fun gives that activity one coherent public surface."
      />
      <div className="dusd-outcome__layout">
        <ul>{strategyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
        <blockquote id="dusd-outcome-title">Most memecoins depend on continuously inventing new attention. DUSD already produced an event stream through every buyback and burn; the product was designed to make that stream visible.</blockquote>
      </div>
      <p className="dusd-outcome__ownership">{dusdCaseStudy.ownership}</p>
    </section>
  );
}

export function RelatedProject() {
  return (
    <footer className="dusd-related">
      <p>Continue exploring</p>
      <Link href="/work/void/"><span>Related project</span><strong>VOID</strong><i aria-hidden="true">↗</i></Link>
    </footer>
  );
}

export function DusdCaseStudy() {
  return (
    <main className="dusd-page">
      <nav className="dusd-nav" aria-label="Project navigation">
        <Link href="/#work">← Selected work</Link>
        <div><span>PRODUCT / LIVE</span><LiveProductLink label="View market ↗" /></div>
      </nav>

      <article>
        <ProjectHero />

        <section className="dusd-section dusd-origin">
          <SectionHeader
            index="01"
            label="THE OPPORTUNITY"
            title="A joke with a serious system underneath"
            copy="DUSD uses trading activity to fund recurring buybacks and permanent token burns. Every burn reduces the outstanding supply."
          />
          <div className="dusd-origin__copy">
            <p>The original mechanism was simple, but the public experience around it was fragmented. There was no clear destination showing how much supply had been destroyed, how quickly burns were occurring, what remained, how the mechanism compared with other monetary systems, or which transactions were driving the change.</p>
            <p>DUSD can be read as both a memecoin and an experiment in mechanically contracting digital supply. I designed DUSD.fun to make that system legible without pretending the experiment was already an established monetary asset.</p>
          </div>
          <blockquote>A burn transaction is only raw blockchain activity until it is turned into an understandable product experience.</blockquote>
          <p className="dusd-origin__line">The product does not ask users to believe the narrative. It lets them inspect the mechanism.</p>
        </section>

        <section className="dusd-section dusd-built">
          <SectionHeader
            index="02"
            label="WHAT I BUILT"
            title="Product, data and narrative in one system"
            copy="The public website combines telemetry, market intelligence, monetary comparison and interactive tools inside one information architecture."
          />
          <div className="dusd-built__grid">
            {productAreas.map((area) => (
              <article key={area.title}>
                <span>{area.index}</span><h3>{area.title}</h3>
                <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="dusd-built__ownership">{dusdCaseStudy.ownershipStatement}</p>
        </section>

        <section className="dusd-section dusd-product">
          <SectionHeader
            index="03"
            label="THE LIVE PRODUCT"
            title="A market terminal for a shrinking supply"
            copy="Real product evidence from the public interface. Values shown belong to the captured product state; visit DUSD.fun for current information."
          />
          <ScreenshotGallery />
        </section>

        <section className="dusd-section dusd-design">
          <SectionHeader
            index="04"
            label="PRODUCT AND SYSTEM DESIGN"
            title="Designing trust into a speculative market"
            copy="The interface was designed to turn a highly speculative context into a more inspectable information product."
          />
          <div className="dusd-design__layout">
            <div className="dusd-decisions">
              {productDecisions.map((decision, index) => <ProductDecision key={decision.title} decision={decision} index={index} />)}
            </div>
            <SystemFlow />
          </div>
        </section>

        <section className="dusd-section dusd-positioning">
          <SectionHeader index="05" label="POSITIONING" title="From supply mechanic to repeatable public narrative" />
          <div className="dusd-positioning__copy">
            <p>DUSD.fun transforms recurring on-chain activity into evidence of contraction, live market intelligence, comparison with other monetary systems and a coherent public identity.</p>
            <p>The analytical surface remains central, while market charts, trading routes and community pathways provide clear next steps without turning the experience into a generic token advert.</p>
          </div>
          <LiveProductLink label="View live product ↗" className="dusd-live-link--large" />
        </section>

        <ProjectOutcome />

        <section className="dusd-section dusd-demonstrates">
          <SectionHeader index="07" label="WHAT THE PROJECT DEMONSTRATES" title="One independently operated product system" />
          <div className="dusd-demonstrates__grid">
            {demonstrations.map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
            ))}
          </div>
          <p className="dusd-closing">{dusdCaseStudy.closing}</p>
          <RelatedProject />
        </section>
      </article>
    </main>
  );
}
