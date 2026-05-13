export interface RecoveryModule {
  slug: string;
  name: string;
  abbr: string;
  function: string;
  description: string;
  phase: string;
  phaseName: string;
  duration: string;
  price: number;
  comparePrice: number;
  systems: string[];
}

export interface ProtocolStep {
  time: string;
  module: string;
  duration: string;
  phase: number;
}

export interface RecoverySystem {
  id: string;
  name: string;
  tagline: string;
  target: string;
  duration: string;
  nights: number;
  protocol: ProtocolStep[];
  stressLevel: 'low' | 'moderate' | 'high';
}

export const MODULES: RecoveryModule[] = [
  {
    slug: 'sleep-induction-module',
    name: 'Sleep Induction Module',
    abbr: 'SIM',
    function: 'Neural audio entrainment',
    description:
      'Guides brainwave descent from beta → alpha → theta through precisely calibrated audio frequencies. The system does not induce sleep — it removes the conditions that prevent it.',
    phase: 'Phase 3',
    phaseName: 'Sleep Induction',
    duration: '22–45 min',
    price: 89,
    comparePrice: 149,
    systems: ['night-reset', 'deep-sleep', 'full-recovery'],
  },
  {
    slug: 'cervical-downshift-module',
    name: 'Cervical Downshift Module',
    abbr: 'CDM',
    function: 'Physical stress release',
    description:
      'Releases tension accumulated in the cervical-trapezius axis — the primary body site of chronic mental load. Physical decompression precedes neural decompression.',
    phase: 'Phase 1',
    phaseName: 'Decompression',
    duration: '18–45 min',
    price: 59,
    comparePrice: 99,
    systems: ['night-reset', 'deep-sleep', 'full-recovery'],
  },
  {
    slug: 'sensory-stillness-module',
    name: 'Sensory Stillness Module',
    abbr: 'SSM',
    function: 'Perceptual isolation',
    description:
      'Reduces external sensory input and creates the perceptual isolation necessary for parasympathetic shift. Silence is not the absence of sound — it is the withdrawal of signal.',
    phase: 'Phase 2',
    phaseName: 'Descent',
    duration: '20–30 min',
    price: 29,
    comparePrice: 49,
    systems: ['night-reset', 'deep-sleep', 'full-recovery'],
  },
  {
    slug: 'environment-calibration-module',
    name: 'Environment Calibration Module',
    abbr: 'ECM',
    function: 'Sleep environment optimization',
    description:
      'Synchronizes ambient variables — light temperature, sound floor, air — to create your sleep-optimized environment signature. The protocol begins before you do.',
    phase: 'Passive',
    phaseName: 'Continuous',
    duration: '90 min pre-set',
    price: 79,
    comparePrice: 129,
    systems: ['deep-sleep', 'full-recovery'],
  },
];

export const SYSTEMS: RecoverySystem[] = [
  {
    id: 'night-reset',
    name: 'Night Reset System',
    tagline: 'Reset tonight. Arrive at tomorrow.',
    target: 'Moderate daily stress. Screen overuse. Difficulty transitioning to rest.',
    duration: '45 min',
    nights: 1,
    stressLevel: 'low',
    protocol: [
      { time: '19:00', module: 'Cervical Downshift', duration: '15 min', phase: 1 },
      { time: '21:30', module: 'Environment Calibration', duration: 'auto', phase: 0 },
      { time: '22:00', module: 'Sensory Stillness', duration: '20 min', phase: 2 },
      { time: '22:20', module: 'Sleep Induction', duration: '25 min', phase: 3 },
    ],
  },
  {
    id: 'deep-sleep',
    name: 'Deep Sleep System',
    tagline: 'Not just sleep. Deep recovery.',
    target: 'Chronic sleep disruption. High cortisol baseline. Executives, shift workers, parents.',
    duration: '75 min',
    nights: 1,
    stressLevel: 'moderate',
    protocol: [
      { time: '20:30', module: 'Environment Calibration', duration: '90 min pre-set', phase: 0 },
      { time: '21:00', module: 'Cervical Downshift', duration: '30 min', phase: 1 },
      { time: '21:30', module: 'Sensory Stillness', duration: '30 min', phase: 2 },
      { time: '22:00', module: 'Sleep Induction', duration: '45 min', phase: 3 },
    ],
  },
  {
    id: 'full-recovery',
    name: 'Full Recovery System',
    tagline: 'Five nights. Full system reset.',
    target: 'Burnout states. Post-travel. Post-illness. High-depletion events.',
    duration: '5-night protocol',
    nights: 5,
    stressLevel: 'high',
    protocol: [
      { time: 'Night 1–2', module: 'Night Reset System', duration: 'baseline re-establishment', phase: 1 },
      { time: 'Night 3–4', module: 'Deep Sleep System', duration: 'depth increase', phase: 2 },
      { time: 'Night 5', module: 'Full System Convergence', duration: 'system-adapted', phase: 3 },
    ],
  },
];

export function getModuleBySlug(slug: string): RecoveryModule | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getSystemByStressLevel(level: 'low' | 'moderate' | 'high'): RecoverySystem {
  return SYSTEMS.find((s) => s.stressLevel === level) ?? SYSTEMS[0];
}
