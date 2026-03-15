<script setup lang="ts">
// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import { onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CLICKS_NEEDED = 7     // clicks on the hero image required to trigger
const RESET_DELAY   = 10000 // ms — counter resets after this idle period
const TARGET_URL    = 'https://youtu.be/dQw4w9WgXcQ?si=3-SKpSMGFYWdsQlA'

// ---------------------------------------------------------------------------
// Route & site
// ---------------------------------------------------------------------------

const route    = useRoute()
const { site } = useData()

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let count      = 0
let resetTimer: ReturnType<typeof setTimeout> | null = null
let active     = false

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function checkIsHome(): boolean {
  const base = site.value.base
  return route.path === base || route.path === `${base}en/`
}

/**
 * Opens the URL in a new tab using a temporary <a> element.
 * More reliable than window.open on mobile browsers (Firefox Android),
 * which may try to navigate the current tab instead of opening a new one.
 */
function openInNewTab(url: string): void {
  const a = document.createElement('a')
  a.href        = url
  a.target      = '_blank'
  a.rel         = 'noopener noreferrer'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// ---------------------------------------------------------------------------
// Document-level click handler (event delegation)
// ---------------------------------------------------------------------------

function onDocumentClick(e: MouseEvent): void {
  if (!active) return
  if (!(e.target as Element).closest('.VPHero')) return

  count++
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { count = 0 }, RESET_DELAY)

  if (count >= CLICKS_NEEDED) {
    count = 0
    openInNewTab(TARGET_URL)
  }
}

// ---------------------------------------------------------------------------
// Activate / deactivate based on current route
// ---------------------------------------------------------------------------

function activate(): void {
  active = checkIsHome()
  if (!active) {
    count = 0
    if (resetTimer) { clearTimeout(resetTimer); resetTimer = null }
  }
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(() => {
  activate()
  document.addEventListener('click', onDocumentClick)
})

watch(() => route.path, activate)

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template><span aria-hidden="true" /></template>
