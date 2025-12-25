import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'venue',
  title: '合作場地 (Venue)',
  type: 'document',
  fields: [
    defineField({
      name: 'area',
      title: '地區 (例如：高雄鳳山、苓雅區)',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: '場館名稱',
      type: 'string',
    }),
    defineField({
      name: 'address',  // 🆕 新增這個欄位
      title: '地址 (選填)', 
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '備註 (例如：免入會費、需教練陪同)',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: '場館連結 (Google Map 或粉專，可不填)',
      type: 'url',
    }),
  ],
})