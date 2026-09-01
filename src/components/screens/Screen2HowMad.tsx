import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

interface Screen2HowMadProps {
  onNext: () => void;
}

type ChoiceId = 'not-mad' | 'little-mad' | 'very-mad' | 'finished' | null;

export const Screen2HowMad: React.FC<Screen2HowMadProps> = ({ onNext }) => {
  const [selectedChoice, setSelectedChoice] = useState<ChoiceId>(null);

  const handleSelect = (choice: ChoiceId) => {
    sound.playSoftClick();
    setSelectedChoice(choice);
  };

  const handleContinue = () => {
    sound.playSoftClick();
    onNext();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-2xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="w-full text-center"
      >
        {/* -----------------------------------------------------------
            ROMANTIC HEART
        ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.15,
            duration: 0.7,
            type: 'spring',
            damping: 12,
          }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-16 h-16 rounded-full bg-[#1a040a]/80 border border-[#d4af37]/40 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.18)]">
            <Heart
              className="w-7 h-7 text-[#d4af37]"
              fill="rgba(212,175,55,0.18)"
            />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.65, 0.25],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-2 rounded-full border border-[#d4af37]/25"
            />
          </div>
        </motion.div>

        {/* -----------------------------------------------------------
            PHASE LABEL
        ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#d4af37]/30 text-[#d4af37] text-[10px] sans font-medium tracking-[0.25em] uppercase">
            <Sparkles className="w-3 h-3" />
            Just between us • Phase 02
          </span>
        </motion.div>

        {/* -----------------------------------------------------------
            MAIN TITLE
        ------------------------------------------------------------ */}
        <div className="mt-5 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="serif text-4xl sm:text-5xl md:text-6xl text-[#f5f2ed] font-normal italic leading-tight"
          >
            Maroumti…
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="serif text-xl sm:text-2xl text-[#d4af37] italic leading-relaxed"
          >
            Before I ask you for anything…
            <br />
            I want to ask you one honest question.
          </motion.p>
        </div>

        {/* -----------------------------------------------------------
            EMOTIONAL INTRODUCTION
        ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-7 p-6 sm:p-8 rounded-2xl glass border border-white/10 shadow-2xl"
        >
          <p className="serif text-xl sm:text-2xl text-[#f5f2ed] italic leading-relaxed">
            “I know yesterday wasn't my best moment.”
          </p>

          <p className="sans text-xs sm:text-sm text-white/55 leading-relaxed mt-4 max-w-lg mx-auto">
            I said things and acted in a way I shouldn't have.
            <br />
            And before I try to explain myself,
            I want to understand how you feel.
          </p>

          <div className="mt-5 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

          <p className="serif text-xl sm:text-2xl text-[#d4af37] italic mt-5">
            So, Habibti…
          </p>

          <p className="serif text-2xl sm:text-3xl text-[#f5f2ed] italic mt-2 leading-relaxed">
            How did I leave your heart feeling? 💔
          </p>
        </motion.div>

        {/* -----------------------------------------------------------
            CHOICES
        ------------------------------------------------------------ */}
        {!selectedChoice && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="grid grid-cols-1 gap-3 pt-6"
          >
            {/* OPTION 1 */}
            <motion.button
              whileHover={{
                scale: 1.015,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => handleSelect('not-mad')}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl glass border border-white/10 hover:border-[#d4af37]/50 text-left transition-all duration-300"
            >
              <span className="text-2xl p-3 rounded-xl bg-white/5 border border-white/10">
                🤍
              </span>

              <div className="flex-1">
                <p className="sans font-semibold text-sm sm:text-base text-[#f5f2ed] group-hover:text-[#d4af37] transition-colors">
                  “I'm okay, Rouh 9albi.”
                </p>

                <p className="sans text-xs text-white/45 mt-1">
                  Maybe your heart isn't angry anymore.
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-[#d4af37] transition-colors" />
            </motion.button>

            {/* OPTION 2 */}
            <motion.button
              whileHover={{
                scale: 1.015,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => handleSelect('little-mad')}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl glass border border-white/10 hover:border-[#d4af37]/50 text-left transition-all duration-300"
            >
              <span className="text-2xl p-3 rounded-xl bg-white/5 border border-white/10">
                🥺
              </span>

              <div className="flex-1">
                <p className="sans font-semibold text-sm sm:text-base text-[#f5f2ed] group-hover:text-[#d4af37] transition-colors">
                  “A little hurt.”
                </p>

                <p className="sans text-xs text-white/45 mt-1">
                  I still have some making-up to do.
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-[#d4af37] transition-colors" />
            </motion.button>

            {/* OPTION 3 */}
            <motion.button
              whileHover={{
                scale: 1.015,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => handleSelect('very-mad')}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl glass border border-white/10 hover:border-[#d4af37]/50 text-left transition-all duration-300"
            >
              <span className="text-2xl p-3 rounded-xl bg-white/5 border border-white/10">
                💔
              </span>

              <div className="flex-1">
                <p className="sans font-semibold text-sm sm:text-base text-[#f5f2ed] group-hover:text-[#d4af37] transition-colors">
                  “You really hurt me.”
                </p>

                <p className="sans text-xs text-white/45 mt-1">
                  I understand why you feel that way.
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-[#d4af37] transition-colors" />
            </motion.button>

            {/* OPTION 4 */}
            <motion.button
              whileHover={{
                scale: 1.015,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => handleSelect('finished')}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#24030b] to-[#0d0205] border border-[#d4af37]/30 hover:border-[#d4af37] text-left transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
            >
              <span className="text-2xl p-3 rounded-xl bg-[#800020]/20 border border-[#d4af37]/20">
                💔
              </span>

              <div className="flex-1">
                <p className="sans font-semibold text-sm sm:text-base text-[#f5f2ed] group-hover:text-[#d4af37] transition-colors">
                  “I'm really disappointed.”
                </p>

                <p className="sans text-xs text-[#d4af37]/65 mt-1">
                  Then I need to listen carefully.
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-[#d4af37]/45 group-hover:text-[#d4af37] transition-colors" />
            </motion.button>
          </motion.div>
        )}

        {/* -----------------------------------------------------------
            RESPONSES
        ------------------------------------------------------------ */}
        <AnimatePresence mode="wait">
          {/* ---------------------------------------------------------
              NOT MAD
          ---------------------------------------------------------- */}
          {selectedChoice === 'not-mad' && (
            <motion.div
              key="not-mad"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-7 sm:p-9 rounded-2xl glass border border-[#d4af37]/30 space-y-5"
            >
              <Heart
                className="w-7 h-7 text-[#d4af37] mx-auto"
                fill="rgba(212,175,55,0.15)"
              />

              <p className="serif text-2xl sm:text-3xl text-[#f5f2ed] italic leading-relaxed">
                “Thank you for telling me that.”
              </p>

              <p className="sans text-sm text-white/60 leading-relaxed">
                But even if you're okay now,
                I don't want to pretend yesterday was okay.
                <br />
                You deserved better from me.
              </p>

              <p className="serif text-xl text-[#d4af37] italic">
                And I want to tell you why I'm truly sorry.
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-full bg-[#f5f2ed] text-[#0d0205] hover:bg-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Hear my apology ❤️</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ---------------------------------------------------------
              LITTLE HURT
          ---------------------------------------------------------- */}
          {selectedChoice === 'little-mad' && (
            <motion.div
              key="little-mad"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-7 sm:p-9 rounded-2xl glass border border-[#d4af37]/30 space-y-5"
            >
              <div className="text-3xl">🥺</div>

              <p className="serif text-2xl sm:text-3xl text-[#f5f2ed] italic leading-relaxed">
                “Then I still owe you a proper apology.”
              </p>

              <p className="sans text-sm text-white/60 leading-relaxed">
                I'm not going to rush you into forgetting it.
                <br />
                I want you to know that I understand your feelings.
              </p>

              <p className="serif text-xl text-[#d4af37] italic leading-relaxed">
                Because your heart matters to me.
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-full bg-[#f5f2ed] text-[#0d0205] hover:bg-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Let me make it right 🤍</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ---------------------------------------------------------
              VERY HURT
          ---------------------------------------------------------- */}
          {selectedChoice === 'very-mad' && (
            <motion.div
              key="very-mad"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-7 sm:p-9 rounded-2xl bg-[#140207] border border-[#d4af37]/30 space-y-5"
            >
              <div className="text-3xl">💔</div>

              <p className="serif text-3xl sm:text-4xl text-[#f5f2ed] italic">
                “I hear you, Habibti.”
              </p>

              <p className="sans text-sm text-white/65 leading-relaxed">
                I'm not going to argue with your feelings.
                <br />
                I'm not going to tell you that you're overreacting.
                <br />
                And I'm not going to make excuses.
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

              <p className="serif text-xl sm:text-2xl text-[#d4af37] italic leading-relaxed">
                “If I hurt you,
                I need to take responsibility for it.”
              </p>

              <p className="sans text-xs text-white/45 leading-relaxed">
                You deserve to feel respected,
                especially by the person who says he loves you.
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-full bg-[#f5f2ed] text-[#0d0205] hover:bg-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                <span>Let me apologize properly ❤️</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ---------------------------------------------------------
              DISAPPOINTED
          ---------------------------------------------------------- */}
          {selectedChoice === 'finished' && (
            <motion.div
              key="finished"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{ duration: 0.6 }}
              className="mt-6 p-7 sm:p-9 rounded-2xl bg-[#120207] border border-[#d4af37]/40 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex justify-center"
              >
                <Heart
                  className="w-9 h-9 text-[#d4af37]"
                  fill="rgba(212,175,55,0.12)"
                />
              </motion.div>

              <p className="serif text-3xl sm:text-4xl text-[#f5f2ed] italic leading-tight">
                “Then I need to listen.”
              </p>

              <p className="sans text-sm text-white/60 leading-relaxed">
                No excuses.
                <br />
                No pretending it didn't happen.
                <br />
                No asking you to forget it immediately.
              </p>

              <div className="py-5 border-y border-white/10">
                <p className="serif text-xl sm:text-2xl text-[#d4af37] italic leading-relaxed">
                  “You are the woman I love.”
                </p>

                <p className="serif text-xl sm:text-2xl text-[#f5f2ed] italic leading-relaxed mt-2">
                  “And you deserve my respect,
                  even when things aren't perfect.”
                </p>
              </div>

              <p className="sans text-xs text-white/45 leading-relaxed">
                I can't change what happened yesterday.
                <br />
                But I can choose how I treat you from this moment forward.
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-full bg-[#f5f2ed] text-[#0d0205] hover:bg-[#d4af37] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(212,175,55,0.25)]"
              >
                <span>Let me speak from my heart 🤍</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -----------------------------------------------------------
            BOTTOM WHISPER
        ------------------------------------------------------------ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 text-[10px] sans uppercase tracking-[0.22em] text-white/25"
        >
          I want to understand before I ask to be understood.
        </motion.p>
      </motion.div>
    </div>
  );
};