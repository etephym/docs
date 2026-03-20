---
title: Новости
layout: false
---

<script setup>
import { useRouter, useData } from 'vitepress'
import { onMounted } from 'vue'
const router = useRouter()
const { site } = useData()
onMounted(() => router.go(site.value.base.replace(/\/$/, '') + '/news/shindo-issues'))
</script>
