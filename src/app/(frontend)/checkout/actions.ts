'use server'

import { getPayloadClient } from '@/lib/queries'

export type CheckoutItem = {
  productId: number
  variant: string | null
  quantity: number
}

export type CheckoutInput = {
  customerName: string
  customerPhone: string
  customerAddress?: string
  note?: string
  items: CheckoutItem[]
}

export type OrderSummary = {
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress?: string
  note?: string
  total: number
  items: { title: string; variant?: string; quantity: number; unitPrice: number }[]
}

export type CheckoutResult =
  | { ok: true; orderNumber: string; summary: OrderSummary }
  | { ok: false; error: string }

function generateOrderNumber(): string {
  const time = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `OUCH-${time}${rand}`
}

export async function createOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const name = input.customerName?.trim()
  const phone = input.customerPhone?.trim()

  if (!name || name.length < 2) return { ok: false, error: 'Please enter your name.' }
  if (!phone || !/^[+\d][\d\s-]{7,15}$/.test(phone)) {
    return { ok: false, error: 'Please enter a valid phone number.' }
  }
  if (!Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, error: 'Your cart is empty.' }
  }
  if (input.items.some((i) => !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 99)) {
    return { ok: false, error: 'Invalid item quantity.' }
  }

  const payload = await getPayloadClient()

  // Re-price every line item from the database — client-supplied prices are never trusted.
  const lineItems: {
    product: number
    title: string
    variant?: string
    quantity: number
    unitPrice: number
  }[] = []

  for (const item of input.items) {
    const product = await payload
      .findByID({ collection: 'products', id: item.productId, depth: 0 })
      .catch(() => null)

    if (!product || product._status !== 'published') {
      return { ok: false, error: 'One of the items in your cart is no longer available.' }
    }
    if (!product.inStock) {
      return { ok: false, error: `"${product.title}" is sold out.` }
    }

    let unitPrice = product.price
    let variantLabel: string | undefined
    if (item.variant) {
      const variant = product.variants?.find((v) => v.label === item.variant)
      if (!variant) {
        return { ok: false, error: `Selected option for "${product.title}" is unavailable.` }
      }
      if (variant.inStock === false) {
        return { ok: false, error: `"${product.title} (${variant.label})" is sold out.` }
      }
      if (variant.price != null) unitPrice = variant.price
      variantLabel = variant.label
    }

    lineItems.push({
      product: product.id,
      title: product.title,
      variant: variantLabel,
      quantity: item.quantity,
      unitPrice,
    })
  }

  const total = lineItems.reduce((sum, li) => sum + li.unitPrice * li.quantity, 0)
  const orderNumber = generateOrderNumber()

  try {
    await payload.create({
      collection: 'orders',
      overrideAccess: true,
      data: {
        orderNumber,
        status: 'new',
        paymentMethod: 'whatsapp',
        paymentStatus: 'pending',
        customerName: name,
        customerPhone: phone,
        customerAddress: input.customerAddress?.trim() || undefined,
        note: input.note?.trim() || undefined,
        items: lineItems,
        total,
      },
    })
  } catch (err) {
    // WhatsApp is the real order channel; the Orders collection is bookkeeping.
    // On the read-only demo deployment this write always fails — let the
    // customer proceed to WhatsApp instead of dead-ending the checkout.
    console.error('Order creation failed (continuing to WhatsApp handoff):', err)
  }

  return {
    ok: true,
    orderNumber,
    summary: {
      orderNumber,
      customerName: name,
      customerPhone: phone,
      customerAddress: input.customerAddress?.trim() || undefined,
      note: input.note?.trim() || undefined,
      total,
      items: lineItems.map(({ title, variant, quantity, unitPrice }) => ({
        title,
        variant,
        quantity,
        unitPrice,
      })),
    },
  }
}
