export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute animate-glow-breathe"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, #6C63FF0D 0%, transparent 70%)",
          borderRadius: "50%",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute animate-glow-breathe"
        style={{
          bottom: "0%",
          right: "-5%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, #00D4AA09 0%, transparent 70%)",
          borderRadius: "50%",
          animationDelay: "1.5s",
        }}
      />
    </div>
  )
}