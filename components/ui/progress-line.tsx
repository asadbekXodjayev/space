'use client'

interface ProgressLineProps {
  width: string
}

export function ProgressLine({ width }: ProgressLineProps) {
  return (
    <div
      className="fixed top-0 left-0 h-0.5 z-50 transition-[width] duration-100 ease-linear"
      style={{
        width,
        background: 'linear-gradient(to right, var(--o-iii), var(--s-ii))',
      }}
    />
  )
}
