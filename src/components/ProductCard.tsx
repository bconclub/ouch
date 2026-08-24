import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import { formatPrice, mediaAlt, mediaUrl } from '@/lib/utils'

const CHIPS = ['bg-pink', 'bg-purple', 'bg-cyan', 'bg-orange', 'bg-yellow']

export function ProductCard({
  product,
  portrait = false,
}: {
  product: Product
  /** Posters are prints — show them in full portrait, not a square crop. */
  portrait?: boolean
}) {
  const firstImage = product.images?.[0]?.image
  const url = mediaUrl(firstImage, 'card')
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price
  const category = typeof product.category === 'object' ? product.category : null
  const chip = CHIPS[(typeof product.category === 'object' ? product.category.id : product.id) % CHIPS.length]

  return (
    <Link
      className="band-paper group block overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-1deg]"
      href={`/products/${product.slug}`}
    >
      <div className={`relative m-2 overflow-hidden rounded-xl bg-white/60 ${portrait ? 'aspect-[3/4]' : 'aspect-square'}`}>
        {url && (
          <Image
            alt={mediaAlt(firstImage, product.title)}
            className={`transition-transform duration-500 group-hover:scale-105 ${portrait ? 'object-contain' : 'object-cover'}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            src={url}
          />
        )}
        {onSale && (
          <span className="text-poster absolute top-2.5 left-2.5 rounded-full bg-pink px-2.5 py-1 text-[10px] tracking-widest text-white uppercase">
            Sale
          </span>
        )}
        {!product.inStock && (
          <span className="text-poster absolute top-2.5 right-2.5 rounded-full bg-[#17141a]/85 px-2.5 py-1 text-[10px] tracking-widest text-white uppercase">
            Sold out
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3.5 pb-3.5">
        <span className="min-w-0">
          {category && (
            <span className="text-muted-band block text-[10px] font-bold tracking-[0.15em] uppercase">
              {category.name}
            </span>
          )}
          <span className="text-poster block truncate text-[13px] uppercase">{product.title}</span>
          <span className="mt-0.5 flex items-baseline gap-1.5 text-sm font-bold">
            {formatPrice(product.price)}
            {onSale && (
              <span className="text-muted-band text-xs font-normal line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </span>
        </span>
        <span aria-hidden className={`chip-arrow h-7 w-7 shrink-0 text-sm transition-transform duration-300 group-hover:translate-x-1 ${chip}`}>→</span>
      </div>
    </Link>
  )
}
