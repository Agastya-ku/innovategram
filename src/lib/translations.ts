import { Language, Sector, Stage, VerificationStatus } from '@/types/innovategram';

export type StakeholderRole =
  | 'Government departments'
  | 'Incubators'
  | 'Universities'
  | 'NGOs'
  | 'Startups'
  | 'Manufacturers'
  | 'Research institutions';

export const translations = {
  // Brand & General
  brandName: {
    en: 'InnovateGram',
    hi: 'इनोवेटग्राम',
    gu: 'ઇનોવેટગ્રામ'
  },
  tagline: {
    en: 'AI-Powered Grassroots & Rural Innovation Discovery Platform',
    hi: 'एआई-संचालित ग्रामीण एवं जमीनी नवाचार खोज मंच',
    gu: 'એઆઈ-આધારિત ગ્રામીણ અને પાયાના આવિષ્કારોનું રાષ્ટ્રીય મંચ'
  },
  portalInnovator: {
    en: 'Innovator Portal',
    hi: 'नवाचारकर्ता पोर्टल',
    gu: 'આવિષ્કારક પોર્ટલ'
  },
  portalStakeholder: {
    en: 'Stakeholder Portal',
    hi: 'हितधारक पोर्टल',
    gu: 'સ્ટેકહોલ્ડર પોર્ટલ'
  },
  portalAdmin: {
    en: 'Admin Moderation',
    hi: 'व्यवस्थापक पोर्टल',
    gu: 'એડમિન પોર્ટલ'
  },

  // Audio Buttons & Controls
  audioLabel: {
    en: 'Audio',
    hi: 'ऑडियो',
    gu: 'ઓડિયો'
  },
  audioPlaying: {
    en: 'Playing...',
    hi: 'चल रहा है...',
    gu: 'સાંભળી રહ્યા છો...'
  },
  audioListen: {
    en: 'Listen',
    hi: 'सुनें',
    gu: 'સાંભળો'
  },

  // 1. First Impression & Homepage Purpose
  homepageHeroHeadline: {
    en: 'Have you created something that solves a problem in your village or community?',
    hi: 'क्या आपने अपने गांव या समुदाय की किसी समस्या को हल करने के लिए कुछ नया बनाया है?',
    gu: 'શું તમે તમારા ગામ કે વિસ્તારની કોઈ સમસ્યા દૂર કરવા માટે કંઈક નવું બનાવ્યું છે?'
  },
  homepagePurpose: {
    en: 'Have you created something that solves a problem in your village or community? Share your innovation with us. Speak in your own language, upload a photo or make a video. We help connect your idea with the right people and organizations.',
    hi: 'क्या आपने अपने गांव या समुदाय की किसी समस्या को हल करने के लिए कुछ नया बनाया है? अपने नवाचार को हमारे साथ साझा करें। अपनी भाषा में बोलें, फोटो अपलोड करें या वीडियो बनाएं। हम आपके विचार को सही लोगों और संस्थाओं से जोड़ने में मदद करते हैं।',
    gu: 'શું તમે તમારા ગામ કે વિસ્તારની કોઈ સમસ્યા દૂર કરવા માટે કંઈક નવું બનાવ્યું છે? તમારો આવિષ્કાર અમારી સાથે શેર કરો. તમારી પોતાની ભાષામાં બોલો, ફોટો લો અથવા વીડિયો બનાવો. અમે તમારા વિચારને યોગ્ય સંસ્થાઓ અને સહાયકો સાથે જોડીશું.'
  },
  homepageHeroSubtitle: {
    en: 'Share your innovation with us. Speak in your own language, upload a photo or make a video. We help connect your idea with the right people and organizations.',
    hi: 'अपने नवाचार को हमारे साथ साझा करें। अपनी भाषा में बोलें, फोटो अपलोड करें या वीडियो बनाएं। हम आपके विचार को सही लोगों और संस्थाओं से जोड़ने में मदद करते हैं।',
    gu: 'તમારો આવિષ્કાર અમારી સાથે શેર કરો. તમારી પોતાની ભાષામાં બોલો, ફોટો લો અથવા વીડિયો બનાવો. અમે તમારા વિચારને યોગ્ય લોકો અને સંસ્થાઓ સાથે જોડીશું.'
  },
  shareInnovationBtn: {
    en: 'Share Your Innovation',
    hi: 'अपना नवाचार साझा करें',
    gu: 'તમારો આવિષ્કાર રજૂ કરો'
  },
  discoverInnovationsBtn: {
    en: 'Discover Innovations',
    hi: 'नवाचार खोजें',
    gu: 'આવિષ્કારો શોધો'
  },
  interactiveMapBtn: {
    en: 'Interactive Innovation Map',
    hi: 'इंटरैक्टिव नवाचार नक्शा',
    gu: 'ઇન્ટરેક્ટિવ નકશો'
  },

  // Voice Instructions for Requirements
  voiceInstructionHome: {
    en: 'Press this button and tell us about your invention.',
    hi: 'यह बटन दबाएं और हमें अपने आविष्कार के बारे में बताएं।',
    gu: 'આ બટન દબાવો અને તમારી નવીનતા વિશે અમને જણાવો.'
  },
  voiceInstructionSubmission: {
    en: 'Please explain what you created and what problem it solves.',
    hi: 'कृपया समझाएं कि आपने क्या बनाया है और यह किस समस्या का समाधान करता है।',
    gu: 'કૃપા કરીને સમજાવો કે તમે શું બનાવ્યું છે અને તે કઈ સમસ્યાનું નિરાકરણ કરે છે.'
  },
  voiceInstructionPhoto: {
    en: 'Take a photograph of your invention.',
    hi: 'अपने आविष्कार की तस्वीर लें।',
    gu: 'તમારા આવિષ્કારનો ફોટો લો.'
  },
  voiceInstructionLocation: {
    en: 'Select your village or allow us to identify your location.',
    hi: 'अपना गांव चुनें या हमें अपना स्थान पहचानने की अनुमति दें।',
    gu: 'તમારું ગામ પસંદ કરો અથવા અમને તમારું સ્થાન શોધવાની મંજૂરી આપો.'
  },
  voiceInstructionConfirmation: {
    en: 'Listen to the information and tell us whether it is correct.',
    hi: 'जानकारी सुनें और हमें बताएं कि क्या यह सही है।',
    gu: 'માહિતી સાંભળો અને અમને જણાવો કે શું તે સાચી છે.'
  },
  voiceInstructionSuccess: {
    en: 'Your innovation has been submitted successfully.',
    hi: 'आपका नवाचार सफलतापूर्वक जमा कर दिया गया है।',
    gu: 'તમારો આવિષ્કાર સફળતાપૂર્વક સબમિટ કરવામાં આવ્યો છે.'
  },

  // Innovator Portal UI & Labels
  innovatorPortalBadge: {
    en: 'Voice-First Grassroots Platform',
    hi: 'ध्वनि-प्रथम ग्रामीण मंच',
    gu: 'વોઇસ-ફર્સ્ટ ગ્રામીણ મંચ'
  },
  innovatorPortalTagline: {
    en: 'Simple, voice-assisted, 0% paperwork',
    hi: 'सरल, ध्वनि-आधारित, 0% कागजी कार्रवाई',
    gu: 'સરળ, વોઇસ-આધારિત, 0% કાગળિયા'
  },
  pathwayTabSelf: {
    en: 'Option A: For Myself',
    hi: 'विकल्प A: स्वयं के लिए',
    gu: 'ઓપ્શન A: પોતાના માટે'
  },
  pathwayTabAssisted: {
    en: 'Option B: For Someone Else',
    hi: 'विकल्प B: किसी अन्य के लिए',
    gu: 'ઓપ્શન B: અન્ય વતી'
  },
  speakAllInOne: {
    en: 'Speak everything in one recording',
    hi: 'एक ही बार में पूरी बात बोलें',
    gu: 'એકસાથે સંપૂર્ણ વાત બોલો'
  },
  conversationalOptionTitle: {
    en: 'Voice Q&A Assistant',
    hi: 'सवाल-जवाब सहायक (Voice Q&A)',
    gu: 'સવાલ-જવાબ સહાયક (Voice Q&A)'
  },
  conversationalOptionDesc: {
    en: 'Answer simple questions one by one',
    hi: 'एक-एक करके प्रश्नों का उत्तर दें',
    gu: 'એક પછી એક સવાલનો જવાબ આપો'
  },
  orText: {
    en: 'OR',
    hi: 'या',
    gu: 'અથવા'
  },
  orStartMedia: {
    en: 'Or start by adding photos and videos',
    hi: 'या फोटो और वीडियो जोड़कर शुरू करें',
    gu: 'અથવા ફોટો અને વીડિયો દ્વારા શરૂ કરો'
  },
  nextPhotoVideo: {
    en: 'Next: Photos & Videos →',
    hi: 'आगे: फोटो और वीडियो →',
    gu: 'આગળ: ફોટો અને વીડિયો →'
  },
  nextLocation: {
    en: 'Next: Select Location →',
    hi: 'आगे: स्थान चुनें →',
    gu: 'આગળ: સ્થળ પસંદ કરો →'
  },
  backAudio: {
    en: '← Back (Audio)',
    hi: '← पीछे (आवाज़)',
    gu: '← પાછળ (અવાજ)'
  },
  backMedia: {
    en: '← Back (Media)',
    hi: '← पीछे (मीडिया)',
    gu: '← પાછળ (મીડિયા)'
  },
  backLocation: {
    en: '← Back (Location)',
    hi: '← पीछे (स्थान)',
    gu: '← પાછળ (સ્થળ)'
  },
  aiAnalyzing: {
    en: 'AI Engine is analyzing your voice and details...',
    hi: 'एआई इंजन आपकी आवाज़ और जानकारी का विश्लेषण कर रहा है...',
    gu: 'AI એન્જિન તમારા અવાજ અને વિગતોનું વિશ્લેષણ કરી રહ્યું છે...'
  },
  aiAnalyzingDesc: {
    en: 'Audio transcription, language detection, problem extraction, and 3-language translation.',
    hi: 'ध्वनि प्रतिलिपि, भाषा पहचान, समस्या निष्कर्षण और 3 भाषाओं में अनुवाद।',
    gu: 'ઓડિયો ટ્રાન્સક્રિપ્શન, ભાષા ઓળખ, સમસ્યા અને ઉપાય તારવણી તથા ૩ ભાષાઓમાં રૂપાંતર.'
  },
  submittingText: {
    en: 'Submitting...',
    hi: 'जमा हो रहा है...',
    gu: 'સબમિટ થઈ રહ્યું છે...'
  },
  keepIdNotice: {
    en: 'Keep this ID to track evaluation status or recover your record.',
    hi: 'मूल्यांकन स्थिति जांचने या रिकॉर्ड प्राप्त करने के लिए यह आईडी सुरक्षित रखें।',
    gu: 'આ ID સાચવી રાખો. ભવિષ્યમાં સ્ટેટસ ચેક કરવા કે સહાય મેળવવા માટે આ નંબર જરૂરી રહેશે.'
  },
  selectLanguagePrompt: {
    en: 'Language:',
    hi: 'भाषा:',
    gu: 'ભાષા:'
  },
  platformTaglineShort: {
    en: 'Grassroots Invention • National Platform',
    hi: 'ग्रामीण खोज • राष्ट्रीय मंच',
    gu: 'ગામડાની શોધ • રાષ્ટ્રીય મંચ'
  },
  zeroFee: {
    en: '0% Application Fee',
    hi: '0% फॉर्म फीस',
    gu: '0% ફોર્મ ફી'
  },
  optionAPreviewDesc: {
    en: 'I created this myself',
    hi: 'मैंने इसे स्वयं बनाया है',
    gu: 'મેં જાતે બનાવ્યું છે'
  },
  optionBPreviewDesc: {
    en: 'Helping someone else',
    hi: 'किसी अन्य की मदद कर रहे हैं',
    gu: 'અન્ય વ્યક્તિ વતી મદદ'
  },
  sectorsCataloged: {
    en: 'Sectors Cataloged',
    hi: 'वर्गीकृत क्षेत्र',
    gu: 'ક્ષેત્રો (Sectors)'
  },
  statesRepresented: {
    en: 'States Represented',
    hi: 'प्रतिनिधित्व वाले राज्य',
    gu: 'રાજ્યો (States)'
  },
  viewAllInnovations: {
    en: 'View all innovations',
    hi: 'सभी नवाचार देखें',
    gu: 'બધા આવિષ્કારો જુઓ'
  },
  verifiedInnovationsTitle: {
    en: 'Verified Grassroots Inventions',
    hi: 'सत्यापित जमीनी नवाचार',
    gu: 'ચકાસાયેલ પાયાના આવિષ્કારો'
  },
  recentInnovationsTitle: {
    en: 'Recent Rural Inventions',
    hi: 'हाल के ग्रामीण नवाचार',
    gu: 'તાજેતરના ગ્રામીણ આવિષ્કારો'
  },
  ctaInnovatorsBanner: {
    en: 'For Innovators & Community Helpers',
    hi: 'नवाचारकर्ताओं और सहायकों के लिए',
    gu: 'આવિષ્કારકો અને સહાયકો માટે'
  },
  ctaHeadline: {
    en: 'Bring your village or community innovation to national attention',
    hi: 'अपने गांव या क्षेत्र के नवाचार को राष्ट्रीय पटल पर लाएं',
    gu: 'તમારા ગામ કે તાલુકાના આવિષ્કારને દેશ સમક્ષ લાવો'
  },
  ctaDesc: {
    en: 'Whether you created a tool yourself or you are assisting a local farmer or artisan, both pathways are supported.',
    hi: 'चाहे आपने कोई उपकरण स्वयं बनाया हो या आप किसी अन्य किसान या कारीगर की मदद कर रहे हों, दोनों रास्ते उपलब्ध हैं।',
    gu: 'તમે જાતે બનાવેલું સાધન હોય અથવા તમે કોઈ અન્ય ખેડૂત, મિકેનિક કે કારીગરની મદદ કરતા હોવ, બંને રીતે નોંધણી શક્ય છે.'
  },
  choosePathwayTitle: {
    en: 'Select Submission Pathway',
    hi: 'पंजीकरण का प्रकार चुनें',
    gu: 'નોંધણીનો પ્રકાર પસંદ કરો'
  },
  optionAHelperText: {
    en: 'Direct and simple submission using your voice.',
    hi: 'अपनी आवाज़ से सरल और सीधी प्रस्तुति।',
    gu: 'તમારા અવાજ દ્વારા સરળ રીતે સીધી નોંધણી કરો.'
  },
  optionBHelperText: {
    en: 'Assist as a volunteer, family member, NGO worker, or teacher.',
    hi: 'स्वयंसेवक, परिवारजन, एनजीओ या शिक्षक के रूप में सहायता करें।',
    gu: 'સ્વયંસેવક, પરિવારજન, NGO અથવા શિક્ષક તરીકે અન્યને સહાય કરો.'
  },
  proceedBtn: {
    en: 'Proceed (Go to Form)',
    hi: 'आगे बढ़ें',
    gu: 'આગળ વધો'
  },
  assistedBtn: {
    en: 'Assisted Submission',
    hi: 'सहायक पंजीकरण',
    gu: 'સહાયક નોંધણી'
  },
  stepWord: {
    en: 'Step',
    hi: 'कदम',
    gu: 'પગલું'
  },
  questionWord: {
    en: 'Question',
    hi: 'प्रश्न',
    gu: 'સવાલ'
  },
  yourAnswerLabel: {
    en: 'Your Answer (AI Extracted):',
    hi: 'आपका उत्तर (एआई द्वारा निकाला गया):',
    gu: 'તમારો જવાબ (AI તારવેલ વિગત):'
  },
  answerConfirmHint: {
    en: 'If the answer is correct, click Confirm & Next Question',
    hi: 'यदि उत्तर सही है, तो पुष्टि करें और आगे बढ़ें पर क्लिक करें',
    gu: 'જવાબ યોગ્ય હોય તો "ખાતરી કરી આગળ વધો" દબાવો'
  },
  micSpeakPrompt: {
    en: 'Tap mic and speak naturally in English, Hindi, or Gujarati',
    hi: 'माइक पर टैप करें और अंग्रेजी, हिन्दी या गुजराती में बोलें',
    gu: 'માઇક પર ટેપ કરો અને ગુજરાતી, હિન્દી કે અંગ્રેજીમાં બોલો'
  },
  sampleSpeechListen: {
    en: '💡 Listen to sample voice input',
    hi: '💡 नमूना आवाज़ सुनें / टेस्ट करें',
    gu: '💡 ઉદાહરણ અવાજ સાંભળો / સિમ્યુલેટ કરો'
  },
  fullProcessLink: {
    en: 'View full illustrated process →',
    hi: 'पूरी सचित्र प्रक्रिया देखें →',
    gu: 'સંપૂર્ણ ચિત્રાત્મક પ્રક્રિયા જુઓ →'
  },
  approxCoordsNote: {
    en: 'Approximate Village Coordinates Displayed',
    hi: 'अनुमानित गांव के निर्देशांक प्रदर्शित',
    gu: 'અંદાજિત ગામના નિર્દેશાંક દર્શાવેલ છે'
  },

  // 2. Infographic Steps
  infographicBadge: {
    en: '5-Step Visual Innovation Journey',
    hi: '5-चरणीय सचित्र नवाचार यात्रा',
    gu: '૫-પગલાંની ચિત્રાત્મક પ્રક્રિયા પ્રવાસ'
  },
  infographicTitle: {
    en: 'How InnovateGram Works',
    hi: 'इनोवेटग्राम कैसे काम करता है',
    gu: 'ઇનોવેટગ્રામ કેવી રીતે કાર્ય કરે છે'
  },
  infographicSubtitle: {
    en: 'From a village idea spoken in your native tongue to national incubation and support.',
    hi: 'गांव की देसी जुगत से लेकर राष्ट्रीय पहचान और सरकारी सहायता तक का सफर।',
    gu: 'ગામડાના દેશી વિચાર અને અવાજથી લઈને રાષ્ટ્રીય ઓળખ અને સહાય સુધી.'
  },
  step1Title: {
    en: '1. Share Your Idea',
    hi: '1. अपना विचार साझा करें',
    gu: '1. તમારો વિચાર રજૂ કરો'
  },
  step1Desc: {
    en: 'A person speaking into a microphone or uploading a photograph of their invention.',
    hi: 'माइक में अपनी भाषा में बोलें या अपने आविष्कार की तस्वीर अपलोड करें।',
    gu: 'માઇકમાં તમારી માતૃભાષામાં બોલો અથવા તમારા મશીન કે સાધનની તસવીર અપલોડ કરો.'
  },
  step2Title: {
    en: '2. AI Understands Your Idea',
    hi: '2. एआई आपके विचार को समझता है',
    gu: '2. AI તમારો વિચાર સમજે છે'
  },
  step2Desc: {
    en: 'AI converts voice, images, and videos into structured information and multilingual profiles.',
    hi: 'एआई आवाज़, फोटो और वीडियो को समझकर व्यवस्थित जानकारी और 3 भाषाओं में विवरण बनाता है।',
    gu: 'AI તમારા અવાજ, ફોટો અને વીડિયોને સમજીને વ્યવસ્થિત માહિતી અને ૩ ભાષાઓમાં પ્રોફાઇલ બનાવે છે.'
  },
  step3Title: {
    en: '3. Innovation Is Organized',
    hi: '3. नवाचार विधिवत व्यवस्थित होता है',
    gu: '3. માહિતી વ્યવસ્થિત ગોઠવાય છે'
  },
  step3Desc: {
    en: 'Automatic classification into sector, problem, location, and development-stage.',
    hi: 'क्षेत्र (कृषि, ऊर्जा), समस्या, स्थान और विकास चरण के अनुसार स्वचालित वर्गीकरण।',
    gu: 'ક્ષેત્ર (ખેતી, પાણી, ઊર્જા), સમસ્યા, સ્થળ અને વિકાસ તબક્કા અનુસાર વર્ગીકરણ.'
  },
  step4Title: {
    en: '4. Discover Your Innovation',
    hi: '4. नवाचार नक्शे पर खोज योग्य बनता है',
    gu: '4. નકશા પર તમારો આવિષ્કાર દેખાય છે'
  },
  step4Desc: {
    en: 'Innovations appear on a searchable geographic map with state and village filters.',
    hi: 'आविष्कार खोज योग्य भौगोलिक नक्शे पर दिखाई देते हैं जिसे राज्य और जिले से खोजा जा सकता है।',
    gu: 'આવિષ્કારો સર્ચ કરી શકાય તેવા ભૌગોલિક નકશા પર રાજ્ય, જિલ્લો અને ગામ મુજબ દેખાય છે.'
  },
  step5Title: {
    en: '5. Connect With Opportunities',
    hi: '5. अवसरों और संस्थाओं से जुड़ें',
    gu: '5. તકો અને સંસ્થાઓ સાથે જોડાઓ'
  },
  step5Desc: {
    en: 'Government departments, incubators, and universities discover innovations and support scaling.',
    hi: 'सरकारी विभाग, इनक्यूबेटर और विश्वविद्यालय नवाचारों को खोजकर अनुदान और तकनीकी सहायता देते हैं।',
    gu: 'સરકારી વિભાગો, ઇનક્યુબેટર અને યુનિવર્સિટીઓ આવિષ્કારો શોધીને સહાય, અનુદાન અને આગળ વધારવામાં મદદ કરે છે.'
  },

  // 3. Two Registration Pathways
  pathwayTitle: {
    en: 'Who are you submitting this innovation for?',
    hi: 'आप यह नवाचार किसके लिए साझा कर रहे हैं?',
    gu: 'તમે આ આવિષ્કાર કોના માટે સબમિટ કરી રહ્યા છો?'
  },
  pathwaySubtitle: {
    en: 'Choose whether you created this invention yourself, or if you are assisting someone else in your village.',
    hi: 'चुनें कि क्या आपने यह खोज स्वयं की है, या आप गांव के किसी अन्य आविष्कारक की मदद कर रहे हैं।',
    gu: 'પસંદ કરો કે શું તમે પોતે આ શોધ કરી છે, અથવા તમે તમારા ગામના કોઈ અન્ય વ્યક્તિની મદદ કરી રહ્યા છો.'
  },
  pathwayOptionA_Title: {
    en: 'OPTION A: REGISTER FOR MYSELF',
    hi: 'विकल्प A: स्वयं के लिए पंजीकरण',
    gu: 'ઓપ્શન A: પોતાના માટે રજીસ્ટ્રેશન'
  },
  pathwayOptionA_Desc: {
    en: 'I am the person who created this innovation.',
    hi: 'मैंने यह नवाचार स्वयं बनाया है।',
    gu: 'મેં આ નવીનતા પોતે બનાવી છે.'
  },
  pathwayOptionB_Title: {
    en: 'OPTION B: REGISTER FOR SOMEONE ELSE',
    hi: 'विकल्प B: किसी अन्य व्यक्ति के लिए पंजीकरण',
    gu: 'ઓપ્શન B: અન્ય વ્યક્તિ વતી રજીસ્ટ્રેશન'
  },
  pathwayOptionB_Desc: {
    en: 'I am helping someone share their innovation.',
    hi: 'मैं किसी दूसरे व्यक्ति का नवाचार साझा करने में मदद कर रहा हूँ।',
    gu: 'હું અન્ય વ્યક્તિની નવીનતા રજૂ કરવામાં મદદ કરી રહ્યો છું.'
  },
  helperNotice: {
    en: 'Assisted Submission Mode: You are documenting this on behalf of the creator. The inventor will remain the credited innovator.',
    hi: 'सहायता आधारित प्रस्तुति: आप मूल आविष्कारक की ओर से जानकारी दर्ज कर रहे हैं। श्रेय और अधिकार केवल मूल आविष्कारक को मिलेंगे।',
    gu: 'સહાયક મોડ: તમે મૂળ શોધક વતી માહિતી ભરી રહ્યા છો. શોધનો યશ અને હક ફક્ત મૂળ આવિષ્કારકનો રહેશે.'
  },
  fieldSubmitterName: {
    en: 'Person Submitting the Innovation (Your Name)',
    hi: 'नवाचार जमा करने वाला व्यक्ति (आपका नाम)',
    gu: 'આવિષ્કાર સબમિટ કરનાર વ્યક્તિ (તમારું નામ)'
  },
  fieldSubmitterRole: {
    en: 'Relationship with the Innovator',
    hi: 'आविष्कारक के साथ आपका संबंध',
    gu: 'આવિષ્કારક સાથે સંબંધ'
  },
  fieldActualInventorName: {
    en: "Actual Innovator's Name (if known)",
    hi: 'मूल आविष्कारक का नाम (यदि ज्ञात हो)',
    gu: 'મૂળ આવિષ્કારકનું નામ (જો જાણીતું હોય)'
  },
  fieldInnovatorLocation: {
    en: "Innovator's Village or Location",
    hi: 'आविष्कारक का गांव या स्थान',
    gu: 'આવિષ્કારકનું ગામ અથવા સ્થળ'
  },
  fieldOptionalContact: {
    en: 'Optional Contact Details (Helper phone)',
    hi: 'वैकल्पिक संपर्क विवरण (सहायक का फोन)',
    gu: 'વૈકલ્પિક સંપર્ક વિગતો (સહાયકનો ફોન)'
  },
  fieldConsentCheckbox: {
    en: 'I confirm that I have obtained appropriate consent from the inventor before submitting their innovation details.',
    hi: 'मैं पुष्टि करता हूँ कि इस नवाचार की जानकारी साझा करने से पहले मूल आविष्कारक से उचित सहमति प्राप्त कर ली गई है।',
    gu: 'હું ખાતરી આપું છું કે આ માહિતી સબમિટ કરતા પહેલાં મેં મૂળ શોધકની યોગ્ય સંમતિ મેળવેલ છે.'
  },
  noDocumentsRequiredNote: {
    en: 'No company registration, GST, Aadhaar or institutional affiliation required.',
    hi: 'कंपनी पंजीकरण, जीएसटी, आधार कार्ड या संस्थागत संबद्धता की कोई आवश्यकता नहीं है।',
    gu: 'કોઈપણ કંપની રજીસ્ટ્રેશન, GST, આધાર કાર્ડ કે સંસ્થાકીય જોડાણની જરૂર નથી.'
  },

  // 6. Conversational Voice Assistant
  conversationalTitle: {
    en: 'Voice-Assisted Conversational Form',
    hi: 'आवाज़ द्वारा संवादात्मक फॉर्म',
    gu: 'વાતચીત દ્વારા વોઇસ ફોર્મ'
  },
  conversationalSubtitle: {
    en: 'Answer simple questions verbally or by typing. AI populates the structured database fields.',
    hi: 'सवालों के जवाब बोलकर या लिखकर दें। एआई सीधे डेटाबेस फ़ील्ड भरेगा।',
    gu: 'સવાલોના જવાબ બોલીને અથવા ટાઇપ કરીને આપો. AI સીધા ડેટાબેઝ ખાના ભરશે.'
  },
  speakAnswerBtn: {
    en: 'Speak Answer',
    hi: 'बोलकर उत्तर दें',
    gu: 'બોલીને જવાબ આપો'
  },
  typeAnswerBtn: {
    en: 'Type Answer',
    hi: 'लिखकर उत्तर दें',
    gu: 'લખીને જવાબ આપો'
  },
  selectOptionBtn: {
    en: 'Select from Options',
    hi: 'विकल्पों में से चुनें',
    gu: 'વિકલ્પોમાંથી પસંદ કરો'
  },
  skipQuestionBtn: {
    en: 'Skip this question',
    hi: 'यह प्रश्न छोड़ें',
    gu: 'આ સવાલ છોડો'
  },
  nextQuestionBtn: {
    en: 'Confirm & Next Question',
    hi: 'पुष्टि करें और अगला प्रश्न',
    gu: 'ખાતરી કરી આગળ વધો'
  },
  prevQuestionBtn: {
    en: 'Previous Question',
    hi: 'पिछला प्रश्न',
    gu: 'પાછળનો પ્રશ્ન'
  },
  finishConversationalBtn: {
    en: 'Review Extracted Profile',
    hi: 'तैयार प्रोफ़ाइल की समीक्षा करें',
    gu: 'તૈયાર પ્રોફાઇલ તપાસો'
  },

  // Innovator Portal Home
  innovatorWelcomeTitle: {
    en: 'Have you created something useful?',
    hi: 'क्या आपने कुछ नया बनाया है?',
    gu: 'શું તમે કંઈક નવું બનાવ્યું છે?'
  },
  innovatorWelcomeSubtitle: {
    en: 'Tell us about your invention. Speak in your own language, take a photo or record a video. We organize everything for you.',
    hi: 'अपने आविष्कार के बारे में बताएं। अपनी भाषा में बोलें, फोटो लें या वीडियो बनाएं। हम आपके लिए सब व्यवस्थित करेंगे।',
    gu: 'તમારા આવિષ્કાર વિશે જણાવો. તમારી ભાષામાં બોલો, ફોટો લો અથવા વીડિયો બનાવો. અમે બધું વ્યવસ્થિત કરી આપીશું.'
  },
  voiceRecordBtn: {
    en: 'Speak to Submit (Voice)',
    hi: 'बोलकर बताएं (आवाज़)',
    gu: 'બોલીને જણાવો (અવાજ)'
  },
  photoUploadBtn: {
    en: 'Add Photos',
    hi: 'फोटो जोड़ें',
    gu: 'ફોટો ઉમેરો'
  },
  videoUploadBtn: {
    en: 'Add Video',
    hi: 'वीडियो जोड़ें',
    gu: 'વીડિયો ઉમેરો'
  },
  myInnovationsBtn: {
    en: 'My Innovations',
    hi: 'मेरे नवाचार',
    gu: 'મારા આવિષ્કારો'
  },
  audioHelpBtn: {
    en: 'Audio Guidance & Help',
    hi: 'ध्वनि मार्गदर्शन एवं सहायता',
    gu: 'ઓડિયો માર્ગદર્શન અને મદદ'
  },

  // Voice Recording Flow
  voiceInstructions: {
    en: 'Tap the microphone and describe your invention in simple words.',
    hi: 'माइक दबाएं और अपनी भाषा में अपनी मशीन या उपाय के बारे में बताएं।',
    gu: 'માઇક દબાવો અને તમારી ભાષામાં તમારા મશીન અથવા ઉપાય વિશે જણાવો.'
  },
  recordingActive: {
    en: 'Listening... Please speak clearly.',
    hi: 'सुन रहे हैं... कृपया स्पष्ट बोलें।',
    gu: 'સાંભળી રહ્યા છીએ... કૃપા કરીને સ્પષ્ટ બોલો.'
  },
  stopRecording: {
    en: 'Stop Recording',
    hi: 'रिकॉर्डिंग रोकें',
    gu: 'રેકોર્ડિંગ રોકો'
  },
  playRecording: {
    en: 'Listen to Audio',
    hi: 'आवाज़ सुनें',
    gu: 'અવાજ સાંભળો'
  },
  retryRecording: {
    en: 'Record Again',
    hi: 'दोबारा रिकॉर्ड करें',
    gu: 'ફરીથી રેકોર્ડ કરો'
  },
  processVoiceWithAI: {
    en: 'Analyze with AI',
    hi: 'एआई द्वारा समझें',
    gu: 'એઆઈ દ્વારા વિશ્લેષણ કરો'
  },

  // Location
  locationTitle: {
    en: 'Where did you develop this?',
    hi: 'यह आविष्कार किस क्षेत्र में बना है?',
    gu: 'આ આવિષ્કાર કયા વિસ્તારમાં બન્યો છે?'
  },
  locationSubtitle: {
    en: 'Select your village or allow us to identify your location. GPS is optional.',
    hi: 'अपना गांव चुनें या स्थान पहचानने दें। जीपीएस वैकल्पिक है।',
    gu: 'તમારું ગામ પસંદ કરો અથવા સ્થાન ઓળખવા દો. જીપીએસ વૈકલ્પિક છે.'
  },
  useGpsBtn: {
    en: 'Detect Location (Optional GPS)',
    hi: 'स्थान पहचानें (वैकल्पिक जीपीएस)',
    gu: 'સ્થાન શોધો (વૈકલ્પિક GPS)'
  },
  selectState: {
    en: 'Select State',
    hi: 'राज्य चुनें',
    gu: 'રાજ્ય પસંદ કરો'
  },
  selectDistrict: {
    en: 'Select District',
    hi: 'जिला चुनें',
    gu: 'જિલ્લો પસંદ કરો'
  },
  enterVillage: {
    en: 'Village or Town Name',
    hi: 'गांव या कस्बे का नाम',
    gu: 'ગામ અથવા શહેરનું નામ'
  },

  // Media
  mediaTitle: {
    en: 'Photographs & Videos',
    hi: 'तस्वीरें और वीडियो',
    gu: 'તસવીરો અને વીડિયો'
  },
  mediaSubtitle: {
    en: 'Take a photograph of your invention or record a short video clip.',
    hi: 'अपने आविष्कार की तस्वीर लें या छोटा वीडियो क्लिप रिकॉर्ड करें।',
    gu: 'તમારા આવિષ્કારનો ફોટો લો અથવા ટૂંકો વીડિયો રેકોર્ડ કરો.'
  },
  takePhoto: {
    en: 'Take a Photo',
    hi: 'फोटो खींचें',
    gu: 'ફોટો લો'
  },
  recordVideo: {
    en: 'Record a Video',
    hi: 'वीडियो बनाएं',
    gu: 'વીડિયો બનાવો'
  },
  orUploadFiles: {
    en: 'Or choose files from device',
    hi: 'या फोन से फाइल चुनें',
    gu: 'અથવા ફોનમાંથી ફાઇલ પસંદ કરો'
  },

  // AI Profile Review
  aiGeneratedProfile: {
    en: 'AI-Generated Innovation Profile',
    hi: 'एआई द्वारा तैयार नवाचार विवरण',
    gu: 'એઆઈ દ્વારા તૈયાર કરેલ આવિષ્કાર પ્રોફાઇલ'
  },
  aiVerificationNotice: {
    en: 'Please verify what our AI understood from your voice before confirming. Human evaluators will verify it subsequently.',
    hi: 'कृपया पुष्टि करें कि क्या एआई ने आपकी बात सही समझी है। इसके बाद मानवीय विशेषज्ञ इसकी समीक्षा करेंगे।',
    gu: 'કૃપા કરીને ખાતરી કરો કે શું એઆઈએ તમારી વાત બરાબર સમજી છે. ત્યારબાદ નિષ્ણાતો તેની સમીક્ષા કરશે.'
  },
  confirmAndSubmit: {
    en: 'Confirm & Submit Innovation',
    hi: 'पुष्टि करें और जमा करें',
    gu: 'ખાતરી કરો અને સબમિટ કરો'
  },
  editInformation: {
    en: 'Edit Information',
    hi: 'जानकारी सुधारें',
    gu: 'માહિતી સુધારો'
  },
  readAloud: {
    en: 'Read Aloud (Audio)',
    hi: 'बोलकर सुनाएं',
    gu: 'બોલીને સંભળાવો'
  },

  // Success Screen
  submissionSuccessTitle: {
    en: 'Your innovation has been submitted successfully!',
    hi: 'आपका नवाचार सफलतापूर्वक जमा हो गया है!',
    gu: 'તમારો આવિષ્કાર સફળતાપૂર્વક સબમિટ થયો છે!'
  },
  submissionSuccessSubtitle: {
    en: 'Our ecosystem team and regional evaluators will review it shortly. Save your Innovation ID.',
    hi: 'हमारी टीम और विशेषज्ञ जल्द ही इसकी समीक्षा करेंगे। अपनी आईडी सुरक्षित रखें।',
    gu: 'અમારી ટીમ અને નિષ્ણાતો ટૂંક સમયમાં તેની સમીક્ષા કરશે. તમારી આઈડી સાચવો.'
  },
  innovationIdLabel: {
    en: 'Innovation ID',
    hi: 'नवाचार पहचान संख्या (ID)',
    gu: 'આવિષ્કાર આઈડી'
  },
  saveReceiptBtn: {
    en: 'Save / Print Receipt',
    hi: 'रसीद सुरक्षित करें / प्रिंट करें',
    gu: 'રસીદ સાચવો / પ્રિન્ટ કરો'
  },
  trackStatusBtn: {
    en: 'Track Status',
    hi: 'स्थिति जांचें',
    gu: 'સ્થિતિ તપાસો'
  },
  submitAnotherBtn: {
    en: 'Submit Another Innovation',
    hi: 'एक और नवाचार जमा करें',
    gu: 'બીજો આવિષ્કાર સબમિટ કરો'
  },

  // Innovation Fields
  fieldTitle: {
    en: 'Innovation Title',
    hi: 'नवाचार का नाम',
    gu: 'આવિષ્કારનું નામ'
  },
  fieldProblem: {
    en: 'Problem Solved',
    hi: 'हल की गई समस्या',
    gu: 'નિવારવામાં આવેલી સમસ્યા'
  },
  fieldSolution: {
    en: 'Proposed Solution & Mechanism',
    hi: 'प्रस्तावित समाधान एवं कार्यप्रणाली',
    gu: 'પ્રસ્તાવિત ઉપાય અને કાર્યપદ્ધતિ'
  },
  fieldSector: {
    en: 'Sector',
    hi: 'क्षेत्र (सेक्टर)',
    gu: 'ક્ષેત્ર (સેક્ટર)'
  },
  fieldStage: {
    en: 'Development Stage',
    hi: 'विकास चरण',
    gu: 'વિકાસનો તબક્કો'
  },
  fieldLocation: {
    en: 'Location',
    hi: 'स्थान',
    gu: 'સ્થળ'
  },
  fieldOriginalLanguage: {
    en: 'Original Language',
    hi: 'मूल भाषा',
    gu: 'મૂળ ભાષા'
  },
  fieldTranscript: {
    en: 'Original Voice Transcript',
    hi: 'मूल ध्वनि प्रतिलिपि (ट्रांसक्रिप्ट)',
    gu: 'મૂળ અવાજનું ટ્રાંસ્ક્રિપ્ટ'
  },
  fieldAiConfidence: {
    en: 'AI Confidence Score',
    hi: 'एआई विश्वसनीयता स्कोर',
    gu: 'એઆઈ ચોકસાઈ સ્કોર'
  },
  fieldStatus: {
    en: 'Verification Status',
    hi: 'सत्यापन स्थिति',
    gu: 'ચકાસણી સ્થિતિ'
  },

  // Stakeholder Portal
  stakeholderDashboard: {
    en: 'Stakeholder Enterprise Dashboard',
    hi: 'हितधारक एंटरप्राइज डैशबोर्ड',
    gu: 'સ્ટેકહોલ્ડર એન્ટરપ્રાઇઝ ડેશબોર્ડ'
  },
  navOverview: {
    en: 'Overview',
    hi: 'समीक्षा',
    gu: 'વિહંગાવલોકન'
  },
  navDiscover: {
    en: 'Discover Innovations',
    hi: 'नवाचार खोजें',
    gu: 'આવિષ્કારો શોધો'
  },
  navMap: {
    en: 'Interactive Map',
    hi: 'नक्शा (मैप)',
    gu: 'ઇન્ટરેક્ટિવ નકશો'
  },
  navReview: {
    en: 'Review & Verify',
    hi: 'समीक्षा एवं सत्यापन',
    gu: 'સમીક્ષા અને ચકાસણી'
  },
  navSaved: {
    en: 'Saved Innovations',
    hi: 'सहेजे गए नवाचार',
    gu: 'સાચવેલા આવિષ્કારો'
  },
  navRequests: {
    en: 'Connection Requests',
    hi: 'संपर्क अनुरोध',
    gu: 'સંપર્ક વિનંતીઓ'
  },
  navReports: {
    en: 'Reports & Analytics',
    hi: 'रिपोर्ट और आंकड़े',
    gu: 'અહેવાલો અને આંકડા'
  },
  navSettings: {
    en: 'Organization Settings',
    hi: 'संस्था सेटिंग्स',
    gu: 'સંસ્થા સેટિંગ્સ'
  },

  // Metrics
  metricTotalInnovations: {
    en: 'Total Innovations',
    hi: 'कुल नवाचार',
    gu: 'કુલ આવિષ્કારો'
  },
  metricPendingReview: {
    en: 'Pending Review',
    hi: 'लंबित समीक्षा',
    gu: 'સમીક્ષા બાકી'
  },
  metricVerified: {
    en: 'Verified Innovations',
    hi: 'सत्यापित नवाचार',
    gu: 'ચકાસાયેલ આવિષ્કારો'
  },
  metricActiveConnections: {
    en: 'Connection Requests',
    hi: 'सक्रिय संपर्क अनुरोध',
    gu: 'સંપર્ક વિનંતીઓ'
  },

  // Filters & Search
  searchPlaceholder: {
    en: 'Search by keyword, problem, mechanism in English, हिन्दी, ગુજરાતી...',
    hi: 'कीवर्ड, समस्या या मशीन के आधार पर खोजें (अंग्रेजी, हिन्दी, गुजराती)...',
    gu: 'કીવર્ડ, સમસ્યા અથવા મશીનના આધારે શોધો (અંગ્રેજી, હિન્દી, ગુજરાતી)...'
  },
  filterBySector: {
    en: 'All Sectors',
    hi: 'सभी क्षेत्र',
    gu: 'બધા ક્ષેત્રો'
  },
  filterByStage: {
    en: 'All Stages',
    hi: 'सभी चरण',
    gu: 'બધા તબક્કા'
  },
  filterByState: {
    en: 'All States',
    hi: 'सभी राज्य',
    gu: 'બધા રાજ્યો'
  },
  filterByStatus: {
    en: 'All Statuses',
    hi: 'सभी स्थितियां',
    gu: 'બધી સ્થિતિઓ'
  },
  filterByLanguage: {
    en: 'Submission Language',
    hi: 'जमा करने की भाषा',
    gu: 'સબમિટ કરેલી ભાષા'
  },
  clearFilters: {
    en: 'Reset Filters',
    hi: 'फ़िल्टर हटाएं',
    gu: 'ફિલ્ટર્સ રીસેટ કરો'
  },

  // Actions
  viewDetails: {
    en: 'View Details',
    hi: 'विवरण देखें',
    gu: 'વિગતો જુઓ'
  },
  requestContact: {
    en: 'Request Contact Permission',
    hi: 'संपर्क अनुमति का अनुरोध करें',
    gu: 'સંપર્ક પરવાનગીની વિનંતી કરો'
  },
  verifyInnovation: {
    en: 'Mark as Verified',
    hi: 'सत्यापित चिह्नित करें',
    gu: 'ચકાસાયેલ તરીકે ચિહ્નિત કરો'
  },
  needsMoreInfo: {
    en: 'Request More Information',
    hi: 'और जानकारी मांगें',
    gu: 'વધુ માહિતી માગો'
  },
  privacyShieldNotice: {
    en: 'Innovator contact details are protected under rural data privacy policy. Communication is facilitated through institutional consent.',
    hi: 'ग्रामीण डेटा गोपनीयता नीति के तहत नवाचारकर्ता का फोन नंबर सुरक्षित है। संपर्क संस्थागत सहमति के माध्यम से कराया जाता है।',
    gu: 'ગ્રામીણ ડેટા ગોપનીયતા નીતિ હેઠળ આવિષ્કારકની વિગતો સુરક્ષિત છે. સંસ્થાકીય મંજૂરી બાદ જ સંપર્ક શક્ય બનશે.'
  },
  demonstrationNotice: {
    en: 'DEMONSTRATION RECORD - For platform preview & testing purposes',
    hi: 'डेमो रिकॉर्ड - केवल प्लेटफ़ॉर्म पूर्वावलोकन एवं परीक्षण के लिए',
    gu: 'ડેમો રેકોર્ડ - ફક્ત પ્લેટફોર્મ ચકાસણી અને પરીક્ષણ માટે'
  }
};

export const sectorTranslations: Record<Sector, Record<Language, string>> = {
  Agriculture: {
    en: 'Agriculture',
    hi: 'कृषि एवं खेती',
    gu: 'ખેતી અને કૃષિ'
  },
  'Water and Sanitation': {
    en: 'Water and Sanitation',
    hi: 'जल एवं स्वच्छता',
    gu: 'પાણી અને સ્વચ્છતા'
  },
  'Renewable Energy': {
    en: 'Renewable Energy',
    hi: 'नवीकरणीय ऊर्जा',
    gu: 'બિનપરંપરાગત ઊર્જા'
  },
  Healthcare: {
    en: 'Healthcare',
    hi: 'स्वास्थ्य एवं चिकित्सा',
    gu: 'આરોગ્ય અને તબીબી'
  },
  Education: {
    en: 'Education',
    hi: 'शिक्षा एवं साक्षरता',
    gu: 'શિક્ષણ'
  },
  Manufacturing: {
    en: 'Manufacturing',
    hi: 'विनिर्माण एवं कारीगरी',
    gu: 'ઉત્પાદન અને કારીગરી'
  },
  Environment: {
    en: 'Environment',
    hi: 'पर्यावरण संरक्षण',
    gu: 'પર્યાવરણ'
  },
  'Waste Management': {
    en: 'Waste Management',
    hi: 'कचरा प्रबंधन',
    gu: 'કચરા વ્યવસ્થાપન'
  },
  Transportation: {
    en: 'Transportation',
    hi: 'परिवहन एवं आवागमन',
    gu: 'પરિવહન અને વાહનવ્યવહાર'
  },
  'Rural Livelihoods': {
    en: 'Rural Livelihoods',
    hi: 'ग्रामीण आजीविका',
    gu: 'ગ્રામીણ આજીવિકા'
  },
  Construction: {
    en: 'Construction',
    hi: 'भवन निर्माण',
    gu: 'બાંધકામ'
  },
  'Assistive Technology': {
    en: 'Assistive Technology',
    hi: 'सहायक उपकरण (दिव्यांग सहायता)',
    gu: 'સહાયક તકનીક (દિવ્યાંગ સહાય)'
  },
  Other: {
    en: 'Other Innovation',
    hi: 'अन्य नवाचार',
    gu: 'અન્ય આવિષ્કાર'
  }
};

export const stageTranslations: Record<Stage, Record<Language, string>> = {
  Idea: {
    en: '1. Idea / Concept',
    hi: '1. विचार / परिकल्पना',
    gu: '1. વિચાર / સંકલ્પના'
  },
  Prototype: {
    en: '2. Working Prototype',
    hi: '2. कार्यशील प्रोटोटाइप',
    gu: '2. કાર્યકારી પ્રોટોટાઇપ'
  },
  Tested: {
    en: '3. Field Tested',
    hi: '3. खेतों/स्थान पर परीक्षित',
    gu: '3. સ્થળ પર પરીક્ષણ કરેલ'
  },
  Validated: {
    en: '4. Scientifically Validated',
    hi: '4. तकनीकी रूप से प्रमाणित',
    gu: '4. પ્રમાણિત કરેલ'
  },
  Adopted: {
    en: '5. Locally Adopted',
    hi: '5. स्थानीय स्तर पर उपयोगित',
    gu: '5. સ્થાનિકે અપનાવેલ'
  },
  Scaled: {
    en: '6. Ready for Scale',
    hi: '6. बड़े पैमाने के लिए तैयार',
    gu: '6. વ્યાપારીકરણ માટે તૈયાર'
  }
};

export const statusTranslations: Record<VerificationStatus, Record<Language, string>> = {
  'Pending Review': {
    en: 'Pending Review',
    hi: 'समीक्षा लंबित',
    gu: 'સમીક્ષા બાકી'
  },
  'Under Review': {
    en: 'Under Review',
    hi: 'जांच जारी',
    gu: 'તપાસ ચાલુ'
  },
  Verified: {
    en: 'Institutional Verified',
    hi: 'संस्थान द्वारा सत्यापित',
    gu: 'સંસ્થાકીય રીતે ચકાસાયેલ'
  },
  'Needs More Info': {
    en: 'Needs More Info',
    hi: 'अतिरिक्त जानकारी अपेक्षित',
    gu: 'વધુ માહિતી જરૂરી'
  },
  Rejected: {
    en: 'Archived',
    hi: 'अस्वीकृत / सुरक्षित',
    gu: 'આર્કાઇવ કરેલ'
  }
};

export const stakeholderRoleTranslations: Record<StakeholderRole, Record<Language, string>> = {
  'Government departments': {
    en: 'Government Department',
    hi: 'सरकारी विभाग',
    gu: 'સરકારી વિભાગ'
  },
  Incubators: {
    en: 'Incubator / Accelerator',
    hi: 'इनक्यूबेटर / एक्सीलरेटर',
    gu: 'ઇનક્યુબેટર / એક્સિલરેટર'
  },
  Universities: {
    en: 'University / Academic Institution',
    hi: 'विश्वविद्यालय / शैक्षणिक संस्थान',
    gu: 'યુનિવર્સિટી / શૈક્ષણિક સંસ્થા'
  },
  NGOs: {
    en: 'Non-Governmental Organization (NGO)',
    hi: 'गैर-सरकारी संगठन (एनजीओ)',
    gu: 'બિન-સરકારી સંગઠન (NGO)'
  },
  Startups: {
    en: 'Startup / Enterprise',
    hi: 'स्टार्टअप / उद्यम',
    gu: 'સ્ટાર્ટઅપ / ઉદ્યોગ'
  },
  Manufacturers: {
    en: 'Manufacturer / Fabricator',
    hi: 'निर्माता / फैब्रिकेटर',
    gu: 'ઉત્પાદક / મેન્યુફેક્ચરર'
  },
  'Research institutions': {
    en: 'Research & Science Institution',
    hi: 'अनुसंधान एवं विज्ञान संस्थान',
    gu: 'સંશોધન અને વિજ્ઞાન સંસ્થા'
  }
};
