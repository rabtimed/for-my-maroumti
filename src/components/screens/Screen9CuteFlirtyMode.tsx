import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

export interface Screen9CuteFlirtyModeProps {
  bubbles: string[];
  onNext: () => void;
}

type MessagePosition =
  | 'left'
  | 'center'
  | 'right'
  | 'lower-left'
  | 'lower-right';

const positions: MessagePosition[] = [
  'left',
  'right',
  'center',
  'lower-right',
  'left',
  'center',
];

const positionClasses: Record<MessagePosition, string> = {
  left: 'items-start justify-start text-left',
  center: 'items-center justify-center text-center',
  right: 'items-end justify-end text-right',
  'lower-left': 'items-end justify-start text-left',
  'lower-right': 'items-end justify-end text-right',
};

const textWidths: Record<MessagePosition, string> = {
  left: 'max-w-[86%] sm:max-w-[620px]',
  center: 'max-w-[92%] sm:max-w-[700px]',
  right: 'max-w-[86%] sm:max-w-[620px]',
  'lower-left': 'max-w-[88%] sm:max-w-[650px]',
  'lower-right': 'max-w-[88%] sm:max-w-[650px]',
};

export const Screen9CuteFlirtyMode: React.FC<
  Screen9CuteFlirtyModeProps
> = ({ bubbles, onNext }) => {
  const messages = useMemo(
    () => bubbles.filter((message) => message?.trim()),
    [bubbles]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      setStarted(true);
    }, 500);

    return () => window.clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started || completed || currentIndex >= messages.length) {
      return;
    }

    /*
     * Faster than the previous version.
     * The intention is that she feels like the thought is unfolding,
     * rather than waiting for a slideshow.
     */
    const delay =
      currentIndex === 0
        ? 900
        : currentIndex === messages.length - 1
          ? 2600
          : 1850;

    const timer = window.setTimeout(() => {
      setCurrentIndex((previous) => previous + 1);

      try {
        sound.playSoftClick?.();
      } catch {
        // Sound is optional.
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [started, completed, currentIndex, messages.length]);

  useEffect(() => {
    if (
      started &&
      messages.length > 0 &&
      currentIndex >= messages.length &&
      !completed
    ) {
      const timer = window.setTimeout(() => {
        setCompleted(true);

        try {
          sound.playCelebrationFanfare?.();
        } catch {
          // Sound is optional.
        }
      }, 1100);

      return () => window.clearTimeout(timer);
    }
  }, [started, currentIndex, messages.length, completed]);

  const handleSkipToEnd = () => {
    if (completed) {
      onNext();
      return;
    }

    setCurrentIndex(messages.length);

    try {
      sound.playSoftClick?.();
    } catch {
      // Sound is optional.
    }
  };

  const position =
    positions[Math.min(currentIndex, positions.length - 1)];

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#070305] text-[#f7f1e8]">
      {/* =========================================================
          BACKGROUND
         ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(108,15,42,0.26),transparent_55%),linear-gradient(135deg,#070305_0%,#14040a_48%,#080204_100%)]" />

        <motion.div
          animate={{
            x: ['-50%', '-44%', '-53%', '-50%'],
            y: ['-50%', '-46%', '-54%', '-50%'],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-1/2 h-[75vw] w-[75vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8e163e]/10 blur-[110px]"
        />

        <motion.div
          animate={{
            opacity: completed ? 0.32 : 0.12,
            scale: completed ? 1.15 : 1,
          }}
          transition={{ duration: 2 }}
          className="absolute left-1/2 top-[42%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37] blur-[120px]"
        />

        {/* Grain-like atmospheric dots */}
        {[...Array(12)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#d4af37]"
            style={{
              left: `${8 + ((index * 37) % 84)}%`,
              top: `${10 + ((index * 53) % 78)}%`,
            }}
            animate={{
              opacity: [0, 0.25, 0],
              y: [0, -18, -35],
            }}
            transition={{
              duration: 5 + (index % 4),
              repeat: Infinity,
              delay: index * 0.35,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Large blurred light streaks */}
        <motion.div
          animate={{
            opacity: [0.02, 0.07, 0.02],
            x: [-80, 60, -80],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-[20%] top-[20%] h-[1px] w-[60%] rotate-[-24deg] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent blur-[1px]"
        />

        <motion.div
          animate={{
            opacity: [0.02, 0.05, 0.02],
            x: [80, -60, 80],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[25%] left-[15%] h-[1px] w-[70%] rotate-[18deg] bg-gradient-to-r from-transparent via-[#8e163e] to-transparent"
        />
      </div>

      {/* =========================================================
          TOP LABEL
         ========================================================= */}
      <AnimatePresence>
        {!completed && started && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="absolute left-0 right-0 top-7 z-30 flex justify-center sm:top-9"
          >
            <p className="font-sans text-[8px] uppercase tracking-[0.45em] text-white/25">
              Things I notice about you
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          INTRO
         ========================================================= */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.1 }}
                className="mx-auto mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#35101b]/30"
              >
                <Heart
                  className="h-4 w-4 text-[#d4af37]"
                  strokeWidth={1}
                />
              </motion.div>

              <p className="font-serif text-2xl italic text-[#eee5da] sm:text-4xl">
                I don't say these things enough.
              </p>

              <p className="mt-3 font-sans text-[8px] uppercase tracking-[0.35em] text-white/25">
                So listen for a minute
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN CONFESSION
         ========================================================= */}
      {!completed && started && (
        <section className="relative z-10 flex min-h-[100svh] items-center px-5 py-20 sm:px-10">
          <div className="relative mx-auto h-[600px] w-full max-w-5xl sm:h-[650px]">
            {/* Decorative center point */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 hidden h-px w-[45%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent sm:block"
            />

            <AnimatePresence mode="wait">
              {currentIndex > 0 && currentIndex <= messages.length && (
                <motion.div
                  key={currentIndex - 1}
                  initial={{
                    opacity: 0,
                    y: 35,
                    scale: 0.97,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 0.22,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-1/2 top-[43%] hidden w-full -translate-x-1/2 text-center sm:block"
                >
                  <p className="mx-auto max-w-xl font-serif text-lg italic leading-relaxed text-white">
                    {messages[currentIndex - 1]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {currentIndex < messages.length && (
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.96,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                    scale: 1.02,
                    filter: 'blur(5px)',
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute inset-0 flex ${positionClasses[position]}`}
                >
                  <div className={`${textWidths[position]} relative`}>
                    {/* Tiny index */}
                    <div
                      className={`mb-5 flex items-center gap-3 ${
                        position === 'right' ||
                        position === 'lower-right'
                          ? 'justify-end'
                          : position === 'center'
                            ? 'justify-center'
                            : 'justify-start'
                      }`}
                    >
                      <span className="font-sans text-[8px] tracking-[0.3em] text-[#d4af37]/35">
                        {String(currentIndex + 1).padStart(2, '0')}
                      </span>

                      <span className="h-px w-10 bg-[#d4af37]/15" />
                    </div>

                    <p className="font-serif text-[1.85rem] italic leading-[1.42] text-[#f7f0e7] sm:text-4xl md:text-[3.15rem]">
                      {messages[currentIndex]}
                    </p>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '42px' }}
                      transition={{ delay: 0.35, duration: 0.7 }}
                      className={`mt-6 h-px bg-[#d4af37]/35 ${
                        position === 'right' ||
                        position === 'lower-right'
                          ? 'ml-auto'
                          : position === 'center'
                            ? 'mx-auto'
                            : ''
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiet skip */}
            {messages.length > 2 && (
              <button
                type="button"
                onClick={handleSkipToEnd}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[8px] uppercase tracking-[0.3em] text-white/15 transition-colors hover:text-white/40 focus:outline-none"
              >
                read the rest
              </button>
            )}
          </div>
        </section>
      )}

      {/* =========================================================
          FINAL STATE
         ========================================================= */}
      <AnimatePresence>
        {completed && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-16"
          >
            <div className="w-full max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mx-auto mb-9 flex h-16 w-16 items-center justify-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.22, 1],
                    opacity: [0.2, 0.05, 0.2],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-[-20px] rounded-full bg-[#8e163e] blur-2xl"
                />

                <Heart
                  className="relative h-6 w-6 fill-[#d4af37]/15 text-[#d4af37]"
                  strokeWidth={1}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-sans text-[8px] uppercase tracking-[0.45em] text-[#d4af37]/55"
              >
                And that's the part I struggle to explain
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-6 font-serif text-[2rem] italic leading-[1.25] text-[#f7f0e7] sm:text-4xl md:text-5xl"
              >
                You have this ridiculous way
                <br className="hidden sm:block" />
                of getting under my skin.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mx-auto mt-8 max-w-xl space-y-5"
              >
                <p className="font-serif text-lg italic leading-8 text-white/65 sm:text-xl">
                  I can be having the most ordinary day, then I see you,
                  hear your voice, or catch that look you give me…
                </p>

                <p className="font-serif text-xl italic leading-8 text-[#e1ca72] sm:text-2xl">
                  and suddenly I just want to be near you.
                </p>

                <p className="font-serif text-lg italic leading-8 text-white/65 sm:text-xl">
                  Close enough to make you smile.
                  <br />
                  Close enough to steal a kiss.
                  <br />
                  Close enough that neither of us needs to say much.
                </p>

                <p className="pt-2 font-serif text-xl italic leading-8 text-[#f5eee4] sm:text-2xl">
                  That's probably my favorite thing about loving you.
                  <br />
                  Somehow, even after everything,
                  <br />
                  I still want more of <span className="text-[#e1ca72]">us</span>.
                </p>
              </motion.div>

              <motion.button
                type="button"
                onClick={() => {
                  try {
                    sound.playSoftClick?.();
                  } catch {
                    // Optional.
                  }

                  onNext();
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.9 }}
                className="group mt-12 inline-flex min-h-11 items-center gap-3 border-b border-[#d4af37]/30 pb-2 font-sans text-[9px] uppercase tracking-[0.32em] text-[#eadcae]/75 transition-all duration-500 hover:border-[#d4af37]/70 hover:text-[#fff3c9] focus:outline-none focus-visible:border-[#d4af37]"
              >
                <span>There's something else I want to tell you</span>

                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Screen9CuteFlirtyMode;
