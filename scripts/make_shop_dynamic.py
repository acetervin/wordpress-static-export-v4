
import re

def make_shop_dynamic():
    with open('shop.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Inject the product grid container into the entry-content div
    # We find the entry-content div which was empty
    grid_html = '<div id="shop-grid" class="products-list grid row"></div>'
    html = html.replace('<div class="entry-content clearfix">', '<div class="entry-content clearfix">' + grid_html)

    # 2. Add the Shop Loader Script before </body>
    shop_script = """
<script>
async function loadShop() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const grid = document.getElementById('shop-grid');
        
        grid.innerHTML = products.map(p => `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div class="products-entry content-product1 clearfix product-wapper" style="margin-bottom: 30px; border: 1px solid #eee; padding: 15px; border-radius: 8px; background: #fff; transition: transform 0.2s;">
                    <div class="products-thumb" style="overflow: hidden; border-radius: 4px;">
                        <a href="product.html?product=${p.slug}">
                            <img src="${p.main_image}" class="wp-post-image" style="width: 100%; height: 250px; object-fit: cover;">
                        </a>
                    </div>
                    <div class="products-content" style="padding-top: 15px; text-align: center;">
                        <h3 class="product-title" style="font-size: 16px; margin-bottom: 5px; height: 40px; overflow: hidden;">
                            <a href="product.html?product=${p.slug}" style="color: #333; font-weight: 600;">${p.name}</a>
                        </h3>
                        <span class="price">
                            <span class="woocommerce-Price-amount amount" style="color: #e46a4b; font-size: 18px; font-weight: 700;">
                                <span class="woocommerce-Price-currencySymbol">KSh</span> ${p.price}
                            </span>
                        </span>
                        <div style="margin-top: 15px;">
                            <a href="product.html?product=${p.slug}" class="button" style="background: #e46a4b; color: #fff; padding: 8px 20px; border-radius: 4px; display: inline-block;">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error("Error loading products:", e);
        document.getElementById('shop-grid').innerHTML = "<p>Error loading products. Please ensure you are viewing through a local server.</p>";
    }
}
window.addEventListener('DOMContentLoaded', loadShop);
</script>
"""
    html = html.replace('</body>', shop_script + '</body>')

    with open('shop.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Shop page is now dynamic and linked to products.json!")

if __name__ == "__main__":
    make_shop_dynamic()
