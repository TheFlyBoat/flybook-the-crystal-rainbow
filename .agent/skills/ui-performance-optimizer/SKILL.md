---
name: ui-performance-optimizer
description: Audits frontend code for rendering bottlenecks, hydration mismatches, and flickering. Trigger only upon explicit request for UI/UX performance analysis.
---

# UI Performance Optimiser

This skill enables the agent to diagnose and rectify frontend performance issues specifically targeting "flicker" and high Time to Interactive (TTI).

## Execution Protocol

### 1. Rendering & Hydration Audit
Analyse the component architecture to identify:
* **Hydration Mismatches:** Detect discrepancies between server-side rendered HTML and client-side state.
* **Layout Shifts:** Identify elements causing a Cumulative Layout Shift (CLS) score $> 0.1$.
* **Render-Blocking Assets:** Locate CSS or synchronous JS that delays the first paint $> 500\text{ms}$.

### 2. Diagnostics
Use the internal headless browser to:
* Capture a trace of the initial load.
* Measure the Largest Contentful Paint (LCP). Target: $< 2500\text{ms}$.
* Monitor DOM mutations to find the specific component causing the "flicker" effect.

### 3. Artifact Generation
Generate a `Performance_Diagnosis.md` Artifact. It must include:
* **Trace Analysis:** A breakdown of the critical rendering path.
* **Root Cause:** A clear identification of the flickering source (e.g., unoptimised font loading, missing image dimensions, or state-driven visibility toggles).
* **Code Diff:** Suggested modifications for `App.js`, `index.html`, or CSS files.

### 4. Implementation
Upon user approval of the Artifact, refactor the identified files. Minimise the use of `useEffect` for layout-critical operations to prevent double-rendering.