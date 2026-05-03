"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminApi } from "@/lib/api"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await adminApi.login(email, password)
      localStorage.setItem("admin_token", res.data.access_token)
      router.push("/admin/projects")
    } catch {
      setError("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-[#0D0D15] border border-[#1A1A2E] rounded-sm text-[#EEEEFF] font-mono text-sm p-3 placeholder:text-[#303055] focus:outline-none focus:border-[#6C63FF] transition-all"

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[#50507A] text-[0.8rem] mb-6">// admin login</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
          <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} required />
          {error && <p className="font-mono text-[0.75rem] text-[#FF4560]">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#6C63FF] text-white font-mono text-sm py-3 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "logging in..." : "login"}
          </button>
        </form>
      </div>
    </div>
  )
}