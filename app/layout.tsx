import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./editorial-system.css";
import "./refinement.css";

const siteUrl = "https://eirik.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eirik Otis — Product, Commercial Execution & Technical Systems",
  description:
    "Eirik Otis turns complex ideas into products, technical systems and commercial momentum.",
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
    title: "Eirik Otis — Product, Commercial Execution & Technical Systems",
    description:
      "Product ownership, commercial execution and technical delivery for complex early-stage products.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Eirik Otis — Product, Commercial Execution and Technical Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eirik Otis — Product, Commercial Execution & Technical Systems",
    description:
      "Product ownership, commercial execution and technical delivery for complex early-stage products.",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
