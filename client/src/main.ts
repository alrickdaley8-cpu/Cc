import './style.css';
import * as THREE from 'three';
import {
  BOATS,
  ITEMS,
  STRUCTURES,
  SWIM_DEPTH,
  WATER_LEVEL,
  WorldGenerator,
  clamp,
  computeSnappedPlacement,
  getItem,
  type AnimState,
  type BoatKind,
  type BoatState,
  type LandmarkInfo,
  type LocalPlayerPrivateState,
  type PlayerState,
  type ResourceNodeState,
  type StructureKind,
  type StructureState,
  type WorldTimeState,
} from '@wildreach/shared';
import { createProceduralTextures, type ProceduralTextureSet } from './engine/Textures';
import { SkySystem } from './engine/SkySystem';
import { buildTerrain } from './engine/TerrainMesh';
import { WaterMesh } from './engine/WaterMesh';
import { EnvironmentManager } from './engine/Environment';
import { StructureManager } from './engine/Structures';
import { BoatManager } from './engine/BoatMesh';
import { LivingWorldFX } from './engine/LivingWorldFX';
import { CharacterVisual } from './engine/CharacterMesh';
import { WildlifeManager } from './engine/WildlifeMesh';
import { EffectsManager } from './engine/Effects';
import { AudioEngine } from './engine/AudioEngine';
import { NetworkClient } from './net/NetworkClient';
import { InputController } from './gameplay/InputController';
import { TouchControls } from './gameplay/TouchControls';
import { MinimapRenderer } from './ui/Minimap';
import { UIManager } from './ui/UIManager';

interface RemotePlayerEntry {
  visual: CharacterVisual;
  targetPos: THREE.Vector3;
  targetYaw: number;
  state: PlayerState;
}

class WildreachGame {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private textures: ProceduralTextureSet;
  private sky: SkySystem;
  private audio = new AudioEngine();
  private net = new NetworkClient();
  private input: InputController;
  private touch: TouchControls;
  private ui: UIManager;
  private isTouchDevice = TouchControls.isTouchDevice();

  // World runtime objects (rebuilt if joining a room with a different seed)
  private world!: WorldGenerator;
  private terrainMesh: THREE.Mesh | null = null;
  private water: WaterMesh | null = null;
  private env: EnvironmentManager | null = null;
  private structures: StructureManager | null = null;
  private boats: BoatManager | null = null;
  private livingFX: LivingWorldFX | null = null;
  private wildlife: WildlifeManager | null = null;
  private effects: EffectsManager | null = null;
  private minimap: MinimapRenderer | null = null;
  private currentSeed = -1;

  // Session & entity state
  private inGame = false;
  private localId = '';
  private localVisual: CharacterVisual | null = null;
  private remotePlayers = new Map<string, RemotePlayerEntry>();
  private allPlayers: PlayerState[] = [];
  private privateState: LocalPlayerPrivateState | null = null;
  private nodeMap = new Map<string, ResourceNodeState>();
  private structureMap = new Map<string, StructureState>();
  private boatMap = new Map<string, BoatState>();
  private landmarks: LandmarkInfo[] = [];
  private worldTime: WorldTimeState = {
    day: 1,
    timeOfDay: 0.33,
    weather: 'clear',
    weatherIntensity: 0,
    windDirX: 0.78,
    windDirZ: 0.62,
    windSpeed: 1.0,
  };

  // Local player physics & prediction
  private pos = new THREE.Vector3(-10, 4.4, 25);
  private vel = new THREE.Vector3();
  private grounded = true;
  private firstPerson = false;
  private inputSeq = 0;
  private netSendTimer = 0;
  private footstepTimer = 0;
  private bowCharge = 0;
  private chargingBow = false;
  private screenShake = 0;
  private hitFlash = 0;
  private localSwingTime = 0;

  // Build & Boat Placement preview state
  private activeBuildKind: StructureKind | null = null;
  private activeBuildFromSlot: number | undefined = undefined;
  private activeBoatKind: BoatKind | null = null;
  private buildRotY = 0;
  private ghostPlacement: { x: number; y: number; z: number; rotY: number; valid: boolean; snapped: boolean } | null = null;
  private boatGhostPos: { x: number; z: number; rotY: number; valid: boolean } | null = null;

  // Sailing, Fishing & Spyglass runtime state
  private sailGear: -1 | 0 | 1 | 2 | 3 = 0;
  private sailGearCooldown = 0;
  private boatCtrlTimer = 0;
  private spyglassActive = false;
  private fishing: {
    active: boolean;
    bobberX: number;
    bobberZ: number;
    timer: number;
    biteWindow: number;
    deepWater: boolean;
  } = { active: false, bobberX: 0, bobberZ: 0, timer: 0, biteWindow: 0, deepWater: false };

  // Raycast targeting cache
  private raycaster = new THREE.Raycaster();
  private centerNDC = new THREE.Vector2(0, 0);
  private aimNodeId: string | undefined;
  private aimWildlifeId: string | undefined;
  private aimStructureId: string | undefined;
  private aimBoatId: string | undefined;
  private aimLootId: string | undefined;
  private aimPlayerId: string | undefined;

  private clock = new THREE.Clock();
  private elapsed = 0;

  constructor() {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, this.isTouchDevice ? 1.5 : 2)
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.computeResponsiveFov(window.innerWidth, window.innerHeight),
      window.innerWidth / window.innerHeight,
      0.15,
      820
    );

    this.textures = createProceduralTextures();
    this.sky = new SkySystem(this.scene);
    if (this.isTouchDevice) this.sky.setShadowQuality('medium');

    // Immediately build the default archipelago for the live-3D cinematic title screen!
    this.buildWorldScene(42077);

    this.ui = new UIManager({
      onJoinGame: (opts) => void this.joinGame(opts),
      onRefreshRooms: () => this.net.fetchRooms(),
      onSelectHotbar: (slot) => this.selectHotbar(slot),
      onConsumeSlot: (slot) => this.net.sendConsume(slot),
      onEquipArmor: (slot) => this.net.sendEquipArmor(slot),
      onSwapSlots: (from, to) => this.net.sendSwapSlots(from, to),
      onDropSlot: (slot) => this.net.sendDropSlot(slot),
      onCraft: (id) => {
        this.audio.playSfx('ui');
        this.net.sendCraft(id);
      },
      onSelectBuildKind: (kind) => {
        this.activeBuildKind = kind;
        this.activeBuildFromSlot = undefined;
        if (kind) {
          this.activeBoatKind = null;
          this.boats?.updateGhost(null, 0, 0, 0, false);
        }
      },
      onSelectBoatKind: (kind) => {
        this.activeBoatKind = kind;
        if (kind) {
          this.activeBuildKind = null;
          this.activeBuildFromSlot = undefined;
          this.structures?.updateGhost(null, 0, 0, 0, 0, false);
        } else {
          this.boats?.updateGhost(null, 0, 0, 0, false);
        }
      },
      onSetSailGear: (gear) => {
        this.sailGear = gear;
        this.net.sendBoatControl({ steer: 0, throttle: gear });
        this.audio.playSfx('ui');
      },
      onDisembarkBoat: () => {
        const self = this.getLocalPlayerState();
        if (self?.boatId) {
          this.sailGear = 0;
          this.net.sendBoardBoat(null);
        }
      },
      onOpenBoatCargo: () => this.openActiveBoatCargo(),
      onChestTransfer: (stId, from, fromIdx) =>
        this.net.sendChestTransfer({ structureId: stId, from, fromIndex: fromIdx }),
      onBoatChestTransfer: (boatId, from, fromIdx) =>
        this.net.sendBoatChestTransfer({ boatId, from, fromIndex: fromIdx }),
      onSendChat: (text) => this.net.sendChat(text),
      onRespawn: () => this.net.sendRespawn(),
      onTogglePvp: () => this.net.sendTogglePvp(),
      onSpawnBot: () => this.net.sendSpawnBot(),
      onSetQuality: (tier) => this.applyQuality(tier),
      onSetVolume: (vol) => this.audio.setVolume(vol),
      onSetTouchMode: (mode) => this.touch.setMode(mode),
      onOpenMap: () => this.togglePanel('map'),
      onResumeGame: () => {
        this.syncInputFlags();
        if (!this.touch.enabled) this.input.requestPointerLock();
      },
    });

    this.touch = new TouchControls(canvas, {
      onPrimaryDown: () => this.onPrimaryDown(),
      onPrimaryUp: () => this.onPrimaryUp(),
      onInteract: () => this.onInteract(),
      onDodge: () => this.onDodge(),
      onRotateBuild: () => {
        this.buildRotY = (this.buildRotY + Math.PI / 4) % (Math.PI * 2);
        this.audio.playSfx('ui');
      },
      onCancelBuild: () => {
        this.activeBuildKind = null;
        this.activeBuildFromSlot = undefined;
        this.activeBoatKind = null;
        this.structures?.updateGhost(null, 0, 0, 0, 0, false);
        this.boats?.updateGhost(null, 0, 0, 0, false);
      },
      onOpenInventory: () => this.togglePanel('inventory'),
      onOpenCrafting: () => this.togglePanel('crafting'),
      onOpenBuild: () => this.togglePanel('build'),
      onOpenMap: () => this.togglePanel('map'),
      onToggleCamera: () => {
        this.firstPerson = !this.firstPerson;
        if (this.localVisual) this.localVisual.group.visible = !this.firstPerson;
        this.ui.showToast(this.firstPerson ? 'First-Person Camera' : 'Third-Person Camera', 'info');
      },
      onToggleChat: () => this.toggleChat(),
      onOpenPause: () => this.togglePanel('pause'),
    });

    this.input = new InputController(canvas, {
      onHotbarSelect: (slot) => this.selectHotbar(slot),
      onPrimaryDown: () => this.onPrimaryDown(),
      onPrimaryUp: () => this.onPrimaryUp(),
      onSecondaryDown: () => this.onSecondaryDown(),
      onInteract: () => this.onInteract(),
      onDodge: () => this.onDodge(),
      onToggleCamera: () => {
        this.firstPerson = !this.firstPerson;
        if (this.localVisual) this.localVisual.group.visible = !this.firstPerson;
        this.ui.showToast(this.firstPerson ? 'First-Person Camera' : 'Third-Person Camera', 'info');
      },
      onToggleBuild: () => this.togglePanel('build'),
      onRotateBuild: () => {
        this.buildRotY = (this.buildRotY + Math.PI / 4) % (Math.PI * 2);
        this.audio.playSfx('ui');
      },
      onToggleInventory: () => this.togglePanel('inventory'),
      onToggleCrafting: () => this.togglePanel('crafting'),
      onToggleMap: () => this.togglePanel('map'),
      onToggleChat: () => this.toggleChat(),
      onTogglePause: () => {
        if (this.ui.chatOpen) {
          this.ui.setChatOpen(false);
          this.syncInputFlags();
        } else if (this.ui.activePanel !== 'none') {
          this.ui.setPanel('none');
          this.syncInputFlags();
          this.input.requestPointerLock();
        } else if (this.activeBuildKind || this.activeBoatKind) {
          this.activeBuildKind = null;
          this.activeBoatKind = null;
          this.structures?.updateGhost(null, 0, 0, 0, 0, false);
          this.boats?.updateGhost(null, 0, 0, 0, false);
        } else if (this.inGame) {
          this.togglePanel('pause');
        }
      },
      onEmote: (emote) => {
        if (this.inGame) this.net.sendEmote(emote);
      },
    });

    // Hotkey [F] opens onboard boat cargo hold when sailing a Skiff or Longship
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyF' && this.inGame && this.ui.activePanel === 'none' && !this.ui.chatOpen) {
        this.openActiveBoatCargo();
      }
    });

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.fov = this.computeResponsiveFov(w, h);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    this.animate();
  }

  private computeResponsiveFov(w: number, h: number): number {
    const aspect = w / Math.max(1, h);
    // Widen vertical FOV gracefully on narrow portrait phones so the island stays spacious!
    return aspect < 1 ? clamp(68 + (1 - aspect) * 34, 68, 92) : 68;
  }

  private buildWorldScene(seed: number): void {
    if (this.currentSeed === seed) return;
    this.currentSeed = seed;

    // Tear down any previous world geometry cleanly
    if (this.terrainMesh) this.scene.remove(this.terrainMesh);
    if (this.water) this.scene.remove(this.water.mesh);
    if (this.env) this.scene.remove(this.env.root);
    if (this.structures) this.scene.remove(this.structures.group);
    if (this.boats) this.scene.remove(this.boats.group);
    if (this.livingFX) this.scene.remove(this.livingFX.group);
    if (this.wildlife) this.scene.remove(this.wildlife.group);
    if (this.effects) this.scene.remove(this.effects.group);

    this.world = new WorldGenerator(seed);
    const { mesh, heightTexture } = buildTerrain(this.world, this.textures);
    this.terrainMesh = mesh;
    this.scene.add(mesh);

    this.water = new WaterMesh(heightTexture);
    this.scene.add(this.water.mesh);

    this.env = new EnvironmentManager(
      this.scene,
      this.world,
      this.textures,
      this.isTouchDevice ? 3600 : 7500
    );
    // Populate preview nodes for live title backdrop
    this.env.syncNodes(this.world.generateResourceNodes());

    this.structures = new StructureManager(this.scene, this.textures);
    this.boats = new BoatManager(this.scene, this.world, this.textures);
    this.livingFX = new LivingWorldFX(this.scene, this.world, this.textures);
    this.wildlife = new WildlifeManager(this.scene);
    this.effects = new EffectsManager(this.scene, this.textures);

    const hudMapCanvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
    const fullMapCanvas = document.getElementById('fullmap-canvas') as HTMLCanvasElement;
    this.minimap = new MinimapRenderer(this.world, hudMapCanvas, fullMapCanvas);
  }

  private applyQuality(tier: 'low' | 'medium' | 'high'): void {
    this.renderer.setPixelRatio(
      tier === 'high' ? Math.min(window.devicePixelRatio, 2) : tier === 'medium' ? 1.25 : 0.85
    );
    this.sky.setShadowQuality(tier);
    this.ui.showToast(`Graphics Quality set to ${tier.toUpperCase()}`, 'info');
  }

  private async joinGame(opts: {
    playerName: string;
    outfit: 'ranger' | 'nomad' | 'warden' | 'alchemist' | 'mariner';
    roomId: string;
    roomName: string;
    seed?: number;
    serverUrl?: string;
    spawnAiCompanions: boolean;
  }): Promise<void> {
    this.audio.unlock();
    if (opts.serverUrl !== undefined) {
      this.net.setServerUrl(opts.serverUrl);
    }
    try {
      await this.net.connect({
        onSnapshot: (snap) => this.handleSnapshot(snap),
        onPrivateState: (priv) => {
          this.privateState = priv;
          this.ui.refreshPanelIfOpen(
            this.ui.openChestId ? this.structureMap.get(this.ui.openChestId) : undefined,
            this.ui.openBoatCargoId ? this.boatMap.get(this.ui.openBoatCargoId) : undefined
          );
        },
        onNodeUpdate: (node) => {
          this.nodeMap.set(node.id, node);
          this.env?.upsertNode(node);
        },
        onNodeFell: ({ id, dirX, dirZ }) => {
          const clone = this.env?.getNodeVisualClone(id);
          if (clone) this.effects?.spawnFallingTree(clone, dirX, dirZ);
        },
        onStructureAdd: (st) => {
          this.structureMap.set(st.id, st);
          this.structures?.upsert(st);
        },
        onStructureUpdate: (st) => {
          this.structureMap.set(st.id, st);
          this.structures?.upsert(st);
          if (this.ui.openChestId === st.id) {
            this.ui.refreshPanelIfOpen(st);
          }
        },
        onStructureRemove: (id) => {
          this.structureMap.delete(id);
          this.structures?.remove(id);
          if (this.ui.openChestId === id) {
            this.ui.setPanel('none');
            this.syncInputFlags();
          }
        },
        onBoatAdd: (boat) => {
          this.boatMap.set(boat.id, boat);
          this.boats?.addBoat(boat);
        },
        onBoatUpdate: (boat) => {
          this.boatMap.set(boat.id, boat);
          this.boats?.updateBoatState(boat);
          if (this.ui.openBoatCargoId === boat.id) {
            this.ui.refreshPanelIfOpen(undefined, boat);
          }
        },
        onBoatRemove: (id) => {
          this.boatMap.delete(id);
          this.boats?.removeBoat(id);
          if (this.ui.openBoatCargoId === id) {
            this.ui.setPanel('none');
            this.syncInputFlags();
          }
        },
        onLootAdd: (loot) => this.effects?.addLoot(loot),
        onLootRemove: (id) => this.effects?.removeLoot(id),
        onCombatEvent: (ev) => this.projectFloatingText(ev.x, ev.y, ev.z, ev.text, ev.color),
        onFxEvent: (ev) => this.handleFxEvent(ev),
        onChatMessage: (msg) => this.ui.appendChat(msg),
        onToast: ({ text, tone }) => this.ui.showToast(text, tone),
        onConnectionChange: (connected) => {
          if (!connected && this.inGame) {
            this.ui.showToast('Connection interrupted — attempting to reconnect...', 'danger');
          }
        },
      });

      const init = await this.net.joinRoom({
        roomId: opts.roomId,
        roomName: opts.roomName,
        seed: opts.seed,
        playerName: opts.playerName,
        outfit: opts.outfit,
        spawnAiCompanions: opts.spawnAiCompanions,
      });

      this.buildWorldScene(init.room.seed);
      this.localId = init.playerId;
      this.landmarks = init.landmarks;
      this.worldTime = init.time;
      this.privateState = init.privateState;
      this.allPlayers = init.players;

      this.nodeMap.clear();
      for (const n of init.nodes) this.nodeMap.set(n.id, n);
      this.env?.syncNodes(init.nodes);

      this.structureMap.clear();
      for (const s of init.structures) this.structureMap.set(s.id, s);
      this.structures?.syncAll(init.structures);

      this.boatMap.clear();
      for (const b of init.boats) this.boatMap.set(b.id, b);
      this.boats?.syncAll(init.boats);

      this.wildlife?.sync(init.wildlife);
      this.effects?.syncLootAll(init.loot);

      for (const msg of init.chatHistory) this.ui.appendChat(msg);

      const self = init.players.find((p) => p.id === this.localId);
      if (self) {
        this.pos.set(self.x, self.y, self.z);
        this.input.yaw = self.yaw;
        if (this.localVisual) this.scene.remove(this.localVisual.group);
        this.localVisual = new CharacterVisual(self.outfit, false);
        this.localVisual.group.position.copy(this.pos);
        this.scene.add(this.localVisual.group);
      }

      this.inGame = true;
      this.ui.hideTitleScreen();
      this.syncInputFlags();
      if (!this.touch.enabled) {
        this.input.requestPointerLock();
      }
      this.ui.showToast(
        this.net.isOfflineMode
          ? `Entered ${init.room.name} (Offline / GitHub Pages Mode)`
          : `Entered ${init.room.name} (Seed ${init.room.seed})`,
        'good'
      );
    } catch (err) {
      this.ui.showToast(err instanceof Error ? err.message : 'Unable to connect to server', 'danger');
    }
  }

  private handleSnapshot(snap: {
    time: WorldTimeState;
    players: PlayerState[];
    wildlife: import('@wildreach/shared').WildlifeState[];
    projectiles: import('@wildreach/shared').ProjectileState[];
    boats: BoatState[];
  }): void {
    this.worldTime = snap.time;
    this.allPlayers = snap.players;
    this.wildlife?.sync(snap.wildlife);
    this.effects?.syncProjectiles(snap.projectiles);
    if (snap.boats) {
      this.boatMap.clear();
      for (const b of snap.boats) this.boatMap.set(b.id, b);
      this.boats?.syncAll(snap.boats);
    }

    const seenRemote = new Set<string>();
    for (const p of snap.players) {
      if (p.id === this.localId) {
        // Gentle server correction on death/respawn or knockback
        if (!p.alive || this.pos.distanceTo(new THREE.Vector3(p.x, p.y, p.z)) > 7.5) {
          this.pos.set(p.x, p.y, p.z);
        }
        continue;
      }
      seenRemote.add(p.id);
      let entry = this.remotePlayers.get(p.id);
      if (!entry) {
        const vis = new CharacterVisual(p.outfit, true);
        vis.group.position.set(p.x, p.y, p.z);
        vis.group.traverse((o) => {
          o.userData.playerId = p.id;
        });
        this.scene.add(vis.group);
        entry = {
          visual: vis,
          targetPos: new THREE.Vector3(p.x, p.y, p.z),
          targetYaw: p.yaw,
          state: p,
        };
        this.remotePlayers.set(p.id, entry);
      }
      entry.targetPos.set(p.x, p.y, p.z);
      entry.targetYaw = p.yaw;
      entry.state = p;
    }

    for (const [id, entry] of Array.from(this.remotePlayers.entries())) {
      if (!seenRemote.has(id)) {
        this.scene.remove(entry.visual.group);
        this.remotePlayers.delete(id);
      }
    }
  }

  private handleFxEvent(ev: {
    kind: 'chop' | 'mine' | 'hit' | 'arrow_hit' | 'build' | 'eat' | 'drink' | 'thunder' | 'levelup';
    x: number;
    y: number;
    z: number;
    color?: string;
  }): void {
    if (ev.kind === 'thunder') {
      this.sky.triggerLightning();
      this.audio.playSfx('thunder');
      return;
    }
    const dist = Math.hypot(ev.x - this.pos.x, ev.z - this.pos.z);
    if (dist < 42) {
      if (ev.kind === 'chop') {
        this.audio.playSfx('chop');
        this.effects?.spawnBurst(ev.x, ev.y, ev.z, '#a66b3a', 9, 4.4);
      } else if (ev.kind === 'mine') {
        this.audio.playSfx('mine');
        this.effects?.spawnBurst(ev.x, ev.y, ev.z, '#fbbf24', 10, 5.0);
      } else if (ev.kind === 'hit' || ev.kind === 'arrow_hit') {
        this.audio.playSfx('hit');
        this.effects?.spawnBurst(ev.x, ev.y, ev.z, ev.color || '#f87171', 10, 4.8);
        if (dist < 2.2) {
          this.screenShake = 0.24;
          this.hitFlash = 1.0;
        }
      } else if (ev.kind === 'build') {
        this.audio.playSfx('build');
        this.effects?.spawnBurst(ev.x, ev.y, ev.z, '#d6c3a5', 12, 3.6);
      } else if (ev.kind === 'eat') {
        this.audio.playSfx('eat');
      } else if (ev.kind === 'drink') {
        this.audio.playSfx('drink');
      } else if (ev.kind === 'levelup') {
        this.audio.playSfx('levelup');
        this.effects?.spawnBurst(ev.x, ev.y, ev.z, '#38f2dc', 20, 6.2, 4);
      }
    }
  }

  private projectFloatingText(x: number, y: number, z: number, text: string, color: string): void {
    const v = new THREE.Vector3(x, y, z).project(this.camera);
    if (v.z > 1) return;
    const sx = (v.x * 0.5 + 0.5) * window.innerWidth;
    const sy = (-v.y * 0.5 + 0.5) * window.innerHeight;
    this.ui.spawnFloatingText(sx, sy, text, color);
  }

  private selectHotbar(slot: number): void {
    if (!this.inGame) return;
    this.net.sendEquip(slot);
    this.audio.playSfx('ui');

    // Auto-enter build preview when selecting a placeable kit item in hotbar
    const invSlot = this.privateState?.inventory[slot];
    const def = getItem(invSlot?.itemId);
    if (def?.structureKind) {
      this.activeBuildKind = def.structureKind;
      this.activeBuildFromSlot = slot;
    } else if (def?.toolKind !== 'hammer') {
      this.activeBuildKind = null;
      this.activeBuildFromSlot = undefined;
      this.structures?.updateGhost(null, 0, 0, 0, 0, false);
    }
  }

  private togglePanel(panel: 'inventory' | 'crafting' | 'build' | 'map' | 'pause'): void {
    if (!this.inGame) return;
    if (this.ui.activePanel === panel) {
      this.ui.setPanel('none');
      this.syncInputFlags();
      this.input.requestPointerLock();
    } else {
      this.ui.setChatOpen(false);
      this.ui.setPanel(panel);
      this.syncInputFlags();
      this.input.exitPointerLock();
      if (panel === 'map') {
        this.minimap?.renderFullMap(
          this.pos.x,
          this.pos.z,
          this.localId,
          this.allPlayers,
          Array.from(this.structureMap.values()),
          this.landmarks,
          Array.from(this.boatMap.values())
        );
      }
    }
  }

  private toggleChat(): void {
    if (!this.inGame) return;
    if (this.ui.activePanel !== 'none') return;
    const next = !this.ui.chatOpen;
    this.ui.setChatOpen(next);
    this.syncInputFlags();
    if (next) this.input.exitPointerLock();
    else this.input.requestPointerLock();
  }

  private syncInputFlags(): void {
    this.input.uiOpen = this.ui.activePanel !== 'none';
    this.input.chatOpen = this.ui.chatOpen;
  }

  private getLocalPlayerState(): PlayerState | undefined {
    return this.allPlayers.find((p) => p.id === this.localId);
  }

  private openActiveBoatCargo(): void {
    const self = this.getLocalPlayerState();
    if (!self?.boatId) return;
    const boat = this.boatMap.get(self.boatId);
    if (!boat || BOATS[boat.kind].cargoSlots <= 0) {
      this.ui.showToast('This vessel has no cargo hold. Craft a Skiff or Longship!', 'info');
      return;
    }
    this.ui.setPanel('boat_cargo', undefined, boat);
    this.syncInputFlags();
    this.input.exitPointerLock();
  }

  private onPrimaryDown(): void {
    const self = this.getLocalPlayerState();
    if (!self || !self.alive) return;

    // 0. Launch boat if Vessel Placement Ghost is active
    if (this.activeBoatKind && this.boatGhostPos) {
      if (!this.boatGhostPos.valid) {
        this.ui.showToast('Aim at deeper coastal water to launch this boat!', 'warn');
        return;
      }
      this.net.sendBuildBoat({
        kind: this.activeBoatKind,
        x: this.boatGhostPos.x,
        z: this.boatGhostPos.z,
        rotY: this.boatGhostPos.rotY,
      });
      this.activeBoatKind = null;
      this.boatGhostPos = null;
      this.boats?.updateGhost(null, 0, 0, 0, false);
      return;
    }

    // 1. Place structure if Build Preview is active
    if (this.activeBuildKind && this.ghostPlacement) {
      if (!this.ghostPlacement.valid) {
        this.ui.showToast('Cannot place structure here!', 'warn');
        return;
      }
      this.net.sendBuild({
        kind: this.activeBuildKind,
        x: this.ghostPlacement.x,
        y: this.ghostPlacement.y,
        z: this.ghostPlacement.z,
        rotY: this.ghostPlacement.rotY,
        fromItemSlot: this.activeBuildFromSlot,
      });
      if (this.activeBuildFromSlot !== undefined) {
        this.activeBuildKind = null;
        this.activeBuildFromSlot = undefined;
        this.structures?.updateGhost(null, 0, 0, 0, 0, false);
      }
      return;
    }

    const eqItem = getItem(self.equippedItemId);

    // 1.5 Brass Spyglass 3x Optical Zoom
    if (eqItem?.id === 'spyglass') {
      this.spyglassActive = true;
      this.ui.setSpyglassActive(true);
      this.audio.playSfx('ui');
      return;
    }

    // 1.6 Bamboo Fishing Rod — Cast & Reel Minigame!
    if (eqItem?.id === 'fishing_rod') {
      if (this.fishing.active) {
        if (this.fishing.biteWindow > 0) {
          this.net.sendFishCatch(this.fishing.deepWater);
          this.audio.playSfx('drink');
          this.effects?.spawnBurst(this.fishing.bobberX, WATER_LEVEL + 0.3, this.fishing.bobberZ, '#7dd3fc', 12, 4.5);
        } else {
          this.ui.showToast('Reeled in early — wait for the fish bite splash!', 'info');
        }
        this.fishing.active = false;
        this.livingFX?.setFishingBobber(false, this.pos, 0, 0, false);
        return;
      }
      // Cast bobber forward onto ocean water or Crystal Spring
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
      const castX = this.pos.x + fwd.x * 11;
      const castZ = this.pos.z + fwd.z * 11;
      const bedH = this.world.getHeight(castX, castZ);
      const isWater = bedH < WATER_LEVEL - 0.15 || self.status.nearFreshWater || Boolean(self.boatId);
      if (!isWater) {
        this.ui.showToast('Face ocean water, a dock, or Crystal Spring to cast your line!', 'warn');
        return;
      }
      this.fishing = {
        active: true,
        bobberX: castX,
        bobberZ: castZ,
        timer: 2.4 + Math.random() * 2.8,
        biteWindow: 0,
        deepWater: bedH < -2.6,
      };
      this.audio.playSfx('arrow');
      this.ui.showToast(
        this.fishing.deepWater
          ? '🎣 Cast into Deep Sea! Watch for a Golden Snapper bite...'
          : '🎣 Line cast! Wait for the bobber to dip...',
        'info'
      );
      return;
    }

    // 2. Consume edible/bandage directly on Left-Click
    if (eqItem?.category === 'consumable') {
      this.net.sendConsume(self.equippedSlot);
      return;
    }

    // 3. Start drawing Bow
    if (eqItem?.isRanged) {
      this.chargingBow = true;
      this.bowCharge = 0.25;
      return;
    }

    // 4. Melee Swing / Gather / Repair (immediate zero-latency local swing visual)
    this.localSwingTime = 0.36;
    this.firePrimaryAction(0);
  }

  private onPrimaryUp(): void {
    if (this.spyglassActive) {
      this.spyglassActive = false;
      this.ui.setSpyglassActive(false);
    }
    if (this.chargingBow) {
      this.chargingBow = false;
      this.audio.playSfx('arrow');
      this.firePrimaryAction(this.bowCharge);
      this.bowCharge = 0;
      this.ui.setBowCharge(0);
    }
  }

  private onSecondaryDown(): void {
    if (this.activeBoatKind) {
      this.activeBoatKind = null;
      this.boatGhostPos = null;
      this.boats?.updateGhost(null, 0, 0, 0, false);
      this.ui.showToast('Exited Vessel Placement', 'info');
      return;
    }
    if (this.activeBuildKind) {
      this.activeBuildKind = null;
      this.activeBuildFromSlot = undefined;
      this.structures?.updateGhost(null, 0, 0, 0, 0, false);
      this.ui.showToast('Exited Build Preview', 'info');
      return;
    }

    const self = this.getLocalPlayerState();
    if (!self || !self.alive) return;
    const eqItem = getItem(self.equippedItemId);
    // Right-click with Builder Hammer demolishes aimed player structure (50% refund)
    if (eqItem?.toolKind === 'hammer' && this.aimStructureId) {
      this.net.sendDemolish(this.aimStructureId);
    } else if (eqItem?.toolKind === 'hammer') {
      this.togglePanel('build');
    }
  }

  private onInteract(): void {
    const self = this.getLocalPlayerState();
    if (!self || !self.alive) return;

    // 0. Disembark active boat if already sailing
    if (self.boatId) {
      this.sailGear = 0;
      this.net.sendBoardBoat(null);
      return;
    }

    // 0.5 Board aimed boat (or nearest boat within 5.2m)
    if (this.aimBoatId) {
      this.sailGear = 0;
      this.net.sendBoardBoat(this.aimBoatId);
      return;
    }
    for (const b of this.boatMap.values()) {
      if (Math.hypot(b.x - this.pos.x, b.z - this.pos.z) < 4.5 && !b.pilotId) {
        this.sailGear = 0;
        this.net.sendBoardBoat(b.id);
        return;
      }
    }

    // 1. Open Shared Chest UI
    if (this.aimStructureId) {
      const st = this.structureMap.get(this.aimStructureId);
      if (st?.kind === 'storage_chest') {
        this.ui.setPanel('chest', st);
        this.syncInputFlags();
        this.input.exitPointerLock();
        return;
      }
      if (st) {
        this.net.sendInteract({ structureId: st.id });
        return;
      }
    }

    // 2. Pickup aimed loot drop
    if (this.aimLootId) {
      this.net.sendInteract({ lootId: this.aimLootId });
      return;
    }

    // 3. Drink fresh spring water
    if (self.status.nearFreshWater) {
      this.net.sendInteract({ drinkWater: true });
      return;
    }

    // 4. Quick forage hand-harvestable bush/reeds/mushrooms on [E]
    if (this.aimNodeId) {
      this.firePrimaryAction(0);
    }
  }

  private onDodge(): void {
    const dir = this.computeMoveInputDir();
    if (dir.lengthSq() < 0.01) {
      dir.set(-Math.sin(this.input.yaw), 0, -Math.cos(this.input.yaw));
    }
    this.net.sendDodge({ x: dir.x, z: dir.z });
    this.pos.x = clamp(this.pos.x + dir.x * 3.1, -212, 212);
    this.pos.z = clamp(this.pos.z + dir.z * 3.1, -212, 212);
  }

  private firePrimaryAction(charge: number): void {
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion).normalize();
    this.net.sendAction({
      aimX: this.pos.x + forward.x * 4,
      aimY: this.pos.y + 1.4 + forward.y * 4,
      aimZ: this.pos.z + forward.z * 4,
      dirX: forward.x,
      dirY: forward.y,
      dirZ: forward.z,
      charge,
      targetNodeId: this.aimNodeId,
      targetWildlifeId: this.aimWildlifeId,
      targetPlayerId: this.aimPlayerId,
      targetStructureId: this.aimStructureId,
    });
  }

  private computeMoveInputDir(): THREE.Vector3 {
    const fwd = new THREE.Vector3(-Math.sin(this.input.yaw), 0, -Math.cos(this.input.yaw));
    const right = new THREE.Vector3(Math.cos(this.input.yaw), 0, -Math.sin(this.input.yaw));
    const move = new THREE.Vector3();
    if (this.input.keys.has('KeyW') || this.input.keys.has('ArrowUp')) move.add(fwd);
    if (this.input.keys.has('KeyS') || this.input.keys.has('ArrowDown')) move.sub(fwd);
    if (this.input.keys.has('KeyD') || this.input.keys.has('ArrowRight')) move.add(right);
    if (this.input.keys.has('KeyA') || this.input.keys.has('ArrowLeft')) move.sub(right);
    // Blend virtual analog joystick input seamlessly on mobile/tablet
    if (Math.abs(this.touch.moveX) > 0.08 || Math.abs(this.touch.moveY) > 0.08) {
      move.addScaledVector(fwd, this.touch.moveY);
      move.addScaledVector(right, this.touch.moveX);
    }
    if (move.lengthSq() > 1) move.normalize();
    return move;
  }

  private getSupportHeight(x: number, z: number): number {
    let h = this.world.getHeight(x, z);
    // Built-in South Harbor Wooden Jetty deck!
    if (this.livingFX) {
      const jetty = this.world.getHarborJettySpot();
      if (Math.abs(x - jetty.x) < 2.25 && z >= jetty.z - 2 && z <= jetty.z + 18) {
        h = Math.max(h, WATER_LEVEL + 0.65);
      }
    }
    for (const s of this.structureMap.values()) {
      if (s.kind === 'wood_foundation' || s.kind === 'dock_pier') {
        if (Math.abs(x - s.x) < 1.72 && Math.abs(z - s.z) < 1.72) {
          h = Math.max(h, s.y + (s.kind === 'dock_pier' ? 0.52 : 0.53));
        }
      }
    }
    return h;
  }

  private updateLocalPlayer(dt: number): void {
    const self = this.getLocalPlayerState();
    if (!self) return;

    // Hotbar mouse-wheel cycling
    const wheel = this.input.consumeWheel();
    if (wheel !== 0) {
      const nextSlot = (self.equippedSlot + (wheel > 0 ? 1 : -1) + 9) % 9;
      this.selectHotbar(nextSlot);
    }

    // Bow draw charge
    if (this.chargingBow) {
      this.bowCharge = Math.min(1, this.bowCharge + dt * 0.95);
      this.ui.setBowCharge(this.bowCharge);
    }

    // Smooth Brass Spyglass 3x Optical FOV interpolation
    const baseFov = this.computeResponsiveFov(window.innerWidth, window.innerHeight);
    const targetFov = this.spyglassActive ? 21 : this.chargingBow ? baseFov - 8 : baseFov;
    if (Math.abs(this.camera.fov - targetFov) > 0.1) {
      this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, dt * 11);
      this.camera.updateProjectionMatrix();
    }

    // Active Fishing Minigame timer & bobber visual
    if (this.fishing.active) {
      if (self.equippedItemId !== 'fishing_rod') {
        this.fishing.active = false;
        this.livingFX?.setFishingBobber(false, this.pos, 0, 0, false);
      } else {
        if (this.fishing.biteWindow > 0) {
          this.fishing.biteWindow -= dt;
          if (this.fishing.biteWindow <= 0) {
            this.ui.showToast('The fish slipped off the hook! Cast again.', 'warn');
            this.fishing.active = false;
            this.livingFX?.setFishingBobber(false, this.pos, 0, 0, false);
          }
        } else {
          this.fishing.timer -= dt;
          if (this.fishing.timer <= 0) {
            this.fishing.biteWindow = 2.6;
            this.audio.playFootstep('water');
            this.effects?.spawnBurst(this.fishing.bobberX, WATER_LEVEL + 0.25, this.fishing.bobberZ, '#e0f2fe', 10, 3.6);
            this.ui.showToast('🐟 BITE! Click / Tap ACT now to reel it in!', 'good');
          }
        }
        if (this.fishing.active) {
          const rodTip = this.pos.clone().add(new THREE.Vector3(0, 1.85, 0));
          this.livingFX?.setFishingBobber(
            true,
            rodTip,
            this.fishing.bobberX,
            this.fishing.bobberZ,
            this.fishing.biteWindow > 0
          );
        }
      }
    }

    let anim: AnimState = 'idle';
    let sprinting = false;
    let swimming = false;
    const pilotedBoat = self.boatId ? this.boatMap.get(self.boatId) ?? null : null;

    if (pilotedBoat && self.alive && !this.input.uiOpen && !this.input.chatOpen) {
      // ==================== SAILING HELM MODE ====================
      const look = this.touch.consumeLookDelta();
      if (look.dx !== 0 || look.dy !== 0) {
        this.input.yaw -= look.dx * 0.0052;
        this.input.pitch = clamp(this.input.pitch + look.dy * 0.0044, -0.75, 1.15);
      }

      // Keyboard W/S steps throttle gear; A/D steers rudder
      this.sailGearCooldown = Math.max(0, this.sailGearCooldown - dt);
      const fwdKey = this.input.keys.has('KeyW') || this.input.keys.has('ArrowUp');
      const backKey = this.input.keys.has('KeyS') || this.input.keys.has('ArrowDown');
      if (fwdKey && this.sailGearCooldown <= 0 && this.sailGear < 3) {
        this.sailGear = (this.sailGear + 1) as -1 | 0 | 1 | 2 | 3;
        this.sailGearCooldown = 0.24;
      } else if (backKey && this.sailGearCooldown <= 0 && this.sailGear > -1) {
        this.sailGear = (this.sailGear - 1) as -1 | 0 | 1 | 2 | 3;
        this.sailGearCooldown = 0.24;
      }

      // Mobile touch joystick automatically sets sail gear & steering!
      if (Math.abs(this.touch.moveY) > 0.2) {
        if (this.touch.moveY > 0.72) this.sailGear = 3;
        else if (this.touch.moveY > 0.38) this.sailGear = 2;
        else if (this.touch.moveY > 0.15) this.sailGear = 1;
        else if (this.touch.moveY < -0.35) this.sailGear = -1;
      }

      let steer = 0;
      if (this.input.keys.has('KeyA') || this.input.keys.has('ArrowLeft')) steer += 1;
      if (this.input.keys.has('KeyD') || this.input.keys.has('ArrowRight')) steer -= 1;
      if (Math.abs(this.touch.moveX) > 0.12) steer = clamp(-this.touch.moveX, -1, 1);

      this.boatCtrlTimer += dt;
      if (this.boatCtrlTimer >= 0.06) {
        this.boatCtrlTimer = 0;
        this.net.sendBoatControl({ steer, throttle: this.sailGear });
      }

      const helmPos = this.boats?.getHelmWorldPos(pilotedBoat.id);
      if (helmPos) {
        this.pos.lerp(helmPos, Math.min(1, dt * 16));
      } else {
        this.pos.set(pilotedBoat.x, pilotedBoat.y + 0.55, pilotedBoat.z);
      }
      this.vel.set(0, 0, 0);
      anim = 'idle';
    } else if (self.alive && !this.input.uiOpen && !this.input.chatOpen) {
      // Apply smooth touch camera drag look delta
      const look = this.touch.consumeLookDelta();
      if (look.dx !== 0 || look.dy !== 0) {
        this.input.yaw -= look.dx * 0.0052;
        this.input.pitch = clamp(this.input.pitch + look.dy * 0.0044, -0.95, 1.22);
      }

      const moveDir = this.computeMoveInputDir();
      const wantSprint =
        (this.input.keys.has('ShiftLeft') || this.input.keys.has('ShiftRight') || this.touch.sprinting) &&
        self.vitals.stamina > 6;
      const groundH = this.getSupportHeight(this.pos.x, this.pos.z);
      swimming = groundH < SWIM_DEPTH && this.pos.y <= WATER_LEVEL - 0.15;

      const maxSpeed = swimming ? 3.9 : wantSprint && moveDir.lengthSq() > 0.04 ? 8.2 : 5.1;
      sprinting = wantSprint && !swimming && moveDir.lengthSq() > 0.04;

      const targetVx = moveDir.x * maxSpeed;
      const targetVz = moveDir.z * maxSpeed;
      const accel = this.grounded || swimming ? 14 : 5;
      this.vel.x += (targetVx - this.vel.x) * Math.min(1, dt * accel);
      this.vel.z += (targetVz - this.vel.z) * Math.min(1, dt * accel);

      // Jump / swim up (keyboard Space or Touch JUMP button)
      if (this.input.keys.has('Space') || this.touch.jumping) {
        if (swimming) {
          this.vel.y = 2.6;
        } else if (this.grounded) {
          this.vel.y = 7.4;
          this.grounded = false;
        }
      }

      // Gravity or buoyant water
      if (swimming) {
        const targetWaterY = WATER_LEVEL - 0.55;
        this.vel.y += (targetWaterY - this.pos.y) * 9 * dt;
        this.vel.y *= 0.88;
      } else {
        this.vel.y -= 20.5 * dt;
      }

      // Apply movement + basic solid structure collision
      const nextX = clamp(this.pos.x + this.vel.x * dt, -212, 212);
      const nextZ = clamp(this.pos.z + this.vel.z * dt, -212, 212);
      if (!this.collidesWithSolidStructure(nextX, nextZ, this.pos.y)) {
        this.pos.x = nextX;
        this.pos.z = nextZ;
      } else {
        this.vel.x = 0;
        this.vel.z = 0;
      }

      this.pos.y += this.vel.y * dt;
      const newGround = this.getSupportHeight(this.pos.x, this.pos.z);
      if (!swimming && this.pos.y <= newGround) {
        this.pos.y = newGround;
        this.vel.y = 0;
        this.grounded = true;
      } else if (swimming && this.pos.y < newGround) {
        this.pos.y = newGround;
      }

      const horizSpeed = Math.hypot(this.vel.x, this.vel.z);
      if (swimming) anim = 'swim';
      else if (!this.grounded) anim = 'jump';
      else if (horizSpeed > 6.2) anim = 'run';
      else if (horizSpeed > 0.55) anim = 'walk';

      // Surface-aware footsteps
      if (horizSpeed > 1.2 && (this.grounded || swimming)) {
        this.footstepTimer -= dt * (sprinting ? 1.45 : 1.0);
        if (this.footstepTimer <= 0) {
          this.footstepTimer = 0.42;
          const sample = this.world.sample(this.pos.x, this.pos.z);
          const surface =
            this.pos.y < WATER_LEVEL + 0.15
              ? 'water'
              : sample.biome === 'beach'
              ? 'sand'
              : sample.biome === 'volcanic' || sample.biome === 'highland'
              ? 'stone'
              : 'grass';
          this.audio.playFootstep(surface);
        }
      }
    } else {
      this.vel.set(0, 0, 0);
      anim = self.alive ? 'idle' : 'dead';
    }

    if (this.localSwingTime > 0) this.localSwingTime = Math.max(0, this.localSwingTime - dt);
    if (this.hitFlash > 0) this.hitFlash = Math.max(0, this.hitFlash - dt * 2.8);

    // Update local visual avatar
    if (this.localVisual) {
      this.localVisual.group.position.copy(this.pos);
      this.localVisual.group.rotation.y = this.input.yaw + Math.PI;
      this.localVisual.group.visible = !this.firstPerson;
      this.localVisual.animate(
        dt,
        { ...self, vx: this.vel.x, vz: this.vel.z, anim, swingTime: Math.max(self.swingTime, this.localSwingTime) },
        this.elapsed
      );
    }

    // Update smooth 3rd-person / 1st-person camera with terrain collision clamp
    const eyeY = this.pos.y + 1.62;
    const lookEuler = new THREE.Euler(-this.input.pitch, this.input.yaw, 0, 'YXZ');
    const lookDir = new THREE.Vector3(0, 0, -1).applyEuler(lookEuler);

    if (this.firstPerson) {
      this.camera.position.set(this.pos.x, eyeY, this.pos.z);
      this.camera.lookAt(this.pos.x + lookDir.x * 10, eyeY + lookDir.y * 10, this.pos.z + lookDir.z * 10);
    } else {
      // Valheim-style slight right-shoulder third-person orbit camera (pulled back smoothly when sailing!)
      const sailDist =
        pilotedBoat?.kind === 'longship'
          ? 12.8
          : pilotedBoat?.kind === 'skiff'
          ? 9.2
          : pilotedBoat
          ? 7.8
          : 4.8;
      const camDist = this.chargingBow ? 3.1 : sailDist;
      const right = new THREE.Vector3(Math.cos(this.input.yaw), 0, -Math.sin(this.input.yaw));
      const camPos = new THREE.Vector3(this.pos.x, eyeY + (pilotedBoat ? 1.85 : 0.35), this.pos.z)
        .addScaledVector(lookDir, -camDist)
        .addScaledVector(right, pilotedBoat ? 0 : 0.55);

      const terrainAtCam = Math.max(this.world.getHeight(camPos.x, camPos.z), WATER_LEVEL) + 0.55;
      if (camPos.y < terrainAtCam) camPos.y = terrainAtCam;

      if (this.screenShake > 0) {
        this.screenShake = Math.max(0, this.screenShake - dt);
        camPos.x += (Math.random() - 0.5) * this.screenShake * 0.6;
        camPos.y += (Math.random() - 0.5) * this.screenShake * 0.6;
      }

      this.camera.position.copy(camPos);
      this.camera.lookAt(
        this.pos.x + lookDir.x * 16 + right.x * 0.25,
        eyeY + lookDir.y * 16,
        this.pos.z + lookDir.z * 16 + right.z * 0.25
      );
    }

    // Stream player input to authoritative server at 20 Hz
    this.netSendTimer += dt;
    if (this.netSendTimer >= 0.05) {
      this.netSendTimer = 0;
      this.net.sendInput({
        x: Math.round(this.pos.x * 100) / 100,
        y: Math.round(this.pos.y * 100) / 100,
        z: Math.round(this.pos.z * 100) / 100,
        vx: Math.round(this.vel.x * 100) / 100,
        vy: Math.round(this.vel.y * 100) / 100,
        vz: Math.round(this.vel.z * 100) / 100,
        yaw: Math.round((this.input.yaw + Math.PI) * 1000) / 1000,
        pitch: Math.round(this.input.pitch * 1000) / 1000,
        anim,
        sprinting,
        swimming,
        seq: ++this.inputSeq,
      });
    }
  }

  private collidesWithSolidStructure(x: number, z: number, y: number): boolean {
    for (const s of this.structureMap.values()) {
      const def = STRUCTURES[s.kind];
      if (!def.solidCollision) continue;
      if (s.kind === 'wood_doorway' && s.isOpen) continue;
      if (y > s.y + def.height - 0.2) continue;

      // Oriented box distance check
      const dx = x - s.x;
      const dz = z - s.z;
      const cos = Math.cos(-s.rotY);
      const sin = Math.sin(-s.rotY);
      const lx = dx * cos - dz * sin;
      const lz = dx * sin + dz * cos;
      if (Math.abs(lx) < def.width * 0.48 + 0.35 && Math.abs(lz) < def.depth * 0.48 + 0.35) {
        return true;
      }
    }
    return false;
  }

  private updateTargetingAndBuildGhost(): void {
    this.aimNodeId = undefined;
    this.aimWildlifeId = undefined;
    this.aimStructureId = undefined;
    this.aimBoatId = undefined;
    this.aimLootId = undefined;
    this.aimPlayerId = undefined;

    const self = this.getLocalPlayerState();
    if (!self || !self.alive || this.ui.activePanel !== 'none') {
      this.ui.setInteractPrompt(null);
      this.structures?.updateGhost(null, 0, 0, 0, 0, false);
      this.boats?.updateGhost(null, 0, 0, 0, false);
      return;
    }

    this.raycaster.setFromCamera(this.centerNDC, this.camera);

    // 0. Boat / Vessel Launch Holographic Ghost Placement (aim onto water plane!)
    if (this.activeBoatKind) {
      const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -WATER_LEVEL);
      const hitPt = new THREE.Vector3();
      const gotHit = this.raycaster.ray.intersectPlane(waterPlane, hitPt);
      if (!gotHit || hitPt.distanceTo(this.pos) > 22) {
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        hitPt.set(this.pos.x + dir.x * 8.5, WATER_LEVEL, this.pos.z + dir.z * 8.5);
      }
      const distOk = Math.hypot(hitPt.x - this.pos.x, hitPt.z - this.pos.z) <= 18;
      const bedH = this.world.getHeight(hitPt.x, hitPt.z);
      const deepEnough = bedH < WATER_LEVEL - 0.35;
      const valid = distOk && deepEnough;

      this.boatGhostPos = { x: hitPt.x, z: hitPt.z, rotY: this.buildRotY, valid };
      this.boats?.updateGhost(this.activeBoatKind, hitPt.x, hitPt.z, this.buildRotY, valid);
      const bdef = BOATS[this.activeBoatKind];
      this.ui.setInteractPrompt(
        valid ? `[LMB] Launch ${bdef.name} into Sea` : `Aim at deeper water to launch ${bdef.name}`,
        `[R] Rotate Hull • [RMB] Cancel • [B] Shipyard`
      );
      return;
    } else {
      this.boatGhostPos = null;
      this.boats?.updateGhost(null, 0, 0, 0, false);
    }

    // Build Mode Holographic Ghost Placement
    if (this.activeBuildKind && this.terrainMesh) {
      const hits = this.raycaster.intersectObject(this.terrainMesh, false);
      let rawPos: THREE.Vector3;
      if (hits.length > 0 && hits[0].distance < 18) {
        rawPos = hits[0].point;
      } else {
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        rawPos = this.pos.clone().addScaledVector(dir, 5.5);
      }

      const snapped = computeSnappedPlacement(
        this.activeBuildKind,
        { x: rawPos.x, y: rawPos.y, z: rawPos.z },
        this.buildRotY,
        Array.from(this.structureMap.values()),
        (x, z) => this.world.getHeight(x, z)
      );
      const distOk = Math.hypot(snapped.x - this.pos.x, snapped.z - this.pos.z) <= 12.5;
      const allowWater = this.activeBuildKind === 'dock_pier';
      const heightOk = allowWater
        ? this.world.getHeight(snapped.x, snapped.z) <= WATER_LEVEL + 1.8
        : this.world.getHeight(snapped.x, snapped.z) >= WATER_LEVEL - 0.1;
      const valid = distOk && heightOk;

      this.ghostPlacement = { ...snapped, valid };
      this.structures?.updateGhost(
        this.activeBuildKind,
        snapped.x,
        snapped.y,
        snapped.z,
        snapped.rotY,
        valid
      );
      const def = STRUCTURES[this.activeBuildKind];
      this.ui.setInteractPrompt(
        `[LMB] Place ${def.name}${snapped.snapped ? ' (Snapped)' : ''}`,
        `[R] Rotate • [RMB] Cancel • [B] Blueprints`
      );
      return;
    } else {
      this.ghostPlacement = null;
      this.structures?.updateGhost(null, 0, 0, 0, 0, false);
    }

    // Raycast interactive targets (boats, loot, wildlife, structures, resource nodes)
    const targets: THREE.Object3D[] = [];
    if (this.boats && !self.boatId) targets.push(this.boats.group);
    if (this.effects) targets.push(this.effects.lootGroup);
    if (this.wildlife) targets.push(this.wildlife.group);
    if (this.structures) targets.push(this.structures.group);
    if (this.env) targets.push(this.env.nodeGroup);
    for (const rp of this.remotePlayers.values()) targets.push(rp.visual.group);

    const hits = this.raycaster.intersectObjects(targets, true);
    let prompt: string | null = null;
    let sub: string | undefined;
    let progressPct: number | undefined;

    for (const h of hits) {
      if (h.distance > 11.5) break;
      const u = h.object.userData;
      const worldDist = h.point.distanceTo(this.pos);
      if (worldDist > 6.8) continue;

      if (u.boatId && !self.boatId) {
        const b = this.boatMap.get(u.boatId as string);
        if (b) {
          this.aimBoatId = b.id;
          const bdef = BOATS[b.kind];
          prompt = b.pilotId
            ? `${bdef.name} (Piloted)`
            : `[E] Board & Sail ${bdef.name}`;
          sub = bdef.cargoSlots > 0 ? `W/S Sail Gears • A/D Rudder • [F] ${bdef.cargoSlots}-Slot Cargo` : `W/S Sail Gears • A/D Rudder • [E] Disembark`;
          progressPct = (b.hp / b.maxHp) * 100;
          break;
        }
      }

      if (u.lootId) {
        this.aimLootId = u.lootId as string;
        const item = getItem(u.lootItemId as string);
        prompt = `[E] Pick up ${u.lootCount}× ${item?.name ?? u.lootItemId}`;
        break;
      }
      if (u.wildlifeId) {
        this.aimWildlifeId = u.wildlifeId as string;
        const kind = (u.wildlifeKind as string).toUpperCase();
        prompt = `[LMB] Hunt ${kind}`;
        break;
      }
      if (u.playerId && self.pvpEnabled) {
        this.aimPlayerId = u.playerId as string;
        prompt = `[LMB] Duel Survivor`;
        break;
      }
      if (u.structureId) {
        const st = this.structureMap.get(u.structureId as string);
        if (st) {
          this.aimStructureId = st.id;
          const def = STRUCTURES[st.kind];
          if (st.kind === 'storage_chest') prompt = `[E] Open Shared Chest`;
          else if (st.kind === 'wood_doorway') prompt = `[E] ${st.isOpen ? 'Close' : 'Open'} Timber Door`;
          else if (st.kind === 'campfire') {
            prompt = `[E] Refuel Campfire (Fuel ${Math.round(st.fuel ?? 0)}%)`;
            sub = 'Press [C] to roast meat & stew';
            progressPct = st.fuel ?? 0;
          } else if (st.kind === 'rain_collector') {
            prompt = `[E] Drink Rainwater (${Math.round(st.waterLevel ?? 0)}%)`;
            progressPct = st.waterLevel ?? 0;
          } else if (st.kind === 'planter_box') {
            const pct = Math.round(st.cropProgress ?? 0);
            prompt = pct >= 100 ? `[E] Harvest Sunbloom & Berries!` : `Planter Box Growing (${pct}%)`;
            progressPct = pct;
          } else if (st.kind === 'alchemy_cauldron') {
            prompt = `Alchemy Cauldron — Press [C] to Brew Elixirs`;
            progressPct = (st.hp / st.maxHp) * 100;
          } else if (st.kind === 'bedroll') {
            prompt = `[E] Set Respawn Point`;
          } else {
            prompt = `${def.name} (${st.hp}/${st.maxHp} HP)`;
            progressPct = (st.hp / st.maxHp) * 100;
          }
          if (getItem(self.equippedItemId)?.toolKind === 'hammer' && st.ownerId !== 'world') {
            sub = `[LMB] Repair • [RMB] Dismantle`;
          }
          break;
        }
      }
      if (u.nodeId) {
        const node = this.nodeMap.get(u.nodeId as string);
        if (node && !node.depleted) {
          this.aimNodeId = node.id;
          const pct = Math.round((node.hp / node.maxHp) * 100);
          const niceName = node.kind.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          prompt = `[LMB] Harvest ${niceName}`;
          progressPct = pct;
          break;
        }
      }
    }

    if (!prompt && self.status.nearFreshWater) {
      prompt = `[E] Drink Crystal Spring Water`;
      sub = 'Restores +45 Thirst';
    }

    this.ui.setInteractPrompt(prompt, sub, progressPct);
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    const dt = Math.min(0.08, this.clock.getDelta());
    this.elapsed += dt;

    if (!this.inGame) {
      // Slow cinematic sunlit orbit over the live 3D island on the Title Screen!
      const angle = this.elapsed * 0.085;
      const radius = 54;
      const cx = -10 + Math.cos(angle) * radius;
      const cz = 18 + Math.sin(angle) * radius;
      this.camera.position.set(cx, 24 + Math.sin(this.elapsed * 0.25) * 3.5, cz);
      this.camera.lookAt(-6, 5.5, 16);
      this.sky.update(dt, this.elapsed, this.worldTime, this.camera.position);
    } else {
      this.updateLocalPlayer(dt);
      this.updateTargetingAndBuildGhost();
      this.sky.update(dt, this.elapsed, this.worldTime, this.pos);

      // Interpolate remote multiplayer survivors
      const smooth = Math.min(1, dt * 12);
      for (const entry of this.remotePlayers.values()) {
        entry.visual.group.position.lerp(entry.targetPos, smooth);
        let dy = entry.targetYaw - entry.visual.group.rotation.y;
        while (dy > Math.PI) dy -= Math.PI * 2;
        while (dy < -Math.PI) dy += Math.PI * 2;
        entry.visual.group.rotation.y += dy * smooth;
        entry.visual.animate(dt, entry.state, this.elapsed);
      }

      const self = this.getLocalPlayerState();
      if (self && this.privateState) {
        const sample = this.world.sample(this.pos.x, this.pos.z);
        const biomeNames: Record<string, string> = {
          ocean: 'Coastal Sea',
          beach: 'Golden Shores',
          meadow: 'Emerald Meadows',
          pine: 'Whispering Pines',
          highland: 'Granite Highlands',
          volcanic: 'Obsidian Spire',
          marsh: 'Misty Bog',
        };

        this.ui.updateHud(
          self,
          this.privateState,
          this.worldTime,
          biomeNames[sample.biome] ?? 'Wildreach',
          this.allPlayers.length,
          this.net.pingMs,
          this.input.yaw,
          this.input.pointerLocked,
          this.touch.enabled,
          this.net.isOfflineMode,
          this.input.pointerLockBlocked
        );

        const hasInteract = Boolean(
          this.aimBoatId ||
            self.boatId ||
            this.aimLootId ||
            this.aimStructureId ||
            self.status.nearFreshWater ||
            this.aimNodeId
        );
        this.touch.setContextualState(
          hasInteract,
          Boolean(this.activeBuildKind || this.activeBoatKind),
          this.ui.activePanel === 'none' && !this.ui.chatOpen && self.alive
        );

        const activeBoat = self.boatId ? this.boatMap.get(self.boatId) ?? null : null;
        this.ui.updateSailingHud(activeBoat, this.worldTime.windDirX, this.worldTime.windDirZ);

        const structuresArr = Array.from(this.structureMap.values());
        const boatsArr = Array.from(this.boatMap.values());
        this.minimap?.renderHud(
          this.pos.x,
          this.pos.z,
          this.input.yaw,
          this.localId,
          this.allPlayers,
          structuresArr,
          this.landmarks,
          boatsArr
        );

        // Ambient soundscape crossfade
        let nearFireDist = 99;
        for (const fp of this.structures?.getLitCampfirePositions() ?? []) {
          nearFireDist = Math.min(nearFireDist, fp.distanceTo(this.pos));
        }
        const distFromCoast = Math.max(0, 125 - Math.hypot(this.pos.x, this.pos.z));
        this.audio.updateAmbient(dt, this.worldTime, sample.biome, nearFireDist, distFromCoast);

        // Immersive screen-edge feedback vignette
        this.ui.setScreenVignette({
          hitFlash: this.hitFlash,
          lowHp: self.vitals.hp < self.vitals.maxHp * 0.3,
          chilled: self.status.chilled,
          underwater: this.camera.position.y < WATER_LEVEL + 0.08,
          warmFire: self.status.nearCampfire && (this.worldTime.timeOfDay < 0.25 || this.worldTime.timeOfDay > 0.74),
        });
      }
    }

    // Update animated world systems
    const nightFactor = clamp(1 - (this.sky.sunDirection.y + 0.08) * 3.5, 0, 1);
    this.water?.update(
      this.elapsed,
      this.worldTime,
      this.sky.sunDirection,
      this.sky.sunLight.color,
      this.sky.horizonColor,
      this.sky.fog.color,
      this.sky.fog.density,
      nightFactor
    );
    this.env?.update(dt, this.elapsed, this.worldTime.windSpeed);
    this.structures?.update(dt, this.elapsed);
    this.boats?.update(dt, this.elapsed, this.worldTime, nightFactor);
    this.livingFX?.update(dt, this.elapsed, this.worldTime, nightFactor);
    this.wildlife?.update(dt, this.elapsed, this.camera);
    this.effects?.update(
      dt,
      this.elapsed,
      this.worldTime,
      this.inGame ? this.pos : this.camera.position,
      this.structures?.getLitCampfirePositions() ?? []
    );

    this.renderer.render(this.scene, this.camera);
  };
}

new WildreachGame();
