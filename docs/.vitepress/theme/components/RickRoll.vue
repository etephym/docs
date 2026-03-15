<script setup lang="ts">
// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CLICKS_NEEDED = 7     // number of clicks required to trigger the redirect
const RESET_DELAY   = 10000 // ms — click counter resets after this idle period
const TARGET_URL    = 'https://youtu.be/dQw4w9WgXcQ?si=3-SKpSMGFYWdsQlA'
const MAX_RETRIES   = 20    // retries while waiting for VPHero to render
const RETRY_DELAY   = 50    // ms between retries

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

const route = useRoute()

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let count      = 0
let resetTimer: ReturnType<typeof setTimeout> | null = null
let retryTimer: ReturnType<typeof setTimeout> | null = null
let target:    Element | null = null

// ---------------------------------------------------------------------------
// Click handler
// ---------------------------------------------------------------------------

function onClick(): void {
  count++
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { count = 0 }, RESET_DELAY)

  if (count >= CLICKS_NEEDED) {
    count = 0
    window.open(TARGET_URL, '_blank', 'noopener,noreferrer')
  }
}

// ---------------------------------------------------------------------------
// Attach / detach
// ---------------------------------------------------------------------------

/**
 * Attaches the click listener to .VPHero .image-container — the wrapper div
 * that holds both dark and light <img> variants. Using the container instead
 * of .image-src avoids the case where one of the images is display:none
 * (hidden by the light/dark CSS toggle) and therefore never receives clicks.
 */
function tryAttach(retriesLeft: number): void {
  const el = document.querySelector('.VPHero .image-container')
  if (el) {
    target = el
    target.addEventListener('click', onClick)
    ;(target as HTMLElement).style.cursor = 'pointer'
    return
  }
  if (retriesLeft <= 0) return
  retryTimer = setTimeout(() => tryAttach(retriesLeft - 1), RETRY_DELAY)
}

function attach(): void {
  detach()
  const isHome = route.path === '/' || route.path === '/en/'
  if (!isHome) return
  tryAttach(MAX_RETRIES)
}

function detach(): void {
  if (retryTimer) { clearTimeout(retryTimer); retryTimer = null }
  if (target)     { target.removeEventListener('click', onClick); target = null }
  if (resetTimer) { clearTimeout(resetTimer); resetTimer = null }
  count = 0
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(attach)
watch(() => route.path, attach)
onUnmounted(detach)
</script>

<template><span aria-hidden="true" /></template>
