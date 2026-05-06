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

function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number | null>(null)

  const generateStars = useCallback((width: number, height: number) => {
    const count = isMobile() ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP
    const stars: Star[] = []

    const starColors = [
      COLORS.starWhite,
      '#FFFFFF',
      '#D4E5FF',
      '#FFE4C4',
      COLORS.mist,
    ]

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)] ?? COLORS.starWhite,
      })
    }

    return stars
  }, [])

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = ctx.canvas

    // Clear canvas
    ctx.fillStyle = COLORS.void
    ctx.fillRect(0, 0, width, height)

    // Draw stars
    for (const star of starsRef.current) {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
      const opacity = star.baseOpacity + twinkle * 0.3

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

    const handleResize = () => {
      const { offsetWidth, offsetHeight } = canvas
      canvas.width = offsetWidth * dpr
      canvas.height = offsetHeight * dpr
      ctx.scale(dpr, dpr)
      starsRef.current = generateStars(offsetWidth, offsetHeight)
    }

    handleResize()

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    const animate = (time: number) => {
      draw(ctx, time)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [generateStars, draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      aria-hidden="true"
    />
  )
}
