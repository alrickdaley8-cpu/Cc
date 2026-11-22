export interface TouchActionCallbacks {
  onPrimaryDown: () => void;
  onPrimaryUp: () => void;
  onInteract: () => void;
  onDodge: () => void;
  onRotateBuild: () => void;
  onCancelBuild: () => void;
  onOpenInventory: () => void;
  onOpenCrafting: () => void;
  onOpenBuild: () => void;
  onOpenMap: () => void;
  onToggleCamera: () => void;
  onToggleChat: () => void;
  onOpenPause: () => void;
}

export class TouchControls {
  moveX = 0; // -1..1 (right positive)
  moveY = 0; // -1..1 (forward positive)
  sprinting = false;
  jumping = false;
  enabled = false;
  mode: 'auto' | 'on' | 'off' = 'auto';

  private rootEl: HTMLElement;
  private joyZone: HTMLElement;
  private joyBase: HTMLElement;
  private joyKnob: HTMLElement;
  private interactBtn: HTMLButtonElement;
  private buildControlsEl: HTMLElement;
  private joyPointerId: number | null = null;
  private joyOriginX = 0;
  private joyOriginY = 0;
  private readonly joyRadius = 48;

  private lookPointerId: number | null = null;
  private lookLastX = 0;
  private lookLastY = 0;
  private lookDeltaX = 0;
  private lookDeltaY = 0;

  constructor(canvas: HTMLCanvasElement, cb: TouchActionCallbacks) {
    this.rootEl = document.getElementById('touch-controls')!;
    this.joyZone = document.getElementById('touch-joy-zone')!;
    this.joyBase = document.getElementById('touch-joy-base')!;
    this.joyKnob = document.getElementById('touch-joy-knob')!;
    this.interactBtn = document.getElementById('tbtn-interact') as HTMLButtonElement;
    this.buildControlsEl = document.getElementById('touch-build-actions')!;

    this.detectAndApplyMode();
    window.addEventListener('resize', () => this.detectAndApplyMode());

    // Left virtual analog joystick (Pointer Events handle touch & pen cleanly)
    this.joyZone.addEventListener('pointerdown', (e) => {
      if (this.joyPointerId !== null) return;
      e.preventDefault();
      this.joyPointerId = e.pointerId;
      this.joyZone.setPointerCapture(e.pointerId);
      const rect = this.joyBase.getBoundingClientRect();
      this.joyOriginX = rect.left + rect.width / 2;
      this.joyOriginY = rect.top + rect.height / 2;
      this.updateJoystick(e.clientX, e.clientY);
    });

    this.joyZone.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this.joyPointerId) return;
      e.preventDefault();
      this.updateJoystick(e.clientX, e.clientY);
    });

    const releaseJoy = (e: PointerEvent) => {
      if (e.pointerId !== this.joyPointerId) return;
      this.joyPointerId = null;
      this.moveX = 0;
      this.moveY = 0;
      this.sprinting = false;
      this.joyKnob.style.transform = 'translate(0px, 0px)';
      this.joyBase.classList.remove('sprinting');
    };
    this.joyZone.addEventListener('pointerup', releaseJoy);
    this.joyZone.addEventListener('pointercancel', releaseJoy);

    // Canvas touch-drag camera look (ignores joystick & UI touches because they don't hit canvas)
    canvas.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return; // Mouse uses pointer lock or right-drag in InputController
      if (this.lookPointerId !== null) return;
      this.lookPointerId = e.pointerId;
      this.lookLastX = e.clientX;
      this.lookLastY = e.clientY;
    });

    canvas.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this.lookPointerId) return;
      const dx = e.clientX - this.lookLastX;
      const dy = e.clientY - this.lookLastY;
      this.lookLastX = e.clientX;
      this.lookLastY = e.clientY;
      // Guard against huge jump glitches
      if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
        this.lookDeltaX += dx;
        this.lookDeltaY += dy;
      }
    });

    const releaseLook = (e: PointerEvent) => {
      if (e.pointerId === this.lookPointerId) this.lookPointerId = null;
    };
    canvas.addEventListener('pointerup', releaseLook);
    canvas.addEventListener('pointercancel', releaseLook);

    // Right-hand tactile action buttons
    const actBtn = document.getElementById('tbtn-action')!;
    actBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      actBtn.classList.add('pressed');
      cb.onPrimaryDown();
    });
    const releaseAct = () => {
      if (actBtn.classList.contains('pressed')) {
        actBtn.classList.remove('pressed');
        cb.onPrimaryUp();
      }
    };
    actBtn.addEventListener('pointerup', releaseAct);
    actBtn.addEventListener('pointercancel', releaseAct);

    this.interactBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cb.onInteract();
    });

    const jumpBtn = document.getElementById('tbtn-jump')!;
    jumpBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.jumping = true;
      jumpBtn.classList.add('pressed');
    });
    const releaseJump = () => {
      this.jumping = false;
      jumpBtn.classList.remove('pressed');
    };
    jumpBtn.addEventListener('pointerup', releaseJump);
    jumpBtn.addEventListener('pointercancel', releaseJump);

    document.getElementById('tbtn-dodge')?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cb.onDodge();
    });
    document.getElementById('tbtn-rotate')?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cb.onRotateBuild();
    });
    document.getElementById('tbtn-cancel-build')?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cb.onCancelBuild();
    });

    // Quick touch menu pills (works on both mobile & tablet without keyboard!)
    document.getElementById('qbtn-pack')?.addEventListener('click', cb.onOpenInventory);
    document.getElementById('qbtn-craft')?.addEventListener('click', cb.onOpenCrafting);
    document.getElementById('qbtn-build')?.addEventListener('click', cb.onOpenBuild);
    document.getElementById('qbtn-cam')?.addEventListener('click', cb.onToggleCamera);
    document.getElementById('qbtn-map')?.addEventListener('click', cb.onOpenMap);
    document.getElementById('qbtn-chat')?.addEventListener('click', cb.onToggleChat);
    document.getElementById('qbtn-menu')?.addEventListener('click', cb.onOpenPause);
  }

  static isTouchDevice(): boolean {
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }

  setMode(mode: 'auto' | 'on' | 'off'): void {
    this.mode = mode;
    this.detectAndApplyMode();
  }

  detectAndApplyMode(): void {
    const shouldEnable =
      this.mode === 'on' || (this.mode === 'auto' && TouchControls.isTouchDevice());
    this.enabled = shouldEnable;
    this.rootEl.classList.toggle('hidden', !shouldEnable);
  }

  setContextualState(hasInteract: boolean, inBuildMode: boolean, uiHidden: boolean): void {
    if (!this.enabled) return;
    this.rootEl.classList.toggle('hidden', !uiHidden);
    this.interactBtn.classList.toggle('highlight', hasInteract);
    this.buildControlsEl.classList.toggle('hidden', !inBuildMode);
  }

  consumeLookDelta(): { dx: number; dy: number } {
    const dx = this.lookDeltaX;
    const dy = this.lookDeltaY;
    this.lookDeltaX = 0;
    this.lookDeltaY = 0;
    return { dx, dy };
  }

  private updateJoystick(clientX: number, clientY: number): void {
    let dx = clientX - this.joyOriginX;
    let dy = clientY - this.joyOriginY;
    const dist = Math.hypot(dx, dy);
    if (dist > this.joyRadius) {
      dx = (dx / dist) * this.joyRadius;
      dy = (dy / dist) * this.joyRadius;
    }
    this.joyKnob.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    this.moveX = dx / this.joyRadius;
    this.moveY = -dy / this.joyRadius; // up is forward (+1)
    this.sprinting = dist >= this.joyRadius * 0.82;
    this.joyBase.classList.toggle('sprinting', this.sprinting);
  }
}
