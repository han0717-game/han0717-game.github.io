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
| `featured` | `true` 會放在最上方主打區（取第一個 `live` 的） |
| `accent` | 遊戲代表色，例如 `#f6c27a` |

## 部署

push 到 `main` 會自動執行 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 部署。

第一次使用前：GitHub repo → **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
