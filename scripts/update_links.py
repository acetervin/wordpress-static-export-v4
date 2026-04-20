
import os
import re

def update_links():
    # Regex to find product links: product-NAME.html
    # We want to catch "product-bag.html" and turn it into "product.html?product=bag"
    pattern = r'href=["\'](product-.*?)\.html["\']'
    replacement = r'href="product.html?product=\1"'

    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    print(f"Updating links in {len(html_files)} files...")
    
    for file_path in html_files:
        # Skip the template itself
        if file_path == 'product.html': continue
        
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Use re.sub to find product-*.html and replace it
            # We capture the full name "product-bag" and use it in the query param
            new_content = re.sub(pattern, replacement, content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated: {file_path}")
        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    update_links()
