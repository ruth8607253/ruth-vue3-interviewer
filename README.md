# Ruth Vue 3 Interviewer

Vue 3 + Vite + TypeScript + Quasar + Tailwind CSS 的帳號管理系統。

## 技術棧

- **前端框架**: Vue 3 (Composition API)
- **構建工具**: Vite 8.x
- **語言**: TypeScript 6.0.2
- **UI 框架**: Quasar 2.20.1
- **樣式**: Tailwind CSS 3.4.4
- **狀態管理**: Pinia 3.0.4
- **路由**: Vue Router 5.1.0
- **HTTP 客戶端**: axios 1.18.0

## 快速開始

### 環境要求

- Node.js 18+ 和 npm

### 安裝依賴

```bash
npm install
```

### 環境設定

在項目根目錄建立 `.env` 文件：

```env
VITE_API_BASE_URL=https://api-frontend-interview-server.metcfire.com.tw
VITE_INTERVIEWER_NAME=Ruth
```

### 開發伺服器

啟動開發伺服器（熱模組更新已啟用）：

```bash
npm run dev
```

伺服器將在 `http://localhost:5173` 上運行。

### 生產環境構建

編譯項目以供生產環境使用：

```bash
npm run build
```

構建輸出位於 `dist/` 目錄。

### 預覽生產構建

本地預覽生產構建：

```bash
npm run preview
```

## 項目結構

```
src/
├── api/                    # API 調用模組
│   ├── axios.ts           # HTTP 客戶端配置
│   ├── auth.ts            # 驗證 API（模擬）
│   └── account.ts         # 帳號管理 API
├── pages/                  # 頁面元件
│   ├── LoginPage.vue      # 登入頁面
│   └── AccountPage.vue    # 帳號管理頁面
├── stores/                # Pinia 狀態管理
│   └── auth.ts            # 驗證狀態存儲
├── types/                 # TypeScript 型別定義
│   ├── auth.ts            # 驗證型別
│   └── account.ts         # 帳號型別
├── styles/               # 樣式文件
│   ├── login.css          # 登入頁面樣式
│   └── account.css        # 帳號頁面樣式
├── router/               # Vue Router 配置
│   └── index.ts           # 路由定義
├── App.vue               # 根元件
└── main.ts               # 應用入口點
```

## 功能特性

### 驗證流程

- **登入**: 使用電郵和密碼登入（模擬驗證）
- **令牌管理**: 自動儲存並刷新存取令牌
- **本地儲存**: 驗證狀態透過 localStorage 持久化
- **登出**: 清除所有驗證資料並重定向至登入頁面

### 帳號管理

- **列表檢視**: 以卡片網格顯示所有帳號
- **搜尋過濾**: 按姓名、電郵或角色搜尋帳號
- **統計資訊**: 顯示帳號總數、啟用中和已停用帳號數
- **狀態指示**: 視覺指示帳號是否啟用
- **CRUD 操作**: 編輯和刪除按鈕（UI 佔位符，待實作）

## 路由

| 路由 | 元件 | 說明 |
|------|------|------|
| `/login` | LoginPage | 登入頁面 |
| `/accounts` | AccountPage | 帳號管理頁面 |
| `/` | — | 重定向至 `/accounts`（若已驗證）或 `/login` |

## 驗證守衛

路由受到自動驗證守衛保護：
- 未驗證使用者無法存取 `/accounts`
- 已驗證使用者無法存取 `/login`

## API 集成

### 登入 API

**端點**: POST `/login`

模擬驗證端點，返回存取令牌和刷新令牌。

### 帳號列表 API

**端點**: GET `/accounts`

取得所有帳號。

**回應示例**:
```json
[
  {
    "id": "1",
    "name": "張三",
    "email": "zhang@example.com",
    "roleLevel": "ADMIN",
    "status": "ON",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

## 樣式設定

使用 Tailwind CSS 進行樣式設定。每個頁面有獨立的 CSS 文件以確保樣式隔離：

- `src/styles/login.css` - 登入頁面樣式
- `src/styles/account.css` - 帳號頁面樣式

所有 Tailwind 指令（@tailwind）都在各自的 CSS 文件中定義。

## 常見問題

### 為什麼登入時看不到實際驗證？

驗證目前使用模擬實作。如要整合真實驗證端點，請修改 `src/api/auth.ts` 中的 `loginWithCredentials()` 函式。

### 如何新增新的環境變數？

在 `.env` 文件中新增變數，並在 `vite.config.ts` 中確保其前綴為 `VITE_`。在程式碼中透過 `import.meta.env.VITE_VARIABLE_NAME` 存取。

### 編輯/刪除按鈕如何啟動？

按鈕目前為 UI 佔位符。實作方式：
1. 在 `src/api/account.ts` 中新增 `updateAccount()` 和 `deleteAccount()` 函式
2. 在 `AccountPage.vue` 中為 `handleEditAccount()` 和 `handleDeleteAccount()` 新增實際邏輯

## 構建優化

- 程式碼分割：動態匯入以減少初始包大小
- 樹狀搖動：移除未使用的 CSS 和 JavaScript
- 縮小化：自動縮小 CSS 和 JavaScript
- gzip 壓縮：生產構建已優化以進行 gzip 壓縮

## 許可證

MIT
