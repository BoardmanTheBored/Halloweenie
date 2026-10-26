// Story 3, the gates ("Come in"): light the two lanterns, then use the knocker.
// The knock starts an ~8.6 s finale: the gates swing slowly open on candlelight and mist, wait,
// then close softly to a crack. Unlocked by the fountain story; structure mirrors the other stories.
(() => {
  const closeup = document.getElementById('closeup-3');
  const resetBtn = document.getElementById('overlay-reset');
  const lampL = document.getElementById('t-lamp-l');
  const lampR = document.getElementById('t-lamp-r');
  const knocker = document.getElementById('t-knocker');
  const ACTIVE = ['done-lampl', 'done-lampr', 'pop-lampl', 'pop-lampr', 'pop-knock'];
  const SEQUENCE = ['seq-knock', 'seq-open', 'seq-hold', 'seq-close'];

  // What each correct tap does: a lasting glow (the visible progress) plus a one-shot pop.
  function advance(cls, sound) {
    closeup.classList.add('done-' + cls, 'pop-' + cls);
    Hallo.audio.play(sound);
    Hallo.setState({ storyProgress: Hallo.state.storyProgress + 1 });
  }

  // A wrong tap (an already-lit lantern, or the knocker before both lanterns are lit)
  // gives soft feedback and starts the sequence over; the lanterns go dark again.
  function resetProgress() {
    closeup.classList.remove(...ACTIVE);
    Hallo.setState({ storyProgress: 0 });
  }

  function onLantern(side) {
    return (e) => {
      const s = Hallo.state;
      if (s.activeStory !== 3 || s.paused || s.sequence) return;
      if (s.completed[2]) { Hallo.feedback.soft(e); return; }   // finished: soft only; Reset is the way back
      if (closeup.classList.contains('done-lamp' + side)) {      // already lit
        Hallo.feedback.soft(e); resetProgress(); return;
      }
      advance('lamp' + side, 'ignite' + (s.storyProgress + 1));
    };
  }
  lampL.addEventListener('click', onLantern('l'));
  lampR.addEventListener('click', onLantern('r'));

  knocker.addEventListener('click', (e) => {
    const s = Hallo.state;
    if (s.activeStory !== 3 || s.paused || s.sequence) return;
    if (s.completed[2]) { Hallo.feedback.soft(e); return; }
    if (s.storyProgress !== 2) { Hallo.feedback.soft(e); resetProgress(); return; }
    closeup.classList.add('pop-knock');
    Hallo.setState({ storyProgress: 3 });
    playFinale();
  });

  // Finale timeline on the pausable clock; visuals are CSS animations, so Play/Pause freezes them too.
  function playFinale() {
    const after = Hallo.clock.after;
    Hallo.setState({ sequence: true });
    closeup.classList.add('seq-knock');                       // 0.0 s: two knocks and an echo
    Hallo.audio.play('knock');
    after(1400, () => {                                       // 1.4 s: the gates swing slowly open
      closeup.classList.add('seq-open');
      Hallo.audio.play('creak');
    });
    after(4400, () => closeup.classList.add('seq-hold'));     // 4.4 s: they wait; candlelight breathes
    after(5600, () => {                                       // 5.6 s: they close softly, to a crack
      closeup.classList.remove('seq-open', 'seq-hold');
      closeup.classList.add('seq-close');
      Hallo.audio.play('creakClose');
    });
    after(7800, () => Hallo.audio.play('thud'));              // 7.8 s: they settle
    after(8600, () => {                                       // 8.6 s: done; fade back to the scene
      closeup.classList.remove(...ACTIVE, ...SEQUENCE);
      Hallo.setState({ completed: [Hallo.state.completed[0], Hallo.state.completed[1], true], sequence: false });
      Hallo.overlay.close();
      Hallo.endScreen.open('complete');                       // story complete, with the credits
    });
  }

  // Reset: close the gates and put the lanterns out so the story can be replayed.
  resetBtn.addEventListener('click', () => {
    const s = Hallo.state;
    if (s.activeStory !== 3 || !s.completed[2] || s.paused || s.sequence) return;
    closeup.classList.remove(...ACTIVE, ...SEQUENCE);
    Hallo.setState({ completed: [s.completed[0], s.completed[1], false], storyProgress: 0 });
    Hallo.audio.play('reset');
    lampL.focus({ preventScroll: true });                     // the Reset button just disappeared
  });

  // The completed look (gates ajar, lanterns lit, candlelight and mist) lives on a class so the
  // overlay and the main scene (html.story3-done) always agree with state.
  Hallo.onChange((s) => {
    closeup.classList.toggle('is-complete', s.completed[2]);
    if (s.activeStory !== 3 && s.storyProgress === 0 && !s.sequence) closeup.classList.remove(...ACTIVE);
  });
})();
