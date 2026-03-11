---
title: Runtime API Examples
outline: [2, 3]
---

# Runtime API Examples

Эта страница показывает шаблонные примеры для runtime API VitePress, которые можно сразу переносить в свои страницы.

## useData()

```vue
<script setup lang="ts">
import { useData } from 'vitepress'

const { site, theme, page, frontmatter, lang, dir } = useData()
</script>

<template>
  <pre>{{ site }}</pre>
  <pre>{{ theme }}</pre>
  <pre>{{ page }}</pre>
  <pre>{{ frontmatter }}</pre>
  <p>Lang: {{ lang }}</p>
  <p>Dir: {{ dir }}</p>
</template>
```

## useRoute() + useRouter()

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()

function goToTips() {
  router.go('/tips')
}
</script>

<template>
  <p>Current path: {{ route.path }}</p>
  <button @click="goToTips">Go to Tips</button>
</template>
```

## withBase()

```ts
import { withBase } from 'vitepress'

const logoUrl = withBase('/logo.jpg')
```

## inBrowser

```ts
import { inBrowser } from 'vitepress'

if (inBrowser) {
  console.log('Код выполняется в браузере')
}
```

## useData() — живой мини-пример

<script setup lang="ts">
import { useData } from 'vitepress'

const { page, frontmatter, lang } = useData()
</script>

- Текущий путь: **{{ page.relativePath }}**
- Язык: **{{ lang }}**
- Заголовок из frontmatter: **{{ frontmatter.title || 'не задан' }}**

## Дополнительно

- [VitePress Templates](/vitepress-templates)
- [Markdown Examples](/markdown-examples)
