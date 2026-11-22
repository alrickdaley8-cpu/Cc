export type CraftStation = 'hand' | 'campfire' | 'workbench' | 'furnace' | 'runic_forge';

export interface RecipeDef {
  id: string;
  outputItemId: string;
  outputCount: number;
  station: CraftStation;
  category: 'tools' | 'weapons' | 'survival' | 'materials' | 'stations' | 'armor';
  ingredients: { itemId: string; count: number }[];
  xpReward: number;
}

export const RECIPES: RecipeDef[] = [
  // ---- Hand Crafting (Tier 0) ----
  {
    id: 'rcp_rope',
    outputItemId: 'rope',
    outputCount: 1,
    station: 'hand',
    category: 'materials',
    ingredients: [{ itemId: 'fiber', count: 4 }],
    xpReward: 5,
  },
  {
    id: 'rcp_torch',
    outputItemId: 'torch',
    outputCount: 1,
    station: 'hand',
    category: 'survival',
    ingredients: [
      { itemId: 'wood', count: 2 },
      { itemId: 'fiber', count: 2 },
    ],
    xpReward: 8,
  },
  {
    id: 'rcp_stone_axe',
    outputItemId: 'stone_axe',
    outputCount: 1,
    station: 'hand',
    category: 'tools',
    ingredients: [
      { itemId: 'wood', count: 4 },
      { itemId: 'stone', count: 3 },
      { itemId: 'fiber', count: 2 },
    ],
    xpReward: 15,
  },
  {
    id: 'rcp_stone_pickaxe',
    outputItemId: 'stone_pickaxe',
    outputCount: 1,
    station: 'hand',
    category: 'tools',
    ingredients: [
      { itemId: 'wood', count: 4 },
      { itemId: 'stone', count: 4 },
      { itemId: 'fiber', count: 2 },
    ],
    xpReward: 15,
  },
  {
    id: 'rcp_build_hammer',
    outputItemId: 'build_hammer',
    outputCount: 1,
    station: 'hand',
    category: 'tools',
    ingredients: [
      { itemId: 'wood', count: 4 },
      { itemId: 'stone', count: 2 },
    ],
    xpReward: 12,
  },
  {
    id: 'rcp_wood_spear',
    outputItemId: 'wood_spear',
    outputCount: 1,
    station: 'hand',
    category: 'weapons',
    ingredients: [
      { itemId: 'wood', count: 5 },
      { itemId: 'flint', count: 2 },
      { itemId: 'fiber', count: 2 },
    ],
    xpReward: 18,
  },
  {
    id: 'rcp_bandage',
    outputItemId: 'bandage',
    outputCount: 2,
    station: 'hand',
    category: 'survival',
    ingredients: [
      { itemId: 'fiber', count: 4 },
      { itemId: 'berries', count: 2 },
    ],
    xpReward: 10,
  },
  {
    id: 'rcp_kit_campfire',
    outputItemId: 'kit_campfire',
    outputCount: 1,
    station: 'hand',
    category: 'stations',
    ingredients: [
      { itemId: 'wood', count: 6 },
      { itemId: 'stone', count: 5 },
    ],
    xpReward: 20,
  },
  {
    id: 'rcp_kit_workbench',
    outputItemId: 'kit_workbench',
    outputCount: 1,
    station: 'hand',
    category: 'stations',
    ingredients: [
      { itemId: 'wood', count: 12 },
      { itemId: 'stone', count: 4 },
      { itemId: 'rope', count: 1 },
    ],
    xpReward: 28,
  },
  {
    id: 'rcp_kit_bedroll',
    outputItemId: 'kit_bedroll',
    outputCount: 1,
    station: 'hand',
    category: 'stations',
    ingredients: [
      { itemId: 'fiber', count: 8 },
      { itemId: 'hide', count: 2 },
    ],
    xpReward: 20,
  },

  // ---- Campfire Cooking ----
  {
    id: 'rcp_cooked_meat',
    outputItemId: 'cooked_meat',
    outputCount: 1,
    station: 'campfire',
    category: 'survival',
    ingredients: [{ itemId: 'raw_meat', count: 1 }],
    xpReward: 14,
  },
  {
    id: 'rcp_hearty_stew',
    outputItemId: 'hearty_stew',
    outputCount: 1,
    station: 'campfire',
    category: 'survival',
    ingredients: [
      { itemId: 'raw_meat', count: 1 },
      { itemId: 'mushroom', count: 2 },
      { itemId: 'berries', count: 2 },
    ],
    xpReward: 25,
  },
  {
    id: 'rcp_charcoal',
    outputItemId: 'coal',
    outputCount: 2,
    station: 'campfire',
    category: 'materials',
    ingredients: [{ itemId: 'wood', count: 3 }],
    xpReward: 8,
  },

  // ---- Workbench (Tier 1) ----
  {
    id: 'rcp_hunting_bow',
    outputItemId: 'hunting_bow',
    outputCount: 1,
    station: 'workbench',
    category: 'weapons',
    ingredients: [
      { itemId: 'wood', count: 8 },
      { itemId: 'rope', count: 2 },
    ],
    xpReward: 30,
  },
  {
    id: 'rcp_flint_arrow',
    outputItemId: 'flint_arrow',
    outputCount: 8,
    station: 'workbench',
    category: 'weapons',
    ingredients: [
      { itemId: 'wood', count: 3 },
      { itemId: 'flint', count: 2 },
      { itemId: 'fiber', count: 2 },
    ],
    xpReward: 12,
  },
  {
    id: 'rcp_leather_armor',
    outputItemId: 'leather_armor',
    outputCount: 1,
    station: 'workbench',
    category: 'armor',
    ingredients: [
      { itemId: 'hide', count: 6 },
      { itemId: 'rope', count: 2 },
    ],
    xpReward: 35,
  },

  // ---- Stone Furnace (Tier 2) ----
  {
    id: 'rcp_copper_ingot',
    outputItemId: 'copper_ingot',
    outputCount: 1,
    station: 'furnace',
    category: 'materials',
    ingredients: [
      { itemId: 'copper_ore', count: 2 },
      { itemId: 'coal', count: 1 },
    ],
    xpReward: 16,
  },
  {
    id: 'rcp_iron_ingot',
    outputItemId: 'iron_ingot',
    outputCount: 1,
    station: 'furnace',
    category: 'materials',
    ingredients: [
      { itemId: 'iron_ore', count: 2 },
      { itemId: 'coal', count: 1 },
    ],
    xpReward: 22,
  },
  {
    id: 'rcp_iron_axe',
    outputItemId: 'iron_axe',
    outputCount: 1,
    station: 'furnace',
    category: 'tools',
    ingredients: [
      { itemId: 'iron_ingot', count: 3 },
      { itemId: 'wood', count: 4 },
      { itemId: 'rope', count: 1 },
    ],
    xpReward: 42,
  },
  {
    id: 'rcp_iron_pickaxe',
    outputItemId: 'iron_pickaxe',
    outputCount: 1,
    station: 'furnace',
    category: 'tools',
    ingredients: [
      { itemId: 'iron_ingot', count: 3 },
      { itemId: 'wood', count: 4 },
      { itemId: 'rope', count: 1 },
    ],
    xpReward: 42,
  },
  {
    id: 'rcp_iron_sword',
    outputItemId: 'iron_sword',
    outputCount: 1,
    station: 'furnace',
    category: 'weapons',
    ingredients: [
      { itemId: 'iron_ingot', count: 4 },
      { itemId: 'copper_ingot', count: 1 },
      { itemId: 'hide', count: 2 },
    ],
    xpReward: 50,
  },
  {
    id: 'rcp_iron_armor',
    outputItemId: 'iron_armor',
    outputCount: 1,
    station: 'furnace',
    category: 'armor',
    ingredients: [
      { itemId: 'iron_ingot', count: 6 },
      { itemId: 'hide', count: 4 },
    ],
    xpReward: 60,
  },

  // ---- Runic Forge (Tier 3 Endgame) ----
  {
    id: 'rcp_vitality_elixir',
    outputItemId: 'vitality_elixir',
    outputCount: 2,
    station: 'runic_forge',
    category: 'survival',
    ingredients: [
      { itemId: 'ancient_shard', count: 1 },
      { itemId: 'berries', count: 4 },
      { itemId: 'mushroom', count: 2 },
    ],
    xpReward: 38,
  },
  {
    id: 'rcp_shadow_blade',
    outputItemId: 'shadow_blade',
    outputCount: 1,
    station: 'runic_forge',
    category: 'weapons',
    ingredients: [
      { itemId: 'obsidian', count: 4 },
      { itemId: 'shadow_essence', count: 3 },
      { itemId: 'iron_ingot', count: 3 },
    ],
    xpReward: 95,
  },
  {
    id: 'rcp_starlight_bow',
    outputItemId: 'starlight_bow',
    outputCount: 1,
    station: 'runic_forge',
    category: 'weapons',
    ingredients: [
      { itemId: 'ancient_shard', count: 4 },
      { itemId: 'wood', count: 8 },
      { itemId: 'fang', count: 3 },
    ],
    xpReward: 90,
  },
  {
    id: 'rcp_runic_armor',
    outputItemId: 'runic_armor',
    outputCount: 1,
    station: 'runic_forge',
    category: 'armor',
    ingredients: [
      { itemId: 'obsidian', count: 5 },
      { itemId: 'ancient_shard', count: 4 },
      { itemId: 'iron_ingot', count: 4 },
    ],
    xpReward: 110,
  },
];

export function getRecipe(id: string): RecipeDef | null {
  return RECIPES.find((r) => r.id === id) ?? null;
}
