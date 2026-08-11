import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BittensorPage, DusdPage, KpmgPage, LegacyWorkPage, OneClickLabsPage } from "@/components/work-pages";

const slugs = ["bittensor", "kpmg", "dusd", "one-click-labs", "void", "bittensor-autoresearch"] as const;

const pageMetadata: Record<(typeof slugs)[number], { title: string; description: string }> = {
  bittensor: { title: "Bittensor", description: "Professional product, market strategy and research work across decentralised AI markets." },
  kpmg: { title: "KPMG UK", description: "Financial services, systems and client delivery across complex regulated institutions." },
  dusd: { title: "dusd.fun", description: "A live Solana market-data and supply analytics product reaching around 300 unique daily visitors." },
  "one-click-labs": { title: "One Click Labs", description: "Product and quantitative work across DeFi investment infrastructure." },
  void: { title: "VOID / Bittensor", description: "VOID now sits within the consolidated Bittensor body of work." },
  "bittensor-autoresearch": { title: "AutoResearch / Bittensor", description: "AutoResearch now sits within the consolidated Bittensor body of work." },
};

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return slug in pageMetadata ? pageMetadata[slug as keyof typeof pageMetadata] : {};
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "bittensor") return <BittensorPage />;
  if (slug === "kpmg") return <KpmgPage />;
  if (slug === "dusd") return <DusdPage />;
  if (slug === "one-click-labs") return <OneClickLabsPage />;
  if (slug === "void") return <LegacyWorkPage destination="/work/bittensor/#void" label="VOID" />;
  if (slug === "bittensor-autoresearch") return <LegacyWorkPage destination="/work/bittensor/#autoresearch" label="Bittensor AutoResearch" />;
  notFound();
}
