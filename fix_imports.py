import os
import re

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = re.sub(r'from-"([^\"]+)"', r'from "\1"', content)
        new_content = re.sub(r'import-"([^\"]+)"', r'import "\1"', new_content)
        
        # also I probably did import-'...' somehow? Let's check single quotes:
        new_content = re.sub(r'from-\'([^\']+)\'', r'from "\1"', new_content)
        new_content = re.sub(r'import-\'([^\']+)\'', r'import "\1"', new_content)

        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
    except Exception as e:
        print(f"Error {filepath}: {e}")

for dirpath, dirnames, filenames in os.walk('.'):
    if '.git' in dirpath or '.agent' in dirpath or 'node_modules' in dirpath:
        continue
    for filename in filenames:
        if filename.endswith(('.js', '.jsx', '.html', '.css', '.json')):
            fix_file(os.path.join(dirpath, filename))

print("Fixed imports.")
