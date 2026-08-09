import type { Field, FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return formatSlug(value)
    }
    if (operation === 'create' || operation === 'update') {
      const fallback = data?.[fallbackField]
      if (typeof fallback === 'string' && fallback.length > 0) {
        return formatSlug(fallback)
      }
    }
    return value
  }

export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL identifier. Leave blank to auto-generate.',
  },
  hooks: {
    beforeValidate: [formatSlugHook(fallbackField)],
  },
})
