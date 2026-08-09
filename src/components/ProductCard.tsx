import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import { accentFor, formatPrice, mediaAlt, mediaUrl } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const firstImage = product.images?.[0]?.image
  const url = mediaUrl(firstImage, 'card')
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price
  const category = typeof product.category === 'object' ? product.category : null
  const accent = accentFor(typeof product.category === 'object' ? product.category.id : product.id)

  return (
    <Link
      className={`group block overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-lg ${accent.border}`}
      href={`/products/${product.slug}`}
    >
      <div className={`relative aspect-square overflow-hidden ${accent.tile}`}>
        {url && (
          <Image
            alt={mediaAlt(firstImage, product.title)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            src={url}
          />
        )}
        {onSale && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold tracking-[0.15em] text-white uppercase">
            Sale
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 rounded-full bg-ink/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4">
        {category && (
          <div className={`mb-1 text-[11px] font-bold tracking-[0.18em] uppercase ${accent.text}`}>
            {category.name}
          </div>
        )}
        <h3 className="line-clamp-2 text-sm font-medium">{product.title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {onSale && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
