'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type CartItem = {
  productId: number
  slug: string
  title: string
  image: string | null
  variant: string | null
  unitPrice: number
  quantity: number
}

export const cartItemKey = (item: Pick<CartItem, 'productId' | 'variant'>): string =>
  `${item.productId}::${item.variant ?? ''}`

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'ouch-cart-v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // corrupted cart — start fresh
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode) — cart lives in memory only
    }
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const key = cartItemKey(item)
      const existing = prev.find((i) => cartItemKey(i) === key)
      if (existing) {
        return prev.map((i) =>
          cartItemKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [...prev, { ...item, quantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => cartItemKey(i) !== key))
  }, [])

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => cartItemKey(i) !== key)
        : prev.map((i) => (cartItemKey(i) === key ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }
  }, [items, isOpen, openCart, closeCart, addItem, removeItem, setQuantity, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
