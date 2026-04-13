import os
import re

def to_kebab_case(s):
    # Convert camelCase to kebab-case
    s = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', s)
    # Convert to lowercase
    s = s.lower()
    # Replace spaces and underscores with hyphens
    s = re.sub(r'[\s_]+', '-', s)
    return s

def rename_files_and_directories(root_dir):
    renames = [] # List of tuples (old_path, new_path)
    # Walk bottom-up to rename deeply nested files/dirs first
    for dirpath, dirnames, filenames in os.walk(root_dir, topdown=False):
        # Skip git and agent and node_modules
        if '.git' in dirpath or '.agent' in dirpath or 'node_modules' in dirpath:
            continue
            
        for filename in filenames:
            if filename == "sanitize.py": continue
            name, ext = os.path.splitext(filename)
            new_name = to_kebab_case(name) + ext.lower()
            if filename != new_name:
                old_path = os.path.join(dirpath, filename)
                new_path = os.path.join(dirpath, new_name)
                os.rename(old_path, new_path)
                renames.append((old_path, new_path))
                
        for dirname in dirnames:
            if dirname in ['.git', '.agent', 'node_modules']:
                continue
            new_dirname = to_kebab_case(dirname)
            if dirname != new_dirname:
                old_path = os.path.join(dirpath, dirname)
                new_path = os.path.join(dirpath, new_dirname)
                os.rename(old_path, new_path)
                renames.append((old_path, new_path))
    return renames

def update_imports(root_dir):
    # Let's do a simple find and replace in all JS/JSX files
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath or '.agent' in dirpath or 'node_modules' in dirpath:
            continue
        for filename in filenames:
            if filename.endswith(('.js', '.jsx', '.html', '.css', '.json')):
                filepath = os.path.join(dirpath, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # A simplistic way: replace all CamelCase occurrences that might be imports
                    # It's better to just regex replace import strings
                    # For example, import BookEngine from './components/book/BookEngine' -> './components/book/book-engine'
                    
                    def replacer(match):
                        p = match.group(0)
                        # don't touch node_modules imports (no ./ or ../)
                        # We only want to convert the filename part, or we can just apply to_kebab_case to the whole path segment
                        parts = p.split('/')
                        new_parts = []
                        for part in parts:
                            if part in ['.', '..']:
                                new_parts.append(part)
                            else:
                                new_parts.append(to_kebab_case(part))
                        return '/'.join(new_parts)

                    # Regex patterns for imports/exports
                    new_content = re.sub(r'from\s+[\'"]([\.][^\'"]+)[\'"]', lambda m: 'from "' + replacer(m) + '"', content)
                    new_content = re.sub(r'import\s+[\'"]([\.][^\'"]+)[\'"]', lambda m: 'import "' + replacer(m) + '"', new_content)
                    
                    # Audio/Image paths replacement
                    new_content = re.sub(r'[\'"](/assets/[^\'"]+)[\'"]', lambda m: '"' + replacer(m) + '"', new_content)
                    new_content = re.sub(r'[\'"](\./assets/[^\'"]+)[\'"]', lambda m: '"' + replacer(m) + '"', new_content)

                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == '__main__':
    renames = rename_files_and_directories('.')
    print(f"Renamed {len(renames)} files/directories.")
    update_imports('.')
    print("Imports updated.")
