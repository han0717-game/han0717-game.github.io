<script setup lang="ts">
/** 只在 npm run dev 時由 AdBar.vue 載入的預覽框（localhost 不會有真的 Google 廣告）；正式版不會打包這個檔案 */
defineProps<{ width: number; height: number }>()
</script>

<template>
  <div class="preview" :style="{ width: `${width}px`, height: `${height}px` }">
    廣告預覽 {{ width }}×{{ height }}（只在開發模式顯示）
  </div>
</template>

<style scoped lang="scss">
.preview {
  display: grid;
  place-items: center;
  max-width: 100%;
  border: 1px dashed $c-border-strong;
  border-radius: 4px;
  background: repeating-linear-gradient(-45deg, $c-surface-2 0 10px, $c-surface-3 10px 20px);
  font-size: 12px;
  color: $c-text-muted;
  text-align: center;
}
</style>
