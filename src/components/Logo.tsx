import React from 'react'

/**
 * The OUCH Piercing Studio wordmark (public/brand/logo*.png, 900×275),
 * extracted from the founder's brand posters: background removed, tinted ink / white.
 */
export function Logo({
  className = 'h-8 w-auto',
  variant = 'ink',
}: {
  className?: string
  variant?: 'ink' | 'white'
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Ouch"
      className={className}
      height={275}
      src={variant === 'white' ? '/brand/logo-white.png' : '/brand/logo.png'}
      width={900}
    />
  )
}
