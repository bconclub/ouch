import React from 'react'

/**
 * The OUCH wordmark supplied by the founder (public/brand/logo*.png, 1411×378):
 * background removed, tinted ink / white. Default 'auto' follows the theme —
 * ink on light, white on dark.
 */
export function Logo({
  className = 'h-8 w-auto',
  variant = 'auto',
}: {
  className?: string
  variant?: 'auto' | 'ink' | 'white'
}) {
  if (variant !== 'auto') {
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

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Ouch" className={`${className} dark:hidden`} height={378} src="/brand/logo.png" width={1411} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Ouch"
        className={`${className} hidden dark:block`}
        height={378}
        src="/brand/logo-white.png"
        width={1411}
      />
    </>
  )
}
