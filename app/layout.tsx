import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://eirik.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eirik Otis",
    template: "%s — Eirik Otis",
  },
  description: "Explore Eirik Otis's professional background across product, markets, financial systems and technology.",
  keywords: [
    "Eirik Otis",
    "product leadership",
    "AI systems",
    "financial infrastructure",
    "financial technology",
  ],
  authors: [{ name: "Eirik Otis", url: siteUrl }],
  creator: "Eirik Otis",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Eirik Otis",
    title: "Eirik Otis",
    description: "Professional background across product, markets, financial systems and technology.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Eirik Otis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eirik Otis",
    description: "Professional background across product, markets, financial systems and technology.",
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f2efe7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
