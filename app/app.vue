<script setup lang="ts">
const { games } = useGames()
const liveCount = games.filter((g) => g.status === 'live').length

/** 廣告被擋時，整個網站內容鎖起來（點不到、Tab 不到、螢幕閱讀器也讀不到），只剩 AdBlockWall */
const adBlocked = useAdBlocked()
</script>

<template>
  <div class="app" :inert="adBlocked" :aria-hidden="adBlocked || undefined">
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
