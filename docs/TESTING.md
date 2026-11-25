# Test Results & Known Limitations

Everything below was measured on the final code (Node 22, headless Chromium with **SwiftShader**, a CPU WebGL2 renderer; there is no GPU in the build environment). Re-run any of it with the commands shown.

## 1. Automated test suites

### Unit tests — `npm test` → **7 pass, 0 fail, 1 skipped** (the skip is a debug map printer)

| Test | Guards against |
|---|---|
| every room reachable from the start (doors unlocked) | layout edits that orphan rooms |
| locked doors gate the study and cellar | sequence breaks |
| stairs resolve heights continuously, switch floors at the midpoint | falling through floors, AI pathing across floors |
| line of sight blocked by walls and closed doors | the AI seeing through walls |
| sound muffled by closed doors and distance | hearing that ignores geometry |
| props and triggers sit inside walkable space | unreachable items |
| furniture never disconnects rooms or blocks doors/stairs | the classic "a sofa blocks the corridor" bug |

### End-to-end bot — `npm run test:e2e` → **14 / 14 pass** (dev server *and* the production `dist/` build via `vite preview`)

The bot drives the real game in headless Chromium through `window.__game`. It uses real keyboard input for movement and hiding, the same interaction callbacks the E key triggers, and accelerated simulation for waiting.

| # | Test | Key measured result |
|---|---|---|
| 1 | Boots to title, starts, renders within draw-call budget | 105 calls, 63 interactables |
| 2 | Real keyboard movement, wall collision, foyer trigger slams the door | stopped by wall at x = 12.27; `t_foyer` fired |
| 3 | Audio engine starts on gesture; **every** procedural sound synthesizes | 34 / 34 sounds, context running at 44.1 kHz |
| 4 | Act I: clock strikes 13 → study key → journal → music box wakes the Listener | checkpoint `cellar_key` saved after waking |
| 5 | Listener hears a thrown bottle and investigates **the shatter point** | goal (15.5, 21.1) = shard (15.5, 21.1) |
| 6 | Seen in torchlight → chase → caught → death screen names cause **"seen"** → checkpoint retry keeps keys | |
| 7 | Hidden, unseen, breath held → it searches nearby and leaves | survived; closest approach 0.87 m |
| 8 | **It learns**: lures 1–2 investigated at the shatter, lure 3 traced toward the thrower; caption shown; habit spot inspect chance 0.95 vs 0.70; still survivable | 7.3 s inspection survived |
| 9 | Choice: answer the voice → ending **ANSWERED** | |
| 10 | Choice: open the door on the voice → chase | |
| 11 | Act III: power → vault → reel → lure → seal → ending **THE QUIET** | |
| 12 | True ending: all 3 cylinders → **THE VOICES COME HOME** | |
| 13 | Checkpoint persists across a page reload (Continue) | |
| 14 | Director pacing over 6 simulated minutes: menace rises, relief follows | max menace 0.8; all three phases occur |

## 2. Pacing log — `node tools/pacing.mjs [url] 20`

A bot "player" lives 20 simulated minutes with the awake Listener. It's cautious but imperfect: it walks crouched with the torch always on, flees to the nearest hiding spot under threat, and holds its breath by Clara's rule. Three independent runs (raw logs in `docs/pacing/run1-3.json`):

| Run | Peaks | Peak gap mean (min–max) s | First peak s | Longest calm s | Chases | Inspections | Hides | Deaths | …while hidden | Death-screen causes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 11 | 111 (45–177) | 90 | 177 | 6 | 5 | 15 | 6 | 4 | sawHide, seen, sawHide, sawHide, seen, sawHide |
| 2 | 8 | 143 (105–169) | 164 | 231 | 3 | 6 | 15 | 3 | 1 | seen, sawHide, seen |
| 3 | 11 | 109 (54–161) | 99 | 147 | 7 | 3 | 12 | 7 | 3 | sawHide, seen, seen, sawHide, seen, sawHide, seen |

**Reading it:**
- The rhythm is a clean tension/release wave: 8–11 encounters per 20 minutes, peak-to-peak gaps of at most 177 s and at most about 4 minutes of calm (231 s), never a non-stop hunt.
- **0 breath deaths in 60 simulated minutes**, across 14 inspections.
- Every death while hidden was "it saw you climb in". The bot fled in plain view and hid within 0.5–3 s. That's the designed, taught rule (first-chase hint, Clara's rule 10, and now the death screen), not unfairness.
- The bot dies more than a careful human should, because its torch is always on.

## 3. Fairness measurements (hiding)

| Experiment (nursery wardrobe, 15–20 trials) | Result |
|---|---|
| Original rules, breath policy by Clara's rule 5 | **3/10 deaths** from breath heard *just after* releasing, which is unfair |
| + 0.7 s breath-release grace | 20/20 survive |
| Same, but never holding breath | 7/20 die, so holding breath is a real skill, not a formality |
| "Habit" unlock at +1.5 s inspection | 15/15 survive, but worst remaining breath was **2%**, judged too tight |
| Habit at +0.75 s (shipped) | 15/15 survive; mean remaining breath 0.08 (vs 0.13 baseline) |

## 4. Visual readability & draw calls — `node tools/tour.mjs [url]`

15 fixed viewpoints, 960×540, torch on. *Mean* is linear luminance (0–1) after post-processing.

| View | Draw calls | Tris | Mean | p95 |
|---|---|---|---|---|
| foyer | 104 | 24.6k | .027 | .079 |
| hall_clock | 80 | 23.1k | .034 | .116 |
| parlour | 50 | 20.8k | .036 | .116 |
| dining | 60 | 22.6k | .052 | .205 |
| kitchen | 49 | 20.6k | .098 | .325 |
| study | 121 | 24.5k | .046 | .224 |
| gallery | 110 | 25.3k | .034 | .110 |
| nursery | 143 | 17.0k | .039 | .162 |
| master | 50 | 12.9k | .031 | .081 |
| cellar | 91 | 7.9k | .035 | .161 |
| lab_power | 49 | 5.8k | .103 | .319 |
| chamber | 26 | 4.3k | .025 | .083 |
| listener (mid-range) | 120 | 26.9k | .038 | .143 |
| listener_close | 89 | 24.8k | .025 | .107 |
| stairs_up | 140 | 30.7k | .037 | .142 |

**All views are under the 150 draw-call budget**; the worst was 292 before the merge/culling passes. Darkness is intentional, and readability is handled by the torch, dark adaptation and the first-launch brightness calibration (range 0.6–1.8 on the live scene).

## 5. Performance (production build, 1280×720, SwiftShader CPU rendering)

| Area | FPS (software) | Draw calls |
|---|---|---|
| Foyer | 33–45 | 97 |
| Hall | 23–26 | 66 |
| Nursery | 20–21 | 128 |
| Cellar | 20–21 | 93 |

- JS heap **15 MB**. Bundle **739 KB / 200 KB gzipped**, with no other downloads.
- **Stall fixed:** entering the cellar used to freeze for **1.4 s**. Cause: pooled lights were toggled `visible`, which changed the light count and recompiled every shader. They now stay visible at zero intensity, and a shader prewarm runs at boot (≈0.5 s, behind the title).
- Remaining worst frame: **≈445 ms once, at game start** (first shadow-map pass), hidden by the fade-in.
- These are **software-rendering** numbers, so they're a pessimistic bound. A real GPU should be far faster, but **this was not measured**.

---

## Known limitations (honest list)

1. **No human playtesting.** Fear, pacing and difficulty were evaluated through proxies (bots, telemetry, screenshots). The estimated 40–70 minute playtime is unverified. The bot can't tell us whether the game is *scary*, only that its scare machinery works as designed.
2. **No real-GPU performance data.** Only SwiftShader was available. Mobile isn't supported (it needs mouse + keyboard with pointer lock), and there's no gamepad support.
3. **Procedural art has a ceiling.** Props and the Listener are built from primitives with canvas textures. Darkness and post-processing carry the mood, but the art won't match an asset-based game. The Listener's animation is a procedural rig (stoop, sway, reach), not mocap.
4. **Voices are synthesized murmurs**, not recorded speech. The dialogue (Thomas's mimicry, the cylinders) is carried by subtitles. Web Audio synthesis can't produce intelligible words without recorded assets.
5. **E2E coverage of navigation.** Story tests teleport between beats and use the real interaction callbacks. Real-input walking is covered by the movement test and the pacing bot, but no test walks the whole critical path on foot.
6. **The hiding margin is deliberately tight.** The bot survives every inspection with optimal timing, but mean remaining breath is only about 8–13%. A human who starts holding too early may gasp. Gentle difficulty lowers the inspection chance (0.45 vs 0.70).
7. **The Director only learns two behaviours** (glass tracing, habit spots). Learning resets on New Game, and there's no long-term profile across playthroughs.
8. **Single save slot** in `localStorage`; clearing site data loses progress and found endings.
9. **One large JS chunk** (Vite warns at over 500 KB, mostly three.js). Fine for a single-page game, but not code-split.
10. **Tooling quirk:** `tools/tour.mjs <url> <out> <oneView>` can capture the fade-in frame on a single-view run. Full tours are correct.
