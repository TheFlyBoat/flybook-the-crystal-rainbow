# My Magic Book: Laura and the Crystal Rainbow

An interactive digital storybook built with React, Vite, and Tailwind CSS. This application brings the story of "Laura and the Crystal Rainbow" to life with narration, illustrations, branching paths, and interactive puzzles.

## 🌟 Features

-   **Interactive Storytelling**: A rich narrative experience with text, images, and video backgrounds.
-   **Branching Storylines**: Multiple decision points that lead to different endings (e.g., Choosing paths at the Glowing Trail, Pink River, or Purple Waterfall).
-   **Mini-Games & Puzzles**: Child-friendly challenges including:
    -   **Packing for the Forest & Hugo's Snack**: Logical item selection.
    -   **Ancient Tree Challenge**: Memory matching with glowing mushrooms.
    -   **Crossing the Pink River**: Numbered sequence stepping stones.
    -   **Find the Golden Nut & Silver Key**: Hidden object gameplay.
    -   **Fix the Bridge**: Shape-based construction puzzle.
    -   **Musical Garden**: Interactive web audio synthesis for narrative exploration.
    -   **The Orchard Puzzle & Politeness Magic**: Story-driven riddle and logic challenges.
-   **Special Visual & Sound Systems**:
    -   **Engraved Riddle System & Magic Translation**: High-contrast UI and multi-phase text animations.
    -   **Onomatopoeia Sound Engine**: Maps text tags like `[[gloop]]` to specific sound effects.
    -   **Progress Map System**: Dynamic branching path visualization with theme shifts.
-   **Badge System**: Collectible achievement badges for solving puzzles (e.g., Packer, Matcher, Crosser), tracked via persistent state.
-   **Character Profiles**: Interactive character cards with facts, bios, and specific videos for Lilo, Laura, Barnaby, and others.
-   **Premium Aesthetics**: "Real Book" UI with 3D cover effects, page curls, pulsing interaction indicators, and responsive layout.
-   **Parental Gate & Trophy Room**: Secure areas to track collected badges.
-   **Audio Narration**: Full voice narration for every page and interactive sound effects.

## 🛠️ Tech Stack

-   **Frontend**: React 19
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **Animations**: Canvas Confetti, CSS 3D transforms
-   **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation

1.  Clone the repository and install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

3.  Open `http://localhost:5173` in your browser.

## 📂 Project Structure

-   **`src/components/book/`**: Core engine components.
    -   `BookEngine.jsx`: Main logic for page transitions and state.
    -   `CoverPage.jsx`: 3D interactive book cover.
    -   `PuzzleView.jsx`: Handles all interactive mini-games.
    -   `MediaRenderer.jsx`: Flexible renderer for images and videos with click indicators.
-   **`src/components/interface/`**: UI overlay and global controls.
    -   `Header.jsx`: Settings, Info, and feedback.
    -   `BadgeOverlay.jsx`: Display system for collected badges.
    -   `CharacterProfiles.jsx`: Interactive character cards.
    -   `ParentalGate.jsx`: Security-locked trophy room.
-   **`src/data/`**: Centralized configuration.
    -   `storyData.js`: Narrative content and puzzle definitions.
    -   `badgeData.jsx`: List of collectible badges.
    -   `charactersData.js`: Character facts and profiles.
-   **`src/context/BookContext.js`**: Global state (sound, narrator, progress, badges).
-   **`public/assets/`**: Static media organized by type (audio, image, video, puzzles).

## 📖 Customizing the Story

The story content is defined in `src/data/storyData.js`. Each object in the array represents a page or state in the book.

### Page Object Structure

```javascript
{
    id: 'page-id',          // Unique identifier
    type: 'spread',         // 'cover', 'spread', 'puzzle', 'choice', 'back-cover'
    text: 'Page text...',   // The story text
    media: '/path/to/img',  // Image or video path
    mediaType: 'image',     // 'image' or 'video'
    audioSrc: '/path/to/mp3', // Narration audio
    next: 'next-page-id',   // ID of the next page
    // ... specialized fields for puzzles or choices
}
```

To add a new page:
1.  Add a new object to `bookData`.
2.  Ensure the `next` property of the previous page points to your new page's `id`.
3.  Add necessary assets to `public/assets/`.

## 🧩 Puzzle Types

The application supports several puzzle types defined in the `PuzzleView` component:
-   `packing`: select items (e.g., Backpack, Hugo's Snack).
-   `find-nut` / `find-key`: hidden object tap interactions.
-   `light-mushrooms`: toggle states.
-   `stones-order`: specific logical sequence.
-   `match-pairs`: memory game at the Ancient Tree.
-   `selection-reveal`: shape-based bridge building.
-   `interaction`: infinite play such as the Musical Garden.
-   `puzzle`: logic and text-based riddles (Orchard Puzzle, Magic Word).

## 📄 License

This project is for educational and creative purposes.