# Architecture & Technology Choices

## Technology choice

| Option | For | Against | Verdict |
|---|---|---|---|
| **three.js + Web Audio + Vite** | Runs anywhere with a browser, so there's no install. Full control over lighting and post-processing. Web Audio gives HRTF 3D panning, convolution reverb and real-time synthesis. Fully testable headlessly. | We build our own game layer (physics, AI, UI). | **Chosen** |
| Godot 4 (web export) | Editor, physics, scene system | The web export is limited to the Compatibility renderer and has weaker audio. The audio engine is the core mechanic here. | Rejected |
| Unity WebGL | Mature toolset | Large builds, slow iteration in this environment, not headless-testable here. | Rejected |
| Babylon.js | Batteries included | Heavier. We needed less engine, not more. | Rejected |

Two decisions came straight from the constraint *"must be testable without a human in the loop"*:

- **No external assets.** Every texture is painted procedurally on a canvas (`textures.js`), every prop is built from primitives (`props.js`), and every sound is **synthesized** at runtime (`audio.js`, 34 sounds). The build is **200 KB gzipped** with zero downloads and no licensing questions, and the e2e audio test checks that every sound actually renders.
- **One debug API** (`window.__game`): the e2e bot, the screenshot tour, the pacing tool and manual debugging all drive the real game through it. `game.simulate(seconds)` runs the real update loop faster than real time, so a 20-minute hunt takes about 8 seconds to test.

## Runtime structure

```
index.html ──► src/main.js  (Game: owns everything, the main loop, modes, death/endings, perf)
                 │
   core/         ├─ events.js     tiny pub/sub bus — systems talk through events, not references
                 ├─ input.js      keyboard/mouse/pointer-lock + simKey() for the bot
                 ├─ settings.js   persisted accessibility/audio/difficulty options
                 └─ rng.js        seeded RNG, clamp/damp/lerp helpers
   world/        ├─ levelData.js  ALL layout as data: floors, rooms, doors, stairs, props, lights, triggers
                 ├─ grid.js       World: tile grid, collision, A* (multi-floor), line of sight,
                 │                sound propagation (flood-fill through doors), height resolve
                 ├─ footprints.js prop collision footprints (shared by renderer + nav grid)
                 ├─ textures.js   procedural canvas textures (wallpapers, wood, brick, foam…)
                 ├─ materials.js  material library with vertex-colour AO
                 ├─ levelBuilder.js  data → merged wall/floor/ceiling meshes per floor
                 └─ props.js      70 procedural prop builders, merged per floor (compact())
   render/       └─ post.js       HDR target → custom ACES + sRGB, grain, aberration, vignette,
                                  fear pulse, fade/flash, hidden/breath effects
   player/       └─ player.js     movement, stamina, crouch, stairs, footsteps → noise events,
                                  torch (spot + bounce fill, close-range falloff), hiding, breath
   audio/        └─ audio.js      Web Audio graph: HRTF panners, per-room convolution reverb,
                                  occlusion low-pass, synthesized SFX/ambience/voices, ducking
   ai/           ├─ listener.js   the creature ("front brain"): senses, state machine, pathing
                 ├─ listenerBody.js  procedural rig + animation (stoop, listen, chase, kill)
                 └─ director.js   the pacing AI ("back brain"): menace, phases, hints, phantoms, learning
   game/         ├─ story.js      flags, inventory, objectives, scripted beats, checkpoints, endings
                 ├─ content.js    all text: documents, objectives, captions, endings, credits
                 ├─ interaction.js  focus/raycast interactables, prompts
                 ├─ doors.js      door state + animation, noise, AI door opening
                 └─ throwables.js bottles: ballistic flight, shatter noise
   ui/           ├─ ui.js         HUD, prompts, subtitles/captions, journal, menus, settings,
                 │                calibration, death and ending screens
                 └─ style.css
```

### Main loop

`frame()` → `tick(dt)` (mode-dependent input) → `update(dt)` (player → doors → listener → director → story → audio listener) → `render(dt)` (floor visibility culling, shadow-caster switch, light pool, dark adaptation, post uniforms) → `measure()`.

### Key design patterns

- **Data-driven world.** Moving a wall or a prop is a `levelData.js` edit. A unit test ("furniture never disconnects rooms or blocks doors/stairs") guards against layout edits that break navigation.
- **Event bus decoupling.** The player emits `noise`; the Listener and the generator masking subscribe. The story emits `objective`/`checkpoint`; the UI subscribes. The Director *learns* from `bottleThrown`, `glassInvestigated` and `inspectSurvived` without the Listener knowing the Director exists beyond two queries.
- **Two-brain AI** (Alien: Isolation). The **Director** knows where the player is, but only ever passes the **Listener** a *rough area* (2–8 m). The Listener must then find you with its own senses: hearing via sound propagation cost, and sight via a view cone, line of sight and light level. This is what makes it fair *and* unpredictable.
- **Listener state machine:** `dormant → backstage → patrol → investigate → search (→ inspect hiding spot) → chase → leave → backstage`, plus `scripted` (story beats) and `kill`.
- **Director cycle** (Left 4 Dead): `relax` (creature backstage) → `build` (emerge at an out-of-sight lair at least 10 m of path away (preferring about 18 m), with an audible entrance, then wander toward a rough area) → `peak` (encounter plays out; force-ended after `peakMax`, or sooner at high intensity) → `relax`. Relief is shortened in Act III and lengthened after deaths.
- **Snapshots for checkpoints.** `story.snapshot()` / `restore()` serialize flags, inventory, door states and the player position to `localStorage`. The Director's learning deliberately survives retries (*it remembers*) but resets on New Game.

## Performance architecture

| Technique | Effect |
|---|---|
| Merge static walls/floors/props per floor and material (`compact()`) | The worst view went from 292 to 143 draw calls |
| Floor visibility: only the current floor, plus a neighbour if a stairwell is in the frustum | About 2/3 of geometry skipped |
| Shadows only from the torch, and only on the current floor's casters | One shadow map |
| **Light pool**: 6 point lights, reassigned each frame to the nearest practical lamps | A constant light count, so **no shader recompiles** |
| Shader **prewarm** at boot (all floors + Listener + bottle) | Removes first-sight stalls |
| No per-frame allocation in hot paths (temp vectors reused) | No GC hitches |

## Build and deployment

- `vite build` produces `dist/` (index.html + one JS + one CSS chunk). `base: './'`, so it runs from any static host or sub-path.
- The game needs WebGL2 and Web Audio. Audio starts on the first click (autoplay policy).
- There's no server component, and saves are kept in `localStorage`.

## Tooling (outside the game bundle)

| File | Purpose |
|---|---|
| `tools/browser.mjs` | Launches headless Chromium (`@sparticuz/chromium` + `puppeteer-core`) with SwiftShader WebGL2 |
| `tests/e2e/run.mjs` | End-to-end bot: 14 tests, covering every ending (see TESTING.md) |
| `tests/unit/grid.test.js` | Node unit tests for the world model |
| `tools/tour.mjs` | Screenshot tour of 15 viewpoints: luminance stats, draw calls, triangles |
| `tools/pacing.mjs` | A bot "player" lives N simulated minutes with the Listener; logs Director pacing to `docs/pacing/` |
| `tools/shot.mjs`, `tests/e2e/debug.mjs` | Ad-hoc screenshot / in-page debugging harnesses |
