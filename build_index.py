import os
import re
import json
import html
import sys

# 強制 stdout 使用 UTF-8 編碼輸出，避免 Windows CP950 錯誤
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# 讀取設定檔
CONFIG_FILE = "config.json"
APPS_DIR = "apps"

default_config = {
    "site_title": "我的 Gemini 特教與互動工具箱",
    "default_redirect": "",
    "redirect_delay_seconds": 3,
    "categories": ["國語文", "數學", "行政工具", "特需領域", "輔助科技", "學生專區"]
}

if os.path.exists(CONFIG_FILE):
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            config = json.load(f)
    except Exception:
        config = default_config
else:
    config = default_config
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

if not os.path.exists(APPS_DIR):
    os.makedirs(APPS_DIR)

# 掃描 apps 資料夾
app_files = [f for f in os.listdir(APPS_DIR) if f.endswith(".html")]
scanned_apps = []

# 正則表達式匹配
title_re = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
meta_desc_re = re.compile(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', re.IGNORECASE)
meta_cat_re = re.compile(r'<meta\s+name=["\']category["\']\s+content=["\'](.*?)["\']', re.IGNORECASE)
meta_icon_re = re.compile(r'<meta\s+name=["\']icon["\']\s+content=["\'](.*?)["\']', re.IGNORECASE)
meta_tags_re = re.compile(r'<meta\s+name=["\']tags["\']\s+content=["\'](.*?)["\']', re.IGNORECASE)

for app_file in app_files:
    path = os.path.join(APPS_DIR, app_file)
    try:
        with open(path, "r", encoding="utf-8") as f:
            # 只讀取前 8192 位元組，加速解析
            content = f.read(8192)
            
            # 解析 Title
            title_match = title_re.search(content)
            title = title_match.group(1).strip() if title_match else app_file
            title = html.escape(title)
            
            # 解析 Meta 元數據
            desc_match = meta_desc_re.search(content)
            desc = desc_match.group(1).strip() if desc_match else "點擊開啟此工具。"
            desc = html.escape(desc)
            
            cat_match = meta_cat_re.search(content)
            category = cat_match.group(1).strip() if cat_match else "學生專區"
            category = html.escape(category)
            
            icon_match = meta_icon_re.search(content)
            icon = icon_match.group(1).strip() if icon_match else "✨"
            icon = html.escape(icon)
            
            tags_match = meta_tags_re.search(content)
            tags = [t.strip() for t in tags_match.group(1).split(",")] if tags_match else []
            tags = [html.escape(t) for t in tags]
            
            scanned_apps.append({
                "filename": app_file,
                "title": title,
                "description": desc,
                "category": category,
                "icon": icon,
                "tags": tags,
                "path": f"apps/{app_file}"
            })
    except Exception as e:
        print(f"解析 {app_file} 失敗: {e}")

# 生成 HTML 模板
html_template = """<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{site_title}</title>
    <!-- 載入優雅字體 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Noto+Sans+TC:wght@300..900&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-color: #f7f9fc;
            --primary-pink: #ffb7b2;
            --primary-blue: #a8dadc;
            --primary-yellow: #ffe5b4;
            --primary-mint: #b5e2b9;
            --text-color: #4a4a4a;
            --card-bg: rgba(255, 255, 255, 0.85);
            --card-shadow: 0 10px 25px rgba(168, 218, 220, 0.25);
            --card-hover-shadow: 0 15px 35px rgba(255, 183, 178, 0.45);
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Fredoka', 'Noto Sans TC', sans-serif;
            background: linear-gradient(135deg, #fff3f3 0%, #f0f8ff 50%, #f2fff9 100%);
            background-attachment: fixed;
            color: var(--text-color);
            min-height: 100vh;
            padding: 2rem 1rem;
            line-height: 1.6;
        }}

        /* 療癒圓滑包裝器 */
        .container {{
            max-width: 1200px;
            margin: 0 auto;
        }}

        header {{
            text-align: center;
            margin-bottom: 3rem;
            position: relative;
        }}

        /* 標題與裝飾 */
        h1 {{
            font-size: 2.8rem;
            font-weight: 700;
            color: #5d6d7e;
            text-shadow: 2px 2px 0px #fff, 4px 4px 0px rgba(168, 218, 220, 0.3);
            margin-bottom: 1rem;
            display: inline-block;
            position: relative;
        }}

        h1::after {{
            content: '';
            position: absolute;
            width: 60px;
            height: 8px;
            background: var(--primary-pink);
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 10px;
        }}

        .subtitle {{
            font-size: 1.1rem;
            color: #7f8c8d;
            margin-top: 1.2rem;
            font-weight: 500;
        }}

        /* 搜尋與過濾區 */
        .controls {{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 3rem;
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 24px;
            border: 2px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 8px 32px rgba(168, 218, 220, 0.15);
        }}

        .search-wrapper {{
            position: relative;
            width: 100%;
            max-width: 500px;
        }}

        .search-input {{
            width: 100%;
            padding: 1rem 1.5rem 1rem 3.5rem;
            font-size: 1.1rem;
            border: 3px solid var(--primary-blue);
            border-radius: 50px;
            outline: none;
            background: white;
            color: var(--text-color);
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: inherit;
        }}

        .search-input:focus {{
            border-color: var(--primary-pink);
            box-shadow: 0 0 15px rgba(255, 183, 178, 0.5), inset 0 2px 5px rgba(0,0,0,0.02);
            transform: scale(1.02);
        }}

        .search-icon {{
            position: absolute;
            left: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.3rem;
            pointer-events: none;
        }}

        /* 分類按鈕 */
        .categories-filter {{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
        }}

        .filter-btn {{
            padding: 0.6rem 1.4rem;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            border-radius: 50px;
            background: white;
            color: #6c7a89;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: inherit;
        }}

        .filter-btn:hover {{
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 6px 15px rgba(0,0,0,0.08);
            background: var(--primary-yellow);
            color: #5d4037;
        }}

        .filter-btn.active {{
            background: var(--primary-pink);
            color: white;
            box-shadow: 0 8px 20px rgba(255, 183, 178, 0.4);
        }}

        /* 卡片網格 */
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }}

        /* 單個卡片 (角落生物般圓潤 Q 彈) */
        .card {{
            background: var(--card-bg);
            border-radius: 28px;
            border: 3px solid rgba(255, 255, 255, 0.9);
            box-shadow: var(--card-shadow);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            cursor: pointer;
            text-decoration: none;
            color: inherit;
        }}

        /* 微光裝飾背景 */
        .card::before {{
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.5s;
        }}

        .card:hover {{
            transform: translateY(-12px) scale(1.03);
            box-shadow: var(--card-hover-shadow);
            border-color: var(--primary-pink);
        }}

        .card:hover::before {{
            opacity: 1;
        }}

        .card-header {{
            display: flex;
            align-items: center;
            gap: 1.2rem;
            margin-bottom: 1.2rem;
        }}

        .card-icon {{
            font-size: 2.8rem;
            width: 65px;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--primary-blue);
            border-radius: 20px;
            box-shadow: 0 6px 12px rgba(168, 218, 220, 0.3);
            transition: transform 0.3s;
        }}

        .card:hover .card-icon {{
            transform: rotate(-10deg) scale(1.1);
        }}

        /* 不同分類卡片的 icon 配色 */
        .card[data-category="國語文"] .card-icon {{ background: var(--primary-pink); }}
        .card[data-category="數學"] .card-icon {{ background: var(--primary-blue); }}
        .card[data-category="行政工具"] .card-icon {{ background: var(--primary-yellow); }}
        .card[data-category="特需領域"] .card-icon {{ background: var(--primary-mint); }}
        .card[data-category="輔助科技"] .card-icon {{ background: #dcd6f7; }}
        .card[data-category="學生專區"] .card-icon {{ background: #ffe4e1; }}
        .card[data-category="班經小工具"] .card-icon {{ background: #ffdab9; }}
        .card[data-category="特教行政工具"] .card-icon {{ background: #e6e6fa; }}

        .card-title-wrapper {{
            flex: 1;
        }}

        .card-title {{
            font-size: 1.3rem;
            font-weight: 700;
            color: #4f5b66;
            margin-bottom: 0.2rem;
        }}

        .card-category {{
            display: inline-block;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.2rem 0.6rem;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.05);
            color: #7f8c8d;
        }}

        .card-desc {{
            font-size: 0.95rem;
            color: #7f8c8d;
            margin-bottom: 1.5rem;
            flex-grow: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }}

        .card-footer {{
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            border-top: 1.5px dashed rgba(0, 0, 0, 0.05);
            padding-top: 1rem;
        }}

        .tag {{
            font-size: 0.75rem;
            font-weight: 600;
            background: rgba(168, 218, 220, 0.2);
            color: #457b9d;
            padding: 0.15rem 0.5rem;
            border-radius: 12px;
        }}

        /* 自動跳轉橫幅 */
        .redirect-banner {{
            display: none;
            width: 100%;
            background: linear-gradient(90deg, var(--primary-pink) 0%, var(--primary-yellow) 100%);
            color: #5d4037;
            padding: 1rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 8px 20px rgba(255, 183, 178, 0.3);
            border: 3px solid white;
            animation: pulse 2s infinite;
        }}

        @keyframes pulse {{
            0% {{ transform: scale(1); }}
            50% {{ transform: scale(1.01); }}
            100% {{ transform: scale(1); }}
        }}

        .redirect-btn {{
            background: white;
            color: #e74c3c;
            border: none;
            padding: 0.4rem 1rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 700;
            font-family: inherit;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }}

        .redirect-btn:hover {{
            transform: scale(1.05);
        }}

        /* 找不到結果 */
        .no-results {{
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem;
            font-size: 1.2rem;
            color: #95a5a6;
            background: var(--card-bg);
            border-radius: 28px;
            border: 3px dashed var(--primary-blue);
        }}

        /* 甜美對話框 (Cute Custom Popup) */
        .cute-alert {{
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(150%);
            background: white;
            border: 3px solid var(--primary-pink);
            border-radius: 24px;
            padding: 1rem 2rem;
            box-shadow: 0 10px 30px rgba(255,183,178,0.4);
            z-index: 1000;
            font-weight: 700;
            font-size: 1.1rem;
            color: #5d4037;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }}

        .cute-alert.show {{
            transform: translateX(-50%) translateY(0);
        }}

        /* QR Code 彈出視窗 */
        .modal-overlay {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }}

        .modal-overlay.show {{
            opacity: 1;
            pointer-events: auto;
        }}

        .modal-content {{
            background: white;
            border: 4px solid var(--primary-pink);
            border-radius: 32px;
            padding: 2.5rem;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(255, 183, 178, 0.4);
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }}

        .modal-overlay.show .modal-content {{
            transform: scale(1);
        }}

        .modal-title {{
            font-size: 1.4rem;
            font-weight: 700;
            color: #5d6d7e;
            margin-bottom: 1rem;
        }}

        .qr-image-wrapper {{
            background: #fdf6f6;
            border: 3px dashed var(--primary-blue);
            border-radius: 20px;
            padding: 1.5rem;
            display: inline-block;
            margin-bottom: 1rem;
        }}

        .qr-image {{
            width: 200px;
            height: 200px;
            display: block;
        }}

        .modal-url {{
            font-size: 0.85rem;
            color: #7f8c8d;
            word-break: break-all;
            background: #f7f9fc;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(0,0,0,0.05);
        }}

        .modal-close-btn {{
            background: var(--primary-pink);
            color: white;
            border: none;
            padding: 0.6rem 2rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(255,183,178,0.4);
            transition: transform 0.2s;
            font-family: inherit;
        }}

        .modal-close-btn:hover {{
            transform: scale(1.05);
            background: #ff9e97;
        }}

        /* 卡片上的 QR 按鈕 */
        .qr-btn {{
            margin-left: auto;
            background: var(--primary-blue);
            color: #1d3557;
            border: none;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }}

        .qr-btn:hover {{
            background: var(--primary-pink);
            color: white;
            transform: scale(1.05);
        }}
    </style>
</head>
<body>
    <div class="container">
        <!-- 自動跳轉橫幅 -->
        <div id="redirectBanner" class="redirect-banner" style="display: none;">
            <span>🚀 偵測到預設首頁！將於 <span id="countdown">3</span> 秒後自動前往 <strong id="redirectTarget"></strong>...</span>
            <button class="redirect-btn" onclick="cancelRedirect()">取消自動前往</button>
        </div>

        <header>
            <h1>{site_title}</h1>
            <p class="subtitle">🎈 讓教學與行政更簡單、更有趣的智慧小工具</p>
        </header>

        <section class="controls">
            <!-- 搜尋框 -->
            <div class="search-wrapper">
                <span class="search-icon">🔍</span>
                <input type="text" id="searchInput" class="search-input" placeholder="搜尋工具名稱或關鍵字...">
            </div>

            <!-- 分類標籤 -->
            <div class="categories-filter">
                <button class="filter-btn active" onclick="filterCategory('All', this)">全部工具</button>
                {category_buttons}
            </div>
        </section>

        <!-- 工具網格 -->
        <main id="appGrid" class="grid">
            {app_cards}
        </main>
    </div>

    <!-- 甜美提示框 -->
    <div id="cuteAlert" class="cute-alert">
        <span>🥳</span>
        <span id="cuteAlertText"></span>
    </div>

    <!-- QR Code 彈出視窗 -->
    <div id="qrModal" class="modal-overlay" onclick="closeQR()">
        <div class="modal-content" onclick="event.stopPropagation()">
            <h3 id="qrModalTitle" class="modal-title">QR Code</h3>
            <div class="qr-image-wrapper">
                <img id="qrModalImg" class="qr-image" src="" alt="QR Code">
            </div>
            <div id="qrModalUrl" class="modal-url"></div>
            <button class="modal-close-btn" onclick="closeQR()">關閉</button>
        </div>
    </div>

    <script>
        // QR Code 顯示函數
        function showQR(e, path, title) {{
            e.stopPropagation();
            e.preventDefault();
            
            const fullUrl = new URL(path, window.location.href).href;
            const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${{encodeURIComponent(fullUrl)}}`;
            
            document.getElementById('qrModalTitle').textContent = `📱 ${{title}}`;
            document.getElementById('qrModalImg').src = qrImgUrl;
            document.getElementById('qrModalUrl').textContent = fullUrl;
            
            document.getElementById('qrModal').classList.add('show');
        }}

        // QR Code 關閉函數
        function closeQR() {{
            document.getElementById('qrModal').classList.remove('show');
        }}
        // 資料載入
        const apps = {apps_json};
        const defaultRedirect = "{default_redirect}";
        let redirectTimeout = null;
        let countdownInterval = null;

        // 初始化
        window.addEventListener('DOMContentLoaded', () => {{
            renderApps(apps);
            checkDefaultRedirect();
        }});

        // 搜尋監聽
        document.getElementById('searchInput').addEventListener('input', (e) => {{
            filterApps();
        }});

        // 渲染卡片
        function renderApps(list) {{
            const grid = document.getElementById('appGrid');
            grid.innerHTML = '';

            if (list.length === 0) {{
                grid.innerHTML = `<div class="no-results">🌸 找不到符合的工具，要不要換個關鍵字試試看？</div>`;
                return;
            }}

            list.forEach(app => {{
                const card = document.createElement('a');
                card.className = 'card';
                card.href = app.path;
                card.setAttribute('data-category', app.category);
                
                // 點擊事件：跳出可愛氣泡提示，延遲跳轉
                card.addEventListener('click', (e) => {{
                    e.preventDefault();
                    showCuteAlert(`即將前往「${{app.category}}」工具區！準備出發～`);
                    setTimeout(() => {{
                        window.location.href = app.path;
                    }}, 900);
                }});

                const tagsHtml = app.tags.map(tag => `<span class="tag">#${{tag}}</span>`).join('');

                card.innerHTML = `
                    <div>
                        <div class="card-header">
                            <div class="card-icon">${{app.icon}}</div>
                            <div class="card-title-wrapper">
                                <h2 class="card-title">${{app.title}}</h2>
                                <span class="card-category">${{app.category}}</span>
                            </div>
                        </div>
                        <p class="card-desc">${{app.description}}</p>
                    </div>
                    <div class="card-footer">
                        ${{tagsHtml || '<span class="tag">#小工具</span>'}}
                        <button class="qr-btn" onclick="showQR(event, '${{app.path}}', '${{app.title}}')">📱 QR Code</button>
                    </div>
                `;
                grid.appendChild(card);
            }});
        }}

        // 分類與搜尋過濾
        let currentCategory = 'All';
        function filterCategory(cat, btn) {{
            currentCategory = cat;
            
            // 切換按鈕狀態
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filterApps();
        }}

        function filterApps() {{
            const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
            const filtered = apps.filter(app => {{
                const matchCat = (currentCategory === 'All' || app.category === currentCategory);
                const matchSearch = app.title.toLowerCase().includes(searchVal) || 
                                    app.description.toLowerCase().includes(searchVal) ||
                                    app.tags.some(tag => tag.toLowerCase().includes(searchVal));
                return matchCat && matchSearch;
            }});
            renderApps(filtered);
        }}

        // 甜美提示框控制
        function showCuteAlert(msg) {{
            const alertBox = document.getElementById('cuteAlert');
            const alertText = document.getElementById('cuteAlertText');
            alertText.textContent = msg;
            alertBox.classList.add('show');
            setTimeout(() => {{
                alertBox.classList.remove('show');
            }}, 2000);
        }}

        // 自動跳轉機制
        function checkDefaultRedirect() {{
            if (!defaultRedirect) return;

            const targetApp = apps.find(app => app.filename === defaultRedirect);
            if (!targetApp) return;

            const banner = document.getElementById('redirectBanner');
            const targetSpan = document.getElementById('redirectTarget');
            const countdownSpan = document.getElementById('countdown');

            banner.style.display = 'flex';
            targetSpan.textContent = targetApp.title;
            
            let secondsLeft = {redirect_delay};
            countdownSpan.textContent = secondsLeft;

            countdownInterval = setInterval(() => {{
                secondsLeft--;
                countdownSpan.textContent = secondsLeft;
                if (secondsLeft <= 0) {{
                    clearInterval(countdownInterval);
                    window.location.href = targetApp.path;
                }}
            }}, 1000);
        }}

        function cancelRedirect() {{
            if (countdownInterval) clearInterval(countdownInterval);
            document.getElementById('redirectBanner').style.display = 'none';
            showCuteAlert("已取消自動前往，快來探索所有工具吧！✨");
        }}
    </script>
</body>
</html>
"""

# 處理分類按鈕 HTML
category_buttons = ""
for cat in config["categories"]:
    category_buttons += f'<button class="filter-btn" onclick="filterCategory(\'{cat}\', this)">{cat}</button>\n'

# 處理卡片與 JSON 數據
apps_json_str = json.dumps(scanned_apps, ensure_ascii=False, indent=2)

# 如果沒有 app，顯示提示卡片
app_cards_html = ""
if not scanned_apps:
    app_cards_html = """
    <div class="no-results">
        🌈 您的 <code>apps/</code> 資料夾目前是空的喔！<br>
        將從 Gemini 下載的 HTML 網頁放到 <code>apps/</code>，再重新編譯，工具卡片就會出現在這裡囉！
    </div>
    """
else:
    for app in scanned_apps:
        tags_html = "".join([f'<span class="tag">#{t}</span>' for t in app["tags"]])
        if not tags_html:
            tags_html = '<span class="tag">#小工具</span>'
            
        app_cards_html += f"""
        <a class="card" href="{app["path"]}" data-category="{app["category"]}">
            <div>
                <div class="card-header">
                    <div class="card-icon">{app["icon"]}</div>
                    <div class="card-title-wrapper">
                        <h2 class="card-title">{app["title"]}</h2>
                        <span class="card-category">{app["category"]}</span>
                    </div>
                </div>
                <p class="card-desc">{app["description"]}</p>
            </div>
            <div class="card-footer">
                {tags_html}
                <button class="qr-btn" onclick="showQR(event, '{app["path"]}', '{app["title"]}')">📱 QR Code</button>
            </div>
        </a>
        """

# 渲染完整 HTML
output_html = html_template.format(
    site_title=config["site_title"],
    category_buttons=category_buttons,
    app_cards=app_cards_html,
    apps_json=apps_json_str,
    default_redirect=config["default_redirect"],
    redirect_delay=config["redirect_delay_seconds"]
)

# 寫入 index.html
with open("index.html", "w", encoding="utf-8") as f:
    f.write(output_html)

print("✨ 目錄編譯完成！已成功產生 index.html ✨")
print(f"📁 目前已偵測到 {len(scanned_apps)} 個 Canvas 小工具。")
