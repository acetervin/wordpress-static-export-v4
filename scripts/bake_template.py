
import re

def bake_template():
    with open('product-bag.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # 1. Replace Title
    html = re.sub(r'<title>.*?</title>', '<title id="p-meta-title">Product Detail – StationaryCentralDepot</title>', html)

    # 2. Add the dynamic loader script to the head
    loader_script = """
<script>
async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    let slug = params.get('product');
    if (!slug) return;
    
    // Support both 'product-name' and just 'name'
    const response = await fetch('products.json');
    const products = await response.json();
    const p = products.find(item => item.slug === slug || item.slug === 'product-' + slug);

    if (p) {
        document.title = p.name + " – StationaryCentralDepot";
        
        // Basic Info
        const nameElems = document.querySelectorAll('.product_title, .breadcrumb [itemprop="breadcrumb"] span:last-child');
        nameElems.forEach(el => el.textContent = p.name);
        
        const priceElems = document.querySelectorAll('.woocommerce-Price-amount.amount');
        priceElems.forEach(el => {
            el.innerHTML = `<span class="woocommerce-Price-currencySymbol">KSh</span>&nbsp;${p.price}`;
        });

        // Category
        const catElems = document.querySelectorAll('.posted_in a, .breadcrumb a:nth-child(3)');
        catElems.forEach(el => el.textContent = p.category);

        // Images
        const mainImgs = document.querySelectorAll('.wp-post-image, .woocommerce-product-gallery__image img');
        mainImgs.forEach(img => {
            img.src = p.main_image;
            img.srcset = ""; // Clear srcset to force main image
        });

        // Gallery Thumbs
        const thumbCont = document.querySelector('.image-thumbnail');
        if (thumbCont && p.gallery.length > 0) {
            thumbCont.innerHTML = p.gallery.map(img => `
                <div class="img-thumbnail">
                    <span class="img-thumbnail-scroll">
                        <img width="800" height="800" src="${img}" class="attachment-shop_catalog size-shop_catalog">
                    </span>
                </div>
            `).join('');
        }

        // Product ID technical updates
        const productDiv = document.querySelector('.product.type-product');
        if (productDiv) {
            productDiv.id = "product-" + p.id;
            productDiv.className = productDiv.className.replace(/post-\d+/, "post-" + p.id);
        }
        
        // Update Add to Cart button
        const cartBtn = document.querySelector('input[name="add-to-cart"]');
        if (cartBtn) cartBtn.value = p.id;
        
        const wishlistBtn = document.querySelector('.woosw-btn');
        if (wishlistBtn) {
            wishlistBtn.setAttribute('data-id', p.id);
            wishlistBtn.className = wishlistBtn.className.replace(/woosw-btn-\d+/, "woosw-btn-" + p.id);
        }
    }
}
window.addEventListener('DOMContentLoaded', loadProduct);
</script>
    """
    html = html.replace('</head>', loader_script + '</head>')

    # 3. Clean up some static traces that might flicker
    html = html.replace('Bag', '...') # Placeholder for name
    
    with open('product.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Official product.html baked successfully!")

if __name__ == "__main__":
    bake_template()
