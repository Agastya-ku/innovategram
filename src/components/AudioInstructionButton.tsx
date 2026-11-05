'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Gauge } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types/innovategram';

interface AudioInstructionButtonProps {
  text: string | Record<Language, string>;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showSpeedControl?: boolean;
}

export const AudioInstructionButton: React.FC<AudioInstructionButtonProps> = ({
  text,
  label,
  size = 'sm',
  className = '',
  showSpeedControl = false,
}) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1.0); // 0.8, 1.0, 1.2
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const getTextToSpeak = (): string => {
    if (typeof text === 'string') return text;
    return text[language] || text.gu || text.hi || text.en || '';
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const startSpeaking = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    // Cancel any active speech
    window.speechSynthesis.cancel();

    const spokenText = getTextToSpeak();
    if (!spokenText) return;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = rate;

    // Set regional voice locale
    if (language === 'gu') {
      utterance.lang = 'gu-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
    setTimeout(() => startSpeaking(), 100);
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speeds = [1.0, 1.2, 0.8];
    const nextIdx = (speeds.indexOf(rate) + 1) % speeds.length;
    setRate(speeds[nextIdx]);
  };

  useEffect(() => {
    // When language changes, stop active speech
    stopSpeaking();
  }, [language]);

  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      <button
        type="button"
        onClick={togglePlay}
        className={`inline-flex items-center gap-1 rounded-full font-bold transition-all shadow-xs cursor-pointer ${
          isPlaying
            ? 'bg-amber-500 text-white animate-pulse ring-2 ring-amber-300'
            : 'bg-[#EAF5ED] text-[#176B45] hover:bg-emerald-200/80 hover:text-[#104C35] border border-emerald-300/60'
        } ${
          size === 'xs'
            ? 'px-2 py-0.5 text-[10px]'
            : size === 'sm'
            ? 'px-2.5 py-1 text-xs'
            : size === 'lg'
            ? 'px-4 py-2 text-sm'
            : 'px-3 py-1.5 text-xs'
        }`}
        title={isPlaying ? 'Pause audio instruction' : 'Listen to audio instruction'}
        aria-label="Audio instruction"
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] font-mono">Playing</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 shrink-0" />
            {label && <span className="font-semibold">{label}</span>}
          </>
        )}
      </button>

      {/* Replay Button when playing or finished */}
      {isPlaying && (
        <button
          type="button"
          onClick={handleReplay}
          className="p-1 rounded-full text-[#6B756E] hover:text-[#104C35] hover:bg-emerald-50 transition-colors"
          title="Replay from start"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      )}

      {/* Speed control pill */}
      {(showSpeedControl || isPlaying) && (
        <button
          type="button"
          onClick={cycleSpeed}
          className="text-[10px] font-mono font-bold text-[#6B756E] hover:text-[#104C35] bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"
          title="Toggle speech speed (0.8x, 1x, 1.2x)"
        >
          {rate}x
        </button>
      )}
    </span>
  );
};
