import Link from 'next/link'
import React from 'react'

import { formatPrice } from '@/lib/utils'

export type ConfirmationItem = {
  title: string
  variant?: string | null
  quantity: number
  unitPrice: number
}

export function OrderConfirmation({
  orderNumber,
  items,
  total,
  whatsappUrl,
}: {
  orderNumber: string
  items: ConfirmationItem[]
  total: number
  whatsappUrl: string
}) {
  return (
    <>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
          <svg fill="none" height="32" stroke="var(--color-success)" strokeWidth="2.5" viewBox="0 0 24 24" width="32">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-poster text-3xl">
          Woohoo! Order placed<span className="text-accent">!</span>
        </h1>
        <p className="mt-2 text-muted">
          Order <span className="font-mono text-ink">{orderNumber}</span>
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-poster mb-4 text-sm tracking-widest">The goods</h2>
        <ul className="divide-y divide-line text-sm">
          {items.map((item, i) => (
            <li className="flex justify-between gap-3 py-2.5" key={i}>
              <span>
                {item.title}
                {item.variant ? ` (${item.variant})` : ''}{' '}
                <span className="text-muted">×{item.quantity}</span>
              </span>
              <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-muted">Total</span>
          <span className="text-poster text-xl">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4 text-sm text-muted">
          Last step, promise — send us your order and we&apos;ll sort payment and delivery right
          there in chat. Easy peasy, lemon squeezy.
        </p>
        <a
          className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold tracking-widest text-black transition-opacity hover:opacity-90"
          href={whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg fill="currentColor" height="22" viewBox="0 0 24 24" width="22">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Complete on WhatsApp
        </a>
        <div className="mt-8">
          <Link className="text-sm text-muted hover:text-ink" href="/shop">
            ← Back to the good stuff
          </Link>
        </div>
      </div>
    </>
  )
}
