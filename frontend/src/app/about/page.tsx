import { TerminalBlock } from "@/components/ui/TerminalBlock"

export default function AboutPage() {
  const terminalLines = [
    "$ fuad --info",
    "",
    "Name:        Fuad Haque",
    "Role:        Full-Stack Engineer",
    "Location:    Sylhet, Bangladesh",
    "Status:      ● available",
    "Stack:       FastAPI · Next.js · Qdrant · SSE · GSAP · WebSocket",
    "Deployed:    5 projects",
    "Uptime:      actively building",
    "",
    "$ ",
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <p className="font-mono text-[#50507A] text-[0.9rem] mb-12">// about</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — Terminal */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              className="font-display font-black text-[#EEEEFF]"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)", opacity: 0.04 }}
            >
              FUAD
            </span>
          </div>
          <TerminalBlock lines={terminalLines} title="fuad@portfolio ~ " />
        </div>

        {/* Right — Text */}
        <div>
          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-6">
            Full-stack engineer building production AI-powered systems from Sylhet, Bangladesh.
          </p>
          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-6">
            FastAPI backends · Next.js frontends · Qdrant vector search · SSE streaming · GSAP animations · Framer Motion transitions · WebSocket real-time
          </p>
          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-8">
            REST APIs · Webhook integrations · Full-stack MVPs · Semantic search · Real-time dashboards · Task automation
          </p>

          <p className="font-mono text-[#50507A] text-[0.75rem]">
            Reply time: &lt; 4 hours · Timezone: UTC+6 (BDT) · Available for: remote only
          </p>
        </div>

      </div>
    </div>
  )
}