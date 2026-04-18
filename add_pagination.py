
import re

def add_pagination_to_shop():
    with open('shop.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # Define the new script with pagination logic
    pagination_script = """
<script>
let allProducts = [];
const pageSize = 12;

async function loadShop() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        
        const params = new URLSearchParams(window.location.search);
        const catFilter = params.get('category');
        const currentPage = parseInt(params.get('paged')) || 1;
        
        let filtered = allProducts;
        if (catFilter) {
            filtered = allProducts.filter(p => p.category.toLowerCase().includes(catFilter.toLowerCase()));
        }

        const totalPages = Math.ceil(filtered.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const pageProducts = filtered.slice(start, end);

        renderProducts(pageProducts);
        renderPagination(currentPage, totalPages, catFilter);
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

function renderPagination(current, total, category) {
    const navs = document.querySelectorAll('.woocommerce-pagination');
    const catParam = category ? `&category=${encodeURIComponent(category)}` : '';
    
    let html = '<ul class="page-numbers">';
    
    if (current > 1) {
        html += `<li><a class="prev page-numbers" href="shop.html?paged=${current - 1}${catParam}">Prev</a></li>`;
    }

    for (let i = 1; i <= total; i++) {
        if (i === current) {
            html += `<li><span class="page-numbers current">${i}</span></li>`;
        } else if (i <= 3 || i >= total - 2 || (i >= current - 1 && i <= current + 1)) {
            html += `<li><a class="page-numbers" href="shop.html?paged=${i}${catParam}">${i}</a></li>`;
        } else if (i === 4 || i === total - 3) {
            html += `<li><span class="page-numbers dots">...</span></li>`;
        }
    }

    if (current < total) {
        html += `<li><a class="next page-numbers" href="shop.html?paged=${current + 1}${catParam}">Next</a></li>`;
    }
    
    html += '</ul>';
    
    navs.forEach(nav => nav.innerHTML = html);
}

function setupSidebarLinks() {
    const links = document.querySelectorAll('.widget_block .cat-item a, .filter_category_product a');
    links.forEach(a => {
        const catName = a.textContent.split('(')[0].trim();
        a.href = `shop.html?category=${encodeURIComponent(catName)}`;
    });
}

window.addEventListener('DOMContentLoaded', loadShop);
</script>
"""
    # Replace the old script (find the one we added in bake_pro_shop)
    html = re.sub(r'<script>\s*let allProducts = \[\];.*?<\/script>', pagination_script, html, flags=re.DOTALL)

    # Ensure there are pagination containers in the HTML
    if 'woocommerce-pagination' not in html:
        # Inject an empty pagination container if missing
        html = html.replace('</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="bwp-top-bar bottom clearfix">', 
                            '</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="bwp-top-bar bottom clearfix"><nav class="woocommerce-pagination"></nav>')

    with open('shop.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Pagination added successfully to the shop!")

if __name__ == "__main__":
    add_pagination_to_shop()
