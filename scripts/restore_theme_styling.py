import os
import re

def get_base_template():
    if not os.path.exists('index.html'):
        return None
    with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def restore_page(filename, page_title, body_class, content_markup):
    template = get_base_template()
    if not template:
        return

    # 1. Extract Header (up to </header>)
    header_match = re.search(r'<!DOCTYPE.*?</header>', template, re.DOTALL | re.IGNORECASE)
    header = header_match.group(0) if header_match else ""
    
    # 2. Extract Footer (from <footer to </html>)
    footer_match = re.search(r'<footer.*?</html>', template, re.DOTALL | re.IGNORECASE)
    footer = footer_match.group(0) if footer_match else ""

    # 3. Fix Body Class
    header = re.sub(r'<body class="[^"]*"', f'<body class="{body_class}"', header)
    
    # 4. Update Page Title in Breadcrumb/Heading if exists
    header = header.replace('Home 1', page_title)
    
    # 5. Assemble
    full_html = header + content_markup + footer
    
    # 6. Ensure Scripts are injected
    scripts = '\n<script src="cart.js"></script>\n'
    if filename == 'cart.html':
        scripts += '<script src="cart-renderer.js"></script>\n'
    elif filename == 'checkout.html':
        scripts += '<script src="whatsapp-checkout.js"></script>\n'
        # Add inline checkout summary script
        scripts += """
<script>
document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("checkout-items-body");
    if (tbody && typeof cartManager !== 'undefined') {
        const cart = cartManager.getCart();
        if (cart.length > 0) {
            tbody.innerHTML = cart.map(item => `
                <tr class="cart_item">
                    <td class="product-name">${item.name}&nbsp;<strong class="product-quantity">×&nbsp;${item.quantity}</strong></td>
                    <td class="product-total"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${(item.price * item.quantity).toLocaleString('en-KE', {minimumFractionDigits: 2})}</bdi></span></td>
                </tr>`).join("");
            const total = cartManager.getTotal().toLocaleString('en-KE', {minimumFractionDigits: 2});
            document.getElementById("checkout-subtotal-val").textContent = total;
            document.getElementById("checkout-total-val").textContent = total;
        }
    }
});
</script>
"""
    
    full_html = full_html.replace('</body>', f"{scripts}</body>")
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"Restored {filename} with theme styling.")

# --- Content Markups using Rappod/WooCommerce Native Classes ---

cart_markup = """
<div id="bwp-main" class="bwp-main">
    <div class="page-title bwp-title dark" style="background-image:url(/wp-content/uploads/2023/11/bg-breadcrumb.jpg);">
        <div class="container">	
            <div class="content-title-heading">
                <span class="back-to-shop">Shop</span>
                <h1 class="text-title-heading">Shopping Cart</h1>
            </div>
            <div id="breadcrumb" class="breadcrumb"><div class="bwp-breadcrumb"><a href="/">Home</a> <span class="delimiter"></span> <span class="current">Cart</span> </div></div>			
        </div>
    </div>
    <div id="main-content" class="main-content">
        <div id="primary" class="content-area container">
            <div id="content" class="site-content" role="main">
                <div class="woocommerce">
                    <div class="woocommerce-notices-wrapper"></div>
                    <form class="woocommerce-cart-form" action="#" method="post">
                        <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">
                            <thead>
                                <tr>
                                    <th class="product-remove">&nbsp;</th>
                                    <th class="product-thumbnail">&nbsp;</th>
                                    <th class="product-name">Product</th>
                                    <th class="product-price">Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id="cart-items-body">
                                <tr><td colspan="6" class="actions" style="text-align:center;padding:50px;">Loading your cart...</td></tr>
                            </tbody>
                        </table>
                    </form>
                    <div class="cart-collaterals">
                        <div class="cart_totals">
                            <h2>Cart totals</h2>
                            <table cellspacing="0" class="shop_table shop_table_responsive">
                                <tr class="cart-subtotal">
                                    <th>Subtotal</th>
                                    <td data-title="Subtotal"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="cart-subtotal-val">0.00</span></bdi></span></td>
                                </tr>
                                <tr class="order-total">
                                    <th>Total</th>
                                    <td data-title="Total"><strong><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="cart-total-val">0.00</span></bdi></span></strong></td>
                                </tr>
                            </table>
                            <div class="wc-proceed-to-checkout">
                                <a href="checkout.html" class="checkout-button button alt wc-forward">Proceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
"""

checkout_markup = """
<div id="bwp-main" class="bwp-main">
    <div class="page-title bwp-title dark" style="background-image:url(/wp-content/uploads/2023/11/bg-breadcrumb.jpg);">
        <div class="container">	
            <div class="content-title-heading">
                <span class="back-to-shop">Shop</span>
                <h1 class="text-title-heading">Checkout</h1>
            </div>
            <div id="breadcrumb" class="breadcrumb"><div class="bwp-breadcrumb"><a href="/">Home</a> <span class="delimiter"></span> <span class="current">Checkout</span> </div></div>			
        </div>
    </div>
    <div id="main-content" class="main-content">
        <div id="primary" class="content-area container">
            <div id="content" class="site-content" role="main">
                <div class="woocommerce">
                    <form name="checkout" method="post" class="checkout woocommerce-checkout" action="#" enctype="multipart/form-data">
                        <div class="col2-set row" id="customer_details">
                            <div class="col-lg-7 col-md-7 col-sm-12">
                                <div class="woocommerce-billing-fields">
                                    <h3>Billing details</h3>
                                    <div class="woocommerce-billing-fields__field-wrapper">
                                        <p class="form-row form-row-wide validate-required" id="billing_first_name_field">
                                            <label for="billing_first_name">Full name <abbr class="required" title="required">*</abbr></label>
                                            <span class="woocommerce-input-wrapper"><input type="text" class="input-text " name="billing_first_name" id="billing_first_name" placeholder="Full Name" value="" autocomplete="name"></span>
                                        </p>
                                        <p class="form-row form-row-wide validate-required validate-phone" id="billing_phone_field">
                                            <label for="billing_phone">Phone <abbr class="required" title="required">*</abbr></label>
                                            <span class="woocommerce-input-wrapper"><input type="tel" class="input-text " name="billing_phone" id="billing_phone" placeholder="Phone Number" value="" autocomplete="tel"></span>
                                        </p>
                                        <p class="form-row form-row-wide validate-required validate-email" id="billing_email_field">
                                            <label for="billing_email">Email address <abbr class="required" title="required">*</abbr></label>
                                            <span class="woocommerce-input-wrapper"><input type="email" class="input-text " name="billing_email" id="billing_email" placeholder="Email Address" value="" autocomplete="email"></span>
                                        </p>
                                        <p class="form-row form-row-wide validate-required" id="billing_city_field">
                                            <label for="billing_city">Town / City <abbr class="required" title="required">*</abbr></label>
                                            <span class="woocommerce-input-wrapper"><input type="text" class="input-text " name="billing_city" id="billing_city" placeholder="City" value="" autocomplete="address-level2"></span>
                                        </p>
                                        <p class="form-row form-row-wide validate-required" id="billing_address_1_field">
                                            <label for="billing_address_1">Street address <abbr class="required" title="required">*</abbr></label>
                                            <span class="woocommerce-input-wrapper"><input type="text" class="input-text " name="billing_address_1" id="billing_address_1" placeholder="House number and street name" value="" autocomplete="address-line1"></span>
                                        </p>
                                    </div>
                                </div>
                                <div class="woocommerce-additional-fields">
                                    <h3>Additional information</h3>
                                    <div class="woocommerce-additional-fields__field-wrapper">
                                        <p class="form-row notes" id="order_comments_field">
                                            <label for="order_comments">Order notes (optional)</label>
                                            <span class="woocommerce-input-wrapper"><textarea name="order_comments" class="input-text " id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5"></textarea></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-12">
                                <h3 id="order_review_heading">Your order</h3>
                                <div id="order_review" class="woocommerce-checkout-review-order">
                                    <table class="shop_table woocommerce-checkout-review-order-table">
                                        <thead>
                                            <tr>
                                                <th class="product-name">Product</th>
                                                <th class="product-total">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody id="checkout-items-body">
                                            <!-- Items injected by JS -->
                                        </tbody>
                                        <tfoot>
                                            <tr class="cart-subtotal">
                                                <th>Subtotal</th>
                                                <td><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="checkout-subtotal-val">0.00</span></bdi></span></td>
                                            </tr>
                                            <tr class="order-total">
                                                <th>Total</th>
                                                <td><strong><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="checkout-total-val">0.00</span></bdi></span></strong></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div id="payment" class="woocommerce-checkout-payment">
                                        <div class="form-row place-order">
                                            <button type="button" class="button alt" name="woocommerce_checkout_place_order" id="place_order" value="Place order" data-value="Place order">Send Order via WhatsApp</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
"""

if __name__ == "__main__":
    # Cart Page Body Class
    cart_body_class = "page-template-default page page-id-11 wp-theme-rappod wp-child-theme-rappod-child theme-rappod woocommerce-cart woocommerce-page woocommerce-no-js banners-effect-6 elementor-default elementor-kit-51270"
    restore_page('cart.html', 'Cart', cart_body_class, cart_markup)
    
    # Checkout Page Body Class
    checkout_body_class = "page-template-default page page-id-12 wp-theme-rappod wp-child-theme-rappod-child theme-rappod woocommerce-checkout woocommerce-page woocommerce-no-js banners-effect-6 elementor-default elementor-kit-51270"
    restore_page('checkout.html', 'Checkout', checkout_body_class, checkout_markup)
