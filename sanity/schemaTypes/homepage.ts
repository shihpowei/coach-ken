// sanity/schemaTypes/homepage.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: '首頁設定 (Homepage)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: '主標題 (例如：阿Ken教練)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: '副標題 (例如：高雄・屏東專業健身教練)',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: '簡介文案 (例如：從零開始也可以...)',
      type: 'text', 
      rows: 3
    }),
    defineField({
        name: 'heroImage',
        title: '主視覺背景圖 (選填)',
        type: 'image',
        description: '如果您想把白色背景換成照片，可以在這裡上傳',
        options: { hotspot: true },
    }),
  ],
})