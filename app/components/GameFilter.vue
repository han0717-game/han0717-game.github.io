<script setup lang="ts">
import type { GameCategory } from '~/types/game'
import { ALL_CATEGORY } from '~/composables/useGames'

defineProps<{ categories: readonly GameCategory[]; counts: Record<string, number> }>()

const category = defineModel<string>('category', { required: true })
const keyword = defineModel<string>('keyword', { required: true })

const searchInput = ref<HTMLInputElement | null>(null)

function clearKeyword() {
  keyword.value = ''
  searchInput.value?.focus()
}
</script>

<template>
  <div class="filter">
    <div class="filter__tabs" role="group" aria-label="遊戲分類">
      <button
        v-for="c in [{ id: ALL_CATEGORY, name: '全部' }, ...categories]"
        :key="c.id"
        type="button"
        class="chip"
        :class="{ 'is-active': category === c.id }"
        :aria-pressed="category === c.id"
        :disabled="!counts[c.id]"
        @click="category = c.id"
      >
        {{ c.name }}
        <span class="chip__count">{{ counts[c.id] ?? 0 }}</span>
      </button>
    </div>

    <label class="search">
      <span class="visually-hidden">搜尋遊戲</span>
      <AppIcon name="search" :size="18" class="search__icon" />
      <input
        ref="searchInput"
        v-model="keyword"
        type="search"
        class="search__input"
        placeholder="搜尋遊戲名稱、標籤…"
        autocomplete="off"
        enterkeyhint="search"
      >
      <button v-if="keyword" type="button" class="search__clear" aria-label="清除搜尋" @click="clearKeyword">
        <AppIcon name="close" :size="16" />
      </button>
    </label>
  </div>
</template>

<style scoped lang="scss">
.filter {
  display: flex;
  flex-direction: column;
  gap: 14px;

  @include up(md) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  // 分類列：手機可以左右滑
  &__tabs {
    display: flex;
    gap: 8px;
    margin-inline: -$gutter;
    padding: 2px $gutter;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @include up(md) {
      margin-inline: 0;
      padding-inline: 0;
      flex-wrap: wrap;
      overflow: visible;
    }
  }
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  height: 40px;
  padding: 0 16px;
  border: 1px solid $c-border;
  border-radius: 999px;
  background: $c-surface-1;
  font-size: 14px;
  font-weight: 500;
  color: $c-text-muted;
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;
  @include focus-ring;

  @include hover {
    color: $c-text;
    border-color: $c-border-strong;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &__count {
    min-width: 22px;
    padding: 1px 6px;
    border-radius: 999px;
    background: $c-surface-3;
    font-size: 12px;
    text-align: center;
    color: $c-text-muted;
  }

  &.is-active {
    border-color: $c-primary;
    background: $c-primary;
    color: $c-primary-ink;
    font-weight: 700;

    .chip__count {
      background: rgba($c-primary-ink, 0.15);
      color: $c-primary-ink;
    }
  }
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  @include up(md) {
    width: 300px;
    flex-shrink: 0;
  }

  &__icon {
    position: absolute;
    left: 14px;
    color: $c-text-dim;
    pointer-events: none;
  }

  &__input {
    width: 100%;
    height: 44px;
    padding: 0 42px;
    border: 1px solid $c-border;
    border-radius: 999px;
    background: $c-surface-1;
    font-size: 16px; // 16px 以上，iPhone 點輸入框才不會自動放大
    outline: none;
    transition:
      border-color 0.2s,
      background-color 0.2s;
    -webkit-appearance: none;
    appearance: none;

    &::placeholder {
      color: $c-text-dim;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }

    &:focus {
      border-color: rgba($c-primary, 0.7);
      background: $c-surface-2;
    }
  }

  &__clear {
    position: absolute;
    right: 8px;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    background: $c-surface-3;
    color: $c-text-muted;
    @include focus-ring;

    @include hover {
      color: $c-text;
    }
  }
}
</style>
