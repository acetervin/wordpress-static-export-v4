
import os
import shutil
from pathlib import Path

def main():
    # 1. We know page_id/48771 is the real SHOP.
    # We need to make sure page_id/10 also exists and has the same content.
    shop_src = Path('page_id/48771')
    shop_dest = Path('page_id/10')
    
    if shop_src.exists():
        print(f"Syncing Shop: {shop_src} -> {shop_dest}")
        shop_dest.mkdir(parents=True, exist_ok=True)
        for item in shop_src.iterdir():
            if item.is_file():
                shutil.copy2(item, shop_dest / item.name)
    
    # 2. Fix the folder structure for "Actual Names"
    # Ensure any link like /page_id=123/ actually works by having a folder page_id/123/
    print("Verifying all page_id folders...")
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file == 'index.html':
                # Check for canonical in each file to see if it should have another name
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    import re
                    # Look for canonical link
                    match = re.search(r'<link rel="canonical" href="/\?(.*?)"', content)
                    if match:
                        actual_param = match.group(1).replace('=', '/').replace('&', '_')
                        actual_folder = Path(actual_param)
                        
                        if not actual_folder.exists():
                            print(f"Creating missing 'Actual' folder: {actual_folder}")
                            actual_folder.mkdir(parents=True, exist_ok=True)
                            shutil.copy2(path, actual_folder / 'index.html')
                except:
                    pass

    print("\nDone! Shop should now work on both /page_id/48771/ and /page_id/10/")

if __name__ == "__main__":
    main()
