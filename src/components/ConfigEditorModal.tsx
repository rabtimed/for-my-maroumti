import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoveConfig } from '../types';
import { Sliders, X, Check, Upload, RefreshCw, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface ConfigEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LoveConfig;
  onSave: (newConfig: LoveConfig) => void;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [personalApology, setPersonalApology] = useState(config.apology.personalApologyText);
  const [apologyPhoto, setApologyPhoto] = useState(config.apology.photoUrl);
  const [finalLetterPhoto, setFinalLetterPhoto] = useState(config.finalLetter.photoUrl);
  const [surpriseMessage, setSurpriseMessage] = useState(
    config.finalCelebration.finalSurpriseMessage
  );

  const handleSave = () => {
    sound.playSoftClick();
    const updated: LoveConfig = {
      ...config,
      apology: {
        ...config.apology,
        personalApologyText: personalApology,
        photoUrl: apologyPhoto,
      },
      finalLetter: {
        ...config.finalLetter,
        photoUrl: finalLetterPhoto,
      },
      finalCelebration: {
        ...config.finalCelebration,
        finalSurpriseMessage: surpriseMessage,
      },
    };
    onSave(updated);
    onClose();
  };

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg glass border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-[#d4af37]" />
            <h3 className="serif text-2xl text-[#f5f2ed] italic font-normal">Personalize Experience</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 font-sans text-xs">
          {/* Personal Apology Text Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-[#d4af37] uppercase tracking-[0.2em]">
              1. Personal Apology (Phase 04)
            </label>
            <textarea
              rows={4}
              value={personalApology}
              onChange={(e) => setPersonalApology(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-[#f5f2ed] text-xs focus:outline-none focus:border-[#d4af37]/50"
              placeholder="Write your specific heartfelt apology here..."
            />
          </div>

          {/* Sincere Apology Photo URL or File Upload */}
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-[#d4af37] uppercase tracking-[0.2em] flex items-center justify-between">
              <span>2. Apology Photo (Phase 04)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={apologyPhoto}
                onChange={(e) => setApologyPhoto(e.target.value)}
                placeholder="Image URL..."
                className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-[#f5f2ed] text-xs focus:outline-none focus:border-[#d4af37]/50"
              />
              <label className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center gap-1.5 text-xs text-white/80 uppercase tracking-wider font-medium">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, setApologyPhoto)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Final Surprise Message */}
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-[#d4af37] uppercase tracking-[0.2em]">
              3. Final Surprise Message (Phase 12)
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-white/5 hover:bg-white/10 text-[10px] sans uppercase tracking-[0.2em] text-white/70"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-full bg-[#f5f2ed] hover:bg-[#d4af37] text-[#0d0205] font-bold text-[10px] sans uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-1.5 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Changes</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
