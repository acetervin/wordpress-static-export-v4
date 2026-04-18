
import os
import re
import shutil
from pathlib import Path

def main():
    html_mapping = {}
    
    # 1. Find all index.html files in subfolders (excluding wp-content/wp-includes)
    print("Mapping files to root names...")
    for root, dirs, files in os.walk('.'):
        # Skip system folders
        if any(x in root for x in ['wp-content', 'wp-includes', '__qs', '.git']):
            continue
            
        if 'index.html' in files and root != '.':
            # Create a name based on the path
            # e.g. ./product/bee-lunch-box -> product-bee-lunch-box.html
            rel_path = os.path.relpath(root, '.')
            new_name = rel_path.replace(os.sep, '-').strip('-') + '.html'
            
            # Special case for shop
            if new_name == 'shop.html' or 'page_id-48771' in new_name or 'page_id-10' in new_name:
                new_name = 'shop.html'
                
            old_path = os.path.join(root, 'index.html')
            new_path = os.path.join('.', new_name)
            
            html_mapping[rel_path] = new_name
            
            # Move the file
            print(f"Moving {old_path} -> {new_path}")
            shutil.copy2(old_path, new_path)

    # 2. Update all links in all HTML files now in the root
    print("Updating all links to flat structure...")
    all_root_html = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for html_file in all_root_html:
        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            new_content = content
            
            # Replace folder links with .html links
            # We sort by length descending to avoid partial matches (e.g. /product/ before /product/name/)
            sorted_folders = sorted(html_mapping.keys(), key=len, reverse=True)
            
            for folder in sorted_folders:
                new_html = html_mapping[folder]
                # Match href="/folder/" or href="/folder"
                new_content = new_content.replace(f'href="/{folder}/"', f'href="/{new_html}"')
                new_content = new_content.replace(f'href="/{folder}"', f'href="/{new_html}"')
            
            # Also fix any remaining page_id or product= links just in case
            new_content = re.sub(r'href="/\??page_id=(\d+)/?"', r'page_id-\1.html', new_content)
            new_content = re.sub(r'href="/\??product=(.*?)/?"', r'product-\1.html', new_content)

            if new_content != content:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
        except Exception as e:
            print(f"Error updating {html_file}: {e}")

    print("\nFlat structure complete! All pages are now in the root folder.")
    print("You can now open shop.html, about-us.html, etc., directly.")

if __name__ == "__main__":
    main()
