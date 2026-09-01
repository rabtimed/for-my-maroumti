import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../utils/audio';
import { Check, ArrowRight, Heart, Sparkles } from 'lucide-react';

interface Screen7ForgivenessTestProps {
  onNext: () => void;
}

type Option = {
  id: string;
  icon: string;
  label: string;
};

const questionOneOptions: Option[] = [
  {
    id: 'laughs',
    icon: '😂',
    label: 'The laughs',
  },
  {
    id: 'talks',
    icon: '🌙',
    label: 'The late-night talks',
  },
  {
    id: 'messages',
    icon: '💌',
    label: 'The little messages',
  },
  {
    id: 'moments',
    icon: '🫶',
    label: 'The random moments',
  },
  {
    id: 'everything',
    icon: '❤️',
    label: 'All the little things',
  },
];

const questionTwoOptions: Option[] = [
  {
    id: 'adventures',
    icon: '✈️',
    label: 'More adventures',
  },
  {
    id: 'laughs',
    icon: '😂',
    label: 'More laughs',
  },
  {
    id: 'peace',
    icon: '🌷',
    label: 'More peaceful moments',
  },
  {
    id: 'memories',
    icon: '📸',
    label: 'More memories',
  },
  {
    id: 'see',
    icon: '❤️',
    label: "Let's see...",
  },
];

export const Screen7ForgivenessTest: React.FC<Screen7ForgivenessTestProps> = ({
  onNext,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    sound.playSoftClick();
    setSelected(id);
  };

  const getFirstResponse = (id: string) => {
    switch (id) {
      case 'laughs':
        return {
          title: 'I had a feeling you would choose this. 😂❤️',
          body: 'Honestly... some of our laughs are impossible to forget.',
        };

      case 'talks':
        return {
          title: 'Those conversations really were something. 🌙',
          body: 'Especially the ones where we completely forgot about time.',
        };

      case 'messages':
        return {
          title: 'The little messages... 🥹',
          body: 'Funny how a simple "wnk habibi?" can sometimes mean so much.',
        };

      case 'moments':
        return {
          title: 'Exactly. 🫶',
          body: 'The random moments are usually the ones we remember the most.',
        };

      case 'everything':
      default:
        return {
          title: 'Okay... that one made me smile. ❤️',
          body: 'Maybe the little things were never really little.',
        };
    }
  };

  const getSecondResponse = (id: string) => {
    switch (id) {
      case 'adventures':
        return {
          title: 'Now THAT sounds like a chapter. ✈️❤️',
          body: 'A few places, a few stories, and probably a lot of chaos.',
        };

      case 'laughs':
        return {
          title: 'Approved. 😂',
          body: 'We clearly need more moments that make absolutely no sense.',
        };

      case 'peace':
        return {
          title: 'That sounds beautiful. 🌷',
          body: 'Sometimes the best moments are simply the calm ones.',
        };

      case 'memories':
        return {
          title: 'More memories it is. 📸❤️',
          body: 'The kind we look back at years later and still smile.',
        };

      case 'see':
      default:
        return {
          title: 'Fair enough. ❤️',
          body: 'Some chapters are better discovered than planned.',
        };
    }
  };

  const options =
    currentQuestion === 1
      ? questionOneOptions
      : questionTwoOptions;

  const response =
    selected
      ? currentQuestion === 1
        ? getFirstResponse(selected)
        : getSecondResponse(selected)
      : null;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-xl mx-auto z-10">

      {/* Floating decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-[12%]"
        >
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-36 right-[10%]"
        >
          <Heart className="w-4 h-4 text-[#800020]" />
        </motion.div>

      </div>


      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full space-y-7 text-center"
      >

        {/* Header */}
        <div className="space-y-4">

          <div className="
            inline-flex
            items-center
            gap-2
            px-3.5
            py-1
            rounded-full
            bg-white/5
            border
            border-[#d4af37]/30
            text-[#d4af37]
            text-[10px]
            sans
            font-medium
            tracking-[0.25em]
            uppercase
          ">
            <Heart className="w-3 h-3" />

            <span>
              A little game • Phase 07
            </span>
          </div>


          <h2 className="
            serif
            text-3xl
            sm:text-4xl
            md:text-5xl
            text-[#f5f2ed]
            font-normal
            italic
          ">
            A tiny game...
          </h2>


          <p className="
            serif
            text-lg
            sm:text-xl
            text-[#d4af37]
            italic
          ">
            No serious questions. Promise. ❤️
          </p>


          <div className="pt-1">

            <span className="
              text-[10px]
              sans
              uppercase
              tracking-[0.25em]
              text-white/40
              font-medium
            ">
              QUESTION {currentQuestion} / 2
            </span>

          </div>

        </div>


        {/* Question card */}
        <AnimatePresence mode="wait">

          <motion.div
            key={currentQuestion}
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -25,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              glass
              rounded-2xl
              p-6
              sm:p-8
              space-y-6
              border
              border-white/10
              shadow-2xl
            "
          >

            {/* Question */}
            <div className="space-y-2">

              <span className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#d4af37]
                font-semibold
                sans
              ">
                A little question
              </span>


              {currentQuestion === 1 ? (
                <p className="
                  serif
                  text-2xl
                  sm:text-3xl
                  text-[#f5f2ed]
                  font-normal
                  italic
                  leading-relaxed
                ">
                  If you could keep only one thing from our story,
                  what would it be?
                </p>
              ) : (
                <p className="
                  serif
                  text-2xl
                  sm:text-3xl
                  text-[#f5f2ed]
                  font-normal
                  italic
                  leading-relaxed
                ">
                  And if our story had one more beautiful chapter...
                  what would you want it to be about?
                </p>
              )}

            </div>


            {/* Options */}
            <div className="grid grid-cols-1 gap-3">

              {options.map((option) => (

                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`
                    p-4
                    rounded-xl
                    border
                    text-left
                    sans
                    text-xs
                    tracking-wider
                    transition-all
                    flex
                    items-center
                    gap-3
                    ${
                      selected === option.id
                        ? `
                          bg-[#800020]/40
                          border-[#d4af37]
                          text-[#f5f2ed]
                          shadow-lg
                        `
                        : `
                          bg-white/5
                          border-white/10
                          text-white/80
                          hover:border-[#d4af37]/40
                          hover:bg-white/10
                        `
                    }
                  `}
                >

                  <span className="text-lg">
                    {option.icon}
                  </span>

                  <span className="flex-1 font-medium">
                    {option.label}
                  </span>

                  {selected === option.id && (
                    <Check className="w-4 h-4 text-[#d4af37]" />
                  )}

                </button>

              ))}

            </div>


            {/* Response */}
            <AnimatePresence mode="wait">

              {response && (

                <motion.div
                  key={selected}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="space-y-4 pt-2"
                >

                  <div className="
                    p-4
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                  ">

                    <p className="
                      serif
                      text-xl
                      text-[#d4af37]
                      italic
                    ">
                      {response.title}
                    </p>

                    <p className="
                      sans
                      text-xs
                      text-white/70
                      mt-2
                      leading-relaxed
                    ">
                      {response.body}
                    </p>

                  </div>


                  <button
                    onClick={() => {

                      sound.playSoftClick();

                      if (currentQuestion === 1) {
                        setCurrentQuestion(2);
                        setSelected(null);
                      } else {
                        onNext();
                      }

                    }}
                    className="
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
                      gap-2
                      shadow-xl
                    "
                  >

                    <span>
                      {currentQuestion === 1
                        ? 'Next little question'
                        : 'Continue'}
                    </span>

                    <ArrowRight className="w-4 h-4" />

                  </button>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        </AnimatePresence>


        {/* Footer */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            sans
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-white/30
          "
        >
          Take your time. There are no wrong answers. ❤️
        </motion.p>

      </motion.div>

    </div>
  );
};

export default Screen7ForgivenessTest;