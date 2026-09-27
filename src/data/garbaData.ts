import { TaalPreset, DodhiyaStepDefinition, NavratriDayData } from '../types';

export const TAAL_PRESETS: TaalPreset[] = [
  {
    id: 'hechh_2taali',
    name: 'Traditional Hechh (2-Taali)',
    gujaratiName: 'હેંચ - બે તાળી',
    bpm: 86,
    timeSignature: '4/4 (8-Beat)',
    description: 'The soul of Saurashtra folk garba. A gentle, graceful swaying rhythm with two resonant palm claps and swinging dhol thuds.',
    tracks: {
      dholBass:   [true,  false, false, false, true,  false, false, false, true,  false, false, false, true,  false, false, false],
      dholTreble: [false, false, true,  false, false, false, true,  true,  false, false, true,  false, false, true,  true,  false],
      manjira:    [true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false],
      ghunghroo:  [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true],
      clap:       [true,  false, false, false, false, false, false, false, true,  false, false, false, false, false, false, false],
      vocalBol:   [true,  false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    }
  },
  {
    id: 'tran_taali',
    name: 'Kathiawadi Tran Taali',
    gujaratiName: 'કાઠિયાવાડી ત્રણ તાળી',
    bpm: 102,
    timeSignature: '3/4 accented',
    description: 'Iconic 3-clap garba: 1st clap low in front, 2nd clap side pivot, 3rd clap high above the shoulder with a brisk body swivel.',
    tracks: {
      dholBass:   [true,  false, false, false, true,  false, false, false, false, false, true,  false, true,  false, false, false],
      dholTreble: [true,  false, true,  false, true,  true,  false, true,  false, true,  true,  false, true,  false, true,  true],
      manjira:    [true,  false, false, true,  true,  false, false, true,  true,  false, false, true,  true,  false, true,  false],
      ghunghroo:  [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true],
      clap:       [true,  false, false, false, true,  false, false, false, false, false, true,  false, false, false, false, false],
      vocalBol:   [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    }
  },
  {
    id: 'dodhiya_groove',
    name: 'Royal Dodhiya 6-Beat Swing',
    gujaratiName: 'દોઢિયા છ-પગ પ્રવાહ',
    bpm: 116,
    timeSignature: '6/8 Rolling',
    description: 'The modern youth favorite across Gujarat. Continuous diagonal foot cuts and rolling dholak accents that keep the whole circle in sync.',
    tracks: {
      dholBass:   [true,  false, false, true,  false, false, true,  false, false, true,  false, false, true,  false, true,  false],
      dholTreble: [false, true,  true,  false, true,  true,  false, true,  true,  false, true,  true,  true,  true,  false, true],
      manjira:    [true,  true,  false, true,  true,  false, true,  true,  false, true,  true,  false, true,  false, true,  false],
      ghunghroo:  [true,  false, true,  true,  false, true,  true,  false, true,  true,  false, true,  true,  true,  true,  true],
      clap:       [true,  false, false, false, false, false, true,  false, false, false, false, false, true,  false, false, false],
      vocalBol:   [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    }
  },
  {
    id: 'dakla_trance',
    name: 'Mataji Dakla & Chhand',
    gujaratiName: 'ડાકલા અને છંદ (આરાધના)',
    bpm: 128,
    timeSignature: '4/4 Fast Staccato',
    description: 'Intense spiritual frenzy. Fast staccato beats of the hourglass-shaped Dak drum celebrating Maa Amba and Mahishasuramardini.',
    tracks: {
      dholBass:   [true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  true],
      dholTreble: [true,  true,  true,  true,  true,  false, true,  true,  true,  true,  true,  true,  true,  false, true,  true],
      manjira:    [true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false],
      ghunghroo:  [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true],
      clap:       [true,  false, false, false, true,  false, false, false, true,  false, false, false, true,  false, false, false],
      vocalBol:   [true,  false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    }
  },
  {
    id: 'sanedo_turbo',
    name: 'Sanedo Turbo Raas',
    gujaratiName: 'સનેડો સુપરફાસ્ટ રાસ',
    bpm: 144,
    timeSignature: '2/4 High Velocity',
    description: 'The exhilarating climax of the night. Blazing tempo, rapid foot tapping, whistling, and thunderous double-stick clashing.',
    tracks: {
      dholBass:   [true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  true,  true,  false],
      dholTreble: [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true],
      manjira:    [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true],
      ghunghroo:  [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true],
      clap:       [true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false],
      vocalBol:   [false, false, false, false, true,  false, false, false, false, false, false, false, true,  false, false, false],
    }
  }
];

export const DODHIYA_STEPS: DodhiyaStepDefinition[] = [
  {
    id: 'step_2taali',
    name: '2-Taali (Do Taali Folk)',
    gujaratiName: 'બે તાળી લોકનૃત્ય',
    stepsCount: 4,
    difficulty: 'Beginner',
    region: 'Saurashtra & North Gujarat',
    bpmRecommended: 86,
    summary: 'The foundational heartbeat of Garba. Moving sideways along the circular perimeter with alternate foot taps and double chest-height claps.',
    steps: [
      {
        beat: 1,
        title: 'Step Right & Clap 1',
        foot: 'right',
        movement: 'Step right foot diagonally forward along the circle line',
        handAction: 'Firm palm clap at chest height directly facing circle center',
        torsoAngle: 15,
        footCoords: { left: { x: 35, y: 55 }, right: { x: 65, y: 40 } },
        bol: 'DHA'
      },
      {
        beat: 2,
        title: 'Tap Left & Sway',
        foot: 'left',
        movement: 'Bring left foot beside right with a light ball tap, sway torso right',
        handAction: 'Hands open outward gracefully like blooming lotus petals',
        torsoAngle: 25,
        footCoords: { left: { x: 50, y: 45 }, right: { x: 65, y: 40 } },
        bol: 'GE'
      },
      {
        beat: 3,
        title: 'Step Left & Clap 2',
        foot: 'left',
        movement: 'Step left foot back to position, shifting center of gravity',
        handAction: 'Second firm clap at solar plexus height',
        torsoAngle: -10,
        footCoords: { left: { x: 30, y: 55 }, right: { x: 60, y: 55 } },
        bol: 'TIN'
      },
      {
        beat: 4,
        title: 'Tap Right & Rebound',
        foot: 'right',
        movement: 'Tap right foot toe ready for the next round cycle',
        handAction: 'Hands sweep down in an arc to gather momentum',
        torsoAngle: 0,
        footCoords: { left: { x: 40, y: 55 }, right: { x: 55, y: 55 } },
        bol: 'NA'
      }
    ]
  },
  {
    id: 'step_3taali',
    name: '3-Taali (Tran Taali Classic)',
    gujaratiName: 'ત્રણ તાળી ક્લાસિક',
    stepsCount: 6,
    difficulty: 'Beginner',
    region: 'Kathiawad & Junagadh',
    bpmRecommended: 98,
    summary: 'The world-famous 3-clap sequence: first clap front, second clap right flank, third clap skyward above head with a quick half-turn.',
    steps: [
      {
        beat: 1,
        title: 'Front Low Clap (Taali 1)',
        foot: 'right',
        movement: 'Right foot steps forward facing the central Garbi diya',
        handAction: 'Clap 1 at waist level with hands angled downward 45°',
        torsoAngle: 0,
        footCoords: { left: { x: 42, y: 65 }, right: { x: 58, y: 35 } },
        bol: 'DHIN'
      },
      {
        beat: 2,
        title: 'Pivot Right',
        foot: 'right',
        movement: 'Pivot on the ball of right foot, rotating body 45° right',
        handAction: 'Hands open sideways smoothly',
        torsoAngle: 45,
        footCoords: { left: { x: 38, y: 60 }, right: { x: 62, y: 40 } },
        bol: 'TA'
      },
      {
        beat: 3,
        title: 'Side Clap (Taali 2)',
        foot: 'left',
        movement: 'Left foot crosses in front of right along circle arc',
        handAction: 'Clap 2 at chest level turned sideways',
        torsoAngle: 60,
        footCoords: { left: { x: 65, y: 45 }, right: { x: 52, y: 50 } },
        bol: 'DHIN'
      },
      {
        beat: 4,
        title: 'Deep Step Back',
        foot: 'right',
        movement: 'Right foot steps backward to prepare the upward spring',
        handAction: 'Arms elevate toward shoulder height',
        torsoAngle: 30,
        footCoords: { left: { x: 60, y: 45 }, right: { x: 35, y: 65 } },
        bol: 'TA'
      },
      {
        beat: 5,
        title: 'Sky High Clap (Taali 3)',
        foot: 'left',
        movement: 'Left foot springs forward with a heel-lift bounce',
        handAction: 'Clap 3 high above head with fingers pointing to the stars',
        torsoAngle: -15,
        footCoords: { left: { x: 48, y: 38 }, right: { x: 38, y: 65 } },
        bol: 'DHA'
      },
      {
        beat: 6,
        title: 'Reset & Dip',
        foot: 'both',
        movement: 'Both feet land parallel with slight knee flex to absorb rhythm',
        handAction: 'Arms float down softly',
        torsoAngle: 0,
        footCoords: { left: { x: 42, y: 55 }, right: { x: 58, y: 55 } },
        bol: 'TIN'
      }
    ]
  },
  {
    id: 'step_6dodhiya',
    name: '6-Step Dodhiya Flow',
    gujaratiName: '૬-સ્ટેપ દોઢિયા ફ્લો',
    stepsCount: 6,
    difficulty: 'Intermediate',
    region: 'Ahmedabad & Rajkot',
    bpmRecommended: 114,
    summary: 'The quintessential ground-filler: dynamic zig-zag forward cut, side tap, full spin, and double-handed waist clap.',
    steps: [
      {
        beat: 1,
        title: 'Cross-Front Diagonal',
        foot: 'right',
        movement: 'Right foot cuts diagonally across left toward the center-right',
        handAction: 'Right hand swings across body, left hand on hip',
        torsoAngle: 35,
        footCoords: { left: { x: 40, y: 60 }, right: { x: 68, y: 35 } },
        bol: 'TAK'
      },
      {
        beat: 2,
        title: 'Left Foot Follow-Tap',
        foot: 'left',
        movement: 'Left foot taps behind right heel without putting full weight',
        handAction: 'Quick wrist flick upwards',
        torsoAngle: 40,
        footCoords: { left: { x: 58, y: 42 }, right: { x: 68, y: 35 } },
        bol: 'DHIN'
      },
      {
        beat: 3,
        title: 'Right Step Back-Out',
        foot: 'right',
        movement: 'Right foot pulls back out to expand the circle perimeter',
        handAction: 'Both hands sweep open outwards',
        torsoAngle: 10,
        footCoords: { left: { x: 50, y: 45 }, right: { x: 72, y: 65 } },
        bol: 'TA'
      },
      {
        beat: 4,
        title: 'Left Step Back',
        foot: 'left',
        movement: 'Left foot steps backward to align with right',
        handAction: 'Hands prepare to clap',
        torsoAngle: -10,
        footCoords: { left: { x: 30, y: 65 }, right: { x: 70, y: 65 } },
        bol: 'KATI'
      },
      {
        beat: 5,
        title: 'Chakardi Half-Spin',
        foot: 'both',
        movement: '180° clockwise spin on balls of both feet',
        handAction: 'Sharp resonant clap during the spin transition',
        torsoAngle: 180,
        footCoords: { left: { x: 45, y: 50 }, right: { x: 55, y: 50 } },
        bol: 'DHA'
      },
      {
        beat: 6,
        title: 'Forward Catch & Land',
        foot: 'right',
        movement: 'Face back to center, knees bent, ready to cut again',
        handAction: 'Hands open with fingers relaxed',
        torsoAngle: 0,
        footCoords: { left: { x: 42, y: 55 }, right: { x: 58, y: 55 } },
        bol: 'NA'
      }
    ]
  },
  {
    id: 'step_8dodhiya',
    name: '8-Step Kathiawadi Dodhiya',
    gujaratiName: '૮-સ્ટેપ કાઠિયાવાડી દોઢિયા',
    stepsCount: 8,
    difficulty: 'Intermediate',
    region: 'Surendranagar & Jamnagar',
    bpmRecommended: 120,
    summary: 'A vigorous 8-count pattern with two diagonal crossings, two claps at varied elevations, and an explosive back-step bounce.',
    steps: [
      {
        beat: 1,
        title: 'Right Diagonal Cut',
        foot: 'right',
        movement: 'Deep right step at 45° angle towards inner circle',
        handAction: 'Right hand drops low, left hand reaches high',
        torsoAngle: 30,
        footCoords: { left: { x: 38, y: 65 }, right: { x: 68, y: 35 } },
        bol: 'DHA'
      },
      {
        beat: 2,
        title: 'Left Cross Behind',
        foot: 'left',
        movement: 'Left foot crosses tightly behind right heel',
        handAction: 'Clap 1 at chest level',
        torsoAngle: 35,
        footCoords: { left: { x: 58, y: 40 }, right: { x: 68, y: 35 } },
        bol: 'GE'
      },
      {
        beat: 3,
        title: 'Right Side Slide',
        foot: 'right',
        movement: 'Right foot steps wide to the right perimeter',
        handAction: 'Hands extend outward horizontally',
        torsoAngle: 20,
        footCoords: { left: { x: 45, y: 48 }, right: { x: 80, y: 48 } },
        bol: 'TIN'
      },
      {
        beat: 4,
        title: 'Left Heel Tap & Clap',
        foot: 'left',
        movement: 'Left heel taps sharply into the ground with toe lifted',
        handAction: 'Clap 2 on the sharp heel strike',
        torsoAngle: 10,
        footCoords: { left: { x: 65, y: 48 }, right: { x: 80, y: 48 } },
        bol: 'NA'
      },
      {
        beat: 5,
        title: 'Left Retreat Step',
        foot: 'left',
        movement: 'Left foot lunges backward to expand breathing room',
        handAction: 'Hands rise above shoulders in arc',
        torsoAngle: -20,
        footCoords: { left: { x: 25, y: 70 }, right: { x: 75, y: 50 } },
        bol: 'KATI'
      },
      {
        beat: 6,
        title: 'Right Pull Back',
        foot: 'right',
        movement: 'Right foot meets left in back stance',
        handAction: 'Hands flutter down like falling leaves',
        torsoAngle: -10,
        footCoords: { left: { x: 25, y: 70 }, right: { x: 45, y: 70 } },
        bol: 'TAK'
      },
      {
        beat: 7,
        title: 'Full Chakardi Spin',
        foot: 'both',
        movement: 'Full 360° spin on balls of feet in one smooth sweep',
        handAction: 'Overhead finger snaps or stick flourish',
        torsoAngle: 360,
        footCoords: { left: { x: 40, y: 55 }, right: { x: 60, y: 55 } },
        bol: 'DHIN'
      },
      {
        beat: 8,
        title: 'Anchor & Drop',
        foot: 'both',
        movement: 'Land firmly on both feet with a low knee bend',
        handAction: 'Both hands slap thighs or tap dandiya',
        torsoAngle: 0,
        footCoords: { left: { x: 40, y: 55 }, right: { x: 60, y: 55 } },
        bol: 'DHA'
      }
    ]
  },
  {
    id: 'step_10baroda',
    name: '10-Step Baroda Royal Dodhiya',
    gujaratiName: '૧૦-સ્ટેપ વડોદરા રોયલ દોઢિયા',
    stepsCount: 10,
    difficulty: 'Kathiawadi Master',
    region: 'Vadodara (Navlakhi & United Way)',
    bpmRecommended: 124,
    summary: 'The majestic signature of Vadodara: sweeping leg arcs, dual pivots, synchronized hand waves, and a lightning-fast double clap.',
    steps: [
      {
        beat: 1,
        title: 'Forward Lunge Cut',
        foot: 'right',
        movement: 'Deep dynamic forward lunge towards inner sanctum',
        handAction: 'Arms sweep from floor to waist level',
        torsoAngle: 20,
        footCoords: { left: { x: 35, y: 65 }, right: { x: 65, y: 30 } },
        bol: 'DHA'
      },
      {
        beat: 2,
        title: 'Inward Pivot 90°',
        foot: 'right',
        movement: 'Pivot on right toe to face along the circle edge',
        handAction: 'Left hand circles above right wrist',
        torsoAngle: 90,
        footCoords: { left: { x: 35, y: 65 }, right: { x: 65, y: 30 } },
        bol: 'DHIN'
      },
      {
        beat: 3,
        title: 'Left Cross Lunge',
        foot: 'left',
        movement: 'Left leg steps wide in direction of travel',
        handAction: 'Clap 1 at ear height',
        torsoAngle: 75,
        footCoords: { left: { x: 75, y: 35 }, right: { x: 50, y: 45 } },
        bol: 'TAK'
      },
      {
        beat: 4,
        title: 'Right Kick-Tap',
        foot: 'right',
        movement: 'Right foot performs a gentle air flick then ball taps floor',
        handAction: 'Fingers splay outward in peacock mudra',
        torsoAngle: 60,
        footCoords: { left: { x: 70, y: 35 }, right: { x: 82, y: 30 } },
        bol: 'TA'
      },
      {
        beat: 5,
        title: 'Reverse Spin 180°',
        foot: 'both',
        movement: 'Spin backward facing the outside audience momentarily',
        handAction: 'Hands cross over chest',
        torsoAngle: 180,
        footCoords: { left: { x: 60, y: 50 }, right: { x: 45, y: 50 } },
        bol: 'GE'
      },
      {
        beat: 6,
        title: 'Heel Strike Outside',
        foot: 'left',
        movement: 'Left heel strikes outward against the circle flow',
        handAction: 'Sharp low snap clap',
        torsoAngle: 195,
        footCoords: { left: { x: 30, y: 50 }, right: { x: 45, y: 50 } },
        bol: 'NA'
      },
      {
        beat: 7,
        title: 'Unwind Forward',
        foot: 'right',
        movement: 'Unwind torso back to face center diya',
        handAction: 'Arms open wide like wings',
        torsoAngle: 20,
        footCoords: { left: { x: 35, y: 60 }, right: { x: 60, y: 55 } },
        bol: 'DHA'
      },
      {
        beat: 8,
        title: 'Quick Double Clap (1/2)',
        foot: 'both',
        movement: 'Quick double hop on place',
        handAction: 'Rapid clap 1 at sternum',
        torsoAngle: 0,
        footCoords: { left: { x: 40, y: 55 }, right: { x: 60, y: 55 } },
        bol: 'KATI'
      },
      {
        beat: 9,
        title: 'Quick Double Clap (2/2)',
        foot: 'both',
        movement: 'Second hop landing softly on balls of feet',
        handAction: 'Rapid clap 2 above head',
        torsoAngle: 0,
        footCoords: { left: { x: 40, y: 55 }, right: { x: 60, y: 55 } },
        bol: 'TIN'
      },
      {
        beat: 10,
        title: 'Regal Finish Pose',
        foot: 'both',
        movement: 'Weight settled equally, chest proud, eyes on center',
        handAction: 'Hands return to namaskar or dandiya ready position',
        torsoAngle: 0,
        footCoords: { left: { x: 40, y: 55 }, right: { x: 60, y: 55 } },
        bol: 'NA'
      }
    ]
  },
  {
    id: 'step_popat',
    name: 'Popat Step (Parrot Hop)',
    gujaratiName: 'પોપટ સ્ટેપ (કૂદકો)',
    stepsCount: 4,
    difficulty: 'Intermediate',
    region: 'Kutch & Saurashtra',
    bpmRecommended: 130,
    summary: 'A cheerful, high-spirited hopping step named after the dancing parrot. Involves forward hopping on one foot with rhythmic wrist-turning claps.',
    steps: [
      {
        beat: 1,
        title: 'Right Hop Forward',
        foot: 'right',
        movement: 'Hop forward on right foot while kicking left heel back',
        handAction: 'Hands mimic parrot beak with wrist turn and snap clap',
        torsoAngle: 20,
        footCoords: { left: { x: 30, y: 70 }, right: { x: 65, y: 35 } },
        bol: 'DHIN'
      },
      {
        beat: 2,
        title: 'Left Land & Twist',
        foot: 'left',
        movement: 'Left foot lands beside right with a sharp hip twist',
        handAction: 'Hands flick outward to side',
        torsoAngle: -20,
        footCoords: { left: { x: 50, y: 40 }, right: { x: 65, y: 40 } },
        bol: 'TAK'
      },
      {
        beat: 3,
        title: 'Left Hop Forward',
        foot: 'left',
        movement: 'Hop forward on left foot while right leg lifts slightly',
        handAction: 'Second snap clap with reverse wrist twist',
        torsoAngle: -20,
        footCoords: { left: { x: 35, y: 35 }, right: { x: 70, y: 65 } },
        bol: 'DHIN'
      },
      {
        beat: 4,
        title: 'Right Drop & Clap',
        foot: 'right',
        movement: 'Right foot anchors down with knee dip',
        handAction: 'Firm double-hand clap in front of chest',
        torsoAngle: 0,
        footCoords: { left: { x: 40, y: 50 }, right: { x: 60, y: 50 } },
        bol: 'DHA'
      }
    ]
  }
];

export const NAVRATRI_DAYS: NavratriDayData[] = [
  {
    dayNumber: 1,
    date2026: '12 October 2026 (Ashwin Shukla Pratipada)',
    tithi: 'Pratipada (Ghatasthapana)',
    goddessName: 'Maa Shailaputri',
    goddessGujarati: 'માં શૈલપુત્રી (પર્વતરાજ હિમાલયની પુત્રી)',
    avatarSignificance: 'Daughter of the Himalayas, seated upon Nandi the bull. Holds a trident (Trishul) and lotus. Embodies patience, devotion, and supreme grounded strength.',
    sacredColorName: 'Royal Orange',
    sacredColorHex: '#f97316',
    colorPhilosophy: 'Symbolizes incandescent warmth, boundless enthusiasm, radiant spiritual energy, and auspicious beginnings.',
    dhyanaMantra: 'वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम्। वृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम्॥',
    mantraMeaning: 'I bow to Goddess Shailaputri, adorned with the crescent moon, riding upon the sacred bull, holding the trident to fulfill all pure desires.',
    attireSuggestions: {
      women: 'Sunset orange Kutch embroidered chaniya choli with real mirror work (abhla-bharat) and bright marigold yellow bandhani odhani.',
      men: 'Rich saffron kediyu with white dhoti/kafni, adorned with cowrie shell borders and matching orange pagdi.',
      jewellery: 'Oxidized silver choker (hansli) with floral coin medallions and silver ghunghroo anklets.',
      craftTechnique: 'Kutch Ahir and Rabari needlework with small concave mirror discs.'
    },
    vratFuel: {
      mealIdea: 'Warm roasted makhana lightly tossed in cow ghee and rock salt (sendha namak), with fresh coconut water.',
      energyFocus: 'Clean electrolytes and alkaline hydration for Day 1 foot acclimatization.',
      hydrationTip: 'Drink 600ml coconut water 1 hour before garba ground entry.'
    }
  },
  {
    dayNumber: 2,
    date2026: '13 October 2026 (Ashwin Shukla Dwitiya)',
    tithi: 'Dwitiya',
    goddessName: 'Maa Brahmacharini',
    goddessGujarati: 'માં બ્રહ્મચારિણી (તપસ્યા અને જ્ઞાનનું સ્વરૂપ)',
    avatarSignificance: 'The goddess of penance, wisdom, and austere asceticism. Holds a rosary (rudraksha mala) and water pot (kamandalu). Walks barefoot with boundless grace.',
    sacredColorName: 'Pristine White / Ivory',
    sacredColorHex: '#f8fafc',
    colorPhilosophy: 'Represents transcendental purity, serenity, clarity of intellect, inner peace, and divine spiritual discipline.',
    dhyanaMantra: 'दधाना करपद्माभ्यामक्षमालाकमण्डलू। देवी प्रसीदतु मयि ब्रह्मचारिण्यनुत्तमा॥',
    mantraMeaning: 'May the peerless Goddess Brahmacharini, who holds in her lotus hands the sacred rosary and kamandalu, be gracious unto me.',
    attireSuggestions: {
      women: 'Ivory white flared raw-silk chaniya choli with metallic silver gota patti borders and subtle pastel gold accents.',
      men: 'Pure off-white pleated cotton kediyu with intricate thread-embroidered placket and silver thread piping.',
      jewellery: 'Pearl and silver fusion earrings (jhumkas) with delicate silver haath-phool wrist ornaments.',
      craftTechnique: 'Fine Gota-Patti border stitching from Jamnagar.'
    },
    vratFuel: {
      mealIdea: 'Singhare ka halwa (water chestnut flour dessert cooked in A2 ghee) paired with chilled almond saffron milk.',
      energyFocus: 'Complex natural carbohydrates and saturated healthy fats for sustained endurance across 3+ hours.',
      hydrationTip: 'Sip tender coconut malai blend during mid-night break.'
    }
  },
  {
    dayNumber: 3,
    date2026: '14 October 2026 (Ashwin Shukla Tritiya)',
    tithi: 'Tritiya (Sindoor Tritiya)',
    goddessName: 'Maa Chandraghanta',
    goddessGujarati: 'માં ચંદ્રઘંટા (બહાદુરી અને વીરતાનું સ્વરૂપ)',
    avatarSignificance: 'Adorned with a crescent moon shaped like a temple bell upon her forehead. Rides a fierce tiger, ready with ten weapons to destroy evil and protect virtue.',
    sacredColorName: 'Crimson Red',
    sacredColorHex: '#dc2626',
    colorPhilosophy: 'The color of fierce courage, protective valor, passionate devotion, and unwavering shakti.',
    dhyanaMantra: 'पिण्डजप्रवरारूढा चण्डकोपास्त्रकैर्युता। प्रसादमं तनुते मह्यं चन्द्रघण्टेति विश्रुता॥',
    mantraMeaning: 'Seated upon a glorious tiger, armed with weapons born of righteous fury, may the famed Chandraghanta bestow grace upon me.',
    attireSuggestions: {
      women: 'Deep crimson red Patola print or authentic double-ikat Patan Patola motif chaniya with gold zardozi highlights.',
      men: 'Ruby red textured khadi kediyu with dark indigo contrast borders and brass-button detailing.',
      jewellery: 'Heavy silver temple jewellery necklace with Maa Durga pendant and red coral bead strings.',
      craftTechnique: 'Patan Double-Ikat geometry and Kathiawadi thread-knot embroidery.'
    },
    vratFuel: {
      mealIdea: 'Crisp Sabudana vada (tapioca fritters) with sweet-tangy peanut yogurt chutney and boiled sweet potatoes.',
      energyFocus: 'Fast-burning starch for rapid Dodhiya direction cuts and jumping steps.',
      hydrationTip: 'Water infused with mint, lemon, and sendha namak to replenish sodium loss.'
    }
  },
  {
    dayNumber: 4,
    date2026: '15 October 2026 (Ashwin Shukla Chaturthi)',
    tithi: 'Chaturthi (Kushmanda Puja)',
    goddessName: 'Maa Kushmanda',
    goddessGujarati: 'માં કુષ્માંડા (બ્રહ્માંડ સર્જક શક્તિ)',
    avatarSignificance: 'The creator of the Cosmic Universe whose radiant smile gave birth to the cosmos. Resides within the core of the Sun and radiates supreme solar illumination.',
    sacredColorName: 'Royal Midnight Blue',
    sacredColorHex: '#2563eb',
    colorPhilosophy: 'Symbolizes cosmic vastness, infinite potential, deep royalty, tranquility, and celestial depth.',
    dhyanaMantra: 'सुरासम्पूर्णकलशं रुधिराप्लुतमेव च। दधाना हस्तपद्माभ्यां कूष्माण्डा शुभदास्तु मे॥',
    mantraMeaning: 'Holding two golden pots in her lotus hands, may Goddess Kushmanda grant auspiciousness and cosmic health.',
    attireSuggestions: {
      women: 'Midnight royal blue georgette 32-kali voluminous skirt with shimmering gold sequin waves that flare during spins.',
      men: 'Peacock royal blue angi-style kediyu with silver-white geometric embroidery and matching slim pyjama.',
      jewellery: 'Oxidized silver waist belt (kamarbandh / kandora) with tiny musical chiming bells.',
      craftTechnique: '32-Kali circular flared construction for maximum spin circumference (Chakardi).'
    },
    vratFuel: {
      mealIdea: 'Fresh fruit bowl with pomegranate, papaya, and bananas sprinkled with roasted pumpkin seeds and soaked walnuts.',
      energyFocus: 'Natural antioxidants and potassium to stop calf cramps during high-speed raas.',
      hydrationTip: 'Consume 1 glass of buttermilk (chaas with roasted cumin) before 9 PM.'
    }
  },
  {
    dayNumber: 5,
    date2026: '16 October 2026 (Ashwin Shukla Panchami)',
    tithi: 'Panchami (Lalita Panchami)',
    goddessName: 'Maa Skandamata',
    goddessGujarati: 'માં સ્કંદમાતા (કાર્તિકેયની માતા)',
    avatarSignificance: 'The divine mother carrying infant Lord Skanda (Kartikeya / Murugan) on her lap. Seated on an open lotus bloom, radiating maternal warmth and boundless compassion.',
    sacredColorName: 'Golden Marigold Yellow',
    sacredColorHex: '#eab308',
    colorPhilosophy: 'Brings profound joy, intellect, prosperity, maternal warmth, optimism, and spiritual illumination.',
    dhyanaMantra: 'सिंहासनगता नित्यं पद्माश्रितकरद्वया। शुभदास्तु सदा देवी स्कन्दमाता यशस्विनी॥',
    mantraMeaning: 'Ever seated upon the lion throne, holding twin lotus blossoms in her hands, may glorious Skandamata grant eternal auspiciousness.',
    attireSuggestions: {
      women: 'Bright sunshine yellow Bandhani choli with vibrant magenta Rani border and dense mirror-encrusted neckline.',
      men: 'Golden ochre cotton-linen kediyu with tribal Kutchi border work and yellow pom-poms.',
      jewellery: 'Multi-layer silver coin necklace (rupaiya mala) and wide silver armlets (bajubandh).',
      craftTechnique: 'Kutch Bandhani tie-dye with concentric Rai-Bandh micro knots.'
    },
    vratFuel: {
      mealIdea: 'Warm Rajgira (amaranth) sheera enriched with chopped cashews, almonds, and cardamom pod seeds.',
      energyFocus: 'High plant-based protein and iron to prevent muscle fatigue on Day 5.',
      hydrationTip: 'Electrolyte drink: warm water with lemon, raw honey, and Himalayan pink salt.'
    }
  },
  {
    dayNumber: 6,
    date2026: '17 October 2026 (Ashwin Shukla Shashthi)',
    tithi: 'Shashthi (Katyayani Puja)',
    goddessName: 'Maa Katyayani',
    goddessGujarati: 'માં કાત્યાયની (મહિષાસુર સંહારક શક્તિ)',
    avatarSignificance: 'Born of sage Katyayana\'s intense tapasya to vanquish the buffalo demon Mahishasura. Radiates golden warrior brilliance with a crescent-curved sword.',
    sacredColorName: 'Emerald Forest Green',
    sacredColorHex: '#16a34a',
    colorPhilosophy: 'Symbolizes fertile abundance, renewal, harmonious growth, vitality of nature, and serene prosperity.',
    dhyanaMantra: 'चन्द्रहासोज्ज्वलकरा शार्दूलवरवाहना। कात्यायनी शुभं दद्याद्देवी दानवघातिनी॥',
    mantraMeaning: 'Her hand radiant with the gleaming Chandrahasa sword, riding the lion, may Katyayani, destroyer of demons, bestow blessings.',
    attireSuggestions: {
      women: 'Emerald green handloom Chanderi skirt with gold tissue accents, accented by a contrasting rust-orange odhani.',
      men: 'Forest green embroidered kurta-kediyu hybrid with antique bronze button chains.',
      jewellery: 'Silver nath (traditional nose ring with pearl chain) and oxidised silver bangles (chudlo).',
      craftTechnique: 'Aari and Zari hand needlecraft.'
    },
    vratFuel: {
      mealIdea: 'Steamed buckwheat flour (kuttu ke aate) cheela stuffed with grated paneer and chopped green chillies.',
      energyFocus: 'Low glycemic index complex fuel preventing sudden blood sugar crashes during midnight dances.',
      hydrationTip: 'Fresh cucumber and mint juice with a squeeze of lime.'
    }
  },
  {
    dayNumber: 7,
    date2026: '18 October 2026 (Ashwin Shukla Saptami)',
    tithi: 'Saptami (Maha Saptami)',
    goddessName: 'Maa Kalaratri',
    goddessGujarati: 'માં કાલરાત્રિ (અંધકાર અને ભયનાશક)',
    avatarSignificance: 'The fiercest form of the divine mother: dark as midnight thunderclouds, wild disheveled hair, breathing lightning sparks, riding a donkey. Dispels all fear.',
    sacredColorName: 'Steel Grey / Gunmetal',
    sacredColorHex: '#64748b',
    colorPhilosophy: 'Represents balanced neutrality, unshakeable poise, fearlessness in adversity, and transformation.',
    dhyanaMantra: 'एकवेणी जपाकर्णपूरा नग्ना खरास्थिता। लम्बोष्ठी कर्णिकाकर्णी तैलाभ्यक्तशरीरिणी॥',
    mantraMeaning: 'O Mother Kalaratri, fearsome to demons yet tender to devotees as Shubhankari, protect us from darkness and despair.',
    attireSuggestions: {
      women: 'Gunmetal grey metallic silk chaniya embellished with black diamond crystals and reflective mirror mosaic.',
      men: 'Charcoal grey kediyu with silver thread work, teamed with an oxidized silver pocket broach.',
      jewellery: 'Statement black-polish silver ring with double snake motif and heavy silver anklets.',
      craftTechnique: 'Contemporary metallic yarn weaving with traditional Kutchi patchwork.'
    },
    vratFuel: {
      mealIdea: 'Warm Samak rice (morter rice / varai) khichdi cooked with cumin, crushed black pepper, and cubed potatoes.',
      energyFocus: 'Easy digestion that soothes the stomach after multiple nights of late dancing.',
      hydrationTip: 'Warm water with tulsi (holy basil) and ginger before sleep.'
    }
  },
  {
    dayNumber: 8,
    date2026: '19 October 2026 (Ashwin Shukla Ashtami)',
    tithi: 'Maha Ashtami (Durga Ashtami / Kanya Puja)',
    goddessName: 'Maa Mahagauri',
    goddessGujarati: 'માં મહાગૌરી (શાંતિ, કરુણા અને પવિત્રતા)',
    avatarSignificance: 'Shines with the serene luminescence of fresh conch shells and moonbeams. Symbolizes unconditional forgiveness, inner purification, and liberation.',
    sacredColorName: 'Imperial Purple / Violet',
    sacredColorHex: '#9333ea',
    colorPhilosophy: 'Embodies regal grandeur, spiritual mysticism, visionary aspiration, compassion, and divine grace.',
    dhyanaMantra: 'श्वेते वृषे समारूढा श्वेताम्बरधरा शुचिः। महागौरी शुभं दद्यान्महादेवप्रमोददा॥',
    mantraMeaning: 'Mounted upon a white bull, clad in pure white robes, giver of delight to Lord Shiva, may auspicious Mahagauri grant peace.',
    attireSuggestions: {
      women: 'Royal purple velvet or rich silk skirt with intricate gold gota work, accompanied by a soft lilac organza dupatta.',
      men: 'Deep violet silk kediyu with golden resham needlework and gold-bordered pagdi.',
      jewellery: 'Vintage silver choker set with amethyst stones and dangling pearl drops.',
      craftTechnique: 'Velvet applique and Zardozi raised embroidery.'
    },
    vratFuel: {
      mealIdea: 'Kanya Pujan prasad: roasted Bengal gram flour (besan) ladoo, boiled chickpea dry curry (for non-fasting) or dry fruit halwa.',
      energyFocus: 'Peak stamina boost for the second-last night which traditionally runs past 2:30 AM.',
      hydrationTip: 'Chilled watermelon and mint crush with a pinch of rock salt.'
    }
  },
  {
    dayNumber: 9,
    date2026: '20 October 2026 (Ashwin Shukla Navami)',
    tithi: 'Maha Navami (Ayudha Puja)',
    goddessName: 'Maa Siddhidatri',
    goddessGujarati: 'માં સિદ્ધિદાત્રી (સર્વ સિદ્ધિઓ આપનાર)',
    avatarSignificance: 'The ultimate bestower of all 26 supernatural spiritual accomplishments (Siddhis). Seated on a lotus in supreme bliss, worshipped by Devas and humans alike.',
    sacredColorName: 'Peacock Green / Turquoise',
    sacredColorHex: '#0d9488',
    colorPhilosophy: 'Reflects supreme victory, flourishing wholeness, mystical depth, and fulfillment of all pure intentions.',
    dhyanaMantra: 'सिद्धगन्धर्वयक्षाद्यैरसुरैरमरैरपि। सेव्यमाना सदा भूयात् सिद्धिदा सिद्धिदायिनी॥',
    mantraMeaning: 'Worshipped by celestial Siddhas, Gandharvas, and Devas, may Goddess Siddhidatri shower eternal accomplishments upon us.',
    attireSuggestions: {
      women: 'Dazzling peacock green chaniya choli with contrasting deep teal and gold brocade border, with hundreds of twinkling mirrors.',
      men: 'Turquoise and emerald dual-tone silk kediyu with golden tassel cords and embroidered mojris.',
      jewellery: 'Grand complete bridal-style oxidized silver bridal set: maang tikka, choker, kamarbandh, and hand cuffs.',
      craftTechnique: 'Master-level Kathiawadi mirror work and Jamnagar Bandhani tie-dye.'
    },
    vratFuel: {
      mealIdea: 'Royal saffron kheer (condensed milk pudding) garnished with slivered pistachios and crushed cardamom.',
      energyFocus: 'Ultimate celebratory celebration meal giving triumphant joy for the grand finale garba marathon.',
      hydrationTip: 'Coconut water with chia seeds soaked for 30 minutes for slow, sustained hydration release.'
    }
  }
];

export const MARATHON_RECOVERY_TIPS = [
  {
    title: 'Pre-Garba Foot Taping',
    category: 'Foot Care',
    tip: 'Apply medical micropore tape or moleskin across the balls of your feet and outside edge of the little toe before wearing traditional Mojdis to prevent friction blisters.'
  },
  {
    title: 'Electrolyte Timing Protocol',
    category: 'Hydration',
    tip: 'Avoid chugging 1 liter of cold water at once. Instead, take 3 small sips of room-temperature lemon-salt water every 20-30 minutes between song rotations.'
  },
  {
    title: 'Post-Garba Ice & Elevation',
    category: 'Muscle Recovery',
    tip: 'Elevate feet at a 45-degree angle against a wall for 12 minutes before sleeping. This drains lactic acid accumulated from 4 hours of continuous jumping.'
  },
  {
    title: 'Dandiya Grip Friction Shield',
    category: 'Hand Care',
    tip: 'Wrap the handle of wooden dandiya sticks with soft badminton grip tape to prevent palm blisters during high-speed 140+ BPM Sanedo rounds.'
  }
];
