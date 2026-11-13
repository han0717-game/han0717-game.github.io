<script setup lang="ts">
defineProps<{ liveCount: number; totalCount: number }>()

/** 捲動後讓頂欄變實心 */
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header__inner">
      <NuxtLink to="/" class="logo" aria-label="Han Game 首頁">
        <span class="logo__mark">
          <AppIcon name="gamepad" :size="20" />
        </span>
        <span class="logo__text">HAN<b>GAME</b></span>
      </NuxtLink>

      <nav class="nav" aria-label="主要導覽">
        <NuxtLink to="/#games" class="nav__link">遊戲列表</NuxtLink>
        <span class="nav__stat" :title="`共 ${totalCount} 款，${liveCount} 款可遊玩`">
          <span class="nav__dot" aria-hidden="true" />
          {{ liveCount }} 款上線中
        </span>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: $header-h;
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.25s,
    border-color 0.25s,
    backdrop-filter 0.25s;

  &.is-scrolled {
    background: rgba($c-bg, 0.78);
    border-bottom-color: $c-border;
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
  }

  &__inner {
    @include container;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: $radius-sm;
  @include focus-ring;

  &__mark {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: $c-primary;
    color: $c-primary-ink;
    box-shadow: 0 6px 20px rgba($c-primary, 0.3);
  }

  &__text {
    font-family: $font-display;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1;

    b {
      font-weight: 500;
      color: $c-primary;
      margin-left: 2px;
    }
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 8px;

  &__link {
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    color: $c-text-muted;
    transition:
      color 0.2s,
      background-color 0.2s;
    @include focus-ring;

    @include hover {
      color: $c-text;
      background: $c-surface-2;
    }

    @include down(sm) {
      display: none;
    }
  }

  &__stat {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border: 1px solid $c-border;
    border-radius: 999px;
    background: $c-surface-1;
    font-size: 13px;
    color: $c-text-muted;
    white-space: nowrap;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $c-new;
    box-shadow: 0 0 0 3px rgba($c-new, 0.2);
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 6px rgba($c-new, 0);
  }
}
</style>
