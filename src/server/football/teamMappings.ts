import { CountryCode } from '../types/chat.types.js';

export const TEAM_MAPPINGS: Record<CountryCode, { teamId: number; name: string }> = {
  fr: { teamId: 773, name: 'France' },
  br: { teamId: 764, name: 'Brazil' },
  ar: { teamId: 762, name: 'Argentina' },
  pt: { teamId: 765, name: 'Portugal' },
  es: { teamId: 760, name: 'Spain' },
  us: { teamId: 771, name: 'United States' },
  mx: { teamId: 769, name: 'Mexico' },
  ca: { teamId: 828, name: 'Canada' }
};
