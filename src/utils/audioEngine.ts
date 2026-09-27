/**
 * TaalChakra Web Audio Percussion & Melodic Synthesizer
 * High-fidelity procedural acoustic synthesis for traditional Gujarati folk instruments,
 * singers' melodic phrases, shehnai, harmonium, bansuri, dhol, and stadium whistles.
 */

class FolkAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private currentVolume: number = 0.85;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.75;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getContext(): AudioContext {
    this.initContext();
    return this.ctx!;
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.currentVolume, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Synthesize Dhol Bass (Dha / Dhum)
   * Deep membrane resonance with pitch envelope drop
   */
  public playDholBass(volume = 1.0, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();

    // Body resonance
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(46, now + 0.16);

    gain.gain.setValueAtTime(0.95 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    // Deep sub thump
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.2);

    subGain.gain.setValueAtTime(0.7 * volume, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    subOsc.connect(subGain);
    gain.connect(this.masterGain!);
    subGain.connect(this.masterGain!);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.48);
    subOsc.stop(now + 0.42);
  }

  /**
   * Synthesize Dhol Treble (Ta / Kaati / Chaanti)
   * Crisp wooden stick hit on stretched goat-skin drum face
   */
  public playDholTreble(volume = 1.0, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    // Transient noise pop
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1450, now);
    filter.Q.setValueAtTime(3.4, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.85 * volume, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    // Body ping
    const ping = ctx.createOscillator();
    ping.type = 'triangle';
    ping.frequency.setValueAtTime(640, now);
    ping.frequency.exponentialRampToValueAtTime(230, now + 0.06);

    const pingGain = ctx.createGain();
    pingGain.gain.setValueAtTime(0.6 * volume, now);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain!);

    ping.connect(pingGain);
    pingGain.connect(this.masterGain!);

    noise.start(now);
    ping.start(now);
    noise.stop(now + 0.1);
    ping.stop(now + 0.1);
  }

  /**
   * Synthesize Manjira (Zil / Kansital)
   * High-pitched ringing brass hand cymbals
   */
  public playManjira(volume = 0.8, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(3450, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(4820, now);

    gain.gain.setValueAtTime(0.42 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.58);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain!);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  /**
   * Synthesize Ghunghroo (Ankle Bells)
   * Shimmering cluster of micro bell tinkles
   */
  public playGhunghroo(volume = 0.7, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5300, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.45 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    noise.start(now);
    noise.stop(now + 0.18);
  }

  /**
   * Synthesize Hand Clap (Taali)
   */
  public playClap(volume = 0.9, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1180, now);
    filter.Q.setValueAtTime(1.9, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.75 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    noise.start(now);
    noise.stop(now + 0.15);
  }

  /**
   * Synthesize Dandiya Stick Clash
   */
  public playDandiyaClash(volume = 0.95, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1920, now);
    osc.frequency.exponentialRampToValueAtTime(470, now + 0.04);

    gain.gain.setValueAtTime(0.85 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    // High transient snap
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }
    const snap = ctx.createBufferSource();
    snap.buffer = buffer;
    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(0.55 * volume, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain!);
    snap.connect(snapGain);
    snapGain.connect(this.masterGain!);

    osc.start(now);
    snap.start(now);
    osc.stop(now + 0.08);
    snap.stop(now + 0.04);
  }

  /**
   * Synthesize Sacred Temple Bell / Conch Chime (for mantras)
   */
  public playTempleChime(freq = 432, time?: number) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = time ?? ctx.currentTime;

    const freqs = [freq, freq * 1.5, freq * 2.01, freq * 2.76];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      const decay = 2.4 - idx * 0.4;
      gain.gain.setValueAtTime(0.2 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  /**
   * Synthesize Stadium Whistle (સીટી / તહૂકો)
   * High-pitch resonant sinusoidal chirp with flutter vibrato as heard in live ground Garba
   */
  public playWhistle(volume = 0.65) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const gain = ctx.createGain();

    // High energetic whistle tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1750, now);
    osc.frequency.exponentialRampToValueAtTime(2650, now + 0.12);
    osc.frequency.linearRampToValueAtTime(2450, now + 0.45);

    // Flutter vibrato (15 Hz)
    vibrato.frequency.setValueAtTime(16, now);
    vibratoGain.gain.setValueAtTime(120, now);

    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.6 * volume, now + 0.05);
    gain.gain.setValueAtTime(0.55 * volume, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    vibrato.start(now);
    osc.start(now);
    osc.stop(now + 0.58);
    vibrato.stop(now + 0.58);
  }

  /**
   * Synthesize Folk Harmonium Reed Tone
   */
  public playHarmoniumReed(freq = 440, duration = 0.5, volume = 0.4) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm reed detune
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.003, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1850, now);
    filter.Q.setValueAtTime(2.6, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.04);
    gain.gain.setValueAtTime(volume * 0.9, now + duration - 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.02);
    osc2.stop(now + duration + 0.02);
  }

  /**
   * Synthesize Shehnai Reed Tone (double-reed nasal harmonics for festive celebration)
   */
  public playShehnaiReed(freq = 523.25, duration = 0.5, volume = 0.35) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const filter1 = ctx.createBiquadFilter();
    const filter2 = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Shehnai nasal resonance around 1400 Hz and 2800 Hz
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(1420, now);
    filter1.Q.setValueAtTime(4.2, now);

    filter2.type = 'peaking';
    filter2.frequency.setValueAtTime(2850, now);
    filter2.gain.setValueAtTime(6, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  /**
   * Synthesize Bansuri Flute Tone (airy sinusoidal breath)
   */
  public playFluteTone(freq = 440, duration = 0.6, volume = 0.35) {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle 5Hz vibrato
    vibrato.frequency.setValueAtTime(5.2, now);
    vibGain.gain.setValueAtTime(6.5, now);
    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    vibrato.start(now);
    osc.start(now);
    osc.stop(now + duration + 0.02);
    vibrato.stop(now + duration + 0.02);
  }

  /**
   * Procedural Vocal Formant Call Synthesizer
   * Synthesizes vocalizations: 'haaMoj', 'ariri', 'heMaa', 'tahuko'
   */
  public playVocalCall(type: 'haaMoj' | 'ariri' | 'heMaa' | 'tahuko') {
    if (this.isMuted) return;
    this.initContext();
    const ctx = this.ctx!;
    const now = ctx.currentTime;

    if (type === 'tahuko') {
      this.playWhistle(0.8);
      return;
    }

    const osc = ctx.createOscillator();
    const f1 = ctx.createBiquadFilter();
    const f2 = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';

    if (type === 'haaMoj') {
      // Deep male folk baritone 'Haa Moj!'
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(185, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.45);

      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(750, now); // [a] vowel
      f1.Q.setValueAtTime(4.0, now);

      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(1250, now);
      f2.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.55, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    } else if (type === 'ariri') {
      // High pitch fast 'Ariri!' Sanedo shout
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
      osc.frequency.linearRampToValueAtTime(320, now + 0.35);

      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(450, now); // [i] formant
      f1.Q.setValueAtTime(5.0, now);

      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(2200, now);
      f2.Q.setValueAtTime(4.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    } else {
      // 'He Maa!' devotional exclamation
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(290, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.55);

      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(800, now);
      f1.Q.setValueAtTime(4.5, now);

      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(1350, now);
      f2.Q.setValueAtTime(4.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.65, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    }

    osc.connect(f1);
    f1.connect(f2);
    f2.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(now);
    osc.stop(now + 0.65);
  }

  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private songTimer: number | null = null;
  private melodyTimer: number | null = null;
  private speedMultiplier: number = 1.0;

  /**
   * Start / Stop Continuous Sacred Tanpura Drone (Sa - Pa)
   */
  public startDrone(baseFreq = 130.81, volume = 0.15) {
    if (this.isMuted) return;
    this.initContext();
    this.stopDrone();

    const ctx = this.ctx!;
    const now = ctx.currentTime;

    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.linearRampToValueAtTime(volume, now + 1.0);
    this.droneGain.connect(this.masterGain!);

    // Sa (Root)
    this.droneOsc1 = ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(baseFreq, now);
    this.droneOsc1.connect(this.droneGain);

    // Pa (Fifth)
    this.droneOsc2 = ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(baseFreq * 1.498, now);
    this.droneOsc2.connect(this.droneGain);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
  }

  public stopDrone() {
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    try {
      this.droneOsc1?.stop();
      this.droneOsc2?.stop();
    } catch {}
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
  }

  /**
   * Set playback speed multiplier (0.8x, 1.0x, 1.25x)
   */
  public setSpeedMultiplier(multiplier: number) {
    this.speedMultiplier = Math.max(0.5, Math.min(2.0, multiplier));
  }

  /**
   * Start continuous full song performance:
   * Combines Dhol percussion patterns, Manjira, Claps, Tanpura drone, and Melodic Harmonium / Shehnai sequences
   */
  public startSongAudio(
    bpm: number,
    rhythmTracks: {
      dholBass?: boolean[];
      dholTreble?: boolean[];
      manjira?: boolean[];
      clap?: boolean[];
    },
    melodySequence: { pitch: number; duration: number }[],
    onStep?: (step: number, elapsedBeats: number) => void
  ) {
    this.stopSongAudio();
    if (this.isMuted) return;
    this.initContext();

    this.startDrone(130.81, 0.12);

    const effectiveBpm = bpm * this.speedMultiplier;
    const stepIntervalMs = (60 / effectiveBpm / 4) * 1000;
    let step = 0;
    let beatCounter = 0;

    this.songTimer = window.setInterval(() => {
      if (rhythmTracks.dholBass && rhythmTracks.dholBass[step]) this.playDholBass(0.9);
      if (rhythmTracks.dholTreble && rhythmTracks.dholTreble[step]) this.playDholTreble(0.8);
      if (rhythmTracks.manjira && rhythmTracks.manjira[step]) this.playManjira(0.7);
      if (rhythmTracks.clap && rhythmTracks.clap[step]) this.playClap(0.85);

      // Periodically inject a cheerful Garba crowd whistle every 32 steps (2 full cycles)
      if (step === 0 && beatCounter > 0 && beatCounter % 48 === 0) {
        this.playWhistle(0.4);
      }

      beatCounter++;
      if (onStep) onStep(step, beatCounter);
      step = (step + 1) % 16;
    }, stepIntervalMs);

    // Play melody notes in loop
    if (melodySequence && melodySequence.length > 0) {
      let noteIndex = 0;
      const playNextNote = () => {
        if (!this.songTimer) return;
        const currentNote = melodySequence[noteIndex];
        const scaledDuration = (currentNote.duration / this.speedMultiplier);

        // Alternate between warm harmonium reed and shimmering shehnai
        if (noteIndex % 4 === 2) {
          this.playShehnaiReed(currentNote.pitch, scaledDuration, 0.38);
        } else {
          this.playHarmoniumReed(currentNote.pitch, scaledDuration, 0.45);
        }

        const nextDurationMs = scaledDuration * 1000 + 35;
        noteIndex = (noteIndex + 1) % melodySequence.length;
        this.melodyTimer = window.setTimeout(playNextNote, nextDurationMs);
      };

      playNextNote();
    }
  }

  public stopSongAudio() {
    if (this.songTimer) {
      window.clearInterval(this.songTimer);
      this.songTimer = null;
    }
    if (this.melodyTimer) {
      window.clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    this.stopDrone();
  }

  public playInstrument(type: string, volume = 1.0, time?: number) {
    switch (type) {
      case 'dholBass':
        this.playDholBass(volume, time);
        break;
      case 'dholTreble':
        this.playDholTreble(volume, time);
        break;
      case 'manjira':
        this.playManjira(volume, time);
        break;
      case 'ghunghroo':
        this.playGhunghroo(volume, time);
        break;
      case 'clap':
        this.playClap(volume, time);
        break;
      case 'dandiya':
        this.playDandiyaClash(volume, time);
        break;
      case 'whistle':
        this.playWhistle(volume);
        break;
      default:
        this.playClap(volume, time);
    }
  }
}

export const folkAudio = new FolkAudioEngine();
