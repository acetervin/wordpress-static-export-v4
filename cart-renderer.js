/**
 * Technical Renderer for Rappod Child Theme Cart Page
 * Populates the existing theme markup without modifying its structure.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('cart-items-body');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');

    if (!tbody) return;

    const cart = cartManager.getCart();

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 50px;">Your cart is currently empty. <a href="shop.html" style="color:#e46a4b; text-decoration:underline;">Shop now</a></td></tr>';
        if (subtotalEl) subtotalEl.textContent = '0.00';
        if (totalEl) totalEl.textContent = '0.00';
        return;
    }

    // Populate existing theme table structure
    tbody.innerHTML = cart.map(item => `
        <tr class="woocommerce-cart-form__cart-item cart_item">
            <td class="product-remove">
                <a href="#" class="remove" aria-label="Remove this item" data-product_id="${item.id}" onclick="event.preventDefault(); cartManager.removeItem('${item.id}')">×</a>
            </td>
            <td class="product-thumbnail">
                <a href="product.html?product=${item.slug}"><img width="300" height="300" src="${item.image}" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt=""></a>
            </td>
            <td class="product-name" data-title="Product">
                <a href="product.html?product=${item.slug}">${item.name}</a>
            </td>
            <td class="product-price" data-title="Price">
                <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${parseFloat(item.price).toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi></span>
            </td>
            <td class="product-quantity" data-title="Quantity">
                <div class="quantity">
                    <input type="number" class="input-text qty text" step="1" min="0" value="${item.quantity}" title="Qty" size="4" readonly style="border:1px solid #eee; padding:5px; width:50px; text-align:center;">
                </div>
            </td>
            <td class="product-subtotal" data-title="Subtotal">
                <span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${(parseFloat(item.price) * parseInt(item.quantity)).toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi></span>
            </td>
        </tr>
    `).join('');

    // Update Totals
    const total = cartManager.getTotal();
    if (subtotalEl) subtotalEl.textContent = total.toLocaleString('en-KE', {minimumFractionDigits: 2});
    if (totalEl) totalEl.textContent = total.toLocaleString('en-KE', {minimumFractionDigits: 2});
});
