import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, Plus, Minus, Disc3, Zap, Music } from 'lucide-react';
import { TAAL_PRESETS } from '../data/garbaData';
import { folkAudio } from '../utils/audioEngine';
import { InstrumentType, TaalPreset } from '../types';

interface TaalSequencerProps {
  isMuted: boolean;
}

const INSTRUMENT_META: Record<
  InstrumentType,
  { label: string; gujarati: string; short: string; note: string; color: string; bgAccent: string; activeBorder: string }
> = {
  dholBass: {
    label: 'Dhol Bass (Dha)',
    gujarati: 'ઢોલ ધા / ધૂમ',
    short: 'Dhol Bass',
    note: 'Deep resonant wooden skin thump',
    color: 'text-amber-400',
    bgAccent: 'bg-amber-500',
    activeBorder: 'border-amber-300',
  },
  dholTreble: {
    label: 'Dhol Treble (Ta)',
    gujarati: 'ઢોલ તા / છાંટી',
    short: 'Dhol Treble',
    note: 'High-pitched snappy stick stroke',
    color: 'text-orange-400',
    bgAccent: 'bg-orange-500',
    activeBorder: 'border-orange-300',
  },
  manjira: {
    label: 'Manjira (Brass Chime)',
    gujarati: 'કાંસીજોડ / મંજીરા',
    short: 'Manjira',
    note: 'Sustained metallic overtone ring',
    color: 'text-yellow-400',
    bgAccent: 'bg-yellow-400',
    activeBorder: 'border-yellow-200',
  },
  ghunghroo: {
    label: 'Ghunghroo (Ankle Bells)',
    gujarati: 'ઘૂંઘરૂ ઝણકાર',
    short: 'Ghunghroo',
    note: 'Continuous micro-bell shivers',
    color: 'text-rose-400',
    bgAccent: 'bg-rose-500',
    activeBorder: 'border-rose-300',
  },
  clap: {
    label: 'Palm Clap (Taali)',
    gujarati: 'તાળી / હાથ તાલ',
    short: 'Palm Clap',
    note: 'Authentic warm palm resonance',
    color: 'text-emerald-400',
    bgAccent: 'bg-emerald-500',
    activeBorder: 'border-emerald-300',
  },
  vocalBol: {
    label: 'Vocal Bol (Garba)',
    gujarati: 'ગરબા બોલ',
    short: 'Vocal Bol',
    note: 'Sacred invocation accent',
    color: 'text-indigo-400',
    bgAccent: 'bg-indigo-500',
    activeBorder: 'border-indigo-300',
  },
};

export const TaalSequencer: React.FC<TaalSequencerProps> = ({ isMuted }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('tran_taali');
  const [bpm, setBpm] = useState<number>(102);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [grid, setGrid] = useState<Record<InstrumentType, boolean[]>>(() => {
    const preset = TAAL_PRESETS.find((p) => p.id === 'tran_taali') || TAAL_PRESETS[0];
    return JSON.parse(JSON.stringify(preset.tracks));
  });

  const lastTapRef = useRef<number>(0);
  const tapDiffsRef = useRef<number[]>([]);
  const timerRef = useRef<number | null>(null);

  // Sync preset changes
  const handleSelectPreset = (preset: TaalPreset) => {
    setSelectedPresetId(preset.id);
    setBpm(preset.bpm);
    setGrid(JSON.parse(JSON.stringify(preset.tracks)));
    setCurrentStep(0);
    folkAudio.playDholTreble();
  };

  // Toggle step
  const toggleStep = (inst: InstrumentType, stepIndex: number) => {
    setGrid((prev) => {
      const updated = { ...prev };
      const row = [...updated[inst]];
      row[stepIndex] = !row[stepIndex];
      updated[inst] = row;
      return updated;
    });

    if (!grid[inst][stepIndex]) {
      folkAudio.playInstrument(inst);
    }
  };

  // Audition instrument on label click
  const testInstrument = (inst: InstrumentType) => {
    folkAudio.playInstrument(inst, 1.0);
  };

  // Tap Tempo calculation
  const handleTapTempo = () => {
    const now = performance.now();
    if (lastTapRef.current) {
      const diff = now - lastTapRef.current;
      if (diff > 200 && diff < 2000) {
        tapDiffsRef.current.push(diff);
        if (tapDiffsRef.current.length > 4) tapDiffsRef.current.shift();
        const avg = tapDiffsRef.current.reduce((a, b) => a + b, 0) / tapDiffsRef.current.length;
        const computedBpm = Math.round(60000 / avg);
        setBpm(Math.min(165, Math.max(60, computedBpm)));
      } else {
        tapDiffsRef.current = [];
      }
    }
    lastTapRef.current = now;
  };

  // Clear all steps
  const handleClearAll = () => {
    setGrid((prev) => {
      const empty: Record<InstrumentType, boolean[]> = {} as Record<InstrumentType, boolean[]>;
      (Object.keys(prev) as InstrumentType[]).forEach((key) => {
        empty[key] = new Array(16).fill(false);
      });
      return empty;
    });
  };

  // Sequencer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }

    const intervalMs = (60 / bpm / 4) * 1000;
    let step = 0;

    timerRef.current = window.setInterval(() => {
      setCurrentStep(step);

      (Object.keys(grid) as InstrumentType[]).forEach((inst) => {
        if (grid[inst][step]) {
          folkAudio.playInstrument(inst);
        }
      });

      step = (step + 1) % 16;
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, grid]);

  const activePreset = TAAL_PRESETS.find((p) => p.id === selectedPresetId);

  return (
    <div className="space-y-6">
      {/* Top Console Card */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Disc3 className={`h-4 w-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: `${(60 / bpm) * 4}s` }} />
              </div>
              <h2 className="font-['Rozha_One'] text-2xl sm:text-3xl text-amber-300">
                Folk Taal Sequencer (તાલ સંયોજક)
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-300">
              Interactive procedural drum synthesizer. Build and play live Kathiawadi & Kutch polyrhythms with zero audio lag.
            </p>
          </div>

          {/* Master Transport Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-xl transition-all active:scale-95 focus-visible:outline-none ${
                isPlaying
                  ? 'border border-amber-400 bg-amber-400 text-stone-950 shadow-amber-400/40'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-stone-950 hover:brightness-110 shadow-orange-950/60'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 fill-stone-950" />
                  <span>Pause Rhythm</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-stone-950" />
                  <span>Start Folk Taal</span>
                </>
              )}
            </button>

            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800/90 px-3.5 py-2.5 text-xs font-semibold text-stone-300 hover:bg-stone-700 transition-colors active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Traditional Taal Presets
            </span>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Click preset to load authentic rhythms & tempos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {TAAL_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex flex-col text-left rounded-xl p-3 border transition-all active:scale-98 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-950/50 ring-1 ring-amber-400/60'
                      : 'border-stone-800 bg-[#1a112e] hover:border-amber-500/40 hover:bg-[#23173d]'
                  }`}
                >
                  <span className="font-['Rozha_One'] text-sm font-semibold text-amber-200">
                    {preset.name}
                  </span>
                  <span className="font-['Yatra_One'] text-xs text-amber-400/80 mt-0.5">
                    {preset.gujaratiName}
                  </span>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 pt-1.5">
                    <span className="font-mono text-amber-300 font-bold">{preset.bpm} BPM</span>
                    <span className="font-mono text-stone-400">{preset.timeSignature}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Preset Narrative */}
        {activePreset && (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/20 px-4 py-3 text-xs text-amber-200/90 flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold text-amber-300">{activePreset.name}:</strong> {activePreset.description}
            </p>
          </div>
        )}

        {/* Tempo, BPM & Tap Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800/80 pt-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-stone-400">Tempo:</span>
              <button
                onClick={() => setBpm((b) => Math.max(60, b - 4))}
                aria-label="Decrease BPM"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700 active:scale-95"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-18 text-center font-mono text-base font-bold text-amber-300 tabular-nums">
                {bpm} <span className="text-[10px] font-normal text-stone-400">BPM</span>
              </span>
              <button
                onClick={() => setBpm((b) => Math.min(165, b + 4))}
                aria-label="Increase BPM"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700 active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <input
              type="range"
              min="60"
              max="165"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="h-2 w-28 sm:w-44 accent-amber-500 cursor-pointer"
            />

            <button
              onClick={handleTapTempo}
              className="rounded-xl border border-amber-500/40 bg-amber-950/40 px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-900/50 transition-colors active:scale-95"
            >
              Tap Tempo
            </button>
          </div>

          {/* Live Rhythm Pulse Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-400">Rhythm Intensity:</span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800/90 text-amber-300 border border-stone-700">
              {bpm < 95 ? 'Gentle Hechh Sway' : bpm < 120 ? 'Dodhiya Flow' : bpm < 140 ? 'Fast Raas' : 'Sanedo Turbo Climax'}
            </span>
          </div>
        </div>
      </div>

      {/* Sequencer Matrix with Sticky Left Instrument Headers on Mobile */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#12091f] p-3 sm:p-6 shadow-2xl overflow-hidden">
        <div className="mb-3 flex items-center justify-between text-xs text-stone-400">
          <span className="font-bold text-stone-300 uppercase tracking-wider">
            16-Step Percussion Matrix
          </span>
          <span className="text-[11px] text-amber-400/90">
            Swipe sideways on mobile to see all 16 beats →
          </span>
        </div>

        {/* Scrollable Container with Sticky Left Column */}
        <div className="overflow-x-auto touch-scroll-x pb-2">
          <div className="min-w-[760px] sm:min-w-[840px]">
            {/* Beat Numbers Header */}
            <div className="grid grid-cols-[160px_repeat(16,1fr)] sm:grid-cols-[190px_repeat(16,1fr)] gap-1.5 pb-2 border-b border-stone-800/80 mb-3 text-center">
              <div className="sticky left-0 z-20 bg-[#12091f] text-left text-xs font-bold text-stone-400 uppercase pl-2 pr-1 shadow-r-md">
                Instrument Track
              </div>
              {Array.from({ length: 16 }).map((_, idx) => {
                const isCurrent = isPlaying && currentStep === idx;
                const isMeasureStart = idx % 4 === 0;
                return (
                  <div
                    key={idx}
                    className={`text-[11px] font-mono py-1 rounded transition-colors ${
                      isCurrent
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-400/50 scale-105'
                        : isMeasureStart
                        ? 'text-amber-300 font-bold bg-[#1d1233] border border-amber-500/30'
                        : 'text-stone-400 bg-stone-900/60'
                    }`}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>

            {/* Instrument Rows */}
            <div className="space-y-2">
              {(Object.keys(grid) as InstrumentType[]).map((instKey) => {
                const meta = INSTRUMENT_META[instKey];
                const row = grid[instKey];
                return (
                  <div
                    key={instKey}
                    className="grid grid-cols-[160px_repeat(16,1fr)] sm:grid-cols-[190px_repeat(16,1fr)] gap-1.5 items-center group/row"
                  >
                    {/* Sticky Left Instrument Trigger */}
                    <button
                      onClick={() => testInstrument(instKey)}
                      className="sticky left-0 z-20 flex flex-col text-left p-2 rounded-xl border border-stone-800/80 bg-[#180f2b] hover:border-amber-500/50 hover:bg-[#23153d] transition-all pr-2 shadow-md shadow-black/40"
                      title={`Click to preview ${meta.label}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${meta.color} truncate max-w-[130px]`}>
                          {meta.short}
                        </span>
                        <Volume2 className="h-3 w-3 text-stone-400 opacity-60 group-hover/row:opacity-100 shrink-0" />
                      </div>
                      <span className="font-['Yatra_One'] text-[10px] text-stone-400 truncate">
                        {meta.gujarati}
                      </span>
                    </button>

                    {/* 16 Step Buttons */}
                    {row.map((isActive, stepIdx) => {
                      const isPlayhead = isPlaying && currentStep === stepIdx;
                      const isBeatAccent = stepIdx % 4 === 0;
                      return (
                        <button
                          key={stepIdx}
                          onClick={() => toggleStep(instKey, stepIdx)}
                          aria-label={`${meta.label} beat ${stepIdx + 1}`}
                          className={`h-11 rounded-xl border transition-all flex items-center justify-center active:scale-95 ${
                            isActive
                              ? `${meta.bgAccent} ${meta.activeBorder} text-stone-950 shadow-md shadow-amber-950/60 scale-[0.98]`
                              : isBeatAccent
                              ? 'border-stone-700/80 bg-[#1c1130] hover:border-amber-400/50 hover:bg-[#251740]'
                              : 'border-stone-800 bg-[#130b22] hover:border-amber-500/30 hover:bg-[#1a102e]'
                          } ${
                            isPlayhead
                              ? 'ring-2 ring-amber-300 ring-offset-1 ring-offset-[#0c0814]'
                              : ''
                          }`}
                        >
                          {isActive && (
                            <span className="h-2.5 w-2.5 rounded-full bg-stone-950/80" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-amber-500" /> Dhol Bass
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-yellow-400" /> Manjira Cymbals
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-emerald-500" /> Palm Claps
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            Tip: Click any instrument name on the left to preview its acoustic tone.
          </span>
        </div>
      </div>
    </div>
  );
};
