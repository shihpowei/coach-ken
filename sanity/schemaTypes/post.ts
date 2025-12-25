// schemaTypes/post.ts
export default {
  name: 'post',
  title: '部落格文章',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '文章標題',
      type: 'string',
    },
    {
      name: 'slug',
      title: '網址路徑 (Slug)',
      type: 'slug',
      options: {
        source: 'title', // 會根據標題自動產生網址，例如 "如何減重" 變成 "如何減重"
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: '文章主圖',
      type: 'image',
      options: {
        hotspot: true, // 允許您在後台裁剪圖片重點
      },
    },
    {
      name: 'publishedAt',
      title: '發布日期',
      type: 'datetime',
    },
    {
      name: 'body',
      title: '文章內容',
      type: 'array',
      of: [
        { type: 'block' }, // 這就是您要的圖文編輯區
        { type: 'image' }
      ],
    },
  ],
}