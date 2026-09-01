/**
 * Type definitions for "For My Maroumti" romantic experience
 */

export type ScreenId =
  | 'opening'
  | 'how-mad'
  | 'courtroom'
  | 'real-apology'
  | 'why-i-love-you'
  | 'our-story'
  | 'forgiveness-test'
  | 'forgiveness-level'
  | 'cute-flirty'
  | 'little-surprises'
  | 'final-letter'
  | 'forgiveness-screen';

export interface LoveCardItem {
  id: number;
  icon: string;
  title: string;
  message: string;
  delayedPunchline?: string;
}

export interface MemoryItem {
  id: number;
  icon: string;
  title: string;
  date?: string;
  description: string;
  imagePlaceholderId?: string;
  customImageUrl?: string;
}

export interface SurpriseEgg {
  id: string;
  label: string;
  icon: string;
  title: string;
  message: string;
  hint?: string;
}

export interface LoveConfig {
  recipientNicknames: string[];
  apology: {
    title: string;
    paragraphs: string[];
    personalApologyHeading: string;
    personalApologyText: string;
    photoUrl: string;
  };
  loveCards: LoveCardItem[];
  memories: MemoryItem[];
  flirtyBubbles: string[];
  surpriseEggs: SurpriseEgg[];
  finalLetter: {
    salutation: string;
    paragraphs: string[];
    signOff: string;
    photoUrl: string;
  };
  finalCelebration: {
    headline: string;
    subheadline: string;
    verdict: string;
    sentences: {
      icon: string;
      text: string;
    }[];
    closingText: string;
    finalSurpriseMessage: string;
  };
  audio: {
    customMusicUrl?: string;
    enabledByDefault: boolean;
  };
}
