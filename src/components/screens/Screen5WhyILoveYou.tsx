import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoveCardItem } from '../../types';
import { sound } from '../../utils/audio';
import { Heart, ArrowRight } from 'lucide-react';

interface Screen5WhyILoveYouProps {
  cards: LoveCardItem[];
  onNext: () => void;
}

export const Screen5WhyILoveYou: React.FC<Screen5WhyILoveYouProps> = ({ cards, onNext }) => {
  const [openedCardIds, setOpenedCardIds] = useState<number[]>([]);
  const [delayedPunchlineRevealed, setDelayedPunchlineRevealed] = useState<boolean>(false);

  const handleCardClick = (id: number) => {
    // Safe sound calls – fallback to soft click if card flip unavailable
    try {
      (sound as any).playCardFlip?.();
    } catch {
      sound.playSoftClick?.();
    }

    if (!openedCardIds.includes(id)) {
      const newOpened = [...openedCardIds, id];
      setOpenedCardIds(newOpened);

      // Check if this card has a delayed punchline (e.g., id === 5)
      const card = cards.find(c => c.id === id);
      if (card?.delayedPunchline) {
        setTimeout(() => {
          setDelayedPunchlineRevealed(true);
        }, 1200);
      }

      if (newOpened.length === cards.length) {
        setTimeout(() => {
          try {
            sound.playCelebrationFanfare?.();
          } catch {
            // ignore
          }
        }, 400);
      }
    }
  };

  const allCardsOpened = openedCardIds.length === cards.length;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-4xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full space-y-8 text-center"
      >
        {/* Header – more intimate and romantic */}
        <div className="space-y-3">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#1a040a]/80 border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]/20" />
            </div>
          </div>

          <h2 className="serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ed] font-normal italic leading-tight">
            A few reasons why I love you…
          </h2>

          <p className="serif text-xl sm:text-2xl text-[#d4af37] italic">
            Every single one of them is true. ❤️
          </p>

          <p className="sans text-[11px] uppercase tracking-widest text-white/40">
            {openedCardIds.length === cards.length
              ? 'You’ve seen them all… and I still mean every word.'
              : `Tap each memory to uncover a little piece of my heart • ${openedCardIds.length}/${cards.length}`}
          </p>
        </div>

        {/* Cards Grid – redesigned as elegant notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {cards.map((card) => {
            const isOpened = openedCardIds.includes(card.id);
            const hasDelayedPunchline = !!card.delayedPunchline;

            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: isOpened ? 1.02 : 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(card.id)}
                className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-300 min-h-[180px] flex flex-col justify-between text-left overflow-hidden border ${
                  isOpened
                    ? 'bg-gradient-to-br from-[#800020]/30 to-[#0d0205] border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                    : 'glass hover:border-[#d4af37]/40 hover:bg-white/[0.04] border-white/10'
                }`}
              >
                {/* Subtle glow when opened */}
                {isOpened && (
                  <div className="absolute -inset-1 bg-[#d4af37]/5 blur-xl pointer-events-none" />
                )}

                {/* Icon and status */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-2xl">{card.icon}</span>
                  {isOpened ? (
                    <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]/40" />
                  ) : (
                    <span className="text-[9px] uppercase sans tracking-[0.2em] text-white/30 font-medium">
                      tap
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 mt-2">
                  <h3 className="sans font-semibold text-sm sm:text-base text-[#f5f2ed] mb-1">
                    {card.title}
                  </h3>

                  {isOpened ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      <p className="serif text-base sm:text-lg text-[#f5f2ed]/90 italic leading-snug">
                        {card.message}
                      </p>

                      {hasDelayedPunchline && delayedPunchlineRevealed && card.delayedPunchline && (
                        <motion.p
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="serif text-base text-[#d4af37] font-semibold pt-1 italic"
                        >
                          {card.delayedPunchline}
                        </motion.p>
                      )}
                    </motion.div>
                  ) : (
                    <p className="sans text-[11px] text-white/30 tracking-wider">
                      A little secret…
                    </p>
                  )}
                </div>

                {/* Decorative bottom line */}
                {isOpened && (
                  <div className="absolute bottom-3 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Completion – intimate and warm */}
        <AnimatePresence>
          {allCardsOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="p-7 sm:p-9 rounded-3xl glass border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex justify-center gap-2 text-2xl">
                <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/40" />
                <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/60" />
                <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]" />
              </div>

              <p className="serif text-2xl sm:text-3xl text-[#f5f2ed] italic leading-relaxed">
                And that’s still only the beginning…
              </p>

              <p className="sans text-sm text-white/60 leading-relaxed max-w-sm mx-auto">
                There are a thousand more reasons, but I didn't want to keep you here all night. 😉
              </p>

              <button
                onClick={() => {
                  sound.playSoftClick?.();
                  onNext();
                }}
                className="mt-2 w-full py-4 rounded-full bg-[#f5f2ed] text-[#0d0205] hover:bg-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl group"
              >
                <span>Show me our story →</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip/Continue early – only if at least 4 opened, but make it feel less like a skip */}
        {!allCardsOpened && openedCardIds.length >= 4 && (
          <div className="pt-4">
            <button
              onClick={() => {
                sound.playSoftClick?.();
                onNext();
              }}
              className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[10px] sans uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all border border-white/10"
            >
              I already know I love you → continue
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};