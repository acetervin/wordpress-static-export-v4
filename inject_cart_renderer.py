import os

def inject_renderer():
    script = '<script src="cart-renderer.js"></script>'
    file_name = 'cart.html'
    
    if os.path.exists(file_name):
        with open(file_name, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        if 'cart-renderer.js' not in content:
            new_content = content.replace('</body>', f"{script}</body>")
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected cart renderer into {file_name}")

if __name__ == "__main__":
    inject_renderer()
