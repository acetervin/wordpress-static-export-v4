
import os
import re
import shutil
from pathlib import Path

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def main():
    # 1. Map IDs to Pretty Names based on Titles
    print("Analyzing pages for pretty names...")
    url_map = {
        "/page_id=48771/": "/shop/",
        "/page_id=10/": "/shop/",
        "/page_id=11/": "/cart/",
        "/page_id=12/": "/checkout/",
        "/page_id=13/": "/my-account/",
        "/page_id=9095/": "/about-us/",
        "/page_id=15115/": "/contact/",
        "/page_id=14474/": "/faq/",
    }

    # Automatically find other product and page names
    for root, dirs, files in os.walk('.'):
        if 'wp-content' in root or 'wp-includes' in root: continue
        for file in files:
            if file == 'index.html':
                path = Path(root) / file
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    # Find canonical or title to build the map
                    # e.g. href="/?product=abc"
                    match = re.search(r'<link rel="canonical" href="/\?(.*?)"', content)
                    if match:
                        wp_url = "/?" + match.group(1)
                        # Pretty name logic
                        if 'product=' in wp_url:
                            pretty = "/product/" + wp_url.split('=')[1] + "/"
                        else:
                            # Try to get title for pages
                            title_match = re.search(r'<title>(.*?) –', content)
                            if title_match:
                                pretty = "/" + slugify(title_match.group(1)) + "/"
                            else:
                                pretty = wp_url.replace('=', '/').replace('?', '') + "/"
                        
                        # Store both the /? format and the /page_id= format
                        url_map[wp_url] = pretty
                        url_map[wp_url.replace('?', '')] = pretty
                        url_map["/" + wp_url.replace('?', '') + "/"] = pretty
                except:
                    pass

    # 2. Rename Folders to Pretty Names
    print("Creating pretty folders...")
    for wp_path, pretty_path in url_map.items():
        src = wp_path.strip('/')
        # Handle cases like product=abc or page_id=123
        src = src.replace('?', '').replace('=', '/')
        
        src_path = Path(src)
        dest_path = Path(pretty_path.strip('/'))
        
        if src_path.exists() and src_path.is_dir() and src != dest_path.as_posix():
            print(f"Moving {src_path} -> {dest_path}")
            dest_path.mkdir(parents=True, exist_ok=True)
            # Use dirs_exist_ok for Python 3.8+
            shutil.copytree(src_path, dest_path, dirs_exist_ok=True)

    # 3. Update all links in all files
    print("Updating all links to pretty format...")
    for root, dirs, files in os.walk('.'):
        if 'wp-content' in root or 'wp-includes' in root: continue
        for file in files:
            if file.endswith('.html'):
                path = Path(root) / file
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    new_content = content
                    
                    # Fix localhost links
                    new_content = new_content.replace('http://localhost/wordpress/rappod/', '/')
                    new_content = new_content.replace('https://rappod.wpbingosite.com/', '/')
                    
                    # Apply our URL map
                    for wp_link, pretty_link in url_map.items():
                        # Replace various formats of the link
                        new_content = new_content.replace(f'href="{wp_link}"', f'href="{pretty_link}"')
                        # Also catch links that might have been partially converted by previous scripts
                        mid_link = wp_link.replace('?', '').replace('=', '/')
                        new_content = new_content.replace(f'href="{mid_link}"', f'href="{pretty_link}"')
                        new_content = new_content.replace(f'href="/{mid_link}"', f'href="{pretty_link}"')

                    # One final generic fix for any remaining page_id= or product=
                    new_content = re.sub(r'href="/\??page_id=(\d+)/?"', r'/page_id/\1/', new_content)
                    new_content = re.sub(r'href="/\??product=(.*?)/?"', r'/product/\1/', new_content)

                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error updating {path}: {e}")

    print("\nSuccess! Your site now uses Pretty Links.")
    print("Shop is at: /shop/")
    print("Products are at: /product/name/")
if __name__ == "__main__":
    main()
