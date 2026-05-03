export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] select-none"
      aria-hidden="true"
    >
      <svg
        className="animate-grain h-[150%] w-[150%] opacity-[0.035]"
        style={{ position: "absolute", top: "-25%", left: "-25%" }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}