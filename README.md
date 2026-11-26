# 日序 Daymark

日序是使用 HTML、CSS 與 JavaScript 製作的個人任務、行程與習慣追蹤網站。

## 本機預覽

直接以瀏覽器開啟 `index.html` 即可。

## GitHub Pages

此網站為靜態前端頁面，不需要建置步驟。可從 `main` 分支的根目錄發布。

Google 登入後，任務、行程、習慣和長期目標會存放在 Cloud Firestore 的個人資料路徑：`users/{uid}/tasks`、`users/{uid}/events`、`users/{uid}/habits` 和 `users/{uid}/goals`。Firestore Rules 必須限制登入者只能存取自己的 UID 路徑。

Firebase 網頁設定中的 `apiKey` 是供前端識別 Firebase 專案使用；不要將服務帳戶私鑰或 OAuth 用戶端密鑰放進網站原始碼。
