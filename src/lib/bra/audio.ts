type Tone = { f: number; d: number; t?: OscillatorType; delay?: number; gain?: number };

let ctx: AudioContext | null = null;
let enabled = true;
let volume = 0.5;

export const configureAudio = (on: boolean, vol: number) => {
  enabled = on;
  volume = vol;
};

const getCtx = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

const play = (tones: Tone[]) => {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  for (const tone of tones) {
    const start = c.currentTime + (tone.delay ?? 0);
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = tone.t ?? "sine";
    osc.frequency.setValueAtTime(tone.f, start);
    const peak = volume * (tone.gain ?? 0.25);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + tone.d);
    osc.connect(g).connect(c.destination);
    osc.start(start);
    osc.stop(start + tone.d + 0.05);
  }
};

export const sfx = {
  start: () => play([{ f: 110, d: 0.5, t: "sawtooth", gain: 0.18 }, { f: 220, d: 0.6, delay: 0.1 }, { f: 330, d: 0.8, delay: 0.25 }]),
  select: () => play([{ f: 440, d: 0.12, t: "triangle" }, { f: 660, d: 0.15, delay: 0.08, t: "triangle" }]),
  tick: () => play([{ f: 880, d: 0.06, t: "square", gain: 0.12 }]),
  correct: () =>
    play([
      { f: 523, d: 0.2, t: "triangle" },
      { f: 659, d: 0.2, delay: 0.12, t: "triangle" },
      { f: 784, d: 0.45, delay: 0.24, t: "triangle" },
    ]),
  wrong: () => play([{ f: 180, d: 0.5, t: "sawtooth", gain: 0.2 }, { f: 90, d: 0.8, delay: 0.15, t: "sawtooth", gain: 0.2 }]),
  lifeline: () => play([{ f: 700, d: 0.15, t: "square", gain: 0.12 }, { f: 900, d: 0.2, delay: 0.1, t: "square", gain: 0.12 }]),
  win: () =>
    play([
      { f: 523, d: 0.2 },
      { f: 659, d: 0.2, delay: 0.15 },
      { f: 784, d: 0.2, delay: 0.3 },
      { f: 1046, d: 0.8, delay: 0.45 },
    ]),
  lose: () =>
    play([
      { f: 300, d: 0.3, t: "sawtooth", gain: 0.18 },
      { f: 220, d: 0.4, delay: 0.25, t: "sawtooth", gain: 0.18 },
      { f: 120, d: 1, delay: 0.5, t: "sawtooth", gain: 0.18 },
    ]),
};
