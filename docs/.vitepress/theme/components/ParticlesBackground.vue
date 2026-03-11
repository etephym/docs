<script setup lang="ts">
// Starfield particles — only active on homepage (/ and /en/)
// Mounts a canvas directly into body so it sits behind all content
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

const route = useRoute()
let initialized = false

async function start() {
  if (initialized) return
  initialized = true
  await loadSlim(tsParticles)
  await tsParticles.load({
    id: 'tsparticles',
    options: {
      fullScreen:  { enable: true, zIndex: 0 },
      background:  { color: { value: 'transparent' } },
      fpsLimit:    60,
      particles: {
        number:  { value: 130, density: { enable: true, width: 1920 } },
        color:   { value: ['#54a0ff', '#ff6b6b', '#ff9ff3', '#ffffff'] },
        opacity: {
          value: { min: 0.1, max: 0.55 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        size: { value: { min: 0.5, max: 1.8 } },
        move: {
          enable:    true,
          speed:     0.25,
          direction: 'none',
          random:    true,
          outModes:  { default: 'out' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 100, links: { opacity: 0.15 } },
        },
      },
      detectRetina: true,
    },
  })
}

function stop() {
  tsParticles.domItem(0)?.destroy()
  initialized = false
  // Remove canvas left by tsparticles
  document.getElementById('tsparticles')?.remove()
}

function check() {
  const isHome = route.path === '/' || route.path === '/en/'
  if (isHome) start()
  else stop()
}

onMounted(() => check())
watch(() => route.path, () => check())
onUnmounted(() => stop())
</script>

<template><span /></template>
