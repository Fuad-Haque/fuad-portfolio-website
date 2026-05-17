import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Webhook Inspector",
  openGraph: {
    title: "Webhook Inspector - Fuad Haque",
    description: "Real-time webhook event feed with HMAC verification and replay engine.",
    url: "https://fuadhaque.com/projects/webhook-inspector",
    images: [{ url: "https://fuadhaque.com/og/webhook-inspector.png", width: 1200, height: 630, alt: "Webhook Inspector" }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
