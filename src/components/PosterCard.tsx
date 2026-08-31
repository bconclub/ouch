import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import { mediaAlt, mediaUrl } from '@/lib/utils'

/** Posters hang like art: thin frame, real shadow, no product-card chrome. */
export function PosterCard({ product }: { product: Product }) {
  const first = product.images?.[0]?.image
  // full-size original: the 'card' size is a square crop and would slice the art
  const url = mediaUrl(first)

  return (
    <Link className="group block" href={`/products/${product.slug}`}>
      <span className="block overflow-hidden rounded-[3px] bg-[#141414] p-[6px] shadow-[0_18px_44px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_66px_rgba(0,0,0,0.6)]">
        {/* one frame shape for a tidy wall; the crop is ~2%, invisible */}
        <span className="relative block aspect-[7/10] overflow-hidden">
          {url && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt={mediaAlt(first, product.title)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              src={url}
            />
          )}
          {/* glass sheen, like light across a frame */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </span>
      </span>

      <span className="mt-4 flex items-baseline justify-between gap-3">
        <span className="text-poster text-[15px]">{product.title}</span>
        <span className="text-marker rounded-full bg-yellow px-2.5 py-0.5 text-[11px] text-[#17141a]">Something&apos;s cooking</span>
      </span>
    </Link>
  )
}
