"use client"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const stats = [
  { value: "5", label: "projects deployed" },
  { value: "3", label: "frontends shipped" },
  { value: "<4hr", label: "avg response time" },
]

export function StatsStrip() {
  const ref = useScrollReveal()

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            data-reveal
            className="bg-[#10101A] border border-[#1A1A2E] rounded-sm p-5 group hover:border-[#2A2A4A] hover:border-l-2 hover:border-l-[#6C63FF] transition-all duration-200"
          >
            <p
              className="font-display font-bold text-[#EEEEFF] mb-2"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {stat.value}
            </p>
            <p className="font-mono text-[0.7rem] text-[#50507A]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}