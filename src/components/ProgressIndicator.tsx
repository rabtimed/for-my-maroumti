import React from 'react';
import { ScreenId } from '../types';

interface ProgressIndicatorProps {
  currentScreen: ScreenId;
  allScreens: ScreenId[];
  onSelectScreen?: (screen: ScreenId) => void;
}

const PHASE_NAMES: Record<ScreenId, string> = {
  'opening': 'Phase 01: The Mystery',
  'how-mad': 'Phase 02: Risk Assessment',
  'courtroom': 'Phase 03: The Boyfriend Court',
  'real-apology': 'Phase 04: The Sincere Part',
  'why-i-love-you': 'Phase 05: The Evidence',
  'our-story': 'Phase 06: Chapter By Chapter',
  'forgiveness-test': 'Phase 07: The Assessment',
  'forgiveness-level': 'Phase 08: Diagnostics',
  'cute-flirty': 'Phase 09: Flirty Mode',
  'little-surprises': 'Phase 10: Hidden Secrets',
  'final-letter': 'Phase 11: The Final Letter',
  'forgiveness-screen': 'Phase 12: The Verdict',
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentScreen,
  allScreens,
  onSelectScreen,
}) => {
  const currentIndex = allScreens.indexOf(currentScreen);

  // Hidden on opening or celebration for clean cinematic presentation
  if (currentScreen === 'opening' || currentScreen === 'forgiveness-screen') {
    return null;
  }

  return (
    <nav
      aria-label="Story progression"
      className="flex items-center gap-3 sm:gap-6"
    >
      {/* Progress Dots with active pill */}
      <div className="flex items-center gap-1.5">
        {allScreens.map((screen, idx) => {
          const isCurrent = idx === currentIndex;
          const isCompleted = idx < currentIndex;

          return (
            <button
              key={screen}
              onClick={() => onSelectScreen && onSelectScreen(screen)}
              disabled={!onSelectScreen}
              aria-label={`Go to ${PHASE_NAMES[screen] || `step ${idx + 1}`}`}
              className="group focus:outline-none transition-all duration-300"
            >
              {isCurrent ? (
                <div className="w-5 sm:w-6 h-1.5 rounded-full bg-[#800020] border border-[#d4af37]/50 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              ) : isCompleted ? (
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60 group-hover:bg-[#d4af37] transition-colors" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {/* Phase Label Pill */}
      <span className="hidden md:inline-block text-[10px] uppercase sans tracking-[0.2em] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/80 font-medium">
        {PHASE_NAMES[currentScreen] || `Issue ${currentIndex + 1}`}
      </span>
    </nav>
  );
};

