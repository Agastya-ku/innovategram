'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Volume2, HelpCircle, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function InnovatorHelpPage() {
  const { language, t } = useLanguage();

  const playVoiceInstruction = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'gu') utterance.lang = 'gu-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const faqs = [
    {
      q: {
        en: 'Do I need any technical knowledge or business documents to submit?',
        hi: 'क्या नवाचार जमा करने के लिए किसी तकनीकी ज्ञान या व्यापारिक कागजात की जरूरत है?',
        gu: 'શું આવિષ્કાર સબમિટ કરવા માટે કોઈ તકનીકી જ્ઞાન કે કાગળિયાની જરૂર છે?'
      },
      a: {
        en: 'No. KHOJ requires NO GST, company registration, Aadhaar, or business plan. You only need to explain your idea using the voice recorder.',
        hi: 'बिल्कुल नहीं। आपको किसी जीएसटी, आधार या कंपनी पंजीकरण की आवश्यकता नहीं है। बस माइक दबाएं और अपनी भाषा में समझाएं।',
        gu: 'બિલકુલ નહીં. કોઈ જીએસટી, આધાર કે કંપનીની જરૂર નથી. ફક્ત માઇક દબાવીને તમારી ભાષામાં વાત કરો.'
      }
    },
    {
      q: {
        en: 'Is my phone number or house address made public?',
        hi: 'क्या मेरा फोन नंबर या घर का पता सार्वजनिक किया जाता है?',
        gu: 'શું મારો મોબાઇલ નંબર કે ઘરનું સરનામું જાહેર થાય છે?'
      },
      a: {
        en: 'Never. KHOJ enforces a Rural Data Privacy Shield. Only the village and district name are shown. Organizations must request consent through the portal to contact you.',
        hi: 'कभी नहीं। केवल गांव और जिले का नाम दिखाया जाता है। कोई भी संस्था आपकी सहमति के बिना आपका फोन नंबर नहीं देख सकती।',
        gu: 'ક્યારેય નહીં. ફક્ત ગામ અને જિલ્લાનું નામ જ દેખાય છે. સંસ્થાઓ તમારી પરવાનગી પછી જ તમારો સંપર્ક કરી શકે છે.'
      }
    },
    {
      q: {
        en: 'What happens after I submit my innovation?',
        hi: 'नवाचार जमा करने के बाद क्या होता है?',
        gu: 'આવિષ્કાર સબમિટ કર્યા પછી શું થાય છે?'
      },
      a: {
        en: 'Our AI translates and categorizes your submission. Regional evaluators and Krishi Vigyan Kendras review it. When an incubator or government scheme is interested, they send an official connection request.',
        hi: 'हमारा एआई आपके नवाचार को समझकर 3 भाषाओं में बदलता है। तकनीकी विशेषज्ञ इसकी जांच करते हैं और सरकारी योजनाओं या इनक्यूबेटर से संपर्क जोड़ते हैं।',
        gu: 'અમારું એઆઈ તમારા આવિષ્કારને સમજીને ૩ ભાષામાં તૈયાર કરે છે. નિષ્ણાતો તેની ચકાસણી કરીને સહાય અને અનુદાન માટે જોડે છે.'
      }
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#176B45] flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#104C35] font-serif">{t('audioHelpBtn')}</h1>
            <p className="text-xs text-[#6B756E]">Simple voice guidance and answers for rural creators</p>
          </div>
        </div>
      </div>

      {/* Audio Walkthrough Card */}
      <div className="bg-[#EAF5ED] border border-emerald-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#104C35] uppercase tracking-wider">
            <Volume2 className="w-4 h-4 text-[#176B45]" />
            <span>Audio Walkthrough</span>
          </div>
          <button
            onClick={() =>
              playVoiceInstruction(
                language === 'hi'
                  ? 'इनोवेटग्राम में आपका स्वागत है। यहां आप अपनी भाषा में बोलकर अपने आविष्कार के बारे में बता सकते हैं। आपको कोई फॉर्म भरने की जरूरत नहीं है।'
                  : language === 'gu'
                  ? 'ઇનોવેટગ્રામમાં તમારું સ્વાગત છે. અહીં તમે બોલીને તમારા આવિષ્કારની માહિતી આપી શકો છો. કોઈ ફોર્મ ભરવાની જરૂર નથી.'
                  : 'Welcome to KHOJ. You can speak naturally in English, Hindi or Gujarati. You do not need to fill complicated forms.'
              )
            }
            className="flex items-center gap-1.5 bg-[#176B45] hover:bg-[#104C35] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen Now</span>
          </button>
        </div>
        <p className="text-xs text-[#18251E] leading-relaxed">
          Tap the Listen button to hear how the voice submission works in your selected language.
        </p>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#104C35]">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-[#18251E]">
                {faq.q[language] || faq.q.en}
              </h3>
              <button
                onClick={() => playVoiceInstruction(faq.a[language] || faq.a.en)}
                className="text-[#176B45] hover:bg-emerald-50 p-1 rounded-md shrink-0"
                title="Read aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#6B756E] leading-relaxed">
              {faq.a[language] || faq.a.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

