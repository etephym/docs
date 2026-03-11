---
title: VitePress Templates
outline: deep
aside: true
---

# VitePress Templates (максимальный стартовый набор)

Ниже — практичный шаблонный набор, чтобы ты мог быстро собирать новые разделы сайта и дописывать логику под себя.

<TemplateCallout title="Как использовать" tone="tip">
Копируй готовые блоки, меняй заголовки/ссылки/тексты, и сразу получаешь аккуратную страницу без лишней рутины.
</TemplateCallout>

## 1) Frontmatter-шаблоны

```md
---
title: Название страницы
description: Короткое описание для SEO
layout: doc
outline: [2, 3]
lastUpdated: true
---
```

```md
---
layout: home
hero:
  name: Brand
  text: Сильный оффер
  tagline: Короткая ценность
  actions:
    - theme: brand
      text: Начать
      link: /guide
features:
  - icon: 🚀
    title: Быстрый старт
    details: Пояснение
---
```

## 2) Markdown-функции VitePress

### Badges

**Feature Alpha** <Badge type="tip" text="NEW" />
**Deprecated** <Badge type="danger" text="OLD" />

### Custom containers

::: tip Рабочая заметка
Этот блок отлично подходит под важные подсказки в гайдах.
:::

::: warning Внимание
Используй для блоков, где ошибка игрока стоит ресурсов/времени.
:::

::: danger Критично
В этот блок выноси то, что точно ломает билд или сетап.
:::

::: details Нажми, чтобы раскрыть
Скрывай длинные расшифровки, чтобы страница читалась легче.
:::

### Code groups

```ts
// Вариант 1: config
export default {
  lang: 'ru-RU',
  cleanUrls: true,
}
```

```md
# Вариант 2: markdown-шаблон
Контент страницы
```

## 3) Компоненты и Vue внутри Markdown

<script setup lang="ts">
const buildProfiles = [
  { name: 'PvP', mode: 'High tempo', status: 'готово' },
  { name: 'Farm', mode: 'Safe loop', status: 'в процессе' },
]
</script>

<ul>
  <li v-for="profile in buildProfiles" :key="profile.name">
    <strong>{{ profile.name }}</strong> — {{ profile.mode }} ({{ profile.status }})
  </li>
</ul>

<TemplateCallout title="Vue в markdown" tone="info">
Любые простые UI-блоки можно рендерить прямо в `.md` через `&lt;script setup&gt;`.
</TemplateCallout>

## 4) Шаблон структуры раздела

````md
## TL;DR
Коротко о сути.

## Когда использовать
- Сценарий 1
- Сценарий 2

## Плюсы
- ...

## Минусы
- ...

## Готовый шаблон
```ts
// код или структура
```

## Частые ошибки
1. ...
2. ...
````

## 5) Шаблон для SEO и перелинковки

- В каждом разделе делай внутренние ссылки на соседние страницы (`/guide`, `/tips`, `/api-examples`).
- Добавляй короткое описание под H1.
- Делай секцию “Что читать дальше”.

## Что читать дальше

- [Markdown Examples](/markdown-examples)
- [Runtime API Examples](/api-examples)
- [Главный Guide](/guide)
