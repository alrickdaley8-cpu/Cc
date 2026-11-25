// DOM user interface: HUD (prompt, subtitles, toasts, hints), note reader, journal,
// title/pause/settings/death/ending screens. Deliberately minimal and diegetic in tone:
// no health bars, no meters — the only HUD elements are text.
import { settings, saveSettings, DEFAULTS } from '../core/settings.js';
import { CREDITS, ENDINGS, NOTES, ITEMS } from '../game/content.js';

const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

export class UI {
  constructor(game, root) {
    this.game = game; this.root = root;
    root.innerHTML = '';
    this.hud = h('div', 'hud'); root.appendChild(this.hud);
    this.dot = h('div', 'dot'); this.hud.appendChild(this.dot);
    this.prompt = h('div', 'prompt'); this.hud.appendChild(this.prompt);
    this.subs = h('div', 'subs'); this.hud.appendChild(this.subs);
    this.toastEl = h('div', 'toast'); this.hud.appendChild(this.toastEl);
    this.objEl = h('div', 'objective'); this.hud.appendChild(this.objEl);
    this.hintEl = h('div', 'hint'); this.hud.appendChild(this.hintEl);
    this.savedEl = h('div', 'saved', 'checkpoint'); this.hud.appendChild(this.savedEl);
    this.breathEl = h('div', 'breath'); this.hud.appendChild(this.breathEl);
    this.screen = h('div', 'screen hidden'); root.appendChild(this.screen);
    this.reader = h('div', 'reader hidden'); root.appendChild(this.reader);
    this.journalEl = h('div', 'journal hidden'); root.appendChild(this.journalEl);
    this.lines = [];
    this.timers = { toast: 0, obj: 0, hint: 0, saved: 0 };
    this.applyHudSettings();
  }

  applyHudSettings() { this.dot.style.display = settings.centerDot === false ? 'none' : ''; this.subs.classList.toggle('large', settings.subtitleSize === 'large'); }

  // ---------- HUD ----------
  setPrompt(text) {
    const t = text ? `<span class="key">E</span> ${esc(text)}` : '';
    if (this._prompt !== t) { this._prompt = t; this.prompt.innerHTML = t; }
    this.dot.classList.toggle('active', !!text);
  }
  subtitle(who, text, dur = 4) {
    if (!settings.subtitles) return;
    this.pushLine(`${who ? `<b>${esc(who)}:</b> ` : ''}${esc(text)}`, dur, 'line');
  }
  caption(text, dur = 3, dir = '') {
    if (!settings.captions) return;
    this.pushLine(`<i>${esc(text)}${dir ? ` <span class="dir">${dir}</span>` : ''}</i>`, dur, 'cap');
  }
  pushLine(html, dur, cls) {
    if (this.lines.length && this.lines[this.lines.length - 1].html === html) { this.lines[this.lines.length - 1].t = dur; return; }
    const el = h('div', cls, html); this.subs.appendChild(el);
    this.lines.push({ el, t: dur, html });
    while (this.lines.length > 3) this.lines.shift().el.remove();
  }
  toast(text, dur = 4.5) { this.toastEl.textContent = text; this.toastEl.classList.add('show'); this.timers.toast = dur; }
  objective(text, quiet = false) {
    this.objText = text;
    if (quiet) return;
    this.objEl.innerHTML = `<small>OBJECTIVE</small>${esc(text)}`; this.objEl.classList.add('show'); this.timers.obj = 6;
  }
  hint(text, dur = 5) { if (settings.hints === false) return; this.hintEl.textContent = text; this.hintEl.classList.add('show'); this.timers.hint = dur; }
  saved() { this.savedEl.classList.add('show'); this.timers.saved = 2.5; }
  breath(v, held) { this.breathEl.style.opacity = held ? 1 : 0; this.breathEl.style.setProperty('--b', v); }

  update(dt) {
    for (let i = this.lines.length - 1; i >= 0; i--) { const l = this.lines[i]; l.t -= dt; if (l.t <= 0) { l.el.classList.add('fade'); if (l.t < -0.6) { l.el.remove(); this.lines.splice(i, 1); } } }
    for (const [k, el] of [['toast', this.toastEl], ['obj', this.objEl], ['hint', this.hintEl], ['saved', this.savedEl]]) {
      if (this.timers[k] > 0) { this.timers[k] -= dt; if (this.timers[k] <= 0) el.classList.remove('show'); }
    }
  }
  showHud(v) { this.hud.style.display = v ? '' : 'none'; }

  // ---------- note reader ----------
  showNote(note) {
    const body = esc(note.body).replace(/\n/g, '<br>');
    this.reader.innerHTML = `<div class="paper ${note.style}"><h2>${esc(note.title)}</h2><div class="body">${body}</div></div><div class="close">E / Esc / click — put it down</div>`;
    this.reader.classList.remove('hidden');
    this.reader.querySelector('.paper').scrollTop = 0;
    this.game.setMode('reading');
    this.reader.onclick = () => this.closeNote();
  }
  closeNote() { if (this.reader.classList.contains('hidden')) return; this.reader.classList.add('hidden'); this.game.setMode('playing'); }
  get readingOpen() { return !this.reader.classList.contains('hidden'); }

  // ---------- journal (Tab) ----------
  toggleJournal(force) {
    const open = force ?? this.journalEl.classList.contains('hidden');
    if (!open) { this.journalEl.classList.add('hidden'); return; }
    const s = this.game.story;
    const items = [];
    for (const k of s.inv.keys) items.push(ITEMS[k].name);
    for (const c of s.inv.cylinders) items.push(ITEMS[c].name);
    if (s.inv.reel) items.push(ITEMS.reel.name);
    if (s.inv.bottles) items.push(`Empty bottle ×${s.inv.bottles}`);
    const notes = [...s.read].map((id) => `<li data-note="${id}">${esc(NOTES[id].title)}</li>`).join('');
    this.journalEl.innerHTML = `<div class="jpage">
      <h3>Current objective</h3><p class="jobj">${esc(s.objectiveText())}</p>
      <h3>Carrying</h3><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('') || '<li class="none">Nothing but a torch.</li>'}</ul>
      <h3>Documents (${s.read.size}/${Object.keys(NOTES).length})</h3><ul class="notes">${notes || '<li class="none">None yet.</li>'}</ul>
      <p class="jfoot">Tab to close · click a document to reread it</p></div>`;
    this.journalEl.querySelectorAll('[data-note]').forEach((li) => { li.onclick = () => { this.toggleJournal(false); this.showNote(NOTES[li.dataset.note]); }; });
    this.journalEl.classList.remove('hidden');
  }

  // ---------- screens ----------
  showScreen(html, cls = '') { this.screen.className = `screen ${cls}`; this.screen.innerHTML = html; this.screen.classList.remove('hidden'); return this.screen; }
  hideScreen() { this.screen.classList.add('hidden'); this.screen.innerHTML = ''; }
  bind(sel, fn) { const el = this.screen.querySelector(sel); if (el) { el.onclick = (e) => { e.stopPropagation(); this.game.audio.play('uiHover'); fn(); }; } }

  title({ canContinue, endings }) {
    const found = endings.length ? `<div class="endings">Endings found: ${endings.length}/3</div>` : '';
    this.showScreen(`<div class="title-wrap">
      <div class="title-sub">a quiet horror</div>
      <h1>The Quiet at<br>Marlowe House</h1>
      <div class="menu">
        ${canContinue ? '<button id="b-continue">Continue</button>' : ''}
        <button id="b-new">${canContinue ? 'New game' : 'Begin'}</button>
        <button id="b-settings">Settings</button>
        <button id="b-controls">How to play</button>
        <button id="b-credits">Credits</button>
      </div>
      ${found}
      <div class="warn">Best played with headphones, in the dark. Contains a single loud scare.<br>Click to capture the mouse. Esc to pause.</div>
    </div>`, 'title');
    this.bind('#b-continue', () => this.game.continueGame());
    this.bind('#b-new', () => this.difficultyPicker());
    this.bind('#b-settings', () => this.settingsScreen(() => this.game.showTitle()));
    this.bind('#b-controls', () => this.controls(() => this.game.showTitle()));
    this.bind('#b-credits', () => { this.showScreen(`<div class="panel"><h2>Credits</h2><p>${esc(CREDITS).replace(/\n/g, '<br>')}</p><button id="b-back">Back</button></div>`); this.bind('#b-back', () => this.game.showTitle()); });
  }
  difficultyPicker() {
    this.showScreen(`<div class="panel"><h2>How loud is the house?</h2>
      <div class="diff">
        <button data-d="gentle"><b>Gentle</b><span>It hears less, moves slower, gives up sooner. Torch lasts longer. For the story.</span></button>
        <button data-d="standard"><b>Standard</b><span>The intended experience.</span></button>
        <button data-d="nightmare"><b>Nightmare</b><span>Keen ears, longer hunts, a weak torch.</span></button>
      </div><button id="b-back">Back</button></div>`);
    this.screen.querySelectorAll('[data-d]').forEach((b) => { b.onclick = (e) => { e.stopPropagation(); settings.difficulty = b.dataset.d; saveSettings(); this.game.newGame(); }; });
    this.bind('#b-back', () => this.game.showTitle());
  }
  controls(back) {
    this.showScreen(`<div class="panel"><h2>How to play</h2>
      <table class="keys">
      <tr><td>W A S D / arrows</td><td>Move</td></tr><tr><td>Mouse</td><td>Look</td></tr>
      <tr><td>Shift</td><td>Run (loud, tiring)</td></tr><tr><td>C / Ctrl</td><td>Crouch (quiet)</td></tr>
      <tr><td>E / left click</td><td>Interact · hide · read</td></tr><tr><td>F</td><td>Torch on/off</td></tr>
      <tr><td>R (hold)</td><td>Crank the torch dynamo (noisy)</td></tr><tr><td>Q / right click</td><td>Throw a bottle</td></tr>
      <tr><td>Space (hold, while hidden)</td><td>Hold your breath</td></tr><tr><td>Tab</td><td>Journal: objective, items, documents</td></tr>
      <tr><td>Esc</td><td>Pause</td></tr></table>
      <p class="tip">Everything you do makes sound. It hunts by sound. Walk on rugs, avoid the chalk-marked boards, close doors behind you, and listen for the hum.</p>
      <button id="b-back">Back</button></div>`);
    this.bind('#b-back', back);
  }
  pause() {
    this.showScreen(`<div class="panel"><h2>Paused</h2><p class="jobj">${esc(this.game.story.objectiveText())}</p>
      <div class="menu"><button id="b-resume">Resume</button><button id="b-retry">Restart from checkpoint</button><button id="b-settings">Settings</button><button id="b-controls">How to play</button><button id="b-quit">Quit to title</button></div></div>`, 'dim');
    this.bind('#b-resume', () => this.game.resume());
    this.bind('#b-retry', () => this.game.retry());
    this.bind('#b-settings', () => this.settingsScreen(() => this.pause()));
    this.bind('#b-controls', () => this.controls(() => this.pause()));
    this.bind('#b-quit', () => this.game.showTitle());
  }
  death(cause = 'heard') {
    // Fairness: always say *why*. A death you understand is a lesson; one you don't is noise.
    const C = {
      sawHide: ['IT SAW YOU HIDE', 'It was watching when you climbed in. Break its line of sight first — then hide.'],
      breath: ['IT HEARD YOU', 'It heard you breathing. When it stops outside, hold SPACE — and count.'],
      seen: ['IT SAW YOU', 'Keep the torch off its face and out of its sight. Corners and doors break its line of sight.'],
      heard: ['IT HEARD YOU', 'Crouch near it, keep off the chalk-marked boards, and never run when it is close.'],
    }[cause] || ['IT HEARD YOU', ''];
    this.showScreen(`<div class="death"><h1>${C[0]}</h1><p>…and now it has your voice.</p>${C[1] ? `<p class="tip">${esc(C[1])}</p>` : ''}<button id="b-retry">Wake up (last checkpoint)</button><button id="b-quit" class="small">Quit to title</button></div>`, 'deathscreen');
    this.bind('#b-retry', () => this.game.retry());
    this.bind('#b-quit', () => this.game.showTitle());
  }
  ending(id, stats, found) {
    const e = ENDINGS[id];
    this.showScreen(`<div class="ending"><div class="esub">${esc(e.sub)}</div><h1>${esc(e.title)}</h1>
      <div class="ebody">${esc(e.body).replace(/\n\n/g, '</p><p>').replace(/^/, '<p>')}</p></div>
      <div class="estats">Time ${stats.time} · Documents ${stats.notes} · Cylinders ${stats.cyl}/3 · Times caught ${stats.deaths}<br>Endings found ${found.length}/3${found.length < 3 ? ' — there is more to hear.' : ' — all of them. Thank you for listening.'}</div>
      <button id="b-title">Return to title</button></div>`, 'endingscreen');
    this.bind('#b-title', () => this.game.showTitle());
  }
  settingsScreen(back) {
    const S = settings;
    const row = (label, input) => `<label class="srow"><span>${label}</span>${input}</label>`;
    const range = (k, min, max, step) => `<input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${S[k]}"><output>${(+S[k]).toFixed(step < 1 ? 2 : 0)}</output>`;
    const check = (k) => `<input type="checkbox" data-k="${k}" ${S[k] ? 'checked' : ''}>`;
    this.showScreen(`<div class="panel settings"><h2>Settings</h2><div class="cols">
      <div><h3>Controls &amp; view</h3>
      ${row('Mouse sensitivity', range('sensitivity', 0.2, 3, 0.05))}
      ${row('Invert Y', check('invertY'))}
      ${row('Field of view', range('fov', 55, 100, 1))}
      ${row('Crouch is a toggle', check('crouchToggle'))}
      ${row('Head bob', check('headBob'))}
      ${row('Centre dot', check('centerDot'))}
      <h3>Difficulty</h3>
      ${row('Difficulty', `<select data-k="difficulty">${['gentle', 'standard', 'nightmare'].map((d) => `<option ${S.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select>`)}
      </div><div><h3>Picture</h3>
      ${row('Brightness', range('brightness', 0.6, 1.8, 0.05))}
      ${row('Film grain', check('grain'))}
      ${row('Chromatic aberration', check('aberration'))}
      ${row('Reduce flashing (lightning, flicker)', check('reduceFlashing'))}
      ${row('Render scale', range('resolutionScale', 0.35, 1, 0.05))}
      <h3>Sound &amp; text</h3>
      ${row('Master volume', range('masterVolume', 0, 1, 0.05))}
      ${row('Music', range('musicVolume', 0, 1, 0.05))}
      ${row('Effects', range('sfxVolume', 0, 1, 0.05))}
      ${row('Voices', range('voiceVolume', 0, 1, 0.05))}
      ${row('Subtitles', check('subtitles'))}
      ${row('Sound captions', check('captions'))}
      ${row('Large subtitles', `<input type="checkbox" data-k="subtitleSize" ${S.subtitleSize === 'large' ? 'checked' : ''}>`)}
      ${row('Tutorial hints', check('hints'))}
      </div></div>
      <div class="menu row"><button id="b-defaults">Defaults</button><button id="b-back">Back</button></div></div>`, 'dim');
    this.screen.querySelectorAll('[data-k]').forEach((el) => {
      const k = el.dataset.k;
      const upd = () => {
        if (el.type === 'checkbox') S[k] = k === 'subtitleSize' ? (el.checked ? 'large' : 'normal') : el.checked;
        else if (el.type === 'range') { S[k] = parseFloat(el.value); el.nextElementSibling.textContent = (+el.value).toFixed(parseFloat(el.step) < 1 ? 2 : 0); }
        else S[k] = el.value;
        saveSettings(); this.game.applySettings(); this.applyHudSettings();
      };
      el.oninput = upd; el.onchange = upd; el.onclick = (e) => e.stopPropagation();
    });
    this.bind('#b-defaults', () => { Object.assign(S, DEFAULTS); saveSettings(); this.game.applySettings(); this.settingsScreen(back); });
    this.bind('#b-back', back);
  }
  loading(text) { this.showScreen(`<div class="loading">${esc(text)}</div>`, 'title'); }
  fatal(msg) { this.showScreen(`<div class="panel"><h2>Something went wrong</h2><p>${esc(msg)}</p><p>This game needs a browser with WebGL2 and the Web Audio API (recent Chrome, Edge, Firefox or Safari).</p></div>`); }
}
