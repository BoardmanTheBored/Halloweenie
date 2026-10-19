// Soft tap feedback shared by the scene and the overlays: an expanding ring where the tap landed.
// Keyboard activation (no pointer position) rings from the center of the control instead.
Hallo.feedback = {
  ripple(event) {
    const layer = document.getElementById('ripple-layer');
    let x = event.clientX; let y = event.clientY;
    if (!event.detail || (!x && !y)) {                   // keyboard "click"
      const r = event.currentTarget.getBoundingClientRect();
      x = r.left + r.width / 2; y = r.top + r.height / 2;
    }
    const el = document.createElement('div');
    el.className = 'ripple';
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.addEventListener('animationend', () => el.remove());
    layer.appendChild(el);
  },

  // Out-of-order or locked tap: ring plus quiet thud, nothing else changes.
  soft(event) {
    this.ripple(event);
    Hallo.audio.play('soft');
  },
};
