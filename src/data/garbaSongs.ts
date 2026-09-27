import { GarbaSong, SingerProfile } from '../types';

export const SINGERS_LIST: SingerProfile[] = [
  {
    id: 'all',
    name: 'All Singers',
    nameGujarati: 'બધા ગાયક કલાકારો',
    title: 'Grand Gujarati Repertoire',
    titleGujarati: 'સંપૂર્ણ ગરબા સંગ્રહ',
    bio: 'The rich heritage of Saurashtra, Kathiawad, Kutch and Gujarat garba icons.',
    bioGujarati: 'સૌરાષ્ટ્ર, કાઠિયાવાડ, કચ્છ અને ઉત્તર ગુજરાતના અમર ગરબા કલાકારો.',
    avatarGradient: 'from-amber-500 to-orange-600',
    initials: 'ALL',
  },
  {
    id: 'kirtidan_gadhvi',
    name: 'Kirtidan Gadhvi',
    nameGujarati: 'કીર્તિદાન ગઢવી',
    title: 'Dandiya King & Tahukar Maestro',
    titleGujarati: 'દાંડિયા કિંગ અને તહૂકાર સમ્રાટ',
    bio: 'Legendary Kathiawadi folk vocalist renowned for electrifying stadium-size Navratri nights, lightning Dayro bol, and modern high-energy Garba.',
    bioGujarati: 'લાખો ખેલૈયાઓને ડોલાવતા કાઠિયાવાડના લોકગાયક, તહૂકાર અને અસ્ખલિત દાયરાના બેતાજ બાદશાહ.',
    avatarGradient: 'from-amber-600 via-yellow-500 to-orange-700',
    initials: 'KG',
  },
  {
    id: 'hemant_chauhan',
    name: 'Hemant Chauhan',
    nameGujarati: 'હેમંત ચૌહાણ',
    title: 'Bhajan & Garba Samrat (Padma Shri)',
    titleGujarati: 'ભજન અને લોકગરબા સમ્રાટ (પદ્મશ્રી)',
    bio: 'Revered master of devotional Gujarati folk music, beloved for immortal classics like Pankhida, Maa Pavagadh, and ancient Shakti stutis.',
    bioGujarati: 'ગુજરાતના આધ્યાત્મિક અને ભક્તિમય ગરબાના પરમ શિલ્પી, પંખીડા અને પાવાગઢના અમર સ્વરકાર.',
    avatarGradient: 'from-orange-600 via-amber-600 to-red-700',
    initials: 'HC',
  },
  {
    id: 'kinjal_dave',
    name: 'Kinjal Dave',
    nameGujarati: 'કિંજલ દવે',
    title: 'Garba Pop Sensation',
    titleGujarati: 'ગરબા રોકસ્ટાર અને યુવા આઇકોન',
    bio: 'Dynamic youth icon who revolutionized modern Gujarati folk rhythms with Char Char Bangdi, Leri Lala, and non-stop fast Hitch garba.',
    bioGujarati: 'ચાર ચાર બંગડી અને લેરી લાલાથી વિશ્વભરના યુવાનોમાં ગરબાનો અદભુત ક્રેઝ જગાવનાર કલાકાર.',
    avatarGradient: 'from-rose-500 via-pink-600 to-purple-700',
    initials: 'KD',
  },
  {
    id: 'geeta_rabari',
    name: 'Geeta Rabari',
    nameGujarati: 'ગીતા રબારી',
    title: 'Kutch Ni Koyal (Nightingale of Kutch)',
    titleGujarati: 'કચ્છની કોયલ',
    bio: 'Authentic Rabari folk artist famous for her resonant high-pitched voice, Rona Ser Ma, Mahadev bhajans, and soulful Dhol beats.',
    bioGujarati: 'કચ્છી લોકઢાળ અને પરંપરાગત રબારી રાસના મધુર સૂરથી ગરબા મેદાનો ગજવનાર ગાયિકા.',
    avatarGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    initials: 'GR',
  },
  {
    id: 'osman_mir',
    name: 'Osman Mir',
    nameGujarati: 'ઓસમાન મીર',
    title: 'Sufi & Folk Virtuoso',
    titleGujarati: 'સૂફી અને લોક શાસ્ત્રીય માસ્ટ્રો',
    bio: 'Soulful virtuoso blending classical Gujarati folk chhand with rich Sufi nuances, immortalized in Mor Bani Thanghat Kare and Nagada Sang Dhol.',
    bioGujarati: 'શાસ્ત્રીય સૂર, મોર બની થનગનાટ અને નગારા સંગ ઢોલના દમદાર અવાજના માલિક.',
    avatarGradient: 'from-indigo-600 via-purple-600 to-pink-700',
    initials: 'OM',
  },
  {
    id: 'falguni_pathak',
    name: 'Falguni Pathak',
    nameGujarati: 'ફાલ્ગુની પાઠક',
    title: 'Global Dandiya Queen',
    titleGujarati: 'વિશ્વ વિખ્યાત દાંડિયા ક્વીન',
    bio: 'The undisputed queen of Dandiya Raas for over three decades, bringing joy to millions with Odhani, Indhana Vinva, and festive nostalgia.',
    bioGujarati: 'ત્રણ દાયકાથી દેશ-વિદેશમાં નવરાત્રિના દાંડિયા રાસમાં મોખરે રહેલી દાંડિયા ક્વીન.',
    avatarGradient: 'from-violet-600 via-fuchsia-600 to-rose-600',
    initials: 'FP',
  },
  {
    id: 'praful_dave',
    name: 'Praful Dave',
    nameGujarati: 'પ્રફુલ દવે',
    title: 'Kathiawadi Folk Legend',
    titleGujarati: 'કાઠિયાવાડી લોકગાયક લિજેન્ડ',
    bio: 'The golden voice of Gujarati cinema and folk music whose resonant Jay Adhyashakti Aarti and Kathiawadi Garba set the benchmark for generations.',
    bioGujarati: 'ગુજરાતી સુવર્ણ યુગના ગાયક, જેમની આરતી અને રાસ દરેક ગરબા મહોત્સવની શાન છે.',
    avatarGradient: 'from-amber-700 via-red-800 to-stone-900',
    initials: 'PD',
  },
];

export const GARBA_SONGS: GarbaSong[] = [
  // 1. Kirtidan Gadhvi - Nagar Nandji Na Laal
  {
    id: 'nagar_nandji_na_laal',
    title: 'Nagar Nandji Na Laal (Raas Garba)',
    titleGujarati: 'નાગર નંદજીના લાલ - કીર્તિદાન ગઢવી સ્પેશિયલ',
    category: 'raas',
    categoryGujarati: 'રાસ ગરબા',
    singerId: 'kirtidan_gadhvi',
    singer: 'Kirtidan Gadhvi',
    singerGujarati: 'કીર્તિદાન ગઢવી',
    singerTag: 'Dandiya King Hit',
    singerTagGujarati: 'કીર્તિદાન સુપરહિટ',
    taalType: 'Kathiawadi 3-Taali & Hinch (ત્રણ તાળી)',
    taalTypeGujarati: 'કાઠિયાવાડી ત્રણ તાળી અને હિંચ',
    bpm: 112,
    audioDurationSeconds: 195,
    poet: 'Narsinh Mehta Tradition (નરસિંહ મહેતા ભક્તિ સાહિત્ય)',
    poetGujarati: 'ભક્તકવિ નરસિંહ મહેતા પરંપરા',
    description: "Kirtidan Gadhvi's signature stadium-shaking Raas Garba celebrating Krishna playing Raas with the Gopis in sacred Vrindavan.",
    descriptionGujarati: 'કીર્તિદાન ગઢવીનો સૌથી લોકપ્રિય રાસ ગરબો, જેમાં શ્રીકૃષ્ણની મોરલી અને ગોપીઓના રાસનું અલૌકિક વર્ણન છે.',
    rhythmPresetId: 'tran_taali',
    signatureChant: 'Tahuko! Haa Moj Haa!',
    signatureChantGujarati: 'તહૂકો! હા મોજ હા!',
    melodyNotes: [392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 587.33, 493.88],
    melodySequence: [
      { pitch: 392.0, duration: 0.45 },
      { pitch: 440.0, duration: 0.4 },
      { pitch: 493.88, duration: 0.5 },
      { pitch: 587.33, duration: 0.65 },
      { pitch: 523.25, duration: 0.4 },
      { pitch: 493.88, duration: 0.55 },
      { pitch: 440.0, duration: 0.4 },
      { pitch: 392.0, duration: 0.7 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'નાગર નંદજીના લાલ, રાસ રમવાને આવો રે,',
          'કાનજી તારી મોરલીએ મારું મનડું હર્યું રે લોલ.'
        ],
        verseEnglish: [
          'Nagar Nandji Na Laal, Raas Ramva Ne Aavo Re,',
          'Kanji Tari Moraliye Maaru Mandu Haryu Re Lol.'
        ],
        meaning: 'O beloved son of King Nanda, come and dance the divine Raas! The sweet resonance of your flute has charmed my heart completely.'
      },
      {
        verseGujarati: [
          'ઝાંઝરના ઝણકારે ગોપી ઘૂમર ઘાલે રે,',
          'રાધા સંગ કાનુડો પ્રેમની પ્રીત પાળે રે.'
        ],
        verseEnglish: [
          'Zanzar Na Zankaare Gopi Ghoomar Ghaale Re,',
          'Radha Sang Kaanudo Prem Ni Preet Paale Re.'
        ],
        meaning: 'To the melodious tinkling of anklets the Gopis twirl in joyous circles, as Krishna and Radha embody divine spiritual love.'
      },
      {
        verseGujarati: [
          'શોભે છે પીળાં પીતાંબર, માથે મોરપીંછ મુગટ,',
          'કીર્તિદાનના સુરે સૌ ગરબે ઘૂમે અકબંધ રે!'
        ],
        verseEnglish: [
          'Shobhe Chhe Peeda Peetambar, Maathe Morpinchh Mugat,',
          'Kirtidan Na Sure Sau Garbe Ghoome Akbandh Re!'
        ],
        meaning: 'Adorned in radiant golden silk with peacock feathers on his crown, all devotees spin continuously to the rhythm!'
      }
    ]
  },

  // 2. Kirtidan Gadhvi - Mogal Aave (Maa Mogal Garbo)
  {
    id: 'mogal_aave_ramva_garbe',
    title: 'Mogal Aave Ramva Garbe (Bhagwati Garbo)',
    titleGujarati: 'મોગલ આવે રમવા ગરબે - કીર્તિદાન ગઢવી',
    category: 'dodhiya',
    categoryGujarati: 'દોઢિયા ગરબો',
    singerId: 'kirtidan_gadhvi',
    singer: 'Kirtidan Gadhvi',
    singerGujarati: 'કીર્તિદાન ગઢવી',
    singerTag: 'Mogal Maa Anthem',
    singerTagGujarati: 'માં મોગલ મહાગરબો',
    taalType: 'Fast Kathiawadi Dodhiya & Dakla (દાકલા)',
    taalTypeGujarati: 'ઝડપી દોઢિયા અને દાકલા તાલ',
    bpm: 124,
    audioDurationSeconds: 210,
    poet: 'Charani Sahitya (ચારણી લોકસાહિત્ય)',
    poetGujarati: 'ચારણી સાહિત્ય પરંપરા',
    description: "An awe-inspiring devotional Garba dedicated to Maa Mogal. Kirtidan Gadhvi's powerful Charani chanting fills the ground with unyielding divine energy.",
    descriptionGujarati: 'માં મોગલના ચરણોમાં અર્પિત જોરદાર ગરબો, જેમાં કીર્તિદાન ગઢવીના દમદાર ચારણી સ્વરથી મેદાનમાં ઊર્જાનો સંચાર થાય છે.',
    rhythmPresetId: 'dakla_trance',
    signatureChant: 'Mogal Chhoru Ne Khamma Re!',
    signatureChantGujarati: 'મોગલ છોરુ ને ખમ્મા રે!',
    melodyNotes: [440.0, 466.16, 523.25, 587.33, 659.25, 587.33, 523.25, 440.0],
    melodySequence: [
      { pitch: 440.0, duration: 0.35 },
      { pitch: 523.25, duration: 0.4 },
      { pitch: 587.33, duration: 0.5 },
      { pitch: 659.25, duration: 0.7 },
      { pitch: 587.33, duration: 0.4 },
      { pitch: 523.25, duration: 0.45 },
      { pitch: 440.0, duration: 0.6 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'મોગલ આવે રમવા ગરબે, રણે ચડી મા રણચંડી,',
          'ચારણી કુળની દેવી માડી, સૌની રક્ષા કરતી રે.'
        ],
        verseEnglish: [
          'Mogal Aave Ramva Garbe, Rane Chadi Maa Ranchandi,',
          'Charani Kul Ni Devi Maadi, Sau Ni Raksha Karti Re.'
        ],
        meaning: 'Maa Mogal steps into the garba circle, radiating supreme divine valour and maternal grace to shield all devotees.'
      },
      {
        verseGujarati: [
          'ત્રિશૂળ ચમકે હાથમાં, શોભે કંકુનો ચાંદલો,',
          'ખમ્મા મારા મોગલ માવડી, તારો આશરો સદા રે!'
        ],
        verseEnglish: [
          'Trishool Chamke Haath Ma, Shobhe Kanku No Chandlo,',
          'Khamma Mara Mogal Maavdi, Taaro Aashro Sada Re!'
        ],
        meaning: 'A luminous trident gleams in Her hand, with sacred vermilion upon Her brow; eternal refuge rests under Her divine shelter.'
      }
    ]
  },

  // 3. Hemant Chauhan - Pankhida O Pankhida
  {
    id: 'pankhida_o_pankhida',
    title: 'Pankhida O Pankhida (Universal Navratri Anthem)',
    titleGujarati: 'પંખીડા ઓ પંખીડા પાવાગઢ રે જાજો - હેમંત ચૌહાણ',
    category: 'pradakshina',
    categoryGujarati: 'પ્રદક્ષિણા ગરબો',
    singerId: 'hemant_chauhan',
    singer: 'Hemant Chauhan',
    singerGujarati: 'હેમંત ચૌહાણ',
    singerTag: 'Immortal Legend',
    singerTagGujarati: 'અમર લોકગરબો',
    taalType: 'Classic Gujarati 2-Taali (બે તાળી)',
    taalTypeGujarati: 'પરંપરાગત બે તાળી ઢાળ',
    bpm: 88,
    audioDurationSeconds: 220,
    poet: 'Kavi Avinash Vyas & Folk Tradition',
    poetGujarati: 'કવિ અવિનાશ વ્યાસ અને લોકપરંપરા',
    description: 'The golden anthem of Gujarat’s soul. Sung by Padma Shri Hemant Chauhan, every Gujarati across the world knows every single word by heart.',
    descriptionGujarati: 'ગુજરાતના ઘર-ઘર અને હૃદયમાં વસેલો સુવર્ણ લોકગરબો. હેમંત ચૌહાણના મધુર સ્વરમાં પાવાગઢ વાળી માં મહાકાળીનો સંદેશ.',
    rhythmPresetId: 'hechh_2taali',
    signatureChant: 'Jai Maa Mahakali Pavawali!',
    signatureChantGujarati: 'જય માં મહાકાળી પાવાવાળી!',
    melodyNotes: [293.66, 329.63, 392.0, 440.0, 493.88, 523.25, 493.88, 440.0],
    melodySequence: [
      { pitch: 293.66, duration: 0.5 },
      { pitch: 329.63, duration: 0.4 },
      { pitch: 392.0, duration: 0.6 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 493.88, duration: 0.7 },
      { pitch: 440.0, duration: 0.45 },
      { pitch: 392.0, duration: 0.6 },
      { pitch: 329.63, duration: 0.8 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'પંખીડા ઓ પંખીડા, પાવાગઢ રે જાજો,',
          'પાવાગઢ વાળી મહાકાળીને, મારો સંદેશો કહેજો રે... પંખીડા!'
        ],
        verseEnglish: [
          'Pankhida O Pankhida, Pava Gadh Re Jajo,',
          'Pava Gadh Vaali Mahakali Ne, Maaro Sandesho Kahejo Re... Pankhida!'
        ],
        meaning: 'O little songbird of the skies, fly away to mount Pavagadh, and convey my heartfelt longing and devotion to Mother Mahakali!'
      },
      {
        verseGujarati: [
          'કહેજો કે ગરબે ઘૂમવા, વેલેરા પધારો મા,',
          'ભક્તોના આંગણિયામાં, દીવડા પ્રગટાવ્યા રે... પંખીડા!'
        ],
        verseEnglish: [
          'Kahejo Ke Garbe Ghoomva, Velera Padhaaro Maa,',
          'Bhakto Na Aanganiya Ma, Deevada Pragataavya Re... Pankhida!'
        ],
        meaning: 'Tell the Mother to arrive swiftly to dance the sacred Garba; devotees have illuminated every courtyard with glowing oil lamps.'
      },
      {
        verseGujarati: [
          'ડુંગરા માથે બિરાજો માડી, ચારે દિશાએ વાવટો ફરકે,',
          'હેમંતના સૂરે આજે, આખોય દેશ હરખે રે... પંખીડા!'
        ],
        verseEnglish: [
          'Dungara Maathe Biraajo Maadi, Chaare Dishaae Vaavto Farke,',
          'Hemant Na Soore Aaje, Aakhoy Desh Harkhe Re... Pankhida!'
        ],
        meaning: 'Seated atop the sacred peak with red flags fluttering across the four directions, the entire land rejoices in Hemant Chauhan’s melodies.'
      }
    ]
  },

  // 4. Hemant Chauhan - Maa Pava Te Thi Utrya
  {
    id: 'maa_pava_te_thi_utrya',
    title: 'Maa Pava Te Thi Utrya Ma Kali Re',
    titleGujarati: 'મા પાવા તે થી ઉતર્યા મા કાળી રે - હેમંત ચૌહાણ',
    category: 'pradakshina',
    categoryGujarati: 'આગમન ગરબો',
    singerId: 'hemant_chauhan',
    singer: 'Hemant Chauhan',
    singerGujarati: 'હેમંત ચૌહાણ',
    singerTag: 'Pavagadh Devotional',
    singerTagGujarati: 'પાવાગઢ ભક્તિ સ્તુતિ',
    taalType: 'Hechh / 2-Taali Flow (બે તાળી)',
    taalTypeGujarati: 'હેંચ - બે તાળી ઢાળ',
    bpm: 84,
    audioDurationSeconds: 198,
    poet: 'Ancient Gujarati Bhakti Sampradaya',
    poetGujarati: 'પ્રાચીન ભક્તિ સંપ્રદાય',
    description: 'The ancient folk narrative depicting Maa Mahakali descending the steps of Pavagadh hill to dance among Her devotees during Navratri.',
    descriptionGujarati: 'પાવાગઢ ડુંગર પરથી ઉતરીને ભક્તોની વચમાં ગરબે રમવા આવતી માં કાળીની ભવ્ય લોકસ્તુતિ.',
    rhythmPresetId: 'hechh_2taali',
    signatureChant: 'Bolo Ambe Maat Ki Jai!',
    signatureChantGujarati: 'બોલો અંબે માત કી જય!',
    melodyNotes: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0],
    melodySequence: [
      { pitch: 261.63, duration: 0.45 },
      { pitch: 329.63, duration: 0.45 },
      { pitch: 392.0, duration: 0.55 },
      { pitch: 440.0, duration: 0.65 },
      { pitch: 392.0, duration: 0.4 },
      { pitch: 329.63, duration: 0.5 },
      { pitch: 293.66, duration: 0.65 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'મા પાવા તે થી ઉતર્યા મા કાળી રે,',
          'ઘેરે ઘેરે ગરબો ઘૂમતો રે લોલ.',
          'ચાર ચાર ચોટલીયુ વાળી માડી રે, સોળે શણગાર સજી નીસર્યા રે લોલ.'
        ],
        verseEnglish: [
          'Maa Pava Te Thi Utrya Maa Kali Re,',
          'Ghere Ghere Garbo Ghoomto Re Lol.',
          'Chaar Chaar Chotliyu Vaali Maadi Re, Sole Shanagaar Saji Nisarya Re Lol.'
        ],
        meaning: 'Mother Mahakali descends from Pavagadh as Garba spins from house to house, adorned in sixteen divine auspicious ornaments.'
      },
      {
        verseGujarati: [
          'હાથે ત્રિશૂળ ને ગળામાં મોતી હાર રે,',
          'રૂમઝૂમ પાયલ વાગે માડીની રે લોલ.'
        ],
        verseEnglish: [
          'Haathe Trishool Ne Gala Ma Moti Haar Re,',
          'Rumzoom Paayal Vaage Maadi Ni Re Lol.'
        ],
        meaning: 'With a sacred trident in hand and a pearl necklace around Her neck, Her rhythmic anklets chime in celestial sweetness.'
      }
    ]
  },

  // 5. Kinjal Dave - Leri Lala Ne Garbe Ghumo
  {
    id: 'leri_lala_garba',
    title: 'Leri Lala (Modern Folk Garba Extravaganza)',
    titleGujarati: 'લેરી લાલા - કિંજલ દવે સુપરહિટ',
    category: 'dodhiya',
    categoryGujarati: 'દોઢિયા હિંચ',
    singerId: 'kinjal_dave',
    singer: 'Kinjal Dave',
    singerGujarati: 'કિંજલ દવે',
    singerTag: 'Youth Garba Craze',
    singerTagGujarati: 'યુવા ગરબા હિટ',
    taalType: 'High-Energy Hinch & Dodhiya (હિંચ)',
    taalTypeGujarati: 'અતિ-ઉત્સાહી હિંચ અને દોઢિયા',
    bpm: 128,
    audioDurationSeconds: 185,
    poet: 'Contemporary North Gujarat Folk Beats',
    poetGujarati: 'ઉત્તર ગુજરાત લોકઢાળ',
    description: "Kinjal Dave's explosive anthem that unites modern EDM pulse with rustic Kathiawadi dhol beats, making millions dance without stopping.",
    descriptionGujarati: 'કિંજલ દવેનો સુપરહિટ ગરબો, જે દરેક ગરબા ગ્રાઉન્ડમાં ખેલૈયાઓમાં અખૂટ ઉત્સાહ અને થનગનાટ ભરી દે છે.',
    rhythmPresetId: 'dodhiya_groove',
    signatureChant: 'Haa Moj Haa! Kinjal Dave Rocking!',
    signatureChantGujarati: 'હા મોજ હા! કિંજલ દવે રોકિંગ!',
    melodyNotes: [392.0, 440.0, 523.25, 587.33, 659.25, 587.33, 523.25],
    melodySequence: [
      { pitch: 523.25, duration: 0.35 },
      { pitch: 587.33, duration: 0.4 },
      { pitch: 659.25, duration: 0.55 },
      { pitch: 587.33, duration: 0.35 },
      { pitch: 523.25, duration: 0.4 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 392.0, duration: 0.6 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'અમે લેરી લાલા, આખો દિવસ મોજમાં રેવાવાળા,',
          'નવરાત્રિની રાતે ઢોલના તાલે ગરબે ઘૂમવા વાળા!'
        ],
        verseEnglish: [
          'Ame Leri Lala, Aakho Divas Moj Ma Revavaala,',
          'Navratri Ni Raate Dhol Na Taale Garbe Ghoomva Vaala!'
        ],
        meaning: 'We are joyful wanderers living in pure celebratory bliss, twirling to the thunderous dhol drums throughout the festive night!'
      },
      {
        verseGujarati: [
          'ચાર ચાર બંગડી વાળી ગાડી લાયા રે,',
          'ગરબા ગ્રાઉન્ડમાં કિંજલના સુરે સૌ મલકાયા રે!'
        ],
        verseEnglish: [
          'Chaar Chaar Bangdi Vaali Gaadi Laaya Re,',
          'Garba Ground Ma Kinjal Na Soore Sau Malkaya Re!'
        ],
        meaning: 'With pride and happiness shining, all dancers smile and twirl in harmony to Kinjal’s vibrant rhythm!'
      }
    ]
  },

  // 6. Geeta Rabari - Dholida Dhol Re Dhime Vagad
  {
    id: 'dholida_dhol_re_geeta',
    title: 'Dholida Dhol Re Vagad (Kutch Folk Style)',
    titleGujarati: 'ઢોલીડા ઢોલ રે વગાડ - ગીતા રબારી (કચ્છી લોકઢાળ)',
    category: 'dodhiya',
    categoryGujarati: 'કચ્છી દોઢિયા',
    singerId: 'geeta_rabari',
    singer: 'Geeta Rabari',
    singerGujarati: 'ગીતા રબારી',
    singerTag: 'Kutch Nightingale',
    singerTagGujarati: 'કચ્છી લોકઢાળ',
    taalType: 'Kutchi Hinch & 4-Taali (કચ્છી હિંચ)',
    taalTypeGujarati: 'કચ્છી હિંચ અને ચાર તાળી',
    bpm: 120,
    audioDurationSeconds: 190,
    poet: 'Rabari Folk Heritage of Kutch',
    poetGujarati: 'કચ્છી રબારી લોકપરંપરા',
    description: "Geeta Rabari's soul-stirring vocal rendition of the classic Dholida, characterized by authentic desert Kutchi modulations and spirited clapping.",
    descriptionGujarati: 'કચ્છની કોયલ ગીતા રબારીના કંઠે ગવાયેલો ઢોલીડા, જેમાં રબારી પરંપરાનો અસલ ગ્રામીણ રણકો અને મંજીરાનો રણકાર છે.',
    rhythmPresetId: 'dodhiya_groove',
    signatureChant: 'Geeta Rabari Ni Moj!',
    signatureChantGujarati: 'ગીતા રબારી ની મોજ!',
    melodyNotes: [329.63, 392.0, 440.0, 493.88, 523.25, 587.33, 493.88],
    melodySequence: [
      { pitch: 329.63, duration: 0.4 },
      { pitch: 392.0, duration: 0.45 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 523.25, duration: 0.6 },
      { pitch: 493.88, duration: 0.4 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 392.0, duration: 0.65 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'ઢોલીડા ઢોલ રે વગાડ મારે હિંચ લેવી છે,',
          'કચ્છની ધરતી પર ગરબે મારે ઘૂમવું છે!'
        ],
        verseEnglish: [
          'Dholida Dhol Re Vagad Maare Hinch Levi Chhe,',
          'Kutch Ni Dharati Par Garbe Maare Ghoomvu Chhe!'
        ],
        meaning: 'Strike the dhol, O drummer, for I yearn to dance the Kutchi Hitch across the sacred sands under the moonlit sky!'
      },
      {
        verseGujarati: [
          'રોણા શેરમાં રે તો ગરબા ઘૂમતા રે,',
          'ગીતાના સૂરથી સૌ કોઈ ઝૂમતા રે!'
        ],
        verseEnglish: [
          'Rona Ser Ma Re To Garba Ghoomta Re,',
          'Geeta Na Soor Thi Sau Koi Zoomta Re!'
        ],
        meaning: 'Resonating through every street and square, everyone sways gracefully to Geeta’s captivating melody!'
      }
    ]
  },

  // 7. Osman Mir - Mor Bani Thanghat Kare
  {
    id: 'mor_bani_thanghat_osman',
    title: 'Mor Bani Thanghat Kare (Sufi-Folk Masterpiece)',
    titleGujarati: 'મોર બની થનગનાટ કરે - ઓસમાન મીર સ્પેશિયલ',
    category: 'raas',
    categoryGujarati: 'રાસ ગરબા',
    singerId: 'osman_mir',
    singer: 'Osman Mir',
    singerGujarati: 'ઓસમાન મીર',
    singerTag: 'Sufi Folk Masterpiece',
    singerTagGujarati: 'રાષ્ટ્રીય શાયર મેઘાણી રચના',
    taalType: 'Kathiawadi 6-Step Dodhiya (દોઢિયા)',
    taalTypeGujarati: 'કાઠિયાવાડી દોઢિયા પ્રવાહ',
    bpm: 116,
    audioDurationSeconds: 230,
    poet: 'Jhaverchand Meghani (રાષ્ટ્રીય શાયર ઝવેરચંદ મેઘાણી)',
    poetGujarati: 'રાષ્ટ્રીય શાયર ઝવેરચંદ મેઘાણી',
    description: "Osman Mir's globally acclaimed rendition of Meghani's masterwork. Grand orchestration, soulful vocal alaaps, and hypnotic footwork rhythm.",
    descriptionGujarati: 'ઓસમાન મીરના દમદાર શાસ્ત્રીય અને સૂફી અવાજમાં ઝવેરચંદ મેઘાણીની અમર રચના, જે સાંભળતા જ મન મોર બનીને નાચી ઊઠે છે.',
    rhythmPresetId: 'dodhiya_groove',
    signatureChant: 'Thanghat Kare Man Mor!',
    signatureChantGujarati: 'થનગનાટ કરે મન મોર!',
    melodyNotes: [349.23, 392.0, 440.0, 523.25, 587.33, 659.25, 587.33, 440.0],
    melodySequence: [
      { pitch: 349.23, duration: 0.5 },
      { pitch: 392.0, duration: 0.45 },
      { pitch: 440.0, duration: 0.6 },
      { pitch: 523.25, duration: 0.7 },
      { pitch: 587.33, duration: 0.5 },
      { pitch: 523.25, duration: 0.4 },
      { pitch: 440.0, duration: 0.65 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'મોર બની થનગનાટ કરે, મન મોર બની થનગનાટ કરે,',
          'આભમાં ઝીણી ઝીણી ઝબૂકે વીજળી રે, મન મોર બની થનગનાટ કરે.'
        ],
        verseEnglish: [
          'Mor Bani Thanghat Kare, Man Mor Bani Thanghat Kare,',
          'Aabh Ma Zini Zini Zabuke Veejali Re, Man Mor Bani Thanghat Kare.'
        ],
        meaning: 'My soul dances like an ecstatic peacock as gentle lightning flashes across the monsoon sky; boundless joy fills the earth!'
      },
      {
        verseGujarati: [
          'ઘનઘોર ઘટા વરસે, ધરા હરખાઈ ઉઠે,',
          'ઓસમાનના કંઠે રાસ મઘમઘી ઉઠે રે, મન મોર બની થનગનાટ કરે!'
        ],
        verseEnglish: [
          'Ghanghor Ghata Varase, Dhara Harkhai Uthe,',
          'Osman Na Kanthe Raas Maghmaghi Uthe Re, Man Mor Bani Thanghat Kare!'
        ],
        meaning: 'Deep clouds shower the earth with life as Osman Mir’s soulful cadence makes the circle of dancers bloom with ecstasy!'
      }
    ]
  },

  // 8. Falguni Pathak - Indhana Vinva Gayi Ti & Odhani
  {
    id: 'indhana_vinva_falguni',
    title: 'Indhana Vinva Gayi Ti Mori Saiyan (Dandiya Queen)',
    titleGujarati: 'ઇંધણા વીણવા ગઈ તી મોરી સૈયર - ફાલ્ગુની પાઠક',
    category: 'raas',
    categoryGujarati: 'દાંડિયા રાસ',
    singerId: 'falguni_pathak',
    singer: 'Falguni Pathak',
    singerGujarati: 'ફાલ્ગુની પાઠક',
    singerTag: 'Dandiya Queen Iconic',
    singerTagGujarati: 'દાંડિયા ક્વીન આઇકોનિક',
    taalType: 'Classic Dandiya Raas 2-Taali (દાંડિયા રાસ)',
    taalTypeGujarati: 'દાંડિયા રાસ બે તાળી',
    bpm: 106,
    audioDurationSeconds: 205,
    poet: 'Traditional Gujarati Folk Poetry',
    poetGujarati: 'પરંપરાગત લોકગીત',
    description: "The timeless Dandiya jewel perfected by Falguni Pathak. Crisp teakwood Dandiya clashes and joyful, melodic storytelling.",
    descriptionGujarati: 'દાંડિયા ક્વીન ફાલ્ગુની પાઠકનો સદાબહાર દાંડિયા રાસ, જેમાં લાકડાના દાંડિયાના ખણખણાટ સાથે મીઠો લોકસંવાદ ગવાય છે.',
    rhythmPresetId: 'tran_taali',
    signatureChant: 'Taaza Dandiya Clash!',
    signatureChantGujarati: 'દાંડિયા ખણખણાટ!',
    melodyNotes: [392.0, 440.0, 493.88, 523.25, 493.88, 440.0, 392.0],
    melodySequence: [
      { pitch: 392.0, duration: 0.4 },
      { pitch: 440.0, duration: 0.4 },
      { pitch: 493.88, duration: 0.5 },
      { pitch: 523.25, duration: 0.6 },
      { pitch: 493.88, duration: 0.45 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 392.0, duration: 0.7 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'ઇંધણા વીણવા ગઈ તી મોરી સૈયર,',
          'ઇંધણા વીણતાં કાનુડો મળીયો રે લોલ.'
        ],
        verseEnglish: [
          'Indhana Vinva Gayi Ti Mori Saiyan,',
          'Indhana Vinta Kaanudo Maliyo Re Lol.'
        ],
        meaning: 'I had stepped out to gather dry twigs with my dear companions, when beloved Krishna delightfully crossed my path.'
      },
      {
        verseGujarati: [
          'ઓઢણી ઓઢી ને કાનુડો ગરબે ઘૂમ્યો,',
          'ફાલ્ગુનીના તાલે દાંડિયા ખણખણ્યા રે લોલ!'
        ],
        verseEnglish: [
          'Odhani Odhi Ne Kaanudo Garbe Ghoomyo,',
          'Falguni Na Taale Dandiya Khankhanya Re Lol!'
        ],
        meaning: 'Draped in a festive dupatta, Krishna joined the Garba circle as Dandiya sticks chimed merrily to Falguni’s beats!'
      }
    ]
  },

  // 9. Praful Dave - Jay Adhya Shakti (Universal Aarti)
  {
    id: 'jay_adhyashakti_praful',
    title: 'Jay Adhya Shakti (Universal Navratri Aarti)',
    titleGujarati: 'શ્રી જય આદ્યશક્તિ આરતી - પ્રફુલ દવે / પરંપરા',
    category: 'aarti',
    categoryGujarati: 'મહાઆરતી',
    singerId: 'praful_dave',
    singer: 'Praful Dave & Traditional',
    singerGujarati: 'પ્રફુલ દવે અને પરંપરાગત',
    singerTag: 'Sacred Maha Aarti',
    singerTagGujarati: 'સર્વોચ્ચ પવિત્ર આરતી',
    taalType: 'Hechh / Aarti Taal (હેંચ આરતી)',
    taalTypeGujarati: 'હેંચ / આરતી ધીમો તાલ',
    bpm: 82,
    audioDurationSeconds: 240,
    poet: 'Swami Shivanand (શ્રી શિવાનંદ સ્વામી - ૧૫મી સદી)',
    poetGujarati: 'શ્રી શિવાનંદ સ્વામી (સુરત - તાપી તટ)',
    description: 'The supreme universal Aarti of Gujarat sung across all 9 nights at midnight with bronze lamps and conch shells.',
    descriptionGujarati: 'નવરાત્રિના નવે-નવ દિવસોમાં મધરાતે ગવાતી જગતજનની માં આદ્યશક્તિ અંબાજીની સર્વોચ્ચ વૈશ્વિક મહાઆરતી.',
    rhythmPresetId: 'hechh_2taali',
    signatureChant: 'Om Jayo Jayo Maa Jagdambe!',
    signatureChantGujarati: 'ઓમ જયો જયો મા જગદંબે!',
    melodyNotes: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
    melodySequence: [
      { pitch: 261.63, duration: 0.5 },
      { pitch: 329.63, duration: 0.45 },
      { pitch: 392.0, duration: 0.6 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 523.25, duration: 0.8 },
      { pitch: 493.88, duration: 0.45 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 392.0, duration: 0.75 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'જય આદ્ય શક્તિ, મા જય આદ્ય શક્તિ,',
          'અખંડ બ્રહ્માંડ દીપાવ્યા, પડવે પ્રગટ્યા મા... ઓમ જયો જયો મા જગદંબે.'
        ],
        verseEnglish: [
          'Jay Adhya Shakti, Maa Jay Adhya Shakti,',
          'Akhand Brahmaand Deepavya, Padve Pragtya Maa... Om Jayo Jayo Maa Jagdambe.'
        ],
        meaning: 'Glory to the Primordial Divine Energy Maa Adhyashakti, who illuminates the cosmos, manifesting on the sacred first day.'
      },
      {
        verseGujarati: [
          'દ્વિતીયા બે સ્વરૂપ, શિવ શક્તિ જાણું,',
          'બ્રહ્મા ગણપતિ ગાયે, હર ગાયે હર મા... ઓમ જયો જયો મા જગદંબે.'
        ],
        verseEnglish: [
          'Dwitiya Be Swaroop, Shiva Shakti Jaanu,',
          'Brahma Ganpati Gaaye, Har Gaaye Har Maa... Om Jayo Jayo Maa Jagdambe.'
        ],
        meaning: 'On the second day, we revere Shiva and Shakti; Brahma, Ganesha, and Shiva sing Her eternal divine glory.'
      },
      {
        verseGujarati: [
          'તૃતીયા ત્રણ સ્વરૂપ, ત્રિભુવનમાં બેઠા,',
          'દયા કરી દક્ષિણા, માતાજી રાખ્યા મા... ઓમ જયો જયો મા જગદંબે.'
        ],
        verseEnglish: [
          'Tritiya Tran Swaroop, Tribhuvan Ma Betha,',
          'Daya Kari Dakshina, Mataji Raakhya Maa... Om Jayo Jayo Maa Jagdambe.'
        ],
        meaning: 'On the third day, the Mother presides over the three cosmic realms, sheltering all devotees with maternal compassion.'
      }
    ]
  },

  // 10. Sanedo Climax
  {
    id: 'sanedo_sanedo_climax',
    title: 'Sanedo Sanedo (Kathiawadi High-Velocity Climax)',
    titleGujarati: 'સનેડો સનેડો - લાલ લાલ સનેડો (સુપર ફાસ્ટ ક્લાઇમેક્સ)',
    category: 'sanedo',
    categoryGujarati: 'સનેડો ક્લાઇમેક્સ',
    singerId: 'kirtidan_gadhvi',
    singer: 'Kirtidan Gadhvi & Maniraj Barot Heritage',
    singerGujarati: 'કીર્તિદાન ગઢવી / મણિરાજ બારોટ લોકધારા',
    singerTag: 'Midnight Climax',
    singerTagGujarati: 'મધરાત ક્લાઇમેક્સ',
    taalType: 'Sanedo High-Velocity 2/4 (અતિ-વેગીય)',
    taalTypeGujarati: 'સનેડો અતિ-વેગીય ઢાળ',
    bpm: 142,
    audioDurationSeconds: 165,
    poet: 'Patan & Kathiawad Folk Dohas (પાટણ-કાઠિયાવાડ લોકસાહિત્ય)',
    poetGujarati: 'પાટણ અને કાઠિયાવાડ લોકસાહિત્ય',
    description: 'The electrifying midnight climax of Navratri with witty couplets (dohas), blazing speed, and lightning-fast hand claps.',
    descriptionGujarati: 'નવરાત્રિની રાત્રિનો સૌથી ઉત્સાહભર્યો, ધૂમ મચાવતો લોકપ્રિય સનેડો, જેમાં દોહા અને અતિ-ઝડપી તાળીઓનો મહાસંગમ થાય છે.',
    rhythmPresetId: 'sanedo_turbo',
    signatureChant: 'Ariri Sanedo! Laal Laal Sanedo!',
    signatureChantGujarati: 'અરિરી સનેડો! લાલ લાલ સનેડો!',
    melodyNotes: [440.0, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25],
    melodySequence: [
      { pitch: 440.0, duration: 0.25 },
      { pitch: 523.25, duration: 0.25 },
      { pitch: 587.33, duration: 0.3 },
      { pitch: 659.25, duration: 0.4 },
      { pitch: 587.33, duration: 0.25 },
      { pitch: 523.25, duration: 0.3 },
      { pitch: 440.0, duration: 0.45 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'સનેડો સનેડો, લાલ લાલ સનેડો,',
          'સનેડા તારે કારણે હું તો ગરબે રમવા આવી રે... સનેડો!'
        ],
        verseEnglish: [
          'Sanedo Sanedo, Laal Laal Sanedo,',
          'Saneda Taare Kaarane Hu To Garbe Ramva Aavi Re... Sanedo!'
        ],
        meaning: 'Sanedo, O vibrant Sanedo! Drawn by your magnetic rhythm, I have arrived to spin in the midnight Garba circle!'
      },
      {
        verseGujarati: [
          'ઉપર છત્રી નીચે ગરબો, વચમાં માડી બેઠાં રે,',
          'જોઈ જોઈ માનું રૂપડું સૌના મનડાં હરખાયાં રે... સનેડો!'
        ],
        verseEnglish: [
          'Upar Chhatri Niche Garbo, Vachma Maadi Betha Re,',
          'Joi Joi Maanu Roopdu Sauna Manda Harkhaya Re... Sanedo!'
        ],
        meaning: 'Under the festive canopy dances the Garba with Mother Amba at the heart; beholding Her divine grace, all hearts overflow with joy!'
      }
    ]
  },

  // 11. Tara Vina Shyam Mane Ekladu Lage
  {
    id: 'tara_vina_shyam_falguni',
    title: 'Tara Vina Shyam Mane Ekladu Lage',
    titleGujarati: 'તારા વિના શ્યામ મને એકલડું લાગે - રાસ ગરબો',
    category: 'raas',
    categoryGujarati: 'રાસ ગરબો',
    singerId: 'falguni_pathak',
    singer: 'Falguni Pathak & Hemant Chauhan',
    singerGujarati: 'ફાલ્ગુની પાઠક અને હેમંત ચૌહાણ',
    singerTag: 'Evergreen Classic',
    singerTagGujarati: 'સદાબહાર રાસ',
    taalType: 'Tran Taali / Dodhiya (ત્રણ તાળી)',
    taalTypeGujarati: 'ત્રણ તાળી પ્રવાહ',
    bpm: 104,
    audioDurationSeconds: 215,
    poet: 'Rasik-Kavi Tradition (ભક્તિ કાવ્ય પરંપરા)',
    poetGujarati: 'પરંપરાગત રાસ સાહિત્ય',
    description: "The golden Raas Garba cherished across generations, echoing Radha’s eternal devotion and yearning for Lord Krishna.",
    descriptionGujarati: 'રાધા અને શ્રીકૃષ્ણના દિવ્ય રાસ-પ્રેમનો અમર રાસ ગરબો, જે દરેક ગરબા ગ્રાઉન્ડમાં ભાવવિભોર કરી દે છે.',
    rhythmPresetId: 'tran_taali',
    signatureChant: 'Radhe Krishna Ki Jai!',
    signatureChantGujarati: 'રાધે કૃષ્ણ કી જય!',
    melodyNotes: [392.0, 440.0, 493.88, 587.33, 523.25, 493.88, 440.0],
    melodySequence: [
      { pitch: 392.0, duration: 0.45 },
      { pitch: 440.0, duration: 0.4 },
      { pitch: 493.88, duration: 0.55 },
      { pitch: 587.33, duration: 0.7 },
      { pitch: 523.25, duration: 0.4 },
      { pitch: 493.88, duration: 0.5 },
      { pitch: 440.0, duration: 0.65 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'તારા વિના શ્યામ મને એકલડું લાગે,',
          'રાસ રમવાને વ્હાલા વેલેરા આવજો રે...'
        ],
        verseEnglish: [
          'Tara Vina Shyam Mane Ekladu Lage,',
          'Raas Ramva Ne Vhaala Velera Aavjo Re...'
        ],
        meaning: 'Without you, O beloved Shyam, my heart feels solitary; come swiftly to dance the sacred Raas under the starlit sky.'
      },
      {
        verseGujarati: [
          'શરદ પૂનમની રૂપાળી રાતડી,',
          'ચાંદની ખીલી છે રે વ્રજની વાટડી...'
        ],
        verseEnglish: [
          'Sharad Poonam Ni Rupaali Raatdi,',
          'Chaandani Khili Chhe Re Vraj Ni Vaatdi...'
        ],
        meaning: 'The autumn full moon illuminates the path of Vraj, awaiting the Lord’s divine arrival.'
      }
    ]
  },

  // 12. Aso Maso Sharadpoonam
  {
    id: 'aso_maso_sharadpoonam',
    title: 'Aso Maso Sharadpoonam Ni Raat',
    titleGujarati: 'આસો માસો શરદપૂનમની રાત (પરંપરાગત લોકગરબો)',
    category: 'pradakshina',
    categoryGujarati: 'પરંપરાગત ગરબો',
    singerId: 'praful_dave',
    singer: 'Praful Dave & Folk Choir',
    singerGujarati: 'પ્રફુલ દવે અને લોકવૃંદ',
    singerTag: 'Folk Heritage Jewel',
    singerTagGujarati: 'લોકસાહિત્ય રત્ન',
    taalType: 'Classic 2-Taali Folk (બે તાળી)',
    taalTypeGujarati: 'બે તાળી લોક ઢાળ',
    bpm: 92,
    audioDurationSeconds: 200,
    poet: 'Traditional Kathiawadi Folk (પરંપરાગત લોકસાહિત્ય)',
    poetGujarati: 'પરંપરાગત કાઠિયાવાડી લોકગીત',
    description: 'Depicts the magical autumn full moon night (Sharad Purnima) when Maa Ambe joins the circle of devotees in the courtyard.',
    descriptionGujarati: 'આસો સુદ પૂનમની શીતળ રાત્રે મા અંબાના ગરબે ઘૂમતા ભક્તોની ભક્તિ અને આનંદને રજૂ કરતો ગુજરાતનો સૌથી પ્રખ્યાત લોકગરબો.',
    rhythmPresetId: 'hechh_2taali',
    signatureChant: 'Maadi Na Chok Ma Chandaliyo!',
    signatureChantGujarati: 'માડીના ચોકમાં ચાંદલિયો!',
    melodyNotes: [329.63, 392.0, 440.0, 493.88, 523.25, 493.88, 440.0],
    melodySequence: [
      { pitch: 329.63, duration: 0.45 },
      { pitch: 392.0, duration: 0.45 },
      { pitch: 440.0, duration: 0.5 },
      { pitch: 493.88, duration: 0.65 },
      { pitch: 523.25, duration: 0.55 },
      { pitch: 493.88, duration: 0.45 },
      { pitch: 440.0, duration: 0.7 },
    ],
    lyrics: [
      {
        verseGujarati: [
          'આસો માસો શરદ પૂનમની રાત જો,',
          'ચાંદલિયો ઊગ્યો રે માડીના ચોકમાં રે લોલ.'
        ],
        verseEnglish: [
          'Aso Maso Sharad Poonam Ni Raat Jo,',
          'Chandaliyo Ugyo Re Maadi Na Chok Ma Re Lol.'
        ],
        meaning: 'It is the auspicious Sharad Purnima night of the Ashwin month; the radiant full moon has risen above the courtyard of Mother Amba.'
      },
      {
        verseGujarati: [
          'પૂનમની રાતે માડી ગરબે રમવા નીસર્યા,',
          'સાથે સખીઓ રે નાચે આનંદમાં રે લોલ.'
        ],
        verseEnglish: [
          'Poonam Ni Raate Maadi Garbe Ramva Nisarya,',
          'Sathe Sakhiyo Re Naache Anand Ma Re Lol.'
        ],
        meaning: 'On this full moon night, the divine Mother steps into the courtyard to dance Garba with her joyfully spinning devotees.'
      }
    ]
  }
];
