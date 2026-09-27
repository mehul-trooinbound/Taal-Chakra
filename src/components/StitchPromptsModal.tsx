import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Layers, Sliders, Footprints, Users, Gamepad2, BookOpen } from 'lucide-react';

interface StitchPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const STITCH_PROMPTS = {
  master: `Role: Senior Product & UI/UX Designer
Project Name: TaalChakra (तालચક્ર) — The Intelligent Navratri Garba Studio & 9-Rātri Rhythmic Simulation Lab
Target Platform: Responsive Desktop Web Application (1440px wide baseline)
Visual Style: Authentic Royal Gujarati Folk Heritage meets Dark Cyber-Artisanal Studio (Deep midnight plum #0c0814 neutral canvas, incandescent saffron #f59e0b, marigold #eab308, kumkum crimson #dc2626, and peacock teal #0d9488 accents; subtle mirror-work abhla reflections; zero AI-slop pills; typography pairing Rozha One / Yatra One with clean Plus Jakarta Sans).

Design System Tokens:
- Canvas Neutral: #0c0814 (60%)
- Card & Surface: #140c22, #19102b, hairline borders rgba(245, 158, 11, 0.2) (30%)
- Accent Highlights: #f59e0b (Saffron Gold), #ec4899 (Rani Pink), #10b981 (Emerald Green) (10%)
- Typography: Display: 'Rozha One' serif, Folk Subheaders: 'Yatra One', UI Body & Tabular: 'Plus Jakarta Sans' with tabular-nums.

App Structure (5 Cohesive Views):
1. Top Navigation Bar: Strict 3-zone contract. Left: Wordmark 'TaalChakra' + Gujarati script 'तालચક્ર'. Center: 5 clean text nav links with active underline/glow indicator. Right: Audio mute toggle + 'Export Blueprint' button.
2. Hero Banner: 16:9 cinematic festival imagery showing authentic Kutch mirror-work chaniya choli dancers around a glowing central earthen garbi diya, headline in Rozha One with balanced typography, quick action jump buttons, and 4 clean metadata metrics.
3. Modular Workspace Tabs: Segmented control switching between the 5 studios below with zero layout shifting.`,

  sequencer: `Create a high-fidelity UI design for 'Taal Sequencer — Folk Dhol & Percussion Drum Machine':
- Layout: 2-column or full-width studio console with dark purple surface #140c22 and gold hairline borders.
- Top Control Bar: Master Play/Pause button with pulse glow, 5 authentic preset buttons (Hechh 2-Taali 86 BPM, Kathiawadi Tran Taali 102 BPM, Dodhiya 6-Beat 116 BPM, Mataji Dakla 128 BPM, Sanedo Turbo 144 BPM), interactive tempo slider (60–165 BPM) with numerical readout, and Tap-Tempo button.
- 16-Step Sequencer Matrix: Horizontal step grid spanning 6 acoustic folk tracks:
  1. Dhol Bass (Dha/Dhum) - Saffron #f59e0b
  2. Dhol Treble (Ta/Chaanti stick snap) - Deep Orange #f97316
  3. Manjira (Brass finger cymbal chime) - Bright Yellow #facc15
  4. Ghunghroo (Ankle bells micro-burst) - Rose Pink #f43f5e
  5. Palm Clap (Warm taali) - Emerald Green #10b981
  6. Vocal Bol (Hai Re / Bol shout) - Indigo #6366f1
- Step Grid Styling: Rounded square pads (44x44px). Active steps illuminate with instrument accent color. Step numbers 1..16 on top with beat markers (1, 5, 9, 13) subtly emphasized. Live glowing playhead column tracking the current beat.
- Track Controls: Each track row has a preview audition speaker button, instrument name, and Gujarati folk script label.`,

  dodhiya: `Create a high-fidelity UI design for 'Dodhiya Footwork & Step Visualizer Lab':
- Layout: Split 12-column layout (7 cols for Interactive Dance Floor, 5 cols for Step-by-Step Choreography Breakdown).
- Pattern Selector Bar: 6 selectable styles (2-Taali Beginner, 3-Taali Kathiawadi Classic, 6-Step Dodhiya Flow, 8-Step Kathiawadi, 10-Step Baroda Royal, Popat Hop Step) with badge tags showing beat counts and regional origins (Vadodara, Saurashtra, Kutch).
- Interactive Dance Floor Arena: Dark circular dance floor (#0e071a) with subtle golden concentric rings and a glowing central terracotta Garbi Diya at North.
- Dynamic Visual Dancers: Distinct Left Foot sole (Rose #f43f5e) and Right Foot sole (Amber #f59e0b) placed at precise coordinates, displacement motion arrows, torso pivot angle compass (e.g. 45° right pivot or 180° chakardi spin), and verbal rhythm bol banner (e.g. 'DHA', 'DHIN', 'TAK', 'NA').
- Stepper Controls: Beat navigator (Beat 1 of 8), Play/Pause Auto-Step trainer button, and timeline buttons showing each beat's hand clap height (Waist, Chest, Skyward).
- Breakdown Sidebar: Detailed cards for Footwork Displacement, Hand & Taali Elevation, and Regional Cultural Style Secrets.`,

  circle: `Create a high-fidelity UI design for 'Garba Mandali Circle Formation & Spacing Radar':
- Layout: 8 cols for 2D Interactive Ground Radar, 4 cols for Friend Group Roster Manager.
- Formation Selector Bar: 4 geometric options:
  1. Single Concentric Ring (Classic Pradakshina facing center diya)
  2. Dual Counter-Rotating Concentric Rings (Outer clockwise, Inner counter-clockwise)
  3. Jalebi Serpentine Spiral Flow (Inward vortex)
  4. Dandiya Raas Facing Corridor (Two parallel rows rotating partners)
- 2D Ground Radar Arena: Circular SVG radar with center diya, glowing concentric orbit lines, and rotating avatar nodes representing dancers with custom attire colors and direction pointers. Designated 'Lead Dancer' has a spinning crown marker (👑).
- Radar Controls: Circle radius slider (px/meters), rotation velocity slider (RPM), and Clockwise vs Counter-Clockwise direction toggle.
- Real-time Spacing Safety HUD: Dynamic clearance badge showing meters per person and warning if dancers are packed too tightly for high-speed dodhiya swings.
- Friend Roster Manager: Input field to add friends by name, draggable list with color dots, position indices, and crown button to designate Dodhiya Callers.`,

  game: `Create a high-fidelity UI design for 'Taal-Milaap: Dandiya Rhythm Clash Arcade Game':
- Layout: Focused vertical arcade cabinet (max-w-2xl) centered on screen.
- HUD Header: Score counter with glowing tabular numbers, Combo Streak meter with animated flame icon, All-Time High Score, and real-time Judge feedback ('CHAKARDI! PERFECT CLASH', 'SHABAASH!', 'OFF BEAT').
- Difficulty Selector: 3 difficulty levels (Easy 86 BPM, Medium 116 BPM, Hard 140 BPM).
- 3-Lane Rhythm Highway: Dark vertical falling highway with 3 lanes:
  - Lane 1 (Left Dandiya - Key A): Falling angled red wooden dandiya stick gems.
  - Lane 2 (Center Palm Clap - Key Space): Falling glowing emerald palm icons.
  - Lane 3 (Right Dandiya - Key D): Falling angled gold wooden dandiya stick gems.
- Strike Target Zone: Glowing horizontal amber target bar at 85% height.
- Tactile Striker Buttons: 3 large, springy, thumb-friendly buttons at the base with authentic haptic visual states for keyboard or touch interaction.`,

  almanac: `Create a high-fidelity UI design for '9-Rātri Sacred Almanac, Artisanal Wardrobe Stylist & Marathon Stamina Guide':
- Top 9-Day Carousel: Horizontal strip of 9 cards for Days 1 through 9. Each card displays day number, Sanskrit tithi, and a sacred circular color swatch (Day 1 Royal Orange, Day 2 White, Day 3 Crimson Red, Day 4 Royal Blue, Day 5 Yellow, Day 6 Green, Day 7 Grey, Day 8 Purple, Day 9 Peacock Green).
- Sacred Swarup Card: Displays the Goddess name (e.g. Maa Shailaputri, Maa Chandraghanta), divine iconography, Sanskrit Dhyana Mantra, and interactive 'Chime Temple Bell' audio button.
- Artisanal Wardrobe Stylist: Tabbed cards breaking down traditional attire:
  - Women's Chaniya Choli: Kutch Ahir & Rabari needlework, Gamthi mirror work, Patan Patola double-ikat.
  - Men's Kediyu & Kafni: Pleated cowrie-border kediyu, embroidered pagdi, and mojdis.
  - Traditional Jewellery: Oxidized silver hansli chokers, kamarbandh belts with musical bells, and silver ghunghroo anklets.
- Garba Marathon Endurance Calculator: Sliders for dancing hours (1.0 to 5.0 hrs), body weight (kg), and intensity. Real-time metric cards computing estimated calorie burn (800–1400 kcal), fluid sweat loss (liters), and electrolyte sodium replenishment.
- Foot Care & Blister Prevention Cards: Clinical tips on medical micropore tape, dandiya grip tape, and 45° leg elevation recovery.`
};

export const StitchPromptsModal: React.FC<StitchPromptsModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<keyof typeof STITCH_PROMPTS>('master');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: keyof typeof STITCH_PROMPTS, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const sections: { key: keyof typeof STITCH_PROMPTS; label: string; icon: React.ElementType }[] = [
    { key: 'master', label: 'Master Design Prompt', icon: Sparkles },
    { key: 'sequencer', label: '1. Taal Sequencer UI', icon: Sliders },
    { key: 'dodhiya', label: '2. Dodhiya Visualizer UI', icon: Footprints },
    { key: 'circle', label: '3. Mandali Radar UI', icon: Users },
    { key: 'game', label: '4. Rhythm Game UI', icon: Gamepad2 },
    { key: 'almanac', label: '5. Almanac & Fuel UI', icon: BookOpen },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-amber-500/40 bg-[#130b22] text-[#f7f3ee] shadow-2xl shadow-amber-950/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800/80 px-6 py-4 bg-[#180e2b]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-['Rozha_One'] text-xl text-amber-200">
                Stitch Design System Prompts (સ્ટીચ ડિઝાઇન પ્રોમ્પ્ટ)
              </h2>
              <p className="text-xs text-stone-400">
                Ready-to-use prompts for Google Stitch, Figma AI, or UI/UX prototyping tools
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-700 bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-stone-800/80 bg-[#150d26] px-6 py-2 gap-2 scrollbar-none">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.key;
            return (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Prompt for: {sections.find((s) => s.key === activeSection)?.label}
            </span>

            <button
              onClick={() => handleCopy(activeSection, STITCH_PROMPTS[activeSection])}
              className="flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-200 hover:bg-amber-500/30 transition-colors"
            >
              {copiedKey === activeSection ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-amber-300" />
                  <span>Copy This Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-xl border border-stone-800 bg-[#0a0614] p-4 text-xs font-mono leading-relaxed text-stone-300 whitespace-pre-wrap selection:bg-amber-500/30">
            {STITCH_PROMPTS[activeSection]}
          </div>

          {/* Quick Copy All */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5 text-xs text-amber-200/90 flex items-center justify-between">
            <span>Need all prompts in one text package?</span>
            <button
              onClick={() => {
                const all = Object.entries(STITCH_PROMPTS)
                  .map(([k, v]) => `=== ${k.toUpperCase()} PROMPT ===\n${v}\n`)
                  .join('\n\n');
                handleCopy('master', all);
              }}
              className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 underline"
            >
              <Copy className="h-3 w-3" />
              <span>Copy All 6 Prompts Combined</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-800/80 px-6 py-3 bg-[#180e2b] text-xs text-stone-400">
          <span>Optimized for Stitch, Figma AI, and AI-driven frontend prototyping engines.</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-stone-800 px-4 py-1.5 text-xs font-semibold text-stone-200 hover:bg-stone-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
