import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  BASE_PATH,
  FULL_URL,
  SITEMAP_HOSTNAME,
  SITE_HOSTNAME,
  GITHUB_REPO_URL,
  EDIT_LINK,
  DISCORD_URL,
  TELEGRAM_URL,
  LICENSE_ICON_PATH,
} from './site.config'

const SOCIAL_LINKS: DefaultTheme.SocialLink[] = [
  { icon: 'github',   link: GITHUB_REPO_URL },
  { icon: 'discord',  link: DISCORD_URL },
  { icon: 'telegram', link: TELEGRAM_URL },
]

const CC_ICONS = (['cc', 'by', 'nc', 'sa'] as const)
  .map(icon => `<img src="${LICENSE_ICON_PATH}/${icon}.svg" alt="${icon.toUpperCase()}" width="18" height="18">`)
  .join('')

const FOOTER_MESSAGE =
  '<a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>' +
  ' &nbsp;·&nbsp; ' +
  '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>' +
  ` <span class="footer-cc-icons">${CC_ICONS}</span>`

const DARK_THEME_SCRIPT =
  `(function(){try{var k='vitepress-theme-appearance';` +
  `if(!localStorage.getItem(k))localStorage.setItem(k,'dark');}catch(e){}})()`

const SHARED_HEAD = [
  ['script', {}, DARK_THEME_SCRIPT],
  ['link',   { rel: 'icon', href: `${BASE_PATH}logo.png` }],
  ['meta',   { name: 'theme-color', content: '#0d0d0d' }],
  ['meta',   { property: 'og:image', content: `${FULL_URL}logo.png` }],
  ['meta',   { property: 'og:type',  content: 'website' }],
] as [string, Record<string, string>, string?][]

const DEFAULT_LOGO = {
  dark:  '/logo.png',
  light: '/logo2.png',
} satisfies DefaultTheme.ThemeableImage

const SEARCH: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    miniSearch: { searchOptions: { fuzzy: 0.2, prefix: true } },
    translations: {
      button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      modal: {
        displayDetails:   'Show detailed list',
        resetButtonTitle: 'Reset',
        backButtonTitle:  'Close',
        noResultsText:    'No results for',
        footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' },
      },
    },
    locales: {
      ru: {
        translations: {
          button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
          modal: {
            displayDetails:   'Подробный список',
            resetButtonTitle: 'Сбросить',
            backButtonTitle:  'Закрыть',
            noResultsText:    'Ничего не найдено по запросу',
            footer: { selectText: 'Выбрать', navigateText: 'Навигация', closeText: 'Закрыть' },
          },
        },
      },
    },
  },
}

const SVG_ABOUT  = '<span class="sb-icon sb-icon-about"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"/></svg></span>'
const SVG_ISSUES = '<span class="sb-icon sb-icon-issues"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.17 12l-4.58-4.59L16 6l6 6-3.59 3.59L17 14.17 19.17 12zM1.39 4.22l4.19 4.19L2 12l6 6 1.41-1.41L4.83 12 7 9.83 19.78 22.61l1.41-1.41L2.81 2.81 1.39 4.22z"/></svg></span>'
const SVG_GUIDE  = '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span>'
const SVG_TIPS   = '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span>'

const sidebarEn: DefaultTheme.Sidebar = [
  {
    text: '📌 Pinned',
    collapsed: false,
    items: [
      { text: `${SVG_ABOUT} About`, link: '/about' },
    ],
  },
  {
    text: '⚔️ Shindo Life 2',
    collapsed: false,
    items: [
      { text: `${SVG_ISSUES} Shindo Life Issues`, link: '/shindo-life/issues',  badge: { type: 'danger',  text: 'Active'    } },
      { text: `${SVG_GUIDE} Guide`,               link: '/shindo-life/guide',   badge: { type: 'tip',     text: 'Read'      } },
      { text: `${SVG_TIPS} Tips & Tricks`,        link: '/shindo-life/tips',    badge: { type: 'warning', text: 'Important' } },
    ],
  },
  {
    text: '🌊 Rell Seas',
    collapsed: false,
    items: [
      { text: `${SVG_GUIDE} Guide`,        link: '/rell-seas/guide', badge: { type: 'tip',  text: 'Soon' } },
      { text: `${SVG_TIPS} Tips & Tricks`, link: '/rell-seas/tips',  badge: { type: 'info', text: 'Soon' } },
    ],
  },
]

const sidebarRu: DefaultTheme.Sidebar = [
  {
    text: '📌 Закреплено',
    collapsed: false,
    items: [
      { text: `${SVG_ABOUT} О проекте`, link: '/ru/about' },
    ],
  },
  {
    text: '⚔️ Shindo Life 2',
    collapsed: false,
    items: [
      { text: `${SVG_ISSUES} Проблемы Shindo Life`, link: '/ru/shindo-life/issues',  badge: { type: 'danger',  text: 'Актуально' } },
      { text: `${SVG_GUIDE} Гайд`,                  link: '/ru/shindo-life/guide',   badge: { type: 'tip',     text: 'Читать'    } },
      { text: `${SVG_TIPS} Советы и фишки`,         link: '/ru/shindo-life/tips',    badge: { type: 'warning', text: 'Важно'     } },
    ],
  },
  {
    text: '🌊 Rell Seas',
    collapsed: false,
    items: [
      { text: `${SVG_GUIDE} Гайд`,          link: '/ru/rell-seas/guide', badge: { type: 'tip',  text: 'Скоро' } },
      { text: `${SVG_TIPS} Советы и фишки`, link: '/ru/rell-seas/tips',  badge: { type: 'info', text: 'Скоро' } },
    ],
  },
]

const SHARED_THEME = {
  logo:        DEFAULT_LOGO,
  siteTitle:   'RELL Games',
  socialLinks: SOCIAL_LINKS,
}

export default defineConfig({
  lang:        'en-US',
  title:       'RELL Games Docs',
  description: 'Guides, tier lists and mechanics for RELL Games by ETEPHYM',
  base:        BASE_PATH,
  cleanUrls:   true,
  lastUpdated: true,

  rewrites: {
    'en/:path*':               ':path*',
    'shindo-life/index.md':    'shindo-life/guide.md',
    'rell-seas/index.md':      'rell-seas/guide.md',
    'ru/shindo-life/index.md': 'ru/shindo-life/guide.md',
    'ru/rell-seas/index.md':   'ru/rell-seas/guide.md',
  },

  sitemap: {
    hostname: SITEMAP_HOSTNAME,
    transformItems: items => items.filter(item => !item.url.startsWith('ru/')),
  },

  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
  },

  themeConfig: {
    search: SEARCH,
  },

  locales: {
    root: {
      label:         'English',
      lang:          'en-US',
      title:         'RELL Games Docs',
      titleTemplate: ':title · RELL Games',
      description:   'Guides, tier lists and mechanics for RELL Games by ETEPHYM',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: FULL_URL }],
        ['meta', { property: 'og:locale',      content: 'en_US' }],
        ['meta', { property: 'og:title',       content: 'RELL Games Docs' }],
        ['meta', { property: 'og:description', content: 'Guides, tier lists and mechanics for RELL Games' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 Home', link: '/' },
          { text: `${SVG_ABOUT} About`, link: '/about' },
          {
            text: '⚔️ Shindo Life 2',
            items: [
              { text: `${SVG_ISSUES} Shindo Life Issues`, link: '/shindo-life/issues' },
              { text: `${SVG_GUIDE} Guide`,               link: '/shindo-life/guide'  },
              { text: `${SVG_TIPS} Tips & Tricks`,        link: '/shindo-life/tips'   },
            ],
          },
          {
            text: '🌊 Rell Seas',
            items: [
              { text: `${SVG_GUIDE} Guide`,        link: '/rell-seas/guide' },
              { text: `${SVG_TIPS} Tips & Tricks`, link: '/rell-seas/tips'  },
            ],
          },
        ],
        sidebar:              sidebarEn,
        outline:              { level: [2, 3], label: 'On this page' },
        returnToTopLabel:     '↑ Back to top',
        sidebarMenuLabel:     'Menu',
        darkModeSwitchLabel:  'Theme',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle:  'Switch to dark theme',
        langMenuLabel:        'Change language',
        externalLinkIcon:     true,
        notFound: {
          title:     '🐸 Page not found',
          quote:     "Looks like this page got lost in the fog of war. The frog doesn't know where it is either.",
          linkLabel: 'Go to home',
          linkText:  '← Back to home',
          code:      '404',
        },
        docFooter:   { prev: '← Previous', next: 'Next →' },
        lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'Edit this page on GitHub' },
        footer:      { message: FOOTER_MESSAGE, copyright: 'RELL Games Docs © 2024–2026' },
      },
    },

    ru: {
      label:         'Русский',
      lang:          'ru-RU',
      link:          '/ru/',
      title:         'RELL Games Docs',
      titleTemplate: ':title · RELL Games',
      description:   'Гайды, тир-листы и механики игр RELL Games от ETEPHYM',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: `${FULL_URL}ru/` }],
        ['meta', { property: 'og:locale',      content: 'ru_RU' }],
        ['meta', { property: 'og:title',       content: 'RELL Games Docs' }],
        ['meta', { property: 'og:description', content: 'Гайды, тир-листы и механики игр RELL Games' }],
        ['meta', { name: 'robots',             content: 'noindex' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 Главная', link: '/ru/' },
          { text: `${SVG_ABOUT} О проекте`, link: '/ru/about' },
          {
            text: '⚔️ Shindo Life 2',
            items: [
              { text: `${SVG_ISSUES} Проблемы Shindo Life`, link: '/ru/shindo-life/issues' },
              { text: `${SVG_GUIDE} Гайд`,                  link: '/ru/shindo-life/guide'  },
              { text: `${SVG_TIPS} Советы и фишки`,         link: '/ru/shindo-life/tips'   },
            ],
          },
          {
            text: '🌊 Rell Seas',
            items: [
              { text: `${SVG_GUIDE} Гайд`,          link: '/ru/rell-seas/guide' },
              { text: `${SVG_TIPS} Советы и фишки`, link: '/ru/rell-seas/tips'  },
            ],
          },
        ],
        sidebar:              sidebarRu,
        outline:              { level: [2, 3], label: 'На этой странице' },
        returnToTopLabel:     '↑ Наверх',
        sidebarMenuLabel:     'Меню',
        darkModeSwitchLabel:  'Тема',
        lightModeSwitchTitle: 'Светлая тема',
        darkModeSwitchTitle:  'Тёмная тема',
        langMenuLabel:        'Сменить язык',
        externalLinkIcon:     true,
        notFound: {
          title:     '🐸 Страница не найдена',
          quote:     'Похоже, эта страница потерялась в тумане войны. Жаба тоже не знает где она.',
          linkLabel: 'На главную',
          linkText:  '← Вернуться на главную',
          code:      '404',
        },
        docFooter:   { prev: '← Предыдущая', next: 'Следующая →' },
        lastUpdated: { text: 'Обновлено', formatOptions: { dateStyle: 'long', timeStyle: 'short' } },
        editLink:    { pattern: EDIT_LINK, text: 'Редактировать на GitHub' },
        footer:      { message: FOOTER_MESSAGE, copyright: 'RELL Games Docs © 2024–2026' },
      },
    },
  },
})
