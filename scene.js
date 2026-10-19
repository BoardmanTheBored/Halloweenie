// Main-scene hotspots. Stories unlock in order, so only the statue responds fully for now;
// the fountain and gates give soft "not yet" feedback (spec: locked objects never trigger).
(() => {
  const statue = document.getElementById('hot-statue');
  statue.addEventListener('click', () => {
    if (Hallo.state.paused) return;
    Hallo.overlay.open(1, statue);
  });
  ['hot-fountain', 'hot-gates'].forEach((id) => {
    document.getElementById(id).addEventListener('click', (e) => {
      if (Hallo.state.paused) return;
      Hallo.feedback.soft(e);
    });
  });
})();
