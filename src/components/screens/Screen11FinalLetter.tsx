import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LoveConfig } from '../../types';
import { sound } from '../../utils/audio';
import { Heart, ArrowRight } from 'lucide-react';

interface Screen11FinalLetterProps {
  config: LoveConfig;
  onForgive: () => void;
}

export const Screen11FinalLetter: React.FC<Screen11FinalLetterProps> = ({
  config,
  onForgive,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { finalLetter } = config;

  const handleContinueClick = () => {
    if (isProcessing) return;

    sound.playSoftClick?.();
    setIsProcessing(true);

    setTimeout(() => {
      onForgive();
    }, 700);
  };

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-5 sm:px-6 py-14 overflow-hidden">
      {/* ========================================================= */}
      {/* ATMOSPHERE */}
      {/* ========================================================= */}

      <div className="absolute inset-0 bg-[#0b0205]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[90vw] h-[70vw] max-w-[700px] max-h-[550px] rounded-full bg-[#800020]/15 blur-[100px]" />

        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[80vw] h-[45vw] max-w-[600px] rounded-full bg-[#d4af37]/[0.035] blur-[90px]" />
      </motion.div>

      {/* Very subtle drifting lights */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[12%] left-[12%] w-1 h-1 rounded-full bg-[#d4af37]"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[28%] right-[14%] w-1 h-1 rounded-full bg-[#f5f2ed]"
      />

      <motion.div
        animate={{
          y: [0, -12, 0],
          opacity: [0.08, 0.2, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-[25%] left-[18%] w-1 h-1 rounded-full bg-[#d4af37]"
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-xl"
      >
        {/* ======================================================= */}
        {/* INTRO */}
        {/* ======================================================= */}

        <header className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: 'easeOut',
            }}
            className="relative mx-auto mb-7 w-14 h-14 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-[#800020]/30 blur-xl"
            />

            <div className="relative w-12 h-12 rounded-full border border-[#d4af37]/30 bg-[#16060a]/80 flex items-center justify-center">
              <Heart
                className="w-5 h-5 text-[#d4af37]"
                fill="rgba(212,175,55,0.15)"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mb-4 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#d4af37]/70 font-sans"
          >
            Just from my heart
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="serif text-4xl sm:text-5xl md:text-6xl text-[#f5f2ed] font-normal italic leading-[1.05]"
          >
            {finalLetter.salutation}
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mt-6"
          />
        </header>

        {/* ======================================================= */}
        {/* PHOTO */}
        {/* ======================================================= */}

        {!imgError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.7,
              duration: 1,
            }}
            className="relative mx-auto mb-10 max-w-[360px]"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-[#800020]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#120407] shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
              <img
                src="/assets/images/final_lettre.jpg"
                alt="A special memory"
                onError={() => setImgError(true)}
                className="block w-full h-auto max-h-[62vh] object-contain brightness-[0.92]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0205]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#0b0205]/55 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <Heart
                  className="w-3.5 h-3.5 text-[#d4af37]"
                  fill="rgba(212,175,55,0.25)"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================= */}
        {/* LETTER */}
        {/* ======================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            duration: 1,
          }}
          className="relative"
        >
          {/* Paper-like inner glow */}
          <div className="absolute inset-0 rounded-[2rem] bg-[#d4af37]/[0.015] blur-xl" />

          <div className="relative rounded-[2rem] border border-white/[0.07] bg-white/[0.025] px-6 py-8 sm:px-10 sm:py-11 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <div className="space-y-5">
              {finalLetter.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={`${idx}-${paragraph}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.05 + idx * 0.08,
                    duration: 0.65,
                    ease: 'easeOut',
                  }}
                  className={[
                    'serif leading-relaxed',
                    idx === 0
                      ? 'text-2xl sm:text-3xl text-[#f5f2ed] italic mb-2'
                      : idx === finalLetter.paragraphs.length - 1
                      ? 'text-xl sm:text-2xl text-[#d4af37] italic pt-2'
                      : 'text-lg sm:text-xl text-[#f5f2ed]/78',
                  ].join(' ')}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* =================================================== */}
            {/* SIGNATURE */}
            {/* =================================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.8,
                duration: 0.8,
              }}
              className="mt-9 pt-7 border-t border-white/[0.07] text-right"
            >
              <p className="serif text-xl sm:text-2xl text-[#d4af37] italic">
                {finalLetter.signOff}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ======================================================= */}
        {/* THE IMPORTANT PART */}
        {/* ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.1,
            duration: 0.9,
          }}
          className="text-center mt-10 sm:mt-12 px-3"
        >
          <p className="serif text-xl sm:text-2xl text-[#f5f2ed]/80 italic leading-relaxed">
            You don't have to rush your heart.
          </p>

          <p className="mt-2 text-sm sm:text-base text-white/40 font-sans leading-relaxed">
            I just wanted you to hear this from me.
          </p>
        </motion.div>

        {/* ======================================================= */}
        {/* FINAL TRANSITION */}
        {/* ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.5,
            duration: 1,
          }}
          className="mt-9 sm:mt-11"
        >
          <motion.button
            whileHover={{
              y: -2,
              backgroundColor: 'rgba(245,242,237,0.97)',
            }}
            whileTap={{ scale: 0.985 }}
            disabled={isProcessing}
            onClick={handleContinueClick}
            className="group relative w-full overflow-hidden rounded-full bg-[#f5f2ed] text-[#0b0205] py-4 sm:py-5 px-6 shadow-[0_15px_50px_rgba(212,175,55,0.14)] transition-all duration-500 disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.22em] font-sans font-medium">
              <span>
                {isProcessing
                  ? 'One more moment…'
                  : 'When you’re ready, come with me'}
              </span>

              {!isProcessing && (
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </span>

            {/* Soft gold sweep */}
            <motion.div
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeInOut',
              }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent skew-x-[-18deg]"
            />
          </motion.button>
        </motion.div>

        {/* ======================================================= */}
        {/* FOOTER */}
        {/* ======================================================= */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-center mt-7 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/20 font-sans"
        >
          No pressure. Just me, loving you honestly.
        </motion.p>
      </motion.main>
    </div>
  );
};

export default Screen11FinalLetter;