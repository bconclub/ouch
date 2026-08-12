'use client'

import React, { useCallback, useRef } from 'react'

/**
 * Subtle 3D movement for the hero art: background paint drifts opposite the
 * cursor, the cutout tilts gently toward it. No-ops for touch and
 * reduced-motion users.
 */
export function ParallaxHero({
  back,
  front,
  className = '',
}: {
  back: React.ReactNode
  front: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--par-x', x.toFixed(3))
    el.style.setProperty('--par-y', y.toFixed(3))
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--par-x', '0')
    el.style.setProperty('--par-y', '0')
  }, [])

  return (
    <div
      className={className}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      ref={ref}
      style={{ perspective: '900px' } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform:
            'translate3d(calc(var(--par-x, 0) * -14px), calc(var(--par-y, 0) * -10px), 0)',
        }}
      >
        {back}
      </div>
      <div
        className="relative h-full w-full transition-transform duration-300 ease-out"
        style={{
          transform:
            'translate3d(calc(var(--par-x, 0) * 10px), calc(var(--par-y, 0) * 8px), 0) rotateY(calc(var(--par-x, 0) * 4deg)) rotateX(calc(var(--par-y, 0) * -3deg))',
        }}
      >
        {front}
      </div>
    </div>
  )
}
