<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__brand">HAN<b>GAME</b></p>
      <p class="footer__note">所有遊戲皆可在瀏覽器直接遊玩，建議使用最新版 Chrome、Safari 或 Edge。</p>
      <p class="footer__copy">© {{ year }} Han Game. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 96px;
  border-top: 1px solid $c-border;
  background: linear-gradient(180deg, $c-surface-1, $c-bg);

  &__inner {
    @include container;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-block: 40px calc(40px + env(safe-area-inset-bottom));
    font-size: 13px;
    color: $c-text-dim;

    @include up(md) {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 24px;
    }
  }

  &__brand {
    font-family: $font-display;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: $c-text;

    b {
      font-weight: 500;
      color: $c-primary;
      margin-left: 2px;
    }
  }
}
</style>
