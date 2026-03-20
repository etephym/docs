---
title: Shindo Life 2
layout: false
---

<script setup>
import { useRouter, useData } from 'vitepress'
import { onMounted } from 'vue'
const router = useRouter()
const { site } = useData()
onMounted(() => router.go(site.value.base.replace(/\/$/, '') + '/shindo-life/guide'))
</script>
