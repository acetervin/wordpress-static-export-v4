
import re

def make_homepage_dynamic():
    with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Identify the product list container
    # We look for the div that contains the "slick-carousel" and items
    # We'll replace its inner content with a dynamic placeholder
    pattern = r'<div class="content products-list grid slick-carousel row".*?>(.*?)</div>\s*</div>\s*</div>'
    # We want to keep the container div but clear its children
    replacement = '<div id="homepage-grid" class="content products-list grid row"></div></div></div>'
    html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    # 2. Add the Homepage Dynamic Script
    home_script = """
<script>
async function loadHomeProducts() {
    try {
        const response = await fetch('products.json');
        const allProducts = await response.json();
        const grid = document.getElementById('homepage-grid');
        
        // Let's show the first 10 products for the homepage
        const displayProducts = allProducts.slice(0, 10);
        
        grid.innerHTML = displayProducts.map(p => `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="products-entry content-product1 clearfix product-wapper" style="margin-bottom: 20px;">
                    <div class="products-thumb">
                        <a href="product.html?product=${p.slug}">
                            <img src="${p.main_image}" class="wp-post-image" style="width: 100%; height: 200px; object-fit: cover;">
                        </a>
                    </div>
                    <div class="products-content" style="text-align: center; padding-top: 10px;">
                        <h3 class="product-title" style="font-size: 14px;"><a href="product.html?product=${p.slug}">${p.name}</a></h3>
                        <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${p.price}</bdi></span></span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error("Error loading homepage products:", e);
    }
}

// Handle the tabs (New Arrival, Best Sellers, etc.)
document.addEventListener('DOMContentLoaded', () => {
    loadHomeProducts();
    
    const tabs = document.querySelectorAll('.filter-orderby li');
    tabs.forEach(tab => {
        tab.onclick = function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // In a real setup, we would filter the JSON here
            // For now, we just refresh the newest products
            loadHomeProducts();
        };
    });
});
</script>
"""
    html = html.replace('</body>', home_script + '</body>')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Homepage is now dynamic and linked to products.json!")

if __name__ == "__main__":
    make_homepage_dynamic()
