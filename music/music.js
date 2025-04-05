const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const notes = [
    { note: 'E5', duration: 0.5, time: 0 },    // Рас-цве
    { note: 'F#5', duration: 0.5, time: 0.5 }, // та-ли
    { note: 'B5', duration: 1.0, time: 1.0 },  // яб-ло-ни
    { note: 'A5', duration: 0.5, time: 2.0 },  // и
    { note: 'G#5', duration: 0.5, time: 2.5 }, // гру
    { note: 'F#5', duration: 0.5, time: 3.0 }, // -ши
    { note: 'E5', duration: 1.5, time: 3.5 }   // Поп-лы-ли ту-ма-ны...
];


function playFrequency(frequency, startTime, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + startTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime + startTime);
    oscillator.stop(audioContext.currentTime + startTime + duration);
}

function noteToFrequency(note) {
    const noteMap = {
        'G4': 391.99, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.26,
        'F5': 698.46
    };
    return noteMap[note] || 440;
}

function playNote(note) {
    playFrequency(noteToFrequency(note), 0, 1);
}

function playMelody() {
    notes.forEach(({ note, time, duration }) => {
        playFrequency(noteToFrequency(note), time, duration);
    });
}

const container = document.createElement('div');
document.body.appendChild(container);

notes.forEach(({ note }) => {
    const button = document.createElement('button');
    button.textContent = note;
    button.onclick = () => playNote(note);
    container.appendChild(button);
});

const playAllButton = document.createElement('button');
playAllButton.textContent = 'Проиграть 7 нот Катюши';
playAllButton.onclick = playMelody;
container.appendChild(playAllButton);