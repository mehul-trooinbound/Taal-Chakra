import React, { useState } from 'react';
import { BookOpen, Sparkles, Volume2, Flame, Droplets, ShieldAlert, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { NAVRATRI_DAYS, MARATHON_RECOVERY_TIPS } from '../data/garbaData';
import { folkAudio } from '../utils/audioEngine';
import { NavratriDayData } from '../types';

export const NavratriAlmanac: React.FC = () => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [hoursDancing, setHoursDancing] = useState<number>(3.5);
  const [intensity, setIntensity] = useState<'moderate' | 'high' | 'turbo'>('high');
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(65);

  const [activeTab, setActiveTab] = useState<'wardrobe' | 'vrat'>('wardrobe');
  const [imageError1, setImageError1] = useState(false);
  const [imageError2, setImageError2] = useState(false);

  const currentDay = NAVRATRI_DAYS.find((d) => d.dayNumber === selectedDayNumber) || NAVRATRI_DAYS[0];

  const chantMantra = () => {
    folkAudio.playTempleChime(432);
    setTimeout(() => folkAudio.playTempleChime(576), 400);
    setTimeout(() => folkAudio.playTempleChime(648), 900);
  };

  const metValue = intensity === 'moderate' ? 5.5 : intensity === 'high' ? 7.8 : 9.5;
  const estimatedCalories = Math.round(metValue * bodyWeightKg * hoursDancing);
  const estimatedSweatLiters = (0.75 * hoursDancing * (intensity === 'turbo' ? 1.3 : 1.0)).toFixed(1);
  const recommendedBreaks = Math.ceil(hoursDancing * 1.5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <BookOpen className="h-4 w-4" />
              </div>
              <h2 className="font-['Rozha_One'] text-2xl sm:text-3xl text-amber-300">
                9-Rātri Sacred Almanac & Wardrobe Stylist (નવરાત્રિ પંચાંગ)
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-300">
              The 9 Navadurga swarups, prescribed sacred colors, authentic Gujarati artisanal couture, and marathon stamina fuel.
            </p>
          </div>
        </div>

        {/* 9-Day Selector Carousel (Touch-scrollable on mobile, grid on desktop) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Sacred 9-Night Calendar
            </span>
            <span className="text-[11px] text-stone-400">
              Tap any night to load its Swarup, Color & Wardrobe
            </span>
          </div>

          <div className="flex overflow-x-auto touch-scroll-x gap-2 pb-2 sm:grid sm:grid-cols-5 lg:grid-cols-9 scrollbar-none">
            {NAVRATRI_DAYS.map((day) => {
              const isSelected = selectedDayNumber === day.dayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => {
                    setSelectedDayNumber(day.dayNumber);
                    folkAudio.playTempleChime(400 + day.dayNumber * 25);
                  }}
                  className={`flex shrink-0 w-28 sm:w-auto flex-col items-center rounded-xl p-2.5 border transition-all text-center active:scale-95 touch-snap-item ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/25 shadow-lg shadow-amber-950/50 ring-2 ring-amber-400/60 scale-[1.02]'
                      : 'border-stone-800 bg-[#19102e] hover:border-amber-500/40 hover:bg-[#23173d]'
                  }`}
                >
                  <div
                    className="h-5 w-5 rounded-full border border-white/80 shadow-md mb-1.5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: day.sacredColorHex }}
                  />
                  <span className="font-mono text-xs font-bold text-amber-300">
                    Day {day.dayNumber}
                  </span>
                  <span className="text-[10px] text-stone-300 truncate max-w-full mt-0.5 font-medium">
                    {day.sacredColorName.split('/')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Day Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Sacred Swarup & Mantra */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#12091f] p-4 sm:p-6 lg:col-span-7 flex flex-col justify-between shadow-2xl">
          <div>
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-white/90 shadow-sm"
                    style={{ backgroundColor: currentDay.sacredColorHex }}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Day {currentDay.dayNumber} · {currentDay.tithi}
                  </span>
                </div>
                <h3 className="font-['Rozha_One'] text-2xl sm:text-3xl font-bold text-amber-200 mt-1">
                  {currentDay.goddessName}
                </h3>
                <p className="font-['Yatra_One'] text-sm text-amber-400/80">
                  {currentDay.goddessGujarati}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-stone-400 block">{currentDay.date2026}</span>
                <span className="inline-block mt-1 text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                  Color: {currentDay.sacredColorName}
                </span>
              </div>
            </div>

            {/* Sacred Narrative */}
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Divine Iconography & Symbolism
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-300">
                  {currentDay.avatarSignificance}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-800/80 bg-[#1a112e] p-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-amber-400">
                    Sacred Dhyana Mantra
                  </span>
                  <button
                    onClick={chantMantra}
                    className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-950/40 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-900/50 transition-colors active:scale-95 shadow-sm"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Chime Temple Bell</span>
                  </button>
                </div>
                <p className="mt-2.5 font-['Rozha_One'] text-base sm:text-lg text-amber-200 leading-relaxed tracking-wide">
                  {currentDay.dhyanaMantra}
                </p>
                <p className="mt-2 text-xs italic text-stone-400 border-t border-stone-800/60 pt-2">
                  Meaning: {currentDay.mantraMeaning}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Color Philosophy ({currentDay.sacredColorName})
                </h4>
                <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                  {currentDay.colorPhilosophy}
                </p>
              </div>
            </div>
          </div>

          {/* Garbi Diya Artifact Showcase */}
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-amber-500/20 bg-[#170e28] p-3">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-stone-700">
              {!imageError1 ? (
                <img
                  src="/src/assets/images/sacred_garbi_diya_1790485833377.jpg"
                  alt="Sacred terracotta Garbi earthen pot with glowing flame"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError1(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-amber-900/30 text-xs">
                  🪔 Diya
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300">The Sacred Garbi Core</p>
              <p className="text-[11px] text-stone-300">
                The word "Garba" derives from Sanskrit "Garbha" (womb). The perforated terracotta pot represents the universe nurtured by divine light.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Wardrobe Couture & Vrat Fuel */}
        <div className="rounded-2xl border border-amber-500/25 bg-[#140b24] p-4 sm:p-6 lg:col-span-5 flex flex-col justify-between shadow-2xl">
          <div>
            {/* Tab switch for styling vs fuel */}
            <div className="flex border-b border-stone-800/80 pb-3 gap-2">
              <button
                onClick={() => setActiveTab('wardrobe')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                  activeTab === 'wardrobe'
                    ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/30'
                    : 'text-stone-400 hover:text-white bg-stone-900/60'
                }`}
              >
                Wardrobe Couture
              </button>
              <button
                onClick={() => setActiveTab('vrat')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                  activeTab === 'vrat'
                    ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/30'
                    : 'text-stone-400 hover:text-white bg-stone-900/60'
                }`}
              >
                Vrat Stamina Fuel
              </button>
            </div>

            {activeTab === 'wardrobe' ? (
              <div className="mt-4 space-y-3.5">
                <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                  <span className="text-xs font-bold text-rose-400">
                    Women's Chaniya Choli Guide
                  </span>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {currentDay.attireSuggestions.women}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                  <span className="text-xs font-bold text-amber-400">
                    Men's Kediyu & Kafni Styling
                  </span>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {currentDay.attireSuggestions.men}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                  <span className="text-xs font-bold text-yellow-400">
                    Traditional Jewellery & Crafts
                  </span>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {currentDay.attireSuggestions.jewellery}
                  </p>
                  <p className="mt-2 text-[11px] text-amber-300 font-medium">
                    Artisanal technique: {currentDay.attireSuggestions.craftTechnique}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3.5">
                <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                  <span className="text-xs font-bold text-emerald-400">
                    Sattvic Superfood Recipe
                  </span>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {currentDay.vratFuel.mealIdea}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                  <span className="text-xs font-bold text-amber-400">
                    Energy Metabolic Focus
                  </span>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {currentDay.vratFuel.energyFocus}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-[#1a112e] p-3.5">
                  <span className="text-xs font-bold text-cyan-400">
                    Hydration Pacing Tip
                  </span>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                    {currentDay.vratFuel.hydrationTip}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Instruments Image Showcase */}
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-amber-500/20 bg-[#170e28] p-3">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-stone-700">
              {!imageError2 ? (
                <img
                  src="/src/assets/images/garba_folk_instruments_1790485821343.jpg"
                  alt="Carved Dhol, painted Dandiya sticks, and Manjira cymbals on Bandhani silk"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError2(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-amber-900/30 text-xs">
                  🥁 Folk Dhol
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300">Acoustic Heritage</p>
              <p className="text-[11px] text-stone-300">
                Parchment drums, brass cymbals, and seasoned teak dandiya produce acoustic frequencies that synchronize community heart rate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Garba Marathon Endurance & Stamina Calculator */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#12091f] p-4 sm:p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-orange-400" />
          <h3 className="font-['Rozha_One'] text-xl sm:text-2xl text-amber-300">
            Garba Marathon Endurance & Hydration Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Inputs */}
          <div className="space-y-4 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                <span className="font-semibold">Dancing Duration</span>
                <span className="font-mono text-amber-300 font-bold">{hoursDancing} Hours</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.5"
                step="0.5"
                value={hoursDancing}
                onChange={(e) => setHoursDancing(Number(e.target.value))}
                className="h-2 w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                <span className="font-semibold">Body Weight</span>
                <span className="font-mono text-amber-300 font-bold">{bodyWeightKg} kg</span>
              </div>
              <input
                type="range"
                min="45"
                max="105"
                step="1"
                value={bodyWeightKg}
                onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                className="h-2 w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <span className="text-xs text-stone-300 block mb-1 font-semibold">Rhythm Intensity</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'moderate' as const, label: 'Hechh (Easy)' },
                  { id: 'high' as const, label: 'Dodhiya (Active)' },
                  { id: 'turbo' as const, label: 'Sanedo (Turbo)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setIntensity(item.id)}
                    className={`rounded-xl py-2 text-xs font-bold border transition-all active:scale-95 ${
                      intensity === item.id
                        ? 'border-amber-400 bg-amber-400 text-stone-950 shadow-md shadow-amber-400/30'
                        : 'border-stone-800 bg-[#1a112e] text-stone-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-7 sm:grid-cols-4 items-center">
            <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Estimated Burn</span>
              <p className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                {estimatedCalories}
              </p>
              <span className="text-[10px] text-stone-500">kcal total</span>
            </div>

            <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Fluid Loss</span>
              <p className="font-mono text-2xl font-bold text-cyan-400 tabular-nums">
                {estimatedSweatLiters} L
              </p>
              <span className="text-[10px] text-stone-500">hydration need</span>
            </div>

            <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Rest Intervals</span>
              <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                {recommendedBreaks}
              </p>
              <span className="text-[10px] text-stone-500">short breaks</span>
            </div>

            <div className="rounded-xl border border-stone-800 bg-[#1a112e] p-3 text-center">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Electrolytes</span>
              <p className="font-mono text-2xl font-bold text-orange-400 tabular-nums">
                {Math.round(hoursDancing * 420)}
              </p>
              <span className="text-[10px] text-stone-500">mg sodium</span>
            </div>
          </div>
        </div>

        {/* Recovery Protocols Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t border-stone-800/80 pt-5">
          {MARATHON_RECOVERY_TIPS.map((tip, idx) => (
            <div key={idx} className="rounded-xl border border-stone-800/80 bg-[#170e28] p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{tip.title}</span>
              </div>
              <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
                {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
