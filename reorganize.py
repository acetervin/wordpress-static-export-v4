
import os
import re
import shutil
from pathlib import Path

def get_canonical_url(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            match = re.search(r'<link rel="canonical" href="/\?(.*?)"', content)
            if match:
                return match.group(1)
            # Fallback for pages that might not have a query string canonical but have a title
            title_match = re.search(r'<title>(.*?) –', content)
            if title_match:
                return f"page_{title_match.group(1).lower().replace(' ', '_')}"
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return None

def main():
    qs_dir = Path('__qs')
    if not qs_dir.exists():
        print("No __qs directory found.")
        return

    mapping = {}
    
    # 1. Map all hashed folders to their real names
    print("Mapping files...")
    for folder in qs_dir.iterdir():
        if folder.is_dir():
            index_file = folder / 'index.html'
            if index_file.exists():
                url_param = get_canonical_url(index_file)
                if url_param:
                    # Clean up URL param to be a valid folder path
                    # e.g. product=bee-lunch-box -> product/bee-lunch-box
                    new_path = url_param.replace('=', '/').replace('&', '_')
                    mapping[str(folder)] = new_path

    # 2. Move files to their new locations
    print("Moving files...")
    for old_folder, new_rel_path in mapping.items():
        new_dir = Path(new_rel_path)
        new_dir.mkdir(parents=True, exist_ok=True)
        
        old_index = Path(old_folder) / 'index.html'
        new_index = new_dir / 'index.html'
        
        shutil.copy2(old_index, new_index)
        print(f"Moved {old_folder} -> {new_rel_path}")

    # 3. Update links in all HTML files
    print("Updating links...")
    all_html_files = list(Path('.').rglob('*.html'))
    
    # Prepare replacement patterns
    # We want to replace href="/?param=value" with href="/param/value/"
    for html_file in all_html_files:
        if html_file.name == 'reorganize.py': continue
        
        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Simple regex to find href="/?..."
            new_content = re.sub(r'href="/\?(.*?)"', r'href="/\1/"', content)
            # Replace = with / inside those matches
            def fix_link(match):
                link = match.group(1).replace('=', '/')
                return f'href="/{link}/"'
            
            new_content = re.sub(r'href="/\?(.*?)"', fix_link, new_content)
            
            if new_content != content:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
        except Exception as e:
            print(f"Error updating links in {html_file}: {e}")

    print("\nDone! You can now run 'python -m http.server' and the pages should work.")
    print("Example: If a link was /?product=bee-lunch-box, it is now /product/bee-lunch-box/")

if __name__ == "__main__":
    main()
