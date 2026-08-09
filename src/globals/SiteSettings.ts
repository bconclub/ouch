import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'storeName',
      type: 'text',
      required: true,
      defaultValue: 'Ouch',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Self-expression, curated.',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      defaultValue: '+917259956780',
      admin: {
        description:
          'WhatsApp number orders are sent to, with country code (e.g. +917259956780).',
      },
    },
    {
      name: 'announcement',
      type: 'text',
      admin: {
        description: 'Optional announcement bar text shown at the top of every page.',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'instagramUrl',
      type: 'text',
    },
    {
      name: 'currencySymbol',
      type: 'text',
      required: true,
      defaultValue: '₹',
    },
  ],
}
