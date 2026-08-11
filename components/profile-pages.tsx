import { BulletList, ContentSection, Eyebrow, PageShell, TextLink } from "@/components/editorial";
import { education, experience, profile, qualification } from "@/content/portfolio";

export function ExperiencePage() {
  return (
    <PageShell><main id="main" className="profile-page"><header className="profile-header content-width"><Eyebrow>Background</Eyebrow><h1>Experience</h1><p>Professional experience across regulated financial services, quantitative product development and commercial technology.</p></header><section className="timeline content-width">{experience.map((item) => <article key={item.organisation}><div><h2>{item.organisation}</h2><p>{item.role}</p></div><time>{item.period}</time><p>{item.description}</p>{"href" in item && item.href && <TextLink href={item.href}>View related work</TextLink>}</article>)}</section><ContentSection label="Education" title={education.institution}><div className="education-detail"><p>{education.qualification}</p><strong>{education.result}</strong><span>{education.note}</span></div></ContentSection><ContentSection label="Professional qualification" title={qualification.name}><div className="prose"><p>{qualification.status}</p></div></ContentSection></main></PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell><main id="main" className="profile-page"><header className="profile-header content-width"><Eyebrow>About</Eyebrow><h1>A finance background, extended into products and systems.</h1></header><ContentSection label="Background" title="Institutional grounding; emerging-market work"><div className="prose"><p>I studied Accounting & Finance at Warwick Business School before working across quantitative DeFi products and Financial Services Assurance at KPMG UK.</p><p>Alongside that institutional grounding, I have built and researched products around decentralised AI, market infrastructure, on-chain data and quantitative decision systems.</p><p>I am most interested in situations where product decisions depend on understanding both the technical system and the market around it.</p></div></ContentSection><ContentSection label="Current interests" title="AI infrastructure, financial technology and market design"><BulletList items={["Decentralised compute and inference", "Financial infrastructure for emerging markets", "Quantitative research systems", "Product strategy and technical-commercial execution"]} /></ContentSection><ContentSection label="Outside work" title="A few other things"><div className="prose"><p>Running, football, chess, travel, nature and scuba diving.</p><p>Based in {profile.location}.</p></div></ContentSection></main></PageShell>
  );
}
