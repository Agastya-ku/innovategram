'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Pause, Play } from 'lucide-react';
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
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getTextToSpeak = (): string => {
    if (typeof text === 'string') return text;
    return text[language] || text.en || text.hi || text.gu || '';
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    currentUtteranceRef.current = null;
  };

  const startSpeaking = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
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

    // Attempt to pick a matching system voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetLangPrefix = language === 'gu' ? 'gu' : language === 'hi' ? 'hi' : 'en';
      const matchedVoice = voices.find(
        v => v.lang.toLowerCase().startsWith(targetLangPrefix) || v.lang.toLowerCase().includes(targetLangPrefix)
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      currentUtteranceRef.current = null;
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
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
    setTimeout(() => startSpeaking(), 120);
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speeds = [1.0, 1.2, 0.8];
    const nextIdx = (speeds.indexOf(rate) + 1) % speeds.length;
    const newRate = speeds[nextIdx];
    setRate(newRate);
    if (isPlaying) {
      stopSpeaking();
      setTimeout(() => startSpeaking(), 100);
    }
  };

  useEffect(() => {
    // When language changes, stop active speech
    stopSpeaking();
  }, [language]);

  return (
    <span className={`inline-flex items-center gap-1.5 align-middle select-none ${className}`}>
      <button
        type="button"
        onClick={togglePlay}
        className={`inline-flex items-center gap-1.5 rounded-full font-bold transition-all shadow-xs cursor-pointer ${
          isPlaying
            ? 'bg-amber-600 text-white animate-pulse ring-2 ring-amber-300'
            : 'bg-[#EAF5ED] text-[#176B45] hover:bg-emerald-200/80 hover:text-[#104C35] border border-emerald-300/70'
        } ${
          size === 'xs'
            ? 'px-2 py-0.5 text-[10px]'
            : size === 'sm'
            ? 'px-2.5 py-1 text-xs'
            : size === 'lg'
            ? 'px-4 py-2 text-sm'
            : 'px-3 py-1.5 text-xs'
        }`}
        title={isPlaying ? 'Pause voice guidance' : 'Listen in your language'}
        aria-label="Voice instruction"
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] font-mono">
              {language === 'gu' ? 'સાંભળી રહ્યા છો' : language === 'hi' ? 'चल रहा है...' : 'Playing...'}
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 shrink-0 text-[#176B45]" />
            {label ? (
              <span className="font-semibold">{label}</span>
            ) : (
              <span className="font-semibold text-[11px]">
                {language === 'gu' ? 'ઓડિયો' : language === 'hi' ? 'ऑडियो' : 'Audio'}
              </span>
            )}
          </>
        )}
      </button>

      {/* Replay Button when playing or finished */}
      {isPlaying && (
        <button
          type="button"
          onClick={handleReplay}
          className="p-1 rounded-full text-[#6B756E] hover:text-[#104C35] hover:bg-emerald-50 transition-colors cursor-pointer"
          title="Replay from start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Speed control pill */}
      {(showSpeedControl || isPlaying) && (
        <button
          type="button"
          onClick={cycleSpeed}
          className="text-[10px] font-mono font-bold text-[#6B756E] hover:text-[#104C35] bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded border border-gray-200 cursor-pointer"
          title="Toggle speech speed (0.8x, 1x, 1.2x)"
        >
          {rate}x
        </button>
      )}
    </span>
  );
};
