/**
 * Technical Bridge for Rappod Child Theme Cart
 * Preserves all theme UI and handles data merging
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Technical Event Delegation for Theme Buttons
    // This matches the theme's native .add_to_cart_button and .single_add_to_cart_button
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add_to_cart_button, .single_add_to_cart_button');
        if (!btn) return;

        // Don't block if it's a real link we want to follow, 
        // but most WooCommerce buttons are ajax or form-based
        if (btn.classList.contains('ajax_add_to_cart') || btn.tagName === 'BUTTON') {
            e.preventDefault();
        }

        const productId = btn.getAttribute('data-product_id') || 
                          document.querySelector('input[name="add-to-cart"]')?.value;
        
        if (!productId) return;

        // Get quantity from theme's native .qty input
        const qtyInput = btn.closest('.product, .products-entry')?.querySelector('.qty') || 
                         document.querySelector('.qty');
        const quantity = parseInt(qtyInput?.value) || 1;

        // Merge data from products.json
        fetch('products.json')
            .then(res => res.json())
            .then(products => {
                const product = products.find(p => String(p.id) === String(productId));
                if (product) {
                    cartManager.addToCart({
                        ...product,
                        quantity: quantity
                    });
                    // Trigger theme's native success feedback if possible, 
                    // or use our non-intrusive notification
                    showThemeNotification(product.name);
                }
            });
    });

    function showThemeNotification(name) {
        const msg = document.createElement('div');
        msg.style.cssText = 'position:fixed;top:20px;right:20px;background:#e46a4b;color:#fff;padding:15px 25px;z-index:9999;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-weight:600;';
        msg.textContent = `🛒 ${name} added to cart`;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }
});
