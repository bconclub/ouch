import type { Metadata } from 'next'
import React from 'react'

import { ClearCartOnMount } from '@/components/ClearCartOnMount'
import { OrderConfirmation } from '@/components/OrderConfirmation'
import { OrderFallback } from '@/components/OrderFallback'
import { getPayloadClient, getSiteSettings } from '@/lib/queries'
import { buildOrderMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false },
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}) {
  const { orderNumber } = await params
  const payload = await getPayloadClient()
  const [settings, result] = await Promise.all([
    getSiteSettings(),
    payload.find({
      collection: 'orders',
      where: { orderNumber: { equals: orderNumber } },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    }),
  ])

  const order = result.docs[0]

  if (!order) {
    // Not in the DB (read-only demo deployment) — recover from the browser.
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <OrderFallback
          orderNumber={orderNumber}
          storeName={settings.storeName}
          whatsappNumber={settings.whatsappNumber}
        />
      </div>
    )
  }

  const message = buildOrderMessage(
    {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      note: order.note,
      total: order.total,
      items: order.items.map((i) => ({
        title: i.title,
        variant: i.variant,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    },
    settings.storeName,
  )
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, message)

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <ClearCartOnMount />
      <OrderConfirmation
        items={order.items.map((i) => ({
          title: i.title,
          variant: i.variant,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        }))}
        orderNumber={order.orderNumber}
        total={order.total}
        whatsappUrl={whatsappUrl}
      />
    </div>
  )
}
