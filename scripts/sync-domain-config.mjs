import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const source = readFileSync('docs/.vitepress/site.config.ts', 'utf8')

const readConst = (name) => {
  const match = source.match(new RegExp(`export const ${name} = '([^']*)'`))
  if (!match) throw new Error(`Could not read ${name} from site.config.ts`)
  return match[1]
}

const githubUser = readConst('GITHUB_USER')
const repoName = readConst('REPO_NAME')
const customDomain = readConst('CUSTOM_DOMAIN')

const siteHostname = customDomain ? `https://${customDomain}` : `https://${githubUser}.github.io`
const basePath = customDomain ? '/' : `/${repoName}/`
const siteRoot = new URL(basePath, `${siteHostname}/`).toString()
const sitemapUrl = new URL('sitemap.xml', siteRoot).toString()
const ruPath = `${basePath}ru/`

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  '# Russian locale is secondary — exclude from indexing',
  `Disallow: ${ruPath}`,
  '',
  `Sitemap: ${sitemapUrl}`,
  '',
].join('\n')

writeFileSync('docs/public/robots.txt', robots)

const cnamePath = 'docs/public/CNAME'
if (customDomain) {
  writeFileSync(cnamePath, `${customDomain}\n`)
} else if (existsSync(cnamePath)) {
  rmSync(cnamePath)
}
