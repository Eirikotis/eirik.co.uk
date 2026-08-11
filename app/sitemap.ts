import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const work = ["bittensor", "dusd", "one-click-labs"].map((slug) => ({
    url: `https://eirik.co.uk/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [
    { url: "https://eirik.co.uk", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...work,
    { url: "https://eirik.co.uk/experience", lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: "https://eirik.co.uk/about", lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
}
