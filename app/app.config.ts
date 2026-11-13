export default defineAppConfig({
  adsense: {
    /** AdSense 發布商 ID（跟 nuxt.config.ts 裡的廣告程式、public/ads.txt 是同一個帳號） */
    client: 'ca-pub-9815906908978353',

    /** 螢幕底部固定廣告（components/AdBar.vue） */
    bottomBar: {
      /** 廣告單元編號；留空字串 = 不顯示底部廣告。目前先沿用「街友本色 I」的底部橫幅單元 */
      slot: '6817299480',
      /** 螢幕寬度放得下 728px 時用這個尺寸 */
      desktop: { width: 728, height: 90 },
      /** 放不下時（手機）改用這個尺寸 */
      mobile: { width: 320, height: 50 },
    },
  },
})
