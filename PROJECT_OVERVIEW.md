# PROJECT OVERVIEW

## Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS (with custom BBS/ANSI palette)
- **Database:** Firestore (Firebase)
- **Image Storage:** Supabase Storage (public bucket, portfolio-images)
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
- **Write content in Markdown (not HTML) in the admin.**
- Use the '?' button next to textareas for a Markdown cheat sheet.
- The menu and content will update automatically.

## Image Handling & Gallery
- **Images are uploaded to Supabase Storage (bucket: portfolio-images).**
- **Image URLs are saved in Firestore and displayed in the portfolio.**
- **Gallery popup:** Clicking a project image opens a modal overlay with navigation arrows to browse all images for that project. Overlay is styled with BBS palette and closes only when clicking the background or close button. Navigation bug fixed so arrows do not close the modal.
- **Placeholder images:** If an image URL is from via.placeholder.com, it is rendered with `<img>` for compatibility in local dev and production. All other images use Next.js `<Image />` for optimization.

## Next.js Image Optimization
- **External images (e.g., via.placeholder.com, Supabase) are configured in `next.config.js` using `images.remotePatterns`.**
- **Deprecated `images.domains` config has been removed.**
- **Supabase and placeholder images are both supported.**

## Local Development & Hot Reload
- **Default dev script uses Turbopack:** `npm run dev`
- **For reliable hot reload, use legacy Next.js dev server:** `npm run dev:hot` (now always runs on port 3000)
- **To guarantee port 3000 is free, use:** `sh scripts/dev.sh` (kills any process on 3000, then starts dev server)
- **If localhost:3000 is down, use the script above or manually kill the process.**
- **Server restarts are handled manually for now.**

## Recent Fixes & Improvements
- **Typewriter effect bug fixed:** No more missing letters; animation and static content now use identical styling for perfect visual match.
- **Section and portfolio content now supports full Markdown formatting (not HTML):**
  - Write content in Markdown in the admin (see the '?' button for a cheat sheet).
  - All formatting (bold, italic, links, lists, headings, code, etc.) is supported.
- **Admin textareas for long text are now taller and resizable.**
- **Admin now has a '?' info button next to textareas:** Shows a Markdown cheat sheet modal for easy formatting reference.
- **Dev server always runs on port 3000:**
  - `dev:hot` script in package.json always uses port 3000.
  - `scripts/dev.sh` kills any process on port 3000 before starting the dev server for a seamless experience.
- **ESLint errors fixed for Vercel build:** No more `any` or unused variable errors in admin page. All handlers are now properly typed and cleaned up.
- **Site title and metadata:** Now always shows "Andrea Perato" and correct description.
- **Favicon:** Custom favicon is now reliably used in all environments.
- **Gallery modal navigation:** Navigation arrows no longer close the modal.
- **App is now fully linted, deployable, and up to date with best practices.**

## How to Develop Further
- Restart the dev server after changing Tailwind config or global CSS.
- Use DevTools to inspect elements and verify palette classes are applied.
- Keep all styling changes in Tailwind and the palette for consistency.
- For gallery/modal changes, update the PortfolioSection in `src/app/page.tsx`.

---
**Always update this file after significant changes.** 