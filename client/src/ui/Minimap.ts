import {
  HALF_WORLD,
  WORLD_SIZE,
  WorldGenerator,
  type LandmarkInfo,
  type PlayerState,
  type StructureState,
} from '@wildreach/shared';

export class MinimapRenderer {
  private baseMap: HTMLCanvasElement;
  private hudCanvas: HTMLCanvasElement;
  private fullCanvas: HTMLCanvasElement;
  private mapSize = 256;

  constructor(
    world: WorldGenerator,
    hudCanvas: HTMLCanvasElement,
    fullCanvas: HTMLCanvasElement
  ) {
    this.hudCanvas = hudCanvas;
    this.fullCanvas = fullCanvas;
    this.baseMap = document.createElement('canvas');
    this.baseMap.width = this.mapSize;
    this.baseMap.height = this.mapSize;
    this.bakeTerrainMap(world);
  }

  private bakeTerrainMap(world: WorldGenerator): void {
    const ctx = this.baseMap.getContext('2d')!;
    const img = ctx.createImageData(this.mapSize, this.mapSize);

    for (let py = 0; py < this.mapSize; py++) {
      const z = (py / (this.mapSize - 1)) * WORLD_SIZE - HALF_WORLD;
      for (let px = 0; px < this.mapSize; px++) {
        const x = (px / (this.mapSize - 1)) * WORLD_SIZE - HALF_WORLD;
        const s = world.sample(x, z);
        let r = 20, g = 60, b = 104;

        if (s.biome === 'ocean') {
          const depth = Math.min(1, Math.max(0, -s.height / 6.5));
          r = Math.round(28 - depth * 18);
          g = Math.round(122 - depth * 78);
          b = Math.round(148 - depth * 64);
        } else if (s.biome === 'beach') {
          r = 219; g = 194; b = 138;
        } else if (s.biome === 'meadow') {
          r = 96; g = 154; b = 72;
        } else if (s.biome === 'pine') {
          r = 56; g = 98; b = 60;
        } else if (s.biome === 'marsh') {
          r = 74; g = 104; b = 66;
        } else if (s.biome === 'highland') {
          r = 112; g = 116; b = 122;
        } else if (s.biome === 'volcanic') {
          r = s.height > 18 ? 228 : 74;
          g = s.height > 18 ? 236 : 64;
          b = s.height > 18 ? 244 : 84;
        }

        // Crisp elevation contour rings every 4 meters
        if (s.height > 0.2 && Math.abs((s.height % 4) - 0.15) < 0.15) {
          r = Math.max(0, r - 18);
          g = Math.max(0, g - 18);
          b = Math.max(0, b - 18);
        }

        const idx = (py * this.mapSize + px) * 4;
        img.data[idx] = r;
        img.data[idx + 1] = g;
        img.data[idx + 2] = b;
        img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  private worldToMap(x: number, z: number, size: number): [number, number] {
    const u = (x + HALF_WORLD) / WORLD_SIZE;
    const v = (z + HALF_WORLD) / WORLD_SIZE;
    return [u * size, v * size];
  }

  renderHud(
    localX: number,
    localZ: number,
    localYaw: number,
    localId: string,
    players: PlayerState[],
    structures: StructureState[],
    landmarks: LandmarkInfo[]
  ): void {
    const ctx = this.hudCanvas.getContext('2d');
    if (!ctx) return;
    const w = this.hudCanvas.width;
    const h = this.hudCanvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
    ctx.clip();

    // Zoomed local view centered on player
    const zoom = 2.05;
    const [px, pz] = this.worldToMap(localX, localZ, this.mapSize);
    ctx.drawImage(
      this.baseMap,
      w / 2 - px * zoom,
      h / 2 - pz * zoom,
      this.mapSize * zoom,
      this.mapSize * zoom
    );

    const toHud = (wx: number, wz: number): [number, number] => {
      const [mx, mz] = this.worldToMap(wx, wz, this.mapSize);
      return [w / 2 + (mx - px) * zoom, h / 2 + (mz - pz) * zoom];
    };

    // Landmarks
    for (const lm of landmarks) {
      const [lx, ly] = toHud(lm.x, lm.z);
      ctx.fillStyle = lm.kind === 'spring' ? '#38bdf8' : lm.kind === 'sanctuary' ? '#2dd4bf' : '#fbbf24';
      ctx.beginPath();
      ctx.arc(lx, ly, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Structures
    for (const s of structures) {
      const [sx, sy] = toHud(s.x, s.z);
      ctx.fillStyle = s.kind === 'campfire' ? '#fb923c' : s.kind === 'watchtower_beacon' ? '#2dd4bf' : '#e2e8f0';
      ctx.fillRect(sx - 2, sy - 2, 4, 4);
    }

    // Other players
    for (const p of players) {
      if (p.id === localId || !p.alive) continue;
      const [ox, oy] = toHud(p.x, p.z);
      ctx.fillStyle = p.isBot ? '#7dd3fc' : '#4ade80';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ox, oy, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Local player directional chevron
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-localYaw + Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(5.5, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(-5.5, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  renderFullMap(
    localX: number,
    localZ: number,
    localId: string,
    players: PlayerState[],
    structures: StructureState[],
    landmarks: LandmarkInfo[]
  ): void {
    const ctx = this.fullCanvas.getContext('2d');
    if (!ctx) return;
    const size = this.fullCanvas.width;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(this.baseMap, 0, 0, size, size);

    // Subtle nautical grid
    ctx.strokeStyle = 'rgba(255,255,255,0.09)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      const g = (i / 6) * size;
      ctx.beginPath();
      ctx.moveTo(g, 0); ctx.lineTo(g, size);
      ctx.moveTo(0, g); ctx.lineTo(size, g);
      ctx.stroke();
    }

    // Landmarks with labels
    ctx.font = '600 11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (const lm of landmarks) {
      const [lx, ly] = this.worldToMap(lm.x, lm.z, size);
      ctx.fillStyle = lm.kind === 'spring' ? '#38bdf8' : lm.kind === 'sanctuary' ? '#2dd4bf' : '#fbbf24';
      ctx.beginPath();
      ctx.arc(lx, ly, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(10,16,24,0.82)';
      const tw = ctx.measureText(lm.name).width + 10;
      ctx.fillRect(lx - tw / 2, ly + 7, tw, 16);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(lm.name, lx, ly + 19);
    }

    // Structures
    for (const s of structures) {
      const [sx, sy] = this.worldToMap(s.x, s.z, size);
      ctx.fillStyle = s.kind === 'campfire' ? '#f97316' : '#f8fafc';
      ctx.fillRect(sx - 2.5, sy - 2.5, 5, 5);
    }

    // Players
    for (const p of players) {
      if (!p.alive) continue;
      const [px, py] = this.worldToMap(p.x, p.z, size);
      const isSelf = p.id === localId;
      ctx.fillStyle = isSelf ? '#ffffff' : p.isBot ? '#7dd3fc' : '#4ade80';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, isSelf ? 6.5 : 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(p.name, px, py - 9);
    }
  }
}
