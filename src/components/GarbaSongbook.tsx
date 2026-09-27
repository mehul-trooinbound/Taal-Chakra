import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  Mic2,
  Share2,
  Check,
  Search,
  SkipForward,
  SkipBack,
  Repeat,
  Radio,
  Sliders,
  Flame,
  UserCheck,
  Disc3,
  Bell
} from 'lucide-react';
import { GARBA_SONGS, SINGERS_LIST } from '../data/garbaSongs';
import { TAAL_PRESETS } from '../data/garbaData';
import { folkAudio } from '../utils/audioEngine';
import { GarbaSong, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface GarbaSongbookProps {
  lang: Language;
}

export const GarbaSongbook: React.FC<GarbaSongbookProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedSongId, setSelectedSongId] = useState<string>('nagar_nandji_na_laal');
  const [selectedSingerId, setSelectedSingerId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isSingAlongActive, setIsSingAlongActive] = useState<boolean>(true);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isRepeat, setIsRepeat] = useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSoundEffect, setActiveSoundEffect] = useState<string | null>(null);

  // Canvas visualizer ref
  const visualizerRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const currentSong = GARBA_SONGS.find((s) => s.id === selectedSongId) || GARBA_SONGS[0];

  // Filter songs by Singer, Category, and Search Query
  const filteredSongs = GARBA_SONGS.filter((song) => {
    const matchesSinger = selectedSingerId === 'all' || song.singerId === selectedSingerId;
    const matchesCategory = selectedCategory === 'all' || song.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      song.title.toLowerCase().includes(query) ||
      song.titleGujarati.toLowerCase().includes(query) ||
      song.singer.toLowerCase().includes(query) ||
      song.singerGujarati.toLowerCase().includes(query) ||
      song.lyrics.some((l) =>
        l.verseGujarati.some((line) => line.toLowerCase().includes(query)) ||
        l.verseEnglish.some((line) => line.toLowerCase().includes(query))
      );

    return matchesSinger && matchesCategory && matchesSearch;
  });

  // Handle Play/Pause of in-app song audio
  useEffect(() => {
    if (!isPlayingAudio) {
      folkAudio.stopSongAudio();
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      return;
    }

    const matchedPreset = TAAL_PRESETS.find((p) => p.id === currentSong.rhythmPresetId) || TAAL_PRESETS[0];
    const tracks = matchedPreset.tracks;
    const melodySequence = currentSong.melodySequence || [
      { pitch: 392.0, duration: 0.5 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 493.88, duration: 0.5 },
      { pitch: 523.25, duration: 0.7 },
      { pitch: 440.0, duration: 0.6 }
    ];

    folkAudio.setSpeedMultiplier(playbackSpeed);

    folkAudio.startSongAudio(currentSong.bpm, tracks, melodySequence, (_step, beatCounter) => {
      // Advance lyrics verses smoothly based on musical bar count
      if (isSingAlongActive && beatCounter % 32 === 0) {
        setActiveVerseIndex((prev) => (prev + 1) % currentSong.lyrics.length);
      }
    });

    // Elapsed timer
    progressTimerRef.current = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next >= currentSong.audioDurationSeconds) {
          if (isRepeat) {
            return 0;
          } else {
            handleNextSong();
            return 0;
          }
        }
        return next;
      });
    }, 1000);

    return () => {
      folkAudio.stopSongAudio();
      if (progressTimerRef.current) {
        window.clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlayingAudio, currentSong.id, playbackSpeed, isRepeat, isSingAlongActive]);

  // Real-time audio frequency visualizer loop
  useEffect(() => {
    const canvas = visualizerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = folkAudio.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (analyser && isPlayingAudio) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Subtle resting idle pulse
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin((Date.now() / 350) + i * 0.4) * 8 + 12;
        }
      }

      const barCount = 28;
      const barWidth = (width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        const dataIdx = Math.floor((i / barCount) * bufferLength);
        const val = dataArray[dataIdx] || 10;
        const barHeight = Math.max(3, (val / 255) * (height - 4));

        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Gradient from golden yellow to saffron orange to deep crimson
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#ea580c');
        grad.addColorStop(1, '#e11d48');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlayingAudio]);

  const handleTogglePlay = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleSongSelect = (song: GarbaSong) => {
    setSelectedSongId(song.id);
    setActiveVerseIndex(0);
    setElapsedSeconds(0);
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
    }
  };

  const handleNextSong = () => {
    const currentIndex = filteredSongs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    handleSongSelect(filteredSongs[nextIndex]);
  };

  const handlePrevSong = () => {
    const currentIndex = filteredSongs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    handleSongSelect(filteredSongs[prevIndex]);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    folkAudio.setSpeedMultiplier(speed);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    folkAudio.setVolume(newVol);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setElapsedSeconds(seekTime);
  };

  const handleCopyLyrics = () => {
    const text = currentSong.lyrics
      .map((l) => l.verseGujarati.join('\n') + '\n\n' + l.verseEnglish.join('\n') + '\nMeaning: ' + l.meaning)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(
      `${currentSong.titleGujarati} (${currentSong.title})\nSinger: ${currentSong.singerGujarati} / ${currentSong.singer}\n\n${text}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Play harmonium melody solo preview
  const playHarmoniumPhrase = () => {
    const notes = currentSong.melodyNotes || [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        folkAudio.playHarmoniumReed(freq, 0.45, 0.5);
      }, idx * 240);
    });
  };

  // DJ Soundboard trigger
  const triggerSoundEffect = (type: string) => {
    setActiveSoundEffect(type);
    setTimeout(() => setActiveSoundEffect(null), 300);

    switch (type) {
      case 'whistle':
        folkAudio.playWhistle(0.85);
        break;
      case 'dholBass':
        folkAudio.playDholBass(1.0);
        break;
      case 'dholTreble':
        folkAudio.playDholTreble(0.95);
        break;
      case 'manjira':
        folkAudio.playManjira(0.85);
        break;
      case 'clap':
        folkAudio.playClap(0.95);
        break;
      case 'dandiya':
        folkAudio.playDandiyaClash(1.0);
        break;
      case 'haaMoj':
        folkAudio.playVocalCall('haaMoj');
        break;
      case 'ariri':
        folkAudio.playVocalCall('ariri');
        break;
      case 'heMaa':
        folkAudio.playVocalCall('heMaa');
        break;
      default:
        folkAudio.playClap();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentSingerProfile = SINGERS_LIST.find((s) => s.id === currentSong.singerId);

  return (
    <div className="space-y-6">
      {/* Top Banner: Singers Discovery Hub */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1a0e30] via-[#120822] to-[#1e0f35] p-4 sm:p-6 shadow-2xl shadow-black/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner">
                <Music className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-['Rozha_One'] text-2xl sm:text-3xl text-amber-200 tracking-wide">
                  {t.songsHeaderTitle}
                </h2>
                <span className="text-xs text-amber-400/90 font-medium">
                  {lang === 'gu'
                    ? 'કીર્તિદાન ગઢવી, હેમંત ચૌહાણ, કિંજલ દવે, ઓસમાન મીર, ફાલ્ગુની પાઠક અને પ્રફુલ દવેના સુરે'
                    : 'Featuring Kirtidan Gadhvi, Hemant Chauhan, Kinjal Dave, Osman Mir, Falguni Pathak & Praful Dave'}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              {t.songsHeaderSub}
            </p>
          </div>

          {/* Quick Stats Badge */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            <div className="rounded-2xl border border-amber-500/30 bg-[#160b2b]/90 px-4 py-2 text-center shadow-lg">
              <span className="block text-[11px] uppercase font-bold text-amber-400">
                {lang === 'gu' ? 'ગરબા સંગ્રહ' : 'Available Songs'}
              </span>
              <span className="font-['Rozha_One'] text-xl text-white font-bold">
                {GARBA_SONGS.length} {lang === 'gu' ? 'ગીતો' : 'Tracks'}
              </span>
            </div>
            <div className="rounded-2xl border border-orange-500/30 bg-[#160b2b]/90 px-4 py-2 text-center shadow-lg">
              <span className="block text-[11px] uppercase font-bold text-orange-400">
                {lang === 'gu' ? 'ગાયક કલાકારો' : 'Singers'}
              </span>
              <span className="font-['Rozha_One'] text-xl text-white font-bold">
                {SINGERS_LIST.length - 1} {lang === 'gu' ? 'કલાકારો' : 'Legends'}
              </span>
            </div>
          </div>
        </div>

        {/* Singer Filter Ribbon */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5" />
              {t.filterBySinger}
            </span>
            {selectedSingerId !== 'all' && (
              <button
                onClick={() => setSelectedSingerId('all')}
                className="text-[11px] text-amber-300 hover:text-white underline underline-offset-2"
              >
                {lang === 'gu' ? 'બધા કલાકારો જુઓ' : 'Reset Singer Filter'}
              </button>
            )}
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none touch-scroll-x">
            {SINGERS_LIST.map((singer) => {
              const isSelected = selectedSingerId === singer.id;
              const count = singer.id === 'all'
                ? GARBA_SONGS.length
                : GARBA_SONGS.filter((s) => s.singerId === singer.id).length;

              return (
                <button
                  key={singer.id}
                  onClick={() => setSelectedSingerId(singer.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-2xl p-2.5 sm:px-3.5 sm:py-2 border transition-all active:scale-95 ${
                    isSelected
                      ? 'border-amber-400 bg-gradient-to-r from-amber-500/30 to-orange-500/20 text-white shadow-lg shadow-amber-950/70 ring-1 ring-amber-400/60'
                      : 'border-stone-800 bg-[#160d29]/90 text-stone-300 hover:border-amber-500/40 hover:bg-[#21143d]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr ${singer.avatarGradient} font-bold text-xs text-white shadow-md border border-white/20`}
                  >
                    {singer.initials}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs sm:text-sm font-bold font-['Rozha_One'] text-amber-200 whitespace-nowrap">
                      {lang === 'gu' ? singer.nameGujarati : singer.name}
                    </span>
                    <span className="block text-[10px] text-stone-400 whitespace-nowrap">
                      {lang === 'gu' ? singer.titleGujarati : singer.title} · {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Bar & Live Search */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: t.allSongs },
              { id: 'aarti', label: t.aartiCat },
              { id: 'pradakshina', label: t.pradakshinaCat },
              { id: 'dodhiya', label: t.dodhiyaCat },
              { id: 'sanedo', label: t.sanedoCat },
              { id: 'raas', label: t.raasCat },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'border border-amber-400 bg-amber-400 text-stone-950 shadow-md shadow-amber-400/30'
                    : 'border border-stone-800 bg-[#170e2a] text-stone-300 hover:text-white hover:border-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-stone-800 bg-[#160b29] pl-9 pr-3 py-1.5 text-xs text-stone-100 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/40"
            />
          </div>
        </div>
      </div>

      {/* MASTER IN-APP AUDIO PLAYER CONSOLE */}
      <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#1b0d33] via-[#211140] to-[#190c30] p-4 sm:p-6 shadow-2xl shadow-black/70">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Col 1: Song Info & Visualizer (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-red-600/30 px-2.5 py-0.5 text-[11px] font-bold text-red-300 border border-red-500/40 animate-pulse">
                <Radio className="h-3 w-3" />
                {t.nowPlaying}
              </span>
              <span className="text-xs text-amber-300 font-medium">
                {currentSong.bpm} BPM · {lang === 'gu' ? currentSong.taalTypeGujarati : currentSong.taalType}
              </span>
            </div>

            <div>
              <h3 className="font-['Rozha_One'] text-xl sm:text-2xl font-bold text-amber-100 truncate">
                {lang === 'gu' ? currentSong.titleGujarati : currentSong.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs sm:text-sm font-semibold text-amber-400">
                  🎙️ {lang === 'gu' ? currentSong.singerGujarati : currentSong.singer}
                </span>
                <span className="text-[10px] rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-mono">
                  {lang === 'gu' ? currentSong.singerTagGujarati : currentSong.singerTag}
                </span>
              </div>
            </div>

            {/* Live Frequency Visualizer */}
            <div className="mt-2 rounded-xl bg-black/40 border border-stone-800 p-2">
              <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1 px-1">
                <span>{t.audioVisualizer}</span>
                <span className="font-mono text-amber-400">
                  {isPlayingAudio ? '● Real-Time Soundwave' : '○ Idle'}
                </span>
              </div>
              <canvas
                ref={visualizerRef}
                width={380}
                height={36}
                className="w-full h-9 rounded"
              />
            </div>
          </div>

          {/* Col 2: Player Controls & Scrubber (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            {/* Scrubber Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                <span>{formatTime(elapsedSeconds)}</span>
                <span className="text-amber-400/80 font-bold">
                  {currentSong.signatureChantGujarati || currentSong.signatureChant}
                </span>
                <span>{formatTime(currentSong.audioDurationSeconds)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={currentSong.audioDurationSeconds}
                value={elapsedSeconds}
                onChange={handleSeek}
                className="w-full h-2 rounded-lg bg-stone-800 accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Transport Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Prev Song */}
                <button
                  onClick={handlePrevSong}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-700 bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-700 active:scale-95 transition-all"
                  title={t.prevSong}
                >
                  <SkipBack className="h-4 w-4" />
                </button>

                {/* Master Play / Pause Button */}
                <button
                  onClick={handleTogglePlay}
                  className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-sm shadow-xl transition-all active:scale-95 ${
                    isPlayingAudio
                      ? 'border border-amber-300 bg-amber-400 text-stone-950 shadow-amber-400/40 hover:bg-amber-300'
                      : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-stone-950 shadow-orange-950/80 hover:brightness-110'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="h-5 w-5 fill-stone-950" />
                      <span>{t.stopAccompaniment}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 fill-stone-950" />
                      <span>{t.playAccompaniment}</span>
                    </>
                  )}
                </button>

                {/* Next Song */}
                <button
                  onClick={handleNextSong}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-700 bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-700 active:scale-95 transition-all"
                  title={t.nextSong}
                >
                  <SkipForward className="h-4 w-4" />
                </button>

                {/* Repeat Toggle */}
                <button
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-95 ${
                    isRepeat
                      ? 'border-amber-400 bg-amber-500/25 text-amber-300'
                      : 'border-stone-800 bg-stone-800/60 text-stone-400'
                  }`}
                  title={t.repeatSong}
                >
                  <Repeat className="h-4 w-4" />
                </button>
              </div>

              {/* Speed & Harmonium Solo */}
              <div className="flex items-center gap-2">
                {/* Speed buttons */}
                <div className="flex items-center rounded-xl border border-stone-800 bg-black/40 p-1">
                  {[0.8, 1.0, 1.25].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        playbackSpeed === speed
                          ? 'bg-amber-400 text-stone-950'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Harmonium Solo Lead */}
                <button
                  onClick={playHarmoniumPhrase}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-900/50 transition-colors active:scale-95"
                  title="Play signature harmonium chime"
                >
                  <Disc3 className="h-3.5 w-3.5 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">{t.melodyHarmonium}</span>
                </button>
              </div>
            </div>

            {/* Volume & Kara-Taal Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-2.5">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-stone-400" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-20 sm:w-28 h-1.5 rounded-lg bg-stone-800 accent-amber-400 cursor-pointer"
                  title={t.volumeLabel}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSingAlongActive(!isSingAlongActive)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                    isSingAlongActive
                      ? 'border-emerald-400 bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-400/40'
                      : 'border-stone-700 bg-stone-800 text-stone-400'
                  }`}
                >
                  <Mic2 className="h-3.5 w-3.5" />
                  <span>{t.singAlongMode}</span>
                </button>

                <button
                  onClick={handleCopyLyrics}
                  className="flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800/90 px-3 py-1.5 text-xs font-semibold text-stone-200 hover:text-white transition-colors active:scale-95"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Share Lyrics'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE GARBA GROUND DJ SOUNDBOARD */}
        <div className="mt-5 rounded-2xl border border-amber-500/25 bg-[#140a26]/90 p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {t.soundboardHeading}
              </span>
            </div>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              {t.soundboardDesc}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { id: 'whistle', label: t.btnWhistle, icon: '🪈', color: 'from-amber-500/30 to-yellow-600/30' },
              { id: 'dholBass', label: t.btnDholBass, icon: '🥁', color: 'from-red-600/30 to-orange-700/30' },
              { id: 'dholTreble', label: t.btnDholTreble, icon: '🥁', color: 'from-orange-500/30 to-amber-600/30' },
              { id: 'manjira', label: t.btnManjira, icon: '🔔', color: 'from-yellow-400/30 to-amber-500/30' },
              { id: 'clap', label: t.btnClap, icon: '👏', color: 'from-rose-500/30 to-pink-600/30' },
              { id: 'dandiya', label: t.btnDandiya, icon: '🎋', color: 'from-emerald-500/30 to-teal-600/30' },
              { id: 'haaMoj', label: t.btnHaaMoj, icon: '📣', color: 'from-purple-500/30 to-indigo-600/30' },
              { id: 'ariri', label: t.btnAriri, icon: '⚡', color: 'from-fuchsia-500/30 to-pink-600/30' },
              { id: 'heMaa', label: t.btnHeMaa, icon: '🙏', color: 'from-amber-600/30 to-red-600/30' },
            ].map((sfx) => {
              const isActive = activeSoundEffect === sfx.id;
              return (
                <button
                  key={sfx.id}
                  onClick={() => triggerSoundEffect(sfx.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all active:scale-90 text-center ${
                    isActive
                      ? 'border-amber-400 bg-amber-400 text-stone-950 scale-105 shadow-lg shadow-amber-400/50'
                      : `border-stone-800 bg-gradient-to-b ${sfx.color} text-stone-200 hover:border-amber-500/40 hover:brightness-125`
                  }`}
                >
                  <span className="text-base sm:text-lg">{sfx.icon}</span>
                  <span className="mt-1 text-[10px] font-bold leading-tight truncate w-full">
                    {sfx.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN SONGBOOK LAYOUT: 2 Columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Repertoire List (4 cols) */}
        <div className="rounded-3xl border border-amber-500/25 bg-[#120822] p-4 sm:p-5 lg:col-span-4 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Disc3 className="h-3.5 w-3.5" />
                {lang === 'gu' ? 'ગરબા સંગ્રહ સૂચિ' : 'Garba Repertoire'} ({filteredSongs.length})
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {isPlayingAudio ? '▶ Playing in App 🎵' : 'Ready'}
              </span>
            </div>

            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {filteredSongs.length === 0 ? (
                <div className="p-6 text-center text-stone-400 text-xs">
                  {lang === 'gu' ? 'કોઈ ગીત મળ્યું નથી.' : 'No songs found matching criteria.'}
                </div>
              ) : (
                filteredSongs.map((song) => {
                  const isSelected = selectedSongId === song.id;
                  const isCurrentlyPlayingThis = isSelected && isPlayingAudio;

                  return (
                    <button
                      key={song.id}
                      onClick={() => handleSongSelect(song)}
                      className={`w-full flex flex-col text-left rounded-2xl p-3.5 border transition-all active:scale-98 ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-950/60 ring-1 ring-amber-400/60'
                          : 'border-stone-800/80 bg-[#170e2a] hover:border-amber-500/40 hover:bg-[#201438]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-['Rozha_One'] text-base font-bold text-amber-200 block">
                            {lang === 'gu' ? song.titleGujarati : song.title}
                          </span>
                          <span className="text-xs text-amber-400/90 font-medium flex items-center gap-1 mt-0.5">
                            🎙️ {lang === 'gu' ? song.singerGujarati : song.singer}
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-bold">
                            {song.bpm} BPM
                          </span>
                          {isCurrentlyPlayingThis && (
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                          )}
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/60 pt-2">
                        <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-300 font-medium">
                          {lang === 'gu' ? song.categoryGujarati : song.category.toUpperCase()}
                        </span>
                        <span className="font-mono text-stone-400">
                          {lang === 'gu' ? song.taalTypeGujarati : song.taalType.split('/')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Song Spotlight, Singer Bio & Synced Lyrics (8 cols) */}
        <div className="rounded-3xl border border-amber-500/25 bg-[#140a26] p-4 sm:p-6 lg:col-span-8 flex flex-col justify-between shadow-2xl space-y-6">
          <div>
            {/* Song Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-amber-500/25 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/40">
                    {lang === 'gu' ? currentSong.categoryGujarati : currentSong.category.toUpperCase()}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {currentSong.bpm} BPM · {lang === 'gu' ? currentSong.taalTypeGujarati : currentSong.taalType}
                  </span>
                </div>

                <h3 className="font-['Rozha_One'] text-2xl sm:text-3xl font-bold text-amber-100 mt-1.5">
                  {currentSong.titleGujarati}
                </h3>
                <p className="text-sm text-amber-400/90 mt-0.5">
                  {currentSong.title}
                </p>
              </div>

              {/* Singer Tag Badge */}
              <div className="rounded-2xl border border-amber-500/30 bg-[#1e1038] p-3 text-right">
                <span className="block text-[11px] text-stone-400 uppercase font-semibold">
                  {t.singerLabel}
                </span>
                <span className="font-['Rozha_One'] text-sm sm:text-base font-bold text-amber-300">
                  {lang === 'gu' ? currentSong.singerGujarati : currentSong.singer}
                </span>
                <span className="block text-[10px] text-stone-400">
                  {lang === 'gu' ? currentSong.singerTagGujarati : currentSong.singerTag}
                </span>
              </div>
            </div>

            {/* Singer Bio & Cultural Poet Details Banner */}
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs space-y-2">
              {currentSingerProfile && (
                <div className="flex items-start gap-2.5 pb-2 border-b border-amber-500/15">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr ${currentSingerProfile.avatarGradient} font-bold text-xs text-white shadow-md`}
                  >
                    {currentSingerProfile.initials}
                  </div>
                  <div>
                    <span className="font-bold text-amber-300">
                      {lang === 'gu' ? currentSingerProfile.nameGujarati : currentSingerProfile.name} —{' '}
                      {lang === 'gu' ? currentSingerProfile.titleGujarati : currentSingerProfile.title}
                    </span>
                    <p className="text-stone-300 mt-0.5 leading-relaxed">
                      {lang === 'gu' ? currentSingerProfile.bioGujarati : currentSingerProfile.bio}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>
                  {t.poetLabel} {lang === 'gu' ? currentSong.poetGujarati : currentSong.poet}
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed pl-5">
                {lang === 'gu' ? currentSong.descriptionGujarati : currentSong.description}
              </p>
            </div>

            {/* Synchronized Lyrics Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Mic2 className="h-3.5 w-3.5" />
                  {t.lyricsHeading}
                </h4>
                {isSingAlongActive && (
                  <span className="text-[11px] text-emerald-400 font-medium">
                    ● {t.lyricsSyncActive}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {currentSong.lyrics.map((verse, idx) => {
                  const isCurrent = isSingAlongActive && isPlayingAudio && activeVerseIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                        isCurrent
                          ? 'border-amber-400 bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-transparent shadow-xl shadow-amber-950/70 ring-2 ring-amber-400/60 scale-[1.015]'
                          : 'border-stone-800/80 bg-[#170e2a]'
                      }`}
                    >
                      {/* Gujarati Lines */}
                      <div className="space-y-1.5">
                        {verse.verseGujarati.map((line, lIdx) => (
                          <p
                            key={lIdx}
                            className={`font-['Rozha_One'] text-lg sm:text-xl font-bold leading-relaxed tracking-wide ${
                              isCurrent ? 'text-amber-100' : 'text-stone-200'
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>

                      {/* English Transliteration */}
                      <div className="mt-3 space-y-1 border-t border-stone-800/60 pt-2.5 text-xs sm:text-sm font-medium text-amber-300/80 italic">
                        {verse.verseEnglish.map((line, lIdx) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>

                      {/* Devotional Meaning */}
                      <div className="mt-2 text-xs text-stone-400 leading-relaxed">
                        <strong className="text-amber-400 font-semibold">{t.meaningLabel}</strong>{' '}
                        {verse.meaning}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
