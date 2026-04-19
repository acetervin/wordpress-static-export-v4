
import os
import re

def fix_category_links():
    # Pattern 1: href="/product_cat=slug/"
    # Pattern 2: href="/product_cat=slug&.../"
    patterns = [
        (r'href=["\']/product_cat=(.*?)/["\']', r'href="shop.html?category=\1"'),
        (r'href=["\']/\?product_cat=(.*?)(&|["\'])', r'href="shop.html?category=\1\2"'),
        (r'href=["\']/\?product_cat=(.*?)["\']', r'href="shop.html?category=\1"'),
    ]

    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    print(f"Fixing category links in {len(html_files)} files...")
    
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
                print(f"Fixed: {file_path}")
        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    fix_category_links()
