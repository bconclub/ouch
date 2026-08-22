import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:px-6">
      <p className="font-display text-7xl font-extrabold">
        <span className="text-pink">404</span>
      </p>
      <h1 className="font-display mt-4 text-2xl font-bold tracking-tight uppercase">
        Oops, nothing pierced here
      </h1>
      <p className="mt-3 text-muted">This page wandered off. The good stuff is still right here though.</p>
      <Link
        className="mt-8 inline-block btn-vibrant px-8 py-3 text-sm font-bold tracking-widest uppercase"
        href="/shop"
      >
        Back to shop
      </Link>
    </div>
  )
}
