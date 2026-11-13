export {}

declare global {
  interface Window {
    /**
     * AdSense 的廣告佇列：每個 <ins class="adsbygoogle"> 要 push 一次 {} 才會載入廣告
     * Google 的廣告程式載入完成後會把 loaded 設成 true（被廣告阻擋器擋掉時不會有）
     */
    adsbygoogle?: Record<string, unknown>[] & { loaded?: boolean }
  }
}
