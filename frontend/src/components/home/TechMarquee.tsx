"use client"

const techs = [
  "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Docker", "Railway",
  "Vercel", "SQLAlchemy", "Pydantic", "Redis", "Qdrant", "Sentence-Transformers",
  "Tailwind CSS", "Framer Motion", "JWT", "Resend", "GitHub Actions", "WebSocket", "SSE",
]

export function TechMarquee() {
  const items = [...techs, ...techs]

  return (
    <div className="relative overflow-hidden py-4 border-y border-[#1A1A2E] group">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
        {items.map((tech, i) => (
          <span key={i} className="font-mono text-[0.75rem] text-[#50507A] hover:text-[#9090BB] transition-colors duration-150 mx-4">
            {tech} <span className="text-[#1A1A2E] mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}