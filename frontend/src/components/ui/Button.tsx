"use client"
import { useMagneticHover } from "@/hooks/useMagneticHover"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: "primary" | "ghost"
  magnetic?: boolean
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
}

export function Button({
  children, onClick, href, variant = "primary",
  magnetic = false, className = "", type = "button", disabled = false
}: ButtonProps) {
  const { ref, handleMove, handleLeave } = useMagneticHover(0.3)

  const base = "relative font-mono text-sm px-6 py-3 rounded-sm transition-all duration-200 inline-block"
  const variants = {
    primary: "bg-[#6C63FF] text-white hover:scale-[1.03] hover:shadow-[0_0_20px_#6C63FF66]",
    ghost: "border border-[#1A1A2E] text-[#9090BB] hover:border-[#2A2A4A] hover:text-[#EEEEFF]",
  }

  const props = magnetic ? {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  } : {}

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  )
}