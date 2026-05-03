"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  "initializing fuadhaque.com...",
  "loading production artifacts [5/5]",
  "FastAPI backends: online",
  "Next.js frontends: online",
  "health: ok",
  "welcome.",
]

export function LoadingScreen() {
  const [visible, setVisible] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) return
    setVisible(true)

    const skip = (e: KeyboardEvent) => finish()
    window.addEventListener("keydown", skip)

    let i = 0
    const interval = setInterval(() => {
      i++
      setCurrentLine(i)
      if (i >= lines.length) {
        clearInterval(interval)
        setTimeout(finish, 400)
      }
    }, 150)

    return () => {
      clearInterval(interval)
      window.removeEventListener("keydown", skip)
    }
  }, [])

  const finish = () => {
    setDone(true)
    sessionStorage.setItem("loaded", "1")
  }

  return (
    <AnimatePresence>
      {visible && !done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: "#020208" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-sm" style={{ color: "#00D4AA" }}>
            {lines.slice(0, currentLine).map((line, i) => (
              <div key={i} className="mb-1">
                <span style={{ color: "#50507A" }}>&gt; </span>
                {line}
              </div>
            ))}
            <span className="animate-pulse">_</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}