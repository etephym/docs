// ---------------------------------------------------------------------------
// Routing utilities — shared helpers for locale and home detection.
// English is the root locale (no prefix). Russian lives under /ru/.
// ---------------------------------------------------------------------------

/** Ensures base always ends with a trailing slash. */
export function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`
}

/** Returns true when the current path is under the Russian (/ru/) locale. */
export function isRussianPath(path: string, base: string): boolean {
  const nb = normalizeBase(base)
  return path.startsWith(`${nb}ru/`) || path === `${nb}ru`
}

/** Returns true when the current path is a home page (root EN or /ru/). */
export function isHomePath(path: string, base: string): boolean {
  const nb = normalizeBase(base)
  return path === nb || path === `${nb}ru/` || path === `${nb}ru`
}
