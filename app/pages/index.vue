<script setup lang="ts">
import { ALL_CATEGORY } from '~/composables/useGames'

const {
  games,
  pinned,
  findGame,
  categories,
  categoryName,
  categoryCounts,
  activeCategory,
  keyword,
  filteredGames,
} = useGames()

useHead({ title: 'Han Game 遊戲大廳' })

// ---------- 遊戲介紹視窗：網址 /?{id} 就打開該遊戲 ----------
const route = useRoute()
const router = useRouter()

/** 網址參數裡第一個對得到的遊戲 id（/?true-hobo-1、/?true-hobo-1&fbclid=… 都可以） */
const selectedGame = computed(() => {
  for (const key of Object.keys(route.query)) {
    const game = findGame(key)
    if (game) return game
  }
  return null
})

function closeModal() {
  // 從大廳點卡片打開的 → 回上一頁（手機按返回鍵也是關視窗）；直接開 /?{id} 進來的 → 換成首頁網址
  if (window.history.state?.back) router.back()
  else router.replace({ query: {} })
}

function resetFilter() {
  activeCategory.value = ALL_CATEGORY
  keyword.value = ''
}
</script>

<template>
  <main>
    <h1 class="visually-hidden">Han Game 遊戲大廳</h1>

    <HeroFeatured v-if="pinned" :game="pinned" :category-name="categoryName(pinned.category)" />

    <section id="games" class="games" :class="{ 'no-hero': !pinned }" aria-labelledby="games-title">
      <header class="games__head">
        <h2 id="games-title" class="games__title">
          遊戲列表
          <span class="games__title-en">All Games</span>
        </h2>
        <p class="games__count" aria-live="polite">
          <template v-if="filteredGames.length === games.length">共 {{ games.length }} 款</template>
          <template v-else>找到 {{ filteredGames.length }} / {{ games.length }} 款</template>
        </p>
      </header>

      <GameFilter
        v-model:category="activeCategory"
        v-model:keyword="keyword"
        :categories="categories"
        :counts="categoryCounts"
        class="games__filter"
      />

      <ul v-if="filteredGames.length" :key="activeCategory" class="games__grid">
        <li v-for="(game, i) in filteredGames" :key="game.id" :style="{ '--i': i }">
          <GameCard :game="game" :category-name="categoryName(game.category)" />
        </li>
      </ul>

      <div v-else class="games__empty">
        <AppIcon name="search" :size="32" />
        <p>
          找不到
          <template v-if="keyword.trim()">符合「{{ keyword.trim() }}」的</template>
          遊戲
        </p>
        <button type="button" class="games__reset" @click="resetFilter">清除篩選</button>
      </div>
    </section>

    <!-- 靜態網站預先產生的 HTML 沒有網址參數，所以視窗只在瀏覽器端顯示（ClientOnly），避免 hydration 不一致 -->
    <ClientOnly>
      <GameModal
        v-if="selectedGame"
        :key="selectedGame.id"
        :game="selectedGame"
        :category-name="categoryName(selectedGame.category)"
        @close="closeModal"
      />
    </ClientOnly>
  </main>
</template>

<style scoped lang="scss">
.games {
  @include container;

  &.no-hero {
    padding-top: 48px;
  }

  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
  }

  &__title {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 900;
    line-height: 1.2;

    // 標題前的琥珀色短條
    &::before {
      content: '';
      align-self: center;
      width: 6px;
      height: 0.9em;
      border-radius: 3px;
      background: $c-primary;
    }
  }

  &__title-en {
    font-family: $font-display;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $c-text-dim;
  }

  &__count {
    flex-shrink: 0;
    font-size: 14px;
    color: $c-text-muted;
  }

  &__filter {
    margin-bottom: 24px;
  }

  // 手機 2 欄 → 平板 3 欄 → 桌機 4 欄
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    @include up(md) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    @include up(lg) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 24px;
    }

    > li {
      animation: card-in 0.5s $ease-out both;
      animation-delay: calc(var(--i) * 50ms);
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 64px 16px;
    border: 1px dashed $c-border-strong;
    border-radius: $radius-md;
    text-align: center;
    color: $c-text-muted;

    :deep(.app-icon) {
      color: $c-text-dim;
    }
  }

  &__reset {
    height: 40px;
    padding: 0 20px;
    border: 1px solid $c-border-strong;
    border-radius: 999px;
    background: $c-surface-2;
    font-size: 14px;
    @include focus-ring;

    @include hover {
      border-color: $c-primary;
      color: $c-primary;
    }
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}
</style>
