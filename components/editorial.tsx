import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/content/portfolio";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-identity" href="/" aria-label="Eirik Otis, home">
        <span>EO</span><strong>Eirik Otis</strong>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/experience/">Experience</Link>
        <Link href="/about/">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Eirik Otis</span>
      <span>London, UK</span>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="page-shell"><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}<SiteFooter /></div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function TextLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return external
    ? <a className="text-link" href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗</span></a>
    : <Link className="text-link" href={href}>{children}<span aria-hidden="true">→</span></Link>;
}

export function WorkHeader({ title, description, role, period }: { title: string; description: string; role: string; period: string }) {
  return (
    <header className="work-header content-width">
      <Link className="back-link" href="/#work">← Selected work</Link>
      <div className="work-heading">
        <div><Eyebrow>{role} · {period}</Eyebrow><h1>{title}</h1></div>
        <p>{description}</p>
      </div>
    </header>
  );
}

export function ContentSection({ label, title, children, id }: { label: string; title: string; children: ReactNode; id?: string }) {
  return (
    <section className="content-section content-width" id={id}>
      <header><Eyebrow>{label}</Eyebrow><h2>{title}</h2></header>
      <div className="section-content">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return <ul className="evidence-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export function NextWork({ href, label }: { href: string; label: string }) {
  return <aside className="next-work content-width"><Eyebrow>Next</Eyebrow><Link href={href}><span>{label}</span><b aria-hidden="true">→</b></Link></aside>;
}
