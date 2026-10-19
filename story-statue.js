// Story 1, the statue ("Look"): tap the eyes, then the raised hand, then the moon.
// This checkpoint covers the ordered taps and their feedback; the finale sequence comes next.
(() => {
  const closeup = document.getElementById('closeup-1');
  const ORDER = ['eyes', 'hand', 'moon'];

  // What each correct tap does: a one-shot "pop" plus a lasting glow (the visible progress).
  function advance(name) {
    closeup.classList.add('done-' + name, 'pop-' + name);
    Hallo.audio.play(name);
    Hallo.setState({ storyProgress: Hallo.state.storyProgress + 1 });
  }

  // A wrong tap (out of order, or a target already done) starts the sequence over.
  // Feedback stays soft: ring and quiet thud, and the glows fade back out.
  function resetProgress() {
    closeup.classList.remove('done-eyes', 'done-hand', 'done-moon', 'pop-eyes', 'pop-hand', 'pop-moon');
    Hallo.setState({ storyProgress: 0 });
  }

  ORDER.forEach((name) => {
    document.getElementById('t-' + name).addEventListener('click', (e) => {
      const s = Hallo.state;
      if (s.activeStory !== 1 || s.paused) return;
      if (ORDER[s.storyProgress] === name) {
        advance(name);
      } else {
        Hallo.feedback.soft(e);
        resetProgress();
      }
    });
  });

  // Clear the close-up whenever the story is not open (progress was discarded on close).
  Hallo.onChange((s) => {
    if (s.activeStory !== 1 && s.storyProgress === 0) {
      closeup.classList.remove('done-eyes', 'done-hand', 'done-moon', 'pop-eyes', 'pop-hand', 'pop-moon');
    }
  });
  closeup.addEventListener('animationend', (e) => {
    const m = /^pop-(\w+)$/.exec(e.animationName);
    if (m) closeup.classList.remove('pop-' + m[1]);
  });
})();
