// Persisted player options (accessibility + audio + difficulty).
const KEY = 'marlowe.settings.v1';
export const DEFAULTS = {
  sensitivity: 1.0,
  invertY: false,
  fov: 72,
  headBob: true,
  brightness: 1.0,
  calibrated: false,
  grain: true,
  aberration: true,
  reduceFlashing: false,
  subtitles: true,
  captions: true,
  subtitleSize: 'normal',
  centerDot: true,
  hints: true,
  crouchToggle: true,
  masterVolume: 0.9,
  musicVolume: 0.7,
  sfxVolume: 1.0,
  voiceVolume: 1.0,
  difficulty: 'standard', // 'gentle' | 'standard' | 'nightmare'
  resolutionScale: 0.6,
};
export const settings = { ...DEFAULTS };
export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) Object.assign(settings, JSON.parse(raw));
  } catch { /* storage unavailable */ }
  return settings;
}
export function saveSettings() {
  try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch { /* ignore */ }
}
