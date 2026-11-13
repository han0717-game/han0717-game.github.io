<script setup lang="ts">
/**
 * 螢幕底部固定廣告
 * - 尺寸在畫面載入時決定（放得下 728 用電腦尺寸，否則用手機尺寸），設定在 app.config.ts
 * - 先藏在螢幕外，AdSense 回報有廣告（data-ad-status="filled"）才滑上來；沒廣告或被擋就不出現
 * - 底下墊一塊同高的空白，頁尾不會被廣告蓋住
 * - 開發模式（npm run dev）不載入真的廣告，只顯示一塊預覽框，方便看位置
 */
const { adsense } = useAppConfig()
const { client } = adsense
const { slot, desktop, mobile } = adsense.bottomBar

// 開發模式專用的預覽框。正式版 build 時 import.meta.dev 會變成 false，這個 import 連同預覽框檔案會被整個移除
const DevPreview = import.meta.dev ? defineAsyncComponent(() => import('./AdBarDevPreview.vue')) : null

type Status = 'pending' | 'filled' | 'unfilled' | 'closed'
const status = ref<Status>('pending')
const size = ref<{ width: number; height: number } | null>(null)
const insEl = ref<HTMLElement | null>(null)
let observer: MutationObserver | undefined

const shown = computed(() => status.value === 'filled')

onMounted(async () => {
  if (!slot) return

  // 左右各留 16px 還放得下電腦尺寸才用，不然用手機尺寸
  size.value = window.innerWidth >= desktop.width + 32 ? desktop : mobile

  if (import.meta.dev) {
    status.value = 'filled'
    return
  }

  await nextTick()
  const el = insEl.value
  if (!el) return

  observer = new MutationObserver(() => {
    const adStatus = el.getAttribute('data-ad-status')
    if ((adStatus === 'filled' || adStatus === 'unfilled') && status.value === 'pending') {
      status.value = adStatus
      observer?.disconnect()
    }
  })
  observer.observe(el, { attributes: true, attributeFilter: ['data-ad-status'] })

  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    status.value = 'unfilled'
  }
})

onBeforeUnmount(() => observer?.disconnect())

function close() {
  status.value = 'closed'
  observer?.disconnect()
}
</script>

<template>
  <template v-if="size && status !== 'closed' && status !== 'unfilled'">
    <div
      class="ad-spacer"
      :class="{ 'is-shown': shown }"
      :style="{ '--ad-h': `${size.height}px` }"
      aria-hidden="true"
    />

    <aside class="ad-bar" :class="{ 'is-shown': shown }" :style="{ '--ad-h': `${size.height}px` }" aria-label="廣告">
      <span class="ad-bar__label">廣告</span>
      <button type="button" class="ad-bar__close" aria-label="關閉廣告" @click="close">
        <AppIcon name="close" :size="14" />
      </button>

      <div class="ad-bar__slot">
        <!-- Google AdSense 廣告欄位：廣告內容由 Google 提供 -->
        <ins
          v-if="!DevPreview"
          ref="insEl"
          class="adsbygoogle"
          :style="{ display: 'inline-block', width: `${size.width}px`, height: `${size.height}px` }"
          :data-ad-client="client"
          :data-ad-slot="slot"
        />
        <component :is="DevPreview" v-else :width="size.width" :height="size.height" />
      </div>
    </aside>
  </template>
</template>

<style scoped lang="scss">
$pad: 8px;

// 頁面最底下墊一塊跟廣告條一樣高的空白，捲到底時頁尾才不會被蓋住
.ad-spacer {
  height: 0;

  &.is-shown {
    height: calc(var(--ad-h) + #{$pad * 2} + env(safe-area-inset-bottom));
  }
}

.ad-bar {
  position: fixed;
  inset: auto 0 0;
  z-index: 60;
  padding: $pad $pad calc(#{$pad} + env(safe-area-inset-bottom));
  border-top: 1px solid $c-border-strong;
  background: rgba($c-surface-1, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.5);
  // 還沒確定有廣告前藏在螢幕外（仍保留版面寬度，AdSense 才量得到尺寸）
  transform: translateY(calc(100% + 32px));
  pointer-events: none;
  transition: transform 0.45s $ease-out;

  &.is-shown {
    transform: none;
    pointer-events: auto;
  }

  &__slot {
    display: flex;
    justify-content: center;
    min-height: var(--ad-h);
    overflow: hidden;
  }

  // 左上、右上兩個小頁籤凸出在廣告條上緣，不佔廣告的寬度
  &__label,
  &__close {
    position: absolute;
    bottom: 100%;
    height: 22px;
    border: 1px solid $c-border-strong;
    border-bottom: 0;
    border-radius: 8px 8px 0 0;
    background: $c-surface-1;
    color: $c-text-muted;
  }

  &__label {
    left: 12px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 11px;
    letter-spacing: 0.1em;
  }

  &__close {
    right: 12px;
    display: grid;
    place-items: center;
    width: 36px;
    padding: 0;
    @include focus-ring;

    @include hover {
      color: $c-text;
      background: $c-surface-3;
    }
  }
}
</style>
