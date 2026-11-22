import {
  INVENTORY_SIZE,
  ITEMS,
  getItem,
  type InventorySlot,
} from '@wildreach/shared';

export function createEmptyInventory(size = INVENTORY_SIZE): (InventorySlot | null)[] {
  return Array.from({ length: size }, () => null);
}

export function createStarterInventory(): (InventorySlot | null)[] {
  const inv = createEmptyInventory(INVENTORY_SIZE);
  inv[0] = { itemId: 'stone_axe', count: 1, durability: ITEMS.stone_axe.maxDurability };
  inv[1] = { itemId: 'torch', count: 1, durability: ITEMS.torch.maxDurability };
  inv[2] = { itemId: 'build_hammer', count: 1, durability: ITEMS.build_hammer.maxDurability };
  inv[3] = { itemId: 'berries', count: 6 };
  inv[4] = { itemId: 'bandage', count: 2 };
  return inv;
}

export function countItem(slots: (InventorySlot | null)[], itemId: string): number {
  let total = 0;
  for (const s of slots) {
    if (s && s.itemId === itemId) total += s.count;
  }
  return total;
}

export function hasIngredients(
  slots: (InventorySlot | null)[],
  ingredients: { itemId: string; count: number }[]
): boolean {
  for (const ing of ingredients) {
    if (countItem(slots, ing.itemId) < ing.count) return false;
  }
  return true;
}

export function consumeIngredients(
  slots: (InventorySlot | null)[],
  ingredients: { itemId: string; count: number }[]
): boolean {
  if (!hasIngredients(slots, ingredients)) return false;
  for (const ing of ingredients) {
    let remaining = ing.count;
    for (let i = 0; i < slots.length && remaining > 0; i++) {
      const s = slots[i];
      if (!s || s.itemId !== ing.itemId) continue;
      const take = Math.min(s.count, remaining);
      s.count -= take;
      remaining -= take;
      if (s.count <= 0) slots[i] = null;
    }
  }
  return true;
}

export function addItemToSlots(
  slots: (InventorySlot | null)[],
  itemId: string,
  count: number,
  durability?: number
): number {
  const def = getItem(itemId);
  if (!def || count <= 0) return count;
  let remaining = count;

  // Stack onto existing slots first
  if (def.maxStack > 1) {
    for (let i = 0; i < slots.length && remaining > 0; i++) {
      const s = slots[i];
      if (s && s.itemId === itemId && s.count < def.maxStack) {
        const add = Math.min(def.maxStack - s.count, remaining);
        s.count += add;
        remaining -= add;
      }
    }
  }

  // Place into empty slots
  for (let i = 0; i < slots.length && remaining > 0; i++) {
    if (slots[i] === null) {
      const add = Math.min(def.maxStack, remaining);
      slots[i] = {
        itemId,
        count: add,
        durability: durability ?? def.maxDurability,
      };
      remaining -= add;
    }
  }

  return remaining; // leftover count that didn't fit
}

export function swapSlots(slots: (InventorySlot | null)[], from: number, to: number): boolean {
  if (from < 0 || from >= slots.length || to < 0 || to >= slots.length || from === to) {
    return false;
  }
  const a = slots[from];
  const b = slots[to];
  if (a && b && a.itemId === b.itemId) {
    const def = getItem(a.itemId);
    if (def && def.maxStack > 1) {
      const space = def.maxStack - b.count;
      if (space > 0) {
        const move = Math.min(space, a.count);
        b.count += move;
        a.count -= move;
        if (a.count <= 0) slots[from] = null;
        return true;
      }
    }
  }
  slots[from] = b;
  slots[to] = a;
  return true;
}
