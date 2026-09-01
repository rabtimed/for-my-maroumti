import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { SurpriseEgg } from '../../types';
import { sound } from '../../utils/audio';

interface Screen10LittleSurprisesProps {
  eggs: SurpriseEgg[];
  onNext: () => void;
}

type Mood = 'soft' | 'warm' | 'deep' | 'flirty';

const moods: Mood[] = ['soft', 'soft', 'warm', 'deep', 'flirty', 'flirty'];

const moodCopy: Record<Mood, string> = {
  soft: 'things I catch myself thinking about',
  warm: 'things I probably should tell you more often',
  deep: 'things I mean more than you know',
  flirty: 'and a few things I still cannot behave about',
};

export const Screen10LittleSurprises: React.FC<
  Screen10LittleSurprisesProps
> = ({ eggs, onNext }) => {
  const notes = useMemo(() => eggs.filter(Boolean), [eggs]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroVisible(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notes.length) {
      setFinished(true);
      return;
    }

    setVisited((previous) =>
      previous.includes(activeIndex)
        ? previous
        : [...previous, activeIndex]
    );
  }, [activeIndex, notes.length]);

  const activeNote = notes[activeIndex];
  const mood = moods[Math.min(activeIndex, moods.length - 1)];

  const goNext = () => {
    if (activeIndex < notes.length - 1) {
      setActiveIndex((index) => index + 1);

      try {
        sound.playSoftClick?.();
      } catch {
        // Optional.
      }

      return;
    }

    setFinished(true);

    try {
      sound.playCelebrationFanfare?.();
    } catch {
      // Optional.
    }
  };

  const goToNote = (index: number) => {
    if (index === activeIndex) return;

    setActiveIndex(index);

    try {
      sound.playSoftClick?.();
    } catch {
      // Optional.
    }
  };

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#060304] text-[#f7f0e7]">
      {/* =========================================================
          LIVING BACKGROUND
         ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background:
              mood === 'soft'
                ? 'radial-gradient(circle at 30% 40%, rgba(91,18,42,0.22), transparent 52%)'
                : mood === 'warm'
                  ? 'radial-gradient(circle at 65% 42%, rgba(132,40,48,0.24), transparent 52%)'
                  : mood === 'deep'
                    ? 'radial-gradient(circle at 50% 55%, rgba(111,23,51,0.3), transparent 56%)'
                    : 'radial-gradient(circle at 50% 42%, rgba(150,44,55,0.34), transparent 56%)',
          }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0"
        />

        <motion.div
          animate={{
            x: activeIndex % 2 === 0 ? '-7%' : '7%',
            y: activeIndex % 3 === 0 ? '-5%' : '5%',
            opacity: finished ? 0.35 : 0.2,
          }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-1/2 top-1/2 h-[75vw] w-[75vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b21e4b]/10 blur-[120px]"
        />

        <motion.div
          animate={{
            scale: finished ? 1.2 : 1,
            opacity: finished ? 0.16 : 0.05,
          }}
          transition={{ duration: 2 }}
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37] blur-[100px]"
        />

        {/* Fine vertical light */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#d4af37]/[0.035] to-transparent" />

        {/* Floating dust */}
        {[...Array(10)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#e1c66b]"
            style={{
              left: `${5 + ((index * 41) % 90)}%`,
              top: `${20 + ((index * 29) % 65)}%`,
            }}
            animate={{
              opacity: [0, 0.2, 0],
              y: [-5, -35, -60],
              x: [0, index % 2 ? 8 : -8, 0],
            }}
            transition={{
              duration: 6 + (index % 3),
              delay: index * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.97,
              filter: 'blur(8px)',
            }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-[100svh]"
          >
            {/* =====================================================
                INTRO OVERLAY
               ===================================================== */}
            <AnimatePresence>
              {introVisible && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.03,
                    filter: 'blur(6px)',
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-50 flex min-h-[100svh] items-center justify-center bg-[#060304]"
                >
                  <div className="px-6 text-center">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#3a0c19]/30"
                    >
                      <Heart
                        className="h-5 w-5 text-[#d4af37]"
                        strokeWidth={1}
                      />
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.8 }}
                      className="font-serif text-2xl italic text-[#f5ede3] sm:text-4xl"
                    >
                      I saved a few thoughts for you.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.65, duration: 0.8 }}
                      className="mt-4 font-sans text-[8px] uppercase tracking-[0.4em] text-white/25"
                    >
                      Take your time
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =====================================================
                TOP
               ===================================================== */}
            <header className="mx-auto flex w-full max-w-5xl items-start justify-between px-5 py-7 sm:px-10 sm:py-9">
              <div>
                <p className="font-sans text-[8px] uppercase tracking-[0.4em] text-[#d4af37]/50">
                  For you
                </p>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={mood}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                    transition={{ duration: 0.45 }}
                    className="mt-2 max-w-[220px] font-serif text-sm italic text-white/35 sm:text-base"
                  >
                    {moodCopy[mood]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="text-right">
                <p className="font-sans text-[8px] tracking-[0.3em] text-white/20">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(notes.length).padStart(2, '0')}
                </p>
              </div>
            </header>

            {/* =====================================================
                MAIN THOUGHT
               ===================================================== */}
            <section className="flex min-h-[calc(100svh-110px)] items-center justify-center px-5 pb-20 pt-8 sm:px-10 sm:pb-24">
              <div className="w-full max-w-5xl">
                <AnimatePresence mode="wait">
                  {activeNote && (
                    <motion.div
                      key={`${activeNote.id}-${activeIndex}`}
                      initial={{
                        opacity: 0,
                        y: 30,
                        filter: 'blur(10px)',
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        y: -25,
                        filter: 'blur(8px)',
                      }}
                      transition={{
                        duration: 0.85,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="grid gap-10 sm:grid-cols-[120px_1fr] sm:gap-14"
                    >
                      {/* Left editorial marker */}
                      <div className="hidden sm:block">
                        <div className="flex flex-col items-start gap-4">
                          <span className="font-sans text-[8px] uppercase tracking-[0.35em] text-[#d4af37]/50">
                            {mood}
                          </span>

                          <div className="h-24 w-px bg-gradient-to-b from-[#d4af37]/30 to-transparent" />

                          <span className="font-serif text-5xl italic text-white/[0.07]">
                            {String(activeIndex + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="max-w-3xl">
                        {/* Icon as tiny personal signature */}
                        <div className="mb-7 flex items-center gap-4">
                          <span className="text-xl opacity-70">
                            {activeNote.icon}
                          </span>

                          <span className="h-px w-12 bg-[#d4af37]/20" />

                          <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-white/25">
                            {activeNote.title}
                          </span>
                        </div>

                        <h1 className="font-serif text-[2.25rem] font-normal italic leading-[1.2] text-[#f7f0e7] sm:text-5xl md:text-[4rem]">
                          {activeNote.message}
                        </h1>

                        {/* A separate emotional afterthought */}
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={`aside-${activeIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mt-8 max-w-xl font-serif text-base italic leading-8 text-white/35 sm:text-lg"
                          >
                            {activeIndex === 0
                              ? 'These are the little things I notice without even trying.'
                              : activeIndex === 1
                                ? 'You probably have no idea how often you make me smile without knowing it.'
                                : activeIndex === 2
                                  ? 'I want you to know that your feelings are never small to me.'
                                  : activeIndex === 3
                                    ? 'And yes, sometimes I look at you for a second too long. I am not sorry about that part.'
                                    : 'There are some things about you that I could probably spend all night talking about.'
                            }
                          </motion.p>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="mt-12 flex items-center gap-6">
                          <button
                            type="button"
                            onClick={goNext}
                            className="group flex min-h-11 items-center gap-4 font-sans text-[9px] uppercase tracking-[0.3em] text-[#e8dcae]/75 transition-colors hover:text-[#fff4cf] focus:outline-none"
                          >
                            <span>
                              {activeIndex === notes.length - 1
                                ? 'That is what I really want you to know'
                                : 'There is more'}
                            </span>

                            <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                              →
                            </span>
                          </button>

                          {notes.length > 1 && (
                            <div className="hidden h-px w-20 bg-white/[0.07] sm:block">
                              <motion.div
                                className="h-full bg-[#d4af37]/30"
                                animate={{
                                  width: `${
                                    ((activeIndex + 1) / notes.length) * 100
                                  }%`,
                                }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* =================================================
                    NOTE SELECTOR — intentionally understated
                   ================================================= */}
                {notes.length > 1 && (
                  <div className="mt-14 flex max-w-3xl flex-wrap gap-x-5 gap-y-3 sm:ml-[174px]">
                    {notes.map((note, index) => {
                      const active = index === activeIndex;
                      const seen = visited.includes(index);

                      return (
                        <button
                          key={`${note.id}-nav`}
                          type="button"
                          onClick={() => goToNote(index)}
                          aria-label={`Go to ${note.title}`}
                          className="group flex items-center gap-2 focus:outline-none"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                              active
                                ? 'bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.45)]'
                                : seen
                                  ? 'bg-[#d4af37]/30'
                                  : 'bg-white/10'
                            }`}
                          />

                          <span
                            className={`font-sans text-[7px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                              active
                                ? 'text-[#d4af37]/70'
                                : 'text-white/15 group-hover:text-white/35'
                            }`}
                          >
                            {note.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        ) : (
          /* =======================================================
             FINAL TRANSFORMATION
             ======================================================= */
          <motion.section
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-14"
          >
            <div className="relative w-full max-w-3xl text-center">
              {/* Heartbeat atmosphere */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.06, 0.12, 0.06],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8e163e] blur-[90px]"
              />

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mx-auto mb-9 flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#310916]/50"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{
                    duration: 2.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Heart
                    className="h-6 w-6 fill-[#d4af37]/10 text-[#d4af37]"
                    strokeWidth={1}
                  />
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-sans text-[8px] uppercase tracking-[0.45em] text-[#d4af37]/55"
              >
                So here is the truth
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 1 }}
                className="mt-6 font-serif text-[2.15rem] italic leading-[1.18] text-[#f7f0e7] sm:text-4xl md:text-5xl"
              >
                I don't just love having you in my life.
                <br />
                <span className="text-[#dfc86f]">
                  I love the life that feels possible with you.
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 1 }}
                className="mx-auto mt-9 max-w-xl space-y-6"
              >
                <p className="font-serif text-lg italic leading-[1.8] text-white/65 sm:text-xl">
                  I want the stupid conversations that somehow last an hour.
                  The quiet nights. The random plans. The little looks across
                  a room.
                </p>

                <p className="font-serif text-xl italic leading-[1.75] text-[#eee5db] sm:text-2xl">
                  I want to know you when you're happy,
                  <br />
                  when you're tired,
                  <br />
                  when something is bothering you,
                  <br />
                  and when you don't have the words for it yet.
                </p>

                <p className="font-serif text-lg italic leading-[1.8] text-white/65 sm:text-xl">
                  I want to be the person you can come back to.
                  <br />
                  Not because I'm perfect.
                  <br />
                  But because I keep choosing to understand you,
                  and keep choosing us.
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9, duration: 1 }}
                  className="pt-2 font-serif text-xl italic leading-[1.7] text-[#dfc86f] sm:text-2xl"
                >
                  And somewhere in between all of that serious stuff…
                  <br />
                  I still get completely distracted by how beautiful you are.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 1 }}
                  className="pt-3 font-serif text-lg italic leading-8 text-white/45 sm:text-xl"
                >
                  So if you ever catch me looking at you like I have
                  absolutely nothing intelligent left to say…
                  <br />
                  that's probably exactly what happened.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="mt-12"
              >
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sound.playSoftClick?.();
                    } catch {
                      // Optional.
                    }

                    onNext();
                  }}
                  className="group inline-flex min-h-11 items-center gap-4 border-b border-[#d4af37]/30 pb-2 font-sans text-[9px] uppercase tracking-[0.32em] text-[#eadcae]/80 transition-all duration-500 hover:border-[#d4af37]/70 hover:text-[#fff4ce] focus:outline-none focus-visible:border-[#d4af37]"
                >
                  <span>Now come here</span>

                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Screen10LittleSurprises;
