import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/site-content";
import { AutoResearchCaseStudy } from "@/components/autoresearch-case-study";
import { DusdCaseStudy } from "@/components/dusd-case-study";
import { OneClickLabsCaseStudy } from "@/components/one-click-labs-case-study";
import { VoidCaseStudy } from "@/components/void-case-study";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? { title: `${project.name} — Eirik Otis`, description: project.description }
    : {};
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "void") {
    return <VoidCaseStudy />;
  }
  if (slug === "dusd") {
    return <DusdCaseStudy />;
  }
  if (slug === "one-click-labs") {
    return <OneClickLabsCaseStudy />;
  }
  if (slug === "bittensor-autoresearch") {
    return <AutoResearchCaseStudy />;
  }
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="work-page">
      <header className="work-page-nav">
        <Link href="/#work">← Selected work</Link>
        <Link href="/">Eirik Otis</Link>
      </header>
      <article className="work-overview">
        <div className="work-overview-meta">
          <span>{project.index}</span>
          <p>{project.category}</p>
        </div>
        <h1>{project.name}</h1>
        <p className="work-overview-role">{project.role}</p>
        <p className="work-overview-lede">{project.description}</p>
        <div className="work-overview-content">
          <div>
            <span className="work-overview-label">OWNERSHIP</span>
            <ul>{project.detail.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <span className="work-overview-label">CAPABILITIES</span>
            <div className="work-overview-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
        <footer className="work-overview-footer">
          <p>Project overview</p>
          <Link href="/#contact">Start a conversation ↗</Link>
        </footer>
      </article>
    </main>
  );
}
