import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  BASE_PATH,
  FULL_URL,
  SITE_HOSTNAME,
  GITHUB_REPO_URL,
  EDIT_LINK,
  DISCORD_URL,
  TELEGRAM_URL,
} from './site.config'

// ---------------------------------------------------------------------------
// Social links shown in the navbar
// ---------------------------------------------------------------------------

const SOCIAL_LINKS: DefaultTheme.SocialLink[] = [
  { icon: 'github',   link: GITHUB_REPO_URL },
  { icon: 'discord',  link: DISCORD_URL },
  { icon: 'telegram', link: TELEGRAM_URL },
]

// ---------------------------------------------------------------------------
// Footer — CC license icons generated from an array to avoid repetition
// ---------------------------------------------------------------------------

const CC_ICONS = (['cc', 'by', 'nc', 'sa'] as const)
  .map(f => `<img src="https://mirrors.creativecommons.org/presskit/icons/${f}.svg" alt="${f.toUpperCase()}" width="18" height="18">`)
  .join('')

const FOOTER_MESSAGE =
  '<a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>' +
  ' &nbsp;·&nbsp; ' +
  '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>' +
  ` <span class="footer-cc-icons">${CC_ICONS}</span>`

// ---------------------------------------------------------------------------
// Inline script — forces dark mode on first visit before Vue hydrates.
// Wrapped in try/catch for iOS Safari private browsing compatibility.
// ---------------------------------------------------------------------------

const DARK_THEME_SCRIPT =
  `(function(){try{var k='vitepress-theme-appearance';` +
  `if(!localStorage.getItem(k))localStorage.setItem(k,'dark');}catch(e){}})()`

// ---------------------------------------------------------------------------
// Head tags — shared between locales (theme-independent).
// VitePress deduplicates by content — no double-execution.
// ---------------------------------------------------------------------------

const SHARED_HEAD = [
  ['script', {}, DARK_THEME_SCRIPT],
  ['link',   { rel: 'icon', href: `${BASE_PATH}logo.png` }],
  ['meta',   { name: 'theme-color', content: '#0d0d0d' }],
  ['meta',   { property: 'og:image', content: `${FULL_URL}logo.png` }],
  ['meta',   { property: 'og:type',  content: 'website' }],
] as [string, Record<string, string>, string?][]

// ---------------------------------------------------------------------------
// Default logo — switches between dark/light variants automatically
// ---------------------------------------------------------------------------

const DEFAULT_LOGO = {
  dark:  '/logo.png',
  light: '/logo2.png',
} satisfies DefaultTheme.ThemeableImage

// ---------------------------------------------------------------------------
// Search — top-level themeConfig only; locales[x].themeConfig is ignored.
// ---------------------------------------------------------------------------

const SEARCH: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    miniSearch: { searchOptions: { fuzzy: 0.2, prefix: true } },
    // EN translations (primary locale / default)
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
    // RU translations via locales subkey
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

// ---------------------------------------------------------------------------
// Sidebars
// ---------------------------------------------------------------------------

// EN sidebar — links have no prefix (EN is served at root via rewrites)
const sidebarEn: DefaultTheme.Sidebar = [
  {
    text: '📌 Pinned',
    collapsed: false,
    items: [
      { text: '<span class="sb-icon sb-icon-about"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"/></svg></span> About', link: '/about' },
    ],
  },
  {
    text: '⚔️ Shindo Life 2',
    collapsed: false,
    items: [
      { text: '<span class="sb-icon sb-icon-issues"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.17 12l-4.58-4.59L16 6l6 6-3.59 3.59L17 14.17 19.17 12zM1.39 4.22l4.19 4.19L2 12l6 6 1.41-1.41L4.83 12 7 9.83 19.78 22.61l1.41-1.41L2.81 2.81 1.39 4.22z"/></svg></span> Shindo Life Issues', link: '/news/shindo-issues',  badge: { type: 'danger',  text: 'Active'    } },
      { text: '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span> Guide',              link: '/shindo-life/guide',   badge: { type: 'tip',     text: 'Read'      } },
      { text: '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span> Tips & Tricks',      link: '/shindo-life/tips',    badge: { type: 'warning', text: 'Important' } },
    ],
  },
  {
    text: '🌊 Rell Seas',
    collapsed: false,
    items: [
      { text: '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span> Guide',         link: '/rell-seas/guide', badge: { type: 'tip',  text: 'Soon' } },
      { text: '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span> Tips & Tricks', link: '/rell-seas/tips',  badge: { type: 'info', text: 'Soon' } },
    ],
  },
]

// RU sidebar — all links prefixed with /ru/
const sidebarRu: DefaultTheme.Sidebar = [
  {
    text: '📌 Закреплено',
    collapsed: false,
    items: [
      { text: '<span class="sb-icon sb-icon-about"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12"/></svg></span> О проекте', link: '/ru/about' },
    ],
  },
  {
    text: '⚔️ Shindo Life 2',
    collapsed: false,
    items: [
      { text: '<span class="sb-icon sb-icon-issues"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.17 12l-4.58-4.59L16 6l6 6-3.59 3.59L17 14.17 19.17 12zM1.39 4.22l4.19 4.19L2 12l6 6 1.41-1.41L4.83 12 7 9.83 19.78 22.61l1.41-1.41L2.81 2.81 1.39 4.22z"/></svg></span> Проблемы Shindo Life', link: '/ru/news/shindo-issues',  badge: { type: 'danger',  text: 'Актуально' } },
      { text: '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span> Гайд',                 link: '/ru/shindo-life/guide',   badge: { type: 'tip',     text: 'Читать'    } },
      { text: '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span> Советы и фишки',       link: '/ru/shindo-life/tips',    badge: { type: 'warning', text: 'Важно'     } },
    ],
  },
  {
    text: '🌊 Rell Seas',
    collapsed: false,
    items: [
      { text: '<span class="sb-icon sb-icon-guide"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg></span> Гайд',           link: '/ru/rell-seas/guide', badge: { type: 'tip',  text: 'Скоро' } },
      { text: '<span class="sb-icon sb-icon-tips"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27C4.16 15.36 1.5 13.32 1.5 9.5 1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm4.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg></span> Советы и фишки', link: '/ru/rell-seas/tips',  badge: { type: 'info', text: 'Скоро' } },
    ],
  },
]

// ---------------------------------------------------------------------------
// Shared themeConfig fields
// ---------------------------------------------------------------------------

const SHARED_THEME = {
  logo:        DEFAULT_LOGO,
  siteTitle:   'Rell Games',
  socialLinks: SOCIAL_LINKS,
}

// ---------------------------------------------------------------------------
// Main config export
// ---------------------------------------------------------------------------

export default defineConfig({
  base:        BASE_PATH,
  cleanUrls:   true,
  lastUpdated: true,

  // ---------------------------------------------------------------------------
  // Rewrites — EN content folder is mapped to root URLs (no /en/ prefix).
  // RU content stays under /ru/ with no rewrite needed.
  // To swap primary locale: change PRIMARY_LOCALE in site.config.ts,
  // then swap 'en' ↔ 'ru' in rewrites and sidebar/nav link prefixes below.
  // ---------------------------------------------------------------------------
  rewrites: {
    'en/:path*':               ':path*',
    'shindo-life/index.md':    'shindo-life/guide.md',
    'rell-seas/index.md':      'rell-seas/guide.md',
    'news/index.md':           'news/shindo-issues.md',
    'ru/shindo-life/index.md': 'ru/shindo-life/guide.md',
    'ru/rell-seas/index.md':   'ru/rell-seas/guide.md',
    'ru/news/index.md':        'ru/news/shindo-issues.md',
  },

  // sitemap.hostname must be bare origin — VitePress appends base automatically.
  // Filter RU pages (secondary, noindex).
  sitemap: {
    hostname: SITE_HOSTNAME,
    transformItems: items => items.filter(item => !item.url.startsWith('ru/')),
  },

  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
  },

  // Search must be at top-level themeConfig — ignored inside locales
  themeConfig: {
    search: SEARCH,
  },

  locales: {
    // English — primary locale, served at root (no prefix)
    root: {
      label:         'English',
      lang:          'en-US',
      title:         'Rell Games Docs',
      titleTemplate: ':title · Rell Games',
      description:   'Guides, tier lists and mechanics for Rell Games by ETEPHYM',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: FULL_URL }],
        ['meta', { property: 'og:locale',      content: 'en_US' }],
        ['meta', { property: 'og:title',       content: 'Rell Games Docs' }],
        ['meta', { property: 'og:description', content: 'Guides, tier lists and mechanics for Rell Games' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 Home', link: '/' },
          { text: '📌 About', link: '/about' },
          {
            text: '⚔️ Shindo Life 2',
            items: [
              { text: '🔴 Shindo Life Issues', link: '/news/shindo-issues' },
              { text: '📖 Guide',              link: '/shindo-life/guide'  },
              { text: '💡 Tips & Tricks',      link: '/shindo-life/tips'   },
            ],
          },
          {
            text: '🌊 Rell Seas',
            items: [
              { text: '📖 Guide',         link: '/rell-seas/guide' },
              { text: '💡 Tips & Tricks', link: '/rell-seas/tips'  },
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
        footer:      { message: FOOTER_MESSAGE, copyright: 'Rell Games Docs © 2024–2026' },
      },
    },

    // Russian — secondary locale, served under /ru/
    ru: {
      label:         'Русский',
      lang:          'ru-RU',
      link:          '/ru/',
      title:         'Rell Games Docs',
      titleTemplate: ':title · Rell Games',
      description:   'Гайды, тир-листы и механики игр Rell Games от ETEPHYM',
      head: [
        ...SHARED_HEAD,
        ['meta', { property: 'og:url',         content: `${FULL_URL}ru/` }],
        ['meta', { property: 'og:locale',      content: 'ru_RU' }],
        ['meta', { property: 'og:title',       content: 'Rell Games Docs' }],
        ['meta', { property: 'og:description', content: 'Гайды, тир-листы и механики игр Rell Games' }],
        ['meta', { name: 'robots',             content: 'noindex' }],
      ],
      themeConfig: {
        ...SHARED_THEME,
        nav: [
          { text: '🏠 Главная', link: '/ru/' },
          { text: '📌 О проекте', link: '/ru/about' },
          {
            text: '⚔️ Shindo Life 2',
            items: [
              { text: '🔴 Проблемы Shindo Life', link: '/ru/news/shindo-issues' },
              { text: '📖 Гайд',                 link: '/ru/shindo-life/guide'  },
              { text: '💡 Советы и фишки',       link: '/ru/shindo-life/tips'   },
            ],
          },
          {
            text: '🌊 Rell Seas',
            items: [
              { text: '📖 Гайд',           link: '/ru/rell-seas/guide' },
              { text: '💡 Советы и фишки', link: '/ru/rell-seas/tips'  },
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
        langMenuLabel:        'Change language',
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
        footer:      { message: FOOTER_MESSAGE, copyright: 'Rell Games Docs © 2024–2026' },
      },
    },
  },
})
