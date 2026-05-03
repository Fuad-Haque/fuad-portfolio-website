export function GlowDivider({ color = "violet" }: { color?: "violet" | "teal" }) {
  const gradient = color === "violet"
    ? "from-transparent via-[#6C63FF4D] to-transparent"
    : "from-transparent via-[#00D4AA4D] to-transparent"

  return (
    <div className={`h-px w-full bg-gradient-to-r ${gradient} my-16`} aria-hidden="true" />
  )
}