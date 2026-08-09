'use client'

import Image from 'next/image'
import React, { useState } from 'react'

type GalleryImage = { url: string; alt: string; thumb: string }

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return <div className="aspect-square rounded-lg border border-line bg-surface-2" />
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-line bg-surface-2">
        <Image
          alt={images[active].alt}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={images[active].url}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded border ${
                i === active ? 'border-accent' : 'border-line hover:border-accent/60'
              }`}
              key={img.url}
              onClick={() => setActive(i)}
              type="button"
            >
              <Image alt={img.alt} className="object-cover" fill sizes="80px" src={img.thumb} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
