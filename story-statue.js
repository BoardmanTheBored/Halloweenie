// Story 1, the statue ("Look"): tap the eyes, then the raised hand, then the moon.
// The third tap starts a ~7 s finale (moon swells, head turns toward the castle, a bell tolls,
// the statue stills), then the overlay fades back to the scene, which keeps the change.
(() => {
  const overlay = document.getElementById('overlay');
  const closeup = document.getElementById('closeup-1');
  const resetBtn = document.getElementById('overlay-reset');
  const ORDER = ['eyes', 'hand', 'moon'];
  const ACTIVE = ['done-eyes', 'done-hand', 'done-moon', 'pop-eyes', 'pop-hand', 'pop-moon'];
  const SEQUENCE = ['seq-moon', 'seq-turn', 'seq-calm'];

  // What each correct tap does: a one-shot "pop" plus a lasting glow (the visible progress).
  function advance(name) {
    closeup.classList.add('done-' + name, 'pop-' + name);
    Hallo.audio.play(name);
    Hallo.setState({ storyProgress: Hallo.state.storyProgress + 1 });
    if (Hallo.state.storyProgress === ORDER.length) playFinale();
  }

  // A wrong tap (out of order, or a target already done) starts the sequence over.
  // Feedback stays soft: ring and quiet thud, and the glows fade back out.
  function resetProgress() {
    closeup.classList.remove(...ACTIVE);
    Hallo.setState({ storyProgress: 0 });
  }

  ORDER.forEach((name) => {
    document.getElementById('t-' + name).addEventListener('click', (e) => {
      const s = Hallo.state;
      if (s.activeStory !== 1 || s.paused || s.sequence) return;
      if (s.completed[0]) { Hallo.feedback.soft(e); return; }   // finished: soft only; Reset is the way back
      if (ORDER[s.storyProgress] === name) {
        advance(name);
      } else {
        Hallo.feedback.soft(e);
        resetProgress();
      }
    });
  });

  // Finale timeline. Every step runs on the pausable clock and the visuals are CSS animations,
  // so Play/Pause freezes and resumes the whole sequence from the same point.
  function playFinale() {
    const after = Hallo.clock.after;
    Hallo.setState({ sequence: true });
    closeup.classList.add('seq-moon');                       // 0.0 s: moon swells
    Hallo.audio.play('swell');
    after(1800, () => {                                      // 1.8 s: head turns toward the castle
      closeup.classList.add('seq-turn');
      Hallo.audio.play('grind');
    });
    after(4600, () => Hallo.audio.play('bell'));             // 4.6 s: distant bell
    after(5600, () => {                                      // 5.6 s: the statue stills, glows settle
      closeup.classList.remove('seq-moon', 'done-eyes', 'done-hand', 'done-moon');
      closeup.classList.add('seq-calm');
    });
    after(7000, () => {                                      // 7.0 s: done; fade back to the scene
      closeup.classList.remove(...ACTIVE, ...SEQUENCE);
      Hallo.setState({ completed: [true, Hallo.state.completed[1], Hallo.state.completed[2]], sequence: false });
      Hallo.overlay.close();
    });
  }

  // Reset: return the statue to its pre-story look so the story can be played again.
  resetBtn.addEventListener('click', () => {
    const s = Hallo.state;
    if (s.activeStory !== 1 || !s.completed[0] || s.paused || s.sequence) return;
    closeup.classList.remove(...ACTIVE, ...SEQUENCE);
    Hallo.setState({ completed: [false, s.completed[1], s.completed[2]], storyProgress: 0 });
    Hallo.audio.play('reset');
    document.getElementById('t-eyes').focus({ preventScroll: true });   // the Reset button just disappeared
  });

  // The completed look (head turned, faint eye glow) lives on a class so the overlay and
  // the main scene (html.story1-done, set in main.js) always agree with state.
  Hallo.onChange((s) => {
    closeup.classList.toggle('is-complete', s.completed[0]);
    // Not open and no progress: make sure no half-finished glows linger.
    if (s.activeStory !== 1 && s.storyProgress === 0 && !s.sequence) closeup.classList.remove(...ACTIVE);
  });
  closeup.addEventListener('animationend', (e) => {
    const m = /^pop-(\w+)$/.exec(e.animationName);
    if (m) closeup.classList.remove('pop-' + m[1]);
  });
})();
