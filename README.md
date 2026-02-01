# Daily Tech Feed

AI-generated podcasts covering tech, weather, and more.

## Shows

- **Daily Tech Feed: Hacker News** — AI-curated top tech stories from Hacker News, delivered daily
- **Daily Tech Feed: Raving Finch** — Portland's daily weather report, delivered in the contemplative style of David Lynch

## Stack

- **Framework:** [Astro](https://astro.build/) with [Starpod](https://github.com/shipshapecode/starpod) podcast template
- **UI:** [Preact](https://preactjs.com/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Hosting:** Cloudflare Pages (static output)
- **Media:** Cloudflare R2 via Worker (RSS/MP3 served separately)

## Site Structure

- `/` → Network landing page (show cards)
- `/dtfhn/` → DTF: Hacker News show page + episodes
- `/dtfravingfinch/` → DTF: Raving Finch show page

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output goes to `dist/`.

## Deploy

Deployed via Cloudflare Pages from the `main` branch. Media files (RSS feeds, MP3s) are served by a Cloudflare Worker from R2 — not this site.

## Adding a New Show

1. Add show config to `src/config/shows.ts`
2. Create `src/pages/<show-id>/index.astro` (show page)
3. Optionally create `src/pages/<show-id>/[episode].astro` (episode pages)
4. Build and verify

## License

MIT
