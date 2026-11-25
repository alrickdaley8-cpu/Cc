# Development Log — Improvements Made During Development

Each entry follows the loop from [METHODOLOGY.md](METHODOLOGY.md): **TEST → MEASURE → ANALYZE → IMPROVE → RE-TEST**. Every fix below was found by a tool or test (not assumed) and verified after the change.

## Stage A — Foundation

| Found | How | Fix |
|---|---|---|
| A plain `@sparticuz/chromium` launch failed (missing `libnspr4.so`) | Harness bring-up | `tools/browser.mjs` wraps the launch with the right libraries and SwiftShader flags. Every later test depends on it. |
| A HalfFloat render target bypassed three.js tone mapping, giving washed-out, banded frames | First screenshots | `post.js` does ACES + sRGB itself, and the renderer uses `NoToneMapping`. |
| `renderer.info.render.calls` only reported the post pass | Perf gate showed "1 call" | Added `post.sceneCalls` / `sceneTris`, sampled before the post pass. |

## Stage B — Core gameplay

| Found | How | Fix |
|---|---|---|
| A* broke across floors when stair lookups omitted the floor | Unit test: stairs | Stair queries always take a floor. Test added. |
| Furniture could block doorways or isolate tiles | Unit test 8 (new) | Footprints are shared by the renderer and nav grid; the test asserts connectivity. |
| Sealing failed: `setState('dormant')` followed by a direct state write left the Listener inert | E2E "sealed" ending | The story lure uses a single `go()` path. |
| A fragile "idle" state check in the Director stalled pacing | Director debug | Replaced with an explicit `L.bored` flag. |

## Stage C — Horror experience

| Found | How | Fix |
|---|---|---|
| **Checkpoint retry left the Listener asleep forever**: the `cellar_key` checkpoint was saved *before* it woke | E2E "death → retry" + Director debug | The checkpoint moved into `wakeListener()` after the Director starts; restore wakes it if the music box was opened. |
| **Hiding was unfair: 3/10 deaths** from breath heard right after releasing | Hiding experiment (20 trials) | 0.7 s breath-release grace. Now 20/20 survive, and 7/20 die if you don't hold your breath, so the skill still matters. |
| The vault door noise (loud 5) pulled the Listener across the cellar during a scripted beat | E2E Act III | Reduced to 3; the chamber auto-close is script-sourced, so it isn't counted as player noise. |
| **The Listener read as a white blob up close** and glowed uniformly at mid-range | Tour screenshots + debug frames that hid parts of the model | Three root causes: (1) the bounce-fill point light was placed along the beam using *wall* distance, so it sat **inside the Listener**; (2) at 0.5 m the spot gave about 20× the irradiance it does at 4 m, and dielectric specular turned every albedo white; (3) LatheGeometry winding faced inward, culling the brass. Fixes: fill placed short of the nearest hit, *including the Listener*; close-range torch falloff, `(d/2.2)^1.3`, floor 0.18 (crude eye adaptation); DoubleSide tarnished-brass throat; re-materialled skin; thinner limbs. |
| The catch scare was framed badly (creature too close, behind the camera's near plane) | Frozen catch frames | It now stands 1.9 m away, stooped, so the horn mouth fills the view from about 0.45 m away. The look is pitched to the horn, the torch stutters (unless reduced flashing is on), and there's a shriek. |
| The Listener never adapted, so the same bottle trick worked forever | Design review against the research (behaviour unlocks) | **It learns.** Glass tracing after 3 lures, and habit spots after 2 survived inspections, each telegraphed with a one-time caption. |
| Habit unlock at +1.5 s inspection left **2%** breath in the worst case | 15-trial experiment | Reduced to +0.75 s. Survival stays 15/15. |
| Deaths clustered, **3 deaths in about 100 s**, because waking from a checkpoint gave only 12 s of relief | 20-minute pacing log | Mercy: a full relief window after every death, growing ×0.6 per recent death. A monotonic `playClock` was added, because `restore()` rewinds game time. |
| Deaths felt arbitrary: "IT HEARD YOU" even when it *saw* you | Pacing log death causes | The death screen names the cause and gives a lesson (saw you hide / heard you breathe / saw you / heard you). Clara's rule 10 was added. The chase records *how* it started. |

## Stage D — World & content

| Found | How | Fix |
|---|---|---|
| Ending screen said documents `x/12`, but there are 13 | Content audit | The count comes from `Object.keys(NOTES).length`. |
| The hall mimic fired during unrelated tests | E2E flakiness | Test helpers set `mimicDone`; mimic tests reset it. |
| Bottles spawned at `g.camera.position`, which is stale after a teleport (inside the ceiling, so an instant shatter) | Learning test: glass lures never counted | Bottles spawn from player state (`x, ySmooth + eye, z`). |
| **The original bottle e2e test passed vacuously**: the Listener was reacting to the teleport noise, not the glass | Same investigation | The test now asserts the Listener heard `glass` and that its goal equals the shatter point. |

## Stage E — Polish

| Found | How | Fix |
|---|---|---|
| 292 draw calls in the worst view | Tour perf gate | Merged windows and props per floor (`compact()`), current-floor-only shadow casters, a shorter torch range, frustum-gated neighbour floors. **Worst view is now 143.** |
| **1.4 s freeze on first entering the cellar** | Production perf run (worst-frame metric) | Pooled lights were toggling `visible`, which changes the light count and recompiles all shaders. They now stay visible at zero intensity, plus a shader prewarm at boot. |
| With the torch off, the house was **pitch black even at max brightness**, so torch-off stealth meant playing blind | Brightness calibration screenshots | **Dark adaptation**: ambient rises about 6× over 3 s with a cool tint, and resets instantly when the torch comes on. |
| The brightness setting was buried, and the first calibration target (a lit portrait) was visible at any setting, so it calibrated nothing | Calibration screenshots at 1.0 vs 1.8 | First-launch calibration on the **live, torch-off, dark-adapted** scene: "raise until you can just make out the doorway". |
| The tour captured death screens (the AI caught the camera) | Tour review | Listener views use scripted hold, and every view resets to a playable state first. |

## Process retrospectives (method changes)

1. **After the first playable build:** screenshots and unit tests had missed logic bugs. The e2e bot, written once all systems existed, **passed only 5/12 on its first run**, and getting it to 12/12 exposed the checkpoint bug, the mimic leak and the sealing-visibility issue. In hindsight it should have been written alongside Stage B. From then on, **every change re-ran the full suite** before commit.
2. **After Stage C:** "Survived once" isn't evidence. Fairness claims now need **repeated trials** (15–20) plus a control (no breath-hold) to prove the mechanic matters.
3. **After the vacuous bottle test:** tests must assert the *causal* signal (heard `glass` at the shard point), not just an end state. Every test was reviewed for preconditions.
4. **After the white-blob Listener:** when a render looks wrong, **isolate by hiding parts** and reading light values, rather than tweaking materials blindly. Two blind material tweaks failed before isolation found the fill-light bug.
5. **After the pacing log:** a single 20-minute run is noisy. Pacing conclusions use **3 runs**.
