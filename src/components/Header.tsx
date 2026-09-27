import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Music2, Footprints, Users, Gamepad2, Music, Globe } from 'lucide-react';
import { folkAudio } from '../utils/audioEngine';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenManifesto: () => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenManifesto,
  isMuted,
  setIsMuted,
  lang,
  setLang,
}) => {
  const t = TRANSLATIONS[lang];

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    folkAudio.setMuted(next);
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'gu' : 'en');
  };

  const navItems = [
    { id: 'songs', label: lang === 'gu' ? 'ગરબા ગીતો & પ્લેયર' : 'Garba Songs & Player', gujarati: 'ગીતો', icon: Music },
    { id: 'sequencer', label: lang === 'gu' ? 'તાલ સંયોજક' : 'Taal Sequencer', gujarati: 'તાલ', icon: Music2 },
    { id: 'dodhiya', label: lang === 'gu' ? 'દોઢિયા સ્ટેપ્સ' : 'Dodhiya Steps', gujarati: 'દોઢિયા', icon: Footprints },
    { id: 'circle', label: lang === 'gu' ? 'મંડળી રડાર' : 'Mandali Radar', gujarati: 'મંડળી', icon: Users },
    { id: 'game', label: lang === 'gu' ? 'તાલ-મિલાપ' : 'Taal-Milaap', gujarati: 'રમત', icon: Gamepad2 },
    { id: 'almanac', label: lang === 'gu' ? '૯-રાત્રિ પંચાંગ' : '9-Rātri Almanac', gujarati: 'પંચાંગ', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#0e0818]/95 backdrop-blur-xl shadow-lg shadow-black/40">
      {/* Top decorative Toran hairline glow */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-rose-500" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Zone 1: Single Brand Text Element */}
        <button
          onClick={() => setActiveTab('sequencer')}
          className="group flex items-baseline gap-2 text-left focus-visible:outline-none transition-transform active:scale-98"
        >
          <span className="font-['Rozha_One'] text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-amber-300 transition-all">
            {lang === 'gu' ? 'તાલચક્ર' : 'TaalChakra'}
          </span>
          <span className="font-['Yatra_One'] text-xs sm:text-sm text-amber-400/80">
            {lang === 'gu' ? 'TaalChakra' : 'તાલચક્ર'}
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs xl:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-200 shadow-md shadow-amber-950/50 border border-amber-500/40'
                    : 'text-stone-300 hover:bg-[#1f1533] hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-amber-500/40 bg-[#1e1335] px-3 py-1 text-xs font-bold text-amber-200 hover:bg-[#281a46] hover:border-amber-400 transition-all active:scale-95"
            title={lang === 'en' ? 'ગુજરાતી ભાષામાં બદલો' : 'Switch to English'}
          >
            <Globe className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold">{t.languageToggle}</span>
          </button>

          {/* Audio Engine Live Indicator & Mute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className={`flex h-9 items-center gap-2 rounded-xl border px-2.5 sm:px-3 transition-all active:scale-95 ${
              isMuted
                ? 'border-red-500/30 bg-red-950/30 text-red-300 hover:bg-red-950/50'
                : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-950/40 shadow-sm shadow-emerald-950/40'
            }`}
            title={isMuted ? 'Acoustic Synthesis Muted' : 'Acoustic Synthesis Active'}
          >
            {isMuted ? (
              <>
                <VolumeX className="h-4 w-4 text-red-400" />
                <span className="hidden xl:inline text-[11px] font-mono">{t.audioMuted}</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <Volume2 className="h-4 w-4 text-emerald-300" />
                <span className="hidden xl:inline text-[11px] font-mono">{t.audioActive}</span>
              </>
            )}
          </button>

          {/* Innovation Blueprint Modal Trigger */}
          <button
            onClick={onOpenManifesto}
            className="flex items-center gap-1.5 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 px-3 sm:px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-950/50 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap focus-visible:outline-none"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            <span className="hidden sm:inline">{t.whyNewBtn}</span>
            <span className="sm:hidden">{t.whyNewShort}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar with Edge Fade */}
      <div className="relative flex lg:hidden border-t border-amber-500/15 bg-[#120b22]">
        <div className="flex w-full overflow-x-auto px-3 py-2 scrollbar-none gap-1.5 touch-scroll-x">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all touch-snap-item ${
                  isActive
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-950/50'
                    : 'text-stone-300 hover:text-white bg-stone-900/60 border border-stone-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

