import os
import re

def polish_headers():
    """
    Surgically cleans up WordPress technical debt from HTML files.
    """
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Patterns to REMOVE
    remove_patterns = [
        r'<link rel=["\']alternate["\'] type=["\']application/rss\+xml["\'].*?>',
        r'<link rel=["\']alternate["\'] type=["\']application/atom\+xml["\'].*?>',
        r'<link rel=["\']dns-prefetch["\'].*?>',
        r'<link rel=["\']EditURI["\'].*?>',
        r'<link rel=["\']rsd["\'].*?>',
        r'<link rel=["\']wlwmanifest["\'].*?>',
        r'<link rel=["\']alternate["\'] title=["\']oEmbed.*?["\'].*?>',
        r'<meta name=["\']generator["\'].*?>',
        r'<script id=["\']wp-emoji-settings["\'].*?>.*?</script>',
        r'<script type=["\']module["\']>.*?wp-emoji-loader\.min\.js.*?</script>',
    ]
    
    # Pattern to handle duplicate bridge scripts (remove from bottom)
    duplicate_scripts_pattern = r'<!-- Technical Bridge for Rappod Child Theme -->\s*<script src=["\']cart\.js["\']></script>\s*<script src=["\']add-to-cart\.js["\']></script>'

    for file_name in html_files:
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Remove artifacts
        for pattern in remove_patterns:
            content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
            
        # 2. Remove duplicates from bottom
        content = re.sub(duplicate_scripts_pattern, '', content, flags=re.IGNORECASE)
        
        # 3. Clean up elementorFrontendConfig/AJAX URLs
        # Replace any lingering localhosts or admin-ajax.php with /#
        content = re.sub(r'https?://localhost/wordpress/wp-admin/admin-ajax\.php', '/#', content)
        content = re.sub(r'/wp-admin/admin-ajax\.php', '/#', content)
        
        # 4. Remove excessive whitespace left by removals
        content = re.sub(r'\n\s*\n', '\n', content)
        
        if content != original_content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Polished {file_name}")

if __name__ == "__main__":
    polish_headers()
