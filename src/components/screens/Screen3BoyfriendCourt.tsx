import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Screen3BoyfriendCourtProps {
  onNext: () => void;
}

const apologySteps = [
  {
    id: 0,
    text: "I need to tell you something.",
    subtext: "",
  },
  {
    id: 1,
    text: "I know I hurt you.",
    subtext: "",
  },
  {
    id: 2,
    text: "You went to sleep upset because of me, and instead of making things better, I said things that made you feel even worse.",
    subtext: "",
  },
  {
    id: 3,
    text: "I'm sorry.",
    subtext: "",
  },
  {
    id: 4,
    text: "You didn't need more words from me. You needed reassurance, comfort, and to know that I understood how much I had hurt you.",
    subtext: "",
  },
  {
    id: 5,
    text: "I should have been there for you.",
    subtext: "",
  },
  {
    id: 6,
    text: "I love you. And I'm truly sorry.",
    subtext: "",
  },
];

export const Screen3BoyfriendCourt: React.FC<Screen3BoyfriendCourtProps> = ({
  onNext,
}) => {
  const [step, setStep] = useState<number>(0);
  const totalSteps = apologySteps.length;

  const handleContinue = () => {
    sound.playSoftClick?.();
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const isFinalStep = step === totalSteps - 1;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-2xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full"
      >
        {/* Decorative heart with subtle pulse */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-[#1a040a]/80 border border-[#d4af37]/40 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <Heart className="w-7 h-7 text-[#d4af37] fill-[#d4af37]/20" />
          </div>
        </motion.div>

        {/* Apology card */}
        <div className="relative glass rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden">
          {/* Subtle golden glow behind */}
          <motion.div
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative space-y-6">
            {/* Title with step indicator */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] sans uppercase tracking-[0.2em] text-[#d4af37]">
                From my heart
              </span>
              <span className="text-[10px] sans uppercase tracking-[0.2em] text-white/40">
                {step + 1} / {totalSteps}
              </span>
            </div>

            {/* Apology text – progressively revealed */}
            <div className="space-y-4 min-h-[240px] flex flex-col justify-center">
              {apologySteps.map((item, index) => (
                <AnimatePresence key={item.id}>
                  {index <= step && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: 'easeOut',
                        delay: index === step ? 0.2 : 0,
                      }}
                      className={`serif text-xl sm:text-2xl md:text-3xl text-[#f5f2ed] leading-relaxed ${
                        index === step ? 'text-[#d4af37]' : 'text-white/70'
                      }`}
                    >
                      {item.text}
                      {item.subtext && (
                        <span className="block text-sm sm:text-base text-white/50 mt-2 sans not-italic">
                          {item.subtext}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Divider line */}
            {step >= 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"
              />
            )}

            {/* Final message (extra) if final step */}
            {isFinalStep && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center space-y-2"
              >
                <p className="serif text-lg sm:text-xl text-[#f5f2ed] italic">
                  “I can't change what happened tonight.
                  <br />
                  But I can acknowledge it, learn from it,
                  <br />
                  and choose to treat your heart more carefully.”
                </p>
                <p className="serif text-xl text-[#d4af37] italic">
                  I love you, Saghrounti. I'm truly sorry. ❤️
                </p>
              </motion.div>
            )}

            {/* Continue button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 40px rgba(212,175,55,0.25)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#f5f2ed] to-[#e8dccc] text-[#0d0205] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group"
            >
              <span>
                {isFinalStep
                  ? 'I want to make it right'
                  : 'Continue →'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#800020] group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Small footer whisper */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-center text-[10px] sans uppercase tracking-[0.3em] text-white/20 mt-6"
        >
          Your heart is safe here
        </motion.p>
      </motion.div>
    </div>
  );
};