<script setup lang="ts">
/** 隱私權政策（AdSense 規定使用 Google 廣告的網站要說明 Cookie 的使用方式；開著廣告阻擋器也看得到，見 composables/useAdBlocked.ts） */
const UPDATED_AT = '2026 年 11 月 13 日'
const CONTACT_URL = 'https://github.com/han0717-game/han0717-game.github.io/issues'

useHead({ title: '隱私權政策 | Han Game' })
useSeoMeta({ description: 'Han Game（han0717-game.github.io）的隱私權政策：廣告 Cookie、資料使用方式與聯絡方式。' })
</script>

<template>
  <main class="privacy">
    <article class="privacy__inner">
      <header class="privacy__head">
        <p class="privacy__eyebrow">Privacy Policy</p>
        <h1 class="privacy__title">隱私權政策</h1>
        <p class="privacy__updated">最後更新：{{ UPDATED_AT }}</p>
      </header>

      <p>
        本政策說明 Han Game（han0717-game.github.io，以下稱「本站」）以及本站上的遊戲，如何處理你在瀏覽時產生的資料。使用本站即表示你同意本政策的內容。
      </p>

      <h2>我們收集哪些資料</h2>
      <p>
        本站沒有會員系統，不會要求你提供姓名、電子郵件、電話等個人資料，也不會把你的遊戲過程上傳到我們的伺服器。
      </p>

      <h2>廣告與 Cookie</h2>
      <p>本站使用 Google AdSense 刊登廣告，廣告收入用來維持本站與遊戲的免費開放。</p>
      <ul>
        <li>Google 等第三方廣告供應商會使用 Cookie，依據你先前造訪本站或其他網站的紀錄，向你顯示廣告。</li>
        <li>
          Google 使用廣告 Cookie，讓 Google 及其合作夥伴能依據你造訪本站和（或）網際網路上其他網站的情形，向你放送廣告。
        </li>
        <li>
          你可以前往
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google 廣告設定</a>
          停用個人化廣告，或前往
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a>
          停用第三方供應商用於個人化廣告的 Cookie。
        </li>
        <li>
          想進一步了解 Google 如何使用這些資料，請參考
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">
            Google 如何使用合作夥伴網站或應用程式的資訊
          </a>
          。
        </li>
      </ul>

      <h2>廣告阻擋偵測</h2>
      <p>
        本站會在你的瀏覽器中檢查 Google 廣告程式能否正常載入，以判斷廣告是否被阻擋；檢查時會嘗試連線至 Google 的廣告伺服器。檢查結果只在你的瀏覽器中使用，本站不會記錄或保存。
      </p>

      <h2>瀏覽器儲存空間</h2>
      <p>
        部分遊戲會使用瀏覽器的 Service Worker，在沒有網路時顯示「無法連線」提示頁面。這些資料只存在你的裝置上，不包含個人資料，清除瀏覽器資料即可刪除。
      </p>

      <h2>網站主機</h2>
      <p>
        本站由 GitHub Pages 提供主機服務。GitHub 可能會為了安全與維運目的，記錄造訪者的 IP 位址等技術資料，詳見
        <a
          href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noopener"
        >GitHub 隱私權聲明</a>。
      </p>

      <h2>政策更新</h2>
      <p>本政策可能不定期更新，更新後會修改本頁上方的「最後更新」日期。</p>

      <h2>聯絡我們</h2>
      <p>
        對本政策有任何問題，請透過
        <a :href="CONTACT_URL" target="_blank" rel="noopener">GitHub Issues</a>
        與我們聯絡。
      </p>

      <NuxtLink to="/" class="privacy__back">← 回到遊戲大廳</NuxtLink>
    </article>
  </main>
</template>

<style scoped lang="scss">
.privacy {
  @include container;
  padding-top: 32px;

  @include up(md) {
    padding-top: 56px;
  }

  &__inner {
    max-width: 760px;
    margin-inline: auto;
    font-size: 15px;
    line-height: 1.9;
    color: $c-text-muted;

    @include up(md) {
      font-size: 16px;
    }

    > * + * {
      margin-top: 16px;
    }

    h2 {
      margin-top: 40px;
      padding-left: 14px;
      border-left: 4px solid $c-primary;
      font-size: 20px;
      font-weight: 900;
      line-height: 1.4;
      color: $c-text;
    }

    ul {
      display: grid;
      gap: 10px;
      padding-left: 1.4em;
      list-style: disc;

      li::marker {
        color: $c-primary;
      }
    }

    a {
      color: $c-primary;
      text-decoration: underline;
      text-underline-offset: 3px;
      @include focus-ring;

      @include hover {
        color: $c-primary-hover;
      }
    }
  }

  &__head {
    padding-bottom: 24px;
    border-bottom: 1px solid $c-border;
  }

  &__eyebrow {
    font-family: $font-display;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: $c-text-dim;
  }

  &__title {
    margin-top: 4px;
    font-size: clamp(30px, 6vw, 44px);
    font-weight: 900;
    line-height: 1.2;
    color: $c-text;
  }

  &__updated {
    margin-top: 8px;
    font-size: 13px;
    color: $c-text-dim;
  }

  &__back {
    display: inline-block;
    margin-top: 48px !important;
    text-decoration: none !important;
  }
}
</style>
