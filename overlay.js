// Close-up overlay shell: opens over the scene for a story, closes with the back arrow or Escape.
// "Open" is simply state.activeStory !== null, so everything else reads one source of truth.
Hallo.overlay = (() => {
  const el = document.getElementById('overlay');
  const back = document.getElementById('overlay-back');
  let opener = null;                          // element to return focus to on close

  function open(story, fromEl) {
    if (Hallo.state.activeStory !== null) return;
    opener = fromEl || null;
    el.dataset.story = String(story);
    Hallo.setState({ activeStory: story, storyProgress: 0 });
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
    // Inert while closed or paused: no taps, no keyboard focus.
    el.inert = !isOpen || s.paused;
  });

  back.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !Hallo.state.paused) close();
  });

  return { open, close };
})();
