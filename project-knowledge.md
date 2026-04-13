# Project Knowledge: Laura and the Crystal Rainbow

## Workflow
- **Initialization**: Run `/init_session` workflow to read documentation and create a project backup before modifying files.
- **Development**: Run `npm run dev` to start the local server.
- **Testing**: Changes should be verified in the browser.
- **Puzzle Implementation Rule**: Only work on ONE puzzle at a time. Ask the user for specific mechanics/rules before implementing. **CRITICAL**: Use the same message format and sound effects for correct/wrong choices as established in previous puzzles.

## Project Structure
- `src/data/`: Modular data for `storyData.js`, `badgeData.jsx`, and `charactersData.js`.
- `src/components/book/`: Core engine (`BookEngine`, `CoverPage`, `PuzzleView`).
- `src/components/interface/`: UI overlays (`BadgeOverlay`, `CharacterProfiles`, `ParentalGate`).
- `src/context/BookContext.js`: Global state management.
- `public/assets/`: Organized media assets.

## Puzzles & Badges
### Page 5: Packing for the Forest
- **Type**: `packing` | **Badge**: Packer
- **Status**: Implemented.

### End-of-Book Navigation
- **Choice 1**: "Look for more Crystals" -> Jumps to the last decision point (`goToLastDecision`).
- **Choice 2**: "Start from Home" -> Jumps to Page 1 (`goToStartJourney`).
- **Status**: Implemented globally in `BookEngine.jsx` and `BookContext.jsx`.

### Page 12: Ancient Tree Challenge
- **Type**: `match-pairs` | **Badge**: Matcher
- **Status**: Implemented.

### Page 18: Crossing the Pink River
- **Type**: `stones-order` (1-5) | **Badge**: Crosser
- **Status**: Implemented.

### Page 20: Hugo's Snack
- **Type**: `packing` | **Badge**: Snacker
- **Status**: Implemented.

### Page 23: Find the Golden Nut
- **Type**: `find-nut` | **Badge**: Finder
- **Status**: Implemented.

### Page 26: Fix the Bridge
- **Type**: `selection-reveal` (Shapes) | **Badge**: Builder
- **Status**: Implemented.

### Page 32: Find the Silver Key
- **Type**: `find-nut` | **Badge**: Unlocker
- **Status**: Implemented.

### Page 39: Musical Garden
- **Type**: `interaction` (Infinite Play)
- **Badge**: No badge (narrative/musical exploration).
- **Status**: Implemented. Custom Web Audio synthesis for flower notes.

### Page 43: The Orchard Puzzle
- **Type**: `puzzle` | **Badge**: Bookworm
- **Status**: Implemented.

### Page 45: Politeness Magic (Magic Word)
- **Type**: `puzzle` | **Badge**: Wizard
- **Status**: Implemented.

### Secret Ending
- **Badge**: Discoverer
- **Status**: Implemented.

## Progress Map System
- **Branch Visibility**: Filters nodes to show only the current story branch (e.g., Path A vs Path B) and the 'main' path.
- **Dynamic Theming**: Background color and pattern shift dynamically to match the active path's group theme.
- **Selective Labeling**: Landmarks are labeled based on importance (Puzzles, Landmarks, Ends). Surprises and minor locations remain mysterious icons.

## Interaction & Hint System
- **Universal Indicator**: Pulsing Hand icon.
- **Visual Style**: Path-themed background circles (e.g., Purple for Music, Amber for Parties).
- **Text Labels**: Removed to maintain a clean, icon-centric UI.

## Navigation & End Pages
- **End-of-Book Navigation**: 
   - "Look for more Crystals" -> Jumps to the last decision point.
   - "Start from Home" -> Jumps to Page 1.
- **UI Polish**: Titles on end pages are clean (no underlines) to match professional spread layouts.
- **Status**: Implemented globally.

## Special Visual Systems
### Engraved Riddle System (Page 42)
- **Effect**: Chiseled look using high-contrast text shadows on slate backgrounds.
- **Component**: `EngravedRiddle.jsx`.

### Magic Translation (Page 44)
- **Animation**: Multi-phase sequence (Scramble -> Swirl -> Reveal).
- **Component**: `MagicTranslation.jsx`.

## Sound & Narrative Systems
### Onomatopoeia Sound Engine
- **Logic**: `MagicWord.jsx` maps narrative text in `[[brackets]]` to specific SFX files.
- **Mappings**: Added 'gloop', 'glop', 'eek', 'click', 'clack', 'flick', and 'puff'.

### Real Book UI
- **Cover**: 3D interactive cover with parallax and hover effects.
- **Navigation**: Animated page curls and branching history tracking.
- **Visuals**: Pulsing "Click Indicators" for interactive elements.

## Troubleshooting & Known Fixes
- **MediaRenderer Crash (Blank Screen)**: Fixed a structural issue where `useEffect` was not imported in `MediaRenderer.jsx`, causing a destructive `ReferenceError` when navigating to pages with video interactions. Always verify React hook imports.

