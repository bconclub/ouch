'use client'

import React, { useMemo, useState } from 'react'

import type { Product } from '@/payload-types'
import { useCart } from '@/lib/cart'
import { formatPrice, isPriceOnAsk, mediaUrl, priceLabel } from '@/lib/utils'

export function ProductPurchase({ product, whatsappHref }: { product: Product; whatsappHref?: string }) {
  const { addItem } = useCart()
  const variants = product.variants ?? []
  const [selected, setSelected] = useState<number | null>(variants.length > 0 ? 0 : null)
  const [quantity, setQuantity] = useState(1)

  const activeVariant = selected != null ? variants[selected] : null
  const unitPrice = activeVariant?.price ?? product.price
  const available = product.inStock && (activeVariant ? activeVariant.inStock !== false : true)

  const image = useMemo(() => {
    const first = product.images?.[0]?.image
    return mediaUrl(first, 'thumbnail')
  }, [product])

  const onSale = product.compareAtPrice != null && product.compareAtPrice > unitPrice
  const onAsk = isPriceOnAsk(unitPrice)

  return (
    <div>
      <div className="mb-6 flex items-baseline gap-3">
        <span className={`text-poster text-3xl ${onAsk ? 'text-cyan' : ''}`}>{priceLabel(unitPrice)}</span>
        {onSale && (
          <span className="text-lg text-muted line-through">
            {formatPrice(product.compareAtPrice!)}
          </span>
        )}
      </div>

      {variants.length > 0 && (
        <div className="mb-6">
          <div className="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">
            Option
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant, i) => {
              const isActive = selected === i
              const outOfStock = variant.inStock === false
              return (
                <button
                  className={`rounded border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'border-sun bg-sun/10 text-sun'
                      : 'border-line text-ink hover:border-sun/60'
                  } ${outOfStock ? 'opacity-40 line-through' : ''}`}
                  disabled={outOfStock}
                  key={variant.id ?? i}
                  onClick={() => setSelected(i)}
                  type="button"
                >
                  {variant.label}
                  {variant.price != null && variant.price !== product.price
                    ? ` · ${formatPrice(variant.price)}`
                    : ''}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {onAsk ? (
        <div>
          <p className="text-sm leading-relaxed opacity-80">
            Hand-picked stock — we price each piece when it lands. Ping us and we&apos;ll send you
            a photo, the price and how soon you can have it.
          </p>
          <a
            className="text-poster mt-4 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm tracking-wide text-black uppercase transition-transform hover:scale-105"
            href={`${whatsappHref ?? 'https://wa.me/917259956780'}?text=${encodeURIComponent(`Hey Ouch! What's the price on "${product.title}"? 🤘`)}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ask on WhatsApp <span aria-hidden>→</span>
          </a>
        </div>
      ) : (
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded border border-line">
          <button
            aria-label="Decrease quantity"
            className="px-4 py-3 text-muted hover:text-ink"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            type="button"
          >
            −
          </button>
          <span className="min-w-10 text-center font-medium">{quantity}</span>
          <button
            aria-label="Increase quantity"
            className="px-4 py-3 text-muted hover:text-ink"
            onClick={() => setQuantity((q) => q + 1)}
            type="button"
          >
            +
          </button>
        </div>
        <button
          className="btn-vibrant flex-1 px-8 py-3.5 text-sm font-bold tracking-widest uppercase disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          disabled={!available}
          onClick={() =>
            addItem(
              {
                productId: product.id,
                slug: product.slug ?? '',
                title: product.title,
                image,
                variant: activeVariant?.label ?? null,
                unitPrice,
              },
              quantity,
            )
          }
          type="button"
        >
          {available ? 'Add to cart' : 'Sold out'}
        </button>
      </div>
      )}
    </div>
  )
}
