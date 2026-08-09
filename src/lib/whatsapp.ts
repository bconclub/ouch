import { formatPrice } from './utils'

export type OrderForMessage = {
  orderNumber: string
  customerName: string
  customerPhone: string
  customerAddress?: string | null
  note?: string | null
  total: number
  items: {
    title: string
    variant?: string | null
    quantity: number
    unitPrice: number
  }[]
}

export function buildOrderMessage(order: OrderForMessage, storeName = 'Ouch'): string {
  const lines: string[] = []
  lines.push(`🖤 ${storeName.toUpperCase()} — New Order ${order.orderNumber}`)
  lines.push('')
  for (const item of order.items) {
    const variant = item.variant ? ` (${item.variant})` : ''
    lines.push(
      `• ${item.title}${variant} ×${item.quantity} — ${formatPrice(item.unitPrice * item.quantity)}`,
    )
  }
  lines.push('')
  lines.push(`Total: ${formatPrice(order.total)}`)
  lines.push('')
  lines.push(`Name: ${order.customerName}`)
  lines.push(`Phone: ${order.customerPhone}`)
  if (order.customerAddress) lines.push(`Address: ${order.customerAddress}`)
  if (order.note) lines.push(`Note: ${order.note}`)
  return lines.join('\n')
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
