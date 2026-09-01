import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';
import { LoveConfig } from '../../types';

interface Screen4RealApologyProps {
  config: LoveConfig;
  onNext: () => void;
}

export const Screen4RealApology: React.FC<Screen4RealApologyProps> = ({
  config,
  onNext,
}) => {
  const { apology } = config;
  const [imgError, setImgError] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // The exact Arabic text the user wants
  const arabicHeading = "مرومتي،";
  const arabicText = `نعرف اللي غلطت، واللي يوجعني أكثر حاجة هو إنو أنا كنت السبب في إنك تتقلق وتتوجع، في الوقت اللي المفروض نكون أنا أكثر واحد يخليك تحس بالراحة، بالأمان وبالحب.

سامحني يا روحي، وسامحني أكثر خاطر في عوض ما نحاول نصلح اللي صار ونرضيك ونفهمك، قعدت نقول في كلام غالط وما يتقالش، وزدت دخلتها في حيط أكثر. إنتِ كنت تستحق مني الحنية، التفهّم، ونطلب منك السماح من قلبي… موش كلام يزيد يوجعك.

ما نحبّش حتى نتخيل اللي مرومتي الصغرونة رقدت وهي موجوعة في جرتي. والله لو كان نجم نرجع للحظة هاذي، نبدل برشا حاجات. أما توا اللي صار صار، واللي نجم نعمله توا هو إنو نتعلم من غلطتي ونوريك بالأفعال، موش بالكلام برك، اللي نجم نكون خير.

إنتِ تستحق واحد يسمعك، يفهمك، يحس بيك، وما يخليكش تحس وحدك وقت اللي تكوني موجوعة. وأنا نحب نكون الشخص هذا ليك.

نحبك مرومتي، وما نحبش الاعتذار هذا يكون كلام وبرا. نحبك تشوفو في تصرّفاتي، في الطريقة اللي نسمعك بيها، في الطريقة اللي نحاول نفهمك بيها، وفي كل مرة نختارك فيها… حتى وقت اللي الأمور ما تكونش ساهلة.

سامحني يا روحي. ❤️

إنتِ أغلى عليّا برشا من أي كلام نجم نقولو.`;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-3xl mx-auto z-10">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0205] via-[#1a040a] to-[#0d0205] -z-10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#d4af37]/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full relative z-10"
      >
        {/* Subtle heart emblem */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#1a040a]/80 border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]/20" />
          </div>
        </div>

        {/* English / French apology paragraphs */}
        <div className="space-y-6 text-center max-w-2xl mx-auto">
          {apology.paragraphs.map((paragraph, index) => {
            const isFirst = index === 0;
            const isLast = index === apology.paragraphs.length - 1;
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
                className={`serif text-[#f5f2ed] leading-relaxed ${
                  isFirst
                    ? 'text-2xl sm:text-3xl md:text-4xl italic'
                    : isLast
                    ? 'text-xl sm:text-2xl text-[#d4af37] italic'
                    : 'text-base sm:text-lg'
                }`}
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* Image between English and Arabic */}
        {!imgError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center my-8"
          >
            <div className="relative max-w-xs w-full rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10">
              <img
                src="/assets/images/apology.jpg"
                alt="A heartfelt moment"
                className="w-full h-auto object-cover aspect-[4/3]"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0205]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}

        {/* Divider with heart */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 my-6 max-w-xs mx-auto"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]/20" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </motion.div>

        {/* Tunisian Arabic section - exact text from user */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-center max-w-xl mx-auto space-y-3"
        >
          <h3 className="serif text-xl sm:text-2xl text-[#d4af37] italic">
            {arabicHeading}
          </h3>
          <div dir="rtl" className="space-y-4">
            {arabicText.split('\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="serif text-lg sm:text-xl text-[#f5f2ed] leading-relaxed"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Quiet CTA */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-10 flex justify-center"
            >
              <button
                onClick={() => {
                  sound.playSoftClick?.();
                  onNext();
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f5f2ed]/10 backdrop-blur-sm border border-[#d4af37]/30 hover:bg-[#f5f2ed]/20 transition-all duration-300 text-[#f5f2ed] text-xs uppercase tracking-[0.2em] font-sans"
              >
                <span>Let me tell you one more thing</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};