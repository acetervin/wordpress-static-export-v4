
import os
import re
import shutil

def migrate():
    # 1. Patterns to replace in HTML files
    # page_category.html -> shop.html?category=category
    # /page_category/ -> shop.html?category=category
    patterns = [
        (r'href=["\']/page_(.*?)\.html["\']', r'href="shop.html?category=\1"'),
        (r'href=["\']/page_(.*?)/["\']', r'href="shop.html?category=\1"'),
        (r'href=["\']page_(.*?)\.html["\']', r'href="shop.html?category=\1"'),
    ]

    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    print(f"Updating links in {len(html_files)} files...")
    
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
                print(f"Updated links: {file_path}")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")

    # 2. Move files to cleanupv3
    target_dir = 'cleanupv3'
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # List of file prefixes to move
    prefixes = ['page_', 'p-', 'ourteam-', 'testimonial-']
    
    # We also move page_id- files
    count = 0
    for f in os.listdir('.'):
        if any(f.startswith(p) for p in prefixes) and f.endswith('.html'):
            # Double check it's not our main template page_audio.html or similar if needed
            # But per user request, we move all 'page_' files
            try:
                shutil.move(f, os.path.join(target_dir, f))
                count += 1
            except Exception as e:
                print(f"Error moving {f}: {e}")

    print(f"\nMigration complete! Updated links and moved {count} files to {target_dir}/")

if __name__ == "__main__":
    migrate()
