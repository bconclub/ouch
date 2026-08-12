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
      <BrushStroke className="absolute top-[4%] left-[6%] h-[34%] w-[110%] -rotate-12" color="var(--color-purple)" seed={4} />
      <BrushStroke className="absolute top-[18%] -left-[4%] h-[38%] w-[115%] rotate-6" color="var(--color-pink)" seed={9} />
      <BrushStroke className="absolute top-[42%] left-[2%] h-[36%] w-[112%] -rotate-3" color="var(--color-cyan)" seed={5} />
      <BrushStroke className="absolute top-[62%] -left-[2%] h-[36%] w-[110%] rotate-8" color="var(--color-orange)" seed={11} />
      <BrushStroke className="absolute top-[80%] left-[8%] h-[30%] w-[105%] -rotate-6" color="var(--color-yellow)" seed={2} />
      <SpraySplash className="absolute -top-2 right-[6%] h-16 w-16" color="var(--color-yellow)" seed={3} />
      <SpraySplash className="absolute bottom-[4%] left-[2%] h-14 w-14" color="var(--color-pink)" seed={8} />
    </div>
  )
}
