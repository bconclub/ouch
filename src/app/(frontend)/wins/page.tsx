import type { Metadata } from 'next'
import React from 'react'

import type { Order } from '@/payload-types'
import { DoodleHeart, DoodleSmiley, DoodleStar } from '@/components/Doodles'
import { BrushStroke } from '@/components/Paint'
import { Reveal } from '@/components/Reveal'
import { getPayloadClient } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'

/** Private working page — not linked from the site, not indexed.
 *  Every order that ever landed, counted in one place. */
export const metadata: Metadata = {
  title: 'Little Wins — internal',
  robots: { index: false, follow: false, nocache: true },
}

// Always fresh: a counter nobody trusts is a counter nobody opens.
export const dynamic = 'force-dynamic'

const STATUS_LOOK: Record<string, { label: string; chip: string }> = {
  new: { label: 'New', chip: 'bg-pink' },
  confirmed: { label: 'Confirmed', chip: 'bg-purple' },
  shipped: { label: 'On its way', chip: 'bg-cyan' },
  delivered: { label: 'Landed', chip: 'bg-lime' },
  cancelled: { label: 'Called off', chip: 'bg-orange' },
}

function day(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function WinsPage() {
  const payload = await getPayloadClient()
  const { docs, totalDocs } = await payload.find({
    collection: 'orders',
    limit: 200,
    sort: '-createdAt',
    overrideAccess: true,
  })
  const orders = docs as Order[]

  // Cancelled orders are real history, but they are not money and not a win.
  const live = orders.filter((o) => o.status !== 'cancelled')
  const earned = live.reduce((sum, o) => sum + (o.total ?? 0), 0)
  const average = live.length ? Math.round(earned / live.length) : 0

  const now = new Date()
  const thisMonth = live.filter((o) => {
    const d = new Date(o.createdAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const monthEarned = thisMonth.reduce((sum, o) => sum + (o.total ?? 0), 0)

  const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, {})

  // What actually sells, counted by piece rather than by order.
  const pieces = new Map<string, { count: number; earned: number }>()
  for (const o of live) {
    for (const item of o.items ?? []) {
      const key = item.title
      const prev = pieces.get(key) ?? { count: 0, earned: 0 }
      pieces.set(key, {
        count: prev.count + (item.quantity ?? 0),
        earned: prev.earned + (item.unitPrice ?? 0) * (item.quantity ?? 0),
      })
    }
  }
  const topPieces = [...pieces.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 8)

  const HEADLINE = [
    { value: String(live.length), label: 'Orders, all time', color: 'text-pink' },
    { value: formatPrice(earned), label: 'Earned, all time', color: 'text-yellow' },
    { value: String(thisMonth.length), label: 'This month', color: 'text-cyan' },
    { value: live.length ? formatPrice(average) : '—', label: 'Average order', color: 'text-purple' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-marker text-sm text-pink">Private page — not linked, not searchable</p>
        <h1 className="text-poster relative mt-2 w-fit text-4xl sm:text-5xl">
          Little wins
          <BrushStroke
            className="absolute -bottom-2 left-0 h-3 w-full"
            color="var(--color-yellow)"
            seed={62}
          />
        </h1>
        <p className="text-marker mt-4 text-lg">
          Every order, since day one. <span className="text-pink">Counted properly.</span>
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed opacity-85">
          Just for us. Refresh it any time — it reads straight from the real orders.
        </p>
      </Reveal>

      {/* the numbers that matter, at a glance */}
      <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HEADLINE.map((stat) => (
          <div className="rounded-2xl bg-[var(--card-tint)] p-5" key={stat.label}>
            <p className={`text-poster text-3xl ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-[13px] tracking-wide opacity-75">{stat.label}</p>
          </div>
        ))}
      </Reveal>

      {live.length > 0 && (
        <Reveal className="mt-4 rounded-2xl border border-line p-5">
          <p className="text-marker text-[15px]">
            This month you have earned{' '}
            <span className="text-pink">{formatPrice(monthEarned)}</span> across{' '}
            {thisMonth.length} {thisMonth.length === 1 ? 'order' : 'orders'}.
          </p>
        </Reveal>
      )}

      {orders.length === 0 ? (
        <Reveal className="mt-10 rounded-2xl border border-line py-16 text-center">
          <DoodleStar className="mx-auto h-10 w-10 text-yellow" />
          <p className="text-poster mt-4 text-2xl">No orders yet. That is fine.</p>
          <p className="mx-auto mt-3 max-w-sm text-[15px] opacity-80">
            Every shop starts on zero. The moment the first one lands, it shows up right here — and
            you will not have to do a thing.
          </p>
          <DoodleHeart className="mx-auto mt-5 h-7 w-7 text-pink" />
        </Reveal>
      ) : (
        <>
          {/* where each order stands right now */}
          <Reveal className="mt-12">
            <h2 className="text-marker text-2xl">Where things stand</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {Object.entries(STATUS_LOOK).map(([key, look]) => (
                <div
                  className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2"
                  key={key}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${look.chip}`} />
                  <span className="text-[13px]">{look.label}</span>
                  <span className="text-poster text-[15px]">{byStatus[key] ?? 0}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {topPieces.length > 0 && (
            <Reveal className="mt-12">
              <h2 className="text-marker text-2xl">What people actually pick</h2>
              <p className="mt-2 text-sm opacity-75">
                Counted by piece, so you know what to hunt for next time.
              </p>
              <ul className="mt-5 space-y-2.5">
                {topPieces.map(([title, s]) => (
                  <li
                    className="flex items-center justify-between gap-4 rounded-2xl bg-[var(--card-tint)] px-5 py-3.5"
                    key={title}
                  >
                    <span className="text-poster truncate text-[15px]">{title}</span>
                    <span className="shrink-0 text-[13px] opacity-80">
                      <span className="text-pink">{s.count}</span> sold ·{' '}
                      {formatPrice(s.earned)}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* the ledger */}
          <Reveal className="mt-12">
            <h2 className="text-marker text-2xl">Every order</h2>
            <p className="mt-2 text-sm opacity-75">
              Newest first. {totalDocs > orders.length ? `Showing the latest ${orders.length}.` : ''}
            </p>
            <div className="mt-5 space-y-3">
              {orders.map((o) => {
                const look = STATUS_LOOK[o.status] ?? { label: o.status, chip: 'bg-pink' }
                return (
                  <div className="rounded-2xl bg-[var(--card-tint)] p-5" key={o.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-poster text-[15px]">{o.customerName}</span>
                      <span className="text-poster text-lg text-pink">
                        {formatPrice(o.total ?? 0)}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] opacity-75">
                      <span className="font-mono">{o.orderNumber}</span>
                      <span>·</span>
                      <span>{day(o.createdAt)}</span>
                      <span>·</span>
                      <span>{o.customerPhone}</span>
                    </div>
                    <ul className="mt-3 space-y-1 text-[13px] opacity-85">
                      {(o.items ?? []).map((item, i) => (
                        <li key={i}>
                          {item.title}
                          {item.variant ? ` (${item.variant})` : ''} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`text-marker rounded-full px-3 py-0.5 text-[12px] text-[#17141a] ${look.chip}`}
                      >
                        {look.label}
                      </span>
                      <span className="text-marker rounded-full border border-line px-3 py-0.5 text-[12px]">
                        {o.paymentStatus === 'paid' ? 'Paid' : 'Payment pending'}
                      </span>
                    </div>
                    {o.note && <p className="mt-3 text-[13px] italic opacity-70">“{o.note}”</p>}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </>
      )}

      <Reveal className="mt-12 text-center" delay={100}>
        <DoodleSmiley className="mx-auto h-9 w-9 text-yellow" />
        <p className="text-marker mt-3 text-xl">Small numbers now. Real ones though. 🎶</p>
        <p className="mt-2 text-sm opacity-75">
          Change an order&apos;s status any time in the admin — this page follows along.
        </p>
      </Reveal>
    </div>
  )
}
