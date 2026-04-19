
import os
import re

def fix_broken_links():
    # Patterns for broken links like <a /product/slug/
    # We want to turn them into <a href="product.html?product=slug"
    
    # Also handle <a /page_id/123/ -> <a href="#" (since we don't have those pages)
    # OR if we know some of them, we can map them.
    
    # 1. Product links
    patterns = [
        (r'<a /product/(.*?)/', r'<a href="product.html?product=\1"'),
        (r'<a /page_id/(.*?)/', r'<a href="#"'), # Fallback for missing pages
    ]

    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    print(f"Fixing broken links in {len(html_files)} files...")
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, new_content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed broken links in: {file_path}")
        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    fix_broken_links()
