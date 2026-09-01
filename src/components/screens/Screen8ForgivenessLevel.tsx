import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';
import { Unlock, Heart, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';

interface Screen8ForgivenessLevelProps {
  onNext: () => void;
}

const steps = [
  {
    val: 12,
    text: 'Initializing forgiveness protocol…',
  },
  {
    val: 27,
    text: 'Detecting boyfriend regret…',
  },
  {
    val: 43,
    text: 'Measuring how much Maram is missed…',
  },
  {
    val: 61,
    text: 'Scanning her heart for remaining anger…',
  },
  {
    val: 78,
    text: 'Searching for traces of “mazel metghacha”…',
  },
  {
    val: 91,
    text: 'Calculating the power of love…',
  },
  {
    val: 99,
    text: 'Critical level detected…',
  },
];

export const Screen8ForgivenessLevel: React.FC<
  Screen8ForgivenessLevelProps
> = ({ onNext }) => {
  const [percent, setPercent] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>(
    'Starting emotional analysis…'
  );

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Initial state
    timers.push(
      setTimeout(() => {
        sound.playSoftClick();
        setPercent(12);
        setStatusText('Initializing forgiveness protocol…');
      }, 600)
    );

    // Progress steps
    steps.slice(1).forEach((step, index) => {
      timers.push(
        setTimeout(() => {
          sound.playSoftClick();
          setPercent(step.val);
          setStatusText(step.text);
        }, 1500 + index * 900)
      );
    });

    // Warning
    timers.push(
      setTimeout(() => {
        setShowWarning(true);
        setStatusText('System requires additional emotional processing…');
      }, 7200)
    );

    // Final unlock
    timers.push(
      setTimeout(() => {
        sound.playCelebrationFanfare();
        setPercent(100);
        setShowWarning(false);
        setStatusText('Forgiveness protocol completed.');
        setIsUnlocked(true);
      }, 9000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-lg mx-auto z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full space-y-8"
      >
        {/* Header */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#d4af37]/30 text-[#d4af37] text-[10px] sans font-medium tracking-[0.25em] uppercase">
            <Heart className="w-3 h-3 fill-[#d4af37]" />
            <span>Telemetry • Phase 08</span>
          </span>

          <h2 className="serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ed] font-normal italic">
            Forgiveness Calibration
          </h2>

          <p className="serif text-lg sm:text-xl text-[#d4af37] italic">
            Please remain calm… the system is judging your love. 😂
          </p>
        </div>

        {/* Main Card */}
        <div className="glass rounded-2xl p-6 sm:p-8 space-y-7 shadow-2xl border border-white/10">
          
          {/* Metric Header */}
          <div className="flex items-center justify-between text-xs font-mono text-[#d4af37] uppercase tracking-widest">
            <span>LOVE_METRIC_INDEX</span>

            <motion.span
              key={percent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold serif text-[#f5f2ed] italic"
            >
              {percent}%
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 rounded-full bg-[#0d0205] p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#800020] via-[#d4af37] to-[#f9e29c] shadow-[0_0_18px_rgba(212,175,55,0.6)]"
              animate={{
                width: `${percent}%`,
              }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
              }}
            />

            {/* Moving shine */}
            {percent > 0 && percent < 100 && (
              <motion.div
                className="absolute top-0 bottom-0 w-16 bg-white/20 blur-md"
                animate={{
                  x: ['-50px', '500px'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}
          </div>

          {/* Status */}
          <AnimatePresence mode="wait">
            {!isUnlocked && (
              <motion.div
                key={statusText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="min-h-[24px]"
              >
                <p className="sans text-xs text-white/60 uppercase tracking-wider">
                  {statusText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Warning */}
          <AnimatePresence>
            {showWarning && !isUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.03, 1],
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  scale: {
                    repeat: Infinity,
                    duration: 1.2,
                  },
                }}
                className="p-5 rounded-xl bg-[#800020]/20 border border-[#d4af37]/50 space-y-3"
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#800020]/40 border border-[#d4af37]/40 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-[#d4af37]" />
                  </div>
                </div>

                <p className="serif text-2xl text-[#d4af37] italic">
                  WARNING ⚠️
                </p>

                <p className="sans text-xs text-white/70 uppercase tracking-wider leading-relaxed">
                  Forgiveness system overloaded by excessive love.
                </p>

                <p className="serif text-lg text-[#f5f2ed] italic">
                  Please wait… ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Result */}
          <AnimatePresence>
            {isUnlocked && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  stiffness: 150,
                }}
                className="space-y-5 pt-2"
              >
                {/* Celebration */}
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, -3, 3, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="flex justify-center"
                >
                  <div className="relative w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/50 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.3)]">
                    <Unlock className="w-7 h-7 text-[#d4af37]" />

                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 rounded-full border border-[#d4af37]/40"
                    />
                  </div>
                </motion.div>

                {/* Result Card */}
                <div className="p-6 rounded-xl bg-white/5 border border-[#d4af37]/50 shadow-[0_0_35px_rgba(212,175,55,0.2)] space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />

                    <p className="sans font-semibold text-xs text-[#d4af37] tracking-[0.25em] uppercase">
                      100% — APPROVED
                    </p>

                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  </div>

                  <p className="serif text-3xl text-[#f5f2ed] italic">
                    Forgiveness Granted ❤️
                  </p>

                  <p className="sans text-xs text-white/70 uppercase tracking-wider leading-relaxed">
                    Case status: CLOSED.
                    <br />
                    Boyfriend officially forgiven.
                  </p>

                  <div className="pt-2">
                    <p className="serif text-lg text-[#d4af37] italic">
                      Further punishment may be negotiated later. 😂❤️
                    </p>
                  </div>
                </div>

                {/* Small hearts */}
                <div className="flex justify-center gap-3 text-[#d4af37]">
                  {['❤️', '✨', '❤️', '✨', '❤️'].map((item, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1.4,
                        delay: index * 0.12,
                        repeat: Infinity,
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    sound.playSoftClick();
                    onNext();
                  }}
                  className="w-full py-4.5 rounded-full bg-[#f5f2ed] text-[#0d0205] hover:bg-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>Enter Romance Mode 😌❤️</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};