import React from 'react';
import { X, Sparkles, Check, Lightbulb, Compass, Award, Music2, Footprints, Users, Gamepad2, Heart } from 'lucide-react';

interface IdeaManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdeaManifestoModal: React.FC<IdeaManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-amber-500/40 bg-[#140c24] p-6 sm:p-8 text-[#f7f3ee] shadow-2xl shadow-amber-950/80">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-stone-700 bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-4 w-4" />
          <span>Product Innovation Blueprint</span>
        </div>

        <h2 className="mt-2 font-['Rozha_One'] text-2xl sm:text-3xl font-bold text-amber-200">
          Why "TaalChakra" Does Not Exist Today
        </h2>

        <p className="mt-2 text-sm text-stone-300 leading-relaxed">
          When exploring Navratri applications in the digital ecosystem, virtually all existing solutions fall into three shallow categories: static lyric sheets, YouTube playlist links, or generic color calendars. None provide an interactive, procedural simulation of the living folk tradition.
        </p>

        {/* Core Pillars */}
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-stone-800 bg-[#1a112c] p-4">
            <div className="flex items-center gap-2.5 text-amber-300 font-semibold text-sm">
              <Music2 className="h-4 w-4 text-amber-400" />
              <span>1. Procedural Web Audio Folk Percussion Engine</span>
            </div>
            <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
              <strong>The Non-Existent Innovation:</strong> Rather than streaming heavy pre-recorded MP3 tracks, TaalChakra synthesizes authentic Gujarati percussion (Dhol Bass with pitch drop, parchment Treble snap, pure brass Manjira shimmer, Ghunghroo micro-bursts) entirely procedurally using the Web Audio API. Users can sequence, tap tempo, and manipulate polyrhythms live.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-[#1a112c] p-4">
            <div className="flex items-center gap-2.5 text-rose-300 font-semibold text-sm">
              <Footprints className="h-4 w-4 text-rose-400" />
              <span>2. Interactive Dodhiya Footwork & Pivot Simulator</span>
            </div>
            <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
              <strong>The Non-Existent Innovation:</strong> Millions of diaspora and new dancers experience "Garba Anxiety"—fearing they will trip or disrupt the flow. TaalChakra provides an interactive coordinate visualizer mapping left/right foot placement, torso pivot angles (0° to 180°), and hand clap elevations (waist, chest, skyward) synced to verbal rhythm bols.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-[#1a112c] p-4">
            <div className="flex items-center gap-2.5 text-orange-300 font-semibold text-sm">
              <Users className="h-4 w-4 text-orange-400" />
              <span>3. Mandali Circle Formation & Ground Collision Radar</span>
            </div>
            <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
              <strong>The Non-Existent Innovation:</strong> Coordinating 6 to 18 friends on a crowded 50,000-person garba ground (like United Way Vadodara or GMDC Ahmedabad) is logistical chaos. TaalChakra introduces the first digital circle formation studio: simulate counter-rotating dual concentric rings, serpentine Jalebi flows, and Dandiya rows with custom friend avatars and clearance spacing calculations.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-[#1a112c] p-4">
            <div className="flex items-center gap-2.5 text-emerald-300 font-semibold text-sm">
              <Gamepad2 className="h-4 w-4 text-emerald-400" />
              <span>4. "Taal-Milaap" Rhythm Reflex Clash Game</span>
            </div>
            <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
              <strong>The Non-Existent Innovation:</strong> An arcade rhythm game directly training motor timing for the three quintessential Navratri physical gestures: Left Dandiya strike, Right Dandiya clash, and palm clap.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-[#1a112c] p-4">
            <div className="flex items-center gap-2.5 text-yellow-300 font-semibold text-sm">
              <Award className="h-4 w-4 text-yellow-400" />
              <span>5. UNESCO Intangible Cultural Heritage Preservation</span>
            </div>
            <p className="mt-1.5 text-xs text-stone-300 leading-relaxed">
              <strong>Cultural Grounding:</strong> In December 2023, the Garba of Gujarat was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity. TaalChakra respects this legacy with authentic Kathiawadi, Kutch Ahir, and Baroda cultural documentation, paired with sports-science endurance metrics for 4-hour dance marathons.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-stone-800/80 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Heart className="h-3.5 w-3.5 text-rose-400" />
            <span>Dedicated to the living spirit of Navratri & Maa Amba</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-stone-950 hover:bg-amber-400 transition-colors"
          >
            Explore the Studio
          </button>
        </div>
      </div>
    </div>
  );
};
