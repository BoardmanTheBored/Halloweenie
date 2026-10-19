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
};
