/**
 * Technical Data Manager for Rappod Child Theme
 * Handles cart data storage and merging while strictly preserving theme UI.
 */

const cartManager = {
    cartKey: 'stationaryDepotCart_v1',
    
    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
        } catch (e) {
            return [];
        }
    },
    
    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.updateThemeUI();
    },
    
    addToCart(product) {
        const cart = this.getCart();
        const existing = cart.find(item => String(item.id) === String(product.id));
        
        if (existing) {
            existing.quantity += (product.quantity || 1);
        } else {
            cart.push({
                id: String(product.id),
                name: product.name,
                price: parseFloat(product.price) || 0,
                image: product.main_image || product.image,
                quantity: product.quantity || 1,
                slug: product.slug
            });
        }
        this.saveCart(cart);
    },
    
    getTotal() {
        return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    getCount() {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },
    
    /**
     * Technical Update for Theme UI
     * Reconstructs the Rappod mini-cart using exact theme classes and structure.
     */
    updateThemeUI() {
        try {
            const count = this.getCount();
            const total = this.getTotal();
            const cart = this.getCart();
            
            // 1. Update all theme cart count badges
            document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
            
            // 2. Update theme's native cart summary text
            document.querySelectorAll('.top-total-cart').forEach(el => {
                el.textContent = `Shopping Cart(${count})`;
            });
            
            // 3. Update woocommerce header data attribute
            document.querySelectorAll('.woocommerce-cart-header').forEach(el => {
                el.setAttribute('data-count', count);
            });

            // 4. Update Mini-Cart Popup Content (Rappod Theme Exact Markup)
            const miniCartForms = document.querySelectorAll('.cart-popup .cart-header-form');
            miniCartForms.forEach(form => {
                const container = form.querySelector('.shop_table');
                if (!container) return;

                if (cart.length === 0) {
                    container.innerHTML = `
                        <div class="empty">
                            <span>Your cart is currently empty.</span>
                            <a class="go-shop" href="shop.html">Shop all products</a>
                        </div>`;
                    
                    // Clear the footer if it exists
                    const cartDetails = form.closest('.cart-details');
                    if (cartDetails && cartDetails.nextElementSibling) {
                        const widgetFooter = cartDetails.nextElementSibling.querySelector('.widget_shopping_cart_content');
                        if (widgetFooter) widgetFooter.innerHTML = '<div class="ajaxcart__footer"></div>';
                    }
                } else {
                    // Rappod Theme Native List Markup
                    let listHtml = '<ul class="cart_list product_list_widget ">';
                    cart.forEach(item => {
                        listHtml += `
                            <li class="mini_cart_item">
                                <a href="#" class="remove remove_from_cart_button" aria-label="Remove this item" onclick="event.preventDefault(); cartManager.removeItem('${item.id}')">×</a>
                                <a href="product.html?product=${item.slug}">
                                    <img width="300" height="300" src="${item.image}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="">
                                    ${item.name}
                                </a>
                                <span class="quantity">${item.quantity} × <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${item.price.toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi></span></span>
                            </li>`;
                    });
                    listHtml += '</ul>';
                    container.innerHTML = listHtml;

                    // Update the Widget Footer (Total and Buttons)
                    const cartDetails = form.closest('.cart-details');
                    if (cartDetails && cartDetails.nextElementSibling) {
                        const widgetFooter = cartDetails.nextElementSibling.querySelector('.widget_shopping_cart_content');
                        if (widgetFooter) {
                            widgetFooter.innerHTML = `
                                <p class="woocommerce-mini-cart__total total">
                                    <strong>Subtotal:</strong> 
                                    <span class="woocommerce-Price-amount amount">
                                        <bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${total.toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi>
                                    </span>
                                </p>
                                <p class="woocommerce-mini-cart__buttons buttons">
                                    <a href="cart.html" class="button wc-forward">View cart</a>
                                    <a href="checkout.html" class="button checkout wc-forward">Checkout</a>
                                </p>
                                <div class="ajaxcart__footer"></div>`;
                        }
                    }
                }
            });
        } catch (err) {
            console.warn("[Bridge] Non-critical error updating UI:", err);
        }
    },

    removeItem(id) {
        let cart = this.getCart();
        cart = cart.filter(item => String(item.id) !== String(id));
        this.saveCart(cart);
        // Sync main cart page if active
        if (window.location.pathname.includes('cart.html')) {
            window.location.reload();
        }
    },

    async getProducts() {
        if (window._productCache) return window._productCache;
        
        // Use the current script's location to find the root
        const scriptTag = document.querySelector('script[src*="cart.js"]');
        const scriptPath = scriptTag ? scriptTag.src.split('cart.js')[0] : './';
        
        const paths = [
            'products.json',
            scriptPath + 'products.json',
            '/products.json',
            '../products.json'
        ];
        
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    window._productCache = await response.json();
                    console.log(`[Bridge] Successfully loaded ${window._productCache.length} products from ${path}`);
                    return window._productCache;
                }
            } catch (e) {
                // Silently continue to next path
            }
        }
        
        console.error("[Bridge] Critical: Failed to fetch products.json from any known path. Shop features will be disabled.");
        window._productCache = [];
        return [];
    },

    /**
     * Phase 4: Static Quick View Implementation
     */
    initQuickView() {
        // Create modal if it doesn't exist
        if (!document.getElementById('bwp-quickview-modal')) {
            const modal = document.createElement('div');
            modal.id = 'bwp-quickview-modal';
            modal.style.cssText = 'display:none; position:fixed; z-index:10000; left:0; top:0; width:100%; height:100%; background-color:rgba(0,0,0,0.6); align-items:center; justify-content:center;';
            modal.innerHTML = `
                <div style="background:#fff; width:90%; max-width:800px; max-height:90vh; overflow-y:auto; position:relative; padding:30px; border-radius:8px; display:flex; flex-wrap:wrap; gap:30px;">
                    <span id="close-quickview" style="position:absolute; right:20px; top:10px; font-size:28px; cursor:pointer; font-weight:bold;">&times;</span>
                    <div style="flex:1; min-width:300px;"><img id="qv-image" src="" style="width:100%; border-radius:4px;"></div>
                    <div style="flex:1; min-width:300px;">
                        <h2 id="qv-name" style="margin-top:0;"></h2>
                        <p id="qv-price" style="font-size:24px; color:#e46a4b; font-weight:700; margin:20px 0;"></p>
                        <div id="qv-desc" style="margin-bottom:20px; color:#666;"></div>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="number" id="qv-qty" value="1" min="1" style="width:60px; padding:8px; border:1px solid #ddd; border-radius:4px;">
                            <button id="qv-add-btn" class="button" style="background:#e46a4b; color:#fff; border:none; padding:10px 25px; border-radius:4px; cursor:pointer; font-weight:600;">Add to Cart</button>
                        </div>
                    </div>
                </div>`;
            document.body.appendChild(modal);

            document.getElementById('close-quickview').onclick = () => modal.style.display = 'none';
            modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
        }

        // Global listener for quickview buttons
        document.addEventListener('click', async (e) => {
            const btn = e.target.closest('.quickview-button, .quickview');
            if (!btn) return;
            e.preventDefault();

            const productId = btn.getAttribute('data-product_id');
            const products = await this.getProducts();
            const p = products.find(item => String(item.id) === String(productId));

            if (p) {
                document.getElementById('qv-image').src = p.main_image;
                document.getElementById('qv-name').textContent = p.name;
                document.getElementById('qv-price').innerHTML = `KSh ${p.price}`;
                document.getElementById('qv-desc').textContent = p.short_description || 'Premium quality stationery product.';
                
                const addBtn = document.getElementById('qv-add-btn');
                addBtn.onclick = () => {
                    const qty = parseInt(document.getElementById('qv-qty').value) || 1;
                    this.addToCart({...p, quantity: qty});
                    document.getElementById('bwp-quickview-modal').style.display = 'none';
                    // Show notification (assuming it's defined in add-to-cart.js or globally)
                    if (window.showThemeNotification) window.showThemeNotification(p.name);
                };
                
                document.getElementById('bwp-quickview-modal').style.display = 'flex';
            }
        });
    }
};

// Auto-initialize UI on load
document.addEventListener('DOMContentLoaded', () => {
    cartManager.updateThemeUI();
    cartManager.initQuickView();
});
