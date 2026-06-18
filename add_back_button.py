import os
import re
import sys

# Force stdout to UTF-8
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

APPS_DIR = "apps"

BUTTON_TEMPLATE = """<!-- Start: Portal Back Button -->
<div id="portal-back-button" class="no-print" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999;">
  <a href="{relative_path}" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: rgba(15, 23, 42, 0.8); color: white; text-decoration: none; border-radius: 30px; font-family: system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(8px); transition: all 0.2s ease-in-out;" onmouseover="this.style.transform='scale(1.05)'; this.style.background='rgba(30, 41, 59, 0.9)';" onmouseout="this.style.transform='scale(1)'; this.style.background='rgba(15, 23, 42, 0.8)';">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    返回首頁
  </a>
</div>
<style>
  @media print {
    #portal-back-button {
      display: none !important;
    }
  }
</style>
<!-- End: Portal Back Button -->"""

pattern = re.compile(r"<!-- Start: Portal Back Button -->.*?<!-- End: Portal Back Button -->", re.DOTALL)

def inject_button(file_path):
    # Calculate relative path to root index.html
    rel_path_from_root = os.path.relpath(file_path, ".").replace("\\", "/")
    parts = rel_path_from_root.split('/')
    depth = len(parts) - 1
    
    # If the file is in apps/ itself, depth is 1, so link is "../index.html"
    # If in apps/subfolder/index.html, depth is 2, so link is "../../index.html"
    # If in root itself, depth is 0, so link is "index.html"
    relative_link = '../' * depth + 'index.html'
    
    button_html = BUTTON_TEMPLATE.replace("{relative_path}", relative_link)
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check if the block already exists
        if pattern.search(content):
            # Replace existing block
            new_content = pattern.sub(button_html, content)
            action = "Updated"
        else:
            # Inject before the LAST occurrence of </body>
            body_close_matches = list(re.finditer(r"</body>", content, re.IGNORECASE))
            if body_close_matches:
                last_match = body_close_matches[-1]
                idx = last_match.start()
                new_content = content[:idx] + "\n" + button_html + "\n" + content[idx:]
                action = "Injected before last </body> in"
            else:
                new_content = content + "\n" + button_html
                action = "Appended to the end of"
                
        # Only write if content changed
        if content != new_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"[{action}] {file_path}")
        else:
            print(f"[No change] {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    # Scan root folder for html files (excluding index.html itself)
    for file in os.listdir("."):
        if file.endswith(".html") and file != "index.html":
            inject_button(file)
            
    # Scan apps directory recursively
    if os.path.exists(APPS_DIR):
        for root, dirs, files in os.walk(APPS_DIR):
            # Skip git and cache directories
            if any(x in root for x in [".git", "__pycache__"]):
                continue
            for file in files:
                if file.endswith(".html"):
                    file_path = os.path.join(root, file)
                    inject_button(file_path)

if __name__ == "__main__":
    main()
