import os
import re

def build_layout():
    """
    Synchronizes header.html and footer.html components across all pages.
    """
    header_path = 'components/header.html'
    footer_path = 'components/footer.html'
    
    if not os.path.exists(header_path) or not os.path.exists(footer_path):
        print("Error: Component files not found.")
        return

    with open(header_path, 'r', encoding='utf-8') as f:
        master_header = f.read().strip()
    
    with open(footer_path, 'r', encoding='utf-8') as f:
        master_footer = f.read().strip()

    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['header.html', 'footer.html']]
    
    # Regex for header: matches from <header id="bwp-header" to </header><!-- End #bwp-header -->
    header_re = re.compile(r'<header id="bwp-header".*?</header>(?:<!-- End #bwp-header -->)?', re.DOTALL | re.IGNORECASE)
    
    # Regex for footer: matches from <footer id="bwp-footer" to </footer>
    footer_re = re.compile(r'<footer id="bwp-footer".*?</footer>', re.DOTALL | re.IGNORECASE)

    for file_name in html_files:
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Update Header
        if header_re.search(content):
            file_header = master_header
            # Remove all existing current-menu-item classes
            file_header = re.sub(r'\s*current-menu-item|\s*current_page_item|\s*current-menu-ancestor|\s*current-menu-parent', '', file_header)
            
            # Add current-menu-item to the correct link
            if file_name == 'index.html':
                file_header = file_header.replace('menu-item-51195', 'menu-item-51195 current-menu-item')
            elif file_name == 'shop.html':
                file_header = file_header.replace('menu-item-51196', 'menu-item-51196 current-menu-item')
            elif file_name == 'blog.html' or file_name == 'blog-details.html':
                file_header = file_header.replace('menu-item-51198', 'menu-item-51198 current-menu-item')
            elif file_name == 'about-us.html':
                file_header = file_header.replace('menu-item-51200', 'menu-item-51200 current-menu-item')
            elif file_name == 'contact.html':
                file_header = file_header.replace('menu-item-51201', 'menu-item-51201 current-menu-item')
            elif file_name == 'faq.html':
                file_header = file_header.replace('menu-item-51202', 'menu-item-51202 current-menu-item')
                
            content = header_re.sub(file_header, content)
        else:
            print(f"Warning: No header found in {file_name}")

        # 2. Update Footer
        if footer_re.search(content):
            content = footer_re.sub(master_footer, content)
        else:
            print(f"Warning: No footer found in {file_name}")

        if content != original_content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Synchronized layout in {file_name}")

if __name__ == "__main__":
    build_layout()
