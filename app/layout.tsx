import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://eirik.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eirik Otis — Product, AI Systems & Financial Infrastructure",
  description:
    "Eirik Otis builds and leads technical products across AI systems, financial infrastructure, analytics and new ventures.",
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
    title: "Eirik Otis — Product, AI Systems & Financial Infrastructure",
    description:
      "Technical product leadership across AI systems, financial infrastructure, analytics and new ventures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eirik Otis — Product, AI Systems & Financial Infrastructure",
    description:
      "Technical product leadership across AI systems, financial infrastructure, analytics and new ventures.",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#080808",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
