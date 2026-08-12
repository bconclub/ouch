import React from 'react'

/**
 * Hand-painted vector kit — hard-edged dry-brush strokes, spray splashes and
 * drips recreated from the brand mockups. Pure inline SVG, no image assets.
 */

let filterCounter = 0

/** Ragged dry-brush swash. Stretch with width/height via className; rotate freely. */
export function BrushStroke({
  className = '',
  color,
  seed = 3,
}: {
  className?: string
  color: string
  seed?: number
}) {
  const id = `brush-${seed}-${(filterCounter = (filterCounter + 1) % 1000)}`
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={id} x="-20%" y="-40%" width="140%" height="180%">
          <feTurbulence baseFrequency="0.09 0.18" numOctaves="2" result="n" seed={seed} type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <path
          d="M8 52 C60 30 120 26 200 30 C280 34 340 40 392 50 C340 66 280 74 200 72 C120 70 60 68 8 52 Z"
          fill={color}
        />
        <path d="M20 34 C90 22 180 20 260 24 L262 30 C180 26 92 28 22 40 Z" fill={color} opacity="0.55" />
        <path d="M60 76 C150 82 260 80 370 68 L368 62 C262 74 152 76 62 70 Z" fill={color} opacity="0.5" />
      </g>
    </svg>
  )
}

/** Spatter cluster — blob plus flecks. */
export function SpraySplash({
  className = '',
  color,
  seed = 7,
}: {
  className?: string
  color: string
  seed?: number
}) {
  const id = `spray-${seed}-${(filterCounter = (filterCounter + 1) % 1000)}`
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence baseFrequency="0.16" numOctaves="2" result="n" seed={seed} type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="18" />
        </filter>
      </defs>
      <g fill={color} filter={`url(#${id})`}>
        <ellipse cx="60" cy="60" rx="30" ry="24" />
        <circle cx="24" cy="38" r="5" />
        <circle cx="96" cy="42" r="4" />
        <circle cx="88" cy="92" r="6" />
        <circle cx="30" cy="90" r="3.5" />
        <circle cx="104" cy="70" r="2.5" />
        <circle cx="16" cy="64" r="2.5" />
        <circle cx="70" cy="16" r="3" />
      </g>
    </svg>
  )
}

/** Vertical paint drips — overlay under a logo or a stroke edge. */
export function PaintDrip({ className = '', color }: { className?: string; color: string }) {
  return (
    <svg aria-hidden className={className} fill={color} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0h5v16c0 3-1.2 4.6-2.5 4.6S10 19 10 16zM34 0h4v9c0 2.4-.9 3.6-2 3.6s-2-1.2-2-3.6zM58 0h5v24c0 3.4-1.3 5-2.6 5S58 27.4 58 24zM84 0h4v12c0 2.6-.9 4-2 4s-2-1.4-2-4zM104 0h4v7c0 2-.8 3-2 3s-2-1-2-3z" />
      <circle cx="12.5" cy="22.5" r="2.6" />
      <circle cx="60.5" cy="31" r="2.8" />
      <circle cx="86" cy="18" r="2.2" />
    </svg>
  )
}

/** Layered multi-colour paint burst used behind the hero photo. */
export function HeroPaint({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <BrushStroke className="absolute top-[2%] right-[-8%] h-[26%] w-[70%] -rotate-6" color="var(--color-purple)" seed={4} />
      <BrushStroke className="absolute top-[22%] right-[-10%] h-[24%] w-[64%] rotate-3" color="var(--color-pink)" seed={9} />
      <BrushStroke className="absolute top-[42%] right-[-9%] h-[24%] w-[60%] -rotate-2" color="var(--color-cyan)" seed={5} />
      <BrushStroke className="absolute top-[58%] left-[-12%] h-[26%] w-[70%] rotate-4" color="var(--color-orange)" seed={11} />
      <BrushStroke className="absolute bottom-[-4%] left-[6%] h-[26%] w-[105%] -rotate-3" color="var(--color-yellow)" seed={2} />
      <BrushStroke className="absolute top-[30%] left-[-14%] h-[26%] w-[55%] rotate-10" color="var(--color-pink)" seed={19} />
      <SpraySplash className="absolute top-[2%] right-[2%] h-16 w-16" color="var(--color-yellow)" seed={3} />
      <SpraySplash className="absolute bottom-[16%] left-[-2%] h-14 w-14" color="var(--color-pink)" seed={8} />
    </div>
  )
}

/**
 * Organic dry-brush mask for the hero photo — the photo reads as a painted
 * cutout instead of a rectangle, exactly like the mockups.
 */
export function BrushMaskedPhoto({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const id = `mask-${(filterCounter = (filterCounter + 1) % 1000)}`
  return (
    <div className={className} style={{ clipPath: `url(#${id})` }}>
      <svg aria-hidden height="0" width="0">
        <defs>
          <clipPath clipPathUnits="objectBoundingBox" id={id}>
            <path d="M0.06,0.10 C0.03,0.05 0.10,0.008 0.22,0.012 C0.40,0.002 0.62,0.006 0.80,0.02 C0.93,0.012 0.99,0.06 0.985,0.16 C1.0,0.34 0.995,0.55 0.98,0.72 C0.995,0.85 0.96,0.95 0.85,0.965 C0.68,0.995 0.45,0.99 0.26,0.975 C0.12,0.995 0.03,0.94 0.035,0.83 C0.015,0.66 0.02,0.44 0.03,0.28 C0.012,0.19 0.02,0.13 0.06,0.10 Z" />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  )
}

/** Rough painted button shape — a brush-daubed pill instead of a clean capsule. */
export function BrushPill({
  className = '',
  color,
  seed = 5,
}: {
  className?: string
  color: string
  seed?: number
}) {
  const id = `pill-${seed}-${(filterCounter = (filterCounter + 1) % 1000)}`
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 280 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={id} x="-12%" y="-25%" width="124%" height="150%">
          <feTurbulence baseFrequency="0.06 0.22" numOctaves="2" result="n" seed={seed} type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
      </defs>
      <path
        d="M30 8 C80 3 200 3 252 8 C270 11 276 20 276 32 C276 44 270 53 252 56 C200 61 80 61 30 56 C12 53 5 44 5 32 C5 20 12 11 30 8 Z"
        fill={color}
        filter={`url(#${id})`}
      />
    </svg>
  )
}

/** Big soft-edged splash blobs pinned to the page edges (dark theme backdrop). */
export function PageSplashes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden dark:block">
      <SpraySplash className="absolute -top-10 -left-12 h-56 w-56 opacity-70" color="var(--color-purple)" seed={31} />
      <SpraySplash className="absolute top-[16%] -right-14 h-64 w-64 opacity-60" color="var(--color-pink)" seed={32} />
      <SpraySplash className="absolute top-[42%] -left-16 h-52 w-52 opacity-50" color="var(--color-cyan)" seed={33} />
      <SpraySplash className="absolute top-[64%] -right-12 h-56 w-56 opacity-55" color="var(--color-yellow)" seed={34} />
      <SpraySplash className="absolute -bottom-12 left-[18%] h-60 w-60 opacity-55" color="var(--color-orange)" seed={35} />
      <SpraySplash className="absolute bottom-[26%] -left-10 h-44 w-44 opacity-45" color="var(--color-pink)" seed={36} />
    </div>
  )
}
