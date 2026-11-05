'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { InnovatorProfile } from '@/types/innovategram';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import {
  Mic,
  Square,
  CheckCircle2,
  Volume2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Globe,
  Lock,
  ArrowRight,
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Sparkles,
  Share2
} from 'lucide-react';

interface VoiceProfileFormProps {
  onProfileCreated: (profile: InnovatorProfile) => void;
  onCancel?: () => void;
}

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

export const VoiceProfileForm: React.FC<VoiceProfileFormProps> = ({ onProfileCreated, onCancel }) => {
  const { language, t } = useLanguage();
  const { addProfile } = useInnovations();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Current question step: 0: Name, 1: State/District, 2: Village, 3: Phone/OTP, 4: Visibility & Social
  const [currentStep, setCurrentStep] = useState(0);

  // Profile data state
  const [fullName, setFullName] = useState('');
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [selectedDistrict, setSelectedDistrict] = useState('Ahmedabad');
  const [villageOrTown, setVillageOrTown] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('123456');
  const [otpSent, setOtpSent] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const [voiceInputText, setVoiceInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef<any>(null);

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleExtractedVoice(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [language, currentStep]);

  // Questions configuration
  const questions = [
    {
      id: 'name',
      title: {
        gu: 'તમારું શુભ નામ શું છે?',
        hi: 'आपका शुभ नाम क्या है?',
        en: 'What is your full name?'
      },
      subtitle: {
        gu: 'તમારું પૂરું નામ બોલો અથવા લખો. દા.ત. રમેશભાઈ પટેલ',
        hi: 'अपना पूरा नाम बोलें या लिखें। जैसे: रमेश पटेल',
        en: 'Speak or type your full name. e.g. Ramesh Patel'
      },
      icon: <User className="w-8 h-8 text-[#104C35]" />
    },
    {
      id: 'location',
      title: {
        gu: 'તમે કયા રાજ્ય અને જિલ્લાના રહેવાસી છો?',
        hi: 'आप किस राज्य और जिले के निवासी हैं?',
        en: 'Which state and district are you from?'
      },
      subtitle: {
        gu: 'તમારું રાજ્ય અને જિલ્લો પસંદ કરો અથવા બોલો.',
        hi: 'अपना राज्य और जिला चुनें या बोलकर बताएं।',
        en: 'Select your state and district below or speak verbally.'
      },
      icon: <MapPin className="w-8 h-8 text-[#104C35]" />
    },
    {
      id: 'village',
      title: {
        gu: 'તમારું ગામ કે કસ્બાનું નામ શું છે?',
        hi: 'आपके गांव या कस्बे का नाम क्या है?',
        en: 'What is the name of your village or town?'
      },
      subtitle: {
        gu: 'તમારા ગામનું નામ બોલો અથવા લખો. દા.ત. સાણંદ, રાધનપુર',
        hi: 'अपने गांव का नाम बोलें या लिखें। जैसे: साणंद, राधनपुर',
        en: 'Speak or type your village or town name. e.g. Sanand'
      },
      icon: <MapPin className="w-8 h-8 text-amber-600" />
    },
    {
      id: 'phone',
      title: {
        gu: 'તમારો મોબાઇલ નંબર શું છે?',
        hi: 'आपका मोबाइल नंबर क्या है?',
        en: 'What is your mobile number?'
      },
      subtitle: {
        gu: 'OTP વેરિફિકેશન માટે તમારો ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.',
        hi: 'OTP सत्यापन के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
        en: 'Enter your 10-digit mobile number for secure phone verification.'
      },
      icon: <Phone className="w-8 h-8 text-[#104C35]" />
    },
    {
      id: 'visibility',
      title: {
        gu: 'પ્રોફાઇલ દૃશ્યતા અને સોશ્યલ મીડિયા (વૈકલ્પિક)',
        hi: 'प्रोफ़ाइल दृश्यता और सोशल मीडिया (वैकल्पिक)',
        en: 'Profile Visibility & Social Media (Optional)'
      },
      subtitle: {
        gu: 'પ્રોફાઇલ જાહેર રાખવી કે ખાનગી તે પસંદ કરો. કોઈ આધાર કે GST જરૂરી નથી.',
        hi: 'चुनें कि प्रोफ़ाइल सार्वजनिक रहेगी या निजी। किसी आधार या जीएसटी की आवश्यकता नहीं है।',
        en: 'Choose Public or Private visibility. No Aadhaar or GST documents required.'
      },
      icon: <Globe className="w-8 h-8 text-amber-600" />
    }
  ];

  const currentQ = questions[currentStep];

  // Start voice recognition
  const startListening = () => {
    setErrorMsg('');
    setIsListening(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // Fallback simulation for browsers blocking microphone
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  // Simulation fallback for demonstration
  const simulateVoiceInput = () => {
    setTimeout(() => {
      let sim = '';
      if (currentStep === 0) {
        sim = language === 'gu' ? 'રમેશભાઈ પટેલ' : language === 'hi' ? 'रमेश पटेल' : 'Ramesh Patel';
      } else if (currentStep === 1) {
        sim = language === 'gu' ? 'ગુજરાત, અમદાવાદ' : language === 'hi' ? 'गुजरात, अहमदाबाद' : 'Gujarat, Ahmedabad';
      } else if (currentStep === 2) {
        sim = language === 'gu' ? 'સાણંદ' : language === 'hi' ? 'साणंद' : 'Sanand';
      } else if (currentStep === 3) {
        sim = '9825012345';
      }
      handleExtractedVoice(sim);
      setIsListening(false);
    }, 1200);
  };

  // Populate field based on voice transcript
  const handleExtractedVoice = (text: string) => {
    setVoiceInputText(text);
    if (currentStep === 0) {
      setFullName(text.replace(/મારું નામ|મેરા નામ|my name is/gi, '').trim());
    } else if (currentStep === 1) {
      // attempt to match state or district
      if (text.toLowerCase().includes('rajasthan') || text.includes('રાજસ્થાન') || text.includes('राजस्थान')) {
        setSelectedState('Rajasthan');
        setSelectedDistrict('Nagaur');
      } else {
        setSelectedState('Gujarat');
        setSelectedDistrict('Ahmedabad');
      }
    } else if (currentStep === 2) {
      setVillageOrTown(text.replace(/ગામ|ગાંવ|village/gi, '').trim());
    } else if (currentStep === 3) {
      const digits = text.replace(/\D/g, '');
      if (digits.length >= 10) {
        setPhone(digits.slice(0, 10));
      } else if (digits.length > 0) {
        setPhone(digits);
      }
    }
  };

  // Read question aloud
  const playQuestionAudio = () => {
    const textToSpeak = currentQ.title[language] || currentQ.title.en;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto speech on mount removed to adhere to rule: "Do not autoplay audio without user interaction"
  // User can click speaker icon or replay button anytime

  // Handle phone verification
  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setErrorMsg(
        language === 'gu'
          ? 'કૃપા કરીને ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.'
          : language === 'hi'
          ? 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }
    setOtpSent(true);
    setErrorMsg('');
  };

  const handleVerifyOtp = () => {
    if (otpCode !== '123456') {
      setErrorMsg(
        language === 'gu'
          ? 'ખોટો OTP કોડ. ડેમો માટે ૧૨૩૪૫૬ વાપરો.'
          : language === 'hi'
          ? 'अमान्य OTP कोड। डेमो के लिए 123456 का उपयोग करें।'
          : 'Invalid OTP code. Use 123456 for testing.'
      );
      return;
    }
    setPhoneVerified(true);
    setErrorMsg('');
  };

  // Navigation handlers
  const canProceed = () => {
    if (currentStep === 0) return fullName.trim().length > 0;
    if (currentStep === 1) return selectedState.length > 0 && selectedDistrict.length > 0;
    if (currentStep === 2) return villageOrTown.trim().length > 0;
    if (currentStep === 3) return phoneVerified;
    if (currentStep === 4) return true;
    return false;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete profile creation!
      const cleanPhone = phone.replace(/\D/g, '');
      const masked = cleanPhone.length >= 10
        ? `+91 ${cleanPhone.slice(0, 5)} •••••`
        : `+91 ${cleanPhone}`;

      const created = addProfile({
        fullName: fullName.trim(),
        phone: cleanPhone,
        phoneMasked: masked,
        phoneVerified: true,
        state: selectedState,
        district: selectedDistrict,
        villageOrTown: villageOrTown.trim() || 'Radhanpur',
        profileVisibility,
        socialLinks: {
          youtube: youtubeLink.trim() || undefined,
          facebook: facebookLink.trim() || undefined
        }
      });

      onProfileCreated(created);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-3xl border border-emerald-900/10 p-10 text-center">
        <div className="w-8 h-8 border-3 border-[#104C35] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-900/15 shadow-xl p-6 sm:p-10 space-y-8 animate-in fade-in">
      {/* Top Wizard Progress & Audio Assistance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>KHOJ (खोज) • {t('createProfileHeading')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#104C35] font-serif mt-0.5">
            {t('createProfileHeading')}
          </h2>
          <p className="text-xs text-[#6B756E] mt-0.5">
            {t('createProfileSubtitle')}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                idx === currentStep
                  ? 'bg-[#104C35] text-white ring-4 ring-emerald-100'
                  : idx < currentStep
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {idx < currentStep ? '✓' : idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="space-y-6">
        <div className="flex items-start gap-4 bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs shrink-0 border border-emerald-100">
            {currentQ.icon}
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#104C35]">
                {currentQ.title[language] || currentQ.title.en}
              </h3>
              <AudioInstructionButton
                text={currentQ.title[language] || currentQ.title.en}
                size="sm"
              />
            </div>
            <p className="text-xs text-[#6B756E]">
              {currentQ.subtitle[language] || currentQ.subtitle.en}
            </p>
          </div>
        </div>

        {/* Question Step Content */}
        <div className="space-y-4">
          {/* STEP 0: FULL NAME */}
          {currentStep === 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#104C35]">
                {t('profileFullName')}
              </label>
              <input
                type="text"
                placeholder={language === 'gu' ? 'દા.ત. રમેશભાઈ પટેલ' : language === 'hi' ? 'उदा. रमेश पटेल' : 'e.g. Ramesh Patel'}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-2xl p-4 text-base font-semibold text-[#18251E] focus:ring-2 focus:ring-[#104C35]"
                autoFocus
              />
            </div>
          )}

          {/* STEP 1: STATE & DISTRICT */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('profileState')}
                </label>
                <select
                  value={selectedState}
                  onChange={e => {
                    const st = e.target.value;
                    setSelectedState(st);
                    setSelectedDistrict(INDIAN_STATES_DISTRICTS[st]?.[0] || '');
                  }}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-2xl p-3.5 text-sm font-semibold text-[#18251E]"
                >
                  {Object.keys(INDIAN_STATES_DISTRICTS).map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('profileDistrict')}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-2xl p-3.5 text-sm font-semibold text-[#18251E]"
                >
                  {(INDIAN_STATES_DISTRICTS[selectedState] || []).map(dist => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: VILLAGE OR TOWN */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#104C35]">
                {t('profileVillage')}
              </label>
              <input
                type="text"
                placeholder={language === 'gu' ? 'દા.ત. સાણંદ અથવા રાધનપુર' : language === 'hi' ? 'उदा. साणंद या राधनपुर' : 'e.g. Sanand or Radhanpur'}
                value={villageOrTown}
                onChange={e => setVillageOrTown(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-2xl p-4 text-base font-semibold text-[#18251E] focus:ring-2 focus:ring-[#104C35]"
                autoFocus
              />
            </div>
          )}

          {/* STEP 3: PHONE & OTP VERIFICATION (NO AADHAAR, NO EMAIL) */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('profilePhone')} (10 {language === 'gu' ? 'આંકડા' : language === 'hi' ? 'अंक' : 'Digits'})
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="98250 12345"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    disabled={phoneVerified}
                    className="flex-1 bg-[#F8FAF7] border border-emerald-900/15 rounded-2xl p-3.5 text-sm font-semibold text-[#18251E] focus:ring-2 focus:ring-[#104C35]"
                  />
                  {!phoneVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-5 py-3.5 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold rounded-2xl shadow-xs cursor-pointer"
                    >
                      {otpSent ? (language === 'gu' ? 'ફરી મોકલો' : language === 'hi' ? 'पुनः भेजें' : 'Resend') : t('otpSendBtn')}
                    </button>
                  )}
                </div>
              </div>

              {otpSent && !phoneVerified && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                  <div className="text-xs text-amber-900">
                    <p className="font-bold">{t('otpSentMsg')}</p>
                    <p className="text-[11px] text-amber-800">
                      {t('demoModeNotice')} (Code: <span className="font-bold text-[#104C35]">123456</span>)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      className="w-36 bg-white border border-amber-300 rounded-xl px-3 py-2 text-center font-mono font-bold tracking-widest text-[#104C35]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      {t('otpVerifyBtn')}
                    </button>
                  </div>
                </div>
              )}

              {phoneVerified && (
                <div className="p-3.5 bg-emerald-100/90 text-emerald-950 rounded-2xl border border-emerald-300 flex items-center gap-2 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>{t('phoneVerifiedMsg')}</span>
                </div>
              )}

              {errorMsg && (
                <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errorMsg}
                </p>
              )}
            </div>
          )}

          {/* STEP 4: VISIBILITY & SOCIAL LINKS (OPTIONAL) */}
          {currentStep === 4 && (
            <div className="space-y-5">
              {/* Profile Visibility Controls */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('profileVisibilityLabel')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProfileVisibility('public')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      profileVisibility === 'public'
                        ? 'border-[#104C35] bg-emerald-50/80 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#104C35]">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>{t('profilePublic')}</span>
                    </div>
                    <p className="text-[11px] text-[#6B756E] mt-1">
                      {t('profilePublicDesc')}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProfileVisibility('private')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      profileVisibility === 'private'
                        ? 'border-amber-600 bg-amber-50 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                      <Lock className="w-4 h-4 text-amber-700" />
                      <span>{t('profilePrivate')}</span>
                    </div>
                    <p className="text-[11px] text-[#6B756E] mt-1">
                      {t('profilePrivateDesc')}
                    </p>
                  </button>
                </div>
              </div>

              {/* Optional Social Links */}
              <div className="space-y-2 pt-2 border-t border-emerald-900/10">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('socialLinksOptional')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="url"
                      placeholder="YouTube Channel (Optional)"
                      value={youtubeLink}
                      onChange={e => setYoutubeLink(e.target.value)}
                      className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-3 py-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="Facebook Profile (Optional)"
                      value={facebookLink}
                      onChange={e => setFacebookLink(e.target.value)}
                      className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-3 py-2.5 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Voice Input Assistant Bar */}
        <div className="p-4 bg-emerald-900/5 rounded-2xl border border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#104C35] font-semibold">
            <Mic className="w-4 h-4 text-amber-600" />
            <span>
              {language === 'gu'
                ? 'અવાજ દ્વારા જવાબ આપવા માઇક બટન દબાવો:'
                : language === 'hi'
                ? 'आवाज़ से उत्तर देने हेतु माइक दबाएं:'
                : 'Press mic to answer with your voice:'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isListening ? (
              <button
                type="button"
                onClick={startListening}
                className="flex items-center gap-2 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('speakAnswerBtn')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopListening}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs animate-pulse cursor-pointer"
              >
                <Square className="w-3.5 h-3.5" />
                <span>{language === 'gu' ? 'રેકોર્ડિંગ રોકો' : language === 'hi' ? 'रोकें' : 'Stop'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={playQuestionAudio}
              className="p-2 border border-emerald-900/20 text-[#104C35] hover:bg-emerald-50 rounded-xl transition-all cursor-pointer"
              title="Replay Question"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-emerald-900/10">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-5 py-3 border border-emerald-900/20 text-[#6B756E] hover:text-[#18251E] text-xs font-bold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 0 ? (language === 'gu' ? 'રદ કરો' : language === 'hi' ? 'रद्द' : 'Cancel') : t('prevQuestionBtn')}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              canProceed()
                ? 'bg-[#104C35] hover:bg-[#176B45] text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>
              {currentStep === questions.length - 1
                ? (language === 'gu' ? 'પ્રોફાઇલ સાચવો & આગળ વધો' : language === 'hi' ? 'प्रोफ़ाइल सहेजें एवं आगे बढ़ें' : 'Save Profile & Proceed')
                : t('nextQuestionBtn')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

