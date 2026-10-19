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
};
