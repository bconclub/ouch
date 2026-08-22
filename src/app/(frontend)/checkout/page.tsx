'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/utils'
import { createOrder } from './actions'

const inputClass =
  'w-full rounded border border-line bg-surface px-3.5 py-2.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none'

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    const form = new FormData(e.currentTarget)
    const result = await createOrder({
      customerName: String(form.get('name') ?? ''),
      customerPhone: String(form.get('phone') ?? ''),
      customerAddress: String(form.get('address') ?? ''),
      note: String(form.get('note') ?? ''),
      items: items.map((i) => ({
        productId: i.productId,
        variant: i.variant,
        quantity: i.quantity,
      })),
    }).catch(() => ({ ok: false as const, error: 'Network error. Please try again.' }))

    if (result.ok) {
      try {
        sessionStorage.setItem(`ouch-order-${result.orderNumber}`, JSON.stringify(result.summary))
      } catch {
        // storage full/blocked — server copy (when present) still renders
      }
      router.push(`/order/${result.orderNumber}`)
    } else {
      setError(result.error)
      setSubmitting(false)
    }
  }

  if (items.length === 0 && !submitting) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display mb-4 text-3xl font-bold uppercase">Checkout</h1>
        <p className="mb-8 text-muted">Your cart is empty — add something first.</p>
        <Link
          className="btn-vibrant px-8 py-3 text-sm font-bold tracking-widest uppercase"
          href="/shop"
        >
          Shop now
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display mb-8 text-3xl font-bold tracking-tight uppercase">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-widest text-muted uppercase" htmlFor="name">
              Full name *
            </label>
            <input className={inputClass} id="name" name="name" placeholder="Your name" required />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-widest text-muted uppercase" htmlFor="phone">
              Phone (WhatsApp) *
            </label>
            <input
              className={inputClass}
              id="phone"
              inputMode="tel"
              name="phone"
              placeholder="+91 98765 43210"
              required
              type="tel"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-widest text-muted uppercase" htmlFor="address">
              Delivery address
            </label>
            <textarea
              className={inputClass}
              id="address"
              name="address"
              placeholder="Street, city, PIN code"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-widest text-muted uppercase" htmlFor="note">
              Order note
            </label>
            <textarea
              className={inputClass}
              id="note"
              name="note"
              placeholder="Anything we should know?"
              rows={2}
            />
          </div>

          {error && (
            <div className="rounded border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
              {error}
            </div>
          )}

          <button
            className="btn-vibrant w-full py-4 text-sm font-bold tracking-widest uppercase disabled:cursor-not-allowed disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Sending it…' : 'Send my order'}
          </button>
          <p className="text-center text-xs text-muted">
            After this you&apos;ll hop over to WhatsApp to confirm with us — payment
            is arranged in chat.
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-line bg-surface p-5">
          <h2 className="font-display mb-4 text-sm font-semibold tracking-widest uppercase">
            Order summary
          </h2>
          <ul className="divide-y divide-line text-sm">
            {items.map((item) => (
              <li className="flex justify-between gap-3 py-2.5" key={`${item.productId}-${item.variant}`}>
                <span className="min-w-0">
                  <span className="block truncate">{item.title}</span>
                  <span className="text-xs text-muted">
                    {item.variant ? `${item.variant} · ` : ''}×{item.quantity}
                  </span>
                </span>
                <span className="shrink-0 font-medium">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="text-muted">Total</span>
            <span className="font-display text-xl font-bold">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">Shipping confirmed on WhatsApp.</p>
        </aside>
      </div>
    </div>
  )
}
