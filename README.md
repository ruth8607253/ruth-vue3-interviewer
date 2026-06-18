# Ruth Vue 3 Interview

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