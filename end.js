// Story-complete / credits panel. Two modes share one panel:
//   'complete'  opens after the gates finale (story message plus credits)
//   'credits'   opens from the small Credits link in the scene (credits only)
// "Open" is state.endScreen, so input blocking, hints and pause all read the one state object.
Hallo.endScreen = (() => {
  const panel = document.getElementById('end-screen');
  const title = document.getElementById('end-title');
  const link = document.getElementById('credits-link');
  const cont = document.getElementById('end-continue');
  let opener = null;                          // element to return focus to on close

  function open(mode) {
    if (Hallo.state.endScreen) return;
    opener = mode === 'credits' ? link : document.getElementById('hot-gates');
    panel.dataset.mode = mode;
    title.textContent = mode === 'complete' ? 'Come in' : 'Credits';
    Hallo.setState({ endScreen: true });
    cont.focus({ preventScroll: true });
  }

  function close() {
    if (!Hallo.state.endScreen) return;
    Hallo.setState({ endScreen: false });
    Hallo.audio.play('close');
    if (opener) opener.focus({ preventScroll: true });
    opener = null;
  }

  Hallo.onChange((s) => {
    panel.classList.toggle('open', s.endScreen);
    panel.inert = !s.endScreen || s.paused;   // no taps or keyboard focus while closed or paused
    // The Credits link is out of the way during overlays, finales and the panel itself.
    link.hidden = !s.started || s.activeStory !== null || s.sequence || s.endScreen;
  });

  link.addEventListener('click', () => {
    const s = Hallo.state;
    if (s.paused || s.sequence || s.activeStory !== null) return;
    Hallo.audio.play('open');
    open('credits');
  });
  cont.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !Hallo.state.paused) close();
  });

  link.hidden = true;                          // until Enter
  return { open, close };
})();
