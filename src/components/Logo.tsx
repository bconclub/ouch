import React from 'react'

/**
 * The real OUCH wordmark (public/brand/logo*.png, 900×241), processed from the
 * user's logo file: white background removed, tinted ink / white.
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
      height={241}
      src={variant === 'white' ? '/brand/logo-white.png' : '/brand/logo.png'}
      width={900}
    />
  )
}
