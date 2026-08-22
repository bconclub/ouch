'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cartItemKey, useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, removeItem, setQuantity } = useCart()

  return (
    <>
      {isOpen && (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}
      <aside
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-surface transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-sm tracking-widest uppercase">Your Cart</h2>
          <button
            aria-label="Close cart"
            className="rounded p-1 text-muted hover:text-ink"
            onClick={closeCart}
            type="button"
          >
            <svg fill="none" height="22" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-muted">Nothing in here yet — let&apos;s fix that.</p>
            <Link
              className="btn-vibrant px-6 py-3 text-sm font-semibold tracking-wide uppercase"
              href="/shop"
              onClick={closeCart}
            >
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((item) => {
                const key = cartItemKey(item)
                return (
                  <li className="flex gap-4 py-4" key={key}>
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-surface-2">
                      {item.image && (
                        <Image alt={item.title} className="object-cover" fill sizes="80px" src={item.image} />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        className="truncate text-sm font-medium hover:text-accent"
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                      >
                        {item.title}
                      </Link>
                      {item.variant && <span className="text-xs text-muted">{item.variant}</span>}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded border border-line">
                          <button
                            aria-label="Decrease quantity"
                            className="px-2 py-1 text-muted hover:text-ink"
                            onClick={() => setQuantity(key, item.quantity - 1)}
                            type="button"
                          >
                            −
                          </button>
                          <span className="min-w-7 text-center text-sm">{item.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            className="px-2 py-1 text-muted hover:text-ink"
                            onClick={() => setQuantity(key, item.quantity + 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      aria-label={`Remove ${item.title}`}
                      className="self-start text-muted hover:text-accent"
                      onClick={() => removeItem(key)}
                      type="button"
                    >
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="18">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-line px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-display text-lg">{formatPrice(subtotal)}</span>
              </div>
              <Link
                className="btn-vibrant block w-full py-3 text-center text-sm font-semibold tracking-widest uppercase"
                href="/checkout"
                onClick={closeCart}
              >
                Checkout
              </Link>
              <Link
                className="mt-2 block w-full py-2 text-center text-xs tracking-wide text-muted uppercase hover:text-ink"
                href="/cart"
                onClick={closeCart}
              >
                View cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
