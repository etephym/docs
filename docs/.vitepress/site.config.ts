// Core site constants. Keep deployment metadata in one place.

/** GitHub username or organisation. */
export const GITHUB_USER = 'etephym'

/** Repository name and GitHub Pages sub-path. */
export const REPO_NAME = 'rell-docs'

/** Set a host here when switching the site to a custom domain. */
export const CUSTOM_DOMAIN = ''

/** GitHub Pages origin, without the repository base. */
export const SITE_HOSTNAME = CUSTOM_DOMAIN ? `https://${CUSTOM_DOMAIN}` : 'https://etephym.github.io'

export const BASE_PATH = CUSTOM_DOMAIN ? '/' : `/${REPO_NAME}/`
export const FULL_URL  = BASE_PATH === '/' ? `${SITE_HOSTNAME}/` : `${SITE_HOSTNAME}${BASE_PATH}`
export const SITEMAP_HOSTNAME = FULL_URL

export const GITHUB_REPO_URL = `https://github.com/${GITHUB_USER}/${REPO_NAME}`
export const EDIT_LINK       = `${GITHUB_REPO_URL}/edit/main/docs/:path`

export const DISCORD_URL  = 'https://discord.gg/cmCpgkb5zq'
export const TELEGRAM_URL = 'https://t.me/etephym'

/** Public audio asset path. */
export const AUDIO_SRC = `${BASE_PATH}${encodeURIComponent('Zerofuturism - a coldcore ambient playlist.mp3')}`
