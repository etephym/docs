export function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`
}

export function isEnglishPath(path: string, base: string): boolean {
  return path.startsWith(`${normalizeBase(base)}en/`)
}

export function isHomePath(path: string, base: string): boolean {
  const normalizedBase = normalizeBase(base)
  return path === normalizedBase || path === `${normalizedBase}en/`
}
