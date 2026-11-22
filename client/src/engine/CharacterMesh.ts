import * as THREE from 'three';
import type { PlayerOutfit, PlayerState } from '@wildreach/shared';

const OUTFIT_COLORS: Record<PlayerOutfit, { tunic: string; cloak: string; pants: string; hair: string }> = {
  ranger: { tunic: '#3b6b4c', cloak: '#2c4a38', pants: '#4f3f31', hair: '#4a3121' },
  nomad: { tunic: '#b56738', cloak: '#7a3f22', pants: '#453b34', hair: '#241b16' },
  warden: { tunic: '#3b5678', cloak: '#26384f', pants: '#353a42', hair: '#d4b47c' },
  alchemist: { tunic: '#5d4375', cloak: '#3b2b4d', pants: '#342f3d', hair: '#9e4736' },
  mariner: { tunic: '#2d7a78', cloak: '#1e5250', pants: '#3e4a52', hair: '#524034' },
};

export class CharacterVisual {
  readonly group = new THREE.Group();
  private bodyGroup = new THREE.Group();
  private headGroup = new THREE.Group();
  private leftArm = new THREE.Group();
  private rightArm = new THREE.Group();
  private leftLeg = new THREE.Group();
  private rightLeg = new THREE.Group();
  private heldItemAnchor = new THREE.Group();
  private armorMesh: THREE.Mesh;
  private torchLight: THREE.PointLight | null = null;
  private nameplateSprite: THREE.Sprite | null = null;
  private nameplateCanvas: HTMLCanvasElement | null = null;
  private lastLabelKey = '';
  private chatBubbleText = '';
  private chatBubbleUntil = 0;
  private currentItemId: string | null = null;
  private currentArmorId: string | null = null;
  private animClock = 0;

  constructor(outfit: PlayerOutfit, showNameplate: boolean) {
    const pal = OUTFIT_COLORS[outfit] || OUTFIT_COLORS.ranger;

    const skinMat = new THREE.MeshStandardMaterial({ color: '#e5b893', roughness: 0.78 });
    const tunicMat = new THREE.MeshStandardMaterial({ color: pal.tunic, roughness: 0.84 });
    const cloakMat = new THREE.MeshStandardMaterial({ color: pal.cloak, roughness: 0.88 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pal.pants, roughness: 0.86 });
    const bootMat = new THREE.MeshStandardMaterial({ color: '#2b2019', roughness: 0.9 });
    const hairMat = new THREE.MeshStandardMaterial({ color: pal.hair, roughness: 0.85 });
    const packMat = new THREE.MeshStandardMaterial({ color: '#7d5333', roughness: 0.88 });

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.72, 0.34), tunicMat);
    torso.position.y = 1.08;
    torso.castShadow = true;
    this.bodyGroup.add(torso);

    // Shoulder mantle / scarf
    const mantle = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.4), cloakMat);
    mantle.position.y = 1.38;
    mantle.castShadow = true;
    this.bodyGroup.add(mantle);

    // Leather belt
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.61, 0.11, 0.37), bootMat);
    belt.position.y = 0.76;
    this.bodyGroup.add(belt);

    // Survival backpack + bedroll
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.24), packMat);
    pack.position.set(0, 1.12, -0.26);
    pack.castShadow = true;
    this.bodyGroup.add(pack);
    const roll = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.48, 8),
      new THREE.MeshStandardMaterial({ color: '#b85343', roughness: 0.9 })
    );
    roll.rotation.z = Math.PI / 2;
    roll.position.set(0, 1.43, -0.27);
    this.bodyGroup.add(roll);

    // Armor plate overlay (toggled when equipped)
    this.armorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.64, 0.56, 0.4),
      new THREE.MeshStandardMaterial({ color: '#8d5936', roughness: 0.55, metalness: 0.3 })
    );
    this.armorMesh.position.y = 1.12;
    this.armorMesh.visible = false;
    this.bodyGroup.add(this.armorMesh);

    // Head
    this.headGroup.position.set(0, 1.48, 0);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.42, 0.4), skinMat);
    head.position.y = 0.22;
    head.castShadow = true;
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.22, 0.43), hairMat);
    hair.position.set(0, 0.36, -0.02);
    const eyeMat = new THREE.MeshBasicMaterial({ color: '#1b1d24' });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), eyeMat);
    eyeL.position.set(-0.09, 0.23, 0.2);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.09;
    this.headGroup.add(head, hair, eyeL, eyeR);
    this.bodyGroup.add(this.headGroup);

    // Arms
    this.leftArm.position.set(-0.39, 1.36, 0);
    const armGeo = new THREE.BoxGeometry(0.18, 0.58, 0.18);
    const lArmMesh = new THREE.Mesh(armGeo, tunicMat);
    lArmMesh.position.y = -0.24;
    lArmMesh.castShadow = true;
    const lHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.14, 0.15), skinMat);
    lHand.position.y = -0.56;
    this.leftArm.add(lArmMesh, lHand);

    this.rightArm.position.set(0.39, 1.36, 0);
    const rArmMesh = new THREE.Mesh(armGeo, tunicMat);
    rArmMesh.position.y = -0.24;
    rArmMesh.castShadow = true;
    const rHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.14, 0.15), skinMat);
    rHand.position.y = -0.56;
    this.heldItemAnchor.position.set(0, -0.56, 0.08);
    this.rightArm.add(rArmMesh, rHand, this.heldItemAnchor);
    this.bodyGroup.add(this.leftArm, this.rightArm);

    // Legs
    this.leftLeg.position.set(-0.16, 0.72, 0);
    const legGeo = new THREE.BoxGeometry(0.21, 0.52, 0.22);
    const lLegMesh = new THREE.Mesh(legGeo, pantsMat);
    lLegMesh.position.y = -0.26;
    lLegMesh.castShadow = true;
    const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.28), bootMat);
    lBoot.position.set(0, -0.6, 0.03);
    this.leftLeg.add(lLegMesh, lBoot);

    this.rightLeg.position.set(0.16, 0.72, 0);
    const rLegMesh = new THREE.Mesh(legGeo, pantsMat);
    rLegMesh.position.y = -0.26;
    rLegMesh.castShadow = true;
    const rBoot = lBoot.clone();
    this.rightLeg.add(rLegMesh, rBoot);
    this.bodyGroup.add(this.leftLeg, this.rightLeg);

    this.group.add(this.bodyGroup);

    if (showNameplate) {
      this.nameplateCanvas = document.createElement('canvas');
      this.nameplateCanvas.width = 256;
      this.nameplateCanvas.height = 64;
      const tex = new THREE.CanvasTexture(this.nameplateCanvas);
      const spMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
      this.nameplateSprite = new THREE.Sprite(spMat);
      this.nameplateSprite.position.set(0, 2.35, 0);
      this.nameplateSprite.scale.set(2.1, 0.52, 1);
      this.group.add(this.nameplateSprite);
    }
  }

  setHeldItem(itemId: string | null): void {
    if (this.currentItemId === itemId) return;
    this.currentItemId = itemId;
    while (this.heldItemAnchor.children.length > 0) {
      this.heldItemAnchor.remove(this.heldItemAnchor.children[0]);
    }
    this.torchLight = null;
    if (!itemId) return;

    const woodMat = new THREE.MeshStandardMaterial({ color: '#7d5230', roughness: 0.85 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: '#8f98a3', roughness: 0.75 });
    const ironMat = new THREE.MeshStandardMaterial({ color: '#cbd6e2', metalness: 0.78, roughness: 0.28 });

    if (itemId === 'torch') {
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.65, 6), woodMat);
      stick.rotation.x = Math.PI * 0.42;
      stick.position.set(0, 0.05, 0.24);
      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.11, 0.28, 6),
        new THREE.MeshBasicMaterial({ color: '#ffae38' })
      );
      flame.position.set(0, 0.24, 0.54);
      const light = new THREE.PointLight('#ff9436', 4.6, 15, 1.6);
      light.position.set(0, 0.35, 0.58);
      this.torchLight = light;
      this.heldItemAnchor.add(stick, flame, light);
    } else if (itemId === 'stone_axe' || itemId === 'iron_axe') {
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.82, 6), woodMat);
      handle.rotation.x = Math.PI * 0.46;
      handle.position.set(0, 0.05, 0.32);
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.28, 0.24),
        itemId === 'iron_axe' ? ironMat : stoneMat
      );
      head.position.set(0, 0.14, 0.68);
      this.heldItemAnchor.add(handle, head);
    } else if (itemId === 'stone_pickaxe' || itemId === 'iron_pickaxe') {
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.85, 6), woodMat);
      handle.rotation.x = Math.PI * 0.46;
      handle.position.set(0, 0.04, 0.34);
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.54, 0.1),
        itemId === 'iron_pickaxe' ? ironMat : stoneMat
      );
      head.position.set(0, 0.08, 0.72);
      this.heldItemAnchor.add(handle, head);
    } else if (itemId === 'wood_spear') {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 1.75, 6), woodMat);
      shaft.rotation.x = Math.PI * 0.48;
      shaft.position.set(0, 0.04, 0.55);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 5), stoneMat);
      tip.rotation.x = Math.PI * 0.48;
      tip.position.set(0, 0.08, 1.48);
      this.heldItemAnchor.add(shaft, tip);
    } else if (itemId === 'iron_sword' || itemId === 'shadow_blade') {
      const isShadow = itemId === 'shadow_blade';
      const bladeMat = isShadow
        ? new THREE.MeshStandardMaterial({
            color: '#4c2673',
            emissive: '#9333ea',
            emissiveIntensity: 0.9,
            metalness: 0.6,
            roughness: 0.2,
          })
        : ironMat;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, isShadow ? 1.15 : 0.95), bladeMat);
      blade.position.set(0, 0.04, 0.62);
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 0.07), ironMat);
      guard.position.set(0, 0.04, 0.14);
      this.heldItemAnchor.add(blade, guard);
    } else if (itemId === 'hunting_bow' || itemId === 'starlight_bow') {
      const bowMat =
        itemId === 'starlight_bow'
          ? new THREE.MeshStandardMaterial({
              color: '#38f2dc',
              emissive: '#14b8a6',
              emissiveIntensity: 0.85,
            })
          : woodMat;
      const arc = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.032, 6, 14, Math.PI), bowMat);
      arc.rotation.y = Math.PI / 2;
      arc.rotation.z = -Math.PI / 2;
      arc.position.set(0, 0.06, 0.22);
      this.heldItemAnchor.add(arc);
    } else if (itemId === 'build_hammer') {
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.62, 6), woodMat);
      handle.rotation.x = Math.PI * 0.45;
      handle.position.set(0, 0.04, 0.25);
      const mallet = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.3), stoneMat);
      mallet.position.set(0, 0.1, 0.56);
      this.heldItemAnchor.add(handle, mallet);
    } else if (itemId === 'fishing_rod') {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.032, 2.25, 6), woodMat);
      pole.rotation.x = Math.PI * 0.36;
      pole.position.set(0, 0.42, 0.85);
      this.heldItemAnchor.add(pole);
    } else if (itemId === 'spyglass') {
      const brass = new THREE.MeshStandardMaterial({ color: '#d97706', metalness: 0.78, roughness: 0.25 });
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.042, 0.46, 8), brass);
      tube.rotation.x = Math.PI * 0.48;
      tube.position.set(0, 0.08, 0.24);
      this.heldItemAnchor.add(tube);
    } else if (itemId === 'harpoon_spear' || itemId === 'volcanic_greataxe') {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.038, 1.85, 6), woodMat);
      shaft.rotation.x = Math.PI * 0.48;
      shaft.position.set(0, 0.04, 0.58);
      const tipMat =
        itemId === 'volcanic_greataxe'
          ? new THREE.MeshStandardMaterial({ color: '#f97316', emissive: '#ea580c', emissiveIntensity: 0.75 })
          : ironMat;
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 5), tipMat);
      head.rotation.x = Math.PI * 0.48;
      head.position.set(0, 0.08, 1.56);
      this.heldItemAnchor.add(shaft, head);
    }
  }

  setArmor(armorId: string | null): void {
    if (this.currentArmorId === armorId) return;
    this.currentArmorId = armorId;
    if (!armorId) {
      this.armorMesh.visible = false;
      return;
    }
    this.armorMesh.visible = true;
    const mat = this.armorMesh.material as THREE.MeshStandardMaterial;
    if (armorId === 'leather_armor') {
      mat.color.set('#8d5936');
      mat.metalness = 0.08;
      mat.emissive.set('#000000');
    } else if (armorId === 'iron_armor') {
      mat.color.set('#9eadbd');
      mat.metalness = 0.72;
      mat.emissive.set('#000000');
    } else {
      mat.color.set('#2b2140');
      mat.metalness = 0.5;
      mat.emissive.set('#22d3ee');
      mat.emissiveIntensity = 0.4;
    }
  }

  setChatBubble(text: string): void {
    this.chatBubbleText = text.slice(0, 34);
    this.chatBubbleUntil = Date.now() + 5200;
    this.lastLabelKey = '';
  }

  updateNameplate(state: PlayerState): void {
    if (!this.nameplateCanvas || !this.nameplateSprite) return;
    const now = Date.now();
    const bubble = now < this.chatBubbleUntil ? this.chatBubbleText : '';
    const hpPct = Math.round((state.vitals.hp / Math.max(1, state.vitals.maxHp)) * 100);
    const key = `${state.name}|${state.level}|${hpPct}|${state.pvpEnabled}|${state.downed}|${state.isHost}|${state.emote ?? ''}|${bubble}`;
    if (key === this.lastLabelKey) return;
    this.lastLabelKey = key;

    if (this.nameplateCanvas.height !== 108) {
      this.nameplateCanvas.width = 320;
      this.nameplateCanvas.height = 108;
      this.nameplateSprite.scale.set(2.4, 0.82, 1);
      this.nameplateSprite.position.y = 2.48;
    }

    const ctx = this.nameplateCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, 320, 108);

    // Optional overhead speech bubble!
    if (bubble) {
      ctx.fillStyle = 'rgba(248, 250, 252, 0.94)';
      ctx.beginPath();
      ctx.roundRect(14, 4, 292, 34, 14);
      ctx.fill();
      ctx.font = '600 16px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(`“${bubble}”`, 160, 27);
    }

    // Subtle dark pill background
    ctx.fillStyle = state.downed ? 'rgba(127, 29, 29, 0.88)' : 'rgba(12, 18, 28, 0.78)';
    ctx.beginPath();
    ctx.roundRect(24, 44, 272, 56, 14);
    ctx.fill();

    // Name + Host crown / level / emote
    ctx.font = 'bold 20px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = state.downed
      ? '#fecaca'
      : state.isBot
      ? '#7dd3fc'
      : state.pvpEnabled
      ? '#fca5a5'
      : '#f8fafc';
    const crown = state.isHost && !state.isBot ? '👑 ' : '';
    const emoteIcon =
      state.emote === 'wave'
        ? ' 👋'
        : state.emote === 'cheer'
        ? ' 🔥'
        : state.emote === 'help'
        ? ' ⚠️'
        : state.emote === 'camp'
        ? ' ⛺'
        : '';
    const title = state.downed
      ? `⚠ ${state.name} — [E] REVIVE!`
      : `${crown}${state.name} Lv.${state.level}${emoteIcon}`;
    ctx.fillText(title, 160, 72);

    // Health bar
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(54, 83, 212, 8);
    ctx.fillStyle = state.downed ? '#f87171' : hpPct > 45 ? '#4ade80' : '#fb923c';
    ctx.fillRect(54, 83, (212 * hpPct) / 100, 8);

    const tex = (this.nameplateSprite.material as THREE.SpriteMaterial).map!;
    tex.needsUpdate = true;
  }

  animate(dt: number, state: PlayerState, elapsed: number): void {
    this.setHeldItem(state.equippedItemId);
    this.setArmor(state.armorItemId);
    this.updateNameplate(state);

    if (this.torchLight) {
      this.torchLight.intensity = 4.4 + Math.sin(elapsed * 18) * 0.75;
    }

    if (!state.alive || state.anim === 'dead') {
      this.bodyGroup.rotation.x = Math.PI / 2;
      this.bodyGroup.position.y = 0.25;
      return;
    }

    this.bodyGroup.rotation.x = 0;
    this.bodyGroup.position.y = 0;

    const speed = Math.hypot(state.vx, state.vz);
    const moving = state.anim === 'walk' || state.anim === 'run' || speed > 0.4;
    const freq = state.anim === 'run' ? 11.5 : 7.5;
    this.animClock += dt * (moving ? freq : 2.2);

    if (state.anim === 'swim') {
      this.bodyGroup.rotation.x = 0.65;
      this.bodyGroup.position.y = -0.3;
      const stroke = Math.sin(elapsed * 6.5);
      this.leftArm.rotation.x = -1.3 + stroke * 0.8;
      this.rightArm.rotation.x = -1.3 - stroke * 0.8;
      this.leftLeg.rotation.x = stroke * 0.45;
      this.rightLeg.rotation.x = -stroke * 0.45;
    } else if (state.anim === 'dodge') {
      this.bodyGroup.rotation.x = (elapsed * 14) % (Math.PI * 2);
    } else if (moving) {
      const amp = state.anim === 'run' ? 0.75 : 0.48;
      const s = Math.sin(this.animClock);
      this.leftLeg.rotation.x = s * amp;
      this.rightLeg.rotation.x = -s * amp;
      this.leftArm.rotation.x = -s * amp * 0.85;
      this.rightArm.rotation.x = s * amp * 0.85;
      this.bodyGroup.position.y = Math.abs(Math.cos(this.animClock)) * 0.06;
    } else {
      // Gentle idle breathing
      const breathe = Math.sin(elapsed * 2.2) * 0.03;
      this.leftLeg.rotation.x *= 0.82;
      this.rightLeg.rotation.x *= 0.82;
      this.leftArm.rotation.x = breathe;
      this.rightArm.rotation.x = -breathe;
      this.bodyGroup.position.y = breathe * 0.5;
    }

    // Hold torch up nicely
    if (state.equippedItemId === 'torch') {
      this.rightArm.rotation.x = -0.78;
    }

    // Active tool/weapon swing arc
    if (state.swingTime > 0) {
      const p = 1 - state.swingTime / 0.38;
      this.rightArm.rotation.x = -1.9 + Math.sin(p * Math.PI) * 2.15;
      this.rightArm.rotation.y = -0.3 + Math.sin(p * Math.PI) * 0.6;
    } else {
      this.rightArm.rotation.y = 0;
    }
  }
}
