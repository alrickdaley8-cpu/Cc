import type {
  AnimState,
  BoatKind,
  BoatState,
  ChatMessage,
  FloatingCombatEvent,
  LandmarkInfo,
  LocalPlayerPrivateState,
  LootDropState,
  PlayerOutfit,
  PlayerState,
  ProjectileState,
  ResourceNodeState,
  RoomSummary,
  StructureKind,
  StructureState,
  WildlifeState,
  WorldPing,
  WorldTimeState,
} from './types.js';

export const SERVER_TICK_HZ = 20;
export const DAY_LENGTH_SECONDS = 420; // 7 real minutes = 1 full day/night cycle
export const INVENTORY_SIZE = 27; // 9 hotbar + 18 backpack
export const HOTBAR_SIZE = 9;
export const CHEST_SIZE = 12;

export interface JoinRoomPayload {
  roomId?: string;
  roomName?: string;
  seed?: number;
  playerName: string;
  outfit: PlayerOutfit;
  spawnAiCompanions?: boolean;
  playerToken?: string; // persistent client token for seamless reconnect & profile restore
}

export interface PlayerInputPayload {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  yaw: number;
  pitch: number;
  anim: AnimState;
  sprinting: boolean;
  swimming: boolean;
  seq: number;
}

export interface PrimaryActionPayload {
  aimX: number;
  aimY: number;
  aimZ: number;
  dirX: number;
  dirY: number;
  dirZ: number;
  charge?: number; // 0..1 for bow draw
  targetNodeId?: string;
  targetWildlifeId?: string;
  targetPlayerId?: string;
  targetStructureId?: string;
}

export interface BuildPlacePayload {
  kind: StructureKind;
  x: number;
  y: number;
  z: number;
  rotY: number;
  fromItemSlot?: number;
}

export interface ChestTransferPayload {
  structureId: string;
  from: 'inventory' | 'chest';
  fromIndex: number;
  toIndex?: number;
}

export interface BoatBuildPayload {
  kind: BoatKind;
  x: number;
  z: number;
  rotY: number;
}

export interface BoatControlPayload {
  throttle?: number; // explicit -1..3
  throttleDelta?: number; // -1 or +1 step
  steer: number; // -1..1
}

export interface BoatChestTransferPayload {
  boatId: string;
  from: 'inventory' | 'chest';
  fromIndex: number;
}

export interface WorldInitPayload {
  playerId: string;
  room: RoomSummary;
  landmarks: LandmarkInfo[];
  time: WorldTimeState;
  players: PlayerState[];
  privateState: LocalPlayerPrivateState;
  nodes: ResourceNodeState[];
  structures: StructureState[];
  boats: BoatState[];
  wildlife: WildlifeState[];
  loot: LootDropState[];
  chatHistory: ChatMessage[];
  pings?: WorldPing[];
}

export interface WorldSnapshotPayload {
  t: number;
  time: WorldTimeState;
  players: PlayerState[];
  boats: BoatState[];
  wildlife: WildlifeState[];
  projectiles: ProjectileState[];
}

export interface ClientToServerEvents {
  'room:join': (payload: JoinRoomPayload, cb: (res: { ok: boolean; error?: string; init?: WorldInitPayload }) => void) => void;
  'player:input': (payload: PlayerInputPayload) => void;
  'player:equip': (slotIndex: number) => void;
  'player:action': (payload: PrimaryActionPayload) => void;
  'player:dodge': (dir: { x: number; z: number }) => void;
  'player:interact': (payload: { structureId?: string; lootId?: string; drinkWater?: boolean }) => void;
  'player:consume': (slotIndex: number) => void;
  'player:equipArmor': (slotIndex: number) => void;
  'player:swapSlots': (payload: { from: number; to: number }) => void;
  'player:dropSlot': (payload: { slotIndex: number; count?: number }) => void;
  'player:craft': (recipeId: string) => void;
  'player:build': (payload: BuildPlacePayload) => void;
  'player:demolish': (structureId: string) => void;
  'player:chestTransfer': (payload: ChestTransferPayload) => void;
  'boat:build': (payload: BoatBuildPayload) => void;
  'boat:board': (boatId: string | null) => void;
  'boat:control': (payload: BoatControlPayload) => void;
  'boat:chestTransfer': (payload: BoatChestTransferPayload) => void;
  'player:fishCatch': (payload: { deepWater: boolean }) => void;
  'player:pingWorld': (payload: { x: number; y: number; z: number; label?: string }) => void;
  'player:revive': (targetPlayerId: string) => void;
  'player:teleportToFriend': (targetPlayerId: string) => void;
  'player:respawn': () => void;
  'player:togglePvp': () => void;
  'player:emote': (emote: string) => void;
  'player:spawnBot': () => void;
  'chat:send': (text: string) => void;
  'net:ping': (clientTime: number, cb: (serverTime: number) => void) => void;
}

export interface ServerToClientEvents {
  'world:snapshot': (snapshot: WorldSnapshotPayload) => void;
  'player:private': (state: LocalPlayerPrivateState) => void;
  'node:update': (node: ResourceNodeState) => void;
  'node:fell': (payload: { id: string; dirX: number; dirZ: number }) => void;
  'structure:add': (structure: StructureState) => void;
  'structure:update': (structure: StructureState) => void;
  'structure:remove': (structureId: string) => void;
  'boat:add': (boat: BoatState) => void;
  'boat:update': (boat: BoatState) => void;
  'boat:remove': (boatId: string) => void;
  'loot:add': (loot: LootDropState) => void;
  'loot:remove': (lootId: string) => void;
  'combat:event': (ev: FloatingCombatEvent) => void;
  'fx:event': (ev: {
    kind: 'chop' | 'mine' | 'hit' | 'arrow_hit' | 'build' | 'eat' | 'drink' | 'thunder' | 'levelup';
    x: number;
    y: number;
    z: number;
    color?: string;
  }) => void;
  'chat:message': (msg: ChatMessage) => void;
  'world:ping': (ping: WorldPing) => void;
  'toast:notify': (payload: { text: string; tone?: 'info' | 'good' | 'warn' | 'danger' }) => void;
}
