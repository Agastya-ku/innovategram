'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Sector, Stage, Innovation, MediaItem } from '@/types/innovategram';
import {
  Mic,
  MicOff,
  Square,
  Play,
  RotateCcw,
  Camera,
  Video,
  Upload,
  MapPin,
  CheckCircle,
  AlertCircle,
  Volume2,
  Edit3,
  Check,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Phone,
  FileText,
  Trash2,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  Rajasthan: ['Nagaur', 'Jaisalmer', 'Sikar', 'Jodhpur', 'Jaipur', 'Udaipur', 'Barmer', 'Bikaner'],
  Gujarat: ['Banaskantha', 'Patan', 'Dahod', 'Vadodara', 'Sabarkantha', 'Rajkot', 'Kutch', 'Surat', 'Mehsana'],
  Maharashtra: ['Gadchiroli', 'Kolhapur', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur', 'Solapur', 'Satara'],
  Punjab: ['Sangrur', 'Ludhiana', 'Amritsar', 'Patiala', 'Bathinda', 'Jalandhar', 'Hoshiarpur'],
  'Madhya Pradesh': ['Mandsaur', 'Neemuch', 'Indore', 'Ujjain', 'Bhopal', 'Jabalpur', 'Khargone'],
  Haryana: ['Hisar', 'Karnal', 'Rohtak', 'Sirsa', 'Kurukshetra', 'Sonipat'],
  'Uttar Pradesh': ['Varanasi', 'Gorakhpur', 'Meerut', 'Lucknow', 'Jhansi', 'Aligarh'],
  Karnataka: ['Dharwad', 'Belagavi', 'Mysuru', 'Ballari', 'Shivamogga', 'Tumakuru']
};

export default function InnovatorPortalPage() {
  const { language, t, tSector, tStage } = useLanguage();
  const { addInnovation } = useInnovations();

  // Wizard steps: 'intro' | 'recording' | 'media' | 'location' | 'ai-review' | 'success'
  const [step, setStep] = useState<'intro' | 'recording' | 'media' | 'location' | 'ai-review' | 'success'>('intro');

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioTranscript, setAudioTranscript] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Media state
  const [photos, setPhotos] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Location state
  const [state, setState] = useState<string>('Rajasthan');
  const [district, setDistrict] = useState<string>('Nagaur');
  const [village, setVillage] = useState<string>('');
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Optional phone & innovator name
  const [innovatorName, setInnovatorName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // AI Extracted Profile state
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiTitle, setAiTitle] = useState<Record<string, string>>({ en: '', hi: '', gu: '' });
  const [aiProblem, setAiProblem] = useState<Record<string, string>>({ en: '', hi: '', gu: '' });
  const [aiSolution, setAiSolution] = useState<Record<string, string>>({ en: '', hi: '', gu: '' });
  const [aiSector, setAiSector] = useState<Sector>('Agriculture');
  const [aiStage, setAiStage] = useState<Stage>('Prototype');
  const [aiConfidence, setAiConfidence] = useState<number>(92);
  const [isEditingAi, setIsEditingAi] = useState(false);

  // Final submission state
  const [submitting, setSubmitting] = useState(false);
  const [submittedInnovation, setSubmittedInnovation] = useState<Innovation | null>(null);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Web Audio / MediaRecorder Handler
  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = e => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
          // Set simulated transcript based on selected language
          if (!audioTranscript) {
            if (language === 'hi') {
              setAudioTranscript('मैंने खेतों के लिए एक कम लागत वाला स्वचालित यंत्र बनाया है जो बिना बिजली के फसलों से खरपतवार साफ करता है।');
            } else if (language === 'gu') {
              setAudioTranscript('મેં ખેતરમાં ઓછા ખર્ચે નિંદામણ દૂર કરવા માટે દેશી સાઇકલના પુર્જામાંથી મશીન બનાવ્યું છે જે બહુ સરળતાથી ચાલે છે.');
            } else {
              setAudioTranscript('I built a low-cost manually propelled farm tool made from recycled bicycle parts to remove weeds without petrol or electricity.');
            }
          }
        };

        mediaRecorderRef.current.start();
      }
    } catch (err) {
      console.warn('Microphone permission not granted or unavailable, using browser simulation', err);
      // Fallback simulated recording
      setAudioBlobUrl('https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg');
      if (language === 'hi') {
        setAudioTranscript('मैंने खेतों के लिए एक कम लागत वाला यंत्र बनाया है जो फसलों से खरपतवार साफ करता है।');
      } else if (language === 'gu') {
        setAudioTranscript('મેં ખેતરમાં નિંદામણ દૂર કરવા માટે દેશી જુગાડથી મશીન બનાવ્યું છે.');
      } else {
        setAudioTranscript('I developed a low-cost farm implement that cuts manual labor for weeding in cotton fields.');
      }
    }

    setIsRecording(true);
    setRecordingSeconds(0);
    setStep('recording');

    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const resetRecording = () => {
    stopRecording();
    setAudioBlobUrl(null);
    setAudioTranscript('');
    setRecordingSeconds(0);
    startRecording();
  };

  // Mock photo upload handler with realistic previews
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls: string[] = [];
      Array.from(e.target.files).forEach(file => {
        newUrls.push(URL.createObjectURL(file));
      });
      setPhotos(prev => [...prev, ...newUrls]);
    }
  };

  // Mock video upload handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Browser Geolocation
  const handleGetLocation = () => {
    setGpsLoading(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setGpsLoading(false);
        // Default to regional coordinates
        setState('Rajasthan');
        setDistrict('Nagaur');
        setVillage('Local Panchayat Area');
      },
      err => {
        setGpsLoading(false);
        setGpsError('Could not obtain GPS. Please select your State and District manually below.');
      },
      { timeout: 7000 }
    );
  };

  // Simulate AI Pipeline Execution
  const processSubmissionWithAI = async () => {
    setAiProcessing(true);
    setStep('ai-review');

    // Simulate smart multilingual extraction
    setTimeout(() => {
      let titleEn = 'Low-Cost Manual Agro Implement';
      let titleHi = 'कम लागत वाला हस्तचालित कृषि उपकरण';
      let titleGu = 'ઓછા ખર્ચે હાથથી ચાલતું ખેતી સાધન';

      let probEn = 'Manual weeding in rural farmland is backbreaking and requires unaffordable hired labor during the monsoon.';
      let probHi = 'वर्षा ऋतु में खेतों से खरपतवार निकालना बहुत थकाऊ होता है और महंगे मजदूरों की भारी कमी रहती है।';
      let probGu = 'ચોમાસામાં ખેતરમાં નીંદણ કાઢવામાં બહુ મહેનત પડે છે અને મોંઘા મજૂરો મળતા નથી.';

      let solEn = 'A lightweight wheel-assisted device fabricated from recycled cycle parts with interchangeable scraping blades.';
      let solHi = 'साइकिल के पुराने कलपुर्जों से बना पहिएदार हल्का यंत्र, जिसमें आसानी से बदले जा सकने वाले ब्लेड लगे हैं।';
      let solGu = 'સાઇકલના જૂના પાર્ટ્સમાંથી બનેલું પૈડાંવાળું સાધન, જેમાં સરળતાથી બદલી શકાય તેવા બ્લેડ છે.';

      if (audioTranscript.toLowerCase().includes('water') || audioTranscript.includes('पानी') || audioTranscript.includes('પાણી')) {
        titleEn = 'Smart Water Conservation Module';
        titleHi = 'स्मार्ट जल संरक्षण एवं बचत प्रणाली';
        titleGu = 'સ્માર્ટ પાણી બચાવ પ્રણાલી';
        setAiSector('Water and Sanitation');
      } else if (audioTranscript.toLowerCase().includes('solar') || audioTranscript.includes('सौर') || audioTranscript.includes('વીજળી')) {
        titleEn = 'Off-Grid Renewable Solar Unit';
        titleHi = 'ऑफ-ग्रिड सौर ऊर्जा इकाई';
        titleGu = 'ઑફ-ગ્રીડ સોલાર પાવર યુનિટ';
        setAiSector('Renewable Energy');
      } else {
        setAiSector('Agriculture');
      }

      setAiTitle({ en: titleEn, hi: titleHi, gu: titleGu });
      setAiProblem({ en: probEn, hi: probHi, gu: probGu });
      setAiSolution({ en: solEn, hi: solHi, gu: solGu });
      setAiStage('Prototype');
      setAiConfidence(94);
      setAiProcessing(false);
    }, 1800);
  };

  // Text to speech readout
  const handleReadAloud = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const currentTitle = aiTitle[language] || aiTitle.en;
      const currentProb = aiProblem[language] || aiProblem.en;
      const currentSol = aiSolution[language] || aiSolution.en;
      const text = `${currentTitle}. ${currentProb}. ${currentSol}`;
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'gu') utterance.lang = 'gu-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Final Submit to Context & Storage
  const handleFinalSubmit = async () => {
    setSubmitting(true);

    const mediaItems: MediaItem[] = [];
    if (photos.length > 0) {
      photos.forEach((url, idx) => {
        mediaItems.push({ id: `p-${idx}`, type: 'photo', url, caption: 'Innovator uploaded prototype photo' });
      });
    } else {
      mediaItems.push({
        id: 'p-def',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        caption: 'Grassroots working prototype'
      });
    }

    if (videoUrl) {
      mediaItems.push({ id: 'v-1', type: 'video', url: videoUrl, caption: 'Working demonstration video' });
    }

    const newInnovation = await addInnovation({
      title: aiTitle as any,
      problem: aiProblem as any,
      solution: aiSolution as any,
      originalLanguage: language,
      originalTranscript: audioTranscript || 'Voice submission recorded by rural innovator.',
      audioUrl: audioBlobUrl || undefined,
      media: mediaItems,
      sector: aiSector,
      stage: aiStage,
      status: 'Pending Review',
      location: {
        state,
        district,
        villageOrTown: village || 'Gram Panchayat Area',
        lat: state === 'Gujarat' ? 23.0225 : 26.9124,
        lng: state === 'Gujarat' ? 72.5714 : 75.7873,
        isApproximate: true
      },
      innovatorName: innovatorName || 'Grassroots Inventor',
      innovatorContactProtected: true,
      innovatorPhoneMasked: phoneNumber ? `${phoneNumber.slice(0, 5)} •••••` : '+91 98290 •••••',
      innovatorPhone: phoneNumber || '+91 98290 12345',
      submissionType: audioBlobUrl && photos.length > 0 ? 'combined' : audioBlobUrl ? 'voice' : 'photo',
      aiConfidenceScore: aiConfidence,
      keywords: [aiSector.toLowerCase(), 'grassroots', 'rural', 'prototype'],
      potentialApplications: ['Rural livelihood enhancement', 'Agricultural productivity'],
      isSampleData: false
    });

    setSubmittedInnovation(newInnovation);
    setSubmitting(false);
    setStep('success');

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Innovator Portal Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF5ED] text-[#176B45] flex items-center justify-center font-bold">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#104C35]">{t('portalInnovator')}</h2>
            <p className="text-xs text-[#6B756E]">Simple, Voice-First, 0 Paperwork</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/innovator/my-innovations"
            className="text-xs font-semibold text-[#176B45] bg-[#EAF5ED] hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('myInnovationsBtn')}</span>
          </Link>
          <Link
            href="/innovator/help"
            className="text-xs text-[#6B756E] hover:text-[#176B45] p-1.5 rounded-lg border border-emerald-900/10"
            title="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* STEP 1: INTRO & PROMINENT VOICE RECORD BUTTON */}
      {step === 'intro' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-emerald-100/70 px-3 py-1 rounded-full">
              Voice-First Rural Platform
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#104C35] font-serif leading-tight">
              {t('innovatorWelcomeTitle')}
            </h1>
            <p className="text-sm sm:text-base text-[#18251E]/80 max-w-lg mx-auto leading-relaxed">
              {t('innovatorWelcomeSubtitle')}
            </p>
          </div>

          {/* VERY PROMINENT MICROPHONE BUTTON */}
          <div className="py-4">
            <button
              onClick={startRecording}
              className="relative group w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-gradient-to-tr from-[#104C35] via-[#176B45] to-emerald-500 flex flex-col items-center justify-center text-white shadow-2xl shadow-emerald-900/30 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-ping group-hover:border-emerald-300 pointer-events-none" />
              <Mic className="w-14 h-14 sm:w-18 sm:h-18 mb-1" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                {t('voiceRecordBtn')}
              </span>
            </button>
            <p className="text-xs text-[#6B756E] mt-4 font-medium">
              Tap once to speak in Hindi, Gujarati or English
            </p>
          </div>

          {/* Alternate Upload Options */}
          <div className="border-t border-emerald-900/10 pt-6">
            <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider mb-4">
              Or submit using media
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => setStep('media')}
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-emerald-900/20 bg-emerald-50/50 hover:bg-emerald-100/60 text-[#104C35] font-semibold text-xs sm:text-sm transition-colors"
              >
                <Camera className="w-4 h-4 text-[#176B45]" />
                <span>{t('photoUploadBtn')}</span>
              </button>
              <button
                onClick={() => setStep('media')}
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-emerald-900/20 bg-emerald-50/50 hover:bg-emerald-100/60 text-[#104C35] font-semibold text-xs sm:text-sm transition-colors"
              >
                <Video className="w-4 h-4 text-[#176B45]" />
                <span>{t('videoUploadBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ACTIVE VOICE RECORDING INTERFACE */}
      {step === 'recording' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#104C35]">
              {isRecording ? t('recordingActive') : t('voiceInstructions')}
            </h3>
            <p className="text-xs text-[#6B756E]">
              Speak naturally about what you made, how it works, and what problem it solves.
            </p>
          </div>

          {/* Animated Waveform & Timer */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="h-20 flex items-center justify-center gap-1.5 px-8 bg-emerald-50 rounded-2xl border border-emerald-100 w-full max-w-md mb-4">
              {isRecording ? (
                <>
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-1" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-2" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-3" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-4" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-5" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-2" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-4" />
                  <div className="w-2 bg-[#176B45] rounded-full animate-waveform-1" />
                </>
              ) : (
                <div className="text-xs text-emerald-800 font-medium">
                  Audio ready: {recordingSeconds} seconds recorded
                </div>
              )}
            </div>

            <div className="text-2xl font-mono font-bold text-[#104C35]">
              00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>{t('stopRecording')}</span>
              </button>
            ) : (
              <>
                {audioBlobUrl && (
                  <audio src={audioBlobUrl} controls className="h-10 rounded-lg max-w-xs" />
                )}
                <button
                  onClick={resetRecording}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#18251E] font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('retryRecording')}</span>
                </button>
                <button
                  onClick={() => setStep('media')}
                  className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm"
                >
                  <span>Continue to Photos / Media</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: PHOTO & VIDEO UPLOADS */}
      {step === 'media' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#104C35]">{t('mediaTitle')}</h3>
            <p className="text-xs text-[#6B756E] mt-1">{t('mediaSubtitle')}</p>
          </div>

          {/* Photo upload zone */}
          <div className="border-2 border-dashed border-emerald-900/20 rounded-2xl p-6 text-center bg-[#F8FAF7]">
            <input
              type="file"
              accept="image/*"
              multiple
              id="photo-input"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <label
              htmlFor="photo-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#176B45] flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#104C35]">
                {t('takePhoto')} or Choose Pictures
              </span>
              <span className="text-xs text-[#6B756E]">Supports JPG, PNG up to 10MB</span>
            </label>
          </div>

          {/* Photo Previews */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {photos.map((url, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden h-24 border border-emerald-900/10">
                  <img src={url} alt={`Upload preview ${i}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Video upload zone */}
          <div className="border-2 border-dashed border-emerald-900/20 rounded-2xl p-6 text-center bg-[#F8FAF7]">
            <input
              type="file"
              accept="video/*"
              id="video-input"
              className="hidden"
              onChange={handleVideoUpload}
            />
            <label
              htmlFor="video-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#176B45] flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#104C35]">
                {t('recordVideo')} or Choose Clip
              </span>
              <span className="text-xs text-[#6B756E]">Short 30-60 second clip of the machine working</span>
            </label>
          </div>

          {videoUrl && (
            <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between text-xs text-[#104C35]">
              <span className="font-semibold">Video ready for upload</span>
              <button onClick={() => setVideoUrl(null)} className="text-red-600 font-bold">Remove</button>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-emerald-900/10">
            <button
              onClick={() => setStep('recording')}
              className="text-xs font-semibold text-[#6B756E] hover:text-[#18251E]"
            >
              Back to Audio
            </button>
            <button
              onClick={() => setStep('location')}
              className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm"
            >
              <span>Continue to Location</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: LOCATION SELECTION */}
      {step === 'location' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#104C35]">{t('locationTitle')}</h3>
            <p className="text-xs text-[#6B756E] mt-1">{t('locationSubtitle')}</p>
          </div>

          {/* GPS Quick Button */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#176B45]" />
              <div>
                <p className="text-xs font-bold text-[#104C35]">Automatic Location Detection</p>
                <p className="text-[11px] text-[#6B756E]">Detect State and District with device permission</p>
              </div>
            </div>
            <button
              onClick={handleGetLocation}
              disabled={gpsLoading}
              className="w-full sm:w-auto bg-white border border-emerald-900/20 text-[#176B45] font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-emerald-100/50"
            >
              {gpsLoading ? 'Detecting...' : t('useGpsBtn')}
            </button>
          </div>

          {gpsError && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">
              {gpsError}
            </div>
          )}

          {/* Manual Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#18251E] mb-1.5">{t('selectState')}</label>
              <select
                value={state}
                onChange={e => {
                  setState(e.target.value);
                  const dists = INDIAN_STATES_DISTRICTS[e.target.value] || [];
                  if (dists.length > 0) setDistrict(dists[0]);
                }}
                className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-[#176B45]"
              >
                {Object.keys(INDIAN_STATES_DISTRICTS).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#18251E] mb-1.5">{t('selectDistrict')}</label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-[#176B45]"
              >
                {(INDIAN_STATES_DISTRICTS[state] || []).map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#18251E] mb-1.5">{t('enterVillage')}</label>
            <input
              type="text"
              placeholder="e.g. Khinvsar or Sam"
              value={village}
              onChange={e => setVillage(e.target.value)}
              className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#176B45]"
            />
          </div>

          {/* Optional Contact Details */}
          <div className="border-t border-emerald-900/10 pt-4 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#104C35]">
              <Phone className="w-3.5 h-3.5 text-[#176B45]" />
              <span>Innovator Details (Optional - Protected by Privacy Shield)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#6B756E] mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rameshwar Lal"
                  value={innovatorName}
                  onChange={e => setInnovatorName(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B756E] mb-1">Mobile Phone (for SMS updates)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-2.5 text-sm"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#6B756E]">
              We never share your phone number publicly. Only verified institutions can request contact.
            </p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-emerald-900/10">
            <button
              onClick={() => setStep('media')}
              className="text-xs font-semibold text-[#6B756E] hover:text-[#18251E]"
            >
              Back to Media
            </button>
            <button
              onClick={processSubmissionWithAI}
              className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{t('processVoiceWithAI')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: AI PROFILE CONFIRMATION & REVIEW */}
      {step === 'ai-review' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-6">
          {aiProcessing ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-[#104C35]">AI Engine is Analyzing Your Voice & Media...</h3>
              <p className="text-xs text-[#6B756E] max-w-sm mx-auto">
                Transcribing audio, detecting language, extracting problem, solution, sector, and translating into 3 languages.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Confidence: {aiConfidence}%</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#104C35]">{t('aiGeneratedProfile')}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReadAloud}
                    className="flex items-center gap-1.5 bg-[#EAF5ED] text-[#176B45] hover:bg-emerald-100 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t('readAloud')}</span>
                  </button>
                  <button
                    onClick={() => setIsEditingAi(!isEditingAi)}
                    className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#18251E] font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingAi ? 'Done Editing' : t('editInformation')}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                {t('aiVerificationNotice')}
              </div>

              {/* Profile Card Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                    {t('fieldTitle')}
                  </label>
                  {isEditingAi ? (
                    <input
                      type="text"
                      value={aiTitle[language] || aiTitle.en}
                      onChange={e =>
                        setAiTitle({ ...aiTitle, [language]: e.target.value })
                      }
                      className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm font-bold text-[#104C35]"
                    />
                  ) : (
                    <div className="text-base font-bold text-[#104C35] p-3 bg-emerald-50/50 rounded-xl">
                      {aiTitle[language] || aiTitle.en}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                    {t('fieldProblem')}
                  </label>
                  {isEditingAi ? (
                    <textarea
                      rows={2}
                      value={aiProblem[language] || aiProblem.en}
                      onChange={e =>
                        setAiProblem({ ...aiProblem, [language]: e.target.value })
                      }
                      className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm"
                    />
                  ) : (
                    <div className="text-xs text-[#18251E] p-3 bg-gray-50 rounded-xl leading-relaxed">
                      {aiProblem[language] || aiProblem.en}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                    {t('fieldSolution')}
                  </label>
                  {isEditingAi ? (
                    <textarea
                      rows={2}
                      value={aiSolution[language] || aiSolution.en}
                      onChange={e =>
                        setAiSolution({ ...aiSolution, [language]: e.target.value })
                      }
                      className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm"
                    />
                  ) : (
                    <div className="text-xs text-[#18251E] p-3 bg-gray-50 rounded-xl leading-relaxed">
                      {aiSolution[language] || aiSolution.en}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                      {t('fieldSector')}
                    </label>
                    <div className="text-xs font-semibold text-emerald-900 p-2.5 bg-emerald-50 rounded-xl">
                      {tSector(aiSector)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                      {t('fieldStage')}
                    </label>
                    <div className="text-xs font-semibold text-emerald-900 p-2.5 bg-emerald-50 rounded-xl">
                      {tStage(aiStage)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                    {t('fieldLocation')}
                  </label>
                  <div className="text-xs text-[#18251E] p-2.5 bg-gray-50 rounded-xl">
                    {village || 'Village'}, {district}, {state}
                  </div>
                </div>
              </div>

              {/* Confirmation CTA */}
              <div className="pt-4 border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setStep('location')}
                  className="w-full sm:w-auto text-xs font-semibold text-[#6B756E] hover:text-[#18251E] py-2"
                >
                  Back to Location
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all text-sm"
                >
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>{submitting ? 'Submitting...' : t('confirmAndSubmit')}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 6: SUBMISSION SUCCESS & RECEIPT */}
      {step === 'success' && submittedInnovation && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#176B45] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-8 h-8 text-[#176B45]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif">
              {t('submissionSuccessTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B756E] max-w-md mx-auto">
              {t('submissionSuccessSubtitle')}
            </p>
          </div>

          {/* Unique ID Receipt Card */}
          <div className="bg-[#F8FAF7] border-2 border-emerald-900/15 rounded-2xl p-6 max-w-md mx-auto space-y-3">
            <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider">
              {t('innovationIdLabel')}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-mono tracking-wider">
              {submittedInnovation.id}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-semibold">{submittedInnovation.status}</span>
              <span>•</span>
              <span>{submittedInnovation.submissionDate}</span>
            </div>
            <div className="text-[11px] text-[#6B756E] pt-2 border-t border-emerald-900/10">
              Keep this ID to track review outcomes or recover submission.
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-emerald-900/20 bg-white hover:bg-gray-50 text-[#104C35] text-xs font-bold transition-colors"
            >
              {t('saveReceiptBtn')}
            </button>
            <Link
              href={`/innovations/${submittedInnovation.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold transition-colors"
            >
              {t('trackStatusBtn')}
            </Link>
            <button
              onClick={() => {
                setStep('intro');
                setAudioBlobUrl(null);
                setPhotos([]);
                setVideoUrl(null);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-[#6B756E] hover:text-[#18251E]"
            >
              {t('submitAnotherBtn')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

