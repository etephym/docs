// Core site constants. Keep deployment metadata in one place.

/** GitHub username or organisation. */
export const GITHUB_USER = 'etephym'

/** Repository name and GitHub Pages sub-path. */
export const REPO_NAME = 'rell-docs'

/** GitHub Pages origin, without the repository base. */
export const SITE_HOSTNAME = 'https://etephym.github.io'

export const BASE_PATH = `/${REPO_NAME}/`
export const FULL_URL  = `${SITE_HOSTNAME}${BASE_PATH}`
export const SITEMAP_HOSTNAME = FULL_URL

export const GITHUB_REPO_URL = `https://github.com/${GITHUB_USER}/${REPO_NAME}`
export const EDIT_LINK       = `${GITHUB_REPO_URL}/edit/main/docs/:path`

export const DISCORD_URL  = 'https://discord.gg/cmCpgkb5zq'
export const TELEGRAM_URL = 'https://t.me/etephym'
export const LICENSE_ICON_PATH = `${BASE_PATH}license`

/** Public audio asset path. */
export const AUDIO_SRC = `${BASE_PATH}${encodeURIComponent('Zerofuturism - a coldcore ambient playlist.mp3')}`
