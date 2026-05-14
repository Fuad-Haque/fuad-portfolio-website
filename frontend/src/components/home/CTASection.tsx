"use client"

export function CTASection() {
  const copy = () => navigator.clipboard.writeText("fuadhaque.dev@gmail.com")
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 text-center">
      <h2 className="font-display font-bold text-[#EEEEFF] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{"Let's build something."}</h2>
      <p className="font-mono text-[#9090BB] cursor-pointer hover:text-[#EEEEFF] transition-colors" onClick={copy}>fuadhaque.dev@gmail.com</p>
    </section>
  )
}