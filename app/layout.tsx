import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://eirik.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eirik Otis — Product, commercial and technical work",
    template: "%s — Eirik Otis",
  },
  description:
    "Selected product, commercial and technical work across AI infrastructure, financial systems and markets.",
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
    title: "Eirik Otis — Product, commercial and technical work",
    description:
      "Selected work across AI infrastructure, financial systems and markets.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Eirik Otis — selected work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eirik Otis — Product, commercial and technical work",
    description:
      "Selected work across AI infrastructure, financial systems and markets.",
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
