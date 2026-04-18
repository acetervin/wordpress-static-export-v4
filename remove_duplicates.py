
import os
import re

def remove_duplicate_footers():
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    print(f"Cleaning duplicate footers in {len(html_files)} files...")
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Find all occurrences of the footer block
            # We look for the <footer id="bwp-footer" ... </footer> block
            footer_pattern = r'<footer id="bwp-footer".*?<\/footer>'
            matches = list(re.finditer(footer_pattern, content, flags=re.DOTALL))
            
            if len(matches) > 1:
                # We keep only the FIRST match and remove the others
                # Actually, often the first one is the "Real" one and the second is the "Stamped" one.
                # Let's keep the FIRST one to be safe.
                
                # Split content by the first footer's end
                first_footer_end = matches[0].end()
                header_and_first_footer = content[:first_footer_end]
                rest_of_content = content[first_footer_end:]
                
                # Remove any subsequent footers from the 'rest_of_content'
                clean_rest = re.sub(footer_pattern, '', rest_of_content, flags=re.DOTALL)
                
                new_content = header_and_first_footer + clean_rest
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Deduplicated: {file_path}")
                
        except Exception as e:
            print(f"Error in {file_path}: {e}")

if __name__ == "__main__":
    remove_duplicate_footers()
