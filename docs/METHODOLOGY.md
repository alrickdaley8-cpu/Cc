# Development Methodology: "Fear-Loop-First, Harness-Verified Iteration"

## Approaches compared

| Approach | Strength | Why it fails for *this* project |
|---|---|---|
| **Waterfall / GDD-first** (design everything, then build) | Clear scope | Horror can't be judged on paper. Frictional say fear has to be "felt" and edited ([source](https://www.gamedeveloper.com/design/four-ways-to-design-for-horror-from-i-amnesia-i-dev-frictional-games)). Late discoveries would be expensive. |
| **"Find the fun" prototyping** (game-jam loop) | Fast feedback | Horror isn't "fun-first". A stealth loop can work mechanically and still not be scary. It also tends to produce throwaway code. |
| **Content-first** (build all rooms, then systems) | Looks impressive early | The highest-risk systems (the AI, audio-driven detection, readable darkness) get validated last. |
| **Engine-tutorial pipeline** | Familiar | Generic. It doesn't target what makes *this* game work: sound. |

## Chosen method

A **risk-ordered vertical slice** built around one sentence, *"you are hunted by something that hears you"*. Every stage ends at a **measurable gate** checked by an automated harness, because I can't sit in a dark room and feel fear myself. The harness turns "is it scary?" into testable proxies:

1. **Readability gate.** Headless screenshots at fixed spots. Mean luminance has to sit in a target band: dark, but never unreadable.
2. **Reliability gate.** Unit tests for the pure systems (grid, pathfinding, hearing, director). A scripted **bot playthrough** must reach *every* ending through the real game code.
3. **Pacing gate.** Director telemetry from a simulated hunt: menace must rise and fall in waves (BUILD → PEAK → RELAX). A flat line means boredom; a pinned high line means exhaustion.
4. **Performance gate.** Draw calls per frame (target < 150) and frame time in the headless browser (CPU-rendered, so a pessimistic bound).
5. **Fairness gate.** The monster may not catch a hidden player it never saw hide. Every scare needs a telegraph (a sound or light cue happening ≥ 1 s before it).

## Stage order (by risk)

1. **Testing harness first.** Without it, nothing else can be measured in this environment.
2. **Grid world + movement + darkness/torch.** Is darkness readable? Does moving feel right?
3. **Audio engine.** The core mechanic depends on it.
4. **Listener AI + director.** Highest gameplay risk.
5. **Interaction/inventory/story/scripted beats**, connecting the loop to progression.
6. **Content pass.** Props, environmental storytelling, all three floors.
7. **Endings, checkpoints, menus, accessibility.**
8. **Polish loop.** Repeat RESEARCH → DESIGN → BUILD → TEST → MEASURE → ANALYZE → IMPROVE.

## Process rules

- **Data-driven levels.** Rooms, doors, props and triggers live in one data file, so layout tweaks don't touch engine code.
- **One debug API** (`window.__game`) shared by the bot, the screenshot tests and manual debugging.
- **Never claim a feature works unless the harness or a test has exercised it.**
- **Process retrospectives**: at the end of each stage, note what slowed me down and change the process. These are logged in `DEVLOG.md`.
