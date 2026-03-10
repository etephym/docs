import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/shindo/',
  lang: 'ru-RU',
  title: "Shindo Life Docs",
  description: "Гайды и советы по Shindo Life от ETEPHYM",
  appearance: 'dark',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/shindo/logo.jpg', type: 'image/jpeg' }]
  ],

  sitemap: {
    hostname: 'https://etephym.github.io/shindo/'
  },

  themeConfig: {
    logo: '/logo.jpg',

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'Tips & Tricks', link: '/tips' }
    ],

    sidebar: [
      {
        text: 'Shindo Life',
        items: [
          { text: '📖 Guide', link: '/guide' },
          { text: '💡 Tips & Tricks', link: '/tips' }
        ]
      },
      {
        text: 'В гайде',
        collapsed: true,
        items: [
          { text: 'Пассивки менторов', link: '/guide#пассивки-менторов' },
          { text: 'Менторы', link: '/guide#менторы' },
          { text: 'Rep Bonus', link: '/guide#rep-bonus-stats' },
          { text: 'Расы', link: '/guide#расы' },
          { text: 'Хилки', link: '/guide#хилки' },
          { text: 'Термины', link: '/guide#термины' },
          { text: 'Elements', link: '/guide#elements' },
          { text: 'Kenjutsu', link: '/guide#kenjutsu' },
          { text: 'Sub Abilities', link: '/guide#sub-abilities' },
          { text: 'Sub Modes', link: '/guide#sub-modes' },
          { text: 'Weapons', link: '/guide#weapons' },
          { text: 'Баг слотов', link: '/guide#баг-слотов' },
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: 'На этой странице'
    },

    search: { provider: 'local' },
    externalLinkIcon: true,
    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    darkModeSwitchLabel: 'Тема',

    footer: {
      message: 'Shindo Life Docs by ETEPHYM'
    },

    lastUpdated: { text: 'Обновлено' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/etephym/shindo' },
      { icon: 'discord', link: 'https://discord.gg/cmCpgkb5zq' },
      { icon: 'telegram', link: 'https://t.me/etephym' }
    ]
  }
})
