// =============================================================================
// Site Configuration — edit this file to customise your fork
// =============================================================================
// All deployment-specific values live here. Nothing else needs to change when
// you rename the repo, move to a different host, or fork the project.

// ---------------------------------------------------------------------------
// Deployment
// ---------------------------------------------------------------------------

/** GitHub username or organisation that owns the repository */
export const GITHUB_USER = 'etephym'

/** Repository name — also used as the URL base path */
export const REPO_NAME = 'docs'

/** GitHub Pages hostname — bare origin, no trailing slash */
export const SITE_HOSTNAME = 'https://etephym.github.io'

// ---------------------------------------------------------------------------
// Locale priority
// ---------------------------------------------------------------------------

/**
 * The primary locale is served at the root URL (no prefix in the address bar).
 * The secondary locale gets its own prefix (e.g. /ru/ or /en/).
 *
 * To swap priorities (e.g. make Russian the main language):
 *   Change 'en' → 'ru'
 *   That's it — no files need to be moved.
 */
export const PRIMARY_LOCALE: 'en' | 'ru' = 'en'

// ---------------------------------------------------------------------------
// Derived constants — no need to touch these
// ---------------------------------------------------------------------------

export const SECONDARY_LOCALE = PRIMARY_LOCALE === 'en' ? 'ru' : 'en'

export const BASE_PATH = `/${REPO_NAME}/`
export const FULL_URL  = `${SITE_HOSTNAME}${BASE_PATH}`

export const GITHUB_REPO_URL = `https://github.com/${GITHUB_USER}/${REPO_NAME}`
export const EDIT_LINK       = `${GITHUB_REPO_URL}/edit/main/docs/:path`

// ---------------------------------------------------------------------------
// Social links shown in the navbar
// ---------------------------------------------------------------------------

export const DISCORD_URL  = 'https://discord.gg/cmCpgkb5zq'
export const TELEGRAM_URL = 'https://t.me/etephym'

// ---------------------------------------------------------------------------
// Music player
// ---------------------------------------------------------------------------

/** Path to the background audio file inside /public — spaces are URL-encoded */
export const AUDIO_SRC = `${BASE_PATH}${encodeURIComponent('Zerofuturism - a coldcore ambient playlist.mp3')}`
