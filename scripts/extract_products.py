
import os
import json
from pathlib import Path
from bs4 import BeautifulSoup

def extract_product_data(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # 1. Product Slug
    slug = Path(file_path).stem

    # 2. Product ID
    product_div = soup.find('div', id=lambda x: x and x.startswith('product-'))
    product_id = product_div['id'].replace('product-', '') if product_div else "unknown"

    # 3. Product Name
    name_tag = soup.find('h1', class_='product_title')
    name = name_tag.get_text(strip=True) if name_tag else slug.replace('product-', '').replace('-', ' ').title()

    # 4. Price
    price_tag = soup.find('div', class_='price') or soup.find('p', class_='price')
    price = "0.00"
    if price_tag:
        amount_tag = price_tag.find('span', class_='woocommerce-Price-amount')
        if amount_tag:
            price_text = amount_tag.get_text(strip=True)
            # Remove non-numeric characters except decimals
            price = ''.join(c for c in price_text if c.isdigit() or c == '.')
            # Handle cases where multiple prices might be present (e.g., range or sale)
            if '.' in price:
                parts = price.split('.')
                # Reconstruct first price found
                price = parts[0] + '.' + parts[1][:2]

    # 5. Main Image
    img_tag = soup.find('img', class_='wp-post-image')
    main_image = img_tag['src'] if img_tag and img_tag.has_attr('src') else ""

    # 6. Gallery Images
    gallery = []
    # Find images with data-thumb attribute
    gallery_divs = soup.find_all('div', attrs={"data-thumb": True})
    for div in gallery_divs:
        gallery.append(div['data-thumb'])
    
    # Fallback to specific catalog images if no data-thumb found
    if not gallery:
        gallery_imgs = soup.find_all('img', class_='attachment-shop_catalog')
        for img in gallery_imgs:
            if img.has_attr('src'):
                gallery.append(img['src'])

    gallery = list(dict.fromkeys(gallery)) # Remove duplicates

    # 7. Category
    cat_tag = soup.find('span', class_='posted_in')
    category = "Uncategorized"
    if cat_tag:
        cat_link = cat_tag.find('a')
        if cat_link:
            category = cat_link.get_text(strip=True)

    # 8. Short Description
    desc_div = soup.find('div', class_='woocommerce-product-details__short-description')
    short_description = desc_div.get_text(strip=True) if desc_div else ""

    return {
        "id": product_id,
        "slug": slug,
        "name": name,
        "price": price,
        "category": category,
        "main_image": main_image,
        "gallery": gallery,
        "short_description": short_description
    }

def main():
    products = []
    print("Starting product extraction...")
    
    product_files = [f for f in os.listdir('.') if f.startswith('product-') and f.endswith('.html')]
    
    if not product_files:
        print("No product-*.html files found.")
        return

    for i, file in enumerate(product_files):
        try:
            data = extract_product_data(file)
            products.append(data)
            if (i+1) % 50 == 0:
                print(f"Processed {i+1} files...")
        except Exception as e:
            print(f"Error processing {file}: {e}")

    output_file = 'products.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2)

    print(f"\nSuccess! Extracted {len(products)} products into {output_file}.")

if __name__ == "__main__":
    main()
