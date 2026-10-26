// Progressive hints in the bottom text line. After a stretch of idle time a hint appears; each
// further idle stretch shows the next, more direct one (max three). Timing uses the pausable
// clock, so hints freeze with Play/Pause. Hints only point at the next unlocked story.
Hallo.hints = (() => {
  const line = document.getElementById('hint-line');

  // Which ladder applies right now, or null for no hints (finale playing, or nothing left to unlock yet).
  const MAIN = [
    'Something in the garden is watching the moon.',
    'The old statue seems to have more to show, up close.',
    'Take a closer look at the statue.',
  ];
  const STATUE = [
    'Statues keep their secrets close. Look where it looks.',
    'Eyes first, then reach out, then look to the sky.',
    'Touch the eyes, then the raised hand, then the moon, in that order.',
  ];
  const MAIN_FOUNTAIN = [
    'Water remembers what the moon forgets.',
    'The fountain’s dark water is waiting for something.',
    'Take a closer look at the fountain.',
  ];
  const FOUNTAIN = [
    'Still water answers to a gentle touch.',
    'Touch the water, and listen to what it says back.',
    'Tap the water three times, slowly.',
  ];
  const MAIN_GATES = [
    'The gates are waiting to be asked.',
    'The gatehouse feels expectant, as if someone is due.',
    'Take a closer look at the gates.',
  ];
  const GATES = [
    'A welcome needs light before it needs a knock.',
    'Light both lanterns, then ask to come in.',
    'Tap the two lanterns, then the knocker.',
  ];
  function ladder() {
    const s = Hallo.state;
    if (!s.started || s.sequence) return null;
    if (s.activeStory === null) return !s.completed[0] ? MAIN : !s.completed[1] ? MAIN_FOUNTAIN : !s.completed[2] ? MAIN_GATES : null;
    if (s.activeStory === 1 && !s.completed[0]) return STATUE;
    if (s.activeStory === 2 && !s.completed[1]) return FOUNTAIN;
    if (s.activeStory === 3 && !s.completed[2]) return GATES;
    return null;
  }

  const api = { idleMs: 13000 };     // spec: first hint after ~12-15 s idle, then every ~12-15 s
  let level = 0;
  let timer = null;

  function schedule() {
    if (timer !== null) Hallo.clock.cancel(timer);
    timer = null;
    const l = ladder();
    if (l && level < l.length) timer = Hallo.clock.after(api.idleMs, show);
  }

  function show() {
    timer = null;
    const l = ladder();
    if (!l || level >= l.length) return;
    line.textContent = l[level++];
    Hallo.audio.play('hint');
    schedule();
  }

  // New context (opened, closed, progress made, finale, reset): start the ladder over.
  function restart() {
    level = 0;
    line.textContent = '';
    schedule();
  }

  // Any touch counts as activity and restarts the idle wait, but keeps the hint level
  // (so a wrong tap does not send the player back to the vaguest hint).
  document.addEventListener('pointerdown', schedule);

  let prev = {};
  Hallo.onChange((s) => {
    const changed = s.started !== prev.started || s.activeStory !== prev.activeStory
      || s.sequence !== prev.sequence || s.completed[0] !== prev.completed0 || s.completed[1] !== prev.completed1 || s.completed[2] !== prev.completed2
      || s.storyProgress > prev.storyProgress;
    prev = { started: s.started, activeStory: s.activeStory, sequence: s.sequence,
      completed0: s.completed[0], completed1: s.completed[1], completed2: s.completed[2], storyProgress: s.storyProgress };
    if (changed) restart();
  });

  return api;
})();
