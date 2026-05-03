"use client"
import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  const isPointer = useRef(false)
  const isCard = useRef(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isPointer.current = !!(target.closest("a, button, [data-cursor-pointer]"))
      isCard.current = !!(target.closest("[data-cursor-card]"))

      if (dotRef.current && ringRef.current) {
        if (isPointer.current) {
          dotRef.current.style.opacity = "0"
          ringRef.current.style.width = "60px"
          ringRef.current.style.height = "60px"
          ringRef.current.style.backgroundColor = isCard.current ? "#00D4AA20" : "#6C63FF40"
          ringRef.current.style.borderColor = isCard.current ? "#00D4AA" : "#6C63FF"
          ringRef.current.style.opacity = "1"
        } else {
          dotRef.current.style.opacity = "1"
          ringRef.current.style.width = "40px"
          ringRef.current.style.height = "40px"
          ringRef.current.style.backgroundColor = "transparent"
          ringRef.current.style.borderColor = "#6C63FF"
          ringRef.current.style.opacity = "0.4"
        }
      }
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", handleOver)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", handleOver)
    }
  }, [cursorX, cursorY])

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return null

  return (
    <>
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed z-[9998] rounded-full bg-accent-violet"
        style={{ width: 8, height: 8, x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] rounded-full border border-accent-violet"
        style={{
          width: 40, height: 40,
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          opacity: 0.4,
          transition: "width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s, opacity 0.2s",
        }}
      />
    </>
  )
}