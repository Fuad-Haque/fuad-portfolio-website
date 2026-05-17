import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "fuadhaque.com",
  openGraph: {
    title: "fuadhaque.com - Fuad Haque",
    description: "Full-Stack AI Engineer portfolio - FastAPI, Next.js, TypeScript, deployed on Vercel.",
    url: "https://fuadhaque.com/projects/portfolio",
    images: [{ url: "https://fuadhaque.com/og/portfolio.png", width: 1200, height: 630, alt: "fuadhaque.com" }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
