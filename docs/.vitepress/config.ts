import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  BASE_PATH,
  FULL_URL,
  SITE_HOSTNAME,
  GITHUB_REPO_URL,
  EDIT_LINK,
  DISCORD_URL,
  TELEGRAM_URL,
  PRIMARY_LOCALE,
  SECONDARY_LOCALE,
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
// Search — configured once at top-level themeConfig with per-locale translations.
// ---------------------------------------------------------------------------

const SEARCH: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    miniSearch: { searchOptions: { fuzzy: 0.2, prefix: true } },
    // Primary locale translations (EN)
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
    // Secondary locale translations (RU)
    locales: {
      [SECONDARY_LOCALE]: {
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
// Locale-specific config blocks
// ---------------------------------------------------------------------------

const localeConfig = {
  en: {
    label:         'English',
    lang:          'en-US',
    title:         'Rell Games Docs',
    titleTemplate: ':title · Rell Games',
    description:   'Guides, tier lists and mechanics for Rell Games by ETEPHYM',
    sidebar: [
      {
        text: '📌 Pinned',
        collapsed: false,
        items: [{ text: 'About', link: '/about' }],
      },
      {
        text: '⚔️ Shindo Life 2',
        collapsed: false,
        items: [
          { text: 'Shindo Life Issues', link: '/news/shindo-issues',  badge: { type: 'danger',  text: 'Active'     } },
          { text: 'Guide',              link: '/shindo-life/guide',   badge: { type: 'tip',     text: 'Read'       } },
          { text: 'Tips & Tricks',      link: '/shindo-life/tips',    badge: { type: 'warning', text: 'Important'  } },
        ],
      },
      {
        text: '🌊 Rell Seas',
        collapsed: false,
        items: [
          { text: 'Guide',         link: '/rell-seas/guide', badge: { type: 'tip',  text: 'Soon' } },
          { text: 'Tips & Tricks', link: '/rell-seas/tips',  badge: { type: 'info', text: 'Soon' } },
        ],
      },
    ] as DefaultTheme.Sidebar,
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
    themeConfig: {
      outline:              { level: [2, 3], label: 'On this page' },
      returnToTopLabel:     '↑ Back to top',
      sidebarMenuLabel:     'Menu',
      darkModeSwitchLabel:  'Theme',
      lightModeSwitchTitle: 'Switch to light theme',
      darkModeSwitchTitle:  'Switch to dark theme',
      langMenuLabel:        'Change language',
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
    head: [
      ...SHARED_HEAD,
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:title', content: 'Rell Games Docs' }],
      ['meta', { property: 'og:description', content: 'Guides, tier lists and mechanics for Rell Games' }],
    ],
  },

  ru: {
    label:         'Русский',
    lang:          'ru-RU',
    title:         'Rell Games Docs',
    titleTemplate: ':title · Rell Games',
    description:   'Гайды, тир-листы и механики игр Rell Games от ETEPHYM',
    sidebar: [
      {
        text: '📌 Закреплено',
        collapsed: false,
        items: [{ text: 'О проекте', link: '/about' }],
      },
      {
        text: '⚔️ Shindo Life 2',
        collapsed: false,
        items: [
          { text: 'Проблемы Shindo Life', link: '/news/shindo-issues',  badge: { type: 'danger',  text: 'Актуально' } },
          { text: 'Гайд',                 link: '/shindo-life/guide',   badge: { type: 'tip',     text: 'Читать'    } },
          { text: 'Советы и фишки',       link: '/shindo-life/tips',    badge: { type: 'warning', text: 'Важно'     } },
        ],
      },
      {
        text: '🌊 Rell Seas',
        collapsed: false,
        items: [
          { text: 'Гайд',           link: '/rell-seas/guide', badge: { type: 'tip',  text: 'Скоро' } },
          { text: 'Советы и фишки', link: '/rell-seas/tips',  badge: { type: 'info', text: 'Скоро' } },
        ],
      },
    ] as DefaultTheme.Sidebar,
    nav: [
      { text: '🏠 Главная', link: '/' },
      { text: '📌 О проекте', link: '/about' },
      {
        text: '⚔️ Shindo Life 2',
        items: [
          { text: '🔴 Проблемы Shindo Life', link: '/news/shindo-issues' },
          { text: '📖 Гайд',                 link: '/shindo-life/guide'  },
          { text: '💡 Советы и фишки',       link: '/shindo-life/tips'   },
        ],
      },
      {
        text: '🌊 Rell Seas',
        items: [
          { text: '📖 Гайд',           link: '/rell-seas/guide' },
          { text: '💡 Советы и фишки', link: '/rell-seas/tips'  },
        ],
      },
    ],
    themeConfig: {
      outline:              { level: [2, 3], label: 'На этой странице' },
      returnToTopLabel:     '↑ Наверх',
      sidebarMenuLabel:     'Меню',
      darkModeSwitchLabel:  'Тема',
      lightModeSwitchTitle: 'Светлая тема',
      darkModeSwitchTitle:  'Тёмная тема',
      langMenuLabel:        'Change language',
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
    head: [
      ...SHARED_HEAD,
      ['meta', { property: 'og:locale', content: 'ru_RU' }],
      ['meta', { property: 'og:title', content: 'Rell Games Docs' }],
      ['meta', { property: 'og:description', content: 'Гайды, тир-листы и механики игр Rell Games' }],
      ['meta', { name: 'robots', content: 'noindex' }],
    ],
  },
}

// ---------------------------------------------------------------------------
// Helper — build a locale themeConfig block
// ---------------------------------------------------------------------------

function buildLocaleThemeConfig(
  locale: 'en' | 'ru',
  urlPrefix: string, // '' for primary (root), 'ru/' or 'en/' for secondary
): DefaultTheme.Config {
  const cfg = localeConfig[locale]
  // Prefix all sidebar links and nav links with the URL prefix
  const prefix = urlPrefix ? `/${urlPrefix.replace(/\/$/, '')}` : ''

  function prefixLink(link: string) {
    return link.startsWith('/') ? `${prefix}${link}` : link
  }

  function prefixNav(items: typeof cfg.nav): typeof cfg.nav {
    return items.map(item => ({
      ...item,
      ...(item.link ? { link: prefixLink(item.link) } : {}),
      ...('items' in item && item.items
        ? { items: item.items.map(sub => ({ ...sub, link: prefixLink(sub.link ?? '') })) }
        : {}),
    }))
  }

  function prefixSidebar(sidebar: DefaultTheme.Sidebar): DefaultTheme.Sidebar {
    if (!Array.isArray(sidebar)) return sidebar
    return sidebar.map(group => ({
      ...group,
      items: (group as DefaultTheme.SidebarItem).items?.map(item => ({
        ...item,
        link: item.link ? prefixLink(item.link) : item.link,
      })),
    }))
  }

  return {
    logo:        DEFAULT_LOGO,
    siteTitle:   'Rell Games',
    nav:         prefixNav(cfg.nav) as DefaultTheme.NavItem[],
    sidebar:     prefixSidebar(cfg.sidebar),
    socialLinks: SOCIAL_LINKS,
    ...cfg.themeConfig,
  }
}

// ---------------------------------------------------------------------------
// Build rewrites — maps locale source folders to output paths.
// PRIMARY_LOCALE content is rewritten to root; secondary keeps its prefix.
// ---------------------------------------------------------------------------

const P = PRIMARY_LOCALE   // e.g. 'en'
const S = SECONDARY_LOCALE // e.g. 'ru'

const REWRITES: Record<string, string> = {
  // Primary locale: strip the locale folder → clean root URLs
  [`${P}/:path*`]: ':path*',
  // Section index → first content page (primary)
  'shindo-life/index.md':    'shindo-life/guide.md',
  'rell-seas/index.md':      'rell-seas/guide.md',
  'news/index.md':           'news/shindo-issues.md',
  // Section index → first content page (secondary)
  [`${S}/shindo-life/index.md`]: `${S}/shindo-life/guide.md`,
  [`${S}/rell-seas/index.md`]:   `${S}/rell-seas/guide.md`,
  [`${S}/news/index.md`]:        `${S}/news/shindo-issues.md`,
}

// ---------------------------------------------------------------------------
// Main config export
// ---------------------------------------------------------------------------

export default defineConfig({
  base:        BASE_PATH,
  cleanUrls:   true,
  lastUpdated: true,
  rewrites:    REWRITES,

  // sitemap.hostname must be bare origin — VitePress appends base automatically.
  // Filter out secondary locale pages (they carry noindex).
  sitemap: {
    hostname: SITE_HOSTNAME,
    transformItems: items => items.filter(item => !item.url.startsWith(`${S}/`)),
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
    // Primary locale — served at root URL (no prefix)
    root: {
      label:         localeConfig[P].label,
      lang:          localeConfig[P].lang,
      title:         localeConfig[P].title,
      titleTemplate: localeConfig[P].titleTemplate,
      description:   localeConfig[P].description,
      head: [
        ...localeConfig[P].head,
        ['meta', { property: 'og:url', content: FULL_URL }],
      ],
      themeConfig: buildLocaleThemeConfig(P, ''),
    },

    // Secondary locale — served under its prefix (e.g. /ru/ or /en/)
    [S]: {
      label:         localeConfig[S].label,
      lang:          localeConfig[S].lang,
      link:          `/${S}/`,
      title:         localeConfig[S].title,
      titleTemplate: localeConfig[S].titleTemplate,
      description:   localeConfig[S].description,
      head: [
        ...localeConfig[S].head,
        ['meta', { property: 'og:url', content: `${FULL_URL}${S}/` }],
      ],
      themeConfig: buildLocaleThemeConfig(S, `${S}/`),
    },
  },
})
