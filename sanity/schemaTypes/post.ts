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
