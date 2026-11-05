import { Language, Sector, Stage, VerificationStatus } from '@/types/innovategram';

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
    gu: 'એઆઈ-આધારિત ગ્રામીણ અને પાયાના આવિષ્કારોનું પ્લેટફોર્મ'
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
  
  // Innovator Portal Home
  innovatorWelcomeTitle: {
    en: 'Have you created something useful?',
    hi: 'क्या आपने कुछ नया बनाया है?',
    gu: 'શું તમે કંઈક નવું બનાવ્યું છે?'
  },
  innovatorWelcomeSubtitle: {
    en: 'Tell us about your invention. You can speak, take a photo or record a video. We will organize everything for you.',
    hi: 'अपने आविष्कार के बारे में हमें बताएं। आप बोलकर, फोटो खींचकर या वीडियो बनाकर जानकारी दे सकते हैं।',
    gu: 'તમારા આવિષ્કાર વિશે અમને જણાવો. તમે બોલીને, ફોટો લઈને અથવા વીડિયો બનાવીને માહિતી આપી શકો છો.'
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
    en: 'We only show the village/district level for your privacy.',
    hi: 'आपकी सुरक्षा के लिए केवल गांव और जिले का नाम दिखाया जाएगा।',
    gu: 'તમારી સુરક્ષા માટે ફક્ત ગામ અને જિલ્લાનું નામ જ દર્શાવવામાં આવશે.'
  },
  useGpsBtn: {
    en: 'Use Current Location',
    hi: 'वर्तमान स्थान का उपयोग करें',
    gu: 'હાલનું સ્થાન વાપરો'
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
    en: 'Upload pictures or clips of your machine or working model.',
    hi: 'अपनी मशीन या मॉडल की फोटो और वीडियो जोड़ें।',
    gu: 'તમારા મશીન અથવા મોડેલના ફોટો અને વીડિયો ઉમેરો.'
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
    gu: 'અથવા ડિવાઇસમાંથી ફાઇલ પસંદ કરો'
  },
  
  // AI Profile Review
  aiGeneratedProfile: {
    en: 'AI-Generated Innovation Profile',
    hi: 'एआई द्वारा तैयार नवाचार विवरण',
    gu: 'એઆઈ દ્વારા તૈયાર કરેલ આવિષ્કાર પ્રોફાઇલ'
  },
  aiVerificationNotice: {
    en: 'Please verify what our AI understood from your voice and description before confirming.',
    hi: 'कृपया पुष्टि करें कि क्या हमारे एआई ने आपकी आवाज़ और विवरण को सही समझा है।',
    gu: 'કૃપા કરીને ખાતરી કરો કે શું અમારા એઆઈએ તમારી વાત બરાબર સમજી છે.'
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
    en: 'Read Aloud (TTS)',
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
    hi: 'हमारी टीम और तकनीकी विशेषज्ञ जल्द ही इसकी समीक्षा करेंगे। अपनी आईडी सुरक्षित रखें।',
    gu: 'અમારી ટીમ અને તકનીકી નિષ્ણાતો ટૂંક સમયમાં તેની સમીક્ષા કરશે. તમારી આઈડી સાચવો.'
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

