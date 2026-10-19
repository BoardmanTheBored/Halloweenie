// Checkpoint 1: layout only. State, audio, effects and interaction arrive in later checkpoints.
if (new URLSearchParams(location.search).has('debug')) {
  document.documentElement.classList.add('debug');
  // Sample text so hint-line placement can be checked while cropping.
  document.getElementById('hint-line').textContent = 'Something in the garden is watching the moon.';
}
