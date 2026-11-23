export const W = 180, H = 115, T = 6;
export const DEFAULT_RULES = Object.freeze({ reproduction: true, oldAge: true, hunger: true, expansion: true, diplomacy: true, rebellions: true, fireSpread: true, hostileMonsters: true, naturalDisasters: false });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const hash = (x, y, s = 1) => { const n = Math.sin(x * 127.1 + y * 311.7 + s * 73.13) * 43758.5453; return n - Math.floor(n); };
const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
const isLand = t => t && t !== 'deep' && t !== 'water' && t !== 'mountain';
const tileAt = (w, x, y) => x<0||y<0||x>=W||y>=H ? undefined : w.tiles[Math.floor(y) * W + Math.floor(x)];
function noise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y); let fx = x - ix, fy = y - iy;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy, s), b = hash(ix + 1, iy, s), c = hash(ix, iy + 1, s), d = hash(ix + 1, iy + 1, s);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}
const races = { human: {color:'#e4b577',shirt:'#d4e6ef'}, elf:{color:'#ead4a3',shirt:'#94d66e'}, dwarf:{color:'#e6aa76',shirt:'#db9b62'}, orc:{color:'#a5c36d',shirt:'#bc7771'}, sheep:{color:'#f6ead2',shirt:'#ddd'}, wolf:{color:'#b2a998',shirt:'#716d68'}, zombie:{color:'#a0b967',shirt:'#697c52'}, skeleton:{color:'#eee9c9',shirt:'#d6d0b9'}, dragon:{color:'#cc704d',shirt:'#923c36'} };
export const CIVILIZED = ['human', 'elf', 'dwarf', 'orc'];
export const MONSTERS = ['zombie','skeleton','dragon'];
// These are Worldforge's simplified settlement tiers, not WorldBox's exact building rules.
export const CIV_STAGES = [
  {tier:1,name:'Camp',population:0,housing:20,hall:1,cost:{},buildings:['Bonfire','Homes','Town hall I']},
  {tier:2,name:'Hamlet',population:12,housing:28,hall:1,cost:{wood:8,stone:3,iron:0,gold:0},buildings:['Farms','Stockpile']},
  {tier:3,name:'Village',population:22,housing:38,hall:2,cost:{wood:12,stone:8,iron:2,gold:0},buildings:['Windmill','Mine','Town hall II']},
  {tier:4,name:'Town',population:32,housing:48,hall:2,cost:{wood:18,stone:14,iron:4,gold:3},buildings:['Watchtower','Barracks']},
  {tier:5,name:'City',population:42,housing:58,hall:3,cost:{wood:24,stone:20,iron:6,gold:6},buildings:['Market','Town hall III']},
  {tier:6,name:'Grand city',population:52,housing:70,hall:3,cost:{wood:30,stone:25,iron:10,gold:10},buildings:['Temple','Grand homes']},
];

const names = ['Eldoria', 'Valewood', 'Khaz Modan', 'The Red March'];
const colors = ['#e6c66f', '#8ccf83', '#d5a1df', '#e78975', '#91bfdf', '#e6a5b0'];
const settlementSuffixes = ['Reach', 'Haven', 'Crossing', 'Grove', 'Watch', 'Ford'];
const firstNames = ['Ari', 'Bryn', 'Cora', 'Dara', 'Eli', 'Fenn', 'Galen', 'Hale', 'Ira', 'Jora', 'Kora', 'Lio', 'Mira', 'Neri', 'Orin', 'Perrin', 'Runa', 'Sora', 'Tarin', 'Vera'];
const randomName = () => firstNames[Math.floor(Math.random() * firstNames.length)];
function event(w, title, detail) {
  w.events.unshift({title, detail, year: Math.floor(w.year)});
  w.events = w.events.slice(0, 60);
}
function findLand(w, x, y, maxRadius = 45) {
  // Prefer fertile ground for a viable starting food supply, then fall back to hills.
  for (const types of [['grass','forest'], ['hill']]) for (let r = 0; r < maxRadius; r++) for (let a = 0; a < 25; a++) {
    const xx = clamp(Math.round(x + Math.cos(a * 6.28 / 25) * r), 1, W - 2), yy = clamp(Math.round(y + Math.sin(a * 6.28 / 25) * r), 1, H - 2);
    if (types.includes(tileAt(w, xx, yy))) return {x:xx, y:yy};
  }
  return null;
}
function spawn(w, x, y, race, kid = null, home = null, newborn = false) {
  if (w.units.length >= 650 || !races[race] || !isLand(tileAt(w, x, y))) return null;
  const traits=[];
  if(CIVILIZED.includes(race)){if(Math.random()<.12)traits.push('Strong');if(Math.random()<.08)traits.push('Immune');if(Math.random()<.10)traits.push('Long-lived');}
  const maxHealth=race==='dragon'?240:traits.includes('Strong')?125:100;
  const u = {id:id(), name:randomName(), x:clamp(x + (Math.random()-.5)*1.5, 1, W-2), y:clamp(y + (Math.random()-.5)*1.5, 1, H-2), race, kid, home, age:newborn ? 0 : 12 + Math.random()*22, dir:Math.random()*6.28, health:maxHealth, maxHealth, traits, infected:false, infectionAge:0, zombieInfection:false, blessed:false, cursed:false, favorite:false, warrior: CIVILIZED.includes(race) && Math.random() < .32, kills:0};
  w.units.push(u); return u;
}
function foundCity(w, x, y, race, initial = false, index) {
  const i = index ?? w.kingdoms.length;
  const k = {id:id(), name:names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''), race, color:colors[i % colors.length], atWar:false, founded:Math.floor(w.year)};
  w.kingdoms.push(k);
  const c = {id:id(), x, y, kid:k.id, name:k.name, level:1, food:60, loyalty:100, wood:20, stone:15, iron:0, gold:0, hp:100, founded:Math.floor(w.year), lastExpansion:Math.floor(w.year)};
  w.cities.push(c);
  for (let j = 0; j < (initial ? 14 : 8); j++) spawn(w, x, y, race, k.id, c.id);
  if (!initial) event(w, `${k.name} was founded`, `A new ${race} settlement rises.`);
  return c;
}
export function newWorld(seed = Math.random() * 10000, options = {}) {
  const tiles = [], decor = [];
  for (let y=0; y<H; y++) for (let x=0; x<W; x++) {
    const n = noise(x/31,y/31,seed)*.53 + noise(x/14,y/14,seed+3)*.27 + noise(x/6,y/6,seed+9)*.13 + noise(x/2.5,y/2.5,seed+4)*.07;
    const blobs = [[.29,.36,.29,.31],[.65,.36,.30,.28],[.50,.72,.32,.27],[.85,.77,.17,.17],[.10,.78,.13,.13]];
    let land=0; for (const [cx,cy,rx,ry] of blobs) land = Math.max(land, 1-Math.sqrt(((x/W-cx)/rx)**2+((y/H-cy)/ry)**2));
    const v=land*.72+n*.63;
    let type=v<.35?'deep':v<.43?'water':v<.48?'sand':v<.75?'grass':v<.87?'forest':v<.96?'hill':'mountain';
    if(type==='mountain' && noise(x/11,y/11,seed+42)>.65) type='snow';
    tiles.push(options.empty?'deep':type); decor.push(hash(x,y,seed+18));
  }
  const w = {version:3, seed, tiles, decor, units:[], cities:[], kingdoms:[], wars:[], resources:[], fires:[], rules:{...DEFAULT_RULES}, year:1, events:[], effects:[], tick:0};
  if(options.empty){event(w,'An empty world awaits','Shape the ocean into a world of your own.');return w;}
  [[.30,.37],[.67,.32],[.51,.72],[.80,.72]].forEach((p,i)=>{
    const pt=findLand(w,Math.floor(W*p[0]),Math.floor(H*p[1]));
    if(pt) foundCity(w,pt.x,pt.y,CIVILIZED[i],true,i);
  });
  for (const c of w.cities.slice(0, 2)) {
    const p=findLand(w,c.x+7,c.y+6,12);
    if(p) for(let i=0;i<3;i++) spawn(w,p.x,p.y,'sheep');
  }
  for(const c of w.cities) for(const [dx,dy,type] of [[5,4,'stone'],[-6,3,'iron'],[3,-6,'gold']]){const p=findLand(w,c.x+dx,c.y+dy,8);if(p)addResource(w,p.x,p.y,type);}
  event(w,'A new world awakens','The first settlements have found their home.');
  return w;
}
// Validate and migrate saves written by the first prototype before replacing the live world.
export function restoreWorld(data) {
  const validTile=new Set(['deep','water','sand','grass','forest','hill','mountain','snow','desert','scorched','enchanted','corrupted','infernal']);
  const coords=o=>o&&Number.isFinite(o.x)&&Number.isFinite(o.y)&&o.x>=0&&o.x<W&&o.y>=0&&o.y<H;
  const validId=v=>typeof v==='string'||typeof v==='number';
  if (!data || (data.version!=null&&(!Number.isInteger(data.version)||data.version>3)) || !Array.isArray(data.tiles) || data.tiles.length !== W*H || data.tiles.some(t=>!validTile.has(t)) || !Array.isArray(data.decor) || data.decor.length !== W*H || data.decor.some(v=>!Number.isFinite(v)||v<0||v>=1) || !Array.isArray(data.units) || data.units.length>650 || !Array.isArray(data.cities) || data.cities.length>100 || !Array.isArray(data.kingdoms) || data.kingdoms.length>100) throw new Error('Invalid world save');
  if(data.units.some(u=>!coords(u)||!Object.hasOwn(races,u.race)||!Number.isFinite(u.age)||!Number.isFinite(u.dir)) || data.cities.some(c=>!coords(c)||!validId(c.id)||!validId(c.kid)||typeof c.name!=='string'||!Number.isInteger(c.level)||c.level<1||c.level>6) || data.kingdoms.some(k=>!k||!validId(k.id)||typeof k.name!=='string'||!CIVILIZED.includes(k.race)||typeof k.color!=='string'||!/^#[0-9a-f]{6}$/i.test(k.color)))throw new Error('Invalid world entities');
  if(data.resources!=null&&(!Array.isArray(data.resources)||data.resources.length>300||data.resources.some(r=>!coords(r)||!Number.isInteger(r.x)||!Number.isInteger(r.y)||!['stone','iron','gold'].includes(r.type)||!Number.isFinite(r.amount)||r.amount<=0)))throw new Error('Invalid resources');
  if(data.fires!=null&&(!Array.isArray(data.fires)||data.fires.length>300||data.fires.some(f=>!coords(f)||!Number.isInteger(f.x)||!Number.isInteger(f.y)||!Number.isFinite(f.life)||f.life<=0||f.life>5)))throw new Error('Invalid fires');
  data.version=3; data.resources=Array.isArray(data.resources)?data.resources:[]; data.fires=Array.isArray(data.fires)?data.fires:[];
  data.rules=Object.fromEntries(Object.entries(DEFAULT_RULES).map(([key,value])=>[key,typeof data.rules?.[key]==='boolean'?data.rules[key]:value]));
  data.wars=Array.isArray(data.wars)?data.wars.filter(war=>war&&validId(war.a)&&validId(war.b)&&Number.isFinite(war.since)).slice(0,5000):[];
  data.events=Array.isArray(data.events)?data.events.filter(e=>e&&typeof e.title==='string'&&typeof e.detail==='string'&&Number.isFinite(e.year)).slice(0,60):[]; data.effects=[]; data.tick=Number.isFinite(data.tick)?data.tick:0; data.year=Number.isFinite(data.year)?data.year:1;
  for (const c of data.cities) { c.food=Number.isFinite(c.food)?c.food:60; c.loyalty=Number.isFinite(c.loyalty)?clamp(c.loyalty,0,100):100; c.hp=Number.isFinite(c.hp)?c.hp:100; for(const key of ['wood','stone','iron','gold'])c[key]=Number.isFinite(c[key])?c[key]:(key==='wood'?20:key==='stone'?15:0); c.founded??=1; c.lastExpansion??=data.year; }
  for (const u of data.units) { u.id??=id(); u.name??=randomName(); u.health=Number.isFinite(u.health)?u.health:100; u.maxHealth=Number.isFinite(u.maxHealth)&&u.maxHealth>0?u.maxHealth:100; u.traits=Array.isArray(u.traits)?u.traits.filter(t=>typeof t==='string').slice(0,20):[]; u.zombieInfection??=false; u.blessed??=false; u.cursed??=false; u.favorite??=false; u.infectionAge??=0; u.warrior??=false; u.kills??=0; u.activity='Wandering'; if(!u.home && u.kid) u.home=data.cities.find(c=>c.kid===u.kid)?.id ?? null; }
  syncWarFlags(data); return data;
}
function syncWarFlags(w) { for(const k of w.kingdoms) k.atWar=w.wars.some(war=>war.a===k.id||war.b===k.id); }
function enemies(w,a,b) { return !!a && !!b && a!==b && w.wars.some(war=>(war.a===a&&war.b===b)||(war.a===b&&war.b===a)); }
function startWar(w,a,b,announce=true) {
  if(!a || !b || a.id===b.id || enemies(w,a.id,b.id)) return;
  w.wars.push({a:a.id,b:b.id,since:w.year}); syncWarFlags(w);
  if(announce) event(w,'War breaks out',`${a.name} and ${b.name} have taken up arms.`);
}
function endWar(w,war,announce=true) {
  w.wars=w.wars.filter(item=>item!==war); syncWarFlags(w);
  if(announce) { const a=w.kingdoms.find(k=>k.id===war.a),b=w.kingdoms.find(k=>k.id===war.b); if(a&&b) event(w,'Peace is declared',`${a.name} and ${b.name} have ended their war.`); }
}
// Flood fill prevents settlements and raids from crossing oceans or impassable mountains.
function reachable(w, x1,y1,x2,y2,limit=55) {
  if(!isLand(tileAt(w,x1,y1))||!isLand(tileAt(w,x2,y2))) return false;
  const sx=Math.floor(x1),sy=Math.floor(y1),tx=Math.floor(x2),ty=Math.floor(y2);
  if(Math.abs(tx-sx)+Math.abs(ty-sy)>limit*2) return false;
  const seen=new Uint8Array(W*H), queue=[sy*W+sx]; seen[queue[0]]=1;
  for(let head=0;head<queue.length;head++) {
    const i=queue[head], x=i%W, y=Math.floor(i/W); if(x===tx&&y===ty) return true;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx=x+dx,ny=y+dy,ni=ny*W+nx;
      if(nx<0||ny<0||nx>=W||ny>=H||Math.abs(nx-sx)+Math.abs(ny-sy)>limit||seen[ni]||!isLand(w.tiles[ni])) continue;
      seen[ni]=1;queue.push(ni);
    }
  } return false;
}
function expand(w,c,residents) {
  const k=w.kingdoms.find(k=>k.id===c.kid); if(!k) return;
  let best=null,bestScore=-Infinity;
  // Compare several reachable sites instead of settling at the first viable point.
  for(let attempt=0;attempt<20;attempt++) {
    const angle=Math.random()*Math.PI*2, distance=18+Math.random()*8;
    const x=Math.round(c.x+Math.cos(angle)*distance), y=Math.round(c.y+Math.sin(angle)*distance);
    if(x<4||y<4||x>=W-4||y>=H-4||!['grass','forest','hill'].includes(tileAt(w,x,y)) || w.cities.some(other=>Math.hypot(other.x-x,other.y-y)<15))continue;
    let fertile=0,wood=0;
    for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const t=tileAt(w,x+dx,y+dy);if(['grass','forest','enchanted'].includes(t))fertile++;if(t==='forest'||t==='enchanted')wood++;}
    const threats=w.fires.filter(f=>Math.hypot(f.x-x,f.y-y)<7).length, rival=w.cities.filter(other=>other.kid!==c.kid&&Math.hypot(other.x-x,other.y-y)<25).length;
    const score=fertile+wood*.3-threats*12-rival*10-distance*.15;
    if(score>bestScore&&reachable(w,c.x,c.y,x,y,45)){best={x,y};bestScore=score;}
  }
  if(best){const {x,y}=best;
    const n=w.cities.filter(city=>city.kid===k.id).length;
    const city={id:id(),x,y,kid:k.id,name:`${k.name.startsWith('The ')?k.name:k.name.split(' ')[0]} ${settlementSuffixes[(n-1)%settlementSuffixes.length]}`,level:1,food:45,loyalty:75,wood:15,stone:10,iron:0,gold:0,hp:100,founded:Math.floor(w.year),lastExpansion:w.year};
    w.cities.push(city); c.lastExpansion=w.year;
    for(const u of residents.slice(0,6)) {u.home=city.id;u.x=x+(Math.random()-.5)*2;u.y=y+(Math.random()-.5)*2;}
    event(w,`${city.name} was founded`,`${k.name} sends settlers to new lands.`);return;
  }
  c.lastExpansion=w.year; // avoid retrying every tick if isolated
}
function rebel(w,c) {
  const parent=w.kingdoms.find(k=>k.id===c.kid),siblings=w.cities.filter(city=>city.kid===c.kid);
  if(!parent||siblings.length<2||siblings[0].id===c.id)return false;
  const n=w.kingdoms.length, k={id:id(),name:`${c.name} Freehold`,race:parent.race,color:colors[n%colors.length],atWar:false,founded:Math.floor(w.year)};
  w.kingdoms.push(k);c.kid=k.id;c.loyalty=100;c.lastExpansion=w.year;
  for(const u of w.units)if(u.home===c.id)u.kid=k.id;
  startWar(w,parent,k,false);event(w,`${c.name} declares independence`,`${k.name} rebels against ${parent.name}.`);return true;
}
function supplyVillages(w){
  for(const k of w.kingdoms){
    const cities=w.cities.filter(c=>c.kid===k.id),receivers=cities.filter(c=>c.food<30).sort((a,b)=>a.food-b.food);
    for(const receiver of receivers){
      const givers=cities.filter(c=>c!==receiver&&c.food>100&&Math.hypot(c.x-receiver.x,c.y-receiver.y)<=40).sort((a,b)=>Math.hypot(a.x-receiver.x,a.y-receiver.y)-Math.hypot(b.x-receiver.x,b.y-receiver.y));
      const giver=givers.find(c=>reachable(w,c.x,c.y,receiver.x,receiver.y,55));if(!giver)continue;
      const amount=Math.min(giver.level>=5?25:15,giver.food-100,30-receiver.food);giver.food-=amount;receiver.food+=amount;
      if(w.year-(receiver.lastAid??0)>15){receiver.lastAid=w.year;event(w,`${receiver.name} receives supplies`,`Food arrives from ${giver.name}.`);}
    }
  }
}
function upgradeVillage(w,c,population) {
  const next=CIV_STAGES[c.level];
  if(!next||population<next.population||!Object.entries(next.cost).every(([key,amount])=>c[key]>=amount))return false;
  for(const [key,amount] of Object.entries(next.cost))c[key]-=amount;
  c.level=next.tier;event(w,`${c.name} became a ${next.name.toLowerCase()}`,`Tier ${next.tier} unlocked: ${next.buildings.join(', ')}.`);return true;
}
// A god-sandbox shortcut: supplies and settlers are granted explicitly by the player.
export function inspireVillage(w,cityId) {
  const c=w.cities.find(city=>city.id===cityId),k=c&&w.kingdoms.find(kingdom=>kingdom.id===c.kid);
  if(!c||!k)return {ok:false,message:'Choose an existing settlement first.'};
  const next=CIV_STAGES[c.level];if(!next)return {ok:false,message:`${c.name} is already at the highest tier.`};
  if(!isLand(tileAt(w,c.x,c.y)))return {ok:false,message:'The settlement needs walkable land.'};
  const population=w.units.filter(u=>u.home===c.id&&u.health>0).length,needed=Math.max(0,next.population-population);
  if(w.units.length+needed>650)return {ok:false,message:'The world has reached its 650 creature limit.'};
  for(let i=0;i<needed;i++)spawn(w,c.x,c.y,k.race,k.id,c.id);
  for(const [key,amount] of Object.entries(next.cost))c[key]=Math.max(c[key],amount);
  c.food=Math.min(150,c.food+30);
  if(!upgradeVillage(w,c,population+needed))return {ok:false,message:'This settlement could not advance.'};
  return {ok:true,message:`${c.name} advanced to tier ${c.level}: ${next.name}.`};
}
function addResource(w,x,y,type) {
  x=Math.floor(x);y=Math.floor(y);
  if(!isLand(tileAt(w,x,y)) || w.resources.length>=300 || w.resources.some(r=>r.x===x&&r.y===y))return false;
  w.resources.push({id:id(),x,y,type,amount:30});return true;
}
const flammable = t => ['grass','forest','enchanted','corrupted'].includes(t);
function ignite(w,x,y) {
  x=Math.floor(x);y=Math.floor(y);
  if(x<0||y<0||x>=W||y>=H||!flammable(tileAt(w,x,y))||w.fires.length>=300||w.fires.some(f=>f.x===x&&f.y===y))return;
  w.fires.push({x,y,life:5});
}
function updateFires(w) {
  if(!w.fires.length)return;
  let terrainChanged=false;
  for(const f of [...w.fires]) {
    if(!flammable(tileAt(w,f.x,f.y))){f.life=0;continue;}
    for(const u of w.units)if(u.race!=='dragon'&&Math.abs(u.x-f.x)<1.1&&Math.abs(u.y-f.y)<1.1)u.health-=9;
    for(const c of w.cities)if(Math.hypot(c.x-f.x,c.y-f.y)<2)c.hp-=2;
    f.life--;
    if(w.rules.fireSpread&&Math.random()<.32){const [dx,dy]=[[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)];ignite(w,f.x+dx,f.y+dy);}
    if(f.life<=0){w.tiles[f.y*W+f.x]='scorched';terrainChanged=true;}
  }
  w.fires=w.fires.filter(f=>f.life>0);
  if(terrainChanged)w.terrainRevision=(w.terrainRevision||0)+1;
  const burned=w.cities.filter(c=>c.hp<=0);
  if(burned.length){for(const c of burned)event(w,`${c.name} burned down`,'The settlement was destroyed by fire.');w.cities=w.cities.filter(c=>c.hp>0);reconcile(w);}
}
function monsterCombat(w) {
  if(!w.rules.hostileMonsters)return;
  for(const c of w.cities.filter(city=>city.level>=4)){const enemy=w.units.find(u=>MONSTERS.includes(u.race)&&u.health>0&&Math.hypot(u.x-c.x,u.y-c.y)<6);if(enemy)enemy.health-=12;}
  for(const guard of w.units.filter(u=>u.warrior&&u.health>0&&u.activity==='Defending')) {const monster=w.units.find(v=>MONSTERS.includes(v.race)&&v.health>0&&Math.hypot(v.x-guard.x,v.y-guard.y)<1.7);if(monster){monster.health-=guard.traits.includes('Strong')?20:13;if(monster.health<=0)guard.kills++;}}
  for(const monster of w.units.filter(u=>MONSTERS.includes(u.race)&&u.health>0)) {
    const victim=w.units.find(u=>!MONSTERS.includes(u.race)&&u.health>0&&Math.hypot(u.x-monster.x,u.y-monster.y)<1.7);
    if(!victim)continue;
    victim.health-=monster.race==='dragon'?35:monster.race==='skeleton'?24:18;
    if(monster.race==='zombie'&&!victim.traits.includes('Immune')&&Math.random()<.5)victim.zombieInfection=true;
    if(victim.warrior || victim.race==='wolf')monster.health-=victim.traits.includes('Strong')?24:15;
    if(victim.health<=0)monster.kills++;
    if(monster.race==='dragon')ignite(w,victim.x,victim.y);
  }
}
export function act(w,tool,x,y,size=3) {
  x=Math.floor(x);y=Math.floor(y); if(x<0||y<0||x>=W||y>=H)return;
  const terrain={water:'water',deep:'deep',sand:'sand',soil:'grass',forest:'forest',mountain:'mountain',snow:'snow',desert:'desert',enchanted:'enchanted',corrupted:'corrupted',infernal:'infernal'};
  if(terrain[tool]) { w.terrainRevision=(w.terrainRevision||0)+1; for(let dy=-size;dy<=size;dy++)for(let dx=-size;dx<=size;dx++){const xx=x+dx,yy=y+dy;if(xx>=0&&xx<W&&yy>=0&&yy<H&&dx*dx+dy*dy<=size*size*(.85+Math.random()*.3))w.tiles[yy*W+xx]=terrain[tool];} w.resources=w.resources.filter(r=>isLand(tileAt(w,r.x,r.y))); return; }
  if(races[tool]) {
    if(!isLand(tileAt(w,x,y))) return;
    if(CIVILIZED.includes(tool)) {
      const near=w.cities.find(c=>Math.hypot(c.x-x,c.y-y)<12&&w.kingdoms.find(k=>k.id===c.kid)?.race===tool);
      if(!near) foundCity(w,x,y,tool); else for(let i=0;i<3;i++)spawn(w,x,y,tool,near.kid,near.id);
    } else for(let i=0;i<(tool==='dragon'?1:MONSTERS.includes(tool)?2:4);i++)spawn(w,x,y,tool);
    return;
  }
  if(['immortal','strong','immune','curse','resetTraits'].includes(tool)){
    for(const u of w.units)if(Math.hypot(u.x-x,u.y-y)<size*2){
      if(tool==='curse'){u.cursed=true;u.blessed=false;continue;}
      if(tool==='resetTraits'){u.traits=[];u.blessed=false;u.cursed=false;u.maxHealth=u.race==='dragon'?240:100;u.health=Math.min(u.health,u.maxHealth);continue;}
      const trait={immortal:'Immortal',strong:'Strong',immune:'Immune'}[tool];
      if(!u.traits.includes(trait))u.traits.push(trait);
      if(tool==='strong'){u.maxHealth=Math.max(u.maxHealth,125);u.health=u.maxHealth;}
      if(tool==='immune'){u.infected=false;u.infectionAge=0;u.zombieInfection=false;}
    }
    w.effects.push({x,y,type:tool==='curse'?'plague':'heal',life:35});return;
  }
  if(['stone','iron','gold'].includes(tool)){addResource(w,x,y,tool);return;}
  if(tool==='tree'||tool==='flower') {w.terrainRevision=(w.terrainRevision||0)+1;for(let dy=-size;dy<=size;dy++)for(let dx=-size;dx<=size;dx++){const xx=x+dx,yy=y+dy,idx=yy*W+xx;if(xx>=0&&xx<W&&yy>=0&&yy<H&&dx*dx+dy*dy<=size*size&&['grass','forest'].includes(w.tiles[idx])){w.tiles[idx]=tool==='tree'?'forest':'grass';w.decor[idx]=tool==='flower'?.985:Math.random()*.25;}}return;}
  if(tool==='heal'){w.units.forEach(u=>{if(Math.hypot(u.x-x,u.y-y)<size*2){u.health=u.maxHealth;u.infected=false;u.infectionAge=0;u.zombieInfection=false;u.cursed=false;u.blessed=true;}});w.effects.push({x,y,type:'heal',life:35});return;}
  if(tool==='rain'){w.fires=w.fires.filter(f=>Math.hypot(f.x-x,f.y-y)>size*2);w.terrainRevision=(w.terrainRevision||0)+1;for(let dy=-size*2;dy<=size*2;dy++)for(let dx=-size*2;dx<=size*2;dx++){const xx=x+dx,yy=y+dy;if(xx>=0&&xx<W&&yy>=0&&yy<H&&w.tiles[yy*W+xx]==='desert')w.tiles[yy*W+xx]='grass';}w.effects.push({x,y,type:'rain',life:40});return;}
  if(tool==='fire'){ignite(w,x,y);for(let dy=-size;dy<=size;dy++)for(let dx=-size;dx<=size;dx++)if(dx*dx+dy*dy<=size*size&&Math.random()<.5)ignite(w,x+dx,y+dy);event(w,'Fire sweeps the land','Flames spread until they burn out or rain puts them out.');return;}
  if(tool==='war'){for(let i=0;i<w.kingdoms.length;i++)for(let j=i+1;j<w.kingdoms.length;j++)startWar(w,w.kingdoms[i],w.kingdoms[j],false);event(w,'The drums of war','The kingdoms have turned against each other.');return;}
  if(tool==='inspire'){const c=w.cities.find(city=>Math.hypot(city.x-x,city.y-y)<=Math.max(5,size*2));return c?inspireVillage(w,c.id):{ok:false,message:'Click near a settlement to inspire it.'};}
  if(tool==='rebellion'){const c=w.cities.find(city=>Math.hypot(city.x-x,city.y-y)<=Math.max(5,size*2));if(c)rebel(w,c);return;}
  if(tool==='peace'){w.wars=[];syncWarFlags(w);event(w,'A time of peace','The kingdoms have laid down their arms.');return;}
  if(tool==='inspect')return;
  if(tool==='erase'){w.units=w.units.filter(u=>Math.hypot(u.x-x,u.y-y)>size);w.cities=w.cities.filter(c=>Math.hypot(c.x-x,c.y-y)>size);reconcile(w);return;}
  if(!['fire','lightning','meteor','bomb','plague','tornado'].includes(tool))return;
  const radius=tool==='bomb'?10:tool==='meteor'?7:tool==='lightning'?3:tool==='tornado'?6:4;
  if(tool==='plague'){w.units.forEach(u=>{if(Math.hypot(u.x-x,u.y-y)<size*2&&!u.traits.includes('Immune')&&!MONSTERS.includes(u.race)){u.infected=true;u.infectionAge=0;}});event(w,'A plague spreads','A mysterious sickness has appeared.');}
  else {
    w.units=w.units.filter(u=>Math.hypot(u.x-x,u.y-y)>radius*(.7+Math.random()*.3));
    if(['bomb','meteor','lightning'].includes(tool)){
      w.terrainRevision=(w.terrainRevision||0)+1;
      for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++){const xx=x+dx,yy=y+dy;if(xx>=0&&xx<W&&yy>=0&&yy<H&&dx*dx+dy*dy<radius*radius*(.75+Math.random()*.3)){const idx=yy*W+xx;if(!['deep','water'].includes(w.tiles[idx]))w.tiles[idx]=tool==='bomb'?'water':'scorched';}}
      w.cities=w.cities.filter(c=>Math.hypot(c.x-x,c.y-y)>radius*.8);w.resources=w.resources.filter(r=>Math.hypot(r.x-x,r.y-y)>radius);reconcile(w);
    }
    event(w,tool==='bomb'?'A terrible explosion':tool==='meteor'?'A meteor strikes':tool==='lightning'?'Lightning strikes':tool==='tornado'?'A tornado touches down':'Fire sweeps the land','The world trembles at your touch.');
  }
  w.effects.push({x,y,type:tool,life:45});
}
function reconcile(w) {
  for(const k of [...w.kingdoms]) {
    if(!w.cities.some(c=>c.kid===k.id)) {
      w.kingdoms=w.kingdoms.filter(other=>other.id!==k.id);
      w.wars=w.wars.filter(war=>war.a!==k.id&&war.b!==k.id);
      for(const u of w.units) if(u.kid===k.id){u.kid=null;u.home=null;}
      event(w,`${k.name} has fallen`,'Its last settlement has been lost.');
    }
  }
  for(const u of w.units) if(u.kid&&!w.cities.some(c=>c.id===u.home)) u.home=w.cities.find(c=>c.kid===u.kid)?.id??null;
  syncWarFlags(w);
}
function cityEconomy(w,c) {
  const residents=w.units.filter(u=>u.home===c.id && u.health>0), k=w.kingdoms.find(k=>k.id===c.kid); if(!k) return;
  if(!residents.length){c.abandonedSince??=w.year;if(w.year-c.abandonedSince>7){w.cities=w.cities.filter(other=>other.id!==c.id);event(w,`${c.name} was abandoned`,'No villagers remain to keep the settlement alive.');}return;}
  c.abandonedSince=null;
  const capital=w.cities.find(city=>city.kid===c.kid);
  if(capital?.id===c.id)c.loyalty=100;else if(capital){const distance=Math.hypot(c.x-capital.x,c.y-capital.y);const target=clamp(100-Math.max(0,distance-12)*1.5-(k.atWar?20:0)-(c.food<5?25:0),0,100);c.loyalty=clamp(c.loyalty+(target-c.loyalty)*.1,0,100);if(w.rules.rebellions&&c.loyalty<45&&Math.random()<.08){rebel(w,c);return;}}
  if(c.food>10)c.hp=Math.min(100,c.hp+.5);
  let fertile=0, forest=0;
  for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const x=c.x+dx,y=c.y+dy;if(x>=0&&x<W&&y>=0&&y<H){const t=tileAt(w,x,y);if(['grass','forest','enchanted'].includes(t))fertile++;if(t==='forest'||t==='enchanted')forest++;}}
  c.wood=clamp(c.wood+.5+forest*.08,0,150);
  if(c.level>=3){c.stone=clamp(c.stone+.8,0,150);c.iron=clamp(c.iron+.25,0,150);c.gold=clamp(c.gold+.14,0,150);}
  for(const r of w.resources){if(r.amount>0&&Math.hypot(r.x-c.x,r.y-c.y)<10){const n=Math.min(r.amount,1+residents.length*.04);r.amount-=n;c[r.type]=clamp(c[r.type]+n,0,150);}}
  w.resources=w.resources.filter(r=>r.amount>0);
  const harvest=2+fertile*.20+(c.level>=2?2:0)+(c.level>=3?3:0);
  c.food=clamp(c.food+harvest-(w.rules.hunger?residents.length*.34:0),0,150);
  if(w.rules.hunger && c.food<1) for(const u of residents) u.health-=12;
  else for(const u of residents) if(!u.infected) u.health=Math.min(u.maxHealth,u.health+(c.level>=6?4:2));
  if(c.level>=4&&residents.filter(u=>u.warrior).length<Math.floor(residents.length*.35)){const recruit=residents.find(u=>!u.warrior&&u.age>=16);if(recruit)recruit.warrior=true;}
  if(w.rules.reproduction && residents.length>=2 && residents.length<CIV_STAGES[c.level-1].housing && c.food>8 && Math.random()<.9){
    if(spawn(w,c.x,c.y,k.race,k.id,c.id,true))c.food=Math.max(0,c.food-3);
  }
  upgradeVillage(w,c,residents.length);
  if(w.rules.expansion && residents.length>=27 && w.year-c.lastExpansion>15 && w.cities.filter(city=>city.kid===k.id).length<4) expand(w,c,residents);
}
function resolveWars(w) {
  for(const war of [...w.wars]) {
    const a=w.kingdoms.find(k=>k.id===war.a),b=w.kingdoms.find(k=>k.id===war.b); if(!a||!b){endWar(w,war,false);continue;}
    if(w.rules.diplomacy && w.year-war.since>24 && Math.random()<.2){endWar(w,war);continue;}
    const pairs=[];
    for(const ca of w.cities.filter(c=>c.kid===a.id))for(const cb of w.cities.filter(c=>c.kid===b.id))if(Math.hypot(ca.x-cb.x,ca.y-cb.y)<38)pairs.push([ca,cb]);
    if(!pairs.length)continue;
    pairs.sort((p,q)=>Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)-Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y));
    const [ca,cb]=pairs[0];if(!reachable(w,ca.x,ca.y,cb.x,cb.y,55))continue;
    const ua=w.units.filter(u=>u.home===ca.id&&u.health>0),ub=w.units.filter(u=>u.home===cb.id&&u.health>0);
    if(!ua.length||!ub.length)continue;
    // Nearby villages exchange raids. Population and the proportion of warriors determine the outcome.
    const sa=ua.length+ua.filter(u=>u.warrior).length*1.4+Math.random()*8, sb=ub.length+ub.filter(u=>u.warrior).length*1.4+Math.random()*8;
    const [victors,losers,target,attacker]=sa>sb?[ua,ub,cb,a]:[ub,ua,ca,b];
    for(const u of losers)if(Math.random()<.16)u.health-=25+Math.random()*20;
    for(const u of victors)if(Math.random()<.06)u.health-=20;
    target.hp-=(12+Math.min(15,Math.abs(sa-sb)))*(target.level>=4?.65:1);
    w.effects.push({x:target.x,y:target.y,type:'battle',life:25});
    if(target.hp<=0){const previous=target.kid;target.kid=attacker.id;target.hp=75;target.lastExpansion=w.year;for(const u of w.units)if(u.home===target.id&&u.kid===previous)u.kid=attacker.id;event(w,`${target.name} was captured`,`${attacker.name} has claimed the settlement.`);reconcile(w);}
  }
}
// Local, bounded A* navigation; routes are transient and are recalculated after terrain edits.
export function findPath(w, x1, y1, x2, y2, maxNodes=900) {
  const sx=Math.floor(x1),sy=Math.floor(y1),tx=Math.floor(x2),ty=Math.floor(y2);
  if(!isLand(tileAt(w,sx,sy))||!isLand(tileAt(w,tx,ty)))return null;
  const start=sy*W+sx,goal=ty*W+tx, open=[{i:start,f:0}], score=new Map([[start,0]]), parent=new Map(), closed=new Set();
  const hazards=new Set(w.fires.map(f=>f.y*W+f.x));
  function push(node){open.push(node);let i=open.length-1;while(i>0){const p=(i-1)>>1;if(open[p].f<=node.f)break;open[i]=open[p];i=p;}open[i]=node;}
  function pop(){const top=open[0],last=open.pop();if(open.length){let i=0;while(true){let a=i*2+1,b=a+1;if(a>=open.length)break;let child=b<open.length&&open[b].f<open[a].f?b:a;if(open[child].f>=last.f)break;open[i]=open[child];i=child;}open[i]=last;}return top;}
  while(open.length&&closed.size<maxNodes){
    const {i}=pop();if(closed.has(i))continue;if(i===goal){const route=[];let n=i;while(n!==start){route.push({x:n%W+.5,y:Math.floor(n/W)+.5});n=parent.get(n);}return route.reverse();}closed.add(i);
    const x=i%W,y=Math.floor(i/W),g=score.get(i);
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,ni=ny*W+nx;if(nx<0||ny<0||nx>=W||ny>=H||closed.has(ni)||!isLand(w.tiles[ni])||hazards.has(ni))continue;
      const cost=g+1+(w.tiles[ni]==='infernal'?4:0);if(cost>=(score.get(ni)??Infinity))continue;score.set(ni,cost);parent.set(ni,i);push({i:ni,f:cost+Math.abs(tx-nx)+Math.abs(ty-ny)});
    }
  }return null;
}
const agentState=new WeakMap();
function neighborhood(w){
  const grid=new Map(),size=8;
  for(const u of w.units){if(u.health<=0)continue;const key=`${Math.floor(u.x/size)},${Math.floor(u.y/size)}`;if(!grid.has(key))grid.set(key,[]);grid.get(key).push(u);}
  return (u,radius,filter)=>{let best=null,bestD=radius;const bx=Math.floor(u.x/size),by=Math.floor(u.y/size),range=Math.ceil(radius/size);
    for(let y=by-range;y<=by+range;y++)for(let x=bx-range;x<=bx+range;x++)for(const v of grid.get(`${x},${y}`)||[]){if(v===u||!filter(v))continue;const d=Math.hypot(v.x-u.x,v.y-u.y);if(d<bestD){best=v;bestD=d;}}return best;};
}
function chooseAgentGoal(w,u,near,home){
  const fire=w.fires.find(f=>Math.hypot(f.x+.5-u.x,f.y+.5-u.y)<3);
  const danger=near(u,9,v=>w.rules.hostileMonsters&&MONSTERS.includes(v.race)) || (u.race==='sheep'?near(u,8,v=>v.race==='wolf'):null);
  const fleeing=fire||(danger&&!MONSTERS.includes(u.race)&&(!u.warrior||u.health<u.maxHealth*.4));
  if(fleeing){const threat=fire?{x:fire.x+.5,y:fire.y+.5}:danger;let best=null,bestScore=-Infinity;
    for(let i=0;i<16;i++){const a=i*Math.PI/8,x=Math.floor(u.x+Math.cos(a)*5)+.5,y=Math.floor(u.y+Math.sin(a)*5)+.5;if(!isLand(tileAt(w,x,y))||w.fires.some(f=>Math.hypot(f.x+.5-x,f.y+.5-y)<2))continue;const score=Math.hypot(x-threat.x,y-threat.y)-(home?Math.max(0,Math.hypot(x-home.x,y-home.y)-12)*.3:0);if(score>bestScore){bestScore=score;best={x,y};}}
    if(best)return {activity:fire?'Fleeing fire':'Fleeing danger',...best};
  }
  if(MONSTERS.includes(u.race)&&w.rules.hostileMonsters){const target=near(u,18,v=>!MONSTERS.includes(v.race));if(target)return {activity:'Hunting',target};}
  if(u.race==='wolf'){const target=near(u,12,v=>v.race==='sheep');if(target)return {activity:'Hunting',target};}
  if(u.warrior&&u.health>=u.maxHealth*.4&&danger&&home&&Math.hypot(danger.x-home.x,danger.y-home.y)<12)return {activity:'Defending',target:danger};
  if(home&&u.health<u.maxHealth*.6&&Math.hypot(u.x-home.x,u.y-home.y)>2)return {activity:'Returning to safety',x:home.x,y:home.y};
  if(home&&Math.hypot(u.x-home.x,u.y-home.y)>9+home.level)return {activity:'Returning home',x:home.x,y:home.y};
  return {activity:'Wandering'};
}
function moveAgents(w){
  const near=neighborhood(w),homes=new Map(w.cities.map(c=>[c.id,c]));
  for(let index=0;index<w.units.length;index++){
    const u=w.units[index],home=homes.get(u.home);u.age+=.105;
    let ai=agentState.get(u);if(!ai){ai={};agentState.set(u,ai);}
    if(!ai.goal||Math.floor(w.tick/3)%4===index%4){ai.goal=chooseAgentGoal(w,u,near,home);u.activity=ai.goal.activity;}
    const goal=ai.goal,target=goal.target&&goal.target.health>0?goal.target:goal;
    const hasTarget=Number.isFinite(target.x)&&Number.isFinite(target.y)&&goal.activity!=='Wandering';
    if(u.race!=='dragon'&&!isLand(tileAt(w,u.x,u.y)))u.health-=6;
    if(hasTarget){
      if(u.race==='dragon')u.dir=Math.atan2(target.y-u.y,target.x-u.x);
      else {
        const destX=Math.floor(target.x),destY=Math.floor(target.y),revision=w.terrainRevision||0;
        if(ai.nextPlan===undefined || ai.revision!==revision || Math.abs(destX-ai.destX)+Math.abs(destY-ai.destY)>2 || w.tick>=ai.nextPlan || (ai.path?.length&&w.fires.some(f=>f.x===Math.floor(ai.path[0].x)&&f.y===Math.floor(ai.path[0].y)))){
          ai.path=findPath(w,u.x,u.y,target.x,target.y);ai.destX=destX;ai.destY=destY;ai.revision=revision;ai.nextPlan=w.tick+48;
        }
        while(ai.path?.length&&Math.hypot(ai.path[0].x-u.x,ai.path[0].y-u.y)<.25)ai.path.shift();
        const waypoint=ai.path?.[0];if(waypoint)u.dir=Math.atan2(waypoint.y-u.y,waypoint.x-u.x);else if(Math.floor(u.x)===destX&&Math.floor(u.y)===destY)u.dir=Math.atan2(target.y-u.y,target.x-u.x);else {u.dir+=1.4;continue;}
      }
    }else{ai.path=null;ai.nextPlan=undefined;if(Math.random()<.17)u.dir+=(Math.random()-.5)*2;}
    const nx=clamp(u.x+Math.cos(u.dir)*.24,1,W-2),ny=clamp(u.y+Math.sin(u.dir)*.24,1,H-2);
    if(u.race==='dragon'||isLand(tileAt(w,nx,ny))){u.x=nx;u.y=ny;}else u.dir+=2;
  }
}
export function step(w) {
  w.tick++;w.year+=.035;
  if(w.tick%3===0)moveAgents(w);
  if(w.tick%10===0)updateFires(w);
  if(w.tick%20===0)monsterCombat(w);
  if(w.tick%40===0) {
    for(const c of [...w.cities]) {
      if(!isLand(tileAt(w,c.x,c.y))){w.cities=w.cities.filter(other=>other.id!==c.id);event(w,`${c.name} was lost`,'Its settlement was swallowed by the sea.');continue;}
      cityEconomy(w,c);
    }
    for(const u of w.units){const t=tileAt(w,u.x,u.y);if(t==='enchanted'&&Math.random()<.18){u.blessed=true;u.cursed=false;u.health=Math.min(u.maxHealth,u.health+4);}if(t==='corrupted'&&Math.random()<.18){u.cursed=true;u.blessed=false;}if(t==='infernal'&&u.race!=='dragon')u.health-=4;if(u.cursed)u.health-=2;if(u.zombieInfection)u.health-=6;}
    for(const u of w.units) if(u.infected){u.infectionAge++;u.health-=7;if(u.infectionAge>=9){u.infected=false;u.infectionAge=0;}}
    // Disease spreads only between nearby creatures.
    const sick=w.units.filter(u=>u.infected);
    for(const u of w.units)if(!u.infected&&!u.traits.includes('Immune')&&!MONSTERS.includes(u.race)&&Math.random()<.12&&sick.some(v=>Math.hypot(u.x-v.x,u.y-v.y)<2)){u.infected=true;u.infectionAge=0;}
    const oldLength=w.units.length, dead=w.units.filter(u=>u.health<=0||(w.rules.oldAge&&!u.traits.includes('Immortal')&&!['zombie','skeleton'].includes(u.race)&&u.age>=(u.race==='dragon'?160:CIVILIZED.includes(u.race)?(u.traits.includes('Long-lived')?125:85):55)));
    const deadIds=new Set(dead.map(u=>u.id));w.units=w.units.filter(u=>!deadIds.has(u.id));
    for(const u of dead)if(u.zombieInfection&&!MONSTERS.includes(u.race)&&isLand(tileAt(w,u.x,u.y)))spawn(w,u.x,u.y,'zombie');
    if(oldLength!==w.units.length||dead.length)reconcile(w);
    if(w.rules.reproduction && w.units.length<600) for(const species of ['sheep','wolf']) {
      const animals=w.units.filter(u=>u.race===species);if(animals.length>=2&&animals.length<35&&Math.random()<(species==='sheep'?.3:.1)){const parent=animals[Math.floor(Math.random()*animals.length)];if(animals.some(u=>u!==parent&&Math.hypot(u.x-parent.x,u.y-parent.y)<7))spawn(w,parent.x,parent.y,species,null,null,true);}
    }
    for(const wolf of w.units.filter(u=>u.race==='wolf')){const prey=w.units.find(u=>u.race==='sheep'&&Math.hypot(u.x-wolf.x,u.y-wolf.y)<1.5);if(prey&&Math.random()<.4){prey.health-=35;if(prey.health<=0)wolf.kills++;}}
    reconcile(w);
  }
  if(w.tick%160===0)supplyVillages(w);
  if(w.tick%180===0)resolveWars(w);
  if(w.tick%1200===0&&w.rules.naturalDisasters){const c=w.cities[Math.floor(Math.random()*w.cities.length)];if(c){const count=w.fires.length;ignite(w,c.x,c.y);if(w.fires.length>count)event(w,'A natural fire begins',`A fire has started near ${c.name}.`);}}
  if(w.tick%360===0&&w.rules.diplomacy&&w.kingdoms.length>1&&Math.random()<.32){
    const cities=w.cities.filter(c=>w.units.filter(u=>u.home===c.id).length>=12);
    const pair=cities.flatMap(a=>cities.filter(b=>a.kid!==b.kid&&!enemies(w,a.kid,b.kid)&&Math.hypot(a.x-b.x,a.y-b.y)<38).map(b=>[a,b]))[0];
    if(pair&&reachable(w,pair[0].x,pair[0].y,pair[1].x,pair[1].y,55))startWar(w,w.kingdoms.find(k=>k.id===pair[0].kid),w.kingdoms.find(k=>k.id===pair[1].kid));
  }
  w.effects.forEach(e=>e.life--);w.effects=w.effects.filter(e=>e.life>0);
}
const palette={deep:['#144a5b','#164d5d','#195364'],water:['#267b83','#287f84','#2a8588'],sand:['#d3bc7c','#d9c184','#cdb477'],grass:['#6da555','#74ad5a','#79b25e','#6ca151'],forest:['#60994c','#68a250','#70a853'],hill:['#8c9b68','#94a171','#879765'],mountain:['#8c9180','#969b8a','#808779'],snow:['#dce4d0','#c9d8cb','#e6e9d9'],desert:['#d5aa62','#dcb473','#cba366'],scorched:['#554b43','#67584b','#74604e'],enchanted:['#7ebb99','#8dc6a7','#78b790'],corrupted:['#755b75','#80647c','#6e526d'],infernal:['#8f4a39','#a3573d','#9c513a']};
function rect(ctx,c,x,y,w,h){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function tree(ctx,x,y,d){let dark=d<.14;rect(ctx,'#495c35',x+2,y+3,2,4);rect(ctx,dark?'#285e3f':'#367447',x,y+1,6,4);rect(ctx,dark?'#347748':'#468e4d',x+1,y,4,3);rect(ctx,'#6ba85a',x+1,y,2,1)}
// Original pixel buildings. Each race has a palette and all six house tiers have distinct silhouettes.
const architecture={
  human:{roof:'#ae674e',trim:'#754338',walls:'#e2c79a'},
  elf:{roof:'#628a58',trim:'#355b43',walls:'#d1cf9c'},
  dwarf:{roof:'#866487',trim:'#5b485f',walls:'#c1bba8'},
  orc:{roof:'#a2674a',trim:'#67443a',walls:'#c1a574'}
};
function house(ctx,x,y,race,level=1,variant=0){
  const a=architecture[race]||architecture.human,w=level>=5?16:level>=3?13:10,h=level>=5?12:level>=3?9:7;
  const left=x-Math.floor(w/2),top=y-h;
  rect(ctx,'#344438',left-1,y,w+2,3);
  rect(ctx,level>=3?'#c3c5ac':a.walls,left,top,w,h+1);
  rect(ctx,a.trim,left-1,top-2,w+2,3);
  rect(ctx,a.roof,left,top-4,w,3);rect(ctx,a.roof,left+2,top-6,w-4,3);
  if(race==='elf'){rect(ctx,'#9dc382',left+1,top-5,w-2,1);rect(ctx,a.trim,left+w/2-1,top-8,2,3);}
  if(race==='orc'){rect(ctx,'#e4caa0',left-2,top-2,2,4);rect(ctx,'#e4caa0',left+w,top-2,2,4);}
  if(race==='dwarf')rect(ctx,'#dcc9a4',left+2,top-3,w-4,1);
  rect(ctx,'#54473b',x-1,y-4,3,5);rect(ctx,'#bde0c7',left+2,top+2,2,2);
  if(level>=2)rect(ctx,'#bde0c7',left+w-4,top+2,2,2);
  if(level>=3){rect(ctx,'#dfd6bd',left+w-3,top-7,2,4);rect(ctx,'#867e6b',left+w-3,top-7,2,1);}
  if(level>=4){rect(ctx,a.trim,variant?left-4:left+w-1,top+2,4,h-1);rect(ctx,a.walls,variant?left-3:left+w,top+3,3,h-2);}
  if(level>=5){rect(ctx,a.trim,left+2,top+5,w-4,1);rect(ctx,'#bde0c7',left+3,top+6,2,2);rect(ctx,'#bde0c7',left+w-5,top+6,2,2);}
  if(level>=6){rect(ctx,'#efdeaa',left+2,top-2,w-4,1);rect(ctx,'#e2cf9f',left+w/2-1,top-9,2,4);}
}
function townHall(ctx,x,y,race,tier,flag){
  const a=architecture[race]||architecture.human,w=14+tier*3,h=10+tier*3,left=x-Math.floor(w/2),top=y-h;
  rect(ctx,'#344438',left-2,y,w+4,3);rect(ctx,tier===1?a.walls:'#d1c8ae',left,top,w,h);
  rect(ctx,a.trim,left-2,top-3,w+4,4);rect(ctx,a.roof,left,top-6,w,4);rect(ctx,a.roof,left+3,top-9,w-6,4);
  rect(ctx,'#514537',x-2,y-6,4,6);rect(ctx,'#bbdfce',left+3,top+3,3,3);rect(ctx,'#bbdfce',left+w-6,top+3,3,3);
  if(tier>=2){rect(ctx,'#b0ac9b',left+2,top+8,w-4,1);rect(ctx,'#bbdfce',x-1,top+4,3,3);}
  if(tier===3){rect(ctx,'#d8d2bd',left+2,top-13,5,8);rect(ctx,a.roof,left+1,top-15,7,3);rect(ctx,'#d8d2bd',left+w-7,top-13,5,8);rect(ctx,a.roof,left+w-8,top-15,7,3);}
  rect(ctx,'#514538',x+2,top-18,1,11);rect(ctx,flag,x+3,top-18,7,5);rect(ctx,'#fff0bc',x+4,top-17,2,2);
}
function windmill(ctx,x,y,tier){
  rect(ctx,'#4e5946',x-5,y+1,11,2);rect(ctx,'#e4d0a2',x-4,y-12,8,13);rect(ctx,'#a56a4d',x-5,y-15,10,4);rect(ctx,'#51463a',x-1,y-3,3,4);
  rect(ctx,tier>=5?'#e9e4c8':'#d6d1b5',x-8,y-10,16,2);rect(ctx,tier>=5?'#e9e4c8':'#d6d1b5',x-1,y-17,2,16);rect(ctx,'#6d624e',x-1,y-10,2,2);
}
function mine(ctx,x,y){rect(ctx,'#525d52',x-8,y-6,16,8);rect(ctx,'#9d9f89',x-7,y-8,14,4);rect(ctx,'#3c3931',x-3,y-5,7,7);rect(ctx,'#a98157',x-4,y-6,9,2);rect(ctx,'#a98157',x-4,y-4,2,6);rect(ctx,'#a98157',x+3,y-4,2,6);}
function watchtower(ctx,x,y,race){const a=architecture[race]||architecture.human;rect(ctx,'#4b564b',x-5,y-17,11,19);rect(ctx,'#c5c4ae',x-4,y-16,9,16);rect(ctx,'#777c70',x-6,y-19,13,4);rect(ctx,a.roof,x-5,y-22,11,3);rect(ctx,'#496466',x-1,y-12,3,4);}
function stockpile(ctx,x,y){rect(ctx,'#5e4b38',x-8,y-6,16,7);rect(ctx,'#ad8757',x-7,y-8,6,7);rect(ctx,'#c29b65',x+1,y-7,6,6);rect(ctx,'#6c503a',x-5,y-8,1,7);rect(ctx,'#6c503a',x+3,y-7,1,6);}
function barracks(ctx,x,y,race,level){const a=architecture[race]||architecture.human;house(ctx,x,y,race,level,0);rect(ctx,a.trim,x-1,y-17,2,7);rect(ctx,'#ddc784',x+1,y-17,6,4);rect(ctx,'#6e6250',x+2,y-16,3,2);}
function market(ctx,x,y){rect(ctx,'#735643',x-7,y-8,14,9);rect(ctx,'#e9d4ad',x-8,y-11,16,4);rect(ctx,'#bc7359',x-7,y-11,4,4);rect(ctx,'#bc7359',x+1,y-11,4,4);rect(ctx,'#c59d64',x-5,y-4,10,3);}
function temple(ctx,x,y,race){const a=architecture[race]||architecture.human;rect(ctx,'#e1dcc3',x-8,y-15,16,16);rect(ctx,a.trim,x-9,y-17,18,3);rect(ctx,a.roof,x-6,y-20,12,3);rect(ctx,'#e9d899',x-1,y-23,2,4);rect(ctx,'#6c7469',x-2,y-7,4,7);rect(ctx,'#9ac5ba',x-6,y-12,3,4);rect(ctx,'#9ac5ba',x+3,y-12,3,4);}
// Terrain changes infrequently; caching it avoids repainting 20,700 tiles every frame.
const terrainCache = new WeakMap();
function drawTerrain(ctx,w){
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){let i=y*W+x,t=w.tiles[i],d=w.decor[i],p=palette[t]||palette.grass;rect(ctx,p[Math.floor(d*p.length)%p.length],x*T,y*T,T,T);
  if(t==='deep'||t==='water'){if(d>.975){rect(ctx,t==='deep'?'#286577':'#56a09b',x*T,y*T+2,4,1);rect(ctx,t==='deep'?'#286577':'#56a09b',x*T+4,y*T+3,2,1)}}
  else if(t==='grass'){if(d>.94){rect(ctx,'#cee38a',x*T+2,y*T+1,1,1);rect(ctx,'#4f8d4c',x*T+3,y*T+3,1,2)}else if(d<.12)rect(ctx,'#8cbd67',x*T+2,y*T+3,2,1)}
  else if(t==='enchanted'&&d<.28){rect(ctx,'#5e8067',x*T+2,y*T+3,2,4);rect(ctx,'#d4a1d0',x*T,y*T,6,4);rect(ctx,'#f1c4e3',x*T+1,y*T,3,1)}
  else if(t==='corrupted'&&d<.18){rect(ctx,'#413f43',x*T+2,y*T+1,2,5);rect(ctx,'#b287a5',x*T,y*T,5,2)}
  else if(t==='infernal'&&d>.8){rect(ctx,'#e6904c',x*T+1,y*T+3,4,1)}
  else if(t==='forest'&&d<.50)tree(ctx,x*T,y*T-2,d);
  else if((t==='mountain'||t==='hill'||t==='snow')&&d<.38){let xx=x*T,yy=y*T;rect(ctx,t==='snow'?'#f2f3e5':'#6e7b6a',xx+1,yy+3,5,3);rect(ctx,t==='snow'?'#fffdf0':'#b6ba9d',xx+2,yy+1,3,2);rect(ctx,'#d6d8c2',xx+2,yy+1,2,1)}
 }
 }
export function draw(ctx,w,showBorders=true){
 ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,W*T,H*T);
 let cached=terrainCache.get(w);
 if(!cached || cached.revision!==(w.terrainRevision||0)){
  const layer=document.createElement('canvas');layer.width=W*T;layer.height=H*T;
  drawTerrain(layer.getContext('2d'),w);cached={layer,revision:w.terrainRevision||0};terrainCache.set(w,cached);
 }
 ctx.drawImage(cached.layer,0,0);
 for(const r of w.resources){const x=r.x*T,y=r.y*T;rect(ctx,'#526257',x,y+2,6,4);rect(ctx,r.type==='gold'?'#e4c163':r.type==='iron'?'#aab6c1':'#b3b3a2',x+1,y,4,4);rect(ctx,'#e1dfc6',x+2,y,2,1)}
 for(const f of w.fires){const x=f.x*T,y=f.y*T;rect(ctx,'#be5135',x,y+2,6,4);rect(ctx,'#f99c47',x+1,y,4,4);rect(ctx,'#fbe387',x+2,y+2,2,3)}
 // borders around the domains
 if(showBorders){ctx.setLineDash([4,5]);ctx.lineWidth=1;for(const c of w.cities){let k=w.kingdoms.find(k=>k.id===c.kid);if(!k)continue;ctx.strokeStyle=k.color+'aa';ctx.beginPath();ctx.ellipse(c.x*T,c.y*T,57+c.level*6,40+c.level*5,0,0,Math.PI*2);ctx.stroke()}ctx.setLineDash([])}
 for(const c of w.cities){
  const k=w.kingdoms.find(k=>k.id===c.kid);if(!k)continue;
  const x=c.x*T,y=c.y*T,pop=w.units.filter(u=>u.home===c.id).length;
  const canBuild=(dx,dy)=>isLand(tileAt(w,c.x+dx/T,c.y+dy/T));
  ctx.fillStyle='#b8a276';ctx.globalAlpha=.72;ctx.fillRect(x-48,y+8,96,3);ctx.fillRect(x-1,y-31,3,64);ctx.globalAlpha=1;
  if(c.level>=2){for(const [fx,fy] of [[-52,23],[-52,32]]){rect(ctx,'#8d8150',x+fx,y+fy,19,7);for(let row=0;row<3;row++)rect(ctx,'#d3c378',x+fx+1,y+fy+1+row*2,17,1);}}
  const spots=[[-21,-5],[21,-5],[-23,16],[23,16],[-8,28],[10,28],[-37,4],[37,4],[-25,-24],[25,-24]];
  const count=Math.min(spots.length,Math.max(3,Math.ceil(pop/7)));
  for(let j=0;j<count;j++)if(canBuild(...spots[j]))house(ctx,x+spots[j][0],y+spots[j][1],k.race,c.level,j%2);
  rect(ctx,'#5c4b39',x-19,y+9,6,3);rect(ctx,'#efae58',x-17,y+6,2,4);
  if(c.level>=2&&canBuild(55,29))stockpile(ctx,x+55,y+29);
  if(c.level>=3){if(canBuild(-55,13))windmill(ctx,x-55,y+13,c.level);if(canBuild(56,12))mine(ctx,x+56,y+12);}
  if(c.level>=4){if(canBuild(-50,-14))watchtower(ctx,x-50,y-14,k.race);if(canBuild(50,-15))barracks(ctx,x+50,y-15,k.race,Math.max(3,c.level-1));}
  if(c.level>=5&&canBuild(-42,37))market(ctx,x-42,y+37);
  if(c.level>=6&&canBuild(46,38))temple(ctx,x+46,y+38,k.race);
  townHall(ctx,x,y,k.race,CIV_STAGES[c.level-1].hall,k.color);
 }
 for(const u of w.units){let x=u.x*T,y=u.y*T,r=races[u.race];if(!r)continue;rect(ctx,'#424838',x,y+3,4,2);rect(ctx,u.infected?'#9f65b9':r.shirt,x,y,4,4);rect(ctx,r.color,x+1,y-2,3,3);if(u.race==='sheep'||u.race==='wolf')rect(ctx,r.color,x-1,y,5,3);if(u.race==='dragon'){rect(ctx,'#713d3a',x-3,y-2,10,4);rect(ctx,'#e79a62',x-1,y-4,6,4)}if(u.zombieInfection)rect(ctx,'#c1e67b',x+3,y-3,1,1);if(u.favorite){rect(ctx,'#f5db7f',x+1,y-7,2,5);rect(ctx,'#f5db7f',x-1,y-5,6,1)}}
 for(const e of w.effects){let x=e.x*T,y=e.y*T,alpha=e.life/45;ctx.globalAlpha=alpha;if(e.type==='heal'||e.type==='rain'){ctx.strokeStyle=e.type==='heal'?'#b5f7a8':'#90dbfa';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,(45-e.life)*2,0,7);ctx.stroke()}else{ctx.fillStyle=e.type==='plague'?'#c68bea':'#ffdc75';ctx.beginPath();ctx.arc(x,y,(45-e.life)*1.8+5,0,7);ctx.fill();ctx.fillStyle='#f17e40';ctx.beginPath();ctx.arc(x,y,(45-e.life)*1.1+3,0,7);ctx.fill()}ctx.globalAlpha=1}
 for(const c of w.cities){let k=w.kingdoms.find(k=>k.id===c.kid);if(!k)continue;let pop=w.units.filter(u=>u.home===c.id).length;let x=c.x*T,y=c.y*T-57;ctx.font='bold 9px Georgia';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#26392e';ctx.strokeText(c.name.toUpperCase(),x,y);ctx.fillStyle='#fff4c9';ctx.fillText(c.name.toUpperCase(),x,y);ctx.font='8px sans-serif';ctx.strokeText('♟ '+pop,x,y+10);ctx.fillStyle=k.color;ctx.fillText((k.atWar?'⚔ ':'♟ ')+pop,x,y+10)}
}
