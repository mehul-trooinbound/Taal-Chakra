import React, { useState } from 'react';
import { Sparkles, Music2, Footprints, Users, Gamepad2, ArrowRight, Play, Flame, Music } from 'lucide-react';
import { folkAudio } from '../utils/audioEngine';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroBannerProps {
  onSelectTab: (tab: string) => void;
  onOpenManifesto: () => void;
  lang: Language;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab, onOpenManifesto, lang }) => {
  const t = TRANSLATIONS[lang];
  const [imageError, setImageError] = useState(false);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  const handleQuickAcousticTest = () => {
    setIsPlayingTest(true);
    folkAudio.playDholBass(1.0);
    setTimeout(() => folkAudio.playDholTreble(0.9), 160);
    setTimeout(() => folkAudio.playManjira(0.85), 320);
    setTimeout(() => folkAudio.playClap(0.95), 480);
    setTimeout(() => {
      folkAudio.playDholBass(1.0);
      folkAudio.playManjira(0.8);
      setIsPlayingTest(false);
    }, 640);
  };

  return (
    <section className="relative overflow-hidden border-b border-amber-500/20 bg-gradient-to-b from-[#1b0f30] via-[#120a1f] to-[#0c0814] py-8 sm:py-12 lg:py-16">
      {/* Decorative ambient radial lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-600/20 via-rose-600/15 to-purple-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Conceptual Overview & Action CTAs */}
          <div className="lg:col-span-7">
            {/* Cultural Ribbon */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-amber-300">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>{t.unescoRibbon}</span>
              </span>
              <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-stone-300">{t.navratriYear}</span>
              <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-rose-400">{t.originalConcept}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 font-['Rozha_One'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fef3c7] leading-[1.15] text-balance">
              {t.heroHeadline}
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-stone-300 max-w-2xl">
              {t.heroParagraph}
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('sequencer')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 px-5 py-3 text-sm font-bold text-stone-950 shadow-xl shadow-amber-950/60 transition-all hover:brightness-110 active:scale-95 focus-visible:outline-none"
              >
                <Music2 className="h-4 w-4" />
                <span>{t.playSequencerBtn}</span>
              </button>

              <button
                onClick={() => onSelectTab('songs')}
                className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-[#201338] px-4 py-3 text-sm font-bold text-amber-200 transition-all hover:bg-[#2c1b4c] hover:border-amber-400 active:scale-95 focus-visible:outline-none"
              >
                <Music className="h-4 w-4 text-amber-400" />
                <span>{t.songsBtn}</span>
              </button>

              <button
                onClick={handleQuickAcousticTest}
                className={`flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-xs font-semibold text-stone-200 hover:bg-stone-800 transition-all active:scale-95 ${
                  isPlayingTest ? 'border-amber-400 ring-1 ring-amber-400/50 bg-amber-950/30' : ''
                }`}
                title="Hear a quick procedural acoustic Dhol & Manjira roll"
              >
                <Play className={`h-3.5 w-3.5 ${isPlayingTest ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-stone-400'}`} />
                <span>{isPlayingTest ? t.playingRoll : t.quickAcousticTest}</span>
              </button>
            </div>

            {/* High-Impact Stat Metrics Ribbon */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-stone-800/80 pt-6">
              <div className="rounded-xl border border-stone-800/80 bg-[#160d26]/70 p-3">
                <p className="font-mono text-xl sm:text-2xl font-bold text-amber-400">100%</p>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">{t.statPercussion}</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-[#160d26]/70 p-3">
                <p className="font-mono text-xl sm:text-2xl font-bold text-rose-400">6 {lang === 'gu' ? 'શૈલી' : 'Styles'}</p>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">{t.statStyles}</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-[#160d26]/70 p-3">
                <p className="font-mono text-xl sm:text-2xl font-bold text-orange-400">20 {lang === 'gu' ? 'મહત્તમ' : 'Max'}</p>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">{t.statCircle}</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-[#160d26]/70 p-3">
                <p className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">9 {lang === 'gu' ? 'રાત્રિ' : 'Nights'}</p>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">{t.statNights}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-[#1a102e] shadow-2xl shadow-amber-950/60 group">
              {!imageError ? (
                <img
                  src="/src/assets/images/navratri_hero_garba_1790485807144.jpg"
                  alt="Vibrant Navratri Garba circle with traditional mirror-work chaniya cholis and warm earthen diyas"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-64 sm:h-80 lg:h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-64 sm:h-80 lg:h-96 w-full flex-col items-center justify-center bg-gradient-to-br from-amber-900/40 via-purple-900/40 to-stone-900 p-6 text-center">
                  <Sparkles className="h-12 w-12 text-amber-400" />
                  <p className="mt-3 font-['Rozha_One'] text-xl text-amber-200">TaalChakra Folk Garba Studio</p>
                  <p className="mt-1 text-xs text-stone-400">Authentic folk dance, rhythm synthesis & circular choreography</p>
                </div>
              )}

              {/* Cultural floating HUD card */}
              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-amber-500/30 bg-[#0c0814]/90 p-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-amber-200">{t.garbiDiyaBadge}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">80 - 150 BPM Live</span>
                </div>
                <p className="mt-1 text-[11px] text-stone-300">
                  {t.garbiDiyaSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

