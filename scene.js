// Main-scene hotspots. Stories unlock in order (statue, fountain, gates); a locked object gives
// soft "not yet" feedback and never triggers (spec). A completed story reopens its overlay for Reset.
(() => {
  const open = (id, story, unlocked) => {
    const el = document.getElementById(id);
    el.addEventListener('click', (e) => {
      if (Hallo.state.paused) return;
      if (unlocked(Hallo.state)) Hallo.overlay.open(story, el);
      else Hallo.feedback.soft(e);
    });
  };
  open('hot-statue', 1, () => true);
  open('hot-fountain', 2, (s) => s.completed[0]);
  // Gates (story 3) arrive in the next checkpoint: soft feedback only.
  open('hot-gates', 3, () => false);
})();
