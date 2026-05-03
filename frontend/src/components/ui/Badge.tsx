export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.6rem] px-2 py-0.5 border border-[#6C63FF40] text-[#6C63FF] bg-[#6C63FF15] rounded-[2px]">
      {children}
    </span>
  )
}