export type BiomeType =
  | 'ocean'
  | 'beach'
  | 'meadow'
  | 'pine'
  | 'highland'
  | 'volcanic'
  | 'marsh';

export type WeatherType = 'clear' | 'breezy' | 'fog' | 'rain' | 'storm';

export type PlayerOutfit = 'ranger' | 'nomad' | 'warden' | 'alchemist' | 'mariner';

export type AnimState =
  | 'idle'
  | 'walk'
  | 'run'
  | 'jump'
  | 'swim'
  | 'swing'
  | 'bow'
  | 'dodge'
  | 'dead';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Vitals {
  hp: number;
  maxHp: number;
  stamina: number;
  maxStamina: number;
  hunger: number; // 0..100
  thirst: number; // 0..100
  warmth: number; // 0..100 (50 = comfortable)
}

export interface StatusFlags {
  sheltered: boolean;
  warm: boolean;
  wellFed: boolean;
  wet: boolean;
  chilled: boolean;
  nearCampfire: boolean;
  nearWorkbench: boolean;
  nearFurnace: boolean;
  nearRunicForge: boolean;
  nearFreshWater: boolean;
}

export interface InventorySlot {
  itemId: string;
  count: number;
  durability?: number;
}

export interface PlayerState {
  id: string;
  name: string;
  isBot: boolean;
  outfit: PlayerOutfit;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  yaw: number;
  pitch: number;
  anim: AnimState;
  swingTime: number;
  equippedSlot: number; // 0..8
  equippedItemId: string | null;
  armorItemId: string | null;
  armorRating: number;
  vitals: Vitals;
  status: StatusFlags;
  alive: boolean;
  respawnAt: number;
  bedPos: Vec3 | null;
  pvpEnabled: boolean;
  level: number;
  xp: number;
  kills: number;
  daysSurvived: number;
  emote: string | null;
  emoteUntil: number;
}

export interface LocalPlayerPrivateState {
  inventory: (InventorySlot | null)[]; // 27 slots: 0..8 hotbar, 9..26 backpack
  armorSlot: InventorySlot | null;
  objectives: Record<string, boolean>;
}

export type ResourceNodeKind =
  | 'pine_tree'
  | 'oak_tree'
  | 'birch_tree'
  | 'palm_tree'
  | 'marsh_tree'
  | 'stone_boulder'
  | 'copper_vein'
  | 'iron_vein'
  | 'obsidian_vein'
  | 'ancient_crystal'
  | 'berry_bush'
  | 'fiber_reed'
  | 'mushroom_cluster'
  | 'driftwood'
  | 'supply_crate';

export interface ResourceNodeState {
  id: string;
  kind: ResourceNodeKind;
  x: number;
  y: number;
  z: number;
  rotY: number;
  scale: number;
  hp: number;
  maxHp: number;
  depleted: boolean;
  respawnAt: number;
}

export type StructureKind =
  | 'campfire'
  | 'workbench'
  | 'furnace'
  | 'runic_forge'
  | 'wood_foundation'
  | 'wood_wall'
  | 'wood_doorway'
  | 'wood_roof'
  | 'wood_stairs'
  | 'stone_wall'
  | 'spike_barricade'
  | 'storage_chest'
  | 'bedroll'
  | 'rain_collector'
  | 'lantern_post'
  | 'watchtower_beacon';

export interface StructureState {
  id: string;
  kind: StructureKind;
  ownerId: string;
  ownerName: string;
  x: number;
  y: number;
  z: number;
  rotY: number;
  hp: number;
  maxHp: number;
  isOpen?: boolean;
  lit?: boolean;
  fuel?: number; // 0..100
  waterLevel?: number; // 0..100 for rain collector
  chestSlots?: (InventorySlot | null)[];
}

export type WildlifeKind = 'deer' | 'boar' | 'wolf' | 'stalker';

export type WildlifeAIState = 'idle' | 'wander' | 'flee' | 'chase' | 'attack' | 'dead';

export interface WildlifeState {
  id: string;
  kind: WildlifeKind;
  x: number;
  y: number;
  z: number;
  yaw: number;
  hp: number;
  maxHp: number;
  state: WildlifeAIState;
  speed: number;
  attackTime: number;
}

export interface LootDropState {
  id: string;
  itemId: string;
  count: number;
  x: number;
  y: number;
  z: number;
}

export interface ProjectileState {
  id: string;
  ownerId: string;
  kind: 'arrow' | 'starlight_bolt';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  damage: number;
}

export interface WorldTimeState {
  day: number;
  timeOfDay: number; // 0..1 (0=midnight, 0.25=dawn, 0.5=noon, 0.75=dusk)
  weather: WeatherType;
  weatherIntensity: number; // 0..1
  windDirX: number;
  windDirZ: number;
  windSpeed: number;
}

export interface LandmarkInfo {
  id: string;
  name: string;
  kind: 'sanctuary' | 'shipwreck' | 'watchtower' | 'peak' | 'spring' | 'ruins';
  x: number;
  z: number;
  radius: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  kind: 'chat' | 'system' | 'combat' | 'emote';
  timestamp: number;
}

export interface FloatingCombatEvent {
  id: string;
  x: number;
  y: number;
  z: number;
  text: string;
  color: string;
  kind: 'damage' | 'gather' | 'heal' | 'crit' | 'xp';
}

export interface RoomSummary {
  id: string;
  name: string;
  seed: number;
  playerCount: number;
  maxPlayers: number;
  day: number;
  weather: WeatherType;
  pvpEnabled: boolean;
}
