/**
 * Technical Bridge for Shop Page
 * Handles dynamic product loading, filtering, and pagination.
 */

let allProducts = [];
const pageSize = 12;

async function loadShop() {
    console.log("loadShop triggered");
    try {
        const params = new URLSearchParams(window.location.search);
        // Use cached products from cartManager
        const allProducts = await cartManager.getProducts();
        const catFilter = params.get('category');
        const searchFilter = params.get('s');
        const sortFilter = params.get('orderby') || 'menu_order';
        const minPrice = parseFloat(params.get('min_price')) || 0;
        const maxPrice = parseFloat(params.get('max_price')) || 999999;
        const currentPage = parseInt(params.get('paged')) || 1;

        let filtered = [...allProducts];

        // 1. Category Filter
        if (catFilter) {
            const searchStr = catFilter.toLowerCase().replace(/[_-]/g, ' ');
            filtered = filtered.filter(p => {
                const pCat = p.category.toLowerCase().replace(/[_-]/g, ' ');
                const pSlug = p.slug.toLowerCase().replace(/[_-]/g, ' ');
                return pCat.includes(searchStr) || pSlug.includes(searchStr);
            });
        }

        // 2. Search Filter (s parameter)
        if (searchFilter) {
            const s = searchFilter.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(s) || 
                p.category.toLowerCase().includes(s) ||
                p.slug.toLowerCase().includes(s)
            );
        }

        // 3. Price Filter
        filtered = filtered.filter(p => {
            const price = parseFloat(p.price);
            return price >= minPrice && price <= maxPrice;
        });

        // 4. Sorting
        if (sortFilter === 'price') {
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortFilter === 'price-desc') {
            filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortFilter === 'popularity' || sortFilter === 'date' || sortFilter === 'rating') {
            filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        }

        const totalPages = Math.ceil(filtered.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const pageProducts = filtered.slice(start, start + pageSize);

        renderProducts(pageProducts);
        renderPagination(currentPage, totalPages, catFilter, sortFilter, minPrice, maxPrice, searchFilter);
        
        // Update Title
        const titleEl = document.querySelector('.text-title-heading');
        if (titleEl) {
            if (searchFilter) titleEl.textContent = `Search: ${searchFilter.toUpperCase()}`;
            else titleEl.textContent = catFilter ? catFilter.toUpperCase().replace(/[_-]/g, ' ') : 'SHOP';
        }

        // Update Sorting Label
        const sortLabels = {
            'menu_order': 'Default sorting',
            'popularity': 'Sort by popularity',
            'rating': 'Sort by average rating',
            'date': 'Sort by latest',
            'price': 'Sort by price: low to high',
            'price-desc': 'Sort by price: high to low'
        };
        const activeSortLabel = sortLabels[sortFilter] || 'Default sorting';
        const toggleBtn = document.querySelector('.pwb-dropdown-toggle');
        if (toggleBtn) toggleBtn.textContent = activeSortLabel;

    } catch (e) {
        console.error("Error loading shop products:", e);
    }
}

function renderProducts(products) {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="col-12"><p class="woocommerce-info">No products found matching your selection.</p></div>';
        return;
    }

    grid.innerHTML = products.map(p => `
        <li class="col-lg-4 col-md-4 col-sm-4 col-6 post-${p.id} product type-product status-publish has-post-thumbnail">
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
                </div>
                <div class="products-content">
                    <div class="contents">
                        <div class="rating none"><div class="star-rating none"></div><div class="review-count">0 review</div></div>
                        <h3 class="product-title"><a href="product.html?product=${p.slug}">${p.name}</a></h3>
                        <span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${p.price}</bdi></span></span>
                    </div>
                </div>
            </div>
        </li>
    `).join('');
}

function renderPagination(current, total, category, orderby, min, max, search) {
    const navs = document.querySelectorAll('.woocommerce-pagination');
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('s', search);
    if (orderby) params.set('orderby', orderby);
    if (min > 0) params.set('min_price', min);
    if (max < 999999) params.set('max_price', max);
    
    let html = '<ul class="page-numbers">';
    if (current > 1) {
        params.set('paged', current - 1);
        html += `<li><a class="prev page-numbers" href="shop.html?${params.toString()}">Prev</a></li>`;
    }

    for (let i = 1; i <= total; i++) {
        params.set('paged', i);
        if (i === current) {
            html += `<li><span class="page-numbers current">${i}</span></li>`;
        } else if (i <= 3 || i >= total - 2 || (i >= current - 1 && i <= current + 1)) {
            html += `<li><a class="page-numbers" href="shop.html?${params.toString()}">${i}</a></li>`;
        } else if (i === 4 || i === total - 3) {
            html += `<li><span class="page-numbers dots">...</span></li>`;
        }
    }
    
    if (current < total) {
        params.set('paged', current + 1);
        html += `<li><a class="next page-numbers" href="shop.html?${params.toString()}">Next</a></li>`;
    }
    html += '</ul>';
    navs.forEach(nav => nav.innerHTML = html);
}

// Sidebar Helpers
async function renderSidebarFeatured() {
    try {
        const allProducts = await cartManager.getProducts();
        const featuredList = document.querySelector('.bwp-feature-product_widget .content-products');
        if (!featuredList) return;
        const featured = allProducts.slice(0, 3);
        featuredList.innerHTML = featured.map(p => `
            <li class="item-product">
                <div class="item-thumb"><a href="product.html?product=${p.slug}"><img src="${p.main_image}" alt=""></a></div>
                <div class="content-bottom">
                    <div class="rating none"><div class="star-rating none"></div></div>
                    <div class="item-title"><a href="product.html?product=${p.slug}">${p.name}</a></div>
                    <div class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${p.price}</bdi></span></div>
                </div>
            </li>`).join('');
    } catch(e) {}
}

function setupSidebarListeners() {
    // Stop the theme's filter script
    const filterContainer = document.querySelector('.bwp-woocommerce-filter-product');
    if (filterContainer) filterContainer.id = 'technical-filter-bypass';

    // Categories (Sidebar, Top Carousel, and Archives)
    const allCatLinks = document.querySelectorAll('.bwp-filter-category a, .wp-block-categories-list a, .woocommerce-product-subcategories a');
        allCatLinks.forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            
            const url = new URL(this.href, window.location.origin);
            let cat = url.searchParams.get('category');
            
            if(!cat) {
                const href = this.getAttribute('href');
                if(href && href.includes('category=')) {
                    cat = href.split('category=')[1].split('&')[0];
                } else if (href && href.includes('product_cat=')) {
                    cat = href.split('product_cat=')[1].split('&')[0];
                } else {
                    cat = this.textContent.split('(')[0].trim().toLowerCase().replace(/\s+/g, '-');
                }
            }

            console.log("Filtering by category:", cat);
            
            // Clear search and price filters when explicitly selecting a category
            const params = new URLSearchParams();
            if (cat && cat !== 'shop' && cat !== 'all') params.set('category', cat);
            
            params.set('paged', '1');
            
            window.history.pushState({}, '', `shop.html?${params.toString()}`);
            loadShop();
            
            const mainContent = document.getElementById('bwp-main') || document.querySelector('.main-archive-product');
            if (mainContent) mainContent.scrollIntoView({ behavior: 'smooth' });
        }, true);
    });

    // Brands
    document.querySelectorAll('.bwp-filter-brand a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            const params = new URLSearchParams(window.location.search);
            params.set('paged', '1');
            window.history.pushState({}, '', `shop.html?${params.toString()}`);
            loadShop();
        }, true);
    });

    // Sorting
    document.querySelectorAll('.woocommerce-ordering a, .pwb-dropdown-menu li a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
            
            const url = new URL(this.href, window.location.origin);
            const orderby = url.searchParams.get('orderby');
            const params = new URLSearchParams(window.location.search);
            
            if (orderby) params.set('orderby', orderby);
            
            console.log("Sorting by:", orderby);
            window.history.pushState({}, '', `shop.html?${params.toString()}`);
            loadShop();

            // Force hide any loading skeletons the theme might have triggered
            const skeletons = document.querySelectorAll('.loading-filter, .bwp-filter-content:after, .main-archive-product:after');
            skeletons.forEach(s => s.style.display = 'none');
            document.body.classList.remove('loading');
        }, true);
    });

    // Price Filter Form
    const priceForm = document.getElementById('bwp_form_filter_product');
    if (priceForm) {
        priceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const minInput = document.getElementById('price-filter-min-text');
            const maxInput = document.getElementById('price-filter-max-text');
            if (!minInput || !maxInput) return;
            
            const min = minInput.value;
            const max = maxInput.value;
            const params = new URLSearchParams(window.location.search);
            params.set('min_price', min);
            params.set('max_price', max);
            window.history.pushState({}, '', `shop.html?${params.toString()}`);
            loadShop();
        });
        // Add a filter button if it's missing (themes often use auto-submit with AJAX)
        if (!priceForm.querySelector('button[type="submit"]')) {
            const btn = document.createElement('button');
            btn.type = 'submit';
            btn.textContent = 'Filter Price';
            btn.className = 'button';
            btn.style.marginTop = '10px';
            priceForm.appendChild(btn);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = '.loading-filter, .bwp-filter-content:after, .main-archive-product:after { display: none !important; }';
    document.head.appendChild(style);
    loadShop();
    renderSidebarFeatured();
    setupSidebarListeners();
});

window.addEventListener('popstate', loadShop);
