import {
  BUILDABLE_LIST,
  HOTBAR_SIZE,
  ITEMS,
  RECIPES,
  STRUCTURES,
  getItem,
  type ChatMessage,
  type InventorySlot,
  type LocalPlayerPrivateState,
  type PlayerOutfit,
  type PlayerState,
  type RoomSummary,
  type StructureKind,
  type StructureState,
  type WorldTimeState,
} from '@wildreach/shared';
import { getItemSvg } from './Icons';

export interface UIActions {
  onJoinGame: (opts: {
    playerName: string;
    outfit: PlayerOutfit;
    roomId: string;
    roomName: string;
    seed?: number;
    serverUrl?: string;
    spawnAiCompanions: boolean;
  }) => void;
  onRefreshRooms: () => Promise<{ rooms: RoomSummary[]; serverReachable: boolean }>;
  onSelectHotbar: (slot: number) => void;
  onConsumeSlot: (slot: number) => void;
  onEquipArmor: (slot: number) => void;
  onSwapSlots: (from: number, to: number) => void;
  onDropSlot: (slot: number) => void;
  onCraft: (recipeId: string) => void;
  onSelectBuildKind: (kind: StructureKind | null) => void;
  onChestTransfer: (structureId: string, from: 'inventory' | 'chest', fromIndex: number) => void;
  onSendChat: (text: string) => void;
  onRespawn: () => void;
  onTogglePvp: () => void;
  onSpawnBot: () => void;
  onSetQuality: (tier: 'low' | 'medium' | 'high') => void;
  onSetVolume: (vol: number) => void;
  onSetTouchMode: (mode: 'auto' | 'on' | 'off') => void;
  onOpenMap: () => void;
  onResumeGame: () => void;
}

export type ActivePanel = 'none' | 'inventory' | 'crafting' | 'build' | 'map' | 'chest' | 'pause';

export class UIManager {
  activePanel: ActivePanel = 'none';
  openChestId: string | null = null;
  chatOpen = false;
  selectedBuildKind: StructureKind = 'wood_foundation';

  private actions: UIActions;
  private selectedInvSlot: number | null = null;
  private craftStationFilter: string = 'all';
  private lastPrivate: LocalPlayerPrivateState | null = null;
  private lastSelf: PlayerState | null = null;
  private touchMode: 'auto' | 'on' | 'off' = 'auto';
  private activeRoomId = 'emerald-archipelago';
  private activeSeed = 42077;
  private activeServerUrl = '';

  // Cached DOM references
  private titleOverlay: HTMLElement;
  private hudRoot: HTMLElement;
  private hotbarEl: HTMLElement;
  private promptEl: HTMLElement;
  private toastContainer: HTMLElement;
  private chatLogEl: HTMLElement;
  private chatInputWrap: HTMLElement;
  private chatInputEl: HTMLInputElement;
  private panelContainer: HTMLElement;
  private deathOverlay: HTMLElement;
  private floatingLayer: HTMLElement;

  constructor(actions: UIActions) {
    this.actions = actions;
    this.titleOverlay = document.getElementById('title-overlay')!;
    this.hudRoot = document.getElementById('hud-root')!;
    this.hotbarEl = document.getElementById('hotbar')!;
    this.promptEl = document.getElementById('interact-prompt')!;
    this.toastContainer = document.getElementById('toast-container')!;
    this.chatLogEl = document.getElementById('chat-log')!;
    this.chatInputWrap = document.getElementById('chat-input-wrap')!;
    this.chatInputEl = document.getElementById('chat-input') as HTMLInputElement;
    this.panelContainer = document.getElementById('panel-container')!;
    this.deathOverlay = document.getElementById('death-overlay')!;
    this.floatingLayer = document.getElementById('floating-text-layer')!;

    this.initTitleScreen();
    this.initChat();
    this.initResponsiveHudChrome();
    document.getElementById('btn-respawn')?.addEventListener('click', () => this.actions.onRespawn());
  }

  private initResponsiveHudChrome(): void {
    const objCard = document.getElementById('objectives-card');
    if (objCard && window.innerWidth <= 768) {
      objCard.classList.add('collapsed');
    }
    document.getElementById('btn-toggle-obj')?.addEventListener('click', () => {
      objCard?.classList.toggle('collapsed');
    });
    document.getElementById('btn-hide-obj')?.addEventListener('click', () => {
      objCard?.classList.add('collapsed');
    });
    document.getElementById('btn-minimap-open')?.addEventListener('click', () => {
      this.actions.onOpenMap();
    });
    document.getElementById('btn-map-close')?.addEventListener('click', () => {
      this.setPanel('none');
      this.actions.onResumeGame();
    });
  }

  private buildInviteLink(roomId: string, seed?: number, serverUrl?: string): string {
    const url = new URL(window.location.href);
    url.searchParams.set('room', roomId || 'emerald-archipelago');
    if (seed) url.searchParams.set('seed', String(seed));
    else url.searchParams.delete('seed');
    if (serverUrl) url.searchParams.set('server', serverUrl);
    else url.searchParams.delete('server');
    return url.toString();
  }

  private async copyInvite(roomId: string, seed?: number, serverUrl?: string): Promise<void> {
    const link = this.buildInviteLink(roomId, seed, serverUrl);
    try {
      await navigator.clipboard.writeText(link);
      this.showToast('Invite link copied to clipboard!', 'good');
    } catch {
      window.prompt('Copy your Wildreach invite link:', link);
    }
  }

  private initTitleScreen(): void {
    const nameInput = document.getElementById('inp-name') as HTMLInputElement;
    const roomInput = document.getElementById('inp-room') as HTMLInputElement;
    const seedInput = document.getElementById('inp-seed') as HTMLInputElement;
    const serverInput = document.getElementById('inp-server') as HTMLInputElement;
    const aiCheck = document.getElementById('chk-ai') as HTMLInputElement;
    const enterBtn = document.getElementById('btn-enter-world')!;
    const inviteBtn = document.getElementById('btn-copy-invite')!;
    const outfitBtns = document.querySelectorAll<HTMLButtonElement>('.outfit-pill');

    // Hydrate from URL query params (?room=...&seed=...&server=...)
    const params = new URLSearchParams(window.location.search);
    if (params.get('room')) roomInput.value = params.get('room')!;
    if (params.get('seed')) seedInput.value = params.get('seed')!;
    if (params.get('server')) serverInput.value = params.get('server')!;

    let chosenOutfit: PlayerOutfit = 'ranger';
    outfitBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        outfitBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        chosenOutfit = (btn.dataset.outfit as PlayerOutfit) || 'ranger';
      });
    });

    const defaultNames = ['Ash', 'Rowan', 'Freya', 'Bram', 'Kira', 'Soren', 'Nora', 'Talia'];
    if (!nameInput.value) {
      nameInput.value = defaultNames[Math.floor(Math.random() * defaultNames.length)];
    }

    inviteBtn.addEventListener('click', () => {
      const seedVal = seedInput.value.trim() ? Number(seedInput.value.trim()) : undefined;
      void this.copyInvite(roomInput.value.trim(), Number.isFinite(seedVal) ? seedVal : undefined, serverInput.value.trim());
    });

    enterBtn.addEventListener('click', () => {
      const seedVal = seedInput.value.trim() ? Number(seedInput.value.trim()) : undefined;
      this.activeRoomId = roomInput.value.trim() || 'emerald-archipelago';
      this.activeSeed = Number.isFinite(seedVal) ? seedVal! : 42077;
      this.activeServerUrl = serverInput.value.trim();
      this.actions.onJoinGame({
        playerName: nameInput.value.trim() || 'Survivor',
        outfit: chosenOutfit,
        roomId: this.activeRoomId,
        roomName: this.activeRoomId,
        seed: Number.isFinite(seedVal) ? seedVal : undefined,
        serverUrl: this.activeServerUrl || undefined,
        spawnAiCompanions: aiCheck.checked,
      });
    });

    void this.refreshRoomList();
  }

  async refreshRoomList(): Promise<void> {
    const listEl = document.getElementById('room-list');
    const badgeEl = document.getElementById('lobby-mode-badge');
    if (!listEl) return;
    const { rooms, serverReachable } = await this.actions.onRefreshRooms();

    if (badgeEl) {
      if (serverReachable) {
        badgeEl.textContent = '● Live Multiplayer Server';
        badgeEl.classList.remove('offline');
      } else {
        badgeEl.textContent = '◆ Local World (Static / GitHub Pages)';
        badgeEl.classList.add('offline');
      }
    }

    if (!serverReachable) {
      listEl.innerHTML = `<div class="room-empty"><strong>Static / Offline Ready!</strong> No backend server detected on this host, so Wildreach will launch a full browser-simulated island (with AI allies & auto-save). Paste a Socket.IO server URL on the left to play online co-op!</div>`;
      return;
    }

    if (rooms.length === 0) {
      listEl.innerHTML = `<div class="room-empty">Public world ready — click Enter Wildreach!</div>`;
      return;
    }
    listEl.innerHTML = rooms
      .map(
        (r) => `
        <button class="room-row" data-room-id="${r.id}">
          <div>
            <div class="room-title">${this.esc(r.name)}</div>
            <div class="room-meta">Day ${r.day} • ${r.weather} • Seed ${r.seed}</div>
          </div>
          <span class="room-badge">${r.playerCount}/${r.maxPlayers} Online</span>
        </button>`
      )
      .join('');
    listEl.querySelectorAll<HTMLButtonElement>('.room-row').forEach((btn) => {
      btn.addEventListener('click', () => {
        const inp = document.getElementById('inp-room') as HTMLInputElement;
        if (inp && btn.dataset.roomId) inp.value = btn.dataset.roomId;
      });
    });
  }

  hideTitleScreen(): void {
    this.titleOverlay.classList.add('hidden');
    this.hudRoot.classList.remove('hidden');
  }

  private initChat(): void {
    this.chatInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const txt = this.chatInputEl.value.trim();
        if (txt) this.actions.onSendChat(txt);
        this.chatInputEl.value = '';
        this.setChatOpen(false);
      } else if (e.key === 'Escape') {
        this.setChatOpen(false);
      }
    });
  }

  setChatOpen(open: boolean): void {
    this.chatOpen = open;
    this.chatInputWrap.classList.toggle('hidden', !open);
    if (open) {
      this.chatInputEl.focus();
    } else {
      this.chatInputEl.blur();
    }
  }

  appendChat(msg: ChatMessage): void {
    const div = document.createElement('div');
    div.className = `chat-line chat-${msg.kind}`;
    if (msg.kind === 'system') {
      div.innerHTML = `<span class="chat-sys">◆ ${this.esc(msg.text)}</span>`;
    } else if (msg.kind === 'emote') {
      div.innerHTML = `<span class="chat-name">${this.esc(msg.senderName)}</span> <em>${this.esc(msg.text)}</em>`;
    } else {
      div.innerHTML = `<span class="chat-name">${this.esc(msg.senderName)}:</span> ${this.esc(msg.text)}`;
    }
    this.chatLogEl.appendChild(div);
    while (this.chatLogEl.children.length > 36) {
      this.chatLogEl.removeChild(this.chatLogEl.firstChild!);
    }
    this.chatLogEl.scrollTop = this.chatLogEl.scrollHeight;
  }

  showToast(text: string, tone: 'info' | 'good' | 'warn' | 'danger' = 'info'): void {
    const el = document.createElement('div');
    el.className = `toast toast-${tone}`;
    el.textContent = text;
    this.toastContainer.appendChild(el);
    setTimeout(() => el.classList.add('fade-out'), 3200);
    setTimeout(() => el.remove(), 3800);
  }

  spawnFloatingText(screenX: number, screenY: number, text: string, color: string): void {
    const el = document.createElement('div');
    el.className = 'floating-dmg';
    el.textContent = text;
    el.style.left = `${Math.round(screenX)}px`;
    el.style.top = `${Math.round(screenY)}px`;
    el.style.color = color;
    this.floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }

  setInteractPrompt(text: string | null, subtext?: string, progressPct?: number): void {
    if (!text) {
      this.promptEl.classList.add('hidden');
      return;
    }
    this.promptEl.classList.remove('hidden');
    const barHtml =
      progressPct !== undefined
        ? `<div class="prompt-bar"><div style="width:${Math.max(0, Math.min(100, Math.round(progressPct)))}%"></div></div>`
        : '';
    this.promptEl.innerHTML = `<div class="prompt-main">${this.esc(text)}</div>${
      subtext ? `<div class="prompt-sub">${this.esc(subtext)}</div>` : ''
    }${barHtml}`;
  }

  setScreenVignette(opts: {
    hitFlash: number;
    lowHp: boolean;
    chilled: boolean;
    underwater: boolean;
    warmFire: boolean;
  }): void {
    const el = document.getElementById('screen-vignette');
    if (!el) return;
    if (opts.underwater) {
      el.style.background = 'rgba(14, 116, 144, 0.24)';
      el.style.boxShadow = 'inset 0 0 110px rgba(8, 51, 68, 0.72)';
    } else if (opts.hitFlash > 0.05) {
      el.style.background = `rgba(220, 38, 38, ${(opts.hitFlash * 0.25).toFixed(2)})`;
      el.style.boxShadow = `inset 0 0 120px rgba(220, 38, 38, ${(opts.hitFlash * 0.75).toFixed(2)})`;
    } else if (opts.lowHp) {
      el.style.background = 'transparent';
      el.style.boxShadow = 'inset 0 0 120px rgba(185, 28, 28, 0.52)';
    } else if (opts.chilled) {
      el.style.background = 'transparent';
      el.style.boxShadow = 'inset 0 0 110px rgba(56, 189, 248, 0.36)';
    } else if (opts.warmFire) {
      el.style.background = 'transparent';
      el.style.boxShadow = 'inset 0 0 90px rgba(249, 115, 22, 0.16)';
    } else {
      el.style.background = 'transparent';
      el.style.boxShadow = 'inset 0 0 70px rgba(0, 0, 0, 0.22)';
    }
  }

  setBowCharge(pct: number): void {
    const ring = document.getElementById('bow-charge-bar');
    const fill = document.getElementById('bow-charge-fill');
    if (!ring || !fill) return;
    if (pct <= 0.01) {
      ring.classList.add('hidden');
    } else {
      ring.classList.remove('hidden');
      fill.style.width = `${Math.round(pct * 100)}%`;
    }
  }

  updateHud(
    self: PlayerState,
    priv: LocalPlayerPrivateState,
    time: WorldTimeState,
    biomeName: string,
    onlineCount: number,
    pingMs: number,
    yaw: number,
    pointerLocked: boolean,
    touchActive = false,
    isOfflineMode = false
  ): void {
    this.lastSelf = self;
    this.lastPrivate = priv;

    // Death screen
    this.deathOverlay.classList.toggle('hidden', self.alive);

    // Click-to-resume hint (desktop only — never blocks touchscreens)
    const lockHint = document.getElementById('lock-hint');
    if (lockHint) {
      lockHint.classList.toggle(
        'hidden',
        touchActive || pointerLocked || this.activePanel !== 'none' || this.chatOpen || !self.alive
      );
    }

    // Compass heading
    const deg = (((-yaw * 180) / Math.PI) % 360 + 360) % 360;
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const cardinal = dirs[Math.round(deg / 45) % 8];
    const compassEl = document.getElementById('hud-compass');
    if (compassEl) {
      compassEl.textContent = `${cardinal} ${Math.round(deg).toString().padStart(3, '0')}° • ${biomeName}`;
    }

    // Time of Day & Weather
    const totalHours = Math.floor(time.timeOfDay * 24);
    const mins = Math.floor((time.timeOfDay * 24 - totalHours) * 60);
    const clockStr = `${totalHours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    const clockEl = document.getElementById('hud-clock');
    if (clockEl) {
      const icon = time.timeOfDay < 0.23 || time.timeOfDay > 0.78 ? '☾' : '☀';
      clockEl.textContent = `${icon} Day ${time.day} • ${clockStr} • ${time.weather.toUpperCase()}`;
    }

    const netEl = document.getElementById('hud-net');
    if (netEl) {
      netEl.textContent = isOfflineMode
        ? `Local World • Lv.${self.level}`
        : `${onlineCount} Online • ${pingMs}ms • Lv.${self.level}`;
    }

    // Vitals bars
    this.setBar('bar-hp', (self.vitals.hp / self.vitals.maxHp) * 100, `${Math.ceil(self.vitals.hp)}/${self.vitals.maxHp}`);
    this.setBar('bar-stamina', (self.vitals.stamina / self.vitals.maxStamina) * 100);
    this.setBar('bar-hunger', self.vitals.hunger);
    this.setBar('bar-thirst', self.vitals.thirst);
    this.setBar('bar-warmth', self.vitals.warmth);

    // Status pills
    const pills: string[] = [];
    if (self.status.sheltered) pills.push(`<span class="pill pill-good">⌂ Sheltered</span>`);
    if (self.status.warm) pills.push(`<span class="pill pill-warm">🔥 Warm</span>`);
    if (self.status.wellFed) pills.push(`<span class="pill pill-good">★ Well-Fed</span>`);
    if (self.status.wet) pills.push(`<span class="pill pill-wet">💧 Wet</span>`);
    if (self.status.chilled) pills.push(`<span class="pill pill-danger">❄ Chilled</span>`);
    if (self.armorRating > 0) pills.push(`<span class="pill pill-info">🛡 Armor ${self.armorRating}%</span>`);
    if (self.pvpEnabled) pills.push(`<span class="pill pill-danger">⚔ PvP Active</span>`);
    const pillEl = document.getElementById('status-pills');
    if (pillEl) pillEl.innerHTML = pills.join('');

    // Objectives checklist
    const objEl = document.getElementById('objectives-list');
    if (objEl) {
      const steps: [string, string][] = [
        ['gather_resources', 'Gather Wood & Stone [LMB]'],
        ['craft_tool', 'Craft a Tool or Weapon [C]'],
        ['build_shelter', 'Build a Campfire or Shelter [B]'],
        ['cook_food', 'Roast Meat by a Campfire [C]'],
        ['hunt_wildlife', 'Hunt Wildlife or Stalkers'],
        ['smelt_iron', 'Smelt Ingots in a Furnace'],
      ];
      objEl.innerHTML = steps
        .map(([k, label]) => {
          const done = Boolean(priv.objectives[k]);
          return `<div class="obj-item ${done ? 'done' : ''}">${done ? '✓' : '○'} ${label}</div>`;
        })
        .join('');
    }

    // Hotbar
    this.renderHotbar(priv.inventory, self.equippedSlot);
  }

  private setBar(id: string, pct: number, text?: string): void {
    const fill = document.getElementById(id);
    if (fill) fill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
    if (text) {
      const lbl = document.getElementById(`${id}-val`);
      if (lbl) lbl.textContent = text;
    }
  }

  private renderHotbar(inv: (InventorySlot | null)[], selected: number): void {
    let html = '';
    for (let i = 0; i < HOTBAR_SIZE; i++) {
      const slot = inv[i];
      const def = getItem(slot?.itemId);
      const durPct =
        slot && def?.maxDurability && slot.durability !== undefined
          ? Math.max(0, Math.min(100, (slot.durability / def.maxDurability) * 100))
          : null;
      html += `
        <button class="hb-slot ${i === selected ? 'active' : ''}" data-slot="${i}" title="${def ? this.esc(def.name) : 'Empty'}">
          <span class="hb-key">${i + 1}</span>
          ${slot ? `<div class="slot-icon">${getItemSvg(slot.itemId)}</div>` : ''}
          ${slot && slot.count > 1 ? `<span class="slot-count">${slot.count}</span>` : ''}
          ${durPct !== null ? `<div class="dur-bar"><div style="width:${durPct}%"></div></div>` : ''}
        </button>`;
    }
    if (this.hotbarEl.dataset.cache !== html) {
      this.hotbarEl.dataset.cache = html;
      this.hotbarEl.innerHTML = html;
      this.hotbarEl.querySelectorAll<HTMLButtonElement>('.hb-slot').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.actions.onSelectHotbar(Number(btn.dataset.slot));
        });
      });
    }

    const eqLabel = document.getElementById('equipped-label');
    if (eqLabel) {
      const activeDef = getItem(inv[selected]?.itemId);
      eqLabel.textContent = activeDef ? activeDef.name : 'Bare Hands';
    }
  }

  setPanel(panel: ActivePanel, chestStructure?: StructureState): void {
    this.activePanel = panel;
    this.openChestId = panel === 'chest' && chestStructure ? chestStructure.id : null;
    this.selectedInvSlot = null;

    if (panel !== 'build') {
      // Keep build ghost active ONLY if user selected a build piece via B
    }

    const mapModal = document.getElementById('map-modal')!;
    mapModal.classList.toggle('hidden', panel !== 'map');

    if (panel === 'none' || panel === 'map') {
      this.panelContainer.classList.add('hidden');
      this.panelContainer.innerHTML = '';
      return;
    }

    this.panelContainer.classList.remove('hidden');
    this.renderActivePanel(chestStructure);
  }

  refreshPanelIfOpen(chestStructure?: StructureState): void {
    if (this.activePanel === 'inventory' || this.activePanel === 'crafting' || this.activePanel === 'build' || this.activePanel === 'chest') {
      this.renderActivePanel(chestStructure);
    }
  }

  private renderActivePanel(chestStructure?: StructureState): void {
    const priv = this.lastPrivate;
    const self = this.lastSelf;
    if (!priv || !self) return;

    if (this.activePanel === 'inventory') {
      const slotsHtml = priv.inventory
        .map((s, idx) => {
          const def = getItem(s?.itemId);
          return `
            <button class="inv-slot ${this.selectedInvSlot === idx ? 'selected' : ''} ${idx < 9 ? 'hotbar-mark' : ''}" data-idx="${idx}" title="${def ? `${this.esc(def.name)}: ${this.esc(def.description)}` : 'Empty slot'}">
              ${idx < 9 ? `<span class="hb-key">${idx + 1}</span>` : ''}
              ${s ? `<div class="slot-icon">${getItemSvg(s.itemId)}</div>` : ''}
              ${s && s.count > 1 ? `<span class="slot-count">${s.count}</span>` : ''}
            </button>`;
        })
        .join('');

      const selSlot = this.selectedInvSlot !== null ? priv.inventory[this.selectedInvSlot] : null;
      const selDef = getItem(selSlot?.itemId);

      this.panelContainer.innerHTML = `
        <div class="modal-card">
          <div class="modal-header">
            <h2>Survivor Pack & Equipment</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="inv-top-row">
            <div class="armor-box">
              <span class="label-sm">Equipped Armor (${self.armorRating}% DEF)</span>
              <div class="armor-slot">${priv.armorSlot ? getItemSvg(priv.armorSlot.itemId) : '<span>None</span>'}</div>
              <div class="label-xs">${priv.armorSlot ? ITEMS[priv.armorSlot.itemId]?.name : 'Craft Leather or Iron Armor'}</div>
            </div>
            <div class="inv-detail">
              ${
                selDef
                  ? `<div class="detail-title">${this.esc(selDef.name)}</div>
                     <p class="detail-desc">${this.esc(selDef.description)}</p>
                     <div class="detail-actions">
                       ${selDef.category === 'consumable' ? `<button class="btn-primary" id="btn-use-item">Consume</button>` : ''}
                       ${selDef.category === 'armor' ? `<button class="btn-primary" id="btn-equip-armor">Equip Armor</button>` : ''}
                       <button class="btn-ghost" id="btn-drop-item">Drop Stack</button>
                     </div>`
                  : `<div class="detail-empty">Click any slot to inspect or swap items. Click another slot to move/stack.</div>`
              }
            </div>
          </div>
          <div class="inv-grid">${slotsHtml}</div>
        </div>`;

      this.panelContainer.querySelector('#btn-panel-close')?.addEventListener('click', () => {
        this.setPanel('none');
        this.actions.onResumeGame();
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.inv-slot').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.idx);
          if (this.selectedInvSlot === null) {
            this.selectedInvSlot = idx;
            this.renderActivePanel();
          } else if (this.selectedInvSlot === idx) {
            this.selectedInvSlot = null;
            this.renderActivePanel();
          } else {
            this.actions.onSwapSlots(this.selectedInvSlot, idx);
            this.selectedInvSlot = null;
          }
        });
      });
      this.panelContainer.querySelector('#btn-use-item')?.addEventListener('click', () => {
        if (this.selectedInvSlot !== null) this.actions.onConsumeSlot(this.selectedInvSlot);
      });
      this.panelContainer.querySelector('#btn-equip-armor')?.addEventListener('click', () => {
        if (this.selectedInvSlot !== null) this.actions.onEquipArmor(this.selectedInvSlot);
      });
      this.panelContainer.querySelector('#btn-drop-item')?.addEventListener('click', () => {
        if (this.selectedInvSlot !== null) {
          this.actions.onDropSlot(this.selectedInvSlot);
          this.selectedInvSlot = null;
        }
      });
    } else if (this.activePanel === 'crafting') {
      const counts = this.countInventory(priv.inventory);
      const stationReady: Record<string, boolean> = {
        hand: true,
        campfire: self.status.nearCampfire,
        workbench: self.status.nearWorkbench,
        furnace: self.status.nearFurnace,
        runic_forge: self.status.nearRunicForge,
      };

      const filtered = RECIPES.filter(
        (r) => this.craftStationFilter === 'all' || r.station === this.craftStationFilter
      );

      const recipeCards = filtered
        .map((r) => {
          const out = ITEMS[r.outputItemId];
          const hasStation = stationReady[r.station];
          const hasMats = r.ingredients.every((ing) => (counts[ing.itemId] ?? 0) >= ing.count);
          const canCraft = hasStation && hasMats;
          const ingsHtml = r.ingredients
            .map((ing) => {
              const have = counts[ing.itemId] ?? 0;
              const ok = have >= ing.count;
              return `<span class="ing-chip ${ok ? 'ok' : 'miss'}">${ITEMS[ing.itemId]?.name ?? ing.itemId} ${have}/${ing.count}</span>`;
            })
            .join('');
          return `
            <div class="recipe-row ${canCraft ? 'ready' : ''}">
              <div class="recipe-icon">${getItemSvg(r.outputItemId)}</div>
              <div class="recipe-info">
                <div class="recipe-title">${this.esc(out?.name ?? r.outputItemId)} ${r.outputCount > 1 ? `×${r.outputCount}` : ''}
                  <span class="station-tag ${hasStation ? 'active' : ''}">${r.station.replace('_', ' ')}</span>
                </div>
                <div class="recipe-ings">${ingsHtml}</div>
              </div>
              <button class="btn-craft" data-recipe="${r.id}" ${canCraft ? '' : 'disabled'}>Craft</button>
            </div>`;
        })
        .join('');

      const tabs = ['all', 'hand', 'campfire', 'workbench', 'furnace', 'runic_forge'];
      this.panelContainer.innerHTML = `
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Crafting & Cooking</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="tab-bar">
            ${tabs
              .map(
                (t) =>
                  `<button class="tab-btn ${this.craftStationFilter === t ? 'active' : ''}" data-st="${t}">${
                    t === 'all' ? 'All' : t.replace('_', ' ')
                  }${t !== 'all' && stationReady[t] ? ' ●' : ''}</button>`
              )
              .join('')}
          </div>
          <div class="recipe-list">${recipeCards}</div>
        </div>`;

      this.panelContainer.querySelector('#btn-panel-close')?.addEventListener('click', () => {
        this.setPanel('none');
        this.actions.onResumeGame();
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((b) => {
        b.addEventListener('click', () => {
          this.craftStationFilter = b.dataset.st || 'all';
          this.renderActivePanel();
        });
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.btn-craft').forEach((b) => {
        b.addEventListener('click', () => {
          if (b.dataset.recipe) this.actions.onCraft(b.dataset.recipe);
        });
      });
    } else if (this.activePanel === 'build') {
      const counts = this.countInventory(priv.inventory);
      const cards = BUILDABLE_LIST.map((kind) => {
        const def = STRUCTURES[kind];
        const hasWb = !def.requiresWorkbench || self.status.nearWorkbench;
        const hasMats = def.costs.every((c) => (counts[c.itemId] ?? 0) >= c.count);
        const costsHtml = def.costs
          .map((c) => {
            const have = counts[c.itemId] ?? 0;
            return `<span class="ing-chip ${have >= c.count ? 'ok' : 'miss'}">${ITEMS[c.itemId]?.name} ${have}/${c.count}</span>`;
          })
          .join('');
        return `
          <button class="build-card ${this.selectedBuildKind === kind ? 'active' : ''} ${hasWb && hasMats ? 'ready' : ''}" data-kind="${kind}">
            <div class="build-title">${this.esc(def.name)}</div>
            <div class="build-desc">${this.esc(def.description)}</div>
            <div class="recipe-ings">${costsHtml}</div>
            ${def.requiresWorkbench ? `<div class="wb-req ${hasWb ? 'ok' : ''}">Requires Workbench</div>` : ''}
          </button>`;
      }).join('');

      this.panelContainer.innerHTML = `
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Modular Base Building — Select Piece</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <p class="build-hint">Pick a blueprint below, then aim and <strong>Left-Click</strong> to place (snaps automatically!). Press <strong>[R]</strong> to rotate or <strong>Right-Click</strong> to exit build preview.</p>
          <div class="build-grid">${cards}</div>
        </div>`;

      this.panelContainer.querySelector('#btn-panel-close')?.addEventListener('click', () => {
        this.setPanel('none');
        this.actions.onResumeGame();
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.build-card').forEach((b) => {
        b.addEventListener('click', () => {
          const k = b.dataset.kind as StructureKind;
          this.selectedBuildKind = k;
          this.actions.onSelectBuildKind(k);
          this.setPanel('none');
          this.actions.onResumeGame();
        });
      });
    } else if (this.activePanel === 'chest' && chestStructure) {
      const chestSlots = chestStructure.chestSlots ?? [];
      const renderGrid = (slots: (InventorySlot | null)[], side: 'inventory' | 'chest') =>
        slots
          .map((s, i) => {
            const def = getItem(s?.itemId);
            return `<button class="inv-slot" data-side="${side}" data-idx="${i}" title="${def ? this.esc(def.name) : 'Empty'}">
              ${s ? `<div class="slot-icon">${getItemSvg(s.itemId)}</div>` : ''}
              ${s && s.count > 1 ? `<span class="slot-count">${s.count}</span>` : ''}
            </button>`;
          })
          .join('');

      this.panelContainer.innerHTML = `
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Shared Storage Chest (${this.esc(chestStructure.ownerName)})</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <p class="build-hint">Click any item to transfer instantly between your Backpack and this Shared Chest.</p>
          <div class="chest-split">
            <div>
              <h3>Shared Chest</h3>
              <div class="inv-grid cols-4">${renderGrid(chestSlots, 'chest')}</div>
            </div>
            <div>
              <h3>Your Backpack</h3>
              <div class="inv-grid cols-6">${renderGrid(priv.inventory, 'inventory')}</div>
            </div>
          </div>
        </div>`;

      this.panelContainer.querySelector('#btn-panel-close')?.addEventListener('click', () => {
        this.setPanel('none');
        this.actions.onResumeGame();
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.inv-slot').forEach((b) => {
        b.addEventListener('click', () => {
          const side = b.dataset.side as 'inventory' | 'chest';
          const idx = Number(b.dataset.idx);
          this.actions.onChestTransfer(chestStructure.id, side, idx);
        });
      });
    } else if (this.activePanel === 'pause') {
      this.panelContainer.innerHTML = `
        <div class="modal-card">
          <div class="modal-header">
            <h2>Wildreach Settings & Multiplayer</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="settings-stack">
            <div class="setting-row">
              <span>Graphics Quality</span>
              <div class="seg-group">
                <button class="seg-btn" data-q="low">Low</button>
                <button class="seg-btn" data-q="medium">Medium</button>
                <button class="seg-btn active" data-q="high">High</button>
              </div>
            </div>
            <div class="setting-row">
              <span>Master Audio Volume</span>
              <input type="range" id="rng-vol" min="0" max="100" value="55" />
            </div>
            <div class="setting-row">
              <span>Touch Controls (Mobile/Tablet)</span>
              <div class="seg-group">
                <button class="seg-btn touch-seg ${this.touchMode === 'auto' ? 'active' : ''}" data-tm="auto">Auto</button>
                <button class="seg-btn touch-seg ${this.touchMode === 'on' ? 'active' : ''}" data-tm="on">On</button>
                <button class="seg-btn touch-seg ${this.touchMode === 'off' ? 'active' : ''}" data-tm="off">Off</button>
              </div>
            </div>
            <div class="setting-row">
              <span>Share World Link</span>
              <button class="btn-ghost" id="btn-pause-invite">🔗 Copy Invite URL</button>
            </div>
            <div class="setting-row">
              <span>Multiplayer PvP Flag</span>
              <button class="btn-ghost" id="btn-pvp">${self.pvpEnabled ? '⚔ PvP ON (Disable)' : '🛡 Co-op Safe (Enable PvP)'}</button>
            </div>
            <div class="setting-row">
              <span>AI Co-op Camp Companion</span>
              <button class="btn-ghost" id="btn-add-bot">+ Summon [AI] Survivor</button>
            </div>
          </div>
          <div class="controls-grid">
            <div><strong>WASD / Space / Shift</strong> Move, Jump, Sprint</div>
            <div><strong>LMB / Hold LMB</strong> Gather, Fight, Draw Bow</div>
            <div><strong>E</strong> Harvest, Open Chest/Door, Drink</div>
            <div><strong>Q / Ctrl</strong> Stamina Dodge Roll</div>
            <div><strong>Tab / I</strong> Inventory & Armor</div>
            <div><strong>C</strong> Crafting & Campfire Cooking</div>
            <div><strong>B / R</strong> Build Menu / Rotate Piece</div>
            <div><strong>V / M / Enter</strong> 3rd-1st Cam / World Map / Chat</div>
            <div><strong>F1–F4</strong> Emotes (Wave, Cheer, Backup, Camp)</div>
          </div>
          <div style="margin-top:16px; display:flex; justify-content:flex-end;">
            <button class="btn-primary" id="btn-resume">Resume Survival</button>
          </div>
        </div>`;

      const close = () => {
        this.setPanel('none');
        this.actions.onResumeGame();
      };
      this.panelContainer.querySelector('#btn-panel-close')?.addEventListener('click', close);
      this.panelContainer.querySelector('#btn-resume')?.addEventListener('click', close);
      this.panelContainer.querySelector('#btn-pvp')?.addEventListener('click', () => {
        this.actions.onTogglePvp();
        close();
      });
      this.panelContainer.querySelector('#btn-add-bot')?.addEventListener('click', () => {
        this.actions.onSpawnBot();
        close();
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.seg-btn[data-q]').forEach((b) => {
        b.addEventListener('click', () => {
          this.panelContainer.querySelectorAll('.seg-btn[data-q]').forEach((x) => x.classList.remove('active'));
          b.classList.add('active');
          this.actions.onSetQuality((b.dataset.q as 'low' | 'medium' | 'high') || 'high');
        });
      });
      this.panelContainer.querySelectorAll<HTMLButtonElement>('.touch-seg').forEach((b) => {
        b.addEventListener('click', () => {
          this.panelContainer.querySelectorAll('.touch-seg').forEach((x) => x.classList.remove('active'));
          b.classList.add('active');
          const m = (b.dataset.tm as 'auto' | 'on' | 'off') || 'auto';
          this.touchMode = m;
          this.actions.onSetTouchMode(m);
        });
      });
      this.panelContainer.querySelector('#btn-pause-invite')?.addEventListener('click', () => {
        void this.copyInvite(this.activeRoomId, this.activeSeed, this.activeServerUrl || undefined);
      });
      this.panelContainer.querySelector('#rng-vol')?.addEventListener('input', (e) => {
        this.actions.onSetVolume(Number((e.target as HTMLInputElement).value) / 100);
      });
    }
  }

  private countInventory(inv: (InventorySlot | null)[]): Record<string, number> {
    const out: Record<string, number> = {};
    for (const s of inv) {
      if (s) out[s.itemId] = (out[s.itemId] ?? 0) + s.count;
    }
    return out;
  }

  private esc(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
