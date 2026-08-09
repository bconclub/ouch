import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:px-6">
      <p className="font-display text-7xl font-extrabold">
        <span className="text-rainbow">404</span>
      </p>
      <h1 className="font-display mt-4 text-2xl font-bold tracking-tight uppercase">
        Nothing pierced here
      </h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        className="mt-8 inline-block btn-vibrant rounded-md px-8 py-3 text-sm font-bold tracking-widest text-white uppercase"
        href="/shop"
      >
        Back to shop
      </Link>
    </div>
  )
}
