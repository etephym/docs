---
title: Markdown Examples
outline: [2, 3]
---

# Markdown Examples

Страница-шаблон с наиболее полезными конструкциями VitePress Markdown.

## Headers

# H1
## H2
### H3

## Emphasis

- **bold**
- *italic*
- ~~strike~~
- `inline code`

## Lists

- Item A
- Item B
  - Nested B.1

1. First
2. Second

## Links

- [Внутренняя ссылка на Guide](/guide)
- [Внешняя ссылка на VitePress](https://vitepress.dev)

## Blockquote

> Хорошая документация — это когда разработчик понимает, что делать дальше, без вопросов.

## Tables

| Feature | Status | Notes |
| --- | --- | --- |
| Custom containers | ✅ | Используются в гайдах |
| Code groups | ✅ | Для сравнения шаблонов |
| Vue in Markdown | ✅ | Через `<script setup>` |

## Code Block

```ts
export function formatBuildName(name: string): string {
  return name.trim().toUpperCase()
}
```

## Code Group

::: code-group

```ts [types.ts]
export type BuildType = 'pvp' | 'farm'
```

```ts [constants.ts]
export const DEFAULT_BUILD: BuildType = 'pvp'
```

:::

## Custom Containers

::: tip Подсказка
Используй этот стиль для “что делать”.
:::

::: warning Важно
Используй для “чего не делать”.
:::

::: danger Ошибка
Используй для критичных багов и потерь прогресса.
:::

::: details Спойлер / подробности
Скрытый дополнительный контент.
:::

## Badge

<Badge type="tip" text="template" />
<Badge type="warning" text="draft" />
<Badge type="danger" text="critical" />

## Перейти дальше

- [VitePress Templates](/vitepress-templates)
- [Runtime API Examples](/api-examples)
