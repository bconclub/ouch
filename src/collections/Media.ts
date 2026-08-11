import type { CollectionConfig } from 'payload'

/** "titanium-flat-back-labret.jpg" → "Titanium flat back labret" */
const prettifyFilename = (filename: string): string =>
  filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase())

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Catalogue',
    description: 'Every photo used on the site. Drag images straight in — a description is filled in for you.',
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description:
          'Short description of the photo, read aloud by screen readers and shown if the image fails to load. Auto-filled from the file name — edit it if you want.',
      },
      hooks: {
        // Auto-fill from the uploaded file name so bulk uploads never block on alt text.
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim().length > 0) return value
            const filename = data?.filename
            return typeof filename === 'string' ? prettifyFilename(filename) : value
          },
        ],
      },
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 768,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    focalPoint: true,
  },
}
