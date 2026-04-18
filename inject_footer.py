
import os

def inject_global_footer():
    footer_loader_html = """
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
    
    print(f"Injecting global footer into {len(html_files)} files...")
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # If footer already exists or is already injected, skip
            if 'id="global-footer-container"' in content:
                continue
                
            # Inject before the closing </body> tag
            if '</body>' in content:
                new_content = content.replace('</body>', footer_loader_html + '</body>')
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Injected: {file_path}")
        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    inject_global_footer()
