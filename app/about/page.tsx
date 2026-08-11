import type { Metadata } from "next";
import { AboutPage } from "@/components/profile-pages";

export const metadata: Metadata = { title: "About", description: "Background and current interests of Eirik Otis." };

export default function Page() {
  return <AboutPage />;
}
