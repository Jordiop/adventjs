# Advent of JavaScript - Exercise Website

A beautiful website to display your Advent of JavaScript coding challenges and solutions, built with Astro.

## Features

- Displays exercises organized by year (2024, 2025)
- Individual pages for each day's challenge
- Syntax highlighting for JavaScript/TypeScript code
- Dark theme optimized for code reading
- Fast static site generation
- Responsive design

## Project Structure

```text
/
├── src/
│   ├── content/
│   │   ├── exercises/
│   │   │   ├── 2024/
│   │   │   │   ├── day1/index.md
│   │   │   │   ├── day2/index.md
│   │   │   │   └── ...
│   │   │   └── 2025/
│   │   │       ├── day1/index.md
│   │   │       └── ...
│   │   └── config.ts
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       └── [...slug].astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Adding New Exercises

To add new exercises, simply place your markdown files in the appropriate year folder:

```bash
src/content/exercises/YEAR/dayN/index.md
```

Each markdown file should have frontmatter with a navigation order:

```markdown
---
navigation:
  order: 1
---

# Title of Exercise

Exercise content here...

## Solution

Solution code here...
```

## Deployment

You can deploy this site to various platforms:

**Netlify/Vercel/Cloudflare Pages:**
1. Run `npm run build`
2. Deploy the `dist/` folder
3. Or connect your Git repository for automatic deployments

**GitHub Pages:**
1. Update `astro.config.mjs` with your site URL
2. Run `npm run build`
3. Deploy the `dist/` folder to GitHub Pages

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
