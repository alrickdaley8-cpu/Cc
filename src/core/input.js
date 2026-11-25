// Keyboard + mouse input with pointer lock. Systems poll state; edge-triggered "pressed" sets are cleared each frame.
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.down = new Set();
    this.pressed = new Set();
    this.released = new Set();
    this.mouseDX = 0; this.mouseDY = 0;
    this.mouseButtons = new Set();
    this.mousePressed = new Set();
    this.locked = false;
    this.enabled = true;
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Tab' || e.code === 'Space') e.preventDefault();
      if (!this.down.has(e.code)) this.pressed.add(e.code);
      this.down.add(e.code);
    });
    window.addEventListener('keyup', (e) => { this.down.delete(e.code); this.released.add(e.code); });
    window.addEventListener('blur', () => { this.down.clear(); this.mouseButtons.clear(); });
    document.addEventListener('mousemove', (e) => {
      if (!this.locked) return;
      this.mouseDX += e.movementX || 0; this.mouseDY += e.movementY || 0;
    });
    document.addEventListener('mousedown', (e) => {
      if (!this.locked) return;
      this.mouseButtons.add(e.button); this.mousePressed.add(e.button);
    });
    document.addEventListener('mouseup', (e) => this.mouseButtons.delete(e.button));
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      if (this.onLockChange) this.onLockChange(this.locked);
    });
  }
  requestLock() {
    try {
      const p = this.canvas.requestPointerLock?.({ unadjustedMovement: true });
      if (p && p.catch) p.catch(() => { try { this.canvas.requestPointerLock(); } catch { /* ignore */ } });
    } catch { try { this.canvas.requestPointerLock(); } catch { /* ignore */ } }
  }
  exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }
  isDown(code) { return this.enabled && this.down.has(code); }
  wasPressed(code) { return this.enabled && this.pressed.has(code); }
  wasReleased(code) { return this.enabled && this.released.has(code); }
  mouseDown(b) { return this.enabled && this.mouseButtons.has(b); }
  mouseWasPressed(b) { return this.enabled && this.mousePressed.has(b); }
  consumeMouse() { const d = [this.mouseDX, this.mouseDY]; this.mouseDX = 0; this.mouseDY = 0; return d; }
  endFrame() { this.pressed.clear(); this.released.clear(); this.mousePressed.clear(); }
  // Used by the automated test bot to inject inputs.
  simKey(code, isDown) { if (isDown) { if (!this.down.has(code)) this.pressed.add(code); this.down.add(code); } else { this.down.delete(code); this.released.add(code); } }
}
