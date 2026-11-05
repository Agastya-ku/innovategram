'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Square,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Check,
  ChevronRight,
  ChevronLeft,
  Keyboard,
  Sparkles,
  HelpCircle,
  SkipForward
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Sector, Stage, Language } from '@/types/innovategram';

interface ConversationalFormData {
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

export const ConversationalVoiceForm: React.FC<Props> = ({
  onComplete,
  onCancel,
  isAssisted = false,
}) => {
  const { language, t, tSector, tStage } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [inputMode, setInputMode] = useState<'voice' | 'type'>('voice');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

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

  const questions: {
    id: keyof ConversationalFormData;
    q: Record<Language, string>;
    placeholder: Record<Language, string>;
    sampleSpeech: Record<Language, string>;
    suggestedOptions?: string[];
  }[] = [
    {
      id: 'innovatorName',
      q: {
        gu: isAssisted ? 'મૂળ આવિષ્કારકનું નામ શું છે?' : 'તમારું શુભ નામ શું છે?',
        hi: isAssisted ? 'मूल आविष्कारक का नाम क्या है?' : 'आपका शुभ नाम क्या है?',
        en: isAssisted ? "What is the actual innovator's full name?" : 'What is your full name?'
      },
      placeholder: {
        gu: 'દા.ત. રમેશભાઈ પટેલ',
        hi: 'उदा. रमेश पटेल',
        en: 'e.g. Ramesh Patel'
      },
      sampleSpeech: {
        gu: 'મારું નામ રમેશભાઈ પટેલ છે.',
        hi: 'मेरा नाम रमेश पटेल है।',
        en: 'My name is Ramesh Patel.'
      }
    },
    {
      id: 'title',
      q: {
        gu: 'તમે શું નવું સાધન કે મશીન બનાવ્યું છે?',
        hi: 'आपने क्या नई मशीन या उपकरण बनाया है?',
        en: 'What invention, machine, or tool have you created?'
      },
      placeholder: {
        gu: 'દા.ત. સાઇકલથી ચાલતું નીંદણ કાઢવાનું મશીન',
        hi: 'उदा. हाथ से चलने वाली निराई-गुड़ाई मशीन',
        en: 'e.g. Low-cost bicycle-chain manual weed remover'
      },
      sampleSpeech: {
        gu: 'મેં ખેતરમાં ઓછા ખર્ચે નીંદણ કાઢવા માટે સાઇકલના પુર્જામાંથી હાથથી ચાલતું મશીન બનાવ્યું છે.',
        hi: 'मैंने खेतों से खरपतवार निकालने के लिए साइकिल के पुर्जों से चलने वाली मशीन बनाई है।',
        en: 'I built a low-cost manually pushed weeder made from bicycle parts.'
      }
    },
    {
      id: 'problem',
      q: {
        gu: 'આ આવિષ્કાર તમારા ગામ કે ખેતરમાં કઈ મોટી સમસ્યા દૂર કરે છે?',
        hi: 'यह आविष्कार आपके गांव या खेत की किस समस्या को हल करता है?',
        en: 'What problem does your invention solve for farmers or villagers?'
      },
      placeholder: {
        gu: 'દા.ત. મજૂરો મળતા નહોતા અને હાથથી નીંદવામાં કમરનો દુખાવો થતો હતો.',
        hi: 'उदा. मजदूरों की कमी और हाथ से काम करने में अत्यधिक शारीरिक थकान।',
        en: 'e.g. High labor costs and intense back pain during weeding.'
      },
      sampleSpeech: {
        gu: 'ચોમાસામાં મજૂરો મળતા નથી અને ખર્ચ બહુ વધી જાય છે, તેથી આ મશીનથી એક જ માણસ આખો દિવસ કામ કરી શકે છે.',
        hi: 'मजदूरों की बहुत कमी रहती है और खर्च ज्यादा आता है, इससे एक ही आदमी आसानी से काम कर सकता है।',
        en: 'Labor is unavailable during monsoons and very expensive; this allows a single person to weed an acre.'
      }
    },
    {
      id: 'solution',
      q: {
        gu: 'આ મશીન કઈ રીતે કામ કરે છે અને તેમાં કઈ દેશી ટેકનિક વાપરી છે?',
        hi: 'यह मशीन कैसे काम करती है और आपने इसमें क्या देशी तकनीक लगाई है?',
        en: 'How does it work, and what mechanism or materials did you use?'
      },
      placeholder: {
        gu: 'દા.ત. જૂની સાઇકલની ચેઇન, હેન્ડલ અને લોખંડના તીક્ષ્ણ બ્લેડ.',
        hi: 'उदा. पुरानी साइकिल की चेन, लीवर और बदली जा सकने वाली तेज ब्लेड।',
        en: 'e.g. Recycled bicycle chain, rolling chassis, and interchangeable sharp scrap blades.'
      },
      sampleSpeech: {
        gu: 'જૂની સાઇકલની ચેઇન અને પૈડાં સાથે ત્રણ બ્લેડ જોડેલા છે, આગળ ધકેલવાથી જમીનમાંથી ઘાસ મૂળમાંથી કપાઈ જાય છે.',
        hi: 'साइकिल की चेन और पहियों के साथ तीन ब्लेड जोड़े हैं, आगे धक्का देने से घास कट जाती है।',
        en: 'A rolling wheel with chain transmission drives three ground blades that slice weeds at root depth.'
      }
    },
    {
      id: 'village',
      q: {
        gu: 'તમે કયા ગામ, તાલુકા કે જિલ્લાના છો?',
        hi: 'आप किस गांव, तहसील या जिले के रहने वाले हैं?',
        en: 'Which village, town, or district are you located in?'
      },
      placeholder: {
        gu: 'દા.ત. રાધનપુર, પાટણ જિલ્લો, ગુજરાત',
        hi: 'उदा. खींवसर, नागौर जिला, राजस्थान',
        en: 'e.g. Radhanpur, Patan District, Gujarat'
      },
      sampleSpeech: {
        gu: 'હું પાટણ જિલ્લાના રાધનપુર ગામનો રહેવાસી છું.',
        hi: 'मैं राजस्थान के नागौर जिले के खींवसर गांव से हूँ।',
        en: 'I am from Radhanpur village in Patan district, Gujarat.'
      }
    },
    {
      id: 'stage',
      q: {
        gu: 'હાલમાં આ આવિષ્કાર કયા તબક્કે છે?',
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
        hi: 'यह प्रोटोटाइप खेतों में परखा जा चुका है और पूरी तरह काम करता है।',
        en: 'It is a working prototype tested in fields.'
      },
      suggestedOptions: ['Idea', 'Prototype', 'Tested', 'Adopted']
    }
  ];

  const activeQuestion = questions[currentStep];

  // Play current question voice aloud
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

  // Play question automatically when step changes
  useEffect(() => {
    const qText = activeQuestion.q[language] || activeQuestion.q.gu || activeQuestion.q.en;
    speakQuestion(qText);
    setCurrentAnswer((formData as any)[activeQuestion.id] || '');

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStep, language]);

  // Voice recording simulation for answer
  const startRecordingAnswer = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecordingAnswer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    // Populate with simulated speech matching current question
    const spoken = activeQuestion.sampleSpeech[language] || activeQuestion.sampleSpeech.gu || activeQuestion.sampleSpeech.en;
    setCurrentAnswer(spoken);

    // Speak confirmation back to user
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const confirmUtterance = new SpeechSynthesisUtterance(
        language === 'gu'
          ? `મેં નોંધ્યું: ${spoken}`
          : language === 'hi'
          ? `मैंने नोट किया: ${spoken}`
          : `Recorded: ${spoken}`
      );
      if (language === 'gu') confirmUtterance.lang = 'gu-IN';
      else if (language === 'hi') confirmUtterance.lang = 'hi-IN';
      else confirmUtterance.lang = 'en-IN';
      window.speechSynthesis.speak(confirmUtterance);
    }
  };

  const saveStepAnswer = () => {
    const updated = {
      ...formData,
      [activeQuestion.id]: currentAnswer,
      rawVoiceTranscript: `${formData.rawVoiceTranscript} ${currentAnswer}`.trim(),
    };

    // Auto-detect sector if on title/solution
    if (activeQuestion.id === 'title' || activeQuestion.id === 'solution') {
      const lower = currentAnswer.toLowerCase();
      if (lower.includes('પાણી') || lower.includes('water') || lower.includes('सिंचाई') || lower.includes('સિંચાઈ')) {
        updated.sector = 'Water and Sanitation';
      } else if (lower.includes('સોલાર') || lower.includes('solar') || lower.includes('सौर')) {
        updated.sector = 'Renewable Energy';
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-lg space-y-6 max-w-2xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#104C35]">
              {t('conversationalTitle')}
            </h3>
            <p className="text-[11px] text-[#6B756E]">
              Step {currentStep + 1} of {questions.length} • {t('conversationalSubtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="text-xs text-gray-400 hover:text-gray-700 font-semibold"
        >
          Cancel
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentStep
                ? 'w-8 bg-[#176B45]'
                : idx < currentStep
                ? 'w-2 bg-emerald-300'
                : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-[#EAF5ED]/60 rounded-2xl p-6 border border-emerald-200/80 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#104C35] font-serif leading-snug">
            {activeQuestion.q[language] || activeQuestion.q.gu || activeQuestion.q.en}
          </h2>

          <button
            onClick={() =>
              speakQuestion(activeQuestion.q[language] || activeQuestion.q.gu || activeQuestion.q.en)
            }
            className={`p-2 rounded-full transition-all ${
              isSpeakingQuestion
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-white text-[#176B45] hover:bg-emerald-100 shadow-xs'
            }`}
            title="Read question aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Input Mode Toggle (Voice vs Type) */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setInputMode('voice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              inputMode === 'type'
                ? 'bg-[#176B45] text-white shadow-xs'
                : 'bg-white text-[#18251E] hover:bg-emerald-50'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>{t('typeAnswerBtn')}</span>
          </button>
        </div>

        {/* VOICE INPUT MODE */}
        {inputMode === 'voice' && (
          <div className="py-4 text-center space-y-3">
            {isRecording ? (
              <div className="space-y-3">
                <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-600/30 animate-pulse cursor-pointer">
                  <Square className="w-8 h-8 fill-white" onClick={stopRecordingAnswer} />
                </div>
                <p className="text-xs font-mono font-bold text-red-600">
                  Listening... 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                </p>
                <button
                  type="button"
                  onClick={stopRecordingAnswer}
                  className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  {t('stopRecording')}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={startRecordingAnswer}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#104C35] to-[#176B45] text-white flex items-center justify-center mx-auto shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Mic className="w-9 h-9" />
                </button>
                <p className="text-xs text-[#6B756E] font-medium">
                  Tap mic and speak naturally in Gujarati, Hindi or English
                </p>
              </div>
            )}
          </div>
        )}

        {/* Suggested Illustrated Options for stage/choice */}
        {activeQuestion.suggestedOptions && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            {activeQuestion.suggestedOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setCurrentAnswer(opt)}
                className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                  currentAnswer === opt
                    ? 'bg-[#176B45] text-white border-[#176B45]'
                    : 'bg-white text-[#18251E] hover:bg-emerald-50 border-emerald-900/10'
                }`}
              >
                {tStage(opt)}
              </button>
            ))}
          </div>
        )}

        {/* Current Extracted / Typed Answer preview */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-[11px] font-bold text-[#104C35] uppercase tracking-wider">
            Your Answer:
          </label>
          <textarea
            rows={2}
            value={currentAnswer}
            onChange={e => setCurrentAnswer(e.target.value)}
            placeholder={activeQuestion.placeholder[language] || activeQuestion.placeholder.gu || activeQuestion.placeholder.en}
            className="w-full bg-white border border-emerald-900/15 rounded-xl p-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#176B45]"
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          className="flex items-center gap-1 text-xs font-bold text-[#6B756E] hover:text-[#18251E] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('prevQuestionBtn')}</span>
        </button>

        <button
          type="button"
          onClick={saveStepAnswer}
          className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
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
  );
};
