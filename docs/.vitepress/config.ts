import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/shindo/',
  lang: 'ru-RU',
  title: "Shindo Life Docs",
  description: "Гайды и советы по Shindo Life от ETEPHYM",
  appearance: 'force-dark',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'Tips & Tricks', link: '/tips' }
    ],
    sidebar: [
      {
        text: 'Shindo Life',
        items: [
          { text: 'Guide', link: '/guide' },
          { text: 'Tips & Tricks', link: '/tips' }
        ]
      }
    ],
    search: { provider: 'local' },
    footer: { message: 'Shindo Life Docs by ETEPHYM' },
    editLink: {
      pattern: 'https://github.com/etephym/shindo/edit/main/docs/:path',
      text: 'Редактировать на GitHub'
    },
    lastUpdated: { text: 'Обновлено' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/etephym/shindo' }
    ]
  }
})
