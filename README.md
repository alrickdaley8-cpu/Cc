# WILDREACH — 3D Multiplayer Survival

A full-stack, cross-device 3D multiplayer survival game built with **TypeScript**, **Three.js (WebGL2)**, **Vite**, **Node.js**, **Express**, **Socket.IO**, and **Vitest**.

> **Works everywhere with REAL multiplayer:** Desktop (WASD + Mouse), Tablet & Mobile (Dual-Thumb Virtual Joystick + Touch Camera Look + Ergonomic Action Pad), live Node.js 20Hz Socket.IO servers, AND **static GitHub Pages with ZERO backend via built-in Serverless WebRTC P2P (`trystero` Nostr signaling) + same-browser `BroadcastChannel` sync!**

## Live GitHub Pages & Root Preview (Works Out of the Box!)

The production client bundle is synced directly to the **repository root** (`index.html`, `404.html`, `.nojekyll`, `assets/`) AND wired to an automated GitHub Actions workflow (`.github/workflows/deploy-pages.yml`).

That means **every** GitHub Pages & preview method works immediately:
- **GitHub Pages (Deploy from a branch → `/ (root)`):** Go to **Settings → Pages**, pick your branch and **`/ (root)`**, and click Save — live at **`https://alrickdaley8-cpu.github.io/Cc/`**!
- **GitHub Pages (GitHub Actions):** Or pick **Source → GitHub Actions** for automatic rebuilds on every push to `main`.
- **Root Static / Iframe Previews:** Open `index.html` from any static server (`npx serve .`, `python3 -m http.server`, Arena Live Preview, or embedded iframe preview). Drag-to-look + click-to-act fallback automatically activates whenever an embedded preview restricts Pointer Lock.

### 3-Tier Universal Multiplayer (Automatic Transport Selection)
1. **Live 20Hz Dedicated Server (Socket.IO WebSockets):** Automatically activates when running `npm start`, Arena Preview, or whenever a custom server URL (`?server=https://...`) is provided. Includes automatic Socket.IO reconnection with persistent `playerToken` session/inventory/XP restore and automatic Host Crown handoff!
2. **Serverless WebRTC P2P Multiplayer (GitHub Pages / Static Hosting — Zero Backend!):** On static GitHub Pages, sharing your **`🔗 Copy Invite Link`** (`?room=your-island`) connects friends directly browser-to-browser via **WebRTC DataChannels (`trystero` Nostr relays)** — the first player automatically becomes the authoritative **P2P Host** (running a hidden-tab-proof Web Worker 20Hz tick clock!) and friends join seamlessly as **P2P Crew**!
3. **Instant Same-Browser Multi-Tab Sync (`BroadcastChannel`):** Open two browser tabs to the same `?room=...` link on static hosting and test real-time multiplayer instantly with near-0ms latency!

## Features

- **Upgraded Co-op Multiplayer & Netcode:**
  - **Buffered Entity Interpolation (`InterpolationBuffer`):** Timestamped snapshot buffer (`95ms` render delay, shortest-arc yaw wrap, bounded velocity extrapolation, instant teleport snap) makes remote players glide at buttery 60–144 FPS with zero network jitter.
  - **Multi-Passenger Boats:** Friends can sail together on the same ship! **Timber Raft** (2 crew), **Outrigger Skiff** (3 crew), and **Viking Dragon Longship** (6 crew) — Captain steers at the helm while friends ride on deck seats with full buoyancy & shared cargo holds.
  - **Co-op Downed & Revive System:** When teammates are present, hitting 0 HP puts you in a **30-second Downed bleedout state** with a pulsing `⚠ [E] REVIVE!` beacon so allies can rush in and rescue you (`+35 XP`).
  - **3D World Pings (`[G]` or Middle-Click):** Drop glowing vertical sky-beam beacons synced to every player's 3D world, HUD minimap, and full Archipelago Chart!
  - **3D Overhead Chat Bubbles & Host Crown Nameplates:** Chat messages float cleanly above your teammate's head in 3D space alongside their live HP bar, level, and `👑` Host Crown.
  - **Live Crew & Party Roster (`[P]` or click top-right HUD chip):** View every player's live status, ping, distance, **⚡ Rally Teleport** straight to a friend, copy invite link, drop a ping, summon AI allies, or toggle PvP duels.

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
