"use client"
import { useEffect, useState } from "react"
import { projectsApi } from "@/lib/api"
import { Project } from "@/types"
import { Badge } from "@/components/ui/Badge"
import Link from "next/link"

interface ProjectDetailProps {
  matchTitle: string
}

export function ProjectDetail({ matchTitle }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectsApi.getAll()
      .then(res => {
        const found = res.data.find((p: Project) =>
          p.title.toLowerCase().includes(matchTitle.toLowerCase())
        )
        setProject(found || null)
      })
      .catch(() => setProject(null))
      .finally(() => setLoading(false))
  }, [matchTitle])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <p className="font-mono text-[#50507A] text-sm">// loading...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <p className="font-mono text-[#50507A] text-sm">// project not found</p>
        <Link href="/projects" className="font-mono text-[#6C63FF] text-sm mt-4 block hover:underline">
          ← back to projects
        </Link>
      </div>
    )
  }

  const techs = project.tech_stack.split(",").map(t => t.trim())
  const endpoints = project.endpoints ? JSON.parse(project.endpoints) : []

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <Link href="/projects" className="font-mono text-[#50507A] text-[0.8rem] hover:text-[#6C63FF] transition-colors mb-8 block">
        ← /projects
      </Link>
      <div className="border border-[#1A1A2E] rounded-sm bg-[#10101A] p-8 mb-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6C63FF]" />
        <p className="font-mono text-[#50507A] text-[0.75rem] mb-2">// project detail</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-[#EEEEFF] mb-4">{project.title}</h1>
        <p className="font-body text-[#9090BB] text-base leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech, i) => <Badge key={i}>{tech}</Badge>)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer"
            className="border border-[#00D4AA30] bg-[#10101A] rounded-sm p-4 hover:bg-[#00D4AA08] transition-colors group">
            <p className="font-mono text-[#00D4AA] text-[0.7rem] mb-1">LIVE URL</p>
            <p className="font-mono text-[#EEEEFF] text-sm group-hover:text-[#00D4AA] transition-colors">→ view live</p>
          </a>
        )}
        {project.docs_url && (
          <a href={project.docs_url} target="_blank" rel="noopener noreferrer"
            className="border border-[#6C63FF30] bg-[#10101A] rounded-sm p-4 hover:bg-[#6C63FF08] transition-colors group">
            <p className="font-mono text-[#6C63FF] text-[0.7rem] mb-1">DOCS / SWAGGER</p>
            <p className="font-mono text-[#EEEEFF] text-sm group-hover:text-[#6C63FF] transition-colors">→ view docs</p>
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer"
            className="border border-[#1A1A2E] bg-[#10101A] rounded-sm p-4 hover:bg-[#1A1A2E] transition-colors group">
            <p className="font-mono text-[#50507A] text-[0.7rem] mb-1">GITHUB</p>
            <p className="font-mono text-[#EEEEFF] text-sm group-hover:text-[#9090BB] transition-colors">→ view source</p>
          </a>
        )}
      </div>
      {endpoints.length > 0 && (
        <div className="border border-[#1A1A2E] rounded-sm bg-[#10101A] p-6">
          <p className="font-mono text-[#50507A] text-[0.75rem] mb-4">// endpoints</p>
          <div className="space-y-2">
            {endpoints.map((ep: string, i: number) => (
              <div key={i} className="font-mono text-[0.8rem] text-[#00D4AA] border-b border-[#1A1A2E] pb-2 last:border-0 last:pb-0">{ep}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}