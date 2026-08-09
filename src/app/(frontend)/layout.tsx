import type { Metadata } from 'next'
import { Inter, Unbounded } from 'next/font/google'
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

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  weight: ['500', '600', '700', '800'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: `${settings.storeName} — Piercings & Supplies`,
      template: `%s — ${settings.storeName}`,
    },
    description: settings.tagline ?? 'Piercing jewelry and professional supplies.',
  }
}

export default async function StorefrontLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${unbounded.variable}`} lang="en">
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
