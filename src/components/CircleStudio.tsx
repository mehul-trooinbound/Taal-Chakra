import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Users, UserPlus, Trash2, RotateCw, Sparkles, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { CircleFormationType, DancerNode } from '../types';
import { folkAudio } from '../utils/audioEngine';

const DEFAULT_FRIENDS = [
  { name: 'Mehul', color: '#f59e0b', role: 'lead' as const },
  { name: 'Priya', color: '#ec4899', role: 'member' as const },
  { name: 'Aarav', color: '#3b82f6', role: 'dandiyaPartner' as const },
  { name: 'Dipti', color: '#10b981', role: 'member' as const },
  { name: 'Bhavik', color: '#8b5cf6', role: 'member' as const },
  { name: 'Pooja', color: '#f97316', role: 'member' as const },
  { name: 'Kunal', color: '#06b6d4', role: 'dandiyaPartner' as const },
  { name: 'Neha', color: '#e11d48', role: 'member' as const },
];

export const CircleStudio: React.FC = () => {
  const [formation, setFormation] = useState<CircleFormationType>('singleRing');
  const [dancers, setDancers] = useState<DancerNode[]>(() => {
    return DEFAULT_FRIENDS.map((f, idx) => ({
      id: `dancer-${idx}`,
      name: f.name,
      role: f.role,
      angle: (idx / DEFAULT_FRIENDS.length) * 2 * Math.PI,
      distance: 120,
      color: f.color,
    }));
  });

  const [newFriendName, setNewFriendName] = useState('');
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1.2);
  const [circleRadius, setCircleRadius] = useState(120);
  const [clockwise, setClockwise] = useState(true);

  const canvasAngleRef = useRef(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  // Recalculate dancer positions when formation, count, or radius changes
  useEffect(() => {
    setDancers((prev) => {
      const count = prev.length;
      return prev.map((d, idx) => {
        if (formation === 'singleRing') {
          return {
            ...d,
            angle: (idx / count) * 2 * Math.PI,
            distance: circleRadius,
          };
        } else if (formation === 'concentricDual') {
          const isInner = idx % 2 === 0;
          const innerCount = Math.ceil(count / 2);
          const outerCount = Math.floor(count / 2);
          const subIdx = isInner ? Math.floor(idx / 2) : Math.floor(idx / 2);
          const totalInTier = isInner ? innerCount : outerCount;
          return {
            ...d,
            angle: (subIdx / Math.max(1, totalInTier)) * 2 * Math.PI,
            distance: isInner ? circleRadius * 0.65 : circleRadius * 1.15,
          };
        } else if (formation === 'jalebiSpiral') {
          const spiralFactor = 0.5 + (idx / count) * 0.9;
          return {
            ...d,
            angle: (idx / count) * 3 * Math.PI,
            distance: circleRadius * spiralFactor,
          };
        } else {
          // Dandiya Corridor
          const isLeftCol = idx % 2 === 0;
          const rowIdx = Math.floor(idx / 2);
          const totalRows = Math.ceil(count / 2);
          const spacing = 45;
          const yPos = (rowIdx - (totalRows - 1) / 2) * spacing;
          const xPos = isLeftCol ? -55 : 55;
          const angle = Math.atan2(yPos, xPos);
          const distance = Math.sqrt(xPos * xPos + yPos * yPos);
          return {
            ...d,
            angle,
            distance,
          };
        }
      });
    });
  }, [formation, circleRadius, dancers.length]);

  // Smooth rotation animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isRotating) {
        const direction = clockwise ? 1 : -1;
        canvasAngleRef.current += direction * rotationSpeed * 0.45 * delta;
        setCurrentAngle(canvasAngleRef.current);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRotating, rotationSpeed, clockwise]);

  const addDancer = () => {
    const trimmed = newFriendName.trim() || `Friend ${dancers.length + 1}`;
    const colors = ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#06b6d4', '#e11d48'];
    const chosenColor = colors[dancers.length % colors.length];

    const newDancer: DancerNode = {
      id: `dancer-${Date.now()}`,
      name: trimmed,
      role: 'member',
      angle: 0,
      distance: circleRadius,
      color: chosenColor,
    };

    setDancers((prev) => [...prev, newDancer]);
    setNewFriendName('');
    folkAudio.playDholTreble();
  };

  const removeDancer = (id: string) => {
    if (dancers.length <= 4) return;
    setDancers((prev) => prev.filter((d) => d.id !== id));
    folkAudio.playClap();
  };

  const toggleLead = (id: string) => {
    setDancers((prev) =>
      prev.map((d) => ({
        ...d,
        role: d.id === id ? (d.role === 'lead' ? 'member' : 'lead') : d.role === 'lead' ? 'member' : d.role,
      }))
    );
    folkAudio.playManjira();
  };

  const circumference = 2 * Math.PI * (circleRadius / 25);
  const spacePerDancer = Number((circumference / Math.max(1, dancers.length)).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Users className="h-4 w-4" />
              </div>
              <h2 className="font-['Rozha_One'] text-2xl sm:text-3xl text-amber-300">
                Garba Mandali Circle Radar (ગરબા મંડળી રડાર)
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-300">
              Choreograph friend groups, visualize concentric counter-rotations, and avoid collisions on crowded grounds.
            </p>
          </div>

          {/* Transport */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-xl transition-all active:scale-95 focus-visible:outline-none ${
                isRotating
                  ? 'border border-amber-400 bg-amber-400 text-stone-950 shadow-amber-400/40'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-stone-950 hover:brightness-110 shadow-orange-950/60'
              }`}
            >
              {isRotating ? (
                <>
                  <Pause className="h-4 w-4 fill-stone-950" />
                  <span>Pause Circle</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-stone-950" />
                  <span>Simulate Spin</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Formation Type Selector */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { id: 'singleRing' as const, title: 'Single Concentric Ring', desc: 'Classic Pradakshina facing center diya' },
            { id: 'concentricDual' as const, title: 'Dual Counter-Ring', desc: 'Outer clockwise, Inner counter-clockwise' },
            { id: 'jalebiSpiral' as const, title: 'Jalebi Spiral Flow', desc: 'Kathiawadi serpentine inward vortex' },
            { id: 'dandiyaCorridor' as const, title: 'Dandiya Raas Corridor', desc: 'Two facing rows rotating partners' },
          ].map((f) => {
            const isSelected = formation === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFormation(f.id)}
                className={`flex flex-col text-left rounded-xl p-3 border transition-all active:scale-98 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-950/50 ring-1 ring-amber-400/60'
                    : 'border-stone-800 bg-[#1a112e] hover:border-amber-500/40 hover:bg-[#23173d]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-['Rozha_One'] text-sm font-semibold text-amber-200">
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  <span>{f.title}</span>
                </div>
                <span className="text-[11px] text-stone-400 mt-1">{f.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: 2D Simulation Radar Canvas */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#12091f] p-4 sm:p-6 lg:col-span-8 flex flex-col items-center justify-between shadow-2xl">
          <div className="w-full flex items-center justify-between border-b border-stone-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Ground Radar View
              </span>
              <span className="text-xs text-stone-400 font-mono">· {dancers.length} Khelaiyas</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setClockwise(!clockwise)}
                className="flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800/90 px-3 py-1.5 text-xs font-semibold text-stone-200 hover:bg-stone-700 transition-colors active:scale-95"
              >
                <RotateCw className={`h-3.5 w-3.5 ${clockwise ? '' : 'scale-x-[-1]'}`} />
                <span>{clockwise ? 'Clockwise' : 'Counter-Clockwise'}</span>
              </button>
            </div>
          </div>

          {/* SVG Animated Radar Viewport */}
          <div className="relative my-4 flex h-72 sm:h-92 w-full items-center justify-center overflow-hidden rounded-2xl border border-stone-800 bg-[#0a0514] shadow-inner">
            <svg
              className="h-full w-full max-w-[440px]"
              viewBox="-200 -200 400 400"
            >
              {/* Ground guide rings */}
              <circle cx="0" cy="0" r="160" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.15" />
              <circle cx="0" cy="0" r="120" fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <circle cx="0" cy="0" r="80" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.15" />

              {/* Central Sacred Garbi Diya */}
              <g className="diya-glow">
                <circle cx="0" cy="0" r="22" fill="#f59e0b" fillOpacity="0.25" />
                <circle cx="0" cy="0" r="14" fill="#d97706" />
                <circle cx="0" cy="0" r="6" fill="#fef08a" />
              </g>

              {/* Rotating Dancers */}
              {dancers.map((dancer, idx) => {
                let finalAngle = dancer.angle + currentAngle;
                if (formation === 'concentricDual' && idx % 2 === 1) {
                  finalAngle = dancer.angle - currentAngle;
                } else if (formation === 'dandiyaCorridor') {
                  finalAngle = dancer.angle;
                }

                const x = dancer.distance * Math.cos(finalAngle);
                const y = dancer.distance * Math.sin(finalAngle);
                const isLead = dancer.role === 'lead';

                return (
                  <g key={dancer.id} transform={`translate(${x}, ${y})`} className="cursor-pointer">
                    {/* Dancer glow trail */}
                    {isLead && (
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ animationDuration: '4s' }}
                      />
                    )}

                    {/* Dancer Avatar */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isLead ? 12 : 9}
                      fill={dancer.color}
                      stroke="#ffffff"
                      strokeWidth={isLead ? 2 : 1}
                    />

                    {/* Direction pointer */}
                    <circle
                      cx={Math.cos(finalAngle + Math.PI / 2) * 11}
                      cy={Math.sin(finalAngle + Math.PI / 2) * 11}
                      r="2"
                      fill="#ffffff"
                    />

                    {/* Name Label */}
                    <text
                      x="0"
                      y={isLead ? 24 : 20}
                      textAnchor="middle"
                      fill="#fef3c7"
                      fontSize="9"
                      fontFamily="system-ui"
                      fontWeight="bold"
                    >
                      {dancer.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Live Spacing Safety HUD */}
            <div className="absolute bottom-3 left-3 rounded-xl border border-amber-500/30 bg-[#160d28]/95 p-3 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Circle Clearance Index</span>
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5">
                ~{spacePerDancer}m clearance per person ({spacePerDancer >= 1.3 ? '✅ Optimal Dodhiya flow' : '⚠️ Tight spacing, watch turns'})
              </p>
            </div>
          </div>

          {/* Controls: Radius & Speed Sliders */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-800/80 pt-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
                <span className="font-semibold">Circle Radius / Expansion</span>
                <span className="font-mono text-amber-300 font-bold">{circleRadius} px</span>
              </div>
              <input
                type="range"
                min="70"
                max="155"
                value={circleRadius}
                onChange={(e) => setCircleRadius(Number(e.target.value))}
                className="h-2 w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
                <span className="font-semibold">Rotation Speed</span>
                <span className="font-mono text-amber-300 font-bold">{rotationSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(Number(e.target.value))}
                className="h-2 w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: Mandali Roster & Friend Manager */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 lg:col-span-4 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Mandali Roster ({dancers.length})
              </span>
              <span className="text-[11px] text-stone-400">Crown (👑) = Lead</span>
            </div>

            {/* Add Friend Input */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addDancer()}
                placeholder="Friend's Name..."
                maxLength={14}
                className="flex-1 rounded-xl border border-stone-700 bg-stone-900/90 px-3.5 py-2 text-xs text-stone-200 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={addDancer}
                className="flex items-center gap-1 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-stone-950 hover:bg-amber-300 transition-colors active:scale-95"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Friend List */}
            <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1">
              {dancers.map((dancer, idx) => (
                <div
                  key={dancer.id}
                  className="flex items-center justify-between rounded-xl border border-stone-800/80 bg-[#1a112e] p-2.5 transition-colors hover:border-stone-700"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-4 w-4 rounded-full border border-white/60 shadow-sm"
                      style={{ backgroundColor: dancer.color }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-stone-200">
                        {dancer.name}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        Pos #{idx + 1} {dancer.role === 'lead' ? '· Mandali Lead' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleLead(dancer.id)}
                      title="Set as Dodhiya Lead Caller"
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        dancer.role === 'lead'
                          ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50'
                          : 'text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      👑
                    </button>

                    {dancers.length > 4 && (
                      <button
                        onClick={() => removeDancer(dancer.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                        title="Remove dancer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Choreography Advice Box */}
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5 text-xs text-amber-200/90 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Ground Rule:</strong> Place your most confident dancer as <strong>Lead (👑)</strong> to call step changes 2 beats in advance!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
