# Worldforge

Worldforge is an independent browser god-sandbox prototype inspired by the create, observe, and intervene loop of WorldBox. Shape a procedurally generated world, seed fantasy settlements, watch their populations develop, and experiment with nature and destructive powers. The art and code are original; WorldBox assets are not included.

## Run locally

Node.js 22.17 or newer is recommended (the optional browser test's Chromium package requires it).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build a production bundle, run `npm run build`.

## GitHub Pages

The repository's GitHub Pages source is the root of `arena/70e056f9-cc`. The game is published at [alrickdaley8-cpu.github.io/Cc/](https://alrickdaley8-cpu.github.io/Cc/). `index.html` and `assets/` at the repository root are generated production files; the development entry point is `src/index.html`. A second copy is generated under `docs/` so either Pages source works. Before committing game changes, run:

```sh
npm run build:pages
```

Commit generated root and `docs/` changes with the source; pushing the Pages branch deploys the site. The research and simulation notes in `docs/` are preserved. CI checks that both committed builds are current. Browser saves are local to the site's origin, not GitHub cloud saves. The game requires an HTTP server such as GitHub Pages or Vite; opening the HTML file directly may be blocked by browser module security.

## How to play

1. Select a kingdom in **World overview** and choose **Focus village** to zoom in.
2. Leave time running to let it grow, or press **Divine advance** in the village panel to grant the missing settlers and supplies and immediately see the next stage. You can also select **Kingdoms → Inspire** and click a settlement on the map.
3. Repeat through six settlement/house tiers and three town-hall appearances. As tiers rise, farms, a mine, a windmill, a watchtower, barracks, a market and a temple unlock. Buildings have individual locations and health; their effects are simplified and homes share the settlement tier.

- Choose a category on the left and a power on the bottom bar. Click or drag on the map to use it; adjust the brush with the slider or `[` and `]`.
- Zoom with the mouse wheel or the map buttons. Hold **Shift** and drag, right-drag, or select the **hand** tool to pan. The hand tool also works on touchscreens.
- Pause with **Space** or the top-bar control. Change simulation speed with the `1x` button.
- Use **Kingdoms → Demolish** on a building to ruin it. Villagers can rebuild with resources, or **Nature → Blessing** can restore it instantly.
- Use **Inspect** on a creature or a settlement to see its details, including a village’s population, resources and next-tier requirements; creatures show their current activity and can be marked as favorites. The Traits category lets you change traits and statuses in an area. Open the overview for kingdom statistics and the world chronicle.
- Open settings to control reproduction, old age, hunger, expansion, diplomacy, rebellion, fire spread, hostile monsters, and natural disasters. Existing wars can be ended with the Peace power even when natural diplomacy is off.
- Save and load one world in your browser's local storage, or use Settings to export/import a JSON world file. Creating a new world replaces the current unsaved world, not the saved slot. Choose an archipelago or empty ocean and optionally enter a terrain seed.

## Developer checks

```sh
npm test                 # simulation and save-migration tests
npm run test:browser     # headless Chromium interaction smoke tests
npm run build
```

The browser test uses a bundled headless Chromium package and checks desktop and mobile interaction. It downloads with the dev dependencies and is substantially larger than the game code. See [docs/simulation.md](docs/simulation.md) for the mechanics and limitations, and [docs/research.md](docs/research.md) for research sources.

This is a small-scale prototype, **not a feature-complete reproduction of WorldBox**. In particular, its wars are abstract local raids rather than individually pathfinding armies, and it does not yet have ships, complex cultures, or the full original game's content and systems.
