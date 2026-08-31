import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import { mediaAlt, mediaUrl } from '@/lib/utils'

/** Bookmarks hang as tall thin strips — same framed look as the posters. */
export function BookmarkCard({ product }: { product: Product }) {
  const first = product.images?.[0]?.image
  const url = mediaUrl(first)

  return (
    <Link className="group block" href={`/products/${product.slug}`}>
      {/* frame first, art inside — the strip is never cropped by the border */}
      <span className="block overflow-hidden rounded-[4px] border border-white/15 bg-[#141414] p-[6px] shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-1.5">
        <span className="relative block aspect-[273/1000] overflow-hidden rounded-[2px]">
          {url && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt={mediaAlt(first, product.title)}
              className="absolute inset-0 h-full w-full object-contain"
              loading="lazy"
              src={url}
            />
          )}
        </span>
      </span>
      <span className="mt-2 flex items-center justify-between gap-1">
        <span className="text-poster truncate text-[12px]">{product.title}</span>
      </span>
    </Link>
  )
}
