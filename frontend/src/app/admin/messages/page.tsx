"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { adminApi } from "@/lib/api"
import { Message } from "@/types"

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.push("/admin/login")
      return
    }
    adminApi.getMessages()
      .then(res => setMessages(res.data))
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false))
  }, [router])

  const markRead = async (id: number) => {
    await adminApi.markRead(id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[#50507A] text-[0.9rem]">// messages</p>
        <div className="flex gap-4">
          <a href="/admin/projects" className="font-mono text-[0.75rem] text-[#50507A] hover:text-[#EEEEFF] transition-colors">projects</a>
          <button onClick={logout} className="font-mono text-[0.75rem] text-[#FF4560] hover:opacity-70 transition-opacity">logout</button>
        </div>
      </div>

      {loading ? (
        <p className="font-mono text-[#50507A] text-sm">loading...</p>
      ) : messages.length === 0 ? (
        <p className="font-mono text-[#50507A] text-sm">no messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`bg-[#10101A] border rounded-sm p-5 ${msg.read ? "border-[#1A1A2E]" : "border-[#6C63FF40]"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-[#EEEEFF] text-sm">{msg.name}</p>
                  <p className="font-mono text-[#50507A] text-[0.75rem]">{msg.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.65rem] text-[#50507A]">{new Date(msg.created_at).toLocaleDateString()}</span>
                  {!msg.read && (
                    <button onClick={() => markRead(msg.id)} className="font-mono text-[0.65rem] text-[#00D4AA] border border-[#00D4AA30] px-2 py-0.5 hover:bg-[#00D4AA10] transition-colors">
                      mark read
                    </button>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <span className="font-mono text-[0.7rem] text-[#6C63FF]">{msg.project_type}</span>
                <span className="font-mono text-[0.7rem] text-[#00D4AA]">{msg.budget}</span>
              </div>
              <p className="font-body text-[#9090BB] text-sm leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}