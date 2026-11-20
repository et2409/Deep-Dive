export interface Expedition {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  category: 'pelagic' | 'wreck' | 'liveaboard';
  depthRange: string;
  diverTier: 'Open Water' | 'Advanced' | 'Tech / Trimix' | 'Open Water / Advanced';
  duration: string;
  maxGuests: number;
  priceAUD: number;
  departurePort: string;
  coordinates: string;
  inclusions: string[];
  summary: string;
  itinerary: {
    phase: string;
    depth: string;
    detail: string;
  }[];
  visualTheme: 'outer-reef' | 'yongala-wreck' | 'ningaloo-manta' | 'osprey-shark';
  nextDeparture: string;
  berthsRemaining: number;
}

export interface AcademyCourse {
  id: string;
  index: string;
  title: string;
  tierLabel: string;
  maxDepth: string;
  duration: string;
  ratio: string;
  priceAUD: number;
  prerequisites: string;
  description: string;
  curriculum: string[];
  certificationCode: string;
}

export interface DiveSitePin {
  id: string;
  name: string;
  region: string;
  coordinates: string;
  xPercent: number; // Position on stylized Australia bathymetric map (0-100)
  yPercent: number;
  depthRange: string;
  avgVisibility: string;
  waterTemp: string;
  difficulty: 'Open Water' | 'Advanced Drift' | 'Technical / Deep';
  currentStrength: string;
  targetWildlife: string[];
  bathymetryNote: string;
  seasonWindow: string;
}

export interface JournalPlate {
  id: string;
  title: string;
  caption: string;
  photographer: string;
  aspect: 'wide' | 'tall' | 'square';
  sceneType: 'canyon-sunburst' | 'nudibranch-macro' | 'tiger-cathedral' | 'yongala-stern' | 'leafy-seadragon' | 'manta-cleaning';
  exif: {
    depth: string;
    location: string;
    coordinates: string;
    gear: string;
    settings: string;
    waterTemp: string;
  };
}

export interface GuestReview {
  id: string;
  guestName: string;
  guestRole: string;
  guestOrigin: string;
  certificationHeld: string;
  expeditionTaken: string;
  category: 'Private Charter' | 'Technical Trimix' | 'First Reef Immersion';
  date: string;
  rating: number;
  headline: string;
  account: string;
  verifiedMetric: string;
}

export interface ReefStationCondition {
  id: string;
  stationName: string;
  coordinates: string;
  visibility: string;
  waterTemp: string;
  swell: string;
  current: string;
  barometric: string;
}

export const REEF_STATIONS: ReefStationCondition[] = [
  {
    id: 'osprey',
    stationName: 'Osprey Reef — North Horn Mooring',
    coordinates: '13°53\'42"S 146°33\'18"E',
    visibility: '38m+ Crystal',
    waterTemp: '26.4°C',
    swell: '0.8m Gentle',
    current: '1.1 kt Incoming Pelagic',
    barometric: '1016 hPa',
  },
  {
    id: 'ribbon',
    stationName: 'Ribbon Reef #10 — Cod Hole',
    coordinates: '14°39\'55"S 145°39\'48"E',
    visibility: '30m+ Clear',
    waterTemp: '26.1°C',
    swell: '0.6m Calm',
    current: '0.4 kt Slack Tide',
    barometric: '1017 hPa',
  },
  {
    id: 'yongala',
    stationName: 'S.S. Yongala Historic Sanctuary',
    coordinates: '19°18\'16"S 147°37\'31"E',
    visibility: '24m Pelagic Haze',
    waterTemp: '25.2°C',
    swell: '0.9m Moderate',
    current: '1.6 kt South-East',
    barometric: '1015 hPa',
  },
  {
    id: 'ningaloo',
    stationName: 'Ningaloo Outer Continental Shelf',
    coordinates: '22°40\'12"S 113°38\'54"E',
    visibility: '32m+ Azure',
    waterTemp: '25.8°C',
    swell: '0.7m Gentle',
    current: '0.8 kt Coastal Drift',
    barometric: '1018 hPa',
  },
];

export const EXPEDITIONS: Expedition[] = [
  {
    id: 'outer-reef-pelagic',
    title: 'The Outer Reef Pelagic Drift',
    subtitle: 'Great Barrier Reef Continental Drop-Off',
    region: 'Agincourt & Ribbon Reefs, QLD',
    category: 'pelagic',
    depthRange: '18m – 36m',
    diverTier: 'Open Water / Advanced',
    duration: 'Full-Day Private Catamaran (10 hrs)',
    maxGuests: 8,
    priceAUD: 1450,
    departurePort: 'Port Douglas Superyacht Marina',
    coordinates: '15°58\'S 145°49\'E',
    inclusions: [
      'Apeks Carbon Regulator & Suunto EON Core Suite',
      'Enriched Air Nitrox (EANx32) Dual Cylinders',
      'Marine Biologist Lead Guide & Chef Tasting Menu',
      'Nautilus LifeLine GPS Beacon & Surface Tender',
    ],
    summary:
      'Bypass the crowded inner moorings aboard M.V. Abyssal Sovereign to ride incoming oceanic upwellings along sheer coral walls where dogtooth tuna, scalloped hammerheads, and giant potato cod patrol.',
    itinerary: [
      {
        phase: '07:00 · Embarkation & Nitrox Analysis',
        depth: 'Surface',
        detail: 'Private berth boarding at Port Douglas, personal Apeks rig fitting, and EANx32 oxygen blend verification.',
      },
      {
        phase: '09:30 · Dive I: The Cathedral Wall Drift',
        depth: '32m Max',
        detail: 'Vertical wall descent along gorgonian sea fans into clear Coral Sea currents with grey reef sharks.',
      },
      {
        phase: '12:15 · Dive II: Coral Canyons & Pelagic Cleaning Station',
        depth: '22m Max',
        detail: 'Guided exploration of sunlit limestone swim-throughs and oceanic manta cleaning stations.',
      },
      {
        phase: '15:00 · Dive III: Golden Hour Shallow Pinnacles',
        depth: '16m Max',
        detail: 'Extended 70-minute afternoon immersion over staghorn gardens and green sea turtle sanctuaries.',
      },
    ],
    visualTheme: 'outer-reef',
    nextDeparture: '14 Nov 2026',
    berthsRemaining: 3,
  },
  {
    id: 'yongala-wreck-odyssey',
    title: 'The S.S. Yongala Deep Wreck Odyssey',
    subtitle: '1911 Heritage Steamship & Megafauna Oasis',
    region: 'Central Great Barrier Reef, QLD',
    category: 'wreck',
    depthRange: '16m – 33m',
    diverTier: 'Advanced',
    duration: '2-Day Overnight Expedition',
    maxGuests: 6,
    priceAUD: 2890,
    departurePort: 'Townsville Breakwater Private Berth',
    coordinates: '19°18\'S 147°37\'E',
    inclusions: [
      'Twin-Tank Sidemount or Backmount Apeks Configuration',
      'Custom Decompression Gas Blends (EANx36 + 80% O2)',
      'Dedicated Maritime Archaeologist & Wreck Historian',
      'Night-Fall Bioluminescence & Wreck Perimeter Immersion',
    ],
    summary:
      'Resting intact on an open sandy plain 109 metres long, the S.S. Yongala forms the most densely populated artificial reef on Earth—shrouded in giant Queensland groupers, marble rays, bull sharks, and schools of trevally.',
    itinerary: [
      {
        phase: 'Day 1 · 08:30 · Bow-to-Stern Reconnaissance',
        depth: '28m Max',
        detail: 'Current-assisted traversal from the encrusted bow windlass past the promenade deck to the telegraph housing.',
      },
      {
        phase: 'Day 1 · 13:30 · Deep Hull & Giant Grouper Lair',
        depth: '31m Max',
        detail: 'Drop to the seabed beneath the stern rudder where 300kg Queensland groupers and eagle rays congregate.',
      },
      {
        phase: 'Day 1 · 19:00 · Dusk Predator & Torch Reveal Dive',
        depth: '24m Max',
        detail: 'Witness the dramatic shift of the wreck ecosystem under 3,000-lumen umbilical canister torches.',
      },
      {
        phase: 'Day 2 · 07:30 · Slack-Tide Macro & Coral Superstructure',
        depth: '20m Max',
        detail: 'Extended nitrox profile documenting soft dendronephthya corals, sea snakes, and historic brass portholes.',
      },
    ],
    visualTheme: 'yongala-wreck',
    nextDeparture: '19 Nov 2026',
    berthsRemaining: 2,
  },
  {
    id: 'ningaloo-whale-shark',
    title: 'Ningaloo Whale Shark & Manta Immersion',
    subtitle: 'Western Continental Shelf Megafauna Sanctuary',
    region: 'Exmouth & Muiron Islands, WA',
    category: 'pelagic',
    depthRange: '12m – 30m',
    diverTier: 'Open Water',
    duration: '3-Day Private Yacht & Spotter Plane Charter',
    maxGuests: 8,
    priceAUD: 4600,
    departurePort: 'Tantabiddi & Exmouth Marina Base',
    coordinates: '22°40\'S 113°39\'E',
    inclusions: [
      'Private Fixed-Wing Aerial Spotter Aircraft Exclusive to Vessel',
      'Full Fourth Element Proteus II Thermal & Apeks Kit',
      'Underwater Cinematographer & RAW 8K Footage Package',
      'Three Nights Aboard M.V. Southern Cross Luxury Catamaran',
    ],
    summary:
      'Where the arid red limestone canyons of Cape Range meet the Indian Ocean drop-off. Dive the Navy Pier nocturnal macro wonderland before swimming unhurried beside whale sharks, humpback whales, and oceanic manta rays.',
    itinerary: [
      {
        phase: 'Day 1 · Outer Reef Spur & Manta Bommies',
        depth: '22m Max',
        detail: 'Check-out dive at Labyrinth and Blizzard Ridge with resident reef manta squadrons and green turtles.',
      },
      {
        phase: 'Day 2 · Aerial Spotter Pelagic Intercept & Muiron Islands',
        depth: '26m Max',
        detail: 'Private aircraft coordinates uncrowded whale shark encounters followed by deep drift dives at the Muiron drop-off.',
      },
      {
        phase: 'Day 3 · Exmouth Navy Pier Slack-Tide Privilege',
        depth: '15m Max',
        detail: 'Restricted-access military pier dive teeming with grey nurse sharks, giant frogfish, wobbegongs, and octopuses.',
      },
    ],
    visualTheme: 'ningaloo-manta',
    nextDeparture: '24 Nov 2026',
    berthsRemaining: 4,
  },
  {
    id: 'osprey-shark-vortex',
    title: 'Osprey Reef Shark Vortex (Liveaboard 4-Day)',
    subtitle: 'Isolated Coral Sea Atoll Rising from 2,000m Abyss',
    region: 'Far North Coral Sea Territory',
    category: 'liveaboard',
    depthRange: '24m – 45m+',
    diverTier: 'Tech / Trimix',
    duration: '4-Day / 4-Night Expedition Liveaboard',
    maxGuests: 8,
    priceAUD: 6950,
    departurePort: 'Cairns Marlin Marina Private Pier B',
    coordinates: '13°54\'S 146°38\'E',
    inclusions: [
      'Normoxic Trimix, Heliox & Closed-Circuit Rebreather (CCR) Support',
      'Full Stateroom Accommodation with En-Suite & Satellite Comms',
      '14 Guided Dives Including North Horn & Admiralty Caves',
      'Onboard Hyperbaric Medic & Twin Medical Oxygen Banks',
    ],
    summary:
      'One hundred and twenty nautical miles beyond the Continental Shelf, Osprey Reef rises vertically out of two kilometres of open ocean. Experience 50-metre Cobalt visibility, schooling hammerheads, silvertip sharks, and nautilus habitats.',
    itinerary: [
      {
        phase: 'Day 1 · Overnight Coral Sea Crossing & North Horn Descent',
        depth: '35m Max',
        detail: 'Wake moored at North Horn; descend into the amphitheatre with silvertip, grey reef, and scalloped hammerhead sharks.',
      },
      {
        phase: 'Day 2 · Admiralty Caves & The 1,000m Vertical Wall',
        depth: '40m Max',
        detail: 'Navigate luminous limestone caverns opening onto a sheer vertical precipice dropping 2,000 metres into the abyss.',
      },
      {
        phase: 'Day 3 · False Entrance Drift & Nocturnal Pelagic Hunt',
        depth: '38m Max',
        detail: 'High-voltage drift along yellow soft-coral walls followed by a black-water pelagic vertical line night dive.',
      },
      {
        phase: 'Day 4 · Ribbon Reef #10 Decompression & Helicopter Transfer Option',
        depth: '18m Max',
        detail: 'Final shallow reef profiles at Pixie Pinnacle and Cod Hole before cruising back to Cairns or Lizard Island.',
      },
    ],
    visualTheme: 'osprey-shark',
    nextDeparture: '02 Dec 2026',
    berthsRemaining: 2,
  },
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'discover-open-water',
    index: '01',
    title: 'Discover Scuba Diving & Open Water',
    tierLabel: 'Foundation Mastery',
    maxDepth: '18m Certified',
    duration: '3 – 4 Days Private',
    ratio: 'Max 2 Guests : 1 Instructor',
    priceAUD: 1850,
    prerequisites: 'No prior scuba experience required · Swim competency',
    description:
      'Begin your sub-aquatic lineage far from crowded resort pools. Complete bespoke e-learning at your leisure before conducting confined-water buoyancy mastery in a private salt-water lagoon and four open-ocean reef dives.',
    curriculum: [
      'Precision neutral buoyancy & frog-kick propulsion mechanics',
      'Gas management, Apeks regulator architecture & emergency protocols',
      'Reef ecology orientation led by a resident marine biologist',
      'Four outer-reef certification dives aboard M.V. Abyssal Sovereign',
    ],
    certificationCode: 'PADI-OW-AU26',
  },
  {
    id: 'advanced-deep-specialty',
    index: '02',
    title: 'Advanced & Deep Diver Specialty (40m)',
    tierLabel: 'Expedition Qualification',
    maxDepth: '40m Certified',
    duration: '3 Days Offshore',
    ratio: 'Max 4 Guests : 1 Instructor',
    priceAUD: 2290,
    prerequisites: 'PADI Open Water Diver (or equivalent)',
    description:
      'Unlock Australia’s premier deep wrecks and continental walls. Master sub-30m gas narcosis management, DSMB deployment in open pelagic currents, nocturnal navigation, and multi-level decompression computer profiles.',
    curriculum: [
      '40-metre deep descent profiles along Agincourt Continental Wall',
      'Negative-entry pelagic drift techniques & delayed surface marker deployment',
      'Precision compass & natural bathymetric navigation at night',
      'Emergency simulated decompression & pony-cylinder gas switching',
    ],
    certificationCode: 'PADI-DEEP40-AU26',
  },
  {
    id: 'nitrox-tech-trimix',
    index: '03',
    title: 'Enriched Air (Nitrox) & Technical Trimix',
    tierLabel: 'Technical & Mixed-Gas Wing',
    maxDepth: '65m Normoxic Trimix',
    duration: '5 Days Intensive',
    ratio: 'Max 2 Guests : 1 Tech Instructor',
    priceAUD: 4100,
    prerequisites: 'Advanced Open Water · 50+ Logged Dives · Rescue Recommended',
    description:
      'Engineered for expedition divers pushing into the twilight zone of the Coral Sea. Transition to twin-cylinder manifolded rigs or sidemount systems, utilizing helium-oxygen-nitrogen blends and accelerated stage decompression.',
    curriculum: [
      'Partial pressure physics, CNS oxygen toxicity & END calculation',
      'Onboard membrane blending analysis for EANx32, EANx50, and Trimix 18/45',
      'Twinset valve shutdown drills, stage cylinder rigging & gradient factors',
      'Staged decompression ascents in blue water off Osprey Reef',
    ],
    certificationCode: 'PADI-TECTRIMIX-AU26',
  },
  {
    id: 'divemaster-private-guiding',
    index: '04',
    title: 'PADI Divemaster & Private Marine Guiding',
    tierLabel: 'Professional Leadership',
    maxDepth: '40m Professional',
    duration: '14 Days Bespoke Mentorship',
    ratio: '1-on-1 Course Director Mentorship',
    priceAUD: 6800,
    prerequisites: 'Rescue Diver · EFR · 40+ Logged Dives to Commence',
    description:
      'An elite fellowship alongside our Expedition Captains and PADI Course Directors. Master expedition bathymetric mapping, hyperbaric chamber emergency coordination, superyacht dive operations, and marine megafauna guiding.',
    curriculum: [
      '3D reef site cartography, current vector forecasting & briefing leadership',
      'Rescue management, O2 provider mastery & Nautilus GPS fleet telemetry',
      'Superyacht tender operations & high-net-worth private charter protocols',
      'Direct accreditation from a PADI 5-Star Career Development Center',
    ],
    certificationCode: 'PADI-DMPRO-AU26',
  },
];

export const DIVE_SITES: DiveSitePin[] = [
  {
    id: 'osprey-reef',
    name: 'Osprey Reef — North Horn',
    region: 'Coral Sea Marine Park, QLD',
    coordinates: '13°54\'12"S · 146°38\'05"E',
    xPercent: 83,
    yPercent: 21,
    depthRange: '12m – 1,000m+ Wall',
    avgVisibility: '40m – 55m',
    waterTemp: '25°C – 28°C',
    difficulty: 'Technical / Deep',
    currentStrength: 'Moderate to Strong Pelagic',
    targetWildlife: ['Scalloped Hammerheads', 'Silvertip Sharks', 'Chambered Nautilus', 'Dogtooth Tuna'],
    bathymetryNote: 'Submerged volcanic seamount rising 2,000m from the Coral Sea Basin floor.',
    seasonWindow: 'Year-Round (Peak Visibility May – Dec)',
  },
  {
    id: 'ribbon-cod-hole',
    name: 'Ribbon Reef #10 & Cod Hole',
    region: 'Far Northern Great Barrier Reef, QLD',
    coordinates: '14°39\'55"S · 145°39\'48"E',
    xPercent: 79,
    yPercent: 26,
    depthRange: '10m – 34m',
    avgVisibility: '28m – 40m',
    waterTemp: '24°C – 28°C',
    difficulty: 'Open Water',
    currentStrength: 'Gentle Tidal',
    targetWildlife: ['Giant Potato Cod', 'Dwarf Minke Whales', 'Pygmy Seahorses', 'Green Sea Turtles'],
    bathymetryNote: 'Chain of linear shelf-edge reefs shielding turquoise coral canyons from Pacific swells.',
    seasonWindow: 'Year-Round (Minke Migration Jun – Jul)',
  },
  {
    id: 'ss-yongala',
    name: 'S.S. Yongala Historic Wreck',
    region: 'Cape Bowling Green, Central QLD',
    coordinates: '19°18\'16"S · 147°37\'31"E',
    xPercent: 82,
    yPercent: 35,
    depthRange: '16m – 33m',
    avgVisibility: '18m – 30m',
    waterTemp: '23°C – 27°C',
    difficulty: 'Advanced Drift',
    currentStrength: 'Strong Open-Shelf Current',
    targetWildlife: ['Giant Queensland Groupers', 'Bull Sharks', 'Oceanic Manta Rays', 'Olive Sea Snakes'],
    bathymetryNote: '109m steel hull lying at a 65° list on a flat 30m sediment floor—an oasis for megafauna.',
    seasonWindow: 'Year-Round (Manta & Humpback Peak Jul – Nov)',
  },
  {
    id: 'ningaloo-navy-pier',
    name: 'Ningaloo Reef & Exmouth Pier',
    region: 'Gascoyne Coast, Western Australia',
    coordinates: '22°40\'12"S · 113°38\'54"E',
    xPercent: 14,
    yPercent: 43,
    depthRange: '12m – 32m',
    avgVisibility: '25m – 35m',
    waterTemp: '23°C – 28°C',
    difficulty: 'Open Water',
    currentStrength: 'Slack-Window Dependent',
    targetWildlife: ['Whale Sharks', 'Oceanic Manta Rays', 'Grey Nurse Sharks', 'Tasselled Wobbegongs'],
    bathymetryNote: 'Australia’s closest continental shelf point, bringing deep oceanic upwellings within 2km of shore.',
    seasonWindow: 'Mar – Nov (Whale Sharks Mar – Aug)',
  },
  {
    id: 'rapid-bay-kangaroo',
    name: 'Rapid Bay & Kangaroo Island Canyons',
    region: 'Fleurieu Peninsula, South Australia',
    coordinates: '35°31\'20"S · 138°11\'08"E',
    xPercent: 60,
    yPercent: 77,
    depthRange: '9m – 26m',
    avgVisibility: '15m – 25m',
    waterTemp: '15°C – 21°C',
    difficulty: 'Open Water',
    currentStrength: 'Calm Southern Swell',
    targetWildlife: ['Leafy Sea Dragons', 'Weedy Sea Dragons', 'Australian Sea Lions', 'Giant Cuttlefish'],
    bathymetryNote: 'Temperate Ecklonia kelp forests and historic limestone jetties sheltering endemic syngnathids.',
    seasonWindow: 'Oct – May (Calmest Austral Summer Seas)',
  },
];

export const JOURNAL_PLATES: JournalPlate[] = [
  {
    id: 'plate-01',
    title: 'Cathedral Light Shafts of Ribbon Reef #10',
    caption: 'Midday zenith sunbeams piercing 28 metres into the limestone amphitheatre at Pixie Wall.',
    photographer: 'Capt. Julian Vance · Chief Expedition Cinematographer',
    aspect: 'wide',
    sceneType: 'canyon-sunburst',
    exif: {
      depth: '28.4m',
      location: 'Ribbon Reef #10, Outer GBR',
      coordinates: '14°39\'S 145°39\'E',
      gear: 'RED V-Raptor 8K · Nauticam Housing · 16mm Rectilinear',
      settings: 'f/5.6 · 1/250s · ISO 400 · Natural Light',
      waterTemp: '26.4°C',
    },
  },
  {
    id: 'plate-02',
    title: 'Nembrotha Kubaryana — Midnight Bioluminescence',
    caption: 'Fluorescent gill plumes of a dusky nudibranch grazing ascidians during a 22:00 black-water dive.',
    photographer: 'Dr. Elena Rostova · Lead Marine Biologist',
    aspect: 'tall',
    sceneType: 'nudibranch-macro',
    exif: {
      depth: '19.2m',
      location: 'Agincourt Stepping Stones',
      coordinates: '15°58\'S 145°49\'E',
      gear: 'Sony A1 · 90mm f/2.8 Macro · Dual Retra Pro Strobes',
      settings: 'f/16 · 1/200s · ISO 100 · Snoot Strobe',
      waterTemp: '26.1°C',
    },
  },
  {
    id: 'plate-03',
    title: 'Silvertip Sentinel at North Horn Drop-Off',
    caption: 'A three-metre silvertip shark banking against the 2,000-metre cobalt abyss of Osprey Reef.',
    photographer: 'Capt. Julian Vance · Chief Expedition Cinematographer',
    aspect: 'square',
    sceneType: 'tiger-cathedral',
    exif: {
      depth: '36.8m',
      location: 'Osprey Reef North Horn, Coral Sea',
      coordinates: '13°54\'S 146°38\'E',
      gear: 'Nikon Z9 · 14-24mm f/2.8 S · 230mm Zen Optical Dome',
      settings: 'f/8 · 1/320s · ISO 320 · Ambient Balance',
      waterTemp: '25.9°C',
    },
  },
  {
    id: 'plate-04',
    title: 'The Stern Rudder of S.S. Yongala (1911)',
    caption: 'Over a century of purple octocorals and schooling golden trevally enveloping the portside hull.',
    photographer: 'Marcus Thorne · Maritime Heritage Specialist',
    aspect: 'square',
    sceneType: 'yongala-stern',
    exif: {
      depth: '31.0m',
      location: 'S.S. Yongala Sanctuary Zone',
      coordinates: '19°18\'S 147°37\'E',
      gear: 'Canon EOS R5 · 15-35mm f/2.8L · Twin Keldan 18,000lm Video Lights',
      settings: 'f/6.3 · 1/160s · ISO 500 · Trimix 21/35',
      waterTemp: '25.2°C',
    },
  },
  {
    id: 'plate-05',
    title: 'Phycodurus Eques — The Golden Leafy Sea Dragon',
    caption: 'Endemic South Australian leafy sea dragon drifting weightlessly through sunlit Ecklonia kelp canopies.',
    photographer: 'Dr. Elena Rostova · Lead Marine Biologist',
    aspect: 'wide',
    sceneType: 'leafy-seadragon',
    exif: {
      depth: '14.5m',
      location: 'Rapid Bay Headland, South Australia',
      coordinates: '35°31\'S 138°11\'E',
      gear: 'Sony A1 · 50mm f/1.4 GM · Diffused Warm Strobe Array',
      settings: 'f/9 · 1/250s · ISO 200 · Drysuit Immersion',
      waterTemp: '18.4°C',
    },
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    guestName: 'Lord Henrik Lindqvist',
    guestRole: 'Managing Partner, Nordic Maritime Ventures',
    guestOrigin: 'Stockholm & Sydney',
    certificationHeld: 'PADI Tec 50 & Trimix Diver',
    expeditionTaken: 'Osprey Reef Shark Vortex (4-Day Private Charter)',
    category: 'Private Charter',
    date: 'October 2026',
    rating: 5,
    headline: 'Unrivaled maritime precision 120 nautical miles offshore.',
    account:
      'Having chartered dive vessels in Palau, Raja Ampat, and the Galápagos, Deep Dive Australia stands in a league of its own. Prior to boarding M.V. Abyssal Sovereign, our custom trimix stages were analyzed and labeled to 0.1% tolerance. Dropping onto North Horn at 06:30 with zero other boats on the horizon and forty scalloped hammerheads circling in 45-metre visibility was transformative.',
    verifiedMetric: '14 Technical Decompression Dives Logged · Max Depth 48.2m',
  },
  {
    id: 'rev-2',
    guestName: 'Dr. Camille Laurent-Vasseur',
    guestRole: 'Chief Reconstructive Surgeon',
    guestOrigin: 'Geneva, Switzerland',
    certificationHeld: 'PADI Advanced Open Water & Deep Specialty',
    expeditionTaken: 'Advanced & Deep Diver Specialty + S.S. Yongala Odyssey',
    category: 'Technical Trimix',
    date: 'September 2026',
    rating: 5,
    headline: 'From anxious 18m holiday diver to composed 38m wreck explorer.',
    account:
      'Before arriving in Port Douglas, I felt uneasy in currents below twenty metres. My 1-on-1 instructor spent two full days refining my trim, DSMB deployment, and gas consumption on Apeks carbon rigs. By day four on the S.S. Yongala at 31 metres, my air consumption had dropped by 34% and I hovered motionless beside a 250kg Queensland grouper.',
    verifiedMetric: 'SAC Rate Improved by 34% · Certified to 40m Depth',
  },
  {
    id: 'rev-3',
    guestName: 'Alistair & Sienna Sterling',
    guestRole: 'Founders, Sterling Architectural Studio',
    guestOrigin: 'Melbourne, VIC',
    certificationHeld: 'PADI Open Water Diver (Graduated Onboard)',
    expeditionTaken: 'Ningaloo Whale Shark & Manta Immersion',
    category: 'First Reef Immersion',
    date: 'August 2026',
    rating: 5,
    headline: 'Our first breath underwater was beside an eight-metre whale shark.',
    account:
      'We refused to learn scuba in a chlorinated hotel pool with twelve strangers. Deep Dive Australia arranged our theory in Melbourne, then flew a private spotter plane over Ningaloo while our marine biologist instructor guided us one-on-one. We completed our fourth certification dive surrounded by three oceanic manta rays.',
    verifiedMetric: '2:1 Private Instruction · 6 Megafauna Species Encountered',
  },
];

export const LEGAL_DOCUMENTS: Record<
  string,
  { title: string; subtitle: string; code: string; clauses: { heading: string; body: string }[] }
> = {
  rstc: {
    title: 'RSTC Diver Medical Clearance Protocol',
    subtitle: 'Recreational Scuba Training Council & UHMS Hyperbaric Standards (2026 Revision)',
    code: 'DOC-MED-RSTC-2026',
    clauses: [
      {
        heading: '1. Pre-Embarkation Barotrauma & Cardiopulmonary Screening',
        body: 'All guests embarking on Deep Dive Australia vessels must complete the internationally standardized Diver Medical Participant Questionnaire at least 72 hours prior to departure. Any positive indication regarding cardiovascular history, spontaneous pneumothorax, or inner-ear surgery requires counter-signature by a SPUMS-accredited diving physician.',
      },
      {
        heading: '2. Decompression & No-Fly Surface Intervals',
        body: 'In accordance with DAN (Divers Alert Network) and PADI protocols, guests completing multi-day repetitive nitrox or trimix profiles must observe a mandatory minimum 24-hour surface interval prior to commercial cabin-pressurized flight or helicopter transfer above 300 metres.',
      },
      {
        heading: '3. Onboard Hyperbaric Readiness',
        body: 'Both M.V. Abyssal Sovereign and M.V. Southern Cross carry dual-bank demand-valve medical oxygen arrays (15,000+ litres capacity), automated external defibrillators, and direct satellite telemetry to Townsville University Hospital Hyperbaric Medicine Unit.',
      },
    ],
  },
  permits: {
    title: 'Great Barrier Reef & Coral Sea Marine Park Permits',
    subtitle: 'Commonwealth GBRMPA High-Standard Eco-Tourism Authorization',
    code: 'PERMIT-GBRMPA-G26-8841',
    clauses: [
      {
        heading: '1. Exclusive Mooring & Sanctuary Zone Access',
        body: 'Deep Dive Australia operates under High-Standard Tourism Permit #G26-8841, granting access to sensitive Ribbon Reef, Osprey Reef, and S.S. Yongala Historic Shipwreck Maritime Protection Zones with strict vessel-size and diver-count ceilings.',
      },
      {
        heading: '2. Zero-Anchor Dynamic Positioning & Reef Stewardship',
        body: 'Our fleet utilizes computer-controlled dynamic GPS station-keeping and dedicated public/private moorings. Zero seabed anchoring is permitted. Every guest contributes AUD $25 per day directly to the Reef Environmental Management Charge (EMC) and Crown-of-Thorns Starfish monitoring.',
      },
      {
        heading: '3. Megafauna Interaction Code of Conduct',
        body: 'All whale shark, dwarf minke whale, and oceanic manta immersions adhere strictly to Australian National Guidelines—no flash photography on whale sharks, mandatory minimum 3-metre lateral clearance from head/caudal zones, and passive drift entry.',
      },
    ],
  },
  weather: {
    title: 'Meteorological & Sea-State Charter Assurance Policy',
    subtitle: 'Bureau of Meteorology (BOM) Offshore Coral Sea & Indian Ocean Operating Thresholds',
    code: 'POLICY-MET-2026',
    clauses: [
      {
        heading: '1. Captain’s Sovereign Authority & Sea-State Thresholds',
        body: 'Safety and underwater clarity govern every departure. Should sustained winds exceed 25 knots or significant swell exceed 2.2 metres at the primary outer-reef mooring, the Expedition Captain may reroute to leeward ribbon reef sanctuaries or reschedule without penalty.',
      },
      {
        heading: '2. 100% Weather Refund or Priority Reschedule Guarantee',
        body: 'If cyclonic lows or gale warnings force a complete cancellation of your scheduled departure and your travel window cannot accommodate an alternate date within 14 days, 100% of your charter deposit is refunded within 48 hours—or held as a 110% expedition credit valid for 24 months.',
      },
    ],
  },
  charter: {
    title: 'Terms of Private Vessel Charter & Expedition Berth',
    subtitle: 'Maritime Safety Queensland (MSQ) & AMSA Domestic Commercial Vessel Compliance',
    code: 'CHARTER-AMSA-2026',
    clauses: [
      {
        heading: '1. Berth Allocation & Private Superyacht Exclusivity',
        body: 'Scheduled departures are strictly capped at 6 to 8 divers per vessel to preserve a 2:1 or 4:1 guest-to-guide ratio. Whole-vessel private buyouts grant complete itinerary autonomy across Port Douglas, Lizard Island, Osprey Reef, or Exmouth.',
      },
      {
        heading: '2. Certification Verification & Depth Ceiling Enforcement',
        body: 'We verify PADI, SSI, TDI, and GUE credentials prior to gear configuration. Guests wishing to descend beyond their certified depth ceiling must book an accompanied PADI Deep Diver or Technical Trimix upgrade with our onboard Course Director.',
      },
    ],
  },
};
