'use client'

import React from 'react'

import { useCart } from '@/lib/cart'

export function CartButton() {
  const { count, openCart } = useCart()

  return (
    <button
      aria-label={`Open cart (${count} items)`}
      className="relative rounded p-2 text-ink transition-colors hover:text-pink"
      onClick={openCart}
      type="button"
    >
      <svg fill="none" height="24" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" width="24">
        <path
          d="M5.5 8.5h13l-.9 11a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8l-.9-11zM8.8 8.5V7a3.2 3.2 0 016.4 0v1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  )
}
