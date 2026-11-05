'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Square,
  Volume2,
  VolumeX,
  Check,
  ChevronRight,
  ChevronLeft,
  Keyboard,
  Sparkles,
  HelpCircle,
  SkipForward,
  RotateCcw,
  Edit3,
  ThumbsUp,
  LayoutGrid
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Sector, Stage, Language } from '@/types/innovategram';

export interface ConversationalFormData {
  innovatorName: string;
  title: string;
  problem: string;
  solution: string;
  village: string;
  district: string;
  state: string;
  sector: Sector;
  stage: Stage;
  rawVoiceTranscript: string;
}

interface Props {
  onComplete: (data: ConversationalFormData) => void;
  onCancel: () => void;
  isAssisted?: boolean;
}

interface QuestionDef {
  id: keyof ConversationalFormData;
  q: Record<Language, string>;
  placeholder: Record<Language, string>;
  sampleSpeech: Record<Language, string>;
  illustratedOptions?: { label: Record<Language, string>; value: string; icon: string }[];
  isOptional?: boolean;
}

export const ConversationalVoiceForm: React.FC<Props> = ({
  onComplete,
  onCancel,
  isAssisted = false,
}) => {
  const { language, t, tSector, tStage } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [inputMode, setInputMode] = useState<'voice' | 'type' | 'options'>('voice');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [isReadBackActive, setIsReadBackActive] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  // Accumulated structured responses
  const [formData, setFormData] = useState<ConversationalFormData>({
    innovatorName: '',
    title: '',
    problem: '',
    solution: '',
    village: '',
    district: 'Patan',
    state: 'Gujarat',
    sector: 'Agriculture',
    stage: 'Prototype',
    rawVoiceTranscript: '',
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const questions: QuestionDef[] = [
    {
      id: 'innovatorName',
      q: {
        gu: isAssisted ? 'મૂળ આવિષ્કારકનું શુભ નામ શું છે?' : 'તમારું શુભ નામ શું છે?',
        hi: isAssisted ? 'मूल आविष्कारक का शुभ नाम क्या है?' : 'आपका शुभ नाम क्या है?',
        en: isAssisted ? "What is the actual innovator's full name?" : 'What is your full name?'
      },
      placeholder: {
        gu: 'દા.ત. રમેશભાઈ પટેલ',
        hi: 'उदा. रमेश पटेल',
        en: 'e.g. Ramesh Patel'
      },
      sampleSpeech: {
        gu: 'મારું નામ રમેશ પટેલ છે.',
        hi: 'मेरा नाम रमेश पटेल है।',
        en: 'My name is Ramesh Patel.'
      },
      isOptional: false,
    },
    {
      id: 'title',
      q: {
        gu: 'તમે શું નવું સાધન કે મશીન બનાવ્યું છે?',
        hi: 'आपने क्या नई मशीन या उपकरण बनाया है?',
        en: 'What invention, machine, or tool have you created?'
      },
      placeholder: {
        gu: 'દા.ત. સાઇકલથી ચાલતું નીંદણ કાઢવાનું દેશી મશીન',
        hi: 'उदा. हाथ से चलने वाली निराई-गुड़ाई मशीन',
        en: 'e.g. Machine that helps farmers remove weeds'
      },
      sampleSpeech: {
        gu: 'મેં ખેડૂતો માટે નીંદણ દૂર કરતું હાથથી ચાલતું મશીન બનાવ્યું છે.',
        hi: 'मैंने खेतों से खरपतवार निकालने के लिए एक मशीन बनाई है।',
        en: 'I have created a machine that helps farmers remove weeds.'
      },
      isOptional: false,
    },
    {
      id: 'problem',
      q: {
        gu: 'આ આવિષ્કાર ખેડૂતો કે ગામની કઈ મોટી સમસ્યા દૂર કરે છે?',
        hi: 'यह आविष्कार किस समस्या का समाधान करता है?',
        en: 'What problem does your invention solve?'
      },
      placeholder: {
        gu: 'દા.ત. મજૂરી ખર્ચ ઘટાડે છે અને સમય બચાવે છે.',
        hi: 'उदा. यह शारीरिक श्रम कम करता है और समय बचाता है।',
        en: 'e.g. It reduces manual labor and saves time.'
      },
      sampleSpeech: {
        gu: 'તે શારીરિક મહેનત અને મજૂરી ખર્ચ ઘટાડે છે અને સમય બચાવે છે.',
        hi: 'यह अत्यधिक शारीरिक श्रम को कम करता है और समय बचाता है।',
        en: 'It reduces manual labour and saves time.'
      },
      isOptional: false,
    },
    {
      id: 'solution',
      q: {
        gu: 'આ મશીન કઈ રીતે કામ કરે છે અને તેમાં કઈ દેશી સામગ્રી વાપરી છે?',
        hi: 'यह मशीन कैसे काम करती है और आपने इसमें क्या पुर्जे लगाए हैं?',
        en: 'How does it work, and what materials or mechanism did you use?'
      },
      placeholder: {
        gu: 'દા.ત. જૂની સાઇકલની ચેઇન, હેન્ડલ અને લોખંડના બ્લેડ.',
        hi: 'उदा. पुरानी साइकिल की चेन, लीवर और तेज ब्लेड।',
        en: 'e.g. Recycled bicycle chain, rolling chassis, and cutting blades.'
      },
      sampleSpeech: {
        gu: 'જૂની સાઇકલની ચેઇન અને પૈડાં સાથે ત્રણ બ્લેડ જોડેલા છે, આગળ ધકેલવાથી જમીનમાંથી નીંદણ કપાઈ જાય છે.',
        hi: 'साइकिल की चेन और पहियों के साथ तीन ब्लेड जोड़े हैं, आगे धक्का देने से घास कट जाती है।',
        en: 'A rolling wheel with chain transmission drives ground blades that slice weeds.'
      },
      isOptional: true,
    },
    {
      id: 'village',
      q: {
        gu: 'તમે કયા ગામ, તાલુકા કે શહેરના રહેવાસી છો?',
        hi: 'आप किस गांव, कस्बे या शहर से हैं?',
        en: 'Which village, town, or city are you from?'
      },
      placeholder: {
        gu: 'દા.ત. અમદાવાદ નજીકનું ગામ અથવા રાધનપુર, પાટણ',
        hi: 'उदा. अहमदाबाद के पास का गांव या खींवसर, नागौर',
        en: 'e.g. A village near Ahmedabad'
      },
      sampleSpeech: {
        gu: 'હું અમદાવાદ નજીકના એક ગામનો રહેવાસી છું.',
        hi: 'मैं अहमदाबाद के पास एक गांव से हूँ।',
        en: 'I am from a village near Ahmedabad.'
      },
      isOptional: false,
    },
    {
      id: 'stage',
      q: {
        gu: 'હાલમાં આ આવિષ્કાર કયા તબક્કે પહોંચ્યો છે?',
        hi: 'वर्तमान में यह खोज किस स्तर पर है?',
        en: 'What is the current development stage of your invention?'
      },
      placeholder: {
        gu: 'તબક્કો પસંદ કરો',
        hi: 'चरण चुनें',
        en: 'Select development stage'
      },
      sampleSpeech: {
        gu: 'આ મશીન ખેતરમાં ચકાસી લીધું છે અને કામ કરે છે.',
        hi: 'यह प्रोटोटाइप खेतों में परखा जा चुका है और काम करता है।',
        en: 'It is a working prototype tested in fields.'
      },
      isOptional: false,
      illustratedOptions: [
        {
          label: { gu: 'વિચાર / પરિકલ્પના', hi: 'विचार / परिकल्पना', en: 'Idea / Concept' },
          value: 'Idea',
          icon: '💡'
        },
        {
          label: { gu: 'કાર્યકારી પ્રોટોટાઇપ', hi: 'कार्यशील प्रोटोटाइप', en: 'Working Prototype' },
          value: 'Prototype',
          icon: '⚙️'
        },
        {
          label: { gu: 'ખેતરમાં ચકાસાયેલ', hi: 'खेतों में परीक्षित', en: 'Field Tested' },
          value: 'Tested',
          icon: '🌾'
        },
        {
          label: { gu: 'ગામમાં અપનાવેલ', hi: 'गांव में उपयोगित', en: 'Locally Adopted' },
          value: 'Adopted',
          icon: '🤝'
        }
      ]
    }
  ];

  const activeQuestion = questions[currentStep];

  // Helper to extract cleanly cleaned entity from colloquial voice response
  const cleanExtractedAnswer = (raw: string, fieldId: keyof ConversationalFormData): string => {
    let cleaned = raw.trim();
    if (!cleaned) return '';

    if (fieldId === 'innovatorName') {
      // Strip "My name is...", "મારું નામ ... છે", "मेरा नाम ... है"
      cleaned = cleaned
        .replace(/^મારું\s*નામ\s*/i, '')
        .replace(/\s*છે\.?$/i, '')
        .replace(/^मेरा\s*नाम\s*/i, '')
        .replace(/\s*है\.?$/i, '')
        .replace(/^my\s*name\s*is\s*/i, '')
        .replace(/\.?$/i, '')
        .trim();
    } else if (fieldId === 'village') {
      cleaned = cleaned
        .replace(/^હું\s*/i, '')
        .replace(/\s*ગામનો\s*રહેવાસી\s*છું\.?$/i, '')
        .replace(/\s*થી\s*છું\.?$/i, '')
        .replace(/^मैं\s*/i, '')
        .replace(/\s*से\s*हूँ\.?$/i, '')
        .replace(/^i\s*am\s*from\s*/i, '')
        .replace(/\.?$/i, '')
        .trim();
    }

    return cleaned || raw;
  };

  // Play question aloud using TTS
  const speakQuestion = (qText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(qText);
    if (language === 'gu') utterance.lang = 'gu-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.onstart = () => setIsSpeakingQuestion(true);
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);

    window.speechSynthesis.speak(utterance);
  };

  // Play question when step changes
  useEffect(() => {
    const qText = activeQuestion.q[language] || activeQuestion.q.gu || activeQuestion.q.en;
    speakQuestion(qText);

    const existingVal = (formData as any)[activeQuestion.id] || '';
    setCurrentAnswer(existingVal);
    setAwaitingConfirmation(false);

    // Default to options mode if question has illustrated options
    if (activeQuestion.illustratedOptions && activeQuestion.illustratedOptions.length > 0) {
      setInputMode('options');
    } else {
      setInputMode('voice');
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStep, language]);

  // Voice recording & SpeechRecognition handler
  const startRecordingAnswer = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setAwaitingConfirmation(false);

    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);

    // Check for native Web Speech API recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = false;
          rec.interimResults = false;
          rec.lang = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

          rec.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
              const cleaned = cleanExtractedAnswer(transcript, activeQuestion.id);
              setCurrentAnswer(cleaned);
              readBackExtractedAnswer(cleaned);
            }
          };

          rec.onerror = (e: any) => {
            console.warn('SpeechRecognition error or not authorized, using fallback sample', e);
          };

          rec.onend = () => {
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
          };

          recognitionRef.current = rec;
          rec.start();
          return;
        } catch (e) {
          console.warn('SpeechRecognition start failed', e);
        }
      }
    }
  };

  const stopRecordingAnswer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    // If no recognition transcript was captured yet, populate sample speech
    if (!currentAnswer) {
      const sample =
        activeQuestion.sampleSpeech[language] ||
        activeQuestion.sampleSpeech.gu ||
        activeQuestion.sampleSpeech.en;
      const cleaned = cleanExtractedAnswer(sample, activeQuestion.id);
      setCurrentAnswer(cleaned);
      readBackExtractedAnswer(cleaned);
    } else {
      readBackExtractedAnswer(currentAnswer);
    }
  };

  // Read back the extracted answer aloud to the user
  const readBackExtractedAnswer = (answerText: string) => {
    if (!answerText) return;
    setAwaitingConfirmation(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      let prefix = `મેં નોંધ્યું: ${answerText}. શું આ સાચું છે?`;
      if (language === 'hi') {
        prefix = `मैंने दर्ज किया: ${answerText}. क्या यह सही है?`;
      } else if (language === 'en') {
        prefix = `Recorded: ${answerText}. Is this correct?`;
      }

      const confirmUtterance = new SpeechSynthesisUtterance(prefix);
      if (language === 'gu') confirmUtterance.lang = 'gu-IN';
      else if (language === 'hi') confirmUtterance.lang = 'hi-IN';
      else confirmUtterance.lang = 'en-IN';

      confirmUtterance.onstart = () => setIsReadBackActive(true);
      confirmUtterance.onend = () => setIsReadBackActive(false);
      confirmUtterance.onerror = () => setIsReadBackActive(false);

      window.speechSynthesis.speak(confirmUtterance);
    }
  };

  // Skip this question
  const handleSkipQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  // Confirm answer and move to next question
  const handleSaveStep = () => {
    const val = currentAnswer.trim();
    const updated = {
      ...formData,
      [activeQuestion.id]: val || (formData as any)[activeQuestion.id],
      rawVoiceTranscript: `${formData.rawVoiceTranscript} ${val}`.trim(),
    };

    // Auto-detect sector if on title, problem, or solution
    if (activeQuestion.id === 'title' || activeQuestion.id === 'solution' || activeQuestion.id === 'problem') {
      const lower = `${updated.title} ${updated.problem} ${updated.solution}`.toLowerCase();
      if (lower.includes('પાણી') || lower.includes('water') || lower.includes('સિંચાઈ') || lower.includes('सिंचाई') || lower.includes('ડ્રિપ')) {
        updated.sector = 'Water and Sanitation';
      } else if (lower.includes('સોલાર') || lower.includes('solar') || lower.includes('સૂર્ય') || lower.includes('सौर') || lower.includes('ઊર્જા')) {
        updated.sector = 'Renewable Energy';
      } else if (lower.includes('દવા') || lower.includes('સ્વાસ્થ્ય') || lower.includes('health') || lower.includes('medical')) {
        updated.sector = 'Healthcare';
      } else if (lower.includes('કચરો') || lower.includes('waste') || lower.includes('પરાળી')) {
        updated.sector = 'Waste Management';
      } else if (lower.includes('વોકર') || lower.includes('દિવ્યાંગ') || lower.includes('assistive')) {
        updated.sector = 'Assistive Technology';
      } else {
        updated.sector = 'Agriculture';
      }
    }

    setFormData(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xl space-y-6 max-w-2xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF5ED] text-[#176B45] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#104C35]">
              {t('conversationalTitle')}
            </h3>
            <p className="text-[11px] text-[#6B756E]">
              સવાલ {currentStep + 1} of {questions.length} • {t('conversationalSubtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="text-xs text-gray-400 hover:text-gray-700 font-semibold px-2 py-1 rounded"
        >
          Cancel
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentStep
                ? 'w-10 bg-[#176B45]'
                : idx < currentStep
                ? 'w-2.5 bg-emerald-400'
                : 'w-2.5 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Active Question Card */}
      <div className="bg-[#EAF5ED]/70 rounded-2xl p-6 border border-emerald-200/80 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              સવાલ {currentStep + 1}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#104C35] font-serif leading-snug">
              {activeQuestion.q[language] || activeQuestion.q.gu || activeQuestion.q.en}
            </h2>
          </div>

          <button
            onClick={() =>
              speakQuestion(activeQuestion.q[language] || activeQuestion.q.gu || activeQuestion.q.en)
            }
            className={`p-2.5 rounded-full transition-all shrink-0 cursor-pointer ${
              isSpeakingQuestion
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-white text-[#176B45] hover:bg-emerald-100 shadow-xs'
            }`}
            title="Read question aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Interaction Method Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-900/10">
          <button
            type="button"
            onClick={() => setInputMode('voice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'voice'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#18251E] hover:bg-emerald-50'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{t('speakAnswerBtn')}</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('type')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'type'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#18251E] hover:bg-emerald-50'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>{t('typeAnswerBtn')}</span>
          </button>

          {activeQuestion.illustratedOptions && (
            <button
              type="button"
              onClick={() => setInputMode('options')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                inputMode === 'options'
                  ? 'bg-[#176B45] text-white shadow-xs'
                  : 'bg-white text-[#18251E] hover:bg-emerald-50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t('selectOptionBtn')}</span>
            </button>
          )}
        </div>

        {/* METHOD 1: SPEAK YOUR ANSWER */}
        {inputMode === 'voice' && (
          <div className="py-4 text-center space-y-3 bg-white/60 p-4 rounded-xl border border-emerald-100">
            {isRecording ? (
              <div className="space-y-3">
                <div
                  onClick={stopRecordingAnswer}
                  className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-600/30 animate-pulse cursor-pointer"
                >
                  <Square className="w-8 h-8 fill-white" />
                </div>
                <p className="text-xs font-mono font-bold text-red-600">
                  Listening... 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                </p>
                <button
                  type="button"
                  onClick={stopRecordingAnswer}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-xl cursor-pointer"
                >
                  {t('stopRecording')}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={startRecordingAnswer}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#104C35] to-[#176B45] hover:from-[#176B45] hover:to-emerald-500 text-white flex items-center justify-center mx-auto shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Mic className="w-9 h-9" />
                </button>
                <p className="text-xs text-[#6B756E] font-medium">
                  માઇક પર ટેપ કરો અને ગુજરાતી, હિન્દી કે અંગ્રેજીમાં બોલો
                </p>
                {/* Fallback quick-fill sample chip */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const sample =
                        activeQuestion.sampleSpeech[language] ||
                        activeQuestion.sampleSpeech.gu ||
                        activeQuestion.sampleSpeech.en;
                      const cleaned = cleanExtractedAnswer(sample, activeQuestion.id);
                      setCurrentAnswer(cleaned);
                      readBackExtractedAnswer(cleaned);
                    }}
                    className="text-[11px] text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 px-3 py-1 rounded-full cursor-pointer"
                  >
                    💡 ઉદાહરણ અવાજ સાંભળો / સિમ્યુલેટ કરો
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* METHOD 2: TYPE YOUR ANSWER */}
        {inputMode === 'type' && (
          <div className="space-y-2 pt-1">
            <textarea
              rows={3}
              value={currentAnswer}
              onChange={e => setCurrentAnswer(e.target.value)}
              placeholder={activeQuestion.placeholder[language] || activeQuestion.placeholder.gu || activeQuestion.placeholder.en}
              className="w-full bg-white border border-emerald-900/15 rounded-xl p-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#176B45]"
            />
          </div>
        )}

        {/* METHOD 3: SELECT FROM ILLUSTRATED OPTIONS */}
        {inputMode === 'options' && activeQuestion.illustratedOptions && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {activeQuestion.illustratedOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setCurrentAnswer(opt.value);
                  readBackExtractedAnswer(opt.label[language] || opt.label.gu || opt.value);
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  currentAnswer === opt.value
                    ? 'bg-[#176B45] text-white border-[#176B45] shadow-md'
                    : 'bg-white text-[#18251E] hover:bg-emerald-50 border-emerald-900/10'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className="text-xs font-bold leading-tight">
                  {opt.label[language] || opt.label.gu || opt.label.en}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Extracted Answer & Read-back Confirmation Card */}
        {currentAnswer && (
          <div className="p-4 bg-white rounded-2xl border border-emerald-900/15 shadow-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#104C35] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>તમારો જવાબ (AI તારવેલ વિગત):</span>
              </span>
              <button
                type="button"
                onClick={() => readBackExtractedAnswer(currentAnswer)}
                className={`p-1.5 rounded-full ${
                  isReadBackActive ? 'bg-amber-500 text-white' : 'text-emerald-700 hover:bg-emerald-50'
                }`}
                title="Re-read extracted answer aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs sm:text-sm font-bold text-[#18251E] bg-[#F8FAF7] p-2.5 rounded-xl border border-emerald-900/10">
              {currentAnswer}
            </div>

            {awaitingConfirmation && (
              <div className="flex items-center gap-2 pt-1 text-xs text-emerald-800">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">જવાબ યોગ્ય હોય તો "ખાતરી કરી આગળ વધો" દબાવો</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          className="flex items-center gap-1 text-xs font-bold text-[#6B756E] hover:text-[#18251E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('prevQuestionBtn')}</span>
        </button>

        <div className="flex items-center gap-2">
          {activeQuestion.isOptional && (
            <button
              type="button"
              onClick={handleSkipQuestion}
              className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-2 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>{t('skipQuestionBtn')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveStep}
            disabled={!currentAnswer && !activeQuestion.isOptional}
            className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>
              {currentStep === questions.length - 1
                ? t('finishConversationalBtn')
                : t('nextQuestionBtn')}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
