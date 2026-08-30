'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { ClearCartOnMount } from '@/components/ClearCartOnMount'
import { OrderConfirmation, type ConfirmationItem } from '@/components/OrderConfirmation'
import { buildOrderMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

type StoredOrder = {
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress?: string
  note?: string
  total: number
  items: ConfirmationItem[]
}

/** Renders the confirmation from the order summary the checkout stashed in
 *  sessionStorage — used when the order isn't in the database (e.g. the demo
 *  deployment's read-only DB). The WhatsApp handoff must never dead-end. */
export function OrderFallback({
  orderNumber,
  storeName,
  whatsappNumber,
}: {
  orderNumber: string
  storeName: string
  whatsappNumber: string
}) {
  const [order, setOrder] = useState<StoredOrder | null | 'loading'>('loading')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`ouch-order-${orderNumber}`)
      setOrder(raw ? (JSON.parse(raw) as StoredOrder) : null)
    } catch {
      setOrder(null)
    }
  }, [orderNumber])

  if (order === 'loading') return <div className="py-24" />

  if (!order) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-poster mb-3 text-3xl">Hmm, can&apos;t find that one.</h1>
        <p className="mx-auto mb-6 max-w-md text-sm text-muted">
          All good — if you just placed an order, ping us on WhatsApp and we&apos;ll sort you out
          in a minute.
        </p>
        <a
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-black"
          href={buildWhatsAppUrl(whatsappNumber, `Hey ${storeName}! I just placed order ${orderNumber} but lost the page — help?`)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Chat with us
        </a>
        <div className="mt-8">
          <Link className="text-sm text-muted hover:text-ink" href="/shop">
            ← Back to the good stuff
          </Link>
        </div>
      </div>
    )
  }

  const message = buildOrderMessage({ ...order }, storeName)
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, message)

  return (
    <>
      <ClearCartOnMount />
      <OrderConfirmation
        items={order.items}
        orderNumber={order.orderNumber}
        total={order.total}
        whatsappUrl={whatsappUrl}
      />
    </>
  )
}
