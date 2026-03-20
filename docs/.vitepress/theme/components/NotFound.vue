<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRouter } from 'vitepress'

// ---------------------------------------------------------------------------
// Locale & navigation
// ---------------------------------------------------------------------------

const { site, lang } = useData()
const router = useRouter()
const isRu   = computed(() => lang.value === 'ru-RU')

function goHome(): void {
  router.go(site.value.base)
}
</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">{{ isRu ? '🐸 Страница не найдена' : '🐸 Page not found' }}</h1>
    <div class="divider" />
    <blockquote class="quote">
      {{
        isRu
          ? 'Похоже, эта страница потерялась в тумане войны. Жаба тоже не знает где она.'
          : "Looks like this page got lost in the fog of war. The frog doesn't know where it is either."
      }}
    </blockquote>
    <div class="action">
      <!-- Use button instead of <a href="#"> for correct accessibility semantics -->
      <button class="link" @click="goHome">
        {{ isRu ? '← Вернуться на главную' : '← Back to home' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.link {
  display:          inline-block;
  border:           1px solid var(--vp-c-brand);
  border-radius:    20px;
  padding:          3px 16px;
  font-size:        14px;
  font-weight:      500;
  color:            var(--vp-c-brand);
  background:       transparent;
  cursor:           pointer;
  text-decoration:  none;
  transition:       border-color 0.25s, color 0.25s, background-color 0.25s;
}
.link:hover {
  background:   var(--vp-c-brand);
  color:        var(--vp-c-white);
}
</style>
