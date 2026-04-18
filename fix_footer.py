
import os
import re

def fix_footer_placement():
    # The new loader code with better styling and placement
    new_footer_loader = """
    <!-- Global Footer Component -->
    <div id="global-footer-container"></div>
    <script>
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('global-footer-container').innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    </script>
    """

    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'footer.html']
    
    print(f"Fixing footer placement in {len(html_files)} files...")
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # 1. Remove the old "bottom" injection
            content = content.replace('<!-- Global Footer Component -->', '')
            content = re.sub(r'<div id="global-footer-container"></div>.*?<\/script>', '', content, flags=re.DOTALL)
            
            # 2. Insert in the CORRECT spot: right after #bwp-main ends
            # We look for the closing div of bwp-main
            if '</div><!-- #main -->' in content:
                content = content.replace('</div><!-- #main -->', '</div><!-- #main -->' + new_footer_loader)
            elif '</div><!-- .bwp-main -->' in content:
                content = content.replace('</div><!-- .bwp-main -->', '</div><!-- .bwp-main -->' + new_footer_loader)
            elif '</div><!-- #page -->' in content:
                content = content.replace('</div><!-- #page -->', new_footer_loader + '</div><!-- #page -->')
            else:
                # Fallback to before </body> if no markers found
                content = content.replace('</body>', new_footer_loader + '</body>')

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    fix_footer_placement()
