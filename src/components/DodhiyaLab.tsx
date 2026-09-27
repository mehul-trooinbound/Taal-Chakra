import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Footprints, Sparkles, Compass, Hand, MapPin, Gauge } from 'lucide-react';
import { DODHIYA_STEPS } from '../data/garbaData';
import { folkAudio } from '../utils/audioEngine';
import { DodhiyaStepDefinition } from '../types';

export const DodhiyaLab: React.FC = () => {
  const [selectedStepId, setSelectedStepId] = useState<string>('step_3taali');
  const [currentBeatIndex, setCurrentBeatIndex] = useState<number>(0);
  const [isAutoStepping, setIsAutoStepping] = useState<boolean>(false);
  const [stepSpeedBpm, setStepSpeedBpm] = useState<number>(98);

  const activePattern = DODHIYA_STEPS.find((s) => s.id === selectedStepId) || DODHIYA_STEPS[0];
  const currentStep = activePattern.steps[currentBeatIndex] || activePattern.steps[0];

  const timerRef = useRef<number | null>(null);

  const handleSelectPattern = (pattern: DodhiyaStepDefinition) => {
    setSelectedStepId(pattern.id);
    setCurrentBeatIndex(0);
    setStepSpeedBpm(pattern.bpmRecommended);
    folkAudio.playClap();
  };

  const advanceStep = () => {
    setCurrentBeatIndex((prev) => {
      const next = (prev + 1) % activePattern.steps.length;
      playStepAudio(activePattern.steps[next]);
      return next;
    });
  };

  const prevStep = () => {
    setCurrentBeatIndex((prev) => {
      const next = (prev - 1 + activePattern.steps.length) % activePattern.steps.length;
      playStepAudio(activePattern.steps[next]);
      return next;
    });
  };

  const playStepAudio = (step: typeof currentStep) => {
    if (step.handAction.toLowerCase().includes('clap')) {
      folkAudio.playClap(0.95);
    } else {
      folkAudio.playDholTreble(0.65);
    }
  };

  // Auto-play stepper loop
  useEffect(() => {
    if (!isAutoStepping) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }

    const intervalMs = (60 / stepSpeedBpm) * 1000;
    timerRef.current = window.setInterval(() => {
      advanceStep();
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isAutoStepping, stepSpeedBpm, activePattern]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Footprints className="h-4 w-4" />
              </div>
              <h2 className="font-['Rozha_One'] text-2xl sm:text-3xl text-amber-300">
                Dodhiya Footwork & Step Visualizer (ગરબા સ્ટેપ્સ લેબ)
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-300">
              Interactive foot coordinates, torso pivot angles, and hand clap elevations. Master authentic Kathiawadi & Baroda Dodhiya.
            </p>
          </div>

          {/* Stepper Transport */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const next = !isAutoStepping;
                setIsAutoStepping(next);
                if (next) playStepAudio(currentStep);
              }}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-xl transition-all active:scale-95 focus-visible:outline-none ${
                isAutoStepping
                  ? 'border border-amber-400 bg-amber-400 text-stone-950 shadow-amber-400/40'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-stone-950 hover:brightness-110 shadow-orange-950/60'
              }`}
            >
              {isAutoStepping ? (
                <>
                  <Pause className="h-4 w-4 fill-stone-950" />
                  <span>Pause Practice</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-stone-950" />
                  <span>Auto-Step Trainer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pattern Selector Grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Select Garba Footwork Style
            </span>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              6 Regional Kathiawadi & Baroda Choreographies
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {DODHIYA_STEPS.map((pattern) => {
              const isSelected = selectedStepId === pattern.id;
              return (
                <button
                  key={pattern.id}
                  onClick={() => handleSelectPattern(pattern)}
                  className={`flex flex-col text-left rounded-xl p-3 border transition-all active:scale-98 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-950/50 ring-1 ring-amber-400/60'
                      : 'border-stone-800 bg-[#1a112e] hover:border-amber-500/40 hover:bg-[#23173d]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Rozha_One'] text-sm font-semibold text-amber-200">
                      {pattern.name.split('(')[0]}
                    </span>
                    <span className="text-[10px] font-mono rounded bg-stone-800 px-1 py-0.5 text-amber-300 font-bold">
                      {pattern.stepsCount}B
                    </span>
                  </div>
                  <span className="font-['Yatra_One'] text-xs text-amber-400/80 mt-1">
                    {pattern.gujaratiName}
                  </span>
                  <span className="mt-2 text-[10px] text-stone-400 truncate">
                    {pattern.region.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Dance Floor Visualizer */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#12091f] p-4 sm:p-6 lg:col-span-7 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Dance Arena (Top-Down Radar)
              </span>
              <p className="text-[11px] text-stone-400">
                Facing Central Garbi Diya (Top Center)
              </p>
            </div>

            {/* Beat Navigator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={prevStep}
                aria-label="Previous Beat"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700 active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 px-2 tabular-nums">
                Beat {currentBeatIndex + 1} of {activePattern.steps.length}
              </span>

              <button
                onClick={advanceStep}
                aria-label="Next Beat"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700 active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Dance Floor Graphic Area */}
          <div className="relative my-4 flex h-72 sm:h-84 lg:h-92 w-full items-center justify-center overflow-hidden rounded-2xl border border-stone-800 bg-[#0a0514] shadow-inner">
            {/* Center Sacred Diya Icon (North) */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <div className="diya-glow flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 shadow-xl shadow-amber-500/60">
                <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="mt-1 text-[9px] font-bold text-amber-300 tracking-wider uppercase">
                Garbi Diya (Center)
              </span>
            </div>

            {/* Concentric Guide Rings */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full border border-amber-500/10" />
              <div className="absolute h-52 w-52 rounded-full border border-dashed border-amber-500/20" />
              <div className="absolute h-36 w-36 rounded-full border border-amber-500/15" />
            </div>

            {/* Left Foot Indicator */}
            <div
              className="absolute transition-all duration-300 ease-out flex flex-col items-center"
              style={{
                left: `${currentStep.footCoords.left.x}%`,
                top: `${currentStep.footCoords.left.y}%`,
                transform: `translate(-50%, -50%) rotate(${currentStep.torsoAngle * 0.4}deg)`,
              }}
            >
              <div
                className={`flex h-13 w-8 items-center justify-center rounded-t-2xl rounded-b-lg border shadow-xl transition-all ${
                  currentStep.foot === 'left' || currentStep.foot === 'both'
                    ? 'border-rose-300 bg-rose-500 text-white shadow-rose-500/60 ring-4 ring-rose-400/40 scale-110'
                    : 'border-rose-900 bg-rose-950/40 text-rose-700 opacity-50'
                }`}
              >
                <span className="text-[11px] font-bold font-mono">L</span>
              </div>
              <span className="text-[9px] text-rose-300 mt-1 font-mono font-bold">Left Foot</span>
            </div>

            {/* Right Foot Indicator */}
            <div
              className="absolute transition-all duration-300 ease-out flex flex-col items-center"
              style={{
                left: `${currentStep.footCoords.right.x}%`,
                top: `${currentStep.footCoords.right.y}%`,
                transform: `translate(-50%, -50%) rotate(${currentStep.torsoAngle * 0.4}deg)`,
              }}
            >
              <div
                className={`flex h-13 w-8 items-center justify-center rounded-t-2xl rounded-b-lg border shadow-xl transition-all ${
                  currentStep.foot === 'right' || currentStep.foot === 'both'
                    ? 'border-amber-300 bg-amber-400 text-stone-950 shadow-amber-500/60 ring-4 ring-amber-400/40 scale-110'
                    : 'border-amber-900 bg-amber-950/40 text-amber-800 opacity-50'
                }`}
              >
                <span className="text-[11px] font-bold font-mono">R</span>
              </div>
              <span className="text-[9px] text-amber-300 mt-1 font-mono font-bold">Right Foot</span>
            </div>

            {/* Live Verbal Rhythm Bol Display */}
            <div className="absolute bottom-3 left-3 rounded-xl border border-amber-500/30 bg-[#160d28]/95 px-3.5 py-2 backdrop-blur-md shadow-lg">
              <span className="text-[9px] text-stone-400 uppercase font-semibold">Rhythm Bol</span>
              <p className="font-['Rozha_One'] text-xl font-bold text-amber-300 tracking-wider">
                {currentStep.bol}
              </p>
            </div>

            {/* Torso Angle Compass */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-stone-800 bg-[#160d28]/95 px-3 py-2 shadow-lg">
              <Compass className="h-4 w-4 text-amber-400" />
              <div className="text-right">
                <span className="text-[9px] text-stone-400 uppercase">Torso Angle</span>
                <p className="font-mono text-xs font-bold text-stone-200">
                  {currentStep.torsoAngle}° Pivot
                </p>
              </div>
            </div>
          </div>

          {/* Stepper Timeline Buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1.5 pt-2">
            {activePattern.steps.map((st, idx) => {
              const isCurrent = currentBeatIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentBeatIndex(idx);
                    playStepAudio(st);
                  }}
                  className={`flex flex-col items-center justify-center rounded-xl p-2 border transition-all active:scale-95 ${
                    isCurrent
                      ? 'border-amber-400 bg-amber-400 text-stone-950 font-bold shadow-lg shadow-amber-400/40 scale-105'
                      : 'border-stone-800 bg-[#19102e] text-stone-300 hover:border-amber-500/40 hover:bg-[#22153d]'
                  }`}
                >
                  <span className="text-[11px] font-mono">B{idx + 1}</span>
                  <span className="text-[10px] font-semibold truncate max-w-[65px]">{st.bol}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Step Breakdown & Cultural Coaching */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 lg:col-span-5 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Step Detail (પગલાં માર્ગદર્શન)
                </span>
                <h3 className="font-['Rozha_One'] text-xl sm:text-2xl text-amber-200 mt-0.5">
                  {currentStep.title}
                </h3>
              </div>
              <span className="text-xs font-mono rounded-lg bg-amber-500/20 px-2.5 py-1 text-amber-300 border border-amber-500/40 font-bold">
                {activePattern.difficulty}
              </span>
            </div>

            {/* Movement Action Cards */}
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                  <Footprints className="h-4 w-4" />
                  <span>Footwork Displacement</span>
                </div>
                <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
                  {currentStep.movement}
                </p>
              </div>

              <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Hand className="h-4 w-4" />
                  <span>Hand Elevation & Taali Gesture</span>
                </div>
                <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
                  {currentStep.handAction}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="h-4 w-4" />
                  <span>Cultural Style & Origin Secret</span>
                </div>
                <p className="mt-1.5 text-xs text-amber-200/90 leading-relaxed">
                  {activePattern.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Speed slider for practice */}
          <div className="mt-6 border-t border-stone-800/80 pt-4">
            <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
              <span className="font-semibold">Practice Stepper Speed</span>
              <span className="font-mono font-bold text-amber-300">{stepSpeedBpm} BPM</span>
            </div>
            <input
              type="range"
              min="65"
              max="140"
              value={stepSpeedBpm}
              onChange={(e) => setStepSpeedBpm(Number(e.target.value))}
              className="h-2 w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
