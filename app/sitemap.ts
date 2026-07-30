import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const work = ["void", "bittensor-autoresearch", "dusd", "one-click-labs"].map((slug) => ({
    url: `https://eirik.co.uk/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [{ url: "https://eirik.co.uk", lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, ...work];
}
