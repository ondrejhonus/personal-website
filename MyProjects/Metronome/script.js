let audioContext;
let buffer;
let source;
let intervalId;

function startMetronome() {
  let bpmInput = document.getElementById("bpmInput");
  let bpm = parseInt(bpmInput.value);

  if (!bpm || bpm <= 0) {
    alert("Please enter a valid BPM value.");
    return;
  }

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  loadTickSound();
  playMetronome(bpm);
}

function loadTickSound() {
  // You may need to adjust the path to your tick sound file
  let tickSoundUrl = "media/metronome.wav";

  fetch(tickSoundUrl)
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data))
    .then((decodedBuffer) => {
      buffer = decodedBuffer;
    })
    .catch((error) => console.error("Error loading tick sound:", error));
}

function playMetronome(bpm) {
  let interval = 60000 / bpm; // Calculate interval in milliseconds

  intervalId = setInterval(() => {
    source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();

    // You may want to adjust the duration of the tick sound
    let tickDuration = 0.1; // in seconds

    // Stop the source node after the tick duration
    source.stop(audioContext.currentTime + tickDuration);
  }, interval);
}

function stopMetronome() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (source) {
    source.stop();
    source.disconnect(audioContext.destination);
  }
  if (audioContext) {
    audioContext.close();
  }
}
