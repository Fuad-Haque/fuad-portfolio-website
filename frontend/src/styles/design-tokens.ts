export const tokens = {
  colors: {
    bg: {
      void: "#020208",
      primary: "#0A0A0F",
      secondary: "#0D0D15",
      card: "#10101A",
      cardHover: "#141422",
      border: "#1A1A2E",
      borderHover: "#2A2A4A",
    },
    accent: {
      violet: "#6C63FF",
      teal: "#00D4AA",
      violetDim: "#6C63FF40",
      tealDim: "#00D4AA30",
      violetGlow: "#6C63FF15",
      tealGlow: "#00D4AA10",
    },
    text: {
      primary: "#EEEEFF",
      secondary: "#9090BB",
      muted: "#50507A",
      code: "#00D4AA",
      dim: "#303055",
    },
    status: {
      online: "#00D4AA",
      warning: "#FFB800",
      error: "#FF4560",
    }
  },
  fonts: {
    display: "var(--font-syne)",
    mono: "var(--font-jetbrains-mono)",
    body: "var(--font-inter)",
  },
  motion: {
    ease: [0.16, 1, 0.3, 1],
    easeIn: [0.4, 0, 1, 1],
    duration: {
      fast: 0.15,
      base: 0.35,
      slow: 0.65,
      crawl: 1.2,
    }
  }
}