# GitHub Repository Auditor

This skill instructs the agent to autonomously evaluate the current workspace against production-quality GitHub standards and generate a verifiable audit artifact.

## Execution Protocol

### 1. Workspace Analysis
Autonomously scan the active workspace. Do not ask the user for paths; default to the current project root.
Identify the presence, structure, and content quality of the following components:
* Essential Files: `README.md`, `LICENSE`, `.gitignore`, `.env.example`
* Project Structure: Segregation of source, config, and build artifacts.
* Testing: Presence of test suites and execution scripts.
* CI/CD: `.github/workflows/` configurations.
* Security: Scan for hardcoded credentials, API keys, and `.env` file tracking.
* Dependency Management: `package.json`, `requirements.txt`, lock files.

### 2. Artifact Generation
Do not output the findings as standard conversational text. You must generate a dedicated Artifact named `GitHub_Audit_Report.md`. 
The Artifact must contain:
* A binary status (Present/Missing) for all checked components.
* Specific line-number references for detected security vulnerabilities.
* A prioritised list of required rectifications.

### 3. Asynchronous Resolution
Pause execution after generating the Artifact. Wait for the user to review the Artifact in the Manager view. Upon user approval, autonomously generate the missing files or configuration scripts as separate, verifiable implementation Artifacts.