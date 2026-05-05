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

      {/* Terminal block — hero right side */}
      <div className="absolute top-24 right-8 pointer-events-none select-none hidden lg:block w-[420px]" aria-hidden="true">
        <div className="rounded-sm border border-[#1A1A2E] overflow-hidden opacity-60">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0D0D15] border-b border-[#1A1A2E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#303055]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#303055]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#303055]" />
            <span className="ml-auto font-mono text-[0.65rem] text-[#50507A]">POST /webhook/stripe — 200 OK</span>
          </div>
          <div className="bg-[#020208] p-4 font-mono text-[0.75rem] leading-relaxed">
            <p className="text-[#50507A]">&#123; incoming payload &#125;</p>
            <p className="mt-2"><span className="text-[#6C63FF]">"type"</span><span className="text-[#9090BB]">: </span><span className="text-[#00D4AA]">"payment_intent.succeeded"</span><span className="text-[#9090BB]">,</span></p>
            <p><span className="text-[#6C63FF]">"amount"</span><span className="text-[#9090BB]">: </span><span className="text-[#00D4AA]">4200</span><span className="text-[#9090BB]">,</span></p>
            <p><span className="text-[#6C63FF]">"currency"</span><span className="text-[#9090BB]">: </span><span className="text-[#00D4AA]">"usd"</span><span className="text-[#9090BB]">,</span></p>
            <p><span className="text-[#6C63FF]">"status"</span><span className="text-[#9090BB]">: </span><span className="text-[#00D4AA]">"succeeded"</span></p>
            <p className="mt-3 text-[#50507A]">&#47;&#47; signature verified ✓</p>
            <p className="mt-1 text-[#50507A]">&#47;&#47; event persisted ✓</p>
            <p className="mt-1 text-[#50507A]">&#47;&#47; websocket broadcast ✓</p>
            <p className="mt-3"><span className="text-[#9090BB]">return </span><span className="text-[#00D4AA]">&#123;"status": "ok"&#125;</span></p>
          </div>
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl w-full">

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="font-mono text-xs text-[#50507A] mb-6 tracking-widest"
        >
          &gt; FULL-STACK ENGINEER
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
          className="font-body text-[#9090BB] text-base mb-8 max-w-2xl leading-relaxed"
        >
          FastAPI backends · Next.js frontends · Qdrant vector search · SSE streaming · GSAP animations · Framer Motion transitions · WebSocket real-time — five in production. Open to serious remote projects.
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