"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  capabilities,
  contact,
  experiences,
  navItems,
  principles,
  projects,
  type Project,
} from "@/content/site-content";

const sectionIds = navItems.map((item) => item.href.slice(1));

function Arrow({ direction = "diagonal" }: { direction?: "diagonal" | "down" }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">{direction === "down" ? "↓" : "↗"}</span>;
}

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
    <header className="section-header" data-reveal>
      <div className="section-kicker"><span>{index}</span><p>{label}</p></div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </header>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.visual}`} aria-hidden="true">
      <span className="visual-corner corner-one" /><span className="visual-corner corner-two" />
      {project.visual === "network" && (
        <div className="network-map">
          <i className="node n1" /><i className="node n2" /><i className="node n3" /><i className="node n4" />
          <b className="network-core">VOID</b><span className="line l1" /><span className="line l2" /><span className="line l3" />
        </div>
      )}
      {project.visual === "research" && (
        <div className="research-plot">
          <div className="plot-label"><span>MODEL EVALUATION</span><span>HOLDOUT</span></div>
          <div className="plot-bars">{[41, 58, 47, 72, 63, 79, 68, 86, 74].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
          <div className="plot-axis"><span>DATA</span><span>TRAIN</span><span>SIMULATE</span><span>EVALUATE</span></div>
        </div>
      )}
      {project.visual === "market" && (
        <div className="supply-telemetry">
          <div className="supply-telemetry__head"><span>SUPPLY / CONTRACTING</span><strong>TELEMETRY</strong></div>
          <svg viewBox="0 0 520 190" aria-hidden="true">
            <path className="supply-gridline" d="M20 35H500M20 85H500M20 135H500M20 185H500" />
            <path className="supply-line" d="M25 28 C95 46 118 48 170 70 S270 94 318 117 S410 132 492 165" />
            <circle cx="492" cy="165" r="5" />
          </svg>
          <div className="supply-telemetry__ring"><span>BURN</span><strong>↓</strong></div>
          <div className="supply-telemetry__ticks"><span>SUPPLY</span><i /><i /><i /><i /><i /><span>BURN</span></div>
        </div>
      )}
      {project.visual === "portfolio" && (
        <div className="allocation-visual">
          <div className="allocation-visual__axes"><span>RETURN</span><span>RISK</span></div>
          <svg viewBox="0 0 520 260" aria-hidden="true">
            <path className="allocation-grid" d="M40 30V225H495M40 177H495M40 128H495M40 79H495" />
            <path className="allocation-curve" d="M70 200 C135 128 220 80 305 58 S420 38 480 34" />
            <g className="allocation-points"><circle cx="105" cy="175" r="6" /><circle cx="168" cy="127" r="6" /><circle cx="248" cy="83" r="6" /><circle cx="332" cy="54" r="6" /><circle cx="415" cy="44" r="6" /></g>
            <circle className="allocation-selected" cx="305" cy="58" r="12" />
          </svg>
          <div className="allocation-visual__legend"><span>DATA</span><span>RISK</span><span>ALLOCATION</span></div>
        </div>
      )}
      <div className="visual-meta"><span>{project.index} / SYSTEM</span><span>{project.category}</span></div>
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className={`project-entry project-${project.visual}`} data-reveal>
      <Link href={`/work/${project.slug}`} className="project-link" aria-label={`View ${project.name} project overview`}>
        <div className="project-copy">
          <div className="project-meta"><span>{project.index}</span><p>{project.category}</p></div>
          <h3>{project.name}</h3>
          <p className="project-role">{project.role}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="project-action">Project overview <Arrow /></div>
        </div>
        <ProjectVisual project={project} />
      </Link>
    </article>
  );
}

export function Site() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-35% 0px -55%" },
    );
    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) sectionObserver.observe(node);
    });

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function moveLight(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  }

  function moveCapabilityMap(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const dx = Math.max(-3, Math.min(3, ((x / bounds.width) - 0.5) * 6));
    const dy = Math.max(-3, Math.min(3, ((y / bounds.height) - 0.5) * 6));
    event.currentTarget.style.setProperty("--map-dx", `${dx}px`);
    event.currentTarget.style.setProperty("--map-dy", `${dy}px`);
    event.currentTarget.style.setProperty("--map-x", `${x}px`);
    event.currentTarget.style.setProperty("--map-y", `${y}px`);

    let nearestProject = "";
    let nearestDistance = Number.POSITIVE_INFINITY;
    event.currentTarget.querySelectorAll<HTMLElement>(".capability-project").forEach((node) => {
      const nodeBounds = node.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (nodeBounds.left + nodeBounds.width / 2),
        event.clientY - (nodeBounds.top + nodeBounds.height / 2),
      );
      if (distance < nearestDistance) {
        nearestProject = node.dataset.project ?? "";
        nearestDistance = distance;
      }
    });
    event.currentTarget.dataset.nearest = nearestProject;
  }

  function resetCapabilityMap(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--map-dx", "0px");
    event.currentTarget.style.setProperty("--map-dy", "0px");
    event.currentTarget.dataset.nearest = "";
  }

  return (
    <div className="site">
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="atmosphere" aria-hidden="true"><span /></div>

      <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a href="#top" className="identity" aria-label="Eirik Otis, home"><span>EO</span><strong>Eirik Otis</strong></a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={active === item.href.slice(1) ? "active" : ""}>{item.label}</a>
          ))}
        </nav>
      </header>

      <main id="content">
        <section id="top" className="hero" onPointerMove={moveLight}>
          <div className="pointer-light" aria-hidden="true" />
          <div className="hero-copy visible" data-reveal>
            <div className="hero-eyebrow"><span className="signal-dot" />EIRIK OTIS <i>PRODUCT · COMMERCIAL · TECHNICAL EXECUTION</i></div>
            <h1>I work across product, commercial and technical execution to move complex ideas into the real world.</h1>
            <p className="hero-lede">Building products, systems and market opportunities—especially where the problem is complex, the path is unclear and ownership matters.</p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">View selected work <Arrow direction="down" /></a>
              <a href="#contact" className="button button-secondary">Start a conversation <Arrow /></a>
            </div>
          </div>
          <div className="capability-field" onPointerMove={moveCapabilityMap} onPointerLeave={resetCapabilityMap}>
            <div className="capability-field__light" aria-hidden="true" />
            <svg className="capability-field__lines" viewBox="0 0 600 480" aria-hidden="true">
              <path className="capability-triangle" d="M300 52 L80 402 L520 402 Z" />
              <g data-lines="void"><path d="M250 210L300 52M250 210L80 402M250 210L520 402" /></g>
              <g data-lines="autoresearch"><path d="M375 200L300 52M375 200L520 402" /></g>
              <g data-lines="dusd"><path d="M300 292L300 52M300 292L80 402M300 292L520 402" /></g>
              <g data-lines="ocl"><path d="M400 300L300 52M400 300L80 402M400 300L520 402" /></g>
              <g data-lines="kpmg">
                <path d="M210 350L80 402M210 350L520 402" />
                <path className="capability-line--minimal" d="M210 350L300 52" />
              </g>
            </svg>
            <div className="capability-anchor capability-anchor--product"><span>01</span><strong>PRODUCT</strong></div>
            <div className="capability-anchor capability-anchor--commercial"><span>02</span><strong>COMMERCIAL</strong></div>
            <div className="capability-anchor capability-anchor--technical"><span>03</span><strong>TECHNICAL</strong></div>
            <Link className="capability-project capability-project--void" data-project="void" href="/work/void/">
              <strong>VOID</strong><span>Product, risk and venture execution</span>
            </Link>
            <Link className="capability-project capability-project--autoresearch" data-project="autoresearch" href="/work/bittensor-autoresearch/">
              <strong>AUTORESEARCH</strong><span>Quantitative systems and ML research</span>
            </Link>
            <Link className="capability-project capability-project--dusd" data-project="dusd" href="/work/dusd/">
              <strong>DUSD.FUN</strong><span>Live product, data and market positioning</span>
            </Link>
            <Link className="capability-project capability-project--ocl" data-project="ocl" href="/work/one-click-labs/">
              <strong>ONE CLICK LABS</strong><span>APIs, portfolio research and DeFi yield</span>
            </Link>
            <Link className="capability-project capability-project--kpmg" data-project="kpmg" href="/#experience">
              <strong>KPMG</strong><span>Financial services, client delivery and technology-enabled operations</span>
            </Link>
          </div>
          <div className="hero-footer visible" data-reveal><span>LONDON / UK</span><p>Product ownership, commercial execution and technical systems.</p><span>SCROLL / WORK</span></div>
        </section>

        <section id="work" className="section selected-work">
          <SectionHeader
            index="01"
            label="SELECTED WORK"
            title="Evidence of range."
            copy="Products and systems I have helped define, build or operate—across financial infrastructure, quantitative research and live markets."
          />
          <div className="project-list">{projects.map((project) => <ProjectEntry key={project.slug} project={project} />)}</div>
        </section>

        <section id="capabilities" className="section capabilities-section">
          <SectionHeader
            index="02"
            label="OPERATING RANGE"
            title="One operator. Multiple points of leverage."
            copy="The most valuable early-stage work rarely fits cleanly inside one function. I work across the product, commercial and technical layers required to move an opportunity forward."
          />
          <div className="capability-map">
            <div className="capability-axis axis-x" aria-hidden="true" /><div className="capability-axis axis-y" aria-hidden="true" />
            {capabilities.map((capability) => (
              <article className="capability" data-reveal key={capability.title}>
                <span className="capability-index">{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div>{capability.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
          <p className="technical-note" data-reveal>Technically capable enough to build real systems, direct implementation and work effectively with stronger specialist engineers.</p>
        </section>

        <section id="experience" className="section experience-section">
          <SectionHeader
            index="03"
            label="PROFESSIONAL FOUNDATION"
            title="Built across institutions, startups and independent systems."
            copy="Different environments. The same expectation: understand the system, create structure and take responsibility for the outcome."
          />
          <div className="experience-grid">
            {experiences.map((experience, index) => (
              <article className="experience-panel" data-reveal key={experience.organisation}>
                <div className="experience-top"><span>0{index + 1}</span><p>{experience.environment}</p></div>
                <h3>{experience.organisation}</h3>
                <p className="experience-role">{experience.role}</p>
                {experience.proof && <p className="experience-proof">{experience.proof}</p>}
                <p className="experience-description">{experience.description}</p>
              </article>
            ))}
          </div>
          <div className="education" data-reveal><span>EDUCATION</span><strong>University of Warwick</strong><p>First-Class BSc Accounting &amp; Finance</p></div>
        </section>

        <section className="section principles-section">
          <SectionHeader index="04" label="WORKING STYLE" title="How I work" />
          <div className="principle-list">
            {principles.map(([index, title, copy]) => (
              <article data-reveal key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-kicker" data-reveal><span>05</span><p>PERSONAL CONTEXT</p></div>
          <div className="about-copy" data-reveal>
            <h2>Beyond the work</h2>
            <p>Interested in artificial intelligence, markets, decentralised systems, product design, quantitative research and how small teams create disproportionate outcomes.</p>
            <p className="outside">Away from screens: running, football, chess, travel, nature and scuba diving.</p>
          </div>
          <div className="about-coordinates" aria-hidden="true"><span>51.5072° N</span><span>0.1276° W</span></div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-copy" data-reveal>
            <div className="hero-eyebrow"><span className="signal-dot" />CONTACT / 06</div>
            <h2>Let’s build<br />something difficult.</h2>
            <p>Open to conversations with ambitious teams working on technically complex products, new markets and difficult commercial problems.</p>
          </div>
          <div className="contact-links" data-reveal>
            <a href={`mailto:${contact.email}`}><span>Email</span><strong>{contact.email}</strong><Arrow /></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Eirik Otis</strong><Arrow /></a>
          </div>
        </section>
      </main>

      <footer><span>Eirik Otis</span><span>Product · Commercial · Technical</span><span>eirik.co.uk</span></footer>
    </div>
  );
}
