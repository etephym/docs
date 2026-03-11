<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    tone?: 'info' | 'tip' | 'warning' | 'danger'
  }>(),
  {
    title: 'Template',
    tone: 'info',
  },
)
</script>

<template>
  <div class="template-callout" :data-tone="tone">
    <p class="template-callout__title">{{ title }}</p>
    <div class="template-callout__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.template-callout {
  border: 1px solid var(--vp-c-divider);
  border-left-width: 4px;
  border-radius: 12px;
  padding: 12px 14px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}

.template-callout__title {
  margin: 0 0 6px;
  font-weight: 600;
}

.template-callout__content :deep(p:last-child) {
  margin-bottom: 0;
}

.template-callout[data-tone='info'] {
  border-left-color: var(--vp-c-brand-1);
}

.template-callout[data-tone='tip'] {
  border-left-color: #10b981;
}

.template-callout[data-tone='warning'] {
  border-left-color: #f59e0b;
}

.template-callout[data-tone='danger'] {
  border-left-color: #ef4444;
}
</style>
