// Central state and pausable clock. Everything that moves, sounds, counts time or takes input
// reads this state, so Play/Pause is a single flip (spec: "System structure").
// Plain script (no modules) so the page also works from file:// during development.
const Hallo = {};

Hallo.state = {
  started: false,          // Enter pressed; scene is live
  paused: false,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  activeStory: null,       // null | 1 | 2 | 3
  storyProgress: 0,
  sequence: false,         // a story finale is playing: all other input is disabled
  endScreen: false,        // the story-complete / credits panel is open
  completed: [false, false, false],
};

// Time only advances while the scene is started and not paused.
Hallo.isRunning = () => Hallo.state.started && !Hallo.state.paused;

const stateListeners = [];
Hallo.onChange = (fn) => stateListeners.push(fn);
Hallo.setState = (patch) => {
  Object.assign(Hallo.state, patch);
  stateListeners.forEach((fn) => fn(Hallo.state));
};

// Pausable timers: story steps, hint ladder and other delays use this instead of setTimeout,
// so they freeze with Play/Pause and resume from the same point.
Hallo.clock = (() => {
  let now = 0;             // running time in ms (excludes paused time)
  let last = performance.now();
  let nextId = 1;
  let timers = [];

  setInterval(() => {
    const t = performance.now();
    const dt = t - last;
    last = t;
    if (!Hallo.isRunning()) return;
    now += dt;
    const due = timers.filter((x) => x.at <= now);
    timers = timers.filter((x) => x.at > now);
    due.forEach((x) => x.fn());
  }, 50);

  return {
    now: () => now,
    after(ms, fn) {
      const id = nextId++;
      timers.push({ id, at: now + ms, fn });
      return id;
    },
    cancel(id) { timers = timers.filter((x) => x.id !== id); },
  };
})();
