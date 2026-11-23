# Research notes

These references describe WorldBox, not Worldforge. They are used to understand the genre's design and prioritize independent, simplified mechanics; none of the original game's assets are used. Wiki details can change with game versions.

| Source | What it describes | How this prototype responds |
| --- | --- | --- |
| [Official Steam page](https://store.steampowered.com/app/1206560/WorldBox__God_Simulator/) | Free-form world creation, fantasy races, civilizations, diplomacy, destructive powers and procedural maps. | Terrain brushes, fantasy races, settlements, simplified diplomacy and powers, and generated maps. |
| [WorldBox wiki: Biomes](https://the-official-worldbox-wiki.fandom.com/wiki/Category:Biomes), [Enchanted](https://the-official-worldbox-wiki.fandom.com/wiki/Enchanted_Biome), [Corrupted](https://the-official-worldbox-wiki.fandom.com/wiki/Corrupted_Biome), [Infernal](https://the-official-worldbox-wiki.fandom.com/wiki/Infernal_Biome) | Biome-specific appearance, creature effects, resources and natural life. | Three hand-painted fantasy biomes with distinct colors and simplified blessing, curse and heat effects. No full biome ecology or adaptation system. |
| [WorldBox wiki: Plague](https://the-official-worldbox-wiki.fandom.com/wiki/Plague), [Zombies](https://the-official-worldbox-wiki.fandom.com/wiki/Zombies) | Nearby disease transmission, immunity, cures and zombies that infect victims. | A short-lived plague, immunity trait, cure power, and a separate zombie infection that can transform a victim on death. |
| [WorldBox wiki: Creature Traits](https://the-official-worldbox-wiki.fandom.com/wiki/Creature_Traits) | Many inherited and acquired traits affect creatures in different ways. | A small set of traits with player-editable immortality, strength and immunity; not a full trait editor. |
| [WorldBox wiki: World Behaviors](https://the-official-worldbox-wiki.fandom.com/wiki/World_Behaviors) | Periodic world processes such as fire and vegetation. | Tick-based spreading fire and optional natural fires; no full environmental simulation. |
| [WorldBox wiki: Houses](https://the-official-worldbox-wiki.fandom.com/wiki/Houses), [Villages](https://the-official-worldbox-wiki.fandom.com/wiki/Villages), [Buildings](https://the-official-worldbox-wiki.fandom.com/wiki/Category:Buildings) | Six classic house tiers plus tents, three town hall tiers, and many resource-based building types with different roles. | Six unified settlement/house tiers, three town hall appearances, and a small set of tier-based civic bonuses and original sprites. Buildings are not individual entities. |
| [WorldBox wiki: Economy](https://the-official-worldbox-wiki.fandom.com/wiki/Economy), [Buildings](https://the-official-worldbox-wiki.fandom.com/wiki/Category:Buildings) | Villages gather and share resources, and buildings consume them. | Villages collect wood, stone, iron and gold, spend stocks on level upgrades, and share food over connected land. |
| [WorldBox wiki: Plots](https://the-official-worldbox-wiki.fandom.com/wiki/Plots) | Diplomacy and rebellion have many contextual conditions. | Small-scale automatic wars and a distance/food/war-based village loyalty model with optional rebellion; no plot system. |


## AI design references

- [Red Blob Games: introduction to A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html) explains graph search and heuristic pathfinding. Worldforge uses its own bounded grid A* for movement goals, not a full navigation mesh or army system.
- [AI Decision-Making with Utility Scores](https://mcguirev10.com/2019/01/03/ai-decision-making-with-utility-scores-part-1.html) discusses choosing actions based on context. Worldforge currently uses simpler ordered priorities for danger, combat and recovery, and scores candidate settlement sites; it does not implement a full utility-AI framework or long-term planner.
- [WorldBox wiki: War](https://the-official-worldbox-wiki.fandom.com/wiki/War) describes armies and defenders (some details may be outdated). This inspired local monster defense and fear, but kingdom battles are still abstract raids and do not model those rules.
- [WorldBox wiki: Civilization](https://worldbox.fandom.com/wiki/Civilization) describes settlement resources and armies. The prototype considers fertility, trees, rivals and fires in selecting settlement sites; its economy remains aggregate.

The wiki descriptions show much greater depth than is present here. In particular, cultures, boats, diplomacy beyond war and peace, detailed world history, monster variety and individual army pathfinding remain substantial future work.
