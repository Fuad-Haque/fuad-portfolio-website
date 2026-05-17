import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Task Automation API",
  openGraph: {
    title: "Task Automation API - Fuad Haque",
    description: "Background job processing API with async task queue and webhook triggers.",
    url: "https://fuadhaque.com/projects/task-automation",
    images: [{ url: "https://fuadhaque.com/og/task-automation.png", width: 1200, height: 630, alt: "Task Automation API" }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
