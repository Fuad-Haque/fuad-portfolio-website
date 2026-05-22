"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Page() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div
        className={`transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-xs tracking-[0.3em] text-blue-400 uppercase mb-6 font-mono">
          // system.recursive_entry_detected
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
          You just entered the project<br />
          <span className="text-blue-400">that built itself.</span>
        </h1>

        <p className="text-zinc-400 font-mono text-sm max-w-md mx-auto mb-10 leading-relaxed">
          This portfolio is the project. You are already inside it.
          <br />
          <span className="text-zinc-500">Look around.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-2 border border-blue-400 text-blue-400 font-mono text-sm hover:bg-blue-400 hover:text-black transition-all duration-200"
          >
            → explore the site
          </Link>
          <Link
            href="/projects"
            className="px-6 py-2 border border-zinc-600 text-zinc-400 font-mono text-sm hover:border-zinc-400 hover:text-white transition-all duration-200"
          >
            ← back to projects
          </Link>
        </div>
      </div>
    </main>
  )
}