// Web Audio API based celebration sound generator
// Zero network dependencies, works 100% offline, crystal clear and responsive

class SoundEffectManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check saved mute preference
    const savedMute = localStorage.getItem('kaoyan_battle_station_mute');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('kaoyan_battle_station_mute', String(muted));
    } catch {
      // Ignore localStorage error
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Play realistic applause sound (cluster of rapid hand claps)
   */
  public playApplause() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const totalClaps = 18;
    const now = ctx.currentTime;

    for (let i = 0; i < totalClaps; i++) {
      const clapTime = now + (i * 0.055) + (Math.random() * 0.03 - 0.015);
      this.createSingleClap(ctx, clapTime, 0.25 + Math.random() * 0.25);
    }
  }

  private createSingleClap(ctx: AudioContext, time: number, volume: number) {
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Filtered pinkish noise for clap body
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + (0.04 * white)) / 1.04;
      data[i] = (lastOut * 2.8 + white * 0.3) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass around resonant frequencies of hand clapping (1000Hz - 1800Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100 + Math.random() * 500, time);
    filter.Q.setValueAtTime(1.8, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  /**
   * Play cheering crowd vocal wave sound
   */
  public playCheering() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 1.2;

    // Multi-voice cheering chords and formant resonance
    const pitches = [330, 392, 494, 587, 659]; // E4, G4, B4, D5, E5
    pitches.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'triangle' : 'sawtooth';
      // Pitch inflection: swoop upwards excitedly
      osc.frequency.setValueAtTime(freq * 0.95, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + duration);

      // Resonant formant filter like "Yeah/Woo"
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700 + idx * 250, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08 / pitches.length, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });

    // Layer with subtle background applause
    for (let i = 0; i < 12; i++) {
      const clapTime = now + 0.1 + (i * 0.07) + (Math.random() * 0.04);
      this.createSingleClap(ctx, clapTime, 0.15 + Math.random() * 0.15);
    }
  }

  /**
   * Play triumphant fanfare chime (C - E - G - high C)
   */
  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, t: 0, d: 0.12 },     // C5
      { f: 659.25, t: 0.1, d: 0.12 },    // E5
      { f: 783.99, t: 0.2, d: 0.15 },    // G5
      { f: 1046.50, t: 0.32, d: 0.5 },   // C6
    ];

    const now = ctx.currentTime;

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0.001, now + note.t);
      gain.gain.linearRampToValueAtTime(0.18, now + note.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.05);
    });
  }

  /**
   * Play victory sparkle chime
   */
  public playVictoryChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const chords = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
    const now = ctx.currentTime;

    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.5);
    });
  }

  /**
   * Play alert chime for schedule time nodes
   */
  public playChime() {
    this.playVictoryChime();
  }

  /**
   * Randomly trigger one of the celebration sound effects:
   * - 鼓掌 (Applause)
   * - 欢呼+掌声 (Cheering)
   * - 胜利号角 (Fanfare)
   * - 清脆通关音 (Victory Chime)
   */
  public playRandomCelebration() {
    if (this.isMuted) return;
    const rand = Math.random();
    if (rand < 0.35) {
      this.playApplause();
    } else if (rand < 0.65) {
      this.playCheering();
    } else if (rand < 0.85) {
      this.playFanfare();
    } else {
      this.playVictoryChime();
    }
  }
}

export const soundManager = new SoundEffectManager();
