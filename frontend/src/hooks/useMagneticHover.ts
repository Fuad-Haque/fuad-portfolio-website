import { useRef } from "react"

export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    ref.current.style.transition = "transform 0.1s linear"
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0, 0)"
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
  }

  return { ref, handleMove, handleLeave }
}