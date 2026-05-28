# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see README and `pnpm-lock.yaml`).

- `pnpm dev` — start Next.js dev server on http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run `next lint` (config: `eslint-config-next` via `.eslintrc.json`)

There is no test runner configured in `package.json`.

## Architecture

Single-page Next.js 14 App Router portfolio. The homepage (`src/app/page.tsx`) is a server component that renders every section (banner, experience, skills, projects, education, testimonials) from a single JSON data source. There is no CMS or database.

### Data flow

- **`public/data.json`** is the single source of truth for portfolio content. Edit this file to change personal info, work experience, skills, projects, education, testimonials, and which sections render.
- **`src/types/data.ts`** defines the `Data` TypeScript shape. Keep `data.json` and this type in sync — `getJSONData()` casts the parsed JSON to `Data` without runtime validation, so a mismatch will surface as a render-time crash.
- **`src/lib/serverUtils.ts`** holds the two server-side loaders:
  - `getJSONData()` reads `public/data.json` from disk via `fs.readFileSync`. It is marked `"use server"`, so it can only be called from server components / server actions.
  - `getBlogPosts()` scans `src/app/blogs/*/` directories and dynamically imports each `page.mdx` to read its exported `metadata`. It validates the shape against `BlogMetadata` (`src/types/blog.ts`) and throws if a post is missing required fields.
- **Section visibility** is toggled by booleans under `visual.home.sections` in `data.json` (e.g. `testimonial: false` hides the testimonials section). New conditional sections should follow the same pattern: add a boolean to `HomeSections` in `src/types/data.ts`, add it to `data.json`, and wrap the JSX with `{data.visual.home.sections.<key> && ...}`.

### Blog system (MDX)

- `next.config.mjs` wraps the config with `@next/mdx` and sets `pageExtensions` to include `mdx`, so any `src/app/blogs/<slug>/page.mdx` becomes a route at `/blogs/<slug>` automatically.
- Each MDX post **must** export a `metadata` object matching `BlogMetadata` (`title`, `description`, `isPublished`, `slug`, `publishDate`) — `getBlogPosts()` throws otherwise.
- `src/mdx-components.tsx` is the App Router hook for customizing MDX rendering; it currently passes components through unchanged.
- `src/app/blogs/layout.tsx` wraps every blog page in a `.blog-post` container.

### Styling & UI

- Tailwind CSS with shadcn/ui conventions. `components.json` defines the shadcn config (`baseColor: neutral`, RSC enabled, CSS variables on). New shadcn components belong in `src/components/ui/`.
- Path alias `@/*` → `./src/*` (configured in `tsconfig.json`).
- Dark mode classes are used throughout (`dark:`); the toggle lives in `src/components/ui/themeToggler.tsx`.

### Next.js config notes

- `next.config.mjs` whitelists `dezjzojvmw4by.cloudfront.net` for `next/image`. Any new remote image host must be added to `images.remotePatterns` or `next/image` will reject it at request time.
