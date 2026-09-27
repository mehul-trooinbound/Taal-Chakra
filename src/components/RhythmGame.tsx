import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Flame, Music, Sparkles, Volume2 } from 'lucide-react';
import { folkAudio } from '../utils/audioEngine';

interface NoteItem {
  id: number;
  lane: 'left' | 'center' | 'right';
  y: number;
  speed: number;
}

export const RhythmGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('Ready? Tap to start!');
  const [trackSpeed, setTrackSpeed] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem('taalchakra_highscore') || '0');
  });

  const notesRef = useRef<NoteItem[]>([]);
  const [activeNotes, setActiveNotes] = useState<NoteItem[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<number | null>(null);

  const speedMultiplier = trackSpeed === 'easy' ? 1.0 : trackSpeed === 'medium' ? 1.35 : 1.75;

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCombo(0);
    setFeedback('Taal Shuru! Strike on beat!');
    notesRef.current = [];
    setActiveNotes([]);
    folkAudio.playDholTreble();
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (spawnTimerRef.current) window.clearInterval(spawnTimerRef.current);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('taalchakra_highscore', score.toString());
      setFeedback('🏆 NEW KHELAIYA HIGH SCORE!');
    } else {
      setFeedback('Round Finished! Shabaash!');
    }
  };

  // Note spawn loop
  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = Math.max(480, 950 / speedMultiplier);
    spawnTimerRef.current = window.setInterval(() => {
      const lanes: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
      const chosenLane = lanes[Math.floor(Math.random() * lanes.length)];

      const newNote: NoteItem = {
        id: Date.now() + Math.random(),
        lane: chosenLane,
        y: 0,
        speed: 0.8 * speedMultiplier,
      };

      notesRef.current.push(newNote);
    }, spawnInterval);

    return () => {
      if (spawnTimerRef.current) window.clearInterval(spawnTimerRef.current);
    };
  }, [isPlaying, speedMultiplier]);

  // Game animation frame loop
  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 16.66;
      lastTime = now;

      const updatedNotes: NoteItem[] = [];
      let missedCount = 0;

      for (const note of notesRef.current) {
        const nextY = note.y + note.speed * delta;
        if (nextY > 100) {
          missedCount++;
        } else {
          updatedNotes.push({ ...note, y: nextY });
        }
      }

      if (missedCount > 0) {
        setCombo(0);
        setFeedback('Missed! Keep the rhythm!');
      }

      notesRef.current = updatedNotes;
      setActiveNotes([...updatedNotes]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Handle user hit
  const handleHit = (targetLane: 'left' | 'center' | 'right') => {
    if (!isPlaying) return;

    if (targetLane === 'center') {
      folkAudio.playClap(0.95);
    } else {
      folkAudio.playDandiyaClash(1.0);
    }

    const candidateIndex = notesRef.current.findIndex(
      (n) => n.lane === targetLane && n.y >= 68 && n.y <= 98
    );

    if (candidateIndex !== -1) {
      const hitNote = notesRef.current[candidateIndex];
      const distanceFromTarget = Math.abs(hitNote.y - 85);

      notesRef.current.splice(candidateIndex, 1);
      setActiveNotes([...notesRef.current]);

      if (distanceFromTarget < 6) {
        const points = 120 + combo * 10;
        setScore((s) => s + points);
        setCombo((c) => {
          const next = c + 1;
          setMaxCombo((m) => Math.max(m, next));
          return next;
        });
        setFeedback('🔥 CHAKARDI! PERFECT CLASH!');
      } else {
        const points = 60 + combo * 5;
        setScore((s) => s + points);
        setCombo((c) => {
          const next = c + 1;
          setMaxCombo((m) => Math.max(m, next));
          return next;
        });
        setFeedback('✨ SHABAASH! GOOD TIMING!');
      }
    } else {
      setCombo(0);
      setFeedback('Early / Off Beat!');
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        handleHit('left');
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'Enter') {
        handleHit('center');
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        handleHit('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, combo]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="font-['Rozha_One'] text-2xl sm:text-3xl text-amber-300">
                Taal-Milaap: Dandiya Rhythm Clash (તાલ-મિલાપ રમત)
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-300">
              Interactive Dandiya reflex arcade. Clash Left & Right sticks or palm clap directly on the beat!
            </p>
          </div>

          {/* Difficulty & Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex rounded-xl border border-stone-700 bg-stone-800/90 p-1">
              {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setTrackSpeed(lvl)}
                  disabled={isPlaying}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                    trackSpeed === lvl
                      ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/30'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {!isPlaying ? (
              <button
                onClick={startGame}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 px-5 py-2.5 text-sm font-bold text-stone-950 shadow-xl shadow-orange-950/60 hover:brightness-110 active:scale-95"
              >
                <Play className="h-4 w-4 fill-stone-950" />
                <span>Start Game</span>
              </button>
            ) : (
              <button
                onClick={stopGame}
                className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 px-5 py-2.5 text-sm font-bold text-rose-300 hover:bg-rose-900/50 active:scale-95"
              >
                <RotateCcw className="h-4 w-4" />
                <span>End Game</span>
              </button>
            )}
          </div>
        </div>

        {/* Score & Combo HUD */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-stone-800/80 pt-4">
          <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
            <span className="text-[11px] text-stone-400 uppercase font-semibold">Current Score</span>
            <p className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
              {score}
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
            <span className="text-[11px] text-stone-400 uppercase font-semibold flex items-center justify-center gap-1">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              <span>Combo Streak</span>
            </span>
            <p className="font-mono text-2xl font-bold text-orange-400 tabular-nums">
              {combo}x
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
            <span className="text-[11px] text-stone-400 uppercase font-semibold flex items-center justify-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-yellow-400" />
              <span>Personal Best</span>
            </span>
            <p className="font-mono text-2xl font-bold text-yellow-400 tabular-nums">
              {Math.max(score, highScore)}
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-center flex flex-col justify-center">
            <span className="text-[11px] text-amber-400 uppercase font-bold">Judge Call</span>
            <p className="text-xs font-bold text-amber-200 truncate mt-0.5">
              {feedback}
            </p>
          </div>
        </div>
      </div>

      {/* Rhythm Track Arcade Cabinet */}
      <div className="mx-auto max-w-2xl rounded-2xl border border-amber-500/25 bg-[#12091f] p-4 sm:p-6 shadow-2xl">
        {/* Track Lanes */}
        <div className="relative h-84 sm:h-96 w-full rounded-2xl border border-stone-800 bg-[#090412] overflow-hidden shadow-inner">
          {/* Lane Divider Lines */}
          <div className="absolute inset-0 grid grid-cols-3 divide-x divide-stone-800/80">
            <div className="relative flex flex-col justify-end pb-3 items-center text-xs text-stone-500 font-mono">
              <span className="opacity-50">LANE 1 [A]</span>
            </div>
            <div className="relative flex flex-col justify-end pb-3 items-center text-xs text-stone-500 font-mono">
              <span className="opacity-50">LANE 2 [SPACE]</span>
            </div>
            <div className="relative flex flex-col justify-end pb-3 items-center text-xs text-stone-500 font-mono">
              <span className="opacity-50">LANE 3 [D]</span>
            </div>
          </div>

          {/* Hit Target Line Zone (85% height) */}
          <div className="pointer-events-none absolute top-[85%] left-0 right-0 h-11 -translate-y-1/2 border-y-2 border-amber-400/60 bg-amber-400/15 flex items-center justify-center backdrop-blur-xs">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest animate-pulse">
              ▼ HIT STRIKE ZONE ▼
            </span>
          </div>

          {/* Falling Beats */}
          {activeNotes.map((note) => {
            const laneLeft = note.lane === 'left' ? '16.6%' : note.lane === 'center' ? '50%' : '83.3%';
            const isClap = note.lane === 'center';

            return (
              <div
                key={note.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                style={{
                  left: laneLeft,
                  top: `${note.y}%`,
                }}
              >
                {isClap ? (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-emerald-300 bg-emerald-400 shadow-lg shadow-emerald-400/60 animate-pulse">
                    <span className="text-sm font-bold text-stone-950 font-mono">👏</span>
                  </div>
                ) : (
                  <div
                    className={`flex h-13 w-7 items-center justify-center rounded-full border-2 shadow-xl ${
                      note.lane === 'left'
                        ? 'border-rose-300 bg-rose-500 shadow-rose-500/60 rotate-[-15deg]'
                        : 'border-amber-300 bg-amber-400 shadow-amber-400/60 rotate-[15deg]'
                    }`}
                  >
                    <span className="text-xs font-bold text-stone-950 font-mono">🥢</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tactile On-Screen Striker Buttons (Thumb-friendly for mobile!) */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
          <button
            onClick={() => handleHit('left')}
            className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/50 bg-gradient-to-t from-rose-950 to-rose-900/80 p-3.5 sm:p-4 text-rose-200 active:scale-95 active:bg-rose-700 transition-all shadow-xl shadow-rose-950/60"
          >
            <span className="text-xl">🥢</span>
            <span className="text-xs font-bold mt-1">Left Dandiya</span>
            <span className="text-[10px] font-mono text-rose-300/80 mt-0.5">Key [A] / Left</span>
          </button>

          <button
            onClick={() => handleHit('center')}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/50 bg-gradient-to-t from-emerald-950 to-emerald-900/80 p-3.5 sm:p-4 text-emerald-200 active:scale-95 active:bg-emerald-700 transition-all shadow-xl shadow-emerald-950/60"
          >
            <span className="text-xl">👏</span>
            <span className="text-xs font-bold mt-1">Center Clap</span>
            <span className="text-[10px] font-mono text-emerald-300/80 mt-0.5">Key [Space]</span>
          </button>

          <button
            onClick={() => handleHit('right')}
            className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/50 bg-gradient-to-t from-amber-950 to-amber-900/80 p-3.5 sm:p-4 text-amber-200 active:scale-95 active:bg-amber-700 transition-all shadow-xl shadow-amber-950/60"
          >
            <span className="text-xl">🥢</span>
            <span className="text-xs font-bold mt-1">Right Dandiya</span>
            <span className="text-[10px] font-mono text-amber-300/80 mt-0.5">Key [D] / Right</span>
          </button>
        </div>

        <div className="mt-3 text-center text-xs text-stone-400">
          Tip: On desktop, play using keys <kbd className="rounded bg-stone-800 px-2 py-0.5 text-stone-200 font-mono">A</kbd>, <kbd className="rounded bg-stone-800 px-2 py-0.5 text-stone-200 font-mono">Space</kbd>, and <kbd className="rounded bg-stone-800 px-2 py-0.5 text-stone-200 font-mono">D</kbd>. On mobile, tap the large strike pads!
        </div>
      </div>
    </div>
  );
};
