'use client'

import { useEffect } from 'react'

import { useCart } from '@/lib/cart'

/** Rendered on the order confirmation page — empties the cart once the order exists. */
export function ClearCartOnMount() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return null
}
