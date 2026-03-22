<script setup lang="ts">
import { useData } from 'vitepress'
import { LICENSE_ICON_PATH } from '../../site.config'

const { page, lang } = useData()
</script>

<template>
  <!-- Only rendered on actual doc pages that have a source file path -->
  <div v-if="page.filePath" class="copyright-block">
    <div class="copyright-inner">
      <!-- Russian -->
      <span v-if="lang === 'ru-RU'">
        <a href="https://github.com/etephym/rell-docs" target="_blank" rel="noopener noreferrer">RELL Games Docs</a>
        © 2024–2026,
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        — лицензия
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img :src="`${LICENSE_ICON_PATH}/cc.svg`" alt="CC" />
        <img :src="`${LICENSE_ICON_PATH}/by.svg`" alt="BY" />
        <img :src="`${LICENSE_ICON_PATH}/nc.svg`" alt="NC" />
        <img :src="`${LICENSE_ICON_PATH}/sa.svg`" alt="SA" />
      </span>
      <span v-else>
        <a href="https://github.com/etephym/rell-docs" target="_blank" rel="noopener noreferrer">RELL Games Docs</a>
        © 2024–2026 by
        <a href="https://github.com/ezrqq" target="_blank" rel="noopener noreferrer">ezrqq / lewisky</a>
        is licensed under
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
        <img :src="`${LICENSE_ICON_PATH}/cc.svg`" alt="CC" />
        <img :src="`${LICENSE_ICON_PATH}/by.svg`" alt="BY" />
        <img :src="`${LICENSE_ICON_PATH}/nc.svg`" alt="NC" />
        <img :src="`${LICENSE_ICON_PATH}/sa.svg`" alt="SA" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.copyright-block {
  margin-top:  48px;
  padding-top: 20px;
  border-top:  1px solid var(--vp-c-divider);
}

.copyright-inner {
  font-size:   13px;
  color:       var(--vp-c-text-2);
  line-height: 1.6;
}

.copyright-inner a {
  color:                 var(--vp-c-text-2);
  text-decoration:       underline;
  text-underline-offset: 2px;
}
.copyright-inner a:hover { color: var(--vp-c-brand); }

.copyright-inner img {
  display:        inline-block;
  max-width:      1em;
  max-height:     1em;
  margin-left:    0.2em;
  vertical-align: middle;
  opacity:        0.7;
}
</style>
