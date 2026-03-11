<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  console.log('[Particles] component mounted, path:', window.location.pathname)

  const { tsParticles } = await import('@tsparticles/engine')
  const { loadSlim }    = await import('@tsparticles/slim')

  console.log('[Particles] libs loaded')

  await loadSlim(tsParticles)

  console.log('[Particles] slim loaded, starting...')

  await tsParticles.load({
    id: 'tsparticles',
    options: {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: 'transparent' } },
      particles: {
        number: { value: 80 },
        color:  { value: '#ffffff' },
        opacity: { value: 0.5 },
        size:    { value: 2 },
        move:    { enable: true, speed: 0.5 },
      },
    },
  })

  console.log('[Particles] done')
})
</script>

<template><span /></template>
