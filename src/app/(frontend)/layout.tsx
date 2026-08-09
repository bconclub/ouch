import type { Metadata } from 'next'
import { Caveat, Fraunces, Inter } from 'next/font/google'
import React from 'react'

import { CartProvider } from '@/lib/cart'
import { getSiteSettings } from '@/lib/queries'
import { CartDrawer } from '@/components/CartDrawer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: `${settings.storeName} — Piercings & Ornaments`,
      template: `%s — ${settings.storeName}`,
    },
    description: settings.tagline ?? 'Self-expression, curated. Piercings, ornaments, you.',
  }
}

export default async function StorefrontLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`} lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
