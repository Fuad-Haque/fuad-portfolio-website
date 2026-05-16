import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    title: "Projects — Fuad Haque",
    description: "5 production projects: Semantic Search, Webhook Inspector, Task Automation API, URL Shortener, and Portfolio.",
    url: "https://fuadhaque.com/projects",
    images: [
      {
        url: "https://fuadhaque.com/og/semantic-search.png",
        width: 1200,
        height: 630,
        alt: "Fuad Haque — Projects",
      },
    ],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}