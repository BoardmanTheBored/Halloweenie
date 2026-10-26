// Web Audio setup. Sound is optional: any failure leaves the visuals working and shows no error
// (spec check 12). Sounds themselves arrive in later checkpoints; they connect to Hallo.audio.master.
Hallo.audio = {
  ctx: null,
  master: null,

  // Must be called from inside the Enter tap handler so iOS Safari unlocks audio.
  init() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
      this.ctx.resume().catch(() => {});
      this.startWind();
    } catch (e) {
      this.ctx = null;
    }
  },

  // Suspending the context freezes every sound at its current position.
  setPaused(paused) {
    if (!this.ctx) return;
    const p = paused ? this.ctx.suspend() : this.ctx.resume();
    p.catch(() => {});
  },

  // Placeholder ambient bed: filtered noise whose pitch and loudness drift slowly, like wind.
  // To be replaced by a verified CC0 recording (research.md audio tables).
  startWind() {
    const ctx = this.ctx;
    const len = ctx.sampleRate * 8;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let low = 0;
    for (let i = 0; i < len; i++) {              // brown-ish noise: softer, less hiss than white
      low = (low + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = low * 3.5;
    }
    const fade = Math.floor(ctx.sampleRate * 0.5); // crossfade the ends so the loop has no seam
    for (let i = 0; i < fade; i++) {
      const t = i / fade;
      data[i] = data[i] * t + data[len - fade + i] * (1 - t);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true; src.loopStart = 0; src.loopEnd = (len - fade) / ctx.sampleRate;

    const band = ctx.createBiquadFilter();
    band.type = 'bandpass'; band.frequency.value = 420; band.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3);  // fade in after Enter

    // Slow LFOs: one sweeps the filter, one swells the volume.
    const lfo = (rate, depth, target) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.frequency.value = rate; g.gain.value = depth;
      o.connect(g); g.connect(target); o.start();
    };
    lfo(0.07, 180, band.frequency);
    lfo(0.11, 0.18, gain.gain);

    src.connect(band); band.connect(gain); gain.connect(this.master);
    this.master.gain.value = 0.6;
    src.start();
  },

  // ---- One-shot sounds (synthesized placeholders; all quiet, no stingers) ----
  // play(name) never throws: a missing or blocked audio context just means silence.
  play(name) {
    const ctx = this.ctx;
    if (!ctx || !this.master || !this.sounds[name]) return;
    try { this.sounds[name](ctx, this.master, ctx.currentTime); } catch (e) { /* silent */ }
  },

  sounds: {
    // Eyes: two soft high notes, like a shimmer of light.
    eyes(ctx, out, t) { [880, 1319].forEach((f, i) => Hallo.audio.tone(ctx, out, f, t + i * 0.13, 1.4, 0.09)); },
    // Hand: a short stone scrape (filtered noise sweeping up) with a low thump.
    hand(ctx, out, t) {
      Hallo.audio.noise(ctx, out, t, 0.7, 0.2, 250, 900);
      Hallo.audio.tone(ctx, out, 85, t, 0.35, 0.12);
    },
    // Moon: four rising chime notes.
    moon(ctx, out, t) { [523, 659, 784, 1047].forEach((f, i) => Hallo.audio.tone(ctx, out, f, t + i * 0.17, 1.8, 0.08)); },
    // Locked or out-of-order tap: a very quiet low thud.
    soft(ctx, out, t) { Hallo.audio.tone(ctx, out, 150, t, 0.3, 0.06, 105); },
    // Statue finale: a slow rising swell, a long stone grind, then a distant bell.
    swell(ctx, out, t) { [196, 294].forEach((f) => Hallo.audio.pad(ctx, out, f, t, 2.4, 0.06)); },
    grind(ctx, out, t) { Hallo.audio.noise(ctx, out, t, 2.6, 0.16, 170, 90); },
    bell(ctx, out, t) {
      // Inharmonic partials with faster-decaying highs read as a bell; kept low and distant.
      [[1, 1], [2, 0.55], [2.4, 0.35], [3, 0.25], [4.2, 0.15], [5.4, 0.08]]
        .forEach(([ratio, amp], i) => Hallo.audio.tone(ctx, out, 196 * ratio, t, 5 / (1 + i * 0.35), 0.12 * amp));
    },
    // Fountain: three water drops, each a different note (a pentatonic climb), with a faint overtone.
    drop1(ctx, out, t) { Hallo.audio.drop(ctx, out, 392, t); },
    drop2(ctx, out, t) { Hallo.audio.drop(ctx, out, 494, t); },
    drop3(ctx, out, t) { Hallo.audio.drop(ctx, out, 587, t); },
    // Fountain finale: a rising shimmer as the reflection appears, then a soft wash as the ripples fade.
    shimmer(ctx, out, t) { [784, 988, 1175, 1568].forEach((f, i) => Hallo.audio.tone(ctx, out, f, t + i * 0.22, 2.4, 0.06)); },
    wash(ctx, out, t) { Hallo.audio.noise(ctx, out, t, 2.2, 0.08, 1400, 300); },
    // Hint appearing: one quiet high note. Reset: two soft falling notes.
    hint(ctx, out, t) { Hallo.audio.tone(ctx, out, 1047, t, 1.6, 0.04); },
    reset(ctx, out, t) { Hallo.audio.tone(ctx, out, 660, t, 1, 0.07); Hallo.audio.tone(ctx, out, 494, t + 0.18, 1.3, 0.07); },
    // Overlay open / close: a gentle breath of air.
    open(ctx, out, t) { Hallo.audio.noise(ctx, out, t, 0.6, 0.07, 200, 700); },
    close(ctx, out, t) { Hallo.audio.noise(ctx, out, t, 0.6, 0.07, 700, 200); },
  },

  // A sine note with a soft attack and exponential decay. endFreq slides the pitch if given.
  tone(ctx, out, freq, t, dur, vol, endFreq) {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(freq, t);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.05);
  },

  // A water drop: a quick pitch dip into the note, a long soft ring, and a quiet octave above.
  drop(ctx, out, freq, t) {
    Hallo.audio.tone(ctx, out, freq * 1.5, t, 1.8, 0.1, freq);
    Hallo.audio.tone(ctx, out, freq * 2, t + 0.02, 1.2, 0.03);
  },

  // A sine that fades in slowly over 60% of its length, then out (swells).
  pad(ctx, out, freq, t, dur, vol) {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.05);
  },

  // Band-passed noise whose center frequency sweeps from f0 to f1 (scrapes, breaths).
  noise(ctx, out, t, dur, vol, f0, f1) {
    if (!this.noiseBuf) {
      const n = ctx.sampleRate;
      this.noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = ctx.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(out); s.start(t); s.stop(t + dur + 0.05);
  },
};
