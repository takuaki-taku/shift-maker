export const TIME_CONSTRAINTS = {
  START_TIME: '07:00',
  END_TIME: '21:00',
  INTERVAL_MINUTES: 15,
} as const;

export const PREFERENCE_LEVELS = {
  PREFERRED: 'preferred',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
} as const;

export const PREFERENCE_LEVEL_LABELS = {
  [PREFERENCE_LEVELS.PREFERRED]: '◯ 希望',
  [PREFERENCE_LEVELS.AVAILABLE]: '△ 可能',
  [PREFERENCE_LEVELS.UNAVAILABLE]: '× 不可',
} as const;