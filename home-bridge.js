/**
 * Technical Bridge for Homepage
 * Handles dynamic product loading for the homepage grids/tabs.
 */

async function loadHomeProducts(filter = 'all') {
    try {
        const allProducts = await cartManager.getProducts();
        const grid = document.getElementById('homepage-grid');
        if (!grid) return;

        let displayProducts = [...allProducts];

        if (filter === 'popularity') {
            displayProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            displayProducts = displayProducts.slice(5, 15);
        } else if (filter === 'rating') {
            displayProducts.sort((a, b) => a.name.localeCompare(b.name));
            displayProducts = displayProducts.slice(0, 10);
        } else if (filter === 'featured') {
            displayProducts = displayProducts.reverse().slice(0, 10);
        } else {
            displayProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            displayProducts = displayProducts.slice(0, 10);
        }

        grid.innerHTML = displayProducts.map(p => `
            <div class="item col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="products-entry content-product1 clearfix product-wapper">
                    <div class="products-thumb">
                        <div class="product-lable"></div>
                        <a href="product.html?product=${p.slug}" class="woocommerce-LoopProduct-link">
                            <img width="300" height="300" src="${p.main_image}" class="fade-in lazyload wp-post-image" alt="${p.name}">
                        </a>
                        <div class="product-button">
                            <div class="type_simple" data-title="Add to cart">
                                <a rel="nofollow" href="#" data-quantity="1" data-product_id="${p.id}" class="button product_type_simple add_to_cart_button ajax_add_to_cart">
                                    <span>Add to cart</span>
                                </a>
                            </div>
                            <div class="woosw-wishlist" data-title="Wishlist">
                                <button class="woosw-btn woosw-btn-${p.id}" data-id="${p.id}">Add to wishlist</button>
                            </div>
                            <span class="product-quickview" data-title="Quick View">
                                <a href="#" data-product_id="${p.id}" class="quickview quickview-button quickview-${p.id}">
                                    <span>Quick View</span>
                                </a>
                            </span>
                        </div>
                        <div class="product-button-mobile">
                            <div class="woosw-wishlist" data-title="Wishlist">
                                <button class="woosw-btn woosw-btn-${p.id}" data-id="${p.id}">Add to wishlist</button>
                            </div>
                            <span class="product-quickview" data-title="Quick View">
                                <a href="#" data-product_id="${p.id}" class="quickview quickview-button quickview-${p.id}">
                                    <span>Quick View</span>
                                </a>
                            </span>
                        </div>
                    </div>
                    <div class="products-content">
                        <div class="contents">
                            <div class="rating none">
                                <div class="star-rating none"></div>
                                <div class="review-count">0 review</div>
                            </div>
                            <h3 class="product-title"><a href="product.html?product=${p.slug}">${p.name}</a></h3>
                            <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${p.price}</bdi></span></span>
                        </div>
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
    
    // Force hide any theme loading elements
    const style = document.createElement('style');
    style.textContent = '.loading-filter, .bwp-filter-content:after { display: none !important; } .bwp-filter-content.active:after { display: none !important; }';
    document.head.appendChild(style);

    const tabs = document.querySelectorAll('.filter-orderby li');
    tabs.forEach(tab => {
        // Use a more aggressive event listener
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const filterValue = this.getAttribute('data-value');
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            loadHomeProducts(filterValue);
        }, true); // Use capture phase
        
        // Also keep the onclick just in case
        tab.onclick = function(e) {
            if(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            return false;
        };
    });
});
