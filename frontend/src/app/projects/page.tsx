"use client"
import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { projectsApi } from "@/lib/api"
import { Project } from "@/types"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const ref = useScrollReveal()

  useEffect(() => {
    projectsApi.getAll()
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <p className="font-mono text-[#50507A] text-[0.9rem] mb-2">// all work</p>
      <p className="font-mono text-[#50507A] text-[0.8rem] mb-12">
        &gt; {projects.length} projects deployed · all with live /docs · all walkthrough recorded
      </p>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div key={project.id} data-reveal>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}