import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  // Populate the name whenever a category is referenced, so relationship cells
  // (e.g. the Category column on Products) show the name instead of a blank.
  defaultPopulate: {
    name: true,
    slug: true,
  },
  admin: {
    group: 'Catalogue',
    useAsTitle: 'name',
    description: 'Shop sections. The cover photo shows on the home page and category pages.',
    defaultColumns: ['image', 'name', 'slug', 'displayOrder'],
    listSearchableFields: ['name'],
    preview: (doc) => (doc?.slug ? `/category/${doc.slug}` : null),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
