# The Quiet at Marlowe House — Design Document

> *Fenland, England, November 1931. Something in the house is listening.*

A short first-person psychological horror game for the browser (an estimated 40–70 minutes for a first playthrough; the act timings below are design targets, not measured with human players). You are hunted by a creature that hunts by **sound**. You can't fight it. You can only be quiet, read the house, and decide what to do with what you learn.

Design pillars, each traced to the research in [RESEARCH.md](RESEARCH.md):

1. **Silence is the mechanic.** Every action makes a noise with a radius, and the creature hears it through the house's real geometry (doors muffle, distance fades). The player's own footsteps become the scariest sound in the game.
2. **Implication before revelation.** Act I has no monster at all, only evidence of one.
3. **Fair fear.** Every threat is telegraphed. Every death is explained. There are no meters, and no hidden cheating by the AI.
4. **The house tells the story.** Scattered documents and the layout of the rooms themselves add up to one cause-and-effect chain.
5. **Small and polished over big and broken.** One house, three floors, about 25 rooms, one creature, three endings.

---

## Premise

You are the inventory clerk for Hale & Whitcombe, solicitors. The Marlowe family hasn't been seen in the village for six weeks, and you've been sent to catalogue the contents of Marlowe House ahead of probate. The family were Dr. Ada Marlowe (acoustic physicist, formerly of the Cavendish), her husband Thomas, and their daughter Clara, aged 8. The constable called twice, found the house "quiet", and declined a third visit.

The front door slams shut behind you.

## What happened here (the story the house tells)

Ada built an **anechoic chamber**, "the Quiet Room", in the cellar, wanting to record "what is there when nothing is". Her master reel caught something, and playing the reel back *released* it. The **Listener** is drawn to sound, and it **takes voices**: whatever it hunts down, it keeps the voice of. Thomas was taken first, and the creature now speaks with his voice. Clara survived longest by inventing rules (chalk crosses on squeaky boards, hiding in wardrobes, holding her breath) before she too was taken. Ada's last journal works out the way to end it: lure the creature into the chamber with the reel, then seal the vault door. The voices it took are recorded on three wax cylinders hidden around the house.

The player can piece all of this together from **13 documents**: a solicitor's letter, a newspaper clipping, Clara's rules, Ada's letters and journals, the generator manual and others. None of them are required. The critical path is readable from objectives alone; the documents give it meaning and **teach the mechanics in-fiction**, the way Clara's rules do.

## Characters

| Character | Role |
|---|---|
| **The clerk** (player) | An outsider, so the player learns the house and its rules alongside the character. Never seen, never named. |
| **Dr. Ada Marlowe** | Brilliant and guilt-ridden. Her journals carry the main plot and the solution. |
| **Thomas Marlowe** | Taken first. The creature's **mimicry** uses his voice; he's a presence only through absence. |
| **Clara Marlowe (8)** | The tutorial, written in-world: her "Quiet Rules" teach every mechanic in a child's voice. |
| **The Listener** | Tall, in a long coat, with a dented brass **gramophone horn** where its head should be. It moves slowly and opens doors slowly. A crackling hum announces it, and in Act III that hum goes silent when it stalks close. It never runs on the spot or teleports in view. |

## The Listener's rules (what the player can learn)

- It **hears** every noise you make: running, walking, creaky boards (marked with chalk ✕), doors, cranking the torch, breaking glass. Crouching and walking on rugs reduce the noise. Closed doors and distance muffle it.
- It **sees** you if you're in its view and lit. Its "eyes" are weak, but your torch beam on it, or on you near it, gives you away.
- It **opens doors**, slowly, so a door bought you a few seconds, not safety.
- It **inspects hiding places** near where it was drawn. If it stops outside your wardrobe and inhales, hold your breath (Space). Breath lasts 9 s, and there's a 0.7 s grace after you let go.
- If it **saw you climb in**, hiding won't save you. Break line of sight first (Clara's rule 10).
- **It learns.** After three bottle lures it starts tracing where the glass came from. A hiding spot where you've survived two inspections gets checked more often and for longer. Each unlock is **telegraphed once** with a caption, so nothing feels like a cheat.

## Mechanics

| Mechanic | Design intent |
|---|---|
| **Noise radius** for every action, propagated by flood-fill through doors | Makes the player *listen* to themselves. |
| **Dynamo torch**: battery drains, and **R** cranks it (noisily) | The core tension trade-off: light vs. silence. |
| **Dark adaptation**: torch off, and your eyes adjust over about 3 s | Torch-off stealth is playable; the torch still matters for detail and reading. |
| **Bottles** (max 3): throw to make a noise elsewhere | The player's one way to steer the creature; becomes less reliable as it learns. |
| **Hiding + held breath** | A short, readable skill test under maximum tension. |
| **Chalk ✕ boards** | Environmental storytelling that is also a mechanic (Clara marked them). |
| **Generator** masks cellar noise (×0.4) | A risk/reward tool in Act III: power is loud to switch on, then covers you. |
| **No HUD meters** | The breath bar appears only while hidden. Everything else is diegetic (torch flicker, heartbeat, vignette). |
| **Directional captions** for every important sound ("[a door creaks] (above)") | Accessibility and tension in one. |

## Structure and pacing

| Act | Content | Threat |
|---|---|---|
| **I — The House** (≈10–15 min) | Foyer, hall, study, nursery. The clock strikes **thirteen** and reveals the study key; Ada's journal; Clara's music box. | **None.** Phantom footsteps, knocks and hums on other floors (the director stages them out of sight). |
| **II — The Listener** (≈15–25 min) | Opening Clara's music box wakes it. The cellar key, then **the mimic**: Thomas's voice behind the dining-room door. | The Director's Build-Up → Peak → Relax cycle starts. |
| **III — The Quiet Room** (≈15–25 min) | Cellar: restore power, take the master reel from the vault, play it on the lab deck as a lure, hide, let it into the chamber, **seal the door**. | Shorter relief windows (×0.8); the hum goes silent when it stalks close. |

The pacing is the Left 4 Dead director pattern applied to a single creature. The 20-minute pacing logs show **8–11 peaks per 20 minutes**, mean gaps of **102–143 s**, and the first peak **90–164 s** after it wakes (see [TESTING.md](TESTING.md)).

## Meaningful decisions and endings

| Ending | How | Meaning |
|---|---|---|
| **ANSWERED** | Answer Thomas's voice when it calls you through the door. | You broke Clara's rule 8. Now it has *your* voice too. |
| **THE QUIET** | Seal the Listener in the chamber and leave. | You survived. The family stays lost. |
| **THE VOICES COME HOME** (true ending) | Find all 3 wax cylinders, and after sealing, play them into the chamber. | Exploration rewarded: the taken voices are returned, and the family stands on the step in the rain. |

The mimic choice is the moral beat. The game *wants* you to answer, and everything the house taught you says don't. Opening the door instead starts a chase, so even the "right" choice has a cost.

## Scares and the jump-scare rule

- Exactly **one hard scare**: being caught. The horn fills the screen, the torch stutters, and there's a shriek. It's always earned, because the player could hear it coming.
- Everything else is **telegraphed tension**: the clock striking 13, the front door slamming, the voice behind the door, the hum cutting out, an inhale outside your wardrobe.
- Reliable cues later turn unreliable, a technique from the research: the hum the player learned to trust goes silent in Act III.

## Fairness rules (enforced by tests)

1. The creature can't catch a hidden player unless it saw them hide or heard them breathe during an inspection.
2. The Director only ever gives the creature a **rough area** (2–8 m), never your tile.
3. There's no endless hunt: peaks are force-ended into relief.
4. **Mercy after death:** waking from a checkpoint always gives a full relief window, and it grows if you keep dying.
5. **Every death names its cause** ("IT SAW YOU HIDE — break its line of sight first…").

## Accessibility

Brightness calibration on first launch, subtitles and directional sound captions (with size options), reduced flashing, head-bob toggle, FOV, sensitivity, invert-Y, crouch toggle, centre dot, film grain and aberration toggles, separate volume sliders, three difficulty levels (Gentle is "for the story"), and hints. All settings persist.
