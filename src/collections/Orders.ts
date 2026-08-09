import type { CollectionConfig } from 'payload'

export const ORDER_STATUSES = [
  { label: 'New', value: 'new' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
] as const

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    // Orders are created server-side via the Local API (checkout server action)
    // and managed by admins only.
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'total', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [...ORDER_STATUSES],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      defaultValue: 'whatsapp',
      options: [
        { label: 'WhatsApp', value: 'whatsapp' },
        // Future: razorpay, stripe, cod…
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'customerName',
          type: 'text',
          required: true,
        },
        {
          name: 'customerPhone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'customerAddress',
      type: 'textarea',
    },
    {
      name: 'note',
      type: 'textarea',
      admin: {
        description: 'Customer note from checkout',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Product title snapshot at time of order',
          },
        },
        {
          name: 'variant',
          type: 'text',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quantity',
              type: 'number',
              required: true,
              min: 1,
            },
            {
              name: 'unitPrice',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Price snapshot in ₹',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Order total in ₹',
      },
    },
  ],
}
