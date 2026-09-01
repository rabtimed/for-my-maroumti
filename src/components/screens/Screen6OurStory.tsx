import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { sound } from '../../utils/audio';

export interface Memory {
  id: number;
  chapter: string;
  date?: string;
  title: string;
  description: string;
  image: string;
  position?: string;
}

export interface Screen6OurStoryProps {
  memories?: any[];
  onNext: () => void;
}

const DEFAULT_MEMORIES: Memory[] = [
  {
    id: 1,
    chapter: 'CHAPTER 01',
    date: '10.01.2026',
    title: 'The beginning',
    description:
      'One simple message. One ordinary moment. Neither of us knew that it would become the beginning of something so important.',
    image: `${import.meta.env.BASE_URL}assets/images/story-01.jpg`,
  },

  {
    id: 2,
    chapter: 'CHAPTER 02',
    title: 'The little things',
    description:
      'The random conversations, the laughs, the little moments that seemed simple at the time... but slowly became my favorite parts of the day.',
    image: `${import.meta.env.BASE_URL}assets/images/story-02.jpg`,

  },

  {
    id: 3,
    chapter: 'CHAPTER 03',
    title: 'Just us',
    description:
      'Somewhere along the way, it stopped being about two people simply talking. It became our little world.',
    image: `${import.meta.env.BASE_URL}assets/images/story-03.jpg`,

  },

  {
    id: 4,
    chapter: 'CHAPTER 04',
    title: 'The moments I keep',
    description:
      'There are moments I could explain with a thousand words. And there are moments where one picture says everything.',
    image: `${import.meta.env.BASE_URL}assets/images/story-04.jpg`,

  },

  {
    id: 5,
    chapter: 'CHAPTER 05',
    title: 'Still my favorite story',
    description:
      'Looking back at everything we lived, I realize how many beautiful little memories became part of my heart.',
    image: `${import.meta.env.BASE_URL}assets/images/story-05.jpg`,

  },
];

export const Screen6OurStory: React.FC<Screen6OurStoryProps> = ({ onNext }) => {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImgError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center px-4 sm:px-6 py-14 max-w-4xl mx-auto z-10">

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-[10%]"
        >
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-40 right-[12%]"
        >
          <Heart className="w-4 h-4 text-[#800020]" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#d4af37]/30">
          <Heart className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37]">
            Chapter VI
          </span>
        </div>

        <h2 className="serif mt-5 text-4xl sm:text-5xl md:text-6xl text-[#f5f2ed] italic">
          Our little story
        </h2>

        <p className="serif mt-4 text-lg sm:text-xl text-white/60 italic">
          A few moments that became part of us.
        </p>
      </motion.div>


      {/* Story */}
      <div className="relative w-full">

        {/* Timeline line */}
        <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37] via-[#800020] to-transparent opacity-50" />


        <div className="space-y-20">

          {DEFAULT_MEMORIES.map((memory, index) => {

            const isLeft = index % 2 === 0;
            const hasFailed = failedImages[memory.id];

            return (
              <motion.div
                key={memory.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-100px',
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                className="relative"
              >

                {/* Timeline dot */}
                <div
                  className="
                    absolute
                    left-[7px]
                    sm:left-1/2
                    sm:-translate-x-1/2
                    top-8
                    w-6
                    h-6
                    rounded-full
                    bg-[#0d0205]
                    border
                    border-[#d4af37]
                    flex
                    items-center
                    justify-center
                    z-20
                    shadow-[0_0_20px_rgba(212,175,55,0.35)]
                  "
                >
                  <Heart
                    className="w-2.5 h-2.5 text-[#d4af37]"
                    fill="#d4af37"
                  />
                </div>


                {/* Desktop alternating layout */}
                <div
                  className={`
                    ml-12
                    sm:ml-0
                    sm:w-[46%]
                    ${isLeft ? 'sm:mr-auto' : 'sm:ml-auto'}
                  `}
                >

                  {/* Image */}
                  <motion.div
                    whileHover={{
                      scale: 1.015,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      shadow-2xl
                    "
                  >
                    {!hasFailed ? (
                      <img
                        src={memory.image}
                        alt={memory.title}
                        onError={() => handleImgError(memory.id)}
                        className="
                          block
                          w-full
                          h-auto
                          object-contain
                          transition-transform
                          duration-700
                        "
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-white/50 min-h-[250px]">
                        <ImageIcon className="w-8 h-8 text-[#d4af37]/60 mb-2" />

                        <span className="serif text-base text-[#f5f2ed] italic">
                          {memory.title}
                        </span>

                        <span className="sans text-[10px] text-white/40 uppercase tracking-widest mt-1">
                          {memory.chapter} Photograph
                        </span>
                      </div>
                    )}

                    {/* Image overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/50
                        via-transparent
                        to-transparent
                        pointer-events-none
                      "
                    />

                    {/* Image number */}
                    <div
                      className="
                        absolute
                        top-4
                        left-4
                        px-3
                        py-1.5
                        rounded-full
                        bg-black/40
                        backdrop-blur-md
                        border
                        border-white/10
                      "
                    >
                      <span
                        className="
                          text-[9px]
                          tracking-[0.25em]
                          text-white/80
                          uppercase
                        "
                      >
                        {memory.chapter}
                      </span>
                    </div>
                  </motion.div>


                  {/* Text */}
                  <div className="mt-6 px-1">

                    <div className="
                      flex
                      items-center
                      gap-2
                      mb-3
                    ">

                      <span className="
                        text-[10px]
                        tracking-[0.25em]
                        uppercase
                        text-[#d4af37]
                      ">
                        {memory.chapter}
                      </span>

                      {memory.date && (
                        <>
                          <span className="text-white/20">
                            •
                          </span>

                          <span className="
                            flex
                            items-center
                            gap-1
                            text-[10px]
                            text-white/40
                          ">
                            <Calendar className="w-3 h-3" />
                            {memory.date}
                          </span>
                        </>
                      )}

                    </div>


                    <h3 className="
                      serif
                      text-2xl
                      sm:text-3xl
                      text-[#f5f2ed]
                      italic
                    ">
                      {memory.title}
                    </h3>


                    <p className="
                      mt-3
                      sans
                      text-sm
                      leading-7
                      text-white/65
                    ">
                      {memory.description}
                    </p>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>


      {/* Ending quote */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        className="text-center mt-24 max-w-xl"
      >

        <div className="flex justify-center mb-5">
          <Heart
            className="w-5 h-5 text-[#d4af37]"
            fill="#d4af37"
          />
        </div>

        <p className="
          serif
          text-xl
          sm:text-2xl
          text-[#f5f2ed]
          italic
          leading-relaxed
        ">
          Some memories are just pictures.
          <br />
          Others become part of who we are.
        </p>

        <p className="
          mt-4
          sans
          text-xs
          tracking-[0.2em]
          uppercase
          text-white/40
        ">
          And these are some of mine.
        </p>

      </motion.div>


      {/* CTA */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="w-full max-w-md mt-16"
      >

        <button
          onClick={() => {
            sound.playSoftClick();
            onNext();
          }}
          className="
            group
            w-full
            py-4
            rounded-full
            bg-[#f5f2ed]
            text-[#0d0205]
            hover:bg-[#d4af37]
            font-sans
            font-bold
            text-xs
            uppercase
            tracking-[0.2em]
            transition-all
            flex
            items-center
            justify-center
            gap-3
            shadow-xl
          "
        >

          <span>
            Keep going
          </span>

          <ArrowRight
            className="
              w-4
              h-4
              transition-transform
              group-hover:translate-x-1
            "
          />

        </button>

      </motion.div>

    </div>
  );
};

export default Screen6OurStory;