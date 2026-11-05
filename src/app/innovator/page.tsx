'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Sector, Stage, Innovation, MediaItem } from '@/types/innovategram';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import { ConversationalVoiceForm, ConversationalFormData } from '@/components/ConversationalVoiceForm';
import {
  Mic,
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
  ShieldCheck,
  Sparkles,
  Phone,
  FileText,
  Trash2,
  RefreshCw,
  HelpCircle,
  UserCheck,
  HeartHandshake,
  MessageSquare,
  Printer
} from 'lucide-react';

const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  Gujarat: ['Banaskantha', 'Patan', 'Dahod', 'Vadodara', 'Sabarkantha', 'Rajkot', 'Kutch', 'Surat', 'Mehsana', 'Ahmedabad', 'Bhavnagar', 'Junagadh', 'Gandhinagar', 'Jamnagar', 'Amreli', 'Anand', 'Bharuch', 'Surendranagar', 'Navsari', 'Valsad'],
  Rajasthan: ['Nagaur', 'Jaisalmer', 'Sikar', 'Jodhpur', 'Jaipur', 'Udaipur', 'Barmer', 'Bikaner', 'Ajmer', 'Alwar', 'Bhilwara', 'Kota'],
  Maharashtra: ['Gadchiroli', 'Kolhapur', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur', 'Solapur', 'Satara', 'Ahmednagar', 'Jalgaon'],
  Punjab: ['Sangrur', 'Ludhiana', 'Amritsar', 'Patiala', 'Bathinda', 'Jalandhar', 'Hoshiarpur', 'Firozpur'],
  'Madhya Pradesh': ['Mandsaur', 'Neemuch', 'Indore', 'Ujjain', 'Bhopal', 'Jabalpur', 'Khargone', 'Dewas'],
  Haryana: ['Hisar', 'Karnal', 'Rohtak', 'Sirsa', 'Kurukshetra', 'Sonipat', 'Bhiwani', 'Fatehabad'],
  'Uttar Pradesh': ['Varanasi', 'Gorakhpur', 'Meerut', 'Lucknow', 'Jhansi', 'Aligarh', 'Agra', 'Bareilly'],
  Karnataka: ['Dharwad', 'Belagavi', 'Mysuru', 'Ballari', 'Shivamogga', 'Tumakuru', 'Mandya', 'Bagalkot']
};

function InnovatorPortalContent() {
  const { language, t, tSector, tStage } = useLanguage();
  const { addInnovation } = useInnovations();
  const searchParams = useSearchParams();

  // 1. Two Registration Pathways: 'self' | 'assisted'
  const initialPathway = searchParams.get('pathway') === 'assisted' ? 'assisted' : 'self';
  const [pathway, setPathway] = useState<'self' | 'assisted'>(initialPathway);

  // Submitter / Helper fields for Option B (Assisted)
  const [submitterName, setSubmitterName] = useState<string>('');
  const [submitterRelationship, setSubmitterRelationship] = useState<string>('Friend/Neighbor');
  const [submitterPhone, setSubmitterPhone] = useState<string>('');
  const [innovatorConsentGiven, setInnovatorConsentGiven] = useState<boolean>(true);

  // Actual Inventor fields
  const [innovatorName, setInnovatorName] = useState<string>('');
  const [innovatorPhone, setInnovatorPhone] = useState<string>('');

  // Mode: 'direct' (one-tap voice) | 'conversational' (step-by-step Q&A)
  const [submissionMode, setSubmissionMode] = useState<'direct' | 'conversational'>('direct');

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

  // Location state (Default to Gujarat)
  const [state, setState] = useState<string>('Gujarat');
  const [district, setDistrict] = useState<string>('Patan');
  const [village, setVillage] = useState<string>('');
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // AI Extracted Profile state
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiTitle, setAiTitle] = useState<Record<string, string>>({ en: '', hi: '', gu: '' });
  const [aiProblem, setAiProblem] = useState<Record<string, string>>({ en: '', hi: '', gu: '' });
  const [aiSolution, setAiSolution] = useState<Record<string, string>>({ en: '', hi: '', gu: '' });
  const [aiSector, setAiSector] = useState<Sector>('Agriculture');
  const [aiStage, setAiStage] = useState<Stage>('Prototype');
  const [aiConfidence, setAiConfidence] = useState<number>(95);
  const [isEditingAi, setIsEditingAi] = useState(false);

  // Final submission state
  const [submitting, setSubmitting] = useState(false);
  const [submittedInnovation, setSubmittedInnovation] = useState<Innovation | null>(null);

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
          if (!audioTranscript) {
            if (language === 'gu') {
              setAudioTranscript('મેં ખેતરમાં ઓછા ખર્ચે નિંદામણ દૂર કરવા માટે દેશી સાઇકલના પુર્જામાંથી હાથથી ચાલતું મશીન બનાવ્યું છે જે બહુ સરળતાથી ચાલે છે અને મજૂરી ખર્ચ ઘટાડે છે.');
            } else if (language === 'hi') {
              setAudioTranscript('मैंने खेतों के लिए एक कम लागत वाला यंत्र बनाया है जो बिना बिजली के फसलों से खरपतवार साफ करता है और शारीरिक श्रम बचाता है।');
            } else {
              setAudioTranscript('I built a low-cost manually propelled farm tool made from recycled bicycle parts to remove weeds without petrol or electricity.');
            }
          }
        };

        mediaRecorderRef.current.start();
      }
    } catch (err) {
      console.warn('Microphone permission not granted or simulated', err);
      setAudioBlobUrl('https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg');
      if (language === 'gu') {
        setAudioTranscript('મેં ખેતરમાં નિંદામણ દૂર કરવા માટે દેશી જુગાડથી મશીન બનાવ્યું છે જે શારીરિક મહેનત બચાવે છે.');
      } else if (language === 'hi') {
        setAudioTranscript('मैंने खेतों के लिए एक कम लागत वाला यंत्र बनाया है जो फसलों से खरपतवार साफ करता है।');
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls: string[] = [];
      Array.from(e.target.files).forEach(file => {
        newUrls.push(URL.createObjectURL(file));
      });
      setPhotos(prev => [...prev, ...newUrls]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGetLocation = () => {
    setGpsLoading(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser. Please select state and district manually below.');
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setGpsLoading(false);
        setState('Gujarat');
        setDistrict('Patan');
        setVillage(language === 'gu' ? 'રાધનપુર ગ્રામીણ' : language === 'hi' ? 'राधनपुर ग्रामीण' : 'Radhanpur Rural');
      },
      err => {
        setGpsLoading(false);
        setGpsError('Could not obtain GPS coordinates. Please select your State and District manually below.');
      },
      { timeout: 6000 }
    );
  };

  // AI Pipeline Execution
  const processSubmissionWithAI = async () => {
    setAiProcessing(true);
    setStep('ai-review');

    try {
      const fallbackTranscript =
        language === 'gu'
          ? 'મેં ખેતી માટે નીંદણ કાઢવાનું દેશી સાઇકલ આધારિત મશીન બનાવ્યું છે.'
          : language === 'hi'
          ? 'मैंने खेतों के लिए खरपतवार हटाने वाली मशीन बनाई है।'
          : 'I have created a bicycle-based weeding machine for farming.';
      const res = await fetch('/api/ai-classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: audioTranscript || fallbackTranscript,
          language,
          village
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setAiTitle(json.data.extractedTitle);
        setAiProblem(json.data.extractedProblem);
        setAiSolution(json.data.extractedSolution);
        setAiSector(json.data.sector);
        setAiStage(json.data.stage);
        setAiConfidence(json.data.confidenceScore || 95);
        setAiProcessing(false);
        return;
      }
    } catch (e) {
      console.warn('API classify fallback', e);
    }

    // High quality client fallback
    setTimeout(() => {
      let titleGu = 'ઓછા ખર્ચે હાથથી ચાલતું ખેતી સાધન';
      let titleHi = 'कम लागत वाला हस्तचालित कृषि उपकरण';
      let titleEn = 'Low-Cost Manual Agro Weeder Machine';

      let probGu = 'ચોમાસામાં ખેતરમાં નીંદણ કાઢવામાં બહુ મહેનત પડે છે અને મોંઘા મજૂરો મળતા નથી.';
      let probHi = 'वर्षा ऋतु में खेतों से खरपतवार निकालना बहुत थकाऊ होता है और महंगे मजदूरों की भारी कमी रहती है।';
      let probEn = 'Manual weeding in rural farmland is backbreaking and requires unaffordable hired labor during monsoon.';

      let solGu = 'સાઇકલના જૂના પાર્ટ્સમાંથી બનેલું પૈડાંવાળું સાધન, જેમાં સરળતાથી બદલી શકાય તેવા બ્લેડ છે.';
      let solHi = 'साइकिल के पुराने कलपुर्जों से बना पहिएदार हल्का यंत्र, जिसमें आसानी से बदले जा सकने वाले ब्लेड लगे हैं।';
      let solEn = 'A lightweight wheel-assisted device fabricated from recycled cycle parts with interchangeable scraping blades.';

      const tLow = (audioTranscript || '').toLowerCase();
      if (tLow.includes('પાણી') || tLow.includes('water') || tLow.includes('સિંચાઈ') || tLow.includes('सिंचाई')) {
        titleGu = 'સ્માર્ટ પાણી બચાવ અને ડ્રિપ પ્રણાલી';
        titleHi = 'स्मार्ट जल संरक्षण एवं ड्रिप प्रणाली';
        titleEn = 'Smart Water Conservation & Drip Module';
        setAiSector('Water and Sanitation');
      } else if (tLow.includes('સોલાર') || tLow.includes('solar') || tLow.includes('ઊર્જા') || tLow.includes('सौर')) {
        titleGu = 'ઑફ-ગ્રીડ સોલાર પાવર યુનિટ';
        titleHi = 'ऑफ-ग्रिड सौर ऊर्जा इकाई';
        titleEn = 'Off-Grid Renewable Solar Unit';
        setAiSector('Renewable Energy');
      } else {
        setAiSector('Agriculture');
      }

      setAiTitle({ en: titleEn, hi: titleHi, gu: titleGu });
      setAiProblem({ en: probEn, hi: probHi, gu: probGu });
      setAiSolution({ en: solEn, hi: solHi, gu: solGu });
      setAiStage('Prototype');
      setAiConfidence(95);
      setAiProcessing(false);
    }, 1200);
  };

  // Conversational Form completion bridge
  const handleConversationalComplete = (cData: ConversationalFormData) => {
    setInnovatorName(cData.innovatorName);
    setAiTitle({
      gu: cData.title,
      hi: cData.title,
      en: cData.title
    });
    setAiProblem({
      gu: cData.problem,
      hi: cData.problem,
      en: cData.problem
    });
    setAiSolution({
      gu: cData.solution,
      hi: cData.solution,
      en: cData.solution
    });
    setVillage(cData.village);
    setDistrict(cData.district || 'Patan');
    setState(cData.state || 'Gujarat');
    setAiSector(cData.sector || 'Agriculture');
    setAiStage(cData.stage || 'Prototype');
    setAudioTranscript(cData.rawVoiceTranscript);
    setSubmissionMode('direct');
    setStep('ai-review');
  };

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
        caption: 'Grassroots working prototype photograph'
      });
    }

    if (videoUrl) {
      mediaItems.push({ id: 'v-1', type: 'video', url: videoUrl, caption: 'Working demonstration video clip' });
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
      registrationType: pathway,
      submitterName: pathway === 'assisted' ? (submitterName || (language === 'gu' ? 'સહાયક સ્વયંસેવક' : language === 'hi' ? 'सहायक स्वयंसेवक' : 'Community Volunteer')) : undefined,
      submitterRelationship: pathway === 'assisted' ? submitterRelationship : undefined,
      submitterPhoneMasked: pathway === 'assisted' && submitterPhone ? `${submitterPhone.slice(0, 5)} •••••` : undefined,
      innovatorConsentGiven: pathway === 'assisted' ? innovatorConsentGiven : true,
      location: {
        state,
        district,
        villageOrTown: village || (language === 'gu' ? 'ગામ પંચાયત વિસ્તાર' : language === 'hi' ? 'ग्राम पंचायत क्षेत्र' : 'Village/Panchayat Area'),
        lat: state === 'Gujarat' ? 23.8343 : 26.9124,
        lng: state === 'Gujarat' ? 71.6033 : 75.7873,
        isApproximate: true
      },
      innovatorName: innovatorName || (pathway === 'assisted' ? (language === 'gu' ? 'ગ્રામીણ શોધક' : language === 'hi' ? 'ग्रामीण खोजकर्ता' : 'Rural Innovator') : (language === 'gu' ? 'પાયાના આવિષ્કારક' : language === 'hi' ? 'जमीनी आविष्कारक' : 'Grassroots Innovator')),
      innovatorContactProtected: true,
      innovatorPhoneMasked: innovatorPhone ? `${innovatorPhone.slice(0, 5)} •••••` : '+91 94273 •••••',
      innovatorPhone: innovatorPhone || '+91 94273 12345',
      submissionType: audioBlobUrl && photos.length > 0 ? 'combined' : audioBlobUrl ? 'voice' : 'photo',
      aiConfidenceScore: aiConfidence,
      keywords: [aiSector.toLowerCase(), 'grassroots', 'rural', 'gujarat'],
      potentialApplications: ['Rural livelihood enhancement', 'Agricultural productivity'],
      isSampleData: false
    });

    setSubmittedInnovation(newInnovation);
    setSubmitting(false);
    setStep('success');

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
      {/* Top Header Card */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF5ED] text-[#176B45] flex items-center justify-center font-bold">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#104C35]">{t('portalInnovator')}</h2>
              <AudioInstructionButton
                text={`${t('portalInnovator')}. ${t('innovatorWelcomeSubtitle')}`}
                size="xs"
              />
            </div>
            <p className="text-xs text-[#6B756E]">{t('innovatorPortalTagline')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/innovator/my-innovations"
            className="text-xs font-semibold text-[#176B45] bg-[#EAF5ED] hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('myInnovationsBtn')}</span>
          </Link>
          <Link
            href="/innovator/help"
            className="text-xs text-[#6B756E] hover:text-[#176B45] p-2 rounded-xl border border-emerald-900/10"
            title="Help & Voice Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* CONVERSATIONAL MODE OVERLAY */}
      {submissionMode === 'conversational' && (
        <ConversationalVoiceForm
          isAssisted={pathway === 'assisted'}
          onComplete={handleConversationalComplete}
          onCancel={() => setSubmissionMode('direct')}
        />
      )}

      {/* DIRECT SUBMISSION FLOW */}
      {submissionMode === 'direct' && (
        <>
          {/* TWO PATHWAYS TOGGLE CARD (REQUIREMENT 3: OPTION A vs OPTION B) */}
          {step === 'intro' && (
            <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider">
                    {t('pathwayTitle')}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#104C35]">
                      {pathway === 'self' ? t('pathwayOptionA_Title') : t('pathwayOptionB_Title')}
                    </p>
                    <AudioInstructionButton
                      text={pathway === 'self' ? t('pathwayOptionA_Desc') : t('pathwayOptionB_Desc')}
                      size="xs"
                    />
                  </div>
                </div>

                {/* Pathway Switch Tabs */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPathway('self')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      pathway === 'self'
                        ? 'bg-[#176B45] text-white shadow-xs'
                        : 'text-[#6B756E] hover:text-[#18251E]'
                    }`}
                  >
                    {t('pathwayTabSelf')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPathway('assisted')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      pathway === 'assisted'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-[#6B756E] hover:text-[#18251E]'
                    }`}
                  >
                    {t('pathwayTabAssisted')}
                  </button>
                </div>
              </div>

              {/* Assisted Pathway (Option B) Submitter Fields */}
              {pathway === 'assisted' && (
                <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-4 text-xs text-amber-950 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-900 border-b border-amber-200/80 pb-2">
                    <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{t('helperNotice')}</span>
                    <AudioInstructionButton text={t('helperNotice')} size="xs" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block font-bold text-[#18251E] mb-1">
                        {t('fieldSubmitterName')}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'gu' ? 'દા.ત. અજય વર્મા (સ્વયંસેવક/શિક્ષક)' : language === 'hi' ? 'उदा. अजय वर्मा (स्वयंसेवक/शिक्षक)' : 'e.g. Ajay Verma (Volunteer/Teacher)'}
                        value={submitterName}
                        onChange={e => setSubmitterName(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#18251E] mb-1">
                        {t('fieldSubmitterRole')}
                      </label>
                      <select
                        value={submitterRelationship}
                        onChange={e => setSubmitterRelationship(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Friend/Neighbor">{language === 'gu' ? 'ગામના મિત્ર / પડોશી' : language === 'hi' ? 'गांव के मित्र / पड़ोसी' : 'Friend / Neighbor'}</option>
                        <option value="Family Member">{language === 'gu' ? 'પરિવારના સભ્ય' : language === 'hi' ? 'परिवार के सदस्य' : 'Family Member'}</option>
                        <option value="Volunteer/NGO">{language === 'gu' ? 'NGO કાર્યકર્તા / સ્વયંસેવક' : language === 'hi' ? 'एनजीओ कार्यकर्ता / स्वयंसेवक' : 'Volunteer / NGO Worker'}</option>
                        <option value="Teacher/Mentor">{language === 'gu' ? 'શિક્ષક / પ્રોફેસર' : language === 'hi' ? 'शिक्षक / प्रोफेसर' : 'Teacher / Mentor'}</option>
                        <option value="Panchayat Representative">{language === 'gu' ? 'ગામ પંચાયત પ્રતિનિધિ' : language === 'hi' ? 'ग्राम पंचायत प्रतिनिधि' : 'Panchayat Representative'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#18251E] mb-1">
                        {t('fieldActualInventorName')}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'gu' ? 'મૂળ શોધકનું પૂરું નામ' : language === 'hi' ? 'मूल आविष्कारक का पूरा नाम' : "Actual Inventor's Full Name"}
                        value={innovatorName}
                        onChange={e => setInnovatorName(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#18251E] mb-1">
                        {t('fieldOptionalContact')}
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 •••••"
                        value={submitterPhone}
                        onChange={e => setSubmitterPhone(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Explicit Inventor Consent Checkbox */}
                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={innovatorConsentGiven}
                      onChange={e => setInnovatorConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded text-[#176B45] focus:ring-[#176B45]"
                    />
                    <span className="text-[11px] font-semibold text-amber-900 leading-tight">
                      {t('fieldConsentCheckbox')}
                    </span>
                  </label>

                  <div className="text-[11px] text-[#6B756E] pt-1">
                    {t('noDocumentsRequiredNote')}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 1: INTRO & TWO SUBMISSION METHODS */}
          {step === 'intro' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm text-center space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#176B45] bg-emerald-100/70 px-3 py-1 rounded-full">
                  {t('innovatorPortalBadge')}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-[#104C35] font-serif leading-tight">
                    {t('innovatorWelcomeTitle')}
                  </h1>
                  <AudioInstructionButton
                    text={t('voiceInstructionSubmission')}
                    size="sm"
                  />
                </div>
                <p className="text-sm sm:text-base text-[#18251E]/85 max-w-lg mx-auto leading-relaxed">
                  {t('voiceInstructionSubmission')}
                </p>
              </div>

              {/* TWO INTERACTION METHODS: Prominent Mic vs Conversational Q&A */}
              <div className="py-2 flex flex-col sm:flex-row items-center justify-center gap-6">
                {/* Method 1: Big Microphone Button (One-tap full recording) */}
                <div className="space-y-3">
                  <button
                    onClick={startRecording}
                    className="relative group w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-gradient-to-tr from-[#104C35] via-[#176B45] to-emerald-500 flex flex-col items-center justify-center text-white shadow-2xl shadow-emerald-900/30 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-ping group-hover:border-emerald-300 pointer-events-none" />
                    <Mic className="w-14 h-14 sm:w-16 sm:h-16 mb-1" />
                    <span className="text-xs sm:text-sm font-bold tracking-wide">
                      {t('voiceRecordBtn')}
                    </span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B756E]">
                    <AudioInstructionButton text={t('voiceInstructionSubmission')} size="xs" />
                    <span>{t('speakAllInOne')}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-gray-400 uppercase">{t('orText')}</div>

                {/* Method 2: Conversational Voice Q&A Assistant */}
                <div className="space-y-3">
                  <button
                    onClick={() => setSubmissionMode('conversational')}
                    className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex flex-col items-center justify-center text-white shadow-2xl shadow-orange-900/25 transform hover:scale-105 active:scale-95 transition-all cursor-pointer p-4 text-center"
                  >
                    <MessageSquare className="w-12 h-12 mb-1" />
                    <span className="text-xs sm:text-sm font-bold leading-tight">
                      {t('conversationalOptionTitle')}
                    </span>
                  </button>
                  <p className="text-xs text-[#6B756E] font-medium">
                    {t('conversationalOptionDesc')}
                  </p>
                </div>
              </div>

              {/* Alternate Media Upload Options */}
              <div className="border-t border-emerald-900/10 pt-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <p className="text-xs font-semibold text-[#6B756E] uppercase tracking-wider">
                    {t('orStartMedia')}
                  </p>
                  <AudioInstructionButton text={t('voiceInstructionPhoto')} size="xs" />
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => setStep('media')}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-emerald-900/20 bg-emerald-50/50 hover:bg-emerald-100/60 text-[#104C35] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#176B45]" />
                    <span>{t('photoUploadBtn')}</span>
                  </button>
                  <button
                    onClick={() => setStep('media')}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-emerald-900/20 bg-emerald-50/50 hover:bg-emerald-100/60 text-[#104C35] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
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
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-bold text-[#104C35]">
                    {isRecording ? t('recordingActive') : t('voiceInstructions')}
                  </h3>
                  <AudioInstructionButton
                    text={isRecording ? t('recordingActive') : t('voiceInstructionSubmission')}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-[#6B756E]">
                  {t('voiceInstructionSubmission')}
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
                      {language === 'gu'
                        ? `ઓડિયો રેકોર્ડ પૂર્ણ: ${recordingSeconds} સેકન્ડ`
                        : language === 'hi'
                        ? `ऑडियो रिकॉर्ड पूरा: ${recordingSeconds} सेकंड`
                        : `Audio recording complete: ${recordingSeconds}s`}
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
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
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
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#18251E] font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t('retryRecording')}</span>
                    </button>
                    <button
                      onClick={() => setStep('media')}
                      className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
                    >
                      <span>{t('nextPhotoVideo')}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: PHOTO & VIDEO UPLOADS */}
          {step === 'media' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#104C35]">{t('mediaTitle')}</h3>
                    <AudioInstructionButton
                      text={t('voiceInstructionPhoto')}
                      size="sm"
                    />
                  </div>
                  <p className="text-xs text-[#6B756E] mt-1">{t('voiceInstructionPhoto')}</p>
                </div>
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
                    {t('takePhoto')} {language === 'gu' ? 'અથવા ફોનમાંથી પસંદ કરો' : language === 'hi' ? 'या फोन से चुनें' : 'or choose from phone'}
                  </span>
                  <span className="text-xs text-[#6B756E]">
                    {language === 'gu' ? 'JPG, PNG સપોર્ટેડ' : language === 'hi' ? 'JPG, PNG समर्थित' : 'JPG, PNG supported'}
                  </span>
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
                    {t('recordVideo')} {language === 'gu' ? 'અથવા ક્લિપ પસંદ કરો' : language === 'hi' ? 'या वीडियो क्लिप चुनें' : 'or select a video clip'}
                  </span>
                  <span className="text-xs text-[#6B756E]">
                    {language === 'gu' ? 'મશીન કામ કરતું હોય તેવો ૩૦-૬૦ સેકન્ડનો વીડિયો' : language === 'hi' ? 'मशीन के संचालन का 30-60 सेकंड का वीडियो' : '30-60 second video demonstrating operation'}
                  </span>
                </label>
              </div>

              {videoUrl && (
                <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between text-xs text-[#104C35]">
                  <span className="font-semibold">
                    {language === 'gu' ? 'વીડિયો અપલોડ માટે તૈયાર છે' : language === 'hi' ? 'वीडियो अपलोड के लिए तैयार है' : 'Video ready for upload'}
                  </span>
                  <button onClick={() => setVideoUrl(null)} className="text-red-600 font-bold">
                    {language === 'gu' ? 'દૂર કરો' : language === 'hi' ? 'हटाएं' : 'Remove'}
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-emerald-900/10">
                <button
                  onClick={() => setStep('recording')}
                  className="text-xs font-semibold text-[#6B756E] hover:text-[#18251E] cursor-pointer"
                >
                  {t('backAudio')}
                </button>
                <button
                  onClick={() => setStep('location')}
                  className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
                >
                  <span>{t('nextLocation')}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION SELECTION */}
          {step === 'location' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#104C35]">{t('locationTitle')}</h3>
                    <AudioInstructionButton
                      text={t('voiceInstructionLocation')}
                      size="sm"
                    />
                  </div>
                  <p className="text-xs text-[#6B756E] mt-1">{t('voiceInstructionLocation')}</p>
                </div>
              </div>

              {/* GPS Quick Button (Optional, never forces GPS) */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#176B45]" />
                  <div>
                    <p className="text-xs font-bold text-[#104C35]">
                      {language === 'gu'
                        ? 'સ્વચાલિત સ્થાન શોધ (GPS - વૈકલ્પિક)'
                        : language === 'hi'
                        ? 'स्वचालित स्थान खोज (GPS - वैकल्पिक)'
                        : 'Auto Location Detection (GPS - Optional)'}
                    </p>
                    <p className="text-[11px] text-[#6B756E]">
                      {language === 'gu'
                        ? 'પરવાનગી સાથે રાજ્ય અને જિલ્લો આપોઆપ સેટ કરો'
                        : language === 'hi'
                        ? 'अनुमति मिलने पर राज्य और जिला स्वतः सेट करें'
                        : 'Set state and district automatically with permission'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleGetLocation}
                  disabled={gpsLoading}
                  className="w-full sm:w-auto bg-white border border-emerald-900/20 text-[#176B45] font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:bg-emerald-100/50 cursor-pointer"
                >
                  {gpsLoading
                    ? (language === 'gu' ? 'શોધી રહ્યા છીએ...' : language === 'hi' ? 'खोज रहे हैं...' : 'Detecting...')
                    : t('useGpsBtn')}
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
                  placeholder={
                    language === 'gu'
                      ? 'દા.ત. રાધનપુર, પાટણ અથવા તમારા ગામનું નામ'
                      : language === 'hi'
                      ? 'उदा. राधनपुर, पाटन या अपने गांव का नाम'
                      : 'e.g. Radhanpur, Patan or your village name'
                  }
                  value={village}
                  onChange={e => setVillage(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#176B45]"
                />
              </div>

              {/* Optional Contact Details if Option A (Self) */}
              {pathway === 'self' && (
                <div className="border-t border-emerald-900/10 pt-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#104C35]">
                    <Phone className="w-3.5 h-3.5 text-[#176B45]" />
                    <span>
                      {language === 'gu'
                        ? 'આવિષ્કારકની વિગતો (વૈકલ્પિક - પ્રાઈવસી શીલ્ડ હેઠળ સુરક્ષિત)'
                        : language === 'hi'
                        ? 'आविष्कारक का विवरण (वैकल्पिक - गोपनीयता सुरक्षित)'
                        : "Innovator's Details (Optional - Privacy Protected)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#6B756E] mb-1">
                        {language === 'gu' ? 'તમારું પૂરું નામ' : language === 'hi' ? 'आपका पूरा नाम' : 'Your Full Name'}
                      </label>
                      <input
                        type="text"
                        placeholder={
                          language === 'gu'
                            ? 'દા.ત. રમેશભાઈ પટેલ'
                            : language === 'hi'
                            ? 'उदा. रमेश भाई पटेल'
                            : 'e.g. Ramesh Patel'
                        }
                        value={innovatorName}
                        onChange={e => setInnovatorName(e.target.value)}
                        className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#6B756E] mb-1">
                        {language === 'gu'
                          ? 'મોબાઇલ નંબર (SMS અપડેટ્સ માટે)'
                          : language === 'hi'
                          ? 'मोबाइल नंबर (SMS अपडेट के लिए)'
                          : 'Mobile Number (For SMS updates)'}
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={innovatorPhone}
                        onChange={e => setInnovatorPhone(e.target.value)}
                        className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6B756E]">
                    {language === 'gu'
                      ? 'અમે તમારો મોબાઇલ નંબર ક્યારેય સાર્વજનિક નથી કરતા. માત્ર ચકાસાયેલ સંસ્થાઓ પરવાનગી સાથે જ સંપર્ક કરી શકે છે.'
                      : language === 'hi'
                      ? 'हम आपका मोबाइल नंबर कभी सार्वजनिक नहीं करते। केवल सत्यापित संस्थाएं ही अनुमति के साथ संपर्क कर सकती हैं।'
                      : 'We never publicly display your phone number. Only verified organizations may contact you with your consent.'}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-emerald-900/10">
                <button
                  onClick={() => setStep('media')}
                  className="text-xs font-semibold text-[#6B756E] hover:text-[#18251E] cursor-pointer"
                >
                  {t('backMedia')}
                </button>
                <button
                  onClick={processSubmissionWithAI}
                  className="flex items-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>{t('processVoiceWithAI')} →</span>
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
                  <h3 className="text-lg font-bold text-[#104C35]">{t('aiAnalyzing')}</h3>
                  <p className="text-xs text-[#6B756E] max-w-sm mx-auto">
                    {t('aiAnalyzingDesc')}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B45] bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{language === 'gu' ? 'AI ચોકસાઈ સ્કોર' : language === 'hi' ? 'एआई सटीकता स्कोर' : 'AI Accuracy Score'}: {aiConfidence}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-[#104C35]">{t('aiGeneratedProfile')}</h3>
                        <AudioInstructionButton
                          text={`${t('voiceInstructionConfirmation')}. ${aiTitle[language] || aiTitle.gu || aiTitle.en}. ${aiProblem[language] || aiProblem.gu || aiProblem.en}. ${aiSolution[language] || aiSolution.gu || aiSolution.en}`}
                          label={t('readAloud')}
                          size="sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditingAi(!isEditingAi)}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#18251E] font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isEditingAi ? 'Done Editing' : t('editInformation')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Confirmation Audio Note Banner */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{t('voiceInstructionConfirmation')}</span>
                    </div>
                    <AudioInstructionButton text={t('voiceInstructionConfirmation')} size="xs" />
                  </div>

                  {/* Assisted credit banner if Option B */}
                  {pathway === 'assisted' && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                      <strong>{language === 'gu' ? 'સહાયક નોંધણી:' : language === 'hi' ? 'सहायक पंजीकरण:' : 'Assisted Submission:'}</strong> {language === 'gu' ? 'મૂળ શોધક:' : language === 'hi' ? 'मूल आविष्कारक:' : 'Inventor:'} <u>{innovatorName || (language === 'gu' ? 'ગ્રામીણ શોધક' : language === 'hi' ? 'ग्रामीण आविष्कारक' : 'Rural Innovator')}</u> | {language === 'gu' ? 'નોંધણી કરનાર:' : language === 'hi' ? 'पंजीकरणकर्ता:' : 'Submitter:'} <u>{submitterName || (language === 'gu' ? 'સ્વયંસેવક' : language === 'hi' ? 'स्वयंसेवक' : 'Volunteer')}</u> ({submitterRelationship})
                    </div>
                  )}

                  {/* Profile Card Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#6B756E] mb-1">
                        {t('fieldTitle')}
                      </label>
                      {isEditingAi ? (
                        <input
                          type="text"
                          value={aiTitle[language] || aiTitle.gu || aiTitle.en}
                          onChange={e =>
                            setAiTitle({ ...aiTitle, [language]: e.target.value })
                          }
                          className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm font-bold text-[#104C35]"
                        />
                      ) : (
                        <div className="text-base font-bold text-[#104C35] p-3 bg-emerald-50/50 rounded-xl">
                          {aiTitle[language] || aiTitle.gu || aiTitle.en}
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
                          value={aiProblem[language] || aiProblem.gu || aiProblem.en}
                          onChange={e =>
                            setAiProblem({ ...aiProblem, [language]: e.target.value })
                          }
                          className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm"
                        />
                      ) : (
                        <div className="text-xs text-[#18251E] p-3 bg-gray-50 rounded-xl leading-relaxed">
                          {aiProblem[language] || aiProblem.gu || aiProblem.en}
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
                          value={aiSolution[language] || aiSolution.gu || aiSolution.en}
                          onChange={e =>
                            setAiSolution({ ...aiSolution, [language]: e.target.value })
                          }
                          className="w-full bg-[#F8FAF7] border border-emerald-900/20 rounded-xl p-3 text-sm"
                        />
                      ) : (
                        <div className="text-xs text-[#18251E] p-3 bg-gray-50 rounded-xl leading-relaxed">
                          {aiSolution[language] || aiSolution.gu || aiSolution.en}
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
                        {village || (language === 'gu' ? 'ગામ પંચાયત વિસ્તાર' : language === 'hi' ? 'ग्राम पंचायत क्षेत्र' : 'Village/Panchayat Area')}, {district}, {state}
                      </div>
                    </div>
                  </div>

                  {/* Confirmation CTA */}
                  <div className="pt-4 border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={() => setStep('location')}
                      className="w-full sm:w-auto text-xs font-semibold text-[#6B756E] hover:text-[#18251E] py-2 cursor-pointer"
                    >
                      {t('backLocation')}
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={submitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#176B45] hover:bg-[#104C35] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all text-sm cursor-pointer"
                    >
                      <Check className="w-5 h-5 text-emerald-300" />
                      <span>{submitting ? t('submittingText') : t('confirmAndSubmit')}</span>
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
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif">
                    {t('submissionSuccessTitle')}
                  </h2>
                  <AudioInstructionButton
                    text={t('voiceInstructionSuccess')}
                    size="sm"
                  />
                </div>
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

                {submittedInnovation.registrationType === 'assisted' && (
                  <div className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    {language === 'gu' ? 'મૂળ શોધક:' : language === 'hi' ? 'मूल आविष्कारक:' : 'Inventor:'} <strong>{submittedInnovation.innovatorName}</strong> • {language === 'gu' ? 'સહાયક:' : language === 'hi' ? 'सहायक:' : 'Submitter:'} {submittedInnovation.submitterName} ({submittedInnovation.submitterRelationship})
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-semibold">{submittedInnovation.status}</span>
                  <span>•</span>
                  <span>{submittedInnovation.submissionDate}</span>
                </div>
                <div className="text-[11px] text-[#6B756E] pt-2 border-t border-emerald-900/10">
                  {t('keepIdNotice')}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-900/20 bg-white hover:bg-gray-50 text-[#104C35] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t('saveReceiptBtn')}</span>
                </button>
                <Link
                  href={`/innovations/${submittedInnovation.id}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold transition-colors"
                >
                  {t('trackStatusBtn')} →
                </Link>
                <button
                  onClick={() => {
                    setStep('intro');
                    setAudioBlobUrl(null);
                    setPhotos([]);
                    setVideoUrl(null);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-[#6B756E] hover:text-[#18251E] cursor-pointer"
                >
                  {t('submitAnotherBtn')}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function InnovatorPortalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F7FBF8]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#176B45] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#176B45] font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <InnovatorPortalContent />
    </Suspense>
  );
}
