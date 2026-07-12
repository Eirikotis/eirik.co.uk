"use client";

import { useEffect, useState } from "react";

const nowItems = [
  {
    number: "01",
    title: "AI credit infrastructure",
    copy: "Designing financial infrastructure for emerging machine-intelligence networks, including lending markets, collateral systems, risk architecture and cross-chain execution.",
    status: "BUILDING",
  },
  {
    number: "02",
    title: "Autonomous research",
    copy: "Experimenting with systems that allow models to train, evaluate and improve against clearly defined objectives.",
    status: "EXPERIMENTING",
  },
  {
    number: "03",
    title: "Applied machine learning",
    copy: "Exploring where smaller, specialised models can outperform expensive general-purpose systems inside real workflows.",
    status: "RESEARCHING",
  },
  {
    number: "04",
    title: "Product and ownership",
    copy: "Thinking about how small, technically capable teams can build valuable systems without excessive hierarchy, process or dependency.",
    status: "THINKING",
  },
];

const ideas = [
  ["01", "Find the real constraint", "Most problems are misdiagnosed before they are badly solved."],
  ["02", "Systems over features", "The product is the interaction between technology, incentives, behaviour and economics."],
  ["03", "Ship to learn", "A functioning system produces better information than another round of abstract planning."],
  ["04", "Ownership changes the work", "People make different decisions when they are responsible for the outcome rather than merely the process."],
];

const interests = {
  Systems: ["Artificial intelligence", "Machine-learning systems", "Market design", "Financial infrastructure", "Decentralised networks", "Product strategy", "Autonomous research", "Quantitative systems", "Venture building", "Ownership"],
  "Outside work": ["Scuba diving", "Running", "Chess", "Football", "Nature", "Travel"],
};

const sectionIds = ["about", "now", "ideas", "interests", "contact"];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function SystemField() {
  return (
    <div className="system-field" aria-hidden="true">
      <svg viewBox="0 0 680 590" role="presentation">
        <g className="field-grid">
          <path d="M60 40V550M160 40V550M260 40V550M360 40V550M460 40V550M560 40V550M40 90H640M40 190H640M40 290H640M40 390H640M40 490H640" />
        </g>
        <g className="field-rings">
          <circle cx="358" cy="286" r="76" />
          <circle cx="358" cy="286" r="143" />
          <circle cx="358" cy="286" r="214" />
        </g>
        <g className="field-paths">
          <path d="M86 434L198 345L285 376L358 286L454 219L594 148" />
          <path d="M198 345L235 196L358 286L495 395L577 348" />
        </g>
        <g className="field-nodes">
          <circle cx="86" cy="434" r="3" /><circle cx="198" cy="345" r="4" />
          <circle cx="235" cy="196" r="3" /><circle cx="285" cy="376" r="3" />
          <circle className="field-core" cx="358" cy="286" r="7" />
          <circle cx="454" cy="219" r="4" /><circle cx="495" cy="395" r="3" />
          <circle cx="577" cy="348" r="3" /><circle cx="594" cy="148" r="4" />
        </g>
        <g className="field-labels">
          <text x="68" y="456">ORIGIN / 01</text><text x="373" y="279">FIELD</text>
          <text x="525" y="135">SIGNAL / 04</text><text x="506" y="418">VECTOR</text>
        </g>
      </svg>
      <div className="field-meta"><span>COORDINATE FIELD</span><span>51.5072° N · 0.1276° W</span></div>
    </div>
  );
}

export function Site() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));

    const sections = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-35% 0px -55%" },
    );
    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) sections.observe(node);
    });

    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      reveal.disconnect();
      sections.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function moveLight(event: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  }

  return (
    <div className="site">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="page-atmosphere" aria-hidden="true"><span /></div>

      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <a href="#top" className="identity" aria-label="Eirik Otis, home">
          <span className="identity-mark">EO</span>
          <span>Eirik Otis</span>
        </a>
        <nav aria-label="Main navigation">
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      <main id="content">
        <section id="top" className="hero" onPointerMove={moveLight}>
          <div className="pointer-light" aria-hidden="true" />
          <div className="hero-copy visible" data-reveal>
            <p className="eyebrow"><i /> EIRIK OTIS <span>PRODUCT · SYSTEMS · VENTURES</span></p>
            <h1>I build at the intersection of software, markets and financial systems.</h1>
            <p className="hero-intro">Product, AI systems, new ventures and the infrastructure behind them.</p>
            <a href="#about" className="explore-link">Explore <span aria-hidden="true">↓</span></a>
          </div>
          <SystemField />
          <div className="hero-footer visible" data-reveal>
            <span>BASED IN LONDON</span>
            <p>Working on technically complex products where incentives, capital and software meet.</p>
            <span>SCROLL / 01</span>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-label" data-reveal><span>01</span><p>ABOUT</p></div>
          <div className="about-content" data-reveal>
            <h2>A little context</h2>
            <p className="large-copy">I am interested in difficult systems: products where technology, incentives, capital and human behaviour collide.</p>
            <div className="about-detail">
              <p>My work has moved across financial services, early-stage product development, quantitative systems and venture building. I am most useful when the problem is commercially meaningful, technically complex and not yet fully defined.</p>
              <p className="supporting">Experience across regulated financial services, fintech products and distributed engineering teams.</p>
            </div>
          </div>
        </section>

        <section id="now" className="section now">
          <div className="section-intro" data-reveal>
            <div className="section-label"><span>02</span><p>NOW</p></div>
            <div><h2>Currently</h2><p>A few of the systems and ideas occupying my attention.</p></div>
          </div>
          <div className="now-list">
            {nowItems.map((item) => (
              <article className="now-row" data-reveal key={item.number}>
                <span className="row-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span className="status"><i />{item.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="ideas" className="section ideas">
          <div className="section-intro" data-reveal>
            <div className="section-label"><span>03</span><p>IDEAS</p></div>
            <div><h2>Ideas I return to</h2><p>Principles for making useful things under uncertain conditions.</p></div>
          </div>
          <div className="idea-list">
            {ideas.map(([number, title, copy]) => (
              <article className="idea-row" data-reveal key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="interests" className="section interests">
          <div className="section-label" data-reveal><span>04</span><p>INTERESTS</p></div>
          <div className="interests-content" data-reveal>
            <h2>Interests</h2>
            {Object.entries(interests).map(([group, items]) => (
              <div className="interest-group" key={group}>
                <h3>{group}</h3>
                <div>{items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="elsewhere">
          <p className="eyebrow" data-reveal>ELSEWHERE</p>
          <p data-reveal>Away from screens, I am usually running, following football, travelling or looking for somewhere worth diving.</p>
        </section>

        <section id="contact" className="contact">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow"><i /> CONTACT / 05</p>
            <h2>Let’s build<br />something difficult.</h2>
            <p>Open to product, technology, venture and strategic conversations.</p>
          </div>
          <div className="contact-links" data-reveal>
            <a href="mailto:eirik.otis@outlook.com"><span>Email</span><strong>eirik.otis@outlook.com</strong><Arrow /></a>
            <a href="https://github.com/Eirikotis" target="_blank" rel="noreferrer"><span>GitHub</span><strong>@Eirikotis</strong><Arrow /></a>
          </div>
        </section>
      </main>

      <footer><span>Eirik Otis</span><span>eirik.co.uk</span><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
