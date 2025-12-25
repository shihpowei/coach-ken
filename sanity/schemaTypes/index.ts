import { defineField, defineType } from 'sanity'

// 這裡引入您剛剛建立的那兩個新檔案
import post from './post'
import testimonial from './testimonial'

// --- 1. 首頁設定 (保持您原本寫好的) ---
const homepage = defineType({
  name: 'homepage',
  title: '首頁設定 (Hero區塊)',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: '主標題 (例如: 阿Ken教練)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: '副標題', type: 'string' }),
    defineField({ name: 'heroDescription', title: '簡短描述', type: 'text' }),
    defineField({ name: 'heroImage', title: '背景大圖', type: 'image', options: { hotspot: true } }),
  ],
})

// --- 2. 教練檔案 (保持您原本寫好的) ---
const profile = defineType({
  name: 'profile',
  title: '教練個人檔案',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: '識別名稱 (不用顯示)', type: 'string' }),
    defineField({ name: 'portrait', title: '形象照', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: '自我介紹 (Bio)', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'certifications', title: '證照列表', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'experience', title: '經歷列表', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'achievements', title: '成績列表', type: 'array', of: [{type: 'string'}] }),
    defineField({ name: 'specialties', title: '專長標籤', type: 'array', of: [{type: 'string'}] }),
  ],
})

// ⚠️ 重點在這裡：把那兩個外部檔案加進 types 陣列
export const schema = {
  types: [
    homepage,     // 原本的
    profile,      // 原本的
    post,         // 新增的：部落格
    testimonial,  // 新增的：學員見證
  ],
}