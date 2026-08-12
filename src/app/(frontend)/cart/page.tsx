'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cartItemKey, useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, subtotal, removeItem, setQuantity } = useCart()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display mb-8 text-3xl font-bold tracking-tight uppercase">Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface py-20 text-center">
          <p className="mb-6 text-muted">Your cart is empty.</p>
          <Link
            className="btn-vibrant px-8 py-3 text-sm font-bold tracking-widest uppercase"
            href="/shop"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line rounded-lg border border-line bg-surface px-5">
            {items.map((item) => {
              const key = cartItemKey(item)
              return (
                <li className="flex gap-4 py-5" key={key}>
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-surface-2">
                    {item.image && (
                      <Image alt={item.title} className="object-cover" fill sizes="96px" src={item.image} />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link className="font-medium hover:text-accent" href={`/products/${item.slug}`}>
                      {item.title}
                    </Link>
                    {item.variant && <span className="text-sm text-muted">{item.variant}</span>}
                    <span className="text-sm text-muted">{formatPrice(item.unitPrice)} each</span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded border border-line">
                        <button
                          aria-label="Decrease quantity"
                          className="px-3 py-1.5 text-muted hover:text-ink"
                          onClick={() => setQuantity(key, item.quantity - 1)}
                          type="button"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="px-3 py-1.5 text-muted hover:text-ink"
                          onClick={() => setQuantity(key, item.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold">{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${item.title}`}
                    className="self-start text-muted hover:text-accent"
                    onClick={() => removeItem(key)}
                    type="button"
                  >
                    <svg fill="none" height="20" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="20">
                      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col items-end gap-4">
            <div className="flex items-baseline gap-4">
              <span className="text-muted">Subtotal</span>
              <span className="font-display text-2xl font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-muted">Shipping & final total confirmed on WhatsApp.</p>
            <Link
              className="btn-vibrant px-10 py-3.5 text-sm font-bold tracking-widest uppercase"
              href="/checkout"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
