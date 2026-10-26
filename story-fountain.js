// Story 2, the fountain ("Remember"): tap the water three times, each with its own drop and ring.
// The third tap starts a ~7 s finale: moonlight falls into the basin, the castle's reflection
// appears as it once was, a tower window pulses warmly, then the ripples wash away.
// Unlocked by the statue story; structure mirrors story-statue.js.
(() => {
  const closeup = document.getElementById('closeup-2');
  const resetBtn = document.getElementById('overlay-reset');
  const water = document.getElementById('t-water');
  const TAPS = 3;
  const ACTIVE = ['done-ring1', 'done-ring2', 'done-ring3', 'pop-ring1', 'pop-ring2', 'pop-ring3'];
  const SEQUENCE = ['seq-moon', 'seq-pull', 'seq-reflect', 'seq-pulse', 'seq-calm'];

  water.addEventListener('click', (e) => {
    const s = Hallo.state;
    if (s.activeStory !== 2 || s.paused || s.sequence) return;
    if (s.completed[1]) { Hallo.feedback.soft(e); return; }   // finished: soft only; Reset is the way back
    const n = s.storyProgress + 1;
    closeup.classList.add('done-ring' + n, 'pop-ring' + n);   // a lasting ring in the water per tap
    Hallo.audio.play('drop' + n);
    Hallo.setState({ storyProgress: n });
    if (n === TAPS) playFinale();
  });

  // Finale timeline on the pausable clock; visuals are CSS animations, so Play/Pause freezes them too.
  function playFinale() {
    const after = Hallo.clock.after;
    Hallo.setState({ sequence: true });
    closeup.classList.add('seq-moon', 'seq-pull');            // 0.0 s: moon swells, moonlight falls to the water
    Hallo.audio.play('swell');
    after(1800, () => {                                       // 1.8 s: the reflection appears
      closeup.classList.add('seq-reflect');
      Hallo.audio.play('shimmer');
    });
    after(3600, () => closeup.classList.add('seq-pulse'));    // 3.6 s: a tower window glows warmly
    after(5200, () => {                                       // 5.2 s: ripples wash away, moon calms
      closeup.classList.remove('seq-moon', 'seq-pull', 'done-ring1', 'done-ring2', 'done-ring3');
      closeup.classList.add('seq-calm');
      Hallo.audio.play('wash');
    });
    after(7000, () => {                                       // 7.0 s: done; fade back to the scene
      closeup.classList.remove(...ACTIVE, ...SEQUENCE);
      Hallo.setState({ completed: [Hallo.state.completed[0], true, Hallo.state.completed[2]], sequence: false });
      Hallo.overlay.close();
    });
  }

  // Reset: empty the basin again so the story can be replayed.
  resetBtn.addEventListener('click', () => {
    const s = Hallo.state;
    if (s.activeStory !== 2 || !s.completed[1] || s.paused || s.sequence) return;
    closeup.classList.remove(...ACTIVE, ...SEQUENCE);
    Hallo.setState({ completed: [s.completed[0], false, s.completed[2]], storyProgress: 0 });
    Hallo.audio.play('reset');
    water.focus({ preventScroll: true });                     // the Reset button just disappeared
  });

  // The completed look (dim lingering reflection) lives on a class so the overlay always agrees with state.
  Hallo.onChange((s) => {
    closeup.classList.toggle('is-complete', s.completed[1]);
    if (s.activeStory !== 2 && s.storyProgress === 0 && !s.sequence) closeup.classList.remove(...ACTIVE);
  });
})();
