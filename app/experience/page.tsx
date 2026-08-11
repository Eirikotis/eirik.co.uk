import type { Metadata } from "next";
import { ExperiencePage } from "@/components/profile-pages";

export const metadata: Metadata = { title: "Experience", description: "Eirik Otis — professional experience and education." };

export default function Page() {
  return <ExperiencePage />;
}
