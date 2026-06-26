// sanity/schemaTypes/profile.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: '教練個人檔案',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      initialValue: '阿Ken教練',
    }),
    defineField({
      name: 'portrait',
      title: '形象照片',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: '關於我 (自我介紹)',
      type: 'array', 
      of: [{type: 'block'}], // 這是 Rich Text，支援分段落
    }),
    defineField({
      name: 'certifications',
      title: '證照列表 (Certifications)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'experience',
      title: '經歷列表 (Experience)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'achievements',
      title: '競技成績 (Achievements)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specialties',
      title: '專長標籤 (Specialties)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})