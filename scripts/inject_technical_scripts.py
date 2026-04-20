import os

def inject_scripts():
    scripts = """
<!-- Technical Bridge for Rappod Child Theme -->
<script src="cart.js"></script>
<script src="add-to-cart.js"></script>
"""
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for file_name in html_files:
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        if 'cart.js' not in content:
            # Inject right before </body> to ensure theme JS has loaded
            new_content = content.replace('</body>', f"{scripts}</body>")
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected technical bridge into {file_name}")

if __name__ == "__main__":
    inject_scripts()
