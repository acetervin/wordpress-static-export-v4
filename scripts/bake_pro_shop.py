
import re

def bake_pro_shop():
    # 1. Read the category page as our skeleton
    with open('page_bags_for_her.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 2. Update Title and Breadcrumbs
    html = html.replace('<title>BAGS FOR HER – StationaryCentralDepot</title>', '<title>Shop – StationaryCentralDepot</title>')
    html = html.replace('<h1 class="text-title-heading">\n\t\t\tBAGS FOR HER\t\t</h1>', '<h1 class="text-title-heading">\n\t\t\tShop\t\t</h1>')
    html = html.replace('<div class="breadcrumb"><a href="/">Home</a><span class="delimiter"></span>BAGS FOR HER</div>', 
                        '<div class="breadcrumb"><a href="/">Home</a><span class="delimiter"></span>Shop</div>')

    # 3. Find and Clear the static product list
    # We look for the <ul class="products ..."> tag and replace its content with an empty container
    pattern = r'<ul class="products products-list row grid".*?</ul>'
    replacement = '<ul id="shop-grid" class="products products-list row grid" data-col="col-lg-4 col-md-4 col-sm-4 col-6"></ul>'
    html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    # 4. Add the Dynamic Loader + Filter Script
    shop_script = """
<script>
let allProducts = [];

async function loadShop() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        
        // Handle Category Filtering from URL
        const params = new URLSearchParams(window.location.search);
        const catFilter = params.get('category');
        
        let displayProducts = allProducts;
        if (catFilter) {
            displayProducts = allProducts.filter(p => p.category.toLowerCase().includes(catFilter.toLowerCase()));
        }

        renderProducts(displayProducts);
        setupSidebarLinks();
    } catch (e) {
        console.error("Error loading products:", e);
    }
}

function renderProducts(products) {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <li class="col-lg-4 col-md-4 col-sm-4 col-6 post-${p.id} product type-product status-publish has-post-thumbnail">
            <div class="products-entry content-product1 clearfix product-wapper">
                <div class="products-thumb">
                    <a href="product.html?product=${p.slug}" class="woocommerce-LoopProduct-link">
                        <img width="300" height="300" src="${p.main_image}" class="fade-in lazyload wp-post-image" alt="${p.name}">
                    </a>
                    <div class="product-button">
                        <div class="type_simple" data-title="Add to cart">
                            <a href="product.html?product=${p.slug}" class="button"><span>View Product</span></a>
                        </div>
                    </div>
                </div>
                <div class="products-content">
                    <div class="contents">
                        <h3 class="product-title"><a href="product.html?product=${p.slug}">${p.name}</a></h3>
                        <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${p.price}</bdi></span></span>
                    </div>
                </div>
            </div>
        </li>
    `).join('');
}

function setupSidebarLinks() {
    // Make sidebar category links work with our system
    const links = document.querySelectorAll('.widget_block .cat-item a, .filter_category_product a');
    links.forEach(a => {
        const catName = a.textContent.split('(')[0].trim();
        a.href = `shop.html?category=${encodeURIComponent(catName)}`;
    });
}

window.addEventListener('DOMContentLoaded', loadShop);
</script>
"""
    html = html.replace('</body>', shop_script + '</body>')

    # 5. Clean up Simply Static redirects
    html = re.sub(r'window\.SimplyStatic\s*=\s*{.*?};', 'window.SimplyStatic = { redirect: function(){} };', html, flags=re.DOTALL)

    with open('shop.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Professional Shop Page baked successfully!")

if __name__ == "__main__":
    bake_pro_shop()
