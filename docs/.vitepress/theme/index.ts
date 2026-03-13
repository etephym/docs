import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
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
// Music Player — HTML5 Audio, vanilla JS, outside Vue tree
// =============================================================
function setupMusicPlayer() {
  if (document.getElementById('mp-root')) return

  const audio = new Audio('/shindo/Zerofuturism - a coldcore ambient playlist.mp3')
  audio.loop   = true
  audio.volume = 0.5
  let playing  = false

  const wrap = document.createElement('div')
  wrap.id    = 'mp-root'
  wrap.innerHTML = [
    '<div id="mp-widget">',
    '  <button id="mp-btn" title="Играть">',
    '    <svg id="mp-icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>',
    '    <span id="mp-icon-bars" style="display:none" class="mp-bars"><span></span><span></span><span></span><span></span></span>',
    '  </button>',
    '  <div class="mp-info">',
    '    <span class="mp-title">Synthwave Mix</span>',
    '    <span id="mp-sub" class="mp-sub">Фоновая музыка</span>',
    '  </div>',
    '</div>',
  ].join('')
  document.body.appendChild(wrap)

  const btn      = document.getElementById('mp-btn')
  const sub      = document.getElementById('mp-sub')
  const iconPlay = document.getElementById('mp-icon-play')
  const iconBars = document.getElementById('mp-icon-bars')
  const widget   = document.getElementById('mp-widget')

  function setPlaying(val) {
    playing                = val
    iconPlay.style.display = val ? 'none'        : 'block'
    iconBars.style.display = val ? 'inline-flex' : 'none'
    sub.textContent        = val ? 'Играет...'   : 'Фоновая музыка'
    widget.classList.toggle('playing', val)
  }

  btn.addEventListener('click', () => {
    if (playing) { audio.pause(); setPlaying(false) }
    else         { audio.play().catch(() => {}); setPlaying(true) }
  })
}

const ZoomSetup = {
  setup() {
    const route = useRoute()
    const init  = () => mediumZoom('.vp-doc img', { background: 'rgba(0,0,0,0.85)' })
    onMounted(() => nextTick(init))
    watch(() => route.path, () => nextTick(init))
  },
  render: () => null,
}

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
