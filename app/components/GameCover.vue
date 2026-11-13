<script setup lang="ts">
import type { Game } from '~/types/game'

/**
 * 遊戲封面（直式 4:5）
 * 有 cover 就顯示圖片；沒有（或圖片載入失敗）就用 accent 色自動畫一張
 */
const props = withDefaults(defineProps<{ game: Game; eager?: boolean }>(), { eager: false })

const failed = ref(false)
const showImage = computed(() => !!props.game.cover && !failed.value)
</script>

<template>
  <div class="cover" :style="{ '--accent': game.accent }">
    <img
      v-if="showImage"
      class="cover__img"
      :src="game.cover"
      :alt="`${game.title} 封面`"
      width="1080"
      height="1350"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @error="failed = true"
    >
    <div v-else class="cover__fallback" aria-hidden="true">
      <span class="cover__grid" />
      <span class="cover__title">{{ game.title }}</span>
      <span v-if="game.titleEn" class="cover__en">{{ game.titleEn }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: $c-surface-2;
  container-type: inline-size;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fallback {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 6px;
    padding: 18px;
    background:
      radial-gradient(120% 80% at 80% 0%, color-mix(in srgb, var(--accent) 70%, transparent), transparent 62%),
      radial-gradient(90% 60% at 0% 100%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%),
      linear-gradient(160deg, $c-surface-3, $c-bg);
  }

  // 細格線，讓空封面不會太單調
  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: linear-gradient(180deg, #000 0%, transparent 85%);
  }

  &__title {
    position: relative;
    font-size: clamp(22px, 5cqi + 12px, 34px);
    font-weight: 900;
    line-height: 1.15;
    color: #fff;
    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
  }

  &__en {
    position: relative;
    font-family: $font-display;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--accent) 70%, #fff);
  }
}
</style>
