<<<<<<< HEAD
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
=======
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: '教練專欄',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '文章標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址代稱',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '文章分類',
      type: 'string',
      options: {
        list: [
          {title: '新手健身', value: '新手健身'},
          {title: '銀髮族訓練', value: '銀髮族訓練'},
          {title: '飲食營養', value: '飲食營養'},
          {title: '上班族痠痛', value: '上班族痠痛'},
          {title: '課程案例', value: '課程案例'},
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: '文章摘要',
      type: 'text',
      rows: 3,
      description: '顯示在首頁、文章列表與 Google 搜尋描述的短文案。',
    }),
    defineField({
      name: 'coverImage',
      title: '封面圖片',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'publishedAt',
      title: '發布日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: '文章內容',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
