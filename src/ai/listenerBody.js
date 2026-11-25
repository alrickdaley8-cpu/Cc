// The Listener's body: a tall, stooped figure in a long tattered mourning coat whose head is the
// brass horn of a gramophone. Built from primitives; animated procedurally.
import * as THREE from 'three';
import { getMat } from '../world/materials.js';
import * as T from '../world/textures.js';
import { damp } from '../core/rng.js';
import { compact } from '../world/props.js';

export function buildListenerBody() {
  const root = new THREE.Group(); root.name = 'listener';
  const skin = new THREE.MeshStandardMaterial({ color: 0x6f6a60, roughness: 0.75, metalness: 0 });
  const coatTex = T.fabric('#141214', 909);
  const coat = new THREE.MeshStandardMaterial({ map: coatTex, color: 0x9a9090, roughness: 1, side: THREE.DoubleSide });
  const brass = getMat('p_brass');
  const inner = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });

  const hips = new THREE.Group(); hips.position.y = 1.05; root.add(hips);
  const torso = new THREE.Group(); hips.add(torso);

  // coat: lathe profile with noisy, ragged hem
  const prof = [];
  const pts = [[0.05, 1.05], [0.2, 1.0], [0.24, 0.85], [0.22, 0.6], [0.24, 0.3], [0.3, 0.0], [0.36, -0.35], [0.42, -0.7], [0.46, -0.85]];
  for (const [r, y] of pts) prof.push(new THREE.Vector2(r, y));
  const cg = new THREE.LatheGeometry(prof, 18);
  const pos = cg.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i), x = pos.getX(i), z = pos.getZ(i);
    const a = Math.atan2(z, x);
    const n = Math.sin(a * 5 + y * 3) * 0.02 + Math.sin(a * 11) * 0.012;
    const s = 1 + n * 2;
    pos.setX(i, x * s); pos.setZ(i, z * s * 0.8);
    if (y < -0.8) pos.setY(i, y - Math.abs(Math.sin(a * 7.3)) * 0.22 - Math.abs(Math.sin(a * 3.1)) * 0.1);
  }
  cg.computeVertexNormals();
  const coatMesh = new THREE.Mesh(cg, coat); torso.add(coatMesh);

  // neck + horn head
  const neck = new THREE.Group(); neck.position.set(0, 1.0, 0.05); torso.add(neck);
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.42, 6), skin); neckMesh.position.y = 0.18; neckMesh.rotation.x = 0.35; neck.add(neckMesh);
  const head = new THREE.Group(); head.position.set(0, 0.36, 0.1); neck.add(head);
  const hornProf = [[0.035, -0.05], [0.04, 0.1], [0.055, 0.22], [0.09, 0.34], [0.16, 0.44], [0.27, 0.51], [0.33, 0.53]].map(([r, y]) => new THREE.Vector2(r, y));
  const hornGeo = new THREE.LatheGeometry(hornProf, 22);
  // dents
  const hp = hornGeo.attributes.position;
  for (let i = 0; i < hp.count; i++) { const y = hp.getY(i); if (y > 0.3) { const a = Math.atan2(hp.getZ(i), hp.getX(i)); const d = 1 + Math.sin(a * 3 + 1) * 0.04 + Math.sin(a * 7) * 0.02; hp.setX(i, hp.getX(i) * d); hp.setZ(i, hp.getZ(i) * d); } }
  hornGeo.computeVertexNormals();
  const horn = new THREE.Mesh(hornGeo, brass);
  horn.rotation.x = Math.PI / 2; // mouth faces +z
  head.add(horn);
  const hornIn = new THREE.Mesh(hornGeo, inner); hornIn.scale.set(0.97, 1, 0.97); hornIn.rotation.x = Math.PI / 2; head.add(hornIn);
  // something wet glints deep inside
  const glint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), new THREE.MeshStandardMaterial({ color: 0x100404, roughness: 0.05, metalness: 0.3, emissive: 0x2a0503, emissiveIntensity: 0.6 }));
  glint.position.set(0, 0, 0.08); head.add(glint);
  // brass collar where neck meets horn
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.014, 6, 12), brass); collar.position.z = -0.04; head.add(collar);

  // arms
  const arms = [];
  for (const s of [-1, 1]) {
    const sh = new THREE.Group(); sh.position.set(s * 0.22, 0.92, 0.02); torso.add(sh);
    const up = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.6, 6), skin); up.position.y = -0.3; sh.add(up);
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.5, 8, 1, true), coat); sleeve.position.y = -0.24; sh.add(sleeve);
    const el = new THREE.Group(); el.position.y = -0.6; sh.add(el);
    const lo = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.018, 0.66, 6), skin); lo.position.y = -0.33; el.add(lo);
    const hand = new THREE.Group(); hand.position.y = -0.66; el.add(hand);
    for (let i = 0; i < 4; i++) {
      const fg = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.004, 0.22, 4), skin);
      fg.position.set((i - 1.5) * 0.018, -0.1, 0.01); fg.rotation.set(0.15, 0, (i - 1.5) * 0.08); hand.add(fg);
    }
    arms.push({ sh, el, hand, s });
  }
  // legs (visible below the coat)
  const legs = [];
  for (const s of [-1, 1]) {
    const th = new THREE.Group(); th.position.set(s * 0.1, 0, 0); hips.add(th);
    const tm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.55, 6), skin); tm.position.y = -0.27; th.add(tm);
    const kn = new THREE.Group(); kn.position.y = -0.55; th.add(kn);
    const sm = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.02, 0.5, 6), skin); sm.position.y = -0.25; kn.add(sm);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.24), skin); foot.position.set(0, -0.5, 0.07); kn.add(foot);
    legs.push({ th, kn, s });
  }
  compact(root);
  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  const rig = { root, hips, torso, neck, head, arms, legs, walk: 0, lookYaw: 0, lookPitch: 0, twitch: 0, armsUp: 0, stoop: 0.28, kill: 0 };
  return rig;
}

// Procedural animation. speed in m/s; mode: 'walk' | 'listen' | 'chase' | 'search' | 'kill' | 'still'
export function animateListener(rig, dt, { speed = 0, mode = 'walk', lookYaw = 0, lookPitch = 0, time = 0 }) {
  rig.walk += speed * dt * 2.2;
  const w = rig.walk;
  const moving = Math.min(1, speed / 1.2);
  const chase = mode === 'chase' ? 1 : 0;
  rig.armsUp = damp(rig.armsUp, chase ? 1 : mode === 'kill' ? 1.4 : 0, 4, dt);
  rig.stoop = damp(rig.stoop, mode === 'listen' ? 0.45 : chase ? 0.5 : 0.28, 3, dt);
  rig.hips.position.y = 1.05 + Math.abs(Math.sin(w)) * 0.05 * moving - (mode === 'listen' ? 0.06 : 0);
  rig.torso.rotation.x = rig.stoop + Math.sin(w * 2) * 0.03 * moving;
  rig.torso.rotation.z = Math.sin(w) * 0.06 * moving;
  for (const L of rig.legs) {
    const ph = w + (L.s > 0 ? Math.PI : 0);
    L.th.rotation.x = Math.sin(ph) * 0.55 * moving;
    L.kn.rotation.x = Math.max(0, -Math.cos(ph)) * 0.9 * moving;
  }
  for (const A of rig.arms) {
    const ph = w + (A.s > 0 ? 0 : Math.PI);
    const swing = Math.sin(ph) * 0.25 * moving * (1 - rig.armsUp);
    A.sh.rotation.x = swing - rig.armsUp * 1.15;
    A.sh.rotation.z = A.s * (0.08 + rig.armsUp * 0.15);
    A.el.rotation.x = -0.15 - rig.armsUp * 0.35 + Math.sin(time * 9 + A.s) * 0.04 * rig.armsUp;
    // fingers twitch
    A.hand.rotation.x = Math.sin(time * 13 + A.s * 2) * 0.12;
  }
  // head: smooth look + nervous twitches while listening
  rig.twitch -= dt;
  if (rig.twitch < 0) { rig.twitch = 0.3 + Math.random() * (mode === 'listen' ? 0.8 : 2.5); rig.tYaw = (Math.random() - 0.5) * (mode === 'listen' ? 1.4 : 0.5); rig.tRoll = (Math.random() - 0.5) * 0.8; }
  const ty = lookYaw + (rig.tYaw || 0) * (mode === 'chase' ? 0.15 : 1);
  rig.lookYaw = damp(rig.lookYaw, ty, mode === 'listen' ? 18 : 6, dt);
  rig.lookPitch = damp(rig.lookPitch, lookPitch - rig.stoop * 0.6, 6, dt);
  rig.neck.rotation.y = rig.lookYaw;
  rig.head.rotation.x = rig.lookPitch;
  rig.head.rotation.z = damp(rig.head.rotation.z, (rig.tRoll || 0) * (mode === 'listen' ? 1 : 0.3), 10, dt);
}
