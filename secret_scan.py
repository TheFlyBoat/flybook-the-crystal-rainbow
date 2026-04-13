import os
import math
import collections
import re

def shannon_entropy(s):
    if not s:
        return 0
    probabilities = [n_x/len(s) for x, n_x in collections.Counter(s).items()]
    entropy = -sum(p * math.log(p, 2) for p in probabilities)
    return entropy

def find_secrets(root_dir):
    secrets_found = []
    
    # Check .env first
    env_path = os.path.join(root_dir, '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        with open(os.path.join(root_dir, '.env.example'), 'w', encoding='utf-8') as f:
            for line in lines:
                if '=' in line:
                    key = line.split('=', 1)[0]
                    f.write(f'{key}=YOUR_API_KEY\n')
                else:
                    f.write(line)
        os.remove(env_path)
    
    pattern = re.compile(r'(API_KEY|TOKEN|SECRET|PASSWORD)', re.IGNORECASE)
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath or '.agent' in dirpath or 'node_modules' in dirpath:
            continue
        for filename in filenames:
            if not filename.endswith(('.js', '.jsx', '.html', '.css', '.json')): continue
            if filename in ['package-lock.json']: continue
            filepath = os.path.join(dirpath, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Basic test for token/secret variable names
                for match in pattern.finditer(content):
                    line = content[:match.start()].count('\n') + 1
                    secrets_found.append(f"Found {match.group(1)} in {filepath}:{line}")
                    
                # Look for strings
                strings = re.findall(r'[\'"]([A-Za-z0-9+/=_\-]{16,})[\'"]', content)
                for s in strings:
                    if shannon_entropy(s) > 4.5:
                        secrets_found.append(f"High entropy string found in {filepath}: {s[:5]}...")
            except Exception as e:
                pass
    return secrets_found

if __name__ == '__main__':
    secrets = find_secrets('.')
    if not secrets:
        print("No secrets found.")
    else:
        with open('Redaction_Report.md', 'w') as f:
            f.write("# Redaction Report\n\n")
            for s in secrets:
                f.write(f"- {s}\n")
        print(f"Found {len(secrets)} secrets.")
