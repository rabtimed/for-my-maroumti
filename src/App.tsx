/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, LoveConfig } from './types';
import { INITIAL_LOVE_CONFIG } from './config/loveConfig';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ConfigEditorModal } from './components/ConfigEditorModal';

// Screens
import { Screen1Opening } from './components/screens/Screen1Opening';
import { Screen2HowMad } from './components/screens/Screen2HowMad';
import { Screen3BoyfriendCourt } from './components/screens/Screen3BoyfriendCourt';
import { Screen4RealApology } from './components/screens/Screen4RealApology';
import { Screen5WhyILoveYou } from './components/screens/Screen5WhyILoveYou';
import { Screen6OurStory } from './components/screens/Screen6OurStory';
import { Screen7ForgivenessTest } from './components/screens/Screen7ForgivenessTest';
import { Screen8ForgivenessLevel } from './components/screens/Screen8ForgivenessLevel';
import { Screen9CuteFlirtyMode } from './components/screens/Screen9CuteFlirtyMode';
import { Screen10LittleSurprises } from './components/screens/Screen10LittleSurprises';
import { Screen11FinalLetter } from './components/screens/Screen11FinalLetter';
import { Screen12FinalCelebration } from './components/screens/Screen12FinalCelebration';
import { Sliders } from 'lucide-react';

const SCREEN_SEQUENCE: ScreenId[] = [
  'opening',
  'how-mad',
  'courtroom',
  'real-apology',
  'why-i-love-you',
  'our-story',
  'forgiveness-test',
  'forgiveness-level',
  'cute-flirty',
  'little-surprises',
  'final-letter',
  'forgiveness-screen',
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('opening');
  const [config, setConfig] = useState<LoveConfig>(INITIAL_LOVE_CONFIG);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  // Scroll to top on every screen transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const goToNextScreen = () => {
    const currentIndex = SCREEN_SEQUENCE.indexOf(currentScreen);
    if (currentIndex >= 0 && currentIndex < SCREEN_SEQUENCE.length - 1) {
      setCurrentScreen(SCREEN_SEQUENCE[currentIndex + 1]);
    }
  };

  const handleRestart = () => {
    setCurrentScreen('opening');
  };

  const getBackgroundIntensity = () => {
    if (currentScreen === 'forgiveness-screen') return 'celebration';
    if (currentScreen === 'real-apology' || currentScreen === 'final-letter') return 'warm';
    return 'subtle';
  };

  return (
    <div className="relative min-h-screen bg-[#0d0205] text-[#f5f2ed] selection:bg-[#800020] selection:text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Dynamic Romantic Canvas Atmosphere */}
      <BackgroundEffects intensity={getBackgroundIntensity()} />

      {/* Editorial Top Navigation Header */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10 bg-[#0d0205]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-xs shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            ❤️
          </div>
          <span className="text-[11px] tracking-[0.3em] uppercase opacity-70 sans font-medium">
            For My Maroumti
          </span>
        </div>

        {/* Story Progress Indicator */}
        <ProgressIndicator
          currentScreen={currentScreen}
          allScreens={SCREEN_SEQUENCE}
          onSelectScreen={(screen) => setCurrentScreen(screen)}
        />

        {/* Audio Player & Quick Customizer */}
        <div className="flex items-center gap-3">
          <AudioPlayer />
        </div>
      </header>

      {/* Main Interactive Screen Container */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-center py-6 sm:py-12">
        <AnimatePresence mode="wait">
          {currentScreen === 'opening' && (
            <motion.section
              key="screen-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <Screen1Opening onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'how-mad' && (
            <motion.section
              key="screen-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen2HowMad onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'courtroom' && (
            <motion.section
              key="screen-3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen3BoyfriendCourt onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'real-apology' && (
            <motion.section
              key="screen-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Screen4RealApology config={config} onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'why-i-love-you' && (
            <motion.section
              key="screen-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen5WhyILoveYou cards={config.loveCards} onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'our-story' && (
            <motion.section
              key="screen-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen6OurStory memories={config.memories} onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'forgiveness-test' && (
            <motion.section
              key="screen-7"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen7ForgivenessTest onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'forgiveness-level' && (
            <motion.section
              key="screen-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen8ForgivenessLevel onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'cute-flirty' && (
            <motion.section
              key="screen-9"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen9CuteFlirtyMode bubbles={config.flirtyBubbles} onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'little-surprises' && (
            <motion.section
              key="screen-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Screen10LittleSurprises eggs={config.surpriseEggs} onNext={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'final-letter' && (
            <motion.section
              key="screen-11"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Screen11FinalLetter config={config} onForgive={goToNextScreen} />
            </motion.section>
          )}

          {currentScreen === 'forgiveness-screen' && (
            <motion.section
              key="screen-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Screen12FinalCelebration config={config} onRestart={handleRestart} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <footer className="relative z-20 px-6 sm:px-10 py-5 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] sm:text-xs sans uppercase tracking-[0.2em] opacity-40 bg-[#0d0205]/90 backdrop-blur-md gap-4">
        <span>Est. Our Story • MMXXIV</span>
        <span className="hidden md:inline">Rouh 9albi • Nour 3iniya • Princessti</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditorOpen(true)}
            className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
          >
            <Sliders className="w-3 h-3 text-[#d4af37]" />
          </button>
          <span>Sent with love from your favorite person</span>
        </div>
      </footer>
    </div>
  );
}
