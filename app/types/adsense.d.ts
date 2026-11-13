export {}

declare global {
  interface Window {
    /** AdSense 的廣告佇列：每個 <ins class="adsbygoogle"> 要 push 一次 {} 才會載入廣告 */
    adsbygoogle?: Record<string, unknown>[]
  }
}
