export type InstrumentType = 'dholBass' | 'dholTreble' | 'manjira' | 'ghunghroo' | 'clap' | 'vocalBol';

export interface BeatStep {
  active: boolean;
  accent?: boolean;
}

export interface RhythmTrack {
  id: InstrumentType;
  name: string;
  gujaratiName: string;
  description: string;
  steps: boolean[];
  volume: number;
}

export interface TaalPreset {
  id: string;
  name: string;
  gujaratiName: string;
  bpm: number;
  timeSignature: string;
  description: string;
  tracks: Record<InstrumentType, boolean[]>;
}

export interface DodhiyaStepDefinition {
  id: string;
  name: string;
  gujaratiName: string;
  stepsCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Kathiawadi Master';
  region: string;
  bpmRecommended: number;
  summary: string;
  steps: {
    beat: number;
    title: string;
    foot: 'left' | 'right' | 'both';
    movement: string;
    handAction: string;
    torsoAngle: number; // degrees
    footCoords: {
      left: { x: number; y: number };
      right: { x: number; y: number };
    };
    bol: string;
  }[];
}

export interface DancerNode {
  id: string;
  name: string;
  role: 'lead' | 'member' | 'dandiyaPartner';
  angle: number; // in radians
  distance: number; // radius from center
  color: string;
}

export type CircleFormationType = 'singleRing' | 'concentricDual' | 'jalebiSpiral' | 'dandiyaCorridor';

export interface NavratriDayData {
  dayNumber: number;
  date2026: string;
  tithi: string;
  goddessName: string;
  goddessGujarati: string;
  avatarSignificance: string;
  sacredColorName: string;
  sacredColorHex: string;
  colorPhilosophy: string;
  dhyanaMantra: string;
  mantraMeaning: string;
  attireSuggestions: {
    women: string;
    men: string;
    jewellery: string;
    craftTechnique: string;
  };
  vratFuel: {
    mealIdea: string;
    energyFocus: string;
    hydrationTip: string;
  };
}

export type Language = 'en' | 'gu';

export interface SingerProfile {
  id: string;
  name: string;
  nameGujarati: string;
  title: string;
  titleGujarati: string;
  bio: string;
  bioGujarati: string;
  avatarGradient: string;
  initials: string;
}

export interface GarbaSong {
  id: string;
  title: string;
  titleGujarati: string;
  category: 'aarti' | 'pradakshina' | 'dodhiya' | 'sanedo' | 'raas';
  categoryGujarati: string;
  singerId: string;
  singer: string;
  singerGujarati: string;
  singerTag: string;
  singerTagGujarati: string;
  taalType: string;
  taalTypeGujarati: string;
  bpm: number;
  audioDurationSeconds: number;
  poet: string;
  poetGujarati: string;
  description: string;
  descriptionGujarati: string;
  lyrics: {
    verseGujarati: string[];
    verseEnglish: string[];
    meaning: string;
  }[];
  rhythmPresetId: string;
  melodyNotes?: number[];
  melodySequence?: { pitch: number; duration: number }[];
  signatureChant?: string;
  signatureChantGujarati?: string;
}

