import React from 'react'

/**
 * The OUCH wordmark supplied by the founder (public/brand/logo*.png, 1411×378):
 * background removed, tinted ink / white. Source: src/assets/logo-original.png.
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
      height={378}
      src={variant === 'white' ? '/brand/logo-white.png' : '/brand/logo.png'}
      width={1411}
    />
  )
}
