// schemaTypes/testimonial.ts
export default {
  name: 'testimonial',
  title: '學員見證',
  type: 'document',
  fields: [
    {
      name: 'studentName',
      title: '學員名稱',
      type: 'string',
    },
    {
      name: 'program',
      title: '參加的課程名稱',
      type: 'string',
    },
    {
      name: 'content',
      title: '心得回饋',
      type: 'text',
    },
    {
      name: 'beforeImage',
      title: '訓練前照片 (Before)',
      type: 'image',
    },
    {
      name: 'afterImage',
      title: '訓練後照片 (After)',
      type: 'image',
    },
  ],
}