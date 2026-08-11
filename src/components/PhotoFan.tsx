'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

export type FanPhoto = { src: string; alt: string }

/** Where each card sits, by its distance from the front of the deck. */
const POSITIONS = [
  { rotate: 2, x: 0, y: 0, scale: 1, z: 50, shadow: '0 24px 60px rgba(90,10,0,0.45)' },
  { rotate: -7, x: -34, y: 16, scale: 0.95, z: 40, shadow: '0 18px 44px rgba(90,10,0,0.34)' },
  { rotate: 9, x: 36, y: 26, scale: 0.92, z: 30, shadow: '0 16px 38px rgba(90,10,0,0.28)' },
  { rotate: -4, x: -12, y: 40, scale: 0.89, z: 20, shadow: '0 14px 32px rgba(90,10,0,0.22)' },
  { rotate: 6, x: 16, y: 52, scale: 0.86, z: 10, shadow: '0 12px 28px rgba(90,10,0,0.18)' },
]

export function PhotoFan({
  photos,
  interval = 3800,
}: {
  photos: FanPhoto[]
  interval?: number
}) {
  const [front, setFront] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setFront((f) => (f + 1) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (paused || photos.length < 2) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = window.setInterval(advance, interval)
    return () => window.clearInterval(id)
  }, [advance, interval, paused, photos.length])

  return (
    <div
      className="relative mx-auto aspect-[600/760] w-full max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {photos.map((photo, i) => {
        // Distance from the front of the deck, wrapping around.
        const depth = (i - front + photos.length) % photos.length
        const pos = POSITIONS[Math.min(depth, POSITIONS.length - 1)]
        const isFront = depth === 0

        return (
          <button
            aria-label={isFront ? 'Next photo' : photo.alt}
            className="absolute inset-0 cursor-pointer transition-all duration-700 ease-out"
            key={photo.src}
            onClick={advance}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
              zIndex: pos.z,
            }}
            type="button"
          >
            <span
              className="block h-full w-full overflow-hidden rounded-3xl border-[6px] border-[#fff8f0]"
              style={{ boxShadow: pos.shadow }}
            >
              <span className="relative block h-full w-full">
                <Image
                  alt={photo.alt}
                  className="object-cover"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  src={photo.src}
                />
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
