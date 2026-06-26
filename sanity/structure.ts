import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
<<<<<<< HEAD
    .items(S.documentTypeListItems())
=======
    .items([
      S.documentTypeListItem('profile').title('教練個人檔案'),
      S.documentTypeListItem('homepage').title('首頁設定'),
      S.divider(),
      S.documentTypeListItem('post').title('教練專欄'),
    ])
>>>>>>> 93c6b6d (更新網站 SEO 與內容)
