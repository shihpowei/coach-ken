import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: '課程收費 (Pricing)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '方案名稱', type: 'string' }),
    defineField({ name: 'price', title: '價格', type: 'string' }),
    defineField({ name: 'unit', title: '單位/備註', type: 'string' }),
    defineField({ name: 'order', title: '排序編號', type: 'number' }),
  ],
})