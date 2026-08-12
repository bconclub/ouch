import type { Metadata } from 'next'
import { Inter, Luckiest_Guy, Permanent_Marker } from 'next/font/google'
import React from 'react'

import { CartProvider } from '@/lib/cart'
import { getSiteSettings } from '@/lib/queries'
import { CartDrawer } from '@/components/CartDrawer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { themeInitScript } from '@/components/ThemeToggle'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const luckiest = Luckiest_Guy({
  subsets: ['latin'],
  variable: '--font-luckiest',
  weight: '400',
})

const marker = Permanent_Marker({
  subsets: ['latin'],
  variable: '--font-marker',
  weight: '400',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: `${settings.storeName} — Piercings that hit different`,
      template: `%s — ${settings.storeName}`,
    },
    description: settings.tagline ?? 'Bold pieces. Good vibes. Made to stand out, just like you.',
  }
}

export default async function StorefrontLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      className={`${inter.variable} ${luckiest.variable} ${marker.variable}`}
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
