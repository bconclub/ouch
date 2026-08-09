'use client'

import React from 'react'

import { useCart } from '@/lib/cart'

export function CartButton() {
  const { count, openCart } = useCart()

  return (
    <button
      aria-label={`Open cart (${count} items)`}
      className="relative rounded p-2 text-ink transition-colors hover:text-accent"
      onClick={openCart}
      type="button"
    >
      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" width="24">
        <path
          d="M6 8h12l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8zM9 8V6a3 3 0 016 0v2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  )
}
