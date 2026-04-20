
import os
import re
from pathlib import Path

def cleanup_html(file_path):
    print(f"Cleaning up {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # 1. Block the reload loop
        # We inject a script at the start of <head> to neuter location.reload and other redirectors
        blocker_script = """
<script>
    // Prevent WordPress/WooCommerce from hijacking the static site routing
    (function() {
        const noop = () => {};
        // window.location.reload = noop; // Be careful with this, but helpful if loops persist
        window.history.pushState = noop;
        window.history.replaceState = noop;
        
        // Block Simply Static's own redirect logic if it still exists
        window.SimplyStatic = { redirect: noop };
    })();
</script>
"""
        if '<head>' in content:
            content = content.replace('<head>', '<head>' + blocker_script)
        else:
            content = blocker_script + content

        # 2. Fix hardcoded domain links
        # Replace https://rappod.wpbingosite.com/ with /
        content = content.replace('https://rappod.wpbingosite.com/', '/')
        
        # 3. Clean up the query string links to the new folder structure (double check)
        # href="/?product=abc" -> href="/product/abc/"
        def fix_query_links(match):
            param = match.group(1).replace('=', '/')
            return f'href="/{param}/"'
        
        content = re.sub(r'href="/\?(.*?)"', fix_query_links, content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    except Exception as e:
        print(f"Error cleaning {file_path}: {e}")

def main():
    # Process the root index.html
    cleanup_html('index.html')
    
    # Process all nested index.html files
    for root, dirs, files in os.walk('.'):
        if 'wp-content' in root or 'wp-includes' in root: continue
        for file in files:
            if file == 'index.html' and root != '.':
                cleanup_html(os.path.join(root, file))

    print("\nCleanup Complete! Try running 'python -m http.server 8000' now.")

if __name__ == "__main__":
    main()
