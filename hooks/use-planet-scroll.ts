'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { SCROLL_MINI_THRESHOLD_PX } from '@/lib/constants'

interface ScrollState {
  scrollProgress: number
  showMiniCard: boolean
  heroOpacity: number
  heroScale: number
  heroTranslateY: number
  progressLineWidth: string
}

export function usePlanetScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<ScrollState>({
    scrollProgress: 0,
    showMiniCard: false,
    heroOpacity: 1,
    heroScale: 1,
    heroTranslateY: 0,
    progressLineWidth: '0%',
  })

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0

    // Hero transforms over first 300px of scroll
    const heroProgress = Math.min(scrollTop / 300, 1)
    
    setState({
      scrollProgress: progress,
      showMiniCard: scrollTop > SCROLL_MINI_THRESHOLD_PX,
      heroOpacity: 1 - heroProgress,
      heroScale: 1 - heroProgress * 0.08,
      heroTranslateY: heroProgress * 40,
      progressLineWidth: `${progress * 100}%`,
    })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    scrollRef,
    scrollToTop,
    ...state,
  }
}
