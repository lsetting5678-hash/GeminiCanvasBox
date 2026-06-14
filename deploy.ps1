# PowerShell 腳本：一鍵編譯與部署到 GitHub Pages
# 執行此腳本會自動掃描 apps/ 資料夾、生成 index.html，並推送到 GitHub。

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Gemini Canvas 一鍵部署工具 (GitHub Pages) " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. 檢查並執行目錄編譯
Write-Host "[1/4] 正在執行目錄編譯..." -ForegroundColor Yellow
if (Test-Path "build_index.py") {
    python build_index.py
    if ($LASTEXITCODE -ne 0) {
        Write-Error "目錄編譯失敗，請檢查 python 環境與 build_index.py 程式碼。"
    }
} else {
    Write-Error "找不到 build_index.py 檔案！"
}

# 2. 檢查 Git 是否初始化
Write-Host "[2/4] 檢查 Git 版本控管狀態..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "初始化 Git 倉庫..." -ForegroundColor Gray
    git init
    git branch -M main
}

# 建立預設 .gitignore (忽略 python 暫存與 vscode 設定，但保留 config.json 與 apps 資料夾)
if (-not (Test-Path ".gitignore")) {
    @"
__pycache__/
*.pyc
.DS_Store
.vscode/
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
}

# 3. 檢查 GitHub CLI 狀態並處理 Repo
Write-Host "[3/4] 檢查 GitHub CLI 登入狀態..." -ForegroundColor Yellow
try {
    $ghStatus = gh auth status 2>&1
    Write-Host "GitHub 帳號驗證成功。" -ForegroundColor Green
} catch {
    Write-Host "⚠️ 請先登入 GitHub。正在為您開啟瀏覽器登入視窗..." -ForegroundColor LightRed
    gh auth login --web --git-protocol https
}

# 檢查是否有設定遠端倉庫 (remote origin)
$hasRemote = $false
try {
    $remotes = git remote
    if ($remotes -contains "origin") {
        $hasRemote = $true
    }
} catch {}

if (-not $hasRemote) {
    # 取得當前資料夾名稱作為預設 Repo 名稱
    $folderName = (Get-Item .).Name
    Write-Host "未偵測到遠端倉庫。準備在 GitHub 建立新 Repository..." -ForegroundColor Yellow
    Write-Host "預設專案名稱: $folderName" -ForegroundColor Gray
    
    # 建立 GitHub Repo
    gh repo create $folderName --public --source=. --push --description "我的 Gemini Canvas 互動工具箱目錄"
    
    Write-Host "GitHub 倉庫建立成功並已建立連結！" -ForegroundColor Green
} else {
    Write-Host "已偵測到現有的 GitHub 遠端連結。" -ForegroundColor Gray
}

# 4. 提交與推送
Write-Host "[4/4] 正在提交並推送到 GitHub..." -ForegroundColor Yellow
git add .
# 檢查是否有需要提交的變更
$gitStatus = git status --porcelain
if ($gitStatus) {
    git commit -m "自動更新：部署 Gemini Canvas 網頁與導覽目錄"
    git push -u origin main
    Write-Host "程式碼已成功推送到 GitHub！" -ForegroundColor Green
} else {
    Write-Host "無任何變更，跳過 Commit 與 Push。" -ForegroundColor Gray
}

# 5. 設定並顯示 GitHub Pages 連結
Write-Host "設定 GitHub Pages 中..." -ForegroundColor Yellow
try {
    # 開啟 GitHub Pages (預設為 main 分支 / 根目錄)
    gh repo edit --enable-pages --pages-branch main --pages-path /
    
    # 取得使用者名稱與專案名稱以產生 URL
    $repoInfo = gh repo view --json owner,name | ConvertFrom-Json
    $username = $repoInfo.owner.login
    $reponame = $repoInfo.name
    $pagesUrl = "https://$username.github.io/$reponame/"
    
    Write-Host "`n🎉 部署完成！" -ForegroundColor Green
    Write-Host "您的專案入口網址為 (可能需要 1~2 分鐘生效)：" -ForegroundColor Green
    Write-Host "$pagesUrl" -ForegroundColor Cyan -NoNewline
    Write-Host " (已複製到剪貼簿)" -ForegroundColor Gray
    $pagesUrl | clip
} catch {
    Write-Host "設定 GitHub Pages 失敗，但代碼已成功推送。您可以在 GitHub 網頁上手動開啟 Pages 功能。" -ForegroundColor Yellow
}
Write-Host "`n==========================================" -ForegroundColor Cyan
