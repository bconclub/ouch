import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const MATERIALS = [
  { label: '925 Silver', value: 'silver' },
  { label: 'Titanium', value: 'titanium' },
  { label: 'Surgical Steel', value: 'surgical-steel' },
  { label: 'Gold', value: 'gold' },
  { label: 'Niobium', value: 'niobium' },
  { label: 'Silicone', value: 'silicone' },
  { label: 'Other', value: 'other' },
] as const

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Catalogue',
    useAsTitle: 'title',
    description:
      'Everything you sell. Add photos, price and category, then hit Publish to put a product live.',
    defaultColumns: ['images', 'title', 'categoryName', 'price', 'inStock', '_status'],
    listSearchableFields: ['title', 'categoryName', 'gauge', 'size'],
    preview: (doc) => (doc?.slug ? `/products/${doc.slug}` : null),
  },
  versions: {
    drafts: true,
  },
  hooks: {
    // Keep a plain-text copy of the category name. Relationship columns don't
    // resolve in the list view for draft-enabled collections, and a text copy
    // is also sortable and searchable.
    beforeChange: [
      async ({ data, req }) => {
        const category = data?.category
        const id = typeof category === 'object' && category !== null ? category.id : category
        if (!id) return { ...data, categoryName: null }
        const doc = await req.payload
          .findByID({ collection: 'categories', id, depth: 0 })
          .catch(() => null)
        return { ...data, categoryName: doc?.name ?? null }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The product name customers see, e.g. "Titanium Segment Ring".',
      },
    },
    slugField('title'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Photos & Details',
          fields: [
            {
              name: 'images',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Photo', plural: 'Photos' },
              admin: {
                description:
                  'First photo is the main one shown in listings. Add as many as you like — customers can swipe through them.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              admin: {
                description: 'What it is, what it is made of, why someone would love it.',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: {
                description: 'Which section of the shop this belongs in.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'material',
                  type: 'select',
                  options: [...MATERIALS],
                  admin: { width: '34%' },
                },
                {
                  name: 'gauge',
                  type: 'text',
                  admin: {
                    description: 'e.g. 16g (1.2mm)',
                    width: '33%',
                  },
                },
                {
                  name: 'size',
                  type: 'text',
                  admin: {
                    description: 'e.g. 8mm internal diameter',
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing & Stock',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    description: 'Selling price in ₹ (numbers only, no symbol)',
                    width: '50%',
                  },
                },
                {
                  name: 'compareAtPrice',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Original price — shown struck-through to mark a sale. Leave blank if not on sale.',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'variants',
              type: 'array',
              labels: { singular: 'Option', plural: 'Options' },
              admin: {
                description:
                  'Sizes or colours of the same product (e.g. 6mm / 8mm / 10mm). Leave empty if there is only one version.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'e.g. 6mm / Rose Gold',
                        width: '40%',
                      },
                    },
                    {
                      name: 'price',
                      type: 'number',
                      min: 0,
                      admin: {
                        description: 'Only if this option costs more or less than the base price',
                        width: '30%',
                      },
                    },
                    {
                      name: 'inStock',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: {
                        width: '30%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'categoryName',
      type: 'text',
      label: 'Category',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Filled in automatically from the Category you pick.',
      },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Untick to show "Sold out" and stop it being ordered.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured products appear on the home page.',
      },
    },
  ],
}
