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

## Revisions made during development

The method changed as it met reality. Each revision is backed by an incident in [DEVLOG.md](DEVLOG.md).

| # | Original plan | What happened | Revised rule |
|---|---|---|---|
| 1 | "Testing harness first", but in practice only the screenshot harness and unit tests existed early | The e2e bot, written once the game was playable, passed **5/12** on its first run and exposed three logic bugs that screenshots couldn't see | The bot is part of the harness. **Every change re-runs the full e2e suite** before commit (14 tests, about 75 s). |
| 2 | Readability gate = mean luminance in a band | The Listener rendered as a **white blob** with a perfectly normal mean (.047). The mean hides local blow-out and silhouettes. Also, the torch-off scene was black at any setting, which no torch-on screenshot could reveal. | Luminance stats are a **smoke alarm, not a verdict**. Every key view is *looked at*. Suspicious renders are debugged by **isolation** (hide parts, read light values). Readability is handed to the player through a live calibration screen. |
| 3 | Fairness gate = "the monster may not catch a hidden player it never saw hide" | A single survival proved nothing: the first hiding run passed, then failed 3/10 in repeated trials | Fairness claims need **15–20 trials plus a control** (for example, not holding breath must still be dangerous, otherwise the mechanic is decoration). |
| 4 | Pacing gate = one simulated hunt | A single 20-minute log is noisy (2–7 deaths per run) | Pacing conclusions use **3 runs**, and deaths are logged with **causes**, which led to the death-cause screen. |
| 5 | Tests assert end states | The bottle test passed for the wrong reason: the Listener was reacting to a teleport noise | Tests assert the **causal signal** (it heard `glass`, and its goal equals the shard position) and check their preconditions. |
| 6 | "Behaviours unlock over time" was researched but deferred | Review showed the creature never adapted, so one trick worked forever | Implemented as player-driven learning, with **each unlock telegraphed once** so it reads as a rule rather than cheating. |

### What I'd keep and change next time

- **Keep:** risk-first ordering (audio and AI before content), the single debug API shared by every tool, data-driven levels, and accelerated simulation (20 minutes tested in about 8 s).
- **Change:** write the e2e bot alongside the first interactable system; define fairness experiments *before* tuning numbers; and get human playtesters for the one thing no bot can measure: whether it is actually frightening.
