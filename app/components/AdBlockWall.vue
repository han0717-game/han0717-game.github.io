<script setup lang="ts">
/**
 * 廣告被擋時，整個網站換成「請關閉廣告阻擋器」畫面（不能關閉，只能重新整理）
 * - 頁面一開就檢查：Google 廣告程式有載入就放行；沒載入就試著連一次廣告程式的網址，
 *   連不上（被擋）才鎖住。網路慢只是還沒載完的話，連得上，不會誤鎖；離線也不會鎖
 * - 鎖住時：背後的網站內容設成 inert（點不到、Tab 不到），頁面不能捲動，遊戲介紹視窗也不會打開
 * - class 名稱刻意不用 ad / adblock 等字眼，避免被廣告阻擋器的過濾規則直接把這個畫面藏起來
 * - 文字直接改下面 <template> 裡的內容
 */
const { adsense } = useAppConfig()
const SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`

const blocked = useAdBlocked()
/** 被擋而且不在隱私權政策頁才鎖（composables/useAdBlocked.ts） */
const locked = useSiteLocked()
const host = ref('')
const reloadBtn = ref<HTMLButtonElement | null>(null)

async function isAdBlocked(): Promise<boolean> {
  if (window.adsbygoogle?.loaded) return false
  try {
    await fetch(SCRIPT_URL, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
    return false
  } catch {
    // 沒網路也會連不上，那不算被擋
    return navigator.onLine
  }
}

function reload() {
  window.location.reload()
}

// 鎖住時頁面不能捲動、焦點放在重新整理按鈕；從隱私權政策頁切回首頁時也會重新鎖上
watch(locked, async (on) => {
  document.documentElement.classList.toggle('is-gated', on)
  if (!on) return
  await nextTick()
  reloadBtn.value?.focus()
})

onMounted(async () => {
  host.value = window.location.hostname
  if (await isAdBlocked()) blocked.value = true
})
</script>

<template>
  <div
    v-if="locked"
    class="gate"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="gate-title"
    aria-describedby="gate-desc"
  >
    <div class="gate__card">
      <span class="gate__icon" aria-hidden="true">
        <AppIcon name="shield" :size="34" />
      </span>

      <h2 id="gate-title" class="gate__title">請關閉廣告阻擋器</h2>

      <!-- 中文句子不能在中間換行，否則會多出一個空格 -->
      <!-- prettier-ignore -->
      <p id="gate-desc" class="gate__desc">這裡的每款遊戲都免費開放，<b>廣告是創作者唯一的收入來源</b>。請關閉廣告阻擋器，或把 <b class="gate__host">{{ host }}</b> 加入允許清單，重新整理後就能繼續瀏覽。</p>

      <div class="gate__steps">
        <p class="gate__steps-title">怎麼關閉？</p>
        <ol>
          <li>點瀏覽器右上角的廣告阻擋器圖示</li>
          <li>選擇「在此網站停用」或「暫停」</li>
          <li>按下方按鈕重新整理</li>
        </ol>
        <p class="gate__note">使用 Brave 瀏覽器：點網址列右邊的獅子圖示，把防護關掉。</p>
      </div>

      <button ref="reloadBtn" type="button" class="btn btn--primary gate__reload" @click="reload">
        <AppIcon name="refresh" :size="18" />
        我已關閉，重新整理
      </button>

      <p class="gate__thanks">謝謝你的支持，讓我們能繼續做出更多好玩的遊戲！</p>
      <NuxtLink to="/privacy" class="gate__privacy">隱私權政策</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gate {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px $gutter calc(24px + env(safe-area-inset-bottom));
  overflow-y: auto;
  overscroll-behavior: contain;
  // 不透明背景：完全看不到背後的網站
  background:
    radial-gradient(60% 45% at 50% 0%, rgba($c-primary, 0.14), transparent 70%),
    $c-bg;
  animation: gate-in 0.35s ease-out;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 480px;
    padding: 32px 24px;
    border: 1px solid rgba($c-primary, 0.3);
    border-radius: $radius-lg;
    background: $c-surface-1;
    box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.9);
    text-align: center;

    @include up(md) {
      padding: 40px 36px;
    }
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 68px;
    height: 68px;
    border-radius: 20px;
    background: rgba($c-primary, 0.14);
    color: $c-primary;
  }

  &__title {
    font-size: clamp(24px, 6vw, 30px);
    font-weight: 900;
    line-height: 1.25;
  }

  &__desc {
    font-size: 15px;
    line-height: 1.85;
    color: $c-text-muted;

    b {
      font-weight: 700;
      color: $c-text;
    }
  }

  &__host {
    word-break: break-all;
    color: $c-primary !important;
  }

  &__steps {
    width: 100%;
    padding: 16px 18px;
    border: 1px solid $c-border;
    border-radius: $radius-md;
    background: $c-surface-2;
    text-align: left;

    ol {
      display: grid;
      gap: 6px;
      margin-top: 8px;
      padding-left: 1.4em;
      list-style: decimal;
      font-size: 14px;
      color: $c-text;

      li::marker {
        color: $c-primary;
        font-weight: 700;
      }
    }
  }

  &__steps-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: $c-text-muted;
  }

  &__note {
    margin-top: 10px;
    font-size: 12px;
    color: $c-text-dim;
  }

  &__reload {
    width: 100%;
    margin-top: 4px;
  }

  &__thanks {
    font-size: 13px;
    color: $c-text-dim;
  }

  &__privacy {
    margin-top: -8px;
    font-size: 12px;
    color: $c-text-dim;
    text-decoration: underline;
    text-underline-offset: 3px;
    @include focus-ring;

    @include hover {
      color: $c-text-muted;
    }
  }
}

@keyframes gate-in {
  from {
    opacity: 0;
  }
}
</style>
