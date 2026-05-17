import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Semantic Search Platform",
  openGraph: {
    title: "Semantic Search Platform — Fuad Haque",
    description: "Vector search platform with Qdrant, Sentence Transformers, and semantic ranking.",
    url: "https://fuadhaque.com/projects/semantic-search",
    images: [{ url: "https://fuadhaque.com/og/semantic-search.png", width: 1200, height: 630, alt: "Semantic Search Platform" }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
