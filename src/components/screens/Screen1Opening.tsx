import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen1OpeningProps {
  onNext: () => void;
}

export const Screen1Opening: React.FC<Screen1OpeningProps> = ({ onNext }) => {
  // Stage determines which text is visible
  const [stage, setStage] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    // Fixed interval for a steady, cinematic rhythm
    const interval = 1800; // ms between each new line

    const timers = [
      setTimeout(() => setStage(1), interval * 0.5),   // ~0.9s
      setTimeout(() => setStage(2), interval * 1.2),   // ~2.2s
      setTimeout(() => setStage(3), interval * 2.0),   // ~3.6s
      setTimeout(() => setStage(4), interval * 2.8),   // ~5.0s
      setTimeout(() => setStage(5), interval * 3.6),   // ~6.5s
      setTimeout(() => setStage(6), interval * 4.4),   // ~7.9s
      setTimeout(() => setStage(7), interval * 5.2),   // ~9.4s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleOpen = () => {
    sound.playEnvelopeSwoosh(); // soft sound
    sound.startMusic();         // starts the romantic score

    setHasInteracted(true);

    // Give the transition a moment to breathe before moving on
    setTimeout(() => {
      onNext();
    }, 1600);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-12 text-center max-w-2xl mx-auto z-10 select-none overflow-hidden">

      {/* ------------------------------------------------------------
          BACKGROUND ATMOSPHERE – deep, warm, cinematic
      ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-to-b from-[#0d0205] via-[#1a040a] to-[#0d0205]"
      />

      {/* Soft golden glow – constant and breathing */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating particles – very subtle, like dust in candlelight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: (i - 6) * 30, y: (i % 3 - 1) * 40 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [0, -80 - i * 5, -160 - i * 8],
              x: (i - 6) * 15 + Math.sin(i) * 20,
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            className="absolute left-1/2 bottom-0 text-[10px] text-[#d4af37]"
          >
            {['✦', '·', '•', '·', '✦', '·', '•', '·', '✦', '·', '•', '·'][i]}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!hasInteracted ? (
          /* =========================================================
             INTRO – slow reveal of text
          ========================================================= */
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center w-full"
          >
            {/* Central glowing heart – grows and fades as text appears */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: stage < 2 ? 1 : 0.7,
                opacity: stage < 2 ? 1 : 0.3,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1a040a] to-[#2d0712] border border-[#d4af37]/40 shadow-[0_0_60px_rgba(128,0,32,0.3)] flex items-center justify-center">
                <Heart className="w-10 h-10 text-[#d4af37] fill-[#d4af37]/20" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-full border border-[#d4af37]/20"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-8 rounded-full bg-[#d4af37]/5 blur-xl"
              />
            </motion.div>

            {/* Text container – each line fades in and stays */}
            <div className="space-y-6 min-h-[400px] flex flex-col justify-center items-center w-full max-w-lg">

              {/* Stage 1 */}
              {stage >= 1 && (
                <motion.h1
                  initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="serif text-5xl sm:text-6xl md:text-7xl text-[#f5f2ed] tracking-tight font-normal italic leading-none"
                >
                  Maroumti…
                </motion.h1>
              )}

              {/* Stage 2 */}
              {stage >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="serif text-xl sm:text-2xl text-[#d4af37] italic leading-relaxed"
                >
                  Before I say anything else,
                  <br />
                  I need you to know something.
                </motion.p>
              )}

              {/* Stage 3 */}
              {stage >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="serif text-2xl sm:text-3xl text-[#f5f2ed] italic leading-relaxed"
                >
                  Yesterday, I hurt the woman I love.
                </motion.p>
              )}

              {/* Stage 4 */}
              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-md"
                >
                  <p>
                    I didn't treat your heart with the care,
                    <br />
                    patience, and respect it deserves.
                  </p>
                </motion.div>
              )}

              {/* Stage 5 */}
              {stage >= 5 && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="serif text-2xl sm:text-3xl text-[#d4af37] italic"
                >
                  And I'm truly sorry.
                </motion.p>
              )}

              {/* Stage 6 – longer explanation */}
              {stage >= 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="sans text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-md space-y-3"
                >
                  <p>
                    I'm not asking you to forget.
                    <br />
                    I'm not asking you to stop being hurt.
                  </p>
                  <p className="text-[#f5f2ed]">
                    I just want to listen to your heart.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Stage 7 – CTA button */}
            {stage >= 7 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'backOut' }}
                className="mt-10 w-full flex justify-center"
              >
                <button
                  onClick={handleOpen}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-full bg-gradient-to-r from-[#f5f2ed] to-[#e8dccc] text-[#0d0205] font-sans font-bold text-xs uppercase tracking-[0.25em] shadow-[0_10px_40px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95"
                >
                  <span>Let me speak from my heart</span>
                  <ArrowRight className="w-4 h-4 text-[#800020] group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            )}

            {/* Subtle footer – appears after stage 7 */}
            {stage >= 7 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                className="mt-6 text-[10px] sans uppercase tracking-[0.3em] text-white/20"
              >
                Your heart is safe here.
              </motion.p>
            )}

          </motion.div>
        ) : (
          /* =========================================================
             TRANSITION – cinematic bridge to Screen2
          ========================================================= */
          <motion.div
            key="transition"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col items-center justify-center w-full min-h-[400px]"
          >
            {/* Floating hearts – soft, coordinated rise */}
            <div className="absolute inset-0 pointer-events-none">
              {['❤️', '💕', '✨', '🌹', '💖', '✨', '❤️'].map((emoji, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, x: (i - 3) * 50, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], y: -200, x: (i - 3) * 70, scale: [0.5, 1.2, 0.6] }}
                  transition={{
                    duration: 2.6,
                    delay: 0.2 + i * 0.12,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 bottom-10 text-3xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            {/* Central message */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-[#1a040a]/80 border border-[#d4af37]/40 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.15)]">
                <Heart className="w-9 h-9 text-[#d4af37] fill-[#d4af37]/30" />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
                className="serif text-2xl sm:text-3xl text-[#f5f2ed] italic mt-6"
              >
                “I'm ready to listen.”
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.6, duration: 1, ease: 'easeOut' }}
                className="h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1, ease: 'easeOut' }}
                className="sans text-xs text-white/50 tracking-widest mt-6"
              >
                Tell me how you feel, Habibti.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};