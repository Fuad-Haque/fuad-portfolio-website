import { TerminalBlock } from "@/components/ui/TerminalBlock"

export default function AboutPage() {
  const terminalLines = [
    "$ fuad --info",
    "",
    "Name:        Fuad Haque",
    "Role:        Full-Stack Engineer",
    "Location:    Sylhet, Bangladesh",
    "Status:      ● available",
    "Stack:       FastAPI · Next.js · Qdrant · PostgreSQL · SSE · GSAP · WebSocket",
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

        {/* Right — Abstract */}
        <div>
          <p className="font-mono text-[#50507A] text-[0.9rem] mb-6">// abstract</p>

          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-6">
            A polymath, in theoretical terms, is someone who is expert at different skills based on certain levels. But what I think when someone asks me about being a polymath is this — when a person connects distinct fundamentalist critics from various sources and creates new domains.
          </p>

          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-6">
            For example, if I were to say I&apos;m great at programming — not coding, not computer science fields or mathematics, but at programming — programming for me is about exploring your imaginations. Writing your imaginations. And I also think programming is really hard, isn&apos;t it? I think it first requires your imagination to be at very high dimensions, and not just that, the variables inside your imaginations should be structured, ordered and on point, they can&apos;t be vague or capricious. Then you should apply logic to every variable of your imaginations — PERFECT LOGIC! And that&apos;s not even the hardest part, the hardest part is writing all that imagination, variables, constants, logics; with extremely proper syntax and formulas, man! And there comes the rules of computers and computer science after genuinely writing all that — arrangements, deployments, version control, everything. Cherry on top, you have to also be very good at English, or else you will be devastated. Being good at mathematics, physics, engineering; in an artistic manner, also helps.
          </p>

          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-6">
            But back to polymath-ing — I connect all this to one thing: &apos;Love&apos;. Everything we do in life is a way to be loved a little more. All this brainstorming is just a mere way to earn the means that lead to your access of love, from the desired companion. All the knowledge, all the intelligence, but no accessible patterns that break me into your doors.
          </p>

          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-6">
            So the polymath in me will always look for ways to connect my funneling knowledges to develop the imaginations that rewire my brain into winning you.
          </p>

          <p className="font-body text-[#9090BB] text-[1.05rem] leading-[1.8] mb-8">
            I may, be able, to understand the secrets of the universe, but I will never understand the truth about you.
          </p>

          <p className="font-body text-[#707099] text-[0.85rem] leading-[1.8]">
            I therefore dedicate all the operations of this website to the love of my life.
          </p>
        </div>

      </div>
    </div>
  )
}