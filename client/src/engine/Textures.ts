import * as THREE from 'three';

export interface ProceduralTextureSet {
  terrainDetail: THREE.CanvasTexture;
  terrainBump: THREE.CanvasTexture;
  barkDark: THREE.CanvasTexture;
  barkBirch: THREE.CanvasTexture;
  woodPlank: THREE.CanvasTexture;
  woodPlankBump: THREE.CanvasTexture;
  stoneMasonry: THREE.CanvasTexture;
  stoneMasonryBump: THREE.CanvasTexture;
  roofShingle: THREE.CanvasTexture;
  softParticle: THREE.CanvasTexture;
  leafCluster: THREE.CanvasTexture;
}

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d')!;
  return [c, ctx];
}

function finalizeTexture(
  canvas: HTMLCanvasElement,
  repeatX = 1,
  repeatY = 1,
  isColor = true
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  if (isColor) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

// Fast deterministic hash for texture pixels
function hash2(x: number, y: number, seed: number): number {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

export function createProceduralTextures(): ProceduralTextureSet {
  // 1. Terrain micro-detail & bump (adds crisp soil/grass/rock grain over vertex colors)
  const [tdC, tdCtx] = makeCanvas(256);
  const [tbC, tbCtx] = makeCanvas(256);
  const tdImg = tdCtx.createImageData(256, 256);
  const tbImg = tbCtx.createImageData(256, 256);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const n1 = hash2(x >> 2, y >> 2, 11);
      const n2 = hash2(x >> 1, y >> 1, 23);
      const n3 = hash2(x, y, 37);
      const v = n1 * 0.45 + n2 * 0.35 + n3 * 0.2;
      const shade = Math.floor(208 + (v - 0.5) * 68);
      const bump = Math.floor(v * 255);
      const idx = (y * 256 + x) * 4;
      tdImg.data[idx] = shade;
      tdImg.data[idx + 1] = shade;
      tdImg.data[idx + 2] = Math.min(255, shade - 3);
      tdImg.data[idx + 3] = 255;

      tbImg.data[idx] = bump;
      tbImg.data[idx + 1] = bump;
      tbImg.data[idx + 2] = bump;
      tbImg.data[idx + 3] = 255;
    }
  }
  tdCtx.putImageData(tdImg, 0, 0);
  tbCtx.putImageData(tbImg, 0, 0);

  // 2. Deep grooved pine/oak bark
  const [bkC, bkCtx] = makeCanvas(256);
  bkCtx.fillStyle = '#533b2a';
  bkCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 420; i++) {
    const x = hash2(i, 1, 5) * 256;
    const y = hash2(i, 2, 5) * 256;
    const w = 2 + hash2(i, 3, 5) * 6;
    const h = 24 + hash2(i, 4, 5) * 70;
    const dark = hash2(i, 5, 5) > 0.45;
    bkCtx.fillStyle = dark ? 'rgba(34, 22, 14, 0.42)' : 'rgba(116, 86, 61, 0.32)';
    bkCtx.fillRect(x, y, w, h);
    bkCtx.fillRect(x, y - 256, w, h);
  }
  // Subtle moss patches
  for (let i = 0; i < 24; i++) {
    const x = hash2(i, 7, 9) * 256;
    const y = hash2(i, 8, 9) * 256;
    bkCtx.fillStyle = 'rgba(72, 102, 54, 0.24)';
    bkCtx.beginPath();
    bkCtx.arc(x, y, 6 + hash2(i, 9, 9) * 14, 0, Math.PI * 2);
    bkCtx.fill();
  }

  // 3. Birch bark (pale cream with horizontal dark lenticels)
  const [bbC, bbCtx] = makeCanvas(256);
  bbCtx.fillStyle = '#e7dfd3';
  bbCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 160; i++) {
    const x = hash2(i, 1, 19) * 256;
    const y = hash2(i, 2, 19) * 256;
    const w = 10 + hash2(i, 3, 19) * 32;
    const h = 1.5 + hash2(i, 4, 19) * 3.5;
    bbCtx.fillStyle = hash2(i, 5, 19) > 0.3 ? 'rgba(54, 46, 42, 0.72)' : 'rgba(165, 150, 134, 0.45)';
    bbCtx.fillRect(x, y, w, h);
  }

  // 4. Timber planks (Valheim-style warm hewn cabin boards)
  const [wpC, wpCtx] = makeCanvas(256);
  const [wpbC, wpbCtx] = makeCanvas(256);
  wpCtx.fillStyle = '#8b5d38';
  wpCtx.fillRect(0, 0, 256, 256);
  wpbCtx.fillStyle = '#888888';
  wpbCtx.fillRect(0, 0, 256, 256);
  const plankCount = 6;
  const plankH = 256 / plankCount;
  for (let p = 0; p < plankCount; p++) {
    const py = p * plankH;
    const tone = (hash2(p, 1, 31) - 0.5) * 22;
    wpCtx.fillStyle = `rgb(${Math.round(138 + tone)}, ${Math.round(92 + tone * 0.7)}, ${Math.round(54 + tone * 0.5)})`;
    wpCtx.fillRect(0, py + 2, 256, plankH - 3);
    // Grain streaks
    for (let g = 0; g < 38; g++) {
      const gy = py + 3 + hash2(p, g, 41) * (plankH - 6);
      wpCtx.fillStyle = hash2(p, g, 42) > 0.5 ? 'rgba(65,38,18,0.22)' : 'rgba(195,146,96,0.16)';
      wpCtx.fillRect(0, gy, 256, 1.5);
    }
    // Seam shadow
    wpCtx.fillStyle = 'rgba(28, 16, 8, 0.78)';
    wpCtx.fillRect(0, py, 256, 2.5);
    wpbCtx.fillStyle = '#181818';
    wpbCtx.fillRect(0, py, 256, 3);
    // Vertical butt joint + iron pegs
    const jx = (hash2(p, 9, 43) * 180 + 36) % 256;
    wpCtx.fillRect(jx, py, 2, plankH);
    wpCtx.fillStyle = '#2d2d30';
    wpCtx.beginPath();
    wpCtx.arc(jx + 7, py + plankH * 0.5, 2.2, 0, Math.PI * 2);
    wpCtx.arc(jx - 7, py + plankH * 0.5, 2.2, 0, Math.PI * 2);
    wpCtx.fill();
  }

  // 5. Stone Masonry
  const [smC, smCtx] = makeCanvas(256);
  const [smbC, smbCtx] = makeCanvas(256);
  smCtx.fillStyle = '#4f555c';
  smCtx.fillRect(0, 0, 256, 256);
  smbCtx.fillStyle = '#222222';
  smbCtx.fillRect(0, 0, 256, 256);
  const rows = 6;
  const rh = 256 / rows;
  for (let r = 0; r < rows; r++) {
    const offset = (r % 2) * 32;
    let x = -offset;
    let b = 0;
    while (x < 256) {
      const bw = 46 + Math.floor(hash2(r, b, 55) * 34);
      const shade = 112 + Math.floor((hash2(r, b, 56) - 0.5) * 36);
      smCtx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 5})`;
      smCtx.fillRect(x + 2, r * rh + 2, bw - 4, rh - 4);
      smbCtx.fillStyle = `rgb(${150 + Math.floor(hash2(r, b, 57) * 70)},${150},${150})`;
      smbCtx.fillRect(x + 3, r * rh + 3, bw - 6, rh - 6);
      // Moss accent
      if (hash2(r, b, 58) > 0.72) {
        smCtx.fillStyle = 'rgba(84, 114, 62, 0.35)';
        smCtx.fillRect(x + 4, r * rh + 2, bw * 0.5, 6);
      }
      x += bw;
      b++;
    }
  }

  // 6. Roof Shingles
  const [rfC, rfCtx] = makeCanvas(256);
  rfCtx.fillStyle = '#624229';
  rfCtx.fillRect(0, 0, 256, 256);
  for (let row = 0; row < 8; row++) {
    const y = row * 32;
    const off = (row % 2) * 16;
    for (let col = -1; col < 9; col++) {
      const x = col * 32 + off;
      const v = Math.floor((hash2(row, col, 77) - 0.5) * 24);
      rfCtx.fillStyle = `rgb(${108 + v}, ${72 + Math.floor(v * 0.7)}, ${44 + Math.floor(v * 0.5)})`;
      rfCtx.fillRect(x + 1, y + 1, 30, 30);
      rfCtx.fillStyle = 'rgba(24, 14, 7, 0.55)';
      rfCtx.fillRect(x, y + 29, 32, 3);
    }
  }

  // 7. Soft Radial Glow Particle
  const [spC, spCtx] = makeCanvas(64);
  const grad = spCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
  grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.18)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  spCtx.fillStyle = grad;
  spCtx.fillRect(0, 0, 64, 64);

  // 8. Leaf cluster canopy texture
  const [lfC, lfCtx] = makeCanvas(128);
  lfCtx.fillStyle = '#3c6e37';
  lfCtx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 240; i++) {
    const lx = hash2(i, 1, 91) * 128;
    const ly = hash2(i, 2, 91) * 128;
    const lr = 4 + hash2(i, 3, 91) * 8;
    const pick = hash2(i, 4, 91);
    lfCtx.fillStyle =
      pick > 0.68
        ? 'rgba(122, 178, 76, 0.55)'
        : pick > 0.32
        ? 'rgba(62, 118, 52, 0.55)'
        : 'rgba(30, 66, 32, 0.55)';
    lfCtx.beginPath();
    lfCtx.ellipse(lx, ly, lr, lr * 0.6, hash2(i, 5, 91) * Math.PI, 0, Math.PI * 2);
    lfCtx.fill();
  }

  return {
    terrainDetail: finalizeTexture(tdC, 46, 46, true),
    terrainBump: finalizeTexture(tbC, 46, 46, false),
    barkDark: finalizeTexture(bkC, 1, 2, true),
    barkBirch: finalizeTexture(bbC, 1, 2, true),
    woodPlank: finalizeTexture(wpC, 1, 1, true),
    woodPlankBump: finalizeTexture(wpbC, 1, 1, false),
    stoneMasonry: finalizeTexture(smC, 1, 1, true),
    stoneMasonryBump: finalizeTexture(smbC, 1, 1, false),
    roofShingle: finalizeTexture(rfC, 2, 2, true),
    softParticle: finalizeTexture(spC, 1, 1, true),
    leafCluster: finalizeTexture(lfC, 2, 2, true),
  };
}
