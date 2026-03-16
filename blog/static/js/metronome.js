let audioContext;
let buffer;
let source;
let intervalId;
let isRunning = false;

// Attach to window so Hugo's HTML can find it
window.toggleMetronome = function () {
    if (!isRunning) {
        let bpmInput = document.getElementById("bpmInput");
        let bpm = parseInt(bpmInput.value);

        if (bpm <= 0 || !bpm) return;

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        loadTickSound();

        // Small delay to ensure sound is loaded before first tick
        setTimeout(() => playMetronome(bpm), 100);
        isRunning = true;
    } else {
        stopMetronome();
    }
}

function stopMetronome() {
    if (intervalId) clearInterval(intervalId);
    if (source) {
        try { source.stop(); } catch (e) { }
        source.disconnect();
    }
    if (audioContext) audioContext.close();
    isRunning = false;
}

function loadTickSound() {
    // Ensure this file is at static/media/metronome.wav
    let tickSoundUrl = "/media/metronome.wav";

    fetch(tickSoundUrl)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(decodedBuffer => {
            buffer = decodedBuffer;
        })
        .catch(error => console.error("Error loading tick sound:", error));
}

function playMetronome(bpm) {
    let interval = 60000 / bpm;
    intervalId = setInterval(() => {
        if (!buffer) return; // Wait until loaded
        source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        source.stop(audioContext.currentTime + 0.1);
    }, interval);
}