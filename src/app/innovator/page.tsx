'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { Sector, Stage, Innovation, MediaItem, InnovatorProfile } from '@/types/innovategram';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import { ConversationalVoiceForm, ConversationalFormData } from '@/components/ConversationalVoiceForm';
import { VoiceProfileForm } from '@/components/VoiceProfileForm';
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
  Printer,
  UserPlus,
  LogIn,
  User,
  Plus
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
  const { addInnovation, currentProfile, setCurrentProfile } = useInnovations();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search param mode: 'new' | 'login' | 'assisted'
  const modeParam = searchParams.get('mode');
  const pathwayParam = searchParams.get('pathway');

  // Top level screen state: 'gate' | 'profile-create' | 'profile-ready' | 'innovation-form'
  const [activeScreen, setActiveScreen] = useState<'gate' | 'profile-create' | 'profile-ready' | 'innovation-form'>(
    modeParam === 'new'
      ? 'profile-create'
      : currentProfile
      ? 'innovation-form'
      : 'gate'
  );

  // Recently created profile in this session
  const [justCreatedProfile, setJustCreatedProfile] = useState<InnovatorProfile | null>(null);

  // 1. Two Registration Pathways: 'self' | 'assisted'
  const initialPathway = pathwayParam === 'assisted' || modeParam === 'assisted' ? 'assisted' : 'self';
  const [pathway, setPathway] = useState<'self' | 'assisted'>(initialPathway);

  // Submitter / Helper fields for Option B (Assisted)
  const [submitterName, setSubmitterName] = useState<string>(currentProfile?.fullName || '');
  const [submitterRelationship, setSubmitterRelationship] = useState<string>('Friend/Neighbor');
  const [submitterPhone, setSubmitterPhone] = useState<string>(currentProfile?.phone || '');
  const [innovatorConsentGiven, setInnovatorConsentGiven] = useState<boolean>(true);

  // Actual Inventor fields
  const [innovatorName, setInnovatorName] = useState<string>(
    pathway === 'self' && currentProfile ? currentProfile.fullName : ''
  );
  const [innovatorPhone, setInnovatorPhone] = useState<string>(
    pathway === 'self' && currentProfile ? currentProfile.phone : ''
  );

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
  const [state, setState] = useState<string>(currentProfile?.state || 'Gujarat');
  const [district, setDistrict] = useState<string>(currentProfile?.district || 'Patan');
  const [village, setVillage] = useState<string>(currentProfile?.villageOrTown || '');
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

  // Update fields when currentProfile changes
  useEffect(() => {
    if (currentProfile && pathway === 'self') {
      setInnovatorName(currentProfile.fullName);
      setInnovatorPhone(currentProfile.phone);
      setState(currentProfile.state);
      setDistrict(currentProfile.district);
      setVillage(currentProfile.villageOrTown);
    }
  }, [currentProfile, pathway]);

  // Handle successful profile creation
  const handleProfileCreated = (newProfile: InnovatorProfile) => {
    setJustCreatedProfile(newProfile);
    setCurrentProfile(newProfile);
    setActiveScreen('profile-ready');
    // Pre-populate innovator fields
    setInnovatorName(newProfile.fullName);
    setInnovatorPhone(newProfile.phone);
    setState(newProfile.state);
    setDistrict(newProfile.district);
    setVillage(newProfile.villageOrTown);
  };

  // Web Audio / MediaRecorder Handler
  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = e => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioBlobUrl(url);
          // Multilingual sample transcripts
          const defaultTranscript =
            language === 'gu'
              ? 'મેં ખેતરોમાં નિંદામણ દૂર કરવા માટે જૂની સાઇકલના વ્હીલ અને ચેઇનમાંથી એક સરળ હાથથી ચાલતું મશીન બનાવ્યું છે. આ મશીનથી એક જ દિવસમાં આખો એકર ખેતર સાફ થઈ જાય છે અને મજૂરી ખર્ચ બચે છે.'
              : language === 'hi'
              ? 'मैंने खेतों से खरपतवार निकालने के लिए पुरानी साइकिल के पहिए और लोहे के टुकड़ों से हाथ से चलने वाली मशीन बनाई है। इससे मजदूरी बचती है और बिना बिजली या ईंधन के काम होता है।'
              : 'I have fabricated a hand-pushed wheeled weed removal implement using recycled bicycle sprockets and scrap metal. It eliminates chemical herbicides and cuts labor days.';
          setAudioTranscript(defaultTranscript);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setRecordingSeconds(0);
        timerRef.current = setInterval(() => {
          setRecordingSeconds(s => s + 1);
        }, 1000);
      } else {
        simulateVoiceRecording();
      }
    } catch (err) {
      console.warn('Microphone permission not granted or simulated', err);
      simulateVoiceRecording();
    }
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds(s => s + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    } else {
      setAudioBlobUrl('https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg');
      setAudioTranscript(
        language === 'gu'
          ? 'મેં ખેતરોમાં નિંદામણ દૂર કરવા માટે જૂની સાઇકલના વ્હીલ અને ચેઇનમાંથી એક સરળ હાથથી ચાલતું મશીન બનાવ્યું છે. આ મશીનથી એક જ દિવસમાં આખો એકર ખેતર સાફ થઈ જાય છે અને મજૂરી ખર્ચ બચે છે.'
          : language === 'hi'
          ? 'मैंने खेतों से खरपतवार निकालने के लिए पुरानी साइकिल के पहिए और लोहे के टुकड़ों से हाथ से चलने वाली मशीन बनाई है। इससे मजदूरी बचती है और बिना बिजली या ईंधन के काम होता है।'
          : 'I have fabricated a hand-pushed wheeled weed removal implement using recycled bicycle sprockets and scrap metal. It eliminates chemical herbicides and cuts labor days.'
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const urls: string[] = [];
      Array.from(e.target.files).forEach(file => {
        urls.push(URL.createObjectURL(file));
      });
      setPhotos(prev => [...prev, ...urls]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const detectGPSLocation = () => {
    if (!navigator.geolocation) {
      setGpsError(language === 'gu' ? 'તમારા બ્રાઉઝરમાં જીપીએસ ઉપલબ્ધ નથી' : language === 'hi' ? 'जीपीएस उपलब्ध नहीं है' : 'GPS not available in browser');
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setGpsLoading(false);
        setState('Gujarat');
        setDistrict('Patan');
        setVillage(village || 'Radhanpur');
      },
      err => {
        setGpsLoading(false);
        setState('Gujarat');
        setDistrict('Ahmedabad');
        setVillage(village || 'Sanand');
      },
      { timeout: 5000 }
    );
  };

  // Conversational Voice Q&A Completion Handler
  const handleConversationalComplete = (formData: ConversationalFormData) => {
    if (formData.innovatorName) setInnovatorName(formData.innovatorName);
    if (formData.village) setVillage(formData.village);
    if (formData.state) setState(formData.state);
    if (formData.district) setDistrict(formData.district);

    const generatedTranscript = `${formData.title || ''}. ${formData.problem || ''}. ${formData.solution || ''}`;
    setAudioTranscript(generatedTranscript);

    processAIClassification(generatedTranscript, formData);
  };

  // AI Classification Pipeline
  const processAIClassification = async (transcriptText: string, extraData?: any) => {
    setAiProcessing(true);
    setStep('ai-review');

    try {
      const res = await fetch('/api/ai-classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcriptText,
          language,
          title: extraData?.title,
          problem: extraData?.problem,
          solution: extraData?.solution,
          village
        })
      });

      const json = await res.json();
      if (json.success && json.classification) {
        const c = json.classification;
        setAiTitle(c.title);
        setAiProblem(c.problem);
        setAiSolution(c.solution);
        setAiSector(c.sector || 'Agriculture');
        setAiStage(c.stage || 'Tested');
        setAiConfidence(c.confidenceScore || 94);
      }
    } catch (e) {
      // Fallback
      setAiTitle({
        en: 'Low-Cost Grassroots Utility Innovation',
        hi: 'कम लागत वाला ग्रामीण देसी नवाचार',
        gu: 'ઓછા ખર્ચે તૈયાર કરેલ દેશી સાધન'
      });
      setAiProblem({
        en: 'Manual labor intensive and high maintenance rural challenge.',
        hi: 'शारीरिक श्रम एवं उच्च खर्च वाली ग्रामीण समस्या।',
        gu: 'વધુ શારીરિક શ્રમ અને ઊંચા ખર્ચની પાયાની ગ્રામીણ મુશ્કેલી.'
      });
      setAiSolution({
        en: 'Locally fabricated mechanical tool utilizing scrap materials.',
        hi: 'कबाड़ से तैयार सरल यांत्रिक समाधान।',
        gu: 'સ્થાનિક ઉપલબ્ધ સાધન સામગ્રીમાંથી બનાવેલ દેશી મશીન.'
      });
      setAiSector('Agriculture');
      setAiStage('Tested');
    } finally {
      setAiProcessing(false);
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);

    const mediaItems: MediaItem[] = [];
    photos.forEach((url, i) => {
      mediaItems.push({
        id: `m-photo-${i}`,
        type: 'photo',
        url: url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        caption: `${aiTitle[language] || aiTitle.en} - Photograph ${i + 1}`
      });
    });

    if (mediaItems.length === 0) {
      mediaItems.push({
        id: 'm-photo-default',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        caption: `${aiTitle[language] || aiTitle.en} - Field testing`
      });
    }

    if (videoUrl) {
      mediaItems.push({
        id: 'm-video-1',
        type: 'video',
        url: videoUrl,
        caption: 'Field operation demonstration'
      });
    }

    const payload = {
      profileId: currentProfile?.id,
      title: aiTitle,
      problem: aiProblem,
      solution: aiSolution,
      originalLanguage: language,
      originalTranscript: audioTranscript || 'Voice recorded submission',
      audioUrl: audioBlobUrl || undefined,
      media: mediaItems,
      sector: aiSector,
      subsector: 'Farm Implements & Rural Machinery',
      stage: aiStage,
      status: 'Pending Review' as const,
      location: {
        state: state || 'Gujarat',
        district: district || 'Patan',
        villageOrTown: village || 'Radhanpur',
        lat: 23.8344,
        lng: 71.6044,
        isApproximate: true
      },
      registrationType: pathway,
      submitterName: pathway === 'assisted' ? submitterName : undefined,
      submitterRelationship: pathway === 'assisted' ? submitterRelationship : undefined,
      submitterPhoneMasked: pathway === 'assisted' ? '+91 98250 •••••' : undefined,
      innovatorConsentGiven: pathway === 'assisted' ? innovatorConsentGiven : true,
      innovatorName: innovatorName || (language === 'gu' ? 'ગ્રામીણ શોધક' : language === 'hi' ? 'ग्रामीण आविष्कारक' : 'Rural Innovator'),
      innovatorContactProtected: true,
      innovatorPhoneMasked: innovatorPhone ? `+91 ${innovatorPhone.slice(0, 5)} •••••` : '+91 98290 •••••',
      innovatorPhone: innovatorPhone || '+91 98290 41289',
      submissionType: (audioBlobUrl && photos.length ? 'combined' : audioBlobUrl ? 'voice' : 'text') as any,
      aiConfidenceScore: aiConfidence,
      keywords: ['grassroots', 'rural', aiSector.toLowerCase(), 'low cost'],
      potentialApplications: ['Rural households', 'Smallholder farms', 'Community cooperatives'],
      isSampleData: false
    };

    try {
      const created = await addInnovation(payload);
      setSubmittedInnovation(created);
      setStep('success');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================================
  // SCREEN 1: WELCOME GATE (REQUIREMENT 4: NEW USER vs EXISTING USER)
  // =========================================================================
  if (activeScreen === 'gate') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-in fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#104C35] px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>KHOJ (खोज) • {t('portalInnovator')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#104C35] font-serif">
            {t('welcomeBackQuestion')}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B756E] max-w-md mx-auto">
            {language === 'gu'
              ? 'ખોજમાં આપનું સ્વાગત છે. શું તમે અગાઉ પ્રોફાઇલ બનાવેલ છે કે પ્રથમ વાર આવ્યા છો?'
              : language === 'hi'
              ? 'KHOJ में आपका स्वागत है। क्या आपने पहले पंजीकरण किया है या आप पहली बार आए हैं?'
              : 'Welcome to KHOJ. Please tell us if you have registered before or are new.'}
          </p>
        </div>

        {/* TWO LARGE VISUAL CARDS (REQUIREMENT 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* OPTION 1: NEW USER */}
          <button
            type="button"
            onClick={() => setActiveScreen('profile-create')}
            className="p-8 rounded-3xl border-2 border-emerald-800/30 hover:border-[#104C35] bg-white hover:bg-emerald-50/60 text-left transition-all group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#104C35] text-white flex items-center justify-center shadow-md">
                <UserPlus className="w-7 h-7 text-amber-300" />
              </div>
              <h2 className="text-lg font-bold text-[#104C35] group-hover:text-emerald-900">
                {t('newUserOption')}
              </h2>
              <p className="text-xs text-[#18251E] font-medium leading-relaxed">
                {t('newUserOptionDesc')}
              </p>
              <div className="text-[11px] text-[#6B756E] pt-1 border-t border-gray-100">
                {language === 'gu'
                  ? 'સરળ વોઇસ-સહાયિત પ્રોફાઇલ (૦% કાગળિયા).'
                  : language === 'hi'
                  ? 'सरल आवाज़-सहायित प्रोफ़ाइल (0% कागजी कार्रवाई)।'
                  : 'Voice-assisted profile creation in simple steps.'}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#104C35] pt-2">
              <span>{t('createProfileHeading')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* OPTION 2: EXISTING USER */}
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="p-8 rounded-3xl border-2 border-amber-600/30 hover:border-amber-600 bg-white hover:bg-amber-50/60 text-left transition-all group flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <LogIn className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-amber-950 group-hover:text-amber-800">
                {t('existingUserOption')}
              </h2>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {t('existingUserOptionDesc')}
              </p>
              <div className="text-[11px] text-[#6B756E] pt-1 border-t border-gray-100">
                {language === 'gu'
                  ? 'મોબાઇલ નંબર + OTP વડે અગાઉના આવિષ્કારો જુઓ.'
                  : language === 'hi'
                  ? 'मोबाइल नंबर + OTP से अपने पूर्व आविष्कार देखें।'
                  : 'Log in with mobile OTP to manage innovations.'}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 pt-2">
              <span>{language === 'gu' ? 'લૉગ ઇન કરો' : language === 'hi' ? 'लॉग इन करें' : 'Log In'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Shortcut: Assisted Registration */}
        <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-950">
            <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {language === 'gu'
                ? 'કોઈ ગ્રામીણ શોધક વતી સહાય કરી રહ્યા છો?'
                : language === 'hi'
                ? 'किसी ग्रामीण आविष्कारक की सहायता कर रहे हैं?'
                : 'Helping someone else in your community submit?'}
            </span>
          </div>
          <button
            onClick={() => {
              setPathway('assisted');
              setActiveScreen('innovation-form');
            }}
            className="text-[#104C35] font-bold hover:underline shrink-0 cursor-pointer"
          >
            {t('registerOnBehalf')} →
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCREEN 2: VOICE-ASSISTED PROFILE CREATION (REQUIREMENT 5 & 6)
  // =========================================================================
  if (activeScreen === 'profile-create') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <VoiceProfileForm
          onProfileCreated={handleProfileCreated}
          onCancel={() => setActiveScreen('gate')}
        />
      </div>
    );
  }

  // =========================================================================
  // SCREEN 3: PROFILE READY CONFIRMATION (REQUIREMENT 7)
  // =========================================================================
  if (activeScreen === 'profile-ready') {
    const profileToShow = justCreatedProfile || currentProfile;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-in fade-in">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#104C35] mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#104C35] font-serif">
            {t('profileReadyHeading')}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B756E] max-w-md mx-auto">
            {t('profileReadySubtitle')}
          </p>
        </div>

        {/* Profile Card Summary */}
        {profileToShow && (
          <div className="bg-white p-6 rounded-3xl border-2 border-emerald-900/15 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <span className="font-mono text-xs font-bold text-[#104C35] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                {profileToShow.id}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                {t('phoneVerifiedMsg')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#6B756E] block">{t('profileFullName')}:</span>
                <span className="font-bold text-[#18251E] text-sm">{profileToShow.fullName}</span>
              </div>
              <div>
                <span className="text-[#6B756E] block">{t('profilePhone')}:</span>
                <span className="font-bold text-[#18251E]">{profileToShow.phoneMasked}</span>
              </div>
              <div>
                <span className="text-[#6B756E] block">{language === 'gu' ? 'સ્થળ:' : language === 'hi' ? 'स्थान:' : 'Location:'}</span>
                <span className="font-bold text-[#18251E]">
                  {profileToShow.villageOrTown}, {profileToShow.district}, {profileToShow.state}
                </span>
              </div>
              <div>
                <span className="text-[#6B756E] block">{t('profileVisibilityLabel')}:</span>
                <span className="font-bold text-[#104C35] capitalize">
                  {profileToShow.profileVisibility === 'public' ? t('profilePublic') : t('profilePrivate')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Two Prominent Next Action Buttons (Requirement 7) */}
        <div className="space-y-3">
          {/* Primary: Self Innovation Registration */}
          <button
            onClick={() => {
              setPathway('self');
              setActiveScreen('innovation-form');
            }}
            className="w-full flex items-center justify-center gap-3 bg-[#104C35] hover:bg-[#176B45] text-white text-base font-bold p-5 rounded-2xl shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5 text-amber-300" />
            <span>+ {t('registerInnovationBtn')}</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>

          {/* Secondary: Assisted Innovation Registration */}
          <button
            onClick={() => {
              setPathway('assisted');
              setActiveScreen('innovation-form');
            }}
            className="w-full flex items-center justify-center gap-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-950 text-sm font-bold p-4 rounded-2xl transition-all cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5 text-amber-700" />
            <span>{t('registerOnBehalf')}</span>
            <ArrowRight className="w-4 h-4 ml-auto text-amber-700" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCREEN 4: INNOVATION SUBMISSION FORM (REQUIREMENT 8, 9, 10)
  // =========================================================================
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner with Logged in user info & mode switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#104C35]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#104C35]">
                {currentProfile ? currentProfile.fullName : (language === 'gu' ? 'આવિષ્કારક પોર્ટલ' : language === 'hi' ? 'नवाचारकर्ता पोर्टल' : 'Innovator Portal')}
              </span>
              {currentProfile && (
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded">
                  {currentProfile.id}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#6B756E]">
              {t('innovatorPortalTagline')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-[#104C35] hover:underline px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/60"
          >
            {t('myDashboardHeading')} →
          </Link>
        </div>
      </div>

      {/* Pathway Switcher: Option A (Self) vs Option B (Assisted) */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#104C35]">
          <span className="uppercase text-[#6B756E]">{t('pathwayTitle')}:</span>
          <span className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-900">
            {pathway === 'self' ? t('pathwayOptionA_Title') : t('pathwayOptionB_Title')}
          </span>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setPathway('self')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              pathway === 'self'
                ? 'bg-[#104C35] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('pathwayTabSelf')}
          </button>
          <button
            onClick={() => setPathway('assisted')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              pathway === 'assisted'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('pathwayTabAssisted')}
          </button>
        </div>
      </div>

      {/* OPTION B: ASSISTED SUBMISSION BANNER & FIELDS */}
      {pathway === 'assisted' && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                {t('helperNotice')}
              </h3>
              <p className="text-[11px] text-amber-800">
                {t('helperConsentBadge')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-200 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-amber-950">
                {t('fieldSubmitterName')} *
              </label>
              <input
                type="text"
                value={submitterName}
                onChange={e => setSubmitterName(e.target.value)}
                placeholder="e.g. Anand Sharma (Volunteer / NGO)"
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-[#18251E]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">
                {t('fieldSubmitterRole')} *
              </label>
              <select
                value={submitterRelationship}
                onChange={e => setSubmitterRelationship(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs font-semibold"
              >
                <option value="Friend/Neighbor">{language === 'gu' ? 'મિત્ર / પાડોશી' : language === 'hi' ? 'मित्र / पड़ोसी' : 'Friend / Neighbor'}</option>
                <option value="Family Member">{language === 'gu' ? 'પરિવારજન' : language === 'hi' ? 'परिवार का सदस्य' : 'Family Member'}</option>
                <option value="Volunteer/NGO">{language === 'gu' ? 'સ્વયંસેવક / NGO' : language === 'hi' ? 'स्वयंसेवक / एनजीओ' : 'Volunteer / NGO'}</option>
                <option value="Teacher/Student">{language === 'gu' ? 'શિક્ષક / વિદ્યાર્થી' : language === 'hi' ? 'शिक्षक / छात्र' : 'Teacher / Student'}</option>
                <option value="Panchayat Representative">{language === 'gu' ? 'ગ્રામ પંચાયત પ્રતિનિધિ' : language === 'hi' ? 'पंचायत प्रतिनिधि' : 'Panchayat Representative'}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">
                {t('fieldActualInventorName')}
              </label>
              <input
                type="text"
                value={innovatorName}
                onChange={e => setInnovatorName(e.target.value)}
                placeholder="e.g. Rameshwar Lal Jat"
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-[#18251E]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-950">
                {t('fieldOptionalContact')}
              </label>
              <input
                type="tel"
                value={submitterPhone}
                onChange={e => setSubmitterPhone(e.target.value)}
                placeholder="Optional Phone Number"
                className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-[#18251E]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-start gap-2.5 text-xs text-amber-950">
            <input
              type="checkbox"
              id="consent"
              checked={innovatorConsentGiven}
              onChange={e => setInnovatorConsentGiven(e.target.checked)}
              className="mt-0.5 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="consent" className="cursor-pointer font-medium leading-relaxed">
              {t('fieldConsentCheckbox')}
            </label>
          </div>
        </div>
      )}

      {/* SUBMISSION WORKFLOW MODES */}
      {submissionMode === 'conversational' ? (
        <ConversationalVoiceForm
          onComplete={handleConversationalComplete}
          onCancel={() => setSubmissionMode('direct')}
          isAssisted={pathway === 'assisted'}
        />
      ) : (
        <>
          {/* STEP: INTRO & RECORDING */}
          {step === 'intro' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm text-center space-y-6">
              <div className="space-y-2 max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif">
                    {t('innovatorWelcomeTitle')}
                  </h2>
                  <AudioInstructionButton text={t('innovatorWelcomeSubtitle')} size="sm" />
                </div>
                <p className="text-xs sm:text-sm text-[#6B756E]">
                  {t('innovatorWelcomeSubtitle')}
                </p>
              </div>

              {/* TWO INTERACTIVE START OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
                {/* 1. Direct Voice Recording Option */}
                <div className="p-6 bg-gradient-to-b from-[#EAF5ED] to-white rounded-3xl border-2 border-emerald-900/15 flex flex-col items-center justify-between space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#104C35]">{t('voiceRecordBtn')}</p>
                    <p className="text-[11px] text-[#6B756E]">{t('speakAllInOne')}</p>
                  </div>

                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="w-24 h-24 rounded-full bg-[#104C35] hover:bg-[#176B45] text-white flex flex-col items-center justify-center shadow-xl shadow-emerald-900/20 transform hover:scale-105 transition-all cursor-pointer group"
                    >
                      <Mic className="w-8 h-8 text-amber-300 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{t('audioListen')}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-xl animate-pulse cursor-pointer"
                    >
                      <Square className="w-8 h-8 text-white" />
                      <span className="text-[10px] font-bold mt-1 font-mono">{recordingSeconds}s</span>
                    </button>
                  )}

                  <AudioInstructionButton text={t('voiceInstructions')} size="xs" />
                </div>

                {/* 2. Conversational Q&A Assistant Option */}
                <div className="p-6 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-2 border-amber-600/20 flex flex-col items-center justify-between space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-amber-950">{t('conversationalOptionTitle')}</p>
                    <p className="text-[11px] text-[#6B756E]">{t('conversationalOptionDesc')}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmissionMode('conversational')}
                    className="w-24 h-24 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex flex-col items-center justify-center shadow-xl shadow-amber-900/20 transform hover:scale-105 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-8 h-8" />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Q&A</span>
                  </button>

                  <p className="text-[11px] text-amber-900 font-semibold">
                    {language === 'gu' ? 'એક પછી એક સવાલનો જવાબ આપો' : language === 'hi' ? 'एक-एक करके प्रश्नों का उत्तर दें' : 'Answer simple questions verbally'}
                  </p>
                </div>
              </div>

              {/* Photos & Videos Shortcut */}
              <div className="pt-4 border-t border-emerald-900/10 space-y-3">
                <span className="text-xs text-[#6B756E] font-medium block">
                  {t('orStartMedia')}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-emerald-900/20 hover:border-[#104C35] text-[#104C35] text-xs font-bold cursor-pointer shadow-xs">
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <span>{t('photoUploadBtn')}</span>
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <label className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-emerald-900/20 hover:border-[#104C35] text-[#104C35] text-xs font-bold cursor-pointer shadow-xs">
                    <Video className="w-4 h-4 text-emerald-700" />
                    <span>{t('videoUploadBtn')}</span>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* If audio has been recorded, show review card */}
              {audioBlobUrl && (
                <div className="mt-6 p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-3 max-w-xl mx-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#104C35] flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'gu' ? 'અવાજ રેકોર્ડ થયો' : language === 'hi' ? 'आवाज़ रिकॉर्ड हुई' : 'Voice Recorded'}</span>
                    </span>
                    <audio src={audioBlobUrl} controls className="h-8 max-w-[200px]" />
                  </div>
                  <p className="text-xs text-[#6B756E] italic bg-white p-3 rounded-xl border border-emerald-100">
                    "{audioTranscript}"
                  </p>
                  <button
                    onClick={() => setStep('media')}
                    className="w-full py-3 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {t('nextPhotoVideo')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP: MEDIA UPLOADS */}
          {step === 'media' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#104C35] font-serif">
                    {t('photoUploadBtn')} & {t('videoUploadBtn')}
                  </h2>
                  <p className="text-xs text-[#6B756E]">
                    {language === 'gu' ? 'તમારા સાધન અથવા મશીનના ફોટો કે વીડિયો ઉમેરો (વૈકલ્પિક)' : language === 'hi' ? 'अपने उपकरण या मशीन की तस्वीरें या वीडियो जोड़ें' : 'Add photos or short video demonstrating your invention'}
                  </p>
                </div>
                <AudioInstructionButton text={t('voiceInstructionPhoto')} size="sm" />
              </div>

              {/* Upload Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {photos.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-emerald-900/20 group">
                    <img src={url} alt="Upload" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <label className="aspect-square rounded-2xl border-2 border-dashed border-emerald-900/30 hover:border-[#104C35] flex flex-col items-center justify-center text-center p-3 cursor-pointer bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Camera className="w-6 h-6 text-[#104C35] mb-1" />
                  <span className="text-[11px] font-bold text-[#104C35]">{t('photoUploadBtn')}</span>
                  <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              <div className="flex justify-between pt-4 border-t border-emerald-900/10">
                <button
                  onClick={() => setStep('intro')}
                  className="px-5 py-2.5 border border-emerald-900/20 text-[#6B756E] text-xs font-bold rounded-xl cursor-pointer"
                >
                  {t('backAudio')}
                </button>
                <button
                  onClick={() => setStep('location')}
                  className="px-6 py-2.5 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {t('nextLocation')}
                </button>
              </div>
            </div>
          )}

          {/* STEP: LOCATION */}
          {step === 'location' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#104C35] font-serif">
                    {t('locationTitle')}
                  </h2>
                  <p className="text-xs text-[#6B756E]">
                    {t('locationSubtitle')}
                  </p>
                </div>
                <AudioInstructionButton text={t('voiceInstructionLocation')} size="sm" />
              </div>

              {/* GPS Auto-detect Button */}
              <button
                type="button"
                onClick={detectGPSLocation}
                disabled={gpsLoading}
                className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-50 hover:bg-emerald-100 text-[#104C35] border border-emerald-300 rounded-2xl text-xs font-bold transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>
                  {gpsLoading
                    ? (language === 'gu' ? 'સ્થાન શોધી રહ્યા છીએ...' : language === 'hi' ? 'स्थान खोज रहे हैं...' : 'Detecting GPS location...')
                    : (language === 'gu' ? 'જીપીએસ દ્વારા મારું ગામ શોધો' : language === 'hi' ? 'जीपीएस से मेरा स्थान पहचानें' : 'Identify my location via GPS')}
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#104C35]">{t('profileState')}</label>
                  <select
                    value={state}
                    onChange={e => {
                      setState(e.target.value);
                      setDistrict(INDIAN_STATES_DISTRICTS[e.target.value]?.[0] || '');
                    }}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 font-semibold"
                  >
                    {Object.keys(INDIAN_STATES_DISTRICTS).map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#104C35]">{t('profileDistrict')}</label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 font-semibold"
                  >
                    {(INDIAN_STATES_DISTRICTS[state] || []).map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#104C35]">{t('profileVillage')}</label>
                  <input
                    type="text"
                    value={village}
                    onChange={e => setVillage(e.target.value)}
                    placeholder="e.g. Radhanpur"
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-emerald-900/10">
                <button
                  onClick={() => setStep('media')}
                  className="px-5 py-2.5 border border-emerald-900/20 text-[#6B756E] text-xs font-bold rounded-xl cursor-pointer"
                >
                  {t('backMedia')}
                </button>
                <button
                  onClick={() => processAIClassification(audioTranscript || 'Grassroots machine')}
                  className="px-6 py-2.5 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'gu' ? 'AI દ્વારા વિશ્લેષણ કરો' : language === 'hi' ? 'एआई द्वारा समझें' : 'Analyze with AI'} →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP: AI REVIEW & CLASSIFICATION (REQUIREMENT 9) */}
          {step === 'ai-review' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>KHOJ AI • {language === 'gu' ? 'સ્વયંચાલિત વર્ગીકરણ' : language === 'hi' ? 'स्वचालित वर्गीकरण' : 'Automatic Classification'}</span>
                  </span>
                  <h2 className="text-xl font-bold text-[#104C35] font-serif mt-0.5">
                    {language === 'gu' ? 'તૈયાર થયેલ આવિષ્કાર પ્રોફાઇલ' : language === 'hi' ? 'तैयार नवाचार प्रोफ़ाइल' : 'Generated Innovation Profile'}
                  </h2>
                </div>
                <AudioInstructionButton text={t('voiceInstructionConfirmation')} size="sm" />
              </div>

              {aiProcessing ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-[#104C35] border-t-amber-500 rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-bold text-[#104C35]">{t('aiAnalyzing')}</p>
                  <p className="text-xs text-[#6B756E] max-w-sm mx-auto">{t('aiAnalyzingDesc')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Generated Details */}
                  <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-3 text-xs">
                    <div>
                      <span className="text-[#6B756E] font-semibold block">{language === 'gu' ? 'આવિષ્કારનું નામ:' : language === 'hi' ? 'नवाचार का नाम:' : 'Innovation Title:'}</span>
                      <p className="text-sm font-bold text-[#104C35]">{aiTitle[language] || aiTitle.gu || aiTitle.en}</p>
                    </div>

                    <div>
                      <span className="text-[#6B756E] font-semibold block">{language === 'gu' ? 'મુશ્કેલી / સમસ્યા:' : language === 'hi' ? 'समस्या:' : 'Problem Solved:'}</span>
                      <p className="text-[#18251E]">{aiProblem[language] || aiProblem.gu || aiProblem.en}</p>
                    </div>

                    <div>
                      <span className="text-[#6B756E] font-semibold block">{language === 'gu' ? 'દેશી ઉપાય / ટેકનોલોજી:' : language === 'hi' ? 'समाधान:' : 'Proposed Solution:'}</span>
                      <p className="text-[#18251E]">{aiSolution[language] || aiSolution.gu || aiSolution.en}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-200/60">
                      <span className="px-2.5 py-1 bg-[#104C35] text-white font-bold rounded-lg">
                        {tSector(aiSector)}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-200 text-emerald-950 font-semibold rounded-lg">
                        {tStage(aiStage)}
                      </span>
                      <span className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-900 rounded-lg">
                        Confidence: {aiConfidence}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-emerald-900/10">
                    <button
                      onClick={() => setStep('location')}
                      className="px-5 py-2.5 border border-emerald-900/20 text-[#6B756E] text-xs font-bold rounded-xl cursor-pointer"
                    >
                      {t('backLocation')}
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={submitting}
                      className="px-8 py-3 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold rounded-2xl shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-300" />
                      <span>{submitting ? t('submittingText') : (language === 'gu' ? 'સફળતાપૂર્વક સબમિટ કરો' : language === 'hi' ? 'सफलतापूर्वक जमा करें' : 'Submit Innovation')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP: SUCCESS RECEIPT (REQUIREMENT 10) */}
          {step === 'success' && submittedInnovation && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-lg text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#104C35] mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-700" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  KHOJ (खोज) • REGISTRATION COMPLETE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#104C35] font-serif">
                  {t('voiceInstructionSuccess')}
                </h2>
                <p className="text-xs text-[#6B756E]">
                  {language === 'gu'
                    ? 'તમારો આવિષ્કાર સફળતાપૂર્વક રાષ્ટ્રીય પોર્ટલ પર નોંધાઈ ગયો છે.'
                    : language === 'hi'
                    ? 'आपका नवाचार सफलतापूर्वक राष्ट्रीय पोर्टल पर पंजीकृत हो गया है।'
                    : 'Your innovation has been successfully registered on the national platform.'}
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="max-w-md mx-auto p-5 bg-[#F8FAF7] rounded-2xl border-2 border-emerald-900/15 text-center space-y-3">
                <span className="text-[11px] font-bold text-[#6B756E] uppercase tracking-wider">
                  {t('innovationIdLabel')}
                </span>
                <p className="text-2xl font-black font-mono text-[#104C35] tracking-wider">
                  {submittedInnovation.id}
                </p>

                <p className="text-xs font-bold text-[#18251E]">
                  {submittedInnovation.title[language] || submittedInnovation.title.gu || submittedInnovation.title.en}
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-emerald-900 pt-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-semibold">{submittedInnovation.status}</span>
                  <span>•</span>
                  <span>{submittedInnovation.submissionDate}</span>
                </div>

                <p className="text-[11px] text-[#6B756E] pt-2 border-t border-emerald-900/10">
                  {t('keepIdNotice')}
                </p>
              </div>

              {/* Action Buttons (Requirement 10) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href={`/innovations/${submittedInnovation.id}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold transition-colors"
                >
                  {t('viewInnovationBtn')} →
                </Link>

                <button
                  onClick={() => {
                    setStep('intro');
                    setAudioBlobUrl(null);
                    setPhotos([]);
                    setVideoUrl(null);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-emerald-900/20 text-xs font-semibold text-[#18251E] hover:bg-gray-50 cursor-pointer"
                >
                  {t('registerAnotherInnovation')}
                </button>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-50 text-[#104C35] text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  {t('myDashboardHeading')}
                </Link>
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAF7]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#104C35] border-t-amber-500 rounded-full animate-spin mx-auto" />
            <p className="text-[#104C35] font-semibold">Loading KHOJ...</p>
          </div>
        </div>
      }
    >
      <InnovatorPortalContent />
    </Suspense>
  );
}
