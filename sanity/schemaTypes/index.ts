import { defineField, defineType } from 'sanity'

// 1. 引入外部檔案
import post from './post'
import testimonial from './testimonial'
import venue from './venue'      // 🆕 補上這位：合作場地
import pricing from './pricing'  // 🆕 補上這位：價目表

// --- 2. 首頁設定 (維持原樣) ---
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

// --- 3. 教練檔案 (維持原樣) ---
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

// --- 4. 註冊所有類型 ---
export const schema = {
  types: [
    homepage,
    profile,
    post,
    testimonial,
    venue,    // ✅ 這裡一定要加進去，後台才會出現！
    pricing,  // ✅ 這裡一定要加進去，後台才會出現！
  ],
}