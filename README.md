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
- **Deterministic 360m × 360m Multi-Biome Archipelago:** 7 distinct biomes (*Emerald Meadows, Whispering Pines, Sunlit Palms, Autumn Ridge, Mossy Wetlands, Misty Crags, Snowcap Peak*), custom PBR splat terrain, GLSL water with depth absorption/Fresnel/caustics/foam, Rayleigh/Mie sky, aurora borealis, volumetric weather, instanced wind-animated grass, and landmarks (*Sanctuary Hearth*, *Crystal Spring*, *Ancient Watchtower*).
- **Complete Survival Loop:** 5 vitals (*Health, Stamina, Hunger, Thirst, Warmth*), 42 items, 26 crafting recipes across *Hand / Campfire / Workbench / Forge*, 16 snapped building pieces, shared chests, wildlife + nocturnal *Shadow Stalkers*, `[AI]` camp allies, and procedural Web Audio.

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
| Chat Commands | `Enter` (`/time day`, `/time dusk`, `/weather rain`) | `💬` Quick Button |
