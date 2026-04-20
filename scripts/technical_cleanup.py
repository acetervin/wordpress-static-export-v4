import os
import re

def technical_cleanup():
    """
    Cleans up technical remnants (PHP, localhost) without modifying UI/CSS.
    """
    # Only target essential technical strings
    replacements = {
        r'http://localhost/wordpress': '',
        r'https://localhost/wordpress': '',
        r'localhost/wordpress': '',
        r'/wp-admin/admin-ajax\.php': '/#',
        r'\.php\?': '?',
        r'\.php': '',
    }

    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for file_name in html_files:
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        for pattern, replacement in replacements.items():
            content = re.sub(pattern, replacement, content)
            
        if content != original_content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Cleaned technical remnants in {file_name}")

if __name__ == "__main__":
    technical_cleanup()
