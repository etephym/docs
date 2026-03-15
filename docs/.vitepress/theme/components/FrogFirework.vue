<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const HOLD_DURATION = 2000
const FROG_EMOJI    = '🐸'

const route    = useRoute()
const { site } = useData()

let active     = false
let holdTimer:  ReturnType<typeof setTimeout> | null = null
let retryTimer: ReturnType<typeof setTimeout> | null = null
let target:     HTMLElement | null = null

function checkIsHome(): boolean {
  const base = site.value.base
  return route.path === base || route.path === `${base}en/`
}

// ---------------------------------------------------------------------------
// Get the accurate bounding box of the VISIBLE hero image
// ---------------------------------------------------------------------------

function getImageRect(): DOMRect | null {
  if (!target) return null
  const imgs = target.querySelectorAll<HTMLImageElement>('img.image-src')
  for (const img of imgs) {
    if (window.getComputedStyle(img).display !== 'none') return img.getBoundingClientRect()
  }
  return target.getBoundingClientRect()
}

// ---------------------------------------------------------------------------
// Animate a single frog using rAF for smooth, physics-based motion
// ---------------------------------------------------------------------------

function spawnFrog(
  startX:   number,
  startY:   number,
  velX:     number,
  velY:     number,
  size:     number,
  delay:    number,
): void {
  const frog = document.createElement('span')
  frog.textContent = FROG_EMOJI
  frog.setAttribute('aria-hidden', 'true')

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
    willChange:    'transform, opacity',
  })

  document.body.appendChild(frog)

  const gravity   = 0.18 + Math.random() * 0.1
  const spin      = (Math.random() - 0.5) * 10
  const totalTime = 1600 + Math.random() * 400
  let   vx        = velX
  let   vy        = velY
  let   x         = startX
  let   y         = startY
  let   rot       = 0
  let   startTime: number | null = null
  let   rafId:     number

  function frame(now: number): void {
    if (startTime === null) startTime = now
    const elapsed = now - startTime

    if (elapsed < delay) {
      rafId = requestAnimationFrame(frame)
      return
    }

    const t = (elapsed - delay) / totalTime
    if (t >= 1) {
      frog.remove()
      return
    }

    vy  += gravity
    vx  *= 0.992
    x   += vx
    y   += vy
    rot += spin * (1 - t * 0.5)  // spin slows down over time

    // Smooth cubic fade — starts fading at 50%
    const opacity = t < 0.5 ? 1 : 1 - Math.pow((t - 0.5) / 0.5, 1.5)
    const scale   = t < 0.1 ? t * 10 : 1 - t * 0.3  // pop in, slowly shrink

    frog.style.left      = `${x}px`
    frog.style.top       = `${y}px`
    frog.style.opacity   = `${Math.max(0, opacity)}`
    frog.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${Math.max(0.1, scale)})`

    rafId = requestAnimationFrame(frame)
  }

  rafId = requestAnimationFrame(frame)

  // Safety cleanup
  setTimeout(() => {
    cancelAnimationFrame(rafId)
    frog.remove()
  }, totalTime + delay + 200)
}

// ---------------------------------------------------------------------------
// Launch — single smooth burst, all frogs at once
// ---------------------------------------------------------------------------

function launchFirework(): void {
  const rect = getImageRect()
  if (!rect) return

  const cx = rect.left + rect.width  / 2
  const cy = rect.top  + rect.height / 2
  const rx = rect.width  / 2
  const ry = rect.height / 2

  const TOTAL_FROGS = 20

  for (let i = 0; i < TOTAL_FROGS; i++) {
    const angle  = (i / TOTAL_FROGS) * Math.PI * 2 + (Math.random() - 0.5) * 0.2

    const startX = cx + Math.cos(angle) * rx
    const startY = cy + Math.sin(angle) * ry

    const speed  = 8 + Math.random() * 6
    const velX   = Math.cos(angle) * speed
    const velY   = Math.sin(angle) * speed - (0.5 + Math.random() * 1.5)

    const size   = 20 + Math.random() * 16
    const delay  = Math.random() * 40  // tiny jitter, barely noticeable

    spawnFrog(startX, startY, velX, velY, size, delay)
  }
}

// ---------------------------------------------------------------------------
// Context menu prevention (hero only)
// ---------------------------------------------------------------------------

const onContextMenu = (e: Event) => e.preventDefault()

// ---------------------------------------------------------------------------
// Hold detection
// ---------------------------------------------------------------------------

function startHold(): void {
  if (!active) return
  if (holdTimer) clearTimeout(holdTimer)
  holdTimer = setTimeout(() => { holdTimer = null; launchFirework() }, HOLD_DURATION)
}

function cancelHold(): void {
  if (holdTimer) { clearTimeout(holdTimer); holdTimer = null }
}

const onMouseDown  = (e: MouseEvent) => { if (e.button === 0) startHold() }
const onMouseUp    = () => cancelHold()
const onMouseLeave = () => cancelHold()
const onTouchStart = (e: TouchEvent) => { e.preventDefault(); startHold() }
const onTouchEnd   = () => cancelHold()

// ---------------------------------------------------------------------------
// Attach / detach
// ---------------------------------------------------------------------------

function attach(): void {
  detach()
  if (!active) return

  function tryAttach(n: number): void {
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
    if (n > 0) retryTimer = setTimeout(() => tryAttach(n - 1), 50)
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

function activate(): void {
  active = checkIsHome()
  attach()
}

onMounted(activate)
watch(() => route.path, activate)
onUnmounted(detach)
</script>

<template><span aria-hidden="true" /></template>
