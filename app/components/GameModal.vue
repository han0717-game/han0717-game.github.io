<script setup lang="ts">
import type { Game } from '~/types/game'

/**
 * 遊戲介紹視窗（網址 /?{id} 時由 pages/index.vue 打開）
 * 用原生 <dialog>：自動擋住背後頁面、Esc 關閉、鍵盤焦點不會跑到視窗外
 */
const props = defineProps<{ game: Game; categoryName: string }>()
const emit = defineEmits<{ close: [] }>()

const dialogEl = ref<HTMLDialogElement | null>(null)
const playable = computed(() => props.game.status === 'live' && !!props.game.url)
const platformLabel = { mobile: '手機', desktop: '電腦' } as const

// ---------- 分享 ----------
const shared = ref(false)
let sharedTimer: ReturnType<typeof setTimeout> | undefined

const { baseURL } = useRuntimeConfig().app

function shareUrl(): string {
  return new URL(`${baseURL}?${props.game.id}`, window.location.origin).href
}

/** 手機用系統分享選單（LINE、FB…）；電腦沒有分享選單就複製連結 */
async function share() {
  const url = shareUrl()
  const title = [props.game.title, props.game.subtitle].filter(Boolean).join(' - ')

  if (navigator.share && matchMedia('(pointer: coarse)').matches) {
    try {
      await navigator.share({ title, text: props.game.description, url })
    } catch {
      // 使用者取消分享，不用處理
    }
    return
  }

  try {
    await navigator.clipboard.writeText(url)
  } catch {
    window.prompt('複製這個連結：', url)
    return
  }
  shared.value = true
  clearTimeout(sharedTimer)
  sharedTimer = setTimeout(() => (shared.value = false), 2000)
}

// ---------- 開關 ----------
/** 點到視窗外的暗色背景才關閉（點視窗內容不關） */
function onDialogClick(e: MouseEvent) {
  if (e.target === dialogEl.value) emit('close')
}

onMounted(() => {
  dialogEl.value?.showModal()
  document.documentElement.classList.add('is-modal-open')
})

onBeforeUnmount(() => {
  clearTimeout(sharedTimer)
  document.documentElement.classList.remove('is-modal-open')
  if (dialogEl.value?.open) dialogEl.value.close()
})
</script>

<template>
  <dialog
    ref="dialogEl"
    class="modal"
    :style="{ '--accent': game.accent }"
    aria-labelledby="modal-title"
    @cancel.prevent="emit('close')"
    @click="onDialogClick"
  >
    <article class="modal__panel">
      <button type="button" class="modal__close" aria-label="關閉" @click="emit('close')">
        <AppIcon name="close" :size="18" />
      </button>

      <div class="modal__cover">
        <GameCover :game="game" eager />
        <GameBadge v-if="!playable" type="soon" class="modal__badge" />
        <GameBadge v-else-if="game.badge" :type="game.badge" class="modal__badge" />
      </div>

      <header class="modal__head">
        <p class="modal__category">{{ categoryName }}</p>
        <h2 id="modal-title" class="modal__title">{{ game.title }}</h2>
        <p v-if="game.subtitle" class="modal__subtitle">{{ game.subtitle }}</p>
        <p v-if="game.titleEn" class="modal__en">{{ game.titleEn }}</p>
      </header>

      <div class="modal__body">
        <p class="modal__desc">{{ game.description }}</p>

        <ul v-if="game.tags.length" class="modal__tags">
          <li v-for="tag in game.tags" :key="tag">{{ tag }}</li>
        </ul>

        <p class="modal__platforms">
          <span v-for="p in game.platforms" :key="p">
            <AppIcon :name="p" :size="16" />
            {{ platformLabel[p] }}
          </span>
          <span v-if="game.releasedAt">上架 {{ game.releasedAt }}</span>
        </p>

        <div class="modal__actions">
          <a v-if="playable" :href="game.url" target="_blank" rel="noopener" class="btn btn--primary modal__play">
            <AppIcon name="play" :size="18" />
            開始遊戲
          </a>
          <button v-else type="button" class="btn btn--primary modal__play" disabled>
            <AppIcon name="clock" :size="18" />
            即將推出
          </button>

          <button type="button" class="btn btn--ghost" @click="share">
            <AppIcon :name="shared ? 'check' : 'share'" :size="18" />
            {{ shared ? '已複製連結' : '分享' }}
          </button>
        </div>
      </div>
    </article>
  </dialog>
</template>

<style scoped lang="scss">
.modal {
  width: min(880px, calc(100% - 24px));
  max-width: none;
  max-height: calc(100dvh - 24px);
  margin: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: $c-text;
  overflow: visible;
  animation: modal-in 0.35s $ease-out;

  &::backdrop {
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: backdrop-in 0.3s ease-out;
  }

  // ---------- 視窗本體 ----------
  // 手機：小封面 + 標題並排，下面接介紹；電腦：大封面在左，右邊是標題 + 介紹
  &__panel {
    position: relative;
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr);
    grid-template-areas:
      'cover head'
      'body body';
    gap: 16px;
    max-height: calc(100dvh - 24px);
    padding: 20px;
    border: 1px solid $c-border-strong;
    border-radius: $radius-lg;
    background:
      radial-gradient(80% 50% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%),
      $c-surface-1;
    box-shadow:
      0 40px 100px -20px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(255, 255, 255, 0.03);
    overflow-y: auto;
    overscroll-behavior: contain;

    @include up(md) {
      grid-template-columns: 300px minmax(0, 1fr);
      grid-template-areas:
        'cover head'
        'cover body';
      grid-template-rows: auto 1fr;
      gap: 12px 32px;
      padding: 28px;
    }
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid $c-border;
    border-radius: 50%;
    background: rgba($c-bg, 0.6);
    color: $c-text-muted;
    transition:
      color 0.2s,
      background-color 0.2s;
    @include focus-ring;

    @include hover {
      color: $c-text;
      background: $c-surface-3;
    }
  }

  &__cover {
    grid-area: cover;
    position: relative;
    align-self: start;
    border-radius: $radius-md;
    overflow: hidden;
    box-shadow:
      0 20px 50px -16px rgba(0, 0, 0, 0.8),
      0 0 40px -12px color-mix(in srgb, var(--accent) 45%, transparent);

    @include down(md) {
      border-radius: $radius-sm;
    }
  }

  &__badge {
    position: absolute;
    top: 10px;
    left: 10px;

    @include down(md) {
      top: 6px;
      left: 6px;
      transform: scale(0.85);
      transform-origin: top left;
    }
  }

  &__head {
    grid-area: head;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    min-width: 0;
    padding-right: 40px; // 讓出右上角的關閉鈕

    @include up(md) {
      justify-content: flex-start;
      padding-top: 8px;
    }
  }

  &__category {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: color-mix(in srgb, var(--accent) 80%, #fff);
  }

  &__title {
    font-size: clamp(24px, 4vw, 40px);
    font-weight: 900;
    line-height: 1.15;
  }

  &__subtitle {
    font-size: clamp(15px, 2vw, 20px);
    font-weight: 700;
    color: color-mix(in srgb, var(--accent) 85%, #fff);
  }

  &__en {
    margin-top: 2px;
    font-family: $font-display;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $c-text-dim;
  }

  &__body {
    grid-area: body;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  &__desc {
    font-size: 15px;
    line-height: 1.85;
    color: $c-text-muted;

    @include up(md) {
      font-size: 16px;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      padding: 4px 12px;
      border: 1px solid $c-border;
      border-radius: 999px;
      background: $c-surface-2;
      font-size: 13px;
    }
  }

  &__platforms {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    font-size: 13px;
    color: $c-text-dim;

    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: auto;
    padding-top: 8px;

    .btn {
      @include down(md) {
        flex: 1;
        padding: 0 20px;
      }
    }
  }

  &__play {
    @include up(md) {
      min-width: 200px;
    }
  }
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }
}
</style>
