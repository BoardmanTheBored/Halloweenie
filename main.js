// Wiring: start screen, Play/Pause, and the state-to-DOM bridge.
(() => {
  const root = document.documentElement;
  const stage = document.getElementById('stage');
  const startScreen = document.getElementById('start-screen');
  const enterBtn = document.getElementById('enter-btn');
  const motionNote = document.getElementById('motion-note');
  const pauseBtn = document.getElementById('pause-btn');

  // Reflect state in the DOM. CSS reads these classes (paused freezes CSS animations,
  // reduced-motion swaps ambient motion for static or minimal effects).
  function render(s) {
    root.classList.toggle('paused', s.paused);
    root.classList.toggle('reduced-motion', s.reducedMotion);
    root.classList.toggle('started', s.started);
    root.classList.toggle('story1-done', s.completed[0]);   // the main scene renders each story's persistent change
    root.classList.toggle('story2-done', s.completed[1]);
    root.classList.toggle('story3-done', s.completed[2]);
    // Scene input is off before Enter, while paused, and while an overlay is open
    // (inert also blocks keyboard focus).
    stage.inert = !s.started || s.paused || s.activeStory !== null;
    motionNote.hidden = !s.reducedMotion;
    pauseBtn.setAttribute('aria-label', s.paused ? 'Play' : 'Pause');
    pauseBtn.setAttribute('aria-pressed', String(s.paused));
  }
  Hallo.onChange(render);

  // Honor the preference before Enter, and follow changes if the user flips it meanwhile.
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    Hallo.setState({ reducedMotion: e.matches });
  });

  enterBtn.addEventListener('click', () => {
    Hallo.audio.init();                       // same tap handler: unlocks iOS audio
    Hallo.setState({ started: true });
    startScreen.classList.add('leaving');     // fades out; removed from layout after the fade
    setTimeout(() => { startScreen.hidden = true; pauseBtn.focus(); }, 700);
  });

  function setPaused(paused) {
    Hallo.setState({ paused });
    Hallo.audio.setPaused(paused);
  }
  pauseBtn.addEventListener('click', () => setPaused(!Hallo.state.paused));

  // Leaving the tab pauses everything; the user resumes deliberately.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && Hallo.state.started && !Hallo.state.paused) setPaused(true);
  });

  render(Hallo.state);

  // ?debug: show hotspot bounds and a probe that proves motion and timers pause.
  if (new URLSearchParams(location.search).has('debug')) {
    root.classList.add('debug');
    const probe = document.getElementById('debug-probe');
    probe.hidden = false;
    const dot = probe.querySelector('.probe-dot');
    const count = probe.querySelector('.probe-count');
    setInterval(() => { count.textContent = String(Math.round(Hallo.clock.now() / 100) / 10); }, 100);
    dot.dataset.ready = '1';
  }
})();
