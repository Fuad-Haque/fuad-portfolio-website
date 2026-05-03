"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  })
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end pb-24 px-6 md:px-12 overflow-hidden">

      {/* Decorative background number */}
      <div className="absolute bottom-0 right-8 pointer-events-none select-none" aria-hidden="true">
        <span className="font-display font-black text-[#EEEEFF]"
          style={{ fontSize: "clamp(12rem, 20vw, 20rem)", opacity: 0.04, lineHeight: 1 }}>
          01
        </span>
      </div>

      {/* Decorative code snippet */}
      <div className="absolute top-24 right-8 pointer-events-none select-none hidden lg:block" aria-hidden="true">
        <pre className="font-mono text-[0.75rem] text-[#EEEEFF] opacity-[0.04] leading-relaxed">
{`@router.post("/webhook/{provider}")
async def handle_webhook(
    provider: str,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    payload = await request.body()
    verify_signature(provider, payload)
    event = parse_event(provider, payload)
    await process_event(event, db)
    return {"status": "ok"}`}
        </pre>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl w-full">

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="font-mono text-xs text-[#50507A] mb-6 tracking-widest"
        >
          &gt; FULL-STACK ENGINEER · SYLHET, BD
        </motion.p>

        <div className="mb-6">
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={5}
            className="font-display font-black leading-none text-[#EEEEFF]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          >
            I build systems
          </motion.h1>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={7}
            className="font-display font-black leading-none text-[#6C63FF]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
          >
            that ship.
          </motion.h1>
        </div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={9}
          className="font-body text-[#9090BB] text-base mb-8 max-w-lg leading-relaxed"
        >
          FastAPI backends and Next.js frontends — five in production.
          <br />Open to serious remote projects.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={11}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <Button href="/projects" variant="primary" magnetic>View work</Button>
          <Button href="https://cal.com/fuad-haque/30min" variant="ghost" magnetic>Book a call</Button>
        </motion.div>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={11}
          className="font-mono text-[0.65rem] text-[#50507A] tracking-wide"
        >
          ▸ Reply within 4 hours &nbsp;·&nbsp; ▸ Deployed URL on delivery &nbsp;·&nbsp; ▸ Swagger docs included
        </motion.p>

      </div>
    </section>
  )
}