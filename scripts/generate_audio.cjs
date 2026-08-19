const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

function createWavBuffer(samples, sampleRate = SAMPLE_RATE) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataLength = samples.length * (bitsPerSample / 8);
    const buffer = Buffer.alloc(44 + dataLength);

    // RIFF chunk
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataLength, 4);
    buffer.write('WAVE', 8);

    // fmt sub-chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // subchunk1 size
    buffer.writeUInt16LE(1, 20); // PCM format
    buffer.writeUInt16LE(numChannels, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(byteRate, 28);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(bitsPerSample, 34);

    // data sub-chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataLength, 40);

    for (let i = 0; i < samples.length; i++) {
        let s = Math.max(-1, Math.min(1, samples[i]));
        let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
        buffer.writeInt16LE(Math.floor(val), 44 + i * 2);
    }

    return buffer;
}

// 1. Button Click (Crisp bubble pop)
function generateClickSFX() {
    const duration = 0.08;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        const progress = i / numSamples;
        const freq = 650 + (1 - progress) * 800;
        const env = Math.exp(-progress * 15);
        samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.7;
    }
    return samples;
}

// 2. Magnifier Tap / Touch (Crisp glass pop / click)
function generateMagnifierTapSFX() {
    const duration = 0.09;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        const progress = i / numSamples;
        const freq = 920 + (1 - progress) * 600;
        const env = Math.exp(-progress * 18);
        const glassHarmonic = Math.sin(2 * Math.PI * (freq * 2.4) * t) * 0.3;
        samples[i] = (Math.sin(2 * Math.PI * freq * t) + glassHarmonic) * env * 0.65;
    }
    return samples;
}

// 3. Correct Found Item SFX (Magical triumphant chime arpeggio: C5 -> E5 -> G5 -> C6)
function generateFoundItemSFX() {
    const duration = 0.65;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const noteStep = 0.07;

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        let sum = 0;

        for (let n = 0; n < notes.length; n++) {
            const noteStart = n * noteStep;
            if (t >= noteStart) {
                const noteT = t - noteStart;
                const freq = notes[n];
                const env = Math.exp(-noteT * 6);
                const s1 = Math.sin(2 * Math.PI * freq * noteT);
                const s2 = Math.sin(2 * Math.PI * freq * 2 * noteT) * 0.4;
                const s3 = Math.sin(2 * Math.PI * freq * 3.01 * noteT) * 0.2;
                sum += (s1 + s2 + s3) * env * 0.35;
            }
        }
        samples[i] = sum;
    }
    return samples;
}

// 4. Non-Smart / Ordinary Item Wobble (Soft harp strum / gentle wobble)
function generateWobbleSoftSFX() {
    const duration = 0.45;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        const progress = i / numSamples;
        const freq = 330 + Math.sin(t * 24) * 20 - progress * 40;
        const env = Math.exp(-progress * 5.5);
        const wave = Math.sin(2 * Math.PI * freq * t) * 0.6 + Math.sin(2 * Math.PI * freq * 2 * t) * 0.25;
        samples[i] = wave * env * 0.45;
    }
    return samples;
}

// 5. Badge Stamp SFX (Rewarding punchy thud + golden sparkle)
function generateBadgeStampSFX() {
    const duration = 0.6;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        const thudEnv = Math.exp(-t * 22);
        const thudFreq = 140 * Math.exp(-t * 12) + 45;
        const thud = Math.sin(2 * Math.PI * thudFreq * t) * thudEnv * 0.8;

        const shimmerT = Math.max(0, t - 0.06);
        const shimmerEnv = Math.exp(-shimmerT * 4.5);
        const s1 = Math.sin(2 * Math.PI * 1318.51 * shimmerT) * 0.3;
        const s2 = Math.sin(2 * Math.PI * 1760.00 * shimmerT) * 0.2;

        samples[i] = thud + (s1 + s2) * shimmerEnv;
    }
    return samples;
}

// 6. Star Ding SFX (High crystal ping)
function generateStarSFX() {
    const duration = 0.5;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);
    const freq = 1318.51;

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        const env = Math.exp(-t * 6);
        const s1 = Math.sin(2 * Math.PI * freq * t);
        const s2 = Math.sin(2 * Math.PI * freq * 2.02 * t) * 0.3;
        const s3 = Math.sin(2 * Math.PI * freq * 4.05 * t) * 0.1;
        samples[i] = (s1 + s2 + s3) * env * 0.5;
    }
    return samples;
}

// 7. Victory Fanfare SFX
function generateVictorySFX() {
    const duration = 1.6;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    const melody = [
        { f: 392.00, start: 0.00, dur: 0.16 },
        { f: 523.25, start: 0.16, dur: 0.16 },
        { f: 659.25, start: 0.32, dur: 0.16 },
        { f: 783.99, start: 0.48, dur: 0.28 },
        { f: 659.25, start: 0.76, dur: 0.16 },
        { f: 1046.50, start: 0.92, dur: 0.6 }
    ];

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        let sum = 0;

        for (const note of melody) {
            if (t >= note.start && t < note.start + note.dur + 0.3) {
                const noteT = t - note.start;
                const env = Math.exp(-noteT * 3.2);
                const s1 = Math.sin(2 * Math.PI * note.f * noteT);
                const s2 = Math.sin(2 * Math.PI * note.f * 2 * noteT) * 0.35;
                const s3 = Math.sin(2 * Math.PI * note.f * 0.5 * noteT) * 0.2;
                sum += (s1 + s2 + s3) * env * 0.4;
            }
        }
        samples[i] = sum;
    }
    return samples;
}

// 8. Light Pizzicato / Xylophone Detective BGM
function generateBackgroundMusic() {
    const bpm = 115;
    const beatSec = 60 / bpm;
    const totalBeats = 16;
    const duration = totalBeats * beatSec;
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    const C5 = 523.25, Eb5 = 622.25, G5 = 783.99, Ab5 = 830.61, F5 = 698.46, C6 = 1046.50, B5 = 987.77, Bb5 = 932.33, D5 = 587.33;
    const C3 = 130.81, G3 = 196.00, Ab3 = 207.65, F3 = 174.61;

    const melodyNotes = [
        { f: C5, beat: 0.0, dur: 0.35 },
        { f: Eb5, beat: 0.5, dur: 0.35 },
        { f: G5, beat: 1.0, dur: 0.35 },
        { f: Ab5, beat: 1.5, dur: 0.35 },
        { f: G5, beat: 2.0, dur: 0.8 },
        { f: Eb5, beat: 3.0, dur: 0.8 },

        { f: F5, beat: 4.0, dur: 0.35 },
        { f: Ab5, beat: 4.5, dur: 0.35 },
        { f: C6, beat: 5.0, dur: 0.35 },
        { f: B5, beat: 5.5, dur: 0.35 },
        { f: G5, beat: 6.0, dur: 1.2 },

        { f: C5, beat: 8.0, dur: 0.35 },
        { f: Eb5, beat: 8.5, dur: 0.35 },
        { f: G5, beat: 9.0, dur: 0.35 },
        { f: C6, beat: 9.5, dur: 0.35 },
        { f: Bb5, beat: 10.0, dur: 0.8 },
        { f: G5, beat: 11.0, dur: 0.8 },

        { f: Ab5, beat: 12.0, dur: 0.35 },
        { f: G5, beat: 12.5, dur: 0.35 },
        { f: F5, beat: 13.0, dur: 0.35 },
        { f: D5, beat: 13.5, dur: 0.35 },
        { f: C5, beat: 14.0, dur: 1.8 }
    ];

    const bassNotes = [
        { f: C3, beat: 0.0, dur: 1.8 },
        { f: G3, beat: 2.0, dur: 1.8 },
        { f: F3, beat: 4.0, dur: 1.8 },
        { f: G3, beat: 6.0, dur: 1.8 },
        { f: C3, beat: 8.0, dur: 1.8 },
        { f: Ab3, beat: 10.0, dur: 1.8 },
        { f: F3, beat: 12.0, dur: 1.8 },
        { f: G3, beat: 14.0, dur: 1.8 }
    ];

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        let sum = 0;

        for (const n of melodyNotes) {
            const startT = n.beat * beatSec;
            if (t >= startT && t < startT + n.dur * beatSec + 0.2) {
                const noteT = t - startT;
                const env = Math.exp(-noteT * 7.5);
                const s = Math.sin(2 * Math.PI * n.f * noteT) * 0.7 +
                          Math.sin(2 * Math.PI * n.f * 2.02 * noteT) * 0.35 +
                          Math.sin(2 * Math.PI * n.f * 3.01 * noteT) * 0.15;
                sum += s * env * 0.28;
            }
        }

        for (const b of bassNotes) {
            const startT = b.beat * beatSec;
            if (t >= startT && t < startT + b.dur * beatSec + 0.1) {
                const noteT = t - startT;
                const env = Math.exp(-noteT * 3.5);
                const s = Math.sin(2 * Math.PI * b.f * noteT) * 0.6 +
                          Math.sin(2 * Math.PI * b.f * 2 * noteT) * 0.2;
                sum += s * env * 0.22;
            }
        }

        samples[i] = sum;
    }
    return samples;
}

const outDir = path.resolve(__dirname, '../public/assets/audio');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const audioClips = [
    { filename: 'click.wav', data: generateClickSFX() },
    { filename: 'correct.wav', data: generateFoundItemSFX() },
    { filename: 'wrong.wav', data: generateWobbleSoftSFX() },
    { filename: 'sfx_magnifier_tap.wav', data: generateMagnifierTapSFX() },
    { filename: 'sfx_found_item.wav', data: generateFoundItemSFX() },
    { filename: 'sfx_stamp_badge.wav', data: generateBadgeStampSFX() },
    { filename: 'sfx_wobble_soft.wav', data: generateWobbleSoftSFX() },
    { filename: 'star.wav', data: generateStarSFX() },
    { filename: 'victory.wav', data: generateVictorySFX() },
    { filename: 'bg_music.wav', data: generateBackgroundMusic() }
];

audioClips.forEach(clip => {
    const buf = createWavBuffer(clip.data);
    const dest = path.join(outDir, clip.filename);
    fs.writeFileSync(dest, buf);
    console.log(`Generated ${clip.filename} (${buf.length} bytes)`);
});

console.log('Audio generation completed successfully!');
