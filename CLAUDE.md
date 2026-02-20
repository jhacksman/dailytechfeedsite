# CLAUDE.md - dailytechfeedsite

## Project
- Astro + Preact + Tailwind CSS
- Deployed on Cloudflare Pages (auto-deploy on push to main)
- Build: `pnpm build`

## Architecture
- Player component: `src/components/Player.tsx` (main orchestrator)
- Player sub-components: `src/components/player/` (PlayButton, MuteButton, Slider, etc.)
- State: `src/components/state.ts` uses Preact signals (`currentEpisode`, `isPlaying`, `isMuted`)
- Audio playback tracked via `requestAnimationFrame` loop in `whilePlaying()`

## Lessons Learned
- 2026-02-20: Added time display (current time + duration) below progress bar in Player.tsx
  - State: `currentTime` and `duration` updated in the `whilePlaying` rAF loop
  - Format: mm:ss with `tabular-nums` for stable width
  - The player layout uses flex with gap-3 for vertical sections; adding a new row is straightforward
  - Build is fast (~2s for 115 pages)
