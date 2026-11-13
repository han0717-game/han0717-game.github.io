<script setup lang="ts">
import type { Game } from '~/types/game'

defineProps<{ game: Game; categoryName: string }>()

const platformLabel = { mobile: '手機', desktop: '電腦' } as const
</script>

<template>
  <section class="hero" :style="{ '--accent': game.accent }" aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true">
      <img v-if="game.cover" :src="game.cover" alt="" class="hero__bg-img">
    </div>

    <div class="hero__inner">
      <a
        :href="game.url"
        target="_blank"
        rel="noopener"
        class="hero__visual"
        :aria-label="`開始玩 ${game.title}（另開新分頁）`"
      >
        <GameCover :game="game" eager />
        <span class="hero__visual-shine" aria-hidden="true" />
      </a>

      <div class="hero__content">
        <p class="hero__eyebrow">
          <span class="hero__pill">主打遊戲</span>
          <span>{{ categoryName }}</span>
          <GameBadge v-if="game.badge" :type="game.badge" />
        </p>

        <h2 id="hero-title" class="hero__title">
          {{ game.title }}
          <span v-if="game.subtitle" class="hero__subtitle">{{ game.subtitle }}</span>
        </h2>
        <p v-if="game.titleEn" class="hero__en">{{ game.titleEn }}</p>

        <p class="hero__desc">{{ game.description }}</p>

        <ul v-if="game.tags.length" class="hero__tags">
          <li v-for="tag in game.tags" :key="tag">{{ tag }}</li>
        </ul>

        <div class="hero__actions">
          <a :href="game.url" target="_blank" rel="noopener" class="btn btn--primary">
            <AppIcon name="play" :size="18" />
            立即遊玩
          </a>
          <a href="#games" class="btn btn--ghost">瀏覽全部遊戲</a>
        </div>

        <p class="hero__platforms">
          <span v-for="p in game.platforms" :key="p">
            <AppIcon :name="p" :size="16" />
            {{ platformLabel[p] }}
          </span>
          <span>免下載，瀏覽器直接玩</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  isolation: isolate;
  margin-top: -$header-h; // 背景延伸到透明頂欄底下
  padding: calc(#{$header-h} + 24px) 0 48px;
  overflow: hidden;

  @include up(lg) {
    padding: calc(#{$header-h} + 56px) 0 88px;
  }

  // ---------- 背景：封面放大模糊 + 代表色光暈 ----------
  &__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(60% 50% at 75% 30%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%),
      $c-bg;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba($c-bg, 0.55) 0%, rgba($c-bg, 0.75) 60%, $c-bg 100%),
        linear-gradient(90deg, rgba($c-bg, 0.9) 0%, transparent 70%);
    }
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(48px) saturate(130%);
    transform: scale(1.2);
    opacity: 0.45;
  }

  // ---------- 版面 ----------
  &__inner {
    @include container;
    display: grid;
    gap: 28px;
    align-items: center;

    @include up(md) {
      grid-template-columns: minmax(0, 1fr) minmax(240px, 340px);
      gap: 40px;
    }

    @include up(lg) {
      grid-template-columns: minmax(0, 1fr) 400px;
      gap: 72px;
    }
  }

  &__visual {
    position: relative;
    justify-self: center;
    width: min(68vw, 300px);
    border-radius: $radius-lg;
    overflow: hidden;
    box-shadow:
      0 30px 80px -20px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(255, 255, 255, 0.08),
      0 0 60px -10px color-mix(in srgb, var(--accent) 40%, transparent);
    transition: transform 0.5s $ease-out;
    @include focus-ring;

    @include up(md) {
      order: 2;
      width: 100%;
    }

    @include hover {
      transform: translateY(-6px) rotate(-0.6deg);

      .hero__visual-shine {
        transform: translateX(120%) skewX(-18deg);
      }
    }
  }

  // 滑過封面時掃過一道光
  &__visual-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
    transform: translateX(-120%) skewX(-18deg);
    transition: transform 0.9s $ease-out;
    pointer-events: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;

    @include down(md) {
      text-align: center;
      align-items: center;
    }
  }

  &__eyebrow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 500;
    color: $c-text-muted;
  }

  &__pill {
    padding: 4px 12px;
    border: 1px solid rgba($c-primary, 0.45);
    border-radius: 999px;
    background: rgba($c-primary, 0.1);
    color: $c-primary;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  &__title {
    font-size: clamp(36px, 7vw, 72px);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: 0.01em;
  }

  &__subtitle {
    display: block;
    margin-top: 6px;
    font-size: 0.5em;
    font-weight: 700;
    color: color-mix(in srgb, var(--accent) 85%, #fff);
  }

  &__en {
    margin-top: -6px;
    font-family: $font-display;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $c-text-dim;
  }

  &__desc {
    max-width: 34em;
    font-size: 16px;
    line-height: 1.8;
    color: $c-text-muted;

    @include up(lg) {
      font-size: 17px;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    @include down(md) {
      justify-content: center;
    }

    li {
      padding: 4px 12px;
      border: 1px solid $c-border;
      border-radius: 999px;
      background: rgba($c-surface-2, 0.7);
      font-size: 13px;
      color: $c-text;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;

    @include down(md) {
      justify-content: center;
    }
  }

  &__platforms {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 16px;
    font-size: 13px;
    color: $c-text-dim;

    @include down(md) {
      justify-content: center;
    }

    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }
}

// ---------- 按鈕 ----------
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition:
    transform 0.25s $ease-out,
    background-color 0.2s,
    box-shadow 0.25s,
    border-color 0.2s;
  @include focus-ring;

  &:active {
    transform: scale(0.97);
  }

  &--primary {
    background: $c-primary;
    color: $c-primary-ink;
    box-shadow: 0 10px 30px -8px rgba($c-primary, 0.6);

    @include hover {
      background: $c-primary-hover;
      box-shadow: 0 14px 36px -8px rgba($c-primary, 0.75);
      transform: translateY(-2px);
    }
  }

  &--ghost {
    border: 1px solid $c-border-strong;
    background: rgba($c-surface-1, 0.6);
    color: $c-text;

    @include hover {
      border-color: rgba(255, 255, 255, 0.32);
      background: $c-surface-2;
    }
  }
}
</style>
