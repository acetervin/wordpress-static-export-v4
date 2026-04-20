import os

def verify():
    required_files = ['cart.js', 'add-to-cart.js', 'whatsapp-checkout.js', 'cart-renderer.js']
    missing = [f for f in required_files if not os.path.exists(f)]
    
    if missing:
        print(f"Error: Missing files: {missing}")
    else:
        print("All technical bridge files are present.")
        
    html_to_check = ['index.html', 'shop.html', 'product.html', 'cart.html']
    for html in html_to_check:
        if os.path.exists(html):
            with open(html, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if 'cart.js' in content:
                print(f"Verified: {html} has technical bridge injected.")
            else:
                print(f"Warning: {html} is missing technical bridge.")

if __name__ == "__main__":
    verify()
