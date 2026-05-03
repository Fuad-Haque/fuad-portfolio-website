export function trackPageView(path: string) {
  if (typeof window === "undefined") return
  console.log(`[analytics] page view: ${path}`)
}

export function trackEvent(event: string, data?: Record<string, any>) {
  if (typeof window === "undefined") return
  console.log(`[analytics] event: ${event}`, data)
}