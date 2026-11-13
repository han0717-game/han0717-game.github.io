import rawData from '~/data/games.json'
import type { Game, GameCategory, GameData } from '~/types/game'

/** JSON 匯入後的型別由 TS 推斷，這裡明確轉成 GameData，確保欄位符合 types/game.ts */
const data = rawData as GameData

/** 「全部」分類的代號 */
export const ALL_CATEGORY = 'all'

export function useGames() {
  const games: readonly Game[] = data.games
  const categories: readonly GameCategory[] = data.categories

  const featured = games.find((g) => g.featured && g.status === 'live') ?? games.find((g) => g.status === 'live')

  const categoryName = (id: string): string => categories.find((c) => c.id === id)?.name ?? id

  /** 每個分類有幾款遊戲（含「全部」） */
  const categoryCounts = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = { [ALL_CATEGORY]: games.length }
    for (const g of games) counts[g.category] = (counts[g.category] ?? 0) + 1
    return counts
  })

  const activeCategory = ref<string>(ALL_CATEGORY)
  const keyword = ref('')

  /** 依分類 + 關鍵字篩選；可以玩的排前面，其餘維持 JSON 的順序 */
  const filteredGames = computed<Game[]>(() => {
    const q = keyword.value.trim().toLowerCase()
    return games
      .filter((g) => activeCategory.value === ALL_CATEGORY || g.category === activeCategory.value)
      .filter((g) => {
        if (!q) return true
        return [g.title, g.subtitle, g.titleEn, g.description, ...g.tags]
          .filter(Boolean)
          .some((text) => text!.toLowerCase().includes(q))
      })
      .sort((a, b) => Number(b.status === 'live') - Number(a.status === 'live'))
  })

  return {
    games,
    categories,
    featured,
    categoryName,
    categoryCounts,
    activeCategory,
    keyword,
    filteredGames,
  }
}
