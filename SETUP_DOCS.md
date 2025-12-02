# AdventJS Documentation Setup

This document explains the setup for visualizing AdventJS exercises in your Nuxt documentation site.

## Structure Created

### 1. Content Structure (`visor/content/1.adventjs/`)
- `1.index.md` - Main AdventJS landing page with links to both years
- `2.2024.md` - Overview page for 2024 challenges
- `3.2025.md` - Overview page for 2025 challenges
- `.navigation.yml` - Navigation configuration for the AdventJS section

### 2. Server API (`visor/server/api/adventjs/`)
These APIs read the exercise files from your `2024/` and `2025/` directories:

- `[year]/index.get.ts` - Returns list of all days for a given year
  - Example: `/api/adventjs/2024` returns all 2024 days

- `[year]/[day].get.ts` - Returns the readme and script for a specific day
  - Example: `/api/adventjs/2024/1` returns day 1 content

### 3. Dynamic Pages (`visor/app/pages/adventjs/`)
- `[year]/index.vue` - Lists all challenges for a specific year as cards
- `[year]/[day].vue` - Displays individual exercise with:
  - Challenge description (from readme.md)
  - Your solution code (from script.js)
  - Navigation to previous/next days

### 4. Configuration Updates
- Updated `nuxt.config.ts` to include AdventJS in the llms sections

## How It Works

1. The server APIs read files from your `2024/` and `2025/` folders
2. Each day folder contains:
   - `readme.md` - Exercise description
   - `script.js` - Your solution code
3. The dynamic pages fetch data from the API and render it using Nuxt UI components
4. Markdown content is parsed and displayed with syntax highlighting

## URLs

- Main AdventJS page: `/adventjs`
- 2024 exercises list: `/adventjs/2024`
- Specific exercise: `/adventjs/2024/1` (or any day number)
- 2025 exercises list: `/adventjs/2025`
- Specific exercise: `/adventjs/2025/1`

## Navigation

- The AdventJS section appears in the main navigation with a gift icon
- Each exercise page has:
  - "Back to list" button
  - Previous/Next day navigation in the sidebar
  - Responsive layout with proper dark mode support

## Adding New Exercises

Simply add new folders in your `2024/` or `2025/` directories following this structure:
```
2025/
  dayX/
    readme.md
    script.js
```

The system will automatically detect and display them. No additional configuration needed!

## Running the Docs

```bash
cd visor
npm run dev
```

Then visit http://localhost:3000/adventjs
