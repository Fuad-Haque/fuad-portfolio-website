"use client"
import { Badge } from "@/components/ui/Badge"
import { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const techs = project.tech_stack.split(",").map(t => t.trim())
  const endpoints = project.endpoints ? JSON.parse(project.endpoints) : []

  return (
    <div
      data-cursor-card
      className="group relative bg-[#10101A] border border-[#1A1A2E] rounded-sm hover:border-[#2A2A4A] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_#6C63FF15] overflow-hidden"
    >
      {/* Left border reveal on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6C63FF] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

      {/* Thumbnail area */}
      <div className="relative h-48 bg-[#020208] border-b border-[#1A1A2E] p-4 overflow-hidden">
        {/* Project number */}
        <span className="font-mono text-[#303055] text-2xl absolute top-3 left-4">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Action links */}
        <div className="absolute top-3 right-4 flex items-center gap-2">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.65rem] text-[#00D4AA] border border-[#00D4AA30] px-2 py-0.5 hover:bg-[#00D4AA10] transition-colors">
              LIVE
            </a>
          )}
          {project.docs_url && (
            <a href={project.docs_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.65rem] text-[#00D4AA] border border-[#00D4AA30] px-2 py-0.5 hover:bg-[#00D4AA10] transition-colors">
              DOCS
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.65rem] text-[#50507A] border border-[#1A1A2E] px-2 py-0.5 hover:bg-[#1A1A2E] transition-colors">
              GH
            </a>
          )}
        </div>

        {/* Endpoint list */}
        <div className="absolute bottom-4 left-4 right-4">
          {endpoints.length > 0 ? (
            endpoints.slice(0, 4).map((ep: string, i: number) => (
              <div key={i} className="font-mono text-[0.75rem] text-[#00D4AA] mb-0.5">{ep}</div>
            ))
          ) : (
            <div className="font-mono text-[0.75rem] text-[#303055]">no endpoints listed</div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#020208]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {project.docs_url && (
            <a href={project.docs_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm text-[#00D4AA]">
              → /docs
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-display font-bold text-[1.25rem] text-[#EEEEFF] mb-1">{project.title}</h3>
        <p className="font-body text-[#9090BB] text-sm mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {techs.map((tech, i) => <Badge key={i}>{tech}</Badge>)}
        </div>
      </div>
    </div>
  )
}