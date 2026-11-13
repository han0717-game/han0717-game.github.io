<script setup lang="ts">
import type { GamePlatform } from '~/types/game'

defineProps<{ platforms: GamePlatform[] }>()

const labels: Record<GamePlatform, string> = { mobile: '手機', desktop: '電腦' }
</script>

<template>
  <ul class="platforms" aria-label="支援裝置">
    <li v-for="p in platforms" :key="p" :title="labels[p]">
      <AppIcon :name="p" :size="16" />
      <span class="visually-hidden">{{ labels[p] }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.platforms {
  display: flex;
  gap: 6px;
  color: $c-text-dim;
}
</style>
