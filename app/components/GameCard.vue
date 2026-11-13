<script setup lang="ts">
import type { Game } from '~/types/game'

const props = defineProps<{ game: Game; categoryName: string }>()

const playable = computed(() => props.game.status === 'live' && !!props.game.url)
</script>

<template>
  <!-- 點卡片 → 網址變成 /?{id} → 首頁打開遊戲介紹視窗（pages/index.vue） -->
  <NuxtLink
    :to="{ query: { [game.id]: null } }"
    class="card"
    :class="{ 'is-soon': !playable }"
    :style="{ '--accent': game.accent }"
  >
    <div class="card__media">
      <GameCover :game="game" class="card__cover" />

      <div class="card__badges">
        <GameBadge v-if="!playable" type="soon" />
        <GameBadge v-else-if="game.badge" :type="game.badge" />
      </div>
    </div>

    <div class="card__body">
      <!-- 用 div 不用 p：p 裡面不能放 ul（PlatformIcons），瀏覽器會把它拆開造成 hydration 錯誤 -->
      <div class="card__meta">
        <span class="card__category">{{ categoryName }}</span>
        <PlatformIcons :platforms="game.platforms" />
      </div>

      <h3 class="card__title">
        {{ game.title }}
        <small v-if="game.subtitle">{{ game.subtitle }}</small>
      </h3>

      <p class="card__desc">{{ game.description }}</p>

      <ul v-if="game.tags.length" class="card__tags">
        <li v-for="tag in game.tags" :key="tag">#{{ tag }}</li>
      </ul>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid $c-border;
  border-radius: $radius-md;
  background: $c-surface-1;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.35s $ease-out,
    border-color 0.35s,
    box-shadow 0.35s;
  @include focus-ring;

  // 卡片外圈的代表色光暈
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: radial-gradient(
      120% 60% at 50% 0%,
      color-mix(in srgb, var(--accent) 22%, transparent),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.35s;
  }

  @include hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow:
      0 18px 40px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent);

    &::after {
      opacity: 1;
    }

    .card__cover {
      transform: scale(1.05);
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.99);
  }

  // 即將推出：封面調暗，但一樣可以點開介紹視窗
  &.is-soon .card__cover {
    filter: grayscale(0.3) brightness(0.85);
  }

  // ---------- 封面 ----------
  &__media {
    position: relative;
    overflow: hidden;

    // 下緣漸層，接到卡片內容
    &::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 40%;
      background: linear-gradient(transparent, $c-surface-1);
      pointer-events: none;
    }
  }

  &__cover {
    transition:
      transform 0.6s $ease-out,
      filter 0.3s;
  }

  &__badges {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    display: flex;
    gap: 6px;
  }

  // ---------- 內容 ----------
  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 14px 16px;

    @include up(md) {
      padding: 4px 18px 18px;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__category {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: color-mix(in srgb, var(--accent) 80%, #fff);
  }

  &__title {
    font-size: 17px;
    font-weight: 700;
    line-height: 1.35;

    small {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: $c-text-muted;
    }

    @include up(md) {
      font-size: 19px;
    }
  }

  &__desc {
    font-size: 13px;
    line-height: 1.65;
    color: $c-text-muted;
    @include line-clamp(2);

    @include down(sm) {
      display: none;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
    padding-top: 4px;

    li {
      font-size: 12px;
      color: $c-text-dim;
    }
  }
}
</style>
