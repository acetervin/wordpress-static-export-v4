
import os
import re

def fix_html_files():
    # 1. List of files to fix
    # We fix all root HTML files
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # 2. Patterns to remove
    # We look for the Simply Static redirect block and other hijackers
    patterns_to_remove = [
        # Remove the Simply Static redirect logic if it exists as a script block
        r'<script>\s*\(function\(\)\s*{\s*if\s*\(window\.location\.origin.*?SimplyStatic\.redirect.*?<\/script>',
        # Remove any scripts that explicitly try to redirect to the home page based on URL
        r'window\.location\.href\s*=\s*[\'"]\/[\'"]',
    ]

    print(f"Cleaning redirects in {len(html_files)} files...")

    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            new_content = content
            
            # Remove the Simply Static redirect script that usually looks like this:
            # (Note: I'll use a more aggressive approach to find and kill the SimplyStatic object)
            new_content = re.sub(r'window\.SimplyStatic\s*=\s*{.*?};', 'window.SimplyStatic = { redirect: function(){} };', new_content, flags=re.DOTALL)
            
            # Also, look for the 'concatemoji' script which sometimes triggers redirects
            new_content = new_content.replace('window.location.reload', '// window.location.reload')

            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Cleaned: {file_path}")
        except Exception as e:
            print(f"Error fixing {file_path}: {e}")

if __name__ == "__main__":
    fix_html_files()
