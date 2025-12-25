import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricing',
  title: '課程收費 (Pricing)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '方案名稱 (例如：一對一、四人包班)',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: '價格 (例如：1200元、2000元)',
      type: 'string',
    }),
    defineField({
      name: 'unit',
      title: '單位/備註 (例如：每堂、每人、總價)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: '排序編號 (數字越小越前面)',
      type: 'number',
    }),
  ],
})