import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import { formatPrice, mediaAlt, mediaUrl } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const firstImage = product.images?.[0]?.image
  const url = mediaUrl(firstImage, 'card')
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price
  const category = typeof product.category === 'object' ? product.category : null

  return (
    <Link
      className="group block overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent/60"
      href={`/products/${product.slug}`}
    >
      <div className="relative aspect-square overflow-hidden bg-surface-2">
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
          <span className="absolute top-3 left-3 bg-accent px-2 py-0.5 text-[11px] font-bold tracking-widest text-white uppercase">
            Sale
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-surface-2/90 px-2 py-0.5 text-[11px] font-semibold tracking-widest text-muted uppercase">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4">
        {category && (
          <div className="mb-1 text-[11px] tracking-widest text-muted uppercase">{category.name}</div>
        )}
        <h3 className="line-clamp-2 text-sm font-medium group-hover:text-accent">{product.title}</h3>
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
