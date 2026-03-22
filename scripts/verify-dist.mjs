import { readFileSync } from 'node:fs'

const sitemap = readFileSync('docs/.vitepress/dist/sitemap.xml', 'utf8')
const ruHome = readFileSync('docs/.vitepress/dist/ru/index.html', 'utf8')
const enHome = readFileSync('docs/.vitepress/dist/index.html', 'utf8')

const failures = []

if (sitemap.includes('https://etephym.github.io/about</loc>')) {
  failures.push('sitemap.xml still contains URLs without /rell-docs/ base')
}

if (!sitemap.includes('https://etephym.github.io/rell-docs/about')) {
  failures.push('sitemap.xml is missing the expected base-prefixed URLs')
}

if (ruHome.includes('"title":"VitePress"') || ruHome.includes('"description":"A VitePress site"')) {
  failures.push('ru/index.html still serializes VitePress default title or description')
}

if (enHome.includes('"title":"VitePress"') || enHome.includes('"description":"A VitePress site"')) {
  failures.push('index.html still serializes VitePress default title or description')
}

if (failures.length > 0) {
  console.error('verify-dist failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('verify-dist passed')
