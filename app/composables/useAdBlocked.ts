/** 是否偵測到廣告被擋（由 AdBlockWall.vue 偵測後設定） */
export const useAdBlocked = () => useState<boolean>('ad-blocked', () => false)

/** 不鎖的頁面：隱私權政策要讓所有人都看得到（包含開著廣告阻擋器的人） */
const UNLOCKED_PATHS = ['/privacy']

/** 網站是否要鎖住：廣告被擋，而且不是上面列的頁面 */
export const useSiteLocked = () => {
  const blocked = useAdBlocked()
  const route = useRoute()
  return computed(() => blocked.value && !UNLOCKED_PATHS.some((p) => route.path.startsWith(p)))
}
