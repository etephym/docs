<script setup lang="ts">
import { ref, onMounted } from 'vue'

const VIDEO_ID = 'Rv0QsmjIQ_U'

// Module-level state — survives navigation between pages
const playing = ref(false)
const ready   = ref(false)
let   player: any  = null
let   apiLoaded    = false

function initPlayer() {
  if (player) return
  const div    = document.createElement('div')
  div.id       = 'yt-player-el'
  div.style.cssText = 'display:none;position:absolute'
  document.body.appendChild(div)

  player = new (window as any).YT.Player('yt-player-el', {
    videoId:    VIDEO_ID,
    playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: VIDEO_ID, rel: 0 },
    events: {
      onReady: () => { ready.value = true },
    },
  })
}

function loadAPI() {
  if (apiLoaded) return
  apiLoaded = true
  if ((window as any).YT?.Player) { initPlayer(); return }
  ;(window as any).onYouTubeIframeAPIReady = initPlayer
  const s = document.createElement('script')
  s.src   = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(s)
}

function toggle() {
  if (!player || !ready.value) return
  if (playing.value) { player.pauseVideo(); playing.value = false }
  else               { player.playVideo();  playing.value = true  }
}

// mounted guard — prevents SSR Teleport error
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
  loadAPI()
})
</script>

<template>
  <Teleport to="body" v-if="mounted">
    <div class="mp-wrap">
      <div class="mp-widget" :class="{ playing }">
        <button class="mp-btn" @click="toggle" :title="playing ? 'Пауза' : 'Играть'">
          <span v-if="playing" class="mp-bars">
            <span /><span /><span /><span />
          </span>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
        <div class="mp-info">
          <span class="mp-title">Synthwave Mix</span>
          <span class="mp-sub">{{ playing ? 'Играет...' : 'Фоновая музыка' }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.mp-wrap {
  position: fixed;
  bottom:   80px;
  left:     24px;
  z-index:  999;
  pointer-events: none;
}
.mp-widget {
  display:                 flex;
  align-items:             center;
  gap:                     10px;
  padding:                 10px 16px 10px 10px;
  border-radius:           16px;
  border:                  1px solid rgba(255,255,255,0.08);
  backdrop-filter:         blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background:              rgba(13,13,13,0.75);
  box-shadow:              0 4px 24px rgba(0,0,0,0.35);
  transition:              box-shadow 0.3s ease, border-color 0.3s ease;
  user-select:             none;
  pointer-events:          all;
}
.mp-widget.playing {
  border-color: rgba(84,160,255,0.3);
  box-shadow:   0 4px 24px rgba(84,160,255,0.15);
}
:root:not(.dark) .mp-widget {
  background:   rgba(255,255,255,0.75);
  border-color: rgba(0,0,0,0.08);
  box-shadow:   0 4px 24px rgba(0,0,0,0.08);
}
:root:not(.dark) .mp-widget.playing {
  border-color: rgba(37,99,235,0.25);
  box-shadow:   0 4px 24px rgba(37,99,235,0.12);
}
.mp-btn {
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           36px;
  height:          36px;
  border-radius:   50%;
  border:          none;
  background:      rgba(84,160,255,0.15);
  color:           #54a0ff;
  cursor:          pointer;
  flex-shrink:     0;
  transition:      background 0.2s ease, transform 0.15s ease;
  touch-action:    manipulation;
  -webkit-tap-highlight-color: transparent;
}
.mp-btn:hover  { background: rgba(84,160,255,0.28); transform: scale(1.08); }
.mp-btn:active { transform: scale(0.95); }
:root:not(.dark) .mp-btn       { background: rgba(37,99,235,0.1);  color: #2563eb; }
:root:not(.dark) .mp-btn:hover { background: rgba(37,99,235,0.2); }
.mp-bars { display: flex; align-items: flex-end; gap: 2px; height: 14px; }
.mp-bars span {
  display: block; width: 3px; border-radius: 2px;
  background: #54a0ff;
  animation:  bar-bounce 0.9s ease-in-out infinite;
}
:root:not(.dark) .mp-bars span { background: #2563eb; }
.mp-bars span:nth-child(1) { height: 6px;  animation-delay: 0s;    }
.mp-bars span:nth-child(2) { height: 12px; animation-delay: 0.15s; }
.mp-bars span:nth-child(3) { height: 8px;  animation-delay: 0.3s;  }
.mp-bars span:nth-child(4) { height: 10px; animation-delay: 0.1s;  }
@keyframes bar-bounce {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1);   }
}
.mp-info  { display: flex; flex-direction: column; gap: 1px; }
.mp-title { font-size: 13px; font-weight: 600; color: var(--vp-c-text-1); line-height: 1.3; }
.mp-sub   { font-size: 11px; color: var(--vp-c-text-3); }
</style>
