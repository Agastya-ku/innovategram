'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useInnovations } from '@/context/InnovationsContext';
import { AudioInstructionButton } from '@/components/AudioInstructionButton';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  Edit,
  Phone,
  MapPin,
  Globe,
  Lock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  LogIn,
  KeyRound,
  RotateCcw,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function DashboardPage() {
  const { language, t, tSector, tStage, tStatus } = useLanguage();
  const {
    currentProfile,
    setCurrentProfile,
    updateProfile,
    loginWithPhone,
    getInnovationsByProfile,
    profiles,
    innovations
  } = useInnovations();
  const router = useRouter();

  // Login form state if user is not logged in
  const [phoneInput, setPhoneInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('123456');
  const [loginError, setLoginError] = useState('');

  // Edit profile modal state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentProfile?.fullName || '');
  const [editVillage, setEditVillage] = useState(currentProfile?.villageOrTown || '');
  const [editDistrict, setEditDistrict] = useState(currentProfile?.district || '');
  const [editState, setEditState] = useState(currentProfile?.state || '');
  const [editVisibility, setEditVisibility] = useState<'public' | 'private'>(
    currentProfile?.profileVisibility || 'public'
  );

  // Response to additional info state
  const [respondingToId, setRespondingToId] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);

  // Handler for OTP sending
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.length < 5) {
      setLoginError(
        language === 'gu'
          ? 'કૃપા કરીને માન્ય મોબાઇલ નંબર દાખલ કરો.'
          : language === 'hi'
          ? 'कृपया एक वैध मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid mobile number.'
      );
      return;
    }
    setOtpSent(true);
    setLoginError('');
  };

  // Handler for OTP verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '123456') {
      setLoginError(
        language === 'gu'
          ? 'ખોટો OTP કોડ. ડેમો માટે ૧૨૩૪૫૬ વાપરો.'
          : language === 'hi'
          ? 'अमान्य OTP कोड। डेमो के लिए 123456 का उपयोग करें।'
          : 'Invalid OTP code. Use 123456 for demonstration.'
      );
      return;
    }

    const matched = loginWithPhone(phoneInput);
    if (matched) {
      setLoginError('');
    } else {
      // Auto-create a returning session for this phone number
      const cleanPhone = phoneInput.replace(/\D/g, '');
      const newProfile = {
        fullName: language === 'gu' ? 'ગ્રામીણ શોધક' : language === 'hi' ? 'ग्रामीण आविष्कारक' : 'Rural Innovator',
        phone: cleanPhone,
        phoneMasked: `+91 ${cleanPhone.slice(0, 5)} •••••`,
        phoneVerified: true,
        state: 'Gujarat',
        district: 'Patan',
        villageOrTown: 'Radhanpur',
        profileVisibility: 'public' as const,
        createdAt: new Date().toISOString().split('T')[0],
        innovationIds: []
      };
      // Login as this profile
      loginWithPhone(cleanPhone);
    }
  };

  // Switch demo account shortcut
  const handleSelectDemoProfile = (p: typeof profiles[0]) => {
    setCurrentProfile(p);
  };

  // If user is logged in, grab their innovations
  const myInnovations = currentProfile
    ? getInnovationsByProfile(currentProfile)
    : [];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProfile) return;
    updateProfile(currentProfile.id, {
      fullName: editName,
      villageOrTown: editVillage,
      district: editDistrict,
      state: editState,
      profileVisibility: editVisibility
    });
    setIsEditingProfile(false);
  };

  // 1. IF NOT LOGGED IN: SHOW PHONE + OTP RETURNING USER LOGIN
  if (!currentProfile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 space-y-8 animate-in fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#104C35] px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>KHOJ (खोज) • RETURNING INNOVATOR</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#104C35] font-serif">
            {t('loginWithPhone')}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B756E] max-w-md mx-auto">
            {language === 'gu'
              ? 'તમારા રજીસ્ટર્ડ મોબાઇલ નંબર વડે સુરક્ષિત રીતે લૉગ ઇન કરી તમારા અગાઉના આવિષ્કારો અને સ્ટેટસ જુઓ.'
              : language === 'hi'
              ? 'अपने पंजीकृत मोबाइल नंबर से सुरक्षित लॉगिन कर अपने पूर्व नवाचारों और उनकी स्थिति को देखें।'
              : 'Log in with your verified phone number to view previous innovations and manage submissions.'}
          </p>
        </div>

        {/* Demo Notice */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t('demoModeNotice')}</span>
          </p>
          <p className="text-[11px] text-amber-800">
            {language === 'gu'
              ? 'તમે નીચે આપેલા ડેમો પ્રોફાઇલ પર ક્લિક કરીને તરત જ લૉગ ઇન કરી શકો છો.'
              : language === 'hi'
              ? 'आप नीचे दिए गए डेमो प्रोफाइल पर क्लिक करके तुरंत लॉग इन कर सकते हैं।'
              : 'You can click any demo profile below for one-click access.'}
          </p>
        </div>

        {/* Quick Demo Profiles */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-900/15 shadow-sm space-y-3">
          <p className="text-xs font-bold text-[#104C35] uppercase tracking-wider">
            {language === 'gu' ? 'ઝડપી ચકાસણી માટે ડેમો પ્રોફાઇલ્સ:' : language === 'hi' ? 'त्वरित परीक्षण हेतु डेमो प्रोफ़ाइल:' : 'Quick Demo Profiles:'}
          </p>
          <div className="space-y-2">
            {profiles.slice(0, 3).map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectDemoProfile(p)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/80 text-left transition-all cursor-pointer group"
              >
                <div>
                  <p className="text-xs font-bold text-[#104C35] group-hover:text-emerald-900">
                    {p.fullName}
                  </p>
                  <p className="text-[11px] text-[#6B756E]">
                    {p.villageOrTown}, {p.district}, {p.state} • {p.phoneMasked}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#104C35] bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs">
                  {language === 'gu' ? 'લૉગ ઇન' : language === 'hi' ? 'लॉगिन' : 'Log In'} →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Phone OTP Login Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/15 shadow-md space-y-5">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('profilePhone')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B756E]" />
                  <input
                    type="tel"
                    placeholder="e.g. 98250 12345"
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#104C35]"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#104C35] hover:bg-[#176B45] text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-amber-300" />
                <span>{t('otpSendBtn')}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <p className="font-bold">
                  {t('otpSentMsg')} ({phoneInput})
                </p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Demo code: <span className="font-mono font-bold text-[#104C35]">123456</span>
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#104C35]">
                  {t('otpLabel')}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-4 py-3 text-center font-mono text-lg font-bold tracking-widest text-[#104C35] focus:ring-2 focus:ring-[#104C35]"
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                  {loginError}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-1/3 border border-emerald-900/20 text-[#6B756E] hover:text-[#18251E] text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  {language === 'gu' ? 'પાછા જાવ' : language === 'hi' ? 'पीछे' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="w-2/3 flex items-center justify-center gap-2 bg-[#104C35] hover:bg-[#176B45] text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>{t('otpVerifyBtn')}</span>
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 text-center border-t border-emerald-900/10">
            <Link
              href="/innovator?mode=new"
              className="text-xs font-bold text-[#104C35] hover:underline"
            >
              {language === 'gu'
                ? 'નવા વપરાશકર્તા છો? નવી પ્રોફાઇલ બનાવો →'
                : language === 'hi'
                ? 'नए उपयोगकर्ता हैं? नई प्रोफ़ाइल बनाएं →'
                : 'New to KHOJ? Create a new profile →'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. LOGGED IN: SHOW COMPREHENSIVE RETURNING USER DASHBOARD (REQUIREMENT 11)
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner with Innovator Profile Summary & Quick Actions */}
      <div className="bg-gradient-to-br from-[#104C35] via-[#176B45] to-[#104C35] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              KHOJ • {t('myDashboardHeading')}
            </span>
            <span className="text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md font-mono">
              {currentProfile.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
            {language === 'gu'
              ? `સ્વાગત છે, ${currentProfile.fullName}`
              : language === 'hi'
              ? `स्वागत है, ${currentProfile.fullName}`
              : `Welcome, ${currentProfile.fullName}`}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-100/90 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentProfile.villageOrTown}, {currentProfile.district}, {currentProfile.state}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentProfile.phoneMasked}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
              {currentProfile.profileVisibility === 'public' ? (
                <>
                  <Globe className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{t('profilePublic')}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('profilePrivate')}</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <Link
            href="/innovator?pathway=self"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-[#104C35] text-xs font-bold px-4 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            <span>+ {t('registerInnovationBtn')}</span>
          </Link>

          <Link
            href="/innovator?pathway=assisted"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-900/80 hover:bg-emerald-900 border border-emerald-300/30 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4 text-amber-300" />
            <span>{t('registerOnBehalf')}</span>
          </Link>

          <button
            onClick={() => setCurrentProfile(null)}
            className="text-xs text-emerald-200/80 hover:text-white px-3 py-2 cursor-pointer self-center"
          >
            {language === 'gu' ? 'લૉગ આઉટ' : language === 'hi' ? 'लॉगआउट' : 'Log Out'}
          </button>
        </div>
      </div>

      {/* Grid: Profile Management & Registered Innovations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: MY PROFILE Details (Requirement 11) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-emerald-900/15 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h2 className="text-base font-bold text-[#104C35] flex items-center gap-2 font-serif">
                <User className="w-4 h-4 text-amber-600" />
                <span>{t('myProfileSection')}</span>
              </h2>
              <button
                onClick={() => {
                  setEditName(currentProfile.fullName);
                  setEditVillage(currentProfile.villageOrTown);
                  setEditDistrict(currentProfile.district);
                  setEditState(currentProfile.state);
                  setEditVisibility(currentProfile.profileVisibility);
                  setIsEditingProfile(true);
                }}
                className="text-xs font-bold text-[#104C35] hover:text-[#176B45] flex items-center gap-1 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{t('editProfileBtn')}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#6B756E] block">{t('profileFullName')}:</span>
                <span className="font-bold text-[#18251E] text-sm">{currentProfile.fullName}</span>
              </div>

              <div>
                <span className="text-[#6B756E] block">{t('profilePhone')}:</span>
                <div className="flex items-center gap-2 font-semibold text-[#18251E]">
                  <span>{currentProfile.phoneMasked}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    {t('phoneVerifiedMsg')}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[#6B756E] block">{language === 'gu' ? 'સ્થળ / વિસ્તાર:' : language === 'hi' ? 'स्थान / क्षेत्र:' : 'Location:'}</span>
                <span className="font-semibold text-[#18251E]">
                  {currentProfile.villageOrTown}, {currentProfile.district}, {currentProfile.state}
                </span>
              </div>

              <div>
                <span className="text-[#6B756E] block">{t('profileVisibilityLabel')}:</span>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs ${
                      currentProfile.profileVisibility === 'public'
                        ? 'bg-emerald-100 text-[#104C35]'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {currentProfile.profileVisibility === 'public' ? (
                      <>
                        <Globe className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('profilePublic')}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t('profilePrivate')}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {currentProfile.socialLinks && (
                <div className="pt-2 border-t border-emerald-900/10 space-y-1">
                  <span className="text-[#6B756E] block">{t('socialLinksOptional')}:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentProfile.socialLinks.youtube && (
                      <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                        YouTube
                      </span>
                    )}
                    {currentProfile.socialLinks.facebook && (
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                        Facebook
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-[11px] text-emerald-900 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-700 inline mr-1" />
              <span>
                {language === 'gu'
                  ? 'તમારો વ્યક્તિગત નંબર ક્યારેય સાર્વજનિક કરવામાં આવતો નથી.'
                  : language === 'hi'
                  ? 'आपका व्यक्तिगत फोन नंबर कभी भी सार्वजनिक नहीं किया जाता है।'
                  : 'Personal phone numbers and private details are never exposed publicly.'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: MY INNOVATIONS List (Requirement 11) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#104C35] font-serif">
                {t('myInnovationsSection')}
              </h2>
              <span className="bg-[#104C35] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {myInnovations.length}
              </span>
            </div>

            <Link
              href="/innovator?pathway=self"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#104C35] hover:text-[#176B45]"
            >
              <Plus className="w-4 h-4" />
              <span>{t('registerAnotherInnovation')}</span>
            </Link>
          </div>

          {/* List of Innovations under this profile */}
          {myInnovations.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-emerald-900/20 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#104C35] mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#104C35]">
                  {language === 'gu'
                    ? 'હજી સુધી કોઈ આવિષ્કાર સબમિટ કરેલ નથી.'
                    : language === 'hi'
                    ? 'अभी तक कोई नवाचार पंजीकृत नहीं हुआ है।'
                    : 'No innovations registered under this profile yet.'}
                </p>
                <p className="text-xs text-[#6B756E] max-w-sm mx-auto">
                  {language === 'gu'
                    ? 'તમારો પ્રથમ દેશી આવિષ્કાર અથવા જુગાડ નોંધો અને રાષ્ટ્રીય ઓળખ મેળવો.'
                    : language === 'hi'
                    ? 'अपना पहला देसी आविष्कार पंजीकृत करें और राष्ट्रीय पहचान प्राप्त करें।'
                    : 'Submit your first grassroots tool or machine to get recognized.'}
                </p>
              </div>
              <Link
                href="/innovator?pathway=self"
                className="inline-flex items-center gap-2 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>+ {t('registerInnovationBtn')}</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myInnovations.map(item => (
                <div
                  key={item.id}
                  className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-900/15 shadow-xs hover:border-[#104C35]/40 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#104C35] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                        {item.id}
                      </span>
                      <span className="text-[11px] text-[#6B756E]">
                        {item.submissionDate}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          item.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : item.status === 'Needs More Info' || item.status === 'Additional Information Required'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-blue-50 text-blue-900 border border-blue-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        <span>{tStatus(item.status)}</span>
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                        {tStage(item.stage)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#104C35]">
                      {item.title[language] || item.title.gu || item.title.en}
                    </h3>
                    <p className="text-xs text-[#6B756E] line-clamp-2 leading-relaxed">
                      {item.problem[language] || item.problem.gu || item.problem.en}
                    </p>
                  </div>

                  {/* Verification / Institutional notes if any */}
                  {item.verificationNotes && (
                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-xs text-emerald-950 space-y-0.5">
                      <span className="font-bold flex items-center gap-1 text-[#104C35]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'gu' ? 'ચકાસણી નોંધ:' : language === 'hi' ? 'सत्यापन टिप्पणी:' : 'Review Notes:'}</span>
                      </span>
                      <p className="text-[11px] text-[#6B756E]">{item.verificationNotes}</p>
                    </div>
                  )}

                  {/* Action row */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#6B756E]">
                      <span className="font-semibold">{tSector(item.sector)}</span>
                      <span>•</span>
                      <span>{item.location.villageOrTown}, {item.location.district}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {(item.status === 'Needs More Info' || item.status === 'Additional Information Required') && (
                        <button
                          onClick={() => {
                            setRespondingToId(item.id);
                            setResponseMessage('');
                            setResponseSuccess(false);
                          }}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          {language === 'gu' ? 'માહિતી પૂરી પાડો' : language === 'hi' ? 'जानकारी प्रदान करें' : 'Provide Info'}
                        </button>
                      )}

                      <Link
                        href={`/innovations/${item.id}`}
                        className="inline-flex items-center gap-1 bg-[#104C35] hover:bg-[#176B45] text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors"
                      >
                        <span>{t('viewInnovationBtn')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Edit Profile */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-emerald-900/20">
            <h3 className="text-lg font-bold text-[#104C35] font-serif">
              {t('editProfileBtn')}
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#104C35]">{t('profileFullName')}</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-3 py-2.5 text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#104C35]">{t('profileVillage')}</label>
                  <input
                    type="text"
                    value={editVillage}
                    onChange={e => setEditVillage(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-3 py-2.5 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#104C35]">{t('profileDistrict')}</label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={e => setEditDistrict(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#104C35]">{t('profileVisibilityLabel')}</label>
                <select
                  value={editVisibility}
                  onChange={e => setEditVisibility(e.target.value as 'public' | 'private')}
                  className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl px-3 py-2.5 text-xs font-semibold"
                >
                  <option value="public">{t('profilePublic')}</option>
                  <option value="private">{t('profilePrivate')}</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 border border-emerald-900/20 text-[#6B756E] rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  {language === 'gu' ? 'રદ કરો' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#104C35] hover:bg-[#176B45] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {language === 'gu' ? 'સાચવો' : language === 'hi' ? 'सहेजें' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Respond to Additional Information Request */}
      {respondingToId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-emerald-900/20">
            <h3 className="text-lg font-bold text-[#104C35] font-serif">
              {language === 'gu' ? 'વધારાની માહિતી પૂરી પાડો' : language === 'hi' ? 'अतिरिक्त जानकारी प्रदान करें' : 'Provide Additional Information'}
            </h3>
            <p className="text-xs text-[#6B756E]">
              {language === 'gu'
                ? `આવિષ્કાર ID: ${respondingToId} માટે સમીક્ષા સમિતિ દ્વારા માંગવામાં આવેલી સ્પષ્ટતા દાખલ કરો.`
                : language === 'hi'
                ? `नवाचार ID: ${respondingToId} के लिए मूल्यांकन समिति द्वारा मांगी गई जानकारी दें।`
                : `Submit clarifications requested by the review board for ID: ${respondingToId}.`}
            </p>

            {responseSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold">
                  {language === 'gu' ? 'માહિતી સફળતાપૂર્વક મોકલાઈ ગઈ!' : language === 'hi' ? 'जानकारी सफलतापूर्वक भेज दी गई!' : 'Information successfully submitted!'}
                </p>
                <button
                  onClick={() => setRespondingToId(null)}
                  className="px-4 py-1.5 bg-[#104C35] text-white text-xs font-bold rounded-lg mt-2 cursor-pointer"
                >
                  {language === 'gu' ? 'બંધ કરો' : language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={responseMessage}
                  onChange={e => setResponseMessage(e.target.value)}
                  placeholder={
                    language === 'gu'
                      ? 'અહીં વિગતવાર માહિતી લખો...'
                      : language === 'hi'
                      ? 'यहाँ विस्तृत जानकारी लिखें...'
                      : 'Type the requested details here...'
                  }
                  className="w-full bg-[#F8FAF7] border border-emerald-900/15 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#104C35]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setRespondingToId(null)}
                    className="px-4 py-2 border border-emerald-900/20 text-[#6B756E] text-xs rounded-xl hover:bg-gray-50 cursor-pointer"
                  >
                    {language === 'gu' ? 'રદ કરો' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => setResponseSuccess(true)}
                    className="px-5 py-2 bg-[#104C35] hover:bg-[#176B45] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {language === 'gu' ? 'સબમિટ કરો' : language === 'hi' ? 'जमा करें' : 'Submit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
