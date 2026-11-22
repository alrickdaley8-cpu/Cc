import { ITEMS } from '@wildreach/shared';

export function getItemSvg(itemId: string): string {
  const col = ITEMS[itemId]?.accentColor ?? '#cbd5e1';

  switch (itemId) {
    case 'wood':
      return `<svg viewBox="0 0 32 32"><rect x="4" y="11" width="24" height="10" rx="4" fill="#9c6234" stroke="#4a2b13" stroke-width="2"/><ellipse cx="7" cy="16" rx="2.5" ry="4.5" fill="#d9a574"/><line x1="12" y1="14" x2="23" y2="14" stroke="#6b3e1b" stroke-width="1.5"/></svg>`;
    case 'stone':
      return `<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 27,14 25,24 14,26" fill="#8b949e" stroke="#3e464f" stroke-width="2"/><polygon points="10,12 18,9 22,15 13,17" fill="#b4bdc7" opacity="0.65"/></svg>`;
    case 'flint':
      return `<svg viewBox="0 0 32 32"><polygon points="16,4 25,18 18,28 8,21 10,10" fill="#525c68" stroke="#1f252b" stroke-width="2"/><polygon points="16,6 21,16 15,21 12,13" fill="#8fa0b2" opacity="0.6"/></svg>`;
    case 'fiber':
      return `<svg viewBox="0 0 32 32"><path d="M9 26 C10 18, 12 11, 8 6 M16 26 C16 17, 17 10, 16 5 M23 26 C22 18, 20 12, 24 7" stroke="#75b548" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M8 20 Q16 18 24 20" stroke="#c8a86b" stroke-width="2.2" fill="none"/></svg>`;
    case 'rope':
      return `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="9.5" fill="none" stroke="#cfa968" stroke-width="4.5"/><circle cx="16" cy="16" r="5" fill="none" stroke="#8f6c36" stroke-width="2"/></svg>`;
    case 'resin':
      return `<svg viewBox="0 0 32 32"><path d="M16 4 C22 12, 25 18, 23 23 C21 27, 11 27, 9 23 C7 18, 10 12, 16 4Z" fill="#f59e0b" stroke="#78350f" stroke-width="2"/><ellipse cx="13.5" cy="17" rx="2.2" ry="4" fill="#fde68a" opacity="0.7"/></svg>`;
    case 'hide':
      return `<svg viewBox="0 0 32 32"><path d="M7 8 L12 10 L16 6 L20 10 L25 8 L23 16 L26 24 L19 23 L16 27 L13 23 L6 24 L9 16 Z" fill="#a66a42" stroke="#4f2d18" stroke-width="2"/></svg>`;
    case 'fang':
      return `<svg viewBox="0 0 32 32"><path d="M11 6 C18 7, 23 14, 21 27 C16 21, 14 14, 9 10 Z" fill="#f1ece1" stroke="#6b6356" stroke-width="2"/></svg>`;
    case 'coal':
      return `<svg viewBox="0 0 32 32"><polygon points="8,22 7,12 15,7 24,11 25,21 16,26" fill="#2b2e34" stroke="#0f1114" stroke-width="2"/><polygon points="11,13 16,10 20,14 14,17" fill="#525866" opacity="0.6"/></svg>`;
    case 'copper_ore':
      return `<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 26,14 24,25 13,26" fill="#68707a" stroke="#2d333b" stroke-width="2"/><circle cx="14" cy="14" r="3" fill="#e07a3f"/><circle cx="20" cy="19" r="2.6" fill="#34d399"/><circle cx="12" cy="21" r="2.2" fill="#e07a3f"/></svg>`;
    case 'iron_ore':
      return `<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 26,14 24,25 13,26" fill="#58606b" stroke="#232830" stroke-width="2"/><polygon points="11,12 17,11 16,17 11,16" fill="#cbd5e1"/><polygon points="18,17 23,16 22,22 17,21" fill="#94a3b8"/></svg>`;
    case 'copper_ingot':
    case 'iron_ingot':
      return `<svg viewBox="0 0 32 32"><polygon points="6,21 11,10 23,10 27,21" fill="${col}" stroke="#27272a" stroke-width="2"/><polygon points="11,10 23,10 21,15 9,15" fill="#ffffff" opacity="0.35"/></svg>`;
    case 'obsidian':
      return `<svg viewBox="0 0 32 32"><polygon points="16,4 25,13 21,27 10,26 7,14" fill="#3b265e" stroke="#140c24" stroke-width="2"/><polygon points="16,6 22,14 16,22 11,15" fill="#7c3aed" opacity="0.5"/></svg>`;
    case 'ancient_shard':
      return `<svg viewBox="0 0 32 32"><polygon points="16,3 23,13 18,29 10,15" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/><polygon points="16,6 20,14 16,24 13,14" fill="#ccfbf1" opacity="0.7"/></svg>`;
    case 'shadow_essence':
      return `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#581c87" opacity="0.55"/><circle cx="16" cy="16" r="6" fill="#c084fc"/><circle cx="14" cy="14" r="2" fill="#ffffff"/></svg>`;
    case 'berries':
      return `<svg viewBox="0 0 32 32"><path d="M16 10 Q21 5 24 9 Q19 12 16 10Z" fill="#4ade80"/><circle cx="13" cy="17" r="4.5" fill="#e11d48" stroke="#881337" stroke-width="1.5"/><circle cx="20" cy="18" r="4.5" fill="#f43f5e" stroke="#881337" stroke-width="1.5"/><circle cx="16" cy="23" r="4.2" fill="#be123c" stroke="#881337" stroke-width="1.5"/></svg>`;
    case 'coconut':
      return `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#7c4a26" stroke="#3f2310" stroke-width="2"/><circle cx="13" cy="13" r="1.4" fill="#2d180a"/><circle cx="18" cy="13" r="1.4" fill="#2d180a"/><circle cx="15.5" cy="17" r="1.4" fill="#2d180a"/></svg>`;
    case 'mushroom':
      return `<svg viewBox="0 0 32 32"><rect x="13" y="16" width="6" height="10" rx="2" fill="#efe6d5" stroke="#7c6b54" stroke-width="1.8"/><path d="M5 17 C6 7, 26 7, 27 17 Z" fill="#c87038" stroke="#663213" stroke-width="2"/><circle cx="12" cy="12" r="1.5" fill="#fde68a"/><circle cx="19" cy="11" r="1.8" fill="#fde68a"/></svg>`;
    case 'raw_meat':
    case 'cooked_meat':
      return `<svg viewBox="0 0 32 32"><path d="M7 18 C7 10, 15 7, 23 11 C27 14, 26 23, 18 25 C11 26, 7 23, 7 18Z" fill="${col}" stroke="#4a1c12" stroke-width="2"/><circle cx="13" cy="16" r="3" fill="#f5ead6" stroke="#b09b7c" stroke-width="1.5"/></svg>`;
    case 'hearty_stew':
      return `<svg viewBox="0 0 32 32"><path d="M5 15 H27 C26 24, 22 27, 16 27 C10 27, 6 24, 5 15Z" fill="#7c5334" stroke="#3b2312" stroke-width="2"/><ellipse cx="16" cy="15" rx="10" ry="3.5" fill="#ea782b"/><path d="M12 10 Q13 7 12 5 M19 10 Q20 7 19 5" stroke="#e2e8f0" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`;
    case 'bandage':
      return `<svg viewBox="0 0 32 32"><rect x="6" y="11" width="20" height="10" rx="4" transform="rotate(-35 16 16)" fill="#f1ead8" stroke="#8c7f68" stroke-width="2"/><path d="M16 12 V20 M12 16 H20" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/></svg>`;
    case 'vitality_elixir':
      return `<svg viewBox="0 0 32 32"><rect x="13" y="5" width="6" height="5" fill="#cbd5e1"/><path d="M13 10 L7 22 C6 25, 9 27, 16 27 C23 27, 26 25, 25 22 L19 10 Z" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/><circle cx="14" cy="20" r="2" fill="#ffffff" opacity="0.7"/></svg>`;
    case 'torch':
      return `<svg viewBox="0 0 32 32"><line x1="8" y1="27" x2="19" y2="14" stroke="#85522c" stroke-width="4" stroke-linecap="round"/><path d="M21 5 C26 9, 26 15, 20 17 C16 15, 16 9, 21 5Z" fill="#f97316"/><path d="M21 9 C23 11, 23 14, 20 15 C18 14, 18 11, 21 9Z" fill="#fde047"/></svg>`;
    case 'build_hammer':
      return `<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="21" y2="12" stroke="#8c5830" stroke-width="3.6" stroke-linecap="round"/><rect x="15" y="5" width="12" height="7" rx="1.5" transform="rotate(45 21 8.5)" fill="#94a3b8" stroke="#334155" stroke-width="1.8"/></svg>`;
    case 'stone_axe':
    case 'iron_axe':
      return `<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="22" y2="10" stroke="#85522c" stroke-width="3.5" stroke-linecap="round"/><path d="M16 8 L25 6 C27 11, 25 16, 20 18 L17 13 Z" fill="${col}" stroke="#1e293b" stroke-width="1.8"/></svg>`;
    case 'stone_pickaxe':
    case 'iron_pickaxe':
      return `<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="22" y2="11" stroke="#85522c" stroke-width="3.4" stroke-linecap="round"/><path d="M11 7 Q20 7 26 19 L23 21 Q18 12 10 11 Z" fill="${col}" stroke="#1e293b" stroke-width="1.8"/></svg>`;
    case 'wood_spear':
      return `<svg viewBox="0 0 32 32"><line x1="5" y1="27" x2="23" y2="9" stroke="#996438" stroke-width="3" stroke-linecap="round"/><polygon points="27,5 24,13 19,8" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/></svg>`;
    case 'iron_sword':
    case 'shadow_blade':
      return `<svg viewBox="0 0 32 32"><line x1="6" y1="26" x2="12" y2="20" stroke="#6b4226" stroke-width="3.2" stroke-linecap="round"/><line x1="10" y1="16" x2="16" y2="22" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/><polygon points="13,19 26,6 27,7 14,20" fill="${col}" stroke="${col}" stroke-width="2.5"/></svg>`;
    case 'hunting_bow':
    case 'starlight_bow':
      return `<svg viewBox="0 0 32 32"><path d="M9 6 C23 8, 25 22, 9 26" fill="none" stroke="${col}" stroke-width="3.2" stroke-linecap="round"/><line x1="9" y1="6" x2="9" y2="26" stroke="#e2e8f0" stroke-width="1.4"/><line x1="7" y1="16" x2="26" y2="16" stroke="#f8fafc" stroke-width="1.8"/></svg>`;
    case 'flint_arrow':
      return `<svg viewBox="0 0 32 32"><line x1="6" y1="26" x2="24" y2="8" stroke="#c8a878" stroke-width="2.5"/><polygon points="27,5 24,12 20,8" fill="#94a3b8"/><path d="M5 24 L9 25 L8 29" fill="none" stroke="#f43f5e" stroke-width="2"/></svg>`;
    case 'leather_armor':
    case 'iron_armor':
    case 'runic_armor':
      return `<svg viewBox="0 0 32 32"><path d="M9 6 L13 9 L19 9 L23 6 L27 11 L24 15 L23 26 L9 26 L8 15 L5 11 Z" fill="${col}" stroke="#1e293b" stroke-width="2"/></svg>`;
    default:
      return `<svg viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="16" rx="3" fill="${col}" stroke="#1e293b" stroke-width="2"/><circle cx="16" cy="16" r="3.5" fill="#ffffff" opacity="0.6"/></svg>`;
  }
}
