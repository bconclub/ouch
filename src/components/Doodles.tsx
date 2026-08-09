import React from 'react'

/** Hand-drawn doodle vectors from the brand mockup. All inherit currentColor unless a fill is passed. */

export function DoodleCrown({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" viewBox="0 0 90 60">
      <path d="M8 50L4 16l20 14L45 6l21 24 20-14-4 34z" />
      <path d="M14 44h62" strokeWidth="4" />
    </svg>
  )
}

export function DoodleSparkle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" viewBox="0 0 48 48">
      <path d="M24 4v14M24 30v14M4 24h14M30 24h14" />
    </svg>
  )
}

export function DoodleStar({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" viewBox="0 0 60 60">
      <path d="M30 6l6 16 17 1-13 11 5 17-15-10-15 10 5-17L7 23l17-1z" />
    </svg>
  )
}

export function DoodleHeart({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" viewBox="0 0 52 48">
      <path d="M26 42S6 30 6 16A10 10 0 0126 9a10 10 0 0120 7c0 14-20 26-20 26z" />
    </svg>
  )
}

export function DoodleScratch({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" viewBox="0 0 60 44">
      <path d="M18 40L38 4M32 40L52 4M6 32L20 8" />
    </svg>
  )
}

export function DoodleSun({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" viewBox="0 0 72 72">
      <path d="M36 20a16 16 0 0114 24M36 20a16 16 0 00-15 21" />
      <path d="M36 4v8M60 12l-6 6M68 36h-8M12 12l6 6M4 36h8M10 58l6-5M62 58l-6-5" />
    </svg>
  )
}

/** Marker underline swoosh — slightly curved stroke. */
export function Swoosh({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 120 12">
      <path d="M3 8c30-6 84-6 114-3" stroke={color} strokeLinecap="round" strokeWidth="5" />
    </svg>
  )
}

/** Irregular paint-swash chip used behind script labels. */
export function PaintChip({
  children,
  className = '',
  color,
}: {
  children: React.ReactNode
  className?: string
  color: string
}) {
  return (
    <span className={`relative inline-block px-4 py-1 ${className}`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 140 40">
        <path
          d="M8 21C6 12 16 5 38 4c30-2 82-2 94 3 8 3 8 15 2 21-7 8-40 10-70 10-32 0-54-4-56-17z"
          fill={color}
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}
