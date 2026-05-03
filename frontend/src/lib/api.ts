import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token")
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const projectsApi = {
  getAll: () => api.get("/projects"),
  create: (data: any) => api.post("/projects", data),
  update: (id: number, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
}

export const contactApi = {
  send: (data: any) => api.post("/contact", data),
}

export const adminApi = {
  login: (email: string, password: string) => {
    const form = new FormData()
    form.append("username", email)
    form.append("password", password)
    return api.post("/admin/token", form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
  getMessages: () => api.get("/admin/messages"),
  markRead: (id: number) => api.patch(`/admin/messages/${id}/read`),
}