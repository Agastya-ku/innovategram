import { Innovation } from '@/types/innovategram';

export const initialInnovations: Innovation[] = [
  {
    id: 'IG-2026-001001',
    title: {
      en: 'Low-Cost Agricultural Weed Removal Machine',
      hi: 'कम लागत वाली कृषि खरपतवार हटाने वाली मशीन',
      gu: 'ઓછા ખર્ચે ખેતીમાં નિંદામણ દૂર કરતું સાધન'
    },
    problem: {
      en: 'Manual weed removal takes 12-15 labor days per acre, causing immense physical strain and high labor expenses during peak monsoon season.',
      hi: 'खेतों से हाथ से खरपतवार निकालने में प्रति एकड़ 12-15 मजदूर-दिन लगते हैं। अत्यधिक शारीरिक श्रम और वर्षा ऋतु में मजदूरों की भारी कमी होती है।',
      gu: 'હાથથી નીંદણ કાઢવામાં એકરે ૧૨-૧૫ મજૂર દિવસ થાય છે. ભારે શારીરિક થાક અને વરસાદી સિઝનમાં મજૂરી ખર્ચ બહુ વધી જાય છે.'
    },
    solution: {
      en: 'A hand-pushed lever-assisted wheeled tool with interchangeable cutting blades and bicycle chain mechanism fabricated from recycled scrap metal.',
      hi: 'साइकिल की चेन और रीसाइकिल किए गए लोहे से बना पहिएदार हाथ से चलने वाला उपकरण, जिसमें बदली जा सकने वाली तेज ब्लेड लगी हैं।',
      gu: 'જૂની સાઇકલની ચેઇન અને લોખંડના ભંગારમાંથી બનાવેલ વ્હીલ આધારિત સાધન, જેમાં જુદા-જુદા માપના બદલી શકાય તેવા બ્લેડ છે.'
    },
    originalLanguage: 'hi',
    originalTranscript: 'मैंने खेतों में निराई-गुड़ाई के लिए एक छोटी पहिए वाली मशीन बनाई है। यह पुराने साइकिल के पुर्जों से बनी है और बिना बिजली या पेट्रोल के एक ही आदमी से आसानी से चल जाती है।',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        caption: 'Fabricated blade assembly with bicycle gear integration'
      },
      {
        id: 'm2',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        caption: 'Field testing on cotton crop rows in Nagaur'
      }
    ],
    sector: 'Agriculture',
    subsector: 'Farm Machinery & Implements',
    stage: 'Tested',
    status: 'Verified',
    location: {
      state: 'Rajasthan',
      district: 'Nagaur',
      villageOrTown: 'Khinvsar',
      lat: 27.0425,
      lng: 73.4912,
      isApproximate: true
    },
    innovatorName: 'Rameshwar Lal Jat',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 98290 •••••',
    innovatorPhone: '+91 98290 41289',
    submissionDate: '2026-09-14',
    submissionType: 'voice',
    aiConfidenceScore: 94,
    keywords: ['weeder', 'manual implement', 'bicycle gear', 'low cost', 'agriculture'],
    potentialApplications: ['Cotton farming', 'Mustard crops', 'Organic vegetable farms'],
    isSampleData: true,
    verificationNotes: 'Demonstrated at District Krishi Vigyan Kendra. Effective depth control verified.',
    reviewedBy: 'Dr. S. K. Sharma (KVK Nagaur)',
    reviewedAt: '2026-10-02'
  },
  {
    id: 'IG-2026-001002',
    title: {
      en: 'Low-Pressure Gravity Drip Irrigation Kit',
      hi: 'निम्न-दबाव गुरुत्वाकर्षण ड्रिप सिंचाई प्रणाली',
      gu: 'ઓછા દબાણવાળી ગ્રેવિટી ડ્રિપ સિંચાઈ પ્રણાલી'
    },
    problem: {
      en: 'Standard commercial drip systems require 1.5 HP electric pumps. Frequent power cuts and dry borewells in arid regions leave crops unwatered.',
      hi: 'पारंपरिक ड्रिप प्रणालियों के लिए 1.5 एचपी बिजली के पंप की आवश्यकता होती है। बिजली कटौती और गिरते भूजल के कारण फसल सूख जाती है।',
      gu: 'પરંપરાગત ડ્રિપ સિસ્ટમ માટે ઇલેક્ટ્રિક પંપ જરૂરી છે. વીજ કાપ અને ઓછા પાણીના કારણે ખેડૂતો પાક બચાવી શકતા નથી.'
    },
    solution: {
      en: 'A bamboo-elevated drum system utilizing micro-perforated medical-grade tubing with calibrated flow pins, operating with only 3 feet gravity head.',
      hi: 'बांस के मचान पर रखे ड्रम पर आधारित प्रणाली, जिसमें कैलिब्रेटेड फ्लो पिन और माइक्रो-ट्यूबिंग का उपयोग किया गया है, जो 3 फीट की ऊंचाई से काम करती है।',
      gu: 'વાંસના સ્ટેન્ડ પર મુકેલા ડ્રમ અને કેલિબ્રેટેડ માઇક્રો-ટ્યુબિંગ પર કામ કરતી સિસ્ટમ જે માત્ર ૩ ફૂટ ઊંચાઈના કુદરતી દબાણથી ચાલે છે.'
    },
    originalLanguage: 'gu',
    originalTranscript: 'અમે એક એવું ડ્રિપ બનાવ્યું છે જે વગર લાઈટે અને ઓછા પાણીમાં ચાલે છે. માત્ર એક ઢોલ ઊંચો મૂકીને ગુરુત્વાકર્ષણ બળથી આખા ખેતરમાં ટીપે ટીપે પાણી પહોંચે છે.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm3',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
        caption: 'Gravity drip header line with earthen filtration chamber'
      }
    ],
    sector: 'Water and Sanitation',
    subsector: 'Micro-Irrigation',
    stage: 'Adopted',
    status: 'Verified',
    location: {
      state: 'Gujarat',
      district: 'Banaskantha',
      villageOrTown: 'Tharad',
      lat: 24.3942,
      lng: 71.6267,
      isApproximate: true
    },
    innovatorName: 'Pravinbhai Patel',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 94273 •••••',
    innovatorPhone: '+91 94273 88120',
    submissionDate: '2026-09-20',
    submissionType: 'combined',
    aiConfidenceScore: 96,
    keywords: ['gravity drip', 'water conservation', 'drought resistant', 'low pressure'],
    potentialApplications: ['Pomegranate orchards', 'Arid vegetable beds', 'Kitchen gardens'],
    isSampleData: true,
    verificationNotes: 'Tested in 14 village holdings across Tharad block. 48% water reduction.',
    reviewedBy: 'Gujarat Agro Innovation Center',
    reviewedAt: '2026-10-15'
  },
  {
    id: 'IG-2026-001003',
    title: {
      en: 'Solar-Powered Modular Rural Lighting & Mobile Hub',
      hi: 'सौर-ऊर्जा चालित मॉड्यूलर ग्रामीण प्रकाश एवं मोबाइल चार्जिंग हब',
      gu: 'સોલાર સંચાલિત ગ્રામીણ લાઇટિંગ અને મોબાઇલ ચાર્જિંગ હબ'
    },
    problem: {
      en: 'Remote hamlets (Dhanis) experience grid unreliability, leaving school children without study lighting and adults unable to recharge communication devices.',
      hi: 'रेगिस्तानी ढाणियों में बिजली की भारी अनिश्चितता है। बच्चों की पढ़ाई बाधित होती है और मोबाइल चार्ज करने के लिए कई किमी दूर जाना पड़ता है।',
      gu: 'દૂરના નેસડાઓમાં નિયમિત વીજળી નથી હોતી, જેના કારણે રાત્રે બાળકોનો અભ્યાસ અટકે છે અને મોબાઇલ ચાર્જ કરવા દૂર જવું પડે છે.'
    },
    solution: {
      en: 'Foldable 40W monocrystalline solar panel with recycled Li-ion battery pack from decommissioned telecom towers providing 12h warm LED light and 4 fast USB ports.',
      hi: 'दूरसंचार टावरों से निकाली गई पुरानी लीथियम बैटरी और 40W सौर पैनल से निर्मित पोर्टेबल किट, जो 12 घंटे एलईडी लाइट और 4 यूएसबी चार्जिंग पोर्ट देती है।',
      gu: '૪૦ વોટ સોલાર પેનલ અને જૂની ટેલિકોમ લિથિયમ બેટરી પેક દ્વારા તૈયાર કરાયેલી કિટ, જે ૧૨ કલાક પ્રકાશ અને ૪ ફાસ્ટ યુએસબી ચાર્જિંગ આપે છે.'
    },
    originalLanguage: 'hi',
    originalTranscript: 'हमारी ढाणी में बिजली नहीं आती थी इसलिए पुरानी बैटरियों को जोड़कर सोलर लाइट बनाई है जो रात भर जलती है और चार फोन भी चार्ज कर सकती है।',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm4',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        caption: 'Weatherproof enclosure and dual output terminals'
      }
    ],
    sector: 'Renewable Energy',
    subsector: 'Off-grid Distributed Power',
    stage: 'Adopted',
    status: 'Verified',
    location: {
      state: 'Rajasthan',
      district: 'Jaisalmer',
      villageOrTown: 'Sam',
      lat: 26.8284,
      lng: 70.5054,
      isApproximate: true
    },
    innovatorName: 'Guman Singh Bhati',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 97845 •••••',
    innovatorPhone: '+91 97845 10982',
    submissionDate: '2026-08-30',
    submissionType: 'voice',
    aiConfidenceScore: 92,
    keywords: ['solar kit', 'off-grid', 'battery upcycling', 'rural energy'],
    potentialApplications: ['Dhanis', 'Nomadic pastoralists', 'Emergency relief camps'],
    isSampleData: true,
    verificationNotes: 'Verified by Renewable Energy Department field inspector.',
    reviewedBy: 'Er. R. Mathur (RRECL)',
    reviewedAt: '2026-09-18'
  },
  {
    id: 'IG-2026-001004',
    title: {
      en: 'Multi-Sieve Low-Cost Grain Sorting & Cleaning Machine',
      hi: 'कम लागत वाली बहु-छलनी अनाज सफाई एवं ग्रेडिंग मशीन',
      gu: 'ઓછા ખર્ચે અનાજ સાફ કરવાની મલ્ટી-ચાળણી મશીન'
    },
    problem: {
      en: 'Smallholder farmers sell unsorted wheat and cumin at 30% below market price because industrial grading units charge prohibitive minimum batch fees.',
      hi: 'छोटे किसान गेहूं और जीरे की ग्रेडिंग नहीं कर पाते और मंडी में 30% कम भाव पर बेचना पड़ता है क्योंकि बड़ी मिलें छोटे लॉट नहीं लेतीं।',
      gu: 'નાના ખેડૂતો જીરું અને ઘઉં ગ્રેડિંગ કર્યા વગર વેચે છે જેથી ૩૦% ઓછો ભાવ મળે છે, કારણ કે મોટા મશીનો નાના જથ્થા માટે મોંઘા પડે છે.'
    },
    solution: {
      en: 'Vibratory triple-tier inclined wooden sieves driven by an eccentric cam hooked to an electric fan motor or manual foot treadle.',
      hi: 'कंपन आधारित तीन-स्तरीय लकड़ी की छलनी प्रणाली, जो पंखे की छोटी मोटर या पैर से चलने वाले पैडल से संचालित होती है।',
      gu: 'પંખાની જૂની મોટર અથવા પેડલથી ચાલતી ત્રિ-સ્તરીય વાઇબ્રેટરી ચાળણી, જે પ્રતિ કલાક ૧૫૦ કિલો જીરું કે ઘઉં સાફ કરે છે.'
    },
    originalLanguage: 'gu',
    originalTranscript: 'મેં જીરું અને રાયડો સાફ કરવા માટે કંપનવાળું દેશી ચારણું બનાવ્યું છે. આનાથી ધૂળ અને કાંકરા અલગ થઈ જાય છે અને ખેડૂતને મણ દીઠ સો રૂપિયા વધુ મળે છે.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm5',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
        caption: 'Triple deck mesh screen with dust extraction duct'
      }
    ],
    sector: 'Manufacturing',
    subsector: 'Post-Harvest Processing',
    stage: 'Validated',
    status: 'Verified',
    location: {
      state: 'Gujarat',
      district: 'Patan',
      villageOrTown: 'Radhanpur',
      lat: 23.8343,
      lng: 71.6033,
      isApproximate: true
    },
    innovatorName: 'Dineshbhai Suthar',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 99092 •••••',
    innovatorPhone: '+91 99092 31456',
    submissionDate: '2026-10-01',
    submissionType: 'photo',
    aiConfidenceScore: 95,
    keywords: ['grain sorting', 'post-harvest', 'vibratory sieve', 'cumin cleaner'],
    potentialApplications: ['Farmer Producer Companies (FPOs)', 'Village mandis', 'Seed growers'],
    isSampleData: true,
    verificationNotes: 'Tested by Anand Agricultural University outreach unit.',
    reviewedBy: 'Prof. J. C. Trivedi (AAU)',
    reviewedAt: '2026-10-22'
  },
  {
    id: 'IG-2026-001005',
    title: {
      en: 'Affordable Solar Pulse Oximeter & Vital Signs Monitor for ASHA Workers',
      hi: 'आशा कार्यकर्ताओं के लिए किफायती सौर पल्स ऑक्सीमीटर एवं वाइटल मॉनिटर',
      gu: 'આશા વર્કરો માટે પરવડે તેવું સોલાર પલ્સ ઓક્સિમીટર અને હેલ્થ મોનિટર'
    },
    problem: {
      en: 'Battery replacement costs and charging unavailability cause primary rural health workers to carry non-functional digital diagnostic devices in tribal belts.',
      hi: 'आदिवासी क्षेत्रों में आशा कार्यकर्ताओं के डिजिटल उपकरणों की बैटरियां खत्म हो जाती हैं और चार्जिंग न होने से समय पर जांच नहीं हो पाती।',
      gu: 'આદિવાસી વિસ્તારોમાં આશા બહેનોના ડિજિટલ સાધનોની બેટરી ઉતરી જવાથી અને ચાર્જિંગ ન મળવાથી દર્દીઓની તપાસ અટકી પડે છે.'
    },
    solution: {
      en: 'Ruggedized silicone-wrapped vital sign checker with integrated micro-solar cell, supercapacitor storage, and voice prompt guidance in regional dialect.',
      hi: 'सिलिकॉन बॉडी युक्त उपकरण जिसमें माइक्रो-सोलर सेल और सुपरकैपेसिटर लगा है, साथ ही स्थानीय भाषा में बोलकर निर्देश देने की सुविधा है।',
      gu: 'સિલિકોન કોટિંગ વાળું ટકાઉ સાધન જેમાં માઇક્રો સોલાર પેનલ છે અને સ્થાનિક બોલીમાં બોલીને સૂચના આપે છે.'
    },
    originalLanguage: 'en',
    originalTranscript: 'We built a field-hardened pulse oximeter and temperature sensor tailored specifically for community health workers that charges from indirect daylight in five minutes.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm6',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        caption: 'Prototype in protective casing during tribal primary health center trial'
      }
    ],
    sector: 'Healthcare',
    subsector: 'Rural Point-of-Care Diagnostics',
    stage: 'Tested',
    status: 'Verified',
    location: {
      state: 'Maharashtra',
      district: 'Gadchiroli',
      villageOrTown: 'Kurkheda',
      lat: 20.6133,
      lng: 80.1788,
      isApproximate: true
    },
    innovatorName: 'Dr. Aniket Deshmukh & Team',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 98224 •••••',
    innovatorPhone: '+91 98224 71209',
    submissionDate: '2026-09-08',
    submissionType: 'combined',
    aiConfidenceScore: 97,
    keywords: ['telemedicine', 'ASHA', 'vital signs', 'solar health', 'point of care'],
    potentialApplications: ['Tribal sub-centers', 'Maternal health drives', 'Mobile dispensaries'],
    isSampleData: true,
    verificationNotes: 'Under evaluation with District Health Office Gadchiroli.',
    reviewedBy: 'Directorate of Health Services, Maharashtra',
    reviewedAt: '2026-10-10'
  },
  {
    id: 'IG-2026-001006',
    title: {
      en: 'Stubble-to-Biochar Rapid Pyrolysis Mobile Kiln',
      hi: 'पराली से बायोचार बनाने वाली मोबाइल पायरोलिसिस भट्टी',
      gu: 'પરાળીમાંથી બાયોચાર બનાવતી મોબાઇલ પાયરોલિસિસ ભઠ્ઠી'
    },
    problem: {
      en: 'Post-paddy harvest window of only 15 days pushes farmers toward open field stubble burning, causing catastrophic North Indian winter air pollution.',
      hi: 'धान की कटाई के बाद गेहूं की बुवाई के लिए मात्र 15 दिन का समय मिलता है, जिसके कारण किसान पराली जलाने को मजबूर होते हैं।',
      gu: 'ડાંગરની કાપણી પછી ઘઉં વાવવા માત્ર ૧૫ દિવસ મળે છે, જેથી મજબૂરીમાં પરાળી બાળવી પડે છે અને ભયંકર પ્રદૂષણ ફેલાય છે.'
    },
    solution: {
      en: 'A tractor-towed insulated double-barrel continuous kiln that converts rice straw into high-carbon soil biochar right at the field perimeter in 40 minutes.',
      hi: 'ट्रैक्टर से खींची जा सकने वाली डबल-बैरल भट्टी, जो खेत के किनारे ही 40 मिनट में धान की पराली को कार्बनयुक्त बायोचार में बदल देती है।',
      gu: 'ટ્રેક્ટરથી ખેંચી શકાય તેવી ડબલ-બેરલ ભઠ્ઠી, જે ૪૦ મિનિટમાં પરાળીને ઉત્તમ ખાતર (બાયોચાર) માં ફેરવી નાખે છે.'
    },
    originalLanguage: 'hi',
    originalTranscript: 'पराली को जलाने की बजाय हमने ट्रैक्टर पर चलने वाली भट्टी बनाई है जो धुएं को रोककर पराली को खेत का कोयला यानी बायोचार बनाती है जिससे जमीन उपजाऊ होती है।',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm7',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        caption: 'Mobile kiln mounted onto farm trolley chassis'
      }
    ],
    sector: 'Waste Management',
    subsector: 'Agricultural Residue Utilization',
    stage: 'Prototype',
    status: 'Under Review',
    location: {
      state: 'Punjab',
      district: 'Sangrur',
      villageOrTown: 'Dhuri',
      lat: 30.3708,
      lng: 75.8706,
      isApproximate: true
    },
    innovatorName: 'Harpreet Singh Sandhu',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 98762 •••••',
    innovatorPhone: '+91 98762 55431',
    submissionDate: '2026-10-18',
    submissionType: 'voice',
    aiConfidenceScore: 89,
    keywords: ['stubble burning', 'biochar', 'pyrolysis', 'smog mitigation', 'soil health'],
    potentialApplications: ['Custom hiring centers', 'Paddy farming clusters', 'Soil amendment'],
    isSampleData: true,
    verificationNotes: 'Pending thermographic emissions analysis by Punjab Pollution Control Board.',
    reviewedBy: 'Er. Balwinder Singh (PAU Ludhiana)',
    reviewedAt: '2026-10-29'
  },
  {
    id: 'IG-2026-001007',
    title: {
      en: 'Multi-Stage Earthen Pot & Moringa Seed Water Filter',
      hi: 'बहु-स्तरीय मिट्टी के मटके एवं मोरिंगा बीज आधारित जल शोधक',
      gu: 'માટીના માટલા અને સરગવાના બીજ આધારિત બહુ-સ્તરીય પાણી ગળણી'
    },
    problem: {
      en: 'High turbidity and bacterial contamination in village pond and open well water during monsoon cause endemic waterborne gastrointestinal illnesses.',
      hi: 'बरसात के मौसम में तालाब और कुएं के मटमैले पानी से गांवों में हैजा, पीलिया और पेट की बीमारियां फैलती हैं। बिजली वाले फिल्टर महंगे हैं।',
      gu: 'ચોમાસામાં ગામના તળાવ અને કૂવાનું ડહોળું પાણી પીવાથી ઝાડા-ઊલટી થાય છે અને વીજળી વાળા ફિલ્ટર ઘણા મોંઘા હોય છે.'
    },
    solution: {
      en: 'Interconnected baked clay pots layered with washed quartz sand, activated charcoal from coconut husks, and crushed Moringa oleifera seed coagulant.',
      hi: 'आपस में जुड़े मिट्टी के घड़े जिनमें क्वार्ट्ज बालू, नारियल के छिलके का कोयला और सहजन (मोरिंगा) के बीज का पाउडर पानी की 99% गंदगी साफ करते हैं।',
      gu: 'પરસ્પર જોડાયેલા માટીના માટલા જેમાં રેતી, નાળિયેરના કોલસા અને સરગવાના બીજના પાવડર દ્વારા ૯૯% બેક્ટેરિયા અને ડહોળાશ દૂર થાય છે.'
    },
    originalLanguage: 'gu',
    originalTranscript: 'અમે ગામના તળાવનું ગંદુ પાણી શુદ્ધ કરવા સરગવાના બીજ અને માટીના ત્રણ માટલાની કળા વાપરી છે. વગર લાઈટે રોજ ૫૦ લિટર પીવાનું મીઠું પાણી મળે છે.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm8',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
        caption: 'Three-tiered ceramic filter installed in primary school courtyard'
      }
    ],
    sector: 'Water and Sanitation',
    subsector: 'Decentralized Water Purification',
    stage: 'Adopted',
    status: 'Verified',
    location: {
      state: 'Gujarat',
      district: 'Dahod',
      villageOrTown: 'Garbada',
      lat: 22.7533,
      lng: 74.3167,
      isApproximate: true
    },
    innovatorName: 'Shantaben Baria (Self Help Group Leader)',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 94088 •••••',
    innovatorPhone: '+91 94088 12390',
    submissionDate: '2026-09-02',
    submissionType: 'combined',
    aiConfidenceScore: 93,
    keywords: ['water filter', 'moringa oleifera', 'clay filtration', 'natural coagulant'],
    potentialApplications: ['Anganwadis', 'Off-grid schools', 'Flood-prone hamlets'],
    isSampleData: true,
    verificationNotes: 'Water samples tested negative for E.coli by District Water Quality Laboratory Dahod.',
    reviewedBy: 'WASMO Quality Control Division',
    reviewedAt: '2026-09-25'
  },
  {
    id: 'IG-2026-001008',
    title: {
      en: 'Low-Cost Self-Balancing Assistive Walking Frame for Uneven Terrain',
      hi: 'कच्चे और पथरीले रास्तों के लिए कम लागत वाला स्व-संतुलित वॉकर',
      gu: 'ઉબડખાબડ જમીન માટે ઓછી કિંમતનું સેલ્ફ-બેલેન્સિંગ વોકિંગ ફ્રેમ'
    },
    problem: {
      en: 'Commercial aluminum walkers are designed for flat urban tiled floors and topple instantly on unpaved village roads, stones and sandy village lanes.',
      hi: 'शहरी वॉकर टाइल वाले चिकने फर्श के लिए होते हैं। गांव की कच्ची, पथरीली और रेतीली पगडंडियों पर बुजुर्ग और दिव्यांग गिर जाते हैं।',
      gu: 'શહેરી વોકર લિસ્સા ફ્લોરિંગ માટે બનેલા છે. ગામડાના કાચા રસ્તા અને પથ્થરો પર વૃદ્ધો અને દિવ્યાંગો સંતુલન ગુમાવીને પડી જાય છે.'
    },
    solution: {
      en: 'A quadrilateral linkages frame with spring-damped swiveling dual front pneumatic skids that automatically contour to ground gradient changes up to 25 degrees.',
      hi: 'स्प्रिंग डैम्पर और चौड़े वायवीय स्किड्स युक्त फ्रेम, जो 25 डिग्री तक के ऊबड़-खाबड़ रास्तों पर अपने आप संतुलित रहता है।',
      gu: 'સ્પ્રિંગ સસ્પેન્શન અને પહોળા રબર પૈડાં વાળી ડિઝાઇન જે ૨૫ ડિગ્રી સુધીના ઢાળ અને ખાડામાં પણ સ્થિરતા જાળવી રાખે છે.'
    },
    originalLanguage: 'hi',
    originalTranscript: 'मेरे दादाजी गांव की कच्ची गली में गिर जाते थे इसलिए मैंने स्प्रिंग और पुराने स्कूटर के पहियों से एक ऐसा वॉकर बनाया जो पत्थरों पर भी नहीं पलटता।',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm9',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        caption: 'Terrain adaptation mechanism under mechanical stress test'
      }
    ],
    sector: 'Assistive Technology',
    subsector: 'Mobility Aids',
    stage: 'Tested',
    status: 'Verified',
    location: {
      state: 'Rajasthan',
      district: 'Sikar',
      villageOrTown: 'Dhod',
      lat: 27.5252,
      lng: 75.0531,
      isApproximate: true
    },
    innovatorName: 'Vikas Kumar Kumawat (ITI Student)',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 96023 •••••',
    innovatorPhone: '+91 96023 90812',
    submissionDate: '2026-08-19',
    submissionType: 'voice',
    aiConfidenceScore: 95,
    keywords: ['assistive walker', 'terrain adaptive', 'elderly mobility', 'spring suspension'],
    potentialApplications: ['Rural senior citizens', 'Polio survivors', 'Rural rehabilitation centers'],
    isSampleData: true,
    verificationNotes: 'Ergonomic trial completed with 12 elderly subjects in Dhod block.',
    reviewedBy: 'District Social Justice & Empowerment Office Sikar',
    reviewedAt: '2026-09-05'
  },
  {
    id: 'IG-2026-001009',
    title: {
      en: 'Evaporative Bamboo & Khus Cold Storage for Marginal Vegetable Growers',
      hi: 'छोटे सब्जी उत्पादकों के लिए खस और बांस आधारित शीत-कक्ष (कोल्ड स्टोरेज)',
      gu: 'શાકભાજી પકવતા નાના ખેડૂતો માટે વાંસ અને ખસ આધારિત દેશી કોલ્ડ સ્ટોરેજ'
    },
    problem: {
      en: 'Tomatoes and leafy greens rot within 48 hours in peak summer heat of 44°C, forcing distress sales at ₹2/kg to middlemen.',
      hi: 'मई-जून की 44 डिग्री गर्मी में टमाटर और हरी सब्जियां दो दिन में खराब हो जाती हैं, जिससे किसान औने-पौने दाम पर बेचने को विवश होते हैं।',
      gu: 'ઉનાળાની ૪૪ ડિગ્રી ગરમીમાં ટામેટાં અને શાકભાજી બે દિવસમાં સડી જાય છે, જેથી વચેટીયાઓને પાણીના ભાવે વેચવું પડે છે.'
    },
    solution: {
      en: 'Double-walled woven bamboo chamber packed with natural vetiver grass (Khus) continuously wetted via slow drip, lowering internal temperature by 12°C naturally.',
      hi: 'बांस की दोहरी दीवार जिसके बीच खस की घास भरी है। धीमी बूंद-बूंद पानी से भीगने पर अंदर का तापमान बिना बिजली के 12 डिग्री सेल्सियस तक कम रहता है।',
      gu: 'વાંસની ડબલ દિવાલ જેમાં ખસનું ઘાસ ભરેલું છે. ટીપાં ટીપાં પાણીથી અંદરનું તાપમાન ૧૨ ડિગ્રી ઘટી જાય છે અને શાકભાજી ૭ દિવસ તાજા રહે છે.'
    },
    originalLanguage: 'en',
    originalTranscript: 'We engineered an evaporative zero-electricity micro cold chamber made from native bamboo and vetiver grass that preserves 400kg of vegetables for up to seven days.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm10',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        caption: 'Chamber temperature log comparison: ambient 42C vs internal 29C'
      }
    ],
    sector: 'Renewable Energy',
    subsector: 'Passive Thermal Systems',
    stage: 'Validated',
    status: 'Verified',
    location: {
      state: 'Gujarat',
      district: 'Vadodara',
      villageOrTown: 'Padra',
      lat: 22.2411,
      lng: 73.0831,
      isApproximate: true
    },
    innovatorName: 'Kailasben Vasava',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 97250 •••••',
    innovatorPhone: '+91 97250 44321',
    submissionDate: '2026-09-28',
    submissionType: 'combined',
    aiConfidenceScore: 91,
    keywords: ['evaporative cooling', 'khus', 'zero electricity', 'vegetable preservation'],
    potentialApplications: ['Vegetable cooperatives', 'Tomato growers', 'Village weekly haats'],
    isSampleData: true,
    verificationNotes: 'Temperature records validated across 30 days of peak summer.',
    reviewedBy: 'Horticulture Department Vadodara',
    reviewedAt: '2026-10-14'
  },
  {
    id: 'IG-2026-001010',
    title: {
      en: 'Manual Multi-Row Garlic & Onion Seed Sowing Dispenser',
      hi: 'लहसुन और प्याज की हाथ से बुवाई करने वाला बहु-पंक्ति यंत्र',
      gu: 'હાથથી લસણ અને ડુંગળી વાવવાનું મલ્ટી-રો મશીન'
    },
    problem: {
      en: 'Bending continuously for manual clove planting causes chronic spinal injuries among women laborers, and spacing irregularity cuts bulb yield by 20%.',
      hi: 'लहसुन की कलियां हाथ से जमीन में दबाने से महिला मजदूरों की कमर में गंभीर दर्द होता है और असमान दूरी से प्याज-लहसुन का आकार छोटा रह जाता है।',
      gu: 'વાંકા વળીને એક એક લસણની કળી રોપવાથી મહિલા ખેડૂતોને કમરનો સખત દુખાવો થાય છે અને યોગ્ય અંતર ન રહેવાથી ઉત્પાદન ઘટે છે.'
    },
    solution: {
      en: 'Lightweight aluminium roller device with rotary metering cups that drops seed cloves right-side up at fixed 10cm intervals across three rows simultaneously.',
      hi: 'हल्का एल्यूमीनियम रोलर जिसमें घूमने वाले खांचे हैं, जो एक साथ तीन कतारों में 10 सेमी की निश्चित दूरी पर लहसुन को सही दिशा में गिराते हैं।',
      gu: 'એલ્યુમિનિયમનું હલકું રોલર જેમાં ૧૦ સેમીના ચોક્કસ અંતરે લસણની કળીઓ એકસાથે ત્રણ લાઈનમાં વવાય છે, કોઈ વાંકા વળવાની જરૂર નથી.'
    },
    originalLanguage: 'hi',
    originalTranscript: 'लहसुन लगाने में बहुत समय लगता था और औरतों की कमर टूट जाती थी। मैंने यह तीन पहिए वाला रोलर बनाया है जिसे बस चलाकर चलना है और बीज सही जगह गिरते हैं।',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm11',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
        caption: 'Rotary metering cup calibration bench test'
      }
    ],
    sector: 'Agriculture',
    subsector: 'Sowing and Planting Tools',
    stage: 'Tested',
    status: 'Verified',
    location: {
      state: 'Madhya Pradesh',
      district: 'Mandsaur',
      villageOrTown: 'Daloda',
      lat: 24.0667,
      lng: 75.0667,
      isApproximate: true
    },
    innovatorName: 'Balram Patidar',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 94251 •••••',
    innovatorPhone: '+91 94251 76543',
    submissionDate: '2026-10-05',
    submissionType: 'voice',
    aiConfidenceScore: 96,
    keywords: ['garlic planter', 'onion seeder', 'ergonomic tool', 'metering wheel'],
    potentialApplications: ['Mandsaur-Neemuch garlic belt', 'Nashik onion belt', 'Horticulture farms'],
    isSampleData: true,
    verificationNotes: 'Yield trials showed 18% improvement in bulb uniformity.',
    reviewedBy: 'Rajmata Vijayaraje Scindia Krishi Vishwa Vidyalaya',
    reviewedAt: '2026-10-25'
  },
  {
    id: 'IG-2026-001011',
    title: {
      en: 'Decentralized Sugarcane Bagasse-to-Biogas Digestor Prototype',
      hi: 'गन्ने की खोई से बायो-मीथेन गैस बनाने वाला विकेंद्रीकृत संयंत्र',
      gu: 'શેરડીના કૂચામાંથી બાયોગેસ બનાવતું વિકેન્દ્રીકૃત પ્લાન્ટ પ્રોટોટાઇપ'
    },
    problem: {
      en: 'Jaggery processing units burn raw bagasse inefficiently in open furnaces, releasing thick particulate smoke and leaving rural kitchens dependent on costly LPG.',
      hi: 'गुड़ बनाने वाली कोल्हू इकाइयों में गन्ने की खोई खुले में जलाई जाती है जिससे भारी प्रदूषण होता है, जबकि ग्रामीण महिलाओं को महंगे गैस सिलिंडर खरीदने पड़ते हैं।',
      gu: 'ગોળના રાબડામાં શેરડીના કૂચા બાળવાથી પુષ્કળ ધુમાડો થાય છે, જ્યારે ગ્રામીણ પરિવારોને મોંઘા ગેસ સિલિન્ડર પર નિર્ભર રહેવું પડે છે.'
    },
    solution: {
      en: 'Thermophilic anaerobic pre-digestion chamber using lignocellulose-degrading microbial consortium, producing clean cooking gas and rich organic fertilizer.',
      hi: 'विशेष जीवाणु संवर्धन (माइक्रोबियल कल्चर) युक्त बायो-डाइजेस्टर, जो गन्ने की खोई को पचाकर रसोई गैस और समृद्ध जैविक खाद पैदा करता है।',
      gu: 'શેરડીના કૂચાને વિઘટિત કરતો વિશેષ બાયો-ડાયજેસ્ટર, જેમાંથી શુદ્ધ રસોઈ ગેસ અને ઉત્તમ જૈવિક ખાતર તૈયાર થાય છે.'
    },
    originalLanguage: 'en',
    originalTranscript: 'We engineered a localized anaerobic digestion process that treats high-lignin sugarcane waste, converting 50kg bagasse daily into 6 hours of clean domestic cooking fuel.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm12',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80',
        caption: 'Continuous feedstock hopper and gas holder dome'
      }
    ],
    sector: 'Waste Management',
    subsector: 'Biomass Energy',
    stage: 'Prototype',
    status: 'Under Review',
    location: {
      state: 'Maharashtra',
      district: 'Kolhapur',
      villageOrTown: 'Shirol',
      lat: 16.7333,
      lng: 74.6000,
      isApproximate: true
    },
    innovatorName: 'Sachin Mane & Sanjay Patil',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 98901 •••••',
    innovatorPhone: '+91 98901 88921',
    submissionDate: '2026-10-12',
    submissionType: 'combined',
    aiConfidenceScore: 88,
    keywords: ['bagasse', 'biogas', 'lignocellulose', 'jaggery waste', 'methane'],
    potentialApplications: ['Gur kolhus', 'Sugar mill worker colonies', 'Dairy farms'],
    isSampleData: true,
    verificationNotes: 'Preliminary biogas methane concentration measured at 58%.',
    reviewedBy: 'Maharashtra Energy Development Agency (MEDA)',
    reviewedAt: '2026-10-27'
  },
  {
    id: 'IG-2026-001012',
    title: {
      en: 'Offline Audio-Tactile Science Learning Kit for Rural Schools',
      hi: 'ग्रामीण स्कूलों के लिए ऑफलाइन ध्वनि-स्पर्श विज्ञान शिक्षण किट',
      gu: 'ગ્રામીણ શાળાઓ માટે ઑફલાઇન ઓડિયો-ટેક્ટાઇલ વિજ્ઞાન શિક્ષણ કિટ'
    },
    problem: {
      en: 'Single-teacher primary schools in tribal areas lack internet access and science lab equipment, leaving students unable to grasp fundamental concepts.',
      hi: 'दूरदराज के एकल-शिक्षक स्कूलों में इंटरनेट और विज्ञान प्रयोगशाला का अभाव है। बच्चे विज्ञान के मूल प्रयोगों को केवल किताबों में रटते हैं।',
      gu: 'દૂરના ગામડાઓની સરકારી શાળાઓમાં ઇન્ટરનેટ કે લેબ નથી હોતી, જેથી બાળકો વિજ્ઞાનના પ્રયોગો જાતે સમજી શકતા નથી.'
    },
    solution: {
      en: 'A battery-powered wooden sound-board with conductive touch points that plays audio explanations and interactive experiments in local language without internet.',
      hi: 'लकड़ी का स्पर्श-संवेदी बोर्ड जो बटन दबाने पर स्थानीय बोली में विज्ञान के प्रयोगों की आवाज और कहानियां सुनाता है, बिना इंटरनेट के 30 दिन चलता है।',
      gu: 'લાકડાનું ટચ-સેન્સર બોર્ડ જે બટન દબાવતાની સાથે જ સ્થાનિક ભાષામાં વાર્તા અને પ્રયોગો સમજાવે છે, કોઈપણ ઇન્ટરનેટ વગર ચાલે છે.'
    },
    originalLanguage: 'gu',
    originalTranscript: 'અમે સરકારી શાળાના બાળકો માટે લાકડાનું એવું બોર્ડ બનાવ્યું છે કે જેને અડવાથી વિજ્ઞાનના પ્રયોગો બોલીને સમજાવે છે. ગામડામાં લાઈટ કે નેટ ન હોય તો પણ ચાલે છે.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    media: [
      {
        id: 'm13',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
        caption: 'Students interacting with solar system audio-tactile module'
      }
    ],
    sector: 'Education',
    subsector: 'STEM Learning Aids',
    stage: 'Adopted',
    status: 'Verified',
    location: {
      state: 'Gujarat',
      district: 'Sabarkantha',
      villageOrTown: 'Khedbrahma',
      lat: 24.0300,
      lng: 73.0400,
      isApproximate: true
    },
    innovatorName: 'Bhavesh Parmar (Primary Teacher)',
    innovatorContactProtected: true,
    innovatorPhoneMasked: '+91 94285 •••••',
    innovatorPhone: '+91 94285 66712',
    submissionDate: '2026-09-11',
    submissionType: 'voice',
    aiConfidenceScore: 96,
    keywords: ['STEM kit', 'offline education', 'audio tactile', 'tribal schools'],
    potentialApplications: ['Primary schools', 'Special education', 'Rural community libraries'],
    isSampleData: true,
    verificationNotes: 'Adopted by 18 schools in Khedbrahma block under Sarva Shiksha Abhiyan.',
    reviewedBy: 'District Institute of Education & Training (DIET) Sabarkantha',
    reviewedAt: '2026-09-30'
  }
];

export const mockConnectionRequests = [
  {
    id: 'CR-2026-0041',
    innovationId: 'IG-2026-001001',
    innovationTitle: 'Low-Cost Agricultural Weed Removal Machine',
    stakeholderName: 'Dr. Anand Verma',
    organization: 'National Innovation Foundation (NIF) India',
    stakeholderRole: 'Incubation Director',
    stakeholderEmail: 'a.verma@nifindia.org',
    stakeholderPhone: '+91 79267 •••••',
    purpose: 'Incubation' as const,
    message: 'We would like to offer prototype fabrication support and patent filing assistance under our grassroots technology scheme.',
    status: 'Pending Innovator Consent' as const,
    createdAt: '2026-10-28'
  },
  {
    id: 'CR-2026-0042',
    innovationId: 'IG-2026-001002',
    innovationTitle: 'Low-Pressure Gravity Drip Irrigation Kit',
    stakeholderName: 'Nisha Mehta',
    organization: 'Aga Khan Rural Support Programme (India)',
    stakeholderRole: 'Program Lead - Water',
    stakeholderEmail: 'nisha.m@akrspi.org',
    stakeholderPhone: '+91 79268 •••••',
    purpose: 'Procurement' as const,
    message: 'Interested in evaluating pilot procurement for 150 smallholder farmers in Saurashtra region.',
    status: 'Approved' as const,
    createdAt: '2026-10-24'
  },
  {
    id: 'CR-2026-0043',
    innovationId: 'IG-2026-001005',
    innovationTitle: 'Affordable Solar Pulse Oximeter & Vital Signs Monitor',
    stakeholderName: 'Vikram Joshi',
    organization: 'Maharashtra Social Innovation Center',
    stakeholderRole: 'Senior Technical Officer',
    stakeholderEmail: 'v.joshi@msic.gov.in',
    stakeholderPhone: '+91 22220 •••••',
    purpose: 'Testing & Validation' as const,
    message: 'Inviting innovator team for a 3-month clinical calibration test at Government Medical College Nagpur.',
    status: 'Pending Innovator Consent' as const,
    createdAt: '2026-11-01'
  }
];
