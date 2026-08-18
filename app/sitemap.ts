import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://eirik.co.uk", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
