---
name: deployment-engine
description: Orchestrates Git versioning and triggers remote deployment pipelines. Assumes the workspace is already sanitised.
---

# Deployment Engine (Revised)

## Execution Protocol

### 1. Repository Initialisation
* **Git Setup:** Execute `git init` if no `.git` directory exists.
* **Remote Association:** Check for existing remotes. If none, use the GitHub CLI (`gh`) to create a new repository (private by default) and set it as `origin`.
* **Staging:** Add all files compliant with `.gitignore`.

### 2. Versioning
* **Commit:** Execute an atomic commit with the message `initial: project baseline after sanitisation`.
* **Push:** Push the `main` branch to the remote origin. Set upstream tracking.

### 3. Deployment Trigger
* **Target Identification:** Detect deployment configurations (e.g., `vercel.json`, `netlify.toml`, `firebase.json`).
* **Execution:** Trigger the relevant deployment CLI.
* **Build Monitoring:** Monitor the remote build logs. Halt and report if the build exceeds $300\text{s}$ or returns a non-zero exit code.

### 4. Verification Artifact
* **Output:** Generate a `Deployment_Summary.md` Artifact.
* **Requirements:** Must include the GitHub Repository URL, the Live Production URL, and a confirmation of the final deployment status.