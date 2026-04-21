import os
import re

def refine_nav():
    """
    Hides 'Products' and moves 'About Us' to the top level navigation.
    Ensures 'Blog' is present.
    """
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # 1. Pattern to identify the full <ul> menu
    # 2. Pattern to remove 'Products' <li>
    # 3. Pattern to remove 'About Us' from sub-menu
    # 4. Pattern to insert 'About Us' after 'Blog'
    
    products_li_pattern = r'<li[^>]*menu-item-51197.*?</li>'
    about_us_sub_li_pattern = r'<li[^>]*menu-item-51200.*?</li>'
    blog_li_pattern = r'(<li[^>]*menu-item-51198.*?</li>)'
    
    new_about_us_li = '<li class="level-0 menu-item-51200 menu-item-type-post_type menu-item-object-page mega-menu"><a href="about-us.html"><span class="menu-item-text">About Us</span></a></li>'

    for file_name in html_files:
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        # Remove Products
        content = re.sub(products_li_pattern, '', content, flags=re.DOTALL)
        
        # Remove About Us from sub-menu
        content = re.sub(about_us_sub_li_pattern, '', content, flags=re.DOTALL)
        
        # Insert About Us after Blog
        # We look for the Blog LI and append our new About Us LI after it
        if 'blog.html' in content:
            content = re.sub(blog_li_pattern, r'\1\n' + new_about_us_li, content, flags=re.DOTALL)
            
        if content != original_content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Refined navigation in {file_name}")

if __name__ == "__main__":
    refine_nav()
