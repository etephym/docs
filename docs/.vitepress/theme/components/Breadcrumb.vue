<script setup lang="ts">
// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import { computed } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import { isEnglishPath, normalizeBase } from '../utils/routing'

// ---------------------------------------------------------------------------
// Route, router & site data
// ---------------------------------------------------------------------------

const route    = useRoute()
const router   = useRouter()
const { site, page } = useData()

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Crumb { text: string; link: string }

// ---------------------------------------------------------------------------
// Locale detection
// ---------------------------------------------------------------------------

const isEn = computed(() => isEnglishPath(route.path, site.value.base))

// ---------------------------------------------------------------------------
// Computed breadcrumb list
//
// The label for the current (last) page is taken from page.title — the same
// value that appears in the <title> tag — so it is always correct regardless
// of the page name, and no manual SEGMENT_MAP is needed.
// ---------------------------------------------------------------------------

const crumbs = computed<Crumb[]>(() => {
  const base = normalizeBase(site.value.base)

  // Strip the base prefix to get the locale-relative path
  const clean = route.path.startsWith(base)
    ? route.path.slice(base.length)
    : route.path.replace(/^\//, '')

  // Filter out the bare 'en' locale segment — it is a routing detail.
  // We restore the locale prefix when building links (see accumulated below)
  // so that EN breadcrumb links point to EN pages, not RU pages.
  const parts = clean.split('/').filter(p => Boolean(p) && p !== 'en')

  const result: Crumb[] = [{ text: isEn.value ? 'Home' : 'Главная', link: base }]

  // Prefix accumulated path with the locale segment when on EN pages
  let accumulated = base + (isEn.value ? 'en/' : '')

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    accumulated += part + '/'

    // For the last segment use the page's own title (from frontmatter) —
    // it is always localised correctly and requires no manual mapping
    const isLast = i === parts.length - 1
    const label  = isLast
      ? (page.value.title || part.charAt(0).toUpperCase() + part.slice(1).replace(/[-_]+/g, ' '))
      : part.charAt(0).toUpperCase() + part.slice(1).replace(/[-_]+/g, ' ')

    result.push({ text: label, link: accumulated })
  }

  return result
})

// ---------------------------------------------------------------------------
// Navigation — use VitePress router to avoid full page reload on SPA
// ---------------------------------------------------------------------------

function navigate(e: MouseEvent, link: string): void {
  e.preventDefault()
  router.go(link)
}
</script>

<template>
  <!-- Render only when there is more than just the home crumb -->
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="Breadcrumb">
    <span v-for="(crumb, i) in crumbs" :key="crumb.link">
      <a
        v-if="i < crumbs.length - 1"
        :href="crumb.link"
        @click="navigate($event, crumb.link)"
      >{{ crumb.text }}</a>
      <span v-else class="current" aria-current="page">{{ crumb.text }}</span>
      <span v-if="i < crumbs.length - 1" class="sep" aria-hidden="true">›</span>
    </span>
  </nav>
</template>

<style scoped>
/* ── Breadcrumb container ────────────────────────────────────────────────── */
.breadcrumb {
  display:       flex;
  align-items:   center;
  flex-wrap:     wrap;
  gap:           2px;
  font-size:     13px;
  color:         var(--vp-c-text-3);
  margin-bottom: 10px;
}

/* ── Links ───────────────────────────────────────────────────────────────── */
.breadcrumb a       { color: var(--vp-c-text-2); text-decoration: none; transition: color 0.2s; }
.breadcrumb a:hover { color: var(--vp-c-brand); }

/* ── Active (last) segment ───────────────────────────────────────────────── */
.current { color: var(--vp-c-text-1); font-weight: 500; }

/* ── Separator ───────────────────────────────────────────────────────────── */
.sep { opacity: 0.4; margin: 0 4px; }
</style>
