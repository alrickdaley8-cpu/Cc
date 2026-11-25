# Research Findings

Research came before any code. Every finding below is tied to a concrete decision in *The Quiet at Marlowe House*.

## 1. Fear comes from anticipation, not from the scare itself

**Findings**
- Pacing is "the relationship between an activity, the intensity of that activity, and the duration of that activity". Horror needs much slower pacing than other genres, and longer gaps between events make players keep asking what is around the next corner ([Eaves, *Fundamentals of Designing a Horror Game*](https://www.linkedin.com/pulse/fundamentals-designing-horror-game-thomas-eaves)).
- Constant terror wears players out and numbs them. Tension-and-release cycles, plus "false security", keep scares sharp. Jump scares work best when used rarely ([Uptheblades, *Horror Games Techniques*](https://uptheblades.com/horror-games-techniques/)).
- Fear loop: **anticipation, then surprise, then relief, then a new threat** ([Algoryte, *The Art of Fear*](https://medium.com/@algoryte/the-art-of-fear-level-design-secrets-for-spine-chilling-horror-games-8a3e10059c09)).

**Decisions**
- Act 1 has **no active threat**. Fear comes only from implication (footsteps that copy yours from the floor above, a clock that strikes thirteen, a door slamming upstairs). The monster appears only after the player has spent 5–10 minutes imagining it.
- The game has exactly **one hard jump-scare moment** (the catch/death). Every other scare is telegraphed.

## 2. The player's imagination is the best graphics card

**Findings**
- Thomas Grip (Frictional Games, *Amnesia*, *SOMA*) argues that players play the **mental model** they build in their heads, not the game's real systems. Vague but consistent threat rules ("don't make noise", "don't look at it with your light") make a richer, more horror-like model than exact numbers. If the model is *too* vague, though, it breaks down and frustrates players ([Frictional, *Thoughts on Alien: Isolation and Horror Simulation*](https://frictionalgames.com/2014-10-thoughts-on-alien-isolation-and-horror-simulation/)).
- Frictional playtests by playing late at night in long sessions and "editing" the horror. They say horror cannot be designed by "finding the fun" first ([Game Developer, *Four ways to design for horror*](https://www.gamedeveloper.com/design/four-ways-to-design-for-horror-from-i-amnesia-i-dev-frictional-games)).
- "As a writer you need to leave gaps … the player's imagination is the best graphics card we have" ([Frictional, Q&A with Ian Thomas](https://frictionalgames.blogspot.com/2018/02/)).

**Decisions**
- There are **no visible meters** for noise or detection. Noise is shown through diegetic sound only: your own footsteps, creaks and breathing. The player learns the rules from the fiction ("Clara's Quiet Rules" note) rather than a tutorial UI.
- Rules are kept **consistent and learnable** (sound attracts it, light shone on it alerts it, it opens doors slowly and audibly) so the mental model holds up.
- The monster is seen rarely, mostly in silhouette. The story deliberately leaves out what the Listener actually *is*.

## 3. Two-brain AI: a director that knows, and a monster that must find you

**Findings**
- *Alien: Isolation* gives its creature "two brains". A **Director** always knows where the player is and periodically gives the creature a *rough* idea of where to look. The creature's own behaviour tree and senses then have to find the player. A **menace gauge** rises with proximity and visibility. When it peaks, the director sends the creature away ("backstage") so the player can make progress ([Svelch, *Game Studies* 20(2)](https://gamestudies.org/2002/articles/jaroslav_svelch); [Thompson, *AI and Games*](https://www.aiandgames.com/p/revisiting-alien-isolation)).
- Players resent creatures that obviously cheat. The director should only hint the *area*, never the exact position ([Svelch](https://gamestudies.org/2002/articles/jaroslav_svelch)).
- *Left 4 Dead*'s AI Director tracks intensity and cycles **Build-Up → Peak → Relax**. It was built as "a layered set of extremely simple, playtestable algorithms" ([Booth, GDC 2009, summarised by Center Consulting](https://centerconsulting.com/ai-library/concepts/l4d-director)).

**Decisions**
- `src/ai/director.js` uses a menace gauge with BUILD / PEAK / RELAX phases. It only sends the Listener to a **random tile near** the player, never to the player's exact position.
- `src/ai/listener.js` hunts using only its own senses: hearing through the house's room graph, and short-range sight plus "light on me" detection.
- Each layer is simple and testable on its own (unit tests cover hearing, pathfinding and the director's phase changes).

## 4. Sound is the primary horror channel

**Findings**
- With sound enabled, heart-rate spikes were more frequent and higher. Without sound, players were "rather bored than scared" (Wöhrman et al., summarised in [*the sound of fear*](https://spookedwithnic.substack.com/p/the-sound-of-fear)).
- Kockesen's *Amnesia* study found **reliable audio cues that later become unreliable raise fear levels** ([LIACS thesis](https://theses.liacs.nl/pdf/20152016-KockesenG.pdf)).
- Fear-inducing psychoacoustic factors include roughness, dissonance and pitch instability, low frequencies, and **temporal contrast** (silence after density) ([Zhao, *Communications in Humanities Research*, 2026](https://chr.ewaoa.com/article/view/36662)).
- The Web Audio API supports HRTF spatialisation, distance models and convolution reverb natively ([W3C Web Audio API 1.1](https://www.w3.org/TR/webaudio-1.1/)).

**Decisions**
- All audio is **procedurally synthesised** with Web Audio: rain, wind, thunder, creaks, footsteps by surface, door creaks, clock chimes, the music box, the generator, the heartbeat and the Listener's crackling "gramophone" hum. The Listener uses an HRTF panner with occlusion low-pass filtering.
- **The core mechanic *is* sound.** The Listener hunts by ear, and everything the player does has a sound cost.
- The Listener's hum starts out as a **reliable** proximity cue. In Act 2, the director begins sending **false cues**: stolen voices and knocks from empty rooms. During a hunt the Listener can go silent ("it holds its breath").
- The **anechoic chamber** uses temporal contrast. Entering it cuts every sound except your heartbeat and a faint tinnitus tone.

## 5. Environmental storytelling: "What happened here?"

**Findings**
- Smith & Worch define environmental storytelling as "staging player-space with environmental properties that can be interpreted as a meaningful whole". It relies on the player connecting separate elements, it works best with a clear **chain of cause and effect**, and it can **telegraph gameplay** (for example, blood trails warning of danger) ([GDC 2010 notes](https://www.worch.com/files/gdc/What_Happened_Here_Web_Notes.pdf)).

**Decisions**
- The family soundproofed the house as they hid. Players see **mattresses nailed to walls, blankets over windows, cutlery wrapped in cloth, clock pendulums removed, horns taken off every gramophone**. Each prop matters alone and adds to the bigger picture.
- **Clara's chalk crosses** mark creaking floorboards. They are story (a child's survival game) and a gameplay telegraph (step around them) at the same time.
- Writing on the walls ("IT IS NOT HIM. DO NOT ANSWER.") primes the player for the voice-mimic mechanic before they first hear it.

## 6. Vulnerability and resource tension

**Findings**
- Helplessness needs balance: "too powerless, and they quit; too powerful, and the fear dies" ([Algoryte](https://medium.com/@algoryte/the-art-of-fear-level-design-secrets-for-spine-chilling-horror-games-8a3e10059c09)).
- Scarcity creates fear when it forces risk decisions, not when it turns into bookkeeping (Grip via [GameSpace](https://gamespace.com/all-articles/news/bullets-backpacks-and-breaking-points-how-scarcity-defines-survival-horror/)).

**Decisions**
- The player has **no weapons**. Their tools are a **hand-crank dynamo torch** (recharging it is *loud*, so light costs sound), **throwable bottles** for distraction, **hiding places**, and **held breath**.
- There is only one resource: torch charge. It is renewable, but only by taking a risk.

## 7. Technology research

**Findings**
- Godot 4 web exports can't do procedural audio generation, reverb or audio effects in the default *Sample* playback mode, and positional audio "may not always work correctly" ([Godot docs, *Exporting for the Web*](https://docs.godotengine.org/en/latest/tutorials/export/exporting_for_web.html)). Since this game's core mechanic depends on audio, that rules Godot out.
- Three.js performance comes down to draw calls (aim for under ~100–150), merging static geometry, capping pixel ratio, and keeping shadows cheap and few ([hontran.dev](https://www.hontran.dev/blog/three-js-performance-optimization); [MetaDesign](https://metadesignsolutions.com/blog/threejs-performance-optimization-best-practices)).

**Decisions**
- **Three.js + raw Web Audio + Vite** (full comparison in `ARCHITECTURE.md`).
- Static level geometry is merged **per floor per material**. The game uses one shadow-casting light (the torch) and a **fixed pool of lights**, so material shaders never recompile at runtime. It renders at **reduced internal resolution** and upscales through a film-grain post pass. That costs very little and gives a coherent lo-fi analogue look that hides the procedural, low-poly art.

## 8. Accessibility

**Findings**
- Xbox Accessibility Guideline 117 recommends options to turn off or adjust camera shake, head bob and motion blur, and to adjust FOV and sensitivity. Brightness and contrast options help with dark scenes ([summarised here](https://techyorker.com/horror-game-settings-for-less-motion-sickness-and-eye-strain/)).

**Decisions**
- The options menu includes: FOV, mouse sensitivity, invert Y, head bob on/off, brightness, film grain and chromatic aberration on/off, **reduced flashing** (dims lightning), subtitles and sound captions, separate volume sliders, crouch toggle or hold, and a **Gentle** difficulty.
