export interface InputCallbacks {
  onHotbarSelect: (slot: number) => void;
  onPrimaryDown: () => void;
  onPrimaryUp: () => void;
  onSecondaryDown: () => void;
  onInteract: () => void;
  onDodge: () => void;
  onToggleCamera: () => void;
  onToggleBuild: () => void;
  onRotateBuild: () => void;
  onToggleInventory: () => void;
  onToggleCrafting: () => void;
  onToggleMap: () => void;
  onToggleChat: () => void;
  onTogglePause: () => void;
  onEmote: (emote: string) => void;
}

export class InputController {
  keys = new Set<string>();
  pointerLocked = false;
  mouseLeftDown = false;
  yaw = Math.PI;
  pitch = 0.24;
  uiOpen = false;
  chatOpen = false;
  sensitivity = 0.0022;

  private canvas: HTMLCanvasElement;
  private cb: InputCallbacks;
  private wheelDelta = 0;
  private dragLookActive = false;
  private dragLastX = 0;
  private dragLastY = 0;

  constructor(canvas: HTMLCanvasElement, cb: InputCallbacks) {
    this.canvas = canvas;
    this.cb = cb;

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('wheel', this.onWheel, { passive: true });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
      if (!this.pointerLocked) {
        this.mouseLeftDown = false;
      }
    });
  }

  requestPointerLock(): void {
    if (!this.uiOpen && !this.chatOpen && document.pointerLockElement !== this.canvas) {
      try {
        this.canvas.requestPointerLock();
      } catch {
        // Ignore browser rejection if not triggered by direct gesture
      }
    }
  }

  exitPointerLock(): void {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }

  consumeWheel(): number {
    const d = this.wheelDelta;
    this.wheelDelta = 0;
    return d;
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    // Allow typing freely in inputs
    const activeTag = document.activeElement?.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement).blur();
      }
      return;
    }

    const code = e.code;
    this.keys.add(code);

    if (code === 'Enter') {
      e.preventDefault();
      this.cb.onToggleChat();
      return;
    }

    if (code === 'Escape') {
      this.cb.onTogglePause();
      return;
    }

    if (code === 'Tab' || code === 'KeyI') {
      e.preventDefault();
      this.cb.onToggleInventory();
      return;
    }

    if (code === 'KeyC') {
      this.cb.onToggleCrafting();
      return;
    }

    if (code === 'KeyB') {
      this.cb.onToggleBuild();
      return;
    }

    if (code === 'KeyM') {
      this.cb.onToggleMap();
      return;
    }

    if (this.uiOpen || this.chatOpen) return;

    if (code.startsWith('Digit')) {
      const idx = Number(code.slice(5)) - 1;
      if (idx >= 0 && idx <= 8) this.cb.onHotbarSelect(idx);
    } else if (code === 'KeyE') {
      this.cb.onInteract();
    } else if (code === 'KeyV') {
      this.cb.onToggleCamera();
    } else if (code === 'KeyR') {
      this.cb.onRotateBuild();
    } else if (code === 'KeyQ' || code === 'ControlLeft') {
      this.cb.onDodge();
    } else if (code === 'F1') {
      e.preventDefault();
      this.cb.onEmote('wave');
    } else if (code === 'F2') {
      e.preventDefault();
      this.cb.onEmote('cheer');
    } else if (code === 'F3') {
      e.preventDefault();
      this.cb.onEmote('help');
    } else if (code === 'F4') {
      e.preventDefault();
      this.cb.onEmote('camp');
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (this.uiOpen || this.chatOpen) return;
    if (this.pointerLocked) {
      this.yaw -= e.movementX * this.sensitivity;
      this.pitch = Math.max(-0.95, Math.min(1.22, this.pitch + e.movementY * this.sensitivity));
    } else if (this.dragLookActive) {
      const dx = e.clientX - this.dragLastX;
      const dy = e.clientY - this.dragLastY;
      this.dragLastX = e.clientX;
      this.dragLastY = e.clientY;
      this.yaw -= dx * this.sensitivity * 1.45;
      this.pitch = Math.max(-0.95, Math.min(1.22, this.pitch + dy * this.sensitivity * 1.45));
    }
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (this.uiOpen || this.chatOpen) return;
    // Right-drag fallback lets desktop users orbit camera even in iframes without Pointer Lock
    if (!this.pointerLocked && e.button === 2) {
      this.dragLookActive = true;
      this.dragLastX = e.clientX;
      this.dragLastY = e.clientY;
      return;
    }
    if (!this.pointerLocked) {
      this.requestPointerLock();
      return;
    }
    if (e.button === 0) {
      this.mouseLeftDown = true;
      this.cb.onPrimaryDown();
    } else if (e.button === 2) {
      this.cb.onSecondaryDown();
    }
  };

  private onMouseUp = (e: MouseEvent): void => {
    if (e.button === 2) this.dragLookActive = false;
    if (e.button === 0 && this.mouseLeftDown) {
      this.mouseLeftDown = false;
      this.cb.onPrimaryUp();
    }
  };

  private onWheel = (e: WheelEvent): void => {
    if (this.uiOpen || this.chatOpen) return;
    this.wheelDelta += Math.sign(e.deltaY);
  };
}
