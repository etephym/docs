import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'
import mediumZoom from 'medium-zoom'

import vitepressNprogress           from 'vitepress-plugin-nprogress'
import 'vitepress-plugin-nprogress/lib/css/index.css'

import Breadcrumb      from './components/Breadcrumb.vue'
import ReadingTime     from './components/ReadingTime.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import CopyHeadingLink from './components/CopyHeadingLink.vue'
import RickRoll        from './components/RickRoll.vue'
import Copyright       from './components/Copyright.vue'

import './custom.css'

// =============================================================
// Music Player — HTML5 Audio, draggable, vanilla JS
// Guard at the top prevents duplicate mounts on re-entry
// =============================================================
function setupMusicPlayer(): void {
  if (document.getElementById('mp-root')) return

  const audio = new Audio(withBase('/Zerofuturism - a coldcore ambient playlist.mp3'))
  audio.loop   = true
  audio.volume = 0.5
  let playing  = false

  const wrap = document.createElement('div')
  wrap.id    = 'mp-root'
  wrap.innerHTML = [
    '<div id="mp-widget">',
    '  <button id="mp-btn" title="Play">',
    '    <svg id="mp-icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>',
    '    <span id="mp-icon-bars" style="display:none" class="mp-bars"><span></span><span></span><span></span><span></span></span>',
    '  </button>',
    '  <div class="mp-info">',
    '    <span class="mp-title">Zerofuturism</span>',
    '    <span id="mp-sub" class="mp-sub">Background music</span>',
    '  </div>',
    '</div>',
  ].join('')
  document.body.appendChild(wrap)

  const btn      = document.getElementById('mp-btn')       as HTMLButtonElement
  const sub      = document.getElementById('mp-sub')       as HTMLSpanElement
  const iconPlay = document.getElementById('mp-icon-play') as HTMLElement
  const iconBars = document.getElementById('mp-icon-bars') as HTMLElement
  const widget   = document.getElementById('mp-widget')    as HTMLElement
  const root     = document.getElementById('mp-root')      as HTMLElement
  const viewport = window.visualViewport

  const getViewportRect = () => {
    if (!viewport) {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    return {
      left: viewport.offsetLeft,
      top: viewport.offsetTop,
      width: viewport.width,
      height: viewport.height,
    }
  }

  const clampToViewport = (left: number, top: number) => {
    const rect = getViewportRect()
    const maxLeft = rect.left + rect.width - root.offsetWidth
    const maxTop = rect.top + rect.height - root.offsetHeight

    return {
      left: Math.min(Math.max(rect.left, left), Math.max(rect.left, maxLeft)),
      top: Math.min(Math.max(rect.top, top), Math.max(rect.top, maxTop)),
    }
  }

  const syncSafeOffset = (): void => {
    const rect = getViewportRect()
    const visualBottomGap = Math.max(window.innerHeight - rect.height - rect.top, 0)
    root.style.setProperty('--mp-visual-bottom-gap', `${Math.round(visualBottomGap)}px`)

    if (root.dataset.dragged === 'true') {
      const styleLeft = parseFloat(root.style.left || '0')
      const styleTop = parseFloat(root.style.top || '0')
      const clamped = clampToViewport(styleLeft, styleTop)
      root.style.left = `${clamped.left}px`
      root.style.top = `${clamped.top}px`
    }
  }

  function setPlaying(val: boolean): void {
    playing                = val
    iconPlay.style.display = val ? 'none'             : 'block'
    iconBars.style.display = val ? 'inline-flex'      : 'none'
    sub.textContent        = val ? 'Playing...'       : 'Background music'
    widget.classList.toggle('playing', val)
  }

  // --- Drag ---
  let dragging = false
  let didDrag  = false
  let startX   = 0
  let startY   = 0
  let origLeft = 0
  let origTop  = 0

  function dragStart(clientX: number, clientY: number): void {
    const rect   = root.getBoundingClientRect()
    dragging     = true
    didDrag      = false
    startX       = clientX
    startY       = clientY
    origLeft     = rect.left
    origTop      = rect.top
    root.style.transition = 'none'
    root.style.bottom     = 'auto'
    root.style.right      = 'auto'
    root.style.left       = origLeft + 'px'
    root.style.top        = origTop  + 'px'
    root.dataset.dragged  = 'true'
    root.classList.add('dragging')
  }

  function dragMove(clientX: number, clientY: number): void {
    if (!dragging) return
    const dx = clientX - startX
    const dy = clientY - startY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag = true
    const nextPos = clampToViewport(origLeft + dx, origTop + dy)
    root.style.left = `${nextPos.left}px`
    root.style.top = `${nextPos.top}px`
  }

  function dragEnd(): void {
    dragging = false
    root.style.transition = ''
    root.classList.remove('dragging')
  }

  widget.addEventListener('mousedown', (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('#mp-btn')) return
    dragStart(e.clientX, e.clientY)
  })
  document.addEventListener('mousemove', (e: MouseEvent) => dragMove(e.clientX, e.clientY))
  document.addEventListener('mouseup',   () => dragEnd())

  widget.addEventListener('touchstart', (e: TouchEvent) => {
    if ((e.target as HTMLElement).closest('#mp-btn')) return
    dragStart(e.touches[0].clientX, e.touches[0].clientY)
  }, { passive: true })
  document.addEventListener('touchmove', (e: TouchEvent) => {
    if (dragging) { e.preventDefault(); dragMove(e.touches[0].clientX, e.touches[0].clientY) }
  }, { passive: false })
  document.addEventListener('touchend', () => dragEnd())

  window.addEventListener('resize', syncSafeOffset, { passive: true })
  window.addEventListener('orientationchange', syncSafeOffset, { passive: true })
  viewport?.addEventListener('resize', syncSafeOffset)
  viewport?.addEventListener('scroll', syncSafeOffset)

  btn.addEventListener('click', () => {
    if (didDrag) return
    if (playing) { audio.pause(); setPlaying(false) }
    else         { audio.play().catch(() => {}); setPlaying(true) }
  })

  syncSafeOffset()
}

// =============================================================
// Medium Zoom — re-initializes on every route change
// =============================================================
const ZoomSetup = {
  setup() {
    const route = useRoute()
    const init  = () => mediumZoom('.vp-doc img', { background: 'rgba(0,0,0,0.85)' })
    onMounted(() => nextTick(init))
    watch(() => route.path, () => nextTick(init))
  },
  render: () => null,
}

// =============================================================
// Heading Highlight — flashes underline on anchor target
// =============================================================
const HeadingHighlight = {
  setup() {
    const route = useRoute()
    const highlight = () => {
      document.querySelectorAll('.heading-highlighted').forEach(el =>
        el.classList.remove('heading-highlighted')
      )
      const hash   = decodeURIComponent(window.location.hash.slice(1))
      if (!hash) return
      const target = document.getElementById(hash)
      if (!target) return
      target.classList.add('heading-highlighted')
      setTimeout(() => target.classList.remove('heading-highlighted'), 2500)
    }
    onMounted(() => nextTick(highlight))
    watch(() => route.hash, () => nextTick(highlight))
  },
  render: () => null,
}

// =============================================================
// Reading Progress — hidden on homepage via CSS
// =============================================================
const ProgressWrapper = {
  setup() {
    const route = useRoute()
    return () => {
      const isHome = route.path === '/' || route.path === '/en/'
      return isHome ? null : h(ReadingProgress)
    }
  },
}

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h('div', { class: 'doc-tools' }, [
        h(Breadcrumb),
        h(ReadingTime),
        h(ZoomSetup),
        h(HeadingHighlight),
        h(CopyHeadingLink),
      ]),
      'doc-after':     () => h(Copyright),
      'layout-bottom': () => h('div', null, [h(ProgressWrapper), h(RickRoll)]),
    })
  },

  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    vitepressNprogress(ctx)
    if (typeof window !== 'undefined') setupMusicPlayer()
  },
}
