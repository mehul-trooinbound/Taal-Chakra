/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TaalSequencer } from './components/TaalSequencer';
import { DodhiyaLab } from './components/DodhiyaLab';
import { CircleStudio } from './components/CircleStudio';
import { GarbaSongbook } from './components/GarbaSongbook';
import { RhythmGame } from './components/RhythmGame';
import { NavratriAlmanac } from './components/NavratriAlmanac';
import { IdeaManifestoModal } from './components/IdeaManifestoModal';
import { Music2, Footprints, Users, Gamepad2, BookOpen, Sparkles, Music } from 'lucide-react';
import { Language } from './types';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('gu');
  const [activeTab, setActiveTab] = useState<string>('songs');
  const [isManifestoOpen, setIsManifestoOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  const studios = [
    { id: 'songs', label: t.tabSongs, num: '01', sub: t.tabSongsSub, icon: Music },
    { id: 'sequencer', label: t.tabSequencer, num: '02', sub: t.tabSequencerSub, icon: Music2 },
    { id: 'dodhiya', label: t.tabDodhiya, num: '03', sub: t.tabDodhiyaSub, icon: Footprints },
    { id: 'circle', label: t.tabCircle, num: '04', sub: t.tabCircleSub, icon: Users },
    { id: 'game', label: t.tabGame, num: '05', sub: t.tabGameSub, icon: Gamepad2 },
    { id: 'almanac', label: t.tabAlmanac, num: '06', sub: t.tabAlmanacSub, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#0c0814] text-[#f7f3ee] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenManifesto={() => setIsManifestoOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        lang={lang}
        setLang={setLang}
      />

      {/* Hero Presentation */}
      <HeroBanner
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenManifesto={() => setIsManifestoOpen(true)}
        lang={lang}
      />

      {/* Studio Workspace Section */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Studio Navigation Segmented Tabs (Responsive scrollable ribbon) */}
        <div className="mb-6 sm:mb-8 border-b border-stone-800/80 pb-3 sm:pb-4">
          <div className="flex overflow-x-auto touch-scroll-x gap-2 pb-1 scrollbar-none">
            {studios.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-bold transition-all active:scale-95 touch-snap-item ${
                    isActive
                      ? 'border border-amber-400/50 bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-500/10 text-amber-200 shadow-lg shadow-amber-950/60 ring-1 ring-amber-400/40'
                      : 'border border-stone-800 bg-[#160d26]/80 text-stone-300 hover:bg-[#201338] hover:text-white'
                  }`}
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                    isActive ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-800/80 text-amber-400'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-amber-400/80 font-normal">
                        {tab.num}.
                      </span>
                      <span>{tab.label}</span>
                    </div>
                    <span className="text-[10px] font-normal text-stone-400 hidden md:inline">
                      {tab.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Studio Workspace View */}
        <div className="transition-all duration-300">
          <div className={activeTab === 'songs' ? 'block' : 'hidden'}>
            <GarbaSongbook lang={lang} />
          </div>
          <div className={activeTab === 'sequencer' ? 'block' : 'hidden'}>
            <TaalSequencer isMuted={isMuted} />
          </div>
          <div className={activeTab === 'dodhiya' ? 'block' : 'hidden'}>
            <DodhiyaLab />
          </div>
          <div className={activeTab === 'circle' ? 'block' : 'hidden'}>
            <CircleStudio />
          </div>
          <div className={activeTab === 'game' ? 'block' : 'hidden'}>
            <RhythmGame />
          </div>
          <div className={activeTab === 'almanac' ? 'block' : 'hidden'}>
            <NavratriAlmanac />
          </div>
        </div>
      </main>

      {/* Innovation Manifesto Modal */}
      <IdeaManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Cultural Heritage Footer */}
      <footer className="mt-16 border-t border-amber-500/20 bg-[#07040d] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-['Rozha_One'] text-xl text-amber-400">
                  {lang === 'gu' ? 'તાલચક્ર' : 'TaalChakra'}
                </span>
                <span className="font-['Yatra_One'] text-xs text-amber-500/80">
                  {lang === 'gu' ? 'TaalChakra' : 'તાલચક્ર'}
                </span>
                <span className="text-xs text-stone-600">·</span>
                <span className="text-xs text-stone-400">{t.appSubtitle}</span>
              </div>
              <p className="mt-1 text-xs text-stone-400 max-w-md">
                {t.footerDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-stone-400">
              <button
                onClick={() => setIsManifestoOpen(true)}
                className="hover:text-amber-300 transition-colors"
              >
                {t.whyNewBtn}
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('songs')}
                className="hover:text-amber-300 transition-colors"
              >
                {t.tabSongs}
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('sequencer')}
                className="hover:text-amber-300 transition-colors"
              >
                {t.tabSequencer}
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('dodhiya')}
                className="hover:text-amber-300 transition-colors"
              >
                {t.tabDodhiya}
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('circle')}
                className="hover:text-amber-300 transition-colors"
              >
                {t.tabCircle}
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveTab('game')}
                className="hover:text-amber-300 transition-colors"
              >
                {t.tabGame}
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-stone-800/80 pt-6 text-center text-xs text-stone-500">
            © {new Date().getFullYear()} {t.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}

