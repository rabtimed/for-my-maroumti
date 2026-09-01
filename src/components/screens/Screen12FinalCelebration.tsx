import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { LoveConfig } from '../../types';
import { sound } from '../../utils/audio';
import { Heart, RotateCcw } from 'lucide-react';

interface Screen12FinalCelebrationProps {
  config: LoveConfig;
  onRestart: () => void;
}

export const Screen12FinalCelebration: React.FC<
  Screen12FinalCelebrationProps
> = ({ config, onRestart }) => {
  const { finalCelebration } = config;

  useEffect(() => {
    // A quiet ending deserves a quiet sound.
    try {
      sound.playCelebrationFanfare?.();
    } catch {
      // Ignore audio failures.
    }
  }, []);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#080305] text-[#f5f2ed]">
      {/* ============================================================
          ATMOSPHERE
      ============================================================ */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(128,0,32,0.24),transparent_42%),linear-gradient(180deg,#080305_0%,#120509_48%,#080305_100%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.16, 0.24, 0.16],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[700px] max-h-[700px] rounded-full bg-[#d4af37]/10 blur-[100px]"
        />
      </motion.div>

      {/* Tiny drifting lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: '12%', top: '22%', delay: 0 },
          { left: '82%', top: '18%', delay: 1.8 },
          { left: '22%', top: '68%', delay: 3.2 },
          { left: '88%', top: '72%', delay: 2.4 },
          { left: '50%', top: '12%', delay: 4 },
          { left: '72%', top: '52%', delay: 1.2 },
        ].map((particle, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: [0, 0.35, 0],
              y: [-5, -25, -45],
            }}
            transition={{
              duration: 5 + index * 0.4,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute w-1 h-1 rounded-full bg-[#d4af37]"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <main className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-2xl mx-auto text-center"
        >
          {/* Small opening line */}

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="text-[9px] sm:text-[10px] uppercase sans text-[#d4af37]/70 mb-8"
          >
            Before you leave this little world I made for you
          </motion.p>

          {/* ========================================================
              HEART
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.7,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center mb-9"
          >
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Outer glow */}

              <motion.div
                animate={{
                  scale: [1, 1.16, 1],
                  opacity: [0.18, 0.05, 0.18],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full bg-[#d4af37] blur-2xl"
              />

              {/* Ring */}

              <div className="absolute inset-2 rounded-full border border-[#d4af37]/25" />

              {/* Heart */}

              <motion.div
                animate={{
                  scale: [1, 1.045, 1],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart
                  className="relative w-9 h-9 text-[#d4af37]"
                  strokeWidth={1.2}
                  fill="rgba(212,175,55,0.12)"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================
              MAIN TITLE
          ======================================================== */}

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 1.2,
              ease: 'easeOut',
            }}
            className="serif text-[2.65rem] sm:text-5xl md:text-6xl font-normal italic leading-[1.05] tracking-tight"
          >
            I hope you felt
            <br />
            <span className="text-[#d4af37]">how much I love you.</span>
          </motion.h1>

          {/* ========================================================
              MAIN LETTER
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.45,
              duration: 1.2,
            }}
            className="mt-10 sm:mt-12"
          >
            <div className="mx-auto max-w-xl">
              <p className="serif text-xl sm:text-2xl text-[#f5f2ed] italic leading-[1.8]">
                Maroumti…
              </p>

              <div className="mt-7 space-y-5 text-[15px] sm:text-base text-white/65 leading-[1.85] sans">
                <p>
                  I know this little website cannot undo a moment that hurt
                  you. And I never wanted it to.
                </p>

                <p>
                  I made it because sometimes I know what I feel for you
                  better than I know how to say it.
                </p>

                <p>
                  I love you. And I care about your heart enough to know that
                  loving you also means listening to you, respecting you,
                  understanding you, and being willing to become better when
                  I get something wrong.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              GOLD DIVIDER
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: 2.15,
              duration: 1,
            }}
            className="flex items-center justify-center gap-4 my-11"
          >
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#d4af37]/30" />

            <Heart
              className="w-3 h-3 text-[#d4af37]/70"
              fill="rgba(212,175,55,0.15)"
              strokeWidth={1}
            />

            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#d4af37]/30" />
          </motion.div>

          {/* ========================================================
              THE PROMISE
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.35,
              duration: 1.1,
            }}
            className="px-2"
          >
            <p className="serif text-[1.65rem] sm:text-3xl text-[#f5f2ed] italic leading-[1.45]">
              I don't promise that I'll never make a mistake.
            </p>

            <p className="serif text-[1.65rem] sm:text-3xl text-[#d4af37] italic leading-[1.45] mt-3">
              I promise I'll never stop learning how to love you better.
            </p>
          </motion.div>

          {/* ========================================================
              FINAL LOVE
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 3,
              duration: 1.4,
            }}
            className="mt-12"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/25 sans mb-5">
              And if you remember only one thing
            </p>

            <p className="serif text-2xl sm:text-3xl md:text-4xl text-[#f5f2ed] italic leading-relaxed">
              You are not someone I want to
              <br className="hidden sm:block" />
              <span className="text-[#d4af37]">take for granted.</span>
            </p>

            <p className="serif text-lg sm:text-xl text-white/55 italic mt-5">
              You are someone I want to keep choosing.
            </p>
          </motion.div>

          {/* ========================================================
              PERSONAL SIGNATURE
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.7,
              duration: 1,
            }}
            className="mt-12"
          >
            <p className="serif text-lg text-[#f5f2ed]/75 italic">
              I love you, Habibti.
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25 sans">
              Always yours
            </p>
          </motion.div>

          {/* ========================================================
              RESTART — intentionally quiet
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 4.4,
              duration: 1,
            }}
            className="mt-14"
          >
            <button
              type="button"
              onClick={() => {
                try {
                  sound.playSoftClick?.();
                } catch {
                  // Ignore audio failures.
                }

                onRestart();
              }}
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/25
                hover:text-white/55
                transition-colors
                duration-500
              "
            >
              <RotateCcw
                className="
                  w-3 h-3
                  transition-transform
                  duration-500
                  group-hover:-rotate-45
                "
                strokeWidth={1.3}
              />

              <span>Read it again</span>
            </button>
          </motion.div>

          {/* ========================================================
              FOOTER
          ======================================================== */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 5,
              duration: 1,
            }}
            className="mt-8 text-[8px] uppercase tracking-[0.3em] text-white/10 sans"
          >
            Made for one girl. Only one.
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
};

export default Screen12FinalCelebration;
