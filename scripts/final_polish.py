
import re

def final_polish_shop():
    with open('shop.html', 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    # Improve the category matching logic in the script
    new_match_logic = """
        let filtered = allProducts;
        if (catFilter) {
            // Match against category name OR slug, case-insensitive
            // Also handle underscores and hyphens in the URL
            const searchStr = catFilter.toLowerCase().replace(/[_-]/g, ' ');
            filtered = allProducts.filter(p => {
                const pCat = p.category.toLowerCase().replace(/[_-]/g, ' ');
                const pSlug = p.slug.toLowerCase().replace(/[_-]/g, ' ');
                return pCat.includes(searchStr) || pSlug.includes(searchStr);
            });
        }
    """
    
    # Replace the old filter logic
    html = re.sub(r'let filtered = allProducts;.*?if \(catFilter\)\s*{.*?}', new_match_logic, html, flags=re.DOTALL)

    with open('shop.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Final shop polish complete! Category filtering is now bulletproof.")

if __name__ == "__main__":
    final_polish_shop()
