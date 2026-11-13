/** 遊戲分類（對應 games.json 的 categories） */
export interface GameCategory {
  /** 分類代號，games[].category 填這個 */
  id: string
  /** 顯示名稱 */
  name: string
}

/** live：可以玩；coming-soon：即將推出（卡片不能點） */
export type GameStatus = 'live' | 'coming-soon'

/** 卡片角落的標籤 */
export type GameBadge = 'new' | 'hot' | 'update'

/** 支援的裝置 */
export type GamePlatform = 'mobile' | 'desktop'

export interface Game {
  /** 唯一代號（英數、連字號） */
  id: string
  /** 主標題 */
  title: string
  /** 副標題 */
  subtitle?: string
  /** 英文名稱 */
  titleEn?: string
  /** 簡介（一兩句話） */
  description: string
  /** 遊戲網址；coming-soon 可留空字串 */
  url: string
  /** 封面圖（建議直式 4:5，例如 1080x1350）；留空會用 accent 色自動產生封面 */
  cover?: string
  /** 分類代號（對應 categories[].id） */
  category: string
  /** 小標籤 */
  tags: string[]
  /** 支援裝置 */
  platforms: GamePlatform[]
  status: GameStatus
  badge?: GameBadge
  /**
   * 置頂：放在大廳最上方的主打區（只會顯示一款：取第一個置頂且可以玩的）
   * 都沒有設定時，自動用列表裡第一款可以玩的遊戲
   */
  pinned?: boolean
  /** 遊戲代表色（卡片光暈、沒有封面時的底色），例如 "#f6c27a" */
  accent: string
  /** 上架日期 YYYY-MM-DD */
  releasedAt?: string
}

/** games.json 的整體格式 */
export interface GameData {
  categories: GameCategory[]
  games: Game[]
}
