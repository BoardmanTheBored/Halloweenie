// Close-up overlay shell: opens over the scene for a story, closes with the back arrow or Escape.
// "Open" is simply state.activeStory !== null, so everything else reads one source of truth.
Hallo.overlay = (() => {
  const el = document.getElementById('overlay');
  const back = document.getElementById('overlay-back');
  const LABELS = { 1: 'Statue close-up', 2: 'Fountain close-up', 3: 'Gates close-up' };
  let opener = null;                          // element to return focus to on close

  function open(story, fromEl) {
    if (Hallo.state.activeStory !== null) return;
    opener = fromEl || null;
    el.dataset.story = String(story);
    el.setAttribute('aria-label', LABELS[story]);
    // A completed story reopens in its finished state (full progress, Reset available).
    Hallo.setState({ activeStory: story, storyProgress: Hallo.state.completed[story - 1] ? 3 : 0 });
    Hallo.audio.play('open');
    back.focus({ preventScroll: true });
  }

  // Closing before a story finishes discards its tap progress (spec check 6).
  function close() {
    if (Hallo.state.activeStory === null) return;
    Hallo.setState({ activeStory: null, storyProgress: 0 });
    Hallo.audio.play('close');
    if (opener) opener.focus({ preventScroll: true });
    opener = null;
  }

  Hallo.onChange((s) => {
    const isOpen = s.activeStory !== null;
    el.classList.toggle('open', isOpen);
    // Reset is offered only on a completed story, never during its finale.
    el.classList.toggle('can-reset', isOpen && s.completed[s.activeStory - 1] === true && !s.sequence);
    // Inert while closed, paused, or while a finale plays: no taps, no keyboard focus.
    el.inert = !isOpen || s.paused || s.sequence;
  });

  back.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !Hallo.state.paused && !Hallo.state.sequence) close();
  });

  return { open, close };
})();
