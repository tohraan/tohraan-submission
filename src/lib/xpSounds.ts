// Windows XP-style sound effects using Web Audio API
const ctx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

function playTone(freq: number, duration: number, type: OscillatorType = "square", vol = 0.15) {
  try {
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + duration);
  } catch {}
}

export function xpError() {
  playTone(800, 0.1, "square", 0.12);
  setTimeout(() => playTone(600, 0.15, "square", 0.1), 100);
}

export function xpNotify() {
  playTone(523, 0.1, "sine", 0.1);
  setTimeout(() => playTone(659, 0.1, "sine", 0.1), 120);
  setTimeout(() => playTone(784, 0.15, "sine", 0.1), 240);
}

export function xpClick() {
  playTone(1000, 0.05, "square", 0.06);
}

export function xpShutdown() {
  playTone(784, 0.2, "sine", 0.1);
  setTimeout(() => playTone(659, 0.2, "sine", 0.08), 200);
  setTimeout(() => playTone(523, 0.2, "sine", 0.06), 400);
  setTimeout(() => playTone(392, 0.4, "sine", 0.05), 600);
}

export function flashBangSound() {
  try {
    const ac = ctx();
    const bufferSize = ac.sampleRate * 0.3;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = ac.createBufferSource();
    source.buffer = buffer;
    const gain = ac.createGain();
    gain.gain.value = 0.4;
    source.connect(gain);
    gain.connect(ac.destination);
    source.start();
  } catch {}
}

// Comedy crowd laugh - ascending bubbling tones
export function comedyLaugh() {
  const notes = [300, 350, 400, 350, 450, 400, 500, 450, 550];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.08, "sawtooth", 0.06), i * 60);
  });
  // Add some noise for "crowd" feel
  try {
    const ac = ctx();
    const bufferSize = ac.sampleRate * 0.6;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3 * Math.sin(i / 200) * (1 - i / bufferSize);
    }
    const source = ac.createBufferSource();
    source.buffer = buffer;
    const gain = ac.createGain();
    gain.gain.value = 0.08;
    source.connect(gain);
    gain.connect(ac.destination);
    source.start();
  } catch {}
}

// Siren sound - alternating high/low
export function sirenSound() {
  const ac = ctx();
  try {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(600, ac.currentTime);
    osc.frequency.linearRampToValueAtTime(1200, ac.currentTime + 0.3);
    osc.frequency.linearRampToValueAtTime(600, ac.currentTime + 0.6);
    osc.frequency.linearRampToValueAtTime(1200, ac.currentTime + 0.9);
    osc.frequency.linearRampToValueAtTime(600, ac.currentTime + 1.2);
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 1.2);
  } catch {}
}

// Crowd cheering - layered rising tones
export function crowdCheer() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      playTone(200 + Math.random() * 600, 0.15, "sawtooth", 0.04);
    }, i * 50);
  }
  // Rising fanfare
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, "sine", 0.08), i * 120);
  });
}
