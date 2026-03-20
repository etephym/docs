// ---------------------------------------------------------------------------
// Routing utilities — shared helpers for locale and home detection
// ---------------------------------------------------------------------------

/** Ensures base always ends with a trailing slash. */
export function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`
}

/** Returns true when the current path is under the English (/en/) locale. */
export function isEnglishPath(path: string, base: string): boolean {
  return path.startsWith(`${normalizeBase(base)}en/`)
}

/** Returns true when the current path is a home page (root or /en/). */
export function isHomePath(path: string, base: string): boolean {
  const nb = normalizeBase(base)
  return path === nb || path === `${nb}en/`
}
