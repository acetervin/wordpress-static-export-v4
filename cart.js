/**
 * Technical Data Manager for Rappod Child Theme
 * Handles cart data storage and merging without modifying UI.
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
     * Hooks into Rappod's native .cart-count, .top-total-cart, and mini-cart popup
     */
    updateThemeUI() {
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

        // 4. Update Mini-Cart Popup Content (Theme Native Markup)
        const miniCartContainers = document.querySelectorAll('.cart-popup .cart-header-form .shop_table');
        miniCartContainers.forEach(container => {
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="empty">
                        <span>Your cart is currently empty.</span>
                        <a class="go-shop" href="/shop.html">Shop all products</a>
                    </div>`;
            } else {
                // Use theme's expected structure for mini-cart items
                let html = '<ul class="cart_list product_list_widget">';
                cart.forEach(item => {
                    html += `
                        <li class="mini_cart_item">
                            <a href="#" class="remove" onclick="event.preventDefault(); cartManager.removeItem('${item.id}')">×</a>
                            <a href="product.html?product=${item.slug}">
                                <img width="300" height="300" src="${item.image}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="">${item.name}
                            </a>
                            <span class="quantity">${item.quantity} × <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${item.price.toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi></span></span>
                        </li>`;
                });
                html += '</ul>';
                html += `
                    <p class="woocommerce-mini-cart__total total">
                        <strong>Subtotal:</strong> <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${total.toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi></span>
                    </p>
                    <p class="woocommerce-mini-cart__buttons buttons">
                        <a href="cart.html" class="button wc-forward">View cart</a>
                        <a href="checkout.html" class="button checkout wc-forward">Checkout</a>
                    </p>`;
                container.innerHTML = html;
            }
        });
    },

    removeItem(id) {
        let cart = this.getCart();
        cart = cart.filter(item => String(item.id) !== String(id));
        this.saveCart(cart);
        // If we're on the main cart page, reload to sync
        if (window.location.pathname.includes('cart.html')) {
            window.location.reload();
        }
    }
};

// Auto-initialize UI on load
document.addEventListener('DOMContentLoaded', () => cartManager.updateThemeUI());
