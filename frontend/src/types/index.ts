export interface Project {
  id: number
  title: string
  description: string
  tech_stack: string
  live_url: string | null
  docs_url: string | null
  github_url: string | null
  endpoints: string | null
  order: number
  featured: boolean
  created_at: string
}

export interface Message {
  id: number
  name: string
  email: string
  project_type: string
  budget: string
  message: string
  read: boolean
  created_at: string
}

export interface ContactForm {
  name: string
  email: string
  project_type: string
  budget: string
  message: string
}