import { LoveConfig } from '../types';

/**
 * ============================================================================
 * 💌 LOVE CONFIGURATION — "FOR MY MAROUMTI ❤️"
 * ============================================================================
 * You can easily customize any text, personal message, photos, or memories here!
 *
 * 📸 PHOTO INSTRUCTIONS:
 * - Replace the photoUrl fields with your real image URLs, public paths (e.g. '/assets/photo1.jpg'),
 *   or base64 strings.
 * - If left empty or using the default placeholder, an elegant romantic placeholder card is shown.
 */

// Placeholders for photos - easy to replace
export const PHOTO_PLACEHOLDERS = {
  MY_PHOTO: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
  COUPLE_PHOTO: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  PHOTO_01: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
  PHOTO_02: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  PHOTO_03: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
  PHOTO_04: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  PHOTO_05: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
};

export const INITIAL_LOVE_CONFIG: LoveConfig = {
  recipientNicknames: [
    'Maroumti',
    'Habibi',
    'Rouhy',
    'Rouh 9albi',
    '3iniya',
    '7yeti',
    '3omri',
    'Nour 3iniya',
    'Saghrounti',
    'Arnoubti',
    'Habibti',
    'Princessti',
    'Sweetheart',
    'Darling',
    'Babe',
    'Baby',
  ],

  // Screen 4: Real Sincere Apology
  apology: {
    title: 'Okay… jokes aside, 7yeti. ❤️',
    paragraphs: [
      'Maroumti,',
      "I'm genuinely sorry.",
      "I know I hurt you, and I don't want to hide behind jokes, cute words, or this little website.",
      "I know that saying 'sorry' is easy. What matters is understanding what I did, taking responsibility for it, and showing you that I can do better.",
      'You mean so much to me, Rouhy. More than I sometimes know how to explain.',
      "You're my 3omri, my 7yeti, my Nour 3iniya… and the last thing I ever want is to be the reason you feel hurt or unappreciated.",
      "I'm not perfect. I'm going to make mistakes because unfortunately… I'm still me. 😭😂",
      'But I promise that I want to learn, grow, and become a better man and a better boyfriend for you.',
      "I don't expect one cute website to magically fix everything. I just wanted to make something that comes from my heart and reminds you how important you are to me.",
      "I'm sorry, Habibti. ❤️ And I love you. More than you know.",
    ],
    personalApologyHeading: 'Make this part personal ❤️',
    // ✍️ EDIT THIS WITH YOUR OWN WORDS ABOUT WHAT HAPPENED:
    personalApologyText:
      '[PERSONAL APOLOGY — REPLACE THIS TEXT: Maroumti, write your specific heartfelt apology here about what happened, how much you care about her feelings, and your promise to make it up to her.]',
    photoUrl: PHOTO_PLACEHOLDERS.COUPLE_PHOTO,
  },

  // Screen 5: 8 Interactive Love Cards
  loveCards: [
    {
      id: 1,
      icon: '❤️',
      title: 'Your smile',
      message: 'Saghrounti, your smile can completely change my mood.',
    },
    {
      id: 2,
      icon: '👀',
      title: 'Your eyes',
      message: '3iniya… your eyes are honestly unfair.',
    },
    {
      id: 3,
      icon: '😂',
      title: 'Your laugh',
      message: 'One of my favorite sounds in this world.',
    },
    {
      id: 4,
      icon: '🫶',
      title: 'Your personality',
      message: 'The beautiful person behind the face I fell in love with.',
    },
    {
      id: 5,
      icon: '😈',
      title: 'Your attitude',
      message: 'Sometimes annoying.',
      delayedPunchline: 'Still adorable. 😂❤️',
    },
    {
      id: 6,
      icon: '💕',
      title: 'The little things',
      message: 'The little things you do without realizing how cute they are.',
    },
    {
      id: 7,
      icon: '🥹',
      title: 'The way you make me feel',
      message: 'You somehow make ordinary moments feel special.',
    },
    {
      id: 8,
      icon: '❤️',
      title: 'You',
      message: 'Basically… I love you.',
    },
  ],

  // Screen 6: Romantic Memory Timeline
  memories: [
    {
      id: 1,
      icon: '📍',
      title: 'The first time we met',
      date: 'A day that changed everything',
      description:
        '[YOUR TEXT HERE: Write about how you felt when you first saw her, what she was wearing, or that first conversation.]',
      imagePlaceholderId: 'PHOTO_01',
      customImageUrl: PHOTO_PLACEHOLDERS.PHOTO_01,
    },
    {
      id: 2,
      icon: '❤️',
      title: 'The moment I realized I liked you',
      date: 'That exact second',
      description:
        '[YOUR TEXT HERE: Describe the sudden realization that she was becoming the most special person in your life.]',
      imagePlaceholderId: 'PHOTO_02',
      customImageUrl: PHOTO_PLACEHOLDERS.PHOTO_02,
    },
    {
      id: 3,
      icon: '😂',
      title: 'Our funniest memory',
      date: 'Uncontrollable laughter',
      description:
        '[YOUR TEXT HERE: Recall that hilarious inside joke or chaotic moment where you both couldn’t stop laughing.]',
      imagePlaceholderId: 'PHOTO_03',
      customImageUrl: PHOTO_PLACEHOLDERS.PHOTO_03,
    },
    {
      id: 4,
      icon: '🥰',
      title: 'One of my favorite moments with you',
      date: 'Pure comfort and peace',
      description:
        '[YOUR TEXT HERE: Describe a quiet, cozy afternoon, a sweet late-night phone call, or a special date.]',
      imagePlaceholderId: 'PHOTO_04',
      customImageUrl: PHOTO_PLACEHOLDERS.PHOTO_04,
    },
    {
      id: 5,
      icon: '📸',
      title: 'A picture I’ll always love',
      date: 'Frozen in time',
      description:
        '[YOUR TEXT HERE: A snapshot of her smiling or a sweet moment you keep saved in your favorites.]',
      imagePlaceholderId: 'PHOTO_05',
      customImageUrl: PHOTO_PLACEHOLDERS.PHOTO_05,
    },
    {
      id: 6,
      icon: '💕',
      title: 'A memory I’ll never forget',
      date: 'Forever in my heart',
      description:
        '[YOUR TEXT HERE: That one conversation or milestone that proved how deeply you love your Princessti.]',
    },
  ],

  // Screen 9: Cute Flirty Bubbles
  flirtyBubbles: [
    'Pretty.',
    'Beautiful.',
    'Gorgeous.',
    'My favorite girl.',
    'My weakness.',
    'My happiness.',
    'My person. ❤️',
    'Still giving me butterflies.',
    'Dangerously cute.',
    '10/10 would fall for you again.',
  ],

  // Screen 10: Little Surprises / Easter Eggs
  surpriseEggs: [
    {
      id: 'egg-heart',
      label: 'A tiny glowing heart',
      icon: '💖',
      title: 'Secret message unlocked ❤️',
      message: 'Just in case you forgot… I adore you, Habibti.',
      hint: 'Tap me ✨',
    },
    {
      id: 'egg-dont-click',
      label: 'Don’t click 👀',
      icon: '👀',
      title: 'Why did you click it? 😂',
      message: 'Come here, Baby. ❤️',
      hint: 'Curiosity wins every time',
    },
    {
      id: 'egg-dont-touch',
      label: 'Definitely don’t touch this',
      icon: '🚫',
      title: 'Okay… you really don’t listen, do you? 😂',
      message: 'That’s cute.',
      hint: 'Rebel energy',
    },
  ],

  // Screen 11: Final Romantic Love Letter
  finalLetter: {
    salutation: 'Maroumti…',
    paragraphs: [
      'Rouh 9albi,',
      'If I could go back and change the moment that made you upset, I would.',
      'But since I can’t, the only thing I can do is learn from it, apologize sincerely, and show you through my actions that you matter to me.',
      'Thank you for being you.',
      'Thank you for the laughs.',
      'Thank you for the memories.',
      'Thank you for the little moments.',
      'And thank you for all the love you’ve given me.',
      'I’m sorry, 7yeti. ❤️',
      'I don’t want us to stay upset with each other.',
      'I want to make you smile again.',
      'I want to create more beautiful memories with you.',
      'I want to keep learning how to love you better.',
      'I love you, Habibti. ❤️',
    ],
    signOff: 'Always your stupid boyfriend.',
    photoUrl: PHOTO_PLACEHOLDERS.MY_PHOTO,
  },

  // Screen 12 & 13: Final Celebration & Surprise
  finalCelebration: {
    headline: 'SHE FORGAVE ME!!! 😭❤️',
    subheadline: 'CASE CLOSED.',
    verdict: 'SENTENCE:',
    sentences: [
      { icon: '❤️', text: 'One date.' },
      { icon: '🫂', text: 'Unlimited hugs.' },
      { icon: '😂', text: 'An unreasonable amount of annoying you.' },
      { icon: '❤️', text: 'And a lifetime of loving my Saghrounti.' },
    ],
    closingText: 'See you soon, beautiful. ❤️',
    // 🎁 REPLACABLE HIDDEN SURPRISE MESSAGE:
    finalSurpriseMessage: 'P.S. Check your phone. 👀',
  },

  audio: {
    enabledByDefault: false,
  },
};
