import { PageShell, Eyebrow, TextLink } from "@/components/editorial";
import { education, experience, primaryWork, profile } from "@/content/portfolio";

export function HomePage() {
  return (
    <PageShell>
      <main id="main">
        <section className="home-intro content-width">
          <div>
            <Eyebrow>{profile.location}</Eyebrow>
            <h1>Eirik Otis</h1>
          </div>
          <div className="intro-copy">
            <p className="intro-lede">Product, technical and commercial work across AI infrastructure, financial systems and markets.</p>
            <p>I work on products and systems where technology, economics and commercial execution intersect.</p>
            <div className="intro-links"><a className="text-link" href="#work">Selected work <span aria-hidden="true">↓</span></a><TextLink href={profile.linkedin} external>LinkedIn</TextLink></div>
          </div>
        </section>

        <section className="work-index content-width" id="work">
          <header className="index-heading"><Eyebrow>Selected work</Eyebrow><p>Three bodies of work spanning decentralised AI, live product development and quantitative financial infrastructure.</p></header>
          <div className="work-rows">
            {primaryWork.map((project, index) => (
              <article className="work-row" key={project.slug}>
                <span className="row-index">0{index + 1}</span>
                <div><p className="row-period">{project.period}</p><h2>{project.name}</h2></div>
                <div className="row-copy"><p>{project.summary}</p><p>{project.detail}</p><TextLink href={`/work/${project.slug}/`}>View work</TextLink></div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-experience content-width" id="experience">
          <header className="index-heading"><Eyebrow>Experience</Eyebrow><p>Professional grounding in financial services, product development and commercial technology.</p></header>
          <div className="experience-list">
            {experience.map((item) => (
              <article key={item.organisation}>
                <div><h3>{item.organisation}</h3><p>{item.role}</p></div><p>{item.period}</p>
              </article>
            ))}
            <article><div><h3>{education.institution}</h3><p>{education.qualification} · {education.result}</p></div><p>{education.note}</p></article>
          </div>
          <TextLink href="/experience/">Full background</TextLink>
        </section>

        <section className="home-about content-width">
          <Eyebrow>About</Eyebrow>
          <p>My background combines institutional finance with product, quantitative research and emerging technology. Current interests include AI infrastructure, market design and financial systems.</p>
          <TextLink href="/about/">More about me</TextLink>
        </section>

        <section className="contact content-width" id="contact">
          <Eyebrow>Contact</Eyebrow>
          <h2>Open to interesting conversations.</h2>
          <p>I’m interested in product, strategy and technical-commercial roles around AI infrastructure, financial technology and emerging markets.</p>
          <div className="contact-links"><a href={`mailto:${profile.email}`}>{profile.email}</a><TextLink href={profile.linkedin} external>LinkedIn</TextLink><TextLink href={profile.github} external>GitHub</TextLink></div>
        </section>
      </main>
    </PageShell>
  );
}
