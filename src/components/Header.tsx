import React from 'react'

import { getSiteSettings } from '@/lib/queries'
import { SiteHeader } from './SiteHeader'

export async function Header() {
  const settings = await getSiteSettings()

  return <SiteHeader announcement={settings.announcement} storeName={settings.storeName} />
}
