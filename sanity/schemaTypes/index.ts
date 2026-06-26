import { type SchemaTypeDefinition } from 'sanity'
import profile from './profile'
import homepage from './homepage' // 👈 新增這一行
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, homepage, post], // 👈 這裡也要加入 homepage
}
