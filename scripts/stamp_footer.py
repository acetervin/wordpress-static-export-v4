
import os
import re

def stamp_footer():
    # 1. Read the real footer content
    with open('footer.html', 'r', encoding='utf-8', errors='ignore') as f:
        footer_content = f.read()

    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'footer.html']
    
    print(f"Hard-coding footer into {len(html_files)} files...")
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Pattern to find the previous loader block
            loader_pattern = r'<!-- Global Footer Component -->.*?<\/script>'
            
            if re.search(loader_pattern, content, flags=re.DOTALL):
                # Replace the loader with the actual HTML
                new_content = re.sub(loader_pattern, footer_content, content, flags=re.DOTALL)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Stamped: {file_path}")
            else:
                # If loader not found, try to insert in the fallback spot
                if '</div><!-- #main -->' in content:
                    new_content = content.replace('</div><!-- #main -->', '</div><!-- #main -->' + footer_content)
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Inserted Fallback: {file_path}")

        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    stamp_footer()
