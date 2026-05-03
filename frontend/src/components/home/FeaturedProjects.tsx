"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { projectsApi } from "@/lib/api"
import { Project } from "@/types"

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const ref = useScrollReveal()

  useEffect(() => {
    projectsApi.getAll()
      .then(res => setProjects(res.data.filter((p: Project) => p.featured).slice(0, 3)))
      .catch(() => setProjects([]))
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
      <p className="font-mono text-[#50507A] text-[0.9rem] mb-8">// selected work</p>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div key={project.id} data-reveal>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/projects" className="font-mono text-sm text-[#6C63FF] hover:underline">
          All projects →
        </Link>
      </div>
    </section>
  )
}