---
description: Sequential pipeline for sanitising, auditing, and deploying the project
---

# Initial Publish Workflow

1.  **Sanitize:** Call `@devops` using `project-sanitizer`.
    * Target: Remove junk, redact secrets, normalise names.
2.  **Validate:** Call `@devops` to execute the app.
    * Constraint: Must run for $60\text{s}$ without exit.
3.  **Audit:** Call `@devops` using `github-repo-auditor`.
    * Target: Verify documentation and structure.
4.  **Launch:** Call `@devops` using `deployment-engine`.
    * Target: Initialise GitHub and push.
