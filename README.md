# WILDREACH — 3D Multiplayer Survival

A full-stack, cross-device 3D multiplayer survival game built with **TypeScript**, **Three.js (WebGL2)**, **Vite**, **Node.js**, **Express**, **Socket.IO**, and **Vitest**.

> **Works everywhere:** Desktop (WASD + Mouse), Tablet & Mobile (Dual-Thumb Virtual Joystick + Touch Camera Look + Ergonomic Action Pad), live Node.js multiplayer servers, AND static **GitHub Pages** hosting via an automatic built-in browser survival simulation fallback!

## Live GitHub Pages & Root Preview (Works Out of the Box!)

The production client bundle is synced directly to the **repository root** (`index.html`, `404.html`, `.nojekyll`, `assets/`) AND wired to an automated GitHub Actions workflow (`.github/workflows/deploy-pages.yml`).

That means **every** GitHub Pages & preview method works immediately:
- **GitHub Pages (Deploy from a branch → `/ (root)`):** Go to **Settings → Pages**, pick your branch and **`/ (root)`**, and click Save — live at **`https://alrickdaley8-cpu.github.io/Cc/`**!
- **GitHub Pages (GitHub Actions):** Or pick **Source → GitHub Actions** for automatic rebuilds on every push to `main`.
- **Root Static / Iframe Previews:** Open `index.html` from any static server (`npx serve .`, `python3 -m http.server`, Arena Live Preview, or embedded iframe preview). Drag-to-look + click-to-act fallback automatically activates whenever an embedded preview restricts Pointer Lock.

### Adding Live Online Co-op to Your GitHub Pages Link
- By default on static GitHub Pages, WILDREACH automatically boots in **Local World Mode** (full 3D world, AI camp allies, wildlife, crafting, building, and `localStorage` auto-save).
- For **real-time online multiplayer** across devices, deploy the included `render.yaml` (one-click on Render) or `Dockerfile` (Fly.io / Railway / VPS), then either:
  - Paste your server URL into the Lobby's **Multiplayer Server URL** field, OR
  - Share a direct invite link: `https://alrickdaley8-cpu.github.io/Cc/?room=emerald-archipelago&server=https://your-server.onrender.com`

## Features

- **Cross-Device Responsive UI & Controls:**
  - **Desktop:** Full Pointer-Lock camera (plus Right-Drag fallback), WASD movement, scroll/number hotbar, keyboard shortcuts.
  - **Mobile & Tablet (Portrait & Landscape):** `100dvh` + safe-area insets, dynamic portrait vertical FOV, adaptive GPU budget, simultaneous multi-touch virtual analog joystick (auto-sprint at outer rim), right-side touch-drag camera look, ergonomic right-thumb action buttons (`ACT`, contextual `USE`, `JUMP`, `ROLL`, build `Rotate`/`Cancel`), tap-friendly quick-bar & clickable minimap.
- **Deterministic 440m × 440m Archipelago + Explorable Outer Islands:** Sail across open ocean from the South Harbor Jetty to **Shipwreck Coral Atoll**, **Volcanic Obsidian Isle** (home of the *Volcanic Cinder Golem* boss), and **Sea-Arch Sanctuary**. Enhanced GLSL ocean shader with synced 4-wave displacement, subsurface crest glow, seabed caustics, and crest whitecaps, plus soaring coastal seagulls, glowing fireflies, bioluminescent coral reefs, and volumetric sun-shaft god rays.
- **Craftable & Sailable Boats (Real Wave Buoyancy & Wind Physics):**
  - **Timber Raft** (Starter & early-game coastal craft, moored at the South Harbor Jetty), **Outrigger Skiff** (fast coastal vessel with 4-slot cargo hold), and **Viking Dragon Longship** (high-HP ocean voyager with carved dragon prow, twin lanterns, ramming damage, and 12-slot cargo hold).
  - Real GPU/CPU-synced 4-probe wave buoyancy, turn heel, billowing sails, Kelvin wake foam, wind-angle sailing efficiency (*Tailwind / Crosswind / Headwind*), 5 throttle gears (`REV / STOP / ROW / HALF / FULL`), and onboard cargo transfers (`[F]`).
- **Expanded Survival, Fishing, Farming & Alchemy:** 5 vitals, 62+ items, 38+ crafting & brewing recipes (*Hand / Campfire / Workbench / Furnace / Alchemy Cauldron / Runic Forge*), 23 snapped building pieces (*Wooden Dock Piers, Rotating Lighthouse Beacons, Planter Boxes, Alchemy Cauldrons, Spinning Windmills, Tiki Braziers, Camp Banners*), interactive **Bamboo Fishing Rod** with 3D floating bobber, **Brass Spyglass** 3× optical zoom, new creatures (*Giant Reef Crabs, Ocean Sea Serpents, Volcanic Cinder Golem*), `[AI]` camp allies, and procedural Web Audio.

## Architecture

```
├── shared/    # @wildreach/shared — deterministic terrain/noise, items, recipes, building snap math, protocol
├── server/    # @wildreach/server — authoritative 20Hz Socket.IO multiplayer server, wildlife/bot AI, persistence
├── client/    # @wildreach/client — Three.js WebGL2 engine, TouchControls, LocalGameEngine fallback, responsive HUD
├── tests/     # Vitest unit tests covering deterministic worldgen, building, inventory & LocalGameEngine
└── .github/   # CI verification & GitHub Pages automated deployment workflows
```

## Local Development

```bash
npm install
npm run typecheck
npm test
npm run build
npm start        # Runs production multiplayer server + client at http://localhost:3001
```

## Controls

| Action | Desktop | Mobile / Tablet |
|---|---|---|
| Move & Sprint | `W A S D` + `Shift` | Left Virtual Joystick (push outer ring to sprint) |
| Look / Aim | Mouse (Click to lock or Right-Drag) | Drag anywhere on right side of screen |
| Jump / Swim Up | `Space` | `JUMP` button |
| Chop / Attack / Draw Bow / Place | Left Click (hold for Bow) | `ACT` button (hold for Bow) |
| Interact / Pick Up / Drink / Chest | `E` | `USE` button (lights up teal near targets) |
| Dodge Roll | `Q` | `ROLL` button |
| Inventory / Crafting / Build / Map | `Tab` / `C` / `B` / `M` | Top-right Quick Toolbar & Tap Minimap |
| Rotate / Cancel Build | `R` / Right Click | On-screen `↻ Rotate` / `✕ Cancel` pills |
| Camera (3rd / 1st) | `V` | `👁` Quick Button |
| Board / Disembark Boat & Sail | `E` to board/exit • `W/S` Sail Gears • `A/D` Rudder • `F` Ship Cargo | `USE` to board • Joystick / HUD Gear Buttons • Cargo Button |
| Fish / Spyglass Zoom | Equip Fishing Rod or Spyglass + Left Click | Equip + Tap/Hold `ACT` |
| Chat Commands | `Enter` (`/time day`, `/time dusk`, `/weather rain`) | `💬` Quick Button |
