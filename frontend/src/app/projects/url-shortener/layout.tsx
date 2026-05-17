import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "URL Shortener",
  openGraph: {
    title: "URL Shortener — Fuad Haque",
    description: "Custom slug URL shortener with click analytics and Redis caching.",
    url: "https://fuadhaque.com/projects/url-shortener",
    images: [{ url: "https://fuadhaque.com/og/url-shortener.png", width: 1200, height: 630, alt: "URL Shortener" }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
