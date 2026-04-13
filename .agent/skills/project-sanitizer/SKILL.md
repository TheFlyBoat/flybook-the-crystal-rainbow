---
name: project-sanitizer
description: Prepares a local workspace for version control by removing junk files, redacting secrets, and normalising naming conventions.
---

# Project Sanitizer

## Execution Protocol

### 1. Junk Removal
* **Target Files:** Delete `.DS_Store`, `Thumbs.db`, `desktop.ini`.
* **Target Directories:** Delete `node_modules`, `dist`, `build`, `.next`, `out`, `target`, `bin`, `obj`, and `__pycache__`.
* **Temporary Data:** Clear all `.log` files and temporary cache directories.

### 2. Namespace Normalisation
* **Constraint:** Recursively rename all files and directories to `kebab-case`.
* **Action:** Replace spaces and underscores with hyphens. Convert all characters to lowercase.
* **Integrity Check:** Update internal import references if file renames break dependency paths.

### 3. Secret Suppression
* **Environment Files:** Identify `.env` files. Move them to `.env.example`.
* **Redaction:** Replace all values in `.env.example` with placeholders (e.g., `YOUR_API_KEY`).
* **Hardcode Scan:** Search source code for high-entropy strings ($> 4.5$) or patterns matching `API_KEY`, `TOKEN`, `SECRET`, or `PASSWORD`. Flag these in a `Redaction_Report.md` Artifact.

### 4. Repository Scaffolding
* **Gitignore:** Generate a `.gitignore` file based on the detected environment (e.g., Node.js, Python, React).
* **Readme:** Create a basic `README.md` containing project title and setup instructions if missing.

### 5. Stability Check
* **Validation:** Run the primary start command using the absolute path for the package manager.
* **Execution:** /Users/ac/.nvm/versions/node/v20.19.5/bin/npm run dev
* **Threshold:** The application must initialise and remain stable for $60\text{s}$ without crash logs.