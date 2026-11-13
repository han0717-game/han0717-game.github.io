/** 是否偵測到廣告被擋（由 AdBlockWall.vue 偵測後設定；app.vue、首頁會依這個把網站內容鎖起來） */
export const useAdBlocked = () => useState<boolean>('ad-blocked', () => false)
