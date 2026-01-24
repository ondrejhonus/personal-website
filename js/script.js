let audioContext;
let buffer;
let source;
let intervalId;
let isRunning = false;

function toggleMetronome() {
  if (!isRunning) {
    let bpmInput = document.getElementById("bpmInput");
    let bpm = parseInt(bpmInput.value);
    if (bpm <= 0 || !bpm){
      return;
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    loadTickSound();
    playMetronome(bpm);
    isRunning = true;
  }
  else{
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
    isRunning = false;
  }
}

function loadTickSound() {
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
  let interval = 60000 / bpm;

  intervalId = setInterval(() => {
    source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();

    let tickDuration = 0.1;

    source.stop(audioContext.currentTime + tickDuration);
  }, interval);
}

const switchMode = document.getElementById('lightThing');
const html = document.getElementById('themeSwitch');
const switchIcon = document.getElementById('switchIcon');

let isDark = JSON.parse(localStorage.getItem('isDark')) || false;

function darkModeSwitch() {
    if (isDark) {
        html.removeAttribute('data-theme');
        html.setAttribute('data-theme', 'light');
        switchIcon.classList.add('fas', 'fa-sun');
        switchIcon.classList.remove('fa-moon');
        isDark = false;
        localStorage.setItem("isDark", false);
    }
    else {
        html.removeAttribute('data-theme');
        html.setAttribute('data-theme', 'dark');
        switchIcon.classList.add('fas', 'fa-moon');
        switchIcon.classList.remove('fa-sun');
        isDark = true;
        localStorage.setItem("isDark", true);
    }
}
darkModeSwitch();
darkModeSwitch();

switchIcon.addEventListener('click', () => {
    darkModeSwitch();
});

