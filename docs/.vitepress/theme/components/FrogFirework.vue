<script setup lang="ts">
// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import { onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HOLD_DURATION = 2000  // ms — hold time required to trigger
const FROG_EMOJI    = '🐸'
const FROG_COUNT    = 18    // number of frogs in the firework
const FROG_DURATION = 1200  // ms — animation duration per frog

// ---------------------------------------------------------------------------
// Route & site
// ---------------------------------------------------------------------------

const route    = useRoute()
const { site } = useData()

// ---------------------------------------------------------------------------
// State — plain vars, no reactivity needed
// ---------------------------------------------------------------------------

let active      = false  // true only on home pages
let holdTimer:    ReturnType<typeof setTimeout>  | null = null
let retryTimer:   ReturnType<typeof setTimeout>  | null = null
let target:       HTMLElement | null = null

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function checkIsHome(): boolean {
  const base = site.value.base
  return route.path === base || route.path === `${base}en/`
}

// ---------------------------------------------------------------------------
// Firework — spawns FROG_COUNT emoji bursting outward from the logo center
// ---------------------------------------------------------------------------

function launchFirework(): void {
  if (!target) return

  const rect = target.getBoundingClientRect()
  const cx   = rect.left + rect.width  / 2
  const cy   = rect.top  + rect.height / 2
  const rx   = rect.width  / 2
  const ry   = rect.height / 2

  for (let i = 0; i < FROG_COUNT; i++) {
    const frog = document.createElement('span')
    frog.textContent  = FROG_EMOJI
    frog.setAttribute('aria-hidden', 'true')

    // Evenly distributed angles with slight randomness
    const angle    = (i / FROG_COUNT) * 2 * Math.PI + (Math.random() - 0.5) * 0.3

    // Start position: on the border of the image (ellipse perimeter)
    const startX   = cx + Math.cos(angle) * rx
    const startY   = cy + Math.sin(angle) * ry

    // End position: burst outward from the border
    const distance = 80 + Math.random() * 120
    const dx       = Math.cos(angle) * distance
    const dy       = Math.sin(angle) * distance

    const size  = 20 + Math.random() * 16
    const delay = Math.random() * 100

    Object.assign(frog.style, {
      position:      'fixed',
      left:          `${startX}px`,
      top:           `${startY}px`,
      fontSize:      `${size}px`,
      lineHeight:    '1',
      pointerEvents: 'none',
      userSelect:    'none',
      zIndex:        '99999',
      transform:     'translate(-50%, -50%)',
      '--dx':        `${dx}px`,
      '--dy':        `${dy}px`,
      animation:     `frog-burst ${FROG_DURATION}ms ease-out ${delay}ms forwards`,
    })

    document.body.appendChild(frog)
    setTimeout(() => frog.remove(), FROG_DURATION + delay + 50)
  }
}

// ---------------------------------------------------------------------------
// Context menu prevention — only on the hero image, not navbar logo
// ---------------------------------------------------------------------------

function onContextMenu(e: Event): void {
  e.preventDefault()
}

// ---------------------------------------------------------------------------
// Hold detection — works for both mouse (desktop) and touch (mobile)
// ---------------------------------------------------------------------------

function startHold(): void {
  if (!active) return
  if (holdTimer) clearTimeout(holdTimer)
  holdTimer = setTimeout(() => {
    holdTimer = null
    launchFirework()
  }, HOLD_DURATION)
}

function cancelHold(): void {
  if (holdTimer) { clearTimeout(holdTimer); holdTimer = null }
}

// ---------------------------------------------------------------------------
// Named event handlers — required for correct removeEventListener
// ---------------------------------------------------------------------------

const onMouseDown  = (e: Event) => { if ((e as MouseEvent).button === 0) startHold() }
const onMouseUp    = () => cancelHold()
const onMouseLeave = () => cancelHold()
const onTouchStart = (e: Event) => { e.preventDefault(); startHold() }
const onTouchEnd   = () => cancelHold()

// ---------------------------------------------------------------------------
// Attach / detach listeners to the hero image
// ---------------------------------------------------------------------------

function attach(): void {
  detach()
  if (!active) return

  // Retry loop — .VPHero .image-container may not be rendered yet
  function tryAttach(retriesLeft: number): void {
    const el = document.querySelector<HTMLElement>('.VPHero .image-container')
    if (el) {
      target = el
      target.addEventListener('contextmenu', onContextMenu)
      target.addEventListener('mousedown',   onMouseDown)
      target.addEventListener('mouseup',     onMouseUp)
      target.addEventListener('mouseleave',  onMouseLeave)
      target.addEventListener('touchstart',  onTouchStart, { passive: false })
      target.addEventListener('touchend',    onTouchEnd)
      return
    }
    if (retriesLeft <= 0) return
    retryTimer = setTimeout(() => tryAttach(retriesLeft - 1), 50)
  }

  tryAttach(20)
}

function detach(): void {
  if (retryTimer) { clearTimeout(retryTimer); retryTimer = null }
  cancelHold()
  if (target) {
    target.removeEventListener('contextmenu', onContextMenu)
    target.removeEventListener('mousedown',   onMouseDown)
    target.removeEventListener('mouseup',     onMouseUp)
    target.removeEventListener('mouseleave',  onMouseLeave)
    target.removeEventListener('touchstart',  onTouchStart)
    target.removeEventListener('touchend',    onTouchEnd)
    target = null
  }
}

// ---------------------------------------------------------------------------
// Activate / deactivate based on current route
// ---------------------------------------------------------------------------

function activate(): void {
  active = checkIsHome()
  attach()
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(activate)
watch(() => route.path, activate)
onUnmounted(detach)
</script>

<template><span aria-hidden="true" /></template>

<style>
/* Frog firework keyframe — uses CSS custom properties set per-element */
@keyframes frog-burst {
  0% {
    opacity:   1;
    transform: translate(-50%, -50%) scale(0.4);
  }
  60% {
    opacity:   1;
    transform: translate(calc(-50% + var(--dx) * 0.9), calc(-50% + var(--dy) * 0.9)) scale(1.1);
  }
  100% {
    opacity:   0;
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.7);
  }
}
</style>
