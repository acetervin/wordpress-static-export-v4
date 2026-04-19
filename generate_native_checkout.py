import os
import re

def generate_checkout():
    if not os.path.exists('index.html'):
        return
        
    with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
        index_content = f.read()
        
    header_match = re.search(r'<!DOCTYPE.*?</header>', index_content, re.DOTALL | re.IGNORECASE)
    header = header_match.group(0) if header_match else ""
    
    footer_match = re.search(r'<footer.*?</html>', index_content, re.DOTALL | re.IGNORECASE)
    footer = footer_match.group(0) if footer_match else ""

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
        <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
            <div class="row">
                <div class="col-lg-12 col-md-12">    
                    <div id="main-content" class="main-content">
                        <div id="primary" class="content-area">
                            <div id="content" class="site-content" role="main">
                                <div class="woocommerce">
                                    <form name="checkout" method="post" class="checkout woocommerce-checkout" action="#">
                                        <div class="col2-set row" id="customer_details">
                                            <div class="col-lg-7 col-md-7 col-sm-12">
                                                <div class="woocommerce-billing-fields">
                                                    <h3>Billing details</h3>
                                                    <div class="woocommerce-billing-fields__field-wrapper">
                                                        <p class="form-row form-row-wide"><label>Full name <span class="required">*</span></label><input type="text" class="input-text" id="billing_first_name" placeholder="Full Name" value=""></p>
                                                        <p class="form-row form-row-wide"><label>Phone <span class="required">*</span></label><input type="tel" class="input-text" id="billing_phone" placeholder="Phone Number" value=""></p>
                                                        <p class="form-row form-row-wide"><label>Email address <span class="required">*</span></label><input type="email" class="input-text" id="billing_email" placeholder="Email Address" value=""></p>
                                                        <p class="form-row form-row-wide"><label>Town / City <span class="required">*</span></label><input type="text" class="input-text" id="billing_city" placeholder="City" value=""></p>
                                                        <p class="form-row form-row-wide"><label>Street address <span class="required">*</span></label><input type="text" class="input-text" id="billing_address_1" placeholder="House number and street name" value=""></p>
                                                    </div>
                                                </div>
                                                <div class="woocommerce-additional-fields">
                                                    <h3>Additional information</h3>
                                                    <div class="woocommerce-additional-fields__field-wrapper">
                                                        <p class="form-row notes"><label>Order notes (optional)</label><textarea id="order_comments" class="input-text" placeholder="Notes about your order, e.g. special notes for delivery." rows="2" cols="5"></textarea></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-12">
                                                <h3 id="order_review_heading">Your order</h3>
                                                <div id="order_review" class="woocommerce-checkout-review-order">
                                                    <table class="shop_table woocommerce-checkout-review-order-table">
                                                        <thead>
                                                            <tr><th class="product-name">Product</th><th class="product-total">Subtotal</th></tr>
                                                        </thead>
                                                        <tbody id="checkout-items-body">
                                                            <!-- Items injected by JS -->
                                                        </tbody>
                                                        <tfoot>
                                                            <tr class="cart-subtotal"><th>Subtotal</th><td><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="checkout-subtotal-val">0.00</span></bdi></span></td></tr>
                                                            <tr class="order-total"><th>Total</th><td><strong><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="checkout-total-val">0.00</span></bdi></span></strong></td></tr>
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
            </div>
        </div>
    </div>
    """

    full_content = header + checkout_markup + footer
    scripts = '\n<script src="cart.js"></script>\n<script src="whatsapp-checkout.js"></script>\n<script>\n document.addEventListener("DOMContentLoaded", () => {\n  const tbody = document.getElementById("checkout-items-body");\n  const cart = cartManager.getCart();\n  if (tbody && cart.length > 0) {\n   tbody.innerHTML = cart.map(item => `<tr><td class="product-name">${item.name} x ${item.quantity}</td><td class="product-total">KSh ${(item.price * item.quantity).toLocaleString("en-KE")}</td></tr>`).join("");\n   document.getElementById("checkout-subtotal-val").textContent = cartManager.getTotal().toLocaleString("en-KE");\n   document.getElementById("checkout-total-val").textContent = cartManager.getTotal().toLocaleString("en-KE");\n  }\n });\n</script>\n'
    full_content = full_content.replace('</body>', f"{scripts}</body>")
    
    with open('checkout.html', 'w', encoding='utf-8') as f:
        f.write(full_content)
    print("Generated native checkout.html")

if __name__ == "__main__":
    generate_checkout()
