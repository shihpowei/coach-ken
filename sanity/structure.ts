import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('profile').title('教練個人檔案'),
      S.documentTypeListItem('homepage').title('首頁設定'),
      S.divider(),
      S.documentTypeListItem('post').title('教練專欄'),
    ])
