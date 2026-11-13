// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = 'https://han0717-game.github.io/'
const SITE_NAME = 'Han Game'
const SITE_DESC = 'Han Game 遊戲大廳：收錄所有 Han 製作的網頁小遊戲，打開瀏覽器就能玩。'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  // GitHub Pages 是靜態主機：用 `npm run generate` 預先產生所有頁面（SSG）
  ssr: true,

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 每個 <style lang="scss"> 自動帶入變數與 mixin，不用自己 @use
          additionalData: '@use "~/assets/scss/abstracts" as *;\n',
        },
      },
    },
  },

  app: {
    // han0717-game.github.io 是使用者網站，根目錄就是 /
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      title: SITE_NAME,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: SITE_DESC },
        { name: 'theme-color', content: '#08090c' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:title', content: SITE_NAME },
        { property: 'og:description', content: SITE_DESC },
        { property: 'og:locale', content: 'zh_TW' },
        // AdSense 網站驗證（沿用原本 index.html 的設定，Google 只認 head 裡的）
        { name: 'google-adsense-account', content: 'ca-pub-9815906908978353' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Oswald:wght@500;700&display=swap',
        },
      ],
      // AdSense 廣告程式不放這裡（這裡的設定連 404 錯誤頁也會帶到，錯誤頁放廣告違反 AdSense 政策），改由 app.vue 載入
    },
  },

  typescript: {
    strict: true,
  },
})
