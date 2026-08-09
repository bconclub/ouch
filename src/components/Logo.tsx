import React from 'react'

/**
 * OUCH confetti wordmark — SVG recreation of the brand logo:
 * black stencil-cut letterforms with confetti dots and a coral spark.
 * Swap for the real vector file when available.
 */
export function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <svg
      aria-label="Ouch"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 150 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* O — ring with stencil gaps + coral triangle spark */}
      <circle
        cx="19"
        cy="24"
        r="13"
        stroke="currentColor"
        strokeDasharray="56 6 14 6"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path d="M28 4l7 3-4.5 5z" fill="#ef4444" />
      {/* U — stencil U with a gap on the left stem */}
      <path
        d="M44 12v6M44 24v3a12 12 0 0024 0V12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <circle cx="47.5" cy="40.5" r="3" fill="#f5b81c" />
      {/* C — open ring with dots at the mouth */}
      <path
        d="M100 15a13 13 0 100 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <circle cx="103" cy="12" r="3.5" fill="#f43f8e" />
      <circle cx="104.5" cy="21" r="2.5" fill="#14b8a6" />
      {/* H — bars with confetti column */}
      <path d="M116 10v28M134 10v28M116 24h18" stroke="currentColor" strokeWidth="7" />
      <circle cx="143.5" cy="12" r="3.5" fill="#f43f8e" />
      <circle cx="145.5" cy="21" r="3" fill="#f97316" />
      <circle cx="144" cy="29.5" r="3" fill="#8b5cf6" />
      <circle cx="145.5" cy="38" r="3" fill="#f5b81c" />
    </svg>
  )
}
