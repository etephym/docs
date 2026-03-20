---
title: Rell Seas
layout: false
---

<script setup>
import { useRouter, useData } from 'vitepress'
import { onMounted } from 'vue'
const router = useRouter()
const { site } = useData()
onMounted(() => router.go(site.value.base.replace(/\/$/, '') + '/rell-seas/guide'))
</script>
