/** Normalizes the VitePress base once before path checks. */
export function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`
}

/** The current locale split is root EN + /ru/ secondary locale. */
export function isRussianPath(path: string, base: string): boolean {
  const nb = normalizeBase(base)
  return path.startsWith(`${nb}ru/`) || path === `${nb}ru`
}

/** Home exists at the root and under /ru/. */
export function isHomePath(path: string, base: string): boolean {
  const nb = normalizeBase(base)
  return path === nb || path === `${nb}ru/` || path === `${nb}ru`
}
