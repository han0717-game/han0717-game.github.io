<script setup lang="ts">
/** 內嵌 SVG 圖示（24x24，線條跟著文字顏色） */
const icons = {
  gamepad:
    '<path d="M6 11h4M8 9v4"/><path d="M15 12h.01M18 10h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59L2 15.02A3 3 0 0 0 7.2 17.2L9 15h6l1.8 2.2a3 3 0 0 0 5.2-2.18l-.7-6.43A4 4 0 0 0 17.32 5Z"/>',
  play: '<path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor" stroke="none"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  desktop: '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8 20.5h8M12 16.5v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
} as const

export type IconName = keyof typeof icons

const props = withDefaults(defineProps<{ name: IconName; size?: number | string }>(), { size: 20 })
</script>

<template>
  <svg
    class="app-icon"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="icons[props.name]"
  />
</template>

<style scoped lang="scss">
.app-icon {
  flex-shrink: 0;
}
</style>
