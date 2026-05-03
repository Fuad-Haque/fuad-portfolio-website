interface TerminalBlockProps {
  lines: string[]
  title?: string
  className?: string
}

export function TerminalBlock({ lines, title = "terminal", className = "" }: TerminalBlockProps) {
  return (
    <div className={`rounded-sm border border-[#1A1A2E] overflow-hidden ${className}`}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0D0D15] border-b border-[#1A1A2E]">
        <span className="w-3 h-3 rounded-full bg-[#303055]" />
        <span className="w-3 h-3 rounded-full bg-[#303055]" />
        <span className="w-3 h-3 rounded-full bg-[#303055]" />
        <span className="ml-auto font-mono text-[0.7rem] text-[#50507A]">{title}</span>
      </div>
      {/* Body */}
      <div className="bg-[#020208] p-4 font-mono text-sm">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.startsWith("//") || line.startsWith(">") ? (
              <span className="text-[#50507A]">{line}</span>
            ) : line.startsWith("$") ? (
              <span>
                <span className="text-[#50507A]">$ </span>
                <span className="text-[#9090BB]">{line.slice(2)}</span>
              </span>
            ) : (
              <span className="text-[#00D4AA]">{line}</span>
            )}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-[#00D4AA] animate-pulse align-middle" />
      </div>
    </div>
  )
}