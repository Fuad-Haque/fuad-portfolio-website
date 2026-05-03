"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { projectsApi } from "@/lib/api"
import { Project } from "@/types"

const inputClass = "w-full bg-[#0D0D15] border border-[#1A1A2E] rounded-sm text-[#EEEEFF] font-mono text-sm p-3 placeholder:text-[#303055] focus:outline-none focus:border-[#6C63FF] transition-all"

const empty = { title: "", description: "", tech_stack: "", live_url: "", docs_url: "", github_url: "", endpoints: "", order: 0, featured: true }

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.push("/admin/login"); return }
    load()
  }, [router])

  const load = () => projectsApi.getAll().then(res => setProjects(res.data)).catch(() => router.push("/admin/login"))

  const logout = () => { localStorage.removeItem("admin_token"); router.push("/admin/login") }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) { await projectsApi.update(editing, form); setEditing(null) }
      else { await projectsApi.create(form) }
      setForm(empty)
      await load()
    } finally { setLoading(false) }
  }

  const handleEdit = (p: Project) => {
    setEditing(p.id)
    setForm({ title: p.title, description: p.description, tech_stack: p.tech_stack, live_url: p.live_url || "", docs_url: p.docs_url || "", github_url: p.github_url || "", endpoints: p.endpoints || "", order: p.order, featured: p.featured })
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return
    await projectsApi.delete(id)
    await load()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[#50507A] text-[0.9rem]">// projects</p>
        <div className="flex gap-4">
          <a href="/admin/messages" className="font-mono text-[0.75rem] text-[#50507A] hover:text-[#EEEEFF] transition-colors">messages</a>
          <button onClick={logout} className="font-mono text-[0.75rem] text-[#FF4560] hover:opacity-70 transition-opacity">logout</button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#10101A] border border-[#1A1A2E] rounded-sm p-6 mb-8 space-y-3">
        <p className="font-mono text-[#50507A] text-[0.75rem] mb-4">{editing ? "// editing project" : "// add project"}</p>
        <input placeholder="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} required />
        <textarea placeholder="description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} rows={2} required />
        <input placeholder="tech_stack (comma separated)" value={form.tech_stack} onChange={e => setForm({...form, tech_stack: e.target.value})} className={inputClass} required />
        <input placeholder="live_url" value={form.live_url} onChange={e => setForm({...form, live_url: e.target.value})} className={inputClass} />
        <input placeholder="docs_url" value={form.docs_url} onChange={e => setForm({...form, docs_url: e.target.value})} className={inputClass} />
        <input placeholder="github_url" value={form.github_url} onChange={e => setForm({...form, github_url: e.target.value})} className={inputClass} />
        <textarea placeholder='endpoints (JSON array e.g. ["GET /health","POST /webhook"])' value={form.endpoints} onChange={e => setForm({...form, endpoints: e.target.value})} className={inputClass} rows={2} />
        <div className="flex gap-3">
          <input type="number" placeholder="order" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className={`${inputClass} w-24`} />
          <label className="flex items-center gap-2 font-mono text-[0.75rem] text-[#9090BB]">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
            featured
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-[#6C63FF] text-white font-mono text-sm px-6 py-2 rounded-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
            {loading ? "saving..." : editing ? "update" : "add"}
          </button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty) }} className="border border-[#1A1A2E] text-[#9090BB] font-mono text-sm px-6 py-2 rounded-sm hover:border-[#2A2A4A] transition-colors">cancel</button>}
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id} className="bg-[#10101A] border border-[#1A1A2E] rounded-sm p-4 flex items-start justify-between">
            <div>
              <p className="font-mono text-[#EEEEFF] text-sm mb-1">{p.title}</p>
              <p className="font-mono text-[#50507A] text-[0.7rem]">{p.tech_stack}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(p)} className="font-mono text-[0.7rem] text-[#6C63FF] hover:opacity-70 transition-opacity">edit</button>
              <button onClick={() => handleDelete(p.id)} className="font-mono text-[0.7rem] text-[#FF4560] hover:opacity-70 transition-opacity">delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}