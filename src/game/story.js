// Story & progression: registers every interaction, runs triggers and scripted beats, tracks
// objectives and inventory, saves checkpoints, and decides endings.
import * as THREE from 'three';
import { bus } from '../core/events.js';
import { NOTES, ITEMS, CYLINDERS, OBJECTIVES, MIMIC_LINES } from './content.js';
import { PROPS, TRIGGERS, FLOORS, PLAYER_START } from '../world/levelData.js';
import { tileCenter } from './interaction.js';
import { NOISE } from '../player/player.js';

const SAVE_KEY = 'marlowe.save.v1';
const ENDINGS_KEY = 'marlowe.endings.v1';

export class Story {
  constructor(game, props) {
    this.game = game; this.props = props;
    this.flags = game.flags;
    this.inv = { keys: new Set(), bottles: 0, cylinders: new Set(), reel: false };
    this.taken = new Set();
    this.read = new Set();
    this.heardCyl = new Set();
    this.objective = 'explore';
    this.firedTriggers = new Set();
    this.tweens = [];
    this.timers = [];
    this.hideSpots = new Map();
    this.checkpoint = null;
    this.stats = { deaths: 0, start: 0 };
    this.mimic = null;
    this.registerAll();
    bus.on('vaultClosed', (d) => this.onVaultClosed(d));
    bus.on('chaseStart', () => { if (!this.flags.firstChase) { this.flags.firstChase = true; this.game.ui.hint('RUN. Break its line of sight — then hide.', 5); } });
  }

  // ---------------------------------------------------------------- helpers
  ia(id) { return this.props.interactables.get(id); }
  after(sec, fn) { this.timers.push({ t: sec, fn }); }
  tween(dur, fn, done) { this.tweens.push({ t: 0, dur, fn, done }); }
  hasKey(k) { return this.inv.keys.has(k); }
  setObjective(key) {
    if (this.objective === key) return;
    this.objective = key; this.game.ui.objective(OBJECTIVES[key]);
    bus.emit('objective', key);
  }
  objectiveText() { return OBJECTIVES[this.objective]; }
  take(id) {
    this.taken.add(id);
    const it = this.ia(id); if (it) it.object.visible = false;
    this.game.interaction.remove(id);
  }

  // ---------------------------------------------------------------- registration
  registerAll() {
    const g = this.game, I = g.interaction;
    for (const [id, it] of this.props.interactables) {
      const p = it.prop;
      const pos = it.pos.clone().add(new THREE.Vector3(0, 0.05, 0));
      if (p.t === 'note' || p.t === 'journal') {
        I.add({ id, floor: p.floor, pos, label: () => (this.read.has(id) ? 'Read again' : 'Read'), action: () => this.readNote(id) });
      } else if (p.t === 'bottle') {
        I.add({ id, floor: p.floor, pos: pos.clone().setY(pos.y + 0.12), label: () => (this.inv.bottles >= 3 ? 'Bottle (hands full)' : 'Take bottle'), action: () => this.takeBottle(id) });
      } else if (p.t === 'cylinder') {
        I.add({ id, floor: p.floor, pos, label: 'Take wax cylinder', action: () => this.takeCylinder(id) });
      } else if (p.t === 'wardrobe' || p.t === 'locker') {
        this.registerHide(id, it);
      }
    }
    // unique story objects
    this.registerClock(); this.registerMusicBox(); this.registerGenerator(); this.registerVault(); this.registerDeck();
    const sp = this.ia('chamber_speaker');
    I.add({ id: 'chamber_speaker', floor: 0, pos: sp.pos.clone().setY(sp.pos.y + 0.7), label: 'Chamber speaker — wired to the laboratory deck', action: () => g.ui.toast('A big horn-less speaker, felted at the edges. Cables run under the door to the laboratory.') });
    // phonographs (play collected cylinders)
    let n = 0;
    for (const p of PROPS) if (p.t === 'phonograph') {
      const id = `phono_${n++}`;
      const pos = new THREE.Vector3(p.x, FLOORS[p.floor].y + (p.small ? (p.y ?? 0) + 0.2 : 0.95), p.z);
      I.add({ id, floor: p.floor, pos, label: () => (this.inv.cylinders.size ? 'Play cylinders (makes noise)' : 'Phonograph — no cylinder'), action: () => this.playCylinders(pos, p.floor) });
    }
    // doors
    for (const d of g.world.doors) {
      if (d.kind === 'arch') continue;
      I.add({ id: d.id, floor: d.floor, pos: () => tileCenter(d.floor, d.x, d.z, 1.1), reach: 1.9, wide: true, ignoreLos: true, label: () => this.doorLabel(d), action: () => this.useDoor(d) });
    }
    // answering the voice (only during the mimic event)
    I.add({ id: 'answer', floor: 1, pos: () => tileCenter(1, 13, 13, 1.3), reach: 4.5, wide: true, ignoreLos: true, priority: 3, enabled: () => !!this.mimic && this.mimic.canAnswer, label: 'Answer him', action: () => this.answer() });
  }

  registerHide(id, it) {
    const g = this.game, p = it.prop, obj = it.object;
    const hidePos = obj.localToWorld(it.parts.hide.clone());
    const exitPos = obj.localToWorld(it.parts.exit.clone());
    const facing = ((p.r || 0) * Math.PI) / 180 + Math.PI;
    const spot = { id, floor: p.floor, hidePos, exitPos, frontPos: exitPos.clone(), facing, leaves: it.parts.leaves, kind: p.t };
    this.hideSpots.set(id, spot);
    g.interaction.add({
      id, floor: p.floor, pos: () => (g.player.hidden === spot ? g.camera.position.clone().add(g.player.forward()) : hidePos.clone().setY(FLOORS[p.floor].y + 1.2)),
      reach: 2.0, wide: true, ignoreLos: true,
      label: () => (g.player.hidden === spot ? 'Leave' : p.t === 'locker' ? 'Hide in locker' : 'Hide in wardrobe'),
      action: () => (g.player.hidden === spot ? this.leaveHide(spot) : this.enterHide(spot)),
    });
  }
  swingLeaves(spot, open, dur = 0.35) {
    const leaves = spot.leaves || [];
    const start = leaves.map((l) => l.rotation.y);
    this.tween(dur, (k) => leaves.forEach((l, i) => { l.rotation.y = start[i] + ((open ? -l.userData.sign * 1.4 : 0) - start[i]) * k; }));
  }
  enterHide(spot) {
    const g = this.game;
    if (g.listener.state === 'chase' && g.listener.seesPlayer) g.listener.sawHide = spot; // it saw you climb in
    this.swingLeaves(spot, true, 0.25);
    this.after(0.3, () => this.swingLeaves(spot, false, 0.35));
    g.player.enterHide(spot);
    g.audio.play('doorClose', { pos: spot.hidePos });
    bus.emit('noise', { f: spot.floor, x: spot.hidePos.x, z: spot.hidePos.z, loud: g.player.running ? 4 : 2, kind: 'hide', src: 'player' });
    if (!this.flags.hideHint) { this.flags.hideHint = true; g.ui.hint('Hold SPACE to hold your breath when it is close. Press E to leave.', 6); }
  }
  leaveHide(spot) {
    const g = this.game;
    this.swingLeaves(spot, true, 0.3);
    this.after(0.8, () => this.swingLeaves(spot, false, 0.5));
    g.player.exitHide();
    g.audio.play('doorCreak', { pos: spot.hidePos, slow: false });
    bus.emit('noise', { f: spot.floor, x: spot.hidePos.x, z: spot.hidePos.z, loud: 2.5, kind: 'hide', src: 'player' });
  }

  doorLabel(d) {
    if (d.kind === 'front') return this.flags.frontOpen ? 'Leave Marlowe House' : 'Front door';
    if (d.kind === 'vault') return d.open > 0.5 ? 'Shut the vault door' : 'Open the vault door';
    if (!d.unlocked) return this.hasKey(d.locked) ? 'Unlock' : 'Locked';
    return d.open > 0.5 ? 'Close' : this.game.player.crouching ? 'Open (quietly)' : 'Open';
  }
  useDoor(d) {
    const g = this.game, P = g.player;
    if (d.kind === 'front') {
      if (this.flags.frontOpen) return this.game.ending(this.flags.voicesFreed ? 'voices' : 'sealed');
      g.audio.play('locked', { pos: tileCenter(d.floor, d.x, d.z) });
      g.ui.toast(this.flags.listenerAwake ? 'It will not open. Something in this house is holding it shut.' : 'It will not budge. The latch is jammed — or held.');
      return;
    }
    if (!d.unlocked) {
      if (this.hasKey(d.locked)) {
        d.unlocked = true; g.audio.play('unlock', { pos: tileCenter(d.floor, d.x, d.z) });
        g.ui.toast(d.id === 'cellar_door' ? 'The cellar door unlocks.' : 'The study door unlocks.');
        if (d.id === 'cellar_door') this.setObjective('power');
        if (d.id === 'study_door') this.setObjective('readStudy');
        this.after(0.4, () => g.doors.open(d, { from: P, slow: P.crouching }));
      } else {
        g.audio.play('locked', { pos: tileCenter(d.floor, d.x, d.z) });
        bus.emit('noise', { f: d.floor, x: d.x + 0.5, z: d.z + 0.5, loud: 3, kind: 'rattle', src: 'player' });
        if (d.id === 'study_door') { this.flags.studyLockedSeen = true; if (this.objective === 'explore') this.setObjective('study'); g.ui.toast('Locked. A brass plate reads STUDY.'); }
        else if (d.id === 'cellar_door') { this.flags.cellarLockedSeen = true; g.ui.toast('Locked. Cold air breathes under the door.'); }
        else g.ui.toast('Locked.');
      }
      return;
    }
    if (d.kind === 'vault') {
      if (d.open > 0.5) { g.doors.close(d, { slow: true, by: 'script' }); bus.emit('noise', { f: 0, x: d.x + 0.5, z: d.z + 0.5, loud: 3, kind: 'vault', src: 'player' }); }
      else g.doors.open(d, { from: P, slow: true });
      return;
    }
    if (this.mimic && d.id === 'd_dining_hall' && d.open < 0.5) { this.mimicOpened(); return; }
    if (d.open > 0.5) g.doors.close(d, { slow: P.crouching });
    else g.doors.open(d, { from: P, slow: P.crouching });
  }

  // ---------------------------------------------------------------- items
  readNote(id) {
    const first = !this.read.has(id);
    this.read.add(id);
    this.game.audio.play('paper');
    this.game.ui.showNote(NOTES[id]);
    if (first) bus.emit('noteRead', id);
    if (id === 'journal_ada' && first) this.after(0.1, () => { if (!this.hasKey('cellar_key')) this.setObjective('musicBox'); });
    if (id === 'note_rules' && first) this.flags.rulesRead = true;
  }
  takeBottle(id) {
    if (this.inv.bottles >= 3) { this.game.ui.toast('You can only carry three.'); return; }
    this.inv.bottles++; this.take(id); this.game.audio.play('pickup');
    this.game.ui.toast(`Empty bottle (${this.inv.bottles}/3)`);
    if (!this.flags.throwHint) { this.flags.throwHint = true; this.game.ui.hint('Press Q (or right mouse) to throw a bottle. It goes to the noise.', 6); }
  }
  takeCylinder(id) {
    this.inv.cylinders.add(id); this.take(id); this.game.audio.play('pickup');
    this.game.ui.toast(`${ITEMS[id].name} (${this.inv.cylinders.size}/3)`);
    if (this.inv.cylinders.size === 1) this.game.ui.hint('Cylinders can be played on any phonograph in the house — but phonographs are loud.', 6);
    if (this.flags.sealed && this.inv.cylinders.size === 3) this.setObjective('leaveOrVoices');
  }
  throwBottle() {
    if (this.inv.bottles <= 0 || this.game.player.hidden) return false;
    this.inv.bottles--; this.game.throwables.throw();
    return true;
  }
  playCylinders(pos, floor) {
    const g = this.game;
    if (!this.inv.cylinders.size) { g.ui.toast('An old phonograph. It needs a wax cylinder.'); return; }
    if (this.playing) return;
    this.playing = true;
    const order = ['cyl_ada', 'cyl_thomas', 'cyl_clara'].filter((c) => this.inv.cylinders.has(c));
    let t = 0;
    for (const c of order) {
      for (const line of CYLINDERS[c]) {
        this.after(t, () => {
          g.audio.play('crackle', { pos, dur: 3.5, gain: 0.25 });
          g.voice(c + '_' + CYLINDERS[c].indexOf(line), line, { pos, old: true });
          bus.emit('noise', { f: floor, x: pos.x, z: pos.z, loud: NOISE.crank - 1, kind: 'phonograph', src: 'player' });
        });
        t += 4.2;
      }
      this.heardCyl.add(c);
    }
    this.after(t, () => { this.playing = false; });
  }

  // ---------------------------------------------------------------- clock (study key)
  registerClock() {
    const g = this.game, it = this.ia('clock');
    this.clockDoor = it.parts.door; this.clockKey = it.parts.key;
    g.interaction.add({
      id: 'clock', floor: 1, pos: it.object.localToWorld(new THREE.Vector3(0, 1.1, 0.2)), reach: 2, wide: true,
      label: () => (this.flags.clockOpen ? (this.hasKey('study_key') ? 'Grandfather clock (empty)' : 'Take the key') : 'Grandfather clock'),
      action: () => {
        if (!this.flags.clockOpen) {
          this.flags.clockSeen = true;
          g.ui.toast('No pendulum. The case is locked — through the glass, a small brass key hangs from the pendulum hook.');
          if (this.objective === 'explore' || this.objective === 'study') this.setObjective('clock');
          g.audio.play('locked', { pos: it.pos.clone().setY(1) });
        } else if (!this.hasKey('study_key')) {
          this.inv.keys.add('study_key'); this.clockKey.visible = false; g.audio.play('key');
          g.ui.toast(ITEMS.study_key.name);
          this.setObjective('openStudy');
          this.saveCheckpoint('study_key');
        }
      },
    });
  }
  strikeThirteen() {
    if (this.flags.clockStruck) return;
    this.flags.clockStruck = true;
    const g = this.game, pos = this.ia('clock').pos.clone().setY(1.8);
    g.audio.play('clank', { pos }); g.ui.caption('[the clock mechanism whirs]');
    for (let i = 0; i < 13; i++) this.after(1.6 + i * 1.55, () => { g.audio.play('bell', { pos, freq: 196, gain: 0.7 }); if (i === 0) g.caption('bell', pos); if (i === 12) g.ui.caption('[…thirteen]'); g.forceFlicker = 0.25; });
    this.after(1.6 + 13 * 1.55 + 1.2, () => {
      this.flags.clockOpen = true;
      const door = this.clockDoor; const s = door.userData.sign || -1;
      g.audio.play('doorCreak', { pos });
      this.tween(0.8, (k) => { door.rotation.y = -s * 1.9 * (1 - Math.pow(1 - k, 3)); });
      if (this.objective === 'explore' || this.objective === 'study' || this.objective === 'clock') this.setObjective('clock');
    });
  }

  // ---------------------------------------------------------------- music box (cellar key) — wakes the Listener
  registerMusicBox() {
    const g = this.game, it = this.ia('music_box');
    g.interaction.add({
      id: 'music_box', floor: 2, pos: it.pos.clone().setY(it.pos.y + 0.12), reach: 1.8,
      label: () => (this.flags.musicBoxOpened ? 'Music box (empty)' : 'Open the music box (it will play)'),
      action: () => { if (!this.flags.musicBoxOpened) this.openMusicBox(); },
    });
  }
  openMusicBox() {
    const g = this.game, it = this.ia('music_box');
    this.flags.musicBoxOpened = true;
    const lid = it.parts.lid; this.tween(0.6, (k) => { lid.rotation.x = -1.7 * k; });
    const pos = it.pos.clone().setY(it.pos.y + 0.15);
    const dur = g.audio.ready ? g.audio.s_musicBox({ pos }) : 7.5;
    g.caption('musicBox', pos);
    this.inv.keys.add('cellar_key'); g.audio.play('key'); g.ui.toast(ITEMS.cellar_key.name + ' — hidden under the comb.');
    for (let t = 0; t < (dur || 7.5); t += 1.5) this.after(t, () => bus.emit('noise', { f: 2, x: pos.x, z: pos.z, loud: 10, kind: 'music', src: 'player' }));
    this.setObjective('cellar');
    // Act II begins: it heard that. Telegraphed: horn-hum swells far away, then steps on the stairs.
    this.after(2.5, () => this.wakeListener());
  }
  wakeListener() {
    const g = this.game;
    if (this.flags.listenerAwake) return;
    this.flags.listenerAwake = true;
    g.audio.play('swell', { gain: 0.5, dur: 3 });
    g.ui.hint('Something is coming up the stairs. HIDE — wardrobe, E.', 6);
    const L = g.listener;
    L.placeAt(2, 15.0, 5.2, Math.PI);
    L.investigate({ f: 2, x: 20.5, z: 8.5 }, true);
    g.director.start(); g.director.phase = 'peak'; g.director.phaseT = 0;
    // checkpoint only once Act II has truly begun, so a retry always has the Listener in play
    this.saveCheckpoint('cellar_key');
  }

  // ---------------------------------------------------------------- cellar machinery
  registerGenerator() {
    const g = this.game, it = this.ia('generator');
    g.interaction.add({
      id: 'generator', floor: 0, pos: it.pos.clone().setY(it.pos.y + 0.8), reach: 2.2, wide: true,
      label: () => (this.flags.power ? 'Generator (running)' : 'Start the generator (very loud)'),
      action: () => { if (!this.flags.power) this.startGenerator(); },
    });
  }
  startGenerator() {
    const g = this.game, it = this.ia('generator');
    const pos = it.pos.clone().setY(-3.6 + 0.8);
    g.audio.play('genStart', { pos }); g.caption('genStart', pos);
    bus.emit('noise', { f: 0, x: pos.x, z: pos.z, loud: 13, kind: 'generator', src: 'player' });
    this.after(1.8, () => {
      this.flags.power = true; g.setPower(true);
      this.setObjective('vault');
      this.saveCheckpoint('power');
    });
  }
  registerVault() {
    const g = this.game, it = this.ia('tape_vault');
    g.interaction.add({
      id: 'tape_vault', floor: 0, pos: it.object.localToWorld(new THREE.Vector3(0, 0.9, 0.35)), reach: 2, wide: true,
      label: () => (this.inv.reel || this.flags.reelLoaded ? 'Vault (empty)' : this.flags.power ? (this.flags.vaultOpen ? 'Take the master reel' : 'Open the vault') : 'Steel vault — the release is dead'),
      action: () => {
        if (!this.flags.power) { g.ui.toast('ELECTRIC RELEASE, says the plate. Nothing happens. It needs power.'); g.audio.play('locked', { pos: it.pos }); return; }
        if (!this.flags.vaultOpen) {
          this.flags.vaultOpen = true; g.audio.play('unlock', { pos: it.pos }); it.parts.lamp.color.setHex(0x30ff60);
          const d = it.parts.door; this.tween(1.2, (k) => { d.rotation.y = 1.9 * k; });
          bus.emit('noise', { f: 0, x: it.pos.x, z: it.pos.z, loud: 4, kind: 'vault', src: 'player' });
          return;
        }
        if (!this.inv.reel && !this.flags.reelLoaded) {
          this.inv.reel = true; it.parts.reel.visible = false; g.audio.play('pickup'); g.ui.toast(ITEMS.reel.name);
          this.setObjective('deck');
        }
      },
    });
  }
  registerDeck() {
    const g = this.game, it = this.ia('reel_deck');
    g.interaction.add({
      id: 'reel_deck', floor: 0, pos: it.object.localToWorld(new THREE.Vector3(0, 1.0, 0.3)), reach: 2, wide: true,
      label: () => {
        if (this.flags.sealed) return this.inv.cylinders.size === 3 ? (this.flags.voicesFreed ? 'Reel deck' : 'Play their voices into the room') : `Reel deck (${this.inv.cylinders.size}/3 cylinders)`;
        if (this.flags.reelLoaded) return 'Reel deck (playing)';
        if (!this.flags.power) return 'Reel deck — no power';
        return this.inv.reel ? 'Load the reel and press PLAY' : 'Reel deck — empty';
      },
      action: () => this.useDeck(),
    });
  }
  useDeck() {
    const g = this.game, it = this.ia('reel_deck');
    if (this.flags.sealed) {
      if (this.inv.cylinders.size === 3 && !this.flags.voicesFreed) this.freeVoices();
      else if (!this.flags.voicesFreed) g.ui.toast('The deck could play something into the sealed room — if you had all three of the family\'s cylinders.');
      return;
    }
    if (!this.flags.power) { g.ui.toast('Dead. It needs the generator.'); return; }
    if (!this.inv.reel || this.flags.reelLoaded) return;
    this.inv.reel = false; this.flags.reelLoaded = true;
    it.parts.lamp.color.setHex(0xff3010);
    g.audio.play('clank', { pos: it.pos.clone().setY(-2.6) });
    this.setObjective('seal');
    this.saveCheckpoint('reel');
    this.after(1.5, () => this.startLure());
  }
  startLure() {
    const g = this.game;
    this.flags.lure = true; g.lureOn = true;
    g.ui.caption('[a low, pulsing tone from the Quiet Room]');
    g.ui.hint('Hide. Let it pass you and go into the Quiet Room. Then shut the vault door.', 7);
    // The Director hands the Listener to the script: it comes, called home.
    const L = g.listener, D = g.director;
    D.scripted = true;
    const go = () => {
      L.searchFilter = null;
      L.scripted([{ f: 0, x: 18.5, z: 18.5 }, { f: 0, x: 22.0, z: 18.5 }], () => {
        // Inside, it prowls the chamber, listening to the reel. Noise still draws it out.
        this.flags.listenerInChamber = true;
        L.searchFilter = (f, x, z) => g.world.roomAt(f, x, z)?.id === 'chamber';
        L.searchCenter = { f: 0, x: 22.0, z: 18.5 }; L.searchPoints = 9999; L.setState('search'); L.waitT = 2; L.listenT = 2;
      }, true);
    };
    this.lureGo = go;
    if (!L.active || L.f !== 0) {
      // enter via the cellar stairs, audibly
      L.placeAt(0, 11.5, 9.0, Math.PI);
      g.audio.play('listenerStep', { pos: new THREE.Vector3(11.5, -2, 6) }); g.caption('listenerStep', new THREE.Vector3(11.5, -2, 6));
    }
    this.after(2.5, go);
  }
  onVaultClosed(d) {
    if (d.id !== 'chamber_door' || this.flags.sealed) return;
    const g = this.game, L = g.listener;
    const room = g.world.roomAtPos(L.f, L.x, L.z);
    const proom = g.world.roomAtPos(g.player.floor, g.player.x, g.player.z);
    if (proom && proom.id === 'chamber') { g.ui.toast('The wheel will not turn from this side.'); g.doors.open(d, { from: g.player, slow: true }); return; }
    if (L.active && room && room.id === 'chamber') {
      this.flags.sealed = true; this.flags.lure = false; g.lureOn = false;
      d.unlocked = false;
      L.searchFilter = null; L.toBackstage(); g.director.stop(); g.director.scripted = false;
      g.audio.play('shriek', { pos: new THREE.Vector3(21.5, -2.6, 18.5) });
      this.after(1.2, () => {
        g.audio.play('sting', { gain: 0.3 });
        g.ui.caption('[the hum stops]');
        this.flags.frontOpen = true;
        const fd = g.world.doorById.get('front_door');
        fd.unlocked = true; g.doors.open(fd, { by: 'script', silent: true });
        this.setObjective(this.inv.cylinders.size === 3 ? 'leaveOrVoices' : 'leave');
        g.ui.toast('Far above you, the front door creaks open.');
        this.saveCheckpoint('sealed');
      });
    }
  }
  freeVoices() {
    const g = this.game;
    this.flags.voicesFreed = true;
    const pos = new THREE.Vector3(24.4, -2.8, 18.5);
    let t = 0;
    for (const c of ['cyl_ada', 'cyl_thomas', 'cyl_clara']) for (const line of CYLINDERS[c]) {
      this.after(t, () => { g.voice(c + '_' + CYLINDERS[c].indexOf(line), line, { pos, old: true }); g.forceFlicker = 0.5; });
      t += 3.4;
    }
    this.after(t, () => { g.audio.play('shriek', { pos }); g.ui.caption('[behind the steel, something lets go]'); });
    this.after(t + 3, () => { g.ui.caption('[…a child laughs, somewhere upstairs]'); this.setObjective('leave'); });
  }

  // ---------------------------------------------------------------- mimic event (meaningful choice)
  startMimic() {
    const g = this.game, L = g.listener;
    if (this.flags.mimicDone || this.mimic) return;
    this.mimic = { t: 0, line: 0, canAnswer: false };
    g.director.scripted = true;
    if (L.active) L.toBackstage();
    const d = g.world.doorById.get('d_dining_hall');
    if (d.open > 0.3) g.doors.close(d, { slam: false, by: 'listener' });
    L.placeAt(1, 12.4, 13.5, Math.PI / 2); L.rig.root.visible = false; L.setState('scripted'); L.goal = null; L.script = [];
    const pos = tileCenter(1, 12, 13, 1.5);
    g.audio.play('knock', { pos, n: 3, occlusion: 0.6 }); g.caption('knock', pos);
  }
  updateMimic(dt) {
    const m = this.mimic; if (!m) return;
    const g = this.game, pos = tileCenter(1, 12, 13, 1.5);
    m.t += dt;
    const times = [2.5, 6.5, 11, 15.5];
    if (m.line < MIMIC_LINES.length && m.t > times[m.line]) {
      g.voice('mimic_' + m.line, MIMIC_LINES[m.line], { pos, old: false, mimic: true });
      m.line++; m.canAnswer = true;
    }
    if (m.t > 21) this.endMimic(false);
  }
  answer() { if (!this.mimic) return; this.mimic.canAnswer = false; this.game.ui.caption('You: "Hello? …I\'m here."'); this.after(1.8, () => this.game.ending('answered')); }
  mimicOpened(inside = false) {
    // The player opens the door instead: it is right there.
    const g = this.game, L = g.listener, d = g.world.doorById.get('d_dining_hall');
    this.endMimic(true);
    if (!inside) g.doors.open(d, { from: g.player });
    L.rig.root.visible = true; L.setState('patrol');
    L.suspicion = 1; L.startChase();
  }
  endMimic(opened) {
    const g = this.game, L = g.listener;
    this.mimic = null; this.flags.mimicDone = true;
    g.director.scripted = false;
    if (!opened) {
      g.audio.play('crackle', { pos: tileCenter(1, 12, 13, 1.5), dur: 2, gain: 0.3 }); g.ui.caption('[the voice dissolves into crackle]');
      L.toBackstage(); g.director.beginRelax();
    }
  }

  // ---------------------------------------------------------------- triggers & scripted beats
  update(dt) {
    const g = this.game, p = g.player;
    for (let i = this.timers.length - 1; i >= 0; i--) { const t = this.timers[i]; t.t -= dt; if (t.t <= 0) { this.timers.splice(i, 1); t.fn(); } }
    for (let i = this.tweens.length - 1; i >= 0; i--) { const t = this.tweens[i]; t.t += dt; const k = Math.min(1, t.t / t.dur); t.fn(k); if (k >= 1) { this.tweens.splice(i, 1); t.done?.(); } }
    this.updateMimic(dt);
    // volume triggers
    for (const tr of TRIGGERS) {
      if (this.firedTriggers.has(tr.id) || tr.floor !== p.floor) continue;
      if (p.x >= tr.x && p.x < tr.x + tr.w && p.z >= tr.z && p.z < tr.z + tr.h) { this.firedTriggers.add(tr.id); this.onTrigger(tr.id); }
    }
    // the clock strikes thirteen once the player has a reason to care about it
    const room = g.world.roomAtPos(p.floor, p.x, p.z);
    if (!this.flags.clockStruck && p.floor === 1 && room && (room.id === 'hall' || room.id === 'foyer' || room.id === 'dining') &&
      (this.flags.studyLockedSeen || this.flags.clockSeen || this.read.size >= 3 || g.time > 240)) this.strikeThirteen();
    // the mimic: once Act II has begun and the player returns to the ground-floor hall with the cellar key
    if (this.flags.listenerAwake && !this.flags.mimicDone && !this.mimic && !this.flags.cellar && p.floor === 1 && room && room.id === 'hall' && p.z > 10.5 && p.z < 16 && g.listener.state !== 'chase' && !g.listener.seesPlayer && (!g.listener.active || g.listener.pathDistToPlayer > 9)) this.startMimic();
    // lured but distracted: once it gives up on the distraction, the reel calls it back
    if (this.flags.lure && !this.flags.sealed && g.listener.bored && g.listener.state !== 'chase' && this.lureGo) { g.listener.bored = false; this.lureGo(); }
    // walked round through the parlour into the dining room: it is standing right there
    if (this.mimic && room && room.id === 'dining') this.mimicOpened(true);
    // abandoned mimic: player walked away
    if (this.mimic && (p.floor !== 1 || Math.hypot(p.x - 13.5, p.z - 13.5) > 9)) this.endMimic(false);
  }
  onTrigger(id) {
    const g = this.game;
    switch (id) {
      case 't_foyer': {
        // The door slams behind you. Telegraphed by the wind rising first.
        const fd = g.world.doorById.get('front_door');
        this.after(1.2, () => { g.audio.play('thunder', { intensity: 0.7 }); g.lightning(0.8); });
        this.after(2.4, () => { g.doors.close(fd, { slam: true, by: 'script' }); this.flags.started = true; });
        this.after(4.5, () => g.ui.hint('WASD move · Mouse look · Shift run · C crouch · F torch · R crank torch · E interact · Tab journal', 9));
        break;
      }
      case 't_dining': {
        const pos = new THREE.Vector3(8, 3.7, 8); // directly above, in the master bedroom
        this.after(0.8, () => { for (let i = 0; i < 5; i++) this.after(i * 0.85, () => g.audio.play('listenerStep', { pos, occlusion: 0.25 })); g.caption('listenerStep', pos); });
        break;
      }
      case 't_kitchen': {
        const pos = tileCenter(1, 10, 2, 1.2);
        this.after(2, () => { g.audio.play('knock', { pos, n: 3, occlusion: 0.7 }); g.caption('knock', pos); });
        break;
      }
      case 't_gallery': {
        const d = g.world.doorById.get('d_nursery');
        this.after(1.0, () => { if (d.open < 0.2) g.doors.open(d, { by: 'listener', slow: true, from: { x: 21.5, z: 5.5 } }); });
        break;
      }
      case 't_nursery': {
        const it = this.ia('music_box');
        this.after(0.8, () => { if (!this.flags.musicBoxOpened) g.audio.play('bell', { pos: it.pos, freq: 1174, gain: 0.08 }); });
        break;
      }
      case 't_master': {
        const s = this.hideSpots.get('hide_master');
        this.after(1.5, () => { if (!g.player.hidden) { g.audio.play('creak', { pos: s.hidePos, gain: 0.3 }); this.swingLeaves(s, true, 2.5); } });
        break;
      }
      case 't_cellar_bottom': {
        this.flags.cellar = true;
        this.saveCheckpoint('cellar');
        const pos = new THREE.Vector3(21.5, -2.4, 11);
        this.after(2, () => { g.audio.play('crackle', { pos, dur: 4, gain: 0.3 }); g.voice('clara_cellar', { who: '???', text: '♪ Hush now, the house is sleeping… ♪' }, { pos, old: true, mimic: true }); });
        break;
      }
      case 't_lab': break;
    }
  }

  // ---------------------------------------------------------------- checkpoints
  snapshot() {
    const p = this.game.player;
    return {
      flags: { ...this.flags }, objective: this.objective,
      inv: { keys: [...this.inv.keys], bottles: this.inv.bottles, cylinders: [...this.inv.cylinders], reel: this.inv.reel },
      taken: [...this.taken], read: [...this.read], fired: [...this.firedTriggers],
      doors: this.game.doors.serialize(),
      player: { f: p.floor, x: p.x, z: p.z, yaw: p.yaw, battery: p.battery },
      time: this.game.time, deaths: this.stats.deaths,
    };
  }
  saveCheckpoint(name, quiet = false) {
    this.checkpoint = this.snapshot(); this.checkpoint.name = name;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.checkpoint)); } catch { /* ignore */ }
    if (!quiet) this.game.ui.saved();
    bus.emit('checkpoint', name);
  }
  static loadSaved() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } }
  static clearSaved() { try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ } }
  static endingsFound() { try { return JSON.parse(localStorage.getItem(ENDINGS_KEY)) || []; } catch { return []; } }
  static recordEnding(id) { const e = new Set(Story.endingsFound()); e.add(id); try { localStorage.setItem(ENDINGS_KEY, JSON.stringify([...e])); } catch { /* ignore */ } return [...e]; }

  restore(s) {
    const g = this.game;
    this.timers.length = 0; this.tweens.length = 0; this.mimic = null; this.playing = false;
    for (const k of Object.keys(this.flags)) delete this.flags[k];
    Object.assign(this.flags, s.flags);
    this.objective = s.objective; g.ui.objective(OBJECTIVES[this.objective], true);
    this.inv.keys = new Set(s.inv.keys); this.inv.bottles = s.inv.bottles; this.inv.cylinders = new Set(s.inv.cylinders); this.inv.reel = s.inv.reel;
    this.read = new Set(s.read); this.firedTriggers = new Set(s.fired);
    // re-register taken items that are no longer taken
    const nowTaken = new Set(s.taken);
    for (const id of this.taken) if (!nowTaken.has(id)) { const it = this.ia(id); if (it) it.object.visible = true; this.reRegister(id); }
    for (const id of nowTaken) if (!this.taken.has(id)) this.take(id);
    this.taken = nowTaken;
    g.doors.restore(s.doors);
    // visual state of story props
    const clock = this.ia('clock');
    clock.parts.door.rotation.y = this.flags.clockOpen ? -(clock.parts.door.userData.sign || -1) * 1.9 : 0;
    clock.parts.key.visible = !this.inv.keys.has('study_key');
    this.ia('music_box').parts.lid.rotation.x = this.flags.musicBoxOpened ? -1.7 : 0;
    const v = this.ia('tape_vault'); v.parts.door.rotation.y = this.flags.vaultOpen ? 1.9 : 0; v.parts.reel.visible = !(this.inv.reel || this.flags.reelLoaded); v.parts.lamp.color.setHex(this.flags.vaultOpen ? 0x30ff60 : 0x300000);
    this.ia('reel_deck').parts.lamp.color.setHex(this.flags.reelLoaded ? 0xff3010 : 0x220800);
    for (const sp of this.hideSpots.values()) for (const l of sp.leaves || []) l.rotation.y = 0;
    g.setPower(!!this.flags.power);
    g.lureOn = false; this.flags.lure = false; this.flags.listenerInChamber = false;
    g.player.place(s.player.f, s.player.x, s.player.z, s.player.yaw, 0);
    g.player.hidden = null; g.player.battery = Math.max(0.6, s.player.battery); g.player.frozen = false; g.player.lookOverride = null; g.player.stamina = 1; g.player.exhausted = false;
    g.time = s.time;
    g.listener.toBackstage(); g.listener.rig.root.visible = false;
    g.director.scripted = false;
    if (this.flags.musicBoxOpened && !this.flags.listenerAwake) this.after(1, () => this.wakeListener());
    if (this.flags.listenerAwake && !this.flags.sealed) { g.director.start(); g.director.relaxFor = 12; } else g.director.stop();
    if (this.flags.reelLoaded && !this.flags.sealed) this.after(2, () => this.startLure());
  }
  reRegister(id) {
    const it = this.ia(id); if (!it) return;
    const p = it.prop, pos = it.pos.clone().add(new THREE.Vector3(0, 0.05, 0)), I = this.game.interaction;
    if (p.t === 'bottle') I.add({ id, floor: p.floor, pos: pos.clone().setY(pos.y + 0.12), label: () => (this.inv.bottles >= 3 ? 'Bottle (hands full)' : 'Take bottle'), action: () => this.takeBottle(id) });
    else if (p.t === 'cylinder') I.add({ id, floor: p.floor, pos, label: 'Take wax cylinder', action: () => this.takeCylinder(id) });
  }
  newGame(persist = true) {
    const g = this.game;
    const fd = g.world.doorById.get('front_door');
    g.doors.chooseSwing(fd, { x: 15.5, z: 23 }); g.doors.setOpen(fd, 0.75);
    g.player.place(PLAYER_START.floor, PLAYER_START.x, PLAYER_START.z, PLAYER_START.yaw, 0);
    this.stats.start = 0;
    if (persist) this.saveCheckpoint('start', true); else { this.checkpoint = this.snapshot(); this.checkpoint.name = 'start'; }
    this.objective = 'explore';
    g.ui.objective(OBJECTIVES.explore, true);
  }
}
