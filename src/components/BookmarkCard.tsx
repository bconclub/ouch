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
      <span className="block overflow-hidden rounded-[3px] bg-[#141414] p-[4px] shadow-[0_12px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/10 transition-all duration-500 group-hover:-translate-y-1.5">
        <span className="relative block aspect-[1/4] overflow-hidden">
          {url && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt={mediaAlt(first, product.title)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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
