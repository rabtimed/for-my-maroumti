import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    setIsPlaying(sound.getMusicPlaying());

    const interval = window.setInterval(() => {
      setIsPlaying(sound.getMusicPlaying());
      setIsMuted(sound.getMuted());
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const handleToggle = async () => {
    if (isMuted) {
      setIsMuted(false);
      await sound.startMusic();
      setIsPlaying(sound.getMusicPlaying());
      return;
    }

    if (!isPlaying) {
      await sound.startMusic();
      setIsPlaying(sound.getMusicPlaying());
      setIsMuted(false);
      return;
    }

    sound.toggleMute();
    setIsPlaying(false);
    setIsMuted(true);
  };

  return (
    <aside
      aria-label="Music player controls"
      className="flex items-center"
    >
      <button
        id="audio-toggle-btn"
        onClick={handleToggle}
        className={`
          group flex items-center gap-2
          px-3 py-1.5
          rounded-full
          border
          text-[10px]
          tracking-[0.2em]
          uppercase
          font-medium
          transition-all
          duration-300
          backdrop-blur-md
          ${
            isPlaying && !isMuted
              ? 'bg-[#800020]/40 border-[#d4af37]/40 text-[#f5f2ed] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
              : 'bg-white/5 border-white/10 text-white/50 hover:text-white/90 hover:border-white/20'
          }
        `}
        title={
          isPlaying && !isMuted
            ? 'Mute romantic music'
            : 'Play romantic music'
        }
        aria-label={
          isPlaying && !isMuted
            ? 'Mute romantic music'
            : 'Play romantic music'
        }
      >
        {isPlaying && !isMuted ? (
          <>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]" />
            </span>

            <Volume2 className="w-3 h-3 text-[#d4af37]" />

            <span className="sans">
              Playing
            </span>
          </>
        ) : (
          <>
            <Music className="w-3 h-3 opacity-60" />

            <span className="sans">
              Play music
            </span>
          </>
        )}
      </button>
    </aside>
  );
};
