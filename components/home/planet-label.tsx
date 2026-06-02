'use client'

interface PlanetLabelProps {
  name: string
  visited?: boolean
}

/**
 * Floating planet name + connector line. Revealed on group-hover AND
 * group-focus-visible (keyboard parity). Purely decorative — never intercepts
 * pointer events so the underlying control stays clickable.
 */
export function PlanetLabel({ name, visited = false }: PlanetLabelProps) {
  return (
    <>
      {/* Name text */}
      <span
        className="absolute left-1/2 -translate-x-1/2 font-display text-[clamp(8px,0.85vw,11px)] font-semibold tracking-[0.12em] text-o-iii uppercase whitespace-nowrap opacity-0 translate-y-2 transition-all duration-300 ease-out delay-[80ms] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
        style={{ bottom: 'calc(100% + 8px + clamp(40px, 5vh, 80px) + 8px)' }}
      >
        {name}
      </span>

      {/* Vertical connector line */}
      <span
        className="absolute left-1/2 -translate-x-1/2 w-px opacity-0 scale-y-0 origin-bottom transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-focus-visible:opacity-100 group-focus-visible:scale-y-100"
        style={{
          bottom: 'calc(100% + 8px)',
          height: 'clamp(40px, 5vh, 80px)',
          background: visited
            ? 'linear-gradient(to top, var(--o-iii), transparent)'
            : 'linear-gradient(to top, var(--orbit), transparent)',
        }}
      />

      {/* Visited dot indicator */}
      {visited && (
        <span
          className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-o-iii opacity-50 pointer-events-none"
          style={{ bottom: 'calc(100% + 4px)' }}
        />
      )}
    </>
  )
}
