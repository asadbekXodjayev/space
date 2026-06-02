'use client'

import { useEffect, useRef, useCallback } from 'react'
import { STAR_COUNT_DESKTOP, STAR_COUNT_MOBILE, COLORS } from '@/lib/constants'

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
  color: string
}

const STAR_COLORS = [COLORS.starWhite, '#FFFFFF', '#D4E5FF', '#FFE4C4', COLORS.mist]

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number | null>(null)
  // CSS-pixel dimensions kept in sync with the (dpr-scaled) backing store.
  const dimsRef = useRef({ w: 0, h: 0 })

  const generateStars = useCallback((width: number, height: number) => {
    const count = width < 768 ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP
    const stars: Star[] = []
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] ?? COLORS.starWhite,
      })
    }
    return stars
  }, [])

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number, animate: boolean) => {
    const { w, h } = dimsRef.current
    ctx.fillStyle = COLORS.void
    ctx.fillRect(0, 0, w, h)

    for (const star of starsRef.current) {
      const opacity = animate
        ? star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3
        : star.baseOpacity
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = star.color
      ctx.globalAlpha = Math.max(0.1, Math.min(1, opacity))
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleResize = () => {
      const { offsetWidth, offsetHeight } = canvas
      dimsRef.current = { w: offsetWidth, h: offsetHeight }
      // Assigning width/height resets the context transform, so re-apply dpr.
      canvas.width = offsetWidth * dpr
      canvas.height = offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      starsRef.current = generateStars(offsetWidth, offsetHeight)
      if (reduceMotion) draw(ctx, 0, false) // render a single static frame
    }

    handleResize()

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    if (!reduceMotion) {
      const animate = (time: number) => {
        draw(ctx, time, true)
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      resizeObserver.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [generateStars, draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
