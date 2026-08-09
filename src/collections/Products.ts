import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const MATERIALS = [
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
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'inStock', '_status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'images',
              type: 'array',
              minRows: 1,
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
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
            {
              name: 'material',
              type: 'select',
              options: [...MATERIALS],
            },
            {
              name: 'gauge',
              type: 'text',
              admin: {
                description: 'e.g. 16g (1.2mm)',
              },
            },
            {
              name: 'size',
              type: 'text',
              admin: {
                description: 'e.g. 8mm internal diameter',
              },
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
                    description: 'Price in ₹ (INR)',
                    width: '50%',
                  },
                },
                {
                  name: 'compareAtPrice',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Original price, shown struck-through when on sale',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'variants',
              type: 'array',
              admin: {
                description:
                  'Optional variants (e.g. sizes or colors). Leave empty for a single-option product.',
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
                        description: 'Overrides base price if set',
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
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
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
