import os
import re

def restore_cart():
    # 1. Read index.html to get the real header and footer
    if not os.path.exists('index.html'):
        print("index.html not found")
        return
        
    with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
        index_content = f.read()
        
    # Extract header (everything from <!DOCTYPE to </header>)
    header_match = re.search(r'<!DOCTYPE.*?</header>', index_content, re.DOTALL | re.IGNORECASE)
    header = header_match.group(0) if header_match else ""
    
    # Extract footer (everything from <footer to </html>)
    footer_match = re.search(r'<footer.*?</html>', index_content, re.DOTALL | re.IGNORECASE)
    footer = footer_match.group(0) if footer_match else ""
    
    if not header or not footer:
        print("Could not extract header/footer from index.html")
        return

    # 2. Define the Native WooCommerce Cart Table Markup
    native_cart_markup = """
    <div id="bwp-main" class="bwp-main">
        <div class="page-title bwp-title dark" style="background-image:url(/wp-content/uploads/2023/11/bg-breadcrumb.jpg);">
            <div class="container">	
                <div class="content-title-heading">
                    <span class="back-to-shop">Shop</span>
                    <h1 class="text-title-heading">Cart</h1>
                </div>
                <div id="breadcrumb" class="breadcrumb"><div class="bwp-breadcrumb"><a href="/">Home</a> <span class="delimiter"></span> <span class="current">Cart</span> </div></div>			
            </div>
        </div>
        <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
            <div class="row">
                <div class="col-lg-12 col-md-12">    
                    <div id="main-content" class="main-content">
                        <div id="primary" class="content-area">
                            <div id="content" class="site-content" role="main">
                                <form class="woocommerce-cart-form" action="#" method="post">
                                    <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th class="product-remove">&nbsp;</th>
                                                <th class="product-thumbnail">&nbsp;</th>
                                                <th class="product-name">Product</th>
                                                <th class="product-price">Price</th>
                                                <th class="product-quantity">Quantity</th>
                                                <th class="product-subtotal">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody id="cart-items-body">
                                            <!-- Dynamic items injected by cart-renderer.js -->
                                            <tr><td colspan="6" style="text-align:center;padding:40px;">Loading cart...</td></tr>
                                        </tbody>
                                    </table>
                                </form>
                                <div class="cart-collaterals">
                                    <div class="cart_totals">
                                        <h2>Cart totals</h2>
                                        <table cellspacing="0" class="shop_table shop_table_responsive">
                                            <tr class="cart-subtotal">
                                                <th>Subtotal</th>
                                                <td><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="cart-subtotal-val">0.00</span></bdi></span></td>
                                            </tr>
                                            <tr class="order-total">
                                                <th>Total</th>
                                                <td><strong><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;<span id="cart-total-val">0.00</span></bdi></span></strong></td>
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
        </div>
    </div>
    """

    # 3. Assemble the full page
    full_content = header + native_cart_markup + footer
    
    # 4. Inject technical scripts before </body>
    scripts = '\n<script src="cart.js"></script>\n<script src="cart-renderer.js"></script>\n'
    full_content = full_content.replace('</body>', f"{scripts}</body>")
    
    with open('cart.html', 'w', encoding='utf-8') as f:
        f.write(full_content)
    print("Restored native cart.html with Rappod header/footer")

if __name__ == "__main__":
    restore_cart()
