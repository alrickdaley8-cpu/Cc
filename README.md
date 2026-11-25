# The Quiet at Marlowe House

*Fenland, England, November 1931. The family hasn't been seen for six weeks. The constable found the house "quiet".*

A first-person psychological horror game that runs in the browser. You're hunted by **the Listener**, a tall figure with a gramophone horn for a head that hunts by **sound**. You can't fight it. Walk softly, mind the chalk-marked boards, hide, hold your breath, and work out what Dr. Ada Marlowe let into her house.

- Three acts, about 25 rooms over three floors, **three endings** (one hidden).
- No jump-scare spam: there's exactly one hard scare, and it's earned. Every threat is telegraphed, and every death tells you why.
- A creature AI with two brains, a pacing Director and a monster that must find you with its own senses, and **it learns your habits**.
- Every texture, model and sound is generated in code. There are no asset files, and the whole game is 200 KB gzipped.

## Run it

Requirements: **Node 18+** and a desktop browser with WebGL2 (Chrome, Edge, Firefox or Safari 15+). Use headphones.

```bash
npm install
npm run dev          # → http://localhost:5173   (development server)
```

Production build:

```bash
npm run build        # → dist/   (static files: host anywhere, or open via any static server)
npm run preview      # → http://localhost:4173   (serves dist/)
```

## How to play

Click to capture the mouse. On first launch you'll set the brightness on the live, darkened scene.

| Key | Action |
|---|---|
| **W A S D** / arrows | Move |
| Mouse | Look |
| **Shift** | Run (loud, tiring) |
| **C** / Ctrl | Crouch (quiet; toggle or hold in Settings) |
| **E** / left click | Interact · hide · read |
| **F** | Torch on/off (your eyes adjust to the dark after a few seconds) |
| **R** (hold) | Crank the torch dynamo (noisy) |
| **Q** / right click | Throw a bottle (it goes to the noise) |
| **Space** (hold, while hidden) | Hold your breath |
| **Tab** | Journal: objective, items, documents |
| **Esc** | Pause / settings |

**Survival rules** (you'll find them written by an eight-year-old in the house):
1. Crouch, walk on rugs, and avoid the chalk-marked boards.
2. Keep your torch off its face.
3. Break its line of sight *before* you hide.
4. When it stops outside your hiding place and inhales, hold your breath.
5. It speaks with a voice you'll want to trust. Don't answer.

Difficulty: **Gentle** (for the story), **Standard** (intended) or **Nightmare**. The settings cover subtitles and directional sound captions, subtitle size, reduced flashing, FOV, head bob, sensitivity, invert-Y, grain and aberration, volumes, and hints.

## Tests

```bash
npm test                      # unit tests (world model, pathfinding, sound, layout integrity)
npm run test:e2e              # 14 end-to-end tests in headless Chromium: all 3 endings, AI senses, hiding, learning, checkpoints
node tools/tour.mjs           # screenshot tour of 15 viewpoints: luminance + draw calls
node tools/pacing.mjs "" 20   # 20 simulated minutes with the Listener → docs/pacing.json
```

The e2e, tour and pacing tools need the dev server (or `npm run preview`, passing its URL as the first argument). They use `@sparticuz/chromium` (a dev dependency), so no system browser is required. Latest results: **unit 7/7, e2e 14/14 on both the dev and production builds.** See [docs/TESTING.md](docs/TESTING.md).

## Project documents (deliverables)

| # | Deliverable | Where |
|---|---|---|
| 1 | Concept & design document | [docs/DESIGN.md](docs/DESIGN.md) |
| 2 | Research findings with sources | [docs/RESEARCH.md](docs/RESEARCH.md) |
| 3 | Development methodology (compared, and revised during development) | [docs/METHODOLOGY.md](docs/METHODOLOGY.md) |
| 4 | Architecture & technology choices | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 5 | Playable game | `npm run dev`, or `npm run build` → `dist/` |
| 6 | Source files | `src/` (game), `tests/`, `tools/` |
| 7 | Test results & known limitations | [docs/TESTING.md](docs/TESTING.md) |
| 8 | Run / play instructions | this file |
| 9 | Improvements made during development | [docs/DEVLOG.md](docs/DEVLOG.md) |
| 10 | Future update suggestions | below |

## Source layout

```
src/
  main.js            Game: loop, modes, death/endings, perf, prewarm, dark adaptation
  core/              event bus, input, settings, rng/math
  world/             levelData (all layout as data), grid (collision/A*/LOS/sound), textures, materials, level + prop builders
  render/post.js     HDR post: ACES, grain, aberration, vignette, fear/breath/fade effects
  player/player.js   movement, noise, torch, hiding, breath
  audio/audio.js     Web Audio: HRTF, per-room reverb, occlusion, 34 synthesized sounds
  ai/                listener (creature), listenerBody (rig), director (pacing + learning)
  game/              story (flags, beats, checkpoints, endings), content (all text), interaction, doors, throwables
  ui/                HUD, menus, journal, calibration, death/ending screens
tests/   unit + e2e        tools/   browser launcher, tour, pacing, shot
docs/    design, research, methodology, architecture, testing, devlog, pacing logs
```

## Future update suggestions

**Highest value**
1. **Human playtests** (5–10 players) with a short fear/frustration questionnaire and telemetry export, to validate pacing, the 40–70 minute estimate and hiding difficulty. Nothing else on this list matters as much.
2. **Real-GPU performance pass** on low-end laptops. Then add a graphics-quality preset (shadow resolution, pixel ratio, grain) and an FPS-based auto-preset.
3. **Recorded voice acting** for Thomas's mimicry and the cylinders (currently synthesized murmurs plus subtitles). The mimic beat would hit much harder.

**Gameplay**

4. More learned behaviours: checking the last hiding spot first, ignoring a second bottle thrown at the same place, and learning patrol routes from where you were last heard.
5. A microphone mode (opt-in): your real voice and breathing become in-game noise.
6. A second creature behaviour for Nightmare: it stops at doors and *listens* before opening them, so you have to stay quiet on the other side.
7. A New Game+ remix: rooms subtly rearranged, the documents rewritten from Thomas's view, a different hiding-spot set.

**Content & presentation**

8. Asset upgrade path: replace primitive props with GLTF models on the same footprints (the nav grid and colliders are already data-driven).
9. A skinned and animated Listener with a cloth-sim coat, and a better kill animation.
10. Gamepad support, rebindable keys, a colour-blind-safe review of interaction highlights, and a "no chase" story mode.
11. Multiple save slots plus cloud-free export/import of saves.
12. Code-split three.js, add a PWA install with offline play, and a small loading screen.
