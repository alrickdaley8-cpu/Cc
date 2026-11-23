import test from 'node:test';
import assert from 'node:assert/strict';
import {newWorld,restoreWorld,inspireVillage,CIV_STAGES,act,step,findPath,villageHousing,W,H} from '../src/engine.js';

const advance=(w,n)=>{for(let i=0;i<n;i++)step(w)};
test('world generation creates a populated, reproducible map',()=>{
  const a=newWorld(123), b=newWorld(123);
  assert.equal(a.tiles.length,W*H); assert.deepEqual(a.tiles,b.tiles);
  assert.equal(a.cities.length,4); assert.equal(a.kingdoms.length,4);
  assert.equal(a.units.filter(u=>u.kid).length,56);
  assert.ok(a.units.some(u=>u.race==='sheep'));
});
test('terrain tools paint within bounds and invalid powers are inert',()=>{
  const w=newWorld(123);act(w,'water',40,40,2);assert.equal(w.tiles[40*W+40],'water');
  act(w,'soil',40,40,2);assert.equal(w.tiles[40*W+40],'grass');
  const before=JSON.stringify(w);act(w,'not-a-tool',1,1,3);assert.equal(JSON.stringify(w),before);
  const edge=newWorld(123);edge.tiles[W-1]='desert';act(edge,'rain',0,1,1);assert.equal(edge.tiles[W-1],'desert');
});
test('civilized creatures found a settlement on land, not on water',()=>{
  const w=newWorld(123);act(w,'soil',10,10,3);const count=w.cities.length;
  act(w,'human',10,10,1);assert.equal(w.cities.length,count+1);
  act(w,'water',15,15,2);const units=w.units.length;act(w,'elf',15,15,1);assert.equal(w.units.length,units);
});
test('time advances and destructive powers leave a record',()=>{
  const w=newWorld(123);advance(w,100);assert.ok(w.year>1);act(w,'meteor',50,50,3);
  assert.equal(w.events[0].title,'A meteor strikes');
});
test('war and peace maintain symmetric relationships',()=>{
  const w=newWorld(123);act(w,'war',50,50);assert.equal(w.wars.length,6);assert.ok(w.kingdoms.every(k=>k.atWar));
  act(w,'peace',50,50);assert.equal(w.wars.length,0);assert.ok(w.kingdoms.every(k=>!k.atWar));
});
test('neighboring kingdoms at war raid one another',()=>{
  const w=newWorld(123);w.tiles.fill('grass');w.cities=w.cities.slice(0,2);w.kingdoms=w.kingdoms.slice(0,2);
  w.units=w.units.filter(u=>w.kingdoms.some(k=>k.id===u.kid));
  w.cities[0].x=60;w.cities[0].y=50;w.cities[1].x=75;w.cities[1].y=50;
  act(w,'war',50,50);w.tick=179;step(w);
  assert.ok(w.cities.some(c=>c.hp<100),'a raid damaged a settlement');
});
test('old age and reproduction laws change the simulation',()=>{
  const w=newWorld(123);w.rules.reproduction=false;w.rules.oldAge=false;w.rules.hunger=false;w.rules.diplomacy=false;w.rules.expansion=false;
  w.units.forEach(u=>{u.age=200});const count=w.units.length;advance(w,80);assert.equal(w.units.length,count);
  w.rules.oldAge=true;advance(w,40);assert.equal(w.units.length,0);
});
test('fertile, populous villages can establish new settlements',()=>{
  const w=newWorld(123);w.tiles.fill('grass');w.cities=w.cities.slice(0,1);w.kingdoms=w.kingdoms.slice(0,1);const city=w.cities[0];
  w.units=w.units.filter(u=>u.home===city.id);city.x=90;city.y=55;city.lastExpansion=0;w.year=40;
  for(const u of w.units){u.x=90;u.y=55}for(let i=0;i<5;i++)act(w,'human',90,55);
  advance(w,40);assert.equal(w.cities.length,2);assert.ok(w.cities[1].kid===city.kid);
  assert.ok(w.units.some(u=>u.home===w.cities[1].id));
});
test('plague infects nearby units and blessing cures them',()=>{
  const w=newWorld(123),c=w.cities[0];act(w,'plague',c.x,c.y,6);
  assert.ok(w.units.some(u=>u.infected));act(w,'heal',c.x,c.y,6);assert.ok(w.units.every(u=>!u.infected));
});
test('flooding a village destroys it, and the last village ends its kingdom',()=>{
  const w=newWorld(123),c=w.cities[0],kid=c.kid;act(w,'water',c.x,c.y,3);advance(w,40);
  assert.ok(!w.cities.some(v=>v.id===c.id));assert.ok(!w.kingdoms.some(k=>k.id===kid));
});
test('save migration fills new fields and rejects invalid worlds',()=>{
  const old=JSON.parse(JSON.stringify(newWorld(123)));delete old.rules;delete old.wars;
  old.units.forEach(u=>{delete u.id;delete u.home});old.cities.forEach(c=>delete c.food);
  const restored=restoreWorld(old);assert.equal(restored.rules.hunger,true);assert.ok(restored.units.every(u=>u.id));
  assert.ok(restored.units.filter(u=>u.kid).every(u=>u.home));assert.ok(restored.cities.every(c=>c.food===60));
  assert.throws(()=>restoreWorld({tiles:[]}));
});
test('empty oceans have no life and seeded archipelagos are reproducible',()=>{
  const empty=newWorld(99,{empty:true});assert.ok(empty.tiles.every(t=>t==='deep'));
  assert.equal(empty.units.length,0);assert.equal(empty.cities.length,0);
  assert.deepEqual(newWorld(99).tiles,newWorld(99).tiles);
});
test('resource deposits are harvested by nearby villages',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55,1);
  const c=w.cities[0];act(w,'iron',72,55);act(w,'gold',73,55);act(w,'stone',74,55);
  assert.equal(w.resources.length,3);const amount=w.resources[0].amount;
  advance(w,40);assert.ok(c.iron>0&&c.gold>0&&c.stone>15);assert.ok(w.resources[0].amount<amount);
});
test('fire burns tiles, does not spread when disabled, and rain extinguishes it',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);w.rules.fireSpread=false;
  act(w,'fire',70,55,1);assert.ok(w.fires.some(f=>f.x===70&&f.y===55));
  const lit=w.fires.length;advance(w,10);assert.ok(w.fires.length<=lit);
  act(w,'rain',70,55,4);assert.equal(w.fires.length,0);
  act(w,'fire',70,55,1);advance(w,50);assert.equal(w.tiles[55*W+70],'scorched');assert.equal(w.fires.length,0);
});
test('monsters attack when enabled and zombie infection transforms a dead victim',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);act(w,'zombie',70,55);
  w.rules.reproduction=false;for(const u of w.units){u.x=70;u.y=55}
  const victim=w.units.find(u=>u.race==='human');w.rules.hostileMonsters=false;w.tick=19;step(w);assert.equal(victim.health,victim.maxHealth);
  w.rules.hostileMonsters=true;w.tick=19;step(w);assert.ok(victim.health<victim.maxHealth);
  const before=w.units.filter(u=>u.race==='zombie').length;victim.zombieInfection=true;victim.health=0;w.tick=39;step(w);
  assert.ok(!w.units.includes(victim));assert.equal(w.units.filter(u=>u.race==='zombie').length,before+1);
});
test('biomes apply statuses and immunity blocks plague',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);w.rules.reproduction=false;
  const unit=w.units[0];unit.traits=['Immune'];act(w,'plague',70,55,8);assert.equal(unit.infected,false);
  const rand=Math.random;Math.random=()=>0.01;
  try {w.tiles.fill('corrupted');w.tick=39;step(w);assert.equal(unit.cursed,true);
    w.tiles.fill('enchanted');w.tick=39;step(w);assert.equal(unit.cursed,false);assert.equal(unit.blessed,true);
  } finally {Math.random=rand}
});
test('new world data survives round trips and malformed files are rejected',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'gold',72,55);act(w,'fire',70,55,1);act(w,'dragon',70,55);
  const restored=restoreWorld(JSON.parse(JSON.stringify(w)));assert.equal(restored.resources.length,1);assert.ok(restored.fires.length>0);
  assert.equal(restored.units[0].race,'dragon');assert.equal(restored.rules.hostileMonsters,true);
  const invalid=JSON.parse(JSON.stringify(w));invalid.tiles[0]='not-a-tile';assert.throws(()=>restoreWorld(invalid));
  const future=JSON.parse(JSON.stringify(w));future.version=999;assert.throws(()=>restoreWorld(future));
});
test('rebellion creates a new kingdom and transfers village residents',()=>{
  const w=newWorld(123);w.tiles.fill('grass');w.cities=w.cities.slice(0,1);w.kingdoms=w.kingdoms.slice(0,1);
  const city=w.cities[0];w.units=w.units.filter(u=>u.home===city.id);city.x=90;city.y=55;city.lastExpansion=0;w.year=40;
  for(const u of w.units){u.x=90;u.y=55}for(let i=0;i<5;i++)act(w,'human',90,55);advance(w,40);
  const village=w.cities[1],oldKingdom=city.kid;assert.ok(village);act(w,'rebellion',village.x,village.y);
  assert.equal(w.kingdoms.length,2);assert.notEqual(village.kid,oldKingdom);assert.ok(w.units.filter(u=>u.home===village.id).every(u=>u.kid===village.kid));assert.equal(w.wars.length,1);
});
test('villages within a kingdom share food on connected land',()=>{
  const w=newWorld(123);w.tiles.fill('grass');w.cities=w.cities.slice(0,1);w.kingdoms=w.kingdoms.slice(0,1);
  const capital=w.cities[0];w.units=w.units.filter(u=>u.home===capital.id);capital.x=90;capital.y=55;capital.lastExpansion=0;w.year=40;
  for(const u of w.units){u.x=90;u.y=55}for(let i=0;i<5;i++)act(w,'human',90,55);advance(w,40);
  const village=w.cities[1];capital.food=150;village.food=0;w.tick=159;step(w);
  assert.ok(capital.food<150);assert.ok(village.food>0);
});
test('trait powers change lifespan, health, immunity and can be reset',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);w.rules.reproduction=false;w.rules.hunger=false;
  const unit=w.units[0];unit.x=70;unit.y=55;unit.traits=[];unit.age=200;
  act(w,'strong',70,55,3);assert.ok(unit.traits.includes('Strong'));assert.equal(unit.maxHealth,125);
  act(w,'immortal',70,55,3);advance(w,40);assert.ok(w.units.includes(unit));
  act(w,'immune',70,55,3);act(w,'plague',70,55,3);assert.equal(unit.infected,false);
  act(w,'curse',70,55,3);assert.equal(unit.cursed,true);
  act(w,'resetTraits',70,55,3);assert.deepEqual(unit.traits,[]);assert.equal(unit.cursed,false);assert.equal(unit.maxHealth,100);
  advance(w,40);assert.ok(!w.units.includes(unit));
});
test('divine advance reaches every civilization tier with enough housing and survives saves',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);const c=w.cities[0];
  for(let tier=2;tier<=6;tier++){
    const result=inspireVillage(w,c.id);assert.equal(result.ok,true);assert.equal(c.level,tier);
    const stage=CIV_STAGES[tier-1],population=w.units.filter(u=>u.home===c.id).length;
    assert.ok(population>=stage.population);assert.ok(stage.housing>=population);
  }
  assert.equal(CIV_STAGES[c.level-1].hall,3);
  const count=w.units.length;assert.equal(inspireVillage(w,c.id).ok,false);assert.equal(w.units.length,count);
  assert.equal(restoreWorld(JSON.parse(JSON.stringify(w))).cities[0].level,6);
});
test('natural upgrades require both citizens and building resources',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);act(w,'human',70,55);act(w,'human',70,55);
  const c=w.cities[0];w.rules.reproduction=false;w.rules.hunger=false;w.rules.expansion=false;c.wood=0;c.stone=0;
  advance(w,40);assert.equal(c.level,1);
  c.wood=20;c.stone=20;advance(w,40);assert.equal(c.level,2);
});
test('housing stops birth growth until the village upgrades',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);const c=w.cities[0];
  w.rules.hunger=false;w.rules.oldAge=false;w.rules.expansion=false;c.wood=0;c.stone=0;
  advance(w,1000);assert.equal(c.level,1);assert.ok(w.units.filter(u=>u.home===c.id).length<=CIV_STAGES[0].housing);
});
test('divine advance reports the creature cap without partially changing the village',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);const c=w.cities[0];
  while(w.units.length<650)w.units.push({...w.units[0],id:`filler-${w.units.length}`,home:null,kid:null});
  const before=JSON.stringify(c),result=inspireVillage(w,c.id);assert.equal(result.ok,false);assert.match(result.message,/limit/);assert.equal(JSON.stringify(c),before);
});
test('watchtowers damage nearby monsters after tier four',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);const c=w.cities[0];
  for(let i=0;i<3;i++)inspireVillage(w,c.id);assert.equal(c.level,4);
  act(w,'dragon',74,55);const dragon=w.units.find(u=>u.race==='dragon');dragon.x=74;dragon.y=55;
  w.tick=19;step(w);assert.equal(dragon.health,dragon.maxHealth-12);
});
test('inspire power targets a settlement and explains invalid clicks',()=>{
  const w=newWorld(99,{empty:true});act(w,'soil',70,55,9);act(w,'human',70,55);const c=w.cities[0];
  const result=act(w,'inspire',70,55);assert.equal(result.ok,true);assert.equal(c.level,2);
  const invalid=act(w,'inspire',130,90);assert.equal(invalid.ok,false);assert.equal(c.level,2);
});
test('bounded pathfinding routes around barriers, avoids fire, and rejects unreachable goals',()=>{
  const w=newWorld(1,{empty:true});w.tiles.fill('grass');
  for(let y=48;y<=58;y++)w.tiles[y*W+75]='mountain';
  const path=findPath(w,72,55,78,55);assert.ok(path&&path.length>6);assert.ok(path.every(p=>w.tiles[Math.floor(p.y)*W+Math.floor(p.x)]!=='mountain'));
  assert.ok(path.some(p=>p.y<48||p.y>=59));
  w.tiles.fill('mountain');for(let x=70;x<=80;x++)w.tiles[55*W+x]='grass';w.fires=[{x:75,y:55,life:5}];
  assert.equal(findPath(w,72,55,78,55),null);w.fires=[];assert.ok(findPath(w,72,55,78,55));
});
test('civilians flee monsters while warriors defend and monster law disables pursuit',()=>{
  const w=newWorld(9,{empty:true});w.tiles.fill('grass');act(w,'human',70,55);act(w,'zombie',74,55);
  w.rules.reproduction=false;w.rules.oldAge=false;w.rules.hunger=false;w.rules.expansion=false;
  const civilian=w.units.find(u=>u.race==='human'),guard=w.units.find(u=>u.race==='human'&&u!==civilian),monster=w.units.find(u=>u.race==='zombie');
  w.units=[civilian,guard,monster];for(const u of w.units){u.x=70;u.y=55}monster.x=74;civilian.warrior=false;guard.warrior=true;
  advance(w,12);assert.equal(civilian.activity,'Fleeing danger');assert.equal(guard.activity,'Defending');assert.equal(monster.activity,'Hunting');
  w.rules.hostileMonsters=false;advance(w,12);assert.equal(civilian.activity,'Wandering');assert.equal(guard.activity,'Wandering');assert.equal(monster.activity,'Wandering');
});
test('sheep flee wolves, wolves hunt, and creatures react to fire',()=>{
  const w=newWorld(10,{empty:true});w.tiles.fill('grass');act(w,'sheep',70,55);act(w,'wolf',74,55);
  const sheep=w.units.find(u=>u.race==='sheep'),wolf=w.units.find(u=>u.race==='wolf');w.units=[sheep,wolf];sheep.x=70;sheep.y=55;wolf.x=74;wolf.y=55;
  advance(w,12);assert.equal(sheep.activity,'Fleeing danger');assert.equal(wolf.activity,'Hunting');
  w.fires=[{x:Math.floor(wolf.x),y:Math.floor(wolf.y),life:5}];advance(w,12);assert.equal(wolf.activity,'Fleeing fire');
});
test('warriors can actively attack monsters and wounded villagers retreat home',()=>{
  const w=newWorld(11,{empty:true});w.tiles.fill('grass');act(w,'human',70,55);act(w,'zombie',71,55);
  w.rules.reproduction=false;w.rules.hunger=false;w.rules.oldAge=false;w.rules.expansion=false;
  const guard=w.units.find(u=>u.race==='human'),hurt=w.units.find(u=>u.race==='human'&&u!==guard),monster=w.units.find(u=>u.race==='zombie');w.units=[guard,hurt,monster];
  guard.x=70;guard.y=55;guard.warrior=true;monster.x=71;monster.y=55;hurt.x=84;hurt.y=55;hurt.warrior=false;hurt.health=30;
  advance(w,20);assert.ok(monster.health<monster.maxHealth);assert.equal(hurt.activity,'Returning to safety');
});
test('hunters navigate around terrain rather than pushing into a wall',()=>{
  const w=newWorld(9,{empty:true});w.tiles.fill('grass');act(w,'zombie',72,55);act(w,'sheep',78,55);
  const monster=w.units.find(u=>u.race==='zombie'),sheep=w.units.find(u=>u.race==='sheep');w.units=[monster,sheep];monster.x=72;monster.y=55;sheep.x=78;sheep.y=55;
  for(let y=52;y<=58;y++)w.tiles[y*W+75]='mountain';
  for(let i=0;i<130;i++){step(w);assert.notEqual(w.tiles[Math.floor(monster.y)*W+Math.floor(monster.x)],'mountain');}
  assert.ok(monster.x>75,'hunter went around the wall');
});
test('supply chooses a reachable donor when the first donor is isolated',()=>{
  const w=newWorld(7);w.tiles.fill('grass');const capital=w.cities[0];w.kingdoms=w.kingdoms.slice(0,1);w.units=w.units.filter(u=>u.home===capital.id);w.cities=[capital];
  capital.x=10;capital.y=10;capital.food=150;w.rules.reproduction=false;
  const donor={...capital,id:'donor',x:80,y:55,food:150};const receiver={...capital,id:'receiver',x:85,y:55,food:0};w.cities.push(donor,receiver);
  w.tick=159;step(w);assert.ok(receiver.food>0);assert.ok(donor.food<150);assert.equal(capital.food,150);
});
test('buildings persist, affect housing, and can be demolished and blessed',()=>{
  const w=newWorld(31,{empty:true});w.tiles.fill('grass');act(w,'human',70,55);const c=w.cities[0];const pop=w.units.length;
  const house=c.buildings.find(b=>b.type==='house');assert.ok(house);const capacity=villageHousing(c,pop);
  const result=act(w,'demolish',house.x,house.y,1);assert.equal(result.ok,true);assert.equal(house.hp,0);assert.ok(villageHousing(c,pop)<capacity);
  const loaded=restoreWorld(JSON.parse(JSON.stringify(w))),ruin=loaded.cities[0].buildings.find(b=>b.key===house.key);assert.equal(ruin.hp,0);assert.equal(loaded.version,4);
  act(loaded,'heal',ruin.x,ruin.y,2);assert.equal(ruin.hp,100);assert.equal(villageHousing(loaded.cities[0],pop),capacity);
  const bad=JSON.parse(JSON.stringify(w));bad.cities[0].buildings[0].type='invalid';assert.throws(()=>restoreWorld(bad),/buildings/);
});
test('fire damages buildings and villagers rebuild ruins using resources',()=>{
  const w=newWorld(32,{empty:true});w.tiles.fill('grass');act(w,'human',70,55);w.rules.fireSpread=false;w.rules.reproduction=false;w.rules.expansion=false;
  const c=w.cities[0],house=c.buildings.find(b=>b.type==='house');w.fires=[{x:house.x,y:house.y,life:5}];w.tick=9;step(w);assert.equal(house.hp,75);
  house.hp=0;w.fires=[];c.wood=0;c.stone=0;w.tick=39;step(w);assert.equal(house.hp,0);
  c.wood=10;c.stone=5;w.tick=39;step(w);assert.equal(house.hp,100);assert.ok(c.stone<5);
});
test('destroyed watchtowers stop defending until restored',()=>{
  const w=newWorld(33,{empty:true});w.tiles.fill('grass');act(w,'human',70,55);const c=w.cities[0];for(let i=0;i<3;i++)inspireVillage(w,c.id);
  const tower=c.buildings.find(b=>b.type==='tower');assert.ok(tower);tower.hp=0;act(w,'dragon',74,55);const dragon=w.units.find(u=>u.race==='dragon');dragon.x=74;dragon.y=55;
  w.tick=19;step(w);assert.equal(dragon.health,dragon.maxHealth);act(w,'heal',tower.x,tower.y,2);w.tick=19;step(w);assert.equal(dragon.health,dragon.maxHealth-12);
});
test('old saves migrate into buildings and kingdom knowledge with succession',()=>{
  const w=newWorld(34,{empty:true});w.tiles.fill('grass');act(w,'human',70,55);w.rules.reproduction=false;w.rules.expansion=false;w.rules.oldAge=false;
  const raw=JSON.parse(JSON.stringify(w));raw.version=3;for(const c of raw.cities)delete c.buildings;for(const k of raw.kingdoms){delete k.techLevel;delete k.research;delete k.rulerId}
  const restored=restoreWorld(raw),k=restored.kingdoms[0];assert.ok(restored.cities[0].buildings.length>=5);assert.equal(k.techLevel,0);
  for(const u of restored.units)u.age=20;k.research=34.9;restored.tick=159;step(restored);assert.equal(k.techLevel,1);assert.ok(k.rulerId);
  const old=k.rulerId;restored.units.find(u=>u.id===old).health=0;restored.tick=159;step(restored);assert.ok(k.rulerId);assert.notEqual(k.rulerId,old);
  const again=restoreWorld(JSON.parse(JSON.stringify(restored)));assert.equal(again.kingdoms[0].techLevel,1);assert.equal(again.kingdoms[0].rulerId,k.rulerId);
});
test('generated rivers reach existing water and climate is reproducible',()=>{
  const seed=123,world=newWorld(seed),same=newWorld(seed),withoutRivers=newWorld(seed,{rivers:false});
  assert.deepEqual(world.tiles,same.tiles);
  const river=new Set();for(let i=0;i<world.tiles.length;i++)if(world.tiles[i]==='water'&&withoutRivers.tiles[i]!=='water')river.add(i);
  assert.ok(river.size>0);assert.ok(world.tiles.includes('desert'));assert.ok(world.tiles.includes('snow'));
  const seen=new Set(),queue=[];for(const i of river){const x=i%W,y=Math.floor(i/W);for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)continue;const tile=withoutRivers.tiles[ny*W+nx];if(tile==='water'||tile==='deep'){seen.add(i);queue.push(i);break;}}}
  for(let h=0;h<queue.length;h++){const i=queue[h],x=i%W,y=Math.floor(i/W);for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,ni=ny*W+nx;if(nx>=0&&ny>=0&&nx<W&&ny<H&&river.has(ni)&&!seen.has(ni)){seen.add(ni);queue.push(ni);}}}
  assert.equal(seen.size,river.size,'all generated rivers connect to existing water');
});
