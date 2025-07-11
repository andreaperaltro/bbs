# PROJECT OVERVIEW

## Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS (with custom BBS/ANSI palette)
- **Database:** Firestore (Firebase)
- **Font:** Custom Amiga4ever font (for all titles and body text)

## Architecture & Design Principles
- **Single source of truth for sections and portfolio:** All content is fetched from Firestore collections (`sections`, `portfolio`).
- **Component-based UI:** Each section and the portfolio are rendered as React components.
- **Menu is dynamic:** MenuBar always reflects Firestore sections.

## BBS/ANSI Palette & Styling (2024-06 update)
- **All colors and styles are now controlled by Tailwind palette classes.**
  - `text-bbs-fg` for white text (default)
  - `text-bbs-cyan` for links and highlights
  - `border-bbs-magenta` for divider lines
  - `text-bbs-yellow` for titles and highlights
- **No inline or hardcoded color styles remain.**
- **Global CSS is only used for essentials:**
  - Font-face definition
  - Enforcing cyan link color and magenta divider color (with high specificity)
- **The BBS palette is strictly enforced:**
  - White text everywhere
  - Cyan links (with cyan underline and focus)
  - Magenta divider lines only (no magenta backgrounds)
- **No color conflicts or overrides:**
  - All previous inline color classes and hardcoded styles have been removed.
  - The codebase is now robust against style conflicts and easy to maintain.

## How to Add/Change Styles
- **Use only Tailwind palette classes for color and font.**
- **Do not use inline styles or hardcoded color values.**
- **If you need a new color, add it to the Tailwind config and BBS palette.**

## How to Add Content
- Add new sections or portfolio entries in Firestore.
- The menu and content will update automatically.

## How to Develop Further
- Restart the dev server after changing Tailwind config or global CSS.
- Use DevTools to inspect elements and verify palette classes are applied.
- Keep all styling changes in Tailwind and the palette for consistency.

---
**Always update this file after significant changes.** 