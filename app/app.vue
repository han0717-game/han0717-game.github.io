<script setup lang="ts">
const { games } = useGames()
const liveCount = games.filter((g) => g.status === 'live').length

// AdSense 廣告程式：放在 app.vue 而不是 nuxt.config.ts，404 等錯誤頁（不經過 app.vue）就不會載入廣告
const { adsense } = useAppConfig()
useHead({
  script: [
    {
      // 不要加 key：Nuxt 會因此多加 data-hid 屬性，AdSense 會報「head tag doesn't support data-hid attribute」
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`,
      async: true,
      crossorigin: 'anonymous',
    },
  ],
})

/** 廣告被擋時，整個網站內容鎖起來（點不到、Tab 不到、螢幕閱讀器也讀不到），只剩 AdBlockWall */
const siteLocked = useSiteLocked()
</script>

<template>
  <div class="app" :inert="siteLocked" :aria-hidden="siteLocked || undefined">
    <AppHeader :live-count="liveCount" :total-count="games.length" />
    <NuxtPage />
    <AppFooter />
    <AdBar />
  </div>
  <AdBlockWall />
</template>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;

  > main {
    flex: 1;
  }
}
</style>
