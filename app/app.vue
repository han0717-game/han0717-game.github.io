<script setup lang="ts">
const { games } = useGames()
const liveCount = games.filter((g) => g.status === 'live').length
</script>

<template>
  <div class="app">
    <AppHeader :live-count="liveCount" :total-count="games.length" />
    <NuxtPage />
    <AppFooter />
    <AdBar />
  </div>
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
