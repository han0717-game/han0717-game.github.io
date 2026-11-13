<script setup lang="ts">
import type { GameBadge } from '~/types/game'

defineProps<{ type: GameBadge | 'soon' }>()

const labels: Record<GameBadge | 'soon', string> = {
  new: 'NEW',
  hot: 'HOT',
  update: '更新',
  soon: '即將推出',
}
</script>

<template>
  <span class="badge" :class="`badge--${type}`">{{ labels[type] }}</span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 6px;
  font-family: $font-display;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  white-space: nowrap;

  &--new {
    background: $c-new;
    color: #052016;
  }

  &--hot {
    background: $c-hot;
    color: #fff;
  }

  &--update {
    background: $c-update;
    color: #04162b;
  }

  &--soon {
    font-family: $font-body;
    letter-spacing: 0.04em;
    background: rgba($c-bg, 0.72);
    color: $c-text;
    border: 1px solid $c-border-strong;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
}
</style>
