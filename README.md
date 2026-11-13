# Han Game 遊戲大廳

Nuxt 4 + Vue 3 + TypeScript + SCSS，靜態產生（SSG）後部署到 GitHub Pages：<https://han0717-game.github.io/>

## 開發

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # 產生靜態網站到 .output/public
npm run typecheck  # TypeScript 型別檢查
```

## 新增 / 修改遊戲

只要改 [`app/data/games.json`](app/data/games.json)，欄位說明見 [`app/types/game.ts`](app/types/game.ts)。

| 欄位 | 說明 |
| --- | --- |
| `id` | 唯一代號（英數、連字號） |
| `title` / `subtitle` / `titleEn` | 主標題 / 副標題 / 英文名稱 |
| `description` | 簡介 |
| `url` | 遊戲網址（`coming-soon` 可留空） |
| `cover` | 封面圖，建議直式 4:5（1080x1350）；留空會用 `accent` 自動產生封面 |
| `category` | 分類，對應 `categories[].id` |
| `tags` | 小標籤 |
| `platforms` | `mobile`、`desktop` |
| `status` | `live`（可玩）或 `coming-soon`（即將推出，卡片不能點） |
| `badge` | `new`、`hot`、`update`（可省略） |
| `pinned` | 置頂：`true` 會放在最上方主打區（只顯示一款，取第一個置頂且 `live` 的；都沒設定就用第一款 `live` 的） |
| `accent` | 遊戲代表色，例如 `#f6c27a` |

## 遊戲介紹視窗

網址 `https://han0717-game.github.io/?{id}` 會打開該遊戲的介紹視窗，例如 `https://han0717-game.github.io/?true-hobo-1`。
點大廳裡的遊戲卡片也會打開同一個視窗，網址會跟著變，可以直接複製分享；視窗裡的「開始遊戲」另開新分頁。

## 部署

push 到 `main` 會自動執行 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 部署。

第一次使用前：GitHub repo → **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
