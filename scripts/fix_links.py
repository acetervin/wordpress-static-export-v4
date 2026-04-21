import os
import re

def fix_links():
    """
    Standardizes all navigation and structural links across the site.
    """
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Mapping of patterns to their correct static versions
    replacements = {
        # Navigation Links
        r'href=["\']https?://localhost/wordpress/["\']': 'href="index.html"',
        r'href=["\']https?://rappod\.wpbingosite\.com/?["\']': 'href="index.html"',
        r'href=["\']/(?!\w)["\']': 'href="index.html"', # Replaces href="/" with index.html
        
        r'href=["\']/shop\.html["\']': 'href="shop.html"',
        r'href=["\']/about-us\.html["\']': 'href="about-us.html"',
        r'href=["\']/contact\.html["\']': 'href="contact.html"',
        r'href=["\']/faq\.html["\']': 'href="faq.html"',
        r'href=["\']/cart\.html["\']': 'href="cart.html"',
        r'href=["\']/checkout\.html["\']': 'href="checkout.html"',
        r'href=["\']/my-account\.html["\']': 'href="my-account.html"',
        
        # Fixing Blog links that might still be #
        r'href=["\']#["\'](?=[^>]*><span class="menu-item-text">Blog</span>)': 'href="blog.html"',
        
        # Fixing My Account / Login links that might be #
        r'class="active-login" href=["\']#["\']': 'class="active-login" href="my-account.html"',
        
        # Fixing search and cart icons in mobile fixed header
        r'href=["\']#["\'](?=[^>]*><i class="feather-grid"></i>)': 'href="shop.html"',
    }

    for file_name in html_files:
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        for pattern, replacement in replacements.items():
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
            
        # Specific fix for the logo link if it's still /
        content = re.sub(r'<a href=["\']/["\']\s*rel=["\']home["\']', '<a href="index.html" rel="home"', content)
        
        if content != original_content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed links in {file_name}")

if __name__ == "__main__":
    fix_links()
